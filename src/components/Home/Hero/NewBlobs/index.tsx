import { useEffect, useRef, useState } from "react";
import * as blobv2 from "blobs/v2";
import { random } from "@/lib/utils";

export default function Blobs({ amount }: { amount: number }) {
  const [seed, setSeed] = useState(Math.random());
  const intervalRef = useRef<number | null>(null);

  const regenerateBlob = () => {
    setSeed(Math.random());
  };

  const startRegenerating = () => {
    if (intervalRef.current !== null) return; // Prevent multiple intervals
    regenerateBlob(); // Regenerate immediately on press
    intervalRef.current = window.setInterval(() => {
      regenerateBlob();
    }, 50);
  };

  const stopRegenerating = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup interval on unmount
    return () => {
      stopRegenerating();
    };
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <button
        onMouseDown={startRegenerating}
        onMouseUp={stopRegenerating}
        onMouseLeave={stopRegenerating} // Stop if mouse leaves button while held
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 100000,
          padding: "8px 16px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Re-render Blob
      </button>
      <svg
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width={256}
        height={256}
      >
        <path
          d={blobv2.svgPath({
            extraPoints: random(4, 7),
            randomness: 5,
            seed: seed,
            size: 256,
          })}
        ></path>
      </svg>
    </div>
  );
}
