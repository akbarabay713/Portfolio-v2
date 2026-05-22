import { cn } from "@/lib/utils.lib";
import { Box, BoxRF } from "@/types/component.type";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

export const bodyVariants = cva("font-satoshi", {
  defaultVariants: {
    variant: "md",
    weight: "regular",
  },
  variants: {
    variant: {
      // inherit: "",
      xl: "",
      lg: "",
      md: "",
      sm: "",
      xs: "",
    },
    weight: {
      bold: "",
      medium: "",
      regular: "",
      semibold: "",
    },
  },
  compoundVariants: [
    // XL
    {
      variant: "xl",
      weight: "regular",
      class:
        "body-text-xl-regular md:body-text-md-regular lg:body-text-lg-regular",
    },
    {
      variant: "xl",
      weight: "medium",
      class:
        "body-text-xl-medium md:body-text-md-medium lg:body-text-lg-medium",
    },
    {
      variant: "xl",
      weight: "bold",
      class: "body-text-xl-bold md:body-text-md-bold lg:body-text-lg-bold",
    },
    {
      variant: "xl",
      weight: "semibold",
      class:
        "body-text-xl-semibold md:body-text-md-semibold lg:body-text-lg-semibold",
    },
    // LG
    {
      variant: "lg",
      weight: "regular",
      class:
        "body-text-lg-regular md:body-text-sm-regular lg:body-text-md-regular",
    },
    {
      variant: "lg",
      weight: "medium",
      class:
        "body-text-lg-medium md:body-text-sm-medium lg:body-text-md-medium",
    },
    {
      variant: "lg",
      weight: "bold",
      class: "body-text-lg-bold md:body-text-sm-bold lg:body-text-md-bold",
    },
    {
      variant: "lg",
      weight: "semibold",
      class:
        "body-text-lg-semibold md:body-text-sm-semibold lg:body-text-md-semibold",
    },
    // MD
    {
      variant: "md",
      weight: "regular",
      class:
        "body-text-md-regular md:body-text-sm-regular lg:body-text-xs-regular",
    },
    {
      variant: "md",
      weight: "medium",
      class:
        "body-text-md-medium md:body-text-sm-medium lg:body-text-xs-medium",
    },
    {
      variant: "md",
      weight: "bold",
      class: "body-text-md-bold md:body-text-sm-bold lg:body-text-xs-bold",
    },
    {
      variant: "md",
      weight: "semibold",
      class:
        "body-text-md-semibold md:body-text-sm-semibold lg:body-text-xs-semibold",
    },
    // SM
    {
      variant: "sm",
      weight: "regular",
      class: "body-text-sm-regular lg:body-text-xs-regular",
    },
    {
      variant: "sm",
      weight: "medium",
      class: "body-text-sm-medium lg:body-text-xs-medium",
    },
    {
      variant: "sm",
      weight: "bold",
      class: "body-text-sm-bold lg:body-text-xs-bold",
    },
    {
      variant: "sm",
      weight: "semibold",
      class: "body-text-sm-semibold lg:body-text-xs-semibold",
    },
    // XS
    {
      variant: "xs",
      weight: "regular",
      class: "body-text-xs-regular lg:body-text-xs-regular",
    },
    {
      variant: "xs",
      weight: "medium",
      class: "body-text-xs-medium lg:body-text-xs-medium",
    },
    {
      variant: "xs",
      weight: "bold",
      class: "body-text-xs-bold lg:body-text-xs-bold",
    },
    {
      variant: "xs",
      weight: "semibold",
      class: "body-text-xs-semibold lg:body-text-xs-semibold",
    },
  ],
});

export interface BodyProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
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
      className={cn(bodyVariants({ className, variant, weight }))}
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
