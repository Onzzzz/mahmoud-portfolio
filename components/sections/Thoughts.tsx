"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { thoughts } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";

export default function Thoughts() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? thoughts : thoughts.slice(0, 3);

  return (
    <section
      id="thoughts"
      ref={ref}
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionLabel text="Quick Thoughts" />
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 28,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Latest </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Thoughts
          </span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {displayed.map((thought, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "16px 18px",
              background: theme.card,
              border: `1px solid ${theme.accent}1F`,
              borderRadius: 10,
              backdropFilter: "blur(10px)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `${theme.accent}15`,
                border: `1px solid ${theme.accent}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: theme.accent,
                flexShrink: 0,
              }}
            >
              MA
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>Mahmoud Abdallah</span>
                <span style={{ fontSize: 9, color: theme.muted }}>{thought.date}</span>
              </div>
              <p style={{ fontSize: 13, color: theme.soft, lineHeight: 1.65, margin: 0 }}>
                {thought.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {thoughts.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            margin: "16px auto 0",
            padding: "8px 18px",
            borderRadius: 6,
            border: `1px solid ${theme.accent}20`,
            background: "transparent",
            color: theme.muted,
            fontSize: 11,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          View All <ChevronDown size={12} />
        </button>
      )}
    </section>
  );
}
