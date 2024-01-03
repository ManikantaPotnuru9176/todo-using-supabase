"use client";

import React, { useEffect } from "react";
import useTodoStore from "../_zustand/todoStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateData } from "@/app/_supabase/update";
import supabase from "@/app/_utils/supabase";
import supabaseAdmin from "@/app/_utils/supabaseAdmin";
import { getData } from "@/app/_supabase/get";
import { cn } from "@/app/_utils/cn";

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

  const { data: userData }: { data: any } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
    select: (data) => data.data.user,
  });

  const { data: usersList }: { data: any } = useQuery({
    queryKey: ["usersList"],
    queryFn: () => supabaseAdmin.auth.admin.listUsers(),
    select: (data) => data.data.users,
  });

  const { data: usersRole }: { data: any } = useQuery({
    queryKey: ["usersRole"],
    queryFn: () => getData("user", "*", "created_at"),
  });

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
            <thead>
              <tr>
                <th>Email</th>
                <th>User Id</th>
                <th>Last Sign In</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((user: any) => {
                const role = usersRole
                  ?.filter((ur: any) => ur.id === user.id)
                  .at(0).role;

                return (
                  <tr key={user.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold">
                            {user?.email}
                            <span
                              className={cn(
                                "badge badge-secondary badge-outline ml-2",
                                { hidden: user.id !== userData.id }
                              )}
                            >
                              You
                            </span>
                          </div>
                          {/* <div className="text-sm opacity-50">
                              {user?.email}
                            </div> */}
                        </div>
                      </div>
                    </td>
                    <td>{user?.id}</td>
                    <td>{user?.last_sign_in_at}</td>
                    <td>
                      <span
                        className={cn(
                          "badge badge-lg text-xs",
                          { "badge-info badge-outline": role === "user" },
                          { "badge-accent": role === "admin" }
                        )}
                      >
                        {role}
                      </span>
                    </td>
                    <th>
                      <button
                        className={cn(
                          "btn btn-outline btn-xs  rounded-md",
                          {
                            "btn-error": role === "admin",
                          },
                          { "btn-success": role === "user" }
                        )}
                      >
                        {role === "admin"
                          ? "Remove admin access"
                          : "Grant admin access"}
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
