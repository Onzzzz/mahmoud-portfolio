import { Mail, MessageCircle, Download } from "lucide-react";
import { personal, certifications } from "@/lib/data";

function LinkedinIcon({ size = 16 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const footerLinkStyle = `
  .footer-link {
    color: var(--text-secondary);
    transition: color 0.2s;
    text-decoration: none;
    font-family: var(--font-heading);
    font-style: italic;
    font-size: 0.85rem;
  }
  .footer-link:hover { color: var(--accent); }
`;

export function Footer() {
  return (
    <footer
      style={{
        background: "#0e0e0e",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <style>{footerLinkStyle}</style>

      {/* Resume + Digital Badges section */}
      <div
        className="max-w-6xl mx-auto w-full pt-8 pb-4 px-4 md:px-6 flex flex-col items-center text-center"
        style={{ gap: "1rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
          }}
        >
          Prefer a traditional resume?
        </p>
        <a
          href="/Mahmoud_Abdallah.pdf"
          download
          className="inline-flex items-center gap-2 transition-all duration-200"
          style={{
            padding: "0.75rem 2rem",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontFamily: "var(--font-heading)",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "10px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent)";
            e.currentTarget.style.color = "var(--bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--accent)";
          }}
        >
          <Download size={16} />
          Download CV
        </a>

      </div>

      {/* Tagline divider */}
      <div className="flex items-center gap-4 max-w-6xl mx-auto w-full px-4 md:px-6 py-3">
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "var(--accent)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Built to solve. Built to build.
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Bottom bar — copyright left, icons right */}
      <div
        className="max-w-6xl mx-auto w-full px-4 md:px-6 py-3 flex items-center justify-between"
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          &copy; 2026 Mahmoud Abdallah
        </p>

        <div className="flex items-center gap-4">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${personal.email}`}
            style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
            aria-label="WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
