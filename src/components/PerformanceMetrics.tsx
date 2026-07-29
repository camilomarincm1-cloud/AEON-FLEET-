import { motion } from "motion/react";

export default function PerformanceMetrics() {
  const metrics = [
    {
      value: "99.8%",
      label: "Puntualidad SLA",
      detail: "Cumplimiento estricto en franja horaria acordada",
    },
    {
      value: "< 45m",
      label: "Tiempo Promedio",
      detail: "Recogida y despacho express en Medellín",
    },
    {
      value: "100%",
      label: "Garantía Blindada",
      detail: "Protección total frente a pérdidas o daños",
    },
    {
      value: "$0",
      label: "Cobros Ocultos",
      detail: "Tarifa fija negociada antes de arrancar",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-ink border-b border-gold/15 overflow-hidden">
      {/* Background Video #3 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-30 z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4"
      />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-gold-bright text-[11px] sm:text-[13px] font-mono tracking-[0.25em] uppercase mb-16 text-center"
        >
          MÉTRICAS DE RENDIMIENTO OPERATIVO • ÆON FLEET
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-ink-light/50 border border-gold/15 rounded-2xl p-8 hover:border-gold/30 transition-all hover:bg-ink-light/80 shadow-xl shadow-black/40"
            >
              <div className="text-gold-bright font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-3">
                {m.value}
              </div>
              <div className="text-parchment text-sm sm:text-base font-bold uppercase tracking-wider mb-2">
                {m.label}
              </div>
              <div className="text-slate-dim text-xs leading-relaxed font-sans">
                {m.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
