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

export function Projects() {
  const [selected, setSelected] = useState<SelectedProject>(null);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const events = projects.filter((p) => p.category === "Events & Production");

  // Auto-scroll interval
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      // If reached halfway (duplicated content), reset to start seamlessly
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      el.scrollLeft += 1;
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handlePause = useCallback((p: boolean) => {
    setPaused(p);
    pausedRef.current = p;
  }, []);

  const scrollFilmstrip = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  }, []);
  const procurement = projects.filter((p) => p.category === "Procurement & Tenders");
  const operations = projects.filter((p) => p.category === "Operations & Systems");

  return (
    <>
      <section
        id="projects"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "var(--bg-alt)" }}
      >
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="section-label block mb-3">Projects</span>
            <h2
              className="text-3xl md:text-5xl font-extrabold leading-tight"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            >
              Key Achievements
            </h2>
          </motion.div>
        </div>

        {/* ═══ PROCUREMENT — Impact Cards ═══ */}
        {procurement.length > 0 && (
          <motion.div
            className="max-w-6xl mx-auto px-4 md:px-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
              <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                Procurement & Tenders
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--accent-muted)", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                {procurement.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {procurement.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="cursor-pointer rounded-xl p-5 md:p-6 transition-all duration-300 group"
                  style={{ background: "var(--surface)", border: "1px solid var(--surface-border)" }}
                  onClick={() => setSelected(project)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border-gold)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)"; }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="section-label">{project.company}</span>
                      <h4 className="mt-1.5 text-base font-bold leading-snug" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                        {project.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                        {project.description}
                      </p>
                    </div>
                    {/* Big stat */}
                    {project.stat && (
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-extrabold" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
                          {project.stat.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                          {project.stat.label}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ OPERATIONS — Compact List ═══ */}
        {operations.length > 0 && (
          <motion.div
            className="max-w-6xl mx-auto px-4 md:px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
              <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                Operations & Systems
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--accent-muted)", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                {operations.length}
              </span>
            </div>

            <div className="space-y-2">
              {operations.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="cursor-pointer rounded-lg px-5 py-4 flex items-center justify-between gap-4 transition-all duration-200 group"
                  style={{ background: "transparent", borderBottom: "1px solid var(--surface-border)" }}
                  onClick={() => setSelected(project)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-xs font-mono shrink-0" style={{ color: "var(--accent)", width: "1.5rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                        {project.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {project.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {project.tools.slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {/* ═══ EVENTS — Filmstrip Carousel ═══ */}
        {events.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
                <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                  Events & Production
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--accent-muted)", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {events.length}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollFilmstrip("left")}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                  style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollFilmstrip("right")}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                  style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Auto-scrolling filmstrip — pauses on hover, arrows work */}
            <div
              className="relative"
              onMouseEnter={() => handlePause(true)}
              onMouseLeave={() => handlePause(false)}
            >
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-alt), transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg-alt), transparent)" }} />

              {/* Scrollable container with duplicated items */}
              <div
                ref={scrollRef}
                className="flex gap-4 py-2 overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {[...events, ...events].map((project, i) => {
                  const cover = getCover(project);
                  return (
                    <div
                      key={`${project.title}-${i}`}
                      className="group cursor-pointer flex-shrink-0 rounded-2xl overflow-hidden relative transition-transform duration-300 hover:scale-[1.04]"
                      style={{
                        width: "220px",
                        height: "300px",
                        background: "var(--surface)",
                        border: "1px solid var(--surface-border)",
                      }}
                      onClick={() => setSelected(project)}
                    >
                      {cover ? (
                        <img src={cover} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full" style={{ background: "linear-gradient(180deg, var(--accent-muted), var(--surface))" }} />
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)" }} />

                      {/* Play button — hover */}
                      {project.video && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--accent)", boxShadow: "0 4px 16px rgba(212,168,83,0.4)" }}>
                            <Play size={18} fill="var(--bg)" style={{ color: "var(--bg)", marginLeft: 2 }} />
                          </div>
                        </div>
                      )}

                      {/* Small play icon */}
                      {project.video && (
                        <div className="absolute top-3 right-3 group-hover:opacity-0 transition-opacity">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
                            <Play size={10} fill="white" style={{ color: "white", marginLeft: 1 }} />
                          </div>
                        </div>
                      )}

                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-sm font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          {project.title}
                        </p>
                        <p className="text-[10px] mt-1.5 uppercase tracking-wider" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                          {project.company}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* ═══ Project Detail Modal ═══ */}
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
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--surface-border)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {selected.video ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selected.video)}?autoplay=1&rel=0`}
                    title={selected.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : selected.image ? (
                <div className="w-full aspect-video overflow-hidden">
                  <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                </div>
              ) : null}

              <div className="p-6 md:p-8">
                <span className="section-label">{selected.company}</span>
                <h3 className="mt-2 text-xl md:text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                  {selected.title}
                </h3>
                {selected.stat && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "var(--accent-muted)", border: "1px solid var(--surface-border-gold)" }}>
                    <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>{selected.stat.value}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{selected.stat.label}</span>
                  </div>
                )}
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{selected.description}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      <span style={{ color: "var(--text-secondary)" }}>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.tools.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
