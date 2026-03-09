"use client";

import { useTheme } from "@/app/providers";
import { experience } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof experience)[0];
  index: number;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        paddingLeft: 36,
        marginBottom: 16,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-30px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
      }}
    >
      {/* Timeline dot */}
      <div
        className="timeline-dot"
        style={{
          position: "absolute",
          left: -4,
          top: 24,
          width: 7,
          height: 7,
          borderRadius: "50%",
          border: `1.5px solid ${theme.accent}`,
          background: theme.bg,
          transition: "all 0.3s",
          zIndex: 2,
        }}
      />

      {/* Card */}
      <div
        className="timeline-card"
        style={{
          background: theme.card,
          border: `1px solid ${theme.accent}1F`,
          borderRadius: 12,
          padding: "20px 22px",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${theme.accent}4D`;
          const dot = e.currentTarget.parentElement?.querySelector(
            ".timeline-dot"
          ) as HTMLElement;
          if (dot) {
            dot.style.background = theme.accent;
            dot.style.boxShadow = `0 0 8px ${theme.accent}60`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${theme.accent}1F`;
          const dot = e.currentTarget.parentElement?.querySelector(
            ".timeline-dot"
          ) as HTMLElement;
          if (dot) {
            dot.style.background = theme.bg;
            dot.style.boxShadow = "none";
          }
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>
              {entry.role}
            </div>
            <div style={{ fontSize: 13, color: theme.accent, marginTop: 2 }}>
              {entry.company}
              <span
                style={{
                  fontSize: 11,
                  color: theme.muted,
                  marginLeft: 6,
                }}
              >
                {entry.companyType}
              </span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-jetbrains), monospace",
                color: theme.soft,
              }}
            >
              {entry.period}
            </div>
            <div
              style={{
                fontSize: 10,
                color: theme.muted,
                marginTop: 2,
              }}
            >
              {entry.location}
            </div>
          </div>
        </div>

        {/* Promotion badge */}
        {"promotion" in entry && entry.promotion && (
          <div
            style={{
              display: "inline-block",
              fontSize: 9,
              padding: "3px 8px",
              borderRadius: 4,
              background: `${theme.accent}12`,
              color: theme.accent,
              marginBottom: 10,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            {"promotionNote" in entry ? entry.promotionNote : "Promoted"}
          </div>
        )}

        {/* Highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
          {entry.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: 12,
                color: theme.muted,
                lineHeight: 1.6,
                paddingLeft: 12,
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: theme.accent,
                  opacity: 0.5,
                }}
              >
                -
              </span>
              {h}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {entry.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: "3px 9px",
                borderRadius: 4,
                background: `${theme.accent}0F`,
                border: `1px solid ${theme.accent}14`,
                color: theme.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);

  return (
    <section
      id="experience"
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
        <SectionLabel text="Experience" />

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 36,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Career </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Journey
          </span>
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: `linear-gradient(to bottom, ${theme.accent}80, ${theme.accent}1A, transparent)`,
          }}
        />

        {experience.map((entry, i) => (
          <TimelineEntry key={i} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
