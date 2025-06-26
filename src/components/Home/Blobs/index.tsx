import { getRandomBorderRadiusValue } from "@/utils/utils";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  amount: number;
}
export default function Blobs({ className, amount }: Props) {
  return <div className={className}></div>;
}

interface SingleBlobProps {
  size: number | { width: number; height: number };
  animated?: boolean;
  className?: string;
}
export function Blob({ size, animated, className }: SingleBlobProps) {
  const [borderRadii, setBorderRadii] = useState<string | null>(null);

  useEffect(() => {
    const mean =
      typeof size === "number" ? size : (size.width + size.height) >> 1;
    setBorderRadii(getRandomBorderRadiusValue(mean >> 1, mean << 1));
  }, []);

  useEffect(() => {
    if (animated) {
      const mean =
        typeof size === "number" ? size : (size.width + size.height) >> 1;
      setBorderRadii(getRandomBorderRadiusValue(mean >> 1, mean << 1));
    }
  }, [borderRadii]);
  return <div></div>;
}
