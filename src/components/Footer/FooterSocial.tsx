"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { FOOTER_SOCIALS } from "./constants";
import { iconMap } from "./icons";

function FooterSocialComponent() {
  return (
    <div className="flex flex-col items-start md:items-center gap-4">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#F5EFE4]/45">
        Follow
      </span>

      <ul className="flex items-center gap-7">
        {FOOTER_SOCIALS.map((social) => {
          const Icon = iconMap[social.icon];
          return (
            <li key={social.label}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="
                  inline-flex items-center justify-center
                  text-[#F5EFE4]/70
                  transition-colors duration-[300ms] ease-out
                  hover:text-[#C7A66A]
                  focus-visible:outline-none focus-visible:text-[#C7A66A]
                "
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const FooterSocial = memo(FooterSocialComponent);
