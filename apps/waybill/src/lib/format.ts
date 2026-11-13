/** Languages and helpers that every project uses, left out of the short stack. */
const GENERIC = new Set([
  "JavaScript",
  "TypeScript",
  "PHP",
  "HTML",
  "CSS",
  "SCSS",
  "Sass",
  "jQuery",
  "Tailwind CSS",
]);

/** The few technologies that tell projects apart, e.g. "WordPress, WooCommerce". */
export function shortStack(tech: string[], max = 3): string {
  const distinctive = tech.filter((t) => !GENERIC.has(t));
  return (distinctive.length ? distinctive : tech).slice(0, max).join(", ");
}

const MONTHS: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

/** "December 2024 - Present" -> "Dec 2024 – now" */
export function shortDate(date: string): string {
  return date
    .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => MONTHS[m])
    .replace(/\s*-\s*/, " – ")
    .replace(/\bPresent\b/, "now");
}
