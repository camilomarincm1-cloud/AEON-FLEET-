import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Map } from 'lucide-react';

const TOUR_STEPS = [
  {
    id: 'tour-pricing',
    title: 'Planes y Tarifas',
    content: 'Descubre nuestros paquetes diseñados para tu necesidad con precio 100% blindado y alta prioridad.',
  },
  {
    id: 'tour-order',
    title: 'Crea tu Pedido',
    content: 'En esta sección podrás registrar la recogida, destino y los datos de tu cliente de forma rápida y sin fricción.',
  }
];

export default function TourGuide() {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [dismissedSteps, setDismissedSteps] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem('aeon-tour-dismissed');
    if (stored) {
      try {
        setDismissedSteps(JSON.parse(stored));
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const handleScroll = () => {
      let foundStep: string | null = null;
      let foundRect: DOMRect | null = null;

      for (const step of TOUR_STEPS) {
        if (dismissedSteps.includes(step.id)) continue;

        const el = document.getElementById(step.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Show tooltip when element is nicely visible in the viewport
          if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
            foundStep = step.id;
            foundRect = rect;
            break; // Show only one at a time
          }
        }
      }

      setActiveStepId(foundStep);
      setTargetRect(foundRect);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [dismissedSteps, hasMounted]);

  const handleDismiss = (id: string) => {
    const updated = [...dismissedSteps, id];
    setDismissedSteps(updated);
    localStorage.setItem('aeon-tour-dismissed', JSON.stringify(updated));
    setActiveStepId(null);
    setTargetRect(null);
  };

  const handleDismissAll = () => {
    const allIds = TOUR_STEPS.map(s => s.id);
    setDismissedSteps(allIds);
    localStorage.setItem('aeon-tour-dismissed', JSON.stringify(allIds));
    setActiveStepId(null);
    setTargetRect(null);
  };

  if (!hasMounted) return null;
  if (dismissedSteps.length === TOUR_STEPS.length) return null;

  const activeStep = TOUR_STEPS.find(s => s.id === activeStepId);
  const discoveredCount = dismissedSteps.length;
  const totalCount = TOUR_STEPS.length;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <AnimatePresence>
        {activeStep && targetRect && (
          <motion.div
            key={`highlight-${activeStep.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed border-2 border-gold rounded-xl shadow-[0_0_30px_rgba(200,160,83,0.3)] pointer-events-none z-[101] bg-gold/5"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
            }}
          >
             <div className="absolute -top-3 -right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <Map size={12} className="text-ink" />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeStep && (
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 sm:bottom-12 left-4 right-4 sm:left-auto sm:right-12 z-[102] pointer-events-auto bg-ink-light border border-gold/30 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(200,160,83,0.15)] max-w-sm p-6"
          >
            {/* Close Button */}
            <button 
              onClick={() => handleDismiss(activeStep.id)}
              className="absolute top-4 right-4 text-slate-dim hover:text-white transition-colors"
              title="Cerrar tip"
            >
              <X size={16} />
            </button>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-gold-bright uppercase tracking-wider">
                Tip de Exploración
              </span>
              <span className="text-[10px] font-mono text-slate-dim bg-ink px-2 py-0.5 rounded-full border border-slate-dim/30">
                {discoveredCount} / {totalCount} Descubiertos
              </span>
            </div>
            
            <h3 className="font-serif text-xl text-parchment mb-2">{activeStep.title}</h3>
            <p className="text-sm text-slate-dim mb-6 leading-relaxed">{activeStep.content}</p>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => handleDismiss(activeStep.id)}
                className="w-full flex items-center justify-center gap-2 bg-gold text-ink px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors shadow-lg shadow-gold/20"
              >
                Entendido <Check size={14} />
              </button>
              <button
                onClick={handleDismissAll}
                className="w-full py-1.5 text-[10px] text-slate-dim hover:text-white transition-colors uppercase tracking-wider"
              >
                Omitir todo el tour
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
