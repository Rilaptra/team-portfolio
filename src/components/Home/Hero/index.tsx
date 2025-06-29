import Blobs from "./Blobs";
import FlipText from "./FlipText";
import Section from "@/components/Utils/Section";

export default function Hero() {
  return (
    <Section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <FlipText />
      <Blobs amount={12} animated className="h-full" />
    </Section>
  );
}
