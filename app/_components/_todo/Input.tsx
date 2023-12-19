import React from "react";

const Input = (props: { onInputChange: Function }) => {
  const { onInputChange } = props;

  return (
    <input
      type="text"
      placeholder="Type task"
      className="input input-bordered w-full"
      onChange={(e) => onInputChange(e)}
    />
  );
};

export default Input;
