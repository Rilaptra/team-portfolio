import About from "@/components/About";
export async function generateMetadata() {
  return {
    title: "Portfolio | About",
  };
}

export default function () {
  return <About />;
}
