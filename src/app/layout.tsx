import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Square Cloud Blob",
  description: "A website created to simplify your experience with Square Cloud Blob."
} satisfies Metadata;

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " dark:bg-black dark:text-gray-200 min-h-screen flex flex-col items-center"}>
        <main className="flex-1 w-full max-w-[1200px] p-2">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
