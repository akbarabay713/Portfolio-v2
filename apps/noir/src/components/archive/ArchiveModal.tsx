"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@portfolio/content";

import { useFocusTrap } from "@/lib/useFocusTrap";

gsap.registerPlugin(useGSAP);

interface ArchiveModalProps {
  project: Project | null;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Project detail overlay with prev/next, a shareable link, and external links. */
const ArchiveModal = ({ project, index, total, onPrev, onNext, onClose }: ArchiveModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  useFocusTrap(ref, !!project);

  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose, onNext, onPrev]);

  useGSAP(
    () => {
      if (!project) return;
      gsap.from(ref.current, { autoAlpha: 0, duration: 0.25 });
      gsap.from(panelRef.current, { y: 24, autoAlpha: 0, duration: 0.4, ease: "power3.out" });
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (!project) return;
      gsap.fromTo(
        bodyRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    },
    { dependencies: [project?.title], scope: ref },
  );

  if (!project) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto border border-line bg-panel"
      >
        <div className="flex items-start justify-between border-b border-line px-6 py-4">
          <div>
            <p className="mono text-[11px] text-faint">ARCHIVE · {pad(index)}</p>
            <h3 className="display mt-1 text-3xl text-text sm:text-4xl">{project.title}</h3>
          </div>
          <div className="mono flex shrink-0 items-center gap-4 text-xs">
            <button
              onClick={copyLink}
              className={`transition-colors ${copied ? "text-accent" : "text-faint hover:text-text"}`}
            >
              {copied ? "COPIED ✓" : "COPY LINK"}
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-faint transition-colors hover:text-text"
            >
              CLOSE ✕
            </button>
          </div>
        </div>

        <div ref={bodyRef}>
          <div className="group relative aspect-video w-full overflow-hidden border-b border-line bg-bg">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          </div>

          <div className="flex flex-col gap-6 px-6 py-6">
            <p className="max-w-2xl leading-relaxed text-muted">{project.description}</p>
            <p className="mono text-[11px] text-faint">
              {project.tech.join(" · ").toUpperCase()}
            </p>
            <div className="mono flex flex-wrap items-center gap-6 text-xs">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line px-5 py-3 text-text transition-colors hover:bg-text hover:text-bg"
                >
                  LIVE SITE ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-text"
                >
                  VIEW CODE ↗
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mono flex items-center justify-end gap-4 border-t border-line px-6 py-4 text-[11px] text-faint">
          <button onClick={onPrev} aria-label="Previous project" className="transition-colors hover:text-text">
            ← PREV
          </button>
          <span className="text-text">
            {pad(index)} / {pad(total)}
          </span>
          <button onClick={onNext} aria-label="Next project" className="transition-colors hover:text-text">
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;
