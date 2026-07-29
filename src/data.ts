import { Zone, RouteOption, Testimonial, StatItem, RuleItem } from "./types";

export const ZONES: Zone[] = [
  {
    code: "A",
    name: "Sur Profundo",
    munis: ["San Antonio de Prado", "La Tablaza", "Caldas"],
  },
  {
    code: "B",
    name: "Sur Valle",
    munis: ["La Estrella", "Sabaneta", "Itagüí", "Envigado"],
  },
  {
    code: "C",
    name: "Medellín",
    munis: [
      "Centro",
      "El Poblado",
      "Laureles",
      "Belén",
      "Castilla",
      "Robledo",
      "Aranjuez",
      "Guayabal",
      "Doce de Octubre",
      "La América",
    ],
  },
  {
    code: "D",
    name: "Norte Valle",
    munis: ["Bello Centro", "Niquía", "La Madera", "Hato Viejo"],
  },
];

export const PRICING_MATRIX = [
  [16500, 23000, 29000, 40000],
  [23000, 13500, 18500, 28500],
  [29000, 18500, 13500, 20000],
  [40000, 28500, 20000, 13500],
];

export const TIMES_MATRIX = [
  [25, 35, 45, 62],
  [35, 20, 28, 44],
  [45, 28, 20, 30],
  [62, 44, 30, 20],
];

export const ROUTES: RouteOption[] = [
  {
    id: "r1",
    code: "01",
    name: "Express Suelto (Ocasional)",
    description: "Servicio suelto ancla · 1 entrega puntual · $12.000 BASE (2KM) + $1.800/KM",
    basePriceText: "$12.000 Base",
    unitLabel: "$12.000 Base (2KM) + $1.800/KM",
    features: [
      "Tarifa base $12.000 COP incluye los primeros 2 KM",
      "$1.800 COP por cada KM adicional recorrido",
      "Ideal para envíos ocasionales o pruebas únicas",
      "Respuesta y confirmación por WhatsApp antes de despachar",
      "Evidencia fotográfica y trazabilidad de entrega",
      "Cobertura Valle de Aburrá (10:00 AM - 08:00 PM)",
    ],
    warnings: [
      "Recomendado migrar a Pack B2B para reducir costo unitario hasta $11.500 COP",
      "Corte a las 02:00 PM para despacho el mismo día",
    ],
    whatsappMsg: "Hola, ÆON Fleet. Quiero cotizar un envío Express Suelto con tarifa $12.000 Base (2KM) + $1.800/KM.",
  },
  {
    id: "r15",
    code: "10",
    name: "Pack Emprendedor",
    description: "10 envíos prepagados · $140.000 COP · $14.000 / envío · Hasta 6 KM/trayecto",
    basePriceText: "$140.000",
    unitLabel: "$14.000 / envío · COP",
    features: [
      "10 envíos por $140.000 COP ($14.000 COP por envío)",
      "Cubre trayectos urbanos de hasta 6 KM por envío",
      "Excedente de ruta larga: +$1.800 COP por cada KM adicional",
      "Precio 100% congelado y protegido contra lluvia u hora pico",
      "Vigencia estricta de 30 días calendario (saldo no acumulable)",
      "Prioridad de despacho sobre servicios sueltos",
    ],
    warnings: [
      "Vigencia estricta de 30 días calendario (expiración automática sin prórrogas)",
      "Trayectos > 6 KM generan recargo por excedente de $1.800/KM",
    ],
    whatsappMsg: "Hola, ÆON Fleet. Me interesa adquirir el Pack Emprendedor ($140.000 COP por 10 envíos de hasta 6km, 30 días de vigencia).",
  },
  {
    id: "r40",
    code: "25",
    name: "Pack Corporate",
    description: "25 envíos prepagados · $310.000 COP · $12.400 / envío · Hasta 11 KM/trayecto",
    basePriceText: "$310.000",
    unitLabel: "$12.400 / envío · COP",
    isBestValue: true,
    features: [
      "25 envíos por $310.000 COP ($12.400 COP por envío)",
      "Cubre trayectos de hasta 11 KM (franja interzonal Aburrá)",
      "Excedente de ruta larga: +$1.800 COP por cada KM adicional",
      "Excepción VIP de despacho (< 45 min) en franja de 11:00 AM a 05:00 PM",
      "Vigencia estricta de 30 días calendario",
      "Facturación centralizada para negocios",
    ],
    bulletText: "Prioridad Corporate VIP: Excepción de atención en < 45 minutos activa de 11:00 AM a 05:00 PM. Cobertura hasta 11 KM por trayecto (+ $1.800/KM extra). Vigencia estricta 30 días.",
    whatsappMsg: "Hola, ÆON Fleet. Quiero activar el Pack Corporate ($310.000 COP por 25 envíos de hasta 11km, $12.400 c/u, 30 días de vigencia).",
  },
  {
    id: "svca",
    code: "A",
    name: "Personal Shopper Express",
    description: "Compras por encargo en tienda física · máximo 20 min en sitio · capital 100% anticipado",
    basePriceText: "Base + $6.000",
    unitLabel: "fee de gestión en sitio",
    features: [
      "Compras por encargo en tienda física dentro del Valle de Aburrá",
      "Máximo 20 minutos en tienda (cronometrado desde ingreso)",
      "Foto del producto antes de pagar + ticket/factura de compra",
      "Verificación de estado del artículo antes del pago",
    ],
    warnings: [
      "Capital 100% anticipado: valor del artículo + servicio completo",
      "Si no hay stock del producto: se cobra solo el trayecto base",
      "No aplica para tiendas con filas mayores a 20 min de espera",
      "Artículos ilegales, regulados o peligrosos no se gestionan",
    ],
    whatsappMsg: "Hola, ÆON Fleet. Necesito el servicio SVC-A Personal Shopper. Tengo una compra por encargo. ¿Tienes disponibilidad?",
  },
  {
    id: "svcb",
    code: "B",
    name: "Gestión de Trámites / EPS",
    description: "Trámites de alta fricción · filas · gestiones bancarias · primera hora cubierta",
    basePriceText: "Base + $12.000",
    unitLabel: "1ª hora · +$5.000 / 30 min adicionales",
    features: [
      "Trámites EPS, bancos, DIAN, notarías, entidades públicas",
      "Primera hora de espera cubierta en la tarifa base (+$12.000)",
      "+$5.000 COP por cada 30 minutos adicionales de fila",
      "Confirmación en tiempo real del estado del trámite por WA",
      "Foto del turno, formularios y resultado del trámite",
    ],
    warnings: [
      "Documentos y formularios deben estar listos con el cliente",
      "No garantizamos tiempos de fila — son del operador externo",
      "Capital 100% anticipado para trámites con pago en entidad",
    ],
    whatsappMsg: "Hola, ÆON Fleet. Necesito el SVC-B para un trámite. ¿Tienes disponibilidad hoy?",
  },
  {
    id: "svcc",
    code: "C",
    name: "Protocolo Salva Vidas",
    description: "Encargos de vida o muerte. Despliegue inmediato rompiendo la ruta consolidada. Se activa cuando cada minuto cuenta — medicamentos críticos, documentos de emergencia, reemplazos vitales.",
    basePriceText: "Base + $33.500",
    unitLabel: "fee de urgencia extrema",
    isUrgent: true,
    features: [
      "Despliegue inmediato — rompe cualquier ruta consolidada activa",
      "Prioridad absoluta sobre todos los pedidos en curso",
      "Sin ventana de tiempo — activación en minutos, no horas",
      "Aplica para: medicamentos críticos, documentos de emergencia",
      "Aplica para: reemplazos vitales, urgencias médicas comprobadas",
    ],
    warnings: [
      "Activación SOLO por WhatsApp — no se acepta por formulario",
      "Fee de urgencia: $33.500 + tarifa base del trayecto. No negociable.",
      "Uso indebido (no es urgencia real): cargo completo sin reembolso",
    ],
    whatsappMsg: "Hola, ÆON Fleet. Necesito activar el Protocolo Salva Vidas SVC-C. Es una urgencia extrema. ¿Tienes disponibilidad inmediata?",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    stars: 5,
    quote: "Con ÆON Fleet, mis clientes me escriben a felicitarme por el servicio postventa. Antes eran las quejas de siempre.",
    author: "Valentina R.",
    role: "Suplementos deportivos · Laureles",
  },
  {
    id: "t2",
    stars: 5,
    quote: "El precio no varía, la hora se cumple. Para una tienda de moda, la puntualidad vale más que el descuento.",
    author: "Isabella M.",
    role: "Boutique de moda · El Poblado",
  },
  {
    id: "t3",
    stars: 5,
    quote: "Trabajo con piezas de joyería de alto valor. La garantía de cumplimiento fue lo que me convenció. Cero pérdidas.",
    author: "Andrés C.",
    role: "Joyería artesanal · Envigado",
  },
];

