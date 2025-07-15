import { FlipWords } from "@/components/Ui/textflip";
import { useTranslations } from "next-intl";

export default function FlipText() {
  // we build powerful websites, professional chatbots, IoT solutions, custom tools, secure systems

  const t = useTranslations("Home.Hero");

  return (
    <div className="mx-auto flex w-full flex-col overflow-hidden text-center font-bold text-neutral-600 uppercase transition-colors duration-300 dark:text-neutral-200">
      {/* [Rizqi, Huddin, sava] they are trio developer, powered by AI, AI for all!*/}
      {/* We turn your [Ideas, Products, Sketches, Dreams, Lines of Code, Stories, Solution] into reality */}
      <span className="text-[clamp(1rem, 2vw, 522px]">{t("spanOneText")}</span>
      <div className="relative overflow-visible">
        <FlipWords
          words={t.raw("words")}
          className="font-montserrat text-4xl text-teal-400"
          duration={5000}
        />
      </div>
      <span className="mt-2 block text-[15px] font-normal text-neutral-500 lg:text-sm dark:text-neutral-400">
        {t("spanTwoText")}
      </span>
      {/* about us, read below */}
      {/* You will be familiar with us */}
      {/* powered by Code & Coffee ☕ */}
    </div>
  );
}
