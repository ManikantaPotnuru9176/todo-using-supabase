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
    <div className="flex flex-col justify-center items-center space-y-6 w-full mb-40">
      <div className="card shrink-0 w-full max-w-sm shadow-md bg-base-100 flex-row justify-center items-center">
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
      <div className="card shrink-0 shadow-md bg-base-100 flex-row justify-center items-center rounded-lg">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>User Uid</th>
                <th>Created</th>
                <th>Last Sign In</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">Manikanta</div>
                      <div className="text-sm opacity-50">
                        manikantapotnuru9176@gmail.com
                      </div>
                    </div>
                  </div>
                </td>
                <td>04f55a47-d094-43d0-a1d3-e99da5de282d</td>
                <td>28 Dec, 2023 16:56</td>
                <td>01 Jan, 2024 23:18</td>
                <td>
                  <span className="badge badge-info badge-lg badge-outline text-xs">
                    user
                  </span>
                </td>
                <th>
                  <button className="btn btn-outline btn-error btn-xs  rounded-md">
                    Remove admin access
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
