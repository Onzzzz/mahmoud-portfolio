"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/data";

export function Industries() {
  // Duplicate for seamless CSS loop
  const marqueeItems = [...industries, ...industries];

  return (
    <section
      className="relative pt-6 pb-12 md:pt-8 md:pb-16 overflow-hidden"
      style={{ background: "var(--bg)" }}
      aria-label="Industries worked across"
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
      />

      {/* Section label */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">Industries & Sectors</span>
      </motion.div>

      <style>{`
        @keyframes industries-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .industries-marquee {
          animation: industries-scroll 28s linear infinite;
        }
      `}</style>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="industries-marquee flex items-center gap-0 whitespace-nowrap w-max">
          {marqueeItems.map((item, i) => (
            <div key={`${item.name}-${i}`} className="flex items-center shrink-0">
              {/* Divider dot */}
              {i > 0 && (
                <span
                  className="mx-5 md:mx-7 shrink-0"
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    opacity: 0.4,
                    display: "inline-block",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Industry + Company */}
              <div className="flex items-baseline gap-2 shrink-0">
                <span
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
