"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { ArrowLeft, Search, Clock, Tag } from "lucide-react";

export default function BlogPage() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  const filtered = blogPosts.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || p.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "100px 24px 60px" }}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: theme.muted,
            textDecoration: "none",
            marginBottom: 32,
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <h1 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 700, marginBottom: 8 }}>
          <span style={{ color: theme.text }}>Insights & </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Articles
          </span>
        </h1>
        <p style={{ fontSize: 14, color: theme.muted, marginBottom: 28 }}>
          Thoughts on procurement, operations, and digital transformation.
        </p>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.muted }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            style={{
              width: "100%",
              padding: "10px 12px 10px 34px",
              borderRadius: 8,
              border: `1px solid ${theme.accent}20`,
              background: theme.input,
              color: theme.text,
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              style={{
                padding: "4px 10px",
                borderRadius: 4,
                border: `1px solid ${theme.accent}${activeTag === tag ? "40" : "1F"}`,
                background: activeTag === tag ? `${theme.accent}18` : "transparent",
                color: activeTag === tag ? theme.accent : theme.muted,
                fontSize: 10,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                transition: "all 0.2s",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  background: theme.card,
                  border: `1px solid ${theme.accent}1F`,
                  borderRadius: 12,
                  padding: "22px 24px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${theme.accent}4D`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${theme.accent}1F`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: theme.muted }}>
                    <Clock size={10} />
                    {post.readTime}
                  </div>
                  <div style={{ fontSize: 10, color: theme.muted }}>{post.date}</div>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 600, color: theme.text, margin: "0 0 6px 0" }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: 12, color: theme.muted, lineHeight: 1.6, margin: "0 0 12px 0" }}>
                  {post.excerpt}
                </p>
                <div style={{ display: "flex", gap: 5 }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 9,
                        padding: "2px 7px",
                        borderRadius: 3,
                        background: `${theme.accent}12`,
                        color: theme.accent,
                      }}
                    >
                      <Tag size={8} style={{ verticalAlign: "middle", marginRight: 3 }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
