import {
  bio,
  designs,
  experiences,
  profile,
  projects,
  settings,
  siteConfig,
  studies,
  techStack,
} from "@portfolio/content";

import FlowField from "@/components/FlowField";
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
        <FlowField />
        <span className="mono absolute right-5 top-28 text-right text-[11px] text-faint sm:right-8">
          FULLSTACK
          <br />
          SINCE {profile.since}
        </span>

        <div className="relative">
          <h1 className="display text-[15vw] leading-[0.9] sm:text-[12vw]">
            <SplitHeading text="From database" className="block" />
            <SplitHeading text="to pixels." delay={0.1} className="block" />
          </h1>

          <div className="mt-10 max-w-md">
            <p className="display mb-4 text-base tracking-normal">
              Front to back, end to end
            </p>
            <p className="leading-relaxed text-muted">
              I&apos;m Akbar, a fullstack developer. I started in PHP building
              dashboards and logistics systems, then moved toward the front of
              the stack with React and Next.js. I like owning a feature end to
              end: the database, the API, and the interface on top.
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
        <SectionHeader title="About" kicker="Index" index={2} meta="Who I am" />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <p className="serif-italic mb-6 text-3xl text-muted sm:text-4xl">
                pragmatic, curious,
              </p>
            </Reveal>
            <h2 className="display text-4xl sm:text-6xl">
              <SplitHeading scroll text="Backend brain," className="block" />
              <SplitHeading scroll delay={0.08} text="frontend hands." className="block" />
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
                On the side I keep a running set of studies: small, numbered
                front-end experiments I build to learn a technique properly
                instead of just reading about it.
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
                    className="border-b border-line-soft py-4 text-lg text-text last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────── */}
      <section id="experience" className="px-5 py-28 sm:px-8">
        <SectionHeader
          title="Experience"
          kicker="Work"
          index={4}
          meta={`${experiences.length} roles`}
        />
        <div className="border-t border-line">
          {experiences.map((exp) => (
            <Reveal key={`${exp.subtitle}-${exp.date}`}>
              <div className="grid gap-3 border-b border-line py-10 lg:grid-cols-[11rem_1fr] lg:gap-8">
                <p className="mono text-[11px] uppercase tracking-wider text-faint">
                  {exp.date}
                </p>
                <div>
                  <h3 className="display text-2xl text-text sm:text-3xl">
                    {exp.title}
                    <span className="text-accent"> @ {exp.subtitle}</span>
                  </h3>
                  <ul className="mt-4 flex max-w-2xl flex-col gap-2">
                    {exp.description.map((line, j) => (
                      <li key={j} className="text-sm leading-relaxed text-muted">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Archive ──────────────────────────────────────── */}
      <section id="archive" className="px-5 py-28 sm:px-8">
        <SectionHeader
          title="Selected Archive"
          kicker="Archive"
          index={5}
          meta={`${projects.length} projects · click to open`}
        />
        <ArchiveSection projects={projects} />
      </section>

      {/* ── Studies ──────────────────────────────────────── */}
      <section id="studies" className="px-5 py-28 sm:px-8">
        <SectionHeader
          title="Studies"
          kicker="Studies"
          index={6}
          meta={`${studies.length} experiments · click to open`}
        />
        <StudiesSection studies={studies} />
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="px-5 py-28 sm:px-8">
        <SectionHeader title="Contact" kicker="Contact" index={7} meta="Say hello" />
        <Reveal>
          <a
            href={`mailto:${email}`}
            data-hover
            className="display block break-words text-[11vw] leading-none text-text transition-colors hover:text-accent"
          >
            {email.split("@")[0]}
            <wbr />@{email.split("@")[1]}
          </a>
        </Reveal>
        {/* Design switcher: jump to the other two portfolio builds. */}
        {settings.sections.designSwitcher && (
          <Reveal delay={0.1}>
            <div className="mt-20 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8">
              <span className="mono text-[11px] uppercase tracking-widest text-faint">
                Try another design →
              </span>
              {designs.map((d) =>
                d.id === "noir" ? (
                  <span
                    key={d.id}
                    className="mono inline-flex min-h-11 items-center border border-text px-5 py-2.5 text-xs text-text"
                  >
                    {d.label.toUpperCase()} ·
                  </span>
                ) : (
                  <a
                    key={d.id}
                    href={d.url}
                    className="mono inline-flex min-h-11 items-center border border-line px-5 py-2.5 text-xs text-muted transition-colors hover:bg-text hover:text-bg"
                  >
                    {d.label.toUpperCase()} ↗
                  </a>
                ),
              )}
            </div>
          </Reveal>
        )}

        <div className="mono mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-xs text-faint">
          <span>© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}</span>
          <div className="flex gap-8">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-text">
              GITHUB ↗
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-text">
              LINKEDIN ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
