"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { animatePageOut } from "@/lib/animations";
import { Button, buttonVariants } from "@/components/Ui/button";
import { VariantProps } from "class-variance-authority";

export default function SwitchPage(
  {
    children,
    className,
    href = "/",
    ...props
  }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    } & {
      href: string;
    },
  // {
  // children: React.ReactNode;
  // href: string;
  // className?: string;
  // props?: typeof Button
  // ref?: React.Ref<HTMLButtonElement>;
  // variant?:
  //   | "default"
  //   | "destructive"
  //   | "outline"
  //   | "secondary"
  //   | "ghost"
  //   | "link"
  //   | null;
  // }
) {
  const router = useRouter();
  return (
    <Button
      // ref={ref}
      {...props}
      onClick={() => animatePageOut(href, router)}
      className={`${className} cursor-pointer`}
      // variant={variant}
    >
      {children}
    </Button>
  );
}
