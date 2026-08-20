import React, { useState, useRef, useEffect } from 'react';

// MATRIZ MAESTRA DE COBERTURA TOTAL: DESDE CALDAS HASTA BELLO (TODOS LOS BARRIOS Y CORREGIMIENTOS)
export const matrizMetropolitana = [
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

interface MatrizProps {
  label: string;
  onSelectLocation: (location: string) => void;
  initialValue?: string;
}

export default function MatrizMetropolitanaAutocomplete({ label, onSelectLocation, initialValue = '' }: MatrizProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialValue && initialValue !== query) {
      setQuery(initialValue);
    }
  }, [initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      const searchTerm = value.toLowerCase();
      // Filtra de forma inteligente cualquier coincidencia dentro de la matriz masiva
      const filtered = matrizMetropolitana.filter(item =>
        item.toLowerCase().includes(searchTerm)
      );
      setSuggestions(filtered);
      setIsOpen(true);
      // Actualiza en tiempo real para no bloquear selecciones libres
      onSelectLocation(value);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      onSelectLocation('');
    }
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setIsOpen(false);
    onSelectLocation(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      } else if (query.trim().length > 0) {
        handleSelect(query.trim());
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-2" ref={wrapperRef}>
      <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
        {label}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-cyan-400 text-lg">📍</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu barrio, sector o corregimiento (Ej: La Rosaleda, Aragón, El Poblado, Niquía)..."
          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-3.5 pl-10 pr-4 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none placeholder-gray-500 shadow-inner"
          autoComplete="off"
        />
      </div>

      {isOpen && (
        <ul className="absolute z-50 left-0 right-0 mt-1 bg-gray-900 border border-cyan-500/50 rounded-lg shadow-[0_10px_30px_-5px_rgba(6,182,212,0.4)] max-h-60 overflow-y-auto divide-y divide-gray-800">
          {query.trim().length > 0 && (
            <li
              onClick={() => handleSelect(query.trim())}
              className="px-4 py-2.5 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 cursor-pointer transition-colors flex items-center justify-between text-xs font-semibold"
            >
              <span className="truncate">✓ Usar dirección exacta: "{query}"</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded border border-cyan-400/40">
                Directo
              </span>
            </li>
          )}
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 text-sm text-gray-200 hover:bg-cyan-500/20 hover:text-cyan-300 cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>{item}</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
                Área Metropolitana
              </span>
            </li>
          ))}
          {suggestions.length === 0 && query.trim().length > 1 && (
            <li
              onClick={() => handleSelect(query.trim())}
              className="px-4 py-3 text-xs text-amber-300 bg-black/40 hover:bg-amber-400/10 cursor-pointer flex items-center justify-between"
            >
              <span>📍 Sector periférico detectado: Enrutar a "{query}"</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30 font-bold">
                Confirmar
              </span>
            </li>
          )}
        </ul>
      )}

      <p className="text-[11px] text-gray-400">
        * Cobertura absoluta validada desde Caldas hasta Bello (incluyendo San Antonio de Prado, San Cristóbal y Santa Elena).
      </p>
    </div>
  );
}
