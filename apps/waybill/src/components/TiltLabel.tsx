"use client";

import { useRef } from "react";

const MAX_TILT = 6;

/**
 * The hero label. With a mouse it tilts toward the cursor like a card held in
 * the hand; touch and reduced-motion users get the still label.
 */
export default function TiltLabel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (clientX - r.left) / r.width - 0.5;
      const y = (clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * MAX_TILT * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * MAX_TILT * 2).toFixed(2)}deg`);
      el.dataset.tilting = "";
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
    delete el.dataset.tilting;
  };

  return (
    <aside
      ref={ref}
      className="label"
      aria-label="Summary"
      data-xray="TiltLabel · pointer tilt"
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      {children}
    </aside>
  );
}
