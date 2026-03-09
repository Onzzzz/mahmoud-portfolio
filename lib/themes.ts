export type Theme = {
  key: string;
  name: string;
  emoji: string;
  isDark: boolean;
  accent: string;
  accentLight: string;
  accentDim: string;
  bg: string;
  card: string;
  text: string;
  soft: string;
  muted: string;
  input: string;
  nav: string;
  particleRgb: string;
  btnText: string;
};

export const themes: Record<string, Theme> = {
  gold: {
    key: "gold",
    name: "Gold",
    emoji: "\u{1F451}",
    isDark: true,
    accent: "#c9a84c",
    accentLight: "#ddc175",
    accentDim: "#a08839",
    bg: "#111318",
    card: "rgba(18,21,28,0.6)",
    text: "#e8e4de",
    soft: "#c5c0b8",
    muted: "#908f97",
    input: "rgba(12,14,19,0.8)",
    nav: "rgba(17,19,24,0.92)",
    particleRgb: "201,168,76",
    btnText: "#111",
  },
  platinum: {
    key: "platinum",
    name: "Platinum",
    emoji: "\u{1F948}",
    isDark: true,
    accent: "#b8b8c8",
    accentLight: "#d0d0dc",
    accentDim: "#8e8ea0",
    bg: "#0e0f14",
    card: "rgba(16,18,24,0.6)",
    text: "#e4e4ea",
    soft: "#c0c0c8",
    muted: "#8a8a92",
    input: "rgba(10,11,16,0.8)",
    nav: "rgba(14,15,20,0.92)",
    particleRgb: "184,184,200",
    btnText: "#0e0f14",
  },
  espresso: {
    key: "espresso",
    name: "Espresso",
    emoji: "\u{1F7E4}",
    isDark: true,
    accent: "#8b6f4e",
    accentLight: "#a8896a",
    accentDim: "#6d5639",
    bg: "#12100e",
    card: "rgba(22,19,16,0.6)",
    text: "#ede8e0",
    soft: "#cfc8bc",
    muted: "#9a9186",
    input: "rgba(14,12,10,0.8)",
    nav: "rgba(18,16,14,0.92)",
    particleRgb: "139,111,78",
    btnText: "#faf6f0",
  },
  sapphire: {
    key: "sapphire",
    name: "Sapphire",
    emoji: "\u{1F48E}",
    isDark: true,
    accent: "#4a7fdb",
    accentLight: "#6e9ae6",
    accentDim: "#2d5baa",
    bg: "#0b0e16",
    card: "rgba(14,18,28,0.6)",
    text: "#e4e8f0",
    soft: "#bcc4d4",
    muted: "#8690a4",
    input: "rgba(8,10,18,0.8)",
    nav: "rgba(11,14,22,0.92)",
    particleRgb: "74,127,219",
    btnText: "#fff",
  },
  light: {
    key: "light",
    name: "Light",
    emoji: "\u2600\uFE0F",
    isDark: false,
    accent: "#1a1a2e",
    accentLight: "#2d2d44",
    accentDim: "#0f0f1a",
    bg: "#fafaf8",
    card: "rgba(255,255,255,0.85)",
    text: "#1a1a1a",
    soft: "#333",
    muted: "#888",
    input: "#f0f0ed",
    nav: "rgba(250,250,248,0.95)",
    particleRgb: "26,26,46",
    btnText: "#fafaf8",
  },
};

export const themeKeys = Object.keys(themes);
export const defaultTheme = "gold";
