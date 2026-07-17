"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@portfolio/content";

import ArchiveRow from "@/components/ArchiveRow";
import ArchiveModal from "./ArchiveModal";
import ArchivePreview from "./ArchivePreview";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Archive rows + a project detail modal, with the open project mirrored to the
 * URL (`?project=vitalswatch`) so projects are shareable and back/forward work.
 */
const ArchiveSection = ({ projects }: { projects: Project[] }) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const scrolling = useRef(false);
  const slugs = useMemo(() => projects.map((p) => slugify(p.title)), [projects]);

  // Suppress hover previews while scrolling so rows passing under a stationary
  // cursor don't flash a preview stuck at the top-left.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      scrolling.current = true;
      setHovered(null);
      clearTimeout(t);
      t = setTimeout(() => (scrolling.current = false), 140);
    };
    // Any real cursor movement means it isn't a stationary wheel-scroll, so
    // lift the suppression immediately and let hovers register.
    const onMove = () => {
      scrolling.current = false;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      clearTimeout(t);
    };
  }, []);

  const hover = (project: Project | null) => {
    if (scrolling.current && project) return;
    setHovered(project);
  };

  useEffect(() => {
    const sync = () => {
      const s = new URLSearchParams(window.location.search).get("project");
      setSlug(s && slugs.includes(s) ? s : null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [slugs]);

  const writeUrl = (value: string | null, push: boolean) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("project", value);
    else url.searchParams.delete("project");
    window.history[push ? "pushState" : "replaceState"]({}, "", url);
  };

  const open = (value: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setHovered(null);
    setSlug(value);
    writeUrl(value, true);
  };
  const close = () => {
    setSlug(null);
    writeUrl(null, false);
    lastFocus.current?.focus?.();
  };

  const idx = slug ? slugs.indexOf(slug) : -1;
  const go = (dir: number) => {
    if (idx < 0) return;
    const next = (idx + dir + projects.length) % projects.length;
    setSlug(slugs[next]);
    writeUrl(slugs[next], false);
  };

  return (
    <div className="border-t border-line">
      {projects.map((project, i) => (
        <ArchiveRow
          key={project.title}
          project={project}
          index={i + 1}
          onOpen={() => open(slugs[i])}
          onHover={hover}
        />
      ))}
      <ArchivePreview project={slug ? null : hovered} />
      <ArchiveModal
        project={idx >= 0 ? projects[idx] : null}
        index={idx >= 0 ? idx + 1 : 0}
        total={projects.length}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onClose={close}
      />
    </div>
  );
};

export default ArchiveSection;
