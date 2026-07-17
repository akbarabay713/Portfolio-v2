"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@portfolio/content";

gsap.registerPlugin(useGSAP);

/**
 * A single thumbnail that follows the cursor and shows the hovered archive
 * project. One shared element (not one per row) so previews can't accumulate,
 * and it tracks the real cursor position so it never sticks at the top-left.
 */
const ArchivePreview = ({ project }: { project: Project | null }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  });

  useGSAP(
    () => {
      gsap.to(ref.current, {
        autoAlpha: project ? 1 : 0,
        scale: project ? 1 : 0.9,
        duration: 0.3,
        ease: "power3.out",
      });
    },
    { dependencies: [project?.title] },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-video w-64 overflow-hidden border border-line opacity-0 [@media(pointer:fine)]:block"
    >
      {project && (
        <Image src={project.image} alt="" fill sizes="256px" className="object-cover" />
      )}
    </div>
  );
};

export default ArchivePreview;
