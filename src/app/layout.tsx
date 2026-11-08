import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STAMS",
  description: "Summer Training Automated Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}