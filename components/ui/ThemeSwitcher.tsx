"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/app/providers";
import { themes, themeKeys } from "@/lib/themes";
import { Palette } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setThemeKey } = useTheme();
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div style={{ position: "relative" }} ref={popupRef}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: theme.muted,
          padding: 6,
          display: "flex",
          alignItems: "center",
          transition: "color 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = theme.accent)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = theme.muted)
        }
        aria-label="Switch theme"
      >
        <Palette size={16} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: theme.card,
            border: `1px solid ${theme.accent}1F`,
            borderRadius: 10,
            padding: 8,
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 100,
            minWidth: 140,
          }}
        >
          {themeKeys.map((key) => {
            const t = themes[key];
            const isActive = theme.key === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setThemeKey(key);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? `${t.accent}20` : "transparent",
                  color: isActive ? t.accent : theme.soft,
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.2s",
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = `${t.accent}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span>{t.emoji}</span>
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
