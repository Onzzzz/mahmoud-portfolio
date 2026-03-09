"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";

const locations = [
  {
    country: "Egypt",
    city: "Cairo",
    cx: 178, cy: 115,
    period: "2019 — 2021",
    role: "Supply Chain Coordinator",
    company: "Egyptian Army Retail Stores",
    order: 1,
  },
  {
    country: "Saudi Arabia",
    city: "Riyadh",
    cx: 220, cy: 100,
    period: "2021 — 2023",
    role: "Procurement & Logistics Specialist",
    company: "Hafa Trading",
    order: 2,
  },
  {
    country: "UAE",
    city: "Dubai",
    cx: 240, cy: 108,
    period: "2024 — Present",
    role: "Supply Chain & Operations Manager",
    company: "Golden Sparrow Trading LLC",
    order: 3,
    current: true,
  },
];

export default function CareerMap() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="career-map"
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
        <SectionLabel text="Journey" />
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 36,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Career </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Map
          </span>
        </h2>
      </div>

      <div
        style={{
          background: theme.card,
          border: `1px solid ${theme.accent}1F`,
          borderRadius: 16,
          padding: "24px 20px",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 400 200"
          style={{ width: "100%", height: "auto" }}
        >
          {/* Simplified Middle East / North Africa region outline */}
          <defs>
            <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={theme.accent} stopOpacity="0.6" />
              <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Region shapes - simplified */}
          {/* North Africa / Egypt */}
          <path
            d="M120,80 L180,80 L190,90 L195,120 L185,140 L160,145 L140,130 L120,120 Z"
            fill={hovered === 0 ? `${theme.accent}25` : `${theme.accent}10`}
            stroke={`${theme.accent}30`}
            strokeWidth="0.5"
            style={{ transition: "fill 0.3s" }}
          />
          {/* Saudi Arabia */}
          <path
            d="M195,80 L250,70 L260,80 L255,110 L240,130 L220,135 L200,125 L195,120 Z"
            fill={hovered === 1 ? `${theme.accent}25` : `${theme.accent}10`}
            stroke={`${theme.accent}30`}
            strokeWidth="0.5"
            style={{ transition: "fill 0.3s" }}
          />
          {/* UAE */}
          <path
            d="M240,100 L260,95 L265,105 L255,115 L240,112 Z"
            fill={hovered === 2 ? `${theme.accent}35` : `${theme.accent}15`}
            stroke={`${theme.accent}40`}
            strokeWidth="0.5"
            style={{ transition: "fill 0.3s" }}
          />
          {/* Mediterranean / Europe outline */}
          <path
            d="M100,60 L200,50 L230,55 L200,65 L150,70 L100,68 Z"
            fill={`${theme.accent}05`}
            stroke={`${theme.accent}15`}
            strokeWidth="0.3"
          />

          {/* Connection lines showing career progression */}
          <path
            d={`M${locations[0].cx},${locations[0].cy} Q200,85 ${locations[1].cx},${locations[1].cy}`}
            fill="none"
            stroke={theme.accent}
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity={isVisible ? 0.5 : 0}
            style={{ transition: "opacity 1s ease 0.5s" }}
          />
          <path
            d={`M${locations[1].cx},${locations[1].cy} Q240,95 ${locations[2].cx},${locations[2].cy}`}
            fill="none"
            stroke={theme.accent}
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity={isVisible ? 0.5 : 0}
            style={{ transition: "opacity 1s ease 0.8s" }}
          />

          {/* Location dots */}
          {locations.map((loc, i) => (
            <g
              key={loc.country}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Pulse ring for current location */}
              {loc.current && (
                <circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="10"
                  fill="url(#pulseGrad)"
                  opacity={isVisible ? 1 : 0}
                  style={{ transition: `opacity 0.6s ease ${i * 0.3}s` }}
                >
                  <animate
                    attributeName="r"
                    from="6"
                    to="16"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {/* Dot */}
              <circle
                cx={loc.cx}
                cy={loc.cy}
                r={loc.current ? 5 : 3.5}
                fill={theme.accent}
                opacity={isVisible ? 1 : 0}
                style={{ transition: `all 0.6s ease ${i * 0.3}s` }}
              />
              {/* Label */}
              <text
                x={loc.cx}
                y={loc.cy - 10}
                textAnchor="middle"
                fill={theme.text}
                fontSize="7"
                fontWeight="600"
                opacity={isVisible ? 1 : 0}
                style={{ transition: `opacity 0.6s ease ${i * 0.3 + 0.2}s`, fontFamily: "var(--font-outfit)" }}
              >
                {loc.city}
              </text>
              {/* Order number */}
              <text
                x={loc.cx + (loc.current ? 9 : 7)}
                y={loc.cy + 3}
                fill={theme.accent}
                fontSize="6"
                fontWeight="700"
                opacity={isVisible ? 0.7 : 0}
                style={{ transition: `opacity 0.6s ease ${i * 0.3}s`, fontFamily: "var(--font-jetbrains)" }}
              >
                {loc.order}
              </text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hovered !== null && (
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "12px 18px",
              background: theme.bg,
              border: `1px solid ${theme.accent}30`,
              borderRadius: 10,
              backdropFilter: "blur(12px)",
              textAlign: "center",
              zIndex: 5,
              minWidth: 200,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 2 }}>
              {locations[hovered].country}
            </div>
            <div style={{ fontSize: 11, color: theme.accent, marginBottom: 4 }}>
              {locations[hovered].role}
            </div>
            <div style={{ fontSize: 10, color: theme.muted }}>
              {locations[hovered].company} | {locations[hovered].period}
            </div>
          </div>
        )}
      </div>

      {/* Legend cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginTop: 12,
        }}
        className="career-legend"
      >
        {locations.map((loc, i) => (
          <div
            key={loc.country}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "12px 14px",
              background: hovered === i ? `${theme.accent}12` : theme.card,
              border: `1px solid ${theme.accent}${hovered === i ? "30" : "1F"}`,
              borderRadius: 8,
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: `${theme.accent}${loc.current ? "30" : "15"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  fontWeight: 700,
                  color: theme.accent,
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                {loc.order}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: theme.text }}>{loc.country}</span>
              {loc.current && (
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#4ade80",
                  }}
                  className="animate-pulse-dot"
                />
              )}
            </div>
            <div style={{ fontSize: 9, color: theme.muted }}>{loc.period}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .career-legend { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
