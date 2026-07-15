"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** How far the inner content drifts, in percent of its height. */
  amount?: number;
}

/**
 * Scrub-parallax: the child image drifts vertically as the wrapper crosses
 * the viewport. The child should be slightly oversized (scale-110) so the
 * drift never exposes edges.
 */
const Parallax = ({ children, className, amount = 8, ...rest }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const img = ref.current?.querySelector("img");
      if (!img) return;

      gsap.fromTo(
        img,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
};

export default Parallax;
