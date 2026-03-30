"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type ProjectCategory } from "@/lib/data";

type FilterTab = "All" | ProjectCategory;

const TABS: FilterTab[] = [
  "All",
  "Procurement & Tenders",
  "Events & Production",
  "Operations & Systems",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.18 },
  },
};

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  const featured = filtered.filter((p) => p.featured);
  const secondary = filtered.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      style={{
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "-0.5rem",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        <span className="deco-num">02</span>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2.75rem" }}
        >
          <span
            className="section-label"
            style={{ display: "block", marginBottom: "0.875rem" }}
          >
            Projects
          </span>
          <h2
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              margin: 0,
              fontFamily: "var(--font-heading)",
            }}
          >
            Key Achievements
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: isActive
                    ? "1.5px solid var(--accent)"
                    : "1.5px solid transparent",
                  padding: "0.25rem 0",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.02em",
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  fontFamily: "var(--font-heading)",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                  lineHeight: 1.5,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-secondary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-muted)";
                  }
                }}
              >
                {tab}
              </button>
            );
          })}
        </motion.div>

        {/* Animated Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Featured — large, side-by-side */}
            {featured.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {featured.map((project) => (
                  <motion.article
                    key={project.title}
                    variants={cardVariants}
                    className="card"
                    style={{
                      padding: "2rem",
                      borderTop: "3px solid var(--accent)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.125rem",
                    }}
                  >
                    {/* Company */}
                    <span className="section-label">{project.company}</span>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                        margin: 0,
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          style={{
                            display: "flex",
                            gap: "0.625rem",
                            fontSize: "0.875rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.55,
                          }}
                        >
                          <span
                            style={{
                              color: "var(--accent)",
                              flexShrink: 0,
                              fontWeight: 600,
                            }}
                          >
                            →
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "auto",
                        paddingTop: "0.5rem",
                      }}
                    >
                      {project.tools.map((tool) => (
                        <span key={tool} className="tag">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Secondary — smaller, 2-col */}
            {secondary.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
                  gap: "1rem",
                }}
              >
                {secondary.map((project) => (
                  <motion.article
                    key={project.title}
                    variants={cardVariants}
                    className="card-flat"
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.875rem",
                      transition:
                        "border-color 0.25s ease, background 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--surface-border-gold)";
                      el.style.background = "var(--surface-2)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--surface-border)";
                      el.style.background = "var(--surface)";
                    }}
                  >
                    {/* Company */}
                    <span className="section-label" style={{ color: "var(--text-muted)" }}>
                      {project.company}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                        margin: 0,
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "0.84rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.375rem",
                      }}
                    >
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            fontSize: "0.8125rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              color: "var(--accent)",
                              flexShrink: 0,
                              fontWeight: 600,
                            }}
                          >
                            →
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.375rem",
                        marginTop: "auto",
                        paddingTop: "0.25rem",
                      }}
                    >
                      {project.tools.map((tool) => (
                        <span key={tool} className="tag">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <motion.p
                variants={cardVariants}
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                No projects in this category yet.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
