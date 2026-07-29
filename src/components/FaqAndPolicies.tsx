import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ShieldAlert, AlertTriangle, Info } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ElementType;
  isPolicy?: boolean;
}

const FAQS: FaqItem[] = [
  {
    id: "kilometraje-packs",
    question: "¿Cuál es el límite de kilometraje por envío en los Packs B2B y qué pasa si lo supero?",
    answer: "Cada Pack B2B incluye una cobertura máxima de distancia por trayecto: Pack Emprendedor (hasta 6 KM), Pack Corporate (hasta 11 KM) y Pack Enterprise (hasta 15 KM). Si un trayecto específico supera esta distancia máxima (por ejemplo, rutas interzonales extremas de sur a norte), el sistema o cotizador aplica un recargo automático de $1.800 COP por cada kilómetro adicional sobre el límite de tu plan para proteger la rentabilidad del piloto y la flota.",
    icon: ShieldAlert,
    isPolicy: true,
  },
  {
    id: "garantia-perdida",
    question: "¿Tienen garantía por pérdida o hurto de mercancía?",
    answer: "Sí. En el caso excepcional de pérdida o hurto comprobado bajo nuestra custodia, ÆON Fleet responde hasta por un valor máximo declarado de $50.000 COP en envíos estándar. Si transportas mercancía de mayor valor, es obligatorio declararlo antes de solicitar el servicio y adquirir el seguro adicional (cubrimiento proporcional). Sin declaración previa, el tope de indemnización es innegociable.",
    icon: ShieldAlert,
    isPolicy: true,
  },
  {
    id: "reclamaciones",
    question: "¿Cuál es el proceso y plazo para reclamaciones por daños?",
    answer: "Toda reclamación por avería o faltante debe notificarse a nuestro equipo de soporte técnico en un plazo máximo de 12 horas posteriores a la notificación de entrega. Es indispensable presentar evidencia fotográfica del producto y su embalaje antes del despacho. Pasado este plazo, o sin el embalaje original, se asume la conformidad del destinatario y ÆON Fleet no aceptará reclamaciones.",
    icon: AlertTriangle,
    isPolicy: true,
  },
  {
    id: "lluvia",
    question: "¿Qué pasa si llueve durante mi entrega?",
    answer: "Cuando hay precipitaciones fuertes, la seguridad de la flota es prioridad. Los tiempos SLA de entrega se suspenden temporalmente o se extienden sin comprometer la garantía de servicio. Adicionalmente, se aplica un recargo automático por clima extremo (+$4.000 COP) para compensar las difíciles condiciones de navegación y proteger tu envío.",
    icon: AlertTriangle,
    isPolicy: true,
  },
  {
    id: "espera",
    question: "¿Qué sucede si el cliente final no responde o se demora?",
    answer: "Brindamos 10 minutos de cortesía al llegar al destino. A partir del minuto 11, se genera un recargo de $500 COP por cada minuto adicional. Si tras 20 minutos de espera total no hay respuesta, el paquete se retorna automáticamente al origen. Se cobrará la tarifa de ida completa más el 50% de la tarifa por el viaje de retorno.",
    icon: ShieldAlert,
    isPolicy: true,
  },
  {
    id: "embalaje",
    question: "¿Quién asume la responsabilidad si un artículo frágil se daña?",
    answer: "El embalaje es responsabilidad 100% del remitente. Todo artículo frágil (vidrio, cerámica, líquidos, repostería, tecnología) debe ir en caja rígida y con material de amortiguación (plástico burbuja). ÆON Fleet no responde por daños internos causados por un embalaje deficiente o nulo. La recolección del paquete no implica la aceptación de un buen embalaje.",
    icon: ShieldAlert,
    isPolicy: true,
  },
  {
    id: "direccion",
    question: "¿Puedo cambiar la dirección de entrega a última hora?",
    answer: "Sí, siempre y cuando se notifique oportunamente. Si el mensajero ya va en camino hacia la dirección original, el sistema recalculará la tarifa desde el punto actual de desvío hasta el nuevo destino. Esto generará un costo adicional sobre la tarifa base inicial que debe ser asumido de inmediato.",
    icon: Info,
  },
  {
    id: "recaudo",
    question: "¿Qué ocurre si hay problemas con el pago Contra Entrega?",
    answer: "Si el destinatario paga en efectivo, debe tener el monto exacto o cercano. Si el mensajero recibe billetes falsos o en mal estado, la responsabilidad recae sobre el comprador y se cancelará la entrega. Si el pago es por transferencia (Nequi/Bancolombia) y la plataforma presenta fallas, aplica el tiempo de espera y sus respectivos recargos ($500/min).",
    icon: AlertTriangle,
    isPolicy: true,
  },
  {
    id: "prohibidos",
    question: "¿Qué artículos están estrictamente prohibidos?",
    answer: "Por normativa legal y de seguridad, no transportamos: dinero en efectivo en altas sumas, joyas sin declarar, armas, material biológico, sustancias ilegales, inflamables, ni animales vivos. El remitente asume toda responsabilidad legal sobre el contenido del paquete. Nos reservamos el derecho de inspeccionar o rechazar paquetes sospechosos.",
    icon: ShieldAlert,
    isPolicy: true,
  }
];

export default function FaqAndPolicies() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-[10px] sm:text-xs text-rust-bright uppercase tracking-widest mb-4 px-3 py-1 border border-rust/20 rounded-full bg-rust/10">
            Blindaje Operativo & Políticas
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-parchment leading-tight mb-4">
            Reglas del Juego <span className="text-rust-bright italic font-normal">Claras.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-dim max-w-2xl mx-auto leading-relaxed">
            Protegemos la integridad de nuestros mensajeros y la rentabilidad de tu negocio. Conoce nuestras políticas operativas para escenarios de contingencia. Transparencia total, sin letra pequeña.
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                  isOpen 
                    ? "bg-ink-light border-rust/30 shadow-lg shadow-rust/5" 
                    : "bg-ink border-gold/10 hover:border-gold/20"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-rust/20 text-rust-bright" : "bg-gold/10 text-gold"
                    }`}>
                      <Icon size={14} />
                    </div>
                    <span className={`font-serif text-base sm:text-lg transition-colors ${
                      isOpen ? "text-parchment font-semibold" : "text-slate-dim hover:text-parchment/80"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? "text-rust-bright rotate-180" : "text-gold/50"
                    }`} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 pl-[72px]">
                        <p className="text-sm text-slate-dim leading-relaxed">
                          {faq.answer}
                        </p>
                        {faq.isPolicy && (
                          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rust/10 border border-rust/20 text-[10px] font-mono font-bold text-rust-bright uppercase tracking-wider">
                            <ShieldAlert size={10} />
                            Política Innegociable
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
