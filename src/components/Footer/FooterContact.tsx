"use client";

import { memo } from "react";
import { FOOTER_CONTACT } from "./constants";

function FooterContactComponent() {
  return (
    <div className="flex flex-col">
      <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#F5EFE4]/45 mb-4">
        Contact
      </h3>

      <ul className="flex flex-col gap-3 text-[14px] text-[#F5EFE4]/72 leading-[1.55]">
        <li>
          <a
            href={`tel:${FOOTER_CONTACT.phone.replace(/\s/g, "")}`}
            className="transition-colors duration-300 hover:text-[#C7A66A]"
          >
            {FOOTER_CONTACT.phone}
          </a>
        </li>

        <li>
          <a
            href={`mailto:${FOOTER_CONTACT.email}`}
            className="transition-colors duration-300 hover:text-[#C7A66A]"
          >
            {FOOTER_CONTACT.email}
          </a>
        </li>

        <li className="text-[#F5EFE4]/72">{FOOTER_CONTACT.address}</li>

        <li className="pt-2 flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#F5EFE4]/45">
            Hours
          </span>
          <span>{FOOTER_CONTACT.hoursDays}</span>
          <span className="text-[#F5EFE4]/60">{FOOTER_CONTACT.hoursTime}</span>
        </li>
      </ul>
    </div>
  );
}

export const FooterContact = memo(FooterContactComponent);
