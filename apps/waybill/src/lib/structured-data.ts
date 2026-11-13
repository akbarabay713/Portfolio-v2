import { bio, experiences, profile, siteConfig, techStack } from "@portfolio/content";

/**
 * schema.org Person + WebSite, so search engines can tie the name to this
 * site, the job title, the location and the GitHub and LinkedIn profiles.
 */
export function structuredData() {
  const current = experiences.find((job) => /present/i.test(job.date));
  const person = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: bio.fullName,
    jobTitle: profile.role,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    image: `${siteConfig.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.based.split(" /")[0],
      addressCountry: "ID",
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: techStack.find((c) => c.label === "Web Development")?.items ?? [],
    ...(current && {
      worksFor: { "@type": "Organization", name: current.subtitle },
    }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: bio.fullName,
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };
}

/** JSON for a script tag, with "<" escaped so content can't close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
