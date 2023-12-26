import * as React from "react";
import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(["input", "w-full"], {
  variants: {
    variant: {
      default: "",
      neutral: "input-neutral",
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      ghost: "input-ghost",
      info: "input-info",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
    },

    size: {
      default: "input-md",
      extrasmall: "input-xs",
      small: "input-sm",
      medium: "input-md",
      large: "input-lg",
    },

    bordered: {
      true: "input-bordered",
    },

    disabled: {
      true: true,
    },
  },
});

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "disabled" | "size"
    >,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, bordered, disabled, ...props }, ref) => {
    return (
      <input
        className={cn(
          inputVariants({
            variant,
            size,
            bordered,
            className,
          })
        )}
        disabled={!!disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
