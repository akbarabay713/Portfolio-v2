"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Fraction of the cursor offset the element follows. */
  strength?: number;
}

/** Magnetic hover via gsap.quickTo. element leans toward the cursor. */
const Magnetic = ({ children, className, strength = 0.3 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default Magnetic;
