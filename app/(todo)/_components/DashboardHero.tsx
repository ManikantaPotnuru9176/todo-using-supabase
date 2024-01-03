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

  const updateThemeMutation = useMutation({
    mutationFn: ({ updatedData }: { updatedData: object }) =>
      updateData("theme", updatedData, "id", 10),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theme"] });
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ id, updatedData }: { id: string; updatedData: object }) =>
      updateData("user", updatedData, "id", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersRole"] });
      queryClient.invalidateQueries({ queryKey: ["userDataProtectedRoute"] });
    },
  });

  const updateTheme = (newData: object) => {
    const updatedData = { updatedData: newData };
    updateThemeMutation.mutate(updatedData);
  };

  const updateUserRole = (id: string, newData: object) => {
    const updatedData = { id, updatedData: newData };
    updateUserRoleMutation.mutate(updatedData);
  };

  const revokeAdminAccess = (userId: string) => {
    const isCurrentUser = userId === userData.id;
    const confirmationMessage = isCurrentUser
      ? "Are you sure you want to revoke your admin access?\nThis action will make the dashboard unavailable for you."
      : "Are you sure you want to revoke admin access for this user?\nThis action will make the dashboard unavailable for the user.";

    const confirmation = window.confirm(confirmationMessage);

    if (confirmation) {
      updateUserRole(userId, { role: "user" });

      if (isCurrentUser) {
        alert(
          "Your admin access has been revoked. The dashboard will not be available."
        );
      } else {
        alert(
          "Admin access revoked for the user. The dashboard will not be available."
        );
      }
    }
  };

  const grantAdminAccess = (userId: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to grant admin access?\nThis action will provide admin privileges to the user."
    );

    if (confirmation) {
      updateUserRole(userId, { role: "admin" });
      alert("Admin access granted.");
    }
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
                      {role === "admin" ? (
                        <button
                          className="btn btn-outline btn-xs  rounded-md btn-error"
                          onClick={() => revokeAdminAccess(user.id)}
                        >
                          Revoke admin access
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline btn-xs  rounded-md btn-success"
                          onClick={() => grantAdminAccess(user.id)}
                        >
                          Grant admin access
                        </button>
                      )}
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
