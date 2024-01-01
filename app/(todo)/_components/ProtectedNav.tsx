import { getData } from "@/app/_supabase/get";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProtectedNav = ({ children }: { children: React.ReactNode }) => {
  const { data: userData, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["userData", "userProtectedNav"],
      queryFn: () => getData("user", "*"),
      select: (data) => data?.at(0),
    });

  if (!isLoading && userData.role !== "admin") return null;

  return <>{children}</>;
};

export default ProtectedNav;
