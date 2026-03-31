"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-4 md:px-6"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="relative mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <span
            className="deco-num absolute -top-6 right-0 select-none pointer-events-none"
            aria-hidden="true"
          >
            01
          </span>

          <span className="section-label">About</span>

          <h2
            className="mt-3 text-3xl md:text-4xl font-bold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            {about.heading}
          </h2>
        </motion.div>

        {/* Story paragraph */}
        <motion.p
          className="text-base md:text-lg leading-relaxed mb-14 max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          {about.text}
        </motion.p>

        {/* My Approach — 4 cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {about.approach.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="card p-5 flex flex-col gap-3"
            >
              <span
                className="text-xs font-mono"
                style={{ color: "var(--accent)", letterSpacing: "0.1em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-sm font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row — Languages + Budgets */}
        <motion.div
          className="flex flex-wrap gap-6 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Languages:
            </span>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {about.languages}
            </span>
          </div>
          <div
            style={{ width: 1, height: 16, background: "var(--surface-border)" }}
            className="hidden sm:block"
          />
          <div className="flex items-center gap-2">
            <span
              className="text-xs"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Budgets:
            </span>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {about.budgets}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
