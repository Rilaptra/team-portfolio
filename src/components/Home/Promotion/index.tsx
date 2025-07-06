"use client"; // Diperlukan untuk hook dan interaktivitas

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section from "@/components/Utils/Section";
import { ArrowRight } from "lucide-react";
import SwitchPage from "@/components/Utils/SwitchPage";

// Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Promotion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !headlineRef.current ||
        !paragraphRef.current ||
        !buttonRef.current
      )
        return;
      const el = sectionRef.current;

      // Animasi akan dipicu saat section ini masuk ke viewport
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          toggleActions: "restart none none reset",
          // markers: true,
        },
      });

      // 1. Animasikan setiap kata pada headline agar muncul satu per satu
      // Kita target 'span' di dalam headlineRef
      tl.from(
        ".headlineText",
        {
          y: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "start", // Label untuk memulai animasi secara bersamaan
      );

      // 2. Animasikan paragraf setelah headline mulai muncul
      tl.from(
        paragraphRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "start+=0.3", // Mulai 0.3 detik setelah label 'start'
      );

      // 3. Animasikan tombol agar muncul terakhir
      tl.from(
        buttonRef.current,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "start+=0.6", // Mulai 0.6 detik setelah label 'start'
      );
    },
    { scope: sectionRef },
  );

  const headlineText = "Siap Membangun Proyek Impian Anda?";

  return (
    // Kita gunakan padding vertikal yang besar agar section ini terasa penting
    <Section id="promotion" minHeightScreen={false} className="py-24 sm:py-32">
      <div ref={sectionRef} className="mx-auto max-w-4xl text-center">
        <h2
          ref={headlineRef}
          className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {headlineText.split(" ").map((word, index) => (
            <span key={index} className="headlineText inline-block">
              {word}&nbsp;
            </span>
          ))}
        </h2>
        <p
          ref={paragraphRef}
          className="text-muted-foreground mt-6 text-lg leading-8"
        >
          Jangan ragu untuk berdiskusi. Kami siap mengubah ide brilian Anda
          menjadi solusi digital yang nyata dan berfungsi.
        </p>
        <div ref={buttonRef} className="mt-10">
          <SwitchPage href="/contact">
            Hubungi Kami <ArrowRight className="ml-2 h-5 w-5" />
          </SwitchPage>
        </div>
      </div>
    </Section>
  );
}
