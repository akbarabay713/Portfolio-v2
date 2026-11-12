"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  bio,
  designs,
  experiences,
  projects,
  settings,
  siteConfig,
  stats,
  techStack,
} from "@portfolio/content";

import Reveal from "@/components/Reveal";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import SplitHeading from "@/components/gsap/SplitHeading";
import Marquee from "@/components/gsap/Marquee";
import Magnetic from "@/components/gsap/Magnetic";
import VelocitySkew from "@/components/gsap/VelocitySkew";
import { scrollToAnchor } from "@/components/gsap/SmoothScroll";
import { introDelay } from "@/components/gsap/Preloader";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Reveal className="mb-12 flex items-center gap-3">
    <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
      {children}
    </span>
  </Reveal>
);

export default function Home() {
  // Waits for the preloader curtain on first visit; zero once seen this session.
  const INTRO = introDelay();

  return (
    <main className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
      <VelocitySkew />
      <section id="home" className="relative flex min-h-screen flex-col justify-center py-24">
        <div>
          <h1 className="font-display leading-[0.95]">
            <SplitHeading
              text="Fullstack"
              delay={INTRO}
              className="block text-6xl text-accent sm:text-8xl lg:text-9xl"
            />
            <SplitHeading
              text="Developer"
              delay={INTRO + 0.12}
              className="block pl-4 text-6xl text-muted sm:pl-10 sm:text-8xl lg:text-9xl"
            />
          </h1>

          <p className="mt-10 max-w-lg leading-relaxed text-muted">
            Hi! I&apos;m <span className="font-semibold text-content">{siteConfig.name}</span>.
            A fullstack developer. I build web apps end to end, from the
            database up to the interface, with React, Next.js, and PHP.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: INTRO + 0.35 }}
            className="mt-10"
          >
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor("#contact");
                }}
                className="font-display inline-block bg-accent px-9 py-4 text-lg tracking-wider text-accent-contrast"
              >
                Let&apos;s Talk
              </a>
            </Magnetic>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Available for opportunities
            </p>
          </motion.div>
        </div>

        {settings.sections.stats && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: INTRO + 0.5 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted"
          >
            {stats.map((stat) => (
              <li key={stat.label}>
                <span className="font-semibold text-content">{stat.value}</span> {stat.label}
              </li>
            ))}
          </motion.ul>
        )}
      </section>
      <Marquee
        items={[
          "Fullstack Developer",
          "React",
          "Next.js",
          "TypeScript",
          "Vue",
          "Laravel",
          "WordPress",
        ]}
      />

      <section id="about" className="py-28">
        <SectionLabel>About Me</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SplitHeading
            as="h2"
            scroll
            text="Who I Am"
            className="font-display text-5xl text-ghost sm:text-6xl"
          />
          <div className="flex max-w-2xl flex-col gap-5">
            {bio.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="text-lg leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <a
                href={bio.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-strong"
              >
                Download résumé <ArrowUpRight size={18} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
      <section id="skills" className="py-28">
        <SectionLabel>My Skills</SectionLabel>
        <div className="flex flex-col gap-20">
          {techStack.map((category) => (
            <div key={category.label} className="grid gap-8 lg:grid-cols-[1fr_2fr]">
              <SplitHeading
                as="h2"
                scroll
                text={category.label}
                className="font-display text-5xl text-ghost sm:text-6xl"
              />
              <div className="flex flex-wrap content-start items-start gap-x-8 gap-y-4">
                {category.items.map((item, i) => (
                  <Reveal key={item} delay={0.03 * i}>
                    <span className="text-lg font-medium text-muted transition-colors hover:text-accent">
                      {item}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {settings.sections.experience && (
        <section id="experience" className="py-28">
          <SectionLabel>My Experience</SectionLabel>
          <ExperienceSection experiences={experiences} />
        </section>
      )}
      <ProjectsGallery projects={projects} />
      <section id="contact" className="flex flex-col justify-center py-40">
        <SectionLabel>Get in Touch</SectionLabel>
        <h2 className="font-display text-5xl leading-none text-content sm:text-7xl lg:text-8xl">
          <SplitHeading scroll text="Let's work" />{" "}
          <SplitHeading scroll delay={0.2} text="together" className="text-accent" />
        </h2>
        <Reveal delay={0.15}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-10 inline-flex min-h-11 items-center text-xl font-semibold text-muted transition-colors hover:text-accent sm:text-2xl"
          >
            {siteConfig.email}
          </a>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8 text-sm">
            <p className="mr-auto text-faint">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            {settings.sections.designSwitcher && (
              <div className="flex items-center gap-4">
                <span className="text-faint">Design</span>
                {designs.map((d) =>
                  d.id === "neon" ? (
                    <span key={d.id} className="font-semibold text-accent">
                      {d.label}
                    </span>
                  ) : (
                    <a
                      key={d.id}
                      href={d.url}
                      className="inline-flex min-h-11 min-w-11 items-center text-muted transition-colors hover:text-content"
                    >
                      {d.label}
                    </a>
                  ),
                )}
              </div>
            )}
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
