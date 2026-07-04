"use client";

import { useCallback, useState } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { NavButton } from "./NavButton";
import { MobileMenu } from "./MobileMenu";
import { useScrollNavbar } from "@/hooks/useScrollNavbar";

export function Navbar() {
  const isScrolled = useScrollNavbar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <div className="sticky top-0 h-0 w-full z-50">
        <header
          className={`
            absolute inset-x-0 top-0
            transition-all duration-[350ms] ease-out
            ${isScrolled
              ? "bg-[rgba(24,20,18,0.82)] backdrop-blur-[16px] border-b border-white/[0.06]"
              : "bg-transparent border-b border-transparent"
            }
          `}
        >
          <nav
            aria-label="Primary navigation"
            className="mx-auto w-full max-w-7xl px-6 lg:px-8 xl:px-10"
          >
            {/* Grid: [logo] [center-links] [cta] — guarantees center links stay centered */}
            <div
              className="
              grid grid-cols-[auto_1fr_auto] items-center
              h-[56px] lg:h-[70px]
              gap-6
            "
            >
              {/* LEFT — Logo */}
              <div className="flex items-center">
                <Logo />
              </div>

              {/* CENTER — Nav Links (hidden on mobile) */}
              <div className="hidden lg:flex items-center justify-center">
                <NavLinks />
              </div>

              {/* RIGHT — CTA (desktop) or Hamburger (mobile) */}
              <div className="flex items-center justify-end">
                {/* Desktop CTA */}
                <div className="hidden lg:block">
                  <NavButton />
                </div>

                {/* Mobile Hamburger */}
                <button
                  type="button"
                  onClick={toggleMobile}
                  aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileOpen}
                  aria-controls="mobile-menu"
                  className="
                  lg:hidden
                  relative flex h-11 w-11 items-center justify-center
                  rounded-full
                  transition-colors duration-200
                  hover:bg-white/[0.06]
                  focus-visible:outline-none focus-visible:bg-white/[0.06]
                "
                >
                  <span className="sr-only">
                    {isMobileOpen ? "Close" : "Open"} menu
                  </span>
                  <div className="relative h-[14px] w-[22px]">
                    <span
                      aria-hidden="true"
                      className={`
                      absolute left-0 h-[1.5px] w-full bg-[#F6F1E8]
                      transition-all duration-300 ease-out
                      ${isMobileOpen ? "top-[6px] rotate-45" : "top-0"}
                    `}
                    />
                    <span
                      aria-hidden="true"
                      className={`
                      absolute left-0 top-[6px] h-[1.5px] w-full bg-[#F6F1E8]
                      transition-opacity duration-200
                      ${isMobileOpen ? "opacity-0" : "opacity-100"}
                    `}
                    />
                    <span
                      aria-hidden="true"
                      className={`
                      absolute left-0 h-[1.5px] w-full bg-[#F6F1E8]
                      transition-all duration-300 ease-out
                      ${isMobileOpen ? "top-[6px] -rotate-45" : "top-[12px]"}
                    `}
                    />
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile menu — rendered as sibling at z-40, anchored below navbar */}
      <MobileMenu isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  );
}
