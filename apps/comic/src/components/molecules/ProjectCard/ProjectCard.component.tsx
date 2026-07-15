"use client";

import Image from "next/image";
import { Play } from "lucide-react";

import Card from "@/components/atoms/Card";
import Tag from "@/components/atoms/Tag";
import { IcGithub } from "@/components/atoms/Icons/SocialIcons";
import type { Project } from "@/types/portfolio.types";
import { cn } from "@/lib/utils.lib";

interface ProjectCardProps {
  project: Project;
  viewMode?: "grid" | "list";
}

const ProjectCard = ({ project, viewMode = "grid" }: ProjectCardProps) => {
  const { title, description, tech, image, live, github } = project;
  const isList = viewMode === "list";

  return (
    <Card
      interactive
      className={cn(
        "group h-full gap-4 ink-border ink-shadow p-4 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:-rotate-1 hover:shadow-[7px_7px_0_0_var(--outline)]",
        isList ? "flex flex-col md:flex-row md:items-center md:gap-6" : "flex flex-col",
      )}
    >
      <div
        className={cn(
          "relative aspect-4/3 overflow-hidden rounded-md ink-border bg-elevated",
          isList ? "w-full shrink-0 md:w-72" : "w-full",
        )}
      >
        <Image
          src={image}
          alt={`${title} project screenshot`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={isList ? "(max-width: 768px) 100vw, 288px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />

        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} live site`}
            className="absolute bottom-3 right-3 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full ink-border bg-accent text-accent-contrast opacity-0 ink-shadow-sm transition-all duration-300 hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1">
        <h3 className="font-display tracking-wide mb-2 text-xl text-content transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p
          className={cn(
            "mb-4 text-sm leading-relaxed text-muted",
            isList ? "line-clamp-3" : "line-clamp-4",
          )}
        >
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {tech.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-faint transition-colors hover:text-content"
          >
            <IcGithub width={14} height={14} /> View code
          </a>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
