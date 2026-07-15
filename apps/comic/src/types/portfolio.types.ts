export type {
  Project,
  Experience,
  TechCategory,
  Stat,
} from "@portfolio/content";

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
