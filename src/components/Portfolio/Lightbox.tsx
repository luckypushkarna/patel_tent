"use client";

import { useEffect, useCallback, useState } from "react";
import type { PortfolioItem } from "./portfolioData";
import { CloudinaryImage } from "@/components/CloudinaryImage";

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const currentItem = items[currentIndex];
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < items.length - 1;

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canNext) onNext();
    if (isRightSwipe && canPrev) onPrev();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canPrev) onPrev();
      if (e.key === "ArrowRight" && canNext) onNext();
    },
    [onClose, onNext, onPrev, canPrev, canNext]
  );

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!currentItem) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#181412]/95 backdrop-blur-md"
      style={{ zIndex: "var(--z-modal)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Clickable Backdrop to Close */}
      <div 
        className="absolute inset-0 z-0 cursor-pointer" 
        onClick={onClose}
        aria-label="Close Lightbox"
      />

      {/* Top Bar Indicators & Close */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 md:p-6 lg:p-8 pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-white/80 font-medium tracking-widest uppercase text-[12px] md:text-[14px]">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
        
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            pointer-events-auto
            inline-flex items-center justify-center
            w-10 h-10 md:w-12 md:h-12
            rounded-full
            bg-white/10 text-white
            transition-all duration-300
            hover:bg-white/25 hover:rotate-90
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
          "
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {/* Image Container */}
      <style>{`
        @keyframes lightboxTransition {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .lightbox-anim {
          animation: lightboxTransition 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
      
      <div 
        key={currentIndex}
        className="lightbox-anim relative z-10 w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-[75vw] max-h-[85vh] flex flex-col items-center justify-center"
      >
        <div className="mb-4 md:mb-5 text-center">
          <h2 className="text-white text-[20px] md:text-[24px] font-semibold">{currentItem.title}</h2>
          <p className="text-white/70 text-[14px] md:text-[16px] mt-1">{currentItem.location}</p>
        </div>
        <div className="relative w-full h-[65vh]">
          <CloudinaryImage
            publicId={currentItem.image}
            alt={currentItem.title}
            width={1200}
            height={900}
            className="absolute inset-0 w-full h-full object-contain rounded-md shadow-2xl"
          />
        </div>
      </div>

      {/* Bottom Controls (User Requested HTML snippet) */}
      <div className="absolute bottom-6 md:bottom-10 inset-x-0 z-20 flex justify-center">
        <div className="flex-shrink-0 pb-1 md:pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Previous slide"
              className="
                inline-flex items-center justify-center
                w-10 h-10 md:w-12 md:h-12
                border border-[#D7D7D7]/30
                rounded-md
                bg-white
                text-brand-primary
                transition-all duration-[250ms] ease-out
                hover:bg-brand-bg
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:ring-offset-2
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white
              "
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              aria-label="Next slide"
              className="
                inline-flex items-center justify-center
                w-10 h-10 md:w-12 md:h-12
                border border-[#D7D7D7]/30
                rounded-md
                bg-white
                text-brand-primary
                transition-all duration-[250ms] ease-out
                hover:bg-brand-bg
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:ring-offset-2
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white
              "
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
