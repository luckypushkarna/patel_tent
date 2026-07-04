"use client";

import { memo, ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  actions?: ReactNode;
}

function SectionHeaderComponent({ title, actions }: SectionHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-6 mb-12 md:mb-16">
      <h2
        className="
          text-[#0B3558]
          text-[40px] md:text-[56px] lg:text-[72px]
          font-bold
          leading-[1]
          tracking-[-0.04em]
        "
      >
        {title}
      </h2>

      {actions && (
        <div className="flex-shrink-0 pb-1 md:pb-3">
          {actions}
        </div>
      )}
    </header>
  );
}

export const SectionHeader = memo(SectionHeaderComponent);
