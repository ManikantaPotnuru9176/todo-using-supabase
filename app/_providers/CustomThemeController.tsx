"use client";

export default function CustomThemeController({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = "night";

  return (
    <html lang="en" data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
