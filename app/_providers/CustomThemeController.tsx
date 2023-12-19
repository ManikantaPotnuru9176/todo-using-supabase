"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function CustomThemeController({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = "light";

  return (
    <html lang="en" data-theme={theme}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
