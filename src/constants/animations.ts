import type { Variants } from "framer-motion";

// Expressive ease-out (fast start, soft settle) — the site's signature timing.
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
