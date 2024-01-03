"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getData } from "@/app/_supabase/get";
import supabase from "@/app/_utils/supabase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const {
    data: user,
    isLoading: userLoading,
  }: { data: any; isLoading: boolean } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
    select: (data) => data.data.user,
  });

  if (!userLoading && !user) router.push("/auth/login");

  const { data: userData, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["userData"],
      queryFn: () => getData("user", "*", "id"),
      enabled: !userLoading,
      select: (data) =>
        data?.filter((userData: any) => userData.id === user.id).at(0),
    });

  console.log("userData: ", userData);

  if (isLoading || !userData)
    return (
      <div className="min-h-screen flex justify-center items-center animate-ping">
        Loading...
      </div>
    );

  if (!isLoading && userData.role !== "admin") router.push("/");

  return <>{children}</>;
};

export default ProtectedRoute;
