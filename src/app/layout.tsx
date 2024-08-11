import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SorobanProvider from "@/components/SorobanProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soroban Demo - Next.js",
  description: "Soroban Demo - Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SorobanProvider>{children}</SorobanProvider>
      </body>
    </html>
  );
}
