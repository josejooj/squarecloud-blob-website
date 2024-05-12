import { ThemeProvider } from 'next-themes';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
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
      <body className={inter.className + "light:bg-white min-h-screen flex flex-col items-center"}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main className="flex-1 w-full max-w-[1200px] p-2">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
