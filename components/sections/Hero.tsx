"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTyping } from "@/lib/hooks";
import { useTheme } from "@/lib/theme-context";
import { personal, hero } from "@/lib/data";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  const typed = useTyping(hero.typingWords, 65, 30, 2000);
  const { themeName } = useTheme();

  return (
    <section
      className="relative min-h-screen flex flex-col"
      id="hero"
    >
      {/* Ambient background glow — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(200,151,58,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Main content — fills height */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_440px] gap-12 xl:gap-20 items-center">

            {/* ── LEFT: Text ── */}
            <div className="order-2 lg:order-1">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-label">
                  ● Open to Opportunities
                </span>
              </motion.div>

              {/* Name — massive */}
              <motion.h1
                className="mt-5 text-display"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
              >
                <span style={{ color: "var(--text-primary)" }}>Mahmoud</span>
                <br />
                <span className="text-accent glow-text">Abdallah</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="mt-5 text-base md:text-lg font-light max-w-lg"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {personal.tagline}
              </motion.p>

              {/* Typing line */}
              <motion.div
                className="mt-2 text-xs md:text-sm"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span style={{ color: "var(--accent)" }}>~/</span>{" "}
                {typed}
                <span className="animate-blink text-accent">|</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a href="#contact" className="btn-primary">
                  Let&apos;s Talk
                  <ArrowDownRight size={15} />
                </a>
                <a href="#experience" className="btn-outline">
                  See My Work
                </a>
              </motion.div>

              {/* Quick facts */}
              <motion.div
                className="mt-10 flex flex-wrap gap-x-6 gap-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {["Dubai, UAE", "7+ Years Experience", "CIPS L4 In Progress"].map((fact) => (
                  <span
                    key={fact}
                    className="text-xs"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {fact}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Photo ── */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {/* Glow behind photo */}
                <div
                  className="absolute -inset-4 rounded-2xl blur-2xl opacity-30 pointer-events-none"
                  style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
                />

                {/* Photo container — tall rectangle, editorial */}
                <div
                  className="relative w-[240px] h-[300px] md:w-[320px] md:h-[400px] lg:w-[360px] lg:h-[450px] rounded-2xl overflow-hidden"
                  style={{ border: "1px solid var(--surface-border-gold)" }}
                >
                  <Image
                    src={themeName === "onyx" ? "/images/mahmoud-dark-v3.jpg" : "/images/mahmoud-light-v2.jpg"}
                    alt="Mahmoud Abdallah"
                    fill
                    sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 360px"
                    className="object-cover"
                    style={{ objectPosition: "50% 20%" }}
                    priority
                    quality={95}
                  />

                  {/* Subtle inner vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 60%, rgba(10,10,9,0.35) 100%)",
                    }}
                  />
                </div>

                {/* Floating stat badge */}
                <motion.div
                  className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border-gold)",
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}
                  >
                    AED 450K+
                  </div>
                  <div
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    Savings in one project
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <motion.div
        className="border-t"
        style={{ borderColor: "var(--surface-border)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 py-5 gap-y-4">
            {hero.stats.map((s, i) => (
              <div
                key={i}
                className="text-center md:text-left px-4 first:pl-0 last:pr-0 border-r last:border-r-0"
                style={{ borderColor: "var(--surface-border)" }}
              >
                <div
                  className="text-sm md:text-base font-semibold"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] mt-0.5 leading-tight"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span
          className="text-[9px] tracking-widest"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
