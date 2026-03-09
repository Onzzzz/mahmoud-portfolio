"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@/app/providers";
import {
  fractalProjects,
  fractalCategories,
  type FractalProject,
} from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import X from "lucide-react/dist/esm/icons/x";
import Package from "lucide-react/dist/esm/icons/package";
import Play from "lucide-react/dist/esm/icons/play";

// Build category color/icon maps
const categoryColorMap: Record<string, string> = {};
const categoryIconMap: Record<string, string> = {};
fractalCategories.forEach((c) => {
  categoryColorMap[c.name] = c.color;
  categoryIconMap[c.name] = c.icon;
});

function getProjectBySlug(slug: string): FractalProject | undefined {
  return fractalProjects.find((p) => p.slug === slug);
}

function GalleryLightbox({
  images,
  startIndex,
  projectTitle,
  onClose,
}: {
  images: string[];
  startIndex: number;
  projectTitle: string;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) setCurrentIndex((i) => i - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) setCurrentIndex((i) => i + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, currentIndex, images.length]);

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "lbFadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <X size={18} style={{ color: "#fff" }} />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => i - 1); }}
          style={{
            position: "absolute",
            left: 20,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={18} style={{ color: "#fff" }} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => i + 1); }}
          style={{
            position: "absolute",
            right: 20,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={18} style={{ color: "#fff" }} />
        </button>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "85vh", position: "relative" }}
      >
        <img
          src={`/projects/${images[currentIndex]}`}
          alt={`${projectTitle} - Image ${currentIndex + 1}`}
          style={{
            maxWidth: "90vw",
            maxHeight: "85vh",
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "var(--font-jetbrains), monospace",
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { theme } = useTheme();
  const params = useParams();
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heroError, setHeroError] = useState(false);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: theme.bg,
          color: theme.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 24, marginBottom: 12 }}>Project not found</h1>
          <Link
            href="/projects"
            style={{ color: theme.accent, fontSize: 13, textDecoration: "none" }}
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const catColor = categoryColorMap[project.category] || theme.accent;
  const catIcon = categoryIconMap[project.category] || "📋";

  // All gallery images (hero + gallery)
  const allImages: string[] = [];
  if (project.hero) allImages.push(project.hero);
  if (project.gallery?.length) allImages.push(...project.gallery);

  // Previous / next project navigation (only among projects that have detail-worthy content)
  const currentIdx = fractalProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIdx > 0 ? fractalProjects[currentIdx - 1] : null;
  const nextProject =
    currentIdx < fractalProjects.length - 1
      ? fractalProjects[currentIdx + 1]
      : null;

  // Determine video URL
  const videoUrl = project.youtube_embed;

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 60px" }}>
        {/* Back link */}
        <Link
          href="/projects"
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
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        {/* Hero image */}
        {project.image && !heroError ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingBottom: "50%",
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 32,
              cursor: allImages.length > 0 ? "pointer" : "default",
            }}
            onClick={() => allImages.length > 0 && setLightboxIndex(0)}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              style={{ objectFit: "cover" }}
              priority
              onError={() => setHeroError(true)}
            />
            {/* Gradient overlay at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              height: 240,
              borderRadius: 14,
              marginBottom: 32,
              background: `linear-gradient(135deg, ${catColor}15, ${catColor}06)`,
              border: `1px solid ${catColor}20`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 40, opacity: 0.3 }}>{catIcon}</span>
            <span
              style={{
                fontSize: 13,
                color: catColor,
                opacity: 0.4,
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              {project.title}
            </span>
          </div>
        )}

        {/* Category badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 6,
            background: `${catColor}18`,
            border: `1px solid ${catColor}30`,
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 14 }}>{catIcon}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: catColor,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(28px, 4.5vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {project.title}
        </h1>

        {/* Client */}
        <div
          style={{
            fontSize: 15,
            color: theme.accent,
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          {project.client}
        </div>

        {/* Location, Date & Scale */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 12,
            color: theme.muted,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={13} /> {project.location}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={13} /> {project.year}
          </span>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(project as any).scale && (
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                background: `${catColor}15`,
                color: catColor,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(project as any).scale}
            </span>
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(project as any).award && (
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(245, 158, 11, 0.15)",
                color: "#f59e0b",
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              🏆 {(project as any).award}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            color: theme.soft,
            lineHeight: 1.8,
            marginBottom: 24,
            maxWidth: 700,
          }}
        >
          {project.description}
        </p>

        {/* Procurement role highlighted box */}
        <div
          style={{
            background: `${theme.accent}0A`,
            borderLeft: `3px solid ${theme.accent}`,
            borderRadius: "0 8px 8px 0",
            padding: "14px 18px",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: theme.accent,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 6,
            }}
          >
            <Package
              size={11}
              style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }}
            />
            Procurement Role
          </div>
          <div
            style={{
              fontSize: 13,
              color: theme.soft,
              lineHeight: 1.7,
            }}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(project as any).procurementRole || project.description}
          </div>
        </div>

        {/* Technologies */}
        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: theme.muted,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              marginBottom: 12,
            }}
          >
            Technologies
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: 11,
                  padding: "5px 14px",
                  borderRadius: 6,
                  background: `${catColor}14`,
                  border: `1px solid ${catColor}25`,
                  color: catColor,
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* YouTube embed */}
        {videoUrl && (
          <div style={{ marginBottom: 36 }}>
            <h3
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.muted,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Play size={12} /> Video
            </h3>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                borderRadius: 12,
                overflow: "hidden",
                background: "#000",
                border: `1px solid ${theme.accent}15`,
              }}
            >
              <iframe
                src={videoUrl}
                title={`${project.title} video`}
                loading="lazy"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h3
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.muted,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 12,
              }}
            >
              Gallery ({project.gallery.length})
            </h3>
            <div
              className="detail-gallery-grid"
              style={{
                display: "grid",
                gridTemplateColumns: project.gallery.length === 1 ? "1fr" : "repeat(2, 1fr)",
                gap: 12,
              }}
            >
              {project.gallery.map((img, i) => (
                <div
                  key={img}
                  style={{
                    position: "relative",
                    paddingBottom: "60%",
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: `1px solid ${theme.accent}15`,
                    transition: "border-color 0.2s",
                  }}
                  onClick={() =>
                    setLightboxIndex(project.hero ? i + 1 : i)
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${catColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${theme.accent}15`;
                  }}
                >
                  <Image
                    src={`/projects/${img}`}
                    alt={`${project.title} - Gallery ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External references */}
        {project.references && Object.keys(project.references).length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h3
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.muted,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 12,
              }}
            >
              Links
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(project.references).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 500,
                    color: theme.accent,
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: `1px solid ${theme.accent}30`,
                    background: `${theme.accent}08`,
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                  }}
                >
                  <ExternalLink size={12} />
                  {key}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* External URL fallback */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(project as any).externalUrl && !(project.references && Object.keys(project.references).length > 0) && (
          <div style={{ marginBottom: 36 }}>
            <a
              href={(project as any).externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 500,
                color: theme.accent,
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${theme.accent}30`,
                background: `${theme.accent}08`,
                transition: "all 0.2s",
              }}
            >
              <ExternalLink size={12} />
              View Project
            </a>
          </div>
        )}

        {/* Previous / Next navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 48,
            paddingTop: 28,
            borderTop: `1px solid ${theme.accent}15`,
          }}
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: theme.muted,
                transition: "color 0.2s",
              }}
            >
              <ChevronLeft size={14} />
              <div>
                <div
                  style={{
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 2,
                    color: theme.muted,
                  }}
                >
                  Previous
                </div>
                <div style={{ color: theme.soft, fontWeight: 500 }}>
                  {prevProject.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: theme.muted,
                textAlign: "right",
                transition: "color 0.2s",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 2,
                    color: theme.muted,
                  }}
                >
                  Next
                </div>
                <div style={{ color: theme.soft, fontWeight: 500 }}>
                  {nextProject.title}
                </div>
              </div>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && allImages.length > 0 && (
        <GalleryLightbox
          images={allImages}
          startIndex={lightboxIndex}
          projectTitle={project.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <style>{`
        @media (max-width: 640px) {
          .detail-gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
