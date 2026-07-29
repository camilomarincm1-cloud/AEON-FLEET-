import { Clock, PackageCheck, Banknote, ShieldAlert, Zap, CalendarDays } from "lucide-react";
import { motion } from "motion/react";

export default function RulesSection() {
  const rules = [
    {
      icon: Clock,
      title: "⏱️ Tiempos & Espera",
      main: "5 min de espera gratis en origen y destino.",
      detail: "+$2.000 COP adicionales por cada fracción de 5 minutos adicionales de espera en sitio.",
      badge: "Tolerancia 5 Min",
    },
    {
      icon: PackageCheck,
      title: "📦 Volumen & Capacidad",
      main: "Exclusivo morral técnico impermeabilizado.",
      detail: "Capacidad máxima de hasta 5 kg de peso real y dimensiones de hasta 40x40 cm.",
      badge: "Morral Técnico 5kg",
    },
    {
      icon: Banknote,
      title: "💵 Recaudo Contra Entrega COD",
      main: "Cargo fijo preferencial de +$3.000 COP.",
      detail: "Aplica para montos recaudados en efectivo o transferencia QR de hasta $100.000 COP.",
      badge: "Cargo Fijo +$3.000",
    },
  ];

  return (
    <section id="reglas" className="py-20 sm:py-28 bg-[#000000] border-b border-white/10 relative font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-amber-400 uppercase tracking-widest mb-3 px-3.5 py-1 border border-amber-400/30 rounded-full bg-amber-400/10 font-bold">
            TRANSPARENCIA TOTAL • POLÍTICAS DE SERVICIO
          </span>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Reglas de Operación <br className="hidden sm:inline" />
            <span className="text-amber-400 italic font-normal">Cero Letra Pequeña.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Sin recargos sorpresa ni tarifas dinámicas ocultas. Criterios claros para proteger el tiempo de tu cliente y la seguridad de tu mercancía.
          </p>
        </motion.div>

        {/* ⏱️ FEATURED SECTION: HORARIO Y VENTANAS OPERATIVAS DE LA FLOTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0A0C] border border-amber-400/40 rounded-3xl p-6 sm:p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-wider text-amber-400 uppercase bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full mb-2">
                <Clock size={14} className="text-amber-400 animate-pulse" />
                PROGRAMACIÓN Y DISPONIBILIDAD OPERATIVA
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Horario y Ventanas Operativas de la Flota
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-2xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Operaciones Continuas Aburrá
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Jornada Oficial */}
            <div className="bg-[#12141A] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                  <Clock size={20} />
                </div>
                <span className="text-xs font-bold text-amber-400 uppercase block mb-1">
                  ⏱️ Jornada Oficial de Operaciones
                </span>
                <h4 className="text-xl font-bold text-white mb-2">
                  10:00 AM – 08:00 PM
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lunes a Sábado en Valle de Aburrá. Ninguna operación inicia antes de las 10:00 AM.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg w-fit border border-white/10">
                Turnos Flota 10 AM
              </span>
            </div>

            {/* Box 2: Corte SLA 02:00 PM */}
            <div className="bg-[#12141A] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                  <CalendarDays size={20} />
                </div>
                <span className="text-xs font-bold text-amber-400 uppercase block mb-1">
                  📅 Regla de Corte SLA (02:00 PM)
                </span>
                <h4 className="text-lg font-bold text-white mb-2">
                  Despacho Mismo Día o Mañana
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  • <strong className="text-white">Antes de 02:00 PM:</strong> Despacho y entrega garantizados hoy mismo.
                  <br />
                  • <strong className="text-white">Después de 02:00 PM:</strong> Programación automática para la primera ruta de la mañana siguiente (10:00 AM).
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg w-fit border border-amber-400/20">
                Garantía Horaria SLA
              </span>
            </div>

            {/* Box 3: Excepción Corporate VIP */}
            <div className="bg-gradient-to-br from-[#12141A] via-[#12141A] to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Zap size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase block mb-1">
                  🚀 Excepción VIP Pack Corporate
                </span>
                <h4 className="text-lg font-bold text-white mb-2">
                  Inmediato (&lt; 45 Min)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Asignación prioritaria exclusivamente activa en la franja de control de 11:00 AM a 05:00 PM.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg w-fit border border-emerald-500/30">
                Franja VIP 11 AM - 5 PM
              </span>
            </div>
          </div>
        </motion.div>

        {/* 3 Minimalist Rule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-[#0A0A0C] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-400/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full uppercase">
                      {rule.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {rule.title}
                  </h3>

                  <p className="text-sm font-bold text-amber-400 mb-2">
                    {rule.main}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rule.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldAlert size={14} className="text-amber-400 shrink-0" />
                  <span>Aplica en todo el Valle de Aburrá</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
