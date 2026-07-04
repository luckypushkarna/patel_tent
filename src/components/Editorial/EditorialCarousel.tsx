"use client";

import { memo, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EditorialCard } from "./EditorialCard";
import { useCarousel } from "@/hooks/useCarousel";
import type { EditorialItem } from "./editorialData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EditorialCarouselProps {
  items: readonly EditorialItem[];
  renderControls?: (controls: {
    prev: () => void;
    next: () => void;
    canPrev: boolean;
    canNext: boolean;
  }) => React.ReactNode;
}

function EditorialCarouselComponent({
  items,
  renderControls,
}: EditorialCarouselProps) {
  const {
    scrollRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  } = useCarousel();

  // No GSAP revealing animations per request to make it stock

  return (
    <>
      {renderControls?.({
        prev: scrollPrev,
        next: scrollNext,
        canPrev: canScrollPrev,
        canNext: canScrollNext,
      })}

      <div
        ref={scrollRef}
        className="
          flex gap-6
          overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory
          scroll-smooth
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          -mx-6 sm:mx-0
          px-6 sm:px-0
        "
        role="region"
        aria-label="Featured celebrations carousel"
      >
        {items.map((item) => (
          <EditorialCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export const EditorialCarousel = memo(EditorialCarouselComponent);
