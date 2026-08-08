"use client";

/**
 * LazyLottie.tsx — Production-ready Lottie loader
 * Renders Lottie animations reliably with DotLottieReact, autoplay, looping, and 90% opacity.
 */

import { useState, useEffect, useRef, memo, type CSSProperties } from "react";
import dynamic from "next/dynamic";

// Dynamic import with ssr: false for client-side canvas rendering
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,168,106,0.08) 0%, rgba(243,235,225,0.04) 100%)",
        }}
        aria-hidden="true"
      />
    ),
  }
);

interface LazyLottieProps {
  src: string;
  className?: string;
  style?: CSSProperties;
  /** Used for aria-label on the placeholder */
  label?: string;
}

function LazyLottieComponent({
  src,
  className = "",
  style,
  label,
}: LazyLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{
        opacity: 0.9,
        ...style,
      }}
      aria-label={label}
      aria-hidden={!label}
    >
      {isMounted ? (
        <DotLottieReact
          src={src}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,168,106,0.08) 0%, rgba(243,235,225,0.04) 100%)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export const LazyLottie = memo(LazyLottieComponent);
