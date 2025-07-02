"use client";
import { cn, random } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import * as blobv2 from "blobs/v2";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

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

interface BlobData {
  id: number;
  y: number;
  x: number;
  size: number;
  gradientIndex: number;
  blobIndex: number;
}

export default function Blobs({
  amount,
  className,
  animated = true,
  floating = true,
}: BlobsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobsGenerated, setBlobsGenerated] = useState<BlobData[] | null>([]);

  useEffect(() => {
    const totalGradients = GRADIENTS.length;

    setBlobsGenerated(
      Array.from({ length: amount }, (_, i) => ({
        id: i,
        x: random(containerRef.current!.offsetWidth),
        y: random(containerRef.current!.offsetHeight),
        size: random(80, 200),
        gradientIndex: random(totalGradients - 1),
        blobIndex: i,
      })),
    );
  }, [amount]);

  useGSAP(
    () => {
      if (!floating || !containerRef.current || !blobsGenerated?.length) return;

      const blobElements = gsap.utils.toArray<HTMLDivElement>(
        ".blob-item",
        containerRef.current,
      );

      function setVelocity() {
        blobElements.forEach((blob) => {
          const speed = random(0.03, 0.07, true);
          const angle = random(0, 360, true) * (Math.PI / 180);
          (blob as any).vx = Math.cos(angle) * speed;
          (blob as any).vy = Math.sin(angle) * speed;
        });
      }

      blobElements.forEach((blob, i) => {
        const { x, y } = blobsGenerated[i];
        gsap.set(blob, { x, y });
      });

      gsap.fromTo(
        blobElements,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.3,
          duration: 1,
        },
      );

      setVelocity();

      const updateAnimation: GSAPTickerCallback = (_time, deltaTime) => {
        blobElements.forEach((blob) => {
          const neutralBlob = blob as any;
          const svgElement = blob.querySelector("svg") as SVGSVGElement;
          const container = {
            width: containerRef.current!.offsetWidth,
            height: containerRef.current!.offsetHeight,
          };
          const blobProperty = {
            width: svgElement.width.baseVal.value,
            height: svgElement.height.baseVal.value,
          };

          const currentPos = {
            x: gsap.getProperty(blob, "x") as number,
            y: gsap.getProperty(blob, "y") as number,
          };

          currentPos.x += neutralBlob.vx * deltaTime;
          currentPos.y += neutralBlob.vy * deltaTime;

          if (
            currentPos.x + blobProperty.width > container.width ||
            currentPos.x < 0
          ) {
            neutralBlob.vx *= -1;
            currentPos.x = Math.max(
              0,
              Math.min(currentPos.x, container.width - blobProperty.width),
            );
          }

          if (
            currentPos.y + blobProperty.height > container.height ||
            currentPos.y < 0
          ) {
            neutralBlob.vy *= -1;
            currentPos.y = Math.max(
              0,
              Math.min(currentPos.y, container.height - blobProperty.height),
            );
          }

          gsap.set(blob, { ...currentPos });
        });
      };

      gsap.ticker.add(updateAnimation);
      return () => gsap.ticker.remove(updateAnimation);
    },
    { scope: containerRef, dependencies: [floating, blobsGenerated] },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 -z-[99999] h-full w-full overflow-hidden blur-xs",
        className,
      )}
    >
      {blobsGenerated &&
        blobsGenerated.map((blob) => (
          <div key={blob.id} className="blob-item absolute">
            <Blob
              size={blob.size}
              gradientIndex={blob.gradientIndex}
              blobIndex={blob.blobIndex}
              animated={animated}
              absolutePosition={false}
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

      function animate() {
        tl.to(blobRef.current, {
          duration: 2,
          ease: "none",
          morphSVG: {
            shape: randomPath(),
            type: "rotational",
          },
          onComplete: animate,
        });
      }

      animate();
    },
    { scope: svgRef, dependencies: [animated] },
  );

  return (
    <svg
      className={cn(absolutePosition && "absolute", className)}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      width={width}
      height={height}
      preserveAspectRatio="none"
      style={{opacity: 0.8}}
    >
      <defs>
        {(() => {
          const { from, to } = GRADIENTS[gradientIndex]; // Access directly since gradientIndex is 1-based
          return (
            <linearGradient
              id={`gradient-${gradientIndex}-${uniqueId}`}
              gradientTransform="rotate(45)"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          );
        })()}
      </defs>
      <path
        d={randomPath()}
        id={`blob-${blobIndex}`}
        ref={blobRef}
        fill={`url(#gradient-${gradientIndex}-${uniqueId})`}
      />
    </svg>
  );
}

function randomPath(options?: {
  size?: number;
  points?: number;
  randomness?: number;
  seed?: number;
}): string {
  return blobv2.svgPath({
    size: options?.size ?? 256,
    extraPoints: options?.points ?? 4,
    seed: options?.seed ?? Math.random(),
    randomness: options?.randomness ?? 5,
  });
}
