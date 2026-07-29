import { MapPin, ArrowRight, ShieldCheck, Zap, Navigation, Calculator } from "lucide-react";
import { motion } from "motion/react";

export default function ZoneRatesCards() {
  const rateCards = [
    {
      id: "base-trayecto",
      badge: "BANDEJA BASE URBANA (0 - 2 KM)",
      price: "$12.000",
      currency: "COP",
      description: "Recogida prioritaria + primer trayecto urbano de hasta 2 kilómetros incluidos.",
      sectors: ["El Poblado", "Envigado", "Laureles", "Belén", "Sabaneta", "Itagüí"],
      extraRuleName: "KM Adicional (a partir del KM 3):",
      extraRuleVal: "+$1.800 COP / KM",
      color: "border-amber-400/40 bg-amber-400/5",
      badgeColor: "bg-amber-400/10 text-amber-400 border-amber-400/30",
    },
    {
      id: "ruta-compuesta",
      badge: "PARADAS ADICIONALES (RUTA COMPUESTA)",
      price: "+$5.000",
      currency: "COP / parada",
      description: "Consolida múltiples entregas en una sola salida optimizando tiempo y dinero.",
      sectors: ["Entregas cercanas (< 4 km): +$5.000 COP", "Entregas lejanas (> 4 km): +$8.000 COP"],
      extraRuleName: "Regla de Paradas Adicionales:",
      extraRuleVal: "Optimización Automática",
      color: "border-emerald-400/40 bg-emerald-400/5",
      badgeColor: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    },
    {
      id: "ancla-b2b",
      badge: "PACKS B2B PREPAGADOS (30 DÍAS VIGENCIA)",
      price: "$12.400",
      currency: "COP / envío promedio",
      description: "Congela tu costo logístico con tarifa B2B sin cobros por clima, hora pico o lluvia.",
      sectors: ["Emprendedor (10): $140.000", "Corporate (25): $310.000", "Enterprise (50): $575.000"],
      extraRuleName: "Vigencia Estricta B2B:",
      extraRuleVal: "30 Días Calendario Sin Prórroga",
      color: "border-purple-400/40 bg-purple-400/5",
      badgeColor: "bg-purple-400/10 text-purple-400 border-purple-400/30",
    },
  ];

  return (
    <section id="tarifas-zonas" className="py-20 sm:py-28 bg-[#0A0A0C] border-b border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-amber-400 uppercase tracking-widest mb-3 px-3.5 py-1 border border-amber-400/30 rounded-full bg-amber-400/10 font-bold">
            [MOFU] Sistema Financiero Transparente por KM
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-parchment leading-tight mb-4">
            Cotización por Kilometraje Real. <br className="hidden sm:inline" />
            <span className="text-amber-400 italic font-normal">Sin Precios Dinámicos ni Sorpresas.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Paga estrictamente por la distancia de tu trayecto y las paradas de tu ruta. Sin algoritmos opacos de lluvia, tráfico ni hora pico.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rateCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all hover:-translate-y-1 ${card.color}`}
            >
              <div>
                <span className={`inline-block font-mono text-[10px] font-bold tracking-wider px-3 py-1 rounded-full border mb-6 ${card.badgeColor}`}>
                  {card.badge}
                </span>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl sm:text-5xl font-mono font-extrabold text-parchment">
                    {card.price}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase">{card.currency}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {card.description}
                </p>

                <div className="mb-6">
                  <span className="text-xs font-mono text-amber-400 font-bold block mb-2 uppercase tracking-wider">
                    Detalles del Esquema:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {card.sectors.map((sec, idx) => (
                      <span key={idx} className="text-xs bg-white/5 border border-white/10 rounded-md px-2.5 py-1 text-slate-300 flex items-center gap-1">
                        <MapPin size={11} className="text-amber-400 shrink-0" />
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 bg-black/40 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  {card.extraRuleName}
                </span>
                <strong className="text-emerald-400 font-mono text-sm block">
                  {card.extraRuleVal}
                </strong>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rules Highlight Box */}
        <div className="bg-[#12141A] border border-amber-400/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-400 shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-parchment mb-1">
                ¿Requieres despacho ultrarrápido? Servicio Express Flash (+40%)
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Mensajero en Boxer Negra asignado de forma prioritaria con recogida e inicio de trayecto en menos de 45 minutos.
              </p>
            </div>
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=573012964584&text=Hola%20%C3%86ON%20Fleet%2C%20quiero%20cotizar%20un%20env%C3%ADo%20por%20kilometraje%20para%20mi%20empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer min-h-[48px]"
          >
            <span>COTIZAR MI RUTA AHORA</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
