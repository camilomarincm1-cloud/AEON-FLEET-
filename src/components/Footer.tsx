import { AeonLogo } from "./ScrambleEffects";

interface FooterProps {
  setCurrentView: (view: 'home' | 'policies' | 'testimonials' | 'calculator' | 'methodology' | 'order') => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const handleNavClick = (sectionId: string) => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <footer className="bg-[#000000] text-slate-400 border-t border-white/10 font-mono py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
        
        {/* Brand & Tagline */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <AeonLogo className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-xl tracking-tight text-white uppercase font-mono">
              ÆON Fleet
            </span>
          </div>
          <p className="text-slate-300 text-sm max-w-md font-mono leading-relaxed">
            La próxima evolución de la interacción comercial B2B.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
          <button onClick={() => handleNavClick('inicio')} className="hover:text-amber-400 transition-colors cursor-pointer">
            #inicio
          </button>
          <button onClick={() => handleNavClick('despachar')} className="hover:text-amber-400 transition-colors cursor-pointer">
            #despachar
          </button>
          <button onClick={() => handleNavClick('packs')} className="hover:text-amber-400 transition-colors cursor-pointer">
            #packs
          </button>
          <button onClick={() => handleNavClick('metodologia')} className="hover:text-amber-400 transition-colors cursor-pointer">
            #metodologia
          </button>
          <button onClick={() => handleNavClick('reglas')} className="hover:text-amber-400 transition-colors cursor-pointer">
            #reglas
          </button>
          <button onClick={() => handleNavClick('testimonios')} className="hover:text-amber-400 transition-colors cursor-pointer">
            #testimonios
          </button>
        </div>

      </div>

      {/* Copyright Row */}
      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-4">
        <span>© 2026 ÆON Fleet. Todos los derechos reservados.</span>
        <span>Medellín • Valle de Aburrá • Flota VIP</span>
      </div>
    </footer>
  );
}
