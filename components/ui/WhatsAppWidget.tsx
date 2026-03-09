"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/providers";
import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 78,
        left: 24,
        zIndex: 42,
      }}
    >
      {/* Tooltip */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: 8,
            padding: "5px 10px",
            borderRadius: 6,
            background: theme.bg,
            border: `1px solid ${theme.accent}20`,
            fontSize: 10,
            color: theme.soft,
            whiteSpace: "nowrap",
          }}
        >
          Chat on WhatsApp
        </div>
      )}
      <a
        href="https://wa.me/971544720857"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
          transition: "all 0.3s",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          animation: "waPulse 3s ease-in-out infinite",
        }}
      >
        <MessageCircle size={20} style={{ color: "#fff" }} />
      </a>
      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(37,211,102,0.35); }
          50% { box-shadow: 0 4px 24px rgba(37,211,102,0.55); }
        }
      `}</style>
    </div>
  );
}
