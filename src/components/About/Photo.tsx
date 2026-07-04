"use client";

import { memo } from "react";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { CloudinaryVideo } from "@/components/CloudinaryVideo";

// FIX H4: Removed the empty useEffect(() => {}, []) — it was a leftover from
// the GSAP removal and served no purpose. Every empty useEffect adds a
// React reconciler subscription with no benefit.
// FIX: Also removed unused wrapperRef and mediaRef that were held purely
// for the old GSAP animation.

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

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-[#DDD5C9] ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={!src ? alt : undefined}
    >
      {src ? (
        isVideo ? (
          <div className="absolute inset-0 h-full w-full">
            <CloudinaryVideo
              publicId={src}
              width={width}
              className={`w-full h-full object-${objectFit} ${objPos}`}
            />
          </div>
        ) : (
          <div className="absolute inset-0 h-full w-full">
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
