"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import TodoItem from "@/app/(todo)/_components/TodoItem";
import { deleteData } from "@/app/_supabase/delete";
import { getData } from "@/app/_supabase/get";
import { insertData } from "@/app/_supabase/insert";
import { updateData } from "@/app/_supabase/update";
import useTodoStore from "@/app/(todo)/_zustand/todoStore";
import supabase from "@/utils/supabase";

const TodoView = () => {
  const queryClient = useQueryClient();

  const {
    input,
    updateInput,
    isEditMode,
    editId,
    loading,
    setInput,
    setUpdateInput,
    setIsEditMode,
    setEditId,
    setLoading,
  } = useTodoStore();

  const { data: user }: { data: any } = useQuery({
    queryKey: ["userDataTodo"],
    queryFn: () => supabase.auth.getUser(),
    select: (data) => data.data.user,
  });

  const { data: todos, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["TodoData"],
      queryFn: () => getData("todos", "*"),
    });

  const insertMutation = useMutation({
    mutationFn: (newTodo: {
      task: string;
      completed: boolean;
      user_id: string;
    }) => insertData("todos", newTodo),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoData"] });
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }: { id: number; updatedData: object }) =>
      updateData("todos", updatedData, id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoData"] });
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteData("todos", id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoData"] });
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    insertMutation.mutate({ task: input, completed: false, user_id: user.id });
    setInput("");
  };

  const updateTodo = (e: React.FormEvent, id: number, newData: object) => {
    e.preventDefault();
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
    setEditId(-1);
  };

  const handleChange = (payload: object) => {
    console.log("Change received!", payload);
    queryClient.invalidateQueries({ queryKey: ["TodoData"] });
  };

  const subscription =
    user &&
    supabase
      .channel("todos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        handleChange
      )
      .subscribe();

  return (
    <div className="card bg-base-100 shadow-xl items-center mt-4 min-w-fit">
      <h2 className="card-title pt-2">Todo Using Supabase</h2>
      <div
        className={`card-body px-2 py-6 md:p-10 min-w-full max-w-2xl space-y-8 ${
          isEditMode && "blur-sm"
        }`}
      >
        <form
          className="flex flex-row justify-between space-x-4"
          onSubmit={addTodo}
        >
          <Input
            variant="neutral"
            placeholder="Enter task"
            bordered
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="neutral" size="medium" outline>
            Add Task
          </Button>
        </form>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-bars loading-lg my-16" />
          </div>
        ) : (
          <div className="flex-col space-y-3">
            {todos?.map(
              (todo: {
                id: React.Key | null | undefined;
                task: string;
                completed: boolean;
              }) =>
                loading && todo.id === editId ? (
                  // eslint-disable-next-line react/jsx-key
                  <div className="flex justify-center">
                    <span className="loading loading-dots loading-lg my-3" />
                  </div>
                ) : (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    task={todo.task}
                    completed={todo.completed}
                    onEdit={handleEdit}
                    onDelete={deleteTodo}
                    onComplete={updateTodo}
                  />
                )
            )}
          </div>
        )}
      </div>
      <dialog id="my_modal_5" open={isEditMode} className="modal modal-middle">
        <div className="modal-box">
          <form
            method="dialog"
            onSubmit={(e) => updateTodo(e, editId, { task: updateInput })}
          >
            <h3 className="font-bold text-lg">Edit the data</h3>
            <Input
              variant="neutral"
              placeholder="Enter task"
              bordered
              value={updateInput}
              onChange={handleUpadteInputChange}
            />
            <div className="modal-action">
              <Button
                type="button"
                state="error"
                outline
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button type="submit" state="success">
                Update
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TodoView;
