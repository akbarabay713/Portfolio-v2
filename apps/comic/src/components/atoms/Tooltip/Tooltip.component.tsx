"use client";

import React from "react";

import { cn } from "@/lib/utils.lib";

interface TooltipProps {
  children: React.ReactNode;

  content?: React.ReactNode;

  position?: "top" | "bottom" | "left" | "right";

  className?: string;

  tooltipClassName?: string;
}

const Tooltip = ({
  children,
  content,
  position = "top",
  className,
  tooltipClassName,
}: TooltipProps) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",

    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",

    left: "right-full top-1/2 -translate-y-1/2 mr-3",

    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div
      className={cn(
        "group relative flex shrink-0 items-center justify-center",
        className,
      )}
    >
      {children}

      {content ? (
        <div
          className={cn(
            `
            pointer-events-none
            absolute z-50 whitespace-nowrap
            opacity-0
            translate-y-2
            transition-all duration-200
            group-hover:translate-y-0
            group-hover:opacity-100
            `,
            positionClasses[position],
            tooltipClassName,
          )}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
};

export default Tooltip;
