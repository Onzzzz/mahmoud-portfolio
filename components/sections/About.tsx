"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";
import { MapPin, Briefcase, Globe, Building2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const metrics = [
  { icon: Briefcase, value: "7+", label: "Years", sublabel: "Experience" },
  { icon: Building2, value: "6", label: "Industries", sublabel: "Crossed" },
  { icon: Globe, value: "3", label: "Countries", sublabel: "UAE · KSA · Egypt" },
  { icon: MapPin, value: "10M", label: "AED", sublabel: "Budgets Managed" },
];

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
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <span className="section-label">About</span>
          <h2
            className="mt-3"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {about.heading}
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left — Sections (3 cols) */}
          <div className="lg:col-span-3">
            {about.sections.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="pb-6 mb-6"
                style={
                  i < about.sections.length - 1
                    ? { borderBottom: "1px solid var(--surface-border)" }
                    : {}
                }
              >
                <span
                  className="text-xs font-semibold uppercase block mb-3"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {section.label}
                </span>
                <p
                  className={i <= 1 ? "text-base leading-relaxed" : "text-sm leading-relaxed"}
                  style={{ color: "var(--text-secondary)" }}
                >
                  {section.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right — Metrics grid (2 cols) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 sticky top-24">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl p-5 flex flex-col items-center text-center"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border)",
                  }}
                >
                  <m.icon
                    size={20}
                    style={{ color: "var(--accent)", marginBottom: "0.75rem" }}
                  />
                  <span
                    className="text-2xl font-extrabold"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-heading)",
                      lineHeight: 1,
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="text-xs font-semibold mt-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {m.label}
                  </span>
                  <span
                    className="text-[10px] mt-0.5"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {m.sublabel}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
