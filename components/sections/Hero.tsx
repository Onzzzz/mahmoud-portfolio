"use client";

import { useTheme } from "@/app/providers";
import { hero } from "@/lib/data";
import { useTyping } from "@/lib/hooks";
import Particles from "@/components/ui/Particles";
import GradientMesh from "@/components/effects/GradientMesh";

export default function Hero() {
  const { theme } = useTheme();
  const typed = useTyping(hero.typingWords, 85, 45, 2200);

  // Render description with highlights
  const renderDescription = () => {
    const text = hero.description;
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    const highlights = [
      { term: "UAE, KSA & Egypt", style: { color: theme.soft, fontWeight: 500 } },
      { term: "AED 450K+", style: { color: theme.accent, fontWeight: 500 } },
    ];

    while (remaining.length > 0) {
      let earliestIndex = remaining.length;
      let earliestHighlight: (typeof highlights)[0] | null = null;

      for (const h of highlights) {
        const idx = remaining.indexOf(h.term);
        if (idx !== -1 && idx < earliestIndex) {
          earliestIndex = idx;
          earliestHighlight = h;
        }
      }

      if (earliestHighlight && earliestIndex < remaining.length) {
        if (earliestIndex > 0) {
          parts.push(<span key={key++}>{remaining.slice(0, earliestIndex)}</span>);
        }
        parts.push(
          <span key={key++} style={earliestHighlight.style}>
            {earliestHighlight.term}
          </span>
        );
        remaining = remaining.slice(earliestIndex + earliestHighlight.term.length);
      } else {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }
    }

    return parts;
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "0 24px",
        overflow: "hidden",
      }}
    >
      <GradientMesh />
      <Particles />

      {/* Background gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: theme.isDark
            ? `radial-gradient(ellipse at 20% 10%, ${theme.accent}0D 0%, transparent 60%), radial-gradient(ellipse at 80% 90%, ${theme.accent}08 0%, transparent 60%)`
            : `radial-gradient(ellipse at 30% 20%, ${theme.accent}0F 0%, transparent 60%)`,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Availability badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 50,
            border: `1px solid ${theme.accent}30`,
            background: `${theme.accent}08`,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
            }}
            className="animate-pulse-dot"
          />
          <span style={{ fontSize: 11, color: theme.soft, fontWeight: 400 }}>
            {hero.badge}
          </span>
        </div>

        {/* Name */}
        <h1 style={{ margin: 0, lineHeight: 1.1 }}>
          <div
            style={{
              fontSize: "clamp(44px, 7vw, 80px)",
              fontWeight: 700,
              color: theme.text,
            }}
          >
            {hero.name[0]}
          </div>
          <div
            style={{
              fontSize: "clamp(44px, 7vw, 80px)",
              fontWeight: 200,
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {hero.name[1]}
          </div>
        </h1>

        {/* Typing */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 14,
            fontWeight: 300,
            marginTop: 20,
            marginBottom: 20,
            height: 24,
          }}
        >
          <span style={{ color: theme.accent, opacity: 0.5 }}>~/</span>
          <span style={{ color: theme.soft }}>{typed}</span>
          <span style={{ color: theme.accent }} className="animate-blink">
            &#9613;
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            maxWidth: 480,
            margin: "0 auto",
            fontSize: 14,
            color: theme.muted,
            lineHeight: 1.85,
            fontWeight: 300,
          }}
        >
          {renderDescription()}
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          <a
            href={hero.cta[0].href}
            style={{
              padding: "12px 28px",
              borderRadius: 7,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              textDecoration: "none",
              background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              color: theme.btnText,
              boxShadow: `0 4px 24px ${theme.accent}40`,
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 32px ${theme.accent}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accent}40`;
            }}
          >
            {hero.cta[0].label}
          </a>
          <a
            href={hero.cta[1].href}
            style={{
              padding: "12px 28px",
              borderRadius: 7,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              textDecoration: "none",
              background: "transparent",
              color: theme.accent,
              border: `1px solid ${theme.accent}66`,
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accent;
              e.currentTarget.style.background = `${theme.accent}14`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${theme.accent}66`;
              e.currentTarget.style.background = "transparent";
            }}
          >
            {hero.cta[1].label}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <div
          className="animate-scroll-line"
          style={{
            width: 1,
            height: 28,
            background: `linear-gradient(to bottom, ${theme.accent}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
