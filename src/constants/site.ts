export const siteConfig = {
  name: "Akbar",
  title: "Akbar — Software Developer",
  description:
    "Akbar is a fullstack software developer crafting fast, accessible, and beautifully designed web experiences with React, Next.js, and modern web technologies.",
  // Override per-deployment via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://akbar.dev",
  locale: "en_US",
  author: "Akbar",
  jobTitle: "Software Developer",
  email: "akbarabu714@gmail.com",
  keywords: [
    "Akbar",
    "Software Developer",
    "Fullstack Developer",
    "Frontend Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  links: {
    github: "https://github.com/akbarabay713",
    linkedin: "https://www.linkedin.com/in/akbarabu/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
