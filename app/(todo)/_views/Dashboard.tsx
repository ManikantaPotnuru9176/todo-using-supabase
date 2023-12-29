"use client";

import { getData } from "@/app/_supabase/get";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardMenu from "../_components/DashboardMenu";
import DashboardHero from "../_components/DashboardHero";

const Dashboard = () => {
  const { data: user, isLoading }: { data: any; isLoading: boolean } = useQuery(
    {
      queryKey: ["userData"],
      queryFn: () => getData("user", "*"),
      select: (data) => data?.at(0),
    }
  );

  const router = useRouter();

  if (isLoading || !user)
    return (
      <div className="min-h-screen flex justify-center items-center animate-ping">
        Loading...
      </div>
    );

  if (!isLoading && user.role !== "admin") router.push("/");

  return (
    <div className="flex flex-col items-center">
      <DashboardMenu />
    </div>
  );
};

export default Dashboard;
