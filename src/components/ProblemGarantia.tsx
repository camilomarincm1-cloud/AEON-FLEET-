import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import premiumDelivery from "../assets/images/premium_delivery_handover_1783788505527.jpg";

export default function ProblemGarantia() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const informalPoints = [
    "Sin hora confirmada de entrega",
    "Paquetes perdidos sin responsable claro",
    "Reseñas negativas de clientes por mala logística",
    "Sin trazabilidad ni evidencias fiables",
    "Tarifas que cambian a última hora por clima o tráfico",
  ];

  const aeonPoints = [
    "Ventana de entrega acordada y 100% cumplida",
    "Garantía absoluta contra pérdidas en operación",
    "Tu reputación de marca protegida en cada despacho",
    "Confirmación de entrega con evidencia fotográfica digital",
    "Precio fijo acordado según zonas, sin sorpresas",
  ];

  return (
    <section id="ventajas" ref={containerRef} className="py-24 sm:py-32 border-b border-gold/15 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-t from-gold/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center sm:text-left"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-4 px-3 py-1 border border-gold/20 rounded-full bg-gold/5">
            El costo real de la mensajería informal
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-parchment leading-[1.1]">
            Tu marca no puede permitirse <br />
            <span className="text-gold-bright italic font-normal">una entrega que falla.</span>
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          
          {/* Informal Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-ink-light border border-red-500/15 rounded-xl p-8 sm:p-10 relative overflow-hidden group shadow-xl"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-800 transition-all duration-300 group-hover:bg-red-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-2xl rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/25 flex items-center justify-center text-red-400">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-red-400">
                Mensajería informal
              </h3>
            </div>
            <ul className="flex flex-col gap-5">
              {informalPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4 text-sm sm:text-base text-slate-dim">
                  <span className="text-red-500 font-bold mt-0.5 select-none text-lg leading-none">×</span>
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AEON Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-ink-light border border-gold/20 rounded-xl p-8 sm:p-10 relative overflow-hidden group shadow-2xl shadow-gold/5"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gold transition-all duration-300 group-hover:bg-gold-bright shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold-bright shadow-inner">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gold-bright">
                ÆON Fleet
              </h3>
            </div>
            <ul className="flex flex-col gap-5">
              {aeonPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4 text-sm sm:text-base text-parchment font-medium">
                  <span className="text-gold font-bold mt-0.5 select-none text-lg leading-none">✓</span>
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Guarantee Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-ink-light via-ink-light/50 to-gold/5 border border-gold/20 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gold-bright mb-6 shadow-sm">
                Seguridad Total
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-gold-bright mb-6 leading-tight">
                Garantía de Cumplimiento Operativo
              </h3>
              <p className="text-base sm:text-lg text-slate-dim leading-relaxed mb-8 max-w-xl">
                Si el paquete no llega en la ventana de tiempo acordada,{" "}
                <span className="text-parchment font-semibold">el envío corre por nuestra cuenta.</span> Sin letra pequeña, sin excusas. Tu operación no puede darse el lujo de fallar en la última milla — y nosotros tampoco.
              </p>
              <div className="text-xs sm:text-sm font-mono text-gold border-l-2 border-gold pl-4 py-2 bg-gold/5 mb-6">
                Garantía contractual activa sobre el 100% de los despachos corporativos, salvo excepciones de fuerza mayor.
              </div>

              <div className="bg-ink/50 border border-rust/20 rounded-lg p-5 shadow-inner">
                <div className="flex items-center gap-2 text-rust-bright mb-3">
                  <AlertTriangle size={16} />
                  <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Causales de Exclusión de Garantía</h4>
                </div>
                <ul className="flex flex-col gap-2">
                  {[
                    "Dirección de entrega incorrecta o incompleta proporcionada por el remitente.",
                    "Destinatario ausente, incontactable o que excede los 10 minutos de cortesía.",
                    "Condiciones climáticas extremas (lluvia fuerte) que suspenden el SLA por seguridad.",
                    "Cambios de destino solicitados cuando el courier ya está en ruta."
                  ].map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-dim">
                      <span className="text-rust/70 mt-0.5">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 h-[300px] sm:h-[400px] rounded-xl overflow-hidden relative border border-gold/10 shadow-2xl group">
              <motion.img
                style={{ y: imgY }}
                src={premiumDelivery}
                alt="Premium Wrapped Delivery Box"
                className="absolute inset-0 w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
