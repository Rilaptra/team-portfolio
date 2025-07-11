// src/components/About/index.tsx

import Section from "../Utils/Section";
import { ProfileCard } from "./ProfileCard";

export default function Abouts() {
  return (
    <Section id="about-us" className="min-h-screen py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-black transition-colors duration-300 sm:text-5xl dark:text-white">
          Meet Our Team
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl text-center text-lg leading-8">
          Kami adalah trio developer yang berkolaborasi untuk mengubah ide-ide
          kompleks menjadi solusi digital yang elegan dan efisien.
        </p>
      </div>

      <div className="mx-auto mt-16">
        <ProfileCard />
      </div>
    </Section>
  );
}
