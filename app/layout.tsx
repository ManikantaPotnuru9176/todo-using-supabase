import type { Metadata } from "next";
import "./globals.css";
import CustomThemeController from "./_providers/CustomThemeController";
import { ReactQueryProvider } from "./_utils/_todo/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo app using supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <CustomThemeController>{children}</CustomThemeController>
    </ReactQueryProvider>
  );
}
