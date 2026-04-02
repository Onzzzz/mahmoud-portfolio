"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function FloatingOrbs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {/* Orb 1 — top-right, warm gold */}
      <div className="floating-orb floating-orb-1" />

      {/* Orb 2 — bottom-left, amber */}
      <div className="floating-orb floating-orb-2" />

      {/* Orb 3 — center, subtle (hidden on mobile) */}
      <div className="floating-orb floating-orb-3 hidden sm:block" />
    </div>,
    document.body
  );
}
