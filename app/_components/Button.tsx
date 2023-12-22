// import React from "react";
// import { cn } from "../_utils/cn";

// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// const Button = ({ className, children, ...props }: ButtonProps) => {
//   return (
//     <button className={cn("btn", className)} {...props}>
//       {children}
//     </button>
//   );
// };

// export default Button;

//--------------------------------------------------------------------------------

import * as React from "react";
import { cn } from "../_utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "glass"
    | "link";
  active?: boolean;
  outline?: boolean;
  state?: "default" | "info" | "success" | "warning" | "error";
  size?: "default" | "extrasmall" | "small" | "medium" | "large";
  wide?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      active = false,
      outline = false,
      state = "default",
      size = "default",
      wide = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "btn",
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      ghost: "btn-ghost",
      glass: "btn glass",
      link: "btn-link",
    };

    const states = {
      default: "",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    };

    const sizes = {
      default: "btn-md",
      extrasmall: "btn-xs",
      small: "btn-sm",
      medium: "btn-md",
      large: "btn-lg",
    };

    const buttonClassName = cn(
      "btn",
      variants[variant],
      { "btn-active": active },
      states[state],
      { "btn-outline": outline },
      sizes[size],
      { "btn-wide": wide },
      { "btn-disabled": disabled },
      className
    );

    return <button className={buttonClassName} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
