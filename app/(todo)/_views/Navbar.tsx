/* eslint-disable @next/next/no-img-element */
"use client";

import { getData } from "@/app/_supabase/get";
import { updateData } from "@/app/_supabase/update";
import useTodoStore from "@/app/(todo)/_zustand/todoStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import supabase from "@/app/_utils/supabase";

const Navbar = () => {
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

  const { theme, setTheme } = useTodoStore();

  const queryClient = useQueryClient();

  const { data: themeData, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["theme"],
      queryFn: () => getData("theme", "*"),
    });

  if (themeData && themeData.length && themeData.at(0).theme !== theme) {
    setTheme(themeData.at(0).theme);
  }

  const updateMutation = useMutation({
    mutationFn: ({ updatedData }: { updatedData: object }) =>
      updateData("theme", updatedData, themeData?.at(0)?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theme"] });
    },
  });

  const updateTheme = (newData: object) => {
    const updatedData = { updatedData: newData };
    updateMutation.mutate(updatedData);
  };

  const handleChange = (payload: object) => {
    console.log("Change received!", payload);
    queryClient.invalidateQueries({ queryKey: ["theme"] });
  };

  supabase
    .channel("theme")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "theme" },
      handleChange
    )
    .subscribe();

  return (
    <div className="navbar bg-base-100 px-2 md:px-10 lg:px-28 sticky top-0 z-20 bg-opacity-80">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">TODO</a>
      </div>
      <div className="flex-none">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>{theme ? theme : "Select Theme"}</summary>
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
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          {/* <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
