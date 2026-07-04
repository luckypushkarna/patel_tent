"use client";

import { useEffect, useRef, useState, memo } from "react";
import ReactDOM from "react-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface PreloaderProps {
  duration?: number;
  exitDelay?: number;
  onComplete?: () => void;
}

// FIX M3: ReactDOM.preload must be called once at module level — NOT inside a
// component body. Calling it inside the component calls it on every render.
if (typeof window !== "undefined") {
  ReactDOM.preload("/lottie/loading.lottie", { as: "fetch", crossOrigin: "anonymous" });
}

export const Preloader = memo(function Preloader({
  duration = 1800,
  exitDelay = 180,
  onComplete,
}: PreloaderProps) {

  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  const rafRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const completeTimerRef = useRef<number | null>(null);
  const originalOverflow = useRef<string>("");
  const originalPaddingRight = useRef<string>("");

  useEffect(() => {
    originalOverflow.current = document.body.style.overflow;
    originalPaddingRight.current = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        document.body.style.overflow = originalOverflow.current;
        document.body.style.paddingRight = originalPaddingRight.current;
      };
    }

    return () => {
      document.body.style.overflow = originalOverflow.current;
      document.body.style.paddingRight = originalPaddingRight.current;
    };
  }, []);

  // Use a ref to get the latest pageLoaded value inside the animation loop without restarting it
  const pageLoadedRef = useRef(pageLoaded);
  useEffect(() => {
    pageLoadedRef.current = pageLoaded;
  }, [pageLoaded]);

  useEffect(() => {
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;

      // We wait until AT LEAST `duration` has passed AND the page is fully loaded.
      if (elapsed < duration || !pageLoadedRef.current) {
        rafRef.current = window.requestAnimationFrame(animate);
      } else {
        exitTimerRef.current = window.setTimeout(() => {
          setIsExiting(true);

          completeTimerRef.current = window.setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
        }, exitDelay);
      }
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
      if (completeTimerRef.current) window.clearTimeout(completeTimerRef.current);
    };
  }, [duration, exitDelay, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!isExiting}
      className={`
        fixed inset-0 z-[1000] flex flex-col items-center justify-center
        bg-[#F3EBE1]
        transition-all duration-500 ease-out
        ${isExiting ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      <div className="flex flex-col items-center justify-center px-4 text-center">
        {/* Minimalist Animation block - Increased Size */}
        <div className="relative flex h-[200px] w-[200px] items-center justify-center md:h-[280px] md:w-[280px]">
          <div className="relative z-10 w-full h-full">
            <DotLottieReact
              src="/lottie/loading.lottie"
              autoplay
              loop
            />
          </div>
        </div>

        {/* Brand - Big, Bold, Minimal */}
        <h1 className="mt-2 mb-6 text-[20px] md:text-[28px] font-extrabold uppercase tracking-[0.35em] text-[#032B53]">
          PATEL TENT
        </h1>

        {/* Prototype message */}
        <p className="max-w-[320px] px-4 text-center text-[13px] leading-relaxed text-[#032B53]/70 md:max-w-[400px] md:text-[14px]">
          Please Note: This website is an interactive prototype and does not
          represent final production quality. Enjoy the design layouts and
          creative concepts.
        </p>
      </div>
    </div>
  );
});
