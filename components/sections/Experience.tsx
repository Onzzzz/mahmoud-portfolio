"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experience } from "@/lib/data";

const mainEntries = experience.filter((e) => !("earlier" in e && e.earlier));
const earlierEntries = experience.filter((e) => "earlier" in e && e.earlier);

export function Experience() {
  return (
    <section
      className="relative px-4 md:px-6 pt-16 pb-8 md:pt-20 md:pb-10"
      id="experience"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header — large text-stroke heading + italic subtitle */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 400,
              fontFamily: "var(--font-serif)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Where I&apos;ve Built{" "}
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Things.</span>
          </h2>
        </motion.div>

        {/* Detailed entries — 12-column grid per entry */}
        <div className="flex flex-col gap-0">
          {mainEntries.map((item, idx) => {
            const isCurrent = item.current;
            const hasPromotion = "promotion" in item && !!item.promotion;

            return (
              <motion.div
                key={idx}
                className="group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  opacity: isCurrent ? 1 : undefined,
                }}
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-0"
                  style={!isCurrent ? { opacity: 0.6 } : undefined}
                  onMouseEnter={(e) => {
                    if (!isCurrent) e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) e.currentTarget.style.opacity = "0.6";
                  }}
                >
                  {/* Left — date column (col-span-3) */}
                  <div className="md:col-span-3 flex flex-col justify-start pt-6 pb-2 md:pb-0 md:pr-6">
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: isCurrent ? "var(--accent)" : "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.period}
                    </span>
                    <span
                      className="text-[10px] mt-1"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {item.location}
                    </span>
                  </div>

                  {/* Right — content column (col-span-9) with border-left and dot */}
                  <div
                    className="md:col-span-9 relative py-6"
                    style={{
                      borderLeft: "1px solid var(--surface-border)",
                      paddingLeft: "1.5rem",
                    }}
                  >
                    {/* Dot on the border */}
                    <div
                      className="absolute hidden md:block"
                      style={{
                        left: "-5px",
                        top: "1.75rem",
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: isCurrent ? "var(--accent)" : "transparent",
                        border: isCurrent ? "none" : "2px solid var(--text-muted)",
                        boxShadow: isCurrent ? "0 0 0 3px var(--accent-muted)" : "none",
                      }}
                    />

                    {/* Role + company */}
                    <div className="flex items-start gap-3 mb-1">
                      {item.logo && (
                        <div
                          className="shrink-0 mt-0.5"
                          style={{
                            width: "36px",
                            height: "36px",
                            minWidth: "36px",
                            minHeight: "36px",
                            borderRadius: "50%",
                            border: "1px solid var(--surface-border)",
                            backgroundColor: "#f5f4f0",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={item.logo}
                            alt={item.company}
                            width={36}
                            height={36}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                          />
                        </div>
                      )}
                      <div>
                        <h3
                          className="text-base md:text-lg font-bold leading-snug"
                          style={{
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          {item.role}
                        </h3>
                        <p className="text-sm mt-0.5">
                          <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                            {item.company}
                          </span>
                          <span style={{ color: "var(--text-muted)", margin: "0 0.4rem" }}>
                            ·
                          </span>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                            {item.type}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Promoted badge */}
                    {hasPromotion && (
                      <span
                        className="inline-block mt-2 text-[9px] font-bold uppercase"
                        style={{
                          color: "var(--accent)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        ↑ {(item as { promotion: string }).promotion}
                      </span>
                    )}

                    {/* Description */}
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.description}
                    </p>

                    {/* Tags — rectangular pills, NO rounded corners */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag, k) => (
                        <span
                          key={k}
                          className="text-[10px] font-medium px-2.5 py-1 transition-colors duration-200"
                          style={{
                            border: "1px solid var(--surface-border)",
                            borderRadius: 0,
                            color: "var(--text-secondary)",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.03em",
                            background: "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.color = "var(--accent)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--surface-border)";
                            e.currentTarget.style.color = "var(--text-secondary)";
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider between entries */}
                {idx < mainEntries.length - 1 && (
                  <div
                    className="w-full"
                    style={{
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, var(--surface-border), transparent)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Earlier Experience */}
        {earlierEntries.length > 0 && (
          <div className="mt-16">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-8">
              <div style={{ flex: 1, height: "1px", background: "var(--surface-border)" }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Earlier Experience
              </span>
              <div style={{ flex: 1, height: "1px", background: "var(--surface-border)" }} />
            </div>

            {/* Entries — same 12-column grid structure as main entries */}
            <div className="flex flex-col gap-0">
              {earlierEntries.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-12 gap-0"
                    style={{ opacity: 0.6 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.6";
                    }}
                  >
                    {/* Left — date column (col-span-3) */}
                    <div className="md:col-span-3 flex flex-col justify-start pt-6 pb-2 md:pb-0 md:pr-6">
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {item.period}
                      </span>
                      <span
                        className="text-[10px] mt-1"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {item.location}
                      </span>
                    </div>

                    {/* Right — content column (col-span-9) with border-left and dot */}
                    <div
                      className="md:col-span-9 relative py-6"
                      style={{
                        borderLeft: "1px solid var(--surface-border)",
                        paddingLeft: "1.5rem",
                      }}
                    >
                      {/* Dot on the border */}
                      <div
                        className="absolute hidden md:block"
                        style={{
                          left: "-5px",
                          top: "1.75rem",
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          background: "transparent",
                          border: "2px solid var(--text-muted)",
                          boxShadow: "none",
                        }}
                      />

                      {/* Role + company */}
                      <div className="flex items-start gap-3 mb-1">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap mb-0.5">
                            <h3
                              className="text-base md:text-lg font-bold leading-snug"
                              style={{
                                color: "var(--text-primary)",
                                fontFamily: "var(--font-heading)",
                              }}
                            >
                              {item.role}
                            </h3>
                          </div>
                          {"companies" in item && Array.isArray(item.companies) ? (
                            <div>
                              <p className="text-sm mt-0.5 flex flex-wrap items-center gap-x-1">
                                {(item.companies as string[]).map((co, i) => (
                                  <span key={co} className="flex items-center gap-x-1">
                                    {i > 0 && (
                                      <span style={{ color: "var(--text-muted)", margin: "0 0.1rem" }}>·</span>
                                    )}
                                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{co}</span>
                                  </span>
                                ))}
                                <span style={{ color: "var(--text-muted)", margin: "0 0.1rem" }}>·</span>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{item.type}</span>
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm mt-0.5">
                              <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                                {item.company}
                              </span>
                              <span style={{ color: "var(--text-muted)", margin: "0 0.4rem" }}>
                                ·
                              </span>
                              <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                {item.type}
                              </span>
                            </p>
                          )}

                          {/* Description (optional) */}
                          {"description" in item && item.description ? (
                            <p
                              className="mt-3 text-sm leading-relaxed"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {item.description}
                            </p>
                          ) : null}

                          {/* Tags (optional) */}
                          {"tags" in item && Array.isArray(item.tags) && item.tags.length > 0 ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.tags.map((tag, k) => (
                                <span
                                  key={k}
                                  className="text-[10px] font-medium px-2.5 py-1 transition-colors duration-200"
                                  style={{
                                    border: "1px solid var(--surface-border)",
                                    borderRadius: 0,
                                    color: "var(--text-secondary)",
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.03em",
                                    background: "transparent",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "var(--accent)";
                                    e.currentTarget.style.color = "var(--accent)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "var(--surface-border)";
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider between entries */}
                  {idx < earlierEntries.length - 1 && (
                    <div
                      className="w-full"
                      style={{
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, var(--surface-border), transparent)",
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
