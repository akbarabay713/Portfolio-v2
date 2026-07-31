"use client";

import { useEffect, useRef } from "react";
import { audioState } from "@/lib/audio";

// cheap 2D value noise, enough to drive an evolving vector field.
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
 * Hero canvas: particles pushed through a noise flow field, drawn as faint
 * trails. Reacts to the mic, pauses off-screen and when the tab is hidden,
 * renders a single static frame under reduced motion.
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

    // Tint the trails with the current time-of-day accent so the theme shift is
    // visible. Re-read whenever the phase attribute changes.
    const readAccent = () => {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      return m
        ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`
        : "200, 206, 224";
    };
    let accent = readAccent();
    const phaseObserver = new MutationObserver(() => (accent = readAccent()));
    phaseObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-phase"],
    });
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

    // cursor pushes nearby particles away with a slight swirl, so the mouse
    // parts the flow and leaves a wake.
    const cursor = { x: -9999, y: -9999 };
    const RADIUS = 130;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      cursor.x = e.clientX - r.left;
      cursor.y = e.clientY - r.top;
    };
    const clearCursor = () => {
      cursor.x = -9999;
      cursor.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", clearCursor);

    const step = () => {
      const t = performance.now() * 0.00004;
      const boost = 1 + audioState.level * 2.4;
      // Fade the previous frame slightly to leave trails.
      ctx.fillStyle = "rgba(10, 10, 12, 0.055)";
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${accent}, ${0.06 + audioState.level * 0.09})`;
      ctx.beginPath();
      for (const p of particles) {
        const angle = vnoise(p.x * scale, p.y * scale + t) * Math.PI * 4;
        let nx = p.x + Math.cos(angle) * 1.3 * boost;
        let ny = p.y + Math.sin(angle) * 1.3 * boost;

        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < RADIUS * RADIUS) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / RADIUS) * 3.2;
          // push away + a perpendicular component for the swirl
          nx += (dx / d) * f - (dy / d) * f * 0.5;
          ny += (dy / d) * f + (dx / d) * f * 0.5;
        }

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
      phaseObserver.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", clearCursor);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_75%_at_50%_45%,#000_55%,transparent_100%)]">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default FlowField;
