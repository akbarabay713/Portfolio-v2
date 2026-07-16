"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Study } from "@portfolio/content";

import { useFocusTrap } from "@/lib/useFocusTrap";
import DemoBoundary from "./DemoBoundary";
import { STUDY_DEMOS } from "./demos";

gsap.registerPlugin(useGSAP);

interface StudyModalProps {
  study: Study | null;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

const Placeholder = () => (
  <div className="mono flex h-full w-full items-center justify-center text-xs text-faint">
    demo coming soon
  </div>
);

const pad = (n: number) => String(n).padStart(2, "0");

/** Full-screen overlay hosting a single live study demo, with prev/next. */
const StudyModal = ({ study, index, total, onPrev, onNext, onClose }: StudyModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  useFocusTrap(ref, !!study);

  // Scroll-lock + keyboard (ESC to close, arrows to navigate) while open.
  useEffect(() => {
    if (!study) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [study, onClose, onNext, onPrev]);

  // Fade the overlay in once per open.
  useGSAP(
    () => {
      if (!study) return;
      gsap.from(ref.current, { autoAlpha: 0, duration: 0.25 });
      gsap.from(panelRef.current, { y: 24, autoAlpha: 0, duration: 0.4, ease: "power3.out" });
      closeRef.current?.focus();
    },
    { scope: ref },
  );

  // Transition just the demo stage when navigating between studies.
  useGSAP(
    () => {
      if (!study) return;
      gsap.fromTo(
        stageRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    },
    { dependencies: [study?.id], scope: ref },
  );

  if (!study) return null;

  const Demo = STUDY_DEMOS[study.id] ?? Placeholder;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${study.id} — ${study.title}`}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col border border-line bg-panel"
      >
        <div className="flex items-start justify-between border-b border-line px-6 py-4">
          <div>
            <p className="mono text-[11px] text-faint">
              {study.id} · {study.technique.toUpperCase()} · {study.year}
            </p>
            <h3 className="display mt-1 text-2xl text-text sm:text-3xl">{study.title}</h3>
          </div>
          <div className="mono flex shrink-0 items-center gap-4 text-xs">
            <button
              onClick={copyLink}
              className={`transition-colors ${copied ? "text-accent" : "text-faint hover:text-text"}`}
            >
              {copied ? "COPIED ✓" : "COPY LINK"}
            </button>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="text-faint transition-colors hover:text-text"
            >
              CLOSE ✕
            </button>
          </div>
        </div>

        {/* key swaps the demo cleanly on navigate; ref animates the swap */}
        <div
          key={study.id}
          ref={stageRef}
          className="relative h-[52vh] max-h-[460px] min-h-[300px] w-full overflow-hidden bg-bg"
        >
          <DemoBoundary>
            <Demo />
          </DemoBoundary>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-4">
          <p className="hidden text-sm text-muted sm:block">{study.note}</p>
          <div className="mono flex shrink-0 items-center gap-4 text-[11px] text-faint">
            <button onClick={onPrev} aria-label="Previous study" className="transition-colors hover:text-text">
              ← PREV
            </button>
            <span className="text-text">
              {pad(index)} / {pad(total)}
            </span>
            <button onClick={onNext} aria-label="Next study" className="transition-colors hover:text-text">
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyModal;
