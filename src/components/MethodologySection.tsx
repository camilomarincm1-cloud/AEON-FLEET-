import { Cpu, ShieldCheck, CheckCircle2, Navigation } from "lucide-react";
import { motion } from "motion/react";

export default function MethodologySection() {
  const steps = [
    {
      num: "01",
      icon: Cpu,
      title: "Asignación algorítmica en < 5 min",
      desc: "Nuestra plataforma despacha automáticamente al piloto más cercano equipado con Boxer Negra. Asignación inmediata sin demoras telefónicas.",
      tag: "Respuesta Inmediata",
    },
    {
      num: "02",
      icon: Navigation,
      title: "Telemetría y tránsito seguro (Cero desvíos)",
      desc: "Monitoreo GPS en tiempo real con geocercas activas. Ruta optimizada punto a punto para evitar congestión y garantizar cero desviaciones.",
      tag: "Custodia Blindada",
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: "Firma digital y recaudo exitoso",
      desc: "Confirmación fotográfica instantánea, firma digital en pantalla y transferencia del recaudo COD sin fricción el mismo día.",
      tag: "Cierre Garantizado",
    },
  ];

  return (
    <section id="metodologia" className="py-20 sm:py-28 bg-[#000000] border-b border-white/10 relative overflow-hidden font-mono">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-400/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-amber-400 uppercase tracking-widest mb-3 px-3.5 py-1 border border-amber-400/30 rounded-full bg-amber-400/10 font-bold">
            ARQUITECTURA OPERATIVA • CADENA DE CUSTODIA
          </span>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Metodología & <br className="hidden sm:inline" />
            <span className="text-amber-400 italic font-normal">Tránsito de Alta Precisión.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Estructura operativa de 3 capas diseñada para garantizar el 100% de efectividad en cada despacho en el Valle de Aburrá.
          </p>
        </motion.div>

        {/* Steps Grid / Layered Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#0A0A0C] border border-white/10 rounded-2xl p-8 relative flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 shadow-2xl group hover:-translate-y-1"
              >
                {/* Large Step Number */}
                <span className="font-mono text-5xl font-extrabold text-white/5 absolute top-6 right-6 select-none transition-colors group-hover:text-amber-400/10">
                  {step.num}
                </span>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6 shadow-inner">
                    <Icon size={22} />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded uppercase tracking-wider block mb-3 w-fit">
                    {step.tag}
                  </span>

                  <h3 className="font-mono text-xl sm:text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] text-emerald-400 font-mono font-bold">
                  <ShieldCheck size={14} />
                  <span>Protocolo Zero-Friction</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
