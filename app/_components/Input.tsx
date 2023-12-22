import React from "react";

const Input = (props: { val: string; onInputChange: Function }) => {
  const { val, onInputChange } = props;

  return (
    <input
      type="text"
      placeholder="Type task"
      className="input input-bordered w-full"
      value={val}
      onChange={(e) => onInputChange(e)}
    />
  );
};

export default Input;
