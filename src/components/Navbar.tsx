import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { ScrambleText, AeonLogo, SquashHamburger } from "./ScrambleEffects";

interface NavbarProps {
  currentView: 'home' | 'policies' | 'testimonials' | 'calculator' | 'methodology' | 'order';
  setCurrentView: (view: 'home' | 'policies' | 'testimonials' | 'calculator' | 'methodology' | 'order') => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const medellinTime = new Date(utc + 3600000 * -5);
      
      const hours = medellinTime.getHours();
      const minutes = medellinTime.getMinutes();
      
      setCurrentTime(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionId: string, view?: 'home' | 'policies' | 'testimonials' | 'calculator' | 'methodology' | 'order') => {
    setMenuOpen(false);
    if (view && view !== 'home') {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: "Inicio", sectionId: "inicio", key: "inicio" },
    { label: "Despachar", sectionId: "despachar", key: "despachar" },
    { label: "Packs B2B", sectionId: "packs", key: "packs" },
    { label: "Metodología", sectionId: "metodologia", key: "metodologia" },
    { label: "Reglas", sectionId: "reglas", key: "reglas" },
    { label: "Testimonios", sectionId: "testimonios", key: "testimonios" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full h-20 z-50 px-3 sm:px-6 md:px-8 flex items-center justify-between pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Group: Logo Pill + Capsule Menu */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        {/* Brand Logo Pill */}
        <motion.button
          type="button"
          onClick={() => handleNavClick("inicio")}
          className={`h-10 sm:h-12 px-3.5 sm:px-5 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-2.5 cursor-pointer shadow-2xl shadow-black/80 ${
            menuOpen ? "hidden md:flex" : "flex"
          }`}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(10, 10, 12, 0.95)", borderColor: "rgba(245, 158, 11, 0.5)" }}
          whileTap={{ scale: 0.98 }}
        >
          <AeonLogo className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          <div className="flex flex-col text-left">
            <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-tight uppercase leading-none font-mono">
              ÆON Fleet
            </span>
            <span className="text-[9px] text-slate-400 font-mono tracking-widest mt-0.5 uppercase hidden sm:inline">
              Logística VIP Medellín
            </span>
          </div>
        </motion.button>

        {/* Expanding Capsule Menu */}
        <motion.div
          className="h-10 sm:h-12 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl flex items-center overflow-hidden shadow-2xl shadow-black/80"
          animate={{
            width: menuOpen
              ? typeof window !== "undefined" && window.innerWidth < 640
                ? "calc(100vw - 120px)"
                : "520px"
              : "48px",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        >
          {/* Hamburger Trigger */}
          <div
            className={`flex items-center justify-center transition-all ${
              menuOpen
                ? "w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400/15 border border-amber-400/30 ml-1.5 shrink-0"
                : "w-10 h-10 sm:w-12 sm:h-12"
            }`}
          >
            <SquashHamburger isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>

          {/* Expanded Links inside Capsule */}
          {menuOpen && (
            <motion.div
              className="flex items-center gap-3 sm:gap-5 ml-2 sm:ml-4 pr-3 sm:pr-4 overflow-x-auto no-scrollbar py-1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.sectionId)}
                  onMouseEnter={() => setHoveredLink(item.key)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-xs sm:text-sm font-mono whitespace-nowrap transition-colors cursor-pointer font-medium text-slate-300 hover:text-amber-400"
                >
                  <ScrambleText text={item.label} isHovered={hoveredLink === item.key} />
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Right Group: Status Ticker + Primary Action Pill */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        {/* Medellín Status Ticker */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-amber-400 shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>MDE {currentTime} • FLOTA VIP ACTIVA</span>
        </div>

        {/* Dispatch Action Button: "AGENDAR AHORA" -> Scroll to #despachar */}
        <motion.button
          type="button"
          onClick={() => handleNavClick("despachar")}
          onMouseEnter={() => setHoveredLink("dispatch-btn")}
          onMouseLeave={() => setHoveredLink(null)}
          className="h-10 sm:h-12 px-4 sm:px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-xl shadow-amber-400/20 transition-all cursor-pointer border border-amber-400/40"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Send className="w-4 h-4 text-black" />
          <ScrambleText
            text="AGENDAR AHORA"
            isHovered={hoveredLink === "dispatch-btn"}
            className="font-bold tracking-wider"
          />
        </motion.button>
      </div>
    </motion.nav>
  );
}
