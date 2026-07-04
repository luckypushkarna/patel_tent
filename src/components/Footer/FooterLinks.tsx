"use client";

import { memo } from "react";
import { FOOTER_NAV } from "./constants";

function FooterLinksComponent() {
  return (
    <nav aria-label="Footer navigation" className="flex flex-col">
      <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#F5EFE4]/45 mb-4">
        Explore
      </h3>

      <ul className="flex flex-col gap-2.5">
        {FOOTER_NAV.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="
                group relative inline-flex
                text-[14px] font-normal
                text-[#F5EFE4]/72
                transition-colors duration-[300ms] ease-out
                hover:text-[#C7A66A]
                focus-visible:outline-none focus-visible:text-[#C7A66A]
              "
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="
                  absolute left-0 -bottom-0.5
                  h-px w-0
                  bg-[#C7A66A]
                  transition-all duration-[350ms] ease-out
                  group-hover:w-full
                  group-focus-visible:w-full
                "
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const FooterLinks = memo(FooterLinksComponent);
