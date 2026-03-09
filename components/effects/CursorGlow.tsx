"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/app/providers";

export default function CursorGlow() {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [trail, setTrail] = useState({ x: -500, y: -500 });
  const [size, setSize] = useState(420);
  const [isTouch, setIsTouch] = useState(false);
  const animRef = useRef<number>(0);
  const trailTarget = useRef({ x: -500, y: -500 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }
    if (!theme.isDark) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      trailTarget.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const tag = el.tagName.toLowerCase();
        const isInteractive = tag === "a" || tag === "button" ||
          el.getAttribute("role") === "button" ||
          el.closest("a") !== null || el.closest("button") !== null;
        setSize(isInteractive ? 520 : 420);
      }
    };

    const animateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (trailTarget.current.x - prev.x) * 0.08,
        y: prev.y + (trailTarget.current.y - prev.y) * 0.08,
      }));
      animRef.current = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMove);
    animRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [theme.isDark]);

  if (!theme.isDark || isTouch) return null;

  const halfSize = size / 2;

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: pos.x - halfSize,
          top: pos.y - halfSize,
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accent}14 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
          transition: "width 0.3s, height 0.3s, left 0.1s, top 0.1s",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: trail.x - 150,
          top: trail.y - 150,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accent}08 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}
