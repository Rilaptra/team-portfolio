// components/SideBar.tsx (file yang sudah kamu punya)
import { NavItem } from "@/lib/types"; // Sesuaikan path
import TreeItem from "./TreeItem"; // Sesuaikan path

// Taruh data navItems di sini (seperti dari langkah 1)
const navItems: NavItem[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    href: "#start",
    children: [
      { id: "intro", title: "Introduction", href: "#intro" },
      { id: "installation", title: "Installation", href: "#install" },
    ],
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    href: "#core",
    children: [
      {
        id: "rendering",
        title: "Rendering",
        href: "#rendering",
        children: [
          { id: "client", title: "Client Components", href: "#client" },
          { id: "server", title: "Server Components", href: "#server" },
        ],
      },
      { id: "fetching", title: "Data Fetching", href: "#fetching" },
    ],
  },
  {
    id: "about",
    title: "About",
    href: "#about",
  },
];

export default function SideBar() {
  return (
    <div className="bg-onyx/30 item-center fixed top-[50%] left-4 z-[999] hidden w-auto max-w-xs -translate-y-[50%] flex-col rounded-xl p-5 text-white lg:flex">
      <h1 className="mb-2 text-lg font-thin tracking-wide">
        What's on this page?
      </h1>
      <div className="flex flex-col">
        {navItems.map((item, index) => (
          <TreeItem
            key={item.id}
            item={item}
            isLast={index === navItems.length - 1}
            // Untuk level paling atas, prefix-nya kosong
            prefix=""
          />
        ))}
      </div>
    </div>
  );
}
