"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Study } from "@portfolio/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StudyRowProps {
  study: Study;
  onOpen?: () => void;
}

/** One line of the studies ledger: id, title + note, technique, arrow. */
const StudyRow = ({ study, onOpen }: StudyRowProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <button
      ref={ref}
      data-hover
      onClick={onOpen}
      className="group grid w-full grid-cols-[3.5rem_1fr] items-baseline gap-x-4 border-b border-line py-6 text-left transition-colors sm:grid-cols-[4rem_1fr_8rem_2rem]"
    >
      <span className="mono text-xs text-faint">{study.id}</span>
      <div>
        <h3 className="text-xl text-text transition-colors group-hover:text-accent sm:text-2xl">
          {study.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{study.note}</p>
      </div>
      <span className="mono hidden text-right text-[11px] text-faint sm:block">
        {study.technique.toUpperCase()}
      </span>
      <span className="mono hidden text-right text-muted transition-transform group-hover:translate-x-1 sm:block">
        →
      </span>
    </button>
  );
};

export default StudyRow;
