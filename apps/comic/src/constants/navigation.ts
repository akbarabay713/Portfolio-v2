import { settings } from "@portfolio/content";
import type { NavItem } from "@/types/portfolio.types";

const allNavItems: NavItem[] = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export const navItems: NavItem[] = allNavItems.filter(
  (item) => item.href !== "/blog" || settings.sections.blog,
);
