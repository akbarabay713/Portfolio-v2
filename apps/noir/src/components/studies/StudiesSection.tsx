"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Study } from "@portfolio/content";

import StudyRow from "@/components/StudyRow";
import StudyModal from "./StudyModal";

const ALL = "All";

/**
 * Studies ledger with a technique filter and a demo modal. The open study is
 * mirrored to the URL (`?study=S-005`) so a study is shareable and browser
 * back/forward opens and closes it.
 */
const StudiesSection = ({ studies }: { studies: Study[] }) => {
  const [filter, setFilter] = useState(ALL);
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const techniques = useMemo(
    () => [ALL, ...Array.from(new Set(studies.map((s) => s.technique)))],
    [studies],
  );
  const filtered = useMemo(
    () => (filter === ALL ? studies : studies.filter((s) => s.technique === filter)),
    [studies, filter],
  );

  // Open from the URL on mount, and on back/forward.
  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.search).get("study");
      setActiveId(id && studies.some((s) => s.id === id) ? id : null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [studies]);

  const writeUrl = (id: string | null, push: boolean) => {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("study", id);
    else url.searchParams.delete("study");
    window.history[push ? "pushState" : "replaceState"]({}, "", url);
  };

  const open = (id: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setActiveId(id);
    writeUrl(id, true);
  };
  const close = () => {
    setActiveId(null);
    writeUrl(null, false);
    lastFocus.current?.focus?.();
  };

  // Navigate within whichever list the open study belongs to.
  const navList = filtered.some((s) => s.id === activeId) ? filtered : studies;
  const idx = navList.findIndex((s) => s.id === activeId);
  const go = (dir: number) => {
    if (idx < 0) return;
    const id = navList[(idx + dir + navList.length) % navList.length].id;
    setActiveId(id);
    writeUrl(id, false);
  };

  const active = studies.find((s) => s.id === activeId) ?? null;

  return (
    <>
      <div className="mono mb-8 flex flex-wrap gap-2 text-[11px]">
        {techniques.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`min-h-11 border px-3 py-1.5 transition-colors ${
              filter === t
                ? "border-text bg-text text-bg"
                : "border-line text-faint hover:text-text"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="border-t border-line">
        {filtered.map((study) => (
          <StudyRow key={study.id} study={study} onOpen={() => open(study.id)} />
        ))}
        {filtered.length === 0 && (
          <p className="mono py-12 text-sm text-faint">no studies for this technique.</p>
        )}
      </div>

      <StudyModal
        study={active}
        index={idx >= 0 ? idx + 1 : 0}
        total={navList.length}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onClose={close}
      />
    </>
  );
};

export default StudiesSection;
