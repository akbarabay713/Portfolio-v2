import Image, { getImageProps } from "next/image";
import {
  bio,
  experiences,
  profile,
  projects,
  settings,
  siteConfig,
  techStack,
} from "@portfolio/content";

import Manifest, { type ManifestRow } from "@/components/Manifest";
import CopyEmail from "@/components/CopyEmail";
import FilterLink from "@/components/FilterLink";
import Greeting from "@/components/Greeting";
import Sticker from "@/components/Sticker";
import HandNote from "@/components/HandNote";
import { LocalClock, TimeOffset } from "@/components/LocalTime";
import Postmark from "@/components/Postmark";
import StackFilter from "@/components/StackFilter";
import XRayToggle from "@/components/XRayToggle";
import { filterCss, stackChips, techAttr } from "@/lib/stack";
import PrintButton from "@/components/PrintButton";
import TiltLabel from "@/components/TiltLabel";
import { checkLive, displayHost } from "@/lib/live";
import { shortDate, shortStack } from "@/lib/format";

/** Regenerate daily so the live stamps stay current. */
export const revalidate = 86400;

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
const chips = stackChips(projects);
const countOf = (s: string) => chips.find((c) => c.slug === s)?.count ?? 0;

/** What a client can hire for, each tied to the projects that prove it. */
const services = [
  {
    name: "Custom web apps",
    what: "Built around how your business works: dashboards, internal tools and customer-facing apps in Laravel, Vue or React, from the database and API to the screens people use every day.",
    stack: "typescript",
    note: "Most client apps are under NDA, so they aren’t listed. I can walk you through them in a call.",
  },
  {
    name: "Marketing websites",
    what: "Built from your Figma designs in WordPress or Next.js, responsive on every screen and set up for search from the start.",
    stack: "elementor",
  },
  {
    name: "Online stores",
    what: "WooCommerce shops with products, checkout and memberships, made to be easy for your team to run.",
    stack: "woocommerce",
  },
].map((s) => ({ note: "", ...s, count: countOf(s.stack) }));

/** Frameworks from the shared stack list, in the order they appear there. */
const headlineStack = ["React", "Next.js", "Vue", "Laravel", "WordPress"].filter(
  (t) => techStack.some((c) => c.items.includes(t)),
);

