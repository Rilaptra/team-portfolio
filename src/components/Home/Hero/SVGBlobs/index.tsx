"use client";
import { cn, random } from "@/lib/utils";
import { useId, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

const BLOB_SHAPES: string[] = [
  "M191.25,361.83C252.52,363.85,312.92,332.19,340.75,277.56C366.62,226.76,343.66,169.07,314.31,120.19C286.1,73.21,246.04,29.74,191.25,28.61C134.85,27.44,86.46,65.62,59.03,114.91C32.39,162.78,32.04,219.94,57.89,268.23C85.37,319.55,133.07,359.91,191.25,361.83",
  "M191.25,371.35C247.98,369.52,266.75,300.38,295.38,251.37C324.47,201.59,373.22,152.35,350.07,99.55C324.18,40.5,255.72,13.72,191.25,13.84C127,13.96,61.1,42.15,33.48,100.16C8.36,152.94,45.4,207.95,74.79,258.48C103.93,308.56,133.34,373.22,191.25,371.35",
  "M191.25,296.08C235.3,296.82,284.00,295.52,308.94,259.19C336.59,218.91,336.43,163.81,310.43,122.43C285.83,83.26,237.5,71.5,191.25,71.84C145.72,72.17,98.63,85.21,75.06,124.16C50.77,164.3,53.92,216.5,80.19,255.37C103.85,290.38,148.99,295.37,191.25,296.08",
  "M191.25,314.55C249.59,318.24,321.37,333.86,352.03,284.08C383.23,233.43,339.94,174.07,309.09,123.21C279.94,75.17,247.24,23.71,191.25,19.06C128.15,13.81,63.12,44.23,33.78,100.33C6,153.46,26.75,217.41,62.26,265.72C91.44,305.42,142.07,311.43,191.25,314.55",
  "M191.25,360.6C244.91,354.09,274.84,301.58,296.8,252.19C314.15,213.17,312.92,170.28,292.55,132.76C271.07,93.19,236.25,59.11,191.25,57.78C144.25,56.38,106.25,88.13,78.95,126.41C44.57,174.64,3.88,231.23,29.49,284.63C57.09,342.2,127.86,368.3,191.25,360.6",
];

const GRADIENTS: { from: string; to: string }[] = [
  { from: "var(--color-purple-400)", to: "var(--color-indigo-600)" },
  { from: "var(--color-pink-400)", to: "var(--color-rose-600)" },
  { from: "var(--color-emerald-400)", to: "var(--color-teal-600)" },
  { from: "var(--color-amber-400)", to: "var(--color-orange-600)" },
  { from: "var(--color-blue-400)", to: "var(--color-cyan-600)" },
  { from: "var(--color-fuchsia-400)", to: "var(--color-purple-600)" },
  { from: "var(--color-lime-400)", to: "var(--color-green-600)" },
  { from: "var(--color-red-400)", to: "var(--color-pink-600)" },
  { from: "var(--color-violet-400)", to: "var(--color-indigo-600)" },
];

// Definisikan tipe props untuk komponen Blobs
interface BlobsProps {
  /** Jumlah blob yang akan ditampilkan */
  amount: number;
  /** Kelas CSS tambahan untuk container */
  className?: string;
  /** Aktifkan animasi morphing pada setiap blob */
  animated?: boolean;
  /** Aktifkan animasi floating (melayang) pada setiap blob */
  floating?: boolean;
}

/**
 * Komponen untuk merender beberapa blob secara dinamis dengan
 * posisi, ukuran, dan warna acak, serta animasi melayang opsional.
 */
export default function Blobs({
  amount,
  className,
  animated = true,
  floating = true,
}: BlobsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const blobs = useMemo(() => {
    const totalGradients = GRADIENTS.length;
    const totalShapes = BLOB_SHAPES.length;

    return Array.from({ length: amount }, (_, i) => ({
      id: i,
      top: `${random(75)}%`,
      left: `${random(75)}%`,
      size: Math.random() * 120 + 80,
      gradientIndex: Math.floor(Math.random() * totalGradients) + 1,
      blobIndex: Math.floor(Math.random() * totalShapes),
    }));
  }, [amount]);

  useGSAP(
    () => {
      if (!floating || !containerRef.current) return;

      const blobElements = gsap.utils.toArray<HTMLDivElement>(
        ".blob-item",
        containerRef.current,
      );

      blobElements.forEach((blob) => {
        const svgElement = blob.querySelector("svg") as SVGSVGElement;

        if (!svgElement) return;

        const blobWidth = svgElement.width.baseVal.value;
        const blobHeight = svgElement.height.baseVal.value;

        const animateBlob = () => {
          gsap.to(blob, {
            top:
              random(0, containerRef.current!.offsetHeight - blobHeight) + "px",
            left:
              random(0, containerRef.current!.offsetWidth - blobWidth) + "px",
            rotation: random(-45, 45),
            duration: random(10, 20),
            ease: "none",
            onComplete: animateBlob,
          });
        };

        // Mulai animasi untuk pertama kali
        animateBlob();
      });
    },
    { scope: containerRef, dependencies: [floating, blobs] }, // Jalankan ulang jika floating atau blobs berubah
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 -z-[99999] h-full w-full overflow-hidden blur-xs",
        className,
      )}
    >
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className="blob-item absolute" // `blob-item` sebagai selector GSAP
          style={{ top: blob.top, left: blob.left }}
        >
          <Blob
            size={blob.size}
            gradientIndex={blob.gradientIndex}
            blobIndex={blob.blobIndex}
            animated={animated}
            absolutePosition={false} // Posisi diatur oleh div wrapper
          />
        </div>
      ))}
    </div>
  );
}

