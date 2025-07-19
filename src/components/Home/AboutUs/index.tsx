"use client";

import Section from "@/components/Utils/Section";
import { MoveRight } from "lucide-react";
import SwitchPage from "@/components/Utils/SwitchPage";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Image from "next/image"; // Impor komponen Image

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const t = useTranslations("Home.AboutUs");
  const container = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null); // Ref untuk gambar

  // Animasi untuk teks dan tombol
  useGSAP(
    () => {
      // Animasi untuk teks subtitle
      gsap.from(".gsap-about-subtitle", {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
        duration: 0.5,
        ease: "power2.out",
      });

      // Animasi untuk judul
      gsap.from(".gsap-about-title-word .word", {
        y: "100%",
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
        duration: 0.3,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animasi untuk deskripsi
      gsap.from(".gsap-about-desc-word .word", {
        y: "100%",
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "restart reset restart reset",
        },
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.out",
      });

      // Animasi untuk tombol
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "restart reset restart reset",
        },
        duration: 0.5,
        ease: "back.out",
      });

      // Animasi baru untuk rotasi gambar
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: container },
  );

  return (
    <Section id="aboutUs" minHeightScreen={false} className="w-full">
      <div
        ref={container}
        className="relative mx-auto grid max-w-[550px] grid-cols-1 items-center gap-12 lg:max-w-screen-lg lg:grid-cols-2"
      >
        {/* --- SEMUA KONTEN TEKS ANDA DIKEMBALIKAN DI SINI --- */}
        <div className="flex flex-col gap-4 text-center text-[15px] lg:text-left">
          <h2 className="gsap-about-subtitle text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            {t("subtitle")}
          </h2>

          <h3
            className="gsap-about-title-word text-foreground text-3xl leading-tight font-bold md:text-4xl"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            {t("title")
              .split(" ")
              .map((word, index) => (
                <span
                  key={index}
                  className="word inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word} 
                </span>
              ))}
          </h3>

          <p
            className="gsap-about-desc-word text-onyx dark:text-offwhite mt-2 font-thin"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            {t("description")
              .split(" ")
              .map((word, index) => (
                <span
                  key={index}
                  className="word inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word} 
                </span>
              ))}
          </p>

          <div ref={buttonRef}>
            <SwitchPage
              href="/about"
              className="mx-auto mt-4 flex items-center transition-all duration-300 hover:translate-y-[-5px] hover:scale-105 lg:mx-0 lg:self-start"
            >
              {t("button")} <MoveRight className="ml-2 h-4 w-4" />
            </SwitchPage>
          </div>
        </div>

        <div className="absolute -z-100 mx-auto flex w-full items-center justify-center lg:relative lg:mx-0 lg:ml-auto">
          <div
            ref={imageRef}
            className="h-[80px] w-[80px] md:h-[180px] md:w-[180px] lg:h-[280px] lg:w-[280px]"
          >
            <Image
              src="/images/Logo/SHR_logo.png"
              alt="SHR Project Logo"
              width={320}
              height={320}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
