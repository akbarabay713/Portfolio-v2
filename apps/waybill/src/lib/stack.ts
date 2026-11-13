import type { Project } from "@portfolio/content";

/** Too common or too minor to filter by. */
const SKIP = new Set([
  "JavaScript",
  "HTML",
  "CSS",
  "SCSS",
  "Sass",
  "jQuery",
  "Vite",
  "Zustand",
  "Pinia",
]);

/** "Next.js" -> "next-js" */
export function slug(tech: string): string {
  return tech.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Space-separated slugs for a data-tech attribute, matched with [data-tech~=…]. */
export function techAttr(project: Project): string {
  return project.tech.map(slug).join(" ");
}

export interface StackChip {
  slug: string;
  label: string;
  count: number;
  featured: number;
  listed: number;
}

/** Technologies worth filtering by, most used first. */
export function stackChips(projects: Project[]): StackChip[] {
  const chips = new Map<string, StackChip>();
  for (const p of projects) {
    for (const tech of p.tech) {
      if (SKIP.has(tech)) continue;
      const s = slug(tech);
      const chip = chips.get(s) ?? { slug: s, label: tech, count: 0, featured: 0, listed: 0 };
      chip.count += 1;
      if (p.featured) chip.featured += 1;
      else chip.listed += 1;
      chips.set(s, chip);
    }
  }
  return [...chips.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label),
  );
}

/**
 * The filter is pure CSS: the section carries data-filter, and these rules hide
 * every project whose data-tech list lacks that slug. An empty table is hidden too.
 */
export function filterCss(chips: StackChip[]): string {
  return chips
    .map((c) => {
      const scope = `.work[data-filter="${c.slug}"]`;
      const rules = [`${scope} [data-tech]:not([data-tech~="${c.slug}"]){display:none}`];
      if (c.listed === 0) rules.push(`${scope} .manifest-wrap{display:none}`);
      return rules.join("");
    })
    .join("");
}
