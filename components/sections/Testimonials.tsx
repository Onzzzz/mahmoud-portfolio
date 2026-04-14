"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

function LinkedinIcon({ size = 14 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const shortRoles: Record<string, string> = {
  "Hanif Ullah": "Project Management Office Head · Fractal Systems",
  "Iffat Iqbal": "Human Resources Head · MENA Region",
  "Mohsin Bilal": "Chief Financial Officer · Finance Director",
  "Huda Muhammad": "Senior Project Manager · Experiential Events",
};

// Hand-picked value excerpts — the actual insight, not the opener
const highlights: Record<string, string> = {
  "Hanif Ullah":
    "Mahmoud consistently went above and beyond — proactively finding solutions and tackling procurement, logistics, and lead-time challenges with a calm and structured approach. His problem-solving mindset made a real difference to project delivery, even under pressure.",
  "Iffat Iqbal":
    "He was very good at managing suppliers and following up on details without needing reminders. Someone you could trust to complete whatever was assigned to him — polite, cooperative, and dependable.",
  "Mohsin Bilal":
    "A great communicator, a supportive team player, and someone who always delivers high-quality work. Mahmoud's positive attitude and professionalism make him an asset to any team.",
  "Huda Muhammad":
    "His ability to source materials efficiently, negotiate with suppliers, and provide timely support made him an invaluable part of our operations. Consistently professional, reliable, and solution-driven.",
};

export function Testimonials() {
  const featured =
    "Mahmoud consistently demonstrated strong strategic thinking, commercial awareness, and a deep understanding of technically driven procurement. What stood out most was his ability to bridge the gap between technical teams, creative stakeholders, and suppliers.";

  const cards = testimonials.items.slice(1);

  return (
    <section
      id="testimonials"
      className="relative pt-12 pb-16 md:pt-16 md:pb-20"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* ── Top: heading + featured quote ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">

          <motion.div
            className="md:col-span-4 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontWeight: 400 }}
            >
              What People{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Say.</span>
            </h2>
            <a
              href={testimonials.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start transition-all duration-200"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid var(--accent)",
                padding: "0.4rem 0.8rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
            >
              <LinkedinIcon size={14} />
              More on LinkedIn ↗
            </a>
          </motion.div>

          <motion.div
            className="md:col-span-8 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <blockquote>
              <p
                className="text-lg md:text-2xl leading-relaxed"
                style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400, opacity: 0.9 }}
              >
                &ldquo;{featured}&rdquo;
              </p>
            </blockquote>
            <div className="mt-5 flex items-center gap-4">
              <div className="w-10 h-px" style={{ background: "var(--accent)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {testimonials.items[0].name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {testimonials.items[0].role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Horizontal rule ── */}
        <div style={{ height: "1px", background: "var(--surface-border)", marginBottom: "2.5rem" }} />

        {/* ── Bottom: 4 quotes separated by vertical lines ── */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 0 }}>
          {cards.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex flex-col px-4 py-0"
              style={{
                borderLeft: i === 0 ? "none" : "1px solid var(--surface-border)",
              }}
            >
              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "var(--text-secondary)",
                  lineHeight: 1.95,
                  textAlign: "justify",
                  hyphens: "auto",
                }}
              >
                &ldquo;{highlights[t.name] ?? t.quote}&rdquo;
              </p>
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}>
                  {t.name}
                </p>
                <p className="text-[10px] mt-1 leading-snug" style={{ color: "var(--text-muted)" }}>
                  {shortRoles[t.name] ?? t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
