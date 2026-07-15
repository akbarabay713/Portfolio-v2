"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * A hollow ring eased behind the pointer (the WE.RAA circle cursor). Grows
 * over interactive targets. Fine pointers only; native cursor stays visible so
 * text and links still feel clickable.
 */
const RingCursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(ref.current, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const xTo = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest?.("a, button, [data-hover]")));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[60] hidden rounded-full border border-text/50 transition-[width,height] duration-300 [@media(pointer:fine)]:block ${
        hover ? "h-14 w-14" : "h-8 w-8"
      }`}
    />
  );
};

export default RingCursor;
