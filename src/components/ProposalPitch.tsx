import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  Share2,
  Copy,
  Printer,
  CheckCircle,
  TrendingDown,
  Coins,
  ArrowRight,
  ArrowLeft,
  Send,
  Download,
  Image as ImageIcon,
  MessageSquareText,
  Calculator
} from "lucide-react";
import * as htmlToImage from "html-to-image";

export default function ProposalPitch() {
  // Inputs
  const [prospectName, setProspectName] = useState("Boutique Silueta");
  const [sector, setSector] = useState("Moda / Accesorios");
  const [currentCarrier, setCurrentCarrier] = useState("Mensajero informal por día");
  const [currentCostPerTrip, setCurrentCostPerTrip] = useState(18000);
  const [monthlyVolume, setMonthlyVolume] = useState(15);

  // States
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"internal_roi" | "client_text" | "client_image">("client_image");
  
  // Ref for the image to download
  const imageRef = useRef<HTMLDivElement>(null);

  // Calculations
  const aeonCostPerTrip = 14000; // Flat price for Pack Emprendedor ($140.000 / 10 envíos)
  const currentTotalCost = monthlyVolume * currentCostPerTrip;
  const aeonTotalCost = monthlyVolume * aeonCostPerTrip;
  const directSavings = currentTotalCost - aeonTotalCost;
  
  const copF = (n: number) => {
    return "$" + n.toLocaleString("es-CO").replace(/,/g, ".");
  };

  const getClientMessageText = () => {
    return `✨ *PROPUESTA DE LOGÍSTICA PREMIUM: ÆON Fleet × ${prospectName}* ✨
    
Hola, equipo de *${prospectName}*. Sabemos que para su negocio, la presentación y puntualidad en la entrega es fundamental para que sus clientes vuelvan a comprar.

Diseñamos una solución logística premium (Plan Pack Emprendedor - 15 envíos) para blindar su reputación de marca en Medellín y el Valle de Aburrá, asegurando que sus clientes siempre reciban sus productos a tiempo y con la mejor imagen.

Le comparto en la imagen adjunta los beneficios exclusivos que tendrían al aliarse con ÆON Fleet. 

¿Les gustaría agendar un piloto de 3 envíos de cortesía esta semana para comprobar nuestro servicio?`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getClientMessageText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const link = `https://api.whatsapp.com/send?text=${encodeURIComponent(getClientMessageText())}`;
    window.open(link, "_blank");
  };

  const handleDownloadImage = async () => {
    if (!imageRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await htmlToImage.toPng(imageRef.current, { 
        quality: 1, 
        pixelRatio: 2,
        backgroundColor: '#0a0a0a' // ink color
      });
      
      const link = document.createElement('a');
      link.download = `Propuesta_AEON_${prospectName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 border-b border-gold/15 bg-gradient-to-b from-ink via-ink-light/20 to-ink relative min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Navigation / Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-dim hover:text-gold-bright transition-colors"
          >
            <ArrowLeft size={14} />
            Volver al Inicio
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <span className="font-mono text-xs text-gold uppercase tracking-widest block mb-3">
            Herramientas Comerciales B2B
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-parchment leading-tight">
            Embudo de Ventas & <span className="text-gold-bright italic font-normal">Pitch de Negocio</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-dim max-w-2xl mt-3 leading-relaxed">
            Personaliza y genera el material de ventas para tu prospecto. La calculadora te muestra el ROI interno, y el material para el cliente está optimizado para cerrar la venta.
          </p>
        </div>

        {/* Builder & Live Proposal Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Builder Form Column */}
          <div className="lg:col-span-4 bg-ink-light border border-gold/10 p-6 rounded-md">
            <h3 className="font-serif text-lg text-parchment mb-6 flex items-center gap-2">
              <Sparkles size={16} className="text-gold" />
              Datos del Prospecto
            </h3>

            <div className="flex flex-col gap-4">
              
              {/* Brand Name Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                  Nombre de la Marca
                </label>
                <input
                  type="text"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder="Ej: Silueta Closet"
                  className="bg-ink border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment outline-none"
                />
              </div>

              {/* Sector Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                  Sector o Nicho
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="bg-ink border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment outline-none"
                >
                  <option value="Moda / Accesorios">Moda / Accesorios</option>
                  <option value="Cosméticos / Maquillaje">Cosméticos / Maquillaje</option>
                  <option value="Joyería / Artículos de Valor">Joyería / Artículos de Valor</option>
                  <option value="Alimentos / Repostería Premium">Alimentos / Repostería Premium</option>
                  <option value="Tecnología / Repuestos">Tecnología / Repuestos</option>
                  <option value="Salud / Consultorios Médicos">Salud / Consultorios Médicos</option>
                </select>
              </div>

              {/* Competitor / Current Setup */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                  Solución Actual
                </label>
                <select
                  value={currentCarrier}
                  onChange={(e) => setCurrentCarrier(e.target.value)}
                  className="bg-ink border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment outline-none"
                >
                  <option value="Mensajero informal por día">Mensajero informal por día</option>
                  <option value="Aplicaciones de reparto (Rappi/InDrive)">Aplicaciones de reparto (Rappi/InDrive)</option>
                  <option value="Logística nacional tradicional">Logística nacional tradicional</option>
                  <option value="Socios / Entrega propia">Socios / Entrega propia</option>
                </select>
              </div>

              {/* Current Cost Per Delivery */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                  Costo actual estimado por trayecto
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-xs text-slate-dim font-mono">$</span>
                  <input
                    type="number"
                    value={currentCostPerTrip}
                    onChange={(e) => setCurrentCostPerTrip(Math.max(1000, parseInt(e.target.value) || 0))}
                    className="bg-ink border border-gold/10 focus:border-gold/50 rounded p-3 pl-7 text-sm text-parchment outline-none w-full"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-8">
            
            {/* Tab selector */}
            <div className="flex gap-1 mb-6 border-b border-gold/10 pb-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
              <button
                onClick={() => setActiveTab("client_image")}
                className={`flex items-center gap-2 py-2 px-4 font-mono text-[11px] uppercase tracking-wider rounded-t transition-all cursor-pointer ${
                  activeTab === "client_image" ? "bg-gold/10 text-gold-bright border-b-2 border-gold-bright font-semibold" : "text-slate-dim hover:text-parchment hover:bg-white/5"
                }`}
              >
                <ImageIcon size={14} />
                Imagen Cliente
              </button>
              <button
                onClick={() => setActiveTab("client_text")}
                className={`flex items-center gap-2 py-2 px-4 font-mono text-[11px] uppercase tracking-wider rounded-t transition-all cursor-pointer ${
                  activeTab === "client_text" ? "bg-gold/10 text-gold-bright border-b-2 border-gold-bright font-semibold" : "text-slate-dim hover:text-parchment hover:bg-white/5"
                }`}
              >
                <MessageSquareText size={14} />
                Mensaje Cliente
              </button>
              <button
                onClick={() => setActiveTab("internal_roi")}
                className={`flex items-center gap-2 py-2 px-4 font-mono text-[11px] uppercase tracking-wider rounded-t transition-all cursor-pointer ${
                  activeTab === "internal_roi" ? "bg-gold/10 text-gold-bright border-b-2 border-gold-bright font-semibold" : "text-slate-dim hover:text-parchment hover:bg-white/5"
                }`}
              >
                <Calculator size={14} />
                Calculadora Interna (ROI)
              </button>
            </div>

            {/* Content box */}
            {activeTab === "client_image" && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-ink border border-gold/15 p-4 rounded-sm">
                  <p className="text-xs text-slate-dim">
                    Descarga esta imagen como PNG para adjuntarla al mensaje de WhatsApp o correo electrónico del cliente.
                  </p>
                  <button
                    onClick={handleDownloadImage}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-bright text-ink font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Download size={14} />
                    {isDownloading ? "Generando..." : "Descargar PNG"}
                  </button>
                </div>
                
                {/* Visual Card to Download */}
                <div className="flex justify-center bg-black/40 p-4 sm:p-8 rounded-lg overflow-x-auto hide-scrollbar">
                  <div 
                    ref={imageRef} 
                    className="bg-ink w-[400px] shrink-0 border border-gold/20 rounded-lg overflow-hidden relative shadow-2xl"
                    style={{ padding: "2px" }}
                  >
                    {/* Inner wrapper for styling the downloaded image */}
                    <div className="bg-ink-light w-full h-full rounded-md p-8 relative overflow-hidden">
                      {/* Background Accents */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-rust-bright/5 blur-[60px] rounded-full pointer-events-none" />

                      {/* Top Header */}
                      <div className="flex justify-between items-start mb-10 relative z-10">
                        <div className="flex flex-col">
                          <span className="font-mono text-[9px] text-gold uppercase tracking-widest mb-2">Propuesta Logística</span>
                          <span className="font-serif text-3xl font-bold text-gold-bright leading-none">Æ</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[9px] text-slate-dim uppercase tracking-wider block mb-1">Preparado para</span>
                          <span className="font-serif text-lg text-parchment">{prospectName}</span>
                        </div>
                      </div>

                      {/* Main Title */}
                      <div className="mb-10 relative z-10 text-center">
                        <div className="inline-flex items-center justify-center bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-full mb-4">
                          <Sparkles size={12} className="text-gold mr-2" />
                          <span className="font-mono text-[10px] text-gold-bright uppercase tracking-wider">Plan Emprendedor</span>
                        </div>
                        <h3 className="font-serif text-2xl text-parchment leading-tight">
                          Blindamos la <span className="text-gold-bright italic">reputación</span><br/> de tu marca.
                        </h3>
                      </div>

                      {/* Benefits Grid */}
                      <div className="flex flex-col gap-4 relative z-10">
                        <div className="bg-ink border border-gold/10 p-4 rounded flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                            <Coins size={18} className="text-gold" />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-parchment">Tarifa Plana Fija</span>
                            <span className="block text-xs text-slate-dim mt-0.5">Sin recargos por lluvia o alta demanda.</span>
                          </div>
                        </div>
                        
                        <div className="bg-ink border border-gold/10 p-4 rounded flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                            <Clock size={18} className="text-gold" />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-parchment">Entregas Misma Tarde</span>
                            <span className="block text-xs text-slate-dim mt-0.5">Corte a mediodía para despachos rápidos.</span>
                          </div>
                        </div>

                        <div className="bg-ink border border-gold/10 p-4 rounded flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                            <ShieldCheck size={18} className="text-gold" />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-parchment">Garantía 100% Declarada</span>
                            <span className="block text-xs text-slate-dim mt-0.5">Si algo sucede, respondemos por el total.</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-12 pt-6 border-t border-gold/10 flex justify-between items-end relative z-10">
                        <div className="flex flex-col">
                          <span className="font-mono text-[8px] text-slate-dim uppercase tracking-wider">Servicio</span>
                          <span className="font-serif text-sm text-gold-bright">15 Envíos / Mes</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[9px] text-slate-dim uppercase tracking-wider block mb-0.5">aeonfleet.com</span>
                          <span className="font-mono text-[9px] text-slate-dim uppercase tracking-wider block">Medellín, CO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "client_text" && (
              <div className="flex flex-col gap-4">
                <div className="bg-ink border border-gold/15 p-4 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-xs text-slate-dim max-w-md">
                    Copia este mensaje. Está diseñado para ser claro, amigable y generar curiosidad sin abrumar con números. Recuerda adjuntar la imagen de la pestaña anterior.
                  </p>
                  <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-ink-light border border-gold/30 hover:border-gold-bright text-gold-bright font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      {isCopied ? <CheckCircle size={14} /> : <Copy size={14} />}
                      {isCopied ? "Copiado" : "Copiar"}
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenWhatsApp}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#20ba5a] transition-colors cursor-pointer"
                    >
                      <Send size={14} />
                      Enviar
                    </button>
                  </div>
                </div>
                
                <div className="bg-ink-light/50 border border-gold/10 rounded p-6">
                  <pre className="font-mono text-xs sm:text-sm text-parchment whitespace-pre-wrap leading-relaxed select-all">
                    {getClientMessageText()}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "internal_roi" && (
              <div className="bg-ink-light border border-gold/30 rounded p-6 sm:p-10 relative text-left">
                
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rust-bright to-gold" />

                <div className="mb-6">
                  <span className="font-mono text-[10px] text-gold uppercase tracking-wider block mb-1">
                    Uso Interno - Argumentos de Cierre
                  </span>
                  <h4 className="font-serif text-2xl font-light text-parchment">
                    Análisis de Costos: <span className="text-gold-bright italic">{prospectName}</span>
                  </h4>
                  <p className="text-xs text-slate-dim mt-2">
                    Usa estos datos durante la negociación para demostrar el valor económico de pasarse a ÆON Fleet.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-ink border border-rust/30 p-5 rounded-sm">
                    <span className="text-[10px] text-slate-dim font-mono block">Costo Actual Estimado</span>
                    <span className="text-2xl font-bold font-mono text-rust-bright block mt-2">
                      {copF(currentCostPerTrip)} <span className="text-xs text-slate-dim font-sans font-normal">/ envío</span>
                    </span>
                    <span className="text-xs text-slate-dim block mt-2 pt-2 border-t border-rust/10">
                      Gasto mensual: {copF(currentTotalCost)} COP
                    </span>
                  </div>

                  <div className="bg-gold/5 border border-gold/40 p-5 rounded-sm">
                    <span className="text-[10px] text-gold-bright font-mono block">Propuesta ÆON Fleet (Plan 15)</span>
                    <span className="text-2xl font-bold font-mono text-gold-bright block mt-2">
                      {copF(aeonCostPerTrip)} <span className="text-xs text-gold-bright/70 font-sans font-normal">/ envío</span>
                    </span>
                    <span className="text-xs text-gold font-sans font-medium block mt-2 pt-2 border-t border-gold/20">
                      Costo mensual: {copF(aeonTotalCost)} COP
                    </span>
                  </div>
                </div>

                <div className="border-t border-gold/15 pt-6">
                  <h5 className="font-mono text-[10px] text-gold uppercase tracking-wider mb-4">
                    Impacto Económico Directo
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-sm bg-ink/40 border border-gold/10 flex items-start gap-3">
                      <div className="mt-0.5"><Coins size={16} className="text-gold" /></div>
                      <div>
                        <span className="text-[10px] text-slate-dim font-mono block uppercase">Ahorro Mensual</span>
                        <span className="text-lg font-bold text-emerald-400 block mt-0.5">
                          {directSavings > 0 ? "+" : ""}{copF(directSavings)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-sm bg-ink/40 border border-gold/10 flex items-start gap-3">
                      <div className="mt-0.5"><TrendingUp size={16} className="text-gold" /></div>
                      <div>
                        <span className="text-[10px] text-slate-dim font-mono block uppercase">Ahorro Anual Proyectado</span>
                        <span className="text-lg font-bold text-emerald-400 block mt-0.5">
                          {directSavings > 0 ? "+" : ""}{copF(directSavings * 12)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
