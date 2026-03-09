"use client";

import { useTheme } from "@/app/providers";
import { dailyTools } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";

const categoryIcons: Record<string, string> = {
  Communication: "\uD83D\uDCAC",
  ERP: "\uD83C\uDFE2",
  Automation: "\u26A1",
  AI: "\uD83E\uDD16",
  Analytics: "\uD83D\uDCCA",
  Tools: "\uD83D\uDEE0\uFE0F",
};

export default function DailyTools() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);

  return (
    <section
      id="daily-tools"
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
        <SectionLabel text="Daily Stack" />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2 }}>
          <span style={{ color: theme.text }}>Tools I Use </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Daily
          </span>
        </h2>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}
        className="tools-grid"
      >
        {dailyTools.map((cat, ci) => (
          <div
            key={cat.category}
            style={{
              background: theme.card,
              border: `1px solid ${theme.accent}1F`,
              borderRadius: 10,
              padding: "16px 14px",
              backdropFilter: "blur(10px)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${ci * 80}ms`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 14 }}>{categoryIcons[cat.category] || ""}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme.text }}>{cat.category}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cat.tools.map((tool) => (
                <div key={tool.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: theme.soft }}>{tool.name}</span>
                    <span style={{ fontSize: 9, color: theme.accent, fontFamily: "var(--font-jetbrains)" }}>{tool.level}%</span>
                  </div>
                  <div style={{ width: "100%", height: 3, background: `${theme.accent}12`, borderRadius: 2, overflow: "hidden" }}>
                    <div
                      style={{
                        width: isVisible ? `${tool.level}%` : "0%",
                        height: "100%",
                        backgroundImage: `linear-gradient(90deg, ${theme.accentDim}, ${theme.accent})`,
                        borderRadius: 2,
                        transition: `width 1s ease-out ${ci * 0.1 + 0.3}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) { .tools-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
