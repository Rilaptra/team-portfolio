// src/components/Chatbot/ChatIcon/index.tsx
import Logo from "@/components/icons/Logo";
import { Button } from "@/components/Ui/button";
import { cn } from "@/lib/utils";

interface ChatIconProps {
  onClick: () => void;
  isChatOpen: boolean;
  className?: string;
}

export default function ChatIcon({
  onClick,
  isChatOpen,
  className,
}: ChatIconProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "bg-primary text-primary-foreground focus:ring-ring/50 flex h-auto cursor-grab items-center justify-center rounded-full p-2 shadow-lg transition-all duration-500 ease-in-out hover:scale-110 focus:ring-4 focus:outline-none",
        isChatOpen ? "scale-0 rotate-[360deg]" : "scale-100 rotate-0",
        className,
      )}
      aria-label="Toggle Chat"
    >
      <span>
        <Logo size={24} className="-translate-y-[2px] lg:size-7" />
      </span>
    </Button>
  );
}
