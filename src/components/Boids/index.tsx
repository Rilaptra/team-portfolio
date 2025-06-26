// components/Boids/BoidsComponent.tsx
"use client";

import React, { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { boidsSketch, BoidsSketchProps } from "./boidsSketch";

// how to use:
// import dynamic from "next/dynamic";
// const BoidsComponent = dynamic(
//   () => import('../components/Boids/BoidsComponent').then(mod => mod.BoidsComponent),
//   { ssr: false }
// );

// Import UI dari ShadCN atau komponen lo sendiri
import { Slider } from "@/components/Ui/slider";

export function BoidsComponent() {
  const [boidsCount, setBoidsCount] = useState<number>(100);
  const [separation, setSeparation] = useState<number>(1.5);
  const [alignment, setAlignment] = useState<number>(1.0);
  const [cohesion, setCohesion] = useState<number>(1.0);

  // Gabungkan semua props yang akan dikirim ke sketch p5
  const sketchProps: BoidsSketchProps = {
    boidsCount,
    separation,
    alignment,
    cohesion,
  };

  return (
    <div className="font-inter relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-900">
      {/* Wrapper p5 akan membuat canvas di dalam div ini */}
      <div className="absolute inset-0 z-0">
        <ReactP5Wrapper sketch={boidsSketch} {...sketchProps} />
      </div>

      {/* Panel kontrol UI */}
      <div className="bg-opacity-75 z-10 flex flex-col gap-4 rounded-lg bg-gray-800 p-6 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-extrabold text-white">
          Boids in Next.js ✨
        </h1>
        {/* Kontrol UI (Slider, dll.) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg text-white">
              Jumlah Boids: <span className="font-semibold">{boidsCount}</span>
            </span>
            <Slider
              defaultValue={[boidsCount]}
              min={10}
              max={500}
              step={10}
              onValueChange={(val) => setBoidsCount(val[0])}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg text-white">
              Separation:{" "}
              <span className="font-semibold">{separation.toFixed(1)}</span>
            </span>
            <Slider
              defaultValue={[separation]}
              min={0.0}
              max={5.0}
              step={0.1}
              onValueChange={(val) => setSeparation(val[0])}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg text-white">
              Alignment:{" "}
              <span className="font-semibold">{alignment.toFixed(1)}</span>
            </span>
            <Slider
              defaultValue={[alignment]}
              min={0.0}
              max={5.0}
              step={0.1}
              onValueChange={(val) => setAlignment(val[0])}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg text-white">
              Cohesion:{" "}
              <span className="font-semibold">{cohesion.toFixed(1)}</span>
            </span>
            <Slider
              defaultValue={[cohesion]}
              min={0.0}
              max={5.0}
              step={0.1}
              onValueChange={(val) => setCohesion(val[0])}
              className="w-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
