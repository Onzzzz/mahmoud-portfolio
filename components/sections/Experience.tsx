"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

function parsePeriodYear(period: string): string {
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
        {/* Header */}
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
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            >
              Where I&apos;ve Built Things
            </h2>
          </div>
          <span className="deco-num hidden md:block select-none" aria-hidden="true">02</span>
        </motion.div>

        {/* Timeline — all entries expanded */}
        <div className="relative">
          {/* Timeline spine — desktop */}
          <div
            className="hidden md:block absolute left-[1.5rem] top-0 bottom-0 w-[2px]"
            style={{ background: "linear-gradient(to bottom, var(--accent), var(--surface-border) 40%, transparent)" }}
          />

          {experience.map((item, i) => {
            const isCurrent = item.current;
            const startYear = parsePeriodYear(item.period);

            return (
              <motion.div
                key={i}
                className="relative md:pl-16 mb-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Timeline dot — desktop */}
                <div
                  className={`hidden md:block absolute left-[1rem] top-6 timeline-dot ${isCurrent ? "timeline-dot-active pulse-ring" : ""}`}
                />

                {/* Year label — desktop */}
                <span
                  className="hidden md:block absolute left-0 top-6 text-[10px] -translate-x-full pr-4"
                  style={{
                    color: isCurrent ? "var(--accent)" : "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {startYear}
                </span>

                {/* Entry card — always expanded */}
                <div
                  className="rounded-xl px-5 py-5 transition-all duration-300"
                  style={{
                    background: "var(--surface)",
                    border: `1px solid ${isCurrent ? "var(--surface-border-gold)" : "var(--surface-border)"}`,
                    borderLeft: isCurrent ? "3px solid var(--accent)" : undefined,
                  }}
                >
                  {/* Role + badges */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3
                      className="text-base md:text-lg font-bold leading-snug"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                    >
                      {item.role}
                    </h3>
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

                  {/* Company */}
                  <p className="mt-1 text-sm">
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{item.company}</span>
                    <span style={{ color: "var(--text-muted)", margin: "0 0.4rem" }}>·</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{item.type}</span>
                  </p>

                  {/* Period + Location */}
                  <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    <span>{item.period}</span>
                    <span>·</span>
                    <span>{item.location}</span>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-4 flex flex-col gap-2">
                    {item.highlights.slice(0, 4).map((h, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <span
                          className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)", opacity: 0.6 }}
                        />
                        <span style={{ color: "var(--text-secondary)" }}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag, k) => (
                      <span key={k} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
