import Section from "@/components/Utils/Section";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <Section
      id="projects"
      className="mx-auto h-screen max-w-5xl"
      padding={false}
    >
      <h1 className="flex justify-center text-3xl font-bold text-gray-500">
        Our Mini Projects
      </h1>

      <div className="h-[570px] space-y-6 bg-transparent">
        <Marquee speed={10} direction="right" gradient={false} pauseOnHover>
          {cardsTop.map((item, i) => (
            <div
              key={i}
              className="mr-6 mb-5 h-[250px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl bg-white pt-2 pb-2 shadow-lg hover:shadow-xl dark:bg-neutral-800"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={100}
                className="mb-4 h-32 w-full rounded-md object-cover"
                loading="lazy"
                unoptimized
              />
              <h3 className="pb-2 text-lg font-semibold text-gray-600 dark:text-gray-300">
                {item.title}
              </h3>
              {item.techStack.map((tech, j) => (
                <span
                  key={j}
                  className="mr-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-purple-900 dark:bg-purple-900/20 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </Marquee>

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
              className="mr-6 h-[250px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl bg-white p-4 pt-2 pb-4 shadow-lg hover:shadow-xl dark:bg-neutral-800"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={100}
                className="mb-4 h-32 w-full rounded-md object-cover"
                loading="lazy"
                unoptimized
              />
              <h3 className="pb-2 text-lg font-semibold text-gray-600 dark:text-gray-300">
                {item.title}
              </h3>
              {item.techStack.map((tech, j) => (
                <span
                  key={j}
                  className="mr-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-purple-900 dark:bg-purple-900/20 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {item?.desc && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {item?.desc}
                </p>
              )}
            </div>
          ))}
        </Marquee>
      </div>
      <div className="flex justify-center">
        <Link href="/contact">
          <button className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 dark:bg-purple-900/20">
            make website
          </button>
        </Link>
      </div>
    </Section>
  );
}

interface CardItem {
  title: string;
  desc?: string; // Optional, karena kamu pakai komentar di data
  image: string;
  techStack: string[];
  link?: string; // Optional karena hanya digunakan di cardsTop
}

const cardsTop: CardItem[] = [
  {
    title: "Top 1",
    // desc: "Deskripsi atas 1",
    link: "",
    image: "https://placehold.co/200x100.webp",
    techStack: ["Laravel", "Vue.js", "PostgreSQL"],
  },
  {
    title: "Top 2",
    // desc: "Deskripsi atas 2",
    link: "",
    image: "https://placehold.co/200x100.webp",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Top 3",
    // desc: "Deskripsi atas 3",
    link: "",
    image: "https://placehold.co/200x100.webp",
    techStack: ["React", "Redux", "Node.js"],
  },
  {
    title: "Top 4",
    // desc: "Deskripsi atas 4",
    link: "",
    image: "https://placehold.co/200x100.webp",
    techStack: ["Angular", "RxJS", "MongoDB"],
  },
];

const cardsBottom: CardItem[] = [
  {
    title: "Bottom 1",
    // desc: "Deskripsi bawah 1",
    image: "https://placehold.co/200x100.webp",
    techStack: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Bottom 2",
    // desc: "Deskripsi bawah 2",
    image: "https://placehold.co/200x100.webp",
    techStack: ["Ruby", "HTML/CSS", "PostgreSQL"],
  },
  {
    title: "Bottom 3",
    // desc: "Deskripsi bawah 3",
    image: "https://placehold.co/200x100.webp",
    techStack: ["Django", "Python", "MySQL"],
  },
  {
    title: "Bottom 4",
    // desc: "Deskripsi bawah 4",
    image: "https://placehold.co/200x100.webp",
    techStack: ["Go", "Gin", "Redis"],
  },
];
