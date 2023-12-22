"use client";

import useTodoStore from "../(todo)/_zustand/todoStore";

export default function CustomThemeController({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTodoStore();

  return (
    <html lang="en" data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
