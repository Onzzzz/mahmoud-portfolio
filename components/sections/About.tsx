"use client";

import { motion } from "framer-motion";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.6, delay },
});

export function About() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6" id="about">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs font-medium tracking-[0.2em] uppercase mb-14 md:mb-20"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.p>

        <div className="relative pl-6 md:pl-10">
          <motion.div
            className="absolute left-0 top-0 w-[2px] h-full rounded-full"
            style={{ background: "var(--accent)" }}
            initial={{ scaleY: 0, originY: "0%" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="space-y-10 md:space-y-14">
            <motion.p
              className="text-xl md:text-3xl lg:text-[2.1rem] font-medium leading-[1.4]"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              {...fade(0.1)}
            >
              From managing military supply chains in Egypt to running procurement for{" "}
              <span className="text-accent">global events like the FIFA World Cup and Elie Saab shows</span>{" "}
              — I&apos;ve spent over seven years sourcing, negotiating, and building operations across industries that don&apos;t wait.
            </motion.p>

            <motion.p
              className="text-base md:text-xl leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              {...fade(0.25)}
            >
              Heavy equipment. Events &amp; technology. FMCG. Oil &amp; gas. E-commerce. Retail.
            </motion.p>

            <motion.p
              className="text-base md:text-xl leading-relaxed max-w-3xl"
              style={{ color: "var(--text-secondary)" }}
              {...fade(0.35)}
            >
              At every company, the pattern is the same — I walk into a function that doesn&apos;t exist yet and build it.
              Vendor databases, compliance frameworks, bidding systems, ERP implementations.{" "}
              <span style={{ color: "var(--text-primary)" }}>
                The infrastructure that turns reactive buying into strategic procurement.
              </span>
            </motion.p>
          </div>
        </div>

        <motion.div
          className="mt-14 md:mt-20 pt-5 border-t flex flex-wrap gap-x-6 gap-y-2"
          style={{ borderColor: "var(--surface-border)" }}
          {...fade(0.45)}
        >
          {["B.Sc. Accounting", "CIPS Level 4 — In Progress", "Arabic & English", "Dubai, UAE"].map((fact, i) => (
            <span key={i} className="text-[11px] md:text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {fact}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
