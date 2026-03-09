"use client";

import { useTheme } from "@/app/providers";
import { stats } from "@/lib/data";
import StatCard from "@/components/ui/StatCard";

export default function Impact() {
  const { theme } = useTheme();

  return (
    <section style={{ padding: "0 24px 60px" }}>
      {/* Separator */}
      <div
        style={{
          width: 50,
          height: 1,
          margin: "0 auto 40px",
          background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        }}
      />

      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
        }}
        className="impact-grid"
      >
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            number={stat.number}
            suffix={stat.suffix}
            unit={stat.unit}
            label={stat.label}
            delay={i * 120}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .impact-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
