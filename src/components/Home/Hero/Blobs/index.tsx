import { cn, random } from "@/lib/utils";
import { getRandomBorderRadiusValue } from "@/lib/utils";
import {
  type CSSProperties,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";

const gradientColorsList: string[] = [
  "from-purple-400 to-indigo-600",
  "from-pink-400 to-rose-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-600",
  "from-blue-400 to-cyan-600",
  "from-fuchsia-400 to-purple-600",
  "from-lime-400 to-green-600",
  "from-red-400 to-pink-600",
  "from-violet-400 to-indigo-600",
];
interface BlobsProps {
  className?: string;
  amount: number;
  animated?: boolean;
}

export default function Blobs({ className, amount, animated }: BlobsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const measureContainer = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    measureContainer();

    window.addEventListener("resize", measureContainer);

    return () => {
      window.removeEventListener("resize", measureContainer);
    };
  }, []);

  // 1. Memoize data STATIS blob (seperti KTP: warna, ukuran awal, dll).
  // Hook ini HANYA bergantung pada `amount`, jadi tidak akan jalan lagi saat resize.
  const blobsData = useMemo(() => {
    return Array.from({ length: amount }).map((_, i) => ({
      key: i,
      size: random(20, 150),
      gradientClass: random(gradientColorsList)!,
      // Simpan juga style non-posisi di sini
      initialStyle: {
        filter: `blur(${random(3, 5)}px)`,
        opacity: random(0.7, 1),
      },
    }));
  }, [amount]);

  // 2. Memoize komponen Blob yang sudah jadi.
  // Hook ini akan jalan lagi saat `containerSize` berubah, TAPI...
  // ...ia akan menggunakan `blobsData` yang sama (warnanya tetap).
  const memoizedBlobs = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) {
      return null;
    }

    // Mapping dari data yang sudah statis
    return blobsData.map((data) => (
      <Blob
        key={data.key}
        containerSize={containerSize}
        animated={animated}
        size={data.size}
        gradientClass={data.gradientClass}
        style={{
          // Gabungkan style statis dengan posisi awal yang dinamis
          ...data.initialStyle,
          top: random(0, containerSize.height),
          left: random(0, containerSize.width),
        }}
      />
    ));
  }, [blobsData, containerSize, animated]); // Bergantung pada data statis & containerSize

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 -z-[99999] overflow-hidden",
        className,
      )}
    >
      {memoizedBlobs}
    </div>
  );
}

interface SingleBlobProps {
  size: number | { width: number; height: number };
  animated?: boolean;
  className?: string;
  gradientClass: string;
  style: CSSProperties;
  containerSize: { width: number; height: number };
}

export function Blob({
  size,
  animated,
  style,
  className,
  gradientClass,
  containerSize,
}: SingleBlobProps) {
  const [borderRadii, setBorderRadii] = useState<string>("0px");
  const blobRef = useRef<HTMLDivElement>(null);

  const position = useRef({
    x: style.left as number,
    y: style.top as number,
  });
  const velocity = useRef({
    vx: random(-0.75, 0.75),
    vy: random(-0.75, 0.75),
  });

  const rotation = useRef(0);
  const rotationSpeed = useRef(
    random(0.1, 0.4) * (Math.random() > 0.5 ? 1 : -1),
  );

  const animationFrameId = useRef<number>(0);

  const blobSize = useMemo(() => {
    return typeof size === "number" ? { width: size, height: size } : size;
  }, [size]);

  useEffect(() => {
    const move = () => {
      position.current.x += velocity.current.vx;
      position.current.y += velocity.current.vy;

      rotation.current += rotationSpeed.current;

      // Check for horizontal collisions
      if (
        position.current.x <= 0 ||
        position.current.x + blobSize.width >= containerSize.width
      ) {
        velocity.current.vx *= -1;
        // Adjust position slightly to prevent sticking
        if (position.current.x < 0) position.current.x = 0;
        if (position.current.x + blobSize.width > containerSize.width)
          position.current.x = containerSize.width - blobSize.width;
      }
      // Check for vertical collisions
      if (
        position.current.y <= 0 ||
        position.current.y + blobSize.height >= containerSize.height
      ) {
        velocity.current.vy *= -1;
        // Adjust position slightly to prevent sticking
        if (position.current.y < 0) position.current.y = 0;
        if (position.current.y + blobSize.height > containerSize.height)
          position.current.y = containerSize.height - blobSize.height;
      }

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) rotate(${rotation.current}deg)`;
      }

      animationFrameId.current = requestAnimationFrame(move);
    };

    if (animated && containerSize.width > 0 && containerSize.height > 0) {
      animationFrameId.current = requestAnimationFrame(move);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animated, containerSize, blobSize]);

  const getMeanSize = useCallback(() => {
    return typeof size === "number" ? size : (size.width + size.height) >> 1;
  }, [size]);

  const updateBorderRadius = useCallback(() => {
    const mean = getMeanSize();
    setBorderRadii(
      getRandomBorderRadiusValue(
        Math.max(1, mean >> 1),
        Math.max(1, mean << 1),
      ),
    );
  }, [getMeanSize]);

  useEffect(() => {
    updateBorderRadius();
  }, [updateBorderRadius]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (animated) {
      intervalId = setInterval(() => {
        updateBorderRadius();
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [animated, updateBorderRadius]);

  return (
    <div
      ref={blobRef}
      style={{
        width: `${blobSize.width}px`,
        height: `${blobSize.height}px`,
        borderRadius: borderRadii,
        transition: animated ? `border-radius 2s ease-in-out` : "none",
        filter: style.filter,
        opacity: style.opacity,
        willChange: "transform",
      }}
      className={cn(
        `absolute bg-gradient-to-br transition-all`,
        gradientClass,
        className,
      )}
    ></div>
  );
}
