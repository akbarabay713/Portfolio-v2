"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CountUpProps {
  /** e.g. "4+", "13+", "10K+" — leading number animates, suffix stays. */
  value: string;
  className?: string;
  delay?: number;
}

/** Counts the numeric part of a stat up from zero when it enters view. */
const CountUp = ({ value, className, delay = 0 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !match) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const counter = { n: 0 };
      gsap.to(counter, {
        n: target,
        duration: 1.4,
        delay,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate() {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
};

export default CountUp;
