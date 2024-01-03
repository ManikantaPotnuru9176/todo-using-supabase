import { getData } from "@/app/_supabase/get";
import supabase from "@/app/_utils/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProtectedNav = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading: userLoading,
  }: { data: any; isLoading: boolean } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
    select: (data) => data.data.user,
  });

  const { data: userData, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["userData", "userProtectedNav"],
      queryFn: () => getData("user", "*", "id"),
      select: (data) =>
        data?.filter((userData: any) => userData.id === user.id).at(0),
    });
  console.log("userData - nav: ", userData);

  if (!isLoading && userData && userData.role && userData.role !== "admin")
    return null;

  return <>{children}</>;
};

export default ProtectedNav;
