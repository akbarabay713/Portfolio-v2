import type { Experience, TechCategory } from "@/types/portfolio.types";
import profileImg from "@/assets/images/akbarr.webp";
import logoPu from "@/assets/images/pu.png";
import logoMi from "@/assets/images/madeindonesia_logo.png";
import logoKA from "@/assets/images/kiriminaja.png";
import logoGD from "@/assets/images/gaia.png";

export const bio = {
  name: "akbar",
  avatar: profileImg,
  greeting: "Hey, I'm Akbar",
  paragraphs: [
    "I'm a software engineer who builds things for the web — front-end apps and the backends behind them.",
    "Most of my work is in JavaScript and TypeScript, plus a fair amount of PHP. I've spent time with React, Next.js, Vue, and Laravel, and I like working on a team and shipping things people actually use.",
    "When I'm not coding I'm usually poking at some new tool or gadget, or getting outside for a bit.",
  ],
  resumeUrl:
    "https://drive.google.com/file/d/1RCnn63Psw8MYcKf1elrDc-4UzV70huxa/view?usp=sharing",
};

export const techStack: TechCategory[] = [
  {
    label: "Web Development",
    items: [
      "JavaScript",
      "Typescript",
      "Php",
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Vue",
      "Nuxt.js",
      "Node.js",
      "Express",
      "Laravel",
      "Wordpress",
      "Tailwind",
      "Sass",
      "Jquery",
      "MongoDB",
      "MySql",
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
    image: logoMi,
    description: [
      "Built responsive, SEO-friendly landing pages from Figma designs using Next.js and WordPress.",
      "Wrote reusable, component-based React and WordPress code that was easy to maintain.",
      "Maintained and improved existing client codebases, from first handoff through delivery.",
      "Worked directly with European clients to scope the work and figure out the right approach.",
    ],
  },
  {
    title: "Fullstack Developer",
    subtitle: "Gaia Digital",
    date: "March 2025 - May 2026",
    image: logoGD,
    description: [
      "Built fast, SEO-focused WordPress landing pages from Figma mockups.",
      "Wrote modular, reusable code within the WordPress ecosystem.",
      "Cleaned up and maintained older client codebases, improving how they performed.",
      "Worked with international clients to understand what they needed and build it.",
    ],
  },
  {
    title: "Fullstack Developer",
    subtitle: "KiriminAja",
    date: "July 2023 - December 2024",
    image: logoKA,
    description: [
      "Built Shopee omnichannel integrations into the KiriminAja dashboard so orders from different platforms could be handled in one place.",
      "Helped rebuild the KiriminAja and KiriminAja Plus dashboards, working on both the UI and backend performance.",
      "Built the fulfillment flow for KiriminAja Plus — from receiving stock in the warehouse to shipping orders out.",
      "Wrote Technical Requirement Documents (TRDs) for upcoming features.",
      "Worked across both monolith and microservices, mostly in PHP.",
    ],
  },
  {
    title: "Intern",
    subtitle: "Public Works Agency",
    date: "July 2021 - September 2021",
    image: logoPu,
    description: [
      "Built a profile website for the department to share its services and public information.",
      "Built an online registration system for desludging services, which helped keep things running during the COVID-19 pandemic.",
      "Kept the department's web platforms running and up to date.",
    ],
  },
];
