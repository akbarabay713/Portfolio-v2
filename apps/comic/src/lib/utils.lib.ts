import { clsx, type ClassValue } from "clsx";
import { twMerge } from "./twMerge.lib";
import { CSSProperties } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cssVarWHRem = (w: number, h: number) =>
  ({
    "--h": `${h / 16}rem`,
    "--w": `${w / 16}rem`,
  }) as CSSProperties;

export const ifEmpty = <T>(value: T, defaultValue: T) => {
  if (
    value === undefined ||
    value === null ||
    value === false ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return defaultValue;
  }
  return value;
};
