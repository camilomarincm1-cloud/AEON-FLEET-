import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ShieldCheck, Eye, Lock, ArrowDown } from "lucide-react";
import { ScrambleIn } from "./ScrambleEffects";

interface HeroProps {
  setCurrentView?: (view: 'home' | 'policies' | 'testimonials' | 'calculator' | 'methodology' | 'order') => void;
}

export default function Hero({ setCurrentView }: HeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Auto-play fallback
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollToCalculator = () => {
    const el = document.getElementById('despachar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-32 border-b border-white/10 overflow-hidden min-h-[88vh] flex items-center bg-[#000000]"
    >
      {/* Background Video — High-quality Boxer Negra in Medellín Night */}
      <video
        ref={heroVideoRef}
        className="absolute inset-0 w-full h-full object-cover object-[position:center_top] sm:object-center pointer-events-none opacity-50 z-0"
        autoPlay
        muted
        loop
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
      />

      {/* OVERLAY BG-BLACK/70 FOR 100% LEGIBILITY & VISUAL DEPTH */}
      <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-0 pointer-events-none" />

      {/* Subtle Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#06B6D4 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div style={{ y: y1, opacity }} className="flex flex-col items-start">
            
            {/* Ticker / Active Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(6,182,212,0.25)] font-bold backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
              <span>🔴 MEDELLÍN • FLOTA EN OPERACIÓN CONTINUA</span>
            </motion.div>

            {/* Imposing H1 Headline */}
            <h1 className="font-mono text-3xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] sm:leading-[1.05] tracking-tight text-white mb-6 drop-shadow-2xl">
              <span className="block text-white">
                <ScrambleIn text="Mensajería Express & Envíos" delay={100} />
              </span>
              <span className="text-cyan-400 italic font-normal block mt-1 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                <ScrambleIn text="Garantizados en Medellín." delay={300} />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-300 font-mono leading-relaxed mb-8 max-w-2xl drop-shadow-md">
              Despachos seguros en el Valle de Aburrá con asignación en menos de 5 minutos, rastreo en tiempo real y recaudo contra entrega el mismo día.
            </p>

            {/* Main CTA Button — Smooth Scroll to #despachar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-black font-extrabold text-xs sm:text-base font-mono uppercase tracking-wider py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer min-h-[54px]"
              >
                <span>CALCULAR TARIFA Y PEDIR ENVÍO</span>
                <ArrowDown size={18} className="animate-bounce shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const packsEl = document.getElementById('packs');
                  if (packsEl) packsEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#080B10] hover:bg-cyan-500/10 text-white border border-cyan-400/30 hover:border-cyan-400/80 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[54px]"
              >
                <span>VER PACKS DE AHORRO B2B</span>
              </button>
            </div>

            {/* Operational Guarantees Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full bg-[#080B10]/90 border border-cyan-500/30 p-4 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-emerald-400 font-bold">
                <ShieldCheck size={16} className="shrink-0" />
                <span>Seguro de Carga $1.000.000 COP</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-cyan-300 font-bold">
                <Eye size={16} className="shrink-0" />
                <span>Rastreo GPS en Tiempo Real</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-white font-bold">
                <Lock size={16} className="text-cyan-400 shrink-0" />
                <span>Entrega Directa Sin Escalas</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
