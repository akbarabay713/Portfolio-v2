"use client";

import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils.lib";

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 border border-solid cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    defaultVariants: {
      font: "sm",
      size: "md",
      variant: "primary",
    },

    variants: {
      font: {
        md: "text-button-small",
        sm: "text-button-small",
      },

      size: {
        "icon-lg": "p-3",
        "icon-md": "p-2.5",
        "icon-sm": "p-2",
        "icon-xl": "p-3",
        "icon-xxs": "p-1",

        lg: "px-4 py-2.5",
        md: "px-4 py-2.5",
        sm: "px-3.5 py-2",
        xl: "px-4 py-3",

        link: "p-0",
        unset: "",
      },

      variant: {
        "black-glass":
          "bg-base-black/50 backdrop-blur-lg border-base-white/20 text-base-white",

        danger:
          "bg-error-danger-500-base border-error-danger-500-base text-base-white hover:bg-error-danger-600 hover:border-error-danger-600 ring-error-danger-100",

        "link-color":
          "border-transparent bg-transparent text-primary-500-base hover:text-primary-700",

        "link-gray":
          "border-transparent bg-transparent text-gray-600 hover:text-gray-800",

        "outline-color":
          "bg-transparent border-primary-500-base hover:bg-primary-50 text-primary-500-base ring-neutral-100",

        "outline-danger":
          "bg-transparent border-error-danger-500-base hover:bg-error-danger-50 text-error-danger-500-base ring-neutral-100 disabled:text-error-danger-300 disabled:border-error-danger-200",

        "outline-gray":
          "bg-transparent border-gray-300 hover:bg-primary-50 text-gray-800 ring-neutral-100 disabled:text-gray-300 disabled:border-gray-200",

        primary:
          "bg-primary-500-base border-primary-500-base text-base-white hover:bg-primary-400 hover:border-primary-400 ring-primary-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200",

        secondary:
          "bg-primary-50 border-primary-50 text-primary-500-base hover:bg-primary-100 hover:border-primary-100 ring-primary-100",

        "secondary-danger":
          "bg-error-danger-50 border-error-danger-50 text-error-danger-500-base hover:bg-error-danger-100 hover:border-error-danger-100 ring-error-danger-100",

        "secondary-secondary":
          "bg-secondary-50 border-secondary-50 text-secondary-600 hover:bg-secondary-100 hover:border-secondary-100 ring-secondary-100",

        "secondary-tertiary":
          "bg-warning-50 border-warning-50 text-warning-600 hover:bg-warning-100 hover:border-warning-100 ring-warning-100",

        tertiary:
          "bg-warning-500-base border-warning-500-base text-base-white hover:bg-warning-600 hover:border-warning-600 ring-warning-100",

        white:
          "bg-base-white border-gray-100 text-gray-800 hover:bg-gray-300 hover:border-gray-bg-gray-300 ring-gray-100 disabled:opacity-50",
      },
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                             POLYMORPHIC TYPES                              */
/* -------------------------------------------------------------------------- */

type AsProp<E extends React.ElementType> = {
  as?: E;
};

type PropsToOmit<E extends React.ElementType, P> = keyof (AsProp<E> & P);

type PolymorphicComponentProps<
  E extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & AsProp<E>> &
  Omit<React.ComponentPropsWithoutRef<E>, PropsToOmit<E, Props>>;

type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

/* -------------------------------------------------------------------------- */
/*                               BUTTON TYPES                                 */
/* -------------------------------------------------------------------------- */

export interface ButtonOwnProps extends VariantProps<typeof buttonVariants> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export type ButtonProps<E extends React.ElementType = "button"> =
  PolymorphicComponentProps<E, ButtonOwnProps> & {
    ref?: PolymorphicRef<E>;
  };

type ButtonComponent = <E extends React.ElementType = "button">(
  props: ButtonProps<E>,
) => React.ReactElement | null;

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

const ButtonBase = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<any>) => {
    const {
      as,
      children,
      className,
      endIcon,
      font,
      size,
      startIcon,
      variant,
      ...restProps
    } = props;

    const Component = as || "button";

    return (
      <Component
        ref={ref}
        className={cn(
          buttonVariants({
            className,
            font,
            size,
            variant,
          }),
        )}
        {...restProps}
      >
        {startIcon}

        {children}

        {endIcon}
      </Component>
    );
  },
);

ButtonBase.displayName = "Button";

/* -------------------------------------------------------------------------- */
/*                                  EXPORT                                    */
/* -------------------------------------------------------------------------- */

const Button = ButtonBase as ButtonComponent;

export { Button, buttonVariants };

export default Button;
