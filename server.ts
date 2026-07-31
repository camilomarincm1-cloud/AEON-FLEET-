import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Rate Limiting Store (In-memory)
  const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
  const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS_PER_WINDOW = 30;

  const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";
    const now = Date.now();
    const record = rateLimitMap.get(clientIp);

    if (!record || now > record.resetAt) {
      rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      return next();
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({ error: "Demasiadas peticiones. Por favor intenta en 1 minuto." });
    }

    record.count += 1;
    next();
  };

  // Helper to sanitize strings to prevent XSS / script injections
  const sanitizeInput = (str: string): string => {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .trim();
  };

  // Protected Quote Calculation Endpoint
  app.post("/api/quote", rateLimiter, async (req, res) => {
    try {
      const { originAddress, destAddress, originNeighborhoodId, destNeighborhoodId } = req.body;

      const cleanOrigin = sanitizeInput(originAddress || "");
      const cleanDest = sanitizeInput(destAddress || "");

      if (!cleanOrigin && !originNeighborhoodId) {
        return res.status(400).json({ error: "Se requiere dirección u origen válido" });
      }

      let distanceKm = 4.5; // default fallback
      let durationMinutes = 18;

      // Google Maps Distance Matrix API call if API key configured
      const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

      if (mapsApiKey && cleanOrigin && cleanDest) {
        try {
          const originQuery = encodeURIComponent(`${cleanOrigin}, Medellín, Colombia`);
          const destQuery = encodeURIComponent(`${cleanDest}, Medellín, Colombia`);
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originQuery}&destinations=${destQuery}&mode=driving&key=${mapsApiKey}`;

          const mapsRes = await fetch(url);
          const data = await mapsRes.json();

          if (data.status === "OK" && data.rows?.[0]?.elements?.[0]?.status === "OK") {
            const element = data.rows[0].elements[0];
            distanceKm = Math.max(1.0, element.distance.value / 1000);
            durationMinutes = Math.round(element.duration.value / 60);
          }
        } catch (apiErr) {
          console.error("Distance Matrix API call error (fallback to estimation):", apiErr);
        }
      }

      return res.json({
        success: true,
        origin: cleanOrigin,
        destination: cleanDest,
        distanceKm: Number(distanceKm.toFixed(1)),
        durationMinutes,
      });
    } catch (err) {
      console.error("Error calculating quote:", err);
      return res.status(500).json({ error: "Error procesando la cotización" });
    }
  });

  // AI Route with Maps Grounding
  app.post("/api/ask-ai-route", async (req, res) => {
    try {
      const { address } = req.body;
      if (!address) {
        return res.status(400).json({ error: "Address is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key is not configured on the server." });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' }
        }
      });

      const prompt = `Analiza la siguiente dirección o lugar de entrega en Medellín, Colombia: "${address}". 
Usando Google Maps, proporciona información que sea altamente instructiva para el cliente y sumamente precisa para el domiciliario.
Escribe un reporte conciso en este formato:
1. "Indicaciones precisas": Instrucciones detalladas de cómo llegar para el domiciliario, vías principales de acceso y puntos de referencia reales cercanos.
2. "Información de la zona": Breve descripción del área para el cliente, tráfico habitual o recomendaciones (ej. parqueadero, tipo de zona).
3. "Validación": Confirma si el lugar o calle existe o es coherente.

Mantén el tono profesional y orientado a logística (tipo ÆON). Responde en Markdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }]
        }
      });

      const text = response.text;
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      res.json({ text, chunks });
    } catch (error) {
      console.error("Error in AI route:", error);
      res.status(500).json({ error: "Failed to process location analysis." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
