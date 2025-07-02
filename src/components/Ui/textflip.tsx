"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk memulai seluruh sekuens animasi
  const startAnimation = useCallback(() => {
    // 1. Set status isAnimating
    setIsAnimating(true);

    // 2. Ambil semua elemen "kata" yang sedang tampil
    const wordSpans = containerRef.current?.querySelectorAll(".word-span");
    if (!wordSpans || wordSpans.length === 0) {
      // Jika tidak ada kata, langsung update index untuk render berikutnya
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      return;
    }

    // 3. Buat timeline GSAP untuk animasi KELUAR (exit)
    const exitTimeline = gsap.timeline({
      onComplete: () => {
        // 4. Setelah animasi keluar selesai, update index kata
        // Ini akan memicu re-render dan useEffect untuk animasi MASUK
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      },
    });

    // 5. Tambahkan animasi keluar ke timeline, dengan stagger per kata & per huruf
    wordSpans.forEach((wordSpan, wordIndex) => {
      const letters = wordSpan.querySelectorAll(".letter-span");
      exitTimeline.to(
        letters,
        {
          opacity: 0,
          y: -20,
          x: 20,
          filter: "blur(8px)",
          scale: 1.5,
          stagger: 0.03,
          duration: 0.2,
        },
        wordIndex * 0.1, // Stagger untuk setiap kata
      );
    });
  }, [words.length]);

  // --- useEffect untuk timer utama ---
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  // --- useEffect untuk animasi MASUK (enter) ---
  // Dijalankan setiap kali currentIndex berubah (setelah exit animation)
  useEffect(() => {
    const wordSpans = containerRef.current?.querySelectorAll(".word-span");
    if (!wordSpans || wordSpans.length === 0) return;

    const enterTimeline = gsap.timeline({
      onComplete: () => {
        // Setelah animasi masuk selesai, izinkan timer untuk jalan lagi
        setIsAnimating(false);
      },
    });

    wordSpans.forEach((wordSpan, wordIndex) => {
      const letters = wordSpan.querySelectorAll(".letter-span");
      enterTimeline.fromTo(
        letters,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.03,
          duration: 0.2,
        },
        wordIndex * 0.1, // Stagger untuk setiap kata
      );
    });
  }, [currentIndex]); // Bergantung pada perubahan index kata

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-10 inline-block text-left text-neutral-900 dark:text-neutral-100",
        className,
      )}
    >
      {/* Container untuk kata, posisinya harus diatur agar tidak 
        mengganggu layout saat animasi keluar-masuk.
      */}
      <div className="relative">
        {words[currentIndex].split(" ").map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className="word-span inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <span
                key={`${letter}-${letterIndex}`}
                className="letter-span inline-block"
              >
                {letter}
              </span>
            ))}
            {/* Spasi antar kata */}
            <span className="letter-span inline-block">&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  );
};
