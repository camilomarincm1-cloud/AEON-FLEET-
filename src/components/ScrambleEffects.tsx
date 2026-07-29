import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

interface ScrambleInProps {
  text: string;
  delay?: number;
  triggered?: boolean;
  className?: string;
}

export const ScrambleIn: React.FC<ScrambleInProps> = ({ text, delay = 0, triggered = true, className = "" }) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!triggered) return;

    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [triggered, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let frame = 0;
    const totalFrames = text.length * 2;

    const interval = setInterval(() => {
      frame++;
      const revealIndex = Math.floor(frame / 2);

      let currentStr = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          currentStr += " ";
          continue;
        }
        if (i < revealIndex) {
          currentStr += text[i];
        } else if (i < revealIndex + 3) {
          const randomChar = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          currentStr += randomChar;
        } else {
          currentStr += "";
        }
      }

      setDisplayText(currentStr);

      if (frame >= totalFrames + 6) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [hasStarted, text]);

  if (!hasStarted) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />;
  }

  return <span className={className}>{displayText}</span>;
};

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, isHovered, className = "" }) => {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalFrames = text.length * 3;

    const interval = setInterval(() => {
      frame++;
      const revealIndex = Math.floor(frame / 3);

      let currentStr = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          currentStr += " ";
          continue;
        }
        if (i < revealIndex) {
          currentStr += text[i];
        } else {
          const randomChar = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          currentStr += randomChar;
        }
      }

      setDisplayText(currentStr);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
};

export const AeonLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-gold-bright" }) => {
  return (
    <svg viewBox="-50 -50 100 100" className={className} fill="currentColor">
      <g>
        <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" />
        <g transform="rotate(90)">
          <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" />
        </g>
        <g transform="rotate(180)">
          <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" />
        </g>
        <g transform="rotate(270)">
          <path d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z" />
        </g>
      </g>
    </svg>
  );
};

interface SquashHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer focus:outline-none w-full h-full text-parchment"
      aria-label="Toggle Menu"
    >
      <div className="relative w-[16px] sm:w-[18px] h-[10px] sm:h-[12px] flex flex-col justify-between items-center">
        <motion.span
          className="absolute w-full h-[1.5px] bg-gold-bright rounded-full top-0"
          animate={isOpen ? { rotate: 45, y: "4.5px" } : { rotate: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.span
          className="absolute w-full h-[1.5px] bg-gold-bright rounded-full top-1/2 -translate-y-1/2"
          animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.span
          className="absolute w-full h-[1.5px] bg-gold-bright rounded-full bottom-0"
          animate={isOpen ? { rotate: -45, y: "-4.5px" } : { rotate: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>
    </button>
  );
};
