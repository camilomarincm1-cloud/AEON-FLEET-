import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Trash2,
  Zap,
  Send,
  MapPin,
  Sparkles,
  Navigation,
  Clock,
  PackageCheck,
  Banknote,
  ChevronDown,
  Building2,
  Search,
  CheckCircle2,
  ShieldCheck,
  Package,
  AlertTriangle,
  Scale,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- HIERARCHICAL LOCATION DATABASE (MEDELLÍN, ABURRÁ VALLEY & CORREGIMIENTOS) ---

export interface NeighborhoodOption {
  id: string;
  name: string;
  macroZoneId: string;
  macroZoneName: string;
  popular?: boolean;
}

export interface MacroZone {
  id: string;
  name: string;
  neighborhoods: NeighborhoodOption[];
}

export interface ExtraStop {
  id: string;
  neighborhoodId: string;
  address: string;
  contactName: string;
  contactPhone: string;
}

export interface TacticalAddress {
  mode?: "guided" | "free";
  freeText?: string;
  streetType: string;
  streetNumber: string;
  crossNumber: string;
  details: string;
}

export const zonasCobertura = [
  // OPTIMIZACIÓN DE EMBUDO: Lo que más factura va primero.
  "--- ZONAS VIP / ALTA DEMANDA ---",
  "El Poblado (Milla de Oro / Provenza / Castropol / Manila)",
  "El Poblado (Los Balsos / San Lucas / Astorga)",
  "Laureles (Primer y Segundo Parque / Conquistadores)",
  "Centro (San Antonio / Plaza Mayor / Guayaquil / Villanueva)",

  "--- MEDELLÍN SUR & OCCIDENTE ---",
  "Belén (Fátima / Rosales / La Palma / Los Alpes)",
  "Guayabal (Cristo Rey / Parque / Santa Fe)",
  "Estadio (Velódromo / Floresta / Suramericana)",
  "San Javier (América / Santa Lucía)",

  "--- MEDELLÍN CENTRO & ORIENTE ---",
  "Prado Centro / Boston / Los Ángeles",
  "Buenos Aires / Miraflores / Loreto",

  "--- MEDELLÍN NORTE ---",
  "Aranjuez / Manrique / Campo Valdés",
  "Castilla / Doce de Octubre / Pedregal",
  "Robledo / Pilarica / Córdoba",

  "--- SUR METROPOLITANO (VALLE DE ABURRÁ) ---",
  "Envigado (Zúñiga / Milla Sur / La Ayurá)",
  "Envigado (Centro / Dorado / Las Antillas / Alcalá)",
  "Envigado (Loma del Escobero / Fizebad)",
  "Itagüí (Centro / Santa María / Simón Bolívar)",
  "Itagüí (Ditaires / San Pío / Viviendas del Sur)",
  "Sabaneta (Mayorca / Aves María / Centro / Carmelo)",
  "La Estrella (Centro / La Tablaza / Pueblo Viejo)",
  "Caldas (Centro / Variante / Locería)",

  "--- NORTE METROPOLITANO (VALLE DE ABURRÁ) ---",
  "Bello (Niquía / Cabañas / Madera / Barrio Pérez)",
  "Bello (Centro / París / Fontidueño)",
  "Copacabana (Centro / Machado / San Juan)",

  "--- CORREGIMIENTOS & ZONAS ESPECIALES ---",
  "San Antonio de Prado (Centro / Rosaleda / Limonar)",
  "San Cristóbal (Centro / Ciudadela Nuevo Occidente)",
  "Santa Elena (Vía Principal / Parque)",
  "Altavista (Sector Central)",
  "San Sebastián de Palmitas",
];

