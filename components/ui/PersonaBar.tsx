"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/providers";
import { X } from "lucide-react";

const personas = [
  { key: "recruiter", label: "Recruiter" },
  { key: "client", label: "Potential Client" },
  { key: "professional", label: "Fellow Professional" },
  { key: "browsing", label: "Just Browsing" },
];

export type PersonaType = "recruiter" | "client" | "professional" | "browsing" | null;

export function usePersona(): [PersonaType, (p: PersonaType) => void] {
  const [persona, setPersona] = useState<PersonaType>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("onz-persona") as PersonaType;
    if (stored) { setPersona(stored); return; }

    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref === "recruiter" || ref === "linkedin") setPersona("recruiter");
    else if (ref === "client") setPersona("client");

    if (document.referrer.includes("linkedin.com")) setPersona("professional");
    if (document.referrer.includes("indeed.com")) setPersona("recruiter");
  }, []);

  const set = (p: PersonaType) => {
    setPersona(p);
    if (p) sessionStorage.setItem("onz-persona", p);
  };

  return [persona, set];
}

export default function PersonaBar() {
  const { theme } = useTheme();
  const [persona, setPersona] = usePersona();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (persona) setDismissed(true);
  }, [persona]);

  if (dismissed && persona) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 57,
        left: 0,
        right: 0,
        zIndex: 49,
        background: theme.card,
        borderBottom: `1px solid ${theme.accent}15`,
        backdropFilter: "blur(16px)",
        padding: "8px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        animation: "slideDown 0.3s ease-out",
      }}
    >
      <span style={{ fontSize: 11, color: theme.muted }}>I am a:</span>
      {personas.map((p) => (
        <button
          key={p.key}
          onClick={() => setPersona(p.key as PersonaType)}
          style={{
            padding: "4px 12px",
            borderRadius: 20,
            border: `1px solid ${theme.accent}25`,
            background: persona === p.key ? `${theme.accent}18` : "transparent",
            color: persona === p.key ? theme.accent : theme.muted,
            fontSize: 10,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {p.label}
        </button>
      ))}
      <button
        onClick={() => { setPersona("browsing"); setDismissed(true); }}
        style={{ background: "none", border: "none", cursor: "pointer", color: theme.muted, padding: 4, marginLeft: 4 }}
      >
        <X size={12} />
      </button>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
