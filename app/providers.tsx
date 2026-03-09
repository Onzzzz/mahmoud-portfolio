"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { themes, defaultTheme, type Theme } from "@/lib/themes";

type ThemeContextType = {
  theme: Theme;
  setThemeKey: (key: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes[defaultTheme],
  setThemeKey: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKeyState] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("onz-theme");
    if (stored && themes[stored]) {
      setThemeKeyState(stored);
    }
    setMounted(true);
  }, []);

  const setThemeKey = (key: string) => {
    if (themes[key]) {
      setThemeKeyState(key);
      localStorage.setItem("onz-theme", key);
    }
  };

  const theme = themes[themeKey];

  const cssVars: Record<string, string> = {
    "--accent-selection": `${theme.accent}40`,
    "--accent-scrollbar": `${theme.accent}33`,
    "--accent-scrollbar-hover": `${theme.accent}66`,
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeKey }}>
      <div
        style={{
          ...cssVars,
          background: theme.bg,
          color: theme.text,
          minHeight: "100vh",
          transition: "background 0.5s, color 0.5s",
          opacity: mounted ? 1 : 0,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
