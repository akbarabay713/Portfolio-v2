import * as React from "react";
import { cn } from "@/lib/utils.lib";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { error?: boolean }
>(({ className, error, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        type === "text" &&
          "w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-200",
        type === "range" && "w-full appearance-none bg-transparent h-0.5",
        type === "radio" && "accent-primary-500-base",
        error &&
          "border-danger-base-500 text-danger-600 placeholder:text-danger-400 focus-visible:ring-danger-base-500",
        type === "search" && "pl-10",

        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;
