import Section from "@/components/Utils/Section";
// import { HoverEffect } from "@/components/Ui/card-hover";
import Marquee from "react-fast-marquee";
import link from "next/link";

export default function Projects() {
  return (
    <Section id="projects" className="mx-auto h-screen max-w-3xl px-8">
      {/* <HoverEffect items={projects} /> */}
      <h1 className="flex justify-center pb-4 text-3xl font-bold text-white">
        Our projects
      </h1>

      <div className="space-y-6 bg-transparent py-8">
        <Marquee speed={10} direction="right" gradient={false} pauseOnHover>
          {cardsTop.map((item, i) => (
            <div
              key={i}
              className="mx-4 w-64 flex-shrink-0 rounded-md bg-gray-700 p-4 shadow-md"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
            </div>
          ))}
        </Marquee>

        {/* Baris Bawah ke kiri */}
        <Marquee speed={10} direction="left" gradient={false} pauseOnHover>
          {cardsBottom.map((item, i) => (
            <div
              key={i}
              className="mx-4 w-64 flex-shrink-0 rounded-md bg-gray-700 p-4 shadow-md"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}

const cardsTop = [
  { title: "Top 1", desc: "Deskripsi atas 1", link: "" },
  { title: "Top 2", desc: "Deskripsi atas 2", link: "" },
  { title: "Top 3", desc: "Deskripsi atas 3", link: "" },
  { title: "Top 4", desc: "Deskripsi atas 4", link: "" },
];

const cardsBottom = [
  { title: "Bottom 1", desc: "Deskripsi bawah 1" },
  { title: "Bottom 2", desc: "Deskripsi bawah 2" },
  { title: "Bottom 3", desc: "Deskripsi bawah 3" },
  { title: "Bottom 4", desc: "Deskripsi bawah 4" },
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
