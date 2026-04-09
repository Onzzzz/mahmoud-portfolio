"use client";

import { useState } from "react";
import { projects } from "@/lib/data";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s?]+)/);
  return match ? match[1] : null;
}

const fractalProjects = projects.filter((p) => p.company === "Fractal Systems");

export default function FractalProjectsReview() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div style={{ background: "#0e0e0e", minHeight: "100vh", padding: "40px 32px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <h1 style={{ color: "#D4A853", fontSize: 26, marginBottom: 6, fontWeight: 800 }}>
          Fractal Systems — Project Review
        </h1>
        <p style={{ color: "#666", fontSize: 13, marginBottom: 40 }}>
          {fractalProjects.length} projects · اضغط على أي كارت عشان تشوف كل الصور
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {fractalProjects.map((project, i) => {
            const ytId = project.video ? getYouTubeId(project.video) : null;
            const ytThumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
            const mainImage = project.image || ytThumb;
            const gallery = ("gallery" in project && Array.isArray(project.gallery)) ? project.gallery as string[] : [];
            const allImages = [...new Set([...(project.image ? [project.image] : []), ...gallery])];
            const isOpen = expanded === i;

            return (
              <div
                key={i}
                style={{
                  background: "#161616",
                  border: `1px solid ${isOpen ? "#D4A853" : "#222"}`,
                  borderRadius: 10,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                {/* ── Header row ── */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", cursor: "pointer" }}
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  {/* Number */}
                  <span style={{
                    background: "#D4A853", color: "#000",
                    fontSize: 11, fontWeight: 800,
                    padding: "2px 8px", borderRadius: 4,
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    #{i + 1}
                  </span>

                  {/* Thumbnail */}
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt=""
                      style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 5, flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: 80, height: 50, background: "#222", borderRadius: 5, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#444", fontSize: 10 }}>No img</span>
                    </div>
                  )}

                  {/* Title + meta */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {project.title}
                    </p>
                    <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                      {ytId && (
                        <span style={{ background: "#c00", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3 }}>
                          🎬 YouTube
                        </span>
                      )}
                      {allImages.length > 0 && (
                        <span style={{ background: "#1a3d6b", color: "#60a5fa", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3 }}>
                          🖼 {allImages.length} صورة
                        </span>
                      )}
                      {!ytId && allImages.length === 0 && (
                        <span style={{ background: "#3a1a1a", color: "#f87171", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3 }}>
                          ❌ لا صور ولا فيديو
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand arrow */}
                  <span style={{ color: "#D4A853", fontSize: 18, flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    ▾
                  </span>
                </div>

                {/* ── Expanded content ── */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #222", padding: "16px" }}>
                    {/* Description */}
                    <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                      {project.description}
                    </p>

                    {/* YouTube embed */}
                    {ytId && (
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ color: "#D4A853", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                          فيديو YouTube
                        </p>
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                          style={{ width: "100%", maxWidth: 640, height: 360, borderRadius: 8, border: "none" }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {/* All photos */}
                    {allImages.length > 0 && (
                      <div>
                        <p style={{ color: "#D4A853", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                          الصور ({allImages.length})
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                          {allImages.map((src, idx) => (
                            <a key={idx} href={src} target="_blank" rel="noopener noreferrer">
                              <img
                                src={src}
                                alt={`photo ${idx + 1}`}
                                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6, display: "block" }}
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 48, padding: 20, background: "#161616", borderRadius: 10, border: "1px solid #2a2a2a" }}>
          <p style={{ color: "#D4A853", fontSize: 14, fontWeight: 700, margin: "0 0 6px" }}>بعد المراجعة</p>
          <p style={{ color: "#666", fontSize: 13, margin: 0 }}>
            قولي أرقام البروجكتات اللي عايز تمسحها وهحذفهم من الكود + الفولدرز.
          </p>
        </div>
      </div>
    </div>
  );
}
