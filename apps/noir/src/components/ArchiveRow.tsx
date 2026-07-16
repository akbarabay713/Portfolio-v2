"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@portfolio/content";

gsap.registerPlugin(useGSAP);

interface ArchiveRowProps {
  project: Project;
  index: number;
  onOpen?: () => void;
}

/**
 * A full-width archive line: big title, tags, year. Opens a project detail
 * modal; on fine pointers a preview thumbnail follows the cursor on hover.
 */
const ArchiveRow = ({ project, index, onOpen }: ArchiveRowProps) => {
  const rowRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const preview = previewRef.current;
      if (!preview) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
      const show = () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
      const hide = () => gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.3 });
      const move = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const row = rowRef.current;
      row?.addEventListener("mouseenter", show);
      row?.addEventListener("mouseleave", hide);
      row?.addEventListener("mousemove", move);
      return () => {
        row?.removeEventListener("mouseenter", show);
        row?.removeEventListener("mouseleave", hide);
        row?.removeEventListener("mousemove", move);
      };
    },
    { scope: rowRef },
  );

  return (
    <button
      ref={rowRef}
      onClick={onOpen}
      className="group grid w-full grid-cols-[auto_1fr] items-center gap-x-6 gap-y-1 border-b border-line py-8 text-left sm:grid-cols-[3rem_1fr_auto_auto]"
    >
      <span className="mono text-xs text-faint">{String(index).padStart(2, "0")}</span>
      <h3
        data-skew
        className="display text-4xl transition-colors will-change-transform group-hover:text-accent sm:text-6xl"
      >
        {project.title}
      </h3>
      <span className="mono col-start-2 text-[11px] text-faint sm:col-start-3 sm:text-right">
        {project.tech.slice(0, 3).join(" · ").toUpperCase()}
      </span>
      <span className="mono col-start-2 hidden text-[11px] text-muted sm:col-start-4 sm:block sm:pl-10">
        ↗
      </span>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-video w-64 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-line opacity-0 [@media(pointer:fine)]:block"
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="256px"
          className="object-cover"
        />
      </div>
    </button>
  );
};

export default ArchiveRow;
