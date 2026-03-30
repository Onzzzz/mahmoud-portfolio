"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

function LinkedinIcon({ size = 14 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Atmospheric radial glow from top */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(200, 151, 58, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <motion.div
          className="relative mb-16 md:mb-24"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Decorative oversized number */}
          <span
            className="deco-num pointer-events-none absolute -top-8 right-0 select-none"
            aria-hidden="true"
          >
            05
          </span>

          <span className="section-label mb-4 block">Testimonials</span>

          <h2
            className="mb-5 font-bold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
              color: "var(--text-primary)",
            }}
          >
            What People Say
          </h2>

          <a
            href="https://www.linkedin.com/in/mahmoudf-abdallah"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
            aria-label={`View ${testimonials.linkedinCount} recommendations on LinkedIn`}
          >
            <LinkedinIcon size={14} />
            <span
              className="text-xs font-medium tracking-wide"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {testimonials.linkedinCount} recommendations on LinkedIn
            </span>
          </a>
        </motion.div>

        {/* ── Featured cards — generous, side-by-side on desktop ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {testimonials.featured.map((t) => (
            <motion.article key={t.name} variants={itemVariants} className="h-full">
              <div className="card relative flex h-full flex-col p-8">
                {/* HUGE opening quote mark — decorative, gold, top-left */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-6 top-4 select-none leading-none"
                  style={{
                    fontSize: "3rem",
                    color: "var(--accent)",
                    opacity: 0.4,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  ❝
                </span>

                {/* Quote text */}
                <blockquote className="relative mt-8 flex-1">
                  <p
                    className="text-base italic leading-relaxed md:text-lg"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.quote}
                  </p>
                </blockquote>

                {/* Gold line separator */}
                <div
                  className="my-6"
                  aria-hidden="true"
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
                    opacity: 0.45,
                  }}
                />

                {/* Attribution row */}
                <footer className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="font-semibold leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="mt-0.5 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                  <span className="tag shrink-0">{t.relationship}</span>
                </footer>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ── Grid cards — 2×2 ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {testimonials.grid.map((t) => (
            <motion.article key={t.name} variants={itemVariants} className="h-full">
              <div className="card relative flex h-full flex-col p-6">
                {/* Small opening quote mark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-5 top-4 select-none leading-none"
                  style={{
                    fontSize: "1.75rem",
                    color: "var(--accent)",
                    opacity: 0.3,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  ❝
                </span>

                {/* Quote text */}
                <blockquote className="relative mt-6 flex-1">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.quote}
                  </p>
                </blockquote>

                {/* Gold line separator */}
                <div
                  className="my-4"
                  aria-hidden="true"
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
                    opacity: 0.35,
                  }}
                />

                {/* Attribution */}
                <footer>
                  <p
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.role}
                  </p>
                </footer>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
