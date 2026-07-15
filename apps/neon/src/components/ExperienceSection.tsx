"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Experience } from "@portfolio/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ExperienceSectionProps {
  experiences: Experience[];
}

/**
 * Experience rows with GSAP choreography: each divider line draws itself in,
 * content slides up, and on fine pointers a floating company-logo badge
 * trails the cursor over the hovered row.
 */
const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>("[data-exp-row]").forEach((row) => {
        const line = row.querySelector("[data-exp-line]");
        const body = row.querySelector("[data-exp-body]");
        const st = { trigger: row, start: "top 82%", once: true } as const;

        if (line) {
          gsap.from(line, {
            scaleX: 0,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: st,
          });
        }
        if (body) {
          gsap.from(body, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: st,
          });
        }
      });
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const el = previewRef.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      const move = (e: MouseEvent) => {
        xTo(e.clientX + 24);
        yTo(e.clientY - 40);
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="flex flex-col">
      {experiences.map((exp) => (
        <div
          key={`${exp.subtitle}-${exp.date}`}
          data-exp-row
          onMouseEnter={() => setPreview(exp.image)}
          onMouseLeave={() => setPreview(null)}
          className="relative"
        >
          <div data-exp-line className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
          <div data-exp-body className="grid gap-4 py-12 lg:grid-cols-[1fr_2fr]">
            <p className="text-sm uppercase tracking-wider text-faint">{exp.date}</p>
            <div>
              <h3 className="font-display text-3xl text-content sm:text-4xl">
                {exp.title}
                <span className="text-accent"> @ {exp.subtitle}</span>
              </h3>
              <ul className="mt-6 flex max-w-2xl flex-col gap-3">
                {exp.description.map((line, i) => (
                  <li key={i} className="leading-relaxed text-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* Floating logo badge that follows the cursor over rows. */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-50 hidden overflow-hidden rounded-full bg-elevated p-2 transition-opacity duration-200 [@media(pointer:fine)]:block ${
          preview ? "opacity-100" : "opacity-0"
        }`}
      >
        {preview && (
          <Image
            src={preview}
            alt=""
            width={88}
            height={88}
            className="rounded-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
