import { cn } from "@/lib/utils.lib";
import { Box, BoxRF } from "@/types/component.type";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

export const bodyVariants = cva("", {
  defaultVariants: {
    variant: "md",
    weight: "regular",
  },
  variants: {
    variant: {
      xl: "text-xl leading-relaxed",
      lg: "text-lg leading-relaxed",
      md: "text-base leading-relaxed",
      sm: "text-sm leading-normal",
      xs: "text-xs leading-normal",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
});

export interface BodyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof bodyVariants> {}

const PrimitiveBody = forwardRef<Element, BoxRF<BodyProps>>((props, ref) => {
  const {
    as: Element = "p" as React.ElementType,
    children,
    className,
    variant,
    weight,
    ...restProps
  } = props;

  return (
    <Element
      className={cn(bodyVariants({ variant, weight }), className)}
      ref={ref}
      {...restProps}
    >
      {children}
    </Element>
  );
});
PrimitiveBody.displayName = "Body";

const Body: Box<BodyProps> = PrimitiveBody;

export default Body;
