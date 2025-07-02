"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import { gsap } from "gsap";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/Ui/card";

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
        "relative grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={backgroundRef}
        style={{ opacity: 0 }}
        className="absolute inset-0 block rounded-3xl bg-blue-900/50 dark:bg-slate-800/[0.8]"
      />

      {items.map((item, idx) => (
        <a
          key={idx}
          className="group card-hover-item relative block h-full w-full p-2"
          onMouseEnter={handleMouseEnter}
        >
          <Card
            className={cn(
              "relative z-20 h-full w-full overflow-hidden rounded-2xl bg-indigo-200 p-0",
              "border-transparent dark:border-white/[0.2] bg-white border-gray-300 dark:bg-black",
            )}
          >
            <CardContent className="relative z-50 p-8 text-center">
              <div
                className={cn(
                  "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 p-4 text-white dark:bg-zinc-800",
                  "border border-transparent dark:group-hover:border-blue-900 dark:group-hover:text-blue-700",
                )}
              >
                {item.icon}
              </div>

              <CardTitle
                className={cn(
                  "mt-4 font-bold tracking-wide text-gray-800 dark:text-zinc-100",
                )}
              >
                {item.title}
              </CardTitle>

              <CardDescription
                className={cn(
                  "mt-8 text-sm leading-relaxed tracking-wide text-gray-600 dark:text-zinc-400",
                )}
              >
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};
