"use client";

import { useMemo, useState } from "react";
import { PortfolioHeader } from "./PortfolioHeader";
import { PortfolioFilters } from "./PortfolioFilters";
import { PortfolioGrid } from "./PortfolioGrid";
import { Lightbox } from "./Lightbox";
import {
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
} from "./portfolioData";

import Link from "next/link";

interface PortfolioProps {
  limit?: number;
}

export function Portfolio({ limit }: PortfolioProps = {}) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    let items = [...PORTFOLIO_ITEMS];
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (limit) {
      items = items.slice(0, limit);
    }
    return items;
  }, [activeCategory, limit]);

  return (
    <section
      id="portfolio"
      aria-label="Portfolio gallery of Patel Tent celebrations"
      className="w-full bg-brand-bg py-12 md:py-20 lg:py-28"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        <PortfolioHeader />

        <PortfolioFilters
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <PortfolioGrid
          items={filteredItems}
          filterKey={activeCategory}
          onItemClick={setLightboxIndex}
        />

        {/* Bottom note / Explore More */}
        <div className="mt-16 md:mt-24 flex flex-col items-center justify-center gap-6">
          <p className="text-[12px] uppercase tracking-[0.28em] text-brand-primary/50 text-center">
            {limit ? `Showing ${filteredItems.length} of ${PORTFOLIO_ITEMS.length}` : `${filteredItems.length} celebrations`} &middot; Handcrafted by Patel Tent
          </p>
          
          {limit && (
            <Link
              href="/gallery"
              className="
                inline-flex items-center justify-center
                px-8 py-3.5
                bg-brand-primary text-brand-light
                text-[13px] font-medium tracking-[0.05em] uppercase
                rounded-full
                transition-all duration-[300ms]
                hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg
              "
            >
              Explore More
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev !== null ? prev + 1 : null))}
          onPrev={() => setLightboxIndex((prev) => (prev !== null ? prev - 1 : null))}
        />
      )}
    </section>
  );
}
