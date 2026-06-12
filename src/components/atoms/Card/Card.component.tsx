import { cn } from "@/lib/utils.lib";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

export const cardVariants = cva("rounded-lg transition-colors duration-200", {
  defaultVariants: {
    surface: "surface",
    interactive: false,
  },
  variants: {
    surface: {
      surface: "bg-surface",
      elevated: "bg-elevated",
      canvas: "bg-canvas",
    },
    interactive: {
      true: "hover:bg-card-hover",
      false: "",
    },
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, surface, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ surface, interactive }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export default Card;
