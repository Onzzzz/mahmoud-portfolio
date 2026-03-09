"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import Calculator from "lucide-react/dist/esm/icons/calculator";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

export default function ROICalculator() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);
  const [spend, setSpend] = useState(10);
  const [suppliers, setSuppliers] = useState(50);
  const [teamSize, setTeamSize] = useState(5);
  const [industry, setIndustry] = useState("Trading");

  const savingsRate = industry === "Construction" ? 0.12 : industry === "F&B" ? 0.1 : industry === "Manufacturing" ? 0.14 : industry === "Trading" ? 0.15 : 0.11;
  const estimatedSavings = (spend * savingsRate).toFixed(1);
  const efficiencyGain = Math.min(35 + suppliers * 0.05 + teamSize * 1.5, 75).toFixed(0);

  return (
    <section
      id="roi-calculator"
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
        <SectionLabel text="Value" />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
          <span style={{ color: theme.text }}>How Much Can I </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Save You?
          </span>
        </h2>
        <p style={{ fontSize: 12, color: theme.muted, marginBottom: 28 }}>
          Based on achieving 450K AED savings at Golden Sparrow Trading
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
        className="roi-layout"
      >
        {/* Inputs */}
        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.accent}1F`,
            borderRadius: 12,
            padding: "22px 20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            <Calculator size={14} style={{ color: theme.accent }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>Your Numbers</span>
          </div>

          {/* Annual spend */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: theme.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Annual Procurement Spend</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme.accent, fontFamily: "var(--font-jetbrains)" }}>{spend}M AED</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              style={{ width: "100%", accentColor: theme.accent }}
            />
          </div>

          {/* Suppliers */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: theme.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Number of Suppliers</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme.accent, fontFamily: "var(--font-jetbrains)" }}>{suppliers}</span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              value={suppliers}
              onChange={(e) => setSuppliers(Number(e.target.value))}
              style={{ width: "100%", accentColor: theme.accent }}
            />
          </div>

          {/* Team */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: theme.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Current Team Size</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme.accent, fontFamily: "var(--font-jetbrains)" }}>{teamSize}</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              style={{ width: "100%", accentColor: theme.accent }}
            />
          </div>

          {/* Industry */}
          <div>
            <span style={{ fontSize: 10, color: theme.muted, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Industry</span>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {["Construction", "F&B", "Manufacturing", "Trading", "Other"].map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 5,
                    border: `1px solid ${industry === ind ? theme.accent : `${theme.accent}1F`}`,
                    background: industry === ind ? `${theme.accent}15` : "transparent",
                    color: industry === ind ? theme.accent : theme.muted,
                    fontSize: 10,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.accent}25`,
            borderRadius: 12,
            padding: "22px 20px",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
              <TrendingUp size={14} style={{ color: "#4ade80" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>Estimated Results</span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Annual Savings</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: theme.accent, fontFamily: "var(--font-jetbrains)" }}>
                {estimatedSavings}M
                <span style={{ fontSize: 14, fontWeight: 400, color: theme.muted }}> AED</span>
              </div>
              <div style={{ fontSize: 10, color: theme.muted, marginTop: 2 }}>
                ~{(savingsRate * 100).toFixed(0)}% of procurement spend
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Efficiency Improvement</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#4ade80", fontFamily: "var(--font-jetbrains)" }}>{efficiencyGain}%</span>
                <span style={{ fontSize: 10, color: theme.muted }}>process optimization</span>
              </div>
              {/* Progress bar */}
              <div style={{ width: "100%", height: 4, background: `${theme.accent}15`, borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${efficiencyGain}%`,
                    height: "100%",
                    backgroundImage: "linear-gradient(90deg, #4ade80, #22c55e)",
                    borderRadius: 2,
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px",
              borderRadius: 7,
              background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
              color: theme.btnText,
              fontSize: 11,
              fontWeight: 600,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: 1,
              transition: "all 0.3s",
            }}
          >
            Let&apos;s Discuss Your Case <ArrowRight size={12} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .roi-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
