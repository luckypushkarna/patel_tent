"use client";

import { useEffect, useCallback, useRef, useState, memo } from "react";
import { createPortal } from "react-dom";
import type { PortfolioItem } from "./portfolioData";
import { CloudinaryImage } from "@/components/CloudinaryImage";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_SWIPE_DISTANCE = 50;

// ─── Sub-components ──────────────────────────────────────────────────────────

const CloseIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const ChevronLeft = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
));
ChevronLeft.displayName = "ChevronLeft";

const ChevronRight = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
));
ChevronRight.displayName = "ChevronRight";

// ─── Nav Button ───────────────────────────────────────────────────────────────

interface NavButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
  variant?: "overlay" | "bottom";
}

const NavButton = memo(
  ({ onClick, disabled, label, children, variant = "bottom" }: NavButtonProps) => {
    const base = `
      inline-flex items-center justify-center
      rounded-full border border-white/20
      transition-all duration-200 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
      disabled:opacity-20 disabled:cursor-not-allowed
      touch-manipulation select-none
    `;

    const variants = {
      overlay: `
        w-10 h-10 sm:w-12 sm:h-12
        bg-black/40 text-white
        hover:bg-black/60 active:scale-95
        backdrop-blur-sm
      `,
      bottom: `
        w-10 h-10 sm:w-11 sm:h-11
        bg-white/10 text-white
        hover:bg-white/20 active:scale-95
        backdrop-blur-sm
      `,
    };

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={`${base} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  }
);
NavButton.displayName = "NavButton";

// ─── Main Lightbox Component ──────────────────────────────────────────────────

export const Lightbox = memo(function Lightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const currentItem = items[currentIndex];
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < items.length - 1;

  // ── Image load state ──
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // ── Touch refs (avoid re-renders) ──
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  // ── Scroll lock ref to preserve original value ──
  const originalOverflow = useRef<string>("");
  const originalPaddingRight = useRef<string>("");

  // ── Reset image loaded state when index changes ──
  useEffect(() => {
    setIsImageLoaded(false);
  }, [currentIndex]);

  // ── Keyboard navigation ──
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (canPrev) onPrev();
          break;
        case "ArrowRight":
          if (canNext) onNext();
          break;
        default:
          break;
      }
    },
    [onClose, onNext, onPrev, canPrev, canNext]
  );

  // ── Scroll lock + keyboard listener ──
  useEffect(() => {
    // Save original state
    originalOverflow.current = document.body.style.overflow;
    originalPaddingRight.current = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Apply scroll lock
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      // Restore exact original state
      document.body.style.overflow = originalOverflow.current;
      document.body.style.paddingRight = originalPaddingRight.current;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // ── Touch handlers (using refs = no re-renders, better perf) ──
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const deltaX = Math.abs(e.targetTouches[0].clientX - touchStartX.current);
    const deltaY = Math.abs(e.targetTouches[0].clientY - touchStartY.current);

    // Only mark as horizontal drag if x movement is dominant
    if (deltaX > deltaY && deltaX > 10) {
      isDragging.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartX.current) return;

      const endX = e.changedTouches[0].clientX;
      const distance = touchStartX.current - endX;

      if (Math.abs(distance) >= MIN_SWIPE_DISTANCE && isDragging.current) {
        if (distance > 0 && canNext) onNext();
        if (distance < 0 && canPrev) onPrev();
      }

      // Reset
      touchStartX.current = null;
      touchStartY.current = null;
      isDragging.current = false;
    },
    [canNext, canPrev, onNext, onPrev]
  );

  // ── Guard + SSR Check ──
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!currentItem || !mounted) return null;

  return createPortal(
    <>
      {/* ── Animation styles injected once ── */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .lb-enter {
            animation: lbFadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }
          .lb-img-enter {
            animation: lbImgIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbImgIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        .lb-img-skeleton {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.05) 25%,
            rgba(255,255,255,0.1)  50%,
            rgba(255,255,255,0.05) 75%
          );
          background-size: 200% 100%;
          animation: lbSkeleton 1.4s ease infinite;
        }
        @keyframes lbSkeleton {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="lb-enter fixed inset-0 bg-black/92 backdrop-blur-sm"
        style={{ zIndex: 1000 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Image lightbox: ${currentItem.title}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Clickable backdrop layer */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* ── Top Bar ── */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Counter */}
          <span className="text-white/70 text-xs sm:text-sm font-medium tracking-widest uppercase tabular-nums select-none">
            {currentIndex + 1}&thinsp;/&thinsp;{items.length}
          </span>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="
              inline-flex items-center justify-center
              w-9 h-9 sm:w-10 sm:h-10
              rounded-full
              bg-white/10 text-white border border-white/15
              transition-all duration-200
              hover:bg-white/20 hover:rotate-90
              active:scale-90
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
              touch-manipulation
            "
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Left / Right Overlay Nav (desktop) ── */}
        <div className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20">
          <NavButton
            onClick={onPrev}
            disabled={!canPrev}
            label="Previous image"
            variant="overlay"
          >
            <ChevronLeft />
          </NavButton>
        </div>

        <div className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20">
          <NavButton
            onClick={onNext}
            disabled={!canNext}
            label="Next image"
            variant="overlay"
          >
            <ChevronRight />
          </NavButton>
        </div>

        {/* ── Main Content Area ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          {/* Title block */}
          <div className="w-full px-4 sm:px-16 md:px-20 pt-16 pb-3 sm:pt-20 sm:pb-4 text-center shrink-0 pointer-events-none">
            <h2 className="text-white text-base sm:text-xl md:text-2xl font-semibold leading-tight truncate">
              {currentItem.title}
            </h2>
            {currentItem.location && (
              <p className="text-white/60 text-xs sm:text-sm mt-1 truncate">
                {currentItem.location}
              </p>
            )}
          </div>

          <div
            key={currentIndex}
            className="
              lb-img-enter
              relative flex-1 w-full
              min-h-0
              px-6 sm:px-24 md:px-32
              pb-28 sm:pb-24
              pt-4 sm:pt-6
              pointer-events-auto
              flex items-center justify-center
            "
          >
            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              {/* Skeleton loader */}
              {!isImageLoaded && (
                <div className="lb-img-skeleton absolute inset-0 rounded-lg" />
              )}

              <CloudinaryImage
                publicId={currentItem.image}
                alt={currentItem.title}
                width={1600}
                height={1200}
                crop="limit"
                onLoad={() => setIsImageLoaded(true)}
                className={`
                  absolute inset-0 w-full h-full object-contain rounded-lg
                  drop-shadow-2xl
                  transition-opacity duration-300
                  ${isImageLoaded ? "opacity-100" : "opacity-0"}
                `}
              />
            </div>
          </div>
        </div>

        {/* ── Bottom Nav (mobile + desktop) ── */}
        <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center gap-3 pb-5 sm:pb-6">
          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 mr-2">
            {items.map((_, i) => (
              <span
                key={i}
                className={`
                  block rounded-full transition-all duration-200
                  ${i === currentIndex
                    ? "w-4 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/30"
                  }
                `}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Prev / Next buttons (visible on mobile) */}
          <NavButton
            onClick={onPrev}
            disabled={!canPrev}
            label="Previous image"
            variant="bottom"
          >
            <ChevronLeft />
          </NavButton>

          <NavButton
            onClick={onNext}
            disabled={!canNext}
            label="Next image"
            variant="bottom"
          >
            <ChevronRight />
          </NavButton>
        </div>
      </div>
    </>,
    document.body
  );
});

Lightbox.displayName = "Lightbox";