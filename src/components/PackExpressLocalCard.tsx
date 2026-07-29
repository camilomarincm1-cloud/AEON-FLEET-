import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Zap,
  ShieldCheck,
  ChevronDown,
  Send,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Compass,
} from "lucide-react";

export default function PackExpressLocalCard() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappMsg =
    "Hola ÆON Fleet, quiero adquirir el Pack Express Local 6K ($140.000 COP por 10 envíos de hasta 6km). Deseo validar la distancia de mi dirección habitual e iniciar mi activación.";

  return (
    <div className="max-w-xl mx-auto my-8 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-[#0A0A0C] border border-amber-400/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] hover:border-amber-400 transition-all duration-300"
      >
        {/* Glow corner accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
            E-COMMERCE LOCAL • PACK 10 ENVÍOS
          </span>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded">
            $14.000 COP / envío
          </span>
        </div>

        {/* Title & Pricing */}
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Pack Express Local <span className="text-amber-400">(10 Envíos)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Solución logística optimizada para tiendas y negocios locales. Congela tu tarifa, asegura cero sorpresas por clima o tráfico y entrega con precisión GPS.
          </p>

          <div className="flex items-baseline gap-2 pt-2 border-t border-white/10">
            <span className="text-4xl font-black text-amber-400 tracking-tight">
              $140.000
            </span>
            <span className="text-xs text-slate-400 font-bold">COP / Total (10 Cupones)</span>
          </div>
        </div>

        {/* Visual Badges / Micro-Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
              <MapPin size={16} />
            </div>
            <span className="text-[11px] font-bold text-slate-200 leading-tight">
              📍 Medición GPS Exacta
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
              <Zap size={16} />
            </div>
            <span className="text-[11px] font-bold text-slate-200 leading-tight">
              ⚡ Entrega Relámpago
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
              <ShieldCheck size={16} />
            </div>
            <span className="text-[11px] font-bold text-slate-200 leading-tight">
              🛡️ Garantía de Integridad
            </span>
          </div>
        </div>

        {/* Key Included Features list */}
        <ul className="space-y-2 mb-6 text-xs text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
            <span>10 Envíos prepagados para rutas en Valle de Aburrá</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
            <span>Cobertura base incluida: <strong>Hasta 6,0 KM</strong> por trayecto</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
            <span>Vigencia estricta de 30 días calendario (sin prórrogas)</span>
          </li>
        </ul>

        {/* Accordion / Collapsible for Policies and Excess */}
        <div className="border border-white/15 rounded-xl bg-[#12141A] overflow-hidden mb-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-3.5 px-4 flex items-center justify-between text-left text-xs font-bold text-amber-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Compass size={15} className="text-amber-400" />
              <span>Ver políticas de cobertura y excedentes</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/10 p-4 space-y-3.5 text-xs text-slate-300 bg-[#0E1015]"
              >
                {/* Rule 1 */}
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">●</span>
                  <div>
                    <strong className="text-white block font-bold mb-0.5">
                      Cobertura Base (Hasta 6,0 KM):
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Cubre trayectos de hasta 6,0 km lineales/ruta (origen a destino) medidos con precisión vía GPS / Google Maps. Aplica para Itagüí, Sabaneta, Envigado (zona urbana) y Guayabal.
                    </p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">●</span>
                  <div>
                    <strong className="text-white block font-bold mb-0.5">
                      Regla del Punto Cero:
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      La distancia se calcula de forma transparente sumando la ubicación del punto de recogida exacto más la dirección final de entrega.
                    </p>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">●</span>
                  <div>
                    <strong className="text-white block font-bold mb-0.5">
                      Cláusula de Excedente ($1.500 COP / KM extra):
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Si una entrega supera los 6,0 km (ej. Laureles, Centro, Poblado Alto), ¡no pierdes el cupón! Se descuenta el servicio del pack y solo se liquida un recargo automático de <strong>$1.500 COP por kilómetro adicional</strong> sobre la ruta.
                    </p>
                  </div>
                </div>

                {/* Rule 4 */}
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">●</span>
                  <div>
                    <strong className="text-white block font-bold mb-0.5">
                      Exclusión de Montaña & Zonas Especiales:
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Los 6 km aplican sobre vías urbanas principales. Rutas hacia áreas rurales, veredas o la parte alta de San Antonio de Prado se cotizan con tarifa especial por desgaste operativo del vehículo.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-amber-300/90 italic">
                  <AlertTriangle size={12} className="shrink-0 text-amber-400" />
                  <span>Vigencia del pack: 30 días calendario contados desde el día de compra.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Call To Action */}
        <div className="space-y-2.5">
          <a
            href={`https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] cursor-pointer min-h-[50px]"
          >
            <Send size={16} />
            <span>Adquirir Pack Local 6K</span>
          </a>

          {/* Micro-Note below CTA */}
          <div className="flex items-center justify-center gap-1.5 text-center text-[10px] sm:text-[11px] text-slate-400 pt-1">
            <HelpCircle size={12} className="text-amber-400 shrink-0" />
            <span>¿Dudas con la distancia de tu dirección habitual? Validamos tu ruta en 10 segundos por WhatsApp.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
