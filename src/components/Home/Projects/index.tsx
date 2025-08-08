// src/components/Home/Projects/index.tsx
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Utils/Section";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import SwitchPage from "@/components/Utils/SwitchPage";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface CardItem {
  title: string;
  desc?: string;
  image: string;
  techStack: string[];
  href?: string;
}

// Komponen ProjectCard tidak perlu diubah, karena sudah menerima data dari props
const ProjectCard = ({ cardData }: { cardData: CardItem }) => {
  const CardContent = (
    <>
      <Image
        src={cardData.image}
        alt={cardData.title}
        width={300}
        height={250}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-110"
        loading="lazy"
        unoptimized
      />
      <div className="absolute inset-0 flex translate-y-1/2 transform flex-col justify-end bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
        <div>
          <h3 className="mb-2 text-[14px] font-bold text-white lg:text-lg">
            {cardData.title}
          </h3>
          {cardData.desc && (
            <p className="mb-3 text-[12px] text-gray-300 lg:text-sm">
              {cardData.desc}
            </p>
          )}
          <div className="flex flex-wrap gap-1 lg:gap-2">
            {cardData.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-white/10 px-1 py-0.5 text-[10px] font-semibold text-white lg:px-2 lg:py-1 lg:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      tabIndex={0}
      className="project-card group relative mr-6 mb-5 h-[200px] w-[250px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl focus:outline-none lg:h-[250px] lg:w-[300px] dark:bg-neutral-800"
    >
      {cardData.href ? (
        <Link
          href={cardData.href}
          target="_blank"
          className="block h-full w-full"
        >
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  );
};

// --- Komponen Utama ---
export default function Projects() {
  const t = useTranslations("Home.Projects");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMarqueeActive, setIsMarqueeActive] = useState(false);

  // Data sekarang digabung dengan terjemahan
  const cardsTop: CardItem[] = [
    {
      title: t("cards.tidar.title"),
      desc: t("cards.tidar.desc"),
      image: "/webp/Home/tidar_porto1.webp",
      techStack: ["Next.js", "TypeScript", "Tailwind"],
      href: "https://tidarresto.com",
    },
    {
      title: t("cards.venice.title"),
      desc: t("cards.venice.desc"),
      image: "/webp/Home/venice_porto1.webp",
      techStack: ["Next.js", "Tailwind CSS"],
      href: "https://www.klinikvenice.com/",
    },
    {
      title: t("cards.whatsapp.title"),
      desc: t("cards.whatsapp.desc"),
      image: "/webp/Home/botwhatsapp.webp",
      techStack: ["React", "Node.js", "Express"],
    },
    {
      title: t("cards.suksesmulya.title"),
      desc: t("cards.suksesmulya.desc"),
      image: "webp/Home/suksesmulya.webp",
      techStack: ["Tailwindcss", "Nextjs", "React"],
        href: "https://www.suksesmulyamagelang.com/",
    },
  ];

  const cardsBottom: CardItem[] = [
    {
      title: t("cards.towork.title"),
      desc: t("cards.towork.desc"),
      image: "/images/Home/toworklist.png",
      techStack: ["coming soon"],
    },
    {
      title: t("cards.comingsoon2.title"),
      desc: t("cards.comingsoon2.desc"),
      image: "https://placehold.co/300x250/bbbbbb/555555.webp?text=Coming soon",
      techStack: ["coming soon"],
    },
    {
      title: t("cards.comingsoon3.title"),
      desc: t("cards.comingsoon3.desc"),
      image: "https://placehold.co/300x250/bbbbbb/555555.webp?text=Coming soon",
      techStack: ["coming soon"],
    },
    {
      title: t("cards.comingsoon4.title"),
      desc: t("cards.comingsoon4.desc"),
      image: "https://placehold.co/300x250/bbbbbb/555555.webp?text=Coming soon",
      techStack: ["coming soon"],
    },
  ];

  useGSAP(
    () => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => setIsMarqueeActive(true),
        },
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.5,
        ease: "back.out",
        stagger: {
          each: 0.1,
          from: "start",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section
      id="projects"
      ref={sectionRef}
      className="mx-auto min-h-screen w-full max-w-5xl"
      padding={false}
    >
      <h1 className="mx-auto flex items-center justify-center text-lg font-bold text-black lg:text-3xl dark:text-white">
        {t("title")}
      </h1>

      <div className="h-[500px] bg-transparent px-5 lg:h-[570px]">
        <Marquee
          speed={10}
          direction="right"
          pauseOnHover
          play={isMarqueeActive}
        >
          {cardsTop.map((item, index) => (
            <ProjectCard key={index} cardData={item} />
          ))}
        </Marquee>

        <Marquee
          speed={10}
          direction="left"
          className="pb-5"
          pauseOnHover
          play={isMarqueeActive}
        >
          {cardsBottom.map((item, index) => (
            <ProjectCard key={index} cardData={item} />
          ))}
        </Marquee>
      </div>

      <div className="flex justify-center">
        <SwitchPage
          href="/contact"
          className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-105"
        >
          {t("button")} <ArrowRight className="ml-2 h-5 w-5" />
        </SwitchPage>
      </div>
    </Section>
  );
}
