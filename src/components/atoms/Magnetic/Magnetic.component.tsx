"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  /** Max pull toward the cursor, in pixels. */
  strength?: number;
  className?: string;
}

/**
 * Nudges its child toward the cursor while hovered, then springs back.
 * A subtle, tactile hover — disabled when the user prefers reduced motion.
 */
const Magnetic = ({ children, strength = 8, className }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({
      x: (relX / (rect.width / 2)) * strength,
      y: (relY / (rect.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
