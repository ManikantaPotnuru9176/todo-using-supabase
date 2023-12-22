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
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClassNames = {
      default: "btn btn-primary btn-solid btn-md",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "btn btn-neutral btn-outline btn-md",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizeClassNames = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const buttonClassName = cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variantClassNames[variant],
      sizeClassNames[size],
      className
    );

    return <button className={buttonClassName} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
