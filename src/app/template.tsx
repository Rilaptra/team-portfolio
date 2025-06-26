"use client";
import { useEffect } from "react";
import { animatePageIn } from "@/utils/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <>
      <div
        id="banner-1"
        className="fixed top-0 left-0 z-[999999999] min-h-screen w-1/4 border-transparent bg-neutral-950 duration-[150] dark:bg-neutral-50"
      />
      <div
        id="banner-2"
        className="fixed top-0 left-1/4 z-[999999999] min-h-screen w-1/4 border-transparent bg-neutral-950 duration-[300] dark:bg-neutral-50"
      />
      <div
        id="banner-3"
        className="fixed top-0 left-2/4 z-[999999999] min-h-screen w-1/4 border-transparent bg-neutral-950 duration-[450] dark:bg-neutral-50"
      />
      <div
        id="banner-4"
        className="fixed top-0 left-3/4 z-[999999999] min-h-screen w-1/4 border-transparent bg-neutral-950 duration-[600] dark:bg-neutral-50"
      />
      {children}
    </>
  );
}
