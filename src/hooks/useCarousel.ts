"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
}

export function useCarousel(): UseCarouselReturn {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 4);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const getScrollAmount = useCallback((): number => {
    const el = scrollRef.current;
    if (!el) return 0;

    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return el.clientWidth;

    // Card width + gap
    const cardWidth = firstCard.offsetWidth;
    const styles = window.getComputedStyle(el);
    const gap = parseInt(styles.gap || "24", 10);

    return cardWidth + gap;
  }, []);

  const scrollPrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Set scrollLeft directly; CSS 'scroll-smooth' handles the animation
    el.scrollLeft -= getScrollAmount();
  }, [getScrollAmount]);

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft += getScrollAmount();
  }, [getScrollAmount]);

  return {
    scrollRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  };
}
