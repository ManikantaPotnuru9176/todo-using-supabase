// import React from "react";

// const Input = (props: { val: string; onInputChange: Function }) => {
//   const { val, onInputChange } = props;

//   return (
//     <input
//       type="text"
//       placeholder="Type task"
//       className="input input-bordered w-full"
//       value={val}
//       onChange={(e) => onInputChange(e)}
//     />
//   );
// };

// export default Input;

//-------------------------------------------------------------------------------------

import * as React from "react";
import { cn } from "../_utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?:
    | "default"
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "info"
    | "success"
    | "warning"
    | "error";
  bordered?: boolean;
  inputSize?: "default" | "extrasmall" | "small" | "medium" | "large";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      bordered = false,
      inputSize = "default",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "w-full max-w-xs",
      neutral: "input-neutral",
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      ghost: "input-ghost",
      info: "input-info",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
    };

    const sizes = {
      default: "input-md",
      extrasmall: "input-xs",
      small: "input-sm",
      medium: "input-md",
      large: "input-lg",
    };

    const inputClassName = cn(
      "input w-full",
      variants[variant],
      { "input-bordered": bordered },
      sizes[inputSize],
      className
    );

    return <input className={inputClassName} ref={ref} {...props} />;
  }
);

Input.displayName = "Input";

export { Input };
