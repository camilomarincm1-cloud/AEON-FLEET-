import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { CORE_STATS } from "../data";

function StatCard({ target, suffix, prefix = "", label, index }: { target: number; suffix: string; prefix?: string; label: string; index: number; key?: React.Key }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      if (target === 0) {
        setCount(0);
        return;
      }

      let start = 0;
      const duration = 1500; // ms
      const stepTime = 30; // ms
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-ink border border-gold/10 hover:border-gold/30 rounded-xl p-6 sm:p-8 text-center transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-gold/5"
    >
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-gold-bright mb-3 flex items-center justify-center gap-0.5">
        <span>{prefix}</span>
        <span>{count}</span>
        <span className="text-gold font-sans">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm text-slate-dim leading-relaxed group-hover:text-parchment transition-colors font-mono tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 border-b border-gold/15 bg-ink-light/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CORE_STATS.map((stat, idx) => (
            <StatCard
              key={stat.id}
              target={stat.target}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
