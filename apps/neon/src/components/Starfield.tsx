"use client";

import { useEffect, useRef } from "react";

/** Sparse drifting dots on a canvas — the reference's subtle starfield backdrop. */
const Starfield = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; v: number }[] = [];

    const seed = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.35 + 0.08,
        v: Math.random() * 0.12 + 0.02,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 240, ${s.a})`;
        ctx.fill();
        if (!reduceMotion) {
          s.y -= s.v;
          if (s.y < -2) {
            s.y = canvas.height + 2;
            s.x = Math.random() * canvas.width;
          }
        }
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    seed();
    draw();
    window.addEventListener("resize", seed);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", seed);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
};

export default Starfield;
