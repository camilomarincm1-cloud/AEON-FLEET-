import { Cpu, ShieldCheck, CheckCircle2, Navigation } from "lucide-react";
import { motion } from "motion/react";

export default function MethodologySection() {
  const steps = [
    {
      num: "01",
      icon: Cpu,
      title: "1. Asignación Ágil (< 5 min)",
      desc: "Conectamos tu solicitud con el mensajero más cercano disponible en Moto Boxer Negra. Sin llamadas ni esperas innecesarias.",
      tag: "Respuesta Inmediata",
    },
    {
      num: "02",
      icon: Navigation,
      title: "2. Rastreo GPS & Ruta Directa",
      desc: "Seguimiento satelital en tiempo real durante todo el recorrido. Tu paquete viaja seguro y directo desde la recogida hasta la entrega.",
      tag: "Seguridad & Custodia",
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: "3. Confirmación Digital & COD",
      desc: "Recibes foto comprobante y firma digital al instante. Si solicitaste recaudo en efectivo, transferimos el dinero a tu cuenta el mismo día.",
      tag: "Entrega Garantizada",
    },
  ];

  return (
    <section id="metodologia" className="py-20 sm:py-28 bg-[#000000] border-b border-violet-500/20 relative overflow-hidden font-mono">
      {/* Background violet neon glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-violet-300 uppercase tracking-widest mb-3 px-3.5 py-1.5 border border-violet-500/30 rounded-full bg-violet-500/10 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            CÓMO FUNCIONA • PROCESO EN 3 PASOS
          </span>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Proceso de Despacho <br className="hidden sm:inline" />
            <span className="text-violet-400 italic font-normal">Paso a Paso.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Metodología logística diseñada para que enviar un paquete en el Valle de Aburrá sea rápido, seguro y completamente transparente.
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
                className="bg-[#0D0814] border border-violet-500/30 rounded-2xl p-8 relative flex flex-col justify-between hover:border-violet-400 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.1)] group hover:-translate-y-1"
              >
                {/* Large Step Number */}
                <span className="font-mono text-5xl font-extrabold text-violet-400/10 absolute top-6 right-6 select-none transition-colors group-hover:text-violet-400/20">
                  {step.num}
                </span>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-400/40 flex items-center justify-center text-violet-300 mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Icon size={22} />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-violet-300 bg-violet-500/10 border border-violet-400/30 px-2.5 py-0.5 rounded uppercase tracking-wider block mb-3 w-fit">
                    {step.tag}
                  </span>

                  <h3 className="font-mono text-xl sm:text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] text-violet-300 font-mono font-bold">
                  <ShieldCheck size={14} className="text-violet-400" />
                  <span>Protocolo de Seguridad ÆON</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
