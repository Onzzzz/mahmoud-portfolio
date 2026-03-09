"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    try {
      const { setMuted } = require("@/lib/sounds");
      setMuted(!next);
    } catch {
      // sounds module not available
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: theme.nav,
        backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${theme.accent}1F`,
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}
      >
        {/* Branding */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#" style={{ textDecoration: "none", display: "flex", gap: 4, letterSpacing: 2 }}>
            <span style={{ color: theme.accent, fontWeight: 600, fontSize: 13 }}>
              MAHMOUD
            </span>
            <span style={{ color: theme.muted, fontWeight: 300, fontSize: 13 }}>
              ABDALLAH
            </span>
          </a>
        </div>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
          className="nav-desktop"
        >
          <div style={{ display: "flex", gap: 16 }} className="nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: theme.muted,
                  transition: "color 0.3s",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = theme.accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.muted)
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <ThemeSwitcher />
        </div>

        {/* Mobile: theme switcher + hamburger */}
        <div className="nav-mobile" style={{ display: "none", alignItems: "center", gap: 8 }}>
          <ThemeSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: theme.muted,
              cursor: "pointer",
              padding: 4,
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="nav-mobile-dropdown"
          style={{
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderTop: `1px solid ${theme.accent}1F`,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: "none",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                color: theme.muted,
                transition: "color 0.3s",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
          .nav-mobile-dropdown { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
