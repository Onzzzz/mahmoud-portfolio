"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTyping } from "@/lib/hooks";
import { useTheme } from "@/lib/theme-context";
import { personal, hero } from "@/lib/data";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const typed = useTyping(hero.typingWords, 70, 35, 2200);
  const { themeName } = useTheme();

  return (
    <section className="relative h-screen flex flex-col justify-center px-4 md:px-6 pt-16" id="hero">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto w-full text-center">
        {/* Photo — smaller on mobile */}
        <motion.div
          className="mb-3 md:mb-4 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-28 h-28 md:w-52 md:h-52 rounded-full overflow-hidden relative shadow-lg" style={{ border: "3px solid var(--accent)" }}>
            <Image
              src={themeName === "onyx" ? "/images/mahmoud-dark-v3.jpg" : "/images/mahmoud-light-v2.jpg"}
              alt="Mahmoud Abdallah"
              fill
              sizes="(max-width: 768px) 112px, 208px"
              className="object-cover"
              style={{ objectPosition: "50% 25%" }}
              priority
              quality={95}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="leading-[0.95] font-bold"
          style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)", fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span style={{ color: "var(--text-primary)" }}>Mahmoud </span>
          <span className="text-accent">Abdallah</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-2 md:mt-3 text-sm md:text-lg font-light"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {personal.tagline}
        </motion.p>

        {/* Typing effect */}
        <motion.div
          className="mt-1.5 md:mt-2 text-xs md:text-sm"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-accent">~/</span> {typed}<span className="animate-blink text-accent">|</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-3 md:mt-4 text-base md:text-xl font-medium"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {personal.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-4 md:mt-6 flex flex-wrap gap-3 md:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#contact" className="inline-flex items-center px-5 md:px-7 py-2 md:py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all bg-[var(--accent)] text-[#0c0c0c] hover:bg-[var(--accent-hover)] hover:shadow-lg" style={{ fontFamily: "var(--font-heading)" }}>
            Let&apos;s Talk
          </a>
          <a href="#experience" className="inline-flex items-center px-5 md:px-7 py-2 md:py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-muted)]" style={{ fontFamily: "var(--font-heading)" }}>
            See My Work
          </a>
        </motion.div>

        {/* Stats — on mobile: smaller text, allow wrap */}
        <motion.div
          className="mt-6 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 md:gap-6 py-4 md:py-6 border-t border-b"
          style={{ borderColor: "var(--surface-border)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          {hero.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-semibold text-sm md:text-lg text-accent" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div>
              <div className="text-[10px] md:text-[11px] mt-0.5 md:mt-1" style={{ color: "var(--text-secondary)" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll */}
        <motion.div className="mt-4 md:mt-6 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <a href="#about" className="flex flex-col items-center gap-1" aria-label="Scroll down">
            <span className="text-[10px] md:text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>scroll</span>
            <ArrowDown size={12} className="animate-bounce" style={{ color: "var(--text-muted)" }} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
