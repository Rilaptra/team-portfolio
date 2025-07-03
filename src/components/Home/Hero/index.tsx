import Blobs from "./SVGBlobs";
import FlipText from "./FlipText";
import Section from "@/components/Utils/Section";

export default function Hero() {
  return (
    <Section
      id="hero"
      className="flex min-h-screen items-center justify-center px-4 pt-10"
    >
      <div className="flex">
        <div className="flex-1">
          <FlipText />
          <span>flip text 1</span>
        </div>
        {/* <div className="flex-1">
          <FlipText />
          <span>flip text 2</span>
        </div> */}
      </div>
      <Blobs amount={10} animated floating />
      {/* <Blobs amount={1} /> */}
    </Section>
  );
}
