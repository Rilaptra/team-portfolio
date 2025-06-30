import ErrorBoundary from "@/components/Utils/ErrorBoundary";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children?: ReactNode;
  className?: string;
}

export default function Section({
  id = "",
  children = null,
  className = "",
}: SectionProps) {
  return (
    <ErrorBoundary>
      <section
        id={id}
        className={cn("mx-auto min-h-screen max-w-[1536px] px-4", className)}
      >
        {children}
      </section>
    </ErrorBoundary>
  );
}
