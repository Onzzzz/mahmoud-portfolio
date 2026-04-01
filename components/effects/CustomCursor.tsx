"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useSpring(0, { stiffness: 300, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 28 });
  const isDesktop = useRef(false);

  useEffect(() => {
    // Only show on desktop hover devices
    if (!window.matchMedia("(hover: hover)").matches) return;
    isDesktop.current = true;

    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, .card, .tag, .btn-primary, .btn-outline")
      ) {
        setHovering(true);
      }
    }

    function handleOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, .card, .tag, .btn-primary, .btn-outline")
      ) {
        setHovering(false);
      }
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY, visible]);

  if (!isDesktop.current && typeof window !== "undefined") return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        width: hovering ? 48 : 16,
        height: hovering ? 48 : 16,
        borderRadius: "50%",
        border: `1.5px solid var(--accent)`,
        background: hovering ? "rgba(212, 168, 83, 0.08)" : "transparent",
        pointerEvents: "none",
        zIndex: 9998,
        opacity: visible ? 1 : 0,
        translateX: "-50%",
        translateY: "-50%",
        transition: "width 0.2s, height 0.2s, background 0.2s, opacity 0.3s",
        mixBlendMode: "difference",
      }}
    />
  );
}
