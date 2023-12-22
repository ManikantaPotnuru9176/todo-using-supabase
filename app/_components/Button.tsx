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
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClassNames = {
      default: "btn-primary",
      destructive: "btn-destructive",
      outline: "btn-neutral btn-outline",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      link: "btn-link",
    };

    const sizeClassNames = {
      default: "btn-md",
      xs: "btn-xs",
      sm: "btn-sm",
      lg: "btn-lg",
      icon: "h-10 w-10",
    };

    const buttonClassName = cn(
      "btn",
      variantClassNames[variant],
      sizeClassNames[size],
      className
    );

    return <button className={buttonClassName} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
