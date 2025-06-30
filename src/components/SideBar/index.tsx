// components/SideBar.tsx (file yang sudah kamu punya)
import { NavItem } from "@/lib/types";
import TreeItem from "./TreeItem";
import ErrorBoundary from "../Utils/ErrorBoundary";
import { useEffect, useState } from "react";

// Taruh data navItems di sini (seperti dari langkah 1)
const navItems: NavItem[] = [
  {
    title: "Welcome",
    href: "#hero",
  },
  {
    title: "About Us",
    href: "#aboutUs",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Why Choose Us",
    href: "#whyChooseUs",
  },
];

export default function SideBar() {
  const [items, setItems] = useState(navItems);
  useEffect(() => {}, []);
  return (
    <ErrorBoundary>
      <div className="fixed top-[50%] left-4 z-[999] hidden w-auto max-w-xs -translate-y-[50%] flex-col rounded-xl bg-gradient-to-br from-slate-200/80 to-transparent p-5 backdrop-blur-xs lg:flex 2xl:left-[calc((100vw-1536px)/2+16px)] dark:from-neutral-600/20">
        <h1 className="dark:text-offwhite text-onyx mb-2 text-lg font-thin tracking-wide">
          What's on this page?
        </h1>
        <div className="flex flex-col">
          {navItems.map((item, index) => (
            <TreeItem key={index} item={item} prefix="" />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}
