"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";

const rowVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 px-4 md:px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          className="relative mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative oversized number */}
          <span
            className="deco-num absolute -top-4 right-0 select-none pointer-events-none"
            aria-hidden="true"
          >
            04
          </span>

          <span className="section-label">Services</span>

          <h2
            className="mt-3 text-3xl md:text-4xl font-bold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            How I Can Help
          </h2>
        </motion.div>

        {/* Numbered list */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group"
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Thin divider above each row */}
              <div className="divider" />

              {/* Row */}
              <div
                className="flex items-start gap-6 md:gap-10 px-2 md:px-4 py-7 md:py-8 -mx-2 md:-mx-4 rounded-lg transition-all duration-300"
                style={{
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "var(--surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "transparent";
                }}
              >
                {/* Left: service number */}
                <span
                  className="text-2xl font-mono shrink-0 pt-0.5 w-8 text-right"
                  style={{ color: "var(--text-muted)" }}
                >
                  {service.number}
                </span>

                {/* Center: title + description */}
                <div className="flex-1 min-w-0">
                  {/* Mobile: number is inline above, desktop: inline */}
                  <p
                    className="text-lg font-semibold mb-2 transition-colors duration-300"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                    /* Shift title color to accent on group hover via inline style + JS */
                    ref={(el) => {
                      if (!el) return;
                      const row = el.closest(".group") as HTMLElement | null;
                      if (!row) return;
                      const enter = () =>
                        (el.style.color = "var(--accent)");
                      const leave = () =>
                        (el.style.color = "var(--text-primary)");
                      row.addEventListener("mouseenter", enter);
                      row.addEventListener("mouseleave", leave);
                    }}
                  >
                    {service.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed max-w-lg"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Right: arrow — desktop only */}
                <span
                  className="hidden md:block text-lg shrink-0 self-center transition-transform duration-300 group-hover:translate-x-2"
                  style={{ color: "var(--accent)" }}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </motion.div>
          ))}

          {/* Final bottom divider */}
          <div className="divider" />
        </div>
      </div>
    </section>
  );
}
