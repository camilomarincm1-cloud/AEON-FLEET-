import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Plus, Minus } from "lucide-react";

export default function VolumeCalculator() {
  const [qty, setQty] = useState(15);

  const copF = (n: number) => {
    return "$" + n.toLocaleString("es-CO").replace(/,/g, ".");
  };

  const getPlanDetails = (val: number) => {
    let plan = "";
    let unit = 0;
    let total = 0;
    let sub = "";
    let custom = "";
    let waMsg = "";

    if (val === 1) {
      plan = "Express Suelto";
      unit = 13500;
      total = 13500;
      sub = `Tarifa base <strong>Zona C</strong> (Medellín). Precio exacto según origen y destino.`;
      waMsg = "Hola, ÆON Fleet. Necesito hacer 1 envío de forma puntual. ¿Me confirmas la tarifa exacta para mi dirección?";
    } else if (val <= 14) {
      plan = "Express Suelto";
      unit = 18000;
      total = val * 18000;
      sub = `${val} envíos sueltos · <strong>${copF(18000)}</strong> cada uno sin plan. Considera el Pack Emprendedor al llegar a 15 envíos.`;
      waMsg = `Hola, ÆON Fleet. Necesito hacer ${val} envíos este mes. ¿Cuál es la mejor alternativa de precio para mi volumen?`;
    } else if (val === 15) {
      plan = "Pack Emprendedor";
      unit = 15000;
      total = 225000;
      sub = `15 envíos incluidos · <strong>${copF(15000)}</strong> por entrega · precio blindado (no varía por clima o zona).`;
      waMsg = "Hola, ÆON Fleet. Necesito exactamente 15 envíos al mes. Quiero el Pack Emprendedor — ¿tienes cupo disponible?";
    } else if (val <= 39) {
      plan = "Pack Emprendedor + Sueltos";
      const extra = val - 15;
      const t1 = 225000;
      const t2 = extra * 18000;
      total = t1 + t2;
      unit = Math.round(total / val);
      sub = `Pack 15 (${copF(t1)}) + ${extra} sueltos (${copF(t2)}) · Promedio <strong>${copF(unit)}/envío</strong>. Sube a RUTA-40 al llegar a 40 y ahorra ${copF(total - 540000)}.`;
      custom = `<strong>Alternativa ideal:</strong> Con el plan RUTA-40 (40 envíos) pagarías ${copF(540000)} en total — lo que te ahorraría ${copF(total - 540000)} respecto a tu combinación actual.`;
      waMsg = `Hola, ÆON Fleet. Necesito ${val} envíos al mes. ¿Cómo me queda más económico — Pack 15 + sueltos, o me conviene pasar al RUTA-40?`;
    } else if (val === 40) {
      plan = "Crecimiento VIP";
      unit = 13500;
      total = 540000;
      sub = `40 envíos · <strong>${copF(13500)}</strong> por entrega · precio blindado (no varía por clima o zona) · alta prioridad de asignación · la tarifa más baja disponible.`;
      waMsg = "Hola, ÆON Fleet. Necesito exactamente 40 envíos al mes. Quiero activar Crecimiento VIP — ¿hay cupo disponible?";
    } else {
      plan = "Volumen Corporativo";
      const base40 = Math.floor(val / 40);
      const rem = val % 40;
      const estimated =
        base40 * 540000 +
        (rem > 15 ? 225000 + (rem - 15) * 18000 : rem > 0 ? rem * 15000 : 0);
      sub = `${val} envíos · Volumen alto. Tu costo estimado: <strong>${copF(estimated)}/mes</strong>. Negociamos tarifa corporativa preferencial.`;
      custom = `<strong>Clientes de alto volumen</strong> (más de 40 envíos) reciben tarifas preferenciales negociadas directamente según sus trayectos recurrentes. Escríbenos para estructurar tu propuesta.`;
      waMsg = `Hola, ÆON Fleet. Manejo un volumen de ${val} envíos al mes. Quiero cotizar una tarifa corporativa personalizada. ¿Podemos hablar?`;
      unit = estimated > 0 ? Math.round(estimated / val) : 13500;
      total = estimated;
    }

    return { plan, unit, total, sub, custom, waMsg };
  };

  const { plan, unit, total, sub, custom, waMsg } = getPlanDetails(qty);
  const sliderPercentage = ((qty - 1) / (120 - 1)) * 100;

  return (
    <motion.div 
      id="calculadora"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="bg-ink-light border border-gold/30 rounded-xl p-6 sm:p-10 my-16 shadow-2xl relative overflow-hidden"
    >
      {/* Visual glowing border */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
          <span className="font-mono text-[10px] text-gold uppercase tracking-widest block mb-2 px-3 py-1 border border-gold/20 rounded-full bg-gold/5 w-fit">
            Calculadora de Volumen
          </span>
          <h3 className="font-serif text-3xl font-normal text-parchment">
            Cotizador Inteligente
          </h3>
        </div>
        <div className="flex items-baseline gap-1.5 font-mono text-left sm:text-right">
          <span className="text-4xl sm:text-5xl font-bold text-gold-bright">{qty}</span>
          <span className="text-xs text-slate-dim uppercase tracking-wider">envíos / mes</span>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-12 h-12 rounded-full bg-ink border border-gold/15 flex items-center justify-center text-parchment hover:border-gold hover:text-gold-bright transition-colors cursor-pointer shrink-0 select-none shadow-lg"
          aria-label="Disminuir"
        >
          <Minus size={18} />
        </button>

        <div className="flex-1 relative py-6">
          <input
            type="range"
            min="1"
            max="120"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-ink rounded-full appearance-none cursor-pointer outline-none shadow-inner"
            style={{
              background: `linear-gradient(to right, #C8A053 0%, #C8A053 ${sliderPercentage}%, #1C2130 ${sliderPercentage}%, #1C2130 100%)`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => setQty(Math.min(120, qty + 1))}
          className="w-12 h-12 rounded-full bg-ink border border-gold/15 flex items-center justify-center text-parchment hover:border-gold hover:text-gold-bright transition-colors cursor-pointer shrink-0 select-none shadow-lg"
          aria-label="Aumentar"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Ticks */}
      <div className="flex justify-between font-mono text-[9px] text-slate-dim px-4 sm:px-14 mb-10 select-none relative z-10">
        <span>1</span>
        <span>30</span>
        <span>60</span>
        <span>90</span>
        <span>120</span>
      </div>

      {/* Results panel */}
      <div className="border-t border-gold/15 pt-8 flex flex-col md:flex-row gap-8 justify-between items-start relative z-10">
        <div className="flex-1">
          <span className="font-mono text-[10px] text-gold uppercase tracking-widest block mb-2">
            Plan recomendado para tu volumen
          </span>
          <h4 className="font-serif text-2xl font-semibold text-parchment mb-3">
            {plan}
          </h4>
          <p
            className="text-sm text-slate-dim leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sub }}
          />

          {custom && (
            <div
              className="bg-rust/5 border border-rust/20 rounded-lg p-4 mt-5 text-sm text-slate-dim leading-relaxed shadow-inner"
              dangerouslySetInnerHTML={{ __html: custom }}
            />
          )}

          <a
            href={`https://api.whatsapp.com/send?phone=573012964584&text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold-bright font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-lg shadow-gold/5"
          >
            <MessageSquare size={14} />
            Cotizar este volumen →
          </a>
        </div>

        <div className="md:text-right shrink-0 bg-ink p-6 rounded-xl border border-gold/10 w-full md:w-auto">
          <span className="text-[10px] font-mono text-slate-dim block uppercase tracking-wider">Tarifa base por envío</span>
          <span className="text-3xl sm:text-4xl font-bold font-mono text-gold-bright block mt-1">
            {unit > 0 ? `${copF(unit)}/env.` : "Personalizada"}
          </span>
          <span className="text-[10px] font-mono text-slate-dim block mt-4 uppercase tracking-wider">Inversión mensual estimada</span>
          <span className="text-base font-semibold text-parchment block mt-1">
            {total > 0 ? `${copF(total)} / mes` : "Consúltanos por volumen"}
          </span>
        </div>
      </div>
      
      {/* Educational Benefits Block */}
      <div className="border-t border-gold/15 pt-8 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 text-left">
        <div className="bg-ink/50 p-5 rounded-lg border border-gold/5">
          <h5 className="font-bold text-sm text-parchment mb-2 flex items-center gap-2">
            <span className="text-gold-bright font-mono">01.</span> Precio Blindado
          </h5>
          <p className="text-xs text-slate-dim leading-relaxed">
            Nuestros paquetes aseguran que el costo de tus entregas no varíe por distancia, cambios de clima o alta demanda. Paga una sola tarifa en todos los envíos.
          </p>
        </div>
        <div className="bg-ink/50 p-5 rounded-lg border border-gold/5">
          <h5 className="font-bold text-sm text-parchment mb-2 flex items-center gap-2">
            <span className="text-gold-bright font-mono">02.</span> Alta Prioridad
          </h5>
          <p className="text-xs text-slate-dim leading-relaxed">
            Tus pedidos entran directamente a la matriz principal de despacho (Ruta-01 y Ruta-40), garantizando que se recojan y entreguen antes de la hora de corte.
          </p>
        </div>
        <div className="bg-ink/50 p-5 rounded-lg border border-gold/5">
          <h5 className="font-bold text-sm text-parchment mb-2 flex items-center gap-2">
            <span className="text-gold-bright font-mono">03.</span> Ahorro Acumulado
          </h5>
          <p className="text-xs text-slate-dim leading-relaxed">
            Hacer envíos de manera informal e individual termina costando hasta un 30% más por mes. Al planificar tu volumen con nosotros, ese dinero se queda en tu bolsillo.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
