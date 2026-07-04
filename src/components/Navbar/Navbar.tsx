"use client";

import { useCallback, useEffect, useRef, useState, memo } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { NavButton } from "./NavButton";
import { MobileMenu } from "./MobileMenu";
import { useScrollNavbar } from "@/hooks/useScrollNavbar";

// ─── Hamburger Icon ────────────────────────────────────────────────────────────

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger = memo(function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className="relative flex items-center justify-center h-10 w-10 rounded-full text-[#F6F1E8] transition-colors duration-200 hover:bg-white/[0.08] active:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 touch-manipulation select-none shrink-0"
    >
      <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>

      {/* Hamburger bars */}
      <span aria-hidden="true" className="relative flex h-[14px] w-[20px] flex-col justify-between">
        {/* Bar 1 */}
        <span
          className={`
            block h-[1.5px] w-full rounded-full bg-current origin-center
            transition-transform duration-300 ease-out
            ${isOpen ? "translate-y-[6.25px] rotate-45" : ""}
          `}
        />
        {/* Bar 2 */}
        <span
          className={`
            block h-[1.5px] w-full rounded-full bg-current
            transition-all duration-200 ease-out
            ${isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}
          `}
        />
        {/* Bar 3 */}
        <span
          className={`
            block h-[1.5px] w-full rounded-full bg-current origin-center
            transition-transform duration-300 ease-out
            ${isOpen ? "-translate-y-[6.25px] -rotate-45" : ""}
          `}
        />
      </span>
    </button>
  );
});

// ─── Main Navbar ───────────────────────────────────────────────────────────────

export const Navbar = memo(function Navbar() {
  const isScrolled = useScrollNavbar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // ── Handlers ──
  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  // ── Close mobile menu on desktop resize ──
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeMobile();
    };

    // Modern API
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      // Safari < 14 fallback
      mql.addListener(handleChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, [closeMobile]);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    if (isMobileOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* ── Fixed wrapper — zero height so it doesn't push content ── */}
      <div className="fixed top-0 left-0 right-0 h-0 w-full" style={{ zIndex: 999 }}>
        <header
          ref={navRef}
          className={`
            absolute inset-x-0 top-0
            transition-all duration-300 ease-out
            will-change-[background-color,border-color,backdrop-filter]
            ${isScrolled
              ? "bg-[rgba(24,20,18,0.85)] backdrop-blur-[18px] border-b border-white/[0.07] shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
              : "bg-transparent border-b border-transparent"
            }
          `}
          aria-label="Site header"
        >
          <nav
            aria-label="Primary navigation"
            className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 xl:px-10"
          >
            {/*
              3-column grid:
              [logo — fixed auto] [nav links — fills center] [cta/hamburger — fixed auto]
              Center column uses justify-center so links are always visually centered.
            */}
            <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 lg:h-[68px] gap-4 lg:gap-8">

              {/* ── LEFT: Logo ── */}
              <div className="flex items-center min-w-0">
                <Logo />
              </div>

              {/* ── CENTER: Desktop nav links ── */}
              {/*
                `hidden lg:flex` ensures this column is completely
                removed from layout on mobile — no invisible space.
              */}
              <div
                className="hidden lg:flex items-center justify-center"
                aria-hidden="false"
              >
                <NavLinks />
              </div>

              {/*
                On mobile this center column still exists in the grid
                but is visually empty — we use `lg:hidden` to show
                nothing, keeping logo left-aligned and hamburger right-aligned.
              */}
              <div className="flex lg:hidden" aria-hidden="true" />

              {/* ── RIGHT: CTA (desktop) | Hamburger (mobile) ── */}
              <div className="flex items-center justify-end shrink-0">
                {/* Desktop CTA — completely hidden on mobile (no space taken) */}
                <div className="hidden lg:flex items-center">
                  <NavButton />
                </div>

                {/* Mobile hamburger — completely hidden on desktop */}
                <div className="lg:hidden flex items-center">
                  <Hamburger isOpen={isMobileOpen} onClick={toggleMobile} />
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* ── Mobile drawer — portal-style sibling, rendered outside header ── */}
      <MobileMenu isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  );
});

Navbar.displayName = "Navbar";