"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Daftarin plugin GSAP ---
gsap.registerPlugin(ScrollTrigger);

// --- Komponen Utama ---
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Efek untuk deteksi mobile (tetap sama)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Efek untuk animasi GSAP
  useEffect(() => {
    const scaleDimensions = isMobile ? [0.7, 0.9] : [1.05, 1];

    // Bikin timeline GSAP yang di-trigger oleh scroll
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Animasi mulai saat bagian atas kontainer ketemu atas viewport
        end: "bottom bottom", // Selesai saat bagian bawah kontainer ketemu bawah viewport
        scrub: 1, // Bikin animasi smooth, ngikutin scroll
      },
    });

    // Animasi untuk Header: translasi ke atas
    timeline.fromTo(
      headerRef.current,
      { y: 0 }, // dari
      { y: -100, ease: "none" }, // ke
      0, // posisi di timeline (mulai dari detik 0)
    );

    // Animasi untuk Card: rotasi 3D dan scaling
    timeline.fromTo(
      cardRef.current,
      { rotateX: 20, scale: scaleDimensions[0] }, // dari
      { rotateX: 0, scale: scaleDimensions[1], ease: "none" }, // ke
      0, // posisi di timeline (jalan barengan sama header)
    );

    // Cleanup function buat bersihin ScrollTrigger pas komponen unmount
    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]); // Re-run efek ini kalo status isMobile berubah

  return (
    <div
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{
          perspective: "1000px", // Penting untuk efek rotasi 3D (rotateX)
        }}
      >
        <Header ref={headerRef} titleComponent={titleComponent} />
        <Card ref={cardRef}>{children}</Card>
      </div>
    </div>
  );
};

// --- Komponen Header (diubah jadi pakai forwardRef) ---
export const Header = React.forwardRef<
  HTMLDivElement,
  { titleComponent: React.ReactNode }
>(({ titleComponent }, ref) => {
  return (
    <div ref={ref} className="div mx-auto max-w-5xl text-center">
      {titleComponent}
    </div>
  );
});
Header.displayName = "Header";

// --- Komponen Card (diubah jadi pakai forwardRef) ---
export const Card = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl md:p-4 dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
});
Card.displayName = "Card";
