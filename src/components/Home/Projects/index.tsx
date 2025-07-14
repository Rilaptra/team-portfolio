"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Utils/Section";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import convertToWebP from "@/lib/utils";
import SwitchPage from "@/components/Utils/SwitchPage";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- Data & Tipe dipindah ke atas untuk kejelasan ---
interface CardItem {
  title: string;
  desc?: string;
  image: string;
  techStack: string[];
  href?: string;
}

// Refactor 1: Buat komponen ProjectCard yang bisa dipakai ulang
// -----------------------------------------------------------
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
        loader={convertToWebP}
        unoptimized
      />
      <div className="absolute inset-0 flex translate-y-1/2 transform flex-col justify-end bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
        <div>
          <h3 className="mb-2 text-lg font-bold text-white">
            {cardData.title}
          </h3>
          {cardData.desc && (
            <p className="mb-3 text-sm text-gray-300">{cardData.desc}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {cardData.techStack.map((tech) => (
              <span
                key={tech} // Gunakan `tech` sebagai key yang unik dalam scope ini
                className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-white"
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
      className="project-card group relative mr-6 mb-5 h-[250px] w-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl focus:outline-none dark:bg-neutral-800"
    >
      {/* Refactor 2: Logika kondisional untuk Link dibungkus di sini */}
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMarqueeActive, setIsMarqueeActive] = useState(false);

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
      className="mx-auto mt-10 h-screen w-full max-w-5xl"
      padding={false}
    >
      <h1 className="mx-auto flex items-center justify-center text-3xl font-bold text-black dark:text-white">
        Our Mini Projects
      </h1>

      <div className="h-[570px] space-y-6 bg-transparent">
        {/* --- MARQUEE ATAS --- */}
        <Marquee
          speed={10}
          direction="right"
          pauseOnHover
          play={isMarqueeActive}
        >
          {/* Refactor 3: Gunakan komponen ProjectCard */}
          {cardsTop.map((item) => (
            <ProjectCard key={item.title} cardData={item} />
          ))}
        </Marquee>

        {/* --- MARQUEE BAWAH --- */}
        <Marquee
          speed={10}
          direction="left"
          className="pb-5"
          pauseOnHover
          play={isMarqueeActive}
        >
          {/* Refactor 3: Gunakan komponen ProjectCard lagi */}
          {cardsBottom.map((item) => (
            <ProjectCard key={item.title} cardData={item} />
          ))}
        </Marquee>
      </div>

      <div className="flex justify-center">
        <SwitchPage
          href="/contact"
          className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-105"
        >
          Buat Website <ArrowRight className="ml-2 h-5 w-5" />
        </SwitchPage>
      </div>
    </Section>
  );
}

// --- Data untuk proyek (tidak berubah) ---
const cardsTop: CardItem[] = [
  {
    title: "Tidar Resto Website",
    desc: "A responsive website company profile with nextjs and tailwindcss , with cms .",
    image: "/webp/Home/tidar_porto1.webp",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    href: "https://tidarresto.com",
  },
  {
    title: "Venice Klinik Website",
    desc: "Elegant company profile website for a beauty clinic, showcasing services and customer testimonials.",
    image: "/webp/Home/venice_porto1.webp",
    techStack: ["Next.js", "Tailwind CSS"],
    href: "https://klinik-venice.vercel.app",
  },
  {
    title: "Full-Stack WhatsApp Bot",
    desc: "An automated WhatsApp bot solution with an interactive management dashboard.",
    image: "/webp/Home/botwhatsapp.webp",
    techStack: ["React", "Node.js", "Express"],
  },
  {
    title: "Sukses Mulya Website",
    desc: "A responsive website company profile with nextjs and tailwindcss , with cms .",
    image: "webp/Home/suksesmulya.webp",
    techStack: ["Tailwindcss", "Nextjs", "React"],
  },
];

const cardsBottom: CardItem[] = [
  {
    title: "To-Work List App",
    desc: "",
    image: "/images/Home/toworklist.png",
    techStack: ["coming soon"],
  },
  {
    title: "coming soon 2",
    desc: "",
    image: "https://placehold.co/300x250/bbbbbb/555555.webp?text=Coming soon",
    techStack: ["coming soon"],
  },
  {
    title: "coming soon 3",
    desc: "",
    image: "https://placehold.co/300x250/bbbbbb/555555.webp?text=Coming soon",
    techStack: ["coming soon"],
  },
  {
    title: "coming soon 4",
    desc: "",
    image: "https://placehold.co/300x250/bbbbbb/555555.webp?text=Coming soon",
    techStack: ["coming soon"],
  },
];
