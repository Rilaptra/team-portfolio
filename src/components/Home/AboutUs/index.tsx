"use client"; // Diperlukan karena kita menggunakan hook useState

import { Button } from "@/components/Ui/button";
import Section from "@/components/Utils/Section";
import { Blob } from "../Hero/SVGBlobs";
import {
  MoveRight,
} from "lucide-react";
import SwitchPage from "@/components/Utils/SwitchPage";
import { useState, useEffect } from "react";

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Section id="aboutUs" minHeightScreen={false} className="w-full">
      <div className="mx-auto grid max-w-screen-lg grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            WHO WE ARE
          </h2>
          <h3 className="text-foreground text-3xl leading-tight font-bold md:text-4xl">
            Architects of Digital Solutions.
          </h3>
          <p className="text-muted-foreground mt-2">
            Kami adalah tim fullstack developer yang bersemangat memecahkan
            masalah kompleks dengan teknologi terkini. Bagi kami, software
            terbaik lahir dari kemitraan yang erat dan pemahaman mendalam akan
            tujuan bisnis Anda.
          </p>
          <Button variant="outline" className="mt-4 self-center md:self-start">
            <SwitchPage noButton href="/about" className="flex items-center">
              Learn More <MoveRight className="ml-2 h-4 w-4" />
            </SwitchPage>
          </Button>
        </div>
        <div className="mx-auto flex w-full items-center justify-center">
          <Blob
            blobIndex={100}
            gradientIndex={0}
            size={320}
            absolutePosition={false}
            animated
          />
        </div>
        {/* <div className="bg-card relative flex h-80 items-center justify-center rounded-lg border">
          <span className="text-muted-foreground">Visual Element Here</span>
        </div> */}
      </div>
    </Section>
  );
}
