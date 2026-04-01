"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsRadar, toolGroups } from "@/lib/data";

const sortedSkills = [...skillsRadar].sort((a, b) => b.level - a.level);

type SkillTab = "core" | "tools";

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>("core");

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 relative" id="skills">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label block mb-3">Skills & Tools</span>
          <h2
            className="text-3xl md:text-5xl font-extrabold leading-tight"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            What I Work With
          </h2>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="flex gap-1 mb-10 p-1 rounded-xl w-fit"
          style={{ background: "var(--surface)", border: "1px solid var(--surface-border)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {([
            { id: "core" as const, label: "Core Skills" },
            { id: "tools" as const, label: "Platforms & Tools" },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
              style={{
                color: activeTab === tab.id ? "var(--bg)" : "var(--text-secondary)",
                fontFamily: "var(--font-heading)",
                background: activeTab === tab.id ? "var(--accent)" : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "core" ? (
            <motion.div
              key="core"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {sortedSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-xl flex items-center gap-5"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border)",
                  }}
                >
                  {/* Circular progress */}
                  <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
                    <svg width="56" height="56" viewBox="0 0 56 56">
                      {/* Background circle */}
                      <circle
                        cx="28" cy="28" r="24"
                        fill="none"
                        stroke="var(--surface-2)"
                        strokeWidth="4"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="28" cy="28" r="24"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                        whileInView={{
                          strokeDashoffset: 2 * Math.PI * 24 * (1 - skill.level / 100),
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "center",
                        }}
                      />
                    </svg>
                    {/* Percentage text */}
                    <span
                      className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                      style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill name */}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {skill.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {skill.level >= 93 ? "Expert" : skill.level >= 88 ? "Advanced" : "Proficient"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="tools"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {toolGroups.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 }}
                >
                  <p
                    className="text-xs font-semibold mb-3 tracking-widest uppercase"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool, ti) => (
                      <motion.span
                        key={tool}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.1 + ti * 0.04 }}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--surface-border)",
                          color: "var(--text-primary)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                          (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                        }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
