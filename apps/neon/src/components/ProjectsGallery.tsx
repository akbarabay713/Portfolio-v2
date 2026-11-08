"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@portfolio/content";

import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectsGalleryProps {
  projects: Project[];
}

/**
 * desktop: section pins and panels scrub horizontally on scroll.
 * touch/small screens and reduced motion: plain vertical stack.
 */
const ProjectsGallery = ({ projects }: ProjectsGalleryProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = sectionRef.current;
          const track = trackRef.current;
          if (!section || !track) return;

          // Distance to bring the last panel's right edge to the viewport's.
          const shift = () =>
            Math.max(
              0,
              track.scrollWidth +
                section.getBoundingClientRect().left -
                window.innerWidth +
                48,
            );

          gsap.to(track, {
            x: () => -shift(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${shift()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <Reveal className="mb-12 flex items-center gap-3">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Selected Projects
        </span>
      </Reveal>

      <div
        ref={trackRef}
        className="flex flex-col gap-24 will-change-transform lg:w-max lg:flex-row lg:items-start lg:gap-[6vw]"
      >
        {projects.map((project, index) => (
          <article key={project.title} className="lg:w-[42vw] lg:shrink-0">
            <a
              href={project.live ?? project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              data-cursor="view"
              className="group block"
            >
              <div
                data-skew
                className="relative aspect-video overflow-hidden bg-surface will-change-transform"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
              </div>
            </a>
            <div className="mt-6 flex items-baseline gap-4">
              <p className="font-display text-lg text-faint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-3xl text-content sm:text-4xl">
                {project.title}
              </h3>
            </div>
            <p className="mt-4 max-w-xl leading-relaxed text-muted lg:line-clamp-3">
              {project.description}
            </p>
            <p className="mt-4 text-sm uppercase tracking-wider text-faint lg:line-clamp-1">
              {project.tech.join(" · ")}
            </p>
            <div className="mt-3 flex items-center gap-6">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent transition-colors hover:text-accent-strong"
                >
                  Live site <ArrowUpRight size={16} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-muted transition-colors hover:text-content"
                >
                  Code <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGallery;
