"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@portfolio/content";

import ArchiveRow from "@/components/ArchiveRow";
import ArchiveModal from "./ArchiveModal";

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
  const lastFocus = useRef<HTMLElement | null>(null);
  const slugs = useMemo(() => projects.map((p) => slugify(p.title)), [projects]);

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
        />
      ))}
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
