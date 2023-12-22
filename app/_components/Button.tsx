import React from "react";
import { cn } from "../_utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={cn("btn", className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
