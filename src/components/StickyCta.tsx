import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StickyCtaProps {
  setCurrentView: (view: 'home' | 'policies' | 'testimonials' | 'calculator' | 'methodology' | 'order') => void;
}

export default function StickyCta({ setCurrentView }: StickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Sticky CTA (Bottom Left - Agendar Envío) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-50 pointer-events-auto"
          >
            <button
              onClick={() => {
                const el = document.getElementById('despachar');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else {
                  setCurrentView('home');
                  setTimeout(() => {
                    document.getElementById('despachar')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-mono font-extrabold text-[10px] sm:text-xs uppercase tracking-wider py-2.5 px-3.5 sm:px-5 rounded-full shadow-2xl shadow-amber-400/20 transition-all hover:-translate-y-0.5 border border-amber-400/50 cursor-pointer min-h-[44px]"
            >
              <MessageSquare size={14} />
              <span className="hidden sm:inline font-bold">Cotizar y Despachar</span>
              <span className="sm:hidden font-bold">Despachar</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Green WhatsApp Floating Button: fixed bottom-6 right-6 z-50 w-14 h-14 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-auto">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-[#0A0A0C] border border-amber-400/30 px-3.5 py-2 rounded-xl text-xs font-mono text-white shadow-2xl whitespace-nowrap hidden sm:block"
            >
              Despacho inmediato por WhatsApp
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href="https://api.whatsapp.com/send?phone=573012964584&text=Hola%2C%20%C3%86ON%20Fleet.%20Necesito%20agendar%20un%20servicio%20de%20despacho%20inmediato."
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-105 cursor-pointer shrink-0 border border-white/20"
          aria-label="Escribir por WhatsApp"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.534 5.876L0 24l6.29-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.214-3.732.897.936-3.622-.235-.372A9.818 9.818 0 0112 2.182c5.427 0 9.818 4.391 9.818 9.818 0 5.428-4.391 9.818-9.818 9.818z" />
          </svg>
        </a>
      </div>
    </>
  );
}
