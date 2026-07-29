import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, MapPin, ChevronDown } from "lucide-react";
import { ZONES, PRICING_MATRIX, TIMES_MATRIX } from "../data";
import { Zone } from "../types";

export default function ZoneCalculator() {
  const [origin, setOrigin] = useState<{ zoneIdx: number; muni: string }>({
    zoneIdx: -1,
    muni: "",
  });
  const [destination, setDestination] = useState<{ zoneIdx: number; muni: string }>({
    zoneIdx: -1,
    muni: "",
  });

  const [openOriginZone, setOpenOriginZone] = useState<number>(-1);
  const [openDestZone, setOpenDestZone] = useState<number>(-1);

  const copF = (n: number) => {
    return "$" + n.toLocaleString("es-CO").replace(/,/g, ".");
  };

  const handleZoneClick = (side: "orig" | "dest", idx: number) => {
    if (side === "orig") {
      setOpenOriginZone(openOriginZone === idx ? -1 : idx);
      // Reset muni on zone change
      if (origin.zoneIdx !== idx) {
        setOrigin({ zoneIdx: idx, muni: "" });
      }
    } else {
      setOpenDestZone(openDestZone === idx ? -1 : idx);
      // Reset muni on zone change
      if (destination.zoneIdx !== idx) {
        setDestination({ zoneIdx: idx, muni: "" });
      }
    }
  };

  const handleMuniSelect = (side: "orig" | "dest", zoneIdx: number, muni: string) => {
    if (side === "orig") {
      setOrigin({ zoneIdx, muni });
      setOpenOriginZone(-1); // Close dropdown
    } else {
      setDestination({ zoneIdx, muni });
      setOpenDestZone(-1); // Close dropdown
    }
  };

  const hasResult = origin.zoneIdx !== -1 && origin.muni !== "" && destination.zoneIdx !== -1 && destination.muni !== "";

  const price = hasResult ? PRICING_MATRIX[origin.zoneIdx][destination.zoneIdx] : 0;
  const time = hasResult ? TIMES_MATRIX[origin.zoneIdx][destination.zoneIdx] : 0;
  const origZone = hasResult ? ZONES[origin.zoneIdx] : null;
  const destZone = hasResult ? ZONES[destination.zoneIdx] : null;

  const diff = hasResult ? Math.abs(origin.zoneIdx - destination.zoneIdx) : 0;
  const routeLabel =
    diff === 0
      ? "Ruta Intrazona"
      : diff === 1
      ? "Zona Adyacente"
      : diff === 2
      ? "Ruta Intermedia"
      : "Ruta Extendida Sur–Norte";

  const waMsg = hasResult && origZone && destZone
    ? `Hola, ÆON Fleet. Acabo de cotizar en la calculadora.\n\n📍 Origen: Zona ${origZone.code} — ${origZone.name} (${origin.muni})\n📦 Destino: Zona ${destZone.code} — ${destZone.name} (${destination.muni})\n💰 Tarifa: ${copF(price)} COP\n⏱ Tiempo: ~${time} min\n\n¿Puedes confirmar disponibilidad para hoy?`
    : "";

  return (
    <section id="calculadora-zonas" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Coverage Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center sm:text-left"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-4 px-3 py-1 border border-gold/20 rounded-full bg-gold/5">
            Cobertura Operativa Activa
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-parchment leading-tight">
            Dominamos el <span className="text-gold-bright italic font-normal">Valle de Aburrá.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-dim max-w-2xl mt-4 leading-relaxed mx-auto sm:mx-0">
            Operamos en los puntos neurálgicos de Medellín y sus municipios adyacentes para asegurar despachos veloces de marcas e-commerce.
          </p>
        </motion.div>

        {/* Priority Zones Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-ink-light border border-gold/15 rounded-xl p-6 sm:p-8 mb-16 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
          <span className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest block mb-5">
            Zonas de Despacho Prioritario
          </span>
          <div className="flex flex-wrap gap-3">
            {["Envigado", "Sabaneta", "Itagüí", "El Poblado", "Laureles", "Centro", "Bello"].map((zone, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-ink/80 backdrop-blur-sm text-gold-bright font-sans text-xs sm:text-sm font-medium cursor-default hover:border-gold/40 hover:-translate-y-1 transition-all shadow-sm"
              >
                <MapPin size={12} className="text-gold" />
                {zone}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Calculator Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:text-left"
        >
          <span className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest block mb-2">
            Tarifas de Referencia
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-parchment">
            Calculadora de <span className="text-gold-bright italic font-normal">Zonas y Tiempos</span>
          </h3>
          <p className="text-sm text-slate-dim mt-3 max-w-xl leading-relaxed mx-auto sm:mx-0">
            Selecciona el origen y destino para ver la tarifa base exacta. Al finalizar, podrás enviar un mensaje con la información a nuestro canal de WhatsApp.
          </p>
        </motion.div>

        {/* Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
          
          {/* Origin Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              📍 Punto de Origen
            </h4>
            <div className="flex flex-col gap-3">
              {ZONES.map((zone, idx) => (
                <div key={zone.code} className="flex flex-col">
                  <button
                    onClick={() => handleZoneClick("orig", idx)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      origin.zoneIdx === idx && origin.muni !== ""
                        ? "border-gold/40 bg-gold/10 shadow-lg shadow-gold/5"
                        : openOriginZone === idx
                        ? "border-gold/30 bg-ink-light"
                        : "border-gold/10 bg-ink-light hover:border-gold/20"
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-mono text-xs sm:text-sm text-gold-bright font-bold shrink-0 shadow-inner">
                      {zone.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-sans font-bold text-sm sm:text-base text-parchment block leading-none truncate">
                        {zone.name}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-dim block mt-1.5 truncate">
                        {origin.zoneIdx === idx && origin.muni !== "" ? `✓ Seleccionado: ${origin.muni}` : zone.munis.join(" · ")}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-slate-dim transition-transform ${openOriginZone === idx ? "rotate-180 text-gold-bright" : ""}`}
                    />
                  </button>

                  {/* Municipalities Grid */}
                  {openOriginZone === idx && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-ink-deep border-x border-b border-gold/15 p-4 flex flex-wrap gap-2.5 rounded-b-xl -mt-2 pt-5"
                    >
                      {zone.munis.map((m) => (
                        <button
                          key={m}
                          onClick={() => handleMuniSelect("orig", idx, m)}
                          className={`px-4 py-2 rounded-full border text-xs sm:text-sm transition-all cursor-pointer ${
                            origin.muni === m
                              ? "border-gold bg-gold text-ink font-bold shadow-md shadow-gold/20"
                              : "border-gold/10 bg-ink hover:border-gold/35 text-slate-dim hover:text-parchment"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Destination Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              📦 Punto de Destino
            </h4>
            <div className="flex flex-col gap-3">
              {ZONES.map((zone, idx) => (
                <div key={zone.code} className="flex flex-col">
                  <button
                    onClick={() => handleZoneClick("dest", idx)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      destination.zoneIdx === idx && destination.muni !== ""
                        ? "border-gold/40 bg-gold/10 shadow-lg shadow-gold/5"
                        : openDestZone === idx
                        ? "border-gold/30 bg-ink-light"
                        : "border-gold/10 bg-ink-light hover:border-gold/20"
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-mono text-xs sm:text-sm text-gold-bright font-bold shrink-0 shadow-inner">
                      {zone.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-sans font-bold text-sm sm:text-base text-parchment block leading-none truncate">
                        {zone.name}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-dim block mt-1.5 truncate">
                        {destination.zoneIdx === idx && destination.muni !== "" ? `✓ Seleccionado: ${destination.muni}` : zone.munis.join(" · ")}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-slate-dim transition-transform ${openDestZone === idx ? "rotate-180 text-gold-bright" : ""}`}
                    />
                  </button>

                  {/* Municipalities Grid */}
                  {openDestZone === idx && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-ink-deep border-x border-b border-gold/15 p-4 flex flex-wrap gap-2.5 rounded-b-xl -mt-2 pt-5"
                    >
                      {zone.munis.map((m) => (
                        <button
                          key={m}
                          onClick={() => handleMuniSelect("dest", idx, m)}
                          className={`px-4 py-2 rounded-full border text-xs sm:text-sm transition-all cursor-pointer ${
                            destination.muni === m
                              ? "border-gold bg-gold text-ink font-bold shadow-md shadow-gold/20"
                              : "border-gold/10 bg-ink hover:border-gold/35 text-slate-dim hover:text-parchment"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Calculation Result Panel */}
        {hasResult && origZone && destZone && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-ink-light to-gold/5 border border-gold/30 rounded-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] pointer-events-none" />
            
            <div className="absolute top-4 right-6 text-[10px] sm:text-xs font-mono text-gold bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-full shadow-sm">
              ZONA {origZone.code} → ZONA {destZone.code}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-4 relative z-10">
              <div>
                <span className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest block mb-2">
                  Trayecto Determinado
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-light text-parchment">
                  {origin.muni} <span className="text-gold-bright italic font-normal mx-2">→</span> {destination.muni}
                </h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-dim mt-4 font-mono">
                  <span className="bg-ink-deep px-2 py-1 rounded border border-gold/10">SLA estimado: ~{time} min</span>
                  <span className="text-gold hidden sm:inline">•</span>
                  <span className="text-parchment">{routeLabel}</span>
                </div>
              </div>

              <div className="md:text-right shrink-0 bg-ink p-6 rounded-xl border border-gold/10 w-full md:w-auto text-center md:text-right">
                <span className="text-4xl sm:text-5xl font-bold font-mono text-gold-bright block">
                  {copF(price)}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-dim block mt-2 uppercase tracking-wider">
                  COP • Tarifa Base sin recargos
                </span>
              </div>
            </div>

            <div className="border-t border-gold/15 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <p className="text-xs sm:text-sm text-slate-dim max-w-lg leading-relaxed">
                Esta tarifa corresponde al servicio estándar en condiciones climáticas favorables. El recargo por lluvia o minuto de espera adicional se rige bajo nuestras políticas innegociables.
              </p>
              <a
                href={`https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-bright text-ink font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition-all shadow-lg shadow-gold/20 hover:-translate-y-0.5 shrink-0 w-full sm:w-auto"
              >
                <MessageSquare size={16} />
                Confirmar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
