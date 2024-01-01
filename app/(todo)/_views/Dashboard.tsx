"use client";

import { getData } from "@/app/_supabase/get";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardMenu from "../_components/DashboardMenu";
import DashboardHero from "../_components/DashboardHero";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center">
      <DashboardMenu />
    </div>
  );
};

export default Dashboard;
