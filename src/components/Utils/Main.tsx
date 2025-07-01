import ErrorBoundary from "@/components/Utils/ErrorBoundary";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MainProps {
  id: string;
  children?: ReactNode;
  className?: string;
}

export default function Main({
  id,
  children = null,
  className = "",
}: MainProps) {
  return (
    <ErrorBoundary>
      <main
        id={id}
        className={cn(
          "flex flex-col gap-[100px] md:gap-[125px] lg:gap-[150px]",
          className,
        )}
      >
        {children}
      </main>
    </ErrorBoundary>
  );
}
