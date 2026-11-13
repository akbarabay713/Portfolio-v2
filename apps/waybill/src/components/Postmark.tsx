"use client";

import { useEffect, useId, useRef } from "react";

/**
 * A round rubber-stamp postmark: "LIVE" in the middle, the date the site was
 * last checked around the ring. It is visible by default; once the observer is
 * running it hides until it scrolls into view, then stamps down once.
 */
export default function Postmark({ checked }: { checked: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.stamped = "";
        io.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    el.dataset.waiting = "";
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ring = `LIVE · CHECKED ${checked} · `;

  return (
    <svg
      ref={ref}
      className="postmark"
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Live, checked ${checked}`}
    >
      <defs>
        <path id={`ring-${id}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        {/* Uneven ink, so it reads as stamped rather than drawn. */}
        <filter id={`ink-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.25" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#ink-${id})`}>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text className="postmark-ring">
          <textPath href={`#ring-${id}`} textLength="272" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
        <text className="postmark-core" x="60" y="66" textAnchor="middle">
          LIVE
        </text>
      </g>
    </svg>
  );
}
