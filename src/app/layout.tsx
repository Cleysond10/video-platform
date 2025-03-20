import type { Metadata } from "next";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VEx Platform",
  description: "A new video experience streaming platform built with Next.js 15 and React Query.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
