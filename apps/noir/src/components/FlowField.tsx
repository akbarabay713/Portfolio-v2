"use client";

import { useEffect, useRef } from "react";
import { audioState } from "@/lib/audio";

// Cheap 2D value noise — enough to drive a soft, evolving vector field.
const hash = (x: number, y: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
};
const smooth = (t: number) => t * t * (3 - 2 * t);
const vnoise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  const u = smooth(xf);
  const v = smooth(yf);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
};

/**
 * Particles advected through a noise flow field, drawn as faint trails. A
 * canvas-2D signature for the hero — reacts to the mic, pauses off-screen and
 * when the tab is hidden, and renders a single static frame under reduced motion.
 */
const FlowField = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: { x: number; y: number }[] = [];

    const seed = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(
        Math.min(900, Math.max(220, (w * h) / 2600)),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
      }));
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, w, h);
    };
    seed();

    const stats = window as unknown as { __flowFrames?: number };
    const scale = 0.0016;
    let raf = 0;
    let running = false;

    const step = () => {
      const t = performance.now() * 0.00004;
      const boost = 1 + audioState.level * 2.4;
      // Fade the previous frame slightly to leave trails.
      ctx.fillStyle = "rgba(10, 10, 12, 0.055)";
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(200, 206, 224, ${0.05 + audioState.level * 0.08})`;
      ctx.beginPath();
      for (const p of particles) {
        const angle = vnoise(p.x * scale, p.y * scale + t) * Math.PI * 4;
        const nx = p.x + Math.cos(angle) * 1.3 * boost;
        const ny = p.y + Math.sin(angle) * 1.3 * boost;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        p.x = nx;
        p.y = ny;
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }
      }
      ctx.stroke();
      stats.__flowFrames = (stats.__flowFrames ?? 0) + 1;
    };

    const loop = () => {
      step();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVis = () => {
      if (!document.hidden && onScreen) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);
    const onResize = () => {
      seed();
      // draw a couple of frames so a resized field isn't blank
      step();
    };
    window.addEventListener("resize", onResize);

    // Warm the trails with a few frames, then run (also covers reduced motion).
    for (let i = 0; i < (reduce ? 60 : 12); i++) step();
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_75%_at_50%_45%,#000_55%,transparent_100%)]">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default FlowField;
