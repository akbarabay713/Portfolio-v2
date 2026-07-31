export interface DesignLink {
  id: "comic" | "neon" | "noir";
  label: string;
  url: string;
}

/**
 * The three designs and their URLs. URLs come from per-app env vars at build
 * time, falling back to the local dev ports.
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
