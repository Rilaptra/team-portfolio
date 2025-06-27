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
        className="fixed top-0 left-0 z-[999999999] h-1/4 min-w-screen border-transparent bg-neutral-950 dark:bg-neutral-50"
      />
      <div
        id="banner-2"
        className="fixed top-1/4 left-0 z-[999999999] h-1/4 min-w-screen border-transparent bg-neutral-950 dark:bg-neutral-50"
      />
      <div
        id="banner-3"
        className="fixed top-2/4 left-0 z-[999999999] h-1/4 min-w-screen border-transparent bg-neutral-950 dark:bg-neutral-50"
      />
      <div
        id="banner-4"
        className="fixed top-3/4 left-0 z-[999999999] h-1/4 min-w-screen border-transparent bg-neutral-950 dark:bg-neutral-50"
      />
      {children}
    </>
  );
}
