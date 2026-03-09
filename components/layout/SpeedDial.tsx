"use client";

import { useTheme } from "@/app/providers";

export default function SpeedDial() {
  const { theme } = useTheme();

  const buttons = [
    {
      label: "HIRE ME",
      href: "#contact",
      primary: true,
    },
    {
      label: "GET QUOTE",
      href: "#contact",
      primary: false,
    },
    {
      label: "DOWNLOAD CV",
      href: "/mahmoud-cv.pdf",
      primary: false,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        zIndex: 40,
      }}
    >
      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.href}
          download={btn.label === "DOWNLOAD CV" ? true : undefined}
          style={{
            padding: "8px 16px",
            borderRadius: 7,
            fontSize: 10,
            fontWeight: btn.primary ? 700 : 500,
            textTransform: "uppercase",
            textDecoration: "none",
            letterSpacing: 1,
            textAlign: "center",
            transition: "all 0.3s",
            cursor: "pointer",
            ...(btn.primary
              ? {
                  background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
                  color: theme.btnText,
                  boxShadow: `0 4px 20px ${theme.accent}40`,
                }
              : {
                  background: theme.card,
                  color: theme.soft,
                  border: `1px solid ${theme.accent}1F`,
                  backdropFilter: "blur(10px)",
                }),
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          {btn.label}
        </a>
      ))}
    </div>
  );
}
