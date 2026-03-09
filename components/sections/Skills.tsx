"use client";

import { useTheme } from "@/app/providers";
import { toolGroups } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import RadarChart from "@/components/ui/RadarChart";

function BentoCell({
  group,
  index,
}: {
  group: (typeof toolGroups)[0];
  index: number;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);

  const sizeStyles: Record<string, React.CSSProperties> = {
    large: { gridColumn: "span 2", padding: "22px 20px" },
    medium: { gridColumn: "span 1", padding: "18px 16px" },
    small: { gridColumn: "span 1", padding: "16px 14px" },
  };

  return (
    <div
      ref={ref}
      style={{
        ...sizeStyles[group.size],
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 10,
        backdropFilter: "blur(10px)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
        cursor: "default",
      }}
      className={group.size === "large" ? "bento-large" : ""}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}4D`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}1F`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Category title */}
      <div
        style={{
          fontSize: group.size === "large" ? 13 : 12,
          fontWeight: 600,
          color: theme.text,
          marginBottom: 4,
        }}
      >
        {group.category}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 10,
          color: theme.muted,
          marginBottom: 12,
          lineHeight: 1.4,
        }}
      >
        {group.description}
      </div>

      {/* Tool badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {group.tools.map((tool) => (
          <span
            key={tool}
            style={{
              padding: "5px 10px",
              background: `${theme.accent}10`,
              border: `1px solid ${theme.accent}1F`,
              borderRadius: 5,
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              color: theme.accent,
              transition: "all 0.2s",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);

  return (
    <section
      id="skills"
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
        <SectionLabel text="Tech Stack" />

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 36,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Skills & </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Expertise
          </span>
        </h2>
      </div>

      {/* Two-column layout: Radar + Bento */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 20,
          alignItems: "start",
        }}
        className="skills-layout"
      >
        {/* Left: Radar Chart */}
        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.accent}1F`,
            borderRadius: 12,
            padding: "20px 16px",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: theme.muted,
              marginBottom: 12,
            }}
          >
            Core Competencies
          </div>
          <RadarChart />
        </div>

        {/* Right: Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 8,
          }}
          className="bento-grid"
        >
          {toolGroups.map((group, i) => (
            <BentoCell key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-layout {
            grid-template-columns: 1fr !important;
          }
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-large {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
