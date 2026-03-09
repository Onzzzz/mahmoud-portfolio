"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { caseStudies } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up";

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 12,
        padding: "24px 22px",
        backdropFilter: "blur(10px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 150}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}4D`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}1F`;
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: theme.text,
            margin: "0 0 4px 0",
          }}
        >
          {study.title}
        </h3>
        <div style={{ fontSize: 11, color: theme.accent, fontWeight: 400 }}>
          {study.company}
        </div>
      </div>

      {/* Before / After Toggle */}
      <div
        style={{
          display: "flex",
          marginBottom: 16,
          background: `${theme.accent}08`,
          borderRadius: 6,
          padding: 2,
        }}
      >
        <button
          onClick={() => setShowAfter(false)}
          style={{
            flex: 1,
            padding: "8px 0",
            border: "none",
            borderRadius: 5,
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            cursor: "pointer",
            transition: "all 0.3s",
            background: !showAfter ? `${theme.accent}20` : "transparent",
            color: !showAfter ? theme.accent : theme.muted,
          }}
        >
          Before
        </button>
        <button
          onClick={() => setShowAfter(true)}
          style={{
            flex: 1,
            padding: "8px 0",
            border: "none",
            borderRadius: 5,
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            cursor: "pointer",
            transition: "all 0.3s",
            background: showAfter ? `${theme.accent}20` : "transparent",
            color: showAfter ? theme.accent : theme.muted,
          }}
        >
          After
        </button>
      </div>

      {/* Content Panel */}
      <div
        style={{
          minHeight: 130,
          position: "relative",
        }}
      >
        {/* Before panel */}
        <div
          style={{
            opacity: !showAfter ? 1 : 0,
            transform: !showAfter ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.4s ease",
            position: !showAfter ? "relative" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            pointerEvents: !showAfter ? "auto" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {study.before.points.map((point) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  fontSize: 12,
                  color: theme.muted,
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    color: "#ef4444",
                    fontSize: 10,
                    marginTop: 3,
                    flexShrink: 0,
                  }}
                >
                  ✕
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* After panel */}
        <div
          style={{
            opacity: showAfter ? 1 : 0,
            transform: showAfter ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.4s ease",
            position: showAfter ? "relative" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            pointerEvents: showAfter ? "auto" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {study.after.points.map((point) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  fontSize: 12,
                  color: theme.soft,
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    color: "#4ade80",
                    fontSize: 10,
                    marginTop: 3,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${study.metrics.length}, 1fr)`,
          gap: 8,
          marginTop: 16,
          paddingTop: 16,
          borderTop: `1px solid ${theme.accent}15`,
        }}
        className="case-metrics"
      >
        {study.metrics.map((m) => (
          <div
            key={m.label}
            style={{
              textAlign: "center",
              padding: "8px 4px",
              background: `${theme.accent}08`,
              borderRadius: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                marginBottom: 4,
              }}
            >
              <TrendingUp size={10} style={{ color: "#4ade80" }} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: theme.accent,
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                {m.improvement}
              </span>
            </div>
            <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {m.label}
            </div>
            <div
              style={{
                fontSize: 9,
                color: theme.muted,
                opacity: 0.6,
                marginTop: 2,
              }}
            >
              {m.before} <ArrowRight size={8} style={{ verticalAlign: "middle" }} /> {m.after}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);

  return (
    <section
      id="case-studies"
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
        <SectionLabel text="Case Studies" />

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Before & </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            After
          </span>
        </h2>

        <p style={{ fontSize: 13, color: theme.muted, marginBottom: 28, maxWidth: 500 }}>
          Real transformations I&apos;ve delivered — from chaos to system.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}
        className="case-studies-grid"
      >
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.title} study={study} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-studies-grid {
            grid-template-columns: 1fr !important;
          }
          .case-metrics {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
