import React from "react";
import { ContainerScroll } from "@/components/Ui/container-scroll";

export default function Home() {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="mt-1 text-4xl leading-none font-bold md:text-[6rem]">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <img
            src={`/vercel.svg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </>
  );
}
