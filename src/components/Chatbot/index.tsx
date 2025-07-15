// src/components/Chatbot/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import ChatIcon from "./Chaticon";
import ChatWindow from "./Chatwindow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const chatbotRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Inisialisasi posisi awal di kanan bawah
  useEffect(() => {
    const setInitialPosition = () => {
      if (chatbotRef.current) {
        const x = window.innerWidth - chatbotRef.current.offsetWidth - 32;
        const y = window.innerHeight - chatbotRef.current.offsetHeight - 32;
        setPosition({ x, y });
      }
    };
    setInitialPosition();
    window.addEventListener("resize", setInitialPosition);
    return () => window.removeEventListener("resize", setInitialPosition);
  }, []);

  useGSAP(
    () => {
      if (chatbotRef.current) {
        gsap.to(chatbotRef.current, {
          x: position.x,
          y: position.y,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    { dependencies: [position] },
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - chatbotRef.current!.getBoundingClientRect().left,
      y: e.clientY - chatbotRef.current!.getBoundingClientRect().top,
    };
    chatbotRef.current!.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    chatbotRef.current!.style.cursor = "grab";
  };

  const handleToggleChat = () => {
    if (isDragging.current) return;
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div
      ref={chatbotRef}
      className="fixed z-[999]"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: "none", // Mencegah scrolling saat dragging di mobile
        cursor: "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Hentikan drag jika mouse keluar window
    >
      <div className="relative flex items-center justify-center">
        <ChatIcon onClick={handleToggleChat} isChatOpen={isChatOpen} />
        <div className="absolute">
          <ChatWindow
            onClose={() => setIsChatOpen(false)}
            isChatOpen={isChatOpen}
          />
        </div>
      </div>
    </div>
  );
}
