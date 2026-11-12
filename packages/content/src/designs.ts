import type { DesignId } from "./settings";

export interface DesignLink {
  id: DesignId;
  label: string;
  url: string;
}

/**
 * The designs and their URLs. URLs come from per-app env vars at build
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
  {
    id: "waybill",
    label: "Waybill",
    url: process.env.NEXT_PUBLIC_WAYBILL_URL ?? "http://localhost:3003",
  },
];
