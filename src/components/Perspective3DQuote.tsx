import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "motion/react";

export default function Perspective3DQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 0.5, 1], [60, 0, -120]);
  const opacityValue = useTransform(smoothProgress, [0.1, 0.35, 0.75], [0, 1, 0]);

  const transform3D = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] sm:min-h-screen overflow-hidden flex items-center justify-center bg-ink border-b border-gold/15 py-20"
    >
      {/* Background Video #2 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-35 z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4"
      />

      {/* Dark Ambient Lighting Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,160,83,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Gradient Fade */}
      <div
        className="absolute top-0 left-0 w-full h-[140px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0B0E14, transparent)",
        }}
      />

      {/* Centered Perspective 3D Content Container */}
      <div className="relative z-20 max-w-5xl px-6 sm:px-12 [perspective:400px]">
        <motion.p
          style={{
            transform: transform3D,
            opacity: opacityValue,
          }}
          className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-parchment leading-[1.35] tracking-tight select-none text-center"
        >
          Una infraestructura de mensajería VIP concebida sobre la precisión del Valle de Aburrá. ÆON Fleet traduce la logística urbana en entregas exactas y blindadas. Cada despacho en nuestra Boxer Negra es tratado como un activo de altísimo valor: cero retrasos, cero excusas y confirmación inmediata en cada destino.
        </motion.p>
      </div>

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-[140px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0B0E14, transparent)",
        }}
      />
    </section>
  );
}
