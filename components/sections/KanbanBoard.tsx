"use client";

import { useTheme } from "@/app/providers";
import { kanbanBoard } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { Circle, ArrowRight, CheckCircle } from "lucide-react";

const priorityColors: Record<string, string> = { high: "#ef4444", medium: "#f59e0b", low: "#4ade80" };

const columns = [
  { key: "planning" as const, label: "Planning", icon: Circle, items: kanbanBoard.planning },
  { key: "inProgress" as const, label: "In Progress", icon: ArrowRight, items: kanbanBoard.inProgress },
  { key: "completed" as const, label: "Completed", icon: CheckCircle, items: kanbanBoard.completed },
];

export default function KanbanBoard() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);

  return (
    <section
      id="kanban"
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
        <SectionLabel text="Roadmap" />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2 }}>
          <span style={{ color: theme.text }}>Current </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Projects
          </span>
        </h2>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}
        className="kanban-grid"
      >
        {columns.map((col, ci) => {
          const Icon = col.icon;
          return (
            <div key={col.key}>
              {/* Column header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 10,
                  padding: "8px 12px",
                  background: `${theme.accent}08`,
                  borderRadius: 6,
                }}
              >
                <Icon size={12} style={{ color: theme.accent }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: theme.text, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {col.label}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: theme.muted,
                    marginLeft: "auto",
                    background: `${theme.accent}12`,
                    padding: "1px 6px",
                    borderRadius: 10,
                  }}
                >
                  {col.items.length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {col.items.map((item, i) => (
                  <div
                    key={item.title}
                    style={{
                      background: theme.card,
                      border: `1px solid ${theme.accent}1F`,
                      borderRadius: 8,
                      padding: "12px 14px",
                      backdropFilter: "blur(10px)",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(15px)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: `${ci * 100 + i * 60}ms`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: priorityColors[item.priority],
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 500, color: theme.text, lineHeight: 1.3 }}>
                        {item.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 8,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        padding: "2px 6px",
                        borderRadius: 3,
                        background: `${theme.accent}10`,
                        color: theme.accent,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) { .kanban-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
