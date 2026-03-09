"use client";

import { useTheme } from "@/app/providers";

export default function SectionLabel({ text }: { text: string }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          width: 22,
          height: 1,
          background: theme.accent,
        }}
      />
      <span
        style={{
          fontSize: 10,
          color: theme.accent,
          textTransform: "uppercase",
          letterSpacing: 3,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
}
