import { cn } from "@/lib/utils.lib";
import React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  startIcon?: React.ReactNode;
}

const Tag = ({ className, children, startIcon, ...props }: TagProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border-2 border-outline bg-card px-3 py-1 text-xs font-bold text-content transition-all duration-150 hover:-rotate-2 hover:scale-110 hover:bg-highlight hover:text-[#16130f]",
      className,
    )}
    {...props}
  >
    {startIcon}
    {children}
  </span>
);

export default Tag;
