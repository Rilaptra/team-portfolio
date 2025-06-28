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
    <div className="mx-auto flex w-full flex-col overflow-hidden text-center text-4xl font-bold text-neutral-600 uppercase transition-colors duration-300 dark:text-neutral-200">
      {/* [Rizqi, Huddin, sava] they are trio developer, powered by AI, AI for all!*/}
      {/* We turn your [Ideas, Products, Sketches, Dreams, Lines of Code, Stories, Solution] into reality */}
      <span>We build</span>
      <div className="relative overflow-visible">
        <FlipWords
          words={words}
          className="text-[#76ABAE] dark:text-[#76ABAE]"
          duration={5000}
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
