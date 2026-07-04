"use client";

import { memo } from "react";
import { CATEGORIES, type PortfolioCategory } from "./portfolioData";

interface PortfolioFiltersProps {
  active: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
}

function PortfolioFiltersComponent({
  active,
  onChange,
}: PortfolioFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Portfolio categories"
      className="
        relative
        flex items-center gap-2 md:gap-3
        overflow-x-auto
        -mx-6 px-6 sm:mx-0 sm:px-0
        pb-3 mb-12 md:mb-16
        [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={`
              relative flex-shrink-0
              px-5 md:px-6 py-2.5
              text-[13px] font-medium
              tracking-[0.02em]
              rounded-full
              transition-all duration-[350ms] ease-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg
              ${
                isActive
                  ? "bg-brand-primary text-brand-light"
                  : "bg-transparent text-brand-primary/75 hover:text-brand-primary hover:bg-brand-primary/[0.04]"
              }
            `}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

export const PortfolioFilters = memo(PortfolioFiltersComponent);
