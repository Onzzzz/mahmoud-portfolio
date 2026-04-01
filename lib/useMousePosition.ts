"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  x: number; // 0 to 1 (normalized)
  y: number; // 0 to 1 (normalized)
  clientX: number;
  clientY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0.5,
    y: 0.5,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    // Only on desktop (hover devices)
    if (!window.matchMedia("(hover: hover)").matches) return;

    function handleMouseMove(e: MouseEvent) {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
