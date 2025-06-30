"use client";

import AboutUs from "./AboutUs";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import Projects from "./Projects";
import SideBar from "../SideBar";

export default function Home() {
  return (
    <main>
      {/* <SideBar /> */}

      <Hero />

      <AboutUs />

      <Projects />

      <WhyChooseUs />
    </main>
  );
}
