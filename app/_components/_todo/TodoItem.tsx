import React from "react";
import Button from "./Button";

const TodoItem = (props: {
  id: number;
  task: string;
  onUpdate: Function;
  onDelete: Function;
}) => {
  const { id, task, onUpdate, onDelete } = props;

  return (
    <div role="alert" className="alert">
      <input
        type="checkbox"
        className="checkbox checkbox-xs checkbox-success"
      />
      <span>{task}</span>
      <div className="space-x-2">
        <Button color="green-200" type="" size="sm" func={() => onUpdate()}>
          Edit
        </Button>
        <Button color="red" type="" size="sm" func={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
