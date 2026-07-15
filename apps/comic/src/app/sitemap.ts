import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants";

const ROUTES = ["", "/about", "/projects", "/blog", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
