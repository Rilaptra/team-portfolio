"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { animatePageOut } from "@/lib/animations";
import { Button } from "@/components/Ui/button";

export default function SwitchPage({
  children,
  href = "/",
  className,
  noButton = false,
  variant,
}: {
  children: React.ReactNode;
  href: string;
  noButton?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
}) {
  const router = useRouter();
  if (noButton) {
    return (
      <span
        onClick={() => animatePageOut(href, router)}
        className={`${className} cursor-pointer`}
      >
        {children}
      </span>
    );
  }
  return (
    <Button
      onClick={() => animatePageOut(href, router)}
      className={`${className} cursor-pointer`}
      variant={variant}
    >
      {children}
    </Button>
  );
}
