"use client";

import { setParam } from "@/components/StackFilter";

/**
 * Jumps to the work list filtered to one technology. A real link
 * (?stack=…#work), so it also works opened in a new tab or without script.
 */
export default function FilterLink({
  stack,
  children,
}: {
  stack: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="filter-link"
      href={`?stack=${stack}#work`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        setParam(stack);
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("work")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }}
    >
      {children}
    </a>
  );
}
