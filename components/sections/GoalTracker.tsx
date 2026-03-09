"use client";

import { useTheme } from "@/app/providers";
import { goals2026 } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { Target } from "lucide-react";

export default function GoalTracker() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);

  const avgProgress = Math.round(
    goals2026.reduce((sum, g) => sum + g.progress, 0) / goals2026.length
  );

  return (
    <section
      id="goals"
      ref={ref}
      style={{ maxWidth: 820, margin: "0 auto", padding: "80px 24px" }}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionLabel text="2026 Goals" />
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 28,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Goal </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tracker
          </span>
        </h2>
      </div>

      {/* Overall progress ring */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginBottom: 28,
          padding: "16px 20px",
          background: theme.card,
          border: `1px solid ${theme.accent}1F`,
          borderRadius: 10,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
          <svg width={56} height={56} viewBox="0 0 56 56">
            <circle
              cx={28}
              cy={28}
              r={24}
              fill="none"
              stroke={`${theme.accent}15`}
              strokeWidth={4}
            />
            <circle
              cx={28}
              cy={28}
              r={24}
              fill="none"
              stroke={theme.accent}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={`${(2 * Math.PI * 24 * (isVisible ? avgProgress : 0)) / 100} ${2 * Math.PI * 24}`}
              transform="rotate(-90 28 28)"
              style={{ transition: "stroke-dasharray 1.2s ease-out 0.3s" }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: theme.accent,
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            {avgProgress}%
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>
            Overall Progress
          </div>
          <div style={{ fontSize: 10, color: theme.muted, marginTop: 2 }}>
            {goals2026.length} goals tracked for 2026
          </div>
        </div>
      </div>

      {/* Individual goals */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {goals2026.map((item, i) => (
          <div
            key={item.goal}
            style={{
              background: theme.card,
              border: `1px solid ${theme.accent}1F`,
              borderRadius: 8,
              padding: "14px 16px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * 80 + 200}ms`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Target size={12} style={{ color: theme.accent, opacity: 0.6 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: theme.text }}>
                  {item.goal}
                </span>
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: theme.accent,
                  fontFamily: "var(--font-jetbrains)",
                  fontWeight: 600,
                }}
              >
                {item.progress}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 4,
                background: `${theme.accent}12`,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: isVisible ? `${item.progress}%` : "0%",
                  height: "100%",
                  backgroundImage: `linear-gradient(90deg, ${theme.accentDim}, ${theme.accent})`,
                  borderRadius: 2,
                  transition: `width 1s ease-out ${i * 0.1 + 0.4}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
