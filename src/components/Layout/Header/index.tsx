"use client";

import { cn } from "@/lib/utils";
import { Button } from "../../Ui/button";
import { Moon, Sun, Menu, X } from "lucide-react"; // Import Menu dan X
import { animatePageOut } from "@/lib/animations";
import useTheme from "next-theme"; // Asumsi ini dari 'next-themes'
import { useEffect, useState } from "react";
import { getRandomBorderRadiusValue } from "@/lib/utils";
import { Globe } from "lucide-react"; // Ikon baru
import { useTranslations, useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Ui/dropdown-menu";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme(); // Sesuaikan dengan hook 'next-themes'

  const [mounted, setMounted] = useState(false);
  const [borderRadii, setBorderRadii] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu mobile

  const links = [
    {
      name: t("home"),
      href: "/",
      className: "from-purple-400 to-indigo-600", // Disesuaikan untuk Tailwind CSS
    },
    {
      name: t("about"),
      href: "/about",
      className: "from-amber-400 to-orange-600",
    },
    {
      name: t("contact"),
      href: "/contact",
      className: "from-teal-400 to-cyan-600",
    },
  ];

  const handleLocaleChange = (newLocale: string) => {
    // Ganti segmen locale di pathname
    router.push(pathname, { locale: newLocale });
  };

  const handleLinkClick = (href: string) => {
    setBorderRadii(getRandomBorderRadiusValue());
    setIsMenuOpen(false); // Tutup menu setelah link diklik

    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
    setBorderRadii(getRandomBorderRadiusValue());
  }, []);

  // Efek untuk mencegah scroll body saat menu mobile terbuka
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* 🍔 Navigasi Utama */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between p-4 md:justify-center">
        {/* Navigasi Desktop (Tengah) - Hilang di mobile */}
        <div className="absolute top-0 left-1/2 hidden -translate-x-1/2 md:block">
          <div className="absolute inset-0 rounded-b-full bg-gradient-to-b from-slate-200/80 to-transparent backdrop-blur-sm dark:from-neutral-800/50"></div>
          <ul className="text-onyx dark:text-offwhite relative z-10 flex max-h-11 justify-around gap-3 px-7 pt-2 pb-1 font-semibold transition-colors duration-300">
            {links.map((link) => (
              <li
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                style={{ borderRadius: borderRadii || "0" }}
                className={cn(
                  "px-3 py-1 transition-all duration-300 ease-in-out hover:cursor-pointer hover:rounded-xl md:bg-transparent md:bg-gradient-to-br",
                  pathname === link.href
                    ? `bg-black/5 dark:bg-white/10 ${link.className}`
                    : "from-transparent to-transparent",
                )}
              >
                <p className="font-normal select-none">{link.name}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontrol Kanan (Theme Toggle & Hamburger) */}
        <div className="absolute top-2 right-4 flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-auto rounded-full p-2 hover:cursor-pointer"
              >
                <span>
                  <Globe size={20} />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleLocaleChange("en")}
                disabled={locale == "en"}
                className="cursor-pointer"
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLocaleChange("id")}
                disabled={locale == "id"}
                className="cursor-pointer"
              >
                Indonesia
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLocaleChange("ar-PS")}
                disabled={locale == "ar-PS"}
                className="cursor-pointer"
              >
                Free Palestine
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLocaleChange("hi-IN")}
                disabled={locale == "hi-IN"}
                className="cursor-pointer"
              >
                India
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={toggleTheme}
            className="h-auto rounded-full p-2 hover:cursor-pointer"
          >
            {mounted && (
              <span>
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </span>
            )}
          </Button>

          {/* Tombol Hamburger - Hanya muncul di mobile */}
          <Button
            variant="outline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-auto rounded-full p-2 hover:cursor-pointer md:hidden"
          >
            <span>{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</span>
          </Button>
        </div>
      </nav>

      {/* 📱 Panel Menu Mobile */}
      <div
        className={cn(
          "fixed top-0 right-0 z-40 h-full w-64 bg-slate-100/80 backdrop-blur-lg transition-transform duration-500 ease-in-out md:hidden dark:bg-neutral-900/80",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-6">
          {links.map((link, index) => {
            const isActive = pathname === link.href; // Cek apakah link sedang aktif

            return (
              <li
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="group transform transition-all duration-300 ease-in-out" // Tambahkan 'group' di sini
                style={{
                  transitionDelay: `${index * 100 + 150}ms`,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(20px)",
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                <p
                  className={cn(
                    "cursor-pointer text-xl font-semibold transition-colors duration-200",
                    // Jika aktif, langsung terapkan gradien
                    isActive
                      ? `bg-gradient-to-br bg-clip-text text-transparent ${link.className}`
                      : // Jika tidak aktif, terapkan gradien hanya saat di-hover
                        `group-hover:bg-gradient-to-br group-hover:bg-clip-text group-hover:text-transparent ${link.className}`,
                  )}
                >
                  {link.name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Overlay saat menu mobile terbuka */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
