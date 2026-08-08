"use client";

import { memo } from "react";

interface NavButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

function NavButtonComponent({
  label = "Book Now",
  href = "/#contact",
  className = "",
}: NavButtonProps) {
  return (
    <a
      href={href}
      className={`
        group relative
        inline-flex items-center justify-center gap-2.5
        px-7 sm:px-8 py-3
        rounded-md
        bg-[#F3EBE1] text-[#172B3A]
        text-[13px] sm:text-[14px] font-semibold tracking-wide
        overflow-hidden
        transition-all duration-200 ease-out
        hover:bg-[#E4DCD2] hover:-translate-y-[2px]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#172B3A] focus-visible:ring-offset-2
        active:scale-[0.98]
        ${className}
      `}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {label}
    </a>
  );
}

export const NavButton = memo(NavButtonComponent);
