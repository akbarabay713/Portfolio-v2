export interface DesignLink {
  id: "comic" | "neon" | "noir";
  label: string;
  url: string;
}

/**
 * The three portfolio designs and where each is deployed. URLs come from
 * per-app env vars at build time and fall back to the local dev ports.
 * Each app marks its own entry as current in its switcher.
 */
export const designs: DesignLink[] = [
  {
    id: "comic",
    label: "Comic",
    url: process.env.NEXT_PUBLIC_COMIC_URL ?? "http://localhost:3000",
  },
  {
    id: "neon",
    label: "Neon",
    url: process.env.NEXT_PUBLIC_NEON_URL ?? "http://localhost:3001",
  },
  {
    id: "noir",
    label: "Studio",
    url: process.env.NEXT_PUBLIC_NOIR_URL ?? "http://localhost:3002",
  },
];
