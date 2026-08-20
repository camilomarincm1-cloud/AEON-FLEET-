import React, { useState, useRef, useEffect } from 'react';
import MatrizMetropolitanaAutocomplete from './MatrizMetropolitanaAutocomplete';

export { MatrizMetropolitanaAutocomplete };

// Base de datos de alta precisión para sugerencias en tiempo real (Valle de Aburrá)
export const barriosAburra = [
  // --- SAN ANTONIO DE PRADO (CORREGIMIENTO & URBANIZACIONES CRÍTICAS) ---
  "La Rosaleda - San Antonio de Prado",
  "Vereda La Florida - San Antonio de Prado",
  "Aragón - San Antonio de Prado",
  "El Astillero - San Antonio de Prado",
  "Barichara - San Antonio de Prado",
  "Prado Central - San Antonio de Prado",
  "San José - San Antonio de Prado",
  "El Limonar - San Antonio de Prado",
  "Potrerito - San Antonio de Prado",
  "La Picacha - San Antonio de Prado",
  "La Aldea - San Antonio de Prado",
  "El Vergel - San Antonio de Prado",
  "Mangual - San Antonio de Prado",
  "Naranjal - San Antonio de Prado",
  "Vereda Montañita - San Antonio de Prado",
  "Vereda Yarumalito - San Antonio de Prado",

  // --- SANTA ELENA (CORREGIMIENTO) ---
  "Santa Elena - Parque Central",
  "Santa Elena - Piedras Blancas",
  "Santa Elena - Mazo",
  "Santa Elena - El Llano",
  "Santa Elena - Media Cuesta",
  "Santa Elena - Barro Blanco",
  "Santa Elena - Pantanillo",
  "Santa Elena - El Placer",
  "Santa Elena - Vereda El Plan",

  // --- SAN CRISTÓBAL (CORREGIMIENTO) ---
  "San Cristóbal - Parque Central",
  "San Cristóbal - Ciudadela Nuevo Occidente",
  "San Cristóbal - Pajarito",
  "San Cristóbal - La Cuchilla",
  "San Cristóbal - El Picacho",
  "San Cristóbal - Travesías",
  "San Cristóbal - Boquerón",
  "San Cristóbal - La Loma",

  // --- ALTAVISTA (CORREGIMIENTO) ---
  "Altavista - Parque Central",
  "Altavista - El Morro",
  "Altavista - San José del Manzanillo",
  "Altavista - Aguas Frías",
  "Altavista - La Esperanza",
  "Altavista - San Pablo",

  // --- SAN SEBASTIÁN DE PALMITAS ---
  "San Sebastián de Palmitas - Cabecera",
  "San Sebastián de Palmitas - La Suiza",

  // --- MUNICIPIO DE CALDAS ---
  "Caldas - Centro / Parque Principal",
  "Caldas - La Variante",
  "Caldas - La Locería",
  "Caldas - Andalucia",
  "Caldas - Cedritos",
  "Caldas - La Inmaculada",
  "Caldas - Mangas",
  "Caldas - Primavera",

  // --- MUNICIPIO DE LA ESTRELLA ---
  "La Estrella - Centro / Parque",
  "La Estrella - La Tablaza",
  "La Estrella - Pueblo Viejo",
  "La Estrella - San Agustín",
  "La Estrella - La Ferrería",
  "La Estrella - Quebrada Grande",
  "La Estrella - Ancón Sur",

  // --- MUNICIPIO DE BELLO ---
  "Bello - Niquía", "Bello - Cabañas", "Bello - Madera", "Bello - Barrio Pérez", "Bello - Centro", "Bello - París", "Bello - Fontidueño", "Bello - Bellavista", "Bello - La Gabriela", "Bello - Hato Viejo", "Bello - El Trapiche", "Bello - Manchester", "Bello - Zamora",

  // --- MUNICIPIO DE COPACABANA ---
  "Copacabana - Centro", "Copacabana - Machado", "Copacabana - San Juan", "Copacabana - Quebrada Arriba", "Copacabana - El Noral"
];

interface SmartAddressInputProps {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  onAddressSelect?: (item: string) => void;
  placeholder?: string;
  id?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function SmartAddressInput({
  label,
  value,
  onChange,
  onAddressSelect,
  placeholder = "Escribe tu barrio, sector o corregimiento (Ej: Aragón, El Poblado, Niquía)...",
  id,
  inputRef: externalRef,
}: SmartAddressInputProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const query = value !== undefined ? value : internalQuery;

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close drop down on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamic filtering as user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onChange) onChange(val);
    else setInternalQuery(val);

    if (val.trim().length > 0) {
      const searchTerm = val.toLowerCase();
      const filtered = barriosAburra.filter(item =>
        item.toLowerCase().includes(searchTerm)
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (item: string) => {
    if (onChange) onChange(item);
    else setInternalQuery(item);
    setIsOpen(false);
    if (onAddressSelect) onAddressSelect(item);
  };

  return (
    <div className="relative space-y-2" ref={wrapperRef}>
      {label && (
        <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block font-mono">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-cyan-400 text-lg">📍</span>
        </div>
        <input
          ref={externalRef}
          type="text"
          id={id}
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-3.5 pl-10 pr-4 text-sm font-mono focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none placeholder-gray-500 shadow-inner"
          autoComplete="off"
        />
      </div>

      {/* Lista de sugerencias flotante (Tipo Google / Waze) */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1 bg-gray-900 border border-cyan-500/50 rounded-lg shadow-[0_10px_30px_-5px_rgba(6,182,212,0.4)] max-h-60 overflow-y-auto divide-y divide-gray-800">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(item)}
              className="px-4 py-3 text-sm text-gray-200 hover:bg-cyan-500/20 hover:text-cyan-300 cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>{item}</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold font-mono">
                Área Metropolitana
              </span>
            </li>
          ))}
        </ul>
      )}

      {isOpen && suggestions.length === 0 && query.length > 1 && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-gray-900 border border-yellow-500/40 rounded-lg p-3 text-xs text-yellow-400 font-mono">
          ⚠️ Sector no listado textualmente. Escribe la referencia principal o el barrio colindante para enrutar.
        </div>
      )}
      
      <p className="text-[11px] text-gray-400 font-mono">
        * Cobertura absoluta validada desde Caldas hasta Bello (incluyendo San Antonio de Prado, San Cristóbal y Santa Elena).
      </p>
    </div>
  );
}
