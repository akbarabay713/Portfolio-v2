"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";

import SectionHeader from "@/components/molecules/SectionHeader";
import ProjectCard from "@/components/molecules/ProjectCard";
import { EASE_OUT, fadeUpVariants, projects } from "@/constants";
import { cn } from "@/lib/utils.lib";

type ViewMode = "grid" | "list";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((p) => p.tech)))],
    [],
  );

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.tech.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 pb-32">
      <SectionHeader
        title="Projects"
        subtitle="A selection of products and sites I've designed and built — from ecommerce and SaaS to logistics dashboards."
      />

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap gap-2.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full ink-border px-4 py-2 text-sm font-bold transition-all active:scale-95",
                activeFilter === filter
                  ? "bg-accent text-accent-contrast ink-shadow-sm"
                  : "bg-card text-muted hover:-translate-y-0.5 hover:text-content",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 self-start rounded-full ink-border bg-card p-1 sm:self-auto">
          {(["grid", "list"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              aria-label={`${mode} view`}
              aria-pressed={viewMode === mode}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-90",
                viewMode === mode
                  ? "bg-accent text-accent-contrast"
                  : "text-muted hover:text-content",
              )}
            >
              {mode === "grid" ? <LayoutGrid size={18} /> : <List size={18} />}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        layout
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-4",
        )}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 20,
                delay: Math.min(index * 0.06, 0.4),
              }}
            >
              <ProjectCard project={project} viewMode={viewMode} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
