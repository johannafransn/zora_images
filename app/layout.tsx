import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import { Header } from "@/components";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray"}>
        <Header />
        {children}
      </body>
    </html>
  );
}
