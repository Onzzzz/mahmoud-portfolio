"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTyping } from "@/lib/hooks";
import { useTheme } from "@/lib/theme-context";
import { useMousePosition } from "@/lib/useMousePosition";
import { personal, hero } from "@/lib/data";
import { ArrowDownRight, Download } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

function parseStatNumber(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  return { prefix: match[1], num: parseInt(match[2].replace(/,/g, ""), 10), suffix: match[3] };
}

export function Hero() {
  const typed = useTyping(hero.typingWords, 65, 30, 2000);
  const { themeName } = useTheme();
  const mouse = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Photo tilt based on mouse (subtle)
  const photoRotateY = (mouse.x - 0.5) * 6;
  const photoRotateX = (mouse.y - 0.5) * -4;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden" id="hero">
      {/* Background layer — moves slowest */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {/* Radial glow */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px]"
          style={{
            background: "radial-gradient(ellipse at top right, var(--accent-glow) 0%, transparent 60%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--text-muted) 0.5px, transparent 0.5px)",
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex items-center relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_440px] gap-12 xl:gap-20 items-center">

            {/* LEFT: Text — parallax layer */}
            <motion.div className="order-2 lg:order-1" style={{ y: textY }}>
              {/* Name — mask reveal */}
              <div className="mt-5">
                <motion.h1 className="text-display" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: 2.2 } } }}>
                  {/* Mahmoud */}
                  {"Mahmoud".split("").map((char, i) => (
                    <span key={`m-${i}`} style={{ display: "inline-block", overflow: "hidden" }}>
                      <motion.span
                        style={{ display: "inline-block", color: "var(--text-primary)" }}
                        variants={{
                          hidden: { y: "100%", opacity: 0, filter: "blur(4px)" },
                          visible: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                        }}
                      >{char}</motion.span>
                    </span>
                  ))}
                  <br />
                  {/* Abdallah — gold */}
                  {"Abdallah".split("").map((char, i) => (
                    <span key={`a-${i}`} style={{ display: "inline-block", overflow: "hidden" }}>
                      <motion.span
                        className="text-accent"
                        style={{ display: "inline-block" }}
                        variants={{
                          hidden: { y: "100%", opacity: 0, filter: "blur(4px)" },
                          visible: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                        }}
                      >{char}</motion.span>
                    </span>
                  ))}
                </motion.h1>
              </div>

              {/* Tagline */}
              <motion.p
                className="mt-5 text-base md:text-lg font-light max-w-lg"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.6 }}
              >
                {personal.tagline}
              </motion.p>

              {/* Typing line */}
              <motion.div
                className="mt-2 text-xs md:text-sm"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
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
                transition={{ duration: 0.6, delay: 2.9 }}
              >
                <a href="#contact" className="btn-primary">
                  Let&apos;s Talk <ArrowDownRight size={15} />
                </a>
                <a href="#projects" className="btn-outline">My Work</a>
                <a href="/Mahmoud Abdallah.pdf" download className="btn-outline" style={{ gap: "0.375rem" }}>
                  <Download size={14} /> Resume
                </a>
              </motion.div>

              {/* Quick facts */}
              <motion.div
                className="mt-10 flex flex-wrap gap-x-6 gap-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.0 }}
              >
                {["Dubai, UAE", "7+ Years Experience", "CIPS L4 In Progress"].map((fact) => (
                  <span key={fact} className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{fact}</span>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: Photo — parallax + tilt */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div
                className="relative"
                style={{ y: photoY, scale: photoScale }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.1 }}
              >
                {/* Glow behind photo */}
                <div
                  className="absolute -inset-4 rounded-2xl blur-2xl opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
                />

                {/* Photo with 3D tilt */}
                <div
                  className="relative w-[240px] h-[300px] md:w-[320px] md:h-[400px] lg:w-[360px] lg:h-[450px] rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid var(--surface-border-gold)",
                    transform: `perspective(800px) rotateY(${photoRotateY}deg) rotateX(${photoRotateX}deg)`,
                    transition: "transform 0.1s ease-out",
                  }}
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
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 80%, var(--bg) 100%)" }} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar — glass morphism */}
      <motion.div
        style={{
          borderTop: "1px solid var(--surface-border)",
          backdropFilter: "blur(12px)",
          background: "var(--card-bg)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 py-6 gap-y-4">
            {hero.stats.map((s, i) => {
              const parsed = parseStatNumber(s.value);
              return (
                <div
                  key={i}
                  className="text-center md:text-left px-4 first:pl-0 last:pr-0"
                  style={{ borderRight: i < 3 ? "1px solid var(--surface-border)" : undefined }}
                >
                  <div className="text-base md:text-lg font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
                    {parsed.num > 0 ? (
                      <CountUp target={parsed.num} prefix={parsed.prefix} suffix={parsed.suffix} duration={2200} />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="text-[10px] mt-1 leading-tight" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
