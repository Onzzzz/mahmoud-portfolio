// ============================================================
// Design Tokens — Single source of truth for ALL visual decisions
// Nothing hardcoded anywhere else. Every component reads from here.
// ============================================================

export const themes = {
  onyx: {
    name: "Onyx",
    bg: "#17181C",
    bgAlt: "#1E1F24",
    surface: "#252629",
    surface2: "#2C2D32",
    surfaceBorder: "rgba(255,255,255,0.06)",
    surfaceBorderGold: "rgba(212,168,83,0.22)",
    accent: "#D4A853",
    accentHover: "#E0BC6A",
    accentMuted: "rgba(212,168,83,0.08)",
    accentGlow: "rgba(212,168,83,0.15)",
    textPrimary: "#EDEDEC",
    textSecondary: "#9B9A97",
    textMuted: "#5C5B58",
    cardBg: "rgba(37,38,41,0.80)",
    cardBgHover: "rgba(44,45,50,0.95)",
    navBg: "rgba(23,24,28,0.90)",
    isDark: true,
    card: "rgba(37,38,41,0.80)",
    text: "#EDEDEC",
    soft: "#9B9A97",
    muted: "#5C5B58",
    accentLight: "#E0BC6A",
    btnText: "#17181C",
    bg2: "#1E1F24",
    input: "#252629",
  },
  ivory: {
    name: "Ivory",
    bg: "#FAFAF7",
    bgAlt: "#F0EFE9",
    surface: "#FFFFFF",
    surface2: "#F5F4F0",
    surfaceBorder: "rgba(0,0,0,0.09)",
    surfaceBorderGold: "rgba(166,124,46,0.35)",
    accent: "#A67C2E",
    accentHover: "#B8962F",
    accentMuted: "rgba(166,124,46,0.1)",
    accentGlow: "rgba(166,124,46,0.18)",
    textPrimary: "#1A1814",
    textSecondary: "#5A5550",
    textMuted: "#7F7A73",
    cardBg: "rgba(255,255,255,0.95)",
    cardBgHover: "rgba(255,255,255,1)",
    navBg: "rgba(250,250,247,0.92)",
    isDark: false,
    // Aliases for AIChatbot compatibility
    card: "rgba(255,255,255,0.95)",
    text: "#1A1814",
    soft: "#5A5550",
    muted: "#7F7A73",
    accentLight: "#B8962F",
    btnText: "#FFFFFF",
    bg2: "#F0EFE9",
    input: "#FFFFFF",
  },
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];
