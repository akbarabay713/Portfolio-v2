"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["POW!", "BAM!", "ZAP!", "BOOM!", "WHAM!", "KAPOW!", "ZING!", "BOP!"];

interface Burst {
  id: number;
  x: number;
  y: number;
  word: string;
  rot: number;
}

let counter = 0;

/** Pops a comic starburst ("POW!") wherever the user clicks, then fades it out. */
const ClickBurst = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      const id = ++counter;
      const burst: Burst = {
        id,
        x: e.clientX,
        y: e.clientY,
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        rot: Math.random() * 24 - 12,
      };
      setBursts((prev) => [...prev, burst]);
      window.setTimeout(
        () => setBursts((prev) => prev.filter((b) => b.id !== id)),
        650,
      );
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            style={{ left: b.x, top: b.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0, opacity: 0, rotate: b.rot - 10 }}
            animate={{ scale: 1, opacity: 1, rotate: b.rot }}
            exit={{ scale: 1.25, opacity: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 17 }}
            className="absolute"
          >
            <div className="relative grid h-24 w-24 place-items-center">
              <div className="comic-burst absolute inset-0 bg-outline" />
              <div className="comic-burst absolute inset-[3px] bg-highlight" />
              <span className="relative font-display text-lg tracking-wide text-[#16130f]">
                {b.word}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickBurst;
