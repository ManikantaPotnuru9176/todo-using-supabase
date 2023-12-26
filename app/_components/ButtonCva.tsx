import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/_utils/cn";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "btn",
      outline: "btn-outline",
      ghost: "btn-ghost",
      link: "btn-link",
      active: "btn-active",
    },

    colors: {
      primary: "btn-primary",
    },

    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonCva = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, colors, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, colors, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonCva.displayName = "ButtonCva";

export { ButtonCva, buttonVariants };
