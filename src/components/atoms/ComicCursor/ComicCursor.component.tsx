"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, [data-cursor='hover']";

/**
 * Comic ink cursor for fine-pointer devices: a solid dot that tracks exactly,
 * and an outlined ring that lags behind, grows over interactive elements, and
 * squishes on click. On touch it stays parked off-screen and the native cursor
 * is untouched.
 */
const ComicCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: pressed ? 0.7 : hovering ? 1.7 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-outline"
      />
    </>
  );
};

export default ComicCursor;
