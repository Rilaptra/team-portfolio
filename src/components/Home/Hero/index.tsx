// import Blobs from "./Blobs";
import FlipText from "./FlipText";
import Section from "@/components/Utils/Section";
import Blobs, { Blob } from "./SVGBlobs";

export default function Hero() {
  return (
    <Section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <FlipText />
      {/* <Blobs amount={10} animated className="h-full" /> */}
      {/* {new Array(10).fill(0).map((_, i) => (
        <Blob
          size={{ width: 200, height: 100 }}
          animated={true}
          key={i}
          gradientIndex={(i + 1) % 10}
          blobIndex={i}
        />
      ))} */}
      <Blobs amount={12} animated floating />
    </Section>
  );
}
