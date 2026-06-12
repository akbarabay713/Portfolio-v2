import { cn } from "@/lib/utils.lib";
import React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  startIcon?: React.ReactNode;
}

const Tag = ({ className, children, startIcon, ...props }: TagProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-line bg-elevated px-3 py-1 text-xs font-semibold text-muted",
      className,
    )}
    {...props}
  >
    {startIcon}
    {children}
  </span>
);

export default Tag;
