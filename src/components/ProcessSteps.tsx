import { Calculator, Clock, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function ProcessSteps() {
  const steps = [
    {
      num: "01",
      icon: Calculator,
      title: "Elige tu plan",
      desc: "Escoge entre envíos sueltos o uno de nuestros paquetes con precio blindado. Sin sorpresas, ni recargos ocultos.",
    },
    {
      num: "02",
      icon: Clock,
      title: "Crea tu pedido",
      desc: "Registra tu envío rápido desde nuestro formulario. Si confirmas antes de las 12 PM, despachamos el mismo día en la tarde.",
    },
    {
      num: "03",
      icon: CheckCircle,
      title: "Descansa y delega",
      desc: "Tu paquete llega en la ventana acordada con firma y evidencia en tiempo real. Nosotros nos encargamos de la última milla.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-b border-gold/15 bg-ink-light/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16 text-center md:text-left"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-4 px-3 py-1 border border-gold/20 rounded-full bg-gold/5">
            Proceso · 3 Pasos Simples
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-parchment leading-tight">
            Tan simple como <br />
            <span className="text-gold-bright italic font-normal">debe ser.</span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-ink-light border border-gold/10 rounded-xl p-8 relative flex flex-col items-start hover:border-gold/30 hover:bg-ink-light/80 transition-all duration-300 shadow-lg group hover:-translate-y-1"
              >
                {/* Large Background Step Number */}
                <span className="font-mono text-6xl font-bold text-gold/5 absolute top-6 right-6 select-none transition-colors group-hover:text-gold/10">
                  {step.num}
                </span>

                <div className="w-12 h-12 rounded-lg bg-ink border border-gold/25 flex items-center justify-center text-gold-bright mb-6 shadow-inner">
                  <Icon size={20} />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-parchment mb-4">
                  {step.title}
                </h3>
                
                <p className="text-sm text-slate-dim leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>

                {/* Arrow indicator between steps for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute -right-6 lg:-right-7 top-1/2 -translate-y-1/2 z-20 text-gold/30 font-mono text-2xl select-none pointer-events-none">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Actionable CTA for easy acquisition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 flex flex-col items-center justify-center text-center bg-gradient-to-t from-gold/5 to-transparent border border-gold/20 rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full pointer-events-none" />
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-parchment mb-4">
            ¿Listo para tu <span className="text-gold-bright italic font-normal">primer envío?</span>
          </h3>
          <p className="text-sm text-slate-dim max-w-lg mb-8 leading-relaxed">
            Eliminamos la fricción de cotizar y programar. Agenda tu primer servicio en minutos y experimenta la logística VIP de ÆON Fleet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
            <a
              href="#hoja-pedido"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-bright text-ink font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition-all shadow-lg shadow-gold/20 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <CheckCircle size={18} />
              Diligenciar Orden de Envío
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=573012964584&text=Hola,%20quiero%20crear%20mi%20cuenta%20corporativa%20en%20AEON%20Fleet%20para%20empezar%20a%20enviar."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-gold/30 hover:border-gold-bright/60 text-gold-bright font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition-all bg-ink/50 hover:bg-ink/80 w-full sm:w-auto"
            >
              <CheckCircle size={18} className="opacity-0 hidden" /> {/* For spacing match */}
              Crear cuenta rápida vía WhatsApp
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
