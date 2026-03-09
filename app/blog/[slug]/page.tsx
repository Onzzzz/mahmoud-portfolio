"use client";

import { useParams } from "next/navigation";
import { useTheme } from "@/app/providers";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";

export default function BlogArticle() {
  const { theme } = useTheme();
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 24, marginBottom: 12 }}>Article not found</h1>
          <Link href="/blog" style={{ color: theme.accent, fontSize: 13 }}>Back to Blog</Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "100px 24px 60px" }}>
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: theme.muted,
            textDecoration: "none",
            marginBottom: 32,
          }}
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Article meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.muted }}>
            <Clock size={12} /> {post.readTime}
          </div>
          <div style={{ fontSize: 11, color: theme.muted }}>{post.date}</div>
          <button
            onClick={handleShare}
            style={{ background: "none", border: "none", cursor: "pointer", color: theme.muted, padding: 4 }}
          >
            <Share2 size={14} />
          </button>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(26px, 4.5vw, 36px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {post.title}
        </h1>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 9,
                padding: "3px 8px",
                borderRadius: 4,
                background: `${theme.accent}12`,
                color: theme.accent,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              <Tag size={8} style={{ verticalAlign: "middle", marginRight: 3 }} /> {tag}
            </span>
          ))}
        </div>

        {/* Hero placeholder */}
        <div
          style={{
            height: 200,
            background: `linear-gradient(135deg, ${theme.accent}12, ${theme.accent}06)`,
            borderRadius: 12,
            marginBottom: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${theme.accent}15`,
          }}
        >
          <span style={{ fontSize: 11, color: theme.muted, fontFamily: "var(--font-jetbrains)" }}>Featured image placeholder</span>
        </div>

        {/* Body */}
        <div
          dangerouslySetInnerHTML={{ __html: post.body }}
          style={{
            fontSize: 14,
            color: theme.soft,
            lineHeight: 1.9,
          }}
          className="blog-content"
        />

        <style>{`
          .blog-content h2 { font-size: 22px; font-weight: 700; color: ${theme.text}; margin: 32px 0 12px; }
          .blog-content h3 { font-size: 17px; font-weight: 600; color: ${theme.text}; margin: 24px 0 8px; }
          .blog-content p { margin: 0 0 16px; }
          .blog-content a { color: ${theme.accent}; }
        `}</style>
      </div>
    </div>
  );
}
