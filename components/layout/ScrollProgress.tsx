"use client";

import { useState, useEffect } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-[60] h-[2px]">
      <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, backgroundColor: "var(--accent)" }} />
    </div>
  );
}
