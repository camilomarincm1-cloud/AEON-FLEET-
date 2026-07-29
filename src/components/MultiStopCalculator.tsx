import { useState, useMemo } from "react";
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
  FileText,
  Search,
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- HIERARCHICAL LOCATION DATABASE (MEDELLÍN & ABURRÁ VALLEY) ---

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

export const MACRO_ZONES: MacroZone[] = [
  {
    id: "poblado",
    name: "El Poblado / Sur Exclusivo",
    neighborhoods: [
      { id: "poblado_milla", name: "Milla de Oro", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo", popular: true },
      { id: "poblado_provenza", name: "Provenza", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo", popular: true },
      { id: "poblado_castropol", name: "Castropol", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo" },
      { id: "poblado_manila", name: "Manila", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo", popular: true },
      { id: "poblado_patio_bonito", name: "Patio Bonito", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo" },
      { id: "poblado_astorga", name: "Astorga", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo" },
      { id: "poblado_los_balsos", name: "Los Balsos", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo" },
      { id: "poblado_san_lucas", name: "San Lucas", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo" },
      { id: "poblado_san_diego", name: "San Diego", macroZoneId: "poblado", macroZoneName: "El Poblado / Sur Exclusivo" },
    ],
  },
  {
    id: "laureles",
    name: "Laureles / Estadio / Occidente",
    neighborhoods: [
      { id: "laureles_centro", name: "Laureles (Primer/Segundo Parque)", macroZoneId: "laureles", macroZoneName: "Laureles / Estadio / Occidente", popular: true },
      { id: "laureles_estadio", name: "Estadio / Velódromo", macroZoneId: "laureles", macroZoneName: "Laureles / Estadio / Occidente" },
      { id: "laureles_floresta", name: "La Floresta", macroZoneId: "laureles", macroZoneName: "Laureles / Estadio / Occidente" },
      { id: "laureles_conquistadores", name: "Conquistadores", macroZoneId: "laureles", macroZoneName: "Laureles / Estadio / Occidente" },
      { id: "laureles_san_javier", name: "San Javier", macroZoneId: "laureles", macroZoneName: "Laureles / Estadio / Occidente" },
      { id: "laureles_belen", name: "Belén (Fátima, Rosales, La Palma)", macroZoneId: "laureles", macroZoneName: "Laureles / Estadio / Occidente", popular: true },
    ],
  },
  {
    id: "centro",
    name: "Medellín Centro / Comercial",
    neighborhoods: [
      { id: "centro_san_antonio", name: "Centro / San Antonio", macroZoneId: "centro", macroZoneName: "Medellín Centro / Comercial", popular: true },
      { id: "centro_plaza_mayor", name: "Plaza Mayor / Alpujarra", macroZoneId: "centro", macroZoneName: "Medellín Centro / Comercial" },
      { id: "centro_villanueva", name: "Villanueva", macroZoneId: "centro", macroZoneName: "Medellín Centro / Comercial" },
      { id: "centro_perpetuo_socorro", name: "Perpetuo Socorro", macroZoneId: "centro", macroZoneName: "Medellín Centro / Comercial" },
      { id: "centro_guayaquil", name: "Guayaquil (El Hueco)", macroZoneId: "centro", macroZoneName: "Medellín Centro / Comercial", popular: true },
      { id: "centro_san_benito", name: "San Benito", macroZoneId: "centro", macroZoneName: "Medellín Centro / Comercial" },
      { id: "centro_prado", name: "Prado Centro", macroZoneId: "centro", macroZoneName: "Medellín Centro / Comercial" },
    ],
  },
  {
    id: "oriental",
    name: "Medellín Oriental / Centros de Salud",
    neighborhoods: [
      { id: "oriental_buenos_aires", name: "Buenos Aires", macroZoneId: "oriental", macroZoneName: "Medellín Oriental / Centros de Salud" },
      { id: "oriental_miraflores", name: "Miraflores", macroZoneId: "oriental", macroZoneName: "Medellín Oriental / Centros de Salud" },
      { id: "oriental_aranjuez", name: "Aranjuez", macroZoneId: "oriental", macroZoneName: "Medellín Oriental / Centros de Salud" },
      { id: "oriental_manrique", name: "Manrique", macroZoneId: "oriental", macroZoneName: "Medellín Oriental / Centros de Salud" },
      { id: "oriental_hospitales", name: "Hospital / Sevilla / San Pedro", macroZoneId: "oriental", macroZoneName: "Medellín Oriental / Centros de Salud", popular: true },
    ],
  },
  {
    id: "sur_metro",
    name: "Área Metropolitana Sur",
    neighborhoods: [
      { id: "sur_envigado_zuniga", name: "Envigado (Zúñiga / Milla Sur)", macroZoneId: "sur_metro", macroZoneName: "Área Metropolitana Sur", popular: true },
      { id: "sur_envigado_antillas", name: "Envigado (Las Antillas / Alcalá)", macroZoneId: "sur_metro", macroZoneName: "Área Metropolitana Sur" },
      { id: "sur_envigado_fizebad", name: "Envigado (Fizebad / Escobero)", macroZoneId: "sur_metro", macroZoneName: "Área Metropolitana Sur" },
      { id: "sur_itagui_centro", name: "Itagüí (Centro / Santa María)", macroZoneId: "sur_metro", macroZoneName: "Área Metropolitana Sur" },
      { id: "sur_sabaneta", name: "Sabaneta (Aves María / Mayorca)", macroZoneId: "sur_metro", macroZoneName: "Área Metropolitana Sur", popular: true },
      { id: "sur_la_estrella", name: "La Estrella", macroZoneId: "sur_metro", macroZoneName: "Área Metropolitana Sur" },
    ],
  },
  {
    id: "norte_metro",
    name: "Área Metropolitana Norte",
    neighborhoods: [
      { id: "norte_bello_niquia", name: "Bello (Niquía / Cabañas / Madera)", macroZoneId: "norte_metro", macroZoneName: "Área Metropolitana Norte", popular: true },
      { id: "norte_copacabana", name: "Copacabana", macroZoneId: "norte_metro", macroZoneName: "Área Metropolitana Norte" },
    ],
  },
];

// Flat list for fast searching
const ALL_NEIGHBORHOODS: NeighborhoodOption[] = MACRO_ZONES.flatMap((m) => m.neighborhoods);

// Distance matrix (in Kilometers) between Macro Zones
const ZONE_DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  poblado: { poblado: 2.5, laureles: 7.2, centro: 6.2, oriental: 8.0, sur_metro: 5.4, norte_metro: 16.5 },
  laureles: { poblado: 7.2, laureles: 2.5, centro: 4.5, oriental: 7.8, sur_metro: 10.5, norte_metro: 14.0 },
  centro: { poblado: 6.2, laureles: 4.5, centro: 2.0, oriental: 3.5, sur_metro: 11.5, norte_metro: 10.2 },
  oriental: { poblado: 8.0, laureles: 7.8, centro: 3.5, oriental: 2.5, sur_metro: 13.8, norte_metro: 9.5 },
  sur_metro: { poblado: 5.4, laureles: 10.5, centro: 11.5, oriental: 13.8, sur_metro: 3.0, norte_metro: 21.5 },
  norte_metro: { poblado: 16.5, laureles: 14.0, centro: 10.2, oriental: 9.5, sur_metro: 21.5, norte_metro: 3.0 },
};

export interface ExtraStop {
  id: string;
  neighborhoodId: string;
  address: string;
  contactName: string;
  contactPhone: string;
}

export interface TacticalAddress {
  streetType: string;
  streetNumber: string;
  crossNumber: string;
  details: string;
}

export const PRESET_ROUTES = [
  { label: "Poblado ➔ Laureles", originId: "poblado_provenza", destId: "laureles_centro" },
  { label: "Envigado ➔ Milla de Oro", originId: "sur_envigado_zuniga", destId: "poblado_milla" },
  { label: "Bello ➔ El Poblado", originId: "norte_bello_niquia", destId: "poblado_provenza" },
  { label: "Sabaneta ➔ Belén", originId: "sur_sabaneta", destId: "laureles_belen" },
  { label: "Centro ➔ San Lucas", originId: "centro_san_antonio", destId: "poblado_san_lucas" },
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
  return (
    <div className="bg-[#12141A]/90 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </span>
        <span className="text-[10px] text-slate-400 font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded font-bold">
          Captura Táctica Guía 1 - 4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Paso 1: Tipo de Vía */}
        <div className="md:col-span-4">
          <label className="text-[11px] font-mono text-slate-300 block mb-1 font-bold">
            1. Tipo de Vía
          </label>
          <select
            value={addressState.streetType}
            onChange={(e) => onAddressChange({ ...addressState, streetType: e.target.value })}
            className="w-full bg-[#0A0A0C] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none font-mono font-bold cursor-pointer"
          >
            <option value="">-- Selecciona Vía --</option>
            {STREET_TYPES.map((st) => (
              <option key={st.value} value={st.value} className="bg-[#0A0A0C] text-white">
                {st.label}
              </option>
            ))}
          </select>
        </div>

        {/* Paso 2: Numeración Principal & Cruce */}
        <div className="md:col-span-4">
          <label className="text-[11px] font-mono text-slate-300 block mb-1 font-bold">
            2. Vía Principal (N°)
          </label>
          <input
            type="text"
            placeholder="Ej: 72 Sur o 10A"
            value={addressState.streetNumber}
            onChange={(e) => onAddressChange({ ...addressState, streetNumber: e.target.value })}
            className="w-full bg-[#0A0A0C] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
          />
        </div>

        <div className="md:col-span-4">
          <label className="text-[11px] font-mono text-slate-300 block mb-1 font-bold">
            # Cruce / Placa
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-mono text-xs font-bold">#</span>
            <input
              type="text"
              placeholder="Ej: 14 - 05"
              value={addressState.crossNumber}
              onChange={(e) => onAddressChange({ ...addressState, crossNumber: e.target.value })}
              className="w-full bg-[#0A0A0C] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Paso 3: Zona / Barrio Específico */}
      <div>
        <HierarchicalNeighborhoodSelect
          label="3. Zona / Barrio Específico (Cuadrante Aburrá)"
          icon={<MapPin size={14} className="text-amber-400 shrink-0" />}
          value={neighborhoodId}
          onChange={onNeighborhoodChange}
          placeholder="-- Selecciona Barrio / Sector --"
        />
      </div>

      {/* Paso 4: Detalles Opcionales */}
      <div>
        <label className="text-[11px] font-mono text-slate-300 block mb-1 font-bold">
          4. Detalles Opcionales (Interior, Apto, Oficina, Torre, Local)
        </label>
        <input
          type="text"
          placeholder="Ej: Apt 302, Edificio Milla de Oro, Torre 2, Pedir firma en portería"
          value={addressState.details}
          onChange={(e) => onAddressChange({ ...addressState, details: e.target.value })}
          className="w-full bg-[#0A0A0C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-mono"
        />
      </div>

      {/* Persona de Contacto */}
      <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-mono text-slate-300 block mb-1">
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
          <label className="text-[11px] font-mono text-slate-300 block mb-1">
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
              placeholder="Escribe el barrio (ej: Provenza, Niquía, Belén)..."
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

  // Step 2: Modality Options & Dispatch Type
  const [dispatchModality, setDispatchModality] = useState<"ocasional" | "corporate">("ocasional");
  const [packageCapacity, setPackageCapacity] = useState<"morral" | "caja">("morral"); // "morral" = Incluido, "caja" = +$2.000
  const [hasCod, setHasCod] = useState<boolean>(false); // Recaudo COD (+$3.000 COP)
  const [codAmount, setCodAmount] = useState<string>("");

  // Step 3: Additional Services
  const [isExpress, setIsExpress] = useState<boolean>(false); // Express Flash (+40%)
  const [hasReturnReceipt, setHasReturnReceipt] = useState<boolean>(false); // Retorno de Guía (+$4.000 COP)

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
    const hasOriginStreet = Boolean(originTactical.streetNumber.trim());
    const hasDestArea = Boolean(destNeighborhoodId);
    const hasDestStreet = Boolean(destTactical.streetNumber.trim());
    const hasContactPhone = Boolean(destPhone.trim() || originPhone.trim() || senderPhone.trim());
    const hasDetails = Boolean(destTactical.details.trim() || originTactical.details.trim());

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

  // Calculate Distance in KM between Macro Zones + Micro Offsets
  const calculatedDistanceKm = useMemo(() => {
    if (!originObj || !destObj) return 0;
    const originMacro = originObj.macroZoneId;
    const destMacro = destObj.macroZoneId;

    if (originObj.id === destObj.id) return 1.8; // Same neighborhood
    if (originMacro === destMacro) return 3.2; // Same macro zone, different neighborhood

    const baseMatrixDist = ZONE_DISTANCE_MATRIX[originMacro]?.[destMacro] ?? 6.0;
    return baseMatrixDist;
  }, [originObj, destObj]);

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
  // Formula: $12.000 COP (Base primeros 2 KM) + $1.800 COP por cada KM adicional
  const BASE_PRICE = 12000;
  const EXTRA_KM_RATE = 1800;
  const extraKmCount = Math.max(0, calculatedDistanceKm - 2);
  const extraKmCost = Math.round(extraKmCount * EXTRA_KM_RATE);
  const baseLegPrice = BASE_PRICE + extraKmCost;

  // Extra Stops: +$5.000 COP per extra stop
  const extraStopsCost = extraStops.length * 5000;

  // Modality Charges
  const codCharge = hasCod ? 3000 : 0;
  const boxCapacityCharge = packageCapacity === "caja" ? 2000 : 0;
  const returnReceiptCharge = hasReturnReceipt ? 4000 : 0;

  // Subtotal before express fee
  const subtotalBeforeExpress = baseLegPrice + extraStopsCost + codCharge + boxCapacityCharge + returnReceiptCharge;
  const expressCharge = isExpress ? Math.round(subtotalBeforeExpress * 0.4) : 0;

  const totalCost = subtotalBeforeExpress + expressCharge;

  // Corporate Pack Anchor Effect ($12.400 COP per shipment base, up to 11 KM included)
  const CORPORATE_PACK_RATE = 12400;
  const corporateExtraKm = Math.max(0, calculatedDistanceKm - 11);
  const corporateExtraKmCost = Math.round(corporateExtraKm * 1500);
  const corporateEquivalentCost =
    CORPORATE_PACK_RATE + corporateExtraKmCost + extraStopsCost + codCharge + boxCapacityCharge + returnReceiptCharge + expressCharge;
  const b2bSavings = Math.max(0, totalCost - corporateEquivalentCost);

  // Operational 02:00 PM Cut-off Rule & SLA Helper
  const activeSlaInfo = useMemo(() => {
    const currentHour = new Date().getHours();

    if (dispatchModality === "corporate") {
      const isWithinVipWindow = currentHour >= 11 && currentHour < 17;
      return {
        mode: "corporate",
        label: isWithinVipWindow ? "Inmediato Corporate (< 45 min)" : "Corporate Prioritario (Ventana VIP 11 AM - 5 PM)",
        tag: "EXENCIÓN VIP",
        description: isWithinVipWindow
          ? "Atención prioritaria e inmediata dentro de la ventana de control de 11:00 AM a 05:00 PM."
          : "Ventana VIP inmediata activa de 11:00 AM a 05:00 PM. Despacho programado en primera franja operativa a las 10:00 AM.",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      };
    }

    if (currentHour < 14) {
      return {
        mode: "same_day",
        label: "Mismo Día (< 02:00 PM)",
        tag: "DESPACHO HOY",
        description: "Solicitud recibida antes de las 02:00 PM. Despacho y entrega garantizados hoy mismo.",
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      };
    } else {
      return {
        mode: "next_day_am",
        label: "Mañana AM (Post 02:00 PM)",
        tag: "RUTA MAÑANA AM",
        description: "Solicitud recibida después de las 02:00 PM. Programado automáticamente para la primera ruta del día siguiente a las 10:00 AM.",
        badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/40",
      };
    }
  }, [dispatchModality]);

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

  // Generate Professional Operational WhatsApp Payload
  const generateWhatsAppUrl = () => {
    const originFormatted = formatTacticalAddress(originTactical, originObj);
    const destFormatted = formatTacticalAddress(destTactical, destObj);

    const finalPrice = dispatchModality === "corporate" ? corporateEquivalentCost : totalCost;

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
    const loadText = packageCapacity === "caja" ? "Caja / Volumen Especial (+ $2.000 COP)" : "Morral Estándar (< 5kg)";
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
   • Gestión COD: ${codText}
   • Guía Física Devuelta: ${hasReturnReceipt ? "SÍ (Retorno a origen + $4.000 COP)" : "NO"}
   • Nota para el Piloto: ${pilotNotesText}

⏱️ *5. VENTANA OPERATIVA & SLA:*
   • Horario Flota: 10:00 AM - 08:00 PM (Lunes a Sábado)
   • Regla de Corte: 02:00 PM (Despacho mismo día)
   • SLA Asignado: ${activeSlaInfo.label} (${activeSlaInfo.tag})

💵 *TARIFA TOTAL ESTIMADA:* $${finalPrice.toLocaleString("es-CO")} COP
=========================================
¿Piloto en Boxer Negra verificado para asignación inmediata?`;

    return `https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#0A0A0C] border border-white/10 rounded-2xl p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden text-white font-mono backdrop-blur-xl">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full mb-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            VALLE DE ABURRÁ • MEDELLÍN & METRO
          </span>
          <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white">
            Cotizador & Hoja de Despacho VIP
          </h3>
        </div>

        <div>
          <span className="text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider block">
            $12.000 Base (2KM) + $1.800/KM
          </span>
        </div>
      </div>

      {/* TAB SELECTOR: Quick Mode vs Full Operational Mode */}
      <div className="flex bg-[#12141A] p-1.5 rounded-xl border border-white/10 mb-6 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab("quick")}
          className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "quick"
              ? "bg-amber-400 text-black shadow-lg"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Zap size={14} />
          <span>1. Enrutador & Cotizador</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("full")}
          className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "full"
              ? "bg-amber-400 text-black shadow-lg"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FileText size={14} />
          <span>2. Guía Operativa Completa</span>
        </button>
      </div>

      {/* ⏱️ HORARIO Y VENTANAS OPERATIVAS DE LA FLOTA (10:00 AM - 08:00 PM) */}
      <div className="bg-[#0A0A0C] border border-amber-500/30 rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Clock size={18} className="text-amber-400 shrink-0 animate-pulse" />
            <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
              Horario y Ventanas Operativas de la Flota
            </h4>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold uppercase">
            🟢 OPERATIVO AHORA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Item 1: Horario Oficial */}
          <div className="bg-[#12141A] border border-white/10 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block">
              ⏱️ Jornada Oficial de Operaciones
            </span>
            <p className="text-xs font-mono text-white font-bold">
              10:00 AM a 08:00 PM
            </p>
            <p className="text-[11px] font-mono text-slate-400">
              Lunes a Sábado en Valle de Aburrá. Ninguna operación inicia antes de las 10:00 AM.
            </p>
          </div>

          {/* Item 2: Regla de Corte SLA */}
          <div className="bg-[#12141A] border border-white/10 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block">
              📅 Regla de Corte SLA (02:00 PM)
            </span>
            <p className="text-xs font-mono text-slate-200">
              • <strong className="text-white">&lt; 02:00 PM:</strong> Despacho y entrega <strong className="text-amber-400">mismo día</strong>.
            </p>
            <p className="text-xs font-mono text-slate-200">
              • <strong className="text-white">&gt; 02:00 PM:</strong> Programado para <strong className="text-slate-300">mañana AM (10:00 AM)</strong>.
            </p>
          </div>

          {/* Item 3: Excepción VIP Corporate */}
          <div className="bg-gradient-to-r from-amber-400/10 via-emerald-500/15 to-emerald-500/10 border border-emerald-500/40 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-emerald-400 shrink-0" />
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                🚀 Excepción VIP Pack Corporate
              </span>
            </div>
            <p className="text-xs font-mono text-white font-bold">
              Atención Inmediata (&lt; 45 min)
            </p>
            <p className="text-[11px] font-mono text-slate-300">
              Exclusiva de 11:00 AM a 05:00 PM. Fuera de franja aplica regla general de rutas.
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 ATAJOS RÁPIDOS DE COTIZACIÓN EN 1 CLIC */}
      <div className="bg-[#12141A] border border-amber-400/30 rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
            <Zap size={15} />
            <span>Rutas Frecuentes: Cotización Express en 1 Clic</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">Nodos Clave Aburrá</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_ROUTES.map((route) => {
            const isActive = originNeighborhoodId === route.originId && destNeighborhoodId === route.destId;
            return (
              <button
                key={route.label}
                type="button"
                onClick={() => {
                  setOriginNeighborhoodId(route.originId);
                  setDestNeighborhoodId(route.destId);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-amber-400 text-black border-amber-400 shadow-md scale-[1.02]"
                    : "bg-[#0A0A0C] text-slate-300 border-white/10 hover:border-amber-400/50 hover:text-white"
                }`}
              >
                <span>⚡ {route.label}</span>
              </button>
            );
          })}
        </div>
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

      {/* STEP 2: MODALITY & CODES SELECTORS */}
      <div className="bg-[#12141A]/90 border border-white/10 rounded-2xl p-5 sm:p-6 mb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2 flex items-center gap-2">
          <Package size={16} />
          <span>2. Modalidad de Carga & Gestión Financiera</span>
        </span>

        {/* MODALITY SELECTOR: OCASIONAL VS PACK CORPORATE */}
        <div className="bg-[#0A0A0C] border border-white/15 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-amber-400 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white block">Tipo de Cliente / Plan de Despacho</span>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${activeSlaInfo.badgeColor}`}>
                  {activeSlaInfo.tag}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {activeSlaInfo.description}
              </span>
            </div>
          </div>

          <div className="flex bg-[#12141A] p-1 rounded-lg border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setDispatchModality("ocasional")}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-all cursor-pointer ${
                dispatchModality === "ocasional"
                  ? "bg-amber-400 text-black shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Ocasional (SLA 12 PM)
            </button>
            <button
              type="button"
              onClick={() => setDispatchModality("corporate")}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-all cursor-pointer flex items-center gap-1 ${
                dispatchModality === "corporate"
                  ? "bg-emerald-400 text-black shadow-md"
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              <Zap size={12} />
              Pack Corporate (&lt;45 min)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Modalidad 1: Capacity Selection */}
          <div className="bg-[#0A0A0C] border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PackageCheck size={18} className="text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">📦 Capacidad de Carga</span>
                <span className="text-[10px] text-slate-400">Morral técnico impermeable</span>
              </div>
            </div>

            <div className="flex bg-[#12141A] p-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setPackageCapacity("morral")}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded transition-all cursor-pointer ${
                  packageCapacity === "morral"
                    ? "bg-amber-400 text-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Morral (&lt;5kg)
              </button>
              <button
                type="button"
                onClick={() => setPackageCapacity("caja")}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded transition-all cursor-pointer ${
                  packageCapacity === "caja"
                    ? "bg-amber-400 text-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Caja (+ $2k)
              </button>
            </div>
          </div>

          {/* Modalidad 2: Recaudo COD (Contra Entrega) */}
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

            {/* Address Details Origen & Destino */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#12141A] border border-white/10 rounded-xl p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Detalles Adicionales de Origen</span>
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Interior, Apto, Oficina, Torre o Local Comercial"
                    value={originTactical.details}
                    onChange={(e) => setOriginTactical({ ...originTactical, details: e.target.value })}
                    className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Quien entrega"
                      value={originContact}
                      onChange={(e) => setOriginContact(e.target.value)}
                      className="bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={originPhone}
                      onChange={(e) => setOriginPhone(e.target.value)}
                      className="bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#12141A] border border-white/10 rounded-xl p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center gap-2">
                  <Navigation size={16} />
                  <span>Detalles Adicionales de Destino</span>
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Interior, Apto, Oficina, Torre o Local Comercial"
                    value={destTactical.details}
                    onChange={(e) => setDestTactical({ ...destTactical, details: e.target.value })}
                    className="w-full bg-[#0A0A0C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Destinatario"
                      value={destContact}
                      onChange={(e) => setDestContact(e.target.value)}
                      className="bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={destPhone}
                      onChange={(e) => setDestPhone(e.target.value)}
                      className="bg-[#0A0A0C] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
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

      {/* REAL-TIME CALCULATION RESULT CARD (SPACE MONO / DARK LUXURY) */}
      <AnimatePresence>
        {isCalculated ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
            className="space-y-6"
          >
            {/* DARK LUXURY CALCULATION SUMMARY */}
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
                  <div className="bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-xl font-mono text-xs text-amber-400 font-bold">
                    {calculatedDistanceKm.toFixed(1)} KM
                  </div>
                </div>
              </div>

              {/* Pricing Dual Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-white/10">
                {/* Occasional Total Price */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Precio Ocasional Total
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-mono font-extrabold text-amber-400 tracking-tight">
                      {formatCOP(totalCost)}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">COP</span>
                  </div>

                  {/* Technical Breakdown Subtext */}
                  <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                    <p className="flex items-center gap-1 text-slate-300">
                      <CheckCircle2 size={12} className="text-amber-400 shrink-0" />
                      <span>Base 2km ($12.000) + {extraKmCount > 0 ? `${extraKmCount.toFixed(1)}km trayecto urbano ($${formatCOP(extraKmCost)})` : "sin recargo distancia"}</span>
                    </p>
                    {extraStopsCost > 0 && (
                      <p className="text-slate-400">• Paradas adicionales: +{formatCOP(extraStopsCost)} COP</p>
                    )}
                    {codCharge > 0 && (
                      <p className="text-emerald-400">• Recaudo COD: +$3.000 COP</p>
                    )}
                    {boxCapacityCharge > 0 && (
                      <p className="text-slate-400">• Capacidad Caja Especial: +$2.000 COP</p>
                    )}
                    {expressCharge > 0 && (
                      <p className="text-amber-300">• Servicio Express Flash (+40%): +{formatCOP(expressCharge)} COP</p>
                    )}
                  </div>
                </div>

                {/* Inescapable Conversion Hook: Corporate Pack Anchor Effect */}
                <div className="border-t md:border-t-0 md:border-l border-white/10 pt-5 md:pt-0 md:pl-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold block mb-1 flex items-center gap-1.5">
                      <Sparkles size={14} />
                      <span>💡 Tarifa con Pack Corporate</span>
                    </span>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-400 tracking-tight">
                        {formatCOP(corporateEquivalentCost)}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-bold">COP</span>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs font-mono text-emerald-300">
                    <p className="font-bold mb-1">
                      $12.400 COP / envío (Incluye hasta 11 KM)
                    </p>
                    {corporateExtraKm > 0 && (
                      <p className="text-[10px] text-amber-300 mb-1">
                        • Excedente de ruta ({corporateExtraKm.toFixed(1)} km &gt; 11 km): +{formatCOP(corporateExtraKmCost)} COP
                      </p>
                    )}
                    {b2bSavings > 0 ? (
                      <p className="text-[11px] text-emerald-400 font-extrabold">
                        🔥 Ahorras {formatCOP(b2bSavings)} COP en este despacho comprando el Pack B2B.
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-300">
                        Congela tarifas sin sobrecostos por clima o tráfico.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Link to Packs */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
                <span>¿Realizas más de 10 envíos al mes en tu empresa?</span>
                <a href="#packs" className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1">
                  <span>Ver Planes Prepagados Corporate ➔</span>
                </a>
              </div>
            </div>

            {/* SEMÁFORO DE VERIFICACIÓN DE HOJA DE RUTA PARA EL DOMICILIARIO / PILOTO */}
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

            {/* OPERATIONAL WHATSAPP DISPATCH BUTTON */}
            <div className="space-y-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-black font-mono font-extrabold text-sm sm:text-base uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 cursor-pointer min-h-[56px]"
              >
                <Send size={20} />
                <span>DESPACHAR Y ENVIAR GUÍA A WHATSAPP ➔</span>
              </a>

              {activeTab === "quick" && (
                <p className="text-center text-[11px] text-slate-400 font-mono">
                  💡 Tip: Si deseas agregar nombres de quien entrega/recibe o direcciones con nomenclatura, haz clic en la pestaña <button type="button" onClick={() => setActiveTab("full")} className="text-amber-400 underline font-bold">"2. Guía Operativa Completa"</button>.
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
              El sistema asignará la distancia en kilómetros y calculará automáticamente la tarifa exacta con estándar de agencia B2B.
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* OPERATIONAL GUARANTEES FOOTER STRIP */}
      <div className="bg-black/90 border border-white/10 rounded-xl p-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-slate-300">
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
    </div>
  );
}
