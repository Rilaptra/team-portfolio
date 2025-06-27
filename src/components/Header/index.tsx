"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../Ui/button";
import { Moon, Sun } from "lucide-react";
import { animatePageOut } from "@/utils/animations";
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
    <nav className="fixed z-[99999] flex w-full justify-between">
      <div className="mt-2 ml-4 flex flex-col gap-y-2">
        {/* <h4>website</h4>
        <h4>developer</h4> */}
      </div>

      {/* Navigation Route */}
      <ul className="text-onyx dark:text-offwhite flex justify-around gap-3 rounded-b-full bg-gradient-to-b from-slate-200 to-transparent px-7 pt-2 pb-1 font-semibold transition-colors duration-300 dark:from-neutral-600/25">
        {links.map((link) => (
          <li
            key={link.name}
            onClick={() => handleClick(link.href)}
            style={{ borderRadius: borderRadii || "0" }}
            className={cn(
              "px-3 py-1 transition-all duration-300 ease-in-out hover:cursor-pointer hover:rounded-xl",
              params === link.href
                ? "bg-[#76ABAE]/10 dark:bg-[#76ABAE]/10"
                : "",
            )}
          >
            <p className="font-normal select-none">{link.name}</p>
          </li>
        ))}
      </ul>

      {/* Toggle Theme & Hamburger Menu (Mobile) */}
      <div className="mt-2 mr-4">
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
