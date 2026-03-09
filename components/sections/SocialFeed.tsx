"use client";

import { useTheme } from "@/app/providers";
import { linkedInPosts, social } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { ThumbsUp, MessageSquare, ExternalLink } from "lucide-react";

export default function SocialFeed() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);

  return (
    <section
      id="social-feed"
      ref={ref}
      style={{ maxWidth: 820, margin: "0 auto", padding: "80px 24px" }}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionLabel text="LinkedIn" />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2 }}>
          <span style={{ color: theme.text }}>Latest </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Activity
          </span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {linkedInPosts.map((post, i) => (
          <div
            key={i}
            style={{
              background: theme.card,
              border: `1px solid ${theme.accent}1F`,
              borderRadius: 12,
              padding: "20px 22px",
              backdropFilter: "blur(10px)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `${theme.accent}15`,
                  border: `1px solid ${theme.accent}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.accent,
                }}
              >
                MA
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>Mahmoud Abdallah</div>
                <div style={{ fontSize: 10, color: theme.muted }}>
                  Supply Chain & Operations Manager | {post.date}
                </div>
              </div>
            </div>

            {/* Content */}
            <p style={{ fontSize: 13, color: theme.soft, lineHeight: 1.7, margin: "0 0 14px 0" }}>
              {post.content}
            </p>

            {/* Reactions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.muted }}>
                  <ThumbsUp size={12} /> {post.reactions}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.muted }}>
                  <MessageSquare size={12} /> {post.comments}
                </div>
              </div>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 10,
                  color: theme.accent,
                  textDecoration: "none",
                }}
              >
                View on LinkedIn <ExternalLink size={10} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
