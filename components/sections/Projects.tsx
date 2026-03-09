"use client";

import { useTheme } from "@/app/providers";
import { projects } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const isFeatured = "featured" in project && project.featured;

  return (
    <div
      ref={ref}
      style={{
        gridColumn: isFeatured ? "span 2" : "span 1",
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 12,
        padding: "24px 22px",
        backdropFilter: "blur(10px)",
        position: "relative",
        transition: "all 0.3s",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 100}ms`,
        cursor: "default",
      }}
      className={isFeatured ? "project-featured" : ""}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}4D`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}1F`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 1,
          height: 16,
          background: `linear-gradient(to bottom, ${theme.accent}, transparent)`,
        }}
      />

      {/* Icon */}
      <div
        style={{
          fontSize: 22,
          color: theme.accent,
          opacity: 0.4,
          marginBottom: 12,
        }}
      >
        {String(project.icon)}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: theme.text,
          margin: "0 0 4px 0",
        }}
      >
        {project.title}
      </h3>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 11,
          color: theme.accent,
          marginBottom: 10,
          fontWeight: 400,
        }}
      >
        {project.subtitle}
      </div>

      {/* Category badge */}
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
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {project.unifiedCategory}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 12,
          color: theme.muted,
          lineHeight: 1.7,
          margin: "0 0 14px 0",
        }}
      >
        {project.description}
      </p>

      {/* Metrics for featured */}
      {isFeatured && "metrics" in project && project.metrics && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            marginBottom: 14,
          }}
          className="metrics-grid"
        >
          {Object.entries(project.metrics as Record<string, unknown>).map(([key, val]) => (
            <div
              key={key}
              style={{
                textAlign: "center",
                padding: "8px 0",
                background: `${theme.accent}08`,
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.accent,
                }}
              >
                {String(val)}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: theme.muted,
                  textTransform: "capitalize",
                }}
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 9,
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: 4,
              background: `${theme.accent}14`,
              border: `1px solid ${theme.accent}1F`,
              color: theme.accent,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);

  return (
    <section
      id="projects"
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
        <SectionLabel text="Portfolio" />

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 36,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>What I&apos;ve </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Built
          </span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
        className="projects-grid"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .project-featured {
            grid-column: span 1 !important;
          }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
