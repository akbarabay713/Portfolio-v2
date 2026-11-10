import type { Project } from "./types";

export const allProjects: Project[] = [
  {
    title: "KiriminAja Dashboard",
    description:
      "I built the Shopee order integration and the KiriminAja Plus fulfillment flow, from warehouse stock to shipped orders, and worked on the dashboard rebuild across UI and backend performance. Indonesian online sellers use it to compare courier rates and ship across every major courier in one place.",
    tech: [
      "JavaScript",
      "TypeScript",
      "Vue",
      "Nuxt.js",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
      "Pinia",
    ],
    image: "/projects/ka.png",
    live: "https://kiriminaja.com/",
    visible: true,
    featured: true,
  },
  {
    title: "VitalsWatch",
    description:
      "A Core Web Vitals monitor I built as a side project. It simulates a CI pipeline that audits each commit for LCP, INP and CLS, charts trends across deploys, flags regressions and traces each one to the file or dependency responsible. It runs entirely in the browser on simulated data.",
    tech: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Zustand",
    ],
    image: "/projects/vitalswatch.png",
    live: "https://vitalswatch.vercel.app/",
    github: "https://github.com/akbarabay713/vitalswatch",
    visible: true,
    featured: true,
  },
  {
    title: "Art Is Wine",
    description:
      "WooCommerce site for a Dutch company that runs wine-and-painting team events, where businesses book workshops for their staff and clients.",
    tech: ["JavaScript", "WordPress", "WooCommerce", "PHP", "SCSS", "jQuery"],
    image: "/projects/artiswine-nl.png",
    live: "https://artiswine.nl/",
    visible: true,
  },
  {
    title: "Devinita",
    description:
      "WooCommerce shop for Italian wines imported directly to the Netherlands.",
    tech: ["JavaScript", "WordPress", "WooCommerce", "PHP", "SCSS", "jQuery"],
    image: "/projects/devinita-nl.png",
    live: "https://devinita.nl/",
    visible: true,
  },
  {
    title: "Greyrox",
    description:
      "Marketing site for Greyrox, a B2B platform for multi-cloud workflows, AI dataflows and low-code integrations.",
    tech: ["JavaScript", "WordPress", "Elementor", "PHP", "SCSS", "jQuery"],
    image: "/projects/greyrox.png",
    live: "https://www.greyrox.com/",
    visible: true,
    featured: true,
  },
  {
    title: "NedTax",
    description:
      "Elementor site for a Dutch-German tax advisory firm whose 40+ specialists handle cross-border accounting and tax.",
    tech: ["JavaScript", "WordPress", "Elementor", "PHP", "SCSS", "jQuery"],
    image: "/projects/nedtax.png",
    live: "https://nedtax.nl/nl/",
    visible: true,
  },
  {
    title: "ToxicoWatch",
    description:
      "Elementor site for an environmental research foundation, presenting its biomonitoring studies on dioxins, PFAS and heavy metals across Europe.",
    tech: ["JavaScript", "WordPress", "Elementor", "PHP", "SCSS", "jQuery"],
    image: "/projects/toxico.png",
    live: "https://toxicowatch.org/",
    visible: true,
  },
  {
    title: "ToxicoWatch Consultancy",
    description:
      "Elementor site for ToxicoWatch's consultancy, which offers toxicology research and advisory work on persistent organic pollutants to governments and businesses.",
    tech: ["JavaScript", "WordPress", "Elementor", "PHP", "SCSS", "jQuery"],
    image: "/projects/tw.png",
    live: "https://wordpress-663295-5770621.cloudwaysapps.com/",
    visible: true,
  },
  {
    title: "Woven+",
    description:
      "Elementor catalog for a maker of handcrafted outdoor furniture, aimed at hotels, resorts and retailers buying wholesale.",
    tech: ["JavaScript", "WordPress", "Elementor", "PHP", "SCSS", "jQuery"],
    image: "/projects/woven.png",
    live: "https://wovenplus.com/",
    visible: true,
  },
  {
    title: "Urban Africa Naturals",
    description:
      "WooCommerce store for vegan skincare made from unrefined Ghanaian shea butter.",
    tech: ["JavaScript", "WordPress", "WooCommerce", "PHP", "SCSS", "jQuery"],
    image: "/projects/uan.png",
    live: "https://urbanafricanaturals.com/",
    visible: true,
  },
  {
    title: "Lendé",
    description:
      "WooCommerce membership site for an Amsterdam club where members rotate designer handbags each month.",
    tech: ["JavaScript", "WordPress", "WooCommerce", "PHP", "SCSS", "jQuery"],
    image: "/projects/lende.png",
    live: "https://lendeluxury.com/",
    visible: true,
  },
  {
    title: "Gaia Digital",
    description:
      "Landing page template for Gaia Digital, the agency I worked at, built in Elementor to show clients a conversion-focused layout.",
    tech: ["JavaScript", "WordPress", "Elementor", "PHP", "SCSS", "jQuery"],
    image: "/projects/gaia-landing-page.png",
    live: "https://www.gaiadigital.nl/landingspagina-template/",
    visible: true,
  },
  {
    title: "Skin Color Cosmetics",
    description:
      "WooCommerce store for mineral makeup matched to individual skin tones.",
    tech: ["JavaScript", "WordPress", "WooCommerce", "PHP", "SCSS", "jQuery"],
    image: "/projects/skin-color.png",
    live: "https://skincolorcosmetics.nl/",
    visible: true,
  },
];

/** Visible projects (`visible: false` filtered out). */
export const projects: Project[] = allProjects.filter(
  (p) => p.visible !== false,
);

/** Featured subset. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
