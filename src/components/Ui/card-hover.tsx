"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import { gsap } from "gsap";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}) => {
  const backgroundRef = useRef<HTMLSpanElement>(null);

  // Fungsi untuk trigger animasi saat mouse masuk ke salah satu card
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    gsap.to(backgroundRef.current, {
      opacity: 1,
      top: card.offsetTop,
      left: card.offsetLeft,
      width: card.offsetWidth,
      height: card.offsetHeight,
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  // Fungsi untuk menghilangkan background saat mouse keluar dari area grid
  const handleMouseLeave = () => {
    gsap.to(backgroundRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      className={cn(
        "relative grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3", // Tambah 'relative'
        className,
      )}
      onMouseLeave={handleMouseLeave} // Cukup satu event listener di kontainer utama
    >
      {/* Satu elemen background yang akan dianimasikan */}
      <span
        ref={backgroundRef}
        style={{ opacity: 0 }} // Mulai dari tidak terlihat
        className="absolute inset-0 block rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
      />

      {items.map((item, idx) => (
        <a
          key={idx}
          className="group relative block h-full w-full p-2"
          onMouseEnter={handleMouseEnter} // Setiap item punya trigger-nya sendiri
        >
          {/* Komponen Card dan isinya tidak perlu diubah */}
          <Card>
            <CardIcon
              className="border-transparent group-hover:border-gray-500 group-hover:text-gray-500 dark:group-hover:border-blue-900 dark:group-hover:text-blue-900"
              border
            >
              {item.icon}
            </CardIcon>
            <CardTitle className="">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

// ============================================================================
// KOMPONEN-KOMPONEN DI BAWAH INI TIDAK PERLU DIUBAH SAMA SEKALI
// Mereka hanya untuk styling dan tidak mengandung logika animasi.
// ============================================================================

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-indigo-200 p-4 dark:border-white/[0.2] dark:bg-black",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "mt-4 text-center font-bold tracking-wide text-gray-800 dark:text-zinc-100",
        className,
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-center text-sm leading-relaxed tracking-wide text-gray-600 dark:text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const CardIcon = ({
  className,
  border,
  children,
}: {
  className?: string;
  border?: boolean;
  children: React.ReactNode;
}) => {
  const borderClass = border ? "border" : "";

  return (
    <div
      className={cn(
        "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 p-4 text-white dark:bg-zinc-800",
        className,
        borderClass,
      )}
    >
      {children}
    </div>
  );
};
