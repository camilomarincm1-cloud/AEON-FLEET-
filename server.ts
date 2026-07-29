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
