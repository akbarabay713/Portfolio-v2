"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/*
 * Live demos for the studies ledger. Each is self-contained, fills its stage,
 * and either loops or reacts to the pointer. Only one mounts at a time (inside
 * the modal), so per-demo rAF / GSAP loops are cheap.
 */

type Demo = React.ComponentType;

const Center = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex h-full w-full items-center justify-center overflow-hidden ${className}`}>
    {children}
  </div>
);

/* ── S-001 Split Text Rise ─────────────────────────────── */
const SplitRise = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
        .from("[data-c]", { yPercent: 120, duration: 0.7, ease: "power4.out", stagger: 0.06 })
        .to("[data-c]", { yPercent: -120, duration: 0.6, ease: "power3.in", stagger: 0.05, delay: 0.8 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Center>
      <p ref={ref} className="display flex text-6xl text-text sm:text-8xl">
        {"RISE".split("").map((c, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span data-c className="inline-block">{c}</span>
          </span>
        ))}
      </p>
    </Center>
  );
};

/* ── Shared drifting-blob canvas (Smoke / Noise) ───────── */
const BlobCanvas = ({ count = 6, hue = "210, 214, 230" }: { count?: number; hue?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const blobs = Array.from({ length: count }, (_, i) => ({
      bx: 0.2 + Math.random() * 0.6, by: 0.2 + Math.random() * 0.6,
      rx: 0.12 + Math.random() * 0.18, ry: 0.1 + Math.random() * 0.18,
      r: 0.22 + Math.random() * 0.2, a: 0.06 + Math.random() * 0.07,
      p: i * 1.3, s: 0.1 + Math.random() * 0.12,
    }));
    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.filter = "blur(40px)";
      ctx.globalCompositeOperation = "lighter";
      const time = t / 1000;
      for (const b of blobs) {
        const cx = (b.bx + Math.sin(time * b.s + b.p) * b.rx) * w;
        const cy = (b.by + Math.cos(time * b.s * 0.8 + b.p) * b.ry) * h;
        const rad = b.r * Math.min(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${hue}, ${b.a})`);
        g.addColorStop(1, `rgba(${hue}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    draw(0);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count, hue]);
  return <canvas ref={ref} className="h-full w-full" />;
};
const SmokeField = () => <BlobCanvas count={6} />;
const NoiseFlow = () => <BlobCanvas count={14} hue="201, 210, 255" />;

/* ── S-003 Velocity Skew ───────────────────────────────── */
const VelocitySkewDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, t: 0 });
  useEffect(() => {
    const setter = gsap.quickSetter(box.current, "skewX", "deg");
    const proxy = { s: 0 };
    const move = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - last.current.t || 16;
      const v = ((e.clientX - last.current.x) / dt) * 4;
      last.current = { x: e.clientX, t: now };
      proxy.s = gsap.utils.clamp(-24, 24, v);
      setter(proxy.s);
      gsap.to(proxy, { s: 0, duration: 0.8, ease: "power3.out", onUpdate: () => setter(proxy.s), overwrite: true });
    };
    const el = ref.current!;
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center" data-hover>
      <div ref={box} className="display grid place-items-center bg-text px-10 py-8 text-4xl text-bg will-change-transform">
        MOVE
      </div>
      <span className="mono absolute bottom-4 text-[11px] text-faint">move the cursor →</span>
    </div>
  );
};

/* ── Pointer-tracking helper (Ring / Halo / Parallax) ──── */
const usePointer = (el: React.RefObject<HTMLElement | null>) => {
  const [p, setP] = useState({ x: 0.5, y: 0.5, active: false });
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const move = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, active: true });
    };
    const leave = () => setP((s) => ({ ...s, active: false }));
    node.addEventListener("mousemove", move);
    node.addEventListener("mouseleave", leave);
    return () => { node.removeEventListener("mousemove", move); node.removeEventListener("mouseleave", leave); };
  }, [el]);
  return p;
};

/* ── S-004 Ring Cursor ─────────────────────────────────── */
const RingCursorDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current!;
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.05 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.05 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      dx(x); dy(y); rx(x); ry(y);
    };
    node.addEventListener("mousemove", move);
    return () => node.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} className="relative h-full w-full cursor-none">
      <span className="mono absolute inset-0 flex items-center justify-center text-[11px] text-faint">move inside</span>
      <div ref={ring} className="pointer-events-none absolute -ml-5 -mt-5 h-10 w-10 rounded-full border border-text/60" />
      <div ref={dot} className="pointer-events-none absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent" />
    </div>
  );
};

/* ── S-005 Time Palette ────────────────────────────────── */
const TimePalette = () => {
  const phases = [
    { name: "DAWN", c: "#ffc9c0" }, { name: "DAY", c: "#bfe6d6" },
    { name: "DUSK", c: "#e6c9ff" }, { name: "NIGHT", c: "#c9d2ff" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % phases.length), 1400);
    return () => clearInterval(id);
  }, [phases.length]);
  return (
    <Center className="flex-col gap-6">
      <div className="flex gap-3">
        {phases.map((p, idx) => (
          <div key={p.name} className="h-16 w-16 rounded-full transition-all duration-700"
            style={{ background: p.c, opacity: idx === i ? 1 : 0.25, transform: idx === i ? "scale(1.15)" : "scale(1)" }} />
        ))}
      </div>
      <p className="mono text-sm text-text transition-colors duration-700" style={{ color: phases[i].c }}>
        {phases[i].name}
      </p>
    </Center>
  );
};

/* ── S-006 Ghost Numerals ──────────────────────────────── */
const GhostNumerals = () => {
  const [n, setN] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v % 9) + 1), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <Center>
      <span className="display text-[45vh] leading-none text-text/10">{String(n).padStart(2, "0")}</span>
      <span className="mono absolute text-[11px] text-faint">SECTION {String(n).padStart(2, "0")}</span>
    </Center>
  );
};

/* ── Marquee (S-007) ───────────────────────────────────── */
const MarqueeDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-track]", { xPercent: -50, duration: 10, ease: "none", repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);
  const items = ["STUDIES", "MOTION", "TYPE", "WEBGL", "CANVAS", "GSAP"];
  return (
    <Center>
      <div ref={ref} className="w-full overflow-hidden">
        <div data-track className="flex w-max gap-8 whitespace-nowrap">
          {[...items, ...items].map((it, i) => (
            <span key={i} className="display text-4xl text-text/70">{it} <span className="text-accent">/</span></span>
          ))}
        </div>
      </div>
    </Center>
  );
};

/* ── S-008 Magnetic Pull ───────────────────────────────── */
const MagneticDemo = () => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.5);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.5);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <Center>
      <button ref={ref} className="display bg-text px-12 py-6 text-2xl text-bg will-change-transform">PULL</button>
    </Center>
  );
};

/* ── S-009 Pinned Filmstrip ────────────────────────────── */
const FilmstripDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-strip]", { xPercent: -60, duration: 4, ease: "power1.inOut", yoyo: true, repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="flex h-full w-full items-center overflow-hidden">
      <div data-strip className="flex gap-4 pl-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="grid h-40 w-64 shrink-0 place-items-center border border-line bg-panel">
            <span className="mono text-2xl text-faint">0{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── S-010 Line Draw ───────────────────────────────────── */
const LineDraw = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ repeat: -1, repeatDelay: 0.5, yoyo: true })
        .fromTo("[data-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.inOut", stagger: 0.12 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Center className="flex-col gap-6 px-16">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} data-line className="h-px w-full origin-left bg-text" style={{ opacity: 1 - i * 0.2 }} />
      ))}
    </Center>
  );
};

/* ── S-011 Count Ledger ────────────────────────────────── */
const CountLedger = () => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const o = { n: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    tl.to(o, { n: 248, duration: 1.6, ease: "power2.out", onUpdate: () => { if (ref.current) ref.current.textContent = String(Math.round(o.n)); } })
      .to(o, { n: 0, duration: 0.01, delay: 0.8, onUpdate: () => { if (ref.current) ref.current.textContent = "0"; } });
    return () => { tl.kill(); };
  }, []);
  return (
    <Center>
      <span ref={ref} className="display text-8xl text-text">0</span>
      <span className="mono absolute bottom-4 text-[11px] text-faint">projects shipped</span>
    </Center>
  );
};

/* ── S-012 Curtain Intro ───────────────────────────────── */
const CurtainIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ repeat: -1, repeatDelay: 0.4 })
        .set("[data-curtain]", { yPercent: 0 })
        .from("[data-name]", { yPercent: 120, duration: 0.6, ease: "power4.out", stagger: 0.05 })
        .to("[data-curtain]", { yPercent: -100, duration: 0.7, ease: "power4.inOut", delay: 0.6 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="relative h-full w-full">
      <Center><span className="mono text-sm text-muted">welcome</span></Center>
      <div data-curtain className="absolute inset-0 grid place-items-center bg-panel">
        <p className="display flex text-6xl text-text">
          {"AKBAR".split("").map((c, i) => (
            <span key={i} className="overflow-hidden"><span data-name className="inline-block">{c}</span></span>
          ))}
        </p>
      </div>
    </div>
  );
};

/* ── S-013 Hover Preview ───────────────────────────────── */
const HoverPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const chip = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const node = ref.current!;
    const xTo = gsap.quickTo(chip.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(chip.current, "y", { duration: 0.4, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      xTo(e.clientX - r.left); yTo(e.clientY - r.top);
    };
    node.addEventListener("mousemove", move);
    return () => node.removeEventListener("mousemove", move);
  }, []);
  const rows = ["Vitals", "Greyrox", "Dashboard"];
  return (
    <div ref={ref} className="relative flex h-full w-full flex-col justify-center gap-2 px-12">
      {rows.map((r) => (
        <button key={r} onMouseEnter={() => setLabel(r)} onMouseLeave={() => setLabel(null)}
          className="display border-b border-line py-3 text-left text-3xl text-text transition-colors hover:text-accent">
          {r}
        </button>
      ))}
      <div ref={chip} className="pointer-events-none absolute -ml-16 -mt-10 grid h-20 w-32 place-items-center border border-line bg-panel transition-opacity duration-200"
        style={{ opacity: label ? 1 : 0 }}>
        <span className="mono text-xs text-muted">{label}</span>
      </div>
    </div>
  );
};

/* ── S-014 Grain Overlay ───────────────────────────────── */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";
const GrainOverlay = () => (
  <div className="relative h-full w-full" style={{ background: "linear-gradient(120deg,#1a1a22,#0a0a0c)" }}>
    <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
    <Center><span className="serif-italic text-4xl text-text/80">texture</span></Center>
  </div>
);

/* ── S-015 Serif Accent ────────────────────────────────── */
const SerifAccent = () => (
  <Center className="flex-col gap-2 px-12 text-center">
    <p className="serif-italic text-5xl text-muted">obsessed</p>
    <p className="display text-5xl text-text">WITH THE SEAMS</p>
  </Center>
);

/* ── S-016 Corner Frame ────────────────────────────────── */
const CornerFrame = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-b]", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, repeat: -1, yoyo: true, repeatDelay: 0.6 });
    }, ref);
    return () => ctx.revert();
  }, []);
  const base = "absolute h-8 w-8 border-text/60";
  return (
    <div ref={ref} className="relative h-full w-full">
      <span data-b className={`${base} left-8 top-8 border-l border-t`} />
      <span data-b className={`${base} right-8 top-8 border-r border-t`} />
      <span data-b className={`${base} bottom-8 left-8 border-b border-l`} />
      <span data-b className={`${base} bottom-8 right-8 border-b border-r`} />
      <Center><span className="mono text-xs text-faint">FRAME</span></Center>
    </div>
  );
};

/* ── S-017 Scroll Progress ─────────────────────────────── */
const ScrollProgressDemo = () => {
  const [p, setP] = useState(0);
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 h-1 bg-accent transition-none" style={{ width: `${p * 100}%` }} />
      <div className="h-full overflow-y-auto px-12 py-8"
        onScroll={(e) => { const t = e.currentTarget; setP(t.scrollTop / (t.scrollHeight - t.clientHeight || 1)); }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i} className="border-b border-line py-4 text-muted">Line {i + 1}: scroll me.</p>
        ))}
      </div>
    </div>
  );
};

/* ── S-018 Mask Wipe ───────────────────────────────────── */
const MaskWipe = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-wipe]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut", repeat: -1, yoyo: true, repeatDelay: 0.5 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Center>
      <p ref={ref} className="relative display text-6xl">
        <span className="text-text/15">REVEAL</span>
        <span data-wipe className="absolute inset-0 text-accent">REVEAL</span>
      </p>
    </Center>
  );
};

/* ── S-019 Parallax Drift ──────────────────────────────── */
const ParallaxDrift = () => {
  const ref = useRef<HTMLDivElement>(null);
  const p = usePointer(ref);
  const layers = [
    { z: 40, t: "text-text/10 text-[30vh]", s: "A" },
    { z: 22, t: "text-text/25 text-[18vh]", s: "B" },
    { z: 10, t: "text-text text-[10vh]", s: "C" },
  ];
  return (
    <div ref={ref} className="relative grid h-full w-full place-items-center">
      {layers.map((l) => (
        <span key={l.s} className={`display absolute leading-none ${l.t}`}
          style={{ transform: `translate(${(p.x - 0.5) * l.z}px, ${(p.y - 0.5) * l.z}px)`, transition: "transform 0.2s ease-out" }}>
          {l.s}
        </span>
      ))}
      <span className="mono absolute bottom-4 text-[11px] text-faint">move for depth</span>
    </div>
  );
};

/* ── S-020 Live Clock ──────────────────────────────────── */
const LiveClock = () => {
  const [t, setT] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT([d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":"));
    };
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => { cancelAnimationFrame(raf); clearInterval(id); };
  }, []);
  return <Center><span className="mono text-6xl text-text sm:text-8xl">{t}</span></Center>;
};

/* ── S-021 Kinetic Type ────────────────────────────────── */
const KineticType = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-k]", { y: -14, duration: 0.9, ease: "sine.inOut", stagger: { each: 0.08, repeat: -1, yoyo: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Center>
      <p ref={ref} className="display flex text-6xl text-text sm:text-7xl">
        {"KINETIC".split("").map((c, i) => <span key={i} data-k className="inline-block">{c}</span>)}
      </p>
    </Center>
  );
};

/* ── S-022 Elastic Halo ────────────────────────────────── */
const ElasticHalo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current!;
    const xTo = gsap.quickTo(halo.current, "x", { duration: 0.9, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(halo.current, "y", { duration: 0.9, ease: "elastic.out(1,0.4)" });
    const move = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      xTo(e.clientX - r.left); yTo(e.clientY - r.top);
    };
    node.addEventListener("mousemove", move);
    return () => node.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} className="relative h-full w-full">
      <div ref={halo} className="pointer-events-none absolute -ml-12 -mt-12 h-24 w-24 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, rgba(201,210,255,0.5), transparent 70%)" }} />
      <Center><span className="mono text-[11px] text-faint">move, and the halo overshoots</span></Center>
    </div>
  );
};

/* ── S-024 Sticky Header ───────────────────────────────── */
const StickyHeader = () => (
  <div className="h-full w-full overflow-y-auto">
    {["ALPHA", "BETA", "GAMMA"].map((g) => (
      <section key={g}>
        <h4 className="mono sticky top-0 bg-panel/90 px-8 py-3 text-xs text-accent backdrop-blur">{g}</h4>
        {Array.from({ length: 4 }).map((_, i) => (
          <p key={i} className="border-b border-line px-8 py-4 text-muted">{g.toLowerCase()} item {i + 1}</p>
        ))}
      </section>
    ))}
  </div>
);

/* ── S-025 ASCII Rain ──────────────────────────────────── */
const AsciiRain = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, cols = 0;
    let drops: number[] = [];
    const glyphs = "01<>[]{}/\\*+=".split("");
    const size = 16;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / size);
      drops = Array(cols).fill(0).map(() => Math.random() * -20);
    };
    resize();
    let raf = 0, acc = 0, prev = 0;
    const draw = (t: number) => {
      const dt = t - prev; prev = t; acc += dt;
      if (acc > 55) {
        acc = 0;
        ctx.fillStyle = "rgba(10,10,12,0.2)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${size}px monospace`;
        for (let i = 0; i < cols; i++) {
          const c = glyphs[Math.floor(Math.random() * glyphs.length)];
          ctx.fillStyle = drops[i] * size > h - size ? "rgba(201,210,255,0.9)" : "rgba(180,185,200,0.35)";
          ctx.fillText(c, i * size, drops[i] * size);
          if (drops[i] * size > h && Math.random() > 0.97) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw(0);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="h-full w-full" />;
};

/* ── S-026 Weighted Dock ───────────────────────────────── */
const WeightedDock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const icons = ["◐", "◑", "◒", "◓", "◔", "◕", "●"];
  useEffect(() => {
    const node = ref.current!;
    const kids = () => Array.from(node.children) as HTMLElement[];
    const move = (e: MouseEvent) => {
      kids().forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        el.style.transform = `scale(${gsap.utils.clamp(1, 2, 2 - d / 90)})`;
      });
    };
    const leave = () => kids().forEach((el) => (el.style.transform = "scale(1)"));
    node.addEventListener("mousemove", move);
    node.addEventListener("mouseleave", leave);
    return () => {
      node.removeEventListener("mousemove", move);
      node.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <Center>
      <div ref={ref} className="flex items-end gap-3">
        {icons.map((ic, i) => (
          <span
            key={i}
            className="grid h-12 w-12 origin-bottom place-items-center rounded-full border border-line bg-panel text-text transition-transform duration-150"
          >
            {ic}
          </span>
        ))}
      </div>
    </Center>
  );
};

