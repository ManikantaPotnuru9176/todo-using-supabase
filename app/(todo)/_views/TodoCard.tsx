"use client";

import Button from "@/app/_components/_todo/Button";
import Input from "@/app/_components/_todo/Input";
import TodoItem from "@/app/_components/_todo/TodoItem";
import React from "react";

const TodoCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl items-center mt-4 min-w-fit">
      <h2 className="card-title pt-2">Todo Using Supabase</h2>
      <div className="card-body px-2 py-6 md:p-10 min-w-full max-w-2xl space-y-8">
        <div className="flex flex-row justify-between space-x-4">
          <Input />
          <Button color="neutral" type="outline" size="">
            Add Task
          </Button>
        </div>
        <div className="flex-col space-y-3">
          <TodoItem task="This is task 1" />
          <TodoItem task="This is task 2" />
          <TodoItem task="This is task 3" />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
