"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/app/providers";
import { screenshots } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Map categories to accent colors for visual variety
const categoryColors: Record<string, string> = {
  "Operations Portal": "#f59e0b",
  "ERP Systems": "#3b82f6",
  Automation: "#8b5cf6",
  "Process Design": "#06b6d4",
  Governance: "#10b981",
};

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: (typeof screenshots)[0];
  index: number;
  onOpen: () => void;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const catColor = categoryColors[item.category] || theme.accent;

  return (
    <div
      ref={ref}
      onClick={onOpen}
      style={{
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}4D`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}1F`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Placeholder visual with gradient */}
      <div
        style={{
          height: 140,
          background: `linear-gradient(135deg, ${catColor}15, ${catColor}08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Abstract decorative elements */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 10px,
                ${catColor}08 10px,
                ${catColor}08 11px
              )
            `,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 20px,
                ${catColor}0A 20px,
                ${catColor}0A 21px
              )
            `,
          }}
        />
        {/* Center icon placeholder */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            background: `${catColor}20`,
            border: `1px solid ${catColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Maximize2 size={18} style={{ color: catColor, opacity: 0.6 }} />
        </div>

        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "3px 7px",
            borderRadius: 4,
            background: `${catColor}20`,
            backdropFilter: "blur(6px)",
            fontSize: 8,
            fontWeight: 500,
            color: catColor,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {item.category}
        </div>
      </div>

      {/* Card text */}
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: theme.text,
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontSize: 10,
            color: theme.muted,
            lineHeight: 1.4,
          }}
        >
          {item.description}
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: typeof screenshots;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { theme } = useTheme();
  const item = items[currentIndex];
  const catColor = categoryColors[item.category] || theme.accent;

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        animation: "fadeIn 0.25s ease-out",
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <X size={16} style={{ color: "#fff" }} />
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: "absolute",
            left: 20,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={16} style={{ color: "#fff" }} />
        </button>
      )}

      {/* Next button */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: "absolute",
            right: 20,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={16} style={{ color: "#fff" }} />
        </button>
      )}

      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 720,
          width: "90%",
          background: theme.card,
          border: `1px solid ${theme.accent}30`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* Large visual */}
        <div
          style={{
            height: 320,
            background: `linear-gradient(135deg, ${catColor}18, ${catColor}08)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.2,
              background: `
                repeating-linear-gradient(
                  0deg, transparent, transparent 14px, ${catColor}08 14px, ${catColor}08 15px
                )
              `,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.12,
              background: `
                repeating-linear-gradient(
                  90deg, transparent, transparent 28px, ${catColor}06 28px, ${catColor}06 29px
                )
              `,
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: catColor,
              fontFamily: "var(--font-jetbrains), monospace",
              opacity: 0.5,
              zIndex: 1,
              textAlign: "center",
              padding: 20,
            }}
          >
            Screenshot placeholder — {item.category}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "3px 8px",
              borderRadius: 4,
              background: `${catColor}15`,
              fontSize: 9,
              fontWeight: 500,
              color: catColor,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
          >
            {item.category}
          </div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.text,
              margin: "0 0 8px 0",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: theme.muted,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {item.description}
          </p>
          {/* Counter */}
          <div
            style={{
              fontSize: 11,
              color: theme.muted,
              opacity: 0.5,
              marginTop: 14,
              fontFamily: "var(--font-jetbrains), monospace",
            }}
          >
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function Gallery() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const nextItem = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null && i < screenshots.length - 1 ? i + 1 : i
      ),
    []
  );

  return (
    <>
      <section
        id="gallery"
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
          <SectionLabel text="Gallery" />

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            <span style={{ color: theme.text }}>Work </span>
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Showcase
            </span>
          </h2>

          <p style={{ fontSize: 13, color: theme.muted, marginBottom: 28, maxWidth: 480 }}>
            Screenshots from projects, workflows, and systems I&apos;ve built.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
          className="gallery-grid"
        >
          {screenshots.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 480px) {
            .gallery-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <Lightbox
          items={screenshots}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </>
  );
}
