"use client";

import { useTheme } from "@/app/providers";
import { useCounter, useInView } from "@/lib/hooks";

type Props = {
  number: number;
  suffix: string;
  unit: string;
  label: string;
  delay: number;
};

export default function StatCard({ number, suffix, unit, label, delay }: Props) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const count = useCounter(number, isVisible, 2000);

  return (
    <div
      ref={ref}
      style={{
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 14,
        padding: "24px 16px",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          width: 30,
          height: 1,
          margin: "0 auto 16px",
          background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        }}
      />
      {/* Number */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: theme.accent,
          lineHeight: 1,
        }}
      >
        {count}
        {suffix}
      </div>
      {/* Unit */}
      <div
        style={{
          fontSize: 9,
          color: `${theme.accent}80`,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginTop: 4,
        }}
      >
        {unit}
      </div>
      {/* Label */}
      <div
        style={{
          fontSize: 12,
          color: theme.muted,
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
}
