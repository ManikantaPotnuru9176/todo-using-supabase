"use client";

import { getData } from "@/app/_supabase/get";
import { updateData } from "@/app/_supabase/update";
import useTodoStore from "@/app/(todo)/_zustand/todoStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import supabase from "@/app/_utils/supabase";
import { signOutUser } from "@/app/_supabase/_auth/signout";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";

const Navbar = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: user }: { data: any } = useQuery({
    queryKey: ["userData"],
    queryFn: () => supabase.auth.getUser(),
    select: (data) => data.data.user,
  });

  const handleChange = (payload: object) => {
    console.log("Change received!", payload);
    queryClient.invalidateQueries({ queryKey: ["theme"] });
  };

  const signOutMutation = useMutation({
    mutationFn: () => signOutUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      router.push("/auth/login");
    },
    onError: () => {
      console.log("Error while signout!");
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  user &&
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
        <a className="link link-hover text-2xl font-bold" href="/">
          TODO
        </a>
      </div>
      {user ? (
        <div className="flex-none">
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box min-w-52"
            >
              <li>
                <a className="justify-between">{user.email}</a>
              </li>
              <hr className="h-px my-1 bg-gray-200 border-0" />
              <li>
                <a className="justify-between" href="/dashboard/home">
                  Dashboard
                </a>
              </li>
              <hr className="h-px my-1 bg-gray-200 border-0" />
              {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
              <li>
                <a onClick={handleSignOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Button
            variant="neutral"
            className="w-24"
            onClick={() => router.push("/auth/login")}
          >
            LogIn
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
