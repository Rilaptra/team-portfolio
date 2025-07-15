// src/components/Layout/Footer/index.tsx
import React from "react";
import { Link } from "@/i18n/navigation";
import Logo from "../../icons/Logo";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const websiteLinks = [
    { label: t("nav.website.links.home"), href: "/" },
    { label: t("nav.website.links.about"), href: "/about" },
    { label: t("nav.website.links.contact"), href: "/contact" },
  ];

  const serviceLinks = [
    t("nav.services.links.development"),
    t("nav.services.links.seo"),
    t("nav.services.links.design"),
    t("nav.services.links.maintenance"),
    t("nav.services.links.security"),
  ];

  const supportLinks = [
    t("nav.support.links.help"),
    t("nav.support.links.docs"),
    t("nav.support.links.status"),
  ];

  const legalLinks = [t("nav.legal.links.privacy"), t("nav.legal.links.terms")];

  return (
    <footer className="bg-transparent text-neutral-700 dark:text-white">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="lg:flex lg:justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={28} />
              <span className="text-xl font-bold">ShareProject</span>
            </Link>
            <p className="mt-4 max-w-xs text-neutral-400">{t("tagline")}</p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:mt-0 lg:gap-16">
            {/* Website Links */}
            <div className="text-sm">
              <p className="font-bold">{t("nav.website.title")}</p>
              <nav className="mt-4 space-y-2">
                {websiteLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Service Links */}
            <div className="text-sm">
              <p className="font-bold">{t("nav.services.title")}</p>
              <nav className="mt-4 space-y-2">
                {serviceLinks.map((label) => (
                  <div
                    key={label}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {label}
                  </div>
                ))}
              </nav>
            </div>

            {/* Support Links */}
            <div className="text-sm">
              <p className="font-bold">{t("nav.support.title")}</p>
              <nav className="mt-4 space-y-2">
                {supportLinks.map((label) => (
                  <div
                    key={label}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {label}
                  </div>
                ))}
              </nav>
            </div>

            {/* Legal Links */}
            <div className="text-sm">
              <p className="font-bold">{t("nav.legal.title")}</p>
              <nav className="mt-4 space-y-2">
                {legalLinks.map((label) => (
                  <div
                    key={label}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {label}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <hr className="my-8 border-neutral-800" />

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
