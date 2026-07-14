export const siteConfig = {
  name: "Akbar",
  title: "Akbar — Software Developer",
  description:
    "Akbar is a fullstack developer who builds web apps and sites with React, Next.js, and PHP.",
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
