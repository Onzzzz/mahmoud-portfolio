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

function truncateQuote(quote: string, maxLength: number): string {
  if (quote.length <= maxLength) return quote;
  const chunk = quote.slice(0, maxLength);
  const lastPeriod = Math.max(chunk.lastIndexOf(". "), chunk.lastIndexOf("! "), chunk.lastIndexOf("? "));
  if (lastPeriod > maxLength * 0.5) {
    return chunk.slice(0, lastPeriod + 1);
  }
  return chunk.trimEnd() + "...";
}

export function Testimonials() {
  // Key excerpt from Avil's long recommendation
  const featuredExcerpt =
    "Mahmoud consistently demonstrated strong strategic thinking, commercial awareness, and a deep understanding of technically driven procurement. What stood out most was his ability to bridge the gap between technical teams, creative stakeholders, and suppliers.";

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden pt-10 pb-24 md:pt-14 md:pb-36"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* 12-column grid: left heading + right content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          {/* Left column (col-span-4): Heading + LinkedIn link */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <h2
              className="text-3xl md:text-5xl leading-tight mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--text-primary)",
                fontWeight: 400,
              }}
            >
              What People{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                Say.
              </span>
            </h2>

            <a
              href={testimonials.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all duration-200"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--accent)";
              }}
              aria-label="More on LinkedIn"
            >
              <LinkedinIcon size={14} />
              More on LinkedIn ↗
            </a>
          </motion.div>

          {/* Right column (col-span-8): Pull-quote + grid */}
          <div className="md:col-span-8">

            {/* Large pull-quote */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <blockquote>
                <p
                  className="text-xl md:text-2xl leading-relaxed"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    color: "var(--accent)",
                    fontWeight: 400,
                    opacity: 0.85,
                  }}
                >
                  &ldquo;{featuredExcerpt}&rdquo;
                </p>
              </blockquote>

              {/* Gold line + author */}
              <div className="mt-6 flex items-center gap-4">
                <div
                  className="w-12 h-px"
                  style={{ background: "var(--accent)" }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {testimonials.items[0].name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {testimonials.items[0].role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Grid of remaining quotes — all uniform */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-0"
              style={{ gap: "1px", background: "var(--surface-border)" }}
            >
              {testimonials.items.slice(1).map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 transition-colors duration-300 hover:bg-[var(--surface-2)] flex flex-col h-full"
                  style={{ background: "var(--surface)" }}
                >
                  <blockquote>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{
                        color: "var(--accent)",
                        fontStyle: "italic",
                        opacity: 0.75,
                      }}
                    >
                      &ldquo;{truncateQuote(t.quote, 420)}&rdquo;
                    </p>
                  </blockquote>
                  <div style={{ marginTop: "auto" }}>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
