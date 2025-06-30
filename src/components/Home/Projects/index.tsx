import Section from "@/components/Utils/Section";
// import { HoverEffect } from "@/components/Ui/card-hover";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <Section id="projects" className="mx-auto h-screen max-w-3xl px-8">
      {/* <HoverEffect items={projects} /> */}
      <h1 className="flex justify-center pb-4 text-3xl font-bold text-white">
        Our projects
      </h1>

      <div className="h-[550px] space-y-6 bg-transparent">
        <Marquee speed={10} direction="right" gradient={false} pauseOnHover>
          {cardsTop.map((item, i) => (
            <div
              key={i}
              className="mx-4 h-[250px] w-[300px] flex-shrink-0 rounded-md bg-gray-700 p-4 shadow-md"
            >
              {/* <Link href={item.link}>
                <a> */}
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={100}
                className="mb-4 h-32 w-full rounded-md object-cover"
                loading="lazy"
                unoptimized
              />
              {/* </a>
              </Link> */}
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              {item.techStack.map((tech, j) => (
                <span
                  key={j}
                  className="mr-2 rounded-md bg-gray-600 px-2 py-1 text-xs text-white"
                >
                  {tech}
                </span>
              ))}
              <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2"></div>
            </div>
          ))}
        </Marquee>

        {/* Baris Bawah ke kiri */}
        <Marquee speed={10} direction="left" gradient={false} pauseOnHover>
          {cardsBottom.map((item, i) => (
            <div
              key={i}
              className="mx-4 h-[250px] w-[300px] flex-shrink-0 rounded-md bg-gray-700 p-4 shadow-md"
            >
              {/* <Link href={item.link}>
                <a> */}
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={100}
                className="mb-4 h-32 w-full rounded-md object-cover"
                loading="lazy"
                unoptimized
              />
              {/* </a>
              </Link> */}
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              {item.techStack.map((tech, j) => (
                <span
                  key={j}
                  className="mr-2 rounded-md bg-gray-600 px-2 py-1 text-xs text-white"
                >
                  {tech}
                </span>
              ))}
              <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2"></div>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="flex justify-center pt-4">
        <Link href="/contact">
          <button className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
            make website
          </button>
        </Link>
      </div>
    </Section>
  );
}

const cardsTop = [
  {
    title: "Top 1",
    desc: "Deskripsi atas 1",
    link: "",
    image: "path/to/image1.jpg",
    techStack: ["Laravel", "Vue.js", "PostgreSQL"],
  },
  {
    title: "Top 2",
    desc: "Deskripsi atas 2",
    link: "",
    image: "path/to/image2.jpg",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Top 3",
    desc: "Deskripsi atas 3",
    link: "",
    image: "path/to/image3.jpg",
    techStack: ["React", "Redux", "Node.js"],
  },
  {
    title: "Top 4",
    desc: "Deskripsi atas 4",
    link: "",
    image: "path/to/image4.jpg",
    techStack: ["Angular", "RxJS", "MongoDB"],
  },
];

const cardsBottom = [
  {
    title: "Bottom 1",
    desc: "Deskripsi bawah 1",
    image: "path/to/image5.jpg",
    techStack: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Bottom 2",
    desc: "Deskripsi bawah 2",
    image: "path/to/image6.jpg",
    techStack: ["Ruby", "HTML/CSS", "PostgreSQL"],
  },
  {
    title: "Bottom 3",
    desc: "Deskripsi bawah 3",
    image: "path/to/image7.jpg",
    techStack: ["Django", "Python", "MySQL"],
  },
  {
    title: "Bottom 4",
    desc: "Deskripsi bawah 4",
    image: "path/to/image8.jpg",
    techStack: ["Go", "Gin", "Redis"],
  },
];

// export const projects = [
//   {
//     title: "Stripe",
//     description:
//       "A technology company that builds economic infrastructure for the internet.",
//     link: "https://stripe.com",
//   },
//   {
//     title: "Netflix",
//     description:
//       "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//     link: "https://netflix.com",
//   },
//   {
//     title: "Google",
//     description:
//       "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//   },
//   {
//     title: "Meta",
//     description:
//       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: "https://meta.com",
//   },
//   {
//     title: "Amazon",
//     description:
//       "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: "https://amazon.com",
//   },
//   {
//     title: "Microsoft",
//     description:
//       "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//     link: "https://microsoft.com",
//   },
// ];
