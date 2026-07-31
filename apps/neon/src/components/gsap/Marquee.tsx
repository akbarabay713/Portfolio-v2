"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** infinite horizontal marquee, speeds up with scroll velocity then eases back. */
const Marquee = ({ items, className }: MarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const track = ref.current?.querySelector("[data-track]");
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        onUpdate(self) {
          const boost = gsap.utils.clamp(
            1,
            5,
            1 + Math.abs(self.getVelocity()) / 700,
          );
          tween.timeScale(boost);
          gsap.to(tween, {
            timeScale: 1,
            duration: 1,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: ref },
  );

  // Content doubled so the -50% loop is seamless.
  const strip = [...items, ...items];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`overflow-hidden border-y border-line py-6 ${className ?? ""}`}
    >
      <div data-track className="flex w-max items-center gap-8 whitespace-nowrap">
        {strip.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-3xl text-faint sm:text-4xl">
              {item}
            </span>
            <span className="text-xl text-accent">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
