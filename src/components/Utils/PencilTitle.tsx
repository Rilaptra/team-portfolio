"use client";

import Line from "@/components/icons/Line";
import { useState, useEffect } from "react"; // Import useState dan useEffect
import { cn } from "@/lib/utils";

interface PencilTitleProps {
  className?: string;
  title?: string;
  titleClassName?: string;
  children: React.ReactNode;
}

export default function PencilTitle({
  className,
  title,
  titleClassName,
  children = null,
}: PencilTitleProps) {
  // 1. Gunakan useState untuk menyimpan class, defaultnya string kosong
  const [transformClass, setTransformClass] = useState("");

  // 2. Gunakan useEffect untuk menjalankan kode HANYA di sisi klien
  useEffect(() => {
    const rotate = (Math.random() * 10 - 5).toFixed(2); // -5 to +5
    const reflectY = Math.random() < 0.5 ? "-scale-x-100" : "scale-x-100";
    // 3. Set state setelah komponen ter-mount di klien
    setTransformClass(`transform ${reflectY} rotate-[${rotate}deg]`);
  }, []); // Dependency array kosong `[]` memastikan ini hanya berjalan sekali

  return (
    <div className={cn("relative pb-2", className)}>
      {title && <h1 className={cn("text-xl", titleClassName)}>{title}</h1>}
      {children}
      {/* <Line
        size={{ width: 300, height: 210 }}
        className={cn(
          "absolute right-3 -bottom-2 left-3 text-white transition-transform duration-300 dark:text-teal-400",
          transformClass, // Gunakan state di sini
        )}
      /> */}
    </div>
  );
}
