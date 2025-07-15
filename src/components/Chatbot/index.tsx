// src/components/Chatbot/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import ChatIcon from "./Chaticon";
import ChatWindow from "./Chatwindow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DRAG_THRESHOLD = 5; // Jarak minimal (dalam pixel) untuk dianggap drag

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const chatbotRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startDragPos = useRef({ x: 0, y: 0 });

  // Inisialisasi posisi awal di kanan bawah
  useEffect(() => {
    const setInitialPosition = () => {
      if (chatbotRef.current) {
        const x = window.innerWidth - chatbotRef.current.offsetWidth - 32;
        const y = window.innerHeight - chatbotRef.current.offsetHeight - 32;
        // Gunakan GSAP untuk set posisi awal tanpa animasi
        gsap.set(chatbotRef.current, { x, y });
        setPosition({ x, y });
      }
    };
    // Timeout kecil untuk memastikan elemen sudah dirender sepenuhnya
    setTimeout(setInitialPosition, 100);
    window.addEventListener("resize", setInitialPosition);
    return () => window.removeEventListener("resize", setInitialPosition);
  }, []);

  // Animasi saat posisi berubah (hanya jika sedang tidak di-drag)
  useGSAP(() => {
    if (chatbotRef.current && !isDragging.current) {
      gsap.to(chatbotRef.current, {
        x: position.x,
        y: position.y,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [position]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Mencatat posisi awal saat pointer ditekan
    startDragPos.current = { x: e.clientX, y: e.clientY };
    // Set listener di level window untuk menangani pergerakan dan pelepasan pointer
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    chatbotRef.current!.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: PointerEvent) => {
    // Hitung jarak dari posisi awal
    const dx = Math.abs(e.clientX - startDragPos.current.x);
    const dy = Math.abs(e.clientY - startDragPos.current.y);

    // Jika belum di-drag dan jarak sudah melebihi threshold, mulai mode drag
    if (!isDragging.current && (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD)) {
      isDragging.current = true;
    }

    // Jika sedang dalam mode drag, update posisi elemen secara langsung dengan GSAP
    if (isDragging.current) {
      // Hapus transisi agar pergerakan terasa instan
      chatbotRef.current!.style.transition = "none";
      gsap.to(chatbotRef.current, {
        x: `+=${e.movementX}`,
        y: `+=${e.movementY}`,
        duration: 0,
      });
    }
  };

  const handlePointerUp = () => {
    // Jika tidak sedang drag, berarti ini adalah klik
    if (isDragging.current) {
      // Setelah drag selesai, update state posisi terakhir
      // const finalPos = gsap.getProperty(chatbotRef.current, ["x", "y"]);
      const finalPos = {
        x: gsap.getProperty(chatbotRef.current, "x"),
        y: gsap.getProperty(chatbotRef.current, "y"),
      };
      setPosition({ x: finalPos.x as number, y: finalPos.y as number });
    }

    // Reset state dan hapus listener dari window
    isDragging.current = false;
    chatbotRef.current!.style.cursor = "grab";
    chatbotRef.current!.style.transition = ""; // Kembalikan transisi
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      ref={chatbotRef}
      className="fixed z-[999]"
      style={{
        left: 0,
        top: 0,
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
    >
      <div className="relative flex items-center justify-center">
        {/* ChatIcon dibungkus div agar event pointerUp tidak terpicu 2x */}
        <ChatIcon
          onClick={() => setIsChatOpen(!isChatOpen)}
          isChatOpen={isChatOpen}
        />
        <ChatWindow
          onClose={() => setIsChatOpen(false)}
          isChatOpen={isChatOpen}
          className="absolute"
        />
      </div>
    </div>
  );
}
