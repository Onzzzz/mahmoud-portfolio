"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { themeName, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(id), {
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
        {/* Name - serif, uppercase, tracking-widest, gold */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textDecoration: "none",
          }}
        >
          MAHMOUD ABDALLAH
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const sectionId = l.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "-0.02em",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  borderBottom: isActive ? "1px solid var(--accent)" : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                {l.label}
              </a>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-[var(--accent-muted)] transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle theme"
          >
            {themeName === "onyx" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          style={{ color: "var(--text-secondary)" }}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2" style={{ backgroundColor: "var(--nav-bg)", backdropFilter: "blur(12px)" }}>
          {links.map((l) => {
            const sectionId = l.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                className="block py-3 text-sm border-b transition-colors"
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  borderColor: "var(--surface-border)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                }}
              >
                {l.label}
              </a>
            );
          })}
          <button
            onClick={() => { toggleTheme(); setOpen(false); }}
            className="flex items-center gap-2 py-3 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {themeName === "onyx" ? <Sun size={16} /> : <Moon size={16} />}
            {themeName === "onyx" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
