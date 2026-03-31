"use client";

import { motion } from "framer-motion";
import { skillsRadar, toolGroups } from "@/lib/data";

const sortedSkills = [...skillsRadar].sort((a, b) => b.level - a.level);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const barContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const barRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const toolGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const toolCardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Skills() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden" id="skills">
      {/* Dot grid decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, var(--text-muted) 0.5px, transparent 0.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.03,
        }}
      />
      <div className="max-w-6xl mx-auto relative">

        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Decorative number — positioned absolutely behind the heading */}
          <span
            className="deco-num absolute -top-6 -left-2 md:-left-4 select-none pointer-events-none"
            aria-hidden="true"
          >
            03
          </span>

          <motion.span className="section-label block mb-4" variants={fadeUpVariants}>
            Skills &amp; Tools
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold leading-tight relative z-10"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
            variants={fadeUpVariants}
          >
            What I Work With
          </motion.h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT — Skill Bars */}
          <motion.div
            className="space-y-6"
            variants={barContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {sortedSkills.map((skill) => (
              <motion.div key={skill.name} variants={barRowVariants}>
                {/* Label row */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="text-sm font-mono tabular-nums"
                    style={{ color: "var(--accent)" }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Bar track */}
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{
                    height: "8px",
                    background: "var(--surface-2)",
                  }}
                >
                  <motion.div
                    className="rounded-full relative overflow-hidden"
                    style={{
                      height: "8px",
                      background: "linear-gradient(90deg, var(--accent), var(--accent-hover))",
                    }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.25,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT — Tool Groups */}
          <motion.div
            className="flex flex-col gap-5"
            variants={toolGroupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {toolGroups.map((group) => (
              <motion.div
                key={group.category}
                className="card p-6"
                variants={toolCardVariants}
              >
                <span className="section-label block mb-3">
                  {group.category}
                </span>

                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span key={tool} className="tag">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
