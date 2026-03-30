// ============================================================
// Design Tokens — Single source of truth for ALL visual decisions
// Nothing hardcoded anywhere else. Every component reads from here.
// ============================================================

export const themes = {
  onyx: {
    name: "Onyx",
    bg: "#0c0c0c",
    bgAlt: "#111111",
    surface: "#161616",
    surfaceBorder: "rgba(255,255,255,0.06)",
    accent: "#D4A853",
    accentHover: "#E8C068",
    accentMuted: "rgba(212,168,83,0.15)",
    accentGlow: "rgba(212,168,83,0.25)",
    textPrimary: "#F0ECE5",
    textSecondary: "#8A8578",
    textMuted: "#5A5549",
    cardBg: "rgba(22,22,22,0.7)",
    cardBgHover: "rgba(30,30,30,0.8)",
    navBg: "rgba(12,12,12,0.85)",
    isDark: true,
  },
  ivory: {
    name: "Ivory",
    bg: "#FAFAF7",
    bgAlt: "#F2F1ED",
    surface: "#FFFFFF",
    surfaceBorder: "rgba(0,0,0,0.06)",
    accent: "#A07B2E",
    accentHover: "#8A6A25",
    accentMuted: "rgba(160,123,46,0.1)",
    accentGlow: "rgba(160,123,46,0.15)",
    textPrimary: "#1A1814",
    textSecondary: "#6B6560",
    textMuted: "#9A958E",
    cardBg: "rgba(255,255,255,0.9)",
    cardBgHover: "rgba(255,255,255,1)",
    navBg: "rgba(250,250,247,0.85)",
    isDark: false,
  },
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];
