import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MultiStopCalculator from "./components/MultiStopCalculator";
import B2BPacks from "./components/B2BPacks";
import MethodologySection from "./components/MethodologySection";
import RulesSection from "./components/RulesSection";
import Testimonials from "./components/Testimonials";
import OrderSheet from "./components/OrderSheet";
import FaqAndPolicies from "./components/FaqAndPolicies";
import VolumeCalculator from "./components/VolumeCalculator";
import Footer from "./components/Footer";
import StickyCta from "./components/StickyCta";
import TourGuide from "./components/TourGuide";

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'policies' | 'testimonials' | 'calculator' | 'methodology' | 'order'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="bg-[#030508] min-h-screen text-white font-mono selection:bg-cyan-500/30 selection:text-cyan-300 overflow-x-hidden">
      {/* Tour Guide Overlay (for new visitors) */}
      <TourGuide />

      {/* Fixed Capsule Header & Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Continuous Conversion Funnel Flow */}
      <main className="relative pt-20">
        {currentView === 'home' && (
          <>
            {/* SECTION 1: HERO (ID: #inicio) */}
            <Hero setCurrentView={setCurrentView} />

            {/* SECTION 2: MOTOR FINANCIERO / COTIZADOR (ID: #despachar) */}
            <section id="despachar" className="py-16 sm:py-24 bg-[#050810] bg-texture-cyan-grid border-t border-cyan-500/30 relative z-20 overflow-hidden">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <MultiStopCalculator />
              </div>
            </section>

            {/* SECTION 3: ESCALABILIDAD B2B (ID: #packs) */}
            <B2BPacks />

            {/* SECTION 4: METODOLOGÍA (ID: #metodologia) */}
            <MethodologySection />

            {/* SECTION 5: REGLAS DE OPERACIÓN (ID: #reglas) */}
            <RulesSection />

            {/* SECTION 6: AUTORIDAD OPERATIVA / TESTIMONIOS (ID: #testimonios) */}
            <Testimonials />
          </>
        )}

        {/* Subpage: Registro Directo de Despacho */}
        {currentView === 'order' && (
          <div className="bg-[#030508] bg-texture-grid min-h-[80vh] py-12 font-mono">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 text-center">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2 font-bold">
                FORMULARIO DIRECTO DE DESPACHO
              </span>
              <h1 className="text-3xl sm:text-5xl font-mono font-bold text-white mb-3">
                Hoja de Registro de <span className="text-cyan-400 italic font-normal">Despacho VIP</span>
              </h1>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                Completa los datos de envío para agendar la recogida inmediata con nuestro mensajero VIP en Moto Boxer Negra.
              </p>
            </div>
            <OrderSheet />
          </div>
        )}

        {/* Subpage: Metodología Interactiva */}
        {currentView === 'methodology' && (
          <div className="bg-[#030508] bg-texture-violet-grid min-h-[70vh] py-12 font-mono">
            <MethodologySection />
          </div>
        )}

        {/* Subpage: Políticas y FAQ */}
        {currentView === 'policies' && (
          <div className="bg-[#030508] bg-texture-emerald-grid min-h-[70vh] font-mono">
            <FaqAndPolicies />
          </div>
        )}

        {/* Subpage: Testimonios */}
        {currentView === 'testimonials' && (
          <div className="bg-[#030508] bg-texture-cyan-grid min-h-[70vh] py-12 font-mono">
            <Testimonials />
          </div>
        )}

        {/* Subpage: Calculadora de Ahorro */}
        {currentView === 'calculator' && (
          <div className="bg-[#030508] bg-texture-grid min-h-[70vh] py-12 font-mono">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white mb-4">Calculadora de Ahorro</h2>
                <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                  Descubre cuánto dinero puedes ahorrar al mes utilizando nuestros planes VIP con tarifa blindada frente a enviar suelto.
                </p>
              </div>
              <VolumeCalculator />
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer setCurrentView={setCurrentView} />
      
      {/* Fixed WhatsApp Floating Action Button & Sticky CTA */}
      <StickyCta setCurrentView={setCurrentView} />
    </div>
  );
}
