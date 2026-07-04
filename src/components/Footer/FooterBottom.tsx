"use client";

import { memo } from "react";
import Link from "next/link";

function FooterBottomComponent() {
  const year = new Date().getFullYear();

  return (
    <div
      className="
        flex flex-col md:flex-row
        items-center justify-between
        gap-3
        text-center md:text-left
      "
    >
      <div className="flex flex-col gap-2">
        <p className="text-[12px] text-[#F5EFE4]/45 leading-relaxed">
          © {year} Patel Tent &amp; Event Management. All Rights Reserved.
        </p>
        <p className="text-[12px] text-[#F5EFE4]/45 leading-relaxed">
          Designed with care in Udaipur, Rajasthan.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 mt-4 md:mt-0">
        <Link href="/privacy-policy" className="text-[11px] text-[#F5EFE4]/45 hover:text-[#C7A66A] transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="text-[11px] text-[#F5EFE4]/45 hover:text-[#C7A66A] transition-colors">Terms &amp; Conditions</Link>
        <Link href="/cookie-policy" className="text-[11px] text-[#F5EFE4]/45 hover:text-[#C7A66A] transition-colors">Cookie Policy</Link>
        <Link href="/disclaimer" className="text-[11px] text-[#F5EFE4]/45 hover:text-[#C7A66A] transition-colors">Disclaimer</Link>
      </div>
    </div>
  );
}

export const FooterBottom = memo(FooterBottomComponent);
