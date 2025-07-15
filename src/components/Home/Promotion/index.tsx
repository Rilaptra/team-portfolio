// src/components/Home/Promotion/index.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section from "@/components/Utils/Section";
import { ArrowRight } from "lucide-react";
import SwitchPage from "@/components/Utils/SwitchPage";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Promotion() {
  const t = useTranslations("Home.Promotion");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Logika animasi GSAP tetap sama
      if (
        !sectionRef.current ||
        !headlineRef.current ||
        !paragraphRef.current ||
        !buttonRef.current
      )
        return;
      const el = sectionRef.current;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          toggleActions: "restart none none reset",
        },
      });
      tl.from(
        ".headlineText",
        {
          y: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "start",
      );
      tl.from(
        paragraphRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "start+=0.3",
      );
      tl.from(
        buttonRef.current,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "start+=0.6",
      );
    },
    { scope: sectionRef },
  );

  return (
    <Section id="promotion" minHeightScreen={false} className="py-24 sm:py-32">
      <div ref={sectionRef} className="mx-auto max-w-4xl text-center">
        <h2
          ref={headlineRef}
          className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {t("headline")
            .split(" ")
            .map((word, index) => (
              <span key={index} className="headlineText inline-block">
                {word}&nbsp;
              </span>
            ))}
        </h2>
        <p
          ref={paragraphRef}
          className="text-muted-foreground mt-6 text-lg leading-8"
        >
          {t("paragraph")}
        </p>
        <div ref={buttonRef} className="mt-10">
          <SwitchPage
            href="/contact"
            className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-105"
          >
            {t("button")} <ArrowRight className="ml-2 h-5 w-5" />
          </SwitchPage>
        </div>
      </div>
    </Section>
  );
}
