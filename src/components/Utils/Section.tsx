import ErrorBoundary from "@/components/Utils/ErrorBoundary";
import { cn } from "@/lib/utils";
import { ReactNode, Ref } from "react";

interface SectionProps {
  id: string;
  children?: ReactNode;
  className?: string;
  padding?: boolean;
  minHeightScreen?: boolean;
  ref?: Ref<HTMLElement>;
}

export default function Section({
  id,
  children = null,
  className = "",
  padding = true,
  minHeightScreen = true,
  ref,
}: SectionProps) {
  return (
    <ErrorBoundary>
      <section
        id={id}
        className={cn(
          "mx-auto flex max-w-[1536px] flex-col gap-10",
          minHeightScreen && "min-h-screen",
          padding && "px-4",
          className,
        )}
        ref={ref}
      >
        {children}
      </section>
    </ErrorBoundary>
  );
}
