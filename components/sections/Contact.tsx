"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MessageCircle, Loader2, CheckCircle2, Calendar, ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import { personal, contactTypes } from "@/lib/data";

function LinkedinIcon({ size = 16 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const, delay },
  }),
};

// BookCall modal helpers
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

type FormStatus = "idle" | "loading" | "success" | "error";
type BookStep = "date" | "time" | "details" | "success";

interface ContactLinkItemProps {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly external?: boolean;
}

function ContactLinkItem({ href, icon, label, external }: ContactLinkItemProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 py-3 transition-colors"
      style={{ textDecoration: "none" }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span
        className="flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-[var(--accent)]"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid var(--surface-border)",
          color: "var(--accent)",
        }}
      >
        {icon}
      </span>
      <span
        className="transition-colors group-hover:text-[var(--text-primary)]"
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-heading)",
          fontSize: "0.9rem",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
    </a>
  );
}

export function Contact() {
  const [selected, setSelected] = useState<string>("hiring");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // BookCall modal state
  const now = new Date();
  const [showBookModal, setShowBookModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookTopic, setBookTopic] = useState("");
  const [bookStep, setBookStep] = useState<BookStep>("date");
  const [bookStatus, setBookStatus] = useState<FormStatus>("idle");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString("en", { month: "long", year: "numeric" });

  const isWeekend = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dow = date.getDay();
    return dow === 5 || dow === 6;
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
    setBookStep("time");
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    setBookStep("details");
  };

  const handleBookSubmit = useCallback(async () => {
    if (!bookName.trim() || !bookEmail.trim() || !selectedDate || !selectedTime) return;

    setBookStatus("loading");

    const dateStr = selectedDate.toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookName.trim(),
          email: bookEmail.trim(),
          message: `Meeting Request\nDate: ${dateStr}\nTime: ${selectedTime} GST\nTopic: ${bookTopic.trim() || "General discussion"}`,
          type: "meeting",
        }),
      });

      if (response.ok) {
        setBookStatus("success");
        setBookStep("success");
      } else {
        setBookStatus("error");
      }
    } catch {
      setBookStatus("error");
    }
  }, [bookName, bookEmail, bookTopic, selectedDate, selectedTime]);

  const resetBookModal = () => {
    setShowBookModal(false);
    setBookStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setBookName("");
    setBookEmail("");
    setBookTopic("");
    setBookStatus("idle");
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          type: selected,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg("Failed to send. Please try again or contact directly.");
      setStatus("error");
    }
  }, [name, email, message, selected]);

  return (
    <section
      className="relative pt-12 md:pt-16 pb-16 md:pb-24 px-4 md:px-6 overflow-hidden"
      id="contact"
    >
      <div className="max-w-6xl mx-auto w-full relative">
        {/* Two-column STITCH layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* LEFT -- Heading + Contact Links */}
          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              Let&apos;s{" "}
              <span
                style={{
                  color: "var(--accent)",
                  fontStyle: "italic",
                }}
              >
                Talk.
              </span>
            </h2>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                maxWidth: "400px",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
              }}
            >
              Whether you&apos;re hiring, looking for a freelancer, or just want to connect — I&apos;m always open to the right conversation.
            </p>

            {/* Contact links with circle icons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <ContactLinkItem
                href={`mailto:${personal.email}`}
                icon={<Mail size={16} />}
                label={personal.email}
              />
              <ContactLinkItem
                href={`tel:${personal.phone}`}
                icon={<Phone size={16} />}
                label={personal.phone}
              />
              <ContactLinkItem
                href={personal.whatsapp}
                icon={<MessageCircle size={16} />}
                label="Message on WhatsApp"
                external
              />
              <ContactLinkItem
                href={personal.linkedin}
                icon={<LinkedinIcon size={16} />}
                label="LinkedIn Profile"
                external
              />
            </div>
          </motion.div>

          {/* RIGHT -- Form Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.15}
            className="flex flex-col"
          >
            <div
              className="relative flex flex-col flex-1 overflow-hidden"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--surface-border)",
                borderTop: "3px solid var(--accent)",
                padding: "1.75rem 1.75rem 1.5rem",
              }}
            >

            {/* Success State */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 py-8 text-center flex-1"
              >
                <CheckCircle2 size={36} style={{ color: "var(--accent)" }} />
                <p
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                >
                  Message Sent!
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Thank you for reaching out. Mahmoud will get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    marginTop: "0.75rem",
                    color: "var(--accent)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                {/* Inquiry type */}
                <div>
                  <p
                    className="mb-3"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1.05rem",
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    What brings you here?
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {contactTypes.map((ct) => {
                      const isActive = selected === ct.type;
                      return (
                        <button
                          key={ct.type}
                          type="button"
                          onClick={() => setSelected(ct.type)}
                          style={{
                            padding: "0.3rem 0.7rem",
                            border: `1px solid ${isActive ? "var(--accent)" : "var(--surface-border)"}`,
                            background: isActive ? "var(--accent)" : "transparent",
                            color: isActive ? "var(--bg)" : "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            borderRadius: 0,
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.borderColor = "var(--accent)";
                              e.currentTarget.style.color = "var(--accent)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.borderColor = "var(--surface-border)";
                              e.currentTarget.style.color = "var(--text-muted)";
                            }
                          }}
                        >
                          {ct.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="contact-field"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="contact-field"
                  />
                </div>

                {/* Company + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Company"
                    className="contact-field"
                  />
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="Phone"
                    className="contact-field"
                  />
                </div>

                {/* Message */}
                <textarea
                  id="contact-message"
                  placeholder="Tell me about your project or opportunity..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="contact-field flex-1"
                  style={{ resize: "none", minHeight: "80px" }}
                />

                {status === "error" && errorMsg && (
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    {errorMsg}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary justify-center"
                    style={{
                      width: "100%",
                      padding: "0.7rem",
                      opacity: status === "loading" ? 0.7 : 1,
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowBookModal(true)}
                    className="btn-outline justify-center"
                    style={{ width: "100%", padding: "0.7rem" }}
                  >
                    <Calendar size={14} />
                    Book a Call
                  </button>
                </div>
              </form>
            )}
            </div>
            {/* end form card */}
          </motion.div>
        </div>
      </div>

      {/* BookCall Modal */}
      <AnimatePresence>
        {showBookModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 9999, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetBookModal}
          >
            <motion.div
              className="w-full max-w-md p-6 relative"
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
                <button onClick={resetBookModal} className="p-1 transition-colors hover:bg-[var(--surface-2)]">
                  <X size={18} style={{ color: "var(--text-muted)" }} />
                </button>
              </div>

              {/* Step indicators */}
              <div className="flex gap-1.5 justify-center mb-5">
                {["date", "time", "details"].map((s, i) => (
                  <div
                    key={s}
                    className="h-1.5 transition-all duration-300"
                    style={{
                      width: bookStep === s || (bookStep === "success" && i < 3) ? 24 : 8,
                      background: ["date", "time", "details", "success"].indexOf(bookStep) >= i
                        ? "var(--accent)"
                        : "var(--surface-border)",
                    }}
                  />
                ))}
              </div>

              {/* Step: Date */}
              {bookStep === "date" && (
                <div>
                  <p className="text-sm font-semibold text-center mb-4" style={{ color: "var(--text-primary)" }}>
                    Pick a Date
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2" style={{ border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}>
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{monthName}</span>
                    <button onClick={nextMonth} className="p-2" style={{ border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-xs py-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {d}
                      </div>
                    ))}
                  </div>

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
                          className="aspect-square text-sm font-medium transition-all duration-200"
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
              {bookStep === "time" && (
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
                        className="py-2.5 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
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
                    onClick={() => setBookStep("date")}
                    className="mt-4 text-xs w-full text-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    &larr; Back to calendar
                  </button>
                </div>
              )}

              {/* Step: Details */}
              {bookStep === "details" && (
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
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="contact-input"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={bookEmail}
                      onChange={(e) => setBookEmail(e.target.value)}
                      className="contact-input"
                    />
                    <input
                      type="text"
                      placeholder="Topic (optional)"
                      value={bookTopic}
                      onChange={(e) => setBookTopic(e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  {bookStatus === "error" && (
                    <p className="text-xs mt-3 text-center" style={{ color: "#ef4444" }}>
                      Failed to book. Please try again.
                    </p>
                  )}

                  <button
                    onClick={handleBookSubmit}
                    disabled={!bookName.trim() || !bookEmail.trim() || bookStatus === "loading"}
                    className="btn-primary w-full mt-5 justify-center"
                  >
                    {bookStatus === "loading" ? (
                      <><Loader2 size={15} className="animate-spin" /> Booking...</>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>

                  <button
                    onClick={() => setBookStep("time")}
                    className="mt-3 text-xs w-full text-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    &larr; Change time
                  </button>
                </div>
              )}

              {/* Step: Success */}
              {bookStep === "success" && (
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
    </section>
  );
}
