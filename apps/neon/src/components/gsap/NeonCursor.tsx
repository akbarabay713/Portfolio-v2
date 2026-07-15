"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const INTERACTIVE = "a, button, [role='button'], input, textarea";

/**
 * Custom cursor for fine pointers: a green dot glued to the pointer and a
 * difference-blend ring that trails it. The ring grows over interactive
 * elements, and over [data-cursor='view'] targets it becomes a filled badge
 * reading VIEW.
 */
const NeonCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"default" | "hover" | "view">("default");

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.style.cursor = "none";

    // Park both parts off-screen until the pointer first moves.
    gsap.set([dotRef.current, ringRef.current], { x: -100, y: -100 });

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
    };
  });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-cursor='view']")) setMode("view");
      else if (target?.closest?.(INTERACTIVE)) setMode("hover");
      else setMode("default");
    };
    window.addEventListener("mouseover", over);
    return () => window.removeEventListener("mouseover", over);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 hidden h-2 w-2 rounded-full bg-accent [@media(pointer:fine)]:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden items-center justify-center rounded-full transition-[width,height,background-color] duration-300 [@media(pointer:fine)]:flex ${
          mode === "view"
            ? "-ml-10 -mt-10 h-20 w-20 bg-accent"
            : mode === "hover"
              ? "-ml-7 -mt-7 h-14 w-14 border border-content/60 mix-blend-difference"
              : "-ml-5 -mt-5 h-10 w-10 border border-content/40 mix-blend-difference"
        }`}
      >
        {mode === "view" && (
          <span className="font-display text-xs tracking-widest text-accent-contrast">
            View
          </span>
        )}
      </div>
    </>
  );
};

export default NeonCursor;
