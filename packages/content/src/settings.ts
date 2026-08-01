/**
 * Portfolio settings shared by the apps.
 *
 * activeDesign  which app the primary domain serves; each app also reads it
 *               to label itself.
 * sections      toggle whole sections on or off everywhere.
 */
export type DesignId = "comic" | "neon" | "noir";

export const settings = {
  activeDesign: "comic" as DesignId,

  sections: {
    /** Blog page + nav links. */
    blog: false,
    /** Experience timeline. */
    experience: true,
    /** Hero stats. */
    stats: true,
  },
} as const;

export type Settings = typeof settings;
