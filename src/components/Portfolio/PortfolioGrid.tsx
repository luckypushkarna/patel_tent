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

  // No GSAP revealing animations per request to make it stock

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
