import type { MetadataRoute } from "next";
import { bio, siteConfig } from "@portfolio/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${bio.fullName} | ${siteConfig.jobTitle}`,
    short_name: bio.fullName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#c9a878",
    theme_color: "#c9a878",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
