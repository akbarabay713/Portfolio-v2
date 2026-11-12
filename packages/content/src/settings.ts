/**
 * Portfolio settings shared by the apps.
 *
 * activeDesign  which app the primary domain serves; each app also reads it
 *               to label itself.
 * sections      toggle whole sections on or off everywhere.
 */
export type DesignId = "comic" | "neon" | "noir";

export const settings = {
  activeDesign: "noir" as DesignId,

  sections: {
    /** Blog page + nav links. */
    blog: false,
    /** Experience timeline. */
    experience: true,
    /** Hero stats. */
    stats: true,
    /** Links to the other two designs. */
    designSwitcher: false,
  },
} as const;

export type Settings = typeof settings;
