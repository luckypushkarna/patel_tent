"use client";

import { memo, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/constants/navigation";
import { NavButton } from "./NavButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenuComponent({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="
            fixed inset-x-0 top-[56px]
            z-40 lg:hidden
            bg-brand-bg
            border-t border-brand-primary/10
            max-h-[calc(100dvh-56px)]
            overflow-y-auto overscroll-contain
            will-change-transform
          "
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="p-8">
            <ul className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.32,
                    delay: 0.05 + i * 0.04,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="
                      block py-2 px-4
                      text-[16px] font-semibold uppercase tracking-[0.12em]
                      text-brand-primary/90
                      transition-colors duration-200
                      hover:text-brand-accent
                      focus-visible:outline-none focus-visible:text-brand-accent
                    "
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.32,
                  delay: 0.05 + NAV_LINKS.length * 0.04,
                  ease: "easeOut",
                }}
                className="mt-4"
              >
                <NavButton />
              </motion.li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const MobileMenu = memo(MobileMenuComponent);
