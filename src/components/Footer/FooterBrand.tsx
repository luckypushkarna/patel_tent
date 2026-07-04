"use client";

import { memo } from "react";

function FooterBrandComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col leading-none mb-4">
        <span className="text-[15px] md:text-[16px] font-bold uppercase tracking-[0.14em] text-[#F5EFE4]">
          Patel Tent
        </span>
        <span className="mt-[4px] text-[10px] font-normal uppercase tracking-[0.20em] text-[#F5EFE4]/60">
          Event Management
        </span>
      </div>

      <p className="max-w-[280px] text-[13.5px] leading-[1.7] text-[#F5EFE4]/70 font-normal">
        Luxury wedding decoration, premium tent setups, event styling and
        management — crafted with elegance and experience.
      </p>
    </div>
  );
}

export const FooterBrand = memo(FooterBrandComponent);
