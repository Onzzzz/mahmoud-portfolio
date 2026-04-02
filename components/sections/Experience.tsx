"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

function parsePeriodYear(period: string): string {
  const match = period.match(/\d{4}/);
  return match ? match[0] : period;
}

export function Experience() {
  // Group consecutive roles at the same company
  type ExpItem = (typeof experience)[number];
  const grouped: { company: string; items: ExpItem[] }[] = [];
  experience.forEach((item) => {
    const last = grouped[grouped.length - 1];
    if (last && last.company === item.company) {
      last.items.push(item);
    } else {
      grouped.push({ company: item.company, items: [item] });
    }
  });

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

        {/* Timeline entries */}
        <div className="flex flex-col gap-4">
          {grouped.map((group, idx) => {
            const firstItem = group.items[0];
            const isCurrent = firstItem.current;
            const startYear = parsePeriodYear(firstItem.period);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* 3-column grid: Year | Dot+Line | Card */}
                <div className="hidden md:grid" style={{ gridTemplateColumns: "60px 30px 1fr" }}>
                  {/* Column 1: Year */}
                  <div className="flex justify-end items-start pt-5 pr-2">
                    <span
                      className="text-[11px]"
                      style={{
                        color: isCurrent ? "var(--accent)" : "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {startYear}
                    </span>
                  </div>

                  {/* Column 2: Dot + Line */}
                  <div className="flex flex-col items-center">
                    <div style={{ height: 20 }} />
                    <div
                      className={`shrink-0 timeline-dot ${isCurrent ? "timeline-dot-active pulse-ring" : ""}`}
                    />
                    <div
                      className="w-[2px] flex-1"
                      style={{
                        background: isCurrent
                          ? "linear-gradient(to bottom, var(--accent), var(--surface-border))"
                          : "var(--surface-border)",
                      }}
                    />
                  </div>

                  {/* Column 3: Card */}
                  <div
                    className="rounded-xl px-5 py-5 transition-all duration-300"
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${isCurrent ? "var(--surface-border-gold)" : "var(--surface-border)"}`,
                      borderLeft: isCurrent ? "3px solid var(--accent)" : undefined,
                    }}
                  >
                    {renderCardContent(group)}
                  </div>
                </div>

                {/* Mobile: no grid, just card */}
                <div className="md:hidden">
                  <div
                    className="rounded-xl px-4 py-4"
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${isCurrent ? "var(--surface-border-gold)" : "var(--surface-border)"}`,
                      borderLeft: isCurrent ? "3px solid var(--accent)" : undefined,
                    }}
                  >
                    {renderCardContent(group)}
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

function renderCardContent(group: { company: string; items: readonly { role: string; company: string; type: string; logo: string; period: string; location: string; current: boolean; highlights: readonly string[]; tags: readonly string[] }[] }) {
  return group.items.map((item, ri) => (
    <div
      key={ri}
      className={ri > 0 ? "mt-6 pt-6" : ""}
      style={ri > 0 ? { borderTop: "1px solid var(--surface-border)" } : {}}
    >
      {/* Role + badges */}
      <div className="flex items-center gap-3 flex-wrap">
        <h3
          className="text-base md:text-lg font-bold leading-snug"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
        >
          {item.role}
        </h3>
        {item.current && (
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

      {/* Company — only show on first role */}
      {ri === 0 && (
        <div className="mt-1.5 flex items-center gap-2.5">
          {item.logo && (
            <img
              src={item.logo}
              alt={item.company}
              className="shrink-0"
              style={{
                width: 28,
                height: 28,
                objectFit: "cover",
                borderRadius: "50%",
                border: "1px solid var(--surface-border)",
              }}
            />
          )}
          <p className="text-sm">
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>{item.company}</span>
            <span style={{ color: "var(--text-muted)", margin: "0 0.4rem" }}>·</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{item.type}</span>
          </p>
        </div>
      )}

      {/* Period + Location */}
      <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        <span>{item.period}</span>
        <span>·</span>
        <span>{item.location}</span>
      </div>

      {/* Highlights */}
      <ul className="mt-4 flex flex-col gap-2">
        {item.highlights.map((h, j) => (
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
  ));
}
