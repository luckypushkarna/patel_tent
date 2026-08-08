"use client";

/**
 * MediaInfoButton
 *
 * A small ⓘ button that opens a compact popover anchored to itself.
 * No full-screen overlay — the popover appears right next to the button.
 *
 * The containing element MUST have `position: relative`.
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
} from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CONTACT = "hello@yourdomain.com";

// ─── Popover ──────────────────────────────────────────────────────────────────

interface PopoverProps {
  onClose: () => void;
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

function Popover({ onClose, corner }: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { closeRef.current?.focus(); }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const onDown = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const id = window.setTimeout(() => document.addEventListener("mousedown", onDown), 60);
    return () => { window.clearTimeout(id); document.removeEventListener("mousedown", onDown); };
  }, [onClose]);

  const trapFocus = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const els = ref.current?.querySelectorAll<HTMLElement>(
      'button,[href],input,[tabindex]:not([tabindex="-1"])'
    );
    if (!els?.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }, []);

  // Position the popover so it stays inside the media boundary
  // bottom-right / top-right  → opens to the left
  // bottom-left / top-left    → opens to the right
  const openRight = corner === "bottom-left" || corner === "top-left";
  const openUp    = corner === "bottom-left" || corner === "bottom-right";

  const posStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 50,
    width: 220,
    ...(openRight ? { left: 0 }   : { right: 0 }),
    ...(openUp    ? { bottom: 30 }: { top: 30   }),
  };

  return (
    <div style={posStyle}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Media notice"
        onKeyDown={trapFocus}
        style={{
          background: "rgba(10, 28, 38, 0.88)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 8,
          padding: "10px 12px 10px 12px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close media notice"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            cursor: "pointer",
            color: "rgba(255,255,255,0.6)",
            padding: 0,
          }}
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" width={8} height={8} aria-hidden="true">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>

        {/* Notice — single condensed line */}
        <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.5,
          color: "rgba(255,249,240,0.78)", paddingRight: 14 }}>
          Illustrative media — ownership and copyrights remain with their respective rights holders. For rights-related concerns, contact us at{" "}
          <a href={`mailto:${CONTACT}`}
            style={{ color: "#C9A45C", textDecoration: "underline" }}>
            {CONTACT}
          </a>.
        </p>
      </div>
    </div>
  );
}

// ─── MediaInfoButton ──────────────────────────────────────────────────────────

interface MediaInfoButtonProps {
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  style?: React.CSSProperties;
  className?: string;
}

export function MediaInfoButton({
  corner = "bottom-right",
  style,
  className,
}: MediaInfoButtonProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
    ...(corner === "top-left"     && { top: 8,    left: 8    }),
    ...(corner === "top-right"    && { top: 8,    right: 8   }),
    ...(corner === "bottom-left"  && { bottom: 8, left: 8    }),
    ...(corner === "bottom-right" && { bottom: 8, right: 8   }),
    ...style,
  };

  const toggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((v) => !v);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    btnRef.current?.focus();
  }, []);

  return (
    <span className={className} style={wrapStyle}>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-label="Media information"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Media information"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.4)",
          background: "rgba(10, 28, 38, 0.42)",
          color: "rgba(255,255,255,0.8)",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          transition: "background 180ms ease, border-color 180ms ease",
          minWidth: 22,
          minHeight: 22,
          padding: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,28,38,0.75)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.7)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,28,38,0.42)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
        }}
      >
        ⓘ
      </button>

      {open && <Popover onClose={close} corner={corner} />}
    </span>
  );
}
