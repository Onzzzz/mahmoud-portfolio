"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s?]+)/);
  return match ? match[1] : null;
}

function getCover(project: typeof projects[number]): string | null {
  if (project.image) return project.image;
  if (project.video) {
    const id = getYouTubeId(project.video);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
  }
  return null;
}

type SelectedProject = typeof projects[number] | null;

const achievements = [
  {
    value: "450K+",
    label: "AED Saved",
    tag: "Single Project",
    desc: "Documented cost savings on a single procurement engagement through strategic sourcing and competitive negotiation.",
  },
  {
    value: "30+",
    label: "Projects Delivered",
    tag: null,
    desc: "GITEX, Elie Saab, Art Dubai, World Defense Show, Red Sea Global, Al Bilad Bank & more.",
  },
  {
    value: "10M+",
    label: "AED Budgets Managed",
    tag: null,
    desc: "Multi-million procurement portfolios across UAE, KSA, and GCC markets.",
  },
  {
    value: "10–20%",
    label: "Avg. Cost Reduction",
    tag: null,
    desc: "Consistent savings across all engagements through competitive sourcing.",
  },
  {
    value: "★",
    label: "Best Use of Technology",
    tag: null,
    desc: "Fractal Systems — Saudi Event Awards · Elie Saab Concert (Celine Dion & J-Lo).",
  },
];

const systemsBuilt = [
  { number: "01", title: "Operations Portal", desc: "11 workflow phases, 280+ nodes, 45+ SOPs built from scratch" },
  { number: "02", title: "Odoo ERP Implementation", desc: "Business-led ERP deployment across procurement, inventory, sales & operations" },
  { number: "03", title: "Tender Monitoring System", desc: "AI-powered GCC government portal tracking with n8n automation" },
];

// Card dimensions for the 2-row scroll
const CARD_W = 280;
const CARD_GAP = 12;
const CARD_FULL = CARD_W + CARD_GAP; // 292px per card slot

