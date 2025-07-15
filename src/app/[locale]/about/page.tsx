// src/app/about/page.tsx
import Abouts from "@/components/About";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio | About Us",
    description: "Kenali tim developer di balik ShareProject.",
  };
}

export default function AboutPage() {
  return <Abouts />;
}
