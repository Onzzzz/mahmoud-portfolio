"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

const FADE_UP = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function parsePeriodYear(period: string): string {
  // Return the start year from a period string like "Oct 2025 — Present"
  const match = period.match(/\d{4}/);
  return match ? match[0] : period;
}

export function Experience() {
  return (
    <section
      className="relative px-4 md:px-6 py-24 md:py-32"
      id="experience"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          className="flex items-end justify-between mb-16 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="section-label mb-3 block">Experience</span>
            <h2
              className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.02em",
              }}
            >
              Where I&apos;ve Built Things
            </h2>
          </div>

          {/* Decorative number — right side, hidden on small screens */}
          <span
            className="deco-num hidden md:block select-none"
            aria-hidden="true"
          >
            01
          </span>
        </motion.div>

        {/* ── Entry List ── */}
        <div>
          {experience.map((item, i) => {
            const isCurrent = item.current;
            const startYear = parsePeriodYear(item.period);

            return (
              <motion.div
                key={i}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {/* Divider above each entry */}
                <div className="divider" />

                {/* Entry row */}
                <div
                  className="group grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-0 md:gap-8 py-8 md:py-10 rounded-sm transition-colors duration-300"
                  style={{
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  {/* ── Left column: period (desktop only) ── */}
                  <div className="hidden md:flex flex-col items-start pt-0.5">
                    <span
                      className="text-xs leading-tight"
                      style={{
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {startYear}
                    </span>
                    {isCurrent && (
                      <span
                        className="text-[10px] mt-1"
                        style={{
                          color: "var(--accent)",
                          fontFamily: "var(--font-mono)",
                          opacity: 0.7,
                        }}
                      >
                        now
                      </span>
                    )}
                  </div>

                  {/* ── Main column ── */}
                  <div
                    style={
                      isCurrent
                        ? {
                            borderLeft: "2px solid var(--accent)",
                            paddingLeft: "1rem",
                          }
                        : undefined
                    }
                  >
                    {/* Top row: role + CURRENT pill */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-lg font-semibold leading-snug"
                        style={{
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {item.role}
                      </span>

                      {isCurrent && (
                        <span
                          className="text-[9px] font-semibold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
                          style={{
                            color: "var(--accent)",
                            border: "1px solid var(--accent)",
                            fontFamily: "var(--font-mono)",
                            background: "var(--accent-muted)",
                          }}
                        >
                          Current
                        </span>
                      )}
                    </div>

                    {/* Company · Type */}
                    <p className="mt-1 text-sm leading-snug">
                      <span style={{ color: "var(--accent)", fontWeight: 500 }}>
                        {item.company}
                      </span>
                      <span style={{ color: "var(--text-muted)", margin: "0 0.35rem" }}>
                        ·
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>
                        {item.type}
                      </span>
                    </p>

                    {/* Location — mono, xs */}
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.location}
                    </p>

                    {/* Highlights */}
                    <ul className="mt-4 flex flex-col gap-2">
                      {item.highlights.slice(0, 4).map((h, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm leading-relaxed"
                        >
                          <span
                            className="flex-shrink-0 mt-0.5 font-medium"
                            style={{
                              color: "var(--accent)",
                              lineHeight: "1.6",
                            }}
                          >
                            —
                          </span>
                          <span style={{ color: "var(--text-secondary)" }}>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag, k) => (
                        <span key={k} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Final bottom divider */}
          <div className="divider" />
        </div>
      </div>
    </section>
  );
}
