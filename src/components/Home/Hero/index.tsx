import Blobs from "./Blobs";
import FlipText from "./FlipText";

export default function Hero() {
  return (
    <section className="flex min-h-[40rem] flex-col items-center justify-center px-4">
      <FlipText />
      <Blobs amount={12} animated />
    </section>
  );
}
