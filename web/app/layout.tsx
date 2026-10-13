import type { Metadata } from "next";
import "./globals.css";
import "./styles/auth.css";
import "./styles/layout.css";
import "./styles/attendance.css";

export const metadata: Metadata = {
  title: "Attendance Management",
  description: "Attendance Management System"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
