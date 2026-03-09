"use client";

import { useTheme } from "@/app/providers";
import { about } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "80px 24px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <SectionLabel text={about.sectionLabel} />

      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 36px)",
          fontWeight: 700,
          marginBottom: 36,
          lineHeight: 1.2,
        }}
      >
        <span style={{ color: theme.text }}>{about.heading[0]} </span>
        <span
          style={{
            backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {about.heading[1]}
        </span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 3fr",
          gap: 32,
        }}
        className="about-grid"
      >
        {/* Left: paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: 14,
                color: theme.muted,
                lineHeight: 1.9,
                fontWeight: 300,
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Right: info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {about.infoCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: theme.card,
                border: `1px solid ${theme.accent}1F`,
                borderRadius: 8,
                padding: "12px 16px",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${theme.accent}4D`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${theme.accent}1F`;
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  color: theme.muted,
                  letterSpacing: 1.5,
                  marginBottom: 4,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: theme.text,
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
