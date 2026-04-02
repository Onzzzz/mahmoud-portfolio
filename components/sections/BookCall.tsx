"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock, Loader2, CheckCircle2, X } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

type Step = "date" | "time" | "details" | "success";
type FormStatus = "idle" | "loading" | "success" | "error";

export function BookCall() {
  const now = new Date();
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [step, setStep] = useState<Step>("date");
  const [status, setStatus] = useState<FormStatus>("idle");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString("en", { month: "long", year: "numeric" });

  const isWeekend = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dow = date.getDay();
    return dow === 5 || dow === 6; // Fri-Sat (UAE weekend)
  };

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const selectDate = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setStep("time");
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !email.trim() || !selectedDate || !selectedTime) return;

    setStatus("loading");

    const dateStr = selectedDate.toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: `📅 Meeting Request\nDate: ${dateStr}\nTime: ${selectedTime} GST\nTopic: ${topic.trim() || "General discussion"}`,
          type: "meeting",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setStep("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, [name, email, topic, selectedDate, selectedTime]);

  const resetModal = () => {
    setShowModal(false);
    setStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setTopic("");
    setStatus("idle");
  };

  return (
    <>
      <section
        className="relative py-20 md:py-28 px-4 md:px-6 text-center overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 50% 50%, var(--accent-muted) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label mb-4 block">📅 Schedule a Meeting</span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Let&apos;s Talk{" "}
            <span style={{ color: "var(--accent)" }}>Strategy</span>
          </h2>
          <p
            className="mx-auto mb-8"
            style={{ color: "var(--text-secondary)", maxWidth: "500px", fontSize: "0.95rem", lineHeight: 1.6 }}
          >
            Ready to discuss procurement optimization, supply chain strategy, or potential collaboration? Book a quick call.
          </p>
          <button
            className="btn-primary text-base px-8 py-3"
            onClick={() => setShowModal(true)}
          >
            <Calendar size={18} />
            Book a Call
          </button>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 9999, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl p-6 relative"
              style={{ background: "var(--surface)", border: "1px solid var(--surface-border-gold)" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={18} style={{ color: "var(--accent)" }} />
                  <span className="font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                    Schedule a Meeting
                  </span>
                </div>
                <button onClick={resetModal} className="p-1 rounded-lg transition-colors hover:bg-[var(--surface-2)]">
                  <X size={18} style={{ color: "var(--text-muted)" }} />
                </button>
              </div>

              {/* Step indicators */}
              <div className="flex gap-1.5 justify-center mb-5">
                {["date", "time", "details"].map((s, i) => (
                  <div
                    key={s}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: step === s || (step === "success" && i < 3) ? 24 : 8,
                      background: ["date", "time", "details", "success"].indexOf(step) >= i
                        ? "var(--accent)"
                        : "var(--surface-border)",
                    }}
                  />
                ))}
              </div>

              {/* Step: Date */}
              {step === "date" && (
                <div>
                  <p className="text-sm font-semibold text-center mb-4" style={{ color: "var(--text-primary)" }}>
                    Pick a Date
                  </p>

                  {/* Month nav */}
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 rounded-lg" style={{ border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}>
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{monthName}</span>
                    <button onClick={nextMonth} className="p-2 rounded-lg" style={{ border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-xs py-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const disabled = isWeekend(day) || isPast(day);
                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => selectDate(day)}
                          className="aspect-square rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            color: disabled ? "var(--text-muted)" : "var(--text-primary)",
                            background: "transparent",
                            border: selectedDate?.getDate() === day ? "1px solid var(--accent)" : "1px solid transparent",
                            cursor: disabled ? "not-allowed" : "pointer",
                            opacity: disabled ? 0.4 : 1,
                          }}
                          onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLElement).style.background = "var(--accent-muted)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-center mt-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    Timezone: Asia/Dubai (GST) · Fri-Sat unavailable
                  </p>
                </div>
              )}

              {/* Step: Time */}
              {step === "time" && (
                <div>
                  <p className="text-sm font-semibold text-center mb-1" style={{ color: "var(--text-primary)" }}>
                    Pick a Time
                  </p>
                  <p className="text-xs text-center mb-5" style={{ color: "var(--text-muted)" }}>
                    {selectedDate?.toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long" })}
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => selectTime(time)}
                        className="py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
                        style={{
                          border: "1px solid var(--surface-border)",
                          color: "var(--text-primary)",
                          background: selectedTime === time ? "var(--accent-muted)" : "transparent",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)"; }}
                      >
                        <Clock size={12} style={{ color: "var(--accent)" }} />
                        {time}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep("date")}
                    className="mt-4 text-xs w-full text-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ← Back to calendar
                  </button>
                </div>
              )}

              {/* Step: Details */}
              {step === "details" && (
                <div>
                  <p className="text-sm font-semibold text-center mb-1" style={{ color: "var(--text-primary)" }}>
                    Your Details
                  </p>
                  <p className="text-xs text-center mb-5" style={{ color: "var(--text-muted)" }}>
                    {selectedDate?.toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long" })} at {selectedTime} GST
                  </p>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="contact-input"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="contact-input"
                    />
                    <input
                      type="text"
                      placeholder="Topic (optional)"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs mt-3 text-center" style={{ color: "#ef4444" }}>
                      Failed to book. Please try again.
                    </p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={!name.trim() || !email.trim() || status === "loading"}
                    className="btn-primary w-full mt-5 justify-center"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={15} className="animate-spin" /> Booking...</>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>

                  <button
                    onClick={() => setStep("time")}
                    className="mt-3 text-xs w-full text-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ← Change time
                  </button>
                </div>
              )}

              {/* Step: Success */}
              {step === "success" && (
                <div className="text-center py-6">
                  <CheckCircle2 size={40} style={{ color: "var(--accent)", margin: "0 auto 1rem" }} />
                  <p className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                    Booking Confirmed!
                  </p>
                  <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
                    {selectedDate?.toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <p className="text-sm mb-4" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                    {selectedTime} GST
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Mahmoud will confirm your booking shortly.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
