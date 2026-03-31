"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { Award, BookOpen } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 md:py-32 px-4 md:px-6"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="relative mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="deco-num absolute -top-6 right-0 select-none pointer-events-none"
            aria-hidden="true"
          >
            04
          </span>

          <span className="section-label">Education & Certifications</span>

          <h2
            className="mt-3 text-3xl md:text-4xl font-bold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            Credentials
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {certifications.map((cert) => {
            const isInProgress = cert.status === "in-progress";
            return (
              <motion.div
                key={cert.name}
                variants={itemVariants}
                className="card p-6 flex flex-col gap-4"
              >
                {/* Icon + Status */}
                <div className="flex items-start justify-between">
                  <div
                    className="p-2.5 rounded-lg"
                    style={{
                      background: "var(--accent-muted)",
                    }}
                  >
                    {isInProgress ? (
                      <BookOpen size={20} style={{ color: "var(--accent)" }} />
                    ) : (
                      <Award size={20} style={{ color: "var(--accent)" }} />
                    )}
                  </div>
                  <span
                    className="tag"
                    style={
                      isInProgress
                        ? {
                            background: "var(--accent-muted)",
                            color: "var(--accent)",
                            fontWeight: 600,
                          }
                        : {}
                    }
                  >
                    {isInProgress ? "In Progress" : cert.year}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="text-sm font-semibold leading-snug"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {cert.name}
                </h3>

                {/* Institution */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cert.institution}
                </p>

                {/* Detail (if exists) */}
                {"detail" in cert && cert.detail && (
                  <p
                    className="text-xs mt-auto pt-2"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                      borderTop: "1px solid var(--surface-border)",
                    }}
                  >
                    {cert.detail}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
