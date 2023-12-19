import React from "react";
import Button from "./Button";

const TodoItem = (props: { task: string }) => {
  const { task } = props;

  return (
    <div role="alert" className="alert">
      <input
        type="checkbox"
        className="checkbox checkbox-xs checkbox-success"
      />
      <span>{task}</span>
      <div className="space-x-2">
        <Button color="green-200" type="" size="sm">
          Edit
        </Button>
        <Button color="red" type="" size="sm">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
