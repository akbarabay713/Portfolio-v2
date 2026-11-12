import type { Experience, Stat, TechCategory } from "./types";

export const bio = {
  name: "Akbar",
  fullName: "Akbar Abu",
  avatar: "/images/akbarr.webp",
  greeting: "Hey, I’m Akbar",
  paragraphs: [
    "I’m a fullstack developer who builds for the web: front-end apps and the backends behind them.",
    "Most of my work is in JavaScript, TypeScript and PHP: React, Next.js, Vue and Laravel for apps, and WordPress for client sites. I like working on a team and shipping things people actually use.",
    "When I’m not coding I’m usually poking at some new tool or gadget, or getting outside for a bit.",
  ],
  resumeUrl:
    "https://drive.google.com/file/d/1RCnn63Psw8MYcKf1elrDc-4UzV70huxa/view?usp=sharing",
};

export const stats: Stat[] = [
  { value: "3+", label: "Years of Experience" },
  { value: "13+", label: "Completed Projects" },
  { value: "4", label: "Companies Worked With" },
];

/** Spec-sheet facts for the noir design. */
export const profile = {
  based: "Yogyakarta / Remote",
  role: "Fullstack Developer",
  since: "2021",
  focus: "Frontend · Backend · UI",
  stack: "PHP · Laravel · React · Next",
  status: "Available",
};

export const techStack: TechCategory[] = [
  {
    label: "Web Development",
    items: [
      "JavaScript",
      "TypeScript",
      "PHP",
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Vue",
      "Nuxt.js",
      "Node.js",
      "Express",
      "Laravel",
      "WordPress",
      "Tailwind CSS",
      "Sass",
      "jQuery",
      "MongoDB",
      "MySQL",
      "Firebase",
    ],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
  {
    label: "UI Design",
    items: ["Figma"],
  },
];

export const experiences: Experience[] = [
  {
    title: "Frontend Developer",
    subtitle: "MadeIndonesia",
    date: "December 2024 - Present",
    image: "/images/madeindonesia_logo.png",
    description: [
      "Build landing pages from Figma designs in Next.js and WordPress, with responsive layouts and SEO handled from the start.",
      "Work directly with European clients to scope each project and choose the right approach.",
      "Maintain existing client codebases, from first handoff through delivery.",
    ],
  },
  {
    title: "Fullstack Developer (Part-time)",
    subtitle: "Gaia Digital",
    date: "March 2025 - May 2026",
    image: "/images/gaia.png",
    description: [
      "Built SEO-focused WordPress landing pages from Figma mockups, including the agency’s own landing page template.",
      "Cleaned up older client codebases and improved their performance.",
      "Worked with international clients to turn their requirements into finished sites.",
    ],
  },
  {
    title: "Software Engineer",
    subtitle: "KiriminAja",
    date: "July 2023 - December 2024",
    image: "/images/kiriminaja.png",
    description: [
      "Built Shopee omnichannel integrations into the KiriminAja dashboard so orders from different platforms could be handled in one place.",
      "Helped rebuild the KiriminAja and KiriminAja Plus dashboards, working on both the UI and backend performance.",
      "Built the fulfillment flow for KiriminAja Plus, from receiving stock in the warehouse to shipping orders out.",
      "Wrote Technical Requirement Documents (TRDs) for upcoming features.",
      "Worked across both monolith and microservices, mostly in PHP.",
    ],
  },
  {
    title: "Web Developer",
    subtitle: "Freelance",
    date: "January 2022 - June 2023",
    description: [
      "Built custom websites and web apps for clients across different industries.",
      "Built responsive interfaces and the backend features each client needed.",
      "Handled delivery end to end: development, deployment, revisions, and maintenance.",
    ],
  },
  {
    title: "Intern",
    subtitle: "Public Works Agency",
    date: "July 2021 - September 2021",
    image: "/images/pu.png",
    description: [
      "Built a profile website for the department to share its services and public information.",
      "Built an online registration system for desludging services, which helped keep things running during the COVID-19 pandemic.",
      "Kept the department’s web platforms running and up to date.",
      "Was the only one of four interns offered a full-time position at the end of the internship.",
    ],
  },
];
