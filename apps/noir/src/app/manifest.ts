import type { MetadataRoute } from "next";
import { siteConfig } from "@portfolio/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Studio`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