export const CORE_STATS: StatItem[] = [
  {
    id: "s1",
    target: 0,
    suffix: "%",
    label: "Paquetes extraviados en operación",
  },
  {
    id: "s2",
    prefix: "<",
    target: 6,
    suffix: "h",
    label: "Tiempo promedio en ruta de reparto",
  },
  {
    id: "s3",
    target: 99,
    suffix: "%",
    label: "SLA de cumplimiento en ventana horaria",
  },
  {
    id: "s4",
    prefix: "−",
    target: 40,
    suffix: "%",
    label: "Reducción en devoluciones por logística",
  },
];

export const RULES: RuleItem[] = [
  {
    id: "rule1",
    title: "Horario Operativo Flota",
    description: "10:00 AM — 08:00 PM (Lunes a Sábado, Valle de Aburrá) · Ninguna operación inicia antes de las 10:00 AM.",
  },
  {
    id: "rule2",
    title: "⚡ Regla de Corte SLA (02:00 PM)",
    description: "Solicitudes antes de las 02:00 PM salen el mismo día. Solicitudes después de las 02:00 PM pasan automáticamente a la primera ruta del día siguiente a las 10:00 AM.",
    isHighlighted: true,
  },
  {
    id: "rule3",
    title: "Excepción VIP Corporate (< 45 min)",
    description: "Exclusiva para Pack Corporate en la franja de control de 11:00 AM a 05:00 PM. Fuera de esta franja aplica la regla general de rutas.",
  },
  {
    id: "rule4",
    title: "Vigencia de Packs B2B (30 Días)",
    description: "Todos los paquetes (Emprendedor, Corporate, Enterprise) tienen vigencia estricta de 30 días calendario desde su compra. Saldo no consumido no se acumula ni prórroga.",
  },
  {
    id: "rule5",
    title: "Kilometraje Máximo por Pack y Excedente",
    description: "Cada trayecto en pack incluye distancia máxima: Emprendedor (hasta 6 KM), Corporate (hasta 11 KM), Enterprise (hasta 15 KM). Cada KM adicional que rebase el límite del plan genera un recargo automático de $1.800 COP / KM.",
  },
];
