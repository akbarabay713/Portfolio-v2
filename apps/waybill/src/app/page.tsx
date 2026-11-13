import Image from "next/image";
import {
  bio,
  experiences,
  profile,
  projects,
  settings,
  siteConfig,
  techStack,
} from "@portfolio/content";

import { checkLive, displayHost } from "@/lib/live";
import { shortDate, shortStack } from "@/lib/format";

/** Regenerate daily so the live stamps stay current. */
export const revalidate = 86400;

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

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

  return (
    <div className="wrap">
      <header className="bar">
        <a className="bar-name" href="#main">
          {bio.fullName.toUpperCase()}
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          {settings.sections.experience && <a href="#experience">Experience</a>}
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-label="Introduction">
          <div>
            <h1>
              {bio.fullName.split(" ").map((word, i) => (
                <span key={word}>
                  {i > 0 && <br />}
                  {word}
                </span>
              ))}
            </h1>
            <p className="lede">
              Fullstack developer in {profile.based.split(" /")[0]}. I build web
              apps and client websites with Next.js, Laravel and WordPress.
            </p>
            <p className="lede-sub">
              Right now I build landing pages for European clients at
              MadeIndonesia. Before that I built shipping software at
              KiriminAja.
            </p>
          </div>

          <aside className="label" aria-label="Summary">
            <div className="label-body">
              <div className="label-head">
                <span>{bio.fullName.toUpperCase()}</span>
                <span>REMOTE · UTC+7</span>
              </div>
              <dl>
                <div className="field">
                  <dt>FROM</dt>
                  <dd>{profile.based.split(" /")[0]}, Indonesia</dd>
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
                <div className="field">
                  <dt>STATUS</dt>
                  <dd className="status">{profile.status} for work</dd>
                </div>
              </dl>
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
          </aside>
        </section>

        <section className="sheet" id="work" aria-labelledby="work-title">
          <div className="sheet-head">
            <h2 id="work-title">Shipped work</h2>
            <span className="sheet-meta">
              {projects.length} projects · {liveCount} live today
            </span>
          </div>

          {featured.map((project, i) => (
            <article className="feature" key={project.title}>
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
              <div className="feature-data">
                <div className="feature-title">
                  <h3>{project.title}</h3>
                  {isLive(project.live) && <span className="stamp">LIVE</span>}
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
                          {project.github.replace(/^https:\/\//, "")}
                        </a>
                      </dd>
                    </>
                  )}
                </dl>
              </div>
            </article>
          ))}

          {others.length > 0 && (
            <table className="manifest">
              <thead>
                <tr>
                  <th scope="col">Client</th>
                  <th scope="col">What I built</th>
                  <th scope="col">Stack</th>
                  <th scope="col">Live site</th>
                </tr>
              </thead>
              <tbody>
                {others.map((project) => (
                  <tr key={project.title}>
                    <td className="client">{project.title}</td>
                    <td className="what">{project.description}</td>
                    <td className="stack">{shortStack(project.tech, 2)}</td>
                    <td className="url">
                      {project.live && isLive(project.live) ? (
                        <a
                          className="live"
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {displayHost(project.live)}
                        </a>
                      ) : project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Code
                        </a>
                      ) : project.live ? (
                        <span className="down">Not responding</span>
                      ) : (
                        <span className="down">Private</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {settings.sections.experience && (
          <section
            className="sheet"
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className="sheet-head">
              <h2 id="experience-title">Experience</h2>
              <span className="sheet-meta">Newest first</span>
            </div>
            <ol className="log">
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
      </main>

      <footer className="contact" id="contact" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title" className="sr-only">
            Contact
          </h2>
          <p>Hiring, or need a site built? Email is fastest.</p>
          <a className="big" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email.split("@")[0]}
            <wbr />@{siteConfig.email.split("@")[1]}
          </a>
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
        </div>
      </footer>
    </div>
  );
}
