import React from "react";
import Button from "../../_components/Button";

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
    <div role="alert" className={`alert ${completed ? "bg-warning" : ""}`}>
      <input
        type="checkbox"
        className="checkbox checkbox-xs checkbox-success"
        checked={completed}
        onChange={() => onComplete(id, { completed: !completed })}
      />
      <span>{task}</span>
      <div className={`space-x-2 ${completed ? "hidden" : ""}`}>
        <Button className="btn-accent btn-sm" onClick={() => onEdit(id, task)}>
          Edit
        </Button>
        <Button className="btn-error btn-sm" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
