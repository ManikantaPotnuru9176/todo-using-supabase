import Navbar from "../../_views/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <div className="grow">{children}</div>
    </div>
  );
}
