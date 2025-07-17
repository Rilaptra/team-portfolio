"use client";
import { useEffect } from "react";
import { animatePageIn } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // nah masalahnya, kenapa childrennya belum selesai di load tapi chatbot ai nya udah spawn duluan
    // masalahnya gaada masalahnya :v 
    // masalahnya simple ngab kek yang dibilang riski 
    animatePageIn(); 
  }, []);

  return (
    <div className="overflow-hidden relative">
      {/* Banner swipe overlays */}
      <div
        id="banner-1"
        className="fixed top-0 left-0 z-[999999999] h-1/4 w-full bg-neutral-950 dark:bg-neutral-50"
      />
      <div
        id="banner-2"
        className="fixed top-1/4 left-0 z-[999999999] h-1/4 w-full bg-neutral-950 dark:bg-neutral-50"
      />
      <div
        id="banner-3"
        className="fixed top-2/4 left-0 z-[999999999] h-1/4 w-full bg-neutral-950 dark:bg-neutral-50"
      />
      <div
        id="banner-4"
        className="fixed top-3/4 left-0 z-[999999999] h-1/4 w-full bg-neutral-950 dark:bg-neutral-50"
      />

      <div id="page-wrapper" className="opacity-0 transition-all duration-1000">
        {children}
      </div>
    </div>
  );
}
