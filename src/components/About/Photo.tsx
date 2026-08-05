"use client";

import { memo, useRef, useEffect } from "react";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { CloudinaryVideo } from "@/components/CloudinaryVideo";

interface PhotoProps {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  isVideo?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
}

// ─── Scroll-zoom constants ───────────────────────────────────────────────────
// Scale range: image rests at SCALE_BASE and grows to SCALE_PEAK as it
// occupies more of the viewport. Keep the range ≤ 0.08 so the effect stays
// subtle and the image never clips its rounded container.
const SCALE_BASE = 1.0;
const SCALE_PEAK = 1.07;

function PhotoComponent({
  src,
  alt,
  ratio = "3/4",
  className = "",
  objectPosition = "center",
  objectFit = "cover",
  isVideo = false,
  loading,
  fetchPriority,
  width,
  height,
}: PhotoProps) {
  const objPos =
    objectPosition === "bottom"
      ? "object-bottom"
      : objectPosition === "top"
      ? "object-top"
      : "object-center";

  // Ref for the image inner wrapper — we only attach zoom to images, never videos
  const imgRef = useRef<HTMLDivElement>(null);

  // rAF handle — stored in a ref so cleanup can cancel it without a stale closure
  const rafRef = useRef<number>(0);

  // Whether this photo is inside the viewport (drives whether rAF loop runs)
  const isInViewRef = useRef(false);

  useEffect(() => {
    // Skip the effect entirely for video media
    if (isVideo) return;

    const el = imgRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion — skip entirely for accessibility
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    // ── Core rAF loop ────────────────────────────────────────────────────────
    // Runs only while the element is intersecting, reading scroll position and
    // writing a single GPU-composited `transform` property — no layout reads
    // that would cause forced reflows.
    const applyScale = () => {
      if (!isInViewRef.current) return;

      const rect = el.parentElement!.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 when bottom of card hits viewport bottom,
      //           1 when top of card reaches viewport top
      // Clamped so we never extrapolate outside the element's visible range.
      const rawProgress = 1 - rect.bottom / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Map progress → scale using a smooth ease (sinusoidal) curve so the
      // zoom doesn't feel mechanical at the end-points.
      const eased = 0.5 - Math.cos(progress * Math.PI) * 0.5;
      const scale = SCALE_BASE + (SCALE_PEAK - SCALE_BASE) * eased;

      // Write ONLY transform — compositor thread, no layout, no paint
      el.style.transform = `scale(${scale.toFixed(4)})`;

      rafRef.current = requestAnimationFrame(applyScale);
    };

    // ── IntersectionObserver — gate the rAF loop ─────────────────────────────
    // The loop only runs when the element is visible, keeping idle CPU = 0.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Start loop — cancelAnimationFrame on existing rAF first (safety)
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(applyScale);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      // Slightly expanded rootMargin so zoom begins just before the element
      // enters the viewport — removes any pop-in at the threshold.
      { rootMargin: "10% 0px" }
    );

    observer.observe(el.parentElement!);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVideo]); // re-run only if isVideo changes (it won't in practice)

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-[#DDD5C9] ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={!src ? alt : undefined}
    >
      {src ? (
        isVideo ? (
          // ── Video — no zoom, no ref ──────────────────────────────────────
          <div className="absolute inset-0 h-full w-full">
            <CloudinaryVideo
              publicId={src}
              width={width}
              className={`w-full h-full object-${objectFit} ${objPos}`}
            />
          </div>
        ) : (
          // ── Image — zoom wrapper ─────────────────────────────────────────
          // will-change: transform tells the compositor to promote this layer
          // upfront so the first frame of zoom doesn't cause a layer promotion
          // jank. transform-origin: center keeps the zoom centred.
          <div
            ref={imgRef}
            className="absolute inset-0 h-full w-full"
            style={{
              willChange: "transform",
              transformOrigin: "center center",
              // Start already at SCALE_PEAK so images that are in-view on load
              // don't snap from 1→scale on the first rAF tick
              transform: `scale(${SCALE_BASE})`,
            }}
          >
            <CloudinaryImage
              publicId={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-${objectFit} ${objPos}`}
              loading={loading}
              fetchPriority={fetchPriority}
            />
          </div>
        )
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-25">
          <div className="h-px w-8 bg-[#7A5C3E]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A5C3E]">
            Photo
          </span>
          <div className="h-px w-8 bg-[#7A5C3E]" />
        </div>
      )}
    </div>
  );
}

export const Photo = memo(PhotoComponent);

