import { cn } from "@/lib/utils.lib";
import { Box, BoxRF } from "@/types/component.type";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

export const headingVariants = cva("text-content", {
  defaultVariants: {
    variant: "h1",
    weight: "bold",
  },
  variants: {
    variant: {
      h1: "text-4xl sm:text-5xl md:text-6xl tracking-tight",
      h2: "text-3xl sm:text-4xl md:text-5xl tracking-tight",
      h3: "text-2xl sm:text-3xl tracking-tight",
      h4: "text-xl sm:text-2xl tracking-tight",
      h5: "text-lg sm:text-xl",
      h6: "text-base sm:text-lg",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const PrimitiveHeading = forwardRef<Element, BoxRF<HeadingProps>>(
  (props, ref) => {
    const {
      as: Element = "h1" as React.ElementType,
      children,
      className,
      variant,
      weight,
      ...restProps
    } = props;

    return (
      <Element
        className={cn(headingVariants({ variant, weight }), className)}
        ref={ref}
        {...restProps}
      >
        {children}
      </Element>
    );
  },
);
PrimitiveHeading.displayName = "Heading";

const Heading: Box<HeadingProps> = PrimitiveHeading;

export default Heading;
