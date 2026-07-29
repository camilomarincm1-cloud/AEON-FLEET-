import { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { MapPin, Navigation, Package, Clock, ShieldCheck, CheckCircle2, Phone, Star } from "lucide-react";

export default function LiveTrackingMock() {
  const [step, setStep] = useState(2); // 0: Preparando, 1: Recogido, 2: En Camino, 3: Entregado

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 6000); // Loop through steps every 6 seconds for demo purposes
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 sm:py-32 border-b border-gold/15 bg-ink relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-rust/5 blur-[80px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block font-mono text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-4 px-3 py-1 border border-gold/20 rounded-full bg-gold/5">
              Experiencia del Cliente
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-parchment leading-tight mb-6">
              Trazabilidad <span className="text-gold-bright italic font-normal">Premium</span> <br/>
              en Tiempo Real.
            </h2>
            <p className="text-base sm:text-lg text-slate-dim leading-relaxed mb-8">
              Elimina la ansiedad de tus compradores y reduce los mensajes de soporte. Con nuestra tecnología de rastreo, tu cliente sabrá exactamente dónde está su pedido con precisión GPS en todo el Valle de Aburrá.
            </p>
            
            <ul className="flex flex-col gap-5 mb-10">
              {[
                "Link de rastreo enviado automáticamente por SMS/WhatsApp.",
                "Perfil del courier VIP y vehículo asignado visible.",
                "ETA (Tiempo Estimado de Llegada) dinámico en minutos.",
                "Confirmación fotográfica al momento de la entrega."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-gold-bright" />
                  </div>
                  <span className="text-sm sm:text-base text-parchment">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Interactive Mock Mobile Device */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-[320px] sm:w-[360px] h-[640px] bg-ink border-[6px] border-ink-light rounded-[40px] shadow-2xl overflow-hidden flex flex-col group ring-1 ring-gold/20">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-ink-light rounded-b-2xl z-50" />

              {/* Top Header */}
              <div className="pt-10 pb-4 px-6 bg-ink-light/80 backdrop-blur-md z-40 border-b border-gold/10 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono uppercase text-slate-dim">Orden #AE-4920</span>
                  <span className="text-sm font-bold text-parchment font-serif">Tu Pedido</span>
                </div>
                <div className="font-serif text-xl font-bold text-gold-bright">Æ</div>
              </div>

              {/* Map Area */}
              <div className="relative flex-1 bg-[#1a1d27] overflow-hidden">
                {/* Stylized Map Background (Waze / GMaps style) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <svg viewBox="0 0 360 400" className="w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
                    {/* River (Medellín River mock) */}
                    <path d="M 120 -50 C 140 100, 90 200, 100 300 C 110 400, 130 450, 130 450" stroke="#3b82f6" strokeWidth="16" fill="none" opacity="0.4" strokeLinecap="round" />
                    {/* Parks / Green Areas */}
                    <path d="M 220 30 Q 260 10, 290 60 Q 320 110, 250 140 Q 190 120, 220 30" fill="#22c55e" opacity="0.15" />
                    <path d="M -10 260 Q 40 230, 70 290 Q 90 340, 30 360 Q -30 330, -10 260" fill="#22c55e" opacity="0.15" />
                    <path d="M 280 280 Q 320 250, 360 280 L 360 380 Q 300 350, 280 280" fill="#22c55e" opacity="0.1" />
                    {/* Arterial Roads */}
                    <path d="M -50 140 C 100 120, 200 80, 400 40" stroke="rgba(200,160,83,0.3)" strokeWidth="6" fill="none" />
                    <path d="M 160 -50 C 180 150, 200 250, 240 450" stroke="rgba(200,160,83,0.3)" strokeWidth="6" fill="none" />
                    <path d="M -20 350 C 150 320, 250 340, 380 300" stroke="rgba(200,160,83,0.3)" strokeWidth="6" fill="none" />
                    {/* Minor Roads Grid (stylized) */}
                    <path d="M 20 0 L 100 400" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
                    <path d="M 80 0 L 160 400" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
                    <path d="M 220 0 L 300 400" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
                    <path d="M 280 0 L 360 400" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
                    <path d="M 0 80 L 360 50" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
                    <path d="M 0 200 L 360 170" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
                    <path d="M 0 300 L 360 270" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
                  </svg>
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#131620_100%)] pointer-events-none" />
                </div>
                
                {/* Route SVG */}
                <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 360 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dark base for the route (Waze style) */}
                  <path d="M 60 320 C 120 300, 150 250, 180 200 C 210 150, 250 100, 280 60" stroke="#131620" strokeWidth="8" strokeLinecap="round" />
                  {/* Dashed placeholder route */}
                  <path d="M 60 320 C 120 300, 150 250, 180 200 C 210 150, 250 100, 280 60" stroke="rgba(200, 160, 83, 0.3)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" />
                  
                  {/* Animated Path fill */}
                  <motion.path 
                    d="M 60 320 C 120 300, 150 250, 180 200 C 210 150, 250 100, 280 60" 
                    stroke="#C8A053" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: step >= 2 ? (step === 3 ? 1 : 0.6) : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="drop-shadow-[0_0_8px_rgba(200,160,83,0.8)]"
                  />
                </svg>

                {/* Origin Marker */}
                <div className="absolute left-[50px] top-[310px] z-20 flex flex-col items-center">
                  <div className="relative">
                    {/* Pulse Effect */}
                    {(step === 0 || step === 1) && (
                      <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75" />
                    )}
                    <div className="relative w-5 h-5 rounded-full bg-ink border-2 border-gold flex items-center justify-center z-10 shadow-lg shadow-gold/20">
                      <Package size={10} className="text-gold" />
                    </div>
                  </div>
                  <span className="text-[8px] font-mono mt-1 text-slate-dim bg-ink/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-gold/10">Origen (El Poblado)</span>
                </div>

                {/* Destination Marker */}
                <div className="absolute left-[270px] top-[45px] z-20 flex flex-col items-center">
                  <div className="relative">
                    {/* Pulse Effect */}
                    {step === 3 ? (
                      <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
                    ) : (
                      <div className="absolute inset-0 bg-gold-bright rounded-full animate-ping opacity-50" />
                    )}
                    <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 shadow-lg transition-colors duration-500 ${
                      step === 3 ? "bg-emerald-500/20 border-emerald-400 shadow-emerald-500/30" : "bg-gold/10 border-gold-bright shadow-gold-bright/30"
                    }`}>
                      <MapPin size={12} className={step === 3 ? "text-emerald-400" : "text-gold-bright"} />
                    </div>
                  </div>
                  <span className={`text-[8px] font-mono mt-1 px-1.5 py-0.5 rounded font-bold border transition-colors duration-500 ${
                    step === 3 ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30" : "text-parchment bg-ink/90 backdrop-blur-sm border-gold/20"
                  }`}>Destino (Laureles)</span>
                </div>

                {/* Moving Bike Marker */}
                {step >= 2 && (
                  <motion.div 
                    className="absolute z-30 flex flex-col items-center drop-shadow-xl"
                    initial={{ left: 60, top: 320, opacity: 0 }}
                    animate={step === 3 
                      ? { left: 270, top: 45, opacity: 1 } 
                      : { left: 175, top: 205, opacity: 1 }
                    }
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gold blur-md opacity-60 rounded-full" />
                      <div className="w-8 h-8 bg-ink border-2 border-gold-bright rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(200,160,83,0.5)] relative z-10">
                        <Navigation size={14} className="text-gold-bright drop-shadow-[0_0_2px_#C8A053]" style={{ transform: 'rotate(45deg)' }} />
                      </div>
                      
                      {/* ETA Tooltip on the marker */}
                      {step === 2 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gold text-ink font-bold text-[9px] px-2 py-1 rounded whitespace-nowrap shadow-lg animate-bounce">
                          14 min
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gold" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Bottom Info Card */}
              <div className="bg-ink-light z-40 rounded-t-3xl border-t border-gold/20 p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-parchment">
                      {step === 0 ? "Preparando" : step === 1 ? "Recogido" : step === 2 ? "En camino a tu dirección" : "Entregado"}
                    </span>
                    <span className="text-[10px] text-slate-dim font-mono">
                      {step === 3 ? "Completado" : "Llegada est. 2:45 PM"}
                    </span>
                  </div>
                  <div className="bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    {step < 3 ? (
                      <Clock size={12} className="text-gold animate-pulse" />
                    ) : (
                      <ShieldCheck size={12} className="text-emerald-400" />
                    )}
                    <span className={`text-[10px] font-mono font-bold uppercase ${step === 3 ? "text-emerald-400" : "text-gold"}`}>
                      {step === 3 ? "100%" : "14 MIN"}
                    </span>
                  </div>
                </div>

                {/* Progress Line */}
                <div className="flex gap-1 mb-5">
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                        step >= i ? "bg-gold" : "bg-ink border border-gold/10"
                      }`} 
                    />
                  ))}
                </div>

                {/* Courier Profile */}
                <div className="flex items-center gap-3 bg-ink border border-gold/10 p-3 rounded-xl mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0 border border-gold/30 overflow-hidden relative">
                    {/* Placeholder for courier face, using an abstract icon for now */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-ink to-ink-light" />
                    <svg className="w-6 h-6 text-gold-bright relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-parchment block">Carlos M. (Courier VIP)</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-gold-bright fill-gold-bright" />
                      <span className="text-[10px] font-mono text-slate-dim">4.9 • Placa ABC-12D</span>
                    </div>
                  </div>
                <a 
                  href="tel:+573012964584"
                  className="w-8 h-8 rounded-full bg-ink-light border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                  title="Llamar al courier"
                >
                  <Phone size={12} />
                </a>
              </div>

              {/* Action button */}
              <a 
                href={step === 3 ? "#" : "https://api.whatsapp.com/send?phone=573012964584&text=Hola,%20tengo%20una%20consulta%20sobre%20el%20pedido%20%23AE-4920"}
                target={step === 3 ? "_self" : "_blank"}
                rel="noopener noreferrer"
                onClick={(e) => { if (step === 3) e.preventDefault(); }}
                className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center ${
                step === 3 
                  ? "bg-ink border border-gold/20 text-gold hover:bg-gold/5 cursor-pointer" 
                  : "bg-gold text-ink hover:bg-gold-bright"
              }`}>
                {step === 3 ? "Ver comprobante (Demo)" : "Contactar Soporte"}
              </a>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
