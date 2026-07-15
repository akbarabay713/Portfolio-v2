export type Phase = "night" | "dawn" | "day" | "dusk";

/** Map an hour (0–23) to a time-of-day phase. */
export const phaseFor = (hour: number): Phase => {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "dusk";
  return "night";
};

/** Zero-padded HH:MM for a Date. */
export const clockOf = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
