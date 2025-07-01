import Section from "@/components/Utils/Section";
import { HoverEffect } from "@/components/Ui/card-hover";

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
  },
];
export default function WhyChooseUs() {
  return (
    <Section id="whyChooseUs" className="flex w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-10">
        <div className="flex flex-col items-center">
          <h1 className="mt-10 flex text-3xl font-bold">Why Choose Us</h1>
          <h4 className="mt-5 flex max-w-4xl text-xl font-bold">
            We're more than just a web development agency. We're your partners
          </h4>
        </div>
        <div className="mt-10">
          <HoverEffect items={projects} />
        </div>
      </div>
    </Section>
  );
}
