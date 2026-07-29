import { motion } from "motion/react";

export default function ArchitectureLayers() {
  const layers = [
    {
      layer: "Capa 1",
      title: "Registro de Despacho",
      desc: "Ingreso de dirección de origen, destino y detalles del paquete en nuestra Hoja de Despacho digital.",
    },
    {
      layer: "Capa 2",
      title: "Despacho & Tránsito VIP",
      desc: "Asignación inmediata de mensajero en Boxer Negra con verificación de ruta y horario de llegada.",
    },
    {
      layer: "Capa 3",
      title: "Entrega & Confirmación",
      desc: "Notificación en tiempo real al remitente con foto de evidencia, firma o soporte de entrega.",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-ink border-b border-gold/15 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-bright text-[10px] sm:text-xs font-mono uppercase tracking-widest block mb-3">
            ESTRUCTURA OPERATIVA
          </span>
          <h2 className="text-parchment font-serif text-3xl sm:text-5xl font-light leading-tight mb-6">
            Tres Capas. <span className="text-gold-bright italic font-normal">Cero Fricción.</span>
          </h2>
          <p className="text-slate-dim text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-16">
            Desde la solicitud inicial hasta la entrega final en manos del cliente, cada movimiento sigue un protocolo estricto de seguridad.
          </p>
        </motion.div>

        {/* Layers Stack */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {layers.map((item, idx) => (
            <motion.div
              key={item.layer}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="w-full bg-ink-light/60 border border-gold/20 hover:border-gold/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-left transition-all hover:bg-ink-light shadow-xl shadow-black/40 gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-bright font-mono text-xs uppercase tracking-widest shrink-0">
                  {item.layer}
                </span>
                <h3 className="text-parchment font-bold text-lg sm:text-xl">
                  {item.title}
                </h3>
              </div>
              <p className="text-slate-dim text-xs sm:text-sm max-w-md">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
