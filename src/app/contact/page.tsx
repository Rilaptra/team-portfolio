import Contact from "@/components/Contact";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio | Contact",
    description: "Hubungi kami untuk memulai proyek Anda.",
  };
}

export default function ContactPage() {
  return <Contact />;
}
