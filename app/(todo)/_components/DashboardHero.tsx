"use client";

import React from "react";
import useTodoStore from "../_zustand/todoStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateData } from "@/app/_supabase/update";

const DashboardHero = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const queryClient = useQueryClient();

  const { theme } = useTodoStore();

  const updateMutation = useMutation({
    mutationFn: ({ updatedData }: { updatedData: object }) =>
      updateData("theme", updatedData, "id", 10),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theme"] });
    },
  });

  const updateTheme = (newData: object) => {
    const updatedData = { updatedData: newData };
    updateMutation.mutate(updatedData);
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 flex-row justify-center items-center">
      <h1 className="text-xl font-bold">Change Theme: </h1>
      <ul className="menu menu-horizontal px-1 w-12">
        <li>
          <details>
            <summary>{theme}</summary>
            <ul className="p-2 bg-base-100 rounded-t-none max-h-[50vh] overflow-x-hidden overflow-y-auto z-30">
              {themes.map((theme, index) => (
                <li key={index}>
                  <a onClick={() => updateTheme({ theme })}>{theme}</a>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default DashboardHero;
