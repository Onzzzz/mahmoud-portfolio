"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { BookOpen, Award, GraduationCap } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

function getIcon(index: number, isInProgress: boolean) {
  if (index === 2) return <GraduationCap size={20} style={{ color: "var(--accent)" }} />;
  if (isInProgress) return <BookOpen size={20} style={{ color: "var(--accent)" }} />;
  return <Award size={20} style={{ color: "var(--accent)" }} />;
}

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 md:py-32 px-4 md:px-6"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="relative mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Education</span>

          <h2
            className="mt-3"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Certifications &{" "}
            <span style={{ color: "var(--accent)" }}>Education</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          {certifications.map((cert, i) => {
            const isInProgress = cert.status === "in-progress";

            return (
              <motion.div
                key={cert.name}
                variants={itemVariants}
                className="relative flex gap-5 md:gap-7 pb-8 last:pb-0"
              >
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0 mt-1"
                    style={{
                      background: isInProgress ? "var(--accent)" : "#22c55e",
                      boxShadow: isInProgress
                        ? "0 0 0 4px var(--accent-muted)"
                        : "0 0 0 4px rgba(34, 197, 94, 0.15)",
                    }}
                  />
                  {i < certifications.length - 1 && (
                    <div
                      className="w-px flex-1 mt-2"
                      style={{ background: "var(--surface-border)" }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className="card flex-1 p-6 mb-4">
                  {/* Top row: icon + name + status badge */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg shrink-0"
                        style={{ background: "var(--accent-muted)" }}
                      >
                        {getIcon(i, isInProgress)}
                      </div>
                      <div>
                        <h3
                          className="text-base font-bold leading-snug"
                          style={{
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          {cert.name}
                        </h3>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {cert.institution}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: isInProgress
                          ? "var(--accent-muted)"
                          : "rgba(34, 197, 94, 0.1)",
                        color: isInProgress ? "var(--accent)" : "#22c55e",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: isInProgress ? "var(--accent)" : "#22c55e",
                        }}
                      />
                      {isInProgress ? "IN PROGRESS" : "COMPLETED"}
                    </span>
                  </div>

                  {/* Year */}
                  <p
                    className="text-sm font-medium mt-3 mb-2"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {cert.year}
                  </p>

                  {/* Progress bar (only for in-progress) */}
                  {isInProgress && cert.progress !== null && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-xs"
                          style={{
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Progress
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {cert.progress}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 w-full rounded-full overflow-hidden"
                        style={{ background: "var(--surface-border)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "var(--gradient-accent)" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${cert.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] as const }}
                        />
                      </div>
                      <p
                        className="text-xs mt-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {cert.completedModules} of {cert.totalModules} modules completed
                      </p>
                    </div>
                  )}

                  {/* Detail */}
                  {cert.detail && (
                    <p
                      className="text-xs mt-3"
                      style={{
                        color: "var(--text-secondary)",
                        fontStyle: "italic",
                      }}
                    >
                      {cert.detail}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
