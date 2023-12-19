"use client";

import Button from "@/app/_components/_todo/Button";
import Input from "@/app/_components/_todo/Input";
import TodoItem from "@/app/_components/_todo/TodoItem";
import { getData } from "@/app/_supabase/_todo/get";
import { insertData } from "@/app/_supabase/_todo/insert";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const TodoCard = () => {
  const queryClient = useQueryClient();

  const [input, setInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["TodoData"],
    queryFn: () => getData("todos", "*"),
  });

  const mutation = useMutation((newTodo) => insertData("todos", newTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries(["TodoData"]);
    },
  });

  const addTodo = () => {
    mutation.mutate({ task: input, completed: false });
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="card bg-base-100 shadow-xl items-center mt-4 min-w-fit">
      <h2 className="card-title pt-2">Todo Using Supabase</h2>
      <div className="card-body px-2 py-6 md:p-10 min-w-full max-w-2xl space-y-8">
        <div className="flex flex-row justify-between space-x-4">
          <Input onInputChange={handleInputChange} />
          <Button color="neutral" type="outline" size="" func={addTodo}>
            Add Task
          </Button>
        </div>
        <div className="flex-col space-y-3">
          {data?.map((todo) => (
            <TodoItem key={todo.id} task={todo.task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
