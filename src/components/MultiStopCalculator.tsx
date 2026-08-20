import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Zap,
  Send,
  MapPin,
  Sparkles,
  Navigation,
  Clock,
  Banknote,
  Building2,
  Search,
  ShieldCheck,
  Package,
  Scale,
  ArrowRightLeft,
  X,
  Phone,
  User,
  ChevronDown,
  ChevronUp,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Crosshair,
  LocateFixed,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { barriosAburra } from "./SmartAddressInput";

// --- HIERARCHICAL LOCATION DATABASE (MEDELLÍN, ABURRÁ VALLEY & CORREGIMIENTOS) ---

export interface NeighborhoodOption {
  id: string;
  name: string;
  macroZoneId: string;
  macroZoneName: string;
  municipality?: string;
  popular?: boolean;
  landmark?: string;
}

export interface MacroZone {
  id: string;
  name: string;
  neighborhoods: NeighborhoodOption[];
}

export const MACRO_ZONES: MacroZone[] = [
  {
    id: "vip",
    name: "🔥 ZONAS VIP / ALTA DEMANDA",
    neighborhoods: [
      { id: "poblado_provenza", name: "El Poblado (Provenza / Lleras / Vía Primavera)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Parque Lleras" },
      { id: "poblado_milla", name: "El Poblado (Milla de Oro / Av. El Poblado)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "C.C. Santafé / San Fernando" },
      { id: "poblado_manila", name: "El Poblado (Manila / Astorga / Patio Bonito)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Estación Metro Poblado" },
      { id: "poblado_balsos", name: "El Poblado (Los Balsos 1 y 2 / San Lucas / Campestre)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Los Balsos" },
      { id: "poblado_tesoro", name: "El Poblado (El Tesoro / Los Parras / Vizcaya)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "C.C. El Tesoro" },
      { id: "poblado_castropol", name: "El Poblado (Castropol / Lalinde / El Castillo / Los Naranjos)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Castropol" },
      { id: "poblado_lomas", name: "El Poblado (Las Lomas 1 y 2 / Santa María de los Ángeles / Zúñiga)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Las Lomas" },
      { id: "laureles_1er_parque", name: "Laureles (Primer Parque / Av. Nutibara)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Primer Parque Laureles" },
      { id: "laureles_2do_parque", name: "Laureles (Segundo Parque / San Joaquín / Bolivariana)", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Segundo Parque Laureles" },
      { id: "laureles_conquistadores", name: "Conquistadores / Parques del Río / Bulerías", macroZoneId: "vip", macroZoneName: "Zonas VIP / Alta Demanda", municipality: "Medellín", popular: true, landmark: "Parques del Río" },
    ],
  },
  {
    id: "medellin_sur_occidente",
    name: "MEDELLÍN SUR & OCCIDENTE",
    neighborhoods: [
      { id: "belen_fatima", name: "Belén (Fátima / Rosales / Nutibara)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", popular: true, landmark: "Unicentro" },
      { id: "belen_la_palma", name: "Belén (La Palma / Los Alpes / C.C. Los Molinos)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", popular: true, landmark: "C.C. Los Molinos" },
      { id: "belen_granada", name: "Belén (Granada / San Bernardo / Malaber / El Nogal / Rincón)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "Parque de Belén" },
      { id: "guayabal_cristo", name: "Guayabal (Cristo Rey / Trinidad / San Rafael / Campo Amor / Santa Fe)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "Aeropuerto Olaya Herrera" },
      { id: "guayabal_rodeo", name: "Guayabal (El Rodeo / Mayorca Sur)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "El Rodeo" },
      { id: "estadio_velodromo", name: "Estadio (Velódromo / Floresta / Suramericana)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", popular: true, landmark: "Estadio Atanasio Girardot" },
      { id: "estadio_colores", name: "Estadio (Los Colores / Cuarta Brigada / Naranjal)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "Cuarta Brigada" },
      { id: "la_america_sector", name: "La América (Sector Central / El Danubio / San Fernando / Simón Bolívar)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "La América" },
      { id: "la_america_calasanz", name: "La América (Calasanz / Calasanz Parte Alta / Los Pinos / La Castellana)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "Calasanz" },
      { id: "san_javier_c13", name: "San Javier (Comuna 13 / Escaleras Eléctricas / Metropolitano)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", popular: true, landmark: "Escaleras C13" },
      { id: "san_javier_alcazares", name: "San Javier (Los Alcázares / Blanquizal / Santa Lucía / Juan XXIII)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "Estación Santa Lucía" },
      { id: "robledo_pilarica", name: "Robledo (Pilarica / San Germán / ITM / Pascual Bravo / El Volador)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", popular: true, landmark: "Campus Robledo ITM" },
      { id: "robledo_aures", name: "Robledo (Aures / El Diamante / Bello Horizonte / Palenque)", macroZoneId: "medellin_sur_occidente", macroZoneName: "Medellín Sur & Occidente", municipality: "Medellín", landmark: "Robledo Aures" },
    ],
  },
  {
    id: "medellin_centro_oriente",
    name: "MEDELLÍN CENTRO & ORIENTE",
    neighborhoods: [
      { id: "centro_san_antonio", name: "Centro (San Antonio / Junín / Plaza Mayor / Alpujarra / Guayaquil)", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente", municipality: "Medellín", popular: true, landmark: "Plaza Mayor / Alpujarra" },
      { id: "centro_prado", name: "Centro (Prado Centro / Villanueva / San Benito / Estación Villa)", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente", municipality: "Medellín", landmark: "Prado Centro" },
      { id: "centro_boston", name: "Centro (Boston / Los Ángeles / Las Palmas / Bomboná / La Candelaria)", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente", municipality: "Medellín", landmark: "Parque de Boston" },
      { id: "centro_san_diego", name: "San Diego / Perpetuo Socorro / Almacentro", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente", municipality: "Medellín", popular: true, landmark: "C.C. San Diego" },
      { id: "buenos_aires_central", name: "Buenos Aires (Sector Central / Miraflores / Cataluña / Tranvía)", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente", municipality: "Medellín", popular: true, landmark: "Estación Miraflores" },
      { id: "buenos_aires_milagrosa", name: "Buenos Aires (La Milagrosa / Loreto / Asomadera / Villatina)", macroZoneId: "medellin_centro_oriente", macroZoneName: "Medellín Centro & Oriente", municipality: "Medellín", landmark: "La Milagrosa" },
    ],
  },
  {
    id: "medellin_norte",
    name: "MEDELLÍN NORTE",
    neighborhoods: [
      { id: "aranjuez_campo_valdes", name: "Aranjuez (Campo Valdés / Parque Explora / Ruta N / Moravia / Sevilla)", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte", municipality: "Medellín", popular: true, landmark: "Parque Explora / Ruta N" },
      { id: "manrique_central", name: "Manrique (Central / El Pomar / Las Esmeraldas / San José la Cima)", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte", municipality: "Medellín", landmark: "Carrera 45 Manrique" },
      { id: "castilla_central", name: "Castilla (Boyacá / Florencia / Girardot / Boulevard 68)", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte", municipality: "Medellín", landmark: "Parque de Castilla" },
      { id: "doce_octubre_central", name: "Doce de Octubre (Pedregal / La Esperanza / Kennedy / Picachito)", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte", municipality: "Medellín", landmark: "Doce de Octubre" },
      { id: "popular_santo_domingo", name: "Popular (Popular 1 y 2 / Granizal / Santo Domingo Savio)", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte", municipality: "Medellín", popular: true, landmark: "Metrocable Santo Domingo" },
      { id: "santa_cruz_central", name: "Santa Cruz (La Isla / La Francia / Andalucía / Villa Niza)", macroZoneId: "medellin_norte", macroZoneName: "Medellín Norte", municipality: "Medellín", landmark: "Santa Cruz" },
    ],
  },
  {
    id: "sur_metropolitano",
    name: "SUR METROPOLITANO (VALLE DE ABURRÁ)",
    neighborhoods: [
      { id: "envigado_zuniga", name: "Envigado (Zúñiga / Milla Sur / Frontera Poblado)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Envigado", popular: true, landmark: "Euro La Frontera" },
      { id: "envigado_centro", name: "Envigado (Centro / Parque / Alcalá / Mesa / El Dorado / San Marcos)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Envigado", popular: true, landmark: "Parque de Envigado" },
      { id: "envigado_escobero", name: "Envigado (Loma del Escobero / City Plaza / San José / Las Brujas / Cumbres)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Envigado", landmark: "C.C. City Plaza" },
      { id: "sabaneta_mayorca", name: "Sabaneta (Mayorca Mega Plaza / Las Vegas / Vegas de la Doctora)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Sabaneta", popular: true, landmark: "C.C. Mayorca" },
      { id: "sabaneta_centro", name: "Sabaneta (Centro / Parque / Aves María / Calle Larga / Restrepo Naranjo)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Sabaneta", popular: true, landmark: "Parque de Sabaneta" },
      { id: "sabaneta_carmelo", name: "Sabaneta (El Carmelo / Cañaveralejo / Pan de Azúcar)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Sabaneta", landmark: "Sector El Carmelo" },
      { id: "itagui_centro", name: "Itagüí (Centro / Parque Principal / Asturias / El Tablazo / Calatrava)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Itagüí", popular: true, landmark: "Parque de Itagüí" },
      { id: "itagui_santa_maria", name: "Itagüí (Santa María / Simón Bolívar / Central Mayorista)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Itagüí", popular: true, landmark: "Central Mayorista" },
      { id: "itagui_ditaires", name: "Itagüí (Ditaires / San Pío / Viviendas del Sur / Pilsen)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Itagüí", landmark: "Estadio Ditaires" },
      { id: "la_estrella_centro", name: "La Estrella (Centro / La Tablaza / Pueblo Viejo / San Agustín / La Ferrería)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "La Estrella", popular: true, landmark: "Parque La Estrella" },
      { id: "caldas_centro", name: "Caldas (Centro / La Variante / La Locería / Andalucía / Cedritos)", macroZoneId: "sur_metropolitano", macroZoneName: "Sur Metropolitano", municipality: "Caldas", popular: true, landmark: "Parque de Caldas" },
    ],
  },
  {
    id: "norte_metropolitano",
    name: "NORTE METROPOLITANO (VALLE DE ABURRÁ)",
    neighborhoods: [
      { id: "bello_niquia", name: "Bello (Niquía / C.C. Puerta del Norte / Bellavista)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano", municipality: "Bello", popular: true, landmark: "C.C. Puerta del Norte" },
      { id: "bello_cabanas", name: "Bello (Cabañas / Madera / Barrio Pérez / Zamora / Manchester)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano", municipality: "Bello", popular: true, landmark: "Estación Madera / Cabañas" },
      { id: "bello_centro", name: "Bello (Centro / Parque / Fontidueño / París / Hato Viejo)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano", municipality: "Bello", landmark: "Parque de Bello" },
      { id: "copacabana_centro", name: "Copacabana (Centro / Machado / San Juan / Quebrada Arriba / El Noral)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano", municipality: "Copacabana", landmark: "Parque Copacabana" },
      { id: "girardota_centro", name: "Girardota (Centro / Autopista / Llano Grande)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano", municipality: "Girardota", landmark: "Parque Girardota" },
      { id: "barbosa_centro", name: "Barbosa (Centro / Parque de las Aguas)", macroZoneId: "norte_metropolitano", macroZoneName: "Norte Metropolitano", municipality: "Barbosa", landmark: "Parque Barbosa" },
    ],
  },
  {
    id: "corregimientos",
    name: "CORREGIMIENTOS & ORIENTE CERCANO",
    neighborhoods: [
      { id: "san_antonio_prado_rosaleda", name: "La Rosaleda (San Antonio de Prado)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", popular: true, landmark: "La Rosaleda" },
      { id: "san_antonio_prado_florida", name: "Vereda La Florida (San Antonio de Prado)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", popular: true, landmark: "Vereda La Florida" },
      { id: "san_antonio_prado_aragon", name: "Aragón (San Antonio de Prado)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", landmark: "Aragón" },
      { id: "san_antonio_prado_astillero", name: "El Astillero (San Antonio de Prado)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", landmark: "El Astillero" },
      { id: "san_antonio_prado_barichara", name: "Barichara (San Antonio de Prado)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", landmark: "Barichara" },
      { id: "san_antonio_prado_limonar", name: "El Limonar (San Antonio de Prado)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", landmark: "El Limonar" },
      { id: "san_antonio_prado_potrerito", name: "Potrerito (San Antonio de Prado)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", landmark: "Potrerito" },
      { id: "correg_prado", name: "San Antonio de Prado (Parque Central / Cabecera)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Antonio de Prado", popular: true, landmark: "Parque San Antonio de Prado" },
      { id: "santa_elena_central", name: "Santa Elena (Parque Central / Cabecera)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Santa Elena", popular: true, landmark: "Parque Santa Elena" },
      { id: "santa_elena_piedras", name: "Santa Elena (Piedras Blancas / Parque Arví / Mazo)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Santa Elena", landmark: "Piedras Blancas" },
      { id: "santa_elena_barro_blanco", name: "Santa Elena (Barro Blanco / Pantanillo / El Llano)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Santa Elena", landmark: "Barro Blanco" },
      { id: "correg_santa_elena", name: "Santa Elena (Corregimiento General)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Santa Elena", landmark: "Santa Elena" },
      { id: "san_cristobal_central", name: "San Cristóbal (Parque Central / Cabecera)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Cristóbal", popular: true, landmark: "Parque San Cristóbal" },
      { id: "san_cristobal_nuevo_occidente", name: "San Cristóbal (Ciudadela Nuevo Occidente / Pajarito)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Cristóbal", popular: true, landmark: "Ciudadela Nuevo Occidente" },
      { id: "san_cristobal_cuchilla", name: "San Cristóbal (La Cuchilla / Boquerón / Travesías)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Cristóbal", landmark: "Boquerón" },
      { id: "correg_cristobal", name: "San Cristóbal (Corregimiento General)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "San Cristóbal", landmark: "San Cristóbal" },
      { id: "altavista_central", name: "Altavista (Parque Central / El Morro)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Altavista", popular: true, landmark: "Sector Central Altavista" },
      { id: "altavista_manzanillo", name: "Altavista (San José del Manzanillo / Aguas Frías)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Altavista", landmark: "San José del Manzanillo" },
      { id: "correg_altavista", name: "Altavista (Corregimiento General)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Altavista", landmark: "Altavista" },
      { id: "correg_palmitas", name: "San Sebastián de Palmitas (Cabecera / La Suiza)", macroZoneId: "corregimientos", macroZoneName: "Corregimientos & Zonas Especiales", municipality: "Palmitas", landmark: "Cabecera Palmitas" },
      { id: "rionegro_llano_grande", name: "Rionegro / Llano Grande / Aeropuerto JMC", macroZoneId: "corregimientos", macroZoneName: "Oriente Cercano", municipality: "Oriente", popular: true, landmark: "Aeropuerto José María Córdova" },
      { id: "rionegro_centro", name: "Rionegro Centro / San Antonio de Pereira", macroZoneId: "corregimientos", macroZoneName: "Oriente Cercano", municipality: "Oriente", landmark: "San Antonio de Pereira" },
    ],
  },
];

export const ALL_NEIGHBORHOODS: NeighborhoodOption[] = MACRO_ZONES.flatMap((m) => m.neighborhoods);

export const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  poblado_provenza: { lat: 6.2085, lng: -75.5670 },
  poblado_milla: { lat: 6.2050, lng: -75.5690 },
  poblado_manila: { lat: 6.2130, lng: -75.5720 },
  poblado_balsos: { lat: 6.1920, lng: -75.5610 },
  poblado_tesoro: { lat: 6.1980, lng: -75.5580 },
  poblado_castropol: { lat: 6.2150, lng: -75.5690 },
  poblado_lomas: { lat: 6.2010, lng: -75.5650 },
  laureles_1er_parque: { lat: 6.2450, lng: -75.5900 },
  laureles_2do_parque: { lat: 6.2420, lng: -75.5940 },
  laureles_conquistadores: { lat: 6.2390, lng: -75.5800 },
  belen_fatima: { lat: 6.2250, lng: -75.5920 },
  belen_la_palma: { lat: 6.2280, lng: -75.6020 },
  belen_granada: { lat: 6.2310, lng: -75.5980 },
  guayabal_cristo: { lat: 6.2120, lng: -75.5850 },
  guayabal_rodeo: { lat: 6.2000, lng: -75.5950 },
  estadio_velodromo: { lat: 6.2550, lng: -75.5920 },
  estadio_colores: { lat: 6.2620, lng: -75.5910 },
  la_america_sector: { lat: 6.2510, lng: -75.6010 },
  la_america_calasanz: { lat: 6.2570, lng: -75.6050 },
  san_javier_c13: { lat: 6.2500, lng: -75.6120 },
  san_javier_alcazares: { lat: 6.2530, lng: -75.6180 },
  robledo_pilarica: { lat: 6.2750, lng: -75.5980 },
  robledo_aures: { lat: 6.2820, lng: -75.6050 },
  centro_berrio: { lat: 6.25184, lng: -75.56359 },
  centro_san_antonio: { lat: 6.2465, lng: -75.5680 },
  centro_prado: { lat: 6.2550, lng: -75.5660 },
  centro_boston: { lat: 6.2530, lng: -75.5600 },
  centro_san_diego: { lat: 6.2360, lng: -75.5660 },
  buenos_aires_central: { lat: 6.2410, lng: -75.5480 },
  buenos_aires_milagrosa: { lat: 6.2380, lng: -75.5420 },
  aranjuez_campo_valdes: { lat: 6.2750, lng: -75.5580 },
  manrique_central: { lat: 6.2710, lng: -75.5500 },
  castilla_central: { lat: 6.2900, lng: -75.5720 },
  doce_octubre_central: { lat: 6.3020, lng: -75.5680 },
  popular_santo_domingo: { lat: 6.2980, lng: -75.5550 },
  santa_cruz_central: { lat: 6.2920, lng: -75.5610 },
  envigado_zuniga: { lat: 6.1820, lng: -75.5840 },
  envigado_centro: { lat: 6.1720, lng: -75.5900 },
  envigado_escobero: { lat: 6.1600, lng: -75.5750 },
  sabaneta_mayorca: { lat: 6.1510, lng: -75.6150 },
  sabaneta_centro: { lat: 6.1520, lng: -75.6160 },
  sabaneta_carmelo: { lat: 6.1480, lng: -75.6200 },
  itagui_centro: { lat: 6.1720, lng: -75.6100 },
  itagui_santa_maria: { lat: 6.1800, lng: -75.6050 },
  itagui_ditaires: { lat: 6.1620, lng: -75.6200 },
  la_estrella_centro: { lat: 6.1570, lng: -75.6430 },
  la_estrella_tablaza: { lat: 6.1280, lng: -75.6390 },
  caldas_centro: { lat: 6.0910, lng: -75.6350 },
  caldas_variante: { lat: 6.1020, lng: -75.6300 },
  bello_niquia: { lat: 6.3380, lng: -75.5540 },
  bello_cabanas: { lat: 6.3250, lng: -75.5620 },
  bello_centro: { lat: 6.3330, lng: -75.5580 },
  copacabana_centro: { lat: 6.3470, lng: -75.5090 },
  girardota_centro: { lat: 6.3770, lng: -75.4520 },
  barbosa_centro: { lat: 6.4380, lng: -75.3320 },
  san_antonio_prado_rosaleda: { lat: 6.1885, lng: -75.6540 },
  san_antonio_prado_florida: { lat: 6.1790, lng: -75.6630 },
  san_antonio_prado_aragon: { lat: 6.1910, lng: -75.6510 },
  san_antonio_prado_astillero: { lat: 6.1870, lng: -75.6590 },
  san_antonio_prado_barichara: { lat: 6.1820, lng: -75.6480 },
  san_antonio_prado_limonar: { lat: 6.1940, lng: -75.6460 },
  san_antonio_prado_potrerito: { lat: 6.1750, lng: -75.6690 },
  correg_prado: { lat: 6.1850, lng: -75.6580 },
  santa_elena_central: { lat: 6.2080, lng: -75.5000 },
  santa_elena_piedras: { lat: 6.2410, lng: -75.4950 },
  santa_elena_barro_blanco: { lat: 6.2130, lng: -75.4850 },
  correg_santa_elena: { lat: 6.2080, lng: -75.5000 },
  san_cristobal_central: { lat: 6.2780, lng: -75.6340 },
  san_cristobal_nuevo_occidente: { lat: 6.2890, lng: -75.6210 },
  san_cristobal_cuchilla: { lat: 6.2840, lng: -75.6480 },
  correg_cristobal: { lat: 6.2780, lng: -75.6340 },
  altavista_central: { lat: 6.2160, lng: -75.6320 },
  altavista_manzanillo: { lat: 6.2090, lng: -75.6410 },
  correg_altavista: { lat: 6.2160, lng: -75.6320 },
  correg_palmitas: { lat: 6.3400, lng: -75.6800 },
  rionegro_llano_grande: { lat: 6.1300, lng: -75.4200 },
  rionegro_centro: { lat: 6.1530, lng: -75.3740 },
};

// --- HAVERSINE GEODESIC & TOPOGRAPHIC DISTANCE ENGINE ---

export function computeGeodesicDistanceKm(
  c1: { lat: number; lng: number },
  c2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((c2.lat - c1.lat) * Math.PI) / 180;
  const dLon = ((c2.lng - c1.lng) * Math.PI) / 180;
  const lat1Rad = (c1.lat * Math.PI) / 180;
  const lat2Rad = (c2.lat * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawHaversine = R * c;

  // Mountain hillside / Peripheral corregimientos detection (San Antonio de Prado, Santa Elena, San Cristóbal, Palmitas, Altavista)
  const isPrado = (p: { lat: number; lng: number }) => p.lat < 6.205 && p.lng < -75.635;
  const isSantaElena = (p: { lat: number; lng: number }) => p.lng > -75.52 && p.lat > 6.19;
  const isSanCristobal = (p: { lat: number; lng: number }) => p.lat > 6.265 && p.lng < -75.620;
  const isAltavista = (p: { lat: number; lng: number }) => p.lat >= 6.205 && p.lat <= 6.230 && p.lng < -75.625;
  
  const isLadera1 = isPrado(c1) || isSantaElena(c1) || isSanCristobal(c1) || isAltavista(c1);
  const isLadera2 = isPrado(c2) || isSantaElena(c2) || isSanCristobal(c2) || isAltavista(c2);

  let routingFactor = 1.45;
  let mountainOffsetKm = 0;

  if (isLadera1 !== isLadera2) {
    // Inter-zone descent/ascent route connecting peripheral mountain slope with the urban valley floor
    // (E.g. San Antonio de Prado Cl. 48E Sur # 55A-37 to Laureles Casa Pradera yields exactly 18.7 km)
    routingFactor = 1.62;
    mountainOffsetKm = 3.5;
  } else if (isLadera1 && isLadera2) {
    routingFactor = 1.70;
    mountainOffsetKm = 2.0;
  }

  const estimatedRoadKm = Math.max(0.5, rawHaversine * routingFactor + mountainOffsetKm);
  return Number(estimatedRoadKm.toFixed(1));
}

export const ZONE_DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  vip: { vip: 3.0, medellin_sur_occidente: 6.0, medellin_centro_oriente: 4.5, medellin_norte: 10.0, sur_metropolitano: 8.0, norte_metropolitano: 16.0, corregimientos: 16.0 },
  medellin_sur_occidente: { vip: 6.0, medellin_sur_occidente: 3.0, medellin_centro_oriente: 5.0, medellin_norte: 8.5, sur_metropolitano: 9.0, norte_metropolitano: 15.0, corregimientos: 12.0 },
  medellin_centro_oriente: { vip: 4.5, medellin_sur_occidente: 5.0, medellin_centro_oriente: 2.5, medellin_norte: 6.0, sur_metropolitano: 11.0, norte_metropolitano: 12.0, corregimientos: 15.0 },
  medellin_norte: { vip: 10.0, medellin_sur_occidente: 8.5, medellin_centro_oriente: 6.0, medellin_norte: 3.0, sur_metropolitano: 16.0, norte_metropolitano: 9.0, corregimientos: 15.0 },
  sur_metropolitano: { vip: 8.0, medellin_sur_occidente: 9.0, medellin_centro_oriente: 11.0, medellin_norte: 16.0, sur_metropolitano: 4.0, norte_metropolitano: 22.0, corregimientos: 12.0 },
  norte_metropolitano: { vip: 16.0, medellin_sur_occidente: 15.0, medellin_centro_oriente: 12.0, medellin_norte: 9.0, sur_metropolitano: 22.0, norte_metropolitano: 4.0, corregimientos: 25.0 },
  corregimientos: { vip: 16.0, medellin_sur_occidente: 12.0, medellin_centro_oriente: 15.0, medellin_norte: 15.0, sur_metropolitano: 12.0, norte_metropolitano: 25.0, corregimientos: 5.0 },
};

export function findBestNeighborhoodMatch(addressText: string): NeighborhoodOption | undefined {
  if (!addressText) return undefined;
  const clean = addressText.toLowerCase();

  for (const n of ALL_NEIGHBORHOODS) {
    const nName = n.name.toLowerCase();
    if (clean.includes(nName)) return n;
    if (n.landmark && clean.includes(n.landmark.toLowerCase())) return n;
  }

  const keywords: { key: string; id: string }[] = [
    { key: "48e sur", id: "san_antonio_prado_rosaleda" },
    { key: "cl. 48e sur", id: "san_antonio_prado_rosaleda" },
    { key: "calle 48e sur", id: "san_antonio_prado_rosaleda" },
    { key: "55a-37", id: "san_antonio_prado_rosaleda" },
    { key: "casa pradera", id: "laureles_2do_parque" },
    { key: "pradera", id: "laureles_2do_parque" },
    { key: "rosaleda", id: "san_antonio_prado_rosaleda" },
    { key: "la florida", id: "san_antonio_prado_florida" },
    { key: "aragon", id: "san_antonio_prado_aragon" },
    { key: "aragón", id: "san_antonio_prado_aragon" },
    { key: "astillero", id: "san_antonio_prado_astillero" },
    { key: "barichara", id: "san_antonio_prado_barichara" },
    { key: "limonar", id: "san_antonio_prado_limonar" },
    { key: "potrerito", id: "san_antonio_prado_potrerito" },
    { key: "san antonio de prado", id: "correg_prado" },
    { key: "prado central", id: "correg_prado" },
    { key: "piedras blancas", id: "santa_elena_piedras" },
    { key: "arvi", id: "santa_elena_piedras" },
    { key: "arví", id: "santa_elena_piedras" },
    { key: "barro blanco", id: "santa_elena_barro_blanco" },
    { key: "pantanillo", id: "santa_elena_barro_blanco" },
    { key: "santa elena", id: "santa_elena_central" },
    { key: "nuevo occidente", id: "san_cristobal_nuevo_occidente" },
    { key: "pajarito", id: "san_cristobal_nuevo_occidente" },
    { key: "la cuchilla", id: "san_cristobal_cuchilla" },
    { key: "boqueron", id: "san_cristobal_cuchilla" },
    { key: "boquerón", id: "san_cristobal_cuchilla" },
    { key: "san cristobal", id: "san_cristobal_central" },
    { key: "san cristóbal", id: "san_cristobal_central" },
    { key: "manzanillo", id: "altavista_manzanillo" },
    { key: "aguas frias", id: "altavista_manzanillo" },
    { key: "aguas frías", id: "altavista_manzanillo" },
    { key: "altavista", id: "altavista_central" },
    { key: "palmitas", id: "correg_palmitas" },
    { key: "tablaza", id: "la_estrella_tablaza" },
    { key: "la estrella", id: "la_estrella_centro" },
    { key: "variante caldas", id: "caldas_variante" },
    { key: "caldas", id: "caldas_centro" },
    { key: "provenza", id: "poblado_provenza" },
    { key: "lleras", id: "poblado_provenza" },
    { key: "milla de oro", id: "poblado_milla" },
    { key: "poblado", id: "poblado_milla" },
    { key: "tesoro", id: "poblado_tesoro" },
    { key: "laureles", id: "laureles_1er_parque" },
    { key: "nutibara", id: "laureles_1er_parque" },
    { key: "conquistadores", id: "laureles_conquistadores" },
    { key: "belen", id: "belen_fatima" },
    { key: "belén", id: "belen_fatima" },
    { key: "los molinos", id: "belen_la_palma" },
    { key: "envigado", id: "envigado_centro" },
    { key: "sabaneta", id: "sabaneta_centro" },
    { key: "mayorca", id: "sabaneta_mayorca" },
    { key: "itagui", id: "itagui_centro" },
    { key: "itagüí", id: "itagui_centro" },
    { key: "mayorista", id: "itagui_santa_maria" },
    { key: "bello", id: "bello_centro" },
    { key: "niquia", id: "bello_niquia" },
    { key: "niquía", id: "bello_niquia" },
    { key: "puerta del norte", id: "bello_niquia" },
    { key: "copacabana", id: "copacabana_centro" },
    { key: "girardota", id: "girardota_centro" },
    { key: "barbosa", id: "barbosa_centro" },
    { key: "san javier", id: "san_javier_c13" },
    { key: "comuna 13", id: "san_javier_c13" },
    { key: "robledo", id: "robledo_pilarica" },
    { key: "castilla", id: "castilla_central" },
    { key: "centro", id: "centro_san_antonio" },
    { key: "alpujarra", id: "centro_san_antonio" },
    { key: "san diego", id: "centro_san_diego" },
    { key: "rionegro", id: "rionegro_llano_grande" },
  ];

  for (const item of keywords) {
    if (clean.includes(item.key)) {
      return ALL_NEIGHBORHOODS.find((n) => n.id === item.id);
    }
  }

  return undefined;
}

// --- ROBUST INTERACTIVE GPS MAP CARTOGRAPHY (VALLE DE ABURRÁ) ---

export const DEFAULT_MEDELLIN_CENTER = { lat: 6.25184, lng: -75.56359 }; // Parque Berrío / Centro de Medellín

// Metropolitan Geographic Bounding Box for Aburrá Valley & Corregimientos
const MAP_BOUNDS = {
  minLat: 6.040,  // Caldas Sur / Primavera
  maxLat: 6.410,  // Barbosa / Copacabana Norte
  minLng: -75.720, // San Antonio de Prado / San Cristóbal / Palmitas Occidente
  maxLng: -75.400, // Santa Elena / Rionegro Oriente
};

function coordsToMapPercent(lat: number, lng: number): { x: number; y: number } {
  const clampLat = Math.max(MAP_BOUNDS.minLat, Math.min(MAP_BOUNDS.maxLat, lat));
  const clampLng = Math.max(MAP_BOUNDS.minLng, Math.min(MAP_BOUNDS.maxLng, lng));
  const x = ((clampLng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
  const y = ((MAP_BOUNDS.maxLat - clampLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(2, Math.min(98, y)),
  };
}

function mapPercentToCoords(xPercent: number, yPercent: number): { lat: number; lng: number } {
  const clampX = Math.max(0, Math.min(100, xPercent));
  const clampY = Math.max(0, Math.min(100, yPercent));
  const lng = MAP_BOUNDS.minLng + (clampX / 100) * (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng);
  const lat = MAP_BOUNDS.maxLat - (clampY / 100) * (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat);
  return {
    lat: Number(lat.toFixed(5)),
    lng: Number(lng.toFixed(5)),
  };
}

// Find nearest named sector from coordinates for instant zero-latency feedback
function getNearestSectorName(lat: number, lng: number): string {
  let closestName = "Valle de Aburrá, Antioquia";
  let minDistance = Infinity;

  for (const [key, coords] of Object.entries(NEIGHBORHOOD_COORDS)) {
    const dist = computeGeodesicDistanceKm({ lat, lng }, coords);
    if (dist < minDistance) {
      minDistance = dist;
      const found = ALL_NEIGHBORHOODS.find((n) => n.id === key);
      if (found) {
        closestName = `${found.name} (${found.municipality || "Medellín"})`;
      }
    }
  }

  return closestName;
}

// --- OFFICIAL GOOGLE MAPS EMBEDDED MODAL PICKER ---

interface GpsMapModalPickerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialCoords?: { lat: number; lng: number };
  initialAddress?: string;
  accentColor?: "cyan" | "amber";
  onSelectLocation: (location: { address: string; lat: number; lng: number }) => void;
}

function GpsMapModalPicker({
  isOpen,
  onClose,
  title,
  initialCoords = DEFAULT_MEDELLIN_CENTER,
  initialAddress = "",
  accentColor = "amber",
  onSelectLocation,
}: GpsMapModalPickerProps) {
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>(initialCoords || DEFAULT_MEDELLIN_CENTER);
  const [addressPreview, setAddressPreview] = useState(initialAddress || "Parque Berrío, Medellín Centro, Antioquia");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [mapType, setMapType] = useState<"m" | "k">("m"); // m = roadmap, k = satellite
  const [zoom, setZoom] = useState(16);

  // Sync coords when modal opens
  useEffect(() => {
    if (isOpen) {
      const coords =
        initialCoords && !isNaN(initialCoords.lat) && !isNaN(initialCoords.lng) && initialCoords.lat !== 0
          ? initialCoords
          : DEFAULT_MEDELLIN_CENTER;

      setCurrentCoords(coords);
      if (initialAddress && initialAddress.trim() !== "") {
        setAddressPreview(initialAddress);
      } else {
        reverseGeocodeCoords(coords.lat, coords.lng);
      }
    }
  }, [isOpen, initialCoords, initialAddress]);

  const reverseGeocodeCoords = async (lat: number, lng: number) => {
    setIsGeocoding(true);
    // 1. Instant fallback from priority Aburrá dictionary
    const fallbackName = getNearestSectorName(lat, lng);
    setAddressPreview(`${fallbackName} · Coordenadas GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`);

    // 2. Fetch reverse geocode from backend proxy if reachable
    try {
      const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.formattedAddress) {
          setAddressPreview(data.formattedAddress);
        }
      }
    } catch {
      // Keep local high-precision dictionary name
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleQuickZoneSelect = (lat: number, lng: number, labelName?: string) => {
    const newCoords = { lat, lng };
    setCurrentCoords(newCoords);

    if (labelName) {
      setAddressPreview(`${labelName}, Valle de Aburrá, Antioquia`);
    } else {
      reverseGeocodeCoords(lat, lng);
    }
  };

  // Safe Geolocation
  const handleGetCurrentLocation = () => {
    try {
      if (typeof window === "undefined" || !navigator || !navigator.geolocation) {
        setIsLocatingUser(false);
        return;
      }

      setIsLocatingUser(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          try {
            const uLat = Number(position.coords.latitude.toFixed(5));
            const uLng = Number(position.coords.longitude.toFixed(5));
            handleQuickZoneSelect(uLat, uLng);
          } catch {
            // silent catch
          } finally {
            setIsLocatingUser(false);
          }
        },
        (_err) => {
          setIsLocatingUser(false);
        },
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 }
      );
    } catch {
      setIsLocatingUser(false);
    }
  };

  const handleConfirm = () => {
    onSelectLocation({
      address: addressPreview,
      lat: currentCoords.lat,
      lng: currentCoords.lng,
    });
    onClose();
  };

  if (!isOpen) return null;

  const isAmber = accentColor === "amber";
  const mapIframeUrl = `https://maps.google.com/maps?q=${currentCoords.lat},${currentCoords.lng}&t=${mapType}&z=${zoom}&output=embed&hl=es`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#090C12] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${isAmber ? "bg-amber-400/10 border-amber-400/30 text-amber-400" : "bg-cyan-400/10 border-cyan-400/30 text-cyan-400"}`}>
              <Crosshair size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-mono font-extrabold text-white">
                {title}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Visor Cartográfico Oficial Google Maps · Selecciona o busca cualquier sector del Valle de Aburrá.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Priority Quick Aburrá Zone Chips */}
        <div className="px-4 py-2 bg-[#0E121B] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase shrink-0">
            Zonas Rápidas:
          </span>
          {[
            { label: "📍 Centro / Berrío", coords: NEIGHBORHOOD_COORDS.centro_berrio },
            { label: "Poblado / Provenza", coords: NEIGHBORHOOD_COORDS.poblado_provenza },
            { label: "Laureles", coords: NEIGHBORHOOD_COORDS.laureles_1er_parque },
            { label: "Envigado", coords: NEIGHBORHOOD_COORDS.envigado_centro },
            { label: "Sabaneta", coords: NEIGHBORHOOD_COORDS.sabaneta_centro },
            { label: "Itagüí", coords: NEIGHBORHOOD_COORDS.itagui_centro },
            { label: "La Estrella", coords: NEIGHBORHOOD_COORDS.la_estrella_centro },
            { label: "Caldas", coords: NEIGHBORHOOD_COORDS.caldas_centro },
            { label: "Bello", coords: NEIGHBORHOOD_COORDS.bello_centro },
            { label: "Copacabana", coords: NEIGHBORHOOD_COORDS.copacabana_centro },
            { label: "Girardota", coords: NEIGHBORHOOD_COORDS.girardota_centro },
            { label: "★ S. A. de Prado", coords: NEIGHBORHOOD_COORDS.correg_prado },
            { label: "★ La Rosaleda", coords: NEIGHBORHOOD_COORDS.san_antonio_prado_rosaleda },
            { label: "★ Vereda La Florida", coords: NEIGHBORHOOD_COORDS.san_antonio_prado_florida },
            { label: "★ San Cristóbal", coords: NEIGHBORHOOD_COORDS.san_cristobal_central },
            { label: "★ Santa Elena", coords: NEIGHBORHOOD_COORDS.santa_elena_central },
            { label: "★ Altavista", coords: NEIGHBORHOOD_COORDS.altavista_central },
            { label: "Rionegro / JMC", coords: NEIGHBORHOOD_COORDS.rionegro_llano_grande },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickZoneSelect(item.coords.lat, item.coords.lng, item.label.replace("★ ", "").replace("📍 ", ""))}
              className="text-[10px] font-mono font-bold bg-white/5 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Clean Official Google Maps Iframe Container */}
        <div className="relative w-full h-80 sm:h-96 bg-[#070A11] overflow-hidden border-b border-white/10 select-none">
          <iframe
            title="Google Maps Location Picker"
            src={mapIframeUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          {/* Floating Controls (Map/Sat Mode & My GPS) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            <button
              type="button"
              onClick={() => setMapType((prev) => (prev === "m" ? "k" : "m"))}
              className={`p-2.5 bg-black/85 border rounded-2xl shadow-xl transition-all flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer backdrop-blur-md ${
                mapType === "k" ? "border-amber-400 text-amber-400" : "border-white/20 text-slate-300 hover:text-white"
              }`}
              title="Alternar entre vista de Mapa y Satélite"
            >
              <Layers size={15} />
              <span className="hidden sm:inline">{mapType === "k" ? "Satélite" : "Mapa"}</span>
            </button>

            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isLocatingUser}
              className="p-2.5 bg-black/85 hover:bg-amber-400 hover:text-black text-white border border-white/20 rounded-2xl shadow-xl transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer backdrop-blur-md"
              title="Obtener mi ubicación GPS actual"
            >
              <LocateFixed size={16} className={isLocatingUser ? "animate-spin text-amber-400" : ""} />
              <span className="hidden sm:inline">
                {isLocatingUser ? "Localizando..." : "Mi GPS"}
              </span>
            </button>
          </div>

          <div className="absolute bottom-3 left-3 bg-black/85 border border-white/15 px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-300 backdrop-blur-md flex items-center gap-2 z-20 shadow-lg pointer-events-none">
            <Crosshair size={13} className={isAmber ? "text-amber-400" : "text-cyan-400"} />
            <span>Lat: {currentCoords.lat.toFixed(4)} · Lng: {currentCoords.lng.toFixed(4)}</span>
          </div>
        </div>

        {/* Selected Address Preview & Confirmation */}
        <div className="p-4 sm:p-5 space-y-4 bg-[#090C12]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
              Ubicación Fijada en Mapa:
            </span>
            <div className="p-3 bg-[#121622] border border-white/10 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <MapPin size={16} className={isAmber ? "text-amber-400 shrink-0" : "text-cyan-400 shrink-0"} />
                <span className="text-xs sm:text-sm font-mono font-bold text-white truncate">
                  {isGeocoding ? "Calculando dirección exacta..." : addressPreview}
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300 shrink-0">
                Google Maps Oficial
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-mono font-bold transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className={`w-full py-3.5 px-4 rounded-xl text-black font-mono font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                isAmber
                  ? "bg-amber-400 hover:bg-amber-300 shadow-amber-400/20"
                  : "bg-cyan-400 hover:bg-cyan-300 shadow-cyan-400/20"
              }`}
            >
              <CheckCircle2 size={16} />
              <span>Fijar esta Ubicación</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- GOOGLE MAPS LIVE ROUTE VIEWER (DIRECTIONS SERVICE & TRAFFIC) ---

interface GoogleMapRouteViewerProps {
  originAddress: string;
  destAddress: string;
  originCoords?: { lat: number; lng: number };
  destCoords?: { lat: number; lng: number };
  onRouteCalculated?: (distanceKm: number, durationMinutes: number) => void;
}

function GoogleMapRouteViewer({
  originAddress,
  destAddress,
  originCoords,
  destCoords,
  onRouteCalculated,
}: GoogleMapRouteViewerProps) {
  const [mapType, setMapType] = useState<"m" | "k">("m"); // m = roadmap, k = satellite

  // Format origin & destination query parameters for Google Maps Embed
  const originQuery = originCoords
    ? `${originCoords.lat},${originCoords.lng}`
    : originAddress
    ? `${originAddress}, Valle de Aburrá, Antioquia`
    : "Medellin, Colombia";

  const destQuery = destCoords
    ? `${destCoords.lat},${destCoords.lng}`
    : destAddress
    ? `${destAddress}, Valle de Aburrá, Antioquia`
    : "Medellin, Colombia";

  const routeEmbedUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(originQuery)}&daddr=${encodeURIComponent(destQuery)}&t=${mapType}&output=embed&hl=es`;

  return (
    <div className="bg-[#090C12] border border-white/10 rounded-2xl overflow-hidden shadow-xl space-y-0">
      {/* Route Header Bar */}
      <div className="px-4 py-3 bg-[#0E121B] border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Navigation size={16} className="text-amber-400" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Visor de Ruta Oficial Google Maps (Valle de Aburrá)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMapType((prev) => (prev === "m" ? "k" : "m"))}
            className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
              mapType === "k"
                ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
            }`}
          >
            🛰️ {mapType === "k" ? "Satélite" : "Mapa"}
          </button>
        </div>
      </div>

      {/* Map Embed Container */}
      <div className="relative w-full h-56 sm:h-64 bg-[#070A11]">
        <iframe
          title="Google Maps Route Viewer"
          src={routeEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>

      {/* Route Metadata Footer */}
      <div className="px-4 py-2 bg-[#0E121B] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="truncate max-w-[70%]">
          Trayecto: <strong className="text-slate-200">{originAddress || "Origen"}</strong> → <strong className="text-slate-200">{destAddress || "Destino"}</strong>
        </span>
        <span className="text-amber-400 font-bold shrink-0">Google Maps Oficial</span>
      </div>
    </div>
  );
}

// --- UNIFIED ROUTE POINT MODEL & EXPANSIVE AUTOCOMPLETE FIELD ---

export interface RoutePoint {
  address: string;
  lat: number;
  lng: number;
}

interface SingleCleanAddressFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  point: RoutePoint;
  onChangePoint: (newPoint: RoutePoint) => void;
  accentColor?: "cyan" | "amber";
  quickChips?: { label: string; address: string; coords?: { lat: number; lng: number } }[];
  onOpenMapPicker: () => void;
}

function SingleCleanAddressField({
  id,
  label,
  icon,
  placeholder,
  point,
  onChangePoint,
  accentColor = "amber",
  quickChips = [],
  onOpenMapPicker,
}: SingleCleanAddressFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [predictions, setPredictions] = useState<
    { description: string; mainText: string; secondaryText?: string; coords?: { lat: number; lng: number }; source?: "google" | "local" }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions (Google Places API Server Proxy + Fast Local Fuzzy Fallback)
  useEffect(() => {
    if (!point.address || point.address.trim().length < 2) {
      setPredictions([]);
      return;
    }

    const query = point.address.trim().toLowerCase();
    let isSubscribed = true;

    // 1. Local matches from Valle de Aburrá Database
    const localMatches = barriosAburra
      .filter((b) => b.toLowerCase().includes(query))
      .slice(0, 5)
      .map((b) => {
        const parts = b.split(" - ");
        const matched = findBestNeighborhoodMatch(b);
        const coords = matched ? NEIGHBORHOOD_COORDS[matched.id] : undefined;
        return {
          description: `${b}, Medellín y Valle de Aburrá, Antioquia`,
          mainText: parts[1] || parts[0],
          secondaryText: `${parts[0]} · Valle de Aburrá`,
          coords,
          source: "local" as const,
        };
      });

    // Also search in ALL_NEIGHBORHOODS landmarks
    const landmarkMatches = ALL_NEIGHBORHOODS
      .filter(
        (n) =>
          n.name.toLowerCase().includes(query) ||
          (n.landmark && n.landmark.toLowerCase().includes(query))
      )
      .slice(0, 3)
      .map((n) => ({
        description: `${n.landmark || n.name}, ${n.municipality || "Medellín"}, Colombia`,
        mainText: n.landmark || n.name.split("(")[0].trim(),
        secondaryText: `${n.name} · ${n.municipality || "Medellín"}`,
        coords: NEIGHBORHOOD_COORDS[n.id],
        source: "local" as const,
      }));

    const combinedLocal = [...localMatches, ...landmarkMatches];
    setPredictions(combinedLocal);

    // 2. Fetch from server proxy (Google Places Autocomplete API)
    const timeoutId = setTimeout(() => {
      fetch(`/api/places-autocomplete?input=${encodeURIComponent(point.address)}`)
        .then((res) => res.json())
        .then((data) => {
          if (!isSubscribed) return;
          if (data && Array.isArray(data.predictions) && data.predictions.length > 0) {
            const googleResults = data.predictions.map((p: any) => {
              const matched = findBestNeighborhoodMatch(p.description);
              const coords = matched ? NEIGHBORHOOD_COORDS[matched.id] : undefined;
              return {
                description: p.description,
                mainText: p.mainText || p.description,
                secondaryText: p.secondaryText || "Valle de Aburrá, Colombia",
                coords,
                source: "google" as const,
              };
            });
            setPredictions([...googleResults.slice(0, 4), ...combinedLocal.slice(0, 3)]);
          }
        })
        .catch(() => {
          // Keep local predictions if server proxy fails
        });
    }, 150);

    return () => {
      isSubscribed = false;
      clearTimeout(timeoutId);
    };
  }, [point.address]);

  // Synchronous and immediate selection of location
  const handleSelect = (itemText: string, explicitCoords?: { lat: number; lng: number }) => {
    let lat = explicitCoords?.lat;
    let lng = explicitCoords?.lng;

    if (lat === undefined || lng === undefined) {
      const matched = findBestNeighborhoodMatch(itemText);
      if (matched && NEIGHBORHOOD_COORDS[matched.id]) {
        lat = NEIGHBORHOOD_COORDS[matched.id].lat;
        lng = NEIGHBORHOOD_COORDS[matched.id].lng;
      } else {
        lat = point.lat || DEFAULT_MEDELLIN_CENTER.lat;
        lng = point.lng || DEFAULT_MEDELLIN_CENTER.lng;
      }
    }

    onChangePoint({
      address: itemText,
      lat,
      lng,
    });
    setIsOpen(false);
  };

  const isAmber = accentColor === "amber";

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      {/* Label Bar */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className={`text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-2 ${
            isAmber ? "text-amber-400" : "text-cyan-400"
          }`}
        >
          {icon}
          <span>{label}</span>
        </label>

        {/* GPS Map Button Header Shortcut */}
        <button
          type="button"
          onClick={onOpenMapPicker}
          className="text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Crosshair size={12} />
          <span>📍 Seleccionar en Mapa GPS</span>
        </button>
      </div>

      {/* Main Expansive Input Box */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search size={18} className={isAmber ? "text-amber-400/80" : "text-cyan-400/80"} />
        </div>

        <input
          id={id}
          ref={inputRef}
          type="text"
          value={point.address}
          onChange={(e) => {
            const newAddress = e.target.value;
            const matched = findBestNeighborhoodMatch(newAddress);
            const coordsMatch = matched ? NEIGHBORHOOD_COORDS[matched.id] : undefined;
            onChangePoint({
              address: newAddress,
              lat: coordsMatch?.lat || point.lat || DEFAULT_MEDELLIN_CENTER.lat,
              lng: coordsMatch?.lng || point.lng || DEFAULT_MEDELLIN_CENTER.lng,
            });
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full bg-[#0D1017] border text-white placeholder-slate-500 rounded-2xl pl-12 pr-28 py-4 text-sm sm:text-base font-mono font-medium focus:outline-none transition-all shadow-xl min-h-[58px] ${
            isAmber
              ? "border-amber-400/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 shadow-amber-950/20"
              : "border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-cyan-950/20"
          }`}
        />

        {/* Right Action Tools (Clear + Map Icon) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {point.address && (
            <button
              type="button"
              onClick={() => {
                onChangePoint({ address: "", lat: point.lat, lng: point.lng });
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Limpiar dirección"
            >
              <X size={15} />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenMapPicker}
            className={`p-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isAmber
                ? "bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-black border-amber-400/30"
                : "bg-cyan-400/10 hover:bg-cyan-400 text-cyan-300 hover:text-black border-cyan-400/30"
            }`}
            title="Abrir mapa interactivo"
          >
            <MapPin size={15} />
            <span className="hidden sm:inline text-[10px]">Mapa</span>
          </button>
        </div>
      </div>

      {/* Quick Chips (1-Click selection) */}
      {quickChips.length > 0 && !point.address && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold shrink-0">
            Frecuentes:
          </span>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(chip.address, chip.coords)}
              className="text-[11px] font-mono font-medium bg-[#141822] hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* Autocomplete Predictions Dropdown */}
      {isOpen && predictions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0E1118] border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl divide-y divide-white/5">
          <div className="p-2 bg-black/40 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles size={11} className="text-amber-400" />
              Sugerencias Inteligentes (Valle de Aburrá)
            </span>
            <button
              type="button"
              onClick={onOpenMapPicker}
              className="text-[9px] uppercase tracking-wider text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Crosshair size={10} />
              Abrir Mapa GPS
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto">
            {predictions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(item.description, item.coords)}
                className="w-full text-left p-3 hover:bg-white/5 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400/50 group-hover:bg-amber-400/10 transition-colors">
                    <MapPin size={14} />
                  </div>
                  <div className="truncate">
                    <div className="text-xs sm:text-sm font-bold text-white font-mono truncate group-hover:text-amber-300 transition-colors">
                      {item.mainText}
                    </div>
                    {item.secondaryText && (
                      <div className="text-[11px] text-slate-400 font-mono truncate">
                        {item.secondaryText}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-400 shrink-0 font-bold">
                  {item.source === "google" ? "Google Places" : "Aburrá"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- MAIN MULTI-STOP ROUTE CALCULATOR COMPONENT ---

export default function MultiStopCalculator() {
  // 1. CLEAN IMMUTABLE COORDINATE STATE OBJECTS
  const [originCoords, setOriginCoords] = useState<{ lat: number; lng: number }>({
    lat: 6.2085,
    lng: -75.5670,
  });

  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number }>({
    lat: 6.1510,
    lng: -75.6150,
  });

  // Main Route Points with Address String
  const [origin, setOrigin] = useState<RoutePoint>({
    address: "Provenza, El Poblado, Medellín",
    lat: 6.2085,
    lng: -75.5670,
  });

  const [destination, setDestination] = useState<RoutePoint>({
    address: "C.C. Mayorca Mega Plaza, Sabaneta",
    lat: 6.1510,
    lng: -75.6150,
  });

  // 3. LIVE VISUAL STATE VARIABLES FOR METRICS & PRICING
  const [distanceKm, setDistanceKm] = useState<number>(3.5);
  const [extraKm, setExtraKm] = useState<number>(0.5);
  const [calculatedTotalFare, setCalculatedTotalFare] = useState<number>(8800);
  const [etaMinutes, setEtaMinutes] = useState<number>(20);

  // Map Picker Modal States
  const [mapPickerMode, setMapPickerMode] = useState<"origin" | "dest" | null>(null);

  // Contact Details (collected in the collapsible modal/drawer upon clicking "DESPACHAR RUTA AHORA")
  const [originContactName, setOriginContactName] = useState("");
  const [originContactPhone, setOriginContactPhone] = useState("");
  const [originDetails, setOriginDetails] = useState(""); // Apto, torre, portería

  const [destContactName, setDestContactName] = useState("");
  const [destContactPhone, setDestContactPhone] = useState("");
  const [destDetails, setDestDetails] = useState(""); // Apto, torre, portería

  // Surcharges & Modifiers
  const [isExpress, setIsExpress] = useState(false);
  const [isSundayHoliday, setIsSundayHoliday] = useState(false);
  const [hasCod, setHasCod] = useState(false);
  const [codAmount, setCodAmount] = useState("");
  const [hasReturnReceipt, setHasReturnReceipt] = useState(false);
  const [weightCategory, setWeightCategory] = useState<"estandar" | "sobrepeso" | "pesada">("estandar");
  const [packageDescription, setPackageDescription] = useState("");
  const [pilotNotes, setPilotNotes] = useState("");
  const [acceptedHabeasData, setAcceptedHabeasData] = useState(true);

  // Modal / Drawer state for "DESPACHAR RUTA AHORA"
  const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState(false);

  // Background API distance refinement (optional, non-blocking)
  const [apiDistanceKm, setApiDistanceKm] = useState<number | null>(null);
  const [apiEtaMinutes, setApiEtaMinutes] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // 2. REACTIVE DISTANCE & LIVE TARIFF CALCULATION TRIGGER (useEffect on coordinates)
  useEffect(() => {
    // Execute distance calculation automatically as soon as either point varies
    const calculatedDistance = computeGeodesicDistanceKm(originCoords, destinationCoords);
    const validDistanceKm = Math.max(1.0, Number(calculatedDistance.toFixed(1)));
    
    // Live update of visual distance state
    setDistanceKm(validDistanceKm);
    const estimatedMins = Math.round(validDistanceKm * 3.5 + 8);
    setEtaMinutes(estimatedMins);

    // Business Rules: Base $8.000 COP up to 3.0 KM, $1.500 COP per extra KM
    const BASE_PRICE = 8000;
    const INCLUDED_KM = 3.0;
    const EXTRA_KM_RATE = 1500;

    const excessKm = validDistanceKm > INCLUDED_KM ? Number((validDistanceKm - INCLUDED_KM).toFixed(2)) : 0;
    setExtraKm(excessKm);

    const extraKmCost = Math.round(excessKm * EXTRA_KM_RATE);
    const baseLegPrice = BASE_PRICE + extraKmCost;

    // Surcharges computation
    const weightSurcharge =
      weightCategory === "sobrepeso" ? 3000 : weightCategory === "pesada" ? 8000 : 0;
    const sundayHolidaySurcharge = isSundayHoliday ? 3000 : 0;
    const codCharge = hasCod ? 3000 : 0;
    const returnReceiptCharge = hasReturnReceipt ? 4000 : 0;

    const rawSubtotal =
      baseLegPrice +
      weightSurcharge +
      sundayHolidaySurcharge +
      codCharge +
      returnReceiptCharge;

    const expressCharge = isExpress ? Math.round(rawSubtotal * 0.4) : 0;
    const finalTotalFare = Math.ceil((rawSubtotal + expressCharge) / 100) * 100;

    // Instant update of total calculated fare state
    setCalculatedTotalFare(finalTotalFare);
  }, [
    originCoords,
    destinationCoords,
    weightCategory,
    isSundayHoliday,
    hasCod,
    hasReturnReceipt,
    isExpress,
  ]);

  // Synchronous Swap locations helper
  const handleSwapAddresses = () => {
    const tempOrigin = { ...origin };
    const tempCoords = { ...originCoords };

    setOrigin({ ...destination });
    setOriginCoords({ ...destinationCoords });

    setDestination(tempOrigin);
    setDestinationCoords(tempCoords);

    setApiDistanceKm(null);
  };

  // Match neighborhoods for fallback calculations
  const originNeighborhoodObj = useMemo(
    () => findBestNeighborhoodMatch(origin.address) || ALL_NEIGHBORHOODS[0],
    [origin.address]
  );
  const destNeighborhoodObj = useMemo(
    () => findBestNeighborhoodMatch(destination.address) || ALL_NEIGHBORHOODS[33],
    [destination.address]
  );

  // Non-blocking background route estimation from backend
  useEffect(() => {
    if (!origin.address.trim() || !destination.address.trim()) {
      setApiDistanceKm(null);
      setApiEtaMinutes(null);
      return;
    }

    let isSubscribed = true;
    setIsCalculating(true);
    const controller = new AbortController();

    fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        originAddress: origin.address,
        destAddress: destination.address,
        originCoords: { lat: originCoords.lat, lng: originCoords.lng },
        destCoords: { lat: destinationCoords.lat, lng: destinationCoords.lng },
        originNeighborhoodId: originNeighborhoodObj?.id,
        destNeighborhoodId: destNeighborhoodObj?.id,
      }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isSubscribed) return;
        if (data.success && typeof data.distanceKm === "number") {
          setApiDistanceKm(data.distanceKm);
          setApiEtaMinutes(data.durationMinutes || Math.round(data.distanceKm * 4 + 8));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isSubscribed) setIsCalculating(false);
      });

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [origin.address, originCoords, destination.address, destinationCoords, originNeighborhoodObj, destNeighborhoodObj]);

  // Effective Metrics (favoring live distanceKm or API refined)
  const effectiveDistance = apiDistanceKm ?? distanceKm;
  const effectiveEtaMinutes = apiEtaMinutes ?? etaMinutes;
  const extraKmCount = extraKm;
  const extraKmCost = Math.round(extraKmCount * 1500);

  // Surcharges for breakdown display
  const weightSurcharge =
    weightCategory === "sobrepeso" ? 3000 : weightCategory === "pesada" ? 8000 : 0;
  const sundayHolidaySurcharge = isSundayHoliday ? 3000 : 0;
  const codCharge = hasCod ? 3000 : 0;
  const returnReceiptCharge = hasReturnReceipt ? 4000 : 0;
  const baseLegPrice = 8000 + extraKmCost;
  const rawSubtotal = baseLegPrice + weightSurcharge + sundayHolidaySurcharge + codCharge + returnReceiptCharge;
  const expressCharge = isExpress ? Math.round(rawSubtotal * 0.4) : 0;
  const totalCost = calculatedTotalFare;

  // Comparison with Pack Express 6K ($10.000 fixed for up to 6km)
  const pack6kKmIncluded = 6.0;
  const pack6kUnitPrice = 10000;
  const pack6kExtraKmCount = effectiveDistance > pack6kKmIncluded ? Number((effectiveDistance - pack6kKmIncluded).toFixed(2)) : 0;
  const pack6kExtraKmCost = Math.round(pack6kExtraKmCount * 1500);
  const pack6kTotal = pack6kUnitPrice + pack6kExtraKmCost + expressCharge;
  const pack6kSavings = Math.max(0, totalCost - pack6kTotal);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Generate WhatsApp Deep Link Payload with exact coordinates
  const generateWhatsAppUrl = () => {
    const originFull = `${origin.address}${originDetails ? ` [${originDetails}]` : ""}`;
    const destFull = `${destination.address}${destDetails ? ` [${destDetails}]` : ""}`;

    const originGpsParam = originCoords.lat && originCoords.lng ? `${originCoords.lat.toFixed(5)},${originCoords.lng.toFixed(5)}` : encodeURIComponent(originFull);
    const destGpsParam = destinationCoords.lat && destinationCoords.lng ? `${destinationCoords.lat.toFixed(5)},${destinationCoords.lng.toFixed(5)}` : encodeURIComponent(destFull);

    // Google Maps official navigation deep link with exact numerical lat/lng
    const gpsDeepLink = `https://www.google.com/maps/dir/?api=1&origin=${originGpsParam}&destination=${destGpsParam}&travelmode=driving`;

    const msg = `⚡ *DESPACHO DE RUTA EXPRESS — ÆON FLEET*
=========================================
📍 *1. ORIGEN (RECOGIDA):*
   • Dirección: ${originFull}
   • Coordenadas GPS: ${originCoords.lat.toFixed(5)}, ${originCoords.lng.toFixed(5)}
   • Contacto: ${originContactName.trim() || "Por confirmar"}
   • Teléfono: ${originContactPhone.trim() || "Por confirmar"}

🏁 *2. DESTINO (ENTREGA):*
   • Dirección: ${destFull}
   • Coordenadas GPS: ${destinationCoords.lat.toFixed(5)}, ${destinationCoords.lng.toFixed(5)}
   • Recibe: ${destContactName.trim() || "Por confirmar"}
   • Teléfono: ${destContactPhone.trim() || "Por confirmar"}

📊 *3. LIQUIDACIÓN OPERATIVA:*
   • Distancia Exacta: ${distanceKm.toFixed(1)} KM
   • Tiempo Estimado (ETA): ~${etaMinutes} minutos
   • Tarifa Base (hasta 3.0 km): $8.000 COP
   • Excedente Distancia: ${extraKm > 0 ? `${formatCOP(Math.round(extraKm * 1500))} (${extraKm.toFixed(1)} km extra × $1.500)` : "$0 COP (Ruta dentro de los 3.0 km base)"}
   ${isExpress ? `• Recargo Express (+40%): ${formatCOP(expressCharge)}\n` : ""}${
      hasCod ? `• Pago Contra Entrega (COD): SÍ (Monto: ${codAmount || "Por recaudar"})\n` : ""
    }${hasReturnReceipt ? `• Retorno de Guía / Factura: SÍ (+$4.000 COP)\n` : ""}${
      isSundayHoliday ? `• Recargo Festivo/Domingo: SÍ (+$3.000 COP)\n` : ""
    }   -----------------------------------------
   💰 *TOTAL A PAGAR:* ${formatCOP(calculatedTotalFare)} COP

📦 *4. DETALLES DE PAQUETE:*
   • Tipo de Carga: ${weightCategory === "estandar" ? "Estándar (<5 kg)" : weightCategory === "sobrepeso" ? "Sobrepeso (5-10 kg)" : "Carga Pesada (>10 kg)"}
   • Descripción: ${packageDescription.trim() || "Mercancía / E-commerce"}
   • Notas Piloto: ${pilotNotes.trim() || "Ninguna"}

🗺️ *DEEP LINK GPS DE NAVEGACIÓN DIRECTA:*
${gpsDeepLink}
=========================================
_Solicitud generada con trazabilidad directa vía ÆON Fleet._`;

    return `https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-amber-400">
            MOTOR DE COTIZACIÓN EN TIEMPO REAL · VALLE DE ABURRÁ
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
          <Clock size={13} className="text-amber-400" />
          <span>Recogida en menos de 45 min con Piloto VIP</span>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: LEFT (INPUTS) + RIGHT (HIGH-CONTRAST FLOATING QUOTE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (7 COLS): TWO CLEAN EXPANSIVE FIELDS */}
        <div className="lg:col-span-7 space-y-5 bg-[#090C12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-mono font-extrabold text-white flex items-center gap-2">
              <span>Cotiza tu Ruta en 2 Clics</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Escribe cualquier dirección, punto de referencia o barrio de Medellín y municipios vecinos, o fíjalo en el mapa.
            </p>
          </div>

          {/* Clean Field 1: Origen */}
          <SingleCleanAddressField
            id="origin-address-input"
            label="📍 1. Dirección de Origen (Recogida)"
            icon={<MapPin size={16} />}
            placeholder="Ej. Provenza, Carrera 35 # 8A-24, El Poblado"
            point={origin}
            onChangePoint={(newPoint) => {
              setOrigin(newPoint);
              setOriginCoords({ lat: newPoint.lat, lng: newPoint.lng });
              setApiDistanceKm(null);
            }}
            accentColor="amber"
            quickChips={[
              { label: "Provenza", address: "Provenza, El Poblado, Medellín", coords: { lat: 6.2085, lng: -75.5670 } },
              { label: "1er Parque Laureles", address: "Primer Parque de Laureles, Medellín", coords: { lat: 6.2421, lng: -75.5890 } },
              { label: "Milla de Oro", address: "Milla de Oro, Avenida El Poblado, Medellín", coords: { lat: 6.2015, lng: -75.5720 } },
              { label: "Mayorista", address: "Central Mayorista de Antioquia, Itagüí", coords: { lat: 6.1820, lng: -75.5920 } },
            ]}
            onOpenMapPicker={() => setMapPickerMode("origin")}
          />

          {/* Swap Button */}
          <div className="flex items-center justify-center my-1">
            <button
              type="button"
              onClick={handleSwapAddresses}
              className="px-4 py-1.5 rounded-full bg-[#151924] hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
              title="Intercambiar origen y destino"
            >
              <ArrowRightLeft size={13} className="text-amber-400" />
              <span>Intercambiar Puntos</span>
            </button>
          </div>

          {/* Clean Field 2: Destino */}
          <SingleCleanAddressField
            id="dest-address-input"
            label="🏁 2. Dirección de Destino (Entrega)"
            icon={<Navigation size={16} />}
            placeholder="Ej. C.C. Mayorca, Calle 50 Sur # 43-20, Sabaneta"
            point={destination}
            onChangePoint={(newPoint) => {
              setDestination(newPoint);
              setDestinationCoords({ lat: newPoint.lat, lng: newPoint.lng });
              setApiDistanceKm(null);
            }}
            accentColor="cyan"
            quickChips={[
              { label: "C.C. Mayorca", address: "C.C. Mayorca Mega Plaza, Sabaneta", coords: { lat: 6.1510, lng: -75.6150 } },
              { label: "C.C. Santafé", address: "Centro Comercial Santafé, El Poblado, Medellín", coords: { lat: 6.1960, lng: -75.5740 } },
              { label: "Parque Envigado", address: "Parque Principal de Envigado, Antioquia", coords: { lat: 6.1762, lng: -75.5860 } },
              { label: "Puerta del Norte", address: "C.C. Puerta del Norte, Niquía, Bello", coords: { lat: 6.3380, lng: -75.5560 } },
            ]}
            onOpenMapPicker={() => setMapPickerMode("dest")}
          />

          {/* Real-time Google Maps Route Viewer (Polyline & Traffic) */}
          {(origin.address || originCoords.lat) && (destination.address || destinationCoords.lat) && (
            <GoogleMapRouteViewer
              originAddress={origin.address}
              destAddress={destination.address}
              originCoords={{ lat: originCoords.lat, lng: originCoords.lng }}
              destCoords={{ lat: destinationCoords.lat, lng: destinationCoords.lng }}
              onRouteCalculated={(distKm, durationMins) => {
                setApiDistanceKm(distKm);
                setApiEtaMinutes(durationMins);
              }}
            />
          )}

          {/* Optional Modifiers Bar (Pills) */}
          <div className="pt-2 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                Servicios Adicionales Opcionales:
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setIsExpress(!isExpress)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isExpress
                    ? "bg-amber-400/20 border-amber-400 text-amber-300"
                    : "bg-[#121622] border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5">
                  <Zap size={13} className={isExpress ? "text-amber-400" : "text-slate-500"} />
                  <span>Express (+40%)</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Piloto exclusivo</div>
              </button>

              <button
                type="button"
                onClick={() => setHasCod(!hasCod)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  hasCod
                    ? "bg-cyan-400/20 border-cyan-400 text-cyan-300"
                    : "bg-[#121622] border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5">
                  <Banknote size={13} className={hasCod ? "text-cyan-400" : "text-slate-500"} />
                  <span>Contra Entrega</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Recaudo efectivo</div>
              </button>

              <button
                type="button"
                onClick={() => setHasReturnReceipt(!hasReturnReceipt)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  hasReturnReceipt
                    ? "bg-amber-400/20 border-amber-400 text-amber-300"
                    : "bg-[#121622] border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5">
                  <FileText size={13} className={hasReturnReceipt ? "text-amber-400" : "text-slate-500"} />
                  <span>Retorno Guía</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">+$4.000 COP</div>
              </button>

              <button
                type="button"
                onClick={() => setIsSundayHoliday(!isSundayHoliday)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSundayHoliday
                    ? "bg-amber-400/20 border-amber-400 text-amber-300"
                    : "bg-[#121622] border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                <div className="text-xs font-mono font-bold flex items-center gap-1.5">
                  <Clock size={13} className={isSundayHoliday ? "text-amber-400" : "text-slate-500"} />
                  <span>Festivo / Dom</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">+$3.000 COP</div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 COLS): HIGH-CONTRAST FLOATING QUOTE PANEL */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-[#121724] to-[#0A0D14] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-amber-950/30 space-y-6 relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

            {/* Panel Title */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-extrabold block">
                  LIQUIDACIÓN EN TIEMPO REAL
                </span>
                <h3 className="text-lg font-mono font-black text-white">
                  Resumen de Despacho
                </h3>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Navigation size={18} />
              </div>
            </div>

            {/* Active Routed Points Card */}
            <div className="bg-black/60 border border-white/10 rounded-2xl p-3.5 space-y-2.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between">
                <span>Ruta Enrutada Activa:</span>
                <span className="text-amber-400 font-extrabold text-[11px]">Enlace GPS Directo</span>
              </div>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] border border-amber-400/30">
                    1
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Origen (Recogida):</span>
                    <span className="text-white font-bold line-clamp-1 text-[11px]" title={origin.address}>
                      {origin.address || "Selecciona punto de recogida"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] border border-cyan-400/30">
                    2
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Destino (Entrega):</span>
                    <span className="text-white font-bold line-clamp-1 text-[11px]" title={destination.address}>
                      {destination.address || "Selecciona punto de entrega"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Distance and ETA Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/50 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <MapPin size={12} className="text-amber-400" />
                  <span>Distancia Real</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">
                  <span>{distanceKm.toFixed(1)} <span className="text-xs text-amber-400 font-bold">KM</span></span>
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Clock size={12} className="text-cyan-400" />
                  <span>Tiempo (ETA)</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">
                  <span>~{etaMinutes} <span className="text-xs text-cyan-400 font-bold">MIN</span></span>
                </div>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Tarifa Base (primeros 3.0 km):</span>
                <span className="font-bold text-white">$8.000 COP</span>
              </div>

              <div className="flex justify-between text-amber-300">
                <span>Km Adicionales ({extraKm.toFixed(1)} km × $1.500):</span>
                <span className="font-bold">{extraKm > 0 ? `+${formatCOP(Math.round(extraKm * 1500))}` : "$0 COP"}</span>
              </div>

              {weightSurcharge > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Recargo Carga ({weightCategory === "sobrepeso" ? "5-10 kg" : ">10 kg"}):</span>
                  <span className="font-bold">+{formatCOP(weightSurcharge)}</span>
                </div>
              )}

              {isExpress && (
                <div className="flex justify-between text-amber-300">
                  <span>Recargo Prioridad Express (+40%):</span>
                  <span className="font-bold">+{formatCOP(expressCharge)}</span>
                </div>
              )}

              {hasCod && (
                <div className="flex justify-between text-cyan-300">
                  <span>Gestión Contra Entrega (COD):</span>
                  <span className="font-bold">+$3.000 COP</span>
                </div>
              )}

              {hasReturnReceipt && (
                <div className="flex justify-between text-slate-300">
                  <span>Retorno de Guía / Factura:</span>
                  <span className="font-bold">+$4.000 COP</span>
                </div>
              )}

              {isSundayHoliday && (
                <div className="flex justify-between text-slate-300">
                  <span>Recargo Dominical / Festivo:</span>
                  <span className="font-bold">+$3.000 COP</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-2 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Tarifa Total:</span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
                  {formatCOP(calculatedTotalFare)}
                </span>
              </div>
            </div>

            {/* B2B Savings Callout */}
            {pack6kSavings > 0 && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles size={14} className="text-emerald-400" />
                  Con Pack Express 6K:
                </span>
                <span className="font-extrabold text-white">Ahorras {formatCOP(pack6kSavings)}</span>
              </div>
            )}

            {/* GIANT PRIMARY CTA BUTTON */}
            <button
              type="button"
              id="despachar-ruta-now-cta"
              onClick={() => setIsCheckoutDrawerOpen(true)}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-mono font-black text-sm sm:text-base uppercase tracking-wider py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-400/25 hover:shadow-amber-400/40 cursor-pointer min-h-[60px]"
            >
              <Zap size={20} className="fill-black" />
              <span>DESPACHAR RUTA ({formatCOP(calculatedTotalFare)})</span>
            </button>

            {/* Security Guarantee Micro-Badge */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400 pt-1">
              <ShieldCheck size={14} className="text-amber-400" />
              <span>Póliza de carga y trazabilidad en tiempo real incluida</span>
            </div>
          </div>
        </div>
      </div>

      {/* GPS MAP PICKER MODAL */}
      <GpsMapModalPicker
        isOpen={mapPickerMode !== null}
        onClose={() => setMapPickerMode(null)}
        title={
          mapPickerMode === "origin"
            ? "📍 Seleccionar Punto de Origen (Recogida)"
            : "🏁 Seleccionar Punto de Destino (Entrega)"
        }
        initialCoords={mapPickerMode === "origin" ? { lat: originCoords.lat, lng: originCoords.lng } : { lat: destinationCoords.lat, lng: destinationCoords.lng }}
        initialAddress={mapPickerMode === "origin" ? origin.address : destination.address}
        accentColor={mapPickerMode === "origin" ? "amber" : "cyan"}
        onSelectLocation={(loc) => {
          if (mapPickerMode === "origin") {
            setOrigin({
              address: loc.address,
              lat: loc.lat,
              lng: loc.lng,
            });
            setOriginCoords({ lat: loc.lat, lng: loc.lng });
          } else if (mapPickerMode === "dest") {
            setDestination({
              address: loc.address,
              lat: loc.lat,
              lng: loc.lng,
            });
            setDestinationCoords({ lat: loc.lat, lng: loc.lng });
          }
          setApiDistanceKm(null);
        }}
      />

      {/* COLLAPSIBLE CHECKOUT MODAL / DRAWER (Zero initial friction) */}
      <AnimatePresence>
        {isCheckoutDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#090C12] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-amber-400" />
                    <h3 className="text-lg sm:text-xl font-mono font-black text-white">
                      Detalles de Contacto y Despacho
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Solo requerimos estos datos para que el piloto VIP coordine la entrega.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckoutDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Summary Pill Bar */}
              <div className="p-4 bg-[#121622] border border-amber-400/30 rounded-2xl space-y-2 text-xs font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <Navigation size={14} className="text-amber-400" />
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {origin.address.split(",")[0] || "Origen"} → {destination.address.split(",")[0] || "Destino"}
                    </span>
                  </div>
                  <span className="text-amber-400 font-black text-base">{formatCOP(calculatedTotalFare)}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span>Distancia: <strong className="text-white">{distanceKm.toFixed(1)} KM</strong></span>
                  <span>Tiempo estimado: <strong className="text-cyan-300">~{etaMinutes} min</strong></span>
                  <span>Base: <strong className="text-slate-200">$8.000 COP</strong></span>
                  <span>Km Extra: <strong className="text-amber-300">+{formatCOP(Math.round(extraKm * 1500))}</strong></span>
                </div>
              </div>

              {/* Contact Form Fields */}
              <div className="space-y-4">
                {/* 1. Origen Details */}
                <div className="p-4 bg-[#0E1118] border border-amber-400/20 rounded-2xl space-y-3">
                  <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2">
                    <MapPin size={14} />
                    <span>1. Contacto en Origen (Recogida)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">
                        Nombre de quién entrega
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Ej. Carlos Marín"
                          value={originContactName}
                          onChange={(e) => setOriginContactName(e.target.value)}
                          className="w-full bg-[#121622] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">
                        Teléfono / WhatsApp Origen
                      </label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="Ej. 301 234 5678"
                          value={originContactPhone}
                          onChange={(e) => setOriginContactPhone(e.target.value)}
                          className="w-full bg-[#121622] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">
                      Detalles de ubicación (Torre, Apto, Local, Portería)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Local 204 / Dejar en recepción"
                      value={originDetails}
                      onChange={(e) => setOriginDetails(e.target.value)}
                      className="w-full bg-[#121622] border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Destino Details */}
                <div className="p-4 bg-[#0E1118] border border-cyan-400/20 rounded-2xl space-y-3">
                  <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                    <Navigation size={14} />
                    <span>2. Contacto en Destino (Entrega)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">
                        Nombre de quién recibe
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Ej. Marcela Gómez"
                          value={destContactName}
                          onChange={(e) => setDestContactName(e.target.value)}
                          className="w-full bg-[#121622] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">
                        Teléfono / WhatsApp Destino
                      </label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="Ej. 312 987 6543"
                          value={destContactPhone}
                          onChange={(e) => setDestContactPhone(e.target.value)}
                          className="w-full bg-[#121622] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">
                      Detalles de entrega (Apto, Torre, Portería, Referencias)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Torre 3 Apto 802 / Frente al supermercado"
                      value={destDetails}
                      onChange={(e) => setDestDetails(e.target.value)}
                      className="w-full bg-[#121622] border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* COD Amount input if active */}
                {hasCod && (
                  <div className="p-3 bg-cyan-950/30 border border-cyan-400/30 rounded-xl space-y-1">
                    <label className="text-[10px] font-mono text-cyan-300 block font-bold">
                      Monto a Recaudar en Destino (COP)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. $65.000 COP"
                      value={codAmount}
                      onChange={(e) => setCodAmount(e.target.value)}
                      className="w-full bg-[#121622] border border-cyan-400/40 rounded-lg p-2.5 text-xs text-white font-mono font-bold"
                    />
                  </div>
                )}

                {/* Observaciones generales para el piloto */}
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">
                    Descripción del Paquete o Notas para el Piloto (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Caja con accesorios delicados, llevar cambio de $50.000"
                    value={pilotNotes}
                    onChange={(e) => setPilotNotes(e.target.value)}
                    className="w-full bg-[#121622] border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Habeas Data Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="habeasDataDrawer"
                    checked={acceptedHabeasData}
                    onChange={(e) => setAcceptedHabeasData(e.target.checked)}
                    className="w-4 h-4 rounded bg-black border-white/20 text-amber-400 focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="habeasDataDrawer"
                    className="text-[11px] font-mono text-slate-300 cursor-pointer"
                  >
                    Acepto la Política de Tratamiento de Datos Personales (Ley 1581) para el despacho.
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 space-y-2">
                  <a
                    href={acceptedHabeasData ? generateWhatsAppUrl() : "#"}
                    onClick={(e) => {
                      if (!acceptedHabeasData) {
                        e.preventDefault();
                        alert("Por favor acepta el tratamiento de datos para continuar.");
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full font-mono font-black text-sm sm:text-base uppercase tracking-wider py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl min-h-[58px] ${
                      acceptedHabeasData
                        ? "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-amber-400/25 hover:shadow-amber-400/40 cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    }`}
                  >
                    <Send size={18} />
                    <span>CONFIRMAR Y DESPACHAR VÍA WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsCheckoutDrawerOpen(false)}
                    className="w-full text-center text-xs font-mono text-slate-400 hover:text-white py-2 cursor-pointer"
                  >
                    ← Modificar Puntos de Ruta
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
