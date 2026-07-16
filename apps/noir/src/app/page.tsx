import {
  bio,
  featuredProjects,
  profile,
  siteConfig,
  studies,
  techStack,
} from "@portfolio/content";

import SmokeShader from "@/components/SmokeShader";
import MicToggle from "@/components/MicToggle";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import ArchiveSection from "@/components/archive/ArchiveSection";
import StudiesSection from "@/components/studies/StudiesSection";
import SplitHeading from "@/components/gsap/SplitHeading";
import VelocitySkew from "@/components/gsap/VelocitySkew";

const META = [
  { k: "Based", v: profile.based },
  { k: "Role", v: profile.role },
  { k: "Since", v: profile.since },
  { k: "Focus", v: profile.focus },
  { k: "Stack", v: profile.stack },
  { k: "Status", v: profile.status },
];

const TECH_COLUMNS = [
  { head: "Craft", items: ["Motion / GSAP", "Canvas 2D", "Type systems", "Micro-interaction", "SVG"] },
  { head: "Frontend", items: ["React 19", "Next.js 16", "TypeScript", "Tailwind v4", "Vue / Nuxt"] },
  { head: "Backend", items: ["Node / Bun", "Laravel / PHP", "MySQL", "MongoDB", "WordPress"] },
];

export default function Home() {
  const email = siteConfig.email;

  return (
    <main className="relative">
      <VelocitySkew />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pb-16 pt-28 sm:px-8"
      >
        <SmokeShader />
        <span className="mono absolute right-5 top-28 text-right text-[11px] text-faint sm:right-8">
          CURRENT
          <br />
          (HOME)
        </span>

        <div className="relative">
          <h1 className="display text-[15vw] leading-[0.9] sm:text-[12vw]">
            <SplitHeading text="I build for" className="block" />
            <SplitHeading text="the web." delay={0.1} className="block" />
          </h1>

          <div className="mt-10 max-w-md">
            <p className="display mb-4 text-base tracking-normal">
              I kinda hate and love it
            </p>
            <p className="leading-relaxed text-muted">
              Backend built my foundation. The web became the craft. Started with
              PHP and dashboards — now I care about the easing of a hover, the
              weight of a line, the silence between sections.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <p className="mono flex items-center gap-2 text-xs text-faint">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                AVAILABLE FOR WORK
              </p>
              <MicToggle />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section id="about" className="px-5 py-28 sm:px-8">
        <SectionHeader title="About" kicker="Index" index={2} meta="Design & code" />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <p className="serif-italic mb-6 text-3xl text-muted sm:text-4xl">
                obsessed with the seams
              </p>
            </Reveal>
            <h2 className="display text-4xl sm:text-6xl">
              <SplitHeading scroll text="Between" className="block" />
              <SplitHeading scroll delay={0.08} text="design & code." className="block" />
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {bio.paragraphs.slice(0, 2).map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="leading-relaxed text-muted">
                Outside of client work I keep an ongoing archive of studies —
                small, numbered experiments that chase a single idea to its end.
              </p>
            </Reveal>

            {/* Spec-sheet meta grid */}
            <div className="mt-4 grid grid-cols-2 border border-line sm:grid-cols-3">
              {META.map((m, i) => (
                <div key={m.k} className="border-b border-r border-line p-4 last:border-r-0">
                  <p className="mono mb-2 flex items-center justify-between text-[10px] text-faint">
                    {m.k.toUpperCase()}
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </p>
                  <p className="mono text-sm text-text">{m.v.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Technology ───────────────────────────────────── */}
      <section id="tech" className="px-5 py-28 sm:px-8">
        <SectionHeader title="Technology" kicker="Tech" index={3} meta={`${techStack.length} groups`} />
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {TECH_COLUMNS.map((col) => (
            <div key={col.head} className="bg-bg p-6">
              <p className="mono mb-6 text-[11px] text-faint">{col.head.toUpperCase()}</p>
              <ul>
                {col.items.map((item) => (
                  <li
                    key={item}
                    data-hover
                    className="group flex items-center justify-between border-b border-line-soft py-4 text-lg text-text transition-colors last:border-b-0 hover:text-accent"
                  >
                    {item}
                    <span className="text-faint transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Archive ──────────────────────────────────────── */}
      <section id="archive" className="px-5 py-28 sm:px-8">
        <SectionHeader
          title="Selected Archive"
          kicker="Archive"
          index={4}
          meta={`${featuredProjects.length} projects · click to open`}
        />
        <ArchiveSection projects={featuredProjects} />
      </section>

      {/* ── Studies ──────────────────────────────────────── */}
      <section id="studies" className="px-5 py-28 sm:px-8">
        <SectionHeader
          title="Studies"
          kicker="Studies"
          index={5}
          meta={`${studies.length} experiments · click to open`}
        />
        <StudiesSection studies={studies} />
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="px-5 py-28 sm:px-8">
        <SectionHeader title="Contact" kicker="Contact" index={6} meta="Say hello" />
        <Reveal>
          <a
            href={`mailto:${email}`}
            data-hover
            className="display block break-words text-[11vw] leading-none text-text transition-colors hover:text-accent"
          >
            {email}
          </a>
        </Reveal>
        <div className="mono mt-16 flex flex-col justify-between gap-6 border-t border-line pt-8 text-xs text-faint sm:flex-row">
          <span>© {siteConfig.name.toUpperCase()} — CODED IN THE OPEN</span>
          <div className="flex gap-8">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-text">
              GITHUB ↗
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-text">
              LINKEDIN ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
