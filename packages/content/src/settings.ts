/**
 * Portfolio settings — the single switchboard for both designs.
 *
 * activeDesign  which app your primary domain should serve ("comic" | "neon").
 *               Each app also reads it to label itself; deployments map the
 *               main domain to the matching app.
 * sections      toggle whole sections on/off across every design.
 */
export type DesignId = "comic" | "neon";

export const settings = {
  activeDesign: "comic" as DesignId,

  sections: {
    /** Blog page + nav links. */
    blog: false,
    /** Experience timeline. */
    experience: true,
    /** Hero stats (years / projects / hours) — used by designs that show them. */
    stats: true,
  },
} as const;

export type Settings = typeof settings;
