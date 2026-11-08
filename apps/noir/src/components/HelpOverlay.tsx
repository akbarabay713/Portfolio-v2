"use client";

import { useEffect, useRef } from "react";

import { useFocusTrap } from "@/lib/useFocusTrap";

const ITEMS = [
  { k: "Navigation", v: "Jump between sections from the menu or scroll, or press J / K to step forward and back." },
  { k: "Studies", v: "Click any study for a live demo. ← → to move, Esc to close, and every study has a shareable link." },
  { k: "Theme", v: "The palette shifts through the day (dawn, day, dusk, night), matched to your local time." },
  { k: "Privacy", v: "No trackers, no cookies, no analytics." },
];

/** Small "(?) HELP" overlay explaining how the site behaves. */
const HelpOverlay = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useFocusTrap(ref, open);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Help"
      onClick={onClose}
      className="animate-fade fixed inset-0 z-[75] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-rise w-full max-w-lg border border-line bg-panel"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="display text-2xl text-text">( HELP )</h3>
          <button onClick={onClose} className="mono text-xs text-faint transition-colors hover:text-text">
            CLOSE ✕
          </button>
        </div>
        <dl className="divide-y divide-line">
          {ITEMS.map((item, i) => (
            <div key={item.k} className="flex gap-6 px-6 py-5">
              <dt className="mono w-24 shrink-0 text-[11px] text-faint">
                {String(i + 1).padStart(2, "0")} {item.k.toUpperCase()}
              </dt>
              <dd className="text-sm leading-relaxed text-muted">{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default HelpOverlay;
