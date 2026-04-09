"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTyping } from "@/lib/hooks";
import { personal, hero } from "@/lib/data";
import { ArrowDownRight, Download } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { useTheme } from "@/lib/theme-context";

function NodeNetwork({ isDark }: { readonly isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse globally — canvas stays pointer-events-none
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const COLOR = isDark ? "212,168,83" : "160,120,45";
    const COUNT = 85;
    const CONNECT_DIST = 130;
    const REPEL_DIST = 140;

    interface Node {
      x: number; y: number;
      ox: number; oy: number;
      vx: number; vy: number;
      r: number;
      phase: number;      // breathing phase offset (unique per node)
      breathSpeed: number; // how fast it breathes
    }

    const nodes: Node[] = Array.from({ length: COUNT }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x, y, ox: x, oy: y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        phase: Math.random() * Math.PI * 2,
        breathSpeed: 0.012 + Math.random() * 0.008, // slow breath
      };
    });

    // Mouse velocity tracking
    const prevMouse = { x: -9999, y: -9999 };
    let mouseSpeed = 0;

    let animId: number;
    let tick = 0;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      // Calculate mouse speed (smoothed)
      const mdx = mx - prevMouse.x;
      const mdy = my - prevMouse.y;
      const rawSpeed = Math.sqrt(mdx * mdx + mdy * mdy);
      mouseSpeed = mouseSpeed * 0.85 + rawSpeed * 0.15; // smooth it
      prevMouse.x = mx;
      prevMouse.y = my;

      // Clamp boost: 1x at rest → up to 4x at fast mouse
      const speedBoost = 1 + Math.min(mouseSpeed / 12, 3);

      for (const n of nodes) {
        // Breathing: node radius pulses slowly and independently
        const breathe = Math.sin(tick * n.breathSpeed + n.phase);

        // Gentle drift
        n.x += n.vx;
        n.y += n.vy;

        // Soft bounce at edges
        if (n.x < 5 || n.x > canvas.width - 5) n.vx *= -1;
        if (n.y < 5 || n.y > canvas.height - 5) n.vy *= -1;

        // Cursor repel — amplified by mouse speed
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_DIST && dist > 0) {
          const push = ((REPEL_DIST - dist) / REPEL_DIST) * 0.25 * speedBoost;
          n.vx += (dx / dist) * push;
          n.vy += (dy / dist) * push;
        }

        // Spring back toward origin
        n.vx += (n.ox - n.x) * 0.003;
        n.vy += (n.oy - n.y) * 0.003;

        // Velocity damping
        n.vx *= 0.96;
        n.vy *= 0.96;

        // Store breathe for render
        (n as Node & { _breathe: number })._breathe = breathe;
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const cDx = midX - mx;
            const cDy = midY - my;
            const mouseDist = Math.sqrt(cDx * cDx + cDy * cDy);
            const glow = mouseDist < 160 ? 1 - mouseDist / 160 : 0;
            // Lines breathe too: alpha pulses with average phase of two endpoints
            const lineBreath = 0.85 + 0.15 * Math.sin(tick * 0.015 + (nodes[i].phase + nodes[j].phase) / 2);
            const baseAlpha = (1 - d / CONNECT_DIST) * 0.18 * lineBreath;
            const alpha = Math.min(baseAlpha + glow * 0.45, 0.7);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
            ctx.lineWidth = 0.6 + glow * 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const breathe = (n as Node & { _breathe: number })._breathe ?? 0;

        // Glow near cursor
        const dx = n.x - mx;
        const dy = n.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        const cursorGlow = d < 120 ? 1 - d / 120 : 0;

        // Breathing: radius and alpha both pulse
        const radius = n.r * (1 + 0.35 * breathe) + cursorGlow * 1.5;
        const alpha = (0.35 + 0.15 * (breathe * 0.5 + 0.5)) + cursorGlow * 0.55;

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},${alpha})`;
        ctx.fill();

        // Halo when cursor is near
        if (cursorGlow > 0.3) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR},${cursorGlow * 0.15})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function parseStatNumber(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  return { prefix: match[1], num: parseInt(match[2].replace(/,/g, ""), 10), suffix: match[3] };
}

export function Hero() {
  const { themeName } = useTheme();
  const isDark = themeName === "onyx";
  const typed = useTyping(hero.typingWords, 65, 30, 2000);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden" id="hero">
      {/* Background layer */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0">
          <NodeNetwork isDark={isDark} />
        </div>
        {/* Vignette — darkens edges so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, var(--bg) 85%)",
          }}
        />
      </motion.div>

      {/* Main content — centered text-focused layout */}
      <div className="flex-1 flex items-center relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-8 flex flex-col items-center text-center">
          <motion.div className="max-w-3xl flex flex-col items-center" style={{ y: textY }}>
            {/* Name — mask reveal */}
            <div className="mt-5">
              <motion.h1
                className="text-display"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03, delayChildren: 2.2 } },
                }}
              >
                {"Mahmoud".split("").map((char, i) => (
                  <span key={`m-${i}`} style={{ display: "inline-block", overflow: "hidden" }}>
                    <motion.span
                      style={{ display: "inline-block", color: "var(--text-primary)" }}
                      variants={{
                        hidden: { y: "100%", opacity: 0, filter: "blur(4px)" },
                        visible: {
                          y: "0%",
                          opacity: 1,
                          filter: "blur(0px)",
                          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}{" "}
                {"Abdallah".split("").map((char, i) => (
                  <span key={`a-${i}`} style={{ display: "inline-block", overflow: "hidden" }}>
                    <motion.span
                      className="text-accent"
                      style={{ display: "inline-block" }}
                      variants={{
                        hidden: { y: "100%", opacity: 0, filter: "blur(4px)" },
                        visible: {
                          y: "0%",
                          opacity: 1,
                          filter: "blur(0px)",
                          transition: { duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
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
              <a href="/Mahmoud_Abdallah.pdf" download className="btn-outline" style={{ gap: "0.375rem" }}>
                <Download size={14} /> Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
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
                  <div
                    className="text-base md:text-lg font-bold"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}
                  >
                    {parsed.num > 0 ? (
                      <CountUp target={parsed.num} prefix={parsed.prefix} suffix={parsed.suffix} duration={2200} />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="text-[10px] mt-1 leading-tight" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
