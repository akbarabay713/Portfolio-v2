export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live?: string;
  github?: string;
  /** Hidden everywhere when false. */
  visible?: boolean;
  /** May be surfaced first or larger. */
  featured?: boolean;
}

export interface Experience {
  title: string;
  subtitle: string;
  date: string;
  image?: string;
  description: string[];
}

export interface TechCategory {
  label: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
}
