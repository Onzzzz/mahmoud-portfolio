"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { GitBranch } from "lucide-react";

const flowcharts = [
  {
    title: "Procurement Workflow",
    steps: ["Request", "Approval", "RFQ", "Evaluation", "PO", "Delivery", "Payment"],
    description: "End-to-end procurement lifecycle from request initiation to final payment",
  },
  {
    title: "Tender Process",
    steps: ["Identification", "Doc Prep", "Submission", "Follow-up", "Evaluation", "Award"],
    description: "Complete tender management lifecycle for GCC government procurement",
  },
  {
    title: "Supplier Evaluation",
    steps: ["Registration", "Assessment", "Scoring", "Approval", "Onboarding", "Monitoring"],
    description: "Structured vendor qualification and ongoing performance tracking",
  },
];

function FlowchartCard({ chart, index }: { chart: typeof flowcharts[0]; index: number }) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const [hoverStep, setHoverStep] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      style={{
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 12,
        padding: "22px 20px",
        backdropFilter: "blur(10px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(25px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <GitBranch size={14} style={{ color: theme.accent, opacity: 0.6 }} />
        <h3 style={{ fontSize: 14, fontWeight: 600, color: theme.text, margin: 0 }}>{chart.title}</h3>
      </div>
      <p style={{ fontSize: 10, color: theme.muted, marginBottom: 16, lineHeight: 1.5 }}>{chart.description}</p>

      {/* Visual flowchart */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
        {chart.steps.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center" }}>
            <div
              onMouseEnter={() => setHoverStep(i)}
              onMouseLeave={() => setHoverStep(null)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                background: hoverStep === i ? `${theme.accent}20` : `${theme.accent}0A`,
                border: `1px solid ${hoverStep === i ? theme.accent : `${theme.accent}20`}`,
                fontSize: 10,
                fontWeight: 500,
                color: hoverStep === i ? theme.accent : theme.soft,
                transition: "all 0.2s",
                cursor: "default",
                whiteSpace: "nowrap",
              }}
            >
              {step}
            </div>
            {i < chart.steps.length - 1 && (
              <div
                style={{
                  width: 16,
                  height: 1,
                  background: `${theme.accent}30`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -1,
                    top: -3,
                    fontSize: 7,
                    color: `${theme.accent}50`,
                  }}
                >
                  &#9654;
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Flowcharts() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);

  return (
    <section
      id="flowcharts"
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
        <SectionLabel text="Processes" />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2 }}>
          <span style={{ color: theme.text }}>Process </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Flowcharts
          </span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {flowcharts.map((chart, i) => (
          <FlowchartCard key={chart.title} chart={chart} index={i} />
        ))}
      </div>
    </section>
  );
}
