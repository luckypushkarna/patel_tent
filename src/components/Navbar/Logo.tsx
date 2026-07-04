"use client";

import { memo } from "react";
import Link from "next/link";
import { BRAND } from "@/constants/navigation";

function LogoComponent() {
  return (
    <Link
      href="/"
      aria-label={`${BRAND.name} — ${BRAND.subtitle}`}
      className="flex flex-col leading-none select-none"
    >
      <span
        className="text-[15px] md:text-[16px] font-bold uppercase tracking-[0.14em] text-[#F6F1E8]"
      >
        {BRAND.name}
      </span>
      <span
        className="mt-[3px] text-[9px] md:text-[10px] font-normal uppercase tracking-[0.20em] text-[#F6F1E8]/70"
      >
        {BRAND.subtitle}
      </span>
    </Link>
  );
}

export const Logo = memo(LogoComponent);
