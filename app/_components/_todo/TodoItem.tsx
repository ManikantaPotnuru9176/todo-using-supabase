import React from "react";
import Button from "./Button";

const TodoItem = (props: {
  id: any;
  task: string;
  completed: boolean;
  onEdit: Function;
  onDelete: Function;
  onComplete: Function;
}) => {
  const { id, task, onEdit, completed, onDelete, onComplete } = props;

  return (
    <div role="alert" className={`alert ${completed ? "bg-green-200" : ""}`}>
      <input
        type="checkbox"
        className="checkbox checkbox-xs checkbox-success"
        checked={completed}
        onChange={() => onComplete(id, { completed: !completed })}
      />
      <span className={`${completed ? "line-through" : ""}`}>{task}</span>
      <div className={`space-x-2 ${completed ? "hidden" : ""}`}>
        <Button
          color="green-200"
          type=""
          size="sm"
          func={() => onEdit(id, task)}
        >
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
