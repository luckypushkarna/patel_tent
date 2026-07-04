"use client";

import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { CloudinaryVideo } from "@/components/CloudinaryVideo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || isVideo) return;
    if (!mediaRef.current) return;

    // Scroll zoom scrub only — no entrance pop-up
    const mm = gsap.matchMedia();
    mm.add("all", () => {
      gsap.fromTo(
        mediaRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 95%",
            end: "center 40%",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [isVideo]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full overflow-hidden rounded-2xl bg-[#DDD5C9] ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={!src ? alt : undefined}
    >
      {src ? (
        isVideo ? (
          <div ref={mediaRef} className="absolute inset-0 h-full w-full">
            <CloudinaryVideo 
              publicId={src} 
              width={width}
              className={`w-full h-full object-${objectFit} ${objectPosition === 'bottom' ? 'object-bottom' : objectPosition === 'top' ? 'object-top' : 'object-center'}`} 
            />
          </div>
        ) : (
          <div ref={mediaRef} className="absolute inset-0 h-full w-full">
            <CloudinaryImage 
              publicId={src} 
              alt={alt} 
              width={width}
              height={height}
              className={`w-full h-full object-${objectFit} ${objectPosition === 'bottom' ? 'object-bottom' : objectPosition === 'top' ? 'object-top' : 'object-center'}`} 
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
