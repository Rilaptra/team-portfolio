import { FlipWords } from "@/components/Ui/textflip";

export default function FlipText() {
  const words = [
    "powerful websites",
    "professional chatbots",
    "IoT solutions",
    "custom tools",
    "secure systems",
  ];
  // const words = ["better", "cute", "beautiful", "modern"];

  return (
    <div className="mx-auto flex flex-col overflow-hidden text-4xl font-bold text-neutral-600 uppercase dark:text-neutral-200">
      {/* [Rizqi, Huddin, sava] they are trio developer, powered by AI, AI for all!*/}
      {/* We turn your [Ideas, Products, Sketches, Dreams, Lines of Code, Stories, Solution] into reality */}
      <span>We build</span>
      <div className="relative overflow-visible">
        <FlipWords
          words={words}
          className="text-[#76ABAE] dark:text-[#76ABAE]"
          duration={600000}
        />
      </div>
      <span className="mt-2 block text-sm font-normal text-neutral-500 dark:text-neutral-400">
        Tailored to your needs. Built to perform.
      </span>
      {/* about us, read below */}
      {/* You will be familiar with us */}
      {/* powered by Code & Coffee ☕ */}
    </div>
  );
}
