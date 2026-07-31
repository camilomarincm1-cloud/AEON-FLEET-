import { useState, useEffect } from 'react';

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    const isMobile = window.innerWidth <= 768;
    const alreadyShown = sessionStorage.getItem('exitPopupShown');

    if (!isMobile && !alreadyShown) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-[90%] max-w-md bg-gray-900 border border-cyan-500/50 rounded-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] p-8 text-center animate-fade-in-up">
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="mx-auto w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-400/30">
          <span className="text-3xl">⚠️</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          ¿Te vas sin asegurar tu envío?
        </h2>
        
        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
          No pierdas tiempo llenando formularios. Envíanos las direcciones por WhatsApp y <strong className="text-cyan-400">nosotros armamos la ruta y tarifa por ti en 2 minutos.</strong>
        </p>

        <a 
          href="https://wa.me/573012964584?text=%C2%A1Hola!%20No%20quiero%20llenar%20el%20formulario.%20%C2%BFMe%20ayudan%20a%20programar%20un%20env%C3%ADo%20r%C3%A1pidamente%3F" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg py-4 px-6 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
          onClick={() => setIsVisible(false)}
        >
          ⚡ Coordinar Rápido por WhatsApp
        </a>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 underline transition-colors"
        >
          No, prefiero perder tiempo y hacerlo yo mismo.
        </button>
      </div>
    </div>
  );
}
