import React, { useState } from "react";
import { MessageSquare, ChevronRight, ShieldAlert, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ROUTES } from "../data";
import { RouteOption } from "../types";

function RouteCard({ route, index }: { route: RouteOption; index: number; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  const isR40 = route.id === "r40";
  const isSvcC = route.id === "svcc";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden bg-ink-light border rounded-xl p-6 sm:p-8 transition-all duration-500 group ${
        isR40
          ? "border-gold bg-gold/5 shadow-2xl shadow-gold/10"
          : isSvcC
          ? "border-rust bg-rust/5 shadow-2xl shadow-rust/10"
          : "border-gold/15 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 hover:bg-ink-light/80"
      }`}
    >
      {/* Premium Glow Overlays */}
      <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] pointer-events-none opacity-40 transition-opacity duration-500 ${
        isR40 ? "bg-gold/20" : isSvcC ? "bg-rust/20" : "bg-gold/0 group-hover:bg-gold/10"
      }`} />
      <div className={`absolute -bottom-10 -left-10 w-40 h-40 blur-[60px] pointer-events-none opacity-30 transition-opacity duration-500 ${
        isR40 ? "bg-gold/20" : isSvcC ? "bg-rust/20" : "bg-gold/0 group-hover:bg-gold/10"
      }`} />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Code Col */}
        <div className="md:col-span-2 flex flex-col">
          <span className="font-mono text-[10px] text-slate-dim tracking-wider uppercase mb-1">Código</span>
          <span className={`font-serif text-3xl sm:text-4xl font-bold leading-none ${isSvcC ? "text-rust-bright" : "text-gold-bright"}`}>
            {route.code}
          </span>
        </div>

        {/* Info Col */}
        <div className="md:col-span-7 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="font-serif text-xl font-semibold text-parchment">
              {route.name}
            </h4>
            {isR40 && (
              <span className="bg-gold/15 border border-gold/35 rounded-full text-[10px] text-gold font-mono uppercase tracking-widest px-2.5 py-0.5">
                Recomendado
              </span>
            )}
            {isSvcC && (
              <span className="bg-rust/25 border border-rust/45 rounded-full text-[10px] text-rust-bright font-mono uppercase tracking-widest px-2.5 py-0.5 animate-pulse">
                Urgencia Extrema
              </span>
            )}
          </div>
          
          <p className="text-sm text-slate-dim mb-4 leading-relaxed max-w-lg">
            {route.description}
          </p>

          {/* Expand details button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-xs font-mono text-gold hover:text-gold-bright uppercase tracking-wider text-left py-1 select-none focus:outline-none transition-colors"
          >
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 ${isOpen ? "rotate-90 text-gold-bright" : "text-gold"}`}
            />
            {isOpen ? "Ocultar especificaciones" : "Ver especificaciones"}
          </button>

          {/* Animated expanded features */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 pb-2 border-t border-gold/10 mt-4">
                  {route.features.map((feat, idx) => (
                    <div key={idx} className="text-xs text-slate-dim leading-relaxed flex items-start gap-2">
                      <span className="text-gold font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                  {route.warnings?.map((warn, idx) => (
                    <div key={idx} className="text-xs text-rust-bright/90 leading-relaxed flex items-start gap-2 sm:col-span-2 bg-rust/5 p-2 rounded">
                      <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Highlight description block if any */}
          {route.bulletText && (
            <div className="bg-gold/5 border-l-2 border-gold rounded-r p-4 mt-5 text-sm text-parchment leading-relaxed">
              {route.bulletText}
            </div>
          )}
        </div>

        {/* Price & Action Col */}
        <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gold/10 md:border-t-0">
          <div className="md:text-right">
            <span className={`text-2xl sm:text-3xl font-bold font-mono block ${isSvcC ? "text-rust-bright" : "text-gold-bright"}`}>
              {route.basePriceText}
            </span>
            <span className="text-[10px] font-mono text-slate-dim block mt-1 uppercase tracking-wider">
              {route.unitLabel}
            </span>
          </div>

          <a
            href={`https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(route.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-wider text-center transition-colors w-full ${
              isSvcC
                ? "bg-rust hover:bg-rust-bright text-ink"
                : "bg-gold hover:bg-gold-bright text-ink"
            }`}
          >
            <MessageSquare size={14} />
            Solicitar
          </a>
        </div>

      </div>
    </motion.div>
  );
}

export default function PricingRoutes() {
  const blockA = ROUTES.slice(0, 3);
  const blockB = ROUTES.slice(3);

  return (
    <section id="servicios" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Premium Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#c8a0530a_1px,transparent_1px),linear-gradient(to_bottom,#c8a0530a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-ink-light/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink-light/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center sm:text-left"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-4 px-3 py-1 border border-gold/20 rounded-full bg-gold/5">
            Catálogo de Servicios VIP
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-parchment leading-tight">
            Manifiesto de <span className="text-gold-bright italic font-normal">Rutas Operativas</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-dim max-w-2xl mt-4 leading-relaxed mx-auto sm:mx-0">
            Reserva volumen, asegura tu tarifa por entrega y delega la operación sin preocupaciones de última hora.
          </p>
        </motion.div>

        {/* Border warning */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-ink border border-rust/20 rounded-xl p-6 mb-16 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between text-sm shadow-2xl overflow-hidden group hover:border-rust/40 transition-colors"
        >
          {/* Subtle warning glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rust-bright/50 to-transparent" />
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-rust-bright/10 blur-[40px] pointer-events-none group-hover:bg-rust-bright/20 transition-colors" />

          <div className="flex items-start md:items-center gap-4 relative z-10">
            <div className="bg-rust/10 p-2 rounded-lg shrink-0">
              <ShieldAlert size={20} className="text-rust-bright" />
            </div>
            <div className="text-slate-dim leading-relaxed">
              <strong className="text-parchment font-semibold block sm:inline sm:mr-2">Límite Operativo Norte:</strong>
              Nuestras tarifas base operan exclusivamente hasta el casco urbano de Bello.
            </div>
          </div>
          <div className="text-rust-bright text-[10px] sm:text-xs font-bold font-mono bg-rust/10 px-4 py-2 rounded-lg border border-rust/20 shrink-0 w-full md:w-auto text-center shadow-inner">
            ⛔ ZONAS EXCLUIDAS: COPACABANA / GIRARDOTA
          </div>
        </motion.div>

        {/* Block A Title */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-gold font-bold">
            Bloque A • Logística E-Commerce B2B
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
        </div>

        {/* Block A Routes List */}
        <div className="flex flex-col gap-6 mb-20">
          {blockA.map((route, idx) => (
            <RouteCard key={route.id} route={route} index={idx} />
          ))}
        </div>

        {/* Block B Title */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-gold font-bold">
            Bloque B • Encargos de Valor & Prioridad
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
        </div>

        {/* Block B Routes List */}
        <div className="flex flex-col gap-6 mb-24">
          {blockB.map((route, idx) => (
            <RouteCard key={route.id} route={route} index={idx} />
          ))}
        </div>

        {/* Comparative Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ink-light border border-gold/20 rounded-xl shadow-2xl overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-rust/5 opacity-50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[100px] pointer-events-none group-hover:bg-gold/15 transition-colors duration-700" />
          
          <div className="p-6 sm:p-10 relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-parchment mb-8 relative z-10 flex items-center gap-3">
              <BadgeCheck className="text-gold-bright shrink-0" size={28} />
              <span>¿Por qué elegir ÆON Fleet <span className="text-gold-bright italic font-normal">sobre la competencia?</span></span>
            </h3>
            
            <div className="overflow-x-auto relative z-10 -mx-6 px-6 sm:mx-0 sm:px-0">
              <div className="min-w-[600px]">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-gold/20 font-mono text-[10px] sm:text-xs tracking-wider text-slate-dim uppercase">
                      <th className="py-4 px-5">Criterio Operativo</th>
                      <th className="py-4 px-5">Mensajería informal</th>
                      <th className="py-4 px-5">Apps (Rappi/Uber)</th>
                      <th className="py-4 px-5 text-gold-bright font-bold bg-gold/10 rounded-t-xl border-x border-t border-gold/20 shadow-[0_-4px_20px_rgba(200,160,83,0.1)]">Protocolo ÆON Fleet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10 text-slate-dim">
                    <tr className="hover:bg-gold/5 transition-colors group/row">
                      <td className="py-4 px-5 font-semibold text-parchment">Precio por Trayecto</td>
                      <td className="py-4 px-5 text-rust/80 font-medium">✗ Sube por lluvia/hora</td>
                      <td className="py-4 px-5 text-rust/80 font-medium">✗ Tarifas dinámicas</td>
                      <td className="py-4 px-5 text-gold-bright font-bold bg-gold/5 group-hover/row:bg-gold/10 border-x border-gold/20 transition-colors">✓ Fijo y blindado</td>
                    </tr>
                    <tr className="hover:bg-gold/5 transition-colors group/row">
                      <td className="py-4 px-5 font-semibold text-parchment">Horario de Entrega</td>
                      <td className="py-4 px-5 text-rust/80 font-medium">✗ "A lo largo del día"</td>
                      <td className="py-4 px-5 text-rust/80 font-medium">✗ Estimados fallidos</td>
                      <td className="py-4 px-5 text-gold-bright font-bold bg-gold/5 group-hover/row:bg-gold/10 border-x border-gold/20 transition-colors">✓ Ventana horaria pactada</td>
                    </tr>
                    <tr className="hover:bg-gold/5 transition-colors group/row">
                      <td className="py-4 px-5 font-semibold text-parchment">Siniestros y Pérdidas</td>
                      <td className="py-4 px-5 text-rust/80 font-medium">✗ Sin póliza (pérdida total)</td>
                      <td className="py-4 px-5">~ Soporte automatizado</td>
                      <td className="py-4 px-5 text-gold-bright font-bold bg-gold/5 group-hover/row:bg-gold/10 border-x border-gold/20 transition-colors">✓ Garantía total del 100%</td>
                    </tr>
                    <tr className="hover:bg-gold/5 transition-colors group/row">
                      <td className="py-4 px-5 font-semibold text-parchment border-b-transparent">Perfil del Mensajero</td>
                      <td className="py-4 px-5 text-rust/80 font-medium border-b-transparent">✗ Rotativo / Informal</td>
                      <td className="py-4 px-5 text-rust/80 font-medium border-b-transparent">✗ Aleatorio</td>
                      <td className="py-4 px-5 text-gold-bright font-bold bg-gold/5 group-hover/row:bg-gold/10 border-x border-b border-gold/20 rounded-b-xl shadow-[0_4px_20px_rgba(200,160,83,0.1)] transition-colors">✓ Courier VIP asignado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