interface BlobPropsBase {
  className?: string;
  animated?: boolean;
  gradientIndex: number;
  blobIndex: number;
  absolutePosition?: boolean;
}

type BlobProps = BlobPropsBase &
  (
    | {
        size: number | { width: number; height: number };
        width?: never;
        height?: never;
      }
    | { size?: never; width: number; height: number }
  );

export function Blob({
  className,
  size,
  width: widthProp,
  height: heightProp,
  gradientIndex,
  blobIndex,
  animated,
  absolutePosition = true,
}: BlobProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const blobRef = useRef<SVGPathElement | null>(null);
  const uniqueId = useId();

  const width = size
    ? typeof size === "number"
      ? size
      : size.width
    : widthProp;
  const height = size
    ? typeof size === "number"
      ? size
      : size.height
    : heightProp;

  useGSAP(
    () => {
      if (!animated || !blobRef.current) return;

      const tl = gsap.timeline();

      function animate(usedIndex?: number) {
        let randomIndex = Math.floor(Math.random() * BLOB_SHAPES.length);
        while (randomIndex === usedIndex) {
          randomIndex = Math.floor(Math.random() * BLOB_SHAPES.length);
        }

        tl.to(blobRef.current, {
          duration: 3,
          morphSVG: BLOB_SHAPES[randomIndex],
          onComplete: () => animate(randomIndex),
        });
      }

      animate(); // Langsung panggil animasi
    },
    { scope: svgRef, dependencies: [animated] },
  );

  return (
    <svg
      className={cn(absolutePosition && "absolute", className)}
      viewBox="0 0 382.5 382.5"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      width={width}
      height={height}
      preserveAspectRatio="none"
    >
      <defs>
        {GRADIENTS.map(({ from, to }, i) => (
          <linearGradient
            key={i}
            id={`gradient-${i + 1}-${uniqueId}`}
            gradientTransform="rotate(45)"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        ))}
      </defs>
      <path
        d={BLOB_SHAPES[0]}
        id={`blob-${blobIndex}`}
        ref={blobRef}
        fill={`url(#gradient-${gradientIndex}-${uniqueId})`}
      />
    </svg>
  );
}
