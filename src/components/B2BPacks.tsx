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

interface PackItem {
  id: string;
  badge: string;
  unitPrice: string;
  title: string;
  titleHighlight: string;
  description: string;
  totalPrice: string;
  unitLabel: string;
  popular?: boolean;
  microBadges: { icon: string; text: string }[];
  keyFeatures: string[];
  rules: {
    title: string;
    description: string;
  }[];
  ctaText: string;
  whatsappMsg: string;
}

const PACKS_DATA: PackItem[] = [
  {
    id: "local3k",
    badge: "E-COMMERCE LOCAL • PACK 10 ENVÍOS",
    unitPrice: "$7.000 COP / envío",
    title: "Pack Local 3K ",
    titleHighlight: "(10 Envíos)",
    description:
      "Solución logística optimizada para tiendas y comercios de cercanía. 10 envíos prepagados para rutas de hasta 3 km.",
    totalPrice: "$70.000",
    unitLabel: "COP / Total (10 Cupones)",
    popular: false,
    microBadges: [
      { icon: "gps", text: "📍 Medición GPS Exacta" },
      { icon: "zap", text: "⚡ Entrega Relámpago" },
      { icon: "shield", text: "🛡️ Garantía de Integridad" },
    ],
    keyFeatures: [
      "10 Envíos prepagados para rutas en Valle de Aburrá",
      "Cobertura base incluida: Hasta 3,0 KM por trayecto",
      "Vigencia estricta de 30 días calendario (sin prórrogas)",
    ],
    rules: [
      {
        title: "Cobertura Base (Hasta 3,0 KM):",
        description:
          "Cubre trayectos de hasta 3,0 km lineales/ruta (origen a destino) medidos con precisión vía GPS / Google Maps.",
      },
      {
        title: "Regla del Punto Cero:",
        description:
          "La distancia se calcula de forma transparente sumando la ubicación del punto de recogida exacto más la dirección final de entrega.",
      },
      {
        title: "Cláusula de Excedente ($1.500 COP / KM extra):",
        description:
          "Si una entrega supera los 3,0 km, ¡no pierdes el cupón! Se descuenta el servicio del pack y solo se liquida un recargo automático de $1.500 COP por kilómetro adicional sobre la ruta.",
      },
      {
        title: "Exclusión de Montaña & Zonas Especiales:",
        description:
          "Los 3 km aplican sobre vías urbanas principales. Rutas hacia áreas rurales o veredas se cotizan con tarifa especial por desgaste operativo.",
      },
    ],
    ctaText: "Adquirir Pack Local 3K",
    whatsappMsg:
      "Hola ÆON Fleet, quiero adquirir el Pack Local 3K ($70.000 COP por 10 envíos de hasta 3km). Deseo validar la distancia de mi dirección habitual e iniciar mi activación.",
  },
  {
    id: "express6k",
    badge: "MÁS POPULAR B2B • PACK 10 ENVÍOS",
    unitPrice: "$10.000 COP / envío",
    title: "Pack Express 6K ",
    titleHighlight: "(10 Envíos)",
    description:
      "Diseñado para comercios con rutas medianas. Cobertura de hasta 6 km por trayecto con la mejor relación costo-beneficio.",
    totalPrice: "$100.000",
    unitLabel: "COP / Total (10 Cupones)",
    popular: true,
    microBadges: [
      { icon: "gps", text: "📍 Medición GPS Exacta" },
      { icon: "zap", text: "⚡ Ventana Prioritaria" },
      { icon: "shield", text: "🛡️ Cadena de Custodia" },
    ],
    keyFeatures: [
      "10 Envíos prepagados a $10.000 COP por trayecto",
      "Cobertura incluida: Hasta 6,0 KM (Eje comercial principal)",
      "Asignación e inicio prioritario",
    ],
    rules: [
      {
        title: "Cobertura Interzonal (Hasta 6,0 KM):",
        description:
          "Cubre todo el eje comercial principal en rutas de hasta 6,0 km.",
      },
      {
        title: "Regla del Punto Cero:",
        description:
          "La distancia se calcula sumando la ubicación del punto de recogida exacto más la dirección final de entrega.",
      },
      {
        title: "Cláusula de Excedente ($1.500 COP / KM extra):",
        description:
          "Si una entrega supera los 6,0 km, no pierdes el cupón: se descuenta el envío y solo se liquida un recargo automático de $1.500 COP por kilómetro adicional.",
      },
    ],
    ctaText: "Adquirir Pack Express 6K",
    whatsappMsg:
      "Hola ÆON Fleet, quiero adquirir el Pack Express 6K ($100.000 COP por 10 envíos de hasta 6km). Deseo validar la distancia e iniciar mi activación.",
  },
  {
    id: "metropolitano12k",
    badge: "COBERTURA EXTENDIDA • PACK 10 ENVÍOS",
    unitPrice: "$17.000 COP / envío",
    title: "Pack Metropolitano 12K ",
    titleHighlight: "(10 Envíos)",
    description:
      "Cobertura metropolitana extendida para trayectos de hasta 12 km en todo el Área Metropolitana.",
    totalPrice: "$170.000",
    unitLabel: "COP / Total (10 Cupones)",
    popular: false,
    microBadges: [
      { icon: "gps", text: "📍 Medición GPS Exacta" },
      { icon: "zap", text: "⚡ Gestor Flota Dedicado" },
      { icon: "shield", text: "🛡️ Cobertura Metropolitana" },
    ],
    keyFeatures: [
      "10 Envíos prepagados a $17.000 COP por trayecto",
      "Cobertura incluida: Hasta 12,0 KM (Toda el Área Metropolitana)",
      "Atención preferencial y reporte consolidado",
    ],
    rules: [
      {
        title: "Cobertura Metropolitana (Hasta 12,0 KM):",
        description:
          "Cobertura amplia en todo el Valle de Aburrá en trayectos urbanos de hasta 12,0 km por envío.",
      },
      {
        title: "Regla del Punto Cero:",
        description:
          "La distancia se calcula sumando la ubicación del punto de recogida exacto más la dirección final de entrega.",
      },
      {
        title: "Cláusula de Excedente ($1.500 COP / KM extra):",
        description:
          "Rutas que rebasen los 12,0 km aplican recargo automático de $1.500 COP por kilómetro adicional sobre la ruta.",
      },
    ],
    ctaText: "Adquirir Pack Metropolitano 12K",
    whatsappMsg:
      "Hola ÆON Fleet, quiero adquirir el Pack Metropolitano 12K ($170.000 COP por 10 envíos de hasta 12km). Deseo propuesta e iniciar mi activación.",
  },
];

