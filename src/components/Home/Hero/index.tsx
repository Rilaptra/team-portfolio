import Blobs from "./SVGBlobs";
import FlipText from "./FlipText";
import Section from "@/components/Utils/Section";

export default function Hero() {
  return (
    <Section
      id="hero"
      className="flex min-h-screen items-center justify-center px-4 pt-10"
    >
      <div className="flex w-full">
        <div className="flex-1">
          <FlipText />
        </div>
        {/* <div className="flex-1">
          <FlipText />
        </div> */}
      </div>
      {/* blobs bikin laptopku lag. bentar ku disable */}
      {/* solusi : animated = false */}
      <Blobs amount={10} animated={true} floating />
    </Section>
  );
}
