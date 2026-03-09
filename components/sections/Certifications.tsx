"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { certifications } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap";
import Award from "lucide-react/dist/esm/icons/award";
import BookOpen from "lucide-react/dist/esm/icons/book-open";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronUp from "lucide-react/dist/esm/icons/chevron-up";

const statusConfig = {
  "in-progress": { label: "In Progress", color: "#f59e0b" },
  completed: { label: "Completed", color: "#4ade80" },
};

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[cert.status];
  const isInProgress = cert.status === "in-progress";

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "flex",
        gap: 20,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Timeline line & dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 20,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: isInProgress
              ? `conic-gradient(${theme.accent} ${cert.progress}%, ${theme.accent}20 ${cert.progress}%)`
              : config.color,
            border: `2px solid ${isInProgress ? theme.accent : config.color}`,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {isInProgress && (
            <div
              style={{
                position: "absolute",
                inset: 2,
                borderRadius: "50%",
                background: theme.bg,
              }}
            />
          )}
        </div>
        {index < certifications.length - 1 && (
          <div
            style={{
              width: 1,
              flex: 1,
              background: `linear-gradient(to bottom, ${theme.accent}40, ${theme.accent}10)`,
              marginTop: 4,
            }}
          />
        )}
      </div>

      {/* Card content */}
      <div
        style={{
          flex: 1,
          background: theme.card,
          border: `1px solid ${theme.accent}${isInProgress ? "30" : "1F"}`,
          borderRadius: 12,
          padding: "20px 22px",
          backdropFilter: "blur(10px)",
          marginBottom: 16,
          transition: "all 0.3s",
          cursor: cert.modules.length > 0 ? "pointer" : "default",
        }}
        onClick={() => cert.modules.length > 0 && setExpanded(!expanded)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${theme.accent}4D`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${theme.accent}${isInProgress ? "30" : "1F"}`;
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `${theme.accent}12`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {index === 0 ? (
                <BookOpen size={16} style={{ color: theme.accent }} />
              ) : index === 1 ? (
                <Award size={16} style={{ color: theme.accent }} />
              ) : (
                <GraduationCap size={16} style={{ color: theme.accent }} />
              )}
            </div>
            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.text,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {cert.name}
              </h3>
              <div
                style={{
                  fontSize: 11,
                  color: theme.muted,
                  marginTop: 2,
                }}
              >
                {cert.institution}
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 8px",
              borderRadius: 4,
              background: `${config.color}15`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: config.color,
              }}
              className={isInProgress ? "animate-pulse-dot" : ""}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                color: config.color,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {config.label}
            </span>
          </div>
        </div>

        {/* Year */}
        <div
          style={{
            fontSize: 11,
            color: theme.accent,
            fontFamily: "var(--font-jetbrains), monospace",
            marginBottom: isInProgress ? 12 : cert.modules.length > 0 ? 8 : 0,
            paddingLeft: 42,
          }}
        >
          {cert.year}
        </div>

        {/* Progress bar for in-progress */}
        {isInProgress && (
          <div style={{ paddingLeft: 42, marginBottom: cert.modules.length > 0 ? 8 : 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1 }}>
                Progress
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: theme.accent,
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                {cert.progress}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 4,
                background: `${theme.accent}15`,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${cert.progress}%`,
                  height: "100%",
                  backgroundImage: `linear-gradient(90deg, ${theme.accentLight}, ${theme.accent})`,
                  borderRadius: 2,
                  transition: "width 1s ease-out",
                }}
              />
            </div>
          </div>
        )}

        {/* Expandable modules */}
        {cert.modules.length > 0 && (
          <div style={{ paddingLeft: 42 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                color: theme.muted,
                marginTop: 4,
              }}
            >
              <span>{cert.modules.length} modules</span>
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </div>
            {expanded && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                  marginTop: 10,
                }}
              >
                {cert.modules.map((mod) => (
                  <span
                    key={mod}
                    style={{
                      fontSize: 9,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: `${theme.accent}12`,
                      border: `1px solid ${theme.accent}1F`,
                      color: theme.accent,
                    }}
                  >
                    {mod}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Certifications() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);

  return (
    <section
      id="certifications"
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
        <SectionLabel text="Education" />

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 36,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Certifications & </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Education
          </span>
        </h2>
      </div>

      <div style={{ maxWidth: 640 }}>
        {certifications.map((cert, i) => (
          <CertCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
}