export default async function Home() {
  const live = await checkLive(
    projects.flatMap((p) => (p.live ? [p.live] : [])),
  );
  const liveCount = [...live.values()].filter(Boolean).length;
  const isLive = (url?: string) => Boolean(url && live.get(url));
  // When the live check ran, in Yogyakarta time: "14 NOV 2026".
  const checked = new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    })
    .toUpperCase();

  const manifestRows: ManifestRow[] = others.map((project) => {
    const { props } = getImageProps({
      src: project.image,
      alt: "",
      width: 1920,
      height: 1200,
      sizes: "(max-width: 860px) 100vw, 1100px",
    });
    return {
      title: project.title,
      description: project.description,
      stack: shortStack(project.tech, 2),
      link:
        project.live && isLive(project.live)
          ? { kind: "live", href: project.live, label: displayHost(project.live) }
          : project.github
            ? { kind: "code", href: project.github }
            : project.live
              ? { kind: "down" }
              : { kind: "private" },
      preview: { src: props.src, srcSet: props.srcSet },
      tech: techAttr(project),
    };
  });

  return (
    <div className="wrap">
      <header className="bar" data-xray="header · flex">
        <a className="bar-name" href="#main">
          {bio.fullName.toUpperCase()}
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          {settings.sections.experience && <a href="#experience">Experience</a>}
          <a href="#contact">Contact</a>
          <XRayToggle />
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-label="Introduction" data-xray="Hero · grid 7fr 5fr">
          <div>
            <Greeting />
            {/* Each letter sits slightly off, like hand-set stamp type; hover lines them up. */}
            <h1 className="handset" aria-label={bio.fullName}>
              {bio.fullName.split(" ").map((word, w) => (
                <span key={word} className="word" aria-hidden="true">
                  {w > 0 && (
                    <>
                      {" "}
                      <br />
                    </>
                  )}
                  {[...word].map((ch, i) => {
                    const n = w * 7 + i;
                    return (
                      <span
                        key={i}
                        className="ch"
                        style={
                          {
                            "--r": `${(((n * 37) % 7) - 3) * 1.2}deg`,
                            "--y": `${(((n * 53) % 5) - 2) * 2}px`,
                          } as React.CSSProperties
                        }
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
            <p className="lede">
              Fullstack developer in {profile.based.split(" /")[0]}. I build web
              apps and client websites with Next.js, Laravel and WordPress.
            </p>
            <p className="lede-sub">
              Right now I build websites and custom web apps for European
              clients at MadeIndonesia. Before that I built shipping software
              at KiriminAja.
            </p>
            <p className="print-only print-contact">
              {siteConfig.email} · {siteConfig.url.replace(/^https?:\/\//, "")} ·{" "}
              {siteConfig.links.github.replace(/^https:\/\//, "")} ·{" "}
              {siteConfig.links.linkedin.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </p>
          </div>

          <TiltLabel>
            <HandNote
              className="note-me"
              text="that’s me"
              arrow="M8 18 C 40 6, 78 14, 104 52 M104 52 l-14 -4 M104 52 l2 -14"
            />
            <Sticker>
              {profile.status}
              <br />
              for work
            </Sticker>
            <div className="label-body">
              <div className="label-head">
                <span>{bio.fullName.toUpperCase()}</span>
                <LocalClock />
              </div>
              <div className="label-main" data-xray="next/image · 13 KB WebP">
                <Image
                  className="label-photo"
                  src="/images/akbar-abu.webp"
                  alt={bio.fullName}
                  width={400}
                  height={400}
                  sizes="112px"
                  priority
                />
                <dl>
                <div className="field">
                  <dt>FROM</dt>
                  <dd>
                    {profile.based.split(" /")[0]}, Indonesia
                    <TimeOffset />
                  </dd>
                </div>
                <div className="field">
                  <dt>ROLE</dt>
                  <dd>{profile.role}</dd>
                </div>
                <div className="field">
                  <dt>STACK</dt>
                  <dd>{headlineStack.join(", ")}</dd>
                </div>
                <div className="field">
                  <dt>SINCE</dt>
                  <dd>{profile.since}</dd>
                </div>
                </dl>
              </div>
              <div className="actions">
                <a className="btn btn-solid" href={`mailto:${siteConfig.email}`}>
                  Email me
                </a>
                <a
                  className="btn btn-line"
                  href={bio.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Résumé
                </a>
              </div>
            </div>
          </TiltLabel>
        </section>

        <section className="sheet work" id="work" aria-labelledby="work-title">
          <style>{filterCss(chips)}</style>
          <div className="sheet-head">
            <div>
              <h2 id="work-title">Shipped work</h2>
              <p className="sheet-intro">
                Client sites and products I’ve built, most of them still live. Open a name in the
                list to see the site. Client apps under NDA aren’t listed.
              </p>
            </div>
            <span className="sheet-meta">
              {projects.length} projects · {liveCount} live today
            </span>
          </div>
          <StackFilter chips={chips} total={projects.length} />

          {featured.map((project, i) => (
            <article
              className="feature"
              key={project.title}
              data-tech={techAttr(project)}
              data-xray="Feature · container query"
            >
              <a
                className="shot"
                href={project.live ?? project.github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 100vw, 680px"
                  priority={i === 0}
                />
              </a>
              {isLive(project.live) && (
                <div className="postmark-slot" data-xray="Postmark · SVG ink filter" style={{ "--rot": `${[-14, -7, -19][i % 3]}deg` } as React.CSSProperties}>
                  <Postmark checked={checked} />
                </div>
              )}
              <div className="feature-data">
                <div className="feature-title">
                  <h3>{project.title}</h3>
                </div>
                <p>{project.description}</p>
                <dl className="kv">
                  <dt>STACK</dt>
                  <dd>{shortStack(project.tech, 4)}</dd>
                  {project.live && (
                    <>
                      <dt>LIVE</dt>
                      <dd>
                        {isLive(project.live) ? (
                          <a
                            className="live"
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {displayHost(project.live)}
                          </a>
                        ) : (
                          <span className="down">Not responding</span>
                        )}
                      </dd>
                    </>
                  )}
                  {project.github && (
                    <>
                      <dt>CODE</dt>
                      <dd>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.github.replace(/^https:\/\/github\.com\//, "")}
                        </a>
                      </dd>
                    </>
                  )}
                </dl>
              </div>
            </article>
          ))}

          {manifestRows.length > 0 && <Manifest rows={manifestRows} />}
        </section>

        <section className="sheet" id="services" aria-labelledby="services-title">
          <div className="sheet-head">
            <div>
              <h2 id="services-title">What I can build</h2>
              <p className="sheet-intro">If you need one of these, here’s what you get.</p>
            </div>
            <span className="sheet-meta">For teams and clients</span>
          </div>
          <ul className="services" data-xray="Services · links into the filter">
            {services.map((s) => (
              <li key={s.name} className="service">
                <h3>{s.name}</h3>
                <p>{s.what}</p>
                <FilterLink stack={s.stack}>
                  See {s.count} {s.note ? "public " : ""}
                  {s.count === 1 ? "project" : "projects"}
                </FilterLink>
                {s.note && <p className="service-note">{s.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        {settings.sections.experience && (
          <section
            className="sheet sheet-open"
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className="sheet-head">
              <div>
                <h2 id="experience-title">Experience</h2>
                <p className="sheet-intro">Where I’ve worked, newest first.</p>
              </div>
            </div>
            <ol className="log" data-xray="Timeline · scroll-driven CSS">
              {experiences.map((job) => (
                <li className="entry" key={`${job.subtitle}-${job.date}`}>
                  <div className="when">{shortDate(job.date)}</div>
                  <div className="track" aria-hidden="true" />
                  <div className="what">
                    <h3>
                      {job.title} <span className="org">{job.subtitle}</span>
                    </h3>
                    <ul>
                      {job.description.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="note" aria-labelledby="note-title" data-xray="Note · bio from content">
          <h2 id="note-title" className="note-head">
            A note from me
          </h2>
          {bio.paragraphs.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="signature" aria-label={`${bio.name}`}>
            {bio.name}
          </p>
        </section>
      </main>

      <footer className="contact" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" className="sr-only">
          Contact
        </h2>
        <div className="post" data-xray="Stamp · CSS mask perforations">
          <HandNote
            className="note-hi"
            text="say hi"
            arrow="M14 10 C 30 40, 60 60, 98 64 M98 64 l-12 -8 M98 64 l-13 7"
          />
          <div className="post-stamp">
            <span className="post-top">
              {profile.based.split(" /")[0].toUpperCase()}, INDONESIA
            </span>
            <span className="post-ask">Hiring, or need a site built? Email is fastest.</span>
            <a className="big" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email.split("@")[0]}
              <wbr />@{siteConfig.email.split("@")[1]}
            </a>
            <span className="post-actions">
              <a className="btn btn-solid" href={`mailto:${siteConfig.email}`}>
                Write to me
              </a>
              <CopyEmail email={siteConfig.email} />
            </span>
          </div>
          <svg className="cancel" viewBox="0 0 220 60" aria-hidden="true">
            {[10, 22, 34, 46].map((y) => (
              <path
                key={y}
                d={`M0 ${y} q 13.75 -7 27.5 0 t 27.5 0 t 27.5 0 t 27.5 0 t 27.5 0 t 27.5 0 t 27.5 0 t 27.5 0`}
              />
            ))}
          </svg>
        </div>
        <div className="links">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={bio.resumeUrl} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
          <PrintButton />
          <XRayToggle place="footer" />
        </div>
      </footer>
    </div>
  );
}
