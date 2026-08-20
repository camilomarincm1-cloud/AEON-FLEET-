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

  // Expose Google Maps Platform Public Key for Client SDK
  app.get("/api/maps-key", (req, res) => {
    const key =
      process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
      process.env.VITE_GOOGLE_MAPS_API_KEY ||
      process.env.GOOGLE_MAPS_PLATFORM_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      "";
    res.json({ key });
  });

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
      const mapsApiKey =
        process.env.GOOGLE_MAPS_PLATFORM_KEY ||
        process.env.GOOGLE_MAPS_API_KEY ||
        process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
        process.env.VITE_GOOGLE_MAPS_API_KEY;

      const originCoords = req.body.originCoords;
      const destCoords = req.body.destCoords;

      if (mapsApiKey && ((cleanOrigin && cleanDest) || (originCoords && destCoords))) {
        try {
          const originParam = originCoords
            ? `${originCoords.lat},${originCoords.lng}`
            : encodeURIComponent(`${cleanOrigin}, Valle de Aburrá, Antioquia, Colombia`);
          const destParam = destCoords
            ? `${destCoords.lat},${destCoords.lng}`
            : encodeURIComponent(`${cleanDest}, Valle de Aburrá, Antioquia, Colombia`);
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originParam}&destinations=${destParam}&mode=driving&language=es&region=co&key=${mapsApiKey}`;

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

  // Google Places Autocomplete Server Proxy (restricted to Valle de Aburrá, Colombia)
  app.get("/api/places-autocomplete", rateLimiter, async (req, res) => {
    try {
      const input = sanitizeInput((req.query.input as string) || "");
      if (!input || input.length < 2) {
        return res.json({ predictions: [] });
      }

      const mapsApiKey =
        process.env.GOOGLE_MAPS_PLATFORM_KEY ||
        process.env.GOOGLE_MAPS_API_KEY ||
        process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
        process.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!mapsApiKey) {
        return res.json({ predictions: [] });
      }

      // Location bias centered on Medellín / Valle de Aburrá (6.2442, -75.5812, radius 35000m covering all 10 municipalities & corregimientos)
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&location=6.2442,-75.5812&radius=35000&strictbounds=false&components=country:co&language=es&key=${mapsApiKey}`;

      const apiRes = await fetch(url);
      const data = await apiRes.json();

      if (data.status === "OK" && Array.isArray(data.predictions)) {
        const predictions = data.predictions.map((p: any) => ({
          description: p.description,
          mainText: p.structured_formatting?.main_text || p.description,
          secondaryText: p.structured_formatting?.secondary_text || "",
          placeId: p.place_id,
        }));
        return res.json({ predictions });
      }

      return res.json({ predictions: [] });
    } catch (err) {
      console.error("Places Autocomplete proxy error:", err);
      return res.json({ predictions: [] });
    }
  });

  // Reverse Geocoding API for Map Pin Picker
  app.get("/api/reverse-geocode", rateLimiter, async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);

      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: "Invalid coordinates" });
      }

      const mapsApiKey =
        process.env.GOOGLE_MAPS_PLATFORM_KEY ||
        process.env.GOOGLE_MAPS_API_KEY ||
        process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
        process.env.VITE_GOOGLE_MAPS_API_KEY;

      if (mapsApiKey) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=es&region=co&key=${mapsApiKey}`;
        const geoRes = await fetch(url);
        const data = await geoRes.json();

        if (data.status === "OK" && data.results && data.results.length > 0) {
          const first = data.results[0];
          return res.json({
            success: true,
            formattedAddress: first.formatted_address,
            placeId: first.place_id,
            lat,
            lng,
          });
        }
      }

      // Procedural fallback name based on closest known Aburrá zones
      return res.json({
        success: true,
        formattedAddress: `Punto GPS (${lat.toFixed(4)}, ${lng.toFixed(4)}), Valle de Aburrá, Antioquia`,
        lat,
        lng,
      });
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      return res.status(500).json({ error: "Error en geocodificación inversa" });
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
