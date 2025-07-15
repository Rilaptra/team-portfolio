// src/components/Chatbot/ChatWindow/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Frown } from "lucide-react";
import { Button } from "@/components/Ui/button";
import { useTranslations } from "next-intl";
import Logo from "@/components/icons/Logo";
import { cn } from "@/lib/utils";

// Definisikan tipe untuk setiap pesan dalam history
interface Message {
  role: "user" | "model";
  parts: [{ text: string }];
}

interface ChatWindowProps {
  onClose: () => void;
  isChatOpen: boolean;
}

export default function ChatWindow({ onClose, isChatOpen }: ChatWindowProps) {
  const t = useTranslations("Chatbot");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: messages,
          query: { message: input },
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      const modelMessage: Message = {
        role: "model",
        parts: [{ text: data.response }],
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      setError(t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div
      className={cn(
        "bg-card flex h-[70vh] max-h-[600px] w-[90vw] max-w-[400px] flex-col overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ease-in-out",
        isChatOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Logo size={24} className="text-primary" />
          <h3 className="font-bold">SHR.ai</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetConversation}
          aria-label={t("resetButton")}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-muted-foreground text-center">
            <h4 className="font-bold">{t("greetingTitle")}</h4>
            <p className="text-sm">{t("greeting")}</p>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn("flex items-end gap-2", {
                "justify-end": msg.role === "user",
              })}
            >
              {msg.role === "model" && (
                <Logo size={24} className="text-primary shrink-0" />
              )}
              <div
                className={cn("max-w-[80%] rounded-xl px-3 py-2 text-sm", {
                  "bg-primary text-primary-foreground": msg.role === "user",
                  "bg-muted": msg.role === "model",
                })}
              >
                {msg.parts[0].text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2">
              <Logo size={24} className="text-primary shrink-0 animate-pulse" />
              <div className="bg-muted w-16 rounded-xl py-4"></div>
            </div>
          )}
          {error && (
            <div className="text-destructive flex items-center gap-2">
              <Frown className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="bg-input focus:ring-ring w-full rounded-full border px-4 py-2 text-sm focus:ring-2 focus:outline-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full"
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
