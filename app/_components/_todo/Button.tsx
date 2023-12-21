import React from "react";

const Button = (props: {
  color: string;
  type: string;
  size: string;
  func: Function;
  children: React.ReactNode;
}) => {
  const { color, type, size, func, children } = props;

  return (
    <button className={`btn ${size} ${type} ${color}`} onClick={() => func()}>
      {children}
    </button>
  );
};

export default Button;
