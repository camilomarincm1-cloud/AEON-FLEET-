import { Terminal, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonials() {
  const testimonials = [
    {
      id: "t1",
      quote: "Nuestros tiempos bajaron 40%.",
      author: "E-commerce Tech",
      role: "Despachos Diarios Medellín",
      metric: "-40% Tiempo de Entrega",
    },
    {
      id: "t2",
      quote: "Cobro exacto por KM, adiós tarifas ocultas.",
      author: "Agencia Digital",
      role: "Operaciones B2B",
      metric: "100% Tarifa Fija Ficticia $0",
    },
    {
      id: "t3",
      quote: "El recaudo COD más seguro de la ciudad.",
      author: "Boutique High-End",
      role: "Ventas Directas & Retail",
      metric: "100% Efectividad COD",
    },
  ];

  return (
    <section id="testimonios" className="py-20 sm:py-28 bg-[#000000] border-b border-white/10 relative font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-amber-400 uppercase tracking-widest mb-3 px-3.5 py-1 border border-amber-400/30 rounded-full bg-amber-400/10 font-bold">
            AUTORIDAD OPERATIVA • VALIDACIÓN B2B
          </span>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Respaldado por el <br className="hidden sm:inline" />
            <span className="text-amber-400 italic font-normal">comercio local.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Las empresas más exigentes del Valle de Aburrá delegan su cadena de custodia en la flota de Boxer Negra de ÆON Fleet.
          </p>
        </motion.div>

        {/* Terminal Style Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-[#0A0A0C] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-400/40 transition-all shadow-2xl relative group"
            >
              {/* Terminal Window Header */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                    <Terminal size={12} className="text-amber-400" />
                    <span>aeon_log.sys</span>
                  </div>
                </div>

                <p className="font-mono text-base sm:text-lg text-white font-bold mb-6 leading-snug">
                  “{item.quote}”
                </p>
              </div>

              <div>
                <div className="mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded inline-block">
                    {item.metric}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col">
                  <span className="font-mono font-bold text-sm text-white">
                    — {item.author}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
