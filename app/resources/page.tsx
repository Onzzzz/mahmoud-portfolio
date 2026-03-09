"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { resources, resourceCategories } from "@/lib/resources-data";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen } from "lucide-react";

export default function ResourcesPage() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = resources.filter((r) => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || r.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "100px 24px 60px" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 11, color: theme.muted, textDecoration: "none", marginBottom: 32,
          }}
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <h1 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 700, marginBottom: 8 }}>
          <span style={{ color: theme.text }}>Knowledge </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Base
          </span>
        </h1>
        <p style={{ fontSize: 14, color: theme.muted, marginBottom: 28 }}>
          Quick reference guides on procurement, ERP, and supply chain topics.
        </p>

        <div style={{ display: "flex", gap: 20 }} className="resources-layout">
          {/* Sidebar */}
          <div style={{ width: 180, flexShrink: 0 }} className="resources-sidebar">
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Search size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: theme.muted }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "8px 10px 8px 28px",
                  borderRadius: 6,
                  border: `1px solid ${theme.accent}20`,
                  background: theme.input,
                  color: theme.text,
                  fontSize: 11,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 6,
                  border: "none",
                  background: activeCategory === cat ? `${theme.accent}15` : "transparent",
                  color: activeCategory === cat ? theme.accent : theme.muted,
                  fontSize: 11,
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 2,
                  transition: "all 0.2s",
                  fontWeight: activeCategory === cat ? 600 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((r) => (
              <article
                key={r.slug}
                style={{
                  background: theme.card,
                  border: `1px solid ${theme.accent}1F`,
                  borderRadius: 10,
                  padding: "18px 20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <BookOpen size={12} style={{ color: theme.accent, opacity: 0.5 }} />
                  <span style={{ fontSize: 9, color: theme.accent, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {r.category}
                  </span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text, margin: "0 0 8px 0" }}>{r.title}</h3>
                <p style={{ fontSize: 12, color: theme.soft, lineHeight: 1.7, margin: 0 }}>{r.content}</p>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .resources-layout { flex-direction: column !important; }
            .resources-sidebar { width: 100% !important; display: flex; flex-wrap: wrap; gap: 4px; }
            .resources-sidebar input { width: 100% !important; margin-bottom: 8px !important; }
            .resources-sidebar button { width: auto !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
