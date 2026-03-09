"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/providers";

export default function ScrollProgress() {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress < 1) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 100,
        background: "transparent",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundImage: `linear-gradient(90deg, ${theme.accentDim}, ${theme.accent}, ${theme.accentLight})`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
