"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { themeName, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--surface-border)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-sm font-medium tracking-wide hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>
          Mahmoud Abdallah
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm transition-colors hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }}>
              {l.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-[var(--accent-muted)] transition-colors" style={{ color: "var(--text-secondary)" }} aria-label="Toggle theme">
            {themeName === "onyx" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" style={{ color: "var(--text-secondary)" }} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 pt-2" style={{ backgroundColor: "var(--nav-bg)", backdropFilter: "blur(12px)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm border-b hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text-secondary)", borderColor: "var(--surface-border)" }}>
              {l.label}
            </a>
          ))}
          <button onClick={() => { toggleTheme(); setOpen(false); }} className="flex items-center gap-2 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            {themeName === "onyx" ? <Sun size={16} /> : <Moon size={16} />}
            {themeName === "onyx" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
