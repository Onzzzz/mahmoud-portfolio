"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

function LinkedinIcon({ size = 14 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Testimonials() {
  // Duplicate grid items for infinite marquee
  const marqueeItems = [...testimonials.grid, ...testimonials.grid];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 70% 45% at 50% -5%, var(--accent-muted) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="relative mb-16 md:mb-24"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <span className="deco-num pointer-events-none absolute -top-8 right-0 select-none" aria-hidden="true">06</span>
          <span className="section-label mb-4 block">Testimonials</span>
          <h2
            className="mb-5 font-bold leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", color: "var(--text-primary)" }}
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
            <span className="text-xs font-medium tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
              {testimonials.linkedinCount} recommendations on LinkedIn
            </span>
          </a>
        </motion.div>

        {/* Featured cards */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {testimonials.featured.map((t) => (
            <motion.article key={t.name} variants={fadeUp} className="h-full">
              <div className="card relative flex h-full flex-col p-8" style={{ borderLeft: "3px solid var(--accent)" }}>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-6 top-4 select-none leading-none"
                  style={{ fontSize: "2.5rem", color: "var(--accent)", opacity: 0.3, fontFamily: "Georgia, serif" }}
                >
                  ❝
                </span>
                <blockquote className="relative mt-8 flex-1">
                  <p className="text-base italic leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
                    {t.quote}
                  </p>
                </blockquote>
                <div className="my-6" aria-hidden="true" style={{ height: "1px", background: "linear-gradient(90deg, var(--accent) 0%, transparent 100%)", opacity: 0.3 }} />
                <footer className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                    <p className="mt-0.5 text-sm" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                  <span className="tag shrink-0">{t.relationship}</span>
                </footer>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Marquee — auto-scrolling testimonials */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-alt), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg-alt), transparent)" }} />

          <motion.div
            className="flex gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {marqueeItems.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="card flex-shrink-0 flex flex-col p-6"
                style={{ width: "320px" }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none leading-none mb-3"
                  style={{ fontSize: "1.5rem", color: "var(--accent)", opacity: 0.25, fontFamily: "Georgia, serif" }}
                >
                  ❝
                </span>
                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t.quote}
                  </p>
                </blockquote>
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--surface-border)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
