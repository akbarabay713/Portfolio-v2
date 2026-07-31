"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** scroll progress bar pinned to top of viewport */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1.5 origin-left border-b-2 border-outline bg-accent"
    />
  );
};

export default ScrollProgress;
