"use client";

import { useRef } from "react";
import Section from "@/components/Utils/Section";
import { HoverEffect } from "@/components/Ui/card-hover";
import {
  ShieldMinus,
  TrendingUp,
  Zap,
  Blocks,
  MessageSquare,
  Handshake,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { title } from "process";

export default function WhyChooseUs() {
  const t = useTranslations("Home.WhyChooseUs");
  const divContainerRef = useRef<HTMLDivElement>(null);
  const titles = t.raw("CardsTitle");
  const decription = t.raw("CardDesk");

  const projects = [
    { icon: <ShieldMinus className="h-12 w-12" /> },
    { icon: <TrendingUp className="h-12 w-12" /> },
    { icon: <Zap className="h-12 w-12" /> },
    { icon: <Blocks className="h-12 w-12" /> },
    { icon: <MessageSquare className="h-12 w-12" /> },
    { icon: <Handshake className="h-12 w-12" /> },
  ];

  useGSAP(
    () => {
      gsap.from(".gsap-title", {
        scrollTrigger: {
          trigger: ".gsap-title",
          toggleActions: "play reset play reverse",
          endTrigger: ".card-hover-container",
        },
        opacity: 0,
        y: -50,
        duration: 0.5,
        stagger: 0.2,
      });
    },
    { scope: divContainerRef },
  );
  return (
    <Section id="whyChooseUs" className="flex w-full">
      <div
        ref={divContainerRef}
        className="mx-auto flex max-w-6xl flex-col items-center justify-center"
      >
        <div className="gsap-title-container flex flex-col items-center">
          <h1 className="gsap-title mt-10 flex text-lg font-bold text-black lg:text-3xl dark:text-white">
            {t("title")}
          </h1>
          <h4 className="gsap-title font-small mt-5 flex max-w-5xl text-center text-xs text-black lg:text-[17px] dark:text-white">
            {t("Desk")}
          </h4>
        </div>
        <HoverEffect
          items={projects.map((item, index) => ({
            ...item,
            title: titles[index],
            description: decription[index],
          }))}
          className="mt-10"
        />
      </div>
    </Section>
  );
}
