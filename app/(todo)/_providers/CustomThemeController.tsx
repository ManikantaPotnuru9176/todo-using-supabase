"use client";

import { useQuery } from "@tanstack/react-query";
import useTodoStore from "../_zustand/todoStore";
import { getData } from "@/app/_supabase/get";

export default function CustomThemeController({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTodoStore();

  const { data: themeData, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["theme"],
      queryFn: () => getData("theme", "*", "id"),
      staleTime: Infinity,
    });

  if (themeData && themeData.length && themeData.at(0).theme !== theme) {
    setTheme(themeData.at(0).theme);
  }

  return (
    <html lang="en" data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
