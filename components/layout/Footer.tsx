"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/providers";
import { social, motivationalQuotes } from "@/lib/data";

const links = [
  { name: "LinkedIn", url: social.linkedin },
  { name: "Email", url: `mailto:${social.email}` },
  { name: "Phone", url: `tel:${social.phone}` },
  { name: "WhatsApp", url: social.whatsapp },
];

export default function Footer() {
  const { theme } = useTheme();

  // Deterministic initial value (first quote) to avoid hydration mismatch,
  // then randomize on client after mount
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  return (
    <footer
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "40px 24px 32px",
        textAlign: "center",
      }}
    >
      {/* Separator */}
      <div
        style={{
          width: 50,
          height: 1,
          margin: "0 auto 28px",
          background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        }}
      />

      {/* Motivational Quote */}
      <div
        style={{
          maxWidth: 420,
          margin: "0 auto 24px",
          padding: "16px 20px",
          background: `${theme.accent}06`,
          border: `1px solid ${theme.accent}12`,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: theme.soft,
            lineHeight: 1.6,
            fontStyle: "italic",
            marginBottom: 6,
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </div>
        <div
          style={{
            fontSize: 9,
            color: theme.muted,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          &mdash; {quote.author}
        </div>
      </div>

      {/* Branding */}
      <div style={{ marginBottom: 16, letterSpacing: 2 }}>
        <span style={{ color: theme.accent, fontWeight: 600, fontSize: 13 }}>
          MAHMOUD
        </span>{" "}
        <span style={{ color: theme.muted, fontWeight: 300, fontSize: 13 }}>
          ABDALLAH
        </span>
      </div>

      {/* Social links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              fontSize: 10,
              color: theme.muted,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: 1,
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = theme.accent)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = theme.muted)
            }
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div
        style={{
          fontSize: 9,
          color: theme.muted,
          opacity: 0.35,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        &copy; 2026 MAHMOUD ABDALLAH
      </div>
    </footer>
  );
}
