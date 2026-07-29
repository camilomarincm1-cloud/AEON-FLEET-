import { Clock, PackageCheck, Banknote, ShieldAlert, Zap, CalendarDays } from "lucide-react";
import { motion } from "motion/react";

export default function RulesSection() {
  const rules = [
    {
      icon: Clock,
      title: "⏱️ Tiempos de Carga y Espera",
      main: "5 minutos de espera gratuita incluidos.",
      detail: "En caso de demoras en la recogida o entrega, aplica una tarifa accesible de +$2.000 COP por cada 5 minutos adicionales.",
      badge: "5 Min Gratis Incluidos",
    },
    {
      icon: PackageCheck,
      title: "📦 Capacidad & Formato de Envíos",
      main: "Morral técnico impermeabilizado de alta protección.",
      detail: "Diseñado para proteger documentos, ropa, tecnología y repuestos de hasta 5 kg y tamaño máximo de 40x40 cm.",
      badge: "Capacidad Hasta 5kg",
    },
    {
      icon: Banknote,
      title: "💵 Recaudo Contra Entrega (COD)",
      main: "Cargo fijo de +$3.000 COP por gestión.",
      detail: "Cobramos el valor de tu producto al comprador en efectivo o QR (hasta $100.000 COP) y te lo transferimos el mismo día.",
      badge: "Recaudo Seguro +$3.000",
    },
  ];

  return (
    <section id="reglas" className="py-20 sm:py-28 bg-[#000000] border-b border-emerald-500/20 relative font-mono overflow-hidden">
      {/* Background emerald neon glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-emerald-300 uppercase tracking-widest mb-3 px-3.5 py-1.5 border border-emerald-500/30 rounded-full bg-emerald-500/10 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            POLÍTICAS CLARAS • SIN LETRA PEQUEÑA
          </span>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Reglas de Servicio & <br className="hidden sm:inline" />
            <span className="text-emerald-400 italic font-normal">Garantías de Operación.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Sin tarifas ocultas ni recargos sorpresa por mal clima. Criterios transparentes diseñados para cuidar tu bolsillo y proteger tu envío.
          </p>
        </motion.div>

        {/* ⏱️ FEATURED SECTION: HORARIO Y VENTANAS OPERATIVAS DE LA FLOTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#06120D] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 md:p-10 mb-12 shadow-[0_0_50px_rgba(16,185,129,0.12)] relative overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-emerald-500/20 mb-8 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-wider text-emerald-300 uppercase bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full mb-2">
                <Clock size={14} className="text-emerald-400 animate-pulse" />
                PROGRAMACIÓN & HORARIOS DE SERVICIO
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Horario de Flota & Entrega Prometida
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 px-4 py-2 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
                Operaciones Medellín & Metro
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Jornada Oficial */}
            <div className="bg-[#0B1A14] border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-4">
                  <Clock size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-300 uppercase block mb-1">
                  ⏱️ Jornada Diaria
                </span>
                <h4 className="text-xl font-bold text-white mb-2">
                  10:00 AM – 08:00 PM
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Lunes a Sábado en todo el Valle de Aburrá. Salida de primera ruta a las 10:00 AM.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg w-fit border border-emerald-500/30">
                Turnos Oficiales
              </span>
            </div>

            {/* Box 2: Corte SLA 02:00 PM */}
            <div className="bg-[#0B1A14] border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-4">
                  <CalendarDays size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-300 uppercase block mb-1">
                  📅 Hora Límite de Pedido (2:00 PM)
                </span>
                <h4 className="text-lg font-bold text-white mb-2">
                  Garantía Mismo Día o Mañana
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-2 font-mono">
                  • <strong className="text-white">Antes de 2:00 PM:</strong> Tu paquete se entrega <strong className="text-emerald-300">hoy mismo</strong>.
                  <br />
                  • <strong className="text-white">Después de 2:00 PM:</strong> Se programa para la primera ruta de <strong className="text-slate-300">mañana a las 10 AM</strong>.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg w-fit border border-emerald-500/30">
                Compromiso de Entrega
              </span>
            </div>

            {/* Box 3: Excepción Corporate VIP */}
            <div className="bg-gradient-to-br from-[#0B1A14] via-[#0B1A14] to-emerald-950/60 border border-emerald-400/50 rounded-2xl p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Zap size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-300 uppercase block mb-1">
                  🚀 Despacho Prioritario VIP
                </span>
                <h4 className="text-lg font-bold text-white mb-2">
                  Atención Inmediata (&lt; 45 min)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Recogida preferencial en menos de 45 minutos para clientes con Pack Corporate (de 11:00 AM a 05:00 PM).
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-lg w-fit border border-emerald-400/40">
                Atención Preferencial
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
                className="bg-[#06120D] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-400 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase">
                      {rule.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {rule.title}
                  </h3>

                  <p className="text-sm font-bold text-emerald-300 mb-2 font-mono">
                    {rule.main}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {rule.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-emerald-400 font-mono font-bold">
                  <ShieldAlert size={14} className="text-emerald-400 shrink-0" />
                  <span>Cobertura Segura en Valle de Aburrá</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
