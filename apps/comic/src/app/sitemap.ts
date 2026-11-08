import type { MetadataRoute } from "next";
import { settings } from "@portfolio/content";
import { siteConfig } from "@/constants";

const ROUTES = [
  "",
  "/about",
  "/projects",
  ...(settings.sections.blog ? ["/blog"] : []),
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
