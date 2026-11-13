"use client";

import { useEffect, useRef } from "react";

const KEY = "sticker-offset";

/**
 * The availability sticker. Drag it (mouse or finger) and it peels off and
 * sticks wherever you drop it; double-click puts it back. Its spot is kept
 * for the session.
 */
export default function Sticker({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const drag = useRef<{ x: number; y: number; dx: number; dy: number } | null>(null);
  const offset = useRef({ dx: 0, dy: 0 });

  const place = (dx: number, dy: number) => {
    offset.current = { dx, dy };
    ref.current?.style.setProperty("--dx", `${dx}px`);
    ref.current?.style.setProperty("--dy", `${dy}px`);
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
      if (saved && typeof saved.dx === "number") place(saved.dx, saved.dy);
    } catch {
      // Storage unavailable: start where it was printed.
    }
  }, []);

  const save = () => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(offset.current));
    } catch {}
  };

  return (
    <span
      ref={ref}
      className="sticker"
      title="Drag me. Double-click to put me back."
      onPointerDown={(e) => {
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { x: e.clientX, y: e.clientY, ...offset.current };
        e.currentTarget.dataset.dragging = "";
      }}
      onPointerMove={(e) => {
        e.stopPropagation();
        const d = drag.current;
        if (!d) return;
        place(d.dx + e.clientX - d.x, d.dy + e.clientY - d.y);
      }}
      onPointerUp={(e) => {
        drag.current = null;
        delete e.currentTarget.dataset.dragging;
        save();
      }}
      onPointerCancel={(e) => {
        drag.current = null;
        delete e.currentTarget.dataset.dragging;
      }}
      onDoubleClick={() => {
        place(0, 0);
        save();
      }}
    >
      {children}
    </span>
  );
}
