"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: string;
  top: string;
  duration: number;
}

// Pre-generate stable random values outside the component render cycle
const PARTICLES: Particle[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  duration: 10 + (i % 10),
}));

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-4 h-4 bg-gray-200 opacity-20"
          style={{ left: p.left, top: p.top }}
          animate={{ x: [0, 30, 0], y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

export default Background;
