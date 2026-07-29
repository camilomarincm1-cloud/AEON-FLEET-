import React, { useState } from "react";
import { Sparkles, MapPin, Check, Loader2, AlertTriangle, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AILocationValidatorProps {
  address: string;
}

export default function AILocationValidator({ address }: AILocationValidatorProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [chunks, setChunks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async () => {
    if (!address || address.length < 5 || address.includes("incompleta")) {
      setError("Ingresa una dirección estructurada más completa para analizar.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ask-ai-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error de red");
      }

      setResult(data.text);
      setChunks(data.chunks || []);
    } catch (err: any) {
      setError(err.message || "Error al consultar a la IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 border-t border-gold/10 pt-4">
      <div className="flex items-center justify-between mb-2">
         <span className="text-[10px] font-mono text-gold-bright uppercase flex items-center gap-1.5">
           <Sparkles size={10} /> Asistente de Entregas (IA)
         </span>
         <button
           onClick={handleValidate}
           disabled={loading}
           className="text-[9px] uppercase tracking-widest font-bold bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
           type="button"
         >
           {loading ? <Loader2 size={10} className="animate-spin" /> : <MapPin size={10} />}
           Validar con Google Maps
         </button>
      </div>

      {error && (
        <div className="bg-rust/10 border border-rust/30 text-rust-bright p-3 rounded text-xs flex gap-2 items-start mt-2">
          <AlertTriangle size={14} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-3 bg-ink border border-gold/20 rounded p-4 relative shadow-inner">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <MessageSquare size={40} className="text-gold" />
          </div>
          <div className="prose prose-invert prose-p:text-slate-dim prose-headings:text-parchment prose-a:text-gold-bright prose-strong:text-parchment prose-sm max-w-none text-xs relative z-10 markdown-body">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
          
          {chunks && chunks.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-dim/20">
              <span className="text-[9px] uppercase font-bold text-slate-dim block mb-2">Fuentes de Google Maps:</span>
              <div className="flex flex-col gap-1.5">
                {chunks.map((chunk, idx) => {
                  const web = chunk.web || chunk.webSearch || chunk.googleMaps || chunk.maps || chunk.places || chunk;
                  const uri = web?.uri || web?.url || web?.link;
                  const title = web?.title || web?.name || "Enlace de Maps";
                  if (!uri) return null;
                  return (
                    <a 
                      key={idx} 
                      href={uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-bright text-[10px] truncate block"
                    >
                      • {title}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