export function Projects() {
  const [selected, setSelected] = useState<SelectedProject>(null);

  // ── Achievements ticker state ──
  const tickerPausedRef = useRef(false);
  const tickerOffset = useRef(0);
  const [tickerHovered, setTickerHovered] = useState(false);

  // ── 2-row project scroll refs ──
  const row1PausedRef = useRef(false);
  const row1Offset = useRef(0);
  const row2PausedRef = useRef(false);
  const row2Offset = useRef(0);

  // Trigger achievements ticker entrance animation via IntersectionObserver
  useEffect(() => {
    const section = document.getElementById("achievements-ticker-section");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // All Events & Production projects
  const showcaseProjects = projects.filter((p) => p.category === "Events & Production");
  const mid = Math.ceil(showcaseProjects.length / 2);
  const row1Projects = showcaseProjects.slice(0, mid);
  const row2Projects = showcaseProjects.slice(mid);

  const ROW1_HALF = row1Projects.length * CARD_FULL;
  const ROW2_HALF = row2Projects.length * CARD_FULL;

  // ── 2-row RAF scroll (opposite directions) ──
  useEffect(() => {
    // Row 2 starts showing the second copy so rightward scroll is seamless
    row2Offset.current = -ROW2_HALF;

    let raf: number;
    const step = () => {
      const t1 = document.getElementById("proj-row1-track");
      const t2 = document.getElementById("proj-row2-track");

      if (!row1PausedRef.current && t1) {
        row1Offset.current -= 0.55;
        if (row1Offset.current <= -ROW1_HALF) row1Offset.current = 0;
        t1.style.transform = `translateX(${row1Offset.current}px)`;
      }
      if (!row2PausedRef.current && t2) {
        row2Offset.current += 0.55;
        if (row2Offset.current >= 0) row2Offset.current = -ROW2_HALF;
        t2.style.transform = `translateX(${row2Offset.current}px)`;
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Achievements ticker auto-scroll ──
  const TICKER_CARD_W = 301;
  const TICKER_HALF = achievements.length * TICKER_CARD_W;

  useEffect(() => {
    let raf: number;
    const step = () => {
      if (!tickerPausedRef.current) {
        const track = document.getElementById("achievements-ticker-track");
        if (track) {
          tickerOffset.current -= 1;
          if (tickerOffset.current <= -TICKER_HALF) tickerOffset.current = 0;
          track.style.transform = `translateX(${tickerOffset.current}px)`;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTicker = useCallback((dir: "left" | "right") => {
    tickerPausedRef.current = true;
    tickerOffset.current += dir === "left" ? TICKER_CARD_W : -TICKER_CARD_W;
    if (tickerOffset.current > 0) tickerOffset.current = -(TICKER_HALF - TICKER_CARD_W);
    if (tickerOffset.current <= -TICKER_HALF) tickerOffset.current = 0;
    const track = document.getElementById("achievements-ticker-track");
    if (track) {
      track.style.transition = "transform 0.35s cubic-bezier(0.22,1,0.36,1)";
      track.style.transform = `translateX(${tickerOffset.current}px)`;
      setTimeout(() => {
        const t = document.getElementById("achievements-ticker-track");
        if (t) t.style.transition = "";
        tickerPausedRef.current = false;
      }, 380);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseBothRows = useCallback((paused: boolean) => {
    row1PausedRef.current = paused;
    row2PausedRef.current = paused;
  }, []);

  const scrollRows = useCallback((dir: "prev" | "next") => {
    const jump = CARD_FULL * 2;
    pauseBothRows(true);

    row1Offset.current += dir === "prev" ? jump : -jump;
    row2Offset.current -= dir === "prev" ? jump : -jump;

    // Clamp row1 (left-scroller)
    if (row1Offset.current > 0) row1Offset.current = -(ROW1_HALF - jump);
    if (row1Offset.current <= -ROW1_HALF) row1Offset.current = 0;
    // Clamp row2 (right-scroller)
    if (row2Offset.current >= 0) row2Offset.current = -ROW2_HALF;
    if (row2Offset.current < -ROW2_HALF) row2Offset.current = -(ROW2_HALF - jump);

    const t1 = document.getElementById("proj-row1-track");
    const t2 = document.getElementById("proj-row2-track");
    const ease = "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)";
    if (t1) { t1.style.transition = ease; t1.style.transform = `translateX(${row1Offset.current}px)`; }
    if (t2) { t2.style.transition = ease; t2.style.transform = `translateX(${row2Offset.current}px)`; }

    setTimeout(() => {
      if (t1) t1.style.transition = "";
      if (t2) t2.style.transition = "";
      pauseBothRows(false);
    }, 780);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section
        id="projects"
        className="relative pt-10 pb-24 md:pt-12 md:pb-32 overflow-hidden"
        style={{ background: "var(--bg-alt)", scrollMarginTop: "64px" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2
              className="text-3xl md:text-5xl leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--text-primary)",
                fontWeight: 400,
              }}
            >
              Track{" "}
              <span style={{ color: "var(--accent)" }}>Record.</span>
            </h2>
          </motion.div>

          {/* ─── Project Showcase ─── */}
          {showcaseProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <span
                className="text-[10px] font-medium uppercase block mb-8"
                style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.2em" }}
              >
                Project Showcase
              </span>

              {/* ── Intro — full width above rows ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-end gap-6 mb-10"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    30+
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-primary)",
                    }}
                  >
                    Projects Delivered
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                  maxWidth: "640px",
                }}>
                  End-to-end procurement across event technology, exhibitions, façade & LED media installations, AV immersive experiences, and XR environments — delivering world-class events for global brands across UAE and KSA, on time and on budget.
                </p>
              </motion.div>

              {/* ── 2-row opposite-direction scroll ── */}
              <div
                className="relative"
                onMouseEnter={() => pauseBothRows(true)}
                onMouseLeave={() => pauseBothRows(false)}
              >
                {/* Left edge fade */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(to right, var(--bg-alt), var(--bg-alt-0))" }}
                />
                {/* Right edge fade */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(to left, var(--bg-alt), var(--bg-alt-0))" }}
                />

                {/* Prev button */}
                <button
                  onClick={() => scrollRows("prev")}
                  className="absolute left-2 top-1/2 z-20 flex items-center justify-center transition-all duration-200"
                  style={{ transform: "translateY(-50%)", width: 34, height: 34, border: "1px solid var(--surface-border)", background: "var(--bg-alt)", color: "var(--text-muted)", borderRadius: 7, cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--surface-border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                  aria-label="Previous projects"
                >
                  <ChevronLeft size={15} />
                </button>

                {/* Next button */}
                <button
                  onClick={() => scrollRows("next")}
                  className="absolute right-2 top-1/2 z-20 flex items-center justify-center transition-all duration-200"
                  style={{ transform: "translateY(-50%)", width: 34, height: 34, border: "1px solid var(--surface-border)", background: "var(--bg-alt)", color: "var(--text-muted)", borderRadius: 7, cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--surface-border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                  aria-label="Next projects"
                >
                  <ChevronRight size={15} />
                </button>

                {/* Row 1 — scrolls left */}
                <div className="overflow-hidden mb-3">
                  <div
                    id="proj-row1-track"
                    className="flex"
                    style={{ gap: CARD_GAP, willChange: "transform" }}
                  >
                    {[...row1Projects, ...row1Projects].map((project, i) => {
                      const cover = getCover(project);
                      return (
                        <ProjectCard
                          key={`r1-${i}`}
                          project={project}
                          cover={cover}
                          index={i % row1Projects.length}
                          onSelect={setSelected}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Row 2 — scrolls right (opposite) */}
                <div className="overflow-hidden">
                  <div
                    id="proj-row2-track"
                    className="flex"
                    style={{ gap: CARD_GAP, willChange: "transform" }}
                  >
                    {[...row2Projects, ...row2Projects].map((project, i) => {
                      const cover = getCover(project);
                      return (
                        <ProjectCard
                          key={`r2-${i}`}
                          project={project}
                          cover={cover}
                          index={i % row2Projects.length}
                          onSelect={setSelected}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Systems I Built ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <span
              className="text-[10px] font-medium uppercase block mb-8"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.2em" }}
            >
              Systems I Built
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]" style={{ background: "var(--surface-border)" }}>
              {[...systemsBuilt, { number: "04", title: "ESG & Compliance Suite", desc: "Full governance documentation — ESG, anti-bribery, credit policy, code of conduct, and HSE aligned with UAE regulations." }].map((item, i) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 md:p-10 transition-all duration-300 group cursor-pointer"
                  style={{ background: "var(--bg-alt)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-alt)"; }}
                >
                  <span
                    className="text-xs block mb-3 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                  >
                    {item.number}
                  </span>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── Achievements Ticker ─── */}
          <style>{`
            @keyframes card-in {
              from { opacity: 0; transform: translateY(14px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes num-in {
              from { opacity: 0; transform: scale(0.82) translateY(10px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
            .ticker-section { opacity: 0; transform: translateY(16px); transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1); }
            .ticker-section.in-view { opacity: 1; transform: translateY(0); }
            .ticker-section.in-view .ach-card { animation: card-in 0.45s cubic-bezier(0.22,1,0.36,1) both; }
            .ticker-section.in-view .ach-num  { animation: num-in  0.5s  cubic-bezier(0.22,1,0.36,1) both; }
            ${achievements.map((_, idx) => `
              .ticker-section.in-view .ach-card:nth-child(${idx + 1}) { animation-delay: ${idx * 80}ms; }
              .ticker-section.in-view .ach-card:nth-child(${idx + 6}) { animation-delay: ${idx * 80}ms; }
              .ticker-section.in-view .ach-card:nth-child(${idx + 1}) .ach-num { animation-delay: ${idx * 80 + 100}ms; }
              .ticker-section.in-view .ach-card:nth-child(${idx + 6}) .ach-num { animation-delay: ${idx * 80 + 100}ms; }
            `).join('')}
            .ach-card:hover { background: rgba(212,168,83,0.04) !important; }
            .proj-card-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); transform: scale(1.02); }
            .proj-scroll-card:hover .proj-card-img { transform: scale(1.08); }
            .proj-play-btn { opacity: 0; transition: opacity 0.25s; }
            .proj-scroll-card:hover .proj-play-btn { opacity: 1; }
          `}</style>
          <div
            id="achievements-ticker-section"
            className="ticker-section relative"
            style={{
              borderTop: "1px solid var(--surface-border)",
              borderBottom: "1px solid var(--surface-border)",
            }}
          >
            {/* Left fade */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, var(--bg-alt), var(--bg-alt-0))" }}
            />
            {/* Right fade */}
            <div
              className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--bg-alt), var(--bg-alt-0))" }}
            />

            {/* Prev button */}
            <button
              onClick={() => scrollTicker("left")}
              className="absolute left-3 top-1/2 z-20 flex items-center justify-center transition-all duration-200"
              style={{
                transform: "translateY(-50%)",
                width: 36,
                height: 36,
                border: "1px solid var(--surface-border)",
                background: "var(--bg-alt)",
                color: "var(--text-muted)",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--surface-border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next button */}
            <button
              onClick={() => scrollTicker("right")}
              className="absolute right-3 top-1/2 z-20 flex items-center justify-center transition-all duration-200"
              style={{
                transform: "translateY(-50%)",
                width: 36,
                height: 36,
                border: "1px solid var(--surface-border)",
                background: "var(--bg-alt)",
                color: "var(--text-muted)",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--surface-border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>

            {/* Scrollable track */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => { tickerPausedRef.current = true; setTickerHovered(true); }}
              onMouseLeave={() => { tickerPausedRef.current = false; setTickerHovered(false); }}
            >
              <div id="achievements-ticker-track" className="flex w-max">
                {[...achievements, ...achievements].map((a, i) => (
                  <div
                    key={i}
                    className="ach-card flex flex-col gap-3 shrink-0"
                    style={{
                      width: "300px",
                      padding: "36px 40px",
                      borderRight: "1px solid var(--surface-border)",
                      transition: "background 0.25s",
                    }}
                  >
                    <span
                      className="ach-num"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "var(--accent)",
                        lineHeight: 1,
                        display: "block",
                      }}
                    >
                      {a.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text-primary)",
                      }}
                    >
                      {a.label}
                    </span>
                    {a.tag && (
                      <span style={{
                        display: "inline-block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.52rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        border: "1px solid rgba(212,168,83,0.4)",
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: "rgba(212,168,83,0.07)",
                        marginTop: "-4px",
                      }}>
                        {a.tag}
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      {a.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Project Detail Modal ─── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              style={{ background: "var(--surface)", border: "1px solid var(--surface-border)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Video or hero image ── */}
              {selected.video ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selected.video)}?autoplay=1&rel=0&modestbranding=1`}
                    title={selected.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : selected.image ? (
                <div className="w-full aspect-video overflow-hidden">
                  <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                </div>
              ) : null}

              <div className="p-6 md:p-8">
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                >
                  {selected.company}
                </span>
                <h3
                  className="mt-2 text-xl md:text-2xl font-bold"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                >
                  {selected.title}
                </h3>
                {selected.stat && (
                  <div
                    className="mt-3 inline-flex items-center gap-2 px-3 py-1.5"
                    style={{ background: "var(--accent-muted)", border: "1px solid var(--surface-border-gold)" }}
                  >
                    <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                      {selected.stat.value}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {selected.stat.label}
                    </span>
                  </div>
                )}
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {selected.description}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      <span style={{ color: "var(--text-secondary)" }}>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.tools.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* ── Photo gallery ── */}
                {"gallery" in selected && Array.isArray(selected.gallery) && selected.gallery.length > 0 && (
                  <div className="mt-8">
                    <span
                      className="text-[10px] uppercase tracking-widest block mb-4"
                      style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.15em" }}
                    >
                      Project Photos
                    </span>
                    <div
                      className="grid gap-1"
                      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
                    >
                      {(selected.gallery as string[]).map((src, idx) => (
                        <a
                          key={idx}
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block overflow-hidden aspect-video"
                          style={{ background: "var(--bg)" }}
                        >
                          <img
                            src={src}
                            alt={`${selected.title} — photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Project card component for the 2-row scroll ──
interface ProjectCardProps {
  project: typeof projects[number];
  cover: string | null;
  index: number;
  onSelect: (p: typeof projects[number]) => void;
}

function ProjectCard({ project, cover, onSelect }: ProjectCardProps) {
  return (
    <div
      className="proj-scroll-card group cursor-pointer shrink-0 relative overflow-hidden"
      style={{
        width: CARD_W,
        height: 175,
        borderRadius: 10,
        background: "var(--surface)",
        flexShrink: 0,
      }}
      onClick={() => onSelect(project)}
    >
      {/* Image */}
      {cover && (
        <img
          src={cover}
          alt={project.title}
          className="proj-card-img absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark gradient overlay at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 45%, transparent 100%)",
        }}
      />

      {/* Play button (center, on hover) */}
      <div className="proj-play-btn absolute inset-0 flex items-center justify-center">
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 18px rgba(212,168,83,0.5)",
          }}
        >
          <Play size={13} fill="var(--bg)" style={{ color: "var(--bg)", marginLeft: 2 }} />
        </div>
      </div>

      {/* Title + company at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span
          className="block"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            opacity: 0.9,
            marginBottom: 3,
          }}
        >
          {project.company}
        </span>
        <p
          className="text-xs font-semibold leading-snug"
          style={{
            color: "#fff",
            fontFamily: "var(--font-heading)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.title}
        </p>
      </div>
    </div>
  );
}