/* ── S-027 Liquid Edge ─────────────────────────────────── */
const LiquidEdge = () => (
  <Center>
    <button className="relative overflow-hidden rounded-full px-12 py-5">
      <span className="mono relative z-10 text-sm text-bg">HOVER ME</span>
      <span className="liquid absolute inset-0" />
    </button>
  </Center>
);

/* ── S-028 Stagger Grid ────────────────────────────────── */
const StaggerGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-cell]",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", repeat: -1, yoyo: true, repeatDelay: 0.6,
          stagger: { each: 0.05, grid: [5, 5], from: "center" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Center>
      <div ref={ref} className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} data-cell className="h-10 w-10 bg-text/80" />
        ))}
      </div>
    </Center>
  );
};

export const STUDY_DEMOS: Record<string, Demo> = {
  "S-001": SplitRise,
  "S-002": SmokeField,
  "S-003": VelocitySkewDemo,
  "S-004": RingCursorDemo,
  "S-005": TimePalette,
  "S-006": GhostNumerals,
  "S-007": MarqueeDemo,
  "S-008": MagneticDemo,
  "S-009": FilmstripDemo,
  "S-010": LineDraw,
  "S-011": CountLedger,
  "S-012": CurtainIntro,
  "S-013": HoverPreview,
  "S-014": GrainOverlay,
  "S-015": SerifAccent,
  "S-016": CornerFrame,
  "S-017": ScrollProgressDemo,
  "S-018": MaskWipe,
  "S-019": ParallaxDrift,
  "S-020": LiveClock,
  "S-021": KineticType,
  "S-022": ElasticHalo,
  "S-023": NoiseFlow,
  "S-024": StickyHeader,
  "S-025": AsciiRain,
  "S-026": WeightedDock,
  "S-027": LiquidEdge,
  "S-028": StaggerGrid,
};
