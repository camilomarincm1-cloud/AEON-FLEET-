import { useState, useEffect, useMemo } from "react";
import {
  MessageSquare,
  ShieldCheck,
  MapPin,
  ClipboardList,
  PackageCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Printer,
  FileText,
  AlertTriangle,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ROUTES } from "../data";
import AILocationValidator from "./AILocationValidator";
import MatrizMetropolitanaAutocomplete from "./MatrizMetropolitanaAutocomplete";
import {
  computeGeodesicDistanceKm,
  NEIGHBORHOOD_COORDS,
  DEFAULT_MEDELLIN_CENTER,
  findBestNeighborhoodMatch,
} from "./MultiStopCalculator";

interface OrderData {
  serviceId: string;
  // Origen
  origZone: string;
  origBarrio: string;
  origVia: string;
  origN1: string;
  origN2: string;
  origN3: string;
  origComp: string;
  origCompN: string;
  origRef: string;
  origNombre: string;
  origTel: string;
  origHora: string;
  // Destino
  destZone: string;
  destBarrio: string;
  destVia: string;
  destN1: string;
  destN2: string;
  destN3: string;
  destComp: string;
  destCompN: string;
  destRef: string;
  destNombre: string;
  destTel: string;
  destPresencia: string;
  // Paquete
  pkgDesc: string;
  pkgValor: string;
  pkgPeso: string;
  pkgBultos: string;
  pkgDim: string;
  pkgEmpaque: string;
  pkgFragil: boolean;
  pkgObs: string;
  // Aceptaciones
  chk1: boolean;
  chk2: boolean;
  chk3: boolean;
  chk4: boolean;
}

const BARRIOS: { [key: string]: string[] } = {
  A: ["San Antonio de Prado", "La Tablaza", "Caldas Centro", "El Poblado (Caldas)", "La Chuscala", "Ancón"],
  B: ["La Estrella Centro", "Itagüí Centro", "Sabaneta", "Envigado Centro", "El Dorado", "San Fernando", "La Paz", "Ditaires", "Los Naranjos"],
  C: [
    "El Poblado",
    "Laureles",
    "Belén",
    "Centro",
    "Castilla",
    "Robledo",
    "Aranjuez",
    "Guayabal",
    "Doce de Octubre",
    "La América",
    "Estadio",
    "Manila",
    "Patio Bonito",
    "Conquistadores",
    "Calasanz",
    "San Javier",
    "La Floresta",
    "Boston",
    "La Candelaria",
    "Buenos Aires",
    "El Chagualo"
  ],
  D: ["Bello Centro", "Niquía", "La Madera", "Hato Viejo", "Zamora", "París (Bello)", "Fontidueño", "El Carmelo"]
};

