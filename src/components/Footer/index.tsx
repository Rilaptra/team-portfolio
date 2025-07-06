import React from "react";
import Link from "next/link";
import { Code, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "../icons/Logo";

type NavLink = {
  label: string;
};

const companyLinks: NavLink[] = [
  { label: "Tentang Kami" },
  { label: "Karir" },
  { label: "Blog" },
];

const serviceLinks: NavLink[] = [
  { label: "Website Development" },
  { label: "SEO Optimization" },
  { label: "UI/UX Design" },
  { label: "Website Maintenance" },
  { label: "Website Security" },
];

const supportLinks: NavLink[] = [
  { label: "Pusat Bantuan" },
  { label: "Dokumentasi" },
  { label: "Status Layanan" },
];

const legalLinks: NavLink[] = [
  { label: "Kebijakan Privasi" },
  { label: "Syarat & Ketentuan" },
];

const socialLinks: NavLink[] = [
  { label: "Facebook" },
  { label: "Twitter" },
  { label: "Instagram" },
  { label: "LinkedIn" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent text-neutral-700 dark:text-white">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="lg:flex lg:justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={28} />
              {/* <Code size={28} className="text-blue-400" /> */}
              <span className="text-xl font-bold">ShareProject</span>
            </Link>
            <p className="mt-4 max-w-xs text-neutral-400">
              Tingkatkan Bisnis, Mulai dari Website Anda!
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:mt-0 lg:gap-16">
            <div className="text-sm">
              <p className="font-bold">Perusahaan</p>
              <nav className="mt-4 space-y-2">
                {companyLinks.map((link) => (
                  <div
                    key={link.label}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {link.label}
                  </div>
                ))}
              </nav>
            </div>

            <div className="text-sm">
              <p className="font-bold">Layanan</p>
              <nav className="mt-4 space-y-2">
                {serviceLinks.map((link) => (
                  <div
                    key={link.label}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {link.label}
                  </div>
                ))}
              </nav>
            </div>

            <div className="text-sm">
              <p className="font-bold">Dukungan</p>
              <nav className="mt-4 space-y-2">
                {supportLinks.map((link) => (
                  <div
                    key={link.label}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {link.label}
                  </div>
                ))}
              </nav>
            </div>

            <div className="text-sm">
              <p className="font-bold">Legal</p>
              <nav className="mt-4 space-y-2">
                {legalLinks.map((link) => (
                  <div
                    key={link.label}
                    className="block cursor-pointer text-neutral-400 transition hover:text-black dark:hover:text-white"
                  >
                    {link.label}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <hr className="my-8 border-neutral-800" />

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} SHRProject. Hak Cipta Dilindungi.
          </p>
          {/* <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="/legal/kebijakan-privasi" className="transition hover:text-black dark:hover:text-white">Kebijakan Privasi</Link>
            <Link href="/legal/syarat-ketentuan" className="transition hover:text-black dark:hover:text-white">Syarat & Ketentuan</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
