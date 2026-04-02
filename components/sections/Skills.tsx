"use client";

import { motion } from "framer-motion";
import { dailyStack } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function Skills() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-6 relative" id="skills">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label block mb-3">Daily Stack</span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Tools I Use{" "}
            <span style={{ color: "var(--accent)" }}>Daily</span>
          </h2>
        </motion.div>

        {/* 6-card grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {dailyStack.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className="card p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-lg">{group.icon}</span>
                <h3
                  className="text-sm font-bold"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Tools with progress bars */}
              <div className="space-y-4">
                {group.tools.map((tool, ti) => (
                  <div key={tool.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {tool.name}
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {tool.level}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full rounded-full overflow-hidden"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-accent)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tool.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: ti * 0.15,
                          ease: [0.4, 0, 0.2, 1] as const,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
