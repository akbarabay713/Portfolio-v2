import * as React from "react";
import { cn } from "@/lib/utils.lib";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full rounded-full bg-elevated px-5 py-3 text-sm text-content placeholder:text-faint",
        "border border-line outline-none transition-colors",
        "focus:border-content focus-visible:outline-none",
        type === "search" && "pl-12",
        error && "border-negative text-negative placeholder:text-negative/60",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export default Input;
