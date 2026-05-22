"use client";

import Body from "@/components/atoms/Body";
import Heading from "@/components/atoms/Heading";
import { fadeUpVariants, projects } from "@/constants";
import { ExternalLink, LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import type { Project } from "@/types/portfolio.types";
import Image from "next/image";

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  viewMode: "grid" | "list";
}

function ProjectCard({ project, viewMode }: ProjectCardProps) {
  return (
    <div
      className={`flex bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/[0.06] rounded-[2rem] p-3 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-none transition-shadow group ${
        viewMode === "grid"
          ? "flex-col pb-5"
          : "flex-col md:flex-row md:pr-6 md:items-center gap-2 md:gap-8"
      }`}
    >
      <div
        className={`relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#18181f] shrink-0 ${
          viewMode === "grid"
            ? "w-full aspect-[4/3] mb-5"
            : "w-full md:w-[320px] aspect-[4/3] mb-4 md:mb-0"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      <div
        className={`px-3 flex flex-col flex-1 w-full ${viewMode === "list" ? "py-2" : ""}`}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-6">
          {project.description}
        </p>

        {/* <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 dark:bg-[#18181f] border border-gray-200 dark:border-white/5 px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-500 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div> */}

        <div className="flex flex-wrap items-center gap-3 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold py-2.5 px-4 rounded-2xl flex justify-center items-center gap-2 transition-colors"
            >
              <ExternalLink size={16} /> Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-semibold py-2.5 px-4 rounded-2xl flex justify-center items-center gap-2 transition-colors"
            >
              <List size={16} /> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── View Toggle ─────────────────────────────────────────────────────────

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}

function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  const activeClass =
    "bg-white dark:bg-[#1e1e28] shadow-sm text-violet-600 dark:text-violet-300 ring-2 ring-violet-500/30";
  const inactiveClass =
    "text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-white/5";

  return (
    <div className="hidden lg:flex items-center bg-gray-100 dark:bg-[#111118] rounded-2xl p-1.5 border border-gray-200 dark:border-white/5 shrink-0 gap-1">
      <button
        onClick={() => onChange("grid")}
        className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${viewMode === "grid" ? activeClass : inactiveClass}`}
        aria-label="Grid view"
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${viewMode === "list" ? activeClass : inactiveClass}`}
        aria-label="List view"
      >
        <List size={20} />
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allTechs = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tech))),
    [],
  );
  const filters = ["All", ...allTechs];

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.tech.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <section id="projects" className="py-16 px-4 max-w-6xl mx-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
      >
        <Heading className="mb-4">
          Projects<span className="text-violet-500">.</span>
        </Heading>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Body className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-3xl">
          Explore my projects showcasing my skills in web development and
          design.
        </Body>
      </motion.div>

      {/* <motion.div initial="initial" animate="animate" variants={fadeUpVariants} transition={{ duration: 0.6, delay: 0.3 }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-violet-500 text-white shadow-md shadow-violet-500/20"
                    : "bg-gray-100 dark:bg-[#111118] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-[#1e1e28]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        </div>
      </motion.div> */}

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "flex flex-col gap-6"
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              viewMode={viewMode}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
