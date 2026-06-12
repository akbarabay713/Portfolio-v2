import { cn } from "@/lib/utils.lib";
import React from "react";

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  pulse?: boolean;
}

const StatusPill = ({
  className,
  children,
  pulse = true,
  ...props
}: StatusPillProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full border border-line-strong bg-elevated px-4 py-1.5 text-xs font-semibold text-muted",
      className,
    )}
    {...props}
  >
    <span className="relative flex h-2 w-2">
      {pulse && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
    {children}
  </span>
);

export default StatusPill;
