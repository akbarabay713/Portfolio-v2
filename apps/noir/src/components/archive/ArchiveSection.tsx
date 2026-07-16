"use client";

import { useState } from "react";
import type { Project } from "@portfolio/content";

import ArchiveRow from "@/components/ArchiveRow";
import ArchiveModal from "./ArchiveModal";

/** Archive rows plus the project detail modal. */
const ArchiveSection = ({ projects }: { projects: Project[] }) => {
  const [active, setActive] = useState<{ project: Project; index: number } | null>(null);

  return (
    <div className="border-t border-line">
      {projects.map((project, i) => (
        <ArchiveRow
          key={project.title}
          project={project}
          index={i + 1}
          onOpen={() => setActive({ project, index: i + 1 })}
        />
      ))}
      <ArchiveModal
        project={active?.project ?? null}
        index={active?.index ?? 0}
        onClose={() => setActive(null)}
      />
    </div>
  );
};

export default ArchiveSection;