export default function OrderSheet() {
  const [step, setStep] = useState(1);
  const [refNum, setRefNum] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const [form, setForm] = useState<OrderData>({
    serviceId: "r15", // default to Pack Emprendedor
    origZone: "",
    origBarrio: "",
    origVia: "Calle",
    origN1: "",
    origN2: "",
    origN3: "",
    origComp: "",
    origCompN: "",
    origRef: "",
    origNombre: "",
    origTel: "",
    origHora: "",
    destZone: "",
    destBarrio: "",
    destVia: "Calle",
    destN1: "",
    destN2: "",
    destN3: "",
    destComp: "",
    destCompN: "",
    destRef: "",
    destNombre: "",
    destTel: "",
    destPresencia: "Sí, habrá alguien en el punto de entrega",
    pkgDesc: "",
    pkgValor: "",
    pkgPeso: "",
    pkgBultos: "1",
    pkgDim: "",
    pkgEmpaque: "Bolsa plástica sellada",
    pkgFragil: false,
    pkgObs: "",
    chk1: false,
    chk2: false,
    chk3: false,
    chk4: false
  });

  useEffect(() => {
    const now = new Date();
    const ref =
      "AEF-" +
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      "-" +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0");
    setRefNum(ref);
  }, []);

  const handleFieldChange = (key: keyof OrderData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const getOrigAddress = () => {
    const { origVia, origN1, origN2, origN3, origComp, origCompN } = form;
    if (!origN1) return "Dirección de origen incompleta";
    let addr = `${origVia} ${origN1}`;
    if (origN2) addr += ` # ${origN2}`;
    if (origN3) addr += ` - ${origN3}`;
    if (origComp) addr += `, ${origComp} ${origCompN}`.trim();
    return addr;
  };

  const getDestAddress = () => {
    const { destVia, destN1, destN2, destN3, destComp, destCompN } = form;
    if (!destN1) return "Dirección de destino incompleta";
    let addr = `${destVia} ${destN1}`;
    if (destN2) addr += ` # ${destN2}`;
    if (destN3) addr += ` - ${destN3}`;
    if (destComp) addr += `, ${destComp} ${destCompN}`.trim();
    return addr;
  };

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: string[] = [];

    if (currentStep === 1) {
      if (!form.serviceId) {
        stepErrors.push("Por favor selecciona un tipo de servicio.");
      }
    } else if (currentStep === 2) {
      if (!form.origZone) stepErrors.push("La Zona ÆON de origen es obligatoria.");
      if (!form.origBarrio) stepErrors.push("El barrio de origen es obligatorio.");
      if (!form.origN1 || !form.origN2 || !form.origN3) stepErrors.push("La dirección de origen estructurada está incompleta.");
      if (!form.origNombre.trim()) stepErrors.push("El nombre de contacto de origen es obligatorio.");
      if (!form.origTel.trim()) stepErrors.push("El teléfono de contacto de origen es obligatorio.");
    } else if (currentStep === 3) {
      if (!form.destZone) stepErrors.push("La Zona ÆON de destino es obligatoria.");
      if (!form.destBarrio) stepErrors.push("El barrio de destino es obligatorio.");
      if (!form.destN1 || !form.destN2 || !form.destN3) stepErrors.push("La dirección de destino estructurada está incompleta.");
      if (!form.destNombre.trim()) stepErrors.push("El nombre de contacto de destino es obligatorio.");
      if (!form.destTel.trim()) stepErrors.push("El teléfono del destinatario es obligatorio.");
    } else if (currentStep === 4) {
      if (!form.pkgDesc.trim()) stepErrors.push("La descripción del contenido es obligatoria.");
      if (!form.pkgValor.trim()) stepErrors.push("El valor declarado del envío es obligatorio para activar la cobertura.");
    } else if (currentStep === 5) {
      if (!form.chk1 || !form.chk2 || !form.chk3 || !form.chk4) {
        stepErrors.push("Debes leer y aceptar todas las políticas y declaraciones de seguridad antes de proceder.");
      }
    }

    setErrors(stepErrors);
    return stepErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
      setErrors([]);
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors([]);
  };

  const routeMetrics = useMemo(() => {
    const oFull = `${form.origBarrio} ${getOrigAddress()}`.trim();
    const dFull = `${form.destBarrio} ${getDestAddress()}`.trim();

    const oMatch = findBestNeighborhoodMatch(oFull) || findBestNeighborhoodMatch(form.origBarrio);
    const dMatch = findBestNeighborhoodMatch(dFull) || findBestNeighborhoodMatch(form.destBarrio);

    const oCoords = (oMatch && NEIGHBORHOOD_COORDS[oMatch.id]) 
      ? NEIGHBORHOOD_COORDS[oMatch.id] 
      : DEFAULT_MEDELLIN_CENTER;

    const dCoords = (dMatch && NEIGHBORHOOD_COORDS[dMatch.id]) 
      ? NEIGHBORHOOD_COORDS[dMatch.id] 
      : DEFAULT_MEDELLIN_CENTER;

    const distKm = computeGeodesicDistanceKm(oCoords, dCoords);
    const extraKm = distKm > 3.0 ? Number((distKm - 3.0).toFixed(2)) : 0;
    const extraKmCost = Math.round(extraKm * 1500);
    const nominalRate = 8000 + extraKmCost;

    const gpsDeepLink = `https://www.google.com/maps/dir/?api=1&origin=${oCoords.lat.toFixed(5)},${oCoords.lng.toFixed(5)}&destination=${dCoords.lat.toFixed(5)},${dCoords.lng.toFixed(5)}&travelmode=driving`;

    return {
      oCoords,
      dCoords,
      distKm,
      extraKm,
      extraKmCost,
      nominalRate,
      gpsDeepLink,
    };
  }, [form.origBarrio, form.origVia, form.origN1, form.origN2, form.origN3, form.destBarrio, form.destVia, form.destN1, form.destN2, form.destN3]);

  const buildWALink = () => {
    const selectedSvc = ROUTES.find((r) => r.id === form.serviceId);
    const svcText = selectedSvc ? `${selectedSvc.code} • ${selectedSvc.name} (${selectedSvc.basePriceText})` : form.serviceId;

    const oAddr = getOrigAddress();
    const dAddr = getDestAddress();

    const msg = `🗂️ HOJA DE PEDIDO ÆON Fleet
Ref: ${refNum}
─────────────────────────

📦 SERVICIO SOLICITADO
${svcText}

📍 ORIGEN (RECOGIDA)
• Dirección: ${oAddr}
• Barrio / Sector: ${form.origBarrio}
• Coordenadas GPS: ${routeMetrics.oCoords.lat.toFixed(5)}, ${routeMetrics.oCoords.lng.toFixed(5)}
• Contacto: ${form.origNombre} · ${form.origTel}
• Hora Recogida: ${form.origHora || "Sin preferencia"}
• Indicaciones: ${form.origRef || "Ninguna"}

🏠 DESTINO (ENTREGA)
• Dirección: ${dAddr}
• Barrio / Sector: ${form.destBarrio}
• Coordenadas GPS: ${routeMetrics.dCoords.lat.toFixed(5)}, ${routeMetrics.dCoords.lng.toFixed(5)}
• Destinatario: ${form.destNombre} · ${form.destTel}
• Recepción: ${form.destPresencia}
• Indicaciones: ${form.destRef || "Ninguna"}

🗺️ LIQUIDACIÓN DE RUTA GPS (TARIFAS VIGENTES)
• Distancia Geodésica: ${routeMetrics.distKm.toFixed(1)} KM
• Tarifa Base Fija (hasta 3.0 KM): $8.000 COP
• Excedente Distancia: ${routeMetrics.extraKm > 0 ? `+$${routeMetrics.extraKmCost.toLocaleString("es-CO")} COP (${routeMetrics.extraKm.toFixed(1)} km extra × $1.500)` : "$0 COP"}
• Tarifa Nominal Estimada: $${routeMetrics.nominalRate.toLocaleString("es-CO")} COP
• Enlace GPS Oficial: ${routeMetrics.gpsDeepLink}

📋 DETALLES DEL PAQUETE
• Contenido: ${form.pkgDesc}
• Valor declarado: ${form.pkgValor}
• Peso aprox.: ${form.pkgPeso || "N/A"}
• Bultos: ${form.pkgBultos}
• Dimensiones: ${form.pkgDim || "N/A"}
• Empaque: ${form.pkgEmpaque}
• Frágil: ${form.pkgFragil ? "⚠️ SÍ" : "No"}
• Observaciones: ${form.pkgObs || "Ninguna"}

✅ Políticas operativas y de cobertura leídas y aceptadas por el cliente.
─────────────────────────
Enviado desde la Hoja de Pedido Digital`;

    return `https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(msg)}`;
  };

  const stepsList = [
    { num: 1, label: "Servicio", icon: ClipboardList },
    { num: 2, label: "Origen", icon: MapPin },
    { num: 3, label: "Destino", icon: MapPin },
    { num: 4, label: "Paquete", icon: PackageCheck },
    { num: 5, label: "Confirmar", icon: ShieldCheck }
  ];

  return (
    <motion.section 
      id="hoja-pedido" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 sm:py-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/15 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-gold font-mono text-xs uppercase tracking-widest mb-1.5">
              <Sparkles size={12} />
              Registro de Despacho
            </div>
            <h2 className="font-serif text-3xl font-light text-parchment leading-tight">
              Hoja de Pedido <span className="text-gold-bright italic font-normal">Digital</span>
            </h2>
          </div>
          <div className="bg-ink-light border border-gold/15 px-4 py-2.5 rounded font-mono text-xs text-gold-bright flex flex-col sm:items-end justify-center">
            <span className="text-[9px] uppercase text-slate-dim">Referencia del documento</span>
            <span className="font-bold tracking-wider mt-0.5">{refNum || "Generando..."}</span>
          </div>
        </div>

        {/* Fast Track Banner */}
        <div className="bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold rounded-r-xl p-4 mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-start gap-3">
            <MessageSquare className="text-gold-bright mt-0.5 shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-parchment text-sm">¿Tu primera vez con nosotros?</h4>
              <p className="text-xs text-slate-dim mt-1">Si prefieres no llenar el formulario, escríbenos directamente y un asesor tomará tu pedido en minutos.</p>
            </div>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=573012964584&text=Hola,%20quiero%20hacer%20mi%20primer%20env%C3%ADo%20r%C3%A1pidamente."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-bright text-ink font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md shrink-0 w-full sm:w-auto justify-center"
          >
            Hablar con un asesor
          </a>
        </div>

        {/* Steps Progress Row */}
        <div className="grid grid-cols-5 border border-gold/10 bg-ink-light/50 rounded-sm overflow-hidden mb-10">
          {stepsList.map((s) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isDone = step > s.num;

            return (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num < step) setStep(s.num);
                }}
                disabled={s.num >= step}
                className={`py-3.5 px-1 sm:px-3 text-center flex flex-col items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-gold text-gold-bright bg-gold/5"
                    : isDone
                    ? "border-gold/30 text-gold/70"
                    : "border-transparent text-slate-dim opacity-50 cursor-not-allowed"
                }`}
              >
                <Icon size={14} className={isActive ? "text-gold-bright animate-pulse" : isDone ? "text-gold" : ""} />
                <span className="font-mono text-[9px] sm:text-xs uppercase tracking-wider select-none">
                  0{s.num} {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Error Alert Panel */}
        {errors.length > 0 && (
          <div className="bg-rust/10 border border-rust/40 text-rust-bright text-xs rounded-sm p-4 mb-8 flex flex-col gap-1.5 animate-fadeIn">
            {errors.map((err, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-bold mt-0.5">•</span>
                <span>{err}</span>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Form Step Cards with Animations */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SERVICE TYPE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-light text-parchment mb-2">
                    ¿Qué tipo de entrega <span className="text-gold-bright italic font-normal">necesitas hoy?</span>
                  </h3>
                  <p className="text-xs text-slate-dim">
                    Selecciona una modalidad. Recuerda que los cortes del Reloj ÆON determinan el itinerario de despacho.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {ROUTES.map((route) => {
                    const isSelected = form.serviceId === route.id;
                    const isSvcC = route.id === "svcc";

                    return (
                      <button
                        key={route.id}
                        type="button"
                        onClick={() => handleFieldChange("serviceId", route.id)}
                        className={`p-5 rounded-sm border text-left transition-all flex flex-col items-start gap-1 cursor-pointer ${
                          isSelected
                            ? isSvcC
                              ? "border-rust bg-rust/10 text-parchment shadow-md"
                              : "border-gold bg-gold/10 text-parchment shadow-md"
                            : "border-gold/10 bg-ink-light/50 hover:border-gold/25"
                        }`}
                      >
                        <span className={`font-mono text-[9px] uppercase tracking-wider ${isSvcC ? "text-rust-bright" : "text-gold"}`}>
                          Ruta {route.code} {isSvcC && "🚨"}
                        </span>
                        <span className="font-serif font-bold text-sm text-parchment">
                          {route.name}
                        </span>
                        <span className="text-xs text-slate-dim line-clamp-2 mt-1">
                          {route.description}
                        </span>
                        <span className={`font-mono text-xs font-semibold mt-3 ${isSvcC ? "text-rust-bright" : "text-gold-bright"}`}>
                          {route.basePriceText}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-gold/5 border border-gold/20 rounded p-4 text-xs text-slate-dim leading-relaxed mb-6">
                  <strong className="text-gold-bright uppercase tracking-wider font-mono mr-2">Corte de Ventana:</strong>
                  Pedidos programados antes de las 02:00 PM entran a despacho en la misma tarde. Pedidos posteriores se encolan para la primera ruta de la mañana siguiente a las 10:00 AM.
                </div>
              </motion.div>
            )}

            {/* STEP 2: ORIGIN */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-light text-parchment mb-2">
                    Punto de <span className="text-gold-bright italic font-normal">Recogida (Origen)</span>
                  </h3>
                  <p className="text-xs text-slate-dim">
                    Indica con precisión dónde recogemos el paquete o dónde se asienta el servicio.
                  </p>
                </div>

                {/* Zone Tab selector */}
                <div className="mb-6">
                  <label className="text-[10px] font-mono text-gold uppercase tracking-wider block mb-2.5">
                    1. Selecciona la Zona ÆON de origen *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["A", "B", "C", "D"].map((letter) => {
                      const zoneDetail = letter === "A" ? "Sur Profundo" : letter === "B" ? "Sur Valle" : letter === "C" ? "Medellín" : "Norte Valle";
                      const isSelected = form.origZone === letter;
                      return (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => {
                            handleFieldChange("origZone", letter);
                            handleFieldChange("origBarrio", ""); // reset barrio
                          }}
                          className={`py-3.5 px-3 rounded-sm border font-mono text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                            isSelected
                              ? "border-gold bg-gold/10 text-gold-bright font-bold"
                              : "border-gold/10 bg-ink-light hover:border-gold/25 text-slate-dim"
                          }`}
                        >
                          <span className="text-base font-bold">{letter}</span>
                          <span className="text-[9px] uppercase tracking-wider font-sans">{zoneDetail}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Búsqueda Directa de Barrio con Matriz Metropolitana */}
                <div className="mb-6 p-4 bg-ink-light border border-cyan-500/30 rounded-sm">
                  <MatrizMetropolitanaAutocomplete
                    label="Búsqueda Inteligente de Barrio u Origen (Matriz Metropolitana)"
                    onSelectLocation={(selected) => {
                      handleFieldChange("origBarrio", selected);
                    }}
                  />
                  {form.origBarrio && (
                    <div className="mt-2 text-xs font-mono text-cyan-400">
                      ✓ Barrio de origen asignado: <strong>{form.origBarrio}</strong>
                    </div>
                  )}
                </div>

                {/* Barrio pills scrollbar */}
                {form.origZone && (
                  <div className="mb-6 animate-fadeIn">
                    <label className="text-[10px] font-mono text-gold uppercase tracking-wider block mb-2.5">
                      2. Selecciona el Barrio de origen *
                    </label>
                    <div className="border border-gold/10 bg-ink-light p-3 rounded-sm max-h-[140px] overflow-y-auto flex flex-wrap gap-2 scrollbar-thin">
                      {BARRIOS[form.origZone].map((b) => {
                        const isSelected = form.origBarrio === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => handleFieldChange("origBarrio", b)}
                            className={`px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? "border-gold bg-gold/10 text-gold-bright font-semibold"
                                : "border-gold/10 bg-ink hover:border-gold/30 text-slate-dim"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Structured Address Builder */}
                <div className="bg-ink-light border border-gold/10 rounded p-5 mb-6">
                  <div className="text-[10px] font-mono text-gold uppercase tracking-wider block mb-4">
                    3. Dirección estructurada de recogida *
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end mb-4">
                    <div className="sm:col-span-4 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Tipo de Vía</label>
                      <select
                        value={form.origVia}
                        onChange={(e) => handleFieldChange("origVia", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment"
                      >
                        <option value="Calle">Calle</option>
                        <option value="Carrera">Carrera</option>
                        <option value="Avenida">Avenida</option>
                        <option value="Diagonal">Diagonal</option>
                        <option value="Transversal">Transversal</option>
                        <option value="Circular">Circular</option>
                        <option value="Variante">Variante</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Número</label>
                      <input
                        type="text"
                        placeholder="10"
                        value={form.origN1}
                        onChange={(e) => handleFieldChange("origN1", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment text-center"
                        maxLength={8}
                      />
                    </div>

                    <div className="hidden sm:block sm:col-span-1 text-center text-xl font-bold text-slate-dim pb-1 select-none">
                      #
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Cruce</label>
                      <input
                        type="text"
                        placeholder="43"
                        value={form.origN2}
                        onChange={(e) => handleFieldChange("origN2", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment text-center"
                        maxLength={8}
                      />
                    </div>

                    <div className="hidden sm:block sm:col-span-1 text-center text-xl font-bold text-slate-dim pb-1 select-none">
                      -
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Portal</label>
                      <input
                        type="text"
                        placeholder="25"
                        value={form.origN3}
                        onChange={(e) => handleFieldChange("origN3", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment text-center"
                        maxLength={8}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Complemento / Propiedad</label>
                      <select
                        value={form.origComp}
                        onChange={(e) => handleFieldChange("origComp", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment"
                      >
                        <option value="">Ninguno</option>
                        <option value="Apt.">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Bloque">Bloque</option>
                        <option value="Torre">Torre</option>
                        <option value="Piso">Piso</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Local">Local</option>
                        <option value="Bodega">Bodega</option>
                        <option value="Interior">Interior</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Número de apto / bloque</label>
                      <input
                        type="text"
                        placeholder="301"
                        value={form.origCompN}
                        onChange={(e) => handleFieldChange("origCompN", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {/* Address preview box */}
                  <div className="border border-gold/10 bg-ink p-3 rounded mt-5">
                    <span className="text-[9px] font-mono text-slate-dim uppercase block mb-1">
                      Dirección procesada en sistema
                    </span>
                    <span className="font-mono text-xs text-gold-bright tracking-wide block min-h-[16px]">
                      {getOrigAddress()}
                    </span>
                  </div>

                  {/* AI Location Validator */}
                  <AILocationValidator address={`${getOrigAddress()}, ${form.origBarrio || "Medellín"}, Colombia`} />
                </div>

                {/* Additional inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Nombre de contacto en origen *
                    </label>
                    <input
                      type="text"
                      placeholder="Valentina Rodríguez"
                      value={form.origNombre}
                      onChange={(e) => handleFieldChange("origNombre", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Teléfono de contacto origen *
                    </label>
                    <input
                      type="tel"
                      placeholder="300 123 4567"
                      value={form.origTel}
                      onChange={(e) => handleFieldChange("origTel", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Hora preferida de recolección
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Antes de las 12 PM, 2:00 PM, etc."
                      value={form.origHora}
                      onChange={(e) => handleFieldChange("origHora", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Referencia o indicaciones del punto
                    </label>
                    <input
                      type="text"
                      placeholder="Edificio azul, portería 1, timbre 301..."
                      value={form.origRef}
                      onChange={(e) => handleFieldChange("origRef", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DESTINO */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-light text-parchment mb-2">
                    Punto de <span className="text-gold-bright italic font-normal">Entrega (Destino)</span>
                  </h3>
                  <p className="text-xs text-slate-dim">
                    Asienta los datos de tu cliente final o punto de llegada de la encomienda.
                  </p>
                </div>

                <div className="bg-rust/5 border border-rust/25 rounded p-3.5 mb-6 text-xs text-slate-dim">
                  <strong className="text-rust-bright uppercase tracking-wider font-mono mr-2">Frontera operativa:</strong>
                  No brindamos cobertura hacia Copacabana, Girardota ni Barbosa. Por favor asegúrate de que el destino esté dentro de las zonas activas.
                </div>

                {/* Zone Tab selector */}
                <div className="mb-6">
                  <label className="text-[10px] font-mono text-gold uppercase tracking-wider block mb-2.5">
                    1. Selecciona la Zona ÆON de destino *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["A", "B", "C", "D"].map((letter) => {
                      const zoneDetail = letter === "A" ? "Sur Profundo" : letter === "B" ? "Sur Valle" : letter === "C" ? "Medellín" : "Norte Valle";
                      const isSelected = form.destZone === letter;
                      return (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => {
                            handleFieldChange("destZone", letter);
                            handleFieldChange("destBarrio", ""); // reset barrio
                          }}
                          className={`py-3.5 px-3 rounded-sm border font-mono text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                            isSelected
                              ? "border-gold bg-gold/10 text-gold-bright font-bold"
                              : "border-gold/10 bg-ink-light hover:border-gold/25 text-slate-dim"
                          }`}
                        >
                          <span className="text-base font-bold">{letter}</span>
                          <span className="text-[9px] uppercase tracking-wider font-sans">{zoneDetail}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Búsqueda Directa de Barrio Destino con Matriz Metropolitana */}
                <div className="mb-6 p-4 bg-ink-light border border-cyan-500/30 rounded-sm">
                  <MatrizMetropolitanaAutocomplete
                    label="Búsqueda Inteligente de Barrio u Destino (Matriz Metropolitana)"
                    onSelectLocation={(selected) => {
                      handleFieldChange("destBarrio", selected);
                    }}
                  />
                  {form.destBarrio && (
                    <div className="mt-2 text-xs font-mono text-cyan-400">
                      ✓ Barrio de destino asignado: <strong>{form.destBarrio}</strong>
                    </div>
                  )}
                </div>

                {/* Barrio pills scrollbar */}
                {form.destZone && (
                  <div className="mb-6 animate-fadeIn">
                    <label className="text-[10px] font-mono text-gold uppercase tracking-wider block mb-2.5">
                      2. Selecciona el Barrio de destino *
                    </label>
                    <div className="border border-gold/10 bg-ink-light p-3 rounded-sm max-h-[140px] overflow-y-auto flex flex-wrap gap-2 scrollbar-thin">
                      {BARRIOS[form.destZone].map((b) => {
                        const isSelected = form.destBarrio === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => handleFieldChange("destBarrio", b)}
                            className={`px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? "border-gold bg-gold/10 text-gold-bright font-semibold"
                                : "border-gold/10 bg-ink hover:border-gold/30 text-slate-dim"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Structured Address Builder */}
                <div className="bg-ink-light border border-gold/10 rounded p-5 mb-6">
                  <div className="text-[10px] font-mono text-gold uppercase tracking-wider block mb-4">
                    3. Dirección estructurada de destino *
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end mb-4">
                    <div className="sm:col-span-4 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Tipo de Vía</label>
                      <select
                        value={form.destVia}
                        onChange={(e) => handleFieldChange("destVia", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment"
                      >
                        <option value="Calle">Calle</option>
                        <option value="Carrera">Carrera</option>
                        <option value="Avenida">Avenida</option>
                        <option value="Diagonal">Diagonal</option>
                        <option value="Transversal">Transversal</option>
                        <option value="Circular">Circular</option>
                        <option value="Variante">Variante</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Número</label>
                      <input
                        type="text"
                        placeholder="65"
                        value={form.destN1}
                        onChange={(e) => handleFieldChange("destN1", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment text-center"
                        maxLength={8}
                      />
                    </div>

                    <div className="hidden sm:block sm:col-span-1 text-center text-xl font-bold text-slate-dim pb-1 select-none">
                      #
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Cruce</label>
                      <input
                        type="text"
                        placeholder="49B"
                        value={form.destN2}
                        onChange={(e) => handleFieldChange("destN2", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment text-center"
                        maxLength={8}
                      />
                    </div>

                    <div className="hidden sm:block sm:col-span-1 text-center text-xl font-bold text-slate-dim pb-1 select-none">
                      -
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Portal</label>
                      <input
                        type="text"
                        placeholder="20"
                        value={form.destN3}
                        onChange={(e) => handleFieldChange("destN3", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment text-center"
                        maxLength={8}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Complemento / Propiedad</label>
                      <select
                        value={form.destComp}
                        onChange={(e) => handleFieldChange("destComp", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment"
                      >
                        <option value="">Ninguno</option>
                        <option value="Apt.">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Bloque">Bloque</option>
                        <option value="Torre">Torre</option>
                        <option value="Piso">Piso</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Local">Local</option>
                        <option value="Bodega">Bodega</option>
                        <option value="Interior">Interior</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-dim uppercase">Número de apto / bloque</label>
                      <input
                        type="text"
                        placeholder="5"
                        value={form.destCompN}
                        onChange={(e) => handleFieldChange("destCompN", e.target.value)}
                        className="bg-ink border border-gold/15 rounded p-2.5 text-sm text-parchment"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {/* Address preview box */}
                  <div className="border border-gold/10 bg-ink p-3 rounded mt-5">
                    <span className="text-[9px] font-mono text-slate-dim uppercase block mb-1">
                      Dirección procesada en sistema
                    </span>
                    <span className="font-mono text-xs text-gold-bright tracking-wide block min-h-[16px]">
                      {getDestAddress()}
                    </span>
                  </div>

                  {/* AI Location Validator */}
                  <AILocationValidator address={`${getDestAddress()}, ${form.destBarrio || "Medellín"}, Colombia`} />
                </div>

                {/* Additional inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Nombre del destinatario *
                    </label>
                    <input
                      type="text"
                      placeholder="Carlos Mendoza"
                      value={form.destNombre}
                      onChange={(e) => handleFieldChange("destNombre", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Teléfono del destinatario *
                    </label>
                    <input
                      type="tel"
                      placeholder="311 456 7890"
                      value={form.destTel}
                      onChange={(e) => handleFieldChange("destTel", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      ¿Hay alguien para recibir?
                    </label>
                    <select
                      value={form.destPresencia}
                      onChange={(e) => handleFieldChange("destPresencia", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3.5 text-sm text-parchment"
                    >
                      <option value="Sí, habrá alguien en el punto de entrega">Sí, habrá alguien</option>
                      <option value="No hay nadie, dejar con portero o vecino autorizado">Dejar con portero / vecino autorizado</option>
                      <option value="Coordinar con destinatario antes de llegar">Coordinar con destinatario antes de llegar</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Referencia o indicaciones de entrega
                    </label>
                    <input
                      type="text"
                      placeholder="Casa esquinera de portón verde, timbre blanco..."
                      value={form.destRef}
                      onChange={(e) => handleFieldChange("destRef", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: PACKAGE DETAILS */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-light text-parchment mb-2">
                    Detalles de la <span className="text-gold-bright italic font-normal">Encomienda (Paquete)</span>
                  </h3>
                  <p className="text-xs text-slate-dim">
                    Describe el paquete. Declarar correctamente activa la Garantía ÆON ante siniestros.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                    Descripción del contenido *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej: Ropa deportiva (3 camisetas, 2 pantalonetas) empacada en bolsa plástica de seguridad negra..."
                    value={form.pkgDesc}
                    onChange={(e) => handleFieldChange("pkgDesc", e.target.value)}
                    className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Valor Declarado *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: $150.000"
                      value={form.pkgValor}
                      onChange={(e) => handleFieldChange("pkgValor", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Peso Estimado (KG)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 2 kg"
                      value={form.pkgPeso}
                      onChange={(e) => handleFieldChange("pkgPeso", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Número de Bultos
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.pkgBultos}
                      onChange={(e) => handleFieldChange("pkgBultos", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Dimensiones aproximadas
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 30x20x10 cm"
                      value={form.pkgDim}
                      onChange={(e) => handleFieldChange("pkgDim", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                      Tipo de empaque
                    </label>
                    <select
                      value={form.pkgEmpaque}
                      onChange={(e) => handleFieldChange("pkgEmpaque", e.target.value)}
                      className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment"
                    >
                      <option value="Bolsa plástica sellada">Bolsa plástica sellada</option>
                      <option value="Caja de cartón">Caja de cartón</option>
                      <option value="Sobre manila">Sobre manila</option>
                      <option value="Bolsa de tela">Bolsa de tela</option>
                      <option value="Sin empacar (recolectar en mano)">Sin empacar</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Fragile Switch */}
                <div className="bg-ink-light border border-gold/10 rounded p-4 flex items-center justify-between gap-4 mb-5">
                  <div>
                    <span className="font-serif font-bold text-sm text-parchment block">
                      ⚠️ Contenido Frágil o Delicado
                    </span>
                    <span className="text-xs text-slate-dim block mt-0.5">
                      Vidrio, cerámica, electrónicos, perfumería o joyería fina.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange("pkgFragil", !form.pkgFragil)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors focus:outline-none ${
                      form.pkgFragil ? "bg-gold" : "bg-ink"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-parchment transition-transform ${
                        form.pkgFragil ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-slate-dim uppercase tracking-wider">
                    Observaciones o requerimientos de manipulación
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: Mantener en posición vertical, no apilar cajas pesadas encima..."
                    value={form.pkgObs}
                    onChange={(e) => handleFieldChange("pkgObs", e.target.value)}
                    className="bg-ink-light border border-gold/10 focus:border-gold/50 rounded p-3 text-sm text-parchment resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 5: SUMMARY & ACCEPTANCES */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-light text-parchment mb-2">
                    Revisar datos de <span className="text-gold-bright italic font-normal">Despacho</span>
                  </h3>
                  <p className="text-xs text-slate-dim">
                    Confirma que la información procesada sea correcta. Esto genera la hoja de ruta definitiva.
                  </p>
                </div>

                {/* Summary Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* Service card */}
                  <div className="bg-ink-light border border-gold/10 p-4 rounded-sm flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-gold uppercase tracking-widest block mb-1">
                      Servicio Seleccionado
                    </span>
                    <span className="text-sm font-serif font-bold text-parchment">
                      {ROUTES.find((r) => r.id === form.serviceId)?.name || form.serviceId}
                    </span>
                    <span className="text-xs text-slate-dim">
                      {ROUTES.find((r) => r.id === form.serviceId)?.basePriceText}
                    </span>
                  </div>

                  {/* Package info card */}
                  <div className="bg-ink-light border border-gold/10 p-4 rounded-sm flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-gold uppercase tracking-widest block mb-1">
                      Detalle del Paquete
                    </span>
                    <span className="text-sm font-sans font-semibold text-parchment truncate">
                      {form.pkgDesc}
                    </span>
                    <span className="text-xs text-slate-dim">
                      Valor declarado: {form.pkgValor} • Frágil: {form.pkgFragil ? "SÍ" : "No"}
                    </span>
                  </div>

                  {/* Origin Card */}
                  <div className="bg-ink-light border border-gold/10 p-4 rounded-sm flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-gold uppercase tracking-widest block mb-1">
                      Contacto Origen
                    </span>
                    <span className="text-sm font-sans font-semibold text-parchment">
                      {form.origNombre} • {form.origTel}
                    </span>
                    <span className="text-xs text-slate-dim truncate">
                      {getOrigAddress()} ({form.origBarrio})
                    </span>
                  </div>

                  {/* Dest Card */}
                  <div className="bg-ink-light border border-gold/10 p-4 rounded-sm flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-gold uppercase tracking-widest block mb-1">
                      Contacto Destino
                    </span>
                    <span className="text-sm font-sans font-semibold text-parchment">
                      {form.destNombre} • {form.destTel}
                    </span>
                    <span className="text-xs text-slate-dim truncate">
                      {getDestAddress()} ({form.destBarrio})
                    </span>
                  </div>

                  {/* Route & Tariff Real-time Breakdown Card */}
                  <div className="md:col-span-2 bg-[#090D16] border-2 border-amber-400/30 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-amber-400 uppercase font-extrabold tracking-wider flex items-center gap-1.5">
                        <Navigation size={13} className="text-amber-400" />
                        Liquidación Geodésica GPS & Tarifas Vigentes
                      </span>
                      <a
                        href={routeMetrics.gpsDeepLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Ver en Google Maps</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="bg-black/50 p-2 rounded border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Distancia:</span>
                        <span className="text-white font-bold">{routeMetrics.distKm.toFixed(1)} KM</span>
                      </div>
                      <div className="bg-black/50 p-2 rounded border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Tarifa Base (≤3.0 km):</span>
                        <span className="text-white font-bold">$8.000 COP</span>
                      </div>
                      <div className="bg-black/50 p-2 rounded border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Km Extra ($1.500/km):</span>
                        <span className="text-amber-300 font-bold">
                          {routeMetrics.extraKm > 0 ? `+$${routeMetrics.extraKmCost.toLocaleString("es-CO")}` : "$0"}
                        </span>
                      </div>
                      <div className="bg-black/50 p-2 rounded border border-amber-400/20">
                        <span className="text-[10px] text-amber-400 block font-bold">Total Estimado:</span>
                        <span className="text-amber-300 font-black text-sm">
                          ${routeMetrics.nominalRate.toLocaleString("es-CO")} COP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Policies Accordion block */}
                <div className="bg-rust/5 border border-rust/20 rounded p-5 mb-8">
                  <div className="font-mono text-[10px] text-rust-bright font-bold uppercase tracking-wider mb-4">
                    📋 Políticas de Operación y Cobertura ÆON Fleet
                  </div>

                  <div className="flex flex-col gap-4 text-xs text-slate-dim leading-relaxed">
                    <div className="flex gap-3">
                      <span className="font-mono text-rust font-bold">1.</span>
                      <p>
                        <strong>Recargo Lluvia:</strong> Lluvia intensa aplica recargo de{" "}
                        <strong className="text-parchment">+$4.000 COP</strong> por envío debido a la extrema dificultad de tránsito.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-mono text-rust font-bold">2.</span>
                      <p>
                        <strong>Política Capital Cero:</strong> Todo encargo de compra (SVC-A) o trámites EPS (SVC-B) requiere{" "}
                        <strong className="text-parchment">fondos 100% anticipados</strong>. No financiamos operaciones.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-mono text-rust font-bold">3.</span>
                      <p>
                        <strong>Gracia de espera:</strong> Se brindan 10 minutos de cortesía en origen y destino. Pasado el lapso, aplica{" "}
                        <strong className="text-parchment">$500 COP / min</strong> de retraso, o cancelación sin reembolso.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-mono text-rust font-bold">4.</span>
                      <p>
                        <strong>Garantía SLA:</strong> Válida para causas operativas. Direcciones erróneas o destinatarios ausentes anulan la garantía.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checklist acceptance boxes */}
                <div className="flex flex-col gap-3 mb-8">
                  <label className="flex items-start gap-3 p-3.5 bg-ink-light border border-gold/10 rounded-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.chk1}
                      onChange={(e) => handleFieldChange("chk1", e.target.checked)}
                      className="mt-0.5 accent-gold cursor-pointer w-4 h-4 shrink-0"
                    />
                    <span className="text-xs text-slate-dim">
                      Acepto los <strong className="text-parchment">recargos operativos por lluvia</strong> (+$4.000) y de retraso de espera ($500/min), además del abono previo para servicios de compra.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-ink-light border border-gold/10 rounded-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.chk2}
                      onChange={(e) => handleFieldChange("chk2", e.target.checked)}
                      className="mt-0.5 accent-gold cursor-pointer w-4 h-4 shrink-0"
                    />
                    <span className="text-xs text-slate-dim">
                      Confirmo que las <strong className="text-parchment">direcciones y teléfonos suministrados son correctos</strong> y están completos. Entiendo que datos incorrectos invalidan las garantías operativas.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-ink-light border border-gold/10 rounded-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.chk3}
                      onChange={(e) => handleFieldChange("chk3", e.target.checked)}
                      className="mt-0.5 accent-gold cursor-pointer w-4 h-4 shrink-0"
                    />
                    <span className="text-xs text-slate-dim">
                      Declaro que el <strong className="text-parchment">contenido y valor del paquete son reales</strong>. Excluyo el envío de sustancias peligrosas, animales o dinero no declarado.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-ink-light border border-gold/10 rounded-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.chk4}
                      onChange={(e) => handleFieldChange("chk4", e.target.checked)}
                      className="mt-0.5 accent-gold cursor-pointer w-4 h-4 shrink-0"
                    />
                    <span className="text-xs text-slate-dim">
                      Acepto el <strong className="text-parchment">Horario del Reloj ÆON</strong> (8AM - 8PM) y que cortes de despacho pasados las 12 PM garantizan el envío en la ruta prioritaria de la mañana siguiente.
                    </span>
                  </label>
                </div>

                {/* Submit to WhatsApp action block */}
                <div className="flex flex-col gap-3">
                  <a
                    href={buildWALink()}
                    onClick={(e) => {
                      if (!validateStep(5)) {
                        e.preventDefault();
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold text-sm tracking-wider uppercase rounded-sm shadow-lg shadow-[#25D366]/20 transition-colors"
                  >
                    <MessageSquare size={18} fill="currentColor" />
                    Enviar Hoja de Pedido por WhatsApp
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gold/20 hover:border-gold/40 text-slate-dim hover:text-parchment font-mono text-xs uppercase tracking-wider rounded-sm transition-all"
                  >
                    <Printer size={14} />
                    Imprimir Copia Física de Respaldo
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation Buttons bottom panel */}
        <div className="flex justify-between items-center border-t border-gold/10 pt-6 mt-8">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-gold/15 rounded-sm font-mono text-xs uppercase tracking-wider text-slate-dim hover:text-parchment hover:border-gold/35 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              Atrás
            </button>
          ) : (
            <div />
          )}

          {step < 5 && (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-3 bg-gold hover:bg-gold-bright text-ink font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer ml-auto"
            >
              Siguiente
              <ArrowRight size={14} />
            </button>
          )}
        </div>

      </div>
    </motion.section>
  );
}
