"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import {
  fractalProjects,
  fractalCategories,
  type FractalProject,
} from "@/lib/data";
import { useInView } from "@/lib/hooks";
import Link from "next/link";
import Image from "next/image";
import Package from "lucide-react/dist/esm/icons/package";
import Play from "lucide-react/dist/esm/icons/play";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";

// Map category keys to colors and labels
const categoryColorMap: Record<string, string> = {};
const categoryLabelMap: Record<string, string> = {};
fractalCategories.forEach((c) => {
  categoryColorMap[c.name] = c.color;
  categoryLabelMap[c.name] = c.label;
});

// ────── Project Card ──────
function ProjectCard({
  project,
  index,
}: {
  project: FractalProject;
  index: number;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);
  const [imgError, setImgError] = useState(false);
  const catColor = categoryColorMap[project.category] || theme.accent;
  const hasHeroImage = !!project.image && !imgError;
  const maxTags = 4;
  const visibleTags = project.technologies.slice(0, maxTags);

  const cardContent = (
    <div
      ref={ref}
      style={{
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${Math.min(index, 8) * 60}ms`,
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}4D`;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${catColor}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}1F`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image / Placeholder */}
      <div
        style={{
          height: 180,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${catColor}15, ${catColor}08)`,
        }}
      >
        {project.image && !imgError && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
          />
        )}
        {!hasHeroImage && (
          <>
            <div style={{ position: "absolute", inset: 0, opacity: 0.3, background: `repeating-linear-gradient(0deg, transparent, transparent 10px, ${catColor}08 10px, ${catColor}08 11px)` }} />
            <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: `repeating-linear-gradient(90deg, transparent, transparent 20px, ${catColor}0A 20px, ${catColor}0A 21px)` }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${catColor}20`, border: `1px solid ${catColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {fractalCategories.find((c) => c.name === project.category)?.icon || "📋"}
              </div>
            </div>
          </>
        )}
        {/* Category badge */}
        <div style={{ position: "absolute", top: 8, right: 8, padding: "3px 8px", borderRadius: 4, background: `${catColor}CC`, backdropFilter: "blur(6px)", fontSize: 8, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5, zIndex: 3 }}>
          {categoryLabelMap[project.category] || project.category}
        </div>
        {(project as any).scale && (
          <div style={{ position: "absolute", bottom: 8, left: 8, padding: "3px 7px", borderRadius: 4, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", fontSize: 8, fontWeight: 500, color: "#fff", letterSpacing: 0.3, zIndex: 3 }}>
            {(project as any).scale}
          </div>
        )}
        {(project as any).award && (
          <div style={{ position: "absolute", bottom: 8, right: project.youtube_embed || (project as any).videoUrl ? 40 : 8, padding: "3px 7px", borderRadius: 4, background: "rgba(245, 158, 11, 0.85)", fontSize: 8, fontWeight: 600, color: "#fff", letterSpacing: 0.3, zIndex: 3 }}>
            {"🏆"} {(project as any).award}
          </div>
        )}
        {(project.youtube_embed || (project as any).videoUrl) && (
          <div style={{ position: "absolute", bottom: 8, right: 8, width: 26, height: 26, borderRadius: "50%", background: "rgba(255,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
            <Play size={11} style={{ color: "#fff", marginLeft: 1 }} />
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 4, lineHeight: 1.3 }}>
          {project.title}
        </div>
        <div style={{ fontSize: 11, color: theme.muted, marginBottom: 10, lineHeight: 1.4 }}>
          {project.client} &middot; {project.location} &middot; {project.year}
        </div>
        <p style={{ fontSize: 11, color: theme.soft, lineHeight: 1.5, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10, overflow: "hidden", maxHeight: 22 }}>
          {visibleTags.map((tag) => (
            <span key={tag} style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: `${catColor}14`, border: `1px solid ${catColor}1F`, color: catColor, textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {tag}
            </span>
          ))}
          {project.technologies.length > maxTags && (
            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, color: theme.muted }}>
              +{project.technologies.length - maxTags}
            </span>
          )}
        </div>
        <div style={{ borderLeft: `2px solid ${theme.accent}`, paddingLeft: 10, fontSize: 11, color: theme.soft, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: "auto" }}>
          <Package size={10} style={{ display: "inline", marginRight: 4, verticalAlign: "middle", opacity: 0.6 }} />
          {(project as any).procurementRole || project.description}
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none", display: "block" }}>
      {cardContent}
    </Link>
  );
}

// ────── Main Page ──────
export default function ProjectsPage() {
  const { theme } = useTheme();
  const [headerRef, headerVisible] = useInView(0.05);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Filter fractal projects by active category
  const filteredProjects =
    activeCategory === "All"
      ? fractalProjects
      : fractalProjects.filter((p) => p.category === activeCategory);

  // Count projects per category
  const categoryCounts: Record<string, number> = {
    All: fractalProjects.length,
  };
  fractalCategories.forEach((cat) => {
    categoryCounts[cat.name] = fractalProjects.filter(
      (p) => p.category === cat.name
    ).length;
  });

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      <div
        ref={headerRef}
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "100px 24px 60px",
        }}
      >
        {/* Back to home */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: theme.muted,
            textDecoration: "none",
            marginBottom: 24,
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Page header */}
        <div
          style={{
            textAlign: "center",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            marginBottom: 32,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            <span style={{ color: theme.text }}>Project </span>
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Gallery
            </span>
          </h1>

          <p
            style={{
              fontSize: 13,
              color: theme.muted,
              maxWidth: 580,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Mega events, LED installations, kinetic systems, and immersive
            experiences — delivered across the Middle East.
          </p>
        </div>

        {/* Category filter pills */}
        <div
          className="projects-filter-scroll"
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 24,
            overflowX: "auto",
            paddingBottom: 4,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveCategory("All")}
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              border: activeCategory === "All" ? `1px solid ${theme.accent}` : `1px solid ${theme.accent}30`,
              background: activeCategory === "All" ? theme.accent : "transparent",
              color: activeCategory === "All" ? theme.btnText : theme.muted,
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            All ({categoryCounts.All})
          </button>

          {fractalCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                border: activeCategory === cat.name ? `1px solid ${cat.color}` : `1px solid ${theme.accent}30`,
                background: activeCategory === cat.name ? cat.color : "transparent",
                color: activeCategory === cat.name ? "#fff" : theme.muted,
                fontSize: 11,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span>{cat.icon}</span>
              {cat.label} ({categoryCounts[cat.name] || 0})
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ fontSize: 11, color: theme.muted, marginBottom: 16 }}>
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
          {activeCategory !== "All" && ` in ${categoryLabelMap[activeCategory] || activeCategory}`}
        </div>

        {/* Projects grid */}
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: theme.muted, fontSize: 13 }}>
            No projects found in this category.
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .projects-filter-scroll::-webkit-scrollbar {
          display: none;
        }
        .projects-filter-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
