import { StaticImageData } from "next/image";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live?: string;
  github?: string;
}

export interface Experience {
  title: string;
  subtitle: string;
  date: string;
  image: string | StaticImageData;
  description: string[];
}

export interface TechCategory {
  label: string;
  items: string[];
}

export type IconComponent = React.ComponentType<{
  width?: string | number;
  height?: string | number;
  className?: string;
}>;

export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface NavItem {
  label: string;
  href: string;
}
