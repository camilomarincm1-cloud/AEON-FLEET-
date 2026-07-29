import { motion } from "motion/react";

export default function AdaptiveTechnologyGrid() {
  const features = [
    {
      title: "Ruteo Dinámico Medellín",
      desc: "Optimización de micro-rutas esquivando trancones en El Poblado, Laureles, Envigado y Belén.",
    },
    {
      title: "Mensajero Dedicado VIP",
      desc: "Presentación impecable en Moto Boxer Negra y equipamiento impermeabilizado acolchado.",
    },
    {
      title: "Hoja de Ruta Digital",
      desc: "Registro de horas exactas de recogida, tránsito y firma del destinatario final.",
    },
    {
      title: "Garantía de Valor 100%",
      desc: "Respaldo inmediato sin letra chica para e-commerce y empresas de alto volumen.",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-ink border-b border-gold/15 overflow-hidden">
      {/* Background Video #4 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-25 z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Top Title Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16 pb-8 border-b border-gold/15">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-bright text-[10px] sm:text-xs font-mono uppercase tracking-widest block mb-3">
              EXCELENCIA OPERATIVA
            </span>
            <h2 className="text-parchment font-serif text-3xl sm:text-5xl font-light leading-tight">
              Logística Adaptativa <br />
              <span className="text-gold-bright italic font-normal">sin fricciones.</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-slate-dim text-sm sm:text-base leading-relaxed max-w-md md:text-right"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Aprendemos los patrones de despacho de tu negocio para garantizar que el mensajero esté en tu puerta justo cuando lo necesitas.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-ink-light/40 border border-gold/15 rounded-xl p-6 hover:border-gold/30 hover:bg-ink-light/80 transition-all"
            >
              <div className="text-gold-bright font-mono text-xs mb-3 font-bold">
                0{i + 1} //
              </div>
              <h3 className="text-parchment text-lg font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-dim text-xs sm:text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
