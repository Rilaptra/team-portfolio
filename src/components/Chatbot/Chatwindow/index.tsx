"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Frown, X } from "lucide-react";
import { Button } from "@/components/Ui/button";
import { useTranslations } from "next-intl";
import Logo from "@/components/icons/Logo";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "@/i18n/navigation";

interface Message {
  role: "user" | "model";
  parts: [{ text: string }];
}

interface ChatWindowProps {
  onClose: () => void;
  isChatOpen: boolean;
  className?: string;
}

const MessageRenderer = ({
  content,
  onSuggestionClick,
}: {
  content: string;
  onSuggestionClick: (value: string) => void;
}) => {
  const tagRegex = /<(linkToHref|buttonChoose|buttonLink):({.*?})>/g;
  const elements = [];
  let lastIndex = 0;

  for (const match of content.matchAll(tagRegex)) {
    if (match.index > lastIndex) {
      if (content.substring(lastIndex, match.index).includes(" "))
        elements.push(
          ...content
            .substring(lastIndex, match.index)
            .split(" ")
            .map((el) => <span>{el}</span>),
        );
    }
    const [fullMatch, tagType, jsonString] = match;
    try {
      const data = JSON.parse(jsonString);

      switch (tagType) {
        case "linkToHref":
          elements.push(
            <Link href={data.href} className="text-primary underline">
              {data.label}
            </Link>,
          );
          break;
        case "buttonLink":
          elements.push(
            <Button asChild size="sm" className="h-auto px-3 py-1 text-xs">
              <Link href={data.href}>{data.label}</Link>
            </Button>,
          );
          break;
        case "buttonChoose":
          elements.push(
            <Button
              variant="outline"
              size="sm"
              className="h-auto px-3 py-1 text-xs"
              onClick={() => onSuggestionClick(data.value)}
            >
              {data.label}
            </Button>,
          );
          break;
        default:
          elements.push(fullMatch);
          break;
      }
    } catch (e) {
      console.error("Failed to parse interactive tag:", e);
      elements.push(fullMatch);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < content.length) {
    elements.push(content.substring(lastIndex));
  }

  return (
    <div className="flex flex-wrap items-center">
      {elements.map((el, i) => (
        <React.Fragment key={i}>{el}&nbsp;</React.Fragment>
      ))}
    </div>
  );
};

export default function ChatWindow({
  onClose,
  isChatOpen,
  className,
}: ChatWindowProps) {
  const t = useTranslations("Chatbot");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const savedMessages = window.localStorage.getItem("chatMessages");
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch (err) {
      console.error("Gagal load pesan dari localStorage:", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (err) {
      console.error("Gagal simpan pesan ke localStorage:", err);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const historyForAPI = [...messages];
    const userMessage: Message = {
      role: "user",
      parts: [{ text: messageText }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    if (input) setInput("");

    const processSuccessResponse = (responseData: any) => {
      if (responseData.response) {
        try {
          const sanitized = responseData.response
            .replace(/```json/g, "")
            .replace(/```/g, "");
          const aiResponse = JSON.parse(sanitized) as {
            aboutUs: boolean;
            answer: string;
          };
          const modelMessage: Message = {
            role: "model",
            parts: [{ text: aiResponse.answer }],
          };
          setMessages((prev) => [...prev, modelMessage]);
        } catch {
          const modelMessage: Message = {
            role: "model",
            parts: [{ text: responseData.response }],
          };
          setMessages((prev) => [...prev, modelMessage]);
        }
      } else {
        throw new Error("Invalid response format from API");
      }
    };

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: historyForAPI,
          query: { message: messageText },
        }),
      });

      if (res.status === 429) {
        const errorData = await res.json();
        const retryDelay = Number(errorData.retryDelay) || 5;

        setError(
          errorData.message ||
            `API limit, mencoba lagi dalam ${retryDelay} detik...`,
        );

        setTimeout(async () => {
          try {
            const retryRes = await fetch("/api/ai", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                history: historyForAPI,
                query: { message: messageText },
              }),
            });

            if (!retryRes.ok) {
              throw new Error("Gagal mengirim pesan setelah mencoba lagi.");
            }

            const retryData = await retryRes.json();
            processSuccessResponse(retryData);
            setError(null);
          } catch (retryErr) {
            setError((retryErr as Error).message || t("errorMessage"));
          } finally {
            setIsLoading(false);
            inputRef.current?.focus();
          }
        }, retryDelay * 1000);

        return;
      }

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      processSuccessResponse(data);

      setIsLoading(false);
      inputRef.current?.focus();
    } catch (err) {
      setError(t("errorMessage"));
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };

  const handleSuggestionClick = (value: string) => {
    submitMessage(value);
  };

  const resetConversation = () => {
    setMessages([]);
    setError(null);

    try {
      window.localStorage.removeItem("chatMessages");
    } catch (err) {
      console.error("Gagal hapus pesan dari localStorage:", err);
    }
  };

  return (
    <div
      className={cn(
        "bg-card flex h-[70vh] max-h-[600px] w-[90vw] max-w-[400px] flex-col overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ease-in-out",
        isChatOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 select-none">
          <Logo size={24} className="text-primary" />
          <h3 className="font-bold">SHR.ai</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetConversation}
            aria-label={t("resetButton")}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={t("closeButton")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-muted-foreground text-center select-none">
            <h4 className="font-bold">{t("greetingTitle")}</h4>
            <p className="text-sm">{t("greeting")}</p>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn("flex items-start gap-2", {
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
                {msg.role === "model" ? (
                  <MessageRenderer
                    content={msg.parts[0].text}
                    onSuggestionClick={handleSuggestionClick}
                  />
                ) : (
                  msg.parts[0].text
                )}
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
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="bg-input focus:ring-ring text-onyx w-full rounded-full border px-4 py-2 text-sm focus:ring-2 focus:outline-none dark:text-white"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="size-9 rounded-full"
            disabled={isLoading || !input.trim()}
          >
            <span>
              <Send className="size-5" />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