export const MACRO_ZONES: MacroZone[] = [
  {
    id: "vip",
    name: "🔥 ZONAS VIP / ALTA DEMANDA",
    neighborhoods: [
      { id: "poblado_milla", name: "El Poblado (Milla de Oro / Provenza / Castropol / Manila)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", popular: true },
      { id: "poblado_balsos", name: "El Poblado (Los Balsos / San Lucas / Astorga)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", popular: true },
      { id: "laureles_parques", name: "Laureles (Primer y Segundo Parque / Conquistadores)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", popular: true },
      { id: "centro_san_antonio", name: "Centro (San Antonio / Plaza Mayor / Guayaquil / Villanueva)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", popular: true },
    ],
  },
  {
    id: "medellin_sur_occidente",
    name: "MEDELLÍN SUR & OCCIDENTE",
    neighborhoods: [
      { id: "belen_fatima", name: "Belén (Fátima / Rosales / La Palma / Los Alpes)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", popular: true },
      { id: "guayabal_cristo", name: "Guayabal (Cristo Rey / Parque / Santa Fe)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente" },
      { id: "estadio_velodromo", name: "Estadio (Velódromo / Floresta / Suramericana)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente" },
      { id: "san_javier_america", name: "San Javier (América / Santa Lucía)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente" },
    ],
  },
  {
    id: "medellin_centro_oriente",
    name: "MEDELLÍN CENTRO & ORIENTE",
    neighborhoods: [
      { id: "prado_boston", name: "Prado Centro / Boston / Los Ángeles", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente" },
      { id: "buenos_aires_loreto", name: "Buenos Aires / Miraflores / Loreto", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente" },
    ],
  },
  {
    id: "medellin_norte",
    name: "MEDELLÍN NORTE",
    neighborhoods: [
      { id: "aranjuez_manrique", name: "Aranjuez / Manrique / Campo Valdés", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte" },
      { id: "castilla_pedregal", name: "Castilla / Doce de Octubre / Pedregal", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte" },
      { id: "robledo_pilarica", name: "Robledo / Pilarica / Córdoba", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte" },
    ],
  },
  {
    id: "sur_metropolitano",
    name: "SUR METROPOLITANO (VALLE DE ABURRÁ)",
    neighborhoods: [
      { id: "envigado_zuniga", name: "Envigado (Zúñiga / Milla Sur / La Ayurá)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", popular: true },
      { id: "envigado_centro", name: "Envigado (Centro / Dorado / Las Antillas / Alcalá)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano" },
      { id: "envigado_escobero", name: "Envigado (Loma del Escobero / Fizebad)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano" },
      { id: "itagui_centro", name: "Itagüí (Centro / Santa María / Simón Bolívar)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", popular: true },
      { id: "itagui_ditaires", name: "Itagüí (Ditaires / San Pío / Viviendas del Sur)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano" },
      { id: "sabaneta_mayorca", name: "Sabaneta (Mayorca / Aves María / Centro / Carmelo)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", popular: true },
      { id: "la_estrella_centro", name: "La Estrella (Centro / La Tablaza / Pueblo Viejo)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano" },
      { id: "caldas_centro", name: "Caldas (Centro / Variante / Locería)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano" },
    ],
  },
  {
    id: "norte_metropolitano",
    name: "NORTE METROPOLITANO (VALLE DE ABURRÁ)",
    neighborhoods: [
      { id: "bello_niquia", name: "Bello (Niquía / Cabañas / Madera / Barrio Pérez)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano", popular: true },
      { id: "bello_centro", name: "Bello (Centro / París / Fontidueño)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano" },
      { id: "copacabana_centro", name: "Copacabana (Centro / Machado / San Juan)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano" },
    ],
  },
  {
    id: "corregimientos",
    name: "CORREGIMIENTOS & ZONAS ESPECIALES",
    neighborhoods: [
      { id: "correg_prado", name: "San Antonio de Prado (Centro / Rosaleda / Limonar)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", popular: true },
      { id: "correg_cristobal", name: "San Cristóbal (Centro / Ciudadela Nuevo Occidente)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales" },
      { id: "correg_santa_elena", name: "Santa Elena (Vía Principal / Parque)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales" },
      { id: "correg_altavista", name: "Altavista (Sector Central)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales" },
      { id: "correg_palmitas", name: "San Sebastián de Palmitas", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales" },
    ],
  },
];

// Flat list for fast searching
const ALL_NEIGHBORHOODS: NeighborhoodOption[] = MACRO_ZONES.flatMap((m) => m.neighborhoods);

// Distance matrix (in Kilometers) between Macro Zones
const ZONE_DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  vip: { vip: 3.0, medellin_sur_occidente: 6.0, medellin_centro_oriente: 4.5, medellin_norte: 10.0, sur_metropolitano: 8.0, norte_metropolitano: 16.0, corregimientos: 16.0 },
  medellin_sur_occidente: { vip: 6.0, medellin_sur_occidente: 3.0, medellin_centro_oriente: 5.0, medellin_norte: 8.5, sur_metropolitano: 9.0, norte_metropolitano: 15.0, corregimientos: 12.0 },
  medellin_centro_oriente: { vip: 4.5, medellin_sur_occidente: 5.0, medellin_centro_oriente: 2.5, medellin_norte: 6.0, sur_metropolitano: 11.0, norte_metropolitano: 12.0, corregimientos: 15.0 },
  medellin_norte: { vip: 10.0, medellin_sur_occidente: 8.5, medellin_centro_oriente: 6.0, medellin_norte: 3.0, sur_metropolitano: 16.0, norte_metropolitano: 9.0, corregimientos: 15.0 },
  sur_metropolitano: { vip: 8.0, medellin_sur_occidente: 9.0, medellin_centro_oriente: 11.0, medellin_norte: 16.0, sur_metropolitano: 4.0, norte_metropolitano: 22.0, corregimientos: 12.0 },
  norte_metropolitano: { vip: 16.0, medellin_sur_occidente: 15.0, medellin_centro_oriente: 12.0, medellin_norte: 9.0, sur_metropolitano: 22.0, norte_metropolitano: 4.0, corregimientos: 25.0 },
  corregimientos: { vip: 16.0, medellin_sur_occidente: 12.0, medellin_centro_oriente: 15.0, medellin_norte: 15.0, sur_metropolitano: 12.0, norte_metropolitano: 25.0, corregimientos: 5.0 },
};

// Precise latitude and longitude coordinates for each neighborhood in Aburrá Valley
export const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  poblado_milla: { lat: 6.2085, lng: -75.5670 },
  poblado_balsos: { lat: 6.1920, lng: -75.5610 },
  laureles_parques: { lat: 6.2450, lng: -75.5900 },
  centro_san_antonio: { lat: 6.2465, lng: -75.5680 },
  belen_fatima: { lat: 6.2250, lng: -75.5920 },
  guayabal_cristo: { lat: 6.2120, lng: -75.5850 },
  estadio_velodromo: { lat: 6.2550, lng: -75.5920 },
  san_javier_america: { lat: 6.2500, lng: -75.6120 },
  prado_boston: { lat: 6.2530, lng: -75.5600 },
  buenos_aires_loreto: { lat: 6.2410, lng: -75.5480 },
  aranjuez_manrique: { lat: 6.2750, lng: -75.5580 },
  castilla_pedregal: { lat: 6.2900, lng: -75.5720 },
  robledo_pilarica: { lat: 6.2750, lng: -75.5980 },
  envigado_zuniga: { lat: 6.1820, lng: -75.5840 },
  envigado_centro: { lat: 6.1720, lng: -75.5900 },
  envigado_escobero: { lat: 6.1600, lng: -75.5750 },
  itagui_centro: { lat: 6.1720, lng: -75.6100 },
  itagui_ditaires: { lat: 6.1620, lng: -75.6200 },
  sabaneta_mayorca: { lat: 6.1510, lng: -75.6150 },
  la_estrella_centro: { lat: 6.1570, lng: -75.6430 },
  caldas_centro: { lat: 6.0910, lng: -75.6350 },
  bello_niquia: { lat: 6.3350, lng: -75.5500 },
  bello_centro: { lat: 6.3300, lng: -75.5600 },
  copacabana_centro: { lat: 6.3460, lng: -75.5120 },
  correg_prado: { lat: 6.1830, lng: -75.6580 },
  correg_cristobal: { lat: 6.2780, lng: -75.6350 },
  correg_santa_elena: { lat: 6.2050, lng: -75.5000 },
  correg_altavista: { lat: 6.2200, lng: -75.6300 },
  correg_palmitas: { lat: 6.3400, lng: -75.6800 },
};

/**
 * Derives spatial GPS coordinates from address inputs (Neighborhood + Street numbers)
 */
export function getTacticalCoordinates(
  tactical: TacticalAddress,
  neighborhoodId: string
): { lat: number; lng: number } | null {
  const base = NEIGHBORHOOD_COORDS[neighborhoodId];
  if (!base) {
    if (tactical.mode === "free" && tactical.freeText?.trim()) {
      return { lat: 6.2465, lng: -75.5680 };
    }
    return null;
  }

  let lat = base.lat;
  let lng = base.lng;

  const streetText =
    tactical.mode === "guided"
      ? `${tactical.streetType || ""} ${tactical.streetNumber || ""} ${tactical.crossNumber || ""}`
      : tactical.freeText || "";

  const numbers = streetText.match(/\d+/g);
  if (numbers && numbers.length >= 1) {
    const mainNum = parseInt(numbers[0], 10);
    const crossNum = numbers.length >= 2 ? parseInt(numbers[1], 10) : 0;
    const isCalle = /calle|cl|diagonal|dg|transversal|tv/i.test(streetText);

    if (mainNum > 0 && mainNum < 150) {
      const offsetMain = (mainNum % 35) * 0.00015;
      if (isCalle) lat += offsetMain - 0.0025;
      else lng -= offsetMain - 0.0025;
    }
    if (crossNum > 0 && crossNum < 150) {
      const offsetCross = (crossNum % 35) * 0.00015;
      if (isCalle) lng -= offsetCross - 0.0025;
      else lat += offsetCross - 0.0025;
    }
  }

  return { lat, lng };
}

/**
 * Calculates real-world road distance using Haversine formula + Aburrá Valley terrain coefficient
 */
export function computeHaversineDistanceKm(
  c1: { lat: number; lng: number },
  c2: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((c2.lat - c1.lat) * Math.PI) / 180;
  const dLng = ((c2.lng - c1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((c1.lat * Math.PI) / 180) *
      Math.cos((c2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = R * c;

  const drivingKm = straightKm < 0.2 ? 1.0 : Math.max(1.2, straightKm * 1.38);
  return Math.round(drivingKm * 10) / 10;
}

export interface ExtraStop {
  id: string;
  neighborhoodId: string;
  address: string;
  contactName: string;
  contactPhone: string;
}

export const PRESET_ROUTES = [
  { label: "Caldas ➔ El Poblado", originId: "caldas_centro", destId: "poblado_milla" },
  { label: "Envigado ➔ Milla de Oro", originId: "envigado_zuniga", destId: "poblado_milla" },
  { label: "Sabaneta ➔ Belén", originId: "sabaneta_mayorca", destId: "belen_fatima" },
  { label: "Poblado ➔ Laureles", originId: "poblado_balsos", destId: "laureles_parques" },
  { label: "San Antonio de Prado ➔ Centro", originId: "correg_prado", destId: "centro_san_antonio" },
  { label: "Bello ➔ El Poblado", originId: "bello_niquia", destId: "poblado_milla" },
  { label: "Copacabana ➔ Centro", originId: "copacabana_centro", destId: "centro_san_antonio" },
];

export const PACKAGE_QUICK_CHIPS = [
  "📄 Sobres / Documentos",
  "👕 E-commerce / Calzado",
  "🎂 Repostería / Frágil",
  "📱 Celular / Tecnología",
  "📦 Caja / Regalo Voluminoso",
];

export const PILOT_INSTRUCTION_CHIPS = [
  "Dejar en portería con vigilancia",
  "Llamar al cliente al llegar al destino",
  "Cobrar valor exacto en efectivo (COD)",
  "Subir a oficina / departamento",
  "Requerir firma y cédula de recibido",
];

export const STREET_TYPES = [
  { label: "Calle (Cl.)", value: "Calle" },
  { label: "Carrera (Cra.)", value: "Carrera" },
  { label: "Avenida (Av.)", value: "Avenida" },
  { label: "Circular (Cir.)", value: "Circular" },
  { label: "Transversal (Tv.)", value: "Transversal" },
  { label: "Diagonal (Dg.)", value: "Diagonal" },
  { label: "Autopista", value: "Autopista" },
];

interface TacticalAddressBuilderProps {
  title: string;
  icon: React.ReactNode;
  addressState: TacticalAddress;
  onAddressChange: (updated: TacticalAddress) => void;
  neighborhoodId: string;
  onNeighborhoodChange: (id: string) => void;
  contactName: string;
  onContactNameChange: (val: string) => void;
  contactPhone: string;
  onContactPhoneChange: (val: string) => void;
  contactLabel: string;
}

function TacticalAddressBuilder({
  title,
  icon,
  addressState,
  onAddressChange,
  neighborhoodId,
  onNeighborhoodChange,
  contactName,
  onContactNameChange,
  contactPhone,
  onContactPhoneChange,
  contactLabel,
}: TacticalAddressBuilderProps) {
  const mode = addressState.mode || "guided";

  const selectedNeighborhoodObj = useMemo(
    () => ALL_NEIGHBORHOODS.find((n) => n.id === neighborhoodId),
    [neighborhoodId]
  );

  const formattedPreview = useMemo(() => {
    if (addressState.mode === "free" && addressState.freeText?.trim()) {
      const nPart = selectedNeighborhoodObj
        ? ` — ${selectedNeighborhoodObj.name} (${selectedNeighborhoodObj.macroZoneName})`
        : "";
      return `${addressState.freeText.trim()}${nPart}`;
    }

    const via = addressState.streetType ? addressState.streetType : "";
    const num = addressState.streetNumber.trim() ? ` ${addressState.streetNumber.trim()}` : "";
    const cross = addressState.crossNumber.trim() ? ` # ${addressState.crossNumber.trim()}` : "";
    const streetPart = `${via}${num}${cross}`.trim();

    const neighborhoodPart = selectedNeighborhoodObj
      ? `${selectedNeighborhoodObj.name} (${selectedNeighborhoodObj.macroZoneName})`
      : "Barrio Por Definir";

    const detailsPart = addressState.details.trim() ? ` (${addressState.details.trim()})` : "";

    if (streetPart) {
      return `${streetPart} - ${neighborhoodPart}${detailsPart}`;
    }
    return `${neighborhoodPart}${detailsPart}`;
  }, [addressState, selectedNeighborhoodObj]);

  const handleStreetTypeSelect = (type: string) => {
    onAddressChange({
      ...addressState,
      mode: "guided",
      streetType: type,
    });
  };

  const handleAppendSuffix = (field: "streetNumber" | "crossNumber", suffix: string) => {
    const currentVal = addressState[field] || "";
    if (currentVal.endsWith(suffix)) {
      onAddressChange({
        ...addressState,
        mode: "guided",
        [field]: currentVal.slice(0, -suffix.length).trim(),
      });
    } else {
      const cleanVal = currentVal.trim();
      onAddressChange({
        ...addressState,
        mode: "guided",
        [field]: cleanVal ? `${cleanVal}${suffix}` : suffix.trim(),
      });
    }
  };

  const handleAddDetailTag = (tag: string) => {
    const currentDetails = addressState.details || "";
    if (currentDetails.includes(tag)) return;
    const newDetails = currentDetails.trim()
      ? `${currentDetails.trim()}, ${tag}`
      : tag;
    onAddressChange({
      ...addressState,
      mode: "guided",
      details: newDetails,
    });
  };

  return (
    <div className="bg-[#12141A]/90 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
      {/* Header & Mode Switcher */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </span>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center bg-[#0A0A0C] border border-white/15 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => onAddressChange({ ...addressState, mode: "guided" })}
            className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all font-bold cursor-pointer ${
              mode === "guided"
                ? "bg-amber-400 text-black shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚡ Asistente Nomenclatura
          </button>
          <button
            type="button"
            onClick={() => onAddressChange({ ...addressState, mode: "free" })}
            className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all font-bold cursor-pointer ${
              mode === "free"
                ? "bg-amber-400 text-black shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📝 Pegar Texto Completo
          </button>
        </div>
      </div>

      {/* Barrio / Zona Selector - Accessible first for routing */}
      <div>
        <HierarchicalNeighborhoodSelect
          label="1. Municipio & Barrio / Sector (Valle de Aburrá)"
          icon={<MapPin size={14} className="text-amber-400 shrink-0" />}
          value={neighborhoodId}
          onChange={onNeighborhoodChange}
          placeholder="-- Selecciona Barrio / Sector (Caldas hasta Bello / Copacabana) --"
        />
      </div>

      {/* Guided Mode (Asistente por Nomenclatura - Estructura Simplificada) */}
      {mode === "guided" ? (
        <div className="space-y-4 bg-black/40 p-4 rounded-lg border border-cyan-500/30">
          {/* Fila 1: Tipo de Vía y Número Principal */}
          <div className="flex gap-3">
            <select
              className="w-1/3 bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none font-mono text-xs sm:text-sm font-bold cursor-pointer"
              value={addressState.streetType || "Calle"}
              onChange={(e) =>
                onAddressChange({ ...addressState, mode: "guided", streetType: e.target.value })
              }
            >
              <option value="Calle">Calle</option>
              <option value="Carrera">Carrera</option>
              <option value="Avenida">Avenida</option>
              <option value="Transversal">Transversal</option>
              <option value="Diagonal">Diagonal</option>
              <option value="Circular">Circular</option>
            </select>

            <input
              type="text"
              placeholder="Ej: 43A Sur"
              value={addressState.streetNumber}
              onChange={(e) =>
                onAddressChange({ ...addressState, mode: "guided", streetNumber: e.target.value })
              }
              className="w-2/3 bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none font-mono text-xs sm:text-sm"
            />
          </div>

          {/* Fila 2: Cruce y Placa (El formato exacto que el cliente conoce) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/10 text-cyan-400 font-bold rounded-md border border-cyan-500/30 text-lg shrink-0 font-mono">
              #
            </div>
            <input
              type="text"
              placeholder="Ej: 5A - 113"
              value={addressState.crossNumber}
              onChange={(e) =>
                onAddressChange({ ...addressState, mode: "guided", crossNumber: e.target.value })
              }
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none font-mono text-xs sm:text-sm"
            />
          </div>

          {/* Fila 3: Detalles Específicos (Sin botones extraños, texto libre) */}
          <div>
            <input
              type="text"
              placeholder="Interior, Apto, Edificio, Portería (Opcional)"
              value={addressState.details}
              onChange={(e) =>
                onAddressChange({ ...addressState, mode: "guided", details: e.target.value })
              }
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none font-mono text-xs sm:text-sm"
            />
          </div>
        </div>
      ) : (
        /* Single Free Text Paste Mode */
        <div className="space-y-2 pt-1">
          <label className="text-[11px] font-mono text-slate-300 block font-bold">
            2. Pegar o Escribir Dirección Completa
          </label>
          <textarea
            rows={3}
            placeholder="Ej: Carrera 43A # 10A - 20, Edificio Milla de Oro, Apto 502, El Poblado"
            value={addressState.freeText || ""}
            onChange={(e) =>
              onAddressChange({ ...addressState, mode: "free", freeText: e.target.value })
            }
            className="w-full bg-[#0A0A0C] border border-amber-400/40 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono font-bold leading-relaxed"
          />
          <p className="text-[10px] font-mono text-slate-400">
            💡 <strong className="text-amber-400">Consejo:</strong> Copia y pega libremente la dirección como te la enviaron por WhatsApp o Google Maps.
          </p>
        </div>
      )}

      {/* Live Formatted Address Preview Badge */}
      <div className="bg-[#0A0A0C] border border-amber-400/30 p-2.5 rounded-xl flex items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center gap-2 overflow-hidden">
          <Navigation size={14} className="text-amber-400 shrink-0 animate-pulse" />
          <div className="truncate text-xs font-mono">
            <span className="text-slate-400 text-[10px] block">Dirección Formateada para Piloto GPS:</span>
            <span className="text-amber-300 font-bold truncate block">
              {formattedPreview || "Ingresa tu nomenclatura para previsualizar"}
            </span>
          </div>
        </div>
        <span className="text-[9px] font-mono bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded shrink-0 uppercase font-bold">
          GPS listo
        </span>
      </div>

      {/* Persona de Contacto */}
      <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-mono text-slate-300 block mb-1 font-bold">
            {contactLabel} (Nombre)
          </label>
          <input
            type="text"
            placeholder="Ej. Juan Carlos Ruiz"
            value={contactName}
            onChange={(e) => onContactNameChange(e.target.value)}
            className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
          />
        </div>
        <div>
          <label className="text-[11px] font-mono text-slate-300 block mb-1 font-bold">
            Teléfono / Celular de Contacto
          </label>
          <input
            type="tel"
            placeholder="Ej. 301 234 5678"
            value={contactPhone}
            onChange={(e) => onContactPhoneChange(e.target.value)}
            className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
}

// --- REUSABLE HIERARCHICAL NEIGHBORHOOD SELECTOR COMPONENT ---
interface HierarchicalSelectProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (neighborhoodId: string) => void;
  placeholder?: string;
}

function HierarchicalNeighborhoodSelect({
  label,
  icon,
  value,
  onChange,
  placeholder = "-- Selecciona Barrio / Sector --",
}: HierarchicalSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const selectedNeighborhood = useMemo(
    () => ALL_NEIGHBORHOODS.find((n) => n.id === value),
    [value]
  );

  const filteredNeighborhoods = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return ALL_NEIGHBORHOODS.filter(
      (n) => n.name.toLowerCase().includes(term) || n.macroZoneName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
          {icon}
          <span>{label}</span>
        </label>
        {selectedNeighborhood && (
          <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded font-bold">
            {selectedNeighborhood.macroZoneName}
          </span>
        )}
      </div>

      {/* Main Select Dropdown + Search Toggle */}
      <div className="relative">
        {!isSearching ? (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-[#0A0A0C] border border-white/15 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-mono text-white appearance-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none min-h-[50px] transition-all cursor-pointer font-bold pr-10"
            >
              <option value="" disabled className="text-slate-500">
                {placeholder}
              </option>
              {MACRO_ZONES.map((macro) => (
                <optgroup key={macro.id} label={`📍 ${macro.name}`} className="bg-[#12141A] text-amber-400 font-bold">
                  {macro.neighborhoods.map((n) => (
                    <option key={n.id} value={n.id} className="bg-[#0A0A0C] text-white py-1.5 font-normal">
                      {n.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <ChevronDown size={18} className="text-amber-400" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Escribe el barrio (ej: Provenza, Rosaleda, Niquía, Belén)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0A0C] border border-amber-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
            />
            <button
              type="button"
              onClick={() => {
                setIsSearching(false);
                setSearchTerm("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono underline"
            >
              Cancelar
            </button>

            {/* Live Search Results List */}
            {searchTerm.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#12141A] border border-white/20 rounded-xl max-h-48 overflow-y-auto z-50 shadow-2xl p-1">
                {filteredNeighborhoods.length > 0 ? (
                  filteredNeighborhoods.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => {
                        onChange(n.id);
                        setIsSearching(false);
                        setSearchTerm("");
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-mono text-white hover:bg-amber-400/20 hover:text-amber-300 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold">{n.name}</span>
                      <span className="text-[10px] text-slate-400">{n.macroZoneName}</span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-xs text-slate-400 font-mono text-center">
                    No encontramos barrios con "{searchTerm}". Revisa la lista desplegable.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Search Shortcut Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-0.5">
        <button
          type="button"
          onClick={() => setIsSearching(!isSearching)}
          className="text-amber-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
        >
          <Search size={12} />
          <span>{isSearching ? "Ver lista por zonas" : "Buscar barrio por nombre"}</span>
        </button>

        {selectedNeighborhood && (
          <span className="text-slate-300 font-mono truncate max-w-[200px]">
            Seleccionado: <strong className="text-white">{selectedNeighborhood.name}</strong>
          </span>
        )}
      </div>
    </div>
  );
}

export default function MultiStopCalculator() {
  // Step 1: Tactical Address State (Guided Vía + Nro + Barrio + Details)
  const [originTactical, setOriginTactical] = useState<TacticalAddress>({
    streetType: "Calle",
    streetNumber: "",
    crossNumber: "",
    details: "",
  });

  const [destTactical, setDestTactical] = useState<TacticalAddress>({
    streetType: "Carrera",
    streetNumber: "",
    crossNumber: "",
    details: "",
  });

  const [originNeighborhoodId, setOriginNeighborhoodId] = useState<string>("");
  const [destNeighborhoodId, setDestNeighborhoodId] = useState<string>("");

  // Step 2: Weight & Surcharge Modality
  // Weight options: 'estandar' (<=5kg, 40x40cm), 'sobrepeso' (5.1-10kg or >40x40cm, +$3.000 COP), 'pesada' (>10kg, CTA WhatsApp)
  const [weightCategory, setWeightCategory] = useState<"estandar" | "sobrepeso" | "pesada">("estandar");
  const [isSundayHoliday, setIsSundayHoliday] = useState<boolean>(false); // Recargo Domingo/Festivo +$3.000 COP
  const [hasCod, setHasCod] = useState<boolean>(false); // Recaudo COD (+$3.000 COP)
  const [codAmount, setCodAmount] = useState<string>("");

  // Step 3: Additional Services
  const [isExpress, setIsExpress] = useState<boolean>(false); // Express Flash (+40%)
  const [hasReturnReceipt, setHasReturnReceipt] = useState<boolean>(false); // Retorno de Guía (+$4.000 COP)
  const [acceptedHabeasData, setAcceptedHabeasData] = useState<boolean>(false); // Ley 1581 Colombia

  // Sender & Recipient Details
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [originContact, setOriginContact] = useState("");
  const [originPhone, setOriginPhone] = useState("");

  const [destContact, setDestContact] = useState("");
  const [destPhone, setDestPhone] = useState("");

  const [packageCategory, setPackageCategory] = useState("E-commerce & Tecnológica");
  const [packageDescription, setPackageDescription] = useState("");
  const [pilotNotes, setPilotNotes] = useState("");

  // Tab View Mode inside Calculator: 'quick' or 'full'
  const [activeTab, setActiveTab] = useState<"quick" | "full">("quick");

  // Multi-Stop Extra Stops
  const [extraStops, setExtraStops] = useState<ExtraStop[]>([]);

  // Selected Neighborhood Objects
  const originObj = useMemo(
    () => ALL_NEIGHBORHOODS.find((n) => n.id === originNeighborhoodId),
    [originNeighborhoodId]
  );
  const destObj = useMemo(
    () => ALL_NEIGHBORHOODS.find((n) => n.id === destNeighborhoodId),
    [destNeighborhoodId]
  );

  // Operational Completeness Verification (Courier / Pilot Guarantee)
  const verificationStatus = useMemo(() => {
    const hasOriginArea = Boolean(originNeighborhoodId);
    const hasOriginStreet =
      originTactical.mode === "free"
        ? Boolean(originTactical.freeText?.trim())
        : Boolean(originTactical.streetNumber.trim());
    const hasDestArea = Boolean(destNeighborhoodId);
    const hasDestStreet =
      destTactical.mode === "free"
        ? Boolean(destTactical.freeText?.trim())
        : Boolean(destTactical.streetNumber.trim());
    const hasContactPhone = Boolean(destPhone.trim() || originPhone.trim() || senderPhone.trim());
    const hasDetails = Boolean(
      destTactical.details.trim() ||
        originTactical.details.trim() ||
        (originTactical.mode === "free" && originTactical.freeText?.trim()) ||
        (destTactical.mode === "free" && destTactical.freeText?.trim())
    );

    let score = 0;
    if (hasOriginArea) score += 25;
    if (hasDestArea) score += 25;
    if (hasOriginStreet) score += 20;
    if (hasDestStreet) score += 20;
    if (hasContactPhone) score += 10;

    const isFullyVerified = score >= 80;

    return {
      score,
      isFullyVerified,
      hasOriginArea,
      hasOriginStreet,
      hasDestArea,
      hasDestStreet,
      hasContactPhone,
      hasDetails,
    };
  }, [
    originNeighborhoodId,
    originTactical,
    destNeighborhoodId,
    destTactical,
    destPhone,
    originPhone,
    senderPhone,
  ]);

  const isCalculated = Boolean(originObj && destObj);

  // Real OSRM Road Distance state & loader
  const [osrmDistanceKm, setOsrmDistanceKm] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState<boolean>(false);

  // Asynchronous OSRM Real Road Distance Fetcher
  useEffect(() => {
    const oCoords = getTacticalCoordinates(originTactical, originNeighborhoodId);
    const dCoords = getTacticalCoordinates(destTactical, destNeighborhoodId);

    if (!oCoords || !dCoords) {
      setOsrmDistanceKm(null);
      return;
    }

    const waypoints = [oCoords];
    for (const stop of extraStops) {
      if (stop.neighborhoodId && NEIGHBORHOOD_COORDS[stop.neighborhoodId]) {
        waypoints.push(NEIGHBORHOOD_COORDS[stop.neighborhoodId]);
      }
    }
    waypoints.push(dCoords);

    const coordsParam = waypoints
      .map((w) => `${w.lng.toFixed(6)},${w.lat.toFixed(6)}`)
      .join(";");

    let isSubscribed = true;
    setIsCalculatingDistance(true);

    fetch(`https://router.project-osrm.org/route/v1/driving/${coordsParam}?overview=false`)
      .then((res) => res.json())
      .then((data) => {
        if (!isSubscribed) return;
        if (data.code === "Ok" && data.routes && data.routes[0]) {
          const meters = data.routes[0].distance;
          const km = Math.max(1.0, Math.round((meters / 1000) * 10) / 10);
          setOsrmDistanceKm(km);
        } else {
          setOsrmDistanceKm(null);
        }
      })
      .catch(() => {
        if (isSubscribed) setOsrmDistanceKm(null);
      })
      .finally(() => {
        if (isSubscribed) setIsCalculatingDistance(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [originTactical, originNeighborhoodId, destTactical, destNeighborhoodId, extraStops]);

  // Calculate Real Road Distance in KM based on Exact Address Coordinates
  const calculatedDistanceKm = useMemo(() => {
    if (osrmDistanceKm !== null && osrmDistanceKm > 0) {
      return osrmDistanceKm;
    }

    const oCoords = getTacticalCoordinates(originTactical, originNeighborhoodId);
    const dCoords = getTacticalCoordinates(destTactical, destNeighborhoodId);

    if (!oCoords || !dCoords) {
      if (!originObj || !destObj) return 0;
      const originMacro = originObj.macroZoneId;
      const destMacro = destObj.macroZoneId;

      if (originObj.id === destObj.id) return 1.8;
      if (originMacro === destMacro) return 3.2;

      return ZONE_DISTANCE_MATRIX[originMacro]?.[destMacro] ?? 6.0;
    }

    let totalKm = 0;
    let prevCoords = oCoords;
    for (const stop of extraStops) {
      const stopCoords = stop.neighborhoodId ? NEIGHBORHOOD_COORDS[stop.neighborhoodId] : null;
      if (stopCoords) {
        totalKm += computeHaversineDistanceKm(prevCoords, stopCoords);
        prevCoords = stopCoords;
      }
    }
    totalKm += computeHaversineDistanceKm(prevCoords, dCoords);

    return Math.round(totalKm * 10) / 10;
  }, [
    osrmDistanceKm,
    originTactical,
    originNeighborhoodId,
    destTactical,
    destNeighborhoodId,
    extraStops,
    originObj,
    destObj,
  ]);

  // Extra stops handlers
  const handleAddStop = () => {
    if (extraStops.length >= 5) return;
    setExtraStops([
      ...extraStops,
      {
        id: `stop-${Date.now()}`,
        neighborhoodId: "",
        address: "",
        contactName: "",
        contactPhone: "",
      },
    ]);
  };

  const handleRemoveStop = (id: string) => {
    setExtraStops(extraStops.filter((s) => s.id !== id));
  };

  const handleUpdateStop = (id: string, field: keyof ExtraStop, value: string) => {
    setExtraStops(
      extraStops.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // --- FINANCIAL CALCULATION ENGINE ---
  // Tariff rules:
  // - Base Fija: $8.000 COP (Cubre los primeros 3,0 km de distancia calculada).
  // - Kilómetro Extra: $1.500 COP por km adicional (desde el km 3.1 en adelante).
  // - Piso Mínimo de Carrera: $8.000 COP.
  // - Redondeo: Math.ceil(precio / 100) * 100.
  const BASE_PRICE = 8000;
  const EXTRA_KM_RATE = 1500;
  const extraKmCount = Math.max(0, calculatedDistanceKm - 3.0);
  const extraKmCost = Math.round(extraKmCount * EXTRA_KM_RATE);
  const baseLegPrice = Math.max(8000, BASE_PRICE + extraKmCost);

  // Surcharges Module
  const weightSurcharge = weightCategory === "sobrepeso" ? 3000 : 0;
  const sundayHolidaySurcharge = isSundayHoliday ? 3000 : 0;
  const codCharge = hasCod ? 3000 : 0;
  const returnReceiptCharge = hasReturnReceipt ? 4000 : 0;
  const extraStopsCost = extraStops.length * 5000;

  // Subtotal calculation before express surcharge
  const rawSubtotal =
    baseLegPrice +
    weightSurcharge +
    sundayHolidaySurcharge +
    codCharge +
    returnReceiptCharge +
    extraStopsCost;

  const expressCharge = isExpress ? Math.round(rawSubtotal * 0.4) : 0;
  const rawTotal = rawSubtotal + expressCharge;

  // Math.ceil(precio / 100) * 100
  const totalCost = Math.ceil(rawTotal / 100) * 100;

  // --- PACK EXPRESS 6K (PLAN MÁS VENDIDO B2B) COMPARISON ENGINE ---
  // Pack Express 6K (10 envíos x $100.000 COP) -> $10.000 COP por cupón (cubre hasta 6,0 KM)
  // Excedente de distancia > 6,0 KM: $1.500 COP / KM extra
  const pack6kKmIncluded = 6.0;
  const pack6kUnitPrice = 10000;
  const pack6kExtraKmCount = Math.max(0, calculatedDistanceKm - pack6kKmIncluded);
  const pack6kExtraKmCost = Math.round(pack6kExtraKmCount * EXTRA_KM_RATE);
  const pack6kBaseLegPrice = pack6kUnitPrice + pack6kExtraKmCost;

  const pack6kRawSubtotal =
    pack6kBaseLegPrice +
    weightSurcharge +
    sundayHolidaySurcharge +
    codCharge +
    returnReceiptCharge +
    extraStopsCost;

  const pack6kExpressCharge = isExpress ? Math.round(pack6kRawSubtotal * 0.4) : 0;
  const pack6kRawTotal = pack6kRawSubtotal + pack6kExpressCharge;
  const pack6kTotalCost = Math.ceil(pack6kRawTotal / 100) * 100;

  const savingsWithPack6k = totalCost - pack6kTotalCost;

  // Active SLA Info
  const activeSlaInfo = useMemo(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 14) {
      return {
        label: "Mismo Día (< 02:00 PM)",
        tag: "DESPACHO HOY",
        description: "Solicitud recibida antes de las 02:00 PM. Despacho y entrega garantizados hoy mismo.",
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      };
    } else {
      return {
        label: "Mañana AM (Post 02:00 PM)",
        tag: "RUTA MAÑANA AM",
        description: "Solicitud recibida después de las 02:00 PM. Programado automáticamente para la primera ruta a las 10:00 AM.",
        badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/40",
      };
    }
  }, []);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatTacticalAddress = (
    tactical: TacticalAddress,
    neighborhoodObj?: NeighborhoodOption
  ): string => {
    if (tactical.mode === "free" && tactical.freeText?.trim()) {
      const nPart = neighborhoodObj
        ? ` — ${neighborhoodObj.name} (${neighborhoodObj.macroZoneName})`
        : "";
      return `${tactical.freeText.trim()}${nPart}`;
    }

    const via = tactical.streetType ? tactical.streetType : "";
    const num = tactical.streetNumber.trim() ? ` ${tactical.streetNumber.trim()}` : "";
    const cross = tactical.crossNumber.trim() ? ` # ${tactical.crossNumber.trim()}` : "";
    const streetPart = `${via}${num}${cross}`.trim();

    const neighborhoodPart = neighborhoodObj
      ? `${neighborhoodObj.name} (${neighborhoodObj.macroZoneName})`
      : "Barrio Por Definir";

    const detailsPart = tactical.details.trim() ? ` (${tactical.details.trim()})` : "";

    if (streetPart) {
      return `${streetPart} - ${neighborhoodPart}${detailsPart}`;
    }
    return `${neighborhoodPart}${detailsPart}`;
  };

  // Generate WhatsApp Payload with Deep Link GPS
  const generateWhatsAppUrl = () => {
    const originFormatted = formatTacticalAddress(originTactical, originObj);
    const destFormatted = formatTacticalAddress(destTactical, destObj);

    // Deep Link GPS URL
    const gpsDeepLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      originFormatted
    )}&destination=${encodeURIComponent(destFormatted)}&travelmode=driving`;

    if (weightCategory === "pesada") {
      const heavyMsg = `🚚 *SOLICITUD DE COTIZACIÓN PARA CARGA PESADA (>10 KG) — ÆON FLEET*
=========================================
📍 *1. PUNTO A (ORIGEN / RECOGIDA):*
   • Dirección: ${originFormatted}
   • Atiende: ${originContact.trim() || senderName.trim() || "Por definir"}
   • Teléfono: ${originPhone.trim() || senderPhone.trim() || "Por confirmar"}

🏁 *2. PUNTO B (DESTINO / ENTREGA):*
   • Dirección: ${destFormatted}
   • Recibe: ${destContact.trim() || "Por definir"}
   • Teléfono: ${destPhone.trim() || "Por confirmar"}

📦 *3. ESPECIFICACIONES DE CARGA PESADA:*
   • Peso estimado: > 10 kg / Volumen especial
   • Contenido: ${packageDescription.trim() || packageCategory}
   • Servicio Domingo / Festivo: ${isSundayHoliday ? "SÍ" : "NO"}
   • Notas: ${pilotNotes.trim() || "Sin observaciones adicionales"}

🗺️ *DEEP LINK GPS DE RUTA:*
${gpsDeepLink}
=========================================
Deseo cotizar la logística especial para Carga Pesada con la flota de Boxer Negra.`;
      return `https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(heavyMsg)}`;
    }

    // Standard Dispatch Message
    const finalPrice = totalCost;

    let extraStopsText = "";
    if (extraStops.length > 0) {
      extraStopsText = extraStops
        .map((s, idx) => {
          const stopObj = ALL_NEIGHBORHOODS.find((n) => n.id === s.neighborhoodId);
          const location = stopObj ? `${stopObj.name} (${stopObj.macroZoneName})` : s.address || `Parada ${idx + 2}`;
          const contact = s.contactName.trim() ? ` (${s.contactName} - ${s.contactPhone})` : "";
          return `   • Parada ${idx + 2}: ${location}${contact}`;
        })
        .join("\n");
    }

    const codText = hasCod ? `RECAUDO COD ACTIVADO: ${codAmount.trim() || "Por confirmar en sitio"}` : "Sin Recaudo COD";
    const loadText =
      weightCategory === "sobrepeso"
        ? "Sobrepeso / Volumen Especial (5.1kg - 10kg, +$3.000 COP)"
        : "Estándar (< 5kg, morral 40x40cm)";
    const contentText = packageDescription.trim() ? packageDescription.trim() : packageCategory;
    const pilotNotesText = pilotNotes.trim() ? pilotNotes.trim() : "Sin observaciones adicionales";
    const verificationBadge = verificationStatus.isFullyVerified
      ? "🟢 GUÍA 100% VERIFICADA"
      : "🟡 GUÍA EN COTIZACIÓN (PENDIENTE DATOS DE CAMPO)";

    const msg = `🚀 *SOLICITUD DE DESPACHO ÆON FLEET (${verificationBadge})*
=========================================
📍 *1. PUNTO A (ORIGEN / RECOGIDA):*
   • Dirección: ${originFormatted}
   • Atiende: ${originContact.trim() || senderName.trim() || "Por definir en sitio"}
   • Teléfono: ${originPhone.trim() || senderPhone.trim() || "Por confirmar"}

🏁 *2. PUNTO B (DESTINO / ENTREGA):*
   • Dirección: ${destFormatted}
   • Recibe: ${destContact.trim() || "Por definir en sitio"}
   • Teléfono: ${destPhone.trim() || "Por confirmar"}

${extraStopsText ? `📦 *3. PARADAS INTERMEDIAS:\n${extraStopsText}\n\n` : ""}📦 *4. DETALLES DE CARGA & PAGO:*
   • Contenido: ${contentText}
   • Formato: ${loadText}
   • Servicio Domingo / Festivo: ${isSundayHoliday ? "SÍ (+$3.000 COP)" : "NO"}
   • Gestión COD: ${codText}
   • Guía Física Devuelta: ${hasReturnReceipt ? "SÍ (Retorno a origen + $4.000 COP)" : "NO"}
   • Nota para el Piloto: ${pilotNotesText}

⏱️ *5. VENTANA OPERATIVA & SLA:*
   • Horario Flota: 10:00 AM - 08:00 PM (Lunes a Sábado)
   • Regla de Corte: 02:00 PM (Despacho mismo día)
   • SLA Asignado: ${activeSlaInfo.label} (${activeSlaInfo.tag})

💵 *TARIFA TOTAL ESTIMADA:* $${finalPrice.toLocaleString("es-CO")} COP

🗺️ *DEEP LINK GPS DE RUTA:*
${gpsDeepLink}
=========================================
¿Piloto en Boxer Negra verificado para asignación inmediata?`;

    return `https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full font-mono space-y-6">
      {/* QUICK PRESET ROUTE CHIPS */}
      <div className="bg-[#12141A]/80 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <Zap size={14} />
            <span>Rutas Frecuentes de Alta Demanda</span>
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            Carga rápida 1-Click
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_ROUTES.map((route) => {
            const isSelected =
              originNeighborhoodId === route.originId && destNeighborhoodId === route.destId;
            return (
              <button
                key={route.label}
                type="button"
                onClick={() => {
                  setOriginNeighborhoodId(route.originId);
                  setDestNeighborhoodId(route.destId);
                }}
                className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold ${
                  isSelected
                    ? "bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20"
                    : "bg-[#0A0A0C] text-slate-300 border-white/10 hover:border-amber-400/40 hover:text-white"
                }`}
              >
                {route.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB SELECTOR: CAPTURA RÁPIDA VS GUÍA COMPLETA */}
      <div className="flex bg-[#12141A] p-1.5 rounded-2xl border border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab("quick")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "quick"
              ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Zap size={16} />
          <span>1. Cotizador Expreso por Barrios</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("full")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "full"
              ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Package size={16} />
          <span>2. Guía Operativa Completa</span>
        </button>
      </div>

      {/* STEP 1: SELECTOR TÁCTICO DE DIRECCIONES VIALES (ORIGEN Y DESTINO) */}
      <div className="space-y-6 mb-8">
        <TacticalAddressBuilder
          title="1. Origen: Selector Táctico de Dirección de Recogida"
          icon={<MapPin size={16} className="text-amber-400 shrink-0" />}
          addressState={originTactical}
          onAddressChange={setOriginTactical}
          neighborhoodId={originNeighborhoodId}
          onNeighborhoodChange={setOriginNeighborhoodId}
          contactName={originContact}
          onContactNameChange={setOriginContact}
          contactPhone={originPhone}
          onContactPhoneChange={setOriginPhone}
          contactLabel="Atiende en Origen"
        />

        <TacticalAddressBuilder
          title="2. Destino: Selector Táctico de Dirección de Entrega"
          icon={<Navigation size={16} className="text-amber-400 shrink-0" />}
          addressState={destTactical}
          onAddressChange={setDestTactical}
          neighborhoodId={destNeighborhoodId}
          onNeighborhoodChange={setDestNeighborhoodId}
          contactName={destContact}
          onContactNameChange={setDestContact}
          contactPhone={destPhone}
          onContactPhoneChange={setDestPhone}
          contactLabel="Recibe en Destino"
        />
      </div>

      {/* STEP 2: MODALIDAD DE CARGA & RECARGOS */}
      <div className="bg-[#12141A]/90 border border-white/10 rounded-2xl p-5 sm:p-6 mb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2 flex items-center gap-2">
          <Package size={16} />
          <span>2. Modalidad de Carga & Gestión Financiera</span>
        </span>

        {/* SELECTOR DE PESO / VOLUMEN (ESTÁNDAR vs SOBREPESO vs PESADA) */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-300 block font-bold">
            📦 Dimensión y Peso del Paquete:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Option 1: Estándar */}
            <button
              type="button"
              onClick={() => setWeightCategory("estandar")}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                weightCategory === "estandar"
                  ? "bg-amber-400/15 border-amber-400 shadow-md"
                  : "bg-[#0A0A0C] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Estándar</span>
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                  +$0 COP
                </span>
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                Hasta 5 kg • Morral 40x40 cm
              </span>
            </button>

            {/* Option 2: Sobrepeso / Volumen Especial */}
            <button
              type="button"
              onClick={() => setWeightCategory("sobrepeso")}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                weightCategory === "sobrepeso"
                  ? "bg-amber-400/15 border-amber-400 shadow-md"
                  : "bg-[#0A0A0C] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Sobrepeso / Vol.</span>
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                  +$3.000 COP
                </span>
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                5.1 kg a 10 kg O &gt; 40x40 cm
              </span>
            </button>

            {/* Option 3: Carga Pesada (>10kg) */}
            <button
              type="button"
              onClick={() => setWeightCategory("pesada")}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                weightCategory === "pesada"
                  ? "bg-red-500/20 border-red-500 shadow-md"
                  : "bg-[#0A0A0C] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-red-400">Carga Pesada</span>
                <span className="text-[10px] font-mono text-red-400 font-bold bg-red-500/20 px-2 py-0.5 rounded">
                  &gt; 10 kg
                </span>
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                Requiere cotización WhatsApp
              </span>
            </button>
          </div>

          {/* UI Alert when Sobrepeso is active */}
          <AnimatePresence>
            {weightCategory === "sobrepeso" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2 text-xs font-mono text-amber-300">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    ⚠️ Este pedido requiere foto del paquete previa vía WhatsApp para coordinar logística.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RECARGOS Y OPCIONES SECUNDARIAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Recargo Domingo / Festivo */}
          <div
            onClick={() => setIsSundayHoliday(!isSundayHoliday)}
            className={`bg-[#0A0A0C] border p-3.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
              isSundayHoliday ? "border-amber-400 bg-amber-400/10" : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock size={18} className={isSundayHoliday ? "text-amber-400" : "text-slate-400"} />
              <div>
                <span className="text-xs font-bold text-white block">Servicio en Domingo / Festivo</span>
                <span className="text-[10px] text-slate-400">Recargo operativo (+ $3.000 COP)</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isSundayHoliday}
              onChange={() => {}}
              className="w-4 h-4 accent-amber-400 cursor-pointer shrink-0"
            />
          </div>

          {/* Recaudo COD (Contra Entrega) */}
          <div
            onClick={() => setHasCod(!hasCod)}
            className={`bg-[#0A0A0C] border p-3.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
              hasCod ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <Banknote size={18} className={hasCod ? "text-emerald-400" : "text-slate-400"} />
              <div>
                <span className="text-xs font-bold text-white block">🛒 Recaudo COD (Contra Entrega)</span>
                <span className="text-[10px] text-slate-400">Cobro en efectivo o QR (+ $3.000 COP)</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={hasCod}
              onChange={() => {}}
              className="w-4 h-4 accent-emerald-500 cursor-pointer shrink-0"
            />
          </div>
        </div>

        {/* Recaudo COD Amount Input */}
        <AnimatePresence>
          {hasCod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-2"
            >
              <div className="bg-[#0A0A0C] border border-emerald-500/30 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Monto Exacto a Recaudar en Destino:
                </span>
                <input
                  type="text"
                  placeholder="Ej. $125.000 COP"
                  value={codAmount}
                  onChange={(e) => setCodAmount(e.target.value)}
                  className="bg-[#12141A] border border-emerald-500/40 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono font-bold max-w-xs"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STEP 3: MULTI-STOP INTERMEDIATE ROUTING */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
            <span>Enrutamiento Multi-Parada Intermedia</span>
            {extraStops.length > 0 && (
              <span className="text-xs text-amber-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-bold">
                +{extraStops.length} paradas
              </span>
            )}
          </span>

          {extraStops.length < 5 && (
            <button
              type="button"
              onClick={handleAddStop}
              className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-amber-400/10 hover:bg-amber-400/20 px-3.5 py-2 rounded-xl border border-amber-400/30 transition-colors cursor-pointer min-h-[38px]"
            >
              <Plus size={14} />
              <span>[ + Añadir parada intermedia en ruta ]</span>
            </button>
          )}
        </div>

        {extraStops.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {extraStops.map((stop, index) => (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#12141A] border border-white/10 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 2}
                      </span>
                      <span className="text-xs font-mono font-bold text-white">
                        Parada Intermedia #{index + 2}
                      </span>
                      <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-bold">
                        +$5.000 COP
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveStop(stop.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                      title="Eliminar parada"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-mono">
                        Barrio / Sector Parada Intermedia
                      </label>
                      <select
                        value={stop.neighborhoodId}
                        onChange={(e) => handleUpdateStop(stop.id, "neighborhoodId", e.target.value)}
                        className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                      >
                        <option value="">-- Selecciona Barrio --</option>
                        {MACRO_ZONES.map((macro) => (
                          <optgroup key={macro.id} label={`📍 ${macro.name}`} className="bg-[#12141A] text-amber-400">
                            {macro.neighborhoods.map((n) => (
                              <option key={n.id} value={n.id} className="bg-[#0A0A0C] text-white">
                                {n.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-mono">
                        Dirección / Contacto Parada
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Cra 43A #1-50 (Juan Pérez)"
                        value={stop.address}
                        onChange={(e) => handleUpdateStop(stop.id, "address", e.target.value)}
                        className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* FULL OPERATIONAL FORM FIELDS (EXPANDABLE WHEN TAB 'FULL' IS ACTIVE) */}
      <AnimatePresence mode="wait">
        {activeTab === "full" && (
          <motion.div
            key="full-tab"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 mb-8 overflow-hidden"
          >
            {/* Sender / Company Info */}
            <div className="bg-[#12141A] border border-white/10 rounded-xl p-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center gap-2">
                <Building2 size={16} />
                <span>Detalles de Remitente / Empresa</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Nombre o Razón Social</label>
                  <input
                    type="text"
                    placeholder="Ej. Boutique Provenza / Carlos Ruiz"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Teléfono / WhatsApp Remitente</label>
                  <input
                    type="tel"
                    placeholder="Ej. 300 123 4567"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Special Services & Quick Instruction Chips */}
            <div className="bg-[#12141A] border border-white/10 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <Zap size={16} />
                <span>Instrucciones & Detalles para el Piloto en Boxer Negra</span>
              </h4>

              {/* Package Category Quick Chips */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-300 block font-mono font-bold">
                  📦 Tipo de Carga / Contenido:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PACKAGE_QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setPackageDescription(chip)}
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        packageDescription === chip
                          ? "bg-amber-400 text-black border-amber-400"
                          : "bg-[#0A0A0C] text-slate-300 border-white/10 hover:border-amber-400/40"
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="O escribe la descripción exacta (ej. 2 cajas de repuestos de 3kg)"
                  value={packageDescription}
                  onChange={(e) => setPackageDescription(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div
                  onClick={() => setIsExpress(!isExpress)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isExpress ? "bg-amber-400/15 border-amber-400" : "bg-[#0A0A0C] border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-white block">Despacho Express Flash (+40%)</span>
                    <span className="text-[10px] text-slate-400">Asignación prioritaria &lt;45 min</span>
                  </div>
                  <input type="checkbox" checked={isExpress} onChange={() => {}} className="w-4 h-4 accent-amber-400 cursor-pointer" />
                </div>

                <div
                  onClick={() => setHasReturnReceipt(!hasReturnReceipt)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    hasReturnReceipt ? "bg-amber-400/15 border-amber-400" : "bg-[#0A0A0C] border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-white block">Retorno de Guía Firmada (+ $4.000)</span>
                    <span className="text-[10px] text-slate-400">Devolución física a origen</span>
                  </div>
                  <input type="checkbox" checked={hasReturnReceipt} onChange={() => {}} className="w-4 h-4 accent-amber-400 cursor-pointer" />
                </div>
              </div>

              {/* Pilot Note Quick Chips */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] text-slate-300 block font-mono font-bold">
                  📝 Indicaciones Frecuentes para Entrega / Domiciliario:
                </label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {PILOT_INSTRUCTION_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        if (pilotNotes.includes(chip)) return;
                        setPilotNotes((prev) => (prev ? `${prev}. ${chip}` : chip));
                      }}
                      className="text-[10px] font-mono text-slate-300 bg-[#0A0A0C] border border-white/10 hover:border-amber-400/40 hover:text-white px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Ej. Dejar en recepción de Torre B. Pedir firma en documento adjunto."
                  value={pilotNotes}
                  onChange={(e) => setPilotNotes(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REAL-TIME CALCULATION RESULT CONTAINER (FIXED MIN-HEIGHT FOR CLS = 0) */}
      <div className="min-h-[260px] relative">
        <AnimatePresence mode="wait">
          {weightCategory === "pesada" ? (
            /* HEAVY LOAD (>10KG) SPECIAL CTA CASE */
            <motion.div
              key="heavy-load-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-[#160D0D] border border-red-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-red-500/30 pb-4">
                <Scale size={24} className="text-red-400 shrink-0" />
                <div>
                  <h3 className="text-base font-bold font-mono text-white">
                    Carga Pesada / Volumen Especial (&gt; 10 kg)
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">
                    La cotización automática se inhabilitó por requerir vehículo de apoyo o logística especial.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-xs font-mono text-red-300 leading-relaxed">
                <p className="font-bold mb-1">⚠️ ATENCIÓN OPERATIVA:</p>
                Para paquetes de más de 10 kg o con volumen superior al morral estándar, coordinamos la ruta directamente vía WhatsApp para asignarte la tarifa óptima.
              </div>

              {/* HABEAS DATA CHECKBOX FOR HEAVY LOAD */}
              <div className="flex items-start gap-2.5 bg-[#0A0A0C] border border-white/10 rounded-xl p-3.5">
                <input
                  type="checkbox"
                  id="habeasDataHeavy"
                  checked={acceptedHabeasData}
                  onChange={(e) => setAcceptedHabeasData(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-red-500 cursor-pointer shrink-0"
                />
                <label htmlFor="habeasDataHeavy" className="text-xs font-mono text-slate-300 leading-snug cursor-pointer">
                  Acepto los <span className="text-red-400 font-bold underline">Términos de Servicio</span> y la <span className="text-red-400 font-bold underline">Política de Tratamiento de Datos Personales</span> (Ley 1581 de Colombia).
                </label>
              </div>

              <a
                href={acceptedHabeasData ? generateWhatsAppUrl() : "#"}
                onClick={(e) => {
                  if (!acceptedHabeasData) {
                    e.preventDefault();
                    alert("⚠️ Debes aceptar la Política de Tratamiento de Datos Personales (Ley 1581) para cotizar.");
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full font-mono font-extrabold text-sm sm:text-base uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl min-h-[56px] ${
                  acceptedHabeasData
                    ? "bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-400 hover:to-red-500 text-white shadow-red-500/25 hover:shadow-red-500/40 cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                }`}
              >
                <Send size={20} />
                <span>COTIZAR CARGA PESADA POR WHATSAPP ➔</span>
              </a>
            </motion.div>
          ) : isCalculated ? (
            /* STANDARD CALCULATION CARD */
            <motion.div
              key="calculated-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* SUMMARY CARD */}
              <div className="bg-[#12141A] border border-amber-400/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Route Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 mb-6 gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                      Enrutamiento Seleccionado
                    </span>
                    <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2 flex-wrap">
                      <span className="text-amber-400">{originObj?.name}</span>
                      <span className="text-slate-500">➔</span>
                      <span className="text-amber-400">{destObj?.name}</span>
                      {extraStops.length > 0 && (
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          (+{extraStops.length} paradas)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 ${activeSlaInfo.badgeColor}`}>
                      <Clock size={12} />
                      <span>SLA: {activeSlaInfo.label}</span>
                    </span>
                    <div className="bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-xl font-mono text-xs text-amber-400 font-bold flex items-center gap-1.5">
                      {isCalculatingDistance ? (
                        <>
                          <Loader2 size={12} className="animate-spin text-amber-400" />
                          <span>Calculando ruta real...</span>
                        </>
                      ) : (
                        <>
                          <Navigation size={12} className="text-amber-400" />
                          <span>{calculatedDistanceKm.toFixed(1)} KM (Ruta vehicular real)</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing Display */}
                <div className="pb-6 border-b border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Precio Estimado de Carrera (Tarifa Individual Expresa)
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-mono font-extrabold text-amber-400 tracking-tight">
                      {formatCOP(totalCost)}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">COP</span>
                  </div>

                  {/* Breakdown Subtext */}
                  <div className="text-[11px] font-mono text-slate-400 space-y-1">
                    <p className="flex items-center gap-1 text-slate-300">
                      <CheckCircle2 size={12} className="text-amber-400 shrink-0" />
                      <span>
                        Base 3km ($8.000) + {extraKmCount > 0 ? `${extraKmCount.toFixed(1)}km extra ($${formatCOP(extraKmCost)})` : "sin recargo distancia"}
                      </span>
                    </p>
                    {weightSurcharge > 0 && (
                      <p className="text-amber-300">• Recargo Sobrepeso / Volumen: +$3.000 COP</p>
                    )}
                    {sundayHolidaySurcharge > 0 && (
                      <p className="text-amber-300">• Servicio Domingo / Festivo: +$3.000 COP</p>
                    )}
                    {extraStopsCost > 0 && (
                      <p className="text-slate-400">• Paradas adicionales: +{formatCOP(extraStopsCost)} COP</p>
                    )}
                    {codCharge > 0 && (
                      <p className="text-emerald-400">• Recaudo COD: +$3.000 COP</p>
                    )}
                    {expressCharge > 0 && (
                      <p className="text-amber-300">• Servicio Express Flash (+40%): +{formatCOP(expressCharge)} COP</p>
                    )}
                  </div>
                </div>

                {/* COMPARATIVA CON EL PLAN MÁS VENDIDO B2B (PACK EXPRESS 6K) */}
                <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/5 to-amber-500/15 border border-amber-400/40 space-y-3 font-mono shadow-xl">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-400/20 pb-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1.5">
                      <Sparkles size={15} className="text-amber-400 animate-pulse" />
                      <span>Comparativa con Plan Más Vendido (Pack Express 6K)</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                      MÁS VENDIDO B2B
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Tarifa Individual Expresa */}
                    <div className="bg-[#0A0A0C]/90 border border-white/15 p-3.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1 font-bold">
                        Tarifa Individual (Sin Plan)
                      </span>
                      <div className="text-xl sm:text-2xl font-bold font-mono text-slate-200">
                        {formatCOP(totalCost)} <span className="text-xs text-slate-400 font-normal">COP</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block mt-1">
                        Pago por trayecto individual
                      </span>
                    </div>

                    {/* Tarifa con Pack Express 6K */}
                    <div className="bg-amber-400/10 border border-amber-400/60 p-3.5 rounded-xl relative overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-amber-400 uppercase font-mono font-extrabold">
                          Con Pack Express 6K
                        </span>
                        <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-extrabold">
                          $10.000 / envío
                        </span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
                        {formatCOP(pack6kTotalCost)} <span className="text-xs text-amber-400/80 font-normal">COP</span>
                      </div>
                      <div className="text-[11px] font-mono font-bold mt-1.5">
                        {savingsWithPack6k > 0 ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 size={13} className="shrink-0" />
                            <span>¡Ahorras {formatCOP(savingsWithPack6k)} COP por envío! ({formatCOP(savingsWithPack6k * 10)} en 10 envíos)</span>
                          </span>
                        ) : (
                          <span className="text-amber-300">
                            Cubre hasta 6,0 KM por envío ($100.000 COP x 10 cupones)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1.5 text-[11px] font-mono text-slate-300 gap-2">
                    <span>
                      💡 El Pack Express 6K incluye 10 envíos prepagados para rutas de hasta 6 km con asignación prioritaria.
                    </span>
                    <a
                      href="#packs"
                      className="text-amber-400 hover:text-amber-300 font-extrabold underline shrink-0 flex items-center gap-1"
                    >
                      <span>Adquirir Pack ➔</span>
                    </a>
                  </div>
                </div>

                {/* CTA Link to Packs */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
                  <span>¿Realizas más de 10 envíos al mes en tu empresa?</span>
                  <a href="#packs" className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1">
                    <span>Ver Todos los Packs B2B ➔</span>
                  </a>
                </div>
              </div>

              {/* SEMÁFORO DE VERIFICACIÓN DE HOJA DE RUTA */}
              <div className="bg-[#0A0A0C] border border-white/10 rounded-xl p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full animate-pulse ${
                      verificationStatus.isFullyVerified ? "bg-emerald-500" : "bg-amber-400"
                    }`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Estado de Hoja de Ruta para Piloto:
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${
                    verificationStatus.isFullyVerified
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "bg-amber-400/20 text-amber-300 border-amber-400/40"
                  }`}>
                    {verificationStatus.score}% COMPLETADA
                  </span>
                </div>

                {/* Checklist items */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                  <div className={`p-2 rounded border flex items-center gap-1.5 ${
                    verificationStatus.hasOriginArea ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-white/5 border-white/10 text-slate-400"
                  }`}>
                    <CheckCircle2 size={12} className={verificationStatus.hasOriginArea ? "text-emerald-400" : "text-slate-500"} />
                    <span>📍 Barrio Recogida</span>
                  </div>
                  <div className={`p-2 rounded border flex items-center gap-1.5 ${
                    verificationStatus.hasOriginStreet ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-white/5 border-white/10 text-slate-400"
                  }`}>
                    <CheckCircle2 size={12} className={verificationStatus.hasOriginStreet ? "text-emerald-400" : "text-slate-500"} />
                    <span>🏠 Dirección N° Origen</span>
                  </div>
                  <div className={`p-2 rounded border flex items-center gap-1.5 ${
                    verificationStatus.hasDestArea ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-white/5 border-white/10 text-slate-400"
                  }`}>
                    <CheckCircle2 size={12} className={verificationStatus.hasDestArea ? "text-emerald-400" : "text-slate-500"} />
                    <span>🏁 Barrio Entrega</span>
                  </div>
                  <div className={`p-2 rounded border flex items-center gap-1.5 ${
                    verificationStatus.hasDestStreet ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-white/5 border-white/10 text-slate-400"
                  }`}>
                    <CheckCircle2 size={12} className={verificationStatus.hasDestStreet ? "text-emerald-400" : "text-slate-500"} />
                    <span>🏠 Dirección N° Destino</span>
                  </div>
                </div>
              </div>

              {/* HABEAS DATA CHECKBOX (LEY 1581 COLOMBIA) */}
              <div className="flex items-start gap-2.5 bg-[#0A0A0C] border border-white/10 rounded-xl p-3.5">
                <input
                  type="checkbox"
                  id="habeasDataStandard"
                  checked={acceptedHabeasData}
                  onChange={(e) => setAcceptedHabeasData(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-amber-400 cursor-pointer shrink-0"
                />
                <label htmlFor="habeasDataStandard" className="text-xs font-mono text-slate-300 leading-snug cursor-pointer">
                  Acepto los <span className="text-amber-400 font-bold underline">Términos de Servicio</span> y la <span className="text-amber-400 font-bold underline">Política de Tratamiento de Datos Personales</span> (Ley 1581 de Colombia).
                </label>
              </div>

              {/* OPERATIONAL WHATSAPP DISPATCH BUTTON */}
              <div className="space-y-2">
                <a
                  href={acceptedHabeasData ? generateWhatsAppUrl() : "#"}
                  onClick={(e) => {
                    if (!acceptedHabeasData) {
                      e.preventDefault();
                      alert("⚠️ Debes aceptar la Política de Tratamiento de Datos Personales (Ley 1581) para cotizar y despachar.");
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full font-mono font-extrabold text-sm sm:text-base uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl min-h-[56px] ${
                    acceptedHabeasData
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-black shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 cursor-pointer"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  }`}
                >
                  <Send size={20} />
                  <span>DESPACHAR Y ENVIAR GUÍA A WHATSAPP ➔</span>
                </a>

                {activeTab === "quick" && (
                  <p className="text-center text-[11px] text-slate-400 font-mono">
                    💡 Tip: Si deseas agregar nombres de quien entrega/recibe o indicaciones especiales, usa la pestaña <button type="button" onClick={() => setActiveTab("full")} className="text-amber-400 underline font-bold">"2. Guía Operativa Completa"</button>.
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#12141A]/60 border border-white/10 border-dashed rounded-2xl p-8 text-center text-slate-400 text-xs font-mono space-y-2">
              <Navigation size={24} className="mx-auto text-amber-400/60 mb-2 animate-pulse" />
              <span className="font-bold text-white block">
                👈 Selecciona el Barrio de Recogida y Barrio de Entrega
              </span>
              <p className="text-slate-400 max-w-md mx-auto">
                El sistema asignará la distancia en kilómetros y calculará automáticamente la tarifa exacta de $8.000 COP base.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* OPERATIONAL GUARANTEES & LEGAL CLAUSE FOOTER STRIP */}
      <div className="bg-black/90 border border-white/10 rounded-xl p-4 mt-8 space-y-3 font-mono text-xs text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5">
            <Clock size={16} className="text-amber-400 shrink-0" />
            <span><strong>Tiempo:</strong> Recogida en &lt;45 min con piloto en Boxer Negra.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-amber-400 shrink-0" />
            <span><strong>Garantía:</strong> Trazabilidad 100% y seguro de mercancía incluido.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Banknote size={16} className="text-amber-400 shrink-0" />
            <span><strong>COD:</strong> Recaudo en destino con transferencia inmediata a tu cuenta.</span>
          </div>
        </div>

        {/* LEGAL LIABILITY CLAUSES */}
        <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 space-y-1">
          <p className="flex items-center gap-1.5">
            <ShieldAlert size={14} className="text-amber-400 shrink-0" />
            <span>Incluye 10 min de espera sin costo en punto de entrega (Adicional: $3.000 / 15 min).</span>
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldAlert size={14} className="text-amber-400 shrink-0" />
            <span>ÆON Fleet no transporta sustancias ilícitas ni material peligroso.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
