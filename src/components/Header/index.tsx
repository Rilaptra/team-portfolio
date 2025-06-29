"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../Ui/button";
import { Moon, Sun } from "lucide-react";
import { animatePageOut } from "@/lib/animations";
import useTheme from "next-theme";
import { useEffect, useState } from "react";
import { getRandomBorderRadiusValue } from "@/lib/utils";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
export default function Header() {
  const router = useRouter();
  const params = usePathname();
  const { theme, toggle } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [borderRadii, setBorderRadii] = useState<string | null>(null);

  const handleClick = (href: string) => {
    setBorderRadii(getRandomBorderRadiusValue());

    if (params !== href) {
      animatePageOut(href, router);
    }
  };

  useEffect(() => {
    setMounted(true);
    setBorderRadii(getRandomBorderRadiusValue());
  }, []);
  return (
    <nav className="fixed z-[99999] flex w-full">
      <div className="mt-2 ml-4 flex flex-col gap-y-2"></div>

      {/* Kontainer Utama untuk Navigasi */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <div className="absolute inset-0 rounded-b-full bg-gradient-to-b from-slate-200/80 to-transparent backdrop-blur-xs dark:from-neutral-700/50"></div>

        <ul className="text-onyx dark:text-offwhite relative z-10 flex max-h-11 justify-around gap-3 px-7 pt-2 pb-1 font-semibold transition-colors duration-300">
          {links.map((link) => (
            <li
              key={link.name}
              onClick={() => handleClick(link.href)}
              style={{ borderRadius: borderRadii || "0" }}
              className={cn(
                "px-3 py-1 transition-all duration-300 ease-in-out hover:cursor-pointer hover:rounded-xl",
                params === link.href ? "bg-black/5 dark:bg-white/10" : "",
              )}
            >
              <p className="font-normal select-none">{link.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Theme & Hamburger Menu (Mobile) */}
      <div className="absolute top-2 right-4">
        <Button
          variant="outline"
          onClick={toggle}
          className="h-auto rounded-full p-2 hover:cursor-pointer"
        >
          {mounted && <span>{theme === "light" ? <Moon /> : <Sun />}</span>}
        </Button>
      </div>
    </nav>
  );
}
