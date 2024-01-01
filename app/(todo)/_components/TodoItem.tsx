import React from "react";
import { Button } from "@/app/_components/Button";

const TodoItem = (props: {
  id: any;
  task: string;
  completed: boolean;
  onEdit: Function;
  onDelete: Function;
  onComplete: Function;
  editButtonName: string;
  deleteButtonName: string;
}) => {
  const {
    id,
    task,
    onEdit,
    completed,
    onDelete,
    onComplete,
    editButtonName,
    deleteButtonName,
  } = props;

  return (
    <div role="alert" className={`alert ${completed ? "bg-warning" : ""}`}>
      <input
        type="checkbox"
        className="checkbox checkbox-xs checkbox-success"
        checked={completed}
        onChange={(e) => onComplete(e, id, { completed: !completed })}
      />
      <span>{task}</span>
      <div className={`space-x-2 ${completed ? "hidden" : ""}`}>
        <Button
          state="info"
          size="small"
          outline
          onClick={() => onEdit(id, task)}
        >
          {editButtonName}
        </Button>
        <Button state="error" size="small" onClick={() => onDelete(id)}>
          {deleteButtonName}
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
