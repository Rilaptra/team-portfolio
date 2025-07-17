"use client";

import Line from "@/components/icons/Line";
import { useMemo } from "react";
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
  const transformClass = useMemo(() => {
    const rotate = (Math.random() * 10 - 5).toFixed(2); // -5 to +5
    const reflectY = Math.random() < 0.5 ? "-scale-x-100" : "scale-x-100";
    return `transform ${reflectY} rotate-[${rotate}deg]`;
  }, []);
  return (
    <div className={cn("relative pb-2", className)}>
      {title && <h1 className={cn("text-xl", titleClassName)}>{title}</h1>}
      {children}
      <Line
        size={304}
        className={`absolute right-3 -bottom-2 left-3 text-white dark:text-teal-400 ${transformClass}`}
      />
    </div>
  );
}
