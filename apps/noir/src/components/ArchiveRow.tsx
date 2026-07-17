"use client";

import type { Project } from "@portfolio/content";

interface ArchiveRowProps {
  project: Project;
  index: number;
  onOpen?: () => void;
  onHover?: (project: Project | null) => void;
}

/**
 * A full-width archive line: big title, tags, year. Opens a project detail
 * modal and reports hover so a shared preview can follow the cursor.
 */
const ArchiveRow = ({ project, index, onOpen, onHover }: ArchiveRowProps) => {
  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => onHover?.(project)}
      onMouseLeave={() => onHover?.(null)}
      onPointerDown={() => onHover?.(null)}
      className="group grid w-full grid-cols-[auto_1fr] items-center gap-x-6 gap-y-1 border-b border-line py-8 text-left sm:grid-cols-[3rem_1fr_auto_auto]"
    >
      <span className="mono text-xs text-faint">{String(index).padStart(2, "0")}</span>
      <h3
        data-skew
        className="display text-4xl transition-colors will-change-transform group-hover:text-accent sm:text-6xl"
      >
        {project.title}
      </h3>
      <span className="mono col-start-2 text-[11px] text-faint sm:col-start-3 sm:text-right">
        {project.tech.slice(0, 3).join(" · ").toUpperCase()}
      </span>
      <span className="mono col-start-2 hidden text-[11px] text-muted sm:col-start-4 sm:block sm:pl-10">
        ↗
      </span>
    </button>
  );
};

export default ArchiveRow;
