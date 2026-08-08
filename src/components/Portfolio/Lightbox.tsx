"use client";

import {
  useEffect,
  useCallback,
  useRef,
  useState,
  memo,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import type { PortfolioItem } from "./portfolioData";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { MediaInfoButton } from "@/components/MediaInfoButton";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_SWIPE = 48;
const TRANSITION_MS = 280;

// ─── Injected CSS — all animations use transform+opacity only (GPU, 60fps+) ──

const LIGHTBOX_CSS = `
  @media (prefers-reduced-motion: no-preference) {
    .lb2-backdrop { animation: lb2FadeIn 0.30s cubic-bezier(0.16,1,0.3,1) both; }
    .lb2-panel    { animation: lb2SlideUp 0.36s cubic-bezier(0.16,1,0.3,1) both; }
  }
  @keyframes lb2FadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes lb2SlideUp { from{opacity:0;transform:scale(0.97) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }

  .lb2-img {
    position:absolute; inset:0; width:100%; height:100%; object-fit:contain;
    transition:
      opacity ${TRANSITION_MS}ms cubic-bezier(0.16,1,0.3,1),
      transform ${TRANSITION_MS}ms cubic-bezier(0.16,1,0.3,1);
  }
  .lb2-img-enter-right { opacity:0; transform:translateX(-26px) scale(0.99); }
  .lb2-img-enter-left  { opacity:0; transform:translateX(26px) scale(0.99); }
  .lb2-img-visible     { opacity:1; transform:translateX(0) scale(1); }
  .lb2-img-exit-right  { opacity:0; transform:translateX(26px) scale(0.99); }
  .lb2-img-exit-left   { opacity:0; transform:translateX(-26px) scale(0.99); }

  .lb2-skeleton {
    background: linear-gradient(90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.09) 50%,
      rgba(255,255,255,0.04) 75%
    );
    background-size:200% 100%;
    animation: lb2Shim 1.6s ease infinite;
  }
  @keyframes lb2Shim { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

  .lb2-strip {
    display:flex; gap:6px; overflow-x:auto; scroll-snap-type:x mandatory;
    scrollbar-width:none; -ms-overflow-style:none;
    padding:0 20px; -webkit-overflow-scrolling:touch;
  }
  .lb2-strip::-webkit-scrollbar { display:none; }
  .lb2-strip-item { scroll-snap-align:center; flex-shrink:0; }

  .lb2-btn {
    display:inline-flex; align-items:center; justify-content:center;
    width:48px; height:48px; border-radius:50%;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.14);
    color:#fff; cursor:pointer;
    transition: background 180ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 180ms ease;
    backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
    touch-action:manipulation; user-select:none; outline:none;
  }
  .lb2-btn:hover:not(:disabled) {
    background:rgba(255,255,255,0.16);
    transform:scale(1.08);
    box-shadow:0 4px 20px rgba(0,0,0,0.3);
  }
  .lb2-btn:active:not(:disabled) { transform:scale(0.93); }
  .lb2-btn:disabled { opacity:0.20; cursor:not-allowed; }
  .lb2-btn:focus-visible { outline:2px solid rgba(201,168,106,0.7); outline-offset:2px; }

  .lb2-close-btn {
    transition: background 180ms ease, transform 220ms ease;
  }
  .lb2-close-btn:hover { transform:rotate(90deg) scale(1.08); }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const IconRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ─── Phase type ───────────────────────────────────────────────────────────────
type ImgPhase = "entering" | "visible" | "exiting";

// ─── Main Lightbox ────────────────────────────────────────────────────────────

export const Lightbox = memo(function Lightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onGoTo,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [displayIdx, setDisplayIdx] = useState(currentIndex);
  const [navDir, setNavDir] = useState<"left" | "right">("right");
  const [phase, setPhase] = useState<ImgPhase>("visible");

  const prevRef = useRef(currentIndex);
  const stripRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const tx = useRef<number | null>(null);
  const ty = useRef<number | null>(null);
  const dragging = useRef(false);

  const item = items[displayIdx];
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < items.length - 1;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  // ── Crossfade on index change ──────────────────────────────────────────────
  useEffect(() => {
    const prev = prevRef.current;
    if (prev === currentIndex) return;
    const dir: "left" | "right" = currentIndex > prev ? "right" : "left";
    setNavDir(dir);
    prevRef.current = currentIndex;

    if (lockRef.current) return;
    lockRef.current = true;
    setPhase("exiting");

    const timer = setTimeout(() => {
      setDisplayIdx(currentIndex);
      setPhase("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("visible");
          lockRef.current = false;
        });
      });
    }, TRANSITION_MS - 30);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // ── Preload adjacent images ────────────────────────────────────────────────
  useEffect(() => {
    const pre = [currentIndex - 1, currentIndex, currentIndex + 1]
      .filter((i) => i >= 0 && i < items.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded((p) => { const n = new Set(p); pre.forEach((i) => n.add(i)); return n; });
  }, [currentIndex, items.length]);

  // ── Auto-center active thumbnail ───────────────────────────────────────────
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.children[currentIndex] as HTMLElement | undefined;
    if (!thumb) return;
    const sw = strip.getBoundingClientRect().width;
    const tw = thumb.getBoundingClientRect().width;
    strip.scrollTo({ left: thumb.offsetLeft - strip.offsetLeft - (sw - tw) / 2, behavior: "smooth" });
  }, [currentIndex]);

  // ── Body scroll lock + initial focus ──────────────────────────────────────
  useEffect(() => {
    const ov = document.body.style.overflow;
    const op = document.body.style.paddingRight;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = ov;
      document.body.style.paddingRight = op;
    };
  }, []);

  // ── Keyboard + focus trap ──────────────────────────────────────────────────
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowLeft" && canPrev) { onPrev(); return; }
    if (e.key === "ArrowRight" && canNext) { onNext(); return; }
    if (e.key === "Tab") {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const els = dialog.querySelectorAll<HTMLElement>("button:not(:disabled),[tabindex='0']");
      const first = els[0]; const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, [onClose, onNext, onPrev, canPrev, canNext]);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  // ── Touch swipe ───────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    tx.current = e.targetTouches[0].clientX;
    ty.current = e.targetTouches[0].clientY;
    dragging.current = false;
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!tx.current || !ty.current) return;
    const dx = Math.abs(e.targetTouches[0].clientX - tx.current);
    const dy = Math.abs(e.targetTouches[0].clientY - ty.current);
    if (dx > dy && dx > 8) dragging.current = true;
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!tx.current) return;
    const dist = tx.current - e.changedTouches[0].clientX;
    if (Math.abs(dist) >= MIN_SWIPE && dragging.current) {
      if (dist > 0 && canNext) onNext();
      if (dist < 0 && canPrev) onPrev();
    }
    tx.current = null; ty.current = null; dragging.current = false;
  }, [canNext, canPrev, onNext, onPrev]);

  // ── Image class for crossfade state ───────────────────────────────────────
  const imgClass = useMemo(() => {
    if (phase === "entering") return `lb2-img ${navDir === "right" ? "lb2-img-enter-right" : "lb2-img-enter-left"}`;
    if (phase === "exiting") return `lb2-img ${navDir === "right" ? "lb2-img-exit-right" : "lb2-img-exit-left"}`;
    return "lb2-img lb2-img-visible";
  }, [phase, navDir]);

  const cur = String(currentIndex + 1).padStart(2, "0");
  const tot = String(items.length).padStart(2, "0");

  if (!mounted || !item) return null;

  return createPortal(
    <>
      <style>{LIGHTBOX_CSS}</style>

      {/* ── Backdrop ── */}
      <div
        ref={dialogRef}
        className="lb2-backdrop fixed inset-0 flex flex-col"
        style={{ zIndex: 1000, background: "rgba(15,13,12,0.93)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
        role="dialog"
        aria-modal="true"
        aria-label={`Gallery: ${item.title}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(8,6,5,0.60) 100%)" }} />

        {/* ── Top bar ── */}
        <div className="relative z-20 flex items-center justify-between" style={{ padding: "16px 20px" }}>
          <div className="flex items-baseline gap-1.5 select-none" aria-label={`Image ${currentIndex + 1} of ${items.length}`}>
            <span style={{ fontSize: "1.1rem", fontWeight: 500, color: "rgba(248,243,236,0.82)", fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
              {cur}
            </span>
            <span style={{ fontSize: "0.68rem", color: "rgba(248,243,236,0.30)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.06em" }}>
              — {tot}
            </span>
          </div>

          <button ref={closeRef} type="button" onClick={onClose}
            aria-label="Close gallery"
            className="lb2-btn lb2-close-btn">
            <IconClose />
          </button>
        </div>

        {/* ── Image area ── */}
        <div
          className="relative z-10 flex-1 flex items-center justify-center min-h-0"
          style={{ padding: "0 64px" }}
          onClick={onClose}
        >
          {/* Left nav */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:flex" style={{ padding: "0 12px" }}
            onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Previous image" className="lb2-btn">
              <IconLeft />
            </button>
          </div>

          {/* Image panel */}
          <div
            className="lb2-panel relative w-full h-full flex items-center justify-center"
            style={{ maxHeight: "81vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 18, overflow: "hidden" }}>
              {/* Skeleton */}
              {!loaded.has(displayIdx) && (
                <div className="lb2-skeleton absolute inset-0" style={{ borderRadius: 18 }} aria-hidden="true" />
              )}
              {/* Main image */}
              <CloudinaryImage
                key={displayIdx}
                publicId={item.image}
                alt={item.title}
                className={imgClass}
                style={{
                  objectFit: "contain",
                  borderRadius: 18,
                  boxShadow: "0 36px 90px rgba(0,0,0,0.70), 0 4px 18px rgba(0,0,0,0.4)",
                }}
                onLoad={() => setLoaded((p) => new Set([...p, displayIdx]))}
                fetchPriority={displayIdx === currentIndex ? "high" : "auto"}
              />
              {/* ⓘ Media rights notice */}
              <MediaInfoButton corner="bottom-right" />
            </div>

            {/* Hidden preloaders for adjacent images */}
            {[currentIndex - 1, currentIndex + 1].map((i) =>
              i >= 0 && i < items.length && !loaded.has(i) ? (
                <div key={i} style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", pointerEvents: "none" }}>
                  <CloudinaryImage
                    publicId={items[i].image}
                    alt=""
                    width={320}
                    height={320}
                    fetchPriority="high"
                    onLoad={() => setLoaded((p) => new Set([...p, i]))}
                  />
                </div>
              ) : null
            )}
          </div>

          {/* Right nav */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex" style={{ padding: "0 12px" }}
            onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={onNext} disabled={!canNext} aria-label="Next image" className="lb2-btn">
              <IconRight />
            </button>
          </div>
        </div>

        {/* ── Info glass card ── */}
        <div className="relative z-20 flex justify-center" style={{ padding: "10px 20px 0" }}>
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            borderRadius: 14, padding: "9px 22px",
            display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 3,
            minWidth: 180, maxWidth: "min(88vw, 460px)",
          }}>
            <h2 style={{
              color: "rgba(248,243,236,0.92)", fontSize: "0.9375rem", fontWeight: 600,
              lineHeight: 1.2, letterSpacing: "-0.01em", margin: 0, textAlign: "center",
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            }}>
              {item.title}
            </h2>
            {item.location && (
              <p style={{
                color: "rgba(201,168,106,0.72)", fontSize: "0.70rem", fontWeight: 400,
                letterSpacing: "0.06em", textTransform: "uppercase", margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}>
                {item.location}
              </p>
            )}
          </div>
        </div>

        {/* ── Bottom: thumbnail strip + mobile nav ── */}
        <div className="relative z-20" style={{ padding: "10px 0 14px" }}>
          {/* Thumbnail strip */}
          <div ref={stripRef} className="lb2-strip" style={{ paddingBottom: 6 }} aria-label="Gallery thumbnails">
            {items.map((it, i) => {
              const active = i === currentIndex;
              return (
                <button
                  key={it.id}
                  type="button"
                  aria-label={`View image ${i + 1}: ${it.title}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => onGoTo(i)}
                  className="lb2-strip-item"
                  style={{
                    width: 50, height: 50, borderRadius: 8, overflow: "hidden", padding: 0,
                    border: active ? "2px solid rgba(201,168,106,0.85)" : "2px solid rgba(255,255,255,0.10)",
                    opacity: active ? 1 : 0.46,
                    transform: active ? "scale(1.07)" : "scale(1)",
                    transition: "opacity 220ms ease, transform 220ms ease, border-color 220ms ease",
                    cursor: "pointer", background: "rgba(255,255,255,0.06)", outline: "none",
                    position: "relative"
                  }}
                  onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid rgba(201,168,106,0.65)"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
                >
                  {loaded.has(i) && (
                    <CloudinaryImage
                      publicId={it.image} alt={it.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile prev/next */}
          <div className="flex sm:hidden items-center justify-center gap-4" style={{ paddingTop: 4 }}>
            <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Previous image"
              className="lb2-btn" style={{ width: 44, height: 44 }}>
              <IconLeft />
            </button>
            <button type="button" onClick={onNext} disabled={!canNext} aria-label="Next image"
              className="lb2-btn" style={{ width: 44, height: 44 }}>
              <IconRight />
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
});

Lightbox.displayName = "Lightbox";