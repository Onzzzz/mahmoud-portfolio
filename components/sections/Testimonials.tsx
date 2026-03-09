"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/app/providers";
import { testimonials } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const allTestimonials = [...testimonials.featured, ...testimonials.grid];

function InitialsAvatar({ name, size = 36 }: { name: string; size?: number }) {
  const { theme } = useTheme();
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `${theme.accent}18`,
        border: `1px solid ${theme.accent}25`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.36,
        fontWeight: 600,
        color: theme.accent,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = allTestimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = allTestimonials[current];

  return (
    <section
      id="testimonials"
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
        <SectionLabel text="Testimonials" />
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 36,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>What People </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Say
          </span>
        </h2>
      </div>

      {/* Main carousel card */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          background: theme.card,
          border: `1px solid ${theme.accent}25`,
          borderRadius: 16,
          padding: "32px 28px",
          backdropFilter: "blur(10px)",
          position: "relative",
          minHeight: 200,
        }}
      >
        {/* Quote icon */}
        <Quote
          size={28}
          style={{
            color: theme.accent,
            opacity: 0.15,
            position: "absolute",
            top: 20,
            right: 24,
          }}
        />

        {/* Quote content with fade transition */}
        <div
          key={current}
          style={{
            animation: "fadeSlide 0.4s ease-out",
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: theme.soft,
              lineHeight: 1.9,
              margin: "0 0 24px 0",
              fontWeight: 300,
              fontStyle: "italic",
              maxWidth: 600,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <InitialsAvatar name={t.name} size={40} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{t.name}</div>
              <div style={{ fontSize: 11, color: theme.accent, marginTop: 1 }}>{t.role}</div>
              <div
                style={{
                  fontSize: 9,
                  color: theme.muted,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  marginTop: 2,
                }}
              >
                {t.relationship}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            display: "flex",
            gap: 6,
          }}
        >
          <button
            onClick={prev}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              border: `1px solid ${theme.accent}20`,
              background: "transparent",
              color: theme.muted,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${theme.accent}50`; e.currentTarget.style.color = theme.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${theme.accent}20`; e.currentTarget.style.color = theme.muted; }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              border: `1px solid ${theme.accent}20`,
              background: "transparent",
              color: theme.muted,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${theme.accent}50`; e.currentTarget.style.color = theme.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${theme.accent}20`; e.currentTarget.style.color = theme.muted; }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 16,
        }}
      >
        {allTestimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              border: "none",
              background: i === current ? theme.accent : `${theme.accent}30`,
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: 16,
          fontSize: 11,
          color: theme.muted,
          opacity: 0.6,
        }}
      >
        {testimonials.footer}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
