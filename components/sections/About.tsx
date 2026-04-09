"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { about, certifications } from "@/lib/data";
import { useTheme } from "@/lib/theme-context";

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "6", label: "Industries" },
  { value: "3", label: "Countries" },
  { value: "10M", label: "AED Budgets" },
];

export function About() {
  const { themeName } = useTheme();
  const photoSrc = themeName === "onyx" ? "/images/mahmoud-dark-v3.jpg" : "/images/mahmoud-light-v2.jpg";

  return (
    <section
      id="about"
      className="relative pt-8 md:pt-10 pb-8 px-4 md:px-6"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* 12-column grid: text left (7), photo right (5) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
        >
          {/* LEFT — Text content (col-span-7) */}
          <div className="lg:col-span-7">
            {/* Label */}
            <motion.span
              className="text-[10px] font-medium uppercase block mb-2"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.25em",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              Procurement Architect
            </motion.span>

            {/* Heading — serif italic, "Picture." in gold */}
            <motion.h2
              style={{
                fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
                fontWeight: 400,
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Full{" "}
              <span style={{ color: "var(--accent)" }}>Picture.</span>
            </motion.h2>

            {/* 3 text paragraphs with numbered labels */}
            <div className="mt-3 flex flex-col gap-3">
              {about.sections.map((section, i) => (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span
                    className="text-base md:text-lg font-semibold block mb-2"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      background: "linear-gradient(135deg, var(--accent), #E8D5A3)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {section.label}
                  </span>
                  <p
                    className="text-sm leading-normal"
                    style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}
                  >
                    {section.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Education & Certifications */}
            <motion.div
              className="mt-5 flex flex-col gap-3"
              style={{ borderTop: "1px solid var(--surface-border)", paddingTop: "1.25rem" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span
                className="text-[9px] font-medium uppercase block mb-2"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.2em",
                }}
              >
                Education & Certifications
              </span>
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-center gap-3 flex-wrap">
                  <span
                    className="w-1.5 h-1.5 shrink-0"
                    style={{
                      background: cert.status === "in-progress" ? "var(--accent)" : "#22c55e",
                      borderRadius: 0,
                    }}
                  />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {cert.name}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {cert.year}{cert.status === "in-progress" ? " — In Progress" : ""}
                  </span>
                  {"verifyUrl" in cert && cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase px-2.5 py-1 transition-all duration-200"
                      style={{
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.1em",
                        color: "var(--bg)",
                        background: "var(--accent)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--accent-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--accent)";
                      }}
                    >
                      ↗ Verify
                    </a>
                  )}
                  {"badgeUrl" in cert && cert.badgeUrl && (
                    <a
                      href={"verifyUrl" in cert ? (cert.verifyUrl as string) : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group shrink-0"
                      style={{ textDecoration: "none" }}
                      title="CIPS Professional Ethics Badge"
                    >
                      <Image
                        src={(cert as { badgeUrl: string }).badgeUrl}
                        alt={cert.name}
                        width={32}
                        height={32}
                        style={{ borderRadius: "50%", transition: "transform 0.2s" }}
                        className="group-hover:scale-110"
                      />
                    </a>
                  )}
                </div>
              ))}

            </motion.div>
          </div>

          {/* RIGHT — Photo + education overlay (col-span-5) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Photo — grayscale by default, color on hover, sharp corners */}
              <div
                className="relative w-full overflow-hidden group"
                style={{
                  aspectRatio: "4 / 5",
                  borderRadius: 0,
                }}
              >
                <Image
                  src={photoSrc}
                  alt="Mahmoud Abdallah"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                  style={{ objectPosition: "50% 20%" }}
                  quality={95}
                />
                {/* Bottom gradient fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, transparent 70%, var(--bg-alt) 100%)",
                  }}
                />
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
