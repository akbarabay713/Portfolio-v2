import { StaticImageData } from "next/image";

// ─── Project ─────────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live?: string;
  github?: string;
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface Experience {
  title: string;
  subtitle: string;
  date: string;
  image: string | StaticImageData;
  description: string[];
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

export interface TechCategory {
  label: string;
  items: string[];
}

// ─── Icon Props ──────────────────────────────────────────────────────────────

export type IconComponent = React.ComponentType<{
  width?: string | number;
  height?: string | number;
  className?: string;
}>;

// ─── Social Link ─────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}
