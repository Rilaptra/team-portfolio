import Section from "@/components/Utils/Section";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import convertToWebP from "@/lib/utils";

export default function Projects() {
  return (
    <Section
      id="projects"
      className="mx-auto h-screen max-w-5xl"
      padding={false}
    >
      <h1 className="flex justify-center text-3xl font-bold text-black dark:text-white">
        Our Mini Projects
      </h1>

      <div className="h-[570px] space-y-6 bg-transparent">
        {/* --- MARQUEE ATAS --- */}
        <Marquee speed={10} direction="right" gradient={false} pauseOnHover>
          {cardsTop.map((item, i) => (
            <div
              key={i}
              tabIndex={0} // <-- PERUBAHAN 1: Membuat kartu bisa di-fokus (diklik di HP)
              className="group relative mr-6 mb-5 h-[250px] w-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl focus:outline-none dark:bg-neutral-800"
            >
              <Image
                src={item.image}
                alt={item.title}
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
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-300">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech, j) => (
                      <span
                        key={j}
                        className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* --- MARQUEE BAWAH --- */}
        <Marquee
          speed={10}
          direction="left"
          className="pb-5"
          gradient={false}
          pauseOnHover
        >
          {cardsBottom.map((item, i) => (
            <div
              key={i}
              tabIndex={0} // <-- PERUBAHAN 1: Membuat kartu bisa di-fokus (diklik di HP)
              className="group relative mr-6 mb-5 h-[250px] w-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl focus:outline-none dark:bg-neutral-800"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={250}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-110"
                loading="lazy"
                loader={convertToWebP}
                unoptimized
              />

              {/* <-- PERUBAHAN 3: Menambahkan group-focus untuk memunculkan overlay */}
              <div className="absolute inset-0 flex translate-y-1/2 transform flex-col justify-end bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                <h3 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mb-3 text-sm text-gray-300">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech, j) => (
                    <span
                      key={j}
                      className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="flex justify-center">
        <Link href="/contact">
          <button className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-black shadow-lg transition duration-300 ease-in-out hover:translate-y-[-4px] hover:shadow-xl dark:border-gray-600 dark:bg-black dark:text-white">
            make website
          </button>
        </Link>
      </div>
    </Section>
  );
}

// Data di bawah ini tidak diubah sama sekali
interface CardItem {
  title: string;
  desc?: string;
  image: string;
  techStack: string[];
  link?: string;
}

const cardsTop: CardItem[] = [
  {
    title: "Tidar Resto Website",
    desc: "A responsive website company profile with nextjs and tailwindcss , with cms .",
    link: "",
    image: "/webp/Home/tidar_porto1.webp",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Venice Klinik Website",
    desc: "Elegant company profile website for a beauty clinic, showcasing services and customer testimonials.",
    link: "",
    image: "/webp/Home/venice_porto1.webp",
    techStack: ["Next.js", "Tailwind CSS"],
  },
  {
    title: "Full-Stack WhatsApp Bot",
    desc: "An automated WhatsApp bot solution with an interactive management dashboard.",
    link: "",
    image: "/webp/Home/botwhatsapp.webp",
    techStack: ["React", "Node.js", "Express"],
  },
  {
    title: "Project Keempat",
    desc: "A brief description for the fourth project will appear here on hover.",
    link: "",
    image: "https://placehold.co/300x250.webp",
    techStack: ["Angular", "RxJS", "MongoDB"],
  },
];

const cardsBottom: CardItem[] = [
  {
    title: "Bottom 1",
    desc: "",
    image: "https://placehold.co/300x250.webp",
    techStack: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Bottom 2",
    desc: "",
    image: "https://placehold.co/300x250.webp",
    techStack: ["Ruby", "HTML/CSS", "PostgreSQL"],
  },
  {
    title: "Bottom 3",
    desc: "",
    image: "https://placehold.co/300x250.webp",
    techStack: ["Django", "Python", "MySQL"],
  },
  {
    title: "Bottom 4",
    desc: "",
    image: "https://placehold.co/300x250.webp",
    techStack: ["Go", "Gin", "Redis"],
  },
];
