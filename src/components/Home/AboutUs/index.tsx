"use client";

import { Button } from "@/components/Ui/button";
import Section from "@/components/Utils/Section";
import { Blob } from "../Hero/SVGBlobs";
import { MoveRight } from "lucide-react";
import SwitchPage from "@/components/Utils/SwitchPage";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null); // 1. Buat ref untuk button

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      gsap.from(".gsap-about-subtitle", {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "restart reset restart reset",
        },
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(".gsap-about-title-word .word", {
        y: "100%",
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "restart reset restart reset",
        },
        duration: 0.3,
        stagger: 0.1,
        ease: "power3.out",
      });

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

      // 4. Targetkan animasi ke buttonRef.current
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
    },
    { scope: container },
  );

  return (
    <Section id="aboutUs" minHeightScreen={false} className="w-full">
      <div
        ref={container}
        className="relative mx-auto grid max-w-[550px] grid-cols-1 items-center gap-12 lg:max-w-screen-lg lg:grid-cols-2"
      >
        <div className="flex flex-col gap-4 text-center text-[15px] lg:text-left">
          <h2 className="gsap-about-subtitle text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            WHO WE ARE
          </h2>

          <h3
            className="gsap-about-title-word text-foreground text-3xl leading-tight font-bold md:text-4xl"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            {"Architects of Digital Solutions."
              .split(" ")
              .map((word, index) => (
                <span
                  key={index}
                  className="word inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}&nbsp;
                </span>
              ))}
          </h3>

          <p
            className="gsap-about-desc-word text-onyx dark:text-offwhite mt-2 font-thin"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            {"Kami adalah tim fullstack developer yang bersemangat memecahkan masalah kompleks dengan teknologi terkini. Bagi kami, software terbaik lahir dari kemitraan yang erat dan pemahaman mendalam akan tujuan bisnis Anda."
              .split(" ")
              .map((word, index) => (
                <span
                  key={index}
                  className="word inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}&nbsp;
                </span>
              ))}
          </p>

          <div
            ref={buttonRef} // 2. Pasang ref ke komponen Button
          >
            <SwitchPage
              href="/about"
              // variant="outline"
              className="mx-auto mt-4 flex items-center transition-all duration-300 hover:translate-y-[-5px] hover:scale-105 lg:mx-0 lg:self-start"
            >
              Learn More <MoveRight className="ml-2 h-4 w-4" />
            </SwitchPage>
          </div>
        </div>
        <div className="absolute mx-auto flex w-full items-center justify-center lg:relative lg:mx-0 lg:ml-auto">
          {mounted && (
            <Blob
              blobIndex={100}
              gradientIndex={0}
              size={320}
              animated
              className="top-1/2 right-0 -z-[1] mx-auto -translate-y-1/2 ease-in-out"
            />
          )}
        </div>
      </div>
    </Section>
  );
}
