import * as React from "react";
import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(["btn"], {
  variants: {
    variant: {
      default: "btn",
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      ghost: "btn-ghost",
      glass: "btn glass",
      link: "btn-link",
    },

    state: {
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },

    size: {
      default: "btn-md",
      extrasmall: "btn-xs",
      small: "btn-sm",
      medium: "btn-md",
      large: "btn-lg",
    },

    shape: {
      square: "btn-square",
      circle: "btn-circle",
    },

    outline: {
      true: "btn-outline",
    },

    active: {
      true: "btn-active",
    },

    wide: {
      true: "btn-wide",
    },

    block: {
      true: "btn-block",
    },

    noAnimation: {
      true: "no-animation",
    },

    disabled: {
      true: "btn-disabled",
    },
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      state,
      size,
      shape,
      outline,
      active,
      wide,
      block,
      noAnimation,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            state,
            size,
            shape,
            outline,
            active,
            wide,
            block,
            noAnimation,
            disabled,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
