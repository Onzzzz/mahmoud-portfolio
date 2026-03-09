"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { Play, X, Monitor } from "lucide-react";

const demos = [
  { title: "Operations Portal Walkthrough", duration: "4:30", category: "Operations" },
  { title: "Odoo ERP Implementation", duration: "6:15", category: "ERP" },
  { title: "n8n Automation Workflows", duration: "3:45", category: "Automation" },
  { title: "Tender Monitoring Dashboard", duration: "5:00", category: "Procurement" },
];

export default function Demos() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);
  const [modal, setModal] = useState<number | null>(null);

  return (
    <>
      <section
        id="demos"
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
          <SectionLabel text="Demos" />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2 }}>
            <span style={{ color: theme.text }}>Video </span>
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Demos
            </span>
          </h2>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}
          className="demos-grid"
        >
          {demos.map((demo, i) => (
            <div
              key={demo.title}
              onClick={() => setModal(i)}
              style={{
                background: theme.card,
                border: `1px solid ${theme.accent}1F`,
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${theme.accent}4D`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${theme.accent}10, ${theme.accent}05)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Monitor size={24} style={{ color: theme.accent, opacity: 0.2 }} />
                {/* Play button overlay */}
                <div
                  style={{
                    position: "absolute",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `${theme.accent}30`,
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Play size={16} fill={theme.accent} style={{ color: theme.accent, marginLeft: 2 }} />
                </div>
                {/* Duration */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 6,
                    right: 6,
                    padding: "2px 6px",
                    borderRadius: 3,
                    background: "rgba(0,0,0,0.6)",
                    fontSize: 9,
                    color: "#fff",
                    fontFamily: "var(--font-jetbrains)",
                  }}
                >
                  {demo.duration}
                </div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 9, color: theme.accent, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                  {demo.category}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{demo.title}</div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) { .demos-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Modal */}
      {modal !== null && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: theme.card,
              border: `1px solid ${theme.accent}30`,
              borderRadius: 14,
              padding: "40px 32px",
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            <button
              onClick={() => setModal(null)}
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
              }}
            >
              <X size={16} style={{ color: "#fff" }} />
            </button>
            <Play size={40} style={{ color: theme.accent, opacity: 0.3, marginBottom: 16 }} />
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, marginBottom: 8 }}>{demos[modal].title}</h3>
            <p style={{ fontSize: 12, color: theme.muted, lineHeight: 1.6 }}>
              Video coming soon. This demo will showcase the full {demos[modal].category.toLowerCase()} workflow in action.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
