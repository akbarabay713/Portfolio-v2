"use client";
import { motion } from "framer-motion";

const Background = () => {
  const squares = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {squares.map((square) => (
        <motion.div
          key={square}
          className="absolute w-4 h-4 bg-gray-200 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default Background;
