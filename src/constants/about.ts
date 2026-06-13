import type { Experience, TechCategory } from "@/types/portfolio.types";
import profileImg from "@/assets/images/akbarr.webp";
import logoPu from "@/assets/images/pu.png";
import logoMi from "@/assets/images/madeindonesia_logo.png";
import logoKA from "@/assets/images/kiriminaja.png";
import logoGD from "@/assets/images/gaia.png";

export const bio = {
  name: "akbar",
  avatar: profileImg,
  greeting: "Hi there, I'm Akbar 👋",
  paragraphs: [
    "a software engineer passionate about crafting innovative solutions to make life easier. Whether it’s sleek web apps or robust backend systems, I enjoy bringing ideas to life through code.",
    "I’ve worked with a variety of languages and frameworks, from PHP to JavaScript, and I’m always eager to expand my knowledge and skills. Collaboration is at the heart of my process I thrive in team environments where creativity and teamwork drive great results.",
    "When I’m not coding, you’ll find me exploring new tech, gadgets, or enjoying the outdoors. Let’s connect and create something amazing together!",
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
      "Translated complex Figma designs into high-performance, SEO-optimized landing pages utilizing Next.js and WordPress, delivering responsive and seamless user experiences.",
      "Engineered clean, maintainable, and reusable code adhering to component-based architecture principles in React and WordPress.",
      "Maintained and enhanced client codebases, improving core functionality and performance throughout the software development lifecycle from product intake to successful delivery.",
      "Partnered closely with European clients to analyze project requirements, scope deliverables, and engineer customized technical solutions.",
    ],
  },
  {
    title: "Fullstack Developer",
    subtitle: "Gaia Digital",
    date: "March 2025 - May 2026",
    image: logoGD,
    description: [
      "Spearheaded the development of high-performance, SEO-optimized WordPress landing pages from Figma mockups, ensuring robust responsiveness and superior user experience.",
      "Developed clean, scalable, and modular code utilizing component-based development paradigms within the WordPress ecosystem.",
      "Optimized and maintained legacy client codebases, significantly enhancing system functionality, features, and performance from initial intake to final customer delivery.",
      "Collaborated seamlessly with international stakeholders to elicit business requirements and architect tailored, high-quality digital solutions.",
    ],
  },
  {
    title: "Fullstack Developer",
    subtitle: "KiriminAja",
    date: "July 2023 - December 2024",
    image: logoKA,
    description: [
      "Engineered Omnichannel integrations for Shopee within the KiriminAja dashboard, enabling streamlined operations and seamless experiences across multiple e-commerce platforms.",
      "Key contributor in the architectural revamp of the KiriminAja and KiriminAja Plus dashboards, focusing on advanced UI/UX enhancements and critical backend performance optimizations.",
      "Developed end-to-end fulfillment features for the KiriminAja Plus dashboard, automating the entire order processing lifecycle from warehouse reception and storage to final customer dispatch.",
      "Authored detailed Technical Requirement Documents (TRD) to outline scope, architecture, and implementation strategies for upcoming product features.",
      "Designed and deployed scalable code across both monolithic and microservices architectures, leveraging PHP as the primary backend technology.",
    ],
  },
  {
    title: "Intern",
    subtitle: "Public Works Agency",
    date: "July 2021 - September 2021",
    image: logoPu,
    description: [
      "Designed and engineered a departmental profile website to effectively broadcast the organization's vision, mission, and public services.",
      "Developed and launched a vital online registration platform for desludging services, streamlining public access and operations during the COVID-19 pandemic.",
      "Managed and maintained core web platforms, ensuring high availability, robust security, and up-to-date dissemination of accurate public information.",
    ],
  },
];
