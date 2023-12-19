import React from "react";

const Button = (props: {
  color: string;
  type: string;
  size: string;
  children: React.ReactNode;
}) => {
  const { color, type, size, children } = props;

  return (
    <button className={`btn btn-${size} btn-${type} btn-${color}`}>
      {children}
    </button>
  );
};

export default Button;
