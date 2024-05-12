import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Square Cloud Blob",
  description: "A website created to simplify your experience with blob."
} satisfies Metadata;

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " dark:bg-black dark:text-gray-200 h-screen flex justify-center"}>
        <main className="w-full max-w-[1200px] p-2">
          {children}
        </main>
      </body>
    </html>
  );
}
