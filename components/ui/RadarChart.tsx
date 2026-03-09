"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { skillsRadar } from "@/lib/data";

export default function RadarChart() {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cx = 150;
  const cy = 150;
  const maxR = 110;
  const count = skillsRadar.length;
  const levels = [20, 40, 60, 80, 100];

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (value / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = maxR * 1.22;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Grid polygons
  const gridPolygons = levels.map((level) => {
    const points = Array.from({ length: count }, (_, i) => {
      const p = getPoint(i, level);
      return `${p.x},${p.y}`;
    }).join(" ");
    return points;
  });

  // Data polygon
  const dataPoints = skillsRadar.map((_, i) =>
    getPoint(i, skillsRadar[i].level)
  );
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Axis lines
  const axisLines = Array.from({ length: count }, (_, i) => {
    const p = getPoint(i, 100);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  return (
    <svg viewBox="0 0 300 300" style={{ maxWidth: 260, width: "100%" }}>
      {/* Grid */}
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke={theme.muted}
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={theme.muted}
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill={`${theme.accent}1F`}
        stroke={theme.accent}
        strokeWidth={1.5}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={hoveredIndex === i ? 5 : 3}
          fill={theme.accent}
          style={{ cursor: "pointer", transition: "r 0.2s" }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}

      {/* Labels */}
      {skillsRadar.map((skill, i) => {
        const lp = getLabelPoint(i);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={hoveredIndex === i ? theme.accent : theme.muted}
            fontSize={8}
            fontFamily="var(--font-outfit), sans-serif"
            style={{ textTransform: "uppercase", transition: "fill 0.2s" }}
          >
            {skill.name}
          </text>
        );
      })}

      {/* Hover tooltip */}
      {hoveredIndex !== null && (
        <text
          x={dataPoints[hoveredIndex].x}
          y={dataPoints[hoveredIndex].y - 12}
          textAnchor="middle"
          fill={theme.accent}
          fontSize={10}
          fontWeight={600}
          fontFamily="var(--font-outfit), sans-serif"
        >
          {skillsRadar[hoveredIndex].level}%
        </text>
      )}
    </svg>
  );
}
