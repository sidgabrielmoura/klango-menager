import type { Metadata } from "next";
import { Nunito } from "next/font/google"
import "./globals.css";
import { Input } from "@/components/ui/input";
import { LuSunDim } from "react-icons/lu";
import { Navbar } from "@/components/navbar";
import { VerticalNav } from "@/components/verticalNav";
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Klango menager",
  description: "",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return (
    <html lang="en">
      <body
        className={`${nunito.style} antialiased bg-zinc-200 dark:bg-zinc-900 flex`}
      >
        <VerticalNav/>
        <section className="w-full h-screen">
          <Navbar/> 
          {children}
        </section>
      </body>
    </html>
  );
}