function PackRichCard({ pack, index }: { pack: PackItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  // Distinct Neon Themes per Pack
  const isCorporate = pack.popular || pack.id === "express6k";
  const isEnterprise = pack.id === "metropolitano12k";

  const theme = isCorporate
    ? {
        border: "border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.3)] bg-gradient-to-b from-cyan-500/15 via-[#0A0E17] to-[#000000]",
        badgeBg: "bg-cyan-400 text-black border-cyan-400 font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.4)]",
        priceColor: "text-cyan-300 font-black",
        titleHighlight: "text-cyan-400",
        iconBg: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30",
        checkColor: "text-cyan-400",
        accordionText: "text-cyan-300 hover:text-cyan-200",
        btnGradient: "bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-black shadow-cyan-400/25",
        glowBg: "bg-cyan-400/15",
      }
    : isEnterprise
    ? {
        border: "border-violet-400/40 hover:border-violet-400/90 shadow-[0_0_35px_rgba(168,85,247,0.18)] bg-gradient-to-b from-violet-500/10 via-[#0E0A17] to-[#000000]",
        badgeBg: "text-violet-300 bg-violet-500/15 border-violet-400/40 font-bold",
        priceColor: "text-violet-300 font-black",
        titleHighlight: "text-violet-400",
        iconBg: "bg-violet-400/15 text-violet-300 border-violet-400/30",
        checkColor: "text-violet-400",
        accordionText: "text-violet-300 hover:text-violet-200",
        btnGradient: "bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:from-violet-300 hover:to-fuchsia-300 text-black shadow-violet-400/25",
        glowBg: "bg-violet-400/15",
      }
    : {
        border: "border-amber-400/40 hover:border-amber-400/90 shadow-[0_0_35px_rgba(245,158,11,0.18)] bg-gradient-to-b from-amber-500/10 via-[#14100A] to-[#000000]",
        badgeBg: "text-amber-400 bg-amber-400/10 border-amber-400/30 font-bold",
        priceColor: "text-amber-400 font-black",
        titleHighlight: "text-amber-400",
        iconBg: "bg-amber-400/15 text-amber-300 border-amber-400/30",
        checkColor: "text-amber-400",
        accordionText: "text-amber-400 hover:text-amber-300",
        btnGradient: "bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black shadow-amber-400/25",
        glowBg: "bg-amber-400/15",
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`relative overflow-hidden border rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 ${theme.border}`}
    >
      {/* Glow corner accent */}
      <div className={`absolute -top-16 -right-16 w-32 h-32 ${theme.glowBg} rounded-full blur-2xl pointer-events-none`} />

      <div>
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${theme.badgeBg}`}>
            {pack.badge}
          </span>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded">
            {pack.unitPrice}
          </span>
        </div>

        {/* Title & Pricing */}
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            {pack.title}
            <span className={theme.titleHighlight}>{pack.titleHighlight}</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4 font-mono">
            {pack.description}
          </p>

          <div className="flex items-baseline gap-2 pt-2 border-t border-white/10">
            <span className={`text-3xl sm:text-4xl tracking-tight ${theme.priceColor}`}>
              {pack.totalPrice}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              {pack.unitLabel}
            </span>
          </div>
        </div>

        {/* Visual Badges / Micro-Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          {pack.microBadges.map((mb, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2"
            >
              <div className={`p-1 rounded-lg ${theme.iconBg} shrink-0`}>
                {mb.icon === "gps" && <MapPin size={14} />}
                {mb.icon === "zap" && <Zap size={14} />}
                {mb.icon === "shield" && <ShieldCheck size={14} />}
              </div>
              <span className="text-[10px] font-bold text-slate-200 leading-tight font-mono">
                {mb.text}
              </span>
            </div>
          ))}
        </div>

        {/* Key Included Features list */}
        <ul className="space-y-2 mb-6 text-xs text-slate-300 font-mono">
          {pack.keyFeatures.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle2 size={14} className={`${theme.checkColor} shrink-0`} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Accordion / Collapsible for Policies and Excess */}
        <div className="border border-white/15 rounded-xl bg-[#0B0E14] overflow-hidden mb-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full p-3.5 px-4 flex items-center justify-between text-left text-xs font-bold ${theme.accordionText} hover:bg-white/5 transition-colors cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <Compass size={15} />
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
                className="border-t border-white/10 p-4 space-y-3 text-xs text-slate-300 bg-[#080B10]"
              >
                {pack.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className={`${theme.checkColor} font-bold shrink-0 mt-0.5`}>
                      ●
                    </span>
                    <div>
                      <strong className="text-white block font-bold mb-0.5">
                        {rule.title}
                      </strong>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-mono">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-300 italic">
                  <AlertTriangle
                    size={12}
                    className={`shrink-0 ${theme.checkColor}`}
                  />
                  <span>
                    Vigencia del pack: 30 días calendario contados desde el
                    día de compra.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Call To Action (Forced to bottom with mt-auto) */}
      <div className="mt-auto space-y-2.5 pt-2">
        <a
          href={`https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(
            pack.whatsappMsg
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider ${theme.btnGradient} shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] cursor-pointer min-h-[48px]`}
        >
          <Send size={16} />
          <span>{pack.ctaText}</span>
        </a>

        {/* Micro-Note below CTA */}
        <div className="flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-400 pt-1">
          <HelpCircle size={12} className={`${theme.checkColor} shrink-0`} />
          <span>
            ¿Dudas con la distancia de tu dirección? Te asesoramos en 10 segundos por WhatsApp.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function B2BPacks() {
  return (
    <section
      id="packs"
      className="py-20 sm:py-28 bg-[#000000] border-b border-white/10 relative overflow-hidden font-mono"
    >
      {/* Glow background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-400/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Cabecera de la Sección */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-amber-400 uppercase tracking-widest mb-3 px-3.5 py-1.5 border border-amber-500/25 rounded-full bg-amber-500/10 font-bold">
            Flota Operativa B2B
          </span>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
            Packs Prepagados con <br className="hidden sm:inline" />
            <span className="text-amber-400 italic font-normal">
              Vigencia Estricta
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Elimina cobros sorpresivos y blinda tu operación logística con
            tarifas por kilómetro real y control de tiempo exacto.
          </p>
        </motion.div>

        {/* Grilla de los 3 Packs en Formato Ultra-Lujo Idéntico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {PACKS_DATA.map((pack, index) => (
            <PackRichCard key={pack.id} pack={pack} index={index} />
          ))}
        </div>

        {/* Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-400/20 via-[#0A0A0C] to-amber-400/20 border border-amber-400/40 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.15)]"
        >
          <div className="max-w-2xl mx-auto font-mono">
            <span className="inline-block font-mono text-xs text-amber-400 uppercase tracking-widest mb-3 font-bold">
              🔴 ATENCIÓN EN TIEMPO REAL • FLOTA EN MEDELLÍN
            </span>
            <h3 className="font-mono text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              ¿Listo para enviar con cero fricción y tarifa congelada?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-8 leading-relaxed">
              Coordinamos tu recogida en menos de 45 minutos con mensajeros en
              Boxer Negra y trazabilidad en tiempo real.
            </p>

            <a
              href="https://api.whatsapp.com/send?phone=573012964584&text=Hola%20%C3%86ON%20Fleet%2C%20quiero%20COTIZAR%20MI%20RUTA%20AHORA%20mismo%20para%20un%20despacho%20en%20Medell%C3%ADn."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-2xl shadow-amber-400/30 hover:scale-[1.02] transition-all cursor-pointer min-h-[48px]"
            >
              <Send size={18} />
              <span>COTIZAR Y DESPACHAR MI RUTA AHORA (WHATSAPP) ➔</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


