// src/components/About/index.tsx
import Section from "../Utils/Section";
import { ProfileCard } from "./ProfileCard";
import { useTranslations } from "next-intl";

export default function Abouts() {
  const t = useTranslations("AboutPage");

  return (
    <Section id="about-us" className="min-h-screen py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-black transition-colors duration-300 sm:text-5xl dark:text-white">
          {t("title")
            .split(" ")
            .map((word, index) => (
              <span
                key={index}
                className={
                  index % 2 === 0
                    ? ""
                    : "bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"
                }
              >
                {word}&nbsp;
              </span>
            ))}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl text-center text-lg leading-8">
          {t("subtitle")}
        </p>
      </div>
      <ProfileCard />
    </Section>
  );
}
