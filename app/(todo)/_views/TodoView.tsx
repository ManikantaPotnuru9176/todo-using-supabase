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
import supabase from "@/app/_utils/supabase";
import { cn } from "@/app/_utils/cn";
import { useRouter } from "next/navigation";

const TodoView = ({ edit }: { edit: boolean }) => {
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

  const [dummyEdit, setDummyEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [todoHeroData, setTodoHeroData] = useState({
    title: "",
    update_dialog_title: "",
    input_placeholder: "",
    update_input_placeholder: "",
    add_button_name: "",
    edit_button_name: "",
    delete_button_name: "",
    cancel_button_name: "",
    update_button_name: "",
  });

  const { data: user }: { data: any } = useQuery({
    queryKey: ["userDataTodo"],
    queryFn: () => supabase.auth.getUser(),
    select: (data) => data.data.user,
  });

  const { data: todos, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["TodoData"],
      queryFn: () => getData("todos", "*", "id"),
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
      updateData("todos", updatedData, "id", id),
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
    if (!user) {
      const confirmation = window.confirm(
        "You are not logged in. To access all features, please log in."
      );

      if (confirmation) router.push("/auth/login");

      return;
    }
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

  const dummyFun = () => {};

  const { data: todoHero }: { data: any } = useQuery({
    queryKey: ["TodoHero"],
    queryFn: () => getData("todo_hero", "*", "id"),
    select: (data) => data?.at(0),
  });

  const updateHeroMutation = useMutation({
    mutationFn: ({ id, updatedData }: { id: number; updatedData: object }) =>
      updateData("todo_hero", updatedData, "hero_id", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TodoHero"] });
      setTodoHeroData({
        title: "",
        update_dialog_title: "",
        input_placeholder: "",
        update_input_placeholder: "",
        add_button_name: "",
        edit_button_name: "",
        delete_button_name: "",
        cancel_button_name: "",
        update_button_name: "",
      });
      setOpen(false);
    },
  });

  const updateTodoHero = (e: React.FormEvent, id: number, newData: object) => {
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(newData).filter(([key, value]) => value.trim() !== "")
    );
    const updatedData = { id, updatedData: filteredData };
    updateHeroMutation.mutate(updatedData);
  };

  const handleInputsChange = (field: string, value: string) => {
    setTodoHeroData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return edit ? (
    <>
      <div
        className={`card relative bg-base-100 shadow-xl items-center mt-4 min-w-fit ${
          open && "blur-sm"
        }`}
      >
        <div className="flex-none absolute -top-2 -right-4 z-40">
          <Button
            variant="primary"
            size="extrasmall"
            className="w-12"
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
        </div>
        <h2 className="card-title pt-2">{todoHero?.title}</h2>
        <div
          className={`card-body px-2 py-6 md:p-10 min-w-full max-w-2xl space-y-8 ${
            open && ""
          }`}
        >
          <form
            className="flex flex-row justify-between space-x-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              variant="neutral"
              placeholder={todoHero?.input_placeholder}
              bordered
            />
            <Button type="submit" variant="neutral" size="medium" outline>
              {todoHero?.add_button_name}
            </Button>
          </form>

          <div className="flex-col space-y-3">
            <TodoItem
              id={1}
              task="Test1"
              completed={false}
              onEdit={() => setDummyEdit(true)}
              onDelete={dummyFun}
              onComplete={dummyFun}
              editButtonName={todoHero?.edit_button_name}
              deleteButtonName={todoHero?.delete_button_name}
            />
            <TodoItem
              id={2}
              task="Test2"
              completed={false}
              onEdit={dummyFun}
              onDelete={dummyFun}
              onComplete={dummyFun}
              editButtonName={todoHero?.edit_button_name}
              deleteButtonName={todoHero?.delete_button_name}
            />
          </div>
        </div>
        <dialog id="my_modal_5" open={dummyEdit} className="modal modal-middle">
          <div className="modal-box">
            <form method="dialog" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-bold text-lg">
                {todoHero?.update_dialog_title}
              </h3>
              <Input
                variant="neutral"
                placeholder={todoHero?.update_input_placeholder}
                bordered
              />
              <div className="modal-action">
                <Button
                  type="button"
                  state="error"
                  outline
                  onClick={() => setDummyEdit(false)}
                >
                  {todoHero?.cancel_button_name}
                </Button>
                <Button type="button" state="success">
                  {todoHero?.update_button_name}
                </Button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <dialog id="my_modal_4" open={open} className="modal">
        <div className="modal-box w-6/12 max-w-md">
          <h3 className="font-bold text-lg">Edit the Todo Hero Data</h3>

          <div className="flex flex-col space-y-3">
            {todoHero &&
              todoHero.metadata &&
              Object.entries(todoHero.metadata).map(
                ([field, val], index: number) => (
                  <Input
                    key={index}
                    bordered
                    placeholder={cn("Enter ", field.replace(/_/g, " "))}
                    value={todoHeroData[field as keyof typeof todoHeroData]}
                    onChange={(e) => handleInputsChange(field, e.target.value)}
                  />
                )
              )}
          </div>

          <div className="modal-action">
            <form
              method="dialog"
              onSubmit={(e) => updateTodoHero(e, 1, todoHeroData)}
            >
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>

              <Button type="submit" state="success" outline>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  ) : (
    <div className="card bg-base-100 shadow-xl items-center mt-4 min-w-fit">
      <h2 className="card-title pt-2">{todoHero?.title}</h2>
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
            placeholder={todoHero?.input_placeholder}
            bordered
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="neutral" size="medium" outline>
            {todoHero?.add_button_name}
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
                    editButtonName={todoHero?.edit_button_name}
                    deleteButtonName={todoHero?.delete_button_name}
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
                {todoHero?.cancel_button_name}
              </Button>
              <Button type="submit" state="success">
                {todoHero?.update_button_name}
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TodoView;
