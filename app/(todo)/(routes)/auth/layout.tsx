import NavbarSimple from "../../_views/NavbarSimple";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <NavbarSimple />
      <div className="grow">{children}</div>
    </div>
  );
}
