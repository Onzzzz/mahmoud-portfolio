"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { FileDown, X, Check } from "lucide-react";

const sections = [
  { key: "about", label: "About & Bio", default: true },
  { key: "experience", label: "Experience", default: true },
  { key: "projects", label: "Projects & Case Studies", default: true },
  { key: "skills", label: "Skills & Tech Stack", default: true },
  { key: "certifications", label: "Certifications", default: true },
  { key: "contact", label: "Contact Info", default: true },
];

export default function PDFGenerator() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.key, s.default]))
  );
  const [generating, setGenerating] = useState(false);

  const toggle = (key: string) => setSelected((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate PDF generation delay
    setTimeout(() => {
      setGenerating(false);
      setOpen(false);
      alert("PDF generation requires @react-pdf/renderer setup. The selected sections have been noted. Connect the PDF renderer to complete this feature.");
    }, 1500);
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.bg,
          border: `1px solid ${theme.accent}25`,
          borderRadius: 14,
          padding: "28px 24px",
          width: 360,
          maxWidth: "90vw",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, margin: 0 }}>Generate Portfolio PDF</h3>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: theme.muted, padding: 4 }}>
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: 11, color: theme.muted, marginBottom: 16 }}>Select sections to include:</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => toggle(s.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 6,
                border: `1px solid ${selected[s.key] ? theme.accent : `${theme.accent}1F`}`,
                background: selected[s.key] ? `${theme.accent}10` : "transparent",
                color: selected[s.key] ? theme.text : theme.muted,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  border: `1px solid ${selected[s.key] ? theme.accent : `${theme.accent}30`}`,
                  background: selected[s.key] ? theme.accent : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {selected[s.key] && <Check size={10} style={{ color: theme.btnText }} />}
              </div>
              {s.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 7,
            border: "none",
            background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
            color: theme.btnText,
            fontSize: 12,
            fontWeight: 600,
            cursor: generating ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            opacity: generating ? 0.6 : 1,
          }}
        >
          <FileDown size={14} />
          {generating ? "Generating..." : "Generate PDF"}
        </button>
      </div>
    </div>
  );
}

export function PDFTrigger({ onOpen }: { onOpen: () => void }) {
  return { onOpen };
}
