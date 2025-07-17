
"use client";

import { useState, useRef, useEffect } from "react";
import ChatIcon from "./Chaticon";
import ChatWindow from "./Chatwindow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DRAG_THRESHOLD = 5; 

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const chatbotRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startDragPos = useRef({ x: 0, y: 0 });

  const wasDragging = useRef(false);

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
    const dx = Math.abs(e.clientX - startDragPos.current.x);
    const dy = Math.abs(e.clientY - startDragPos.current.y);

    if (!isDragging.current && (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD)) {
      isDragging.current = true;
    }

    if (isDragging.current && chatbotRef.current) {
      const el = chatbotRef.current;
      const rect = el.getBoundingClientRect();
      const elWidth = rect.width;
      const elHeight = rect.height;

      const parentWidth = window.innerWidth;
      const parentHeight = window.innerHeight;

      // Hitung posisi baru
      let newX = (gsap.getProperty(el, "x") as number) + e.movementX;
      let newY = (gsap.getProperty(el, "y") as number) + e.movementY;

      // Tambahkan batas
      const margin = 0; // margin dari tepi layar
      const maxX = parentWidth - elWidth - margin;
      const maxY = parentHeight - elHeight - margin;
      const minX = margin;
      const minY = margin;

      // Clamp posisi
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      gsap.to(el, {
        x: newX,
        y: newY,
        duration: 0,
      });
    }
};

  const handlePointerUp = () => {
  if (isDragging.current) {
    wasDragging.current = true; // Ini penting untuk cegah klik setelah drag

    // Ambil posisi terakhir
    const finalPos = {
      x: gsap.getProperty(chatbotRef.current, "x") as number,
      y: gsap.getProperty(chatbotRef.current, "y") as number,
    };

    const currentX = finalPos.x;
    const currentY = finalPos.y;
    const screenWidth = window.innerWidth;
    const chatbotWidth = chatbotRef.current!.offsetWidth;
    const margin = 16;

    // Hitung snap ke kiri atau kanan
    const isCloserToLeft = currentX < screenWidth / 2;
    const snapX = isCloserToLeft ? margin : screenWidth - chatbotWidth - margin;

    // Gunakan animasi snap dengan GSAP
    gsap.to(chatbotRef.current, {
      x: snapX,
      y: currentY,
      duration: 0.3,
      ease: "power2.out",
    });

    // Tetap update state posisi (untuk sinkronisasi)
    setPosition({ x: snapX, y: currentY });
  }

  // Reset state drag
  isDragging.current = false;
  chatbotRef.current!.style.cursor = "grab";
  chatbotRef.current!.style.transition = "";

  // Hapus event listener
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerup", handlePointerUp);
};


  useEffect(() => {
    if (isChatOpen && chatbotRef.current) {
      const rect = chatbotRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const shouldOpenToLeft = rect.x > screenWidth / 2;
      const shouldOpenUpward = rect.y > screenHeight / 2;

      // Set state seperti: setOpenDirection({ horizontal: 'left', vertical: 'up' })
    }
  }, [isChatOpen]);


  return (
    <>
      <div
        ref={chatbotRef}
        className="fixed z-[997]"
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
            onClick={() => {
              if (wasDragging.current) {
                wasDragging.current = false;
                return; // Jangan buka chat jika ini hasil dari drag
              }
              console.log("its clicking");
              setIsChatOpen(!isChatOpen);
            }}
            isChatOpen={isChatOpen}
          />
        </div>
      </div>
      {isChatOpen && <div className="fixed z-[998] inset-0 flex justify-center items-center">
        <div className="absolute inset-0 bg-black/80 z-[999]"></div>
        <ChatWindow
          onClose={() => setIsChatOpen(false)}
          isChatOpen={isChatOpen}
          className={'z-[1000]'}
        />
      </div>}
    </>
  );
}
