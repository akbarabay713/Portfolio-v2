"use client";

import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils.lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap cursor-pointer select-none transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
    },
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-contrast ink-border ink-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--outline)] active:translate-x-1 active:translate-y-1 active:shadow-none",
        secondary:
          "bg-elevated text-content ink-border ink-shadow-sm hover:bg-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        outline:
          "bg-card text-content ink-border ink-shadow-sm hover:bg-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        ghost:
          "bg-transparent text-muted hover:text-content hover:bg-elevated",
        danger:
          "bg-negative text-white ink-border ink-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--outline)] active:translate-x-1 active:translate-y-1 active:shadow-none",
      },
      size: {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-6 py-3",
        lg: "text-base px-8 py-4",
        "icon-sm": "p-2",
        "icon-md": "p-3",
        "icon-lg": "p-4",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-lg",
        circle: "rounded-full aspect-square",
      },
      caps: {
        true: "uppercase tracking-[0.1em]",
        false: "",
      },
    },
  },
);

type AsProp<E extends React.ElementType> = {
  as?: E;
};

type PropsToOmit<E extends React.ElementType, P> = keyof (AsProp<E> & P);

type PolymorphicComponentProps<
  E extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<Props & AsProp<E>> &
  Omit<React.ComponentPropsWithoutRef<E>, PropsToOmit<E, Props>>;

type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

export interface ButtonOwnProps
  extends Omit<VariantProps<typeof buttonVariants>, "caps"> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  caps?: boolean;
}

export type ButtonProps<E extends React.ElementType = "button"> =
  PolymorphicComponentProps<E, ButtonOwnProps> & {
    ref?: PolymorphicRef<E>;
  };

type ButtonComponent = <E extends React.ElementType = "button">(
  props: ButtonProps<E>,
) => React.ReactElement | null;

const ButtonBase = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLElement>) => {
    const {
      as,
      children,
      className,
      endIcon,
      size,
      shape,
      startIcon,
      variant,
      caps = false,
      ...restProps
    } = props;

    const Component = (as || "button") as React.ElementType;

    return (
      <Component
        ref={ref as never}
        className={cn(buttonVariants({ size, shape, variant, caps }), className)}
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

const Button = ButtonBase as ButtonComponent;

export { Button, buttonVariants };

export default Button;
