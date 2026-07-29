import { motion } from "motion/react";

export default function SectionDivider() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 sm:py-10 bg-transparent relative z-20 pointer-events-none">
      <div className="w-full max-w-5xl px-6 flex items-center gap-4 sm:gap-8">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/30 to-gold/60" />
        <motion.div 
          initial={{ rotate: 0, opacity: 0, scale: 0.5 }}
          whileInView={{ rotate: 45, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-3 h-3 sm:w-4 sm:h-4 border border-gold bg-ink shadow-[0_0_15px_rgba(200,160,83,0.5)] flex items-center justify-center" 
        >
          <div className="w-1 h-1 bg-gold-bright" />
        </motion.div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/30 to-gold/60" />
      </div>
    </div>
  );
}
