"use client";

import { memo } from "react";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function CarouselControlsComponent({
  onPrev,
  onNext,
  canPrev,
  canNext,
}: CarouselControlsProps) {
  const baseButton = `
    inline-flex items-center justify-center
    w-9 h-9
    border border-[#D7D7D7]
    rounded-md
    bg-white
    text-[#0B3558]
    transition-all duration-[250ms] ease-out
    hover:bg-[#F6F4EF]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3558]/30 focus-visible:ring-offset-2
    disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white
  `;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous slide"
        className={baseButton}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next slide"
        className={baseButton}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

export const CarouselControls = memo(CarouselControlsComponent);
