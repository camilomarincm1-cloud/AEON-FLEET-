import { motion } from "motion/react";
import { AlertCircle, Clock, Timer, CheckCircle } from "lucide-react";
import fastMotorcycle from "../assets/images/fast_motorcycle_1783781883128.jpg";

export default function RelojAeon() {
  const rules = [
    {
      icon: Clock,
      title: "Horario Operativo Flota",
      desc: "10:00 AM — 08:00 PM (Lunes a Sábado, Valle de Aburrá) • Ninguna operación inicia antes de las 10:00 AM.",
      highlight: false,
    },
    {
      icon: AlertCircle,
      title: "⚡ Regla de Corte 02:00 PM",
      desc: "Solicitudes confirmadas antes de las 02:00 PM se entregan el mismo día. Solicitudes posteriores pasan a la primera ruta de mañana a las 10:00 AM. Excepción VIP Corporate (<45 min) aplica de 11 AM a 5 PM.",
      highlight: true,
    },
    {
      icon: Timer,
      title: "Cortesía de Espera",
      desc: "10 minutos de gracia en punto de recogida o entrega. Pasado ese tiempo: $500 COP / minuto o cancelación sin reembolso.",
      highlight: false,
    },
    {
      icon: CheckCircle,
      title: "SLA Garantizado",
      desc: "99% de cumplimiento. Si fallamos, el envío corre por nuestra cuenta.",
      highlight: false,
    },
  ];

  return (
    <section id="reloj" className="py-16 sm:py-24 border-b border-gold/15 bg-gradient-to-b from-rust/5 to-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Badge & Image Side */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="w-20 h-20 rounded-full border-2 border-rust bg-rust/10 flex flex-col items-center justify-center text-center font-mono text-[10px] text-rust-bright font-bold tracking-tight mb-6">
              RELOJ
              <span className="text-sm font-sans tracking-wide">ÆON</span>
            </div>

            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src={fastMotorcycle}
                alt="Fast premium logistics rider at sunset"
                className="w-full h-auto aspect-[4/3] object-cover rounded-md border border-rust/30 shadow-lg relative"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Guidelines Details Side */}
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-rust-bright uppercase tracking-widest block mb-3">
              Protocolo de Tiempo · Crítico
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-parchment leading-tight mb-4">
              El <span className="text-rust-bright italic font-normal">Reloj ÆON</span> dicta <br />
              las reglas del juego.
            </h2>
            <p className="text-sm sm:text-base text-slate-dim leading-relaxed mb-8">
              La logística premium requiere previsibilidad absoluta. Operamos bajo reglas horarias inmutables para blindar la reputación de tu negocio.
            </p>

            <div className="border border-rust/20 rounded-md overflow-hidden divide-y divide-rust/15 bg-ink-light/30">
              {rules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={index}
                    className={`p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-colors ${
                      rule.highlight ? "bg-rust/10" : ""
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      rule.highlight ? "bg-rust-bright/20 text-rust-bright" : "bg-ink border border-rust/20 text-slate-dim"
                    }`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-mono text-xs uppercase tracking-wider font-bold mb-1 ${
                        rule.highlight ? "text-rust-bright" : "text-parchment"
                      }`}>
                        {rule.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-dim leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
