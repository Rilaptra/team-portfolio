"use client";

import AboutUs from "./AboutUs";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import Projects from "./Projects";
import SideBar from "../SideBar";
import Main from "../Utils/Main";
import Promotion from "./Promotion";

export default function Home() {
  return (
    <Main id="home">
      {/* <SideBar /> */}

      <Hero />

      <AboutUs />

      <Projects />

      <WhyChooseUs />

      <Promotion />
    </Main>
  );
}
