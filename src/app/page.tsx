'use client'
import { Dashboard } from "@/components/dashboard";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, [])

  return (
    <>
      <Dashboard/>
    </>
  );
}
