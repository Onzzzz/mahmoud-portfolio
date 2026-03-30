"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { themes, type ThemeName, type Theme } from "./design-tokens";

interface ThemeContextValue {
  readonly theme: Theme;
  readonly themeName: ThemeName;
  readonly toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--bg-alt", t.bgAlt);
  root.style.setProperty("--surface", t.surface);
  root.style.setProperty("--surface-border", t.surfaceBorder);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-hover", t.accentHover);
  root.style.setProperty("--accent-muted", t.accentMuted);
  root.style.setProperty("--accent-glow", t.accentGlow);
  root.style.setProperty("--text-primary", t.textPrimary);
  root.style.setProperty("--text-secondary", t.textSecondary);
  root.style.setProperty("--text-muted", t.textMuted);
  root.style.setProperty("--card-bg", t.cardBg);
  root.style.setProperty("--card-bg-hover", t.cardBgHover);
  root.style.setProperty("--nav-bg", t.navBg);
  root.setAttribute("data-theme", t.isDark ? "onyx" : "ivory");
}

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("ivory");

  useEffect(() => {
    const stored = localStorage.getItem("mahmoud-theme");
    const initial: ThemeName = stored === "onyx" ? "onyx" : "ivory";
    setThemeName(initial);
    applyTheme(themes[initial]);
  }, []);

  useEffect(() => {
    localStorage.setItem("mahmoud-theme", themeName);
    applyTheme(themes[themeName]);
  }, [themeName]);

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => (prev === "onyx" ? "ivory" : "onyx"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, toggleTheme }}>
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)", minHeight: "100vh", transition: "background-color 0.3s ease, color 0.3s ease" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
