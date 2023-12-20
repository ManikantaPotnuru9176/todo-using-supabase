"use client";

import Button from "@/app/_components/_todo/Button";
import Input from "@/app/_components/_todo/Input";
import TodoItem from "@/app/_components/_todo/TodoItem";
import { deleteData } from "@/app/_supabase/_todo/delete";
import { getData } from "@/app/_supabase/_todo/get";
import { insertData } from "@/app/_supabase/_todo/insert";
import { updateData } from "@/app/_supabase/_todo/update";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TodoCard = () => {
  const queryClient = useQueryClient();

  const [input, setInput] = useState("");
  const [updateInput, setUpdateInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(-1);

  const { data, isLoading } = useQuery({
    queryKey: ["TodoData"],
    queryFn: () => getData("todos", "*"),
  });

  const insertMutation = useMutation({
    mutationFn: (newTodo: { task: string; completed: boolean }) =>
      insertData("todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoData"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }: { id: number; updatedData: object }) =>
      updateData("todos", updatedData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoData"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteData("todos", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoData"] });
    },
  });

  const addTodo = () => {
    insertMutation.mutate({ task: input, completed: false });
    setInput("");
  };

  const updateTodo = (id: number, newData: object) => {
    const updatedData = { id, updatedData: newData };
    updateMutation.mutate(updatedData);
    setInput("");
    handleCancel();
  };

  const deleteTodo = (id: number) => {
    deleteMutation.mutate({ id });
    setInput("");
  };

  const handleInputChange = (e: { target: any }) => {
    setInput(e.target.value);
  };

  const handleUpadteInputChange = (e: { target: any }) => {
    setUpdateInput(e.target.value);
  };

  const handleEdit = (id: number, task: string) => {
    setIsEditMode(true);
    setEditId(id);
    setUpdateInput(task);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setUpdateInput("");
  };

  return (
    <div className="card bg-base-100 shadow-xl items-center mt-4 min-w-fit">
      <h2 className="card-title pt-2">Todo Using Supabase</h2>
      <div className="card-body px-2 py-6 md:p-10 min-w-full max-w-2xl space-y-8">
        <div className="flex flex-row justify-between space-x-4">
          <Input val={input} onInputChange={handleInputChange} />
          <Button color="neutral" type="outline" size="" func={addTodo}>
            Add Task
          </Button>
        </div>
        <div className="flex-col space-y-3">
          {data?.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              task={todo.task}
              completed={todo.completed}
              onEdit={handleEdit}
              onDelete={deleteTodo}
              onComplete={updateTodo}
            />
          ))}
        </div>
      </div>
      <dialog id="my_modal_5" open={isEditMode} className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit the data</h3>
          <Input val={updateInput} onInputChange={handleUpadteInputChange} />
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              <button
                className="btn"
                onClick={() => updateTodo(editId, { task: updateInput })}
              >
                Update
              </button>
              <button className="btn" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TodoCard;
