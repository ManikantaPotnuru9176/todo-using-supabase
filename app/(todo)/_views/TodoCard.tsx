import Input from "@/app/_components/_todo/Input";
import React from "react";

const TodoCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl items-center mt-4">
      <h2 className="card-title pt-2">Todo Using Supabase</h2>
      <div className="card-body flex-row px-2 py-6 md:p-10">
        <Input />
        <button className="btn btn-primary">Add Task</button>
      </div>
    </div>
  );
};

export default TodoCard;
