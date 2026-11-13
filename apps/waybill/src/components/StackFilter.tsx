"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { StackChip } from "@/lib/stack";

const PARAM = "stack";
const CHANGE = "stack:change";

// The URL is the source of truth (?stack=laravel), so a filtered view can be shared.
const subscribe = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  window.addEventListener(CHANGE, notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener(CHANGE, notify);
  };
};
const readParam = () => new URLSearchParams(location.search).get(PARAM);
const serverParam = () => null;

function setParam(value: string | null) {
  const url = new URL(location.href);
  if (value) url.searchParams.set(PARAM, value);
  else url.searchParams.delete(PARAM);
  history.replaceState(history.state, "", url);
  window.dispatchEvent(new Event(CHANGE));
}

/**
 * Filters the work section by technology. It only sets data-filter on the
 * section; CSS generated on the server does the hiding.
 */
export default function StackFilter({
  chips,
  total,
}: {
  chips: StackChip[];
  total: number;
}) {
  const param = useSyncExternalStore(subscribe, readParam, serverParam);
  const chip = chips.find((c) => c.slug === param);
  const active = chip?.slug ?? null;

  useEffect(() => {
    const section = document.getElementById("work");
    if (!section) return;
    if (active) section.dataset.filter = active;
    else delete section.dataset.filter;
  }, [active]);

  return (
    <div className="filter-bar" data-xray="StackFilter · CSS attribute selectors">
      <span className="filter-label" id="filter-label">
        Filter by stack
      </span>
      <div className="filter-chips" role="group" aria-labelledby="filter-label">
        <button
          type="button"
          className="chip"
          aria-pressed={active === null}
          onClick={() => setParam(null)}
        >
          All <span className="chip-count">{total}</span>
        </button>
        {chips.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="chip"
            aria-pressed={active === c.slug}
            onClick={() => setParam(active === c.slug ? null : c.slug)}
          >
            {c.label} <span className="chip-count">{c.count}</span>
          </button>
        ))}
      </div>
      <p className="filter-status" aria-live="polite">
        {chip
          ? `${chip.count} of ${total} projects use ${chip.label}`
          : `Showing all ${total} projects`}
      </p>
    </div>
  );
}
