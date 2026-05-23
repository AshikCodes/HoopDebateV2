import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HoopDebate",
  description: "NBA debates — pick a side",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-zinc-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
