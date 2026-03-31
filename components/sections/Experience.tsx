"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { slideInRight, staggerContainer } from "@/lib/animations";

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
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.02em",
              }}
            >
              Where I&apos;ve Built Things
            </h2>
          </div>
          <span className="deco-num hidden md:block select-none" aria-hidden="true">
            02
          </span>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Timeline spine — desktop only */}
          <div
            className="hidden md:block absolute left-[3.25rem] top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, var(--accent), var(--surface-border) 30%, var(--surface-border) 80%, transparent)",
            }}
          />

          {experience.map((item, i) => {
            const isCurrent = item.current;
            const startYear = parsePeriodYear(item.period);

            return (
              <motion.div
                key={i}
                variants={slideInRight}
                className="relative grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-4 md:gap-8 mb-2"
              >
                {/* Left column — year + dot */}
                <div className="hidden md:flex flex-col items-center pt-8">
                  {/* Year */}
                  <span
                    className="text-xs font-medium mb-3"
                    style={{
                      color: isCurrent ? "var(--accent)" : "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {startYear}
                  </span>

                  {/* Timeline dot */}
                  <div className={`timeline-dot ${isCurrent ? "timeline-dot-active" : ""}`} />

                  {isCurrent && (
                    <span
                      className="text-[9px] mt-2 font-medium"
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      now
                    </span>
                  )}
                </div>

                {/* Right column — card */}
                <div
                  className="card p-6 md:p-7 transition-all duration-300"
                  style={{
                    borderLeft: isCurrent ? "3px solid var(--accent)" : undefined,
                  }}
                >
                  {/* Mobile year badge */}
                  <div className="flex md:hidden items-center gap-2 mb-3">
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: isCurrent ? "var(--accent)" : "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {item.period}
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

                  {/* Role + Current pill (desktop) */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3
                      className="text-lg font-bold leading-snug"
                      style={{
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {item.role}
                    </h3>
                    {isCurrent && (
                      <span
                        className="hidden md:inline-block text-[9px] font-semibold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
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

                  {/* Company + Type */}
                  <p className="mt-1.5 text-sm">
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                      {item.company}
                    </span>
                    <span style={{ color: "var(--text-muted)", margin: "0 0.4rem" }}>·</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      {item.type}
                    </span>
                  </p>

                  {/* Location */}
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
                      <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <span
                          className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)", opacity: 0.6 }}
                        />
                        <span style={{ color: "var(--text-secondary)" }}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag, k) => (
                      <span key={k} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
