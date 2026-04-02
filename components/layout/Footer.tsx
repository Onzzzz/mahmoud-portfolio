import { Mail, MessageCircle } from "lucide-react";
import { personal } from "@/lib/data";

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

const iconHoverStyle = `
  .footer-icon { color: var(--text-muted); transition: color 0.2s; }
  .footer-icon:hover { color: var(--accent); }
`;

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--surface-border)",
      }}
    >
      <style>{iconHoverStyle}</style>
      <div className="max-w-6xl mx-auto w-full py-5 px-4 md:px-6">
        {/* Top row — tagline centered with decorative lines */}
        <div
          className="flex items-center gap-4 justify-center mb-4"
        >
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, transparent, var(--surface-border))" }}
          />
          <p
            style={{
              fontSize: "0.6rem",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              opacity: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Built to solve. Built to build.
          </p>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to left, transparent, var(--surface-border))" }}
          />
        </div>

        {/* Bottom row — copyright left, icons right */}
        <div className="flex items-center justify-between">
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.02em",
            }}
          >
            &copy; 2026 Mahmoud Abdallah
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-icon"
            >
              <LinkedinIcon size={14} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="footer-icon"
            >
              <Mail size={14} />
            </a>
            <a
              href={personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer-icon"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
