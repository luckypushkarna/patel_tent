"use client";

import { memo } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/navigation";

function NavLinksComponent() {
  return (
    <ul className="flex items-center gap-[56px]">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="
              group relative
              text-[15px] font-medium uppercase tracking-[0.10em]
              text-[#F6F1E8]/[0.92]
              transition-colors duration-[250ms] ease-out
              hover:text-[#F6F1E8]
              focus-visible:outline-none focus-visible:text-[#F6F1E8]
            "
          >
            {link.label}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-0 -bottom-2
                h-[2px] w-full
                origin-left scale-x-0
                bg-[#D8B67A]
                transition-transform duration-[350ms] ease-out
                group-hover:scale-x-100
                group-focus-visible:scale-x-100
              "
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const NavLinks = memo(NavLinksComponent);
