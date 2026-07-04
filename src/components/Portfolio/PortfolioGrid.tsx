"use client";

import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioCard } from "./PortfolioCard";
import type { PortfolioItem } from "./portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  filterKey: string;
  onItemClick: (index: number) => void;
}

function PortfolioGridComponent({ items, filterKey, onItemClick }: PortfolioGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Re-animate cards whenever the filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            once: false,
          },
        }
      );
    });

    return () => mm.revert();
  }, [filterKey]);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-[14px] text-[#4B5563] italic">
          No celebrations to display in this category.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="
        grid
        grid-cols-2 sm:grid-cols-2 lg:grid-cols-3
        gap-2 sm:gap-4 md:gap-6 lg:gap-8
      "
    >
      {items.map((item, i) => (
        <PortfolioCard key={item.id} item={item} onClick={() => onItemClick(i)} />
      ))}
    </div>
  );
}

export const PortfolioGrid = memo(PortfolioGridComponent);
