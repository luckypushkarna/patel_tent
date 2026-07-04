"use client";

import { useEffect } from "react";

export function ScrollRestoration() {
  // Enforce native browser scroll restoration for performance
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  return null;
}
