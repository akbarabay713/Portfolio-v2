import { cn } from "@/lib/utils.lib";
import { Box, BoxRF } from "@/types/component.type";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

export const headingVariants = cva("font-satoshi", {
  defaultVariants: {
    variant: "h1",
    weight: "regular",
  },
  variants: {
    variant: {
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      h5: "",
      h6: "",
    },
    weight: {
      regular: "",
      medium: "",
      semibold: "",
      bold: "",
    },
  },
  compoundVariants: [
    // H1
    {
      variant: "h1",
      weight: "regular",
      class:
        "heading-h-1-regular md:heading-h-3-regular lg:heading-h-2-regular",
    },
    {
      variant: "h1",
      weight: "medium",
      class: "heading-h-1-medium md:heading-h-3-medium lg:heading-h-2-medium",
    },
    {
      variant: "h1",
      weight: "bold",
      class: "heading-h-1-bold md:heading-h-3-bold lg:heading-h-2-bold",
    },
    {
      variant: "h1",
      weight: "semibold",
      class:
        "heading-h-1-semibold md:heading-h-3-semibold lg:heading-h-2-semibold",
    },
    // H2
    {
      variant: "h2",
      weight: "regular",
      class:
        "heading-h-2-regular md:heading-h-4-regular lg:heading-h-3-regular",
    },
    {
      variant: "h2",
      weight: "medium",
      class: "heading-h-2-medium md:heading-h-4-medium lg:heading-h-3-medium",
    },
    {
      variant: "h2",
      weight: "bold",
      class: "heading-h-2-bold md:heading-h-4-bold lg:heading-h-3-bold",
    },
    {
      variant: "h2",
      weight: "semibold",
      class:
        "heading-h-2-semibold md:heading-h-4-semibold lg:heading-h-3-semibold",
    },
    // H3
    {
      variant: "h3",
      weight: "regular",
      class:
        "heading-h-3-regular md:heading-h-5-regular lg:heading-h-4-regular",
    },
    {
      variant: "h3",
      weight: "medium",
      class: "heading-h-3-medium md:heading-h-5-medium lg:heading-h-4-medium",
    },
    {
      variant: "h3",
      weight: "bold",
      class: "heading-h-3-bold md:heading-h-5-bold lg:heading-h-4-bold",
    },
    {
      variant: "h3",
      weight: "semibold",
      class:
        "heading-h-3-semibold md:heading-h-5-semibold lg:heading-h-4-semibold",
    },
    // H4
    {
      variant: "h4",
      weight: "regular",
      class:
        "heading-h-4-regular md:heading-h-6-regular lg:heading-h-5-regular",
    },
    {
      variant: "h4",
      weight: "medium",
      class: "heading-h-4-medium md:heading-h-6-medium lg:heading-h-5-medium",
    },
    {
      variant: "h4",
      weight: "bold",
      class: "heading-h-4-bold md:heading-h-6-bold lg:heading-h-5-bold",
    },
    {
      variant: "h4",
      weight: "semibold",
      class:
        "heading-h-4-semibold md:heading-h-6-semibold lg:heading-h-5-semibold",
    },
    // H5
    {
      variant: "h5",
      weight: "regular",
      class:
        "heading-h-5-regular md:body-text-xl-regular lg:heading-h-6-regular",
    },
    {
      variant: "h5",
      weight: "medium",
      class: "heading-h-5-medium md:body-text-xl-medium lg:heading-h-6-medium",
    },
    {
      variant: "h5",
      weight: "bold",
      class: "heading-h-5-bold md:body-text-xl-bold lg:heading-h-6-bold",
    },
    {
      variant: "h5",
      weight: "semibold",
      class:
        "heading-h-5-semibold md:body-text-xl-semibold lg:heading-h-6-semibold",
    },
    // H6
    {
      variant: "h6",
      weight: "regular",
      class:
        "heading-h-6-regular md:body-text-lg-regular lg:body-text-xl-regular",
    },
    {
      variant: "h6",
      weight: "medium",
      class: "heading-h-6-medium md:body-text-lg-medium lg:body-text-xl-medium",
    },
    {
      variant: "h6",
      weight: "bold",
      class: "heading-h-6-bold md:body-text-lg-bold lg:body-text-xl-bold",
    },
    {
      variant: "h6",
      weight: "semibold",
      class:
        "heading-h-6-semibold md:body-text-lg-semibold lg:body-text-xl-semibold",
    },
  ],
});

export interface HeadingProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof headingVariants> {}

const PrimitiveHeading = forwardRef<Element, BoxRF<HeadingProps>>(
  (props, ref) => {
    const {
      as: Element = "h1" as any,
      children,
      className,
      variant,
      weight,
      ...restProps
    } = props;

    return (
      <Element
        className={cn(headingVariants({ className, variant, weight }))}
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
