"use client"; // Diperlukan karena kita menggunakan hook useState

import { Button } from "@/components/Ui/button";
import Section from "@/components/Utils/Section";
import { Blob } from "../Hero/SVGBlobs";
import { MoveRight } from "lucide-react";
import SwitchPage from "@/components/Utils/SwitchPage";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "50% bottom",
          markers: true,
          toggleActions: "play reset play reverse",
        },
      });

      tl.from(".gsap-about-content", {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.4,
        ease: "power2.inOut",
      });
    },
    { scope: container },
  );
  return (
    <Section id="aboutUs" minHeightScreen={false} className="w-full">
      <div
        ref={container}
        className="mx-auto grid max-w-screen-lg grid-cols-1 items-center gap-12 md:grid-cols-2"
      >
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="gsap-about-content text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            WHO WE ARE
          </h2>
          <h3 className="gsap-about-content text-foreground text-3xl leading-tight font-bold md:text-4xl">
            Architects of Digital Solutions.
          </h3>
          <p className="gsap-about-content text-muted-foreground mt-2">
            Kami adalah tim fullstack developer yang bersemangat memecahkan
            masalah kompleks dengan teknologi terkini. Bagi kami, software
            terbaik lahir dari kemitraan yang erat dan pemahaman mendalam akan
            tujuan bisnis Anda.
          </p>
          <Button variant="outline" className="mt-4 self-center md:self-start">
            <SwitchPage noButton href="/about" className="flex items-center">
              Learn More <MoveRight className="ml-2 h-4 w-4" />
            </SwitchPage>
          </Button>
        </div>
        <div className="relative mx-auto flex w-full items-center justify-center">
          {mounted && (
            <Blob
              blobIndex={100}
              gradientIndex={0}
              size={320}
              animated
              className="top-1/2 left-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
      </div>
    </Section>
  );
}
