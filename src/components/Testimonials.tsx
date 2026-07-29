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
    <section id="testimonios" className="py-20 sm:py-28 bg-[#04060A] bg-texture-cyan-grid border-b border-cyan-500/20 relative font-mono overflow-hidden">
      {/* Background cyan neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-cyan-300 uppercase tracking-widest mb-3 px-3.5 py-1.5 border border-cyan-500/30 rounded-full bg-cyan-500/10 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            AUTORIDAD OPERATIVA • HISTORIAS DE ÉXITO B2B
          </span>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Respaldado por el <br className="hidden sm:inline" />
            <span className="text-cyan-400 italic font-normal">comercio e-commerce local.</span>
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
              className="bg-[#080D16] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-400 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.1)] relative group hover:-translate-y-1"
            >
              {/* Terminal Window Header */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300">
                    <Terminal size={12} className="text-cyan-400" />
                    <span>aeon_verify.log</span>
                  </div>
                </div>

                <p className="font-mono text-base sm:text-lg text-white font-bold mb-6 leading-snug">
                  “{item.quote}”
                </p>
              </div>

              <div>
                <div className="mb-4">
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded inline-block shadow-[0_0_10px_rgba(6,182,212,0.15)]">
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
