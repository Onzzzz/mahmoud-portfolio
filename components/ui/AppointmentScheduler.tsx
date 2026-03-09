"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "@/app/providers";
import {
  Calendar,
  X,
  Clock,
  User,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";
import { availabilityConfig } from "@/lib/data";

type Step = "date" | "time" | "details" | "confirm";

export default function AppointmentScheduler({ inline = false }: { inline?: boolean }) {
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Form state
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Calendar navigation — initialized in useEffect to avoid SSR mismatch
  const [calMonth, setCalMonth] = useState(0);
  const [calYear, setCalYear] = useState(2026);
  const [calReady, setCalReady] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCalMonth(now.getMonth());
    setCalYear(now.getFullYear());
    setCalReady(true);
  }, []);

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 640);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Close handler with animation
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setClosing(false);
    }, 300);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, handleClose]);

  const handleOpen = useCallback(() => {
    setModalOpen(true);
    setClosing(false);
    setStep("date");
    setSelectedDate(null);
    setSelectedTime("");
    setName("");
    setEmail("");
    setNotes("");
    setSubmitted(false);
    setError("");
  }, []);

  // Calendar data
  const calendarDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: { day: number; disabled: boolean; isToday: boolean }[] = [];

    // Empty slots for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0, disabled: true, isToday: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calYear, calMonth, d);
      const dayOfWeek = date.getDay();
      // Disable past dates and weekends (Friday=5, Saturday=6 for UAE)
      const isPast = date < today;
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
      const isToday = date.getTime() === today.getTime();
      days.push({ day: d, disabled: isPast || isWeekend, isToday });
    }

    return days;
  }, [calMonth, calYear]);

  const monthName = new Date(calYear, calMonth).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const canGoPrev = (() => {
    const now = new Date();
    return calYear > now.getFullYear() || (calYear === now.getFullYear() && calMonth > now.getMonth());
  })();

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !name || !email) return;

    setSubmitting(true);
    setError("");

    try {
      const dateStr = selectedDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          date: dateStr,
          time: selectedTime,
          notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Failed to send booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!availabilityConfig.available) {
    return null;
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    paddingLeft: 36,
    borderRadius: 10,
    border: `1px solid ${theme.accent}20`,
    background: theme.bg,
    color: theme.text,
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    color: theme.muted,
    pointerEvents: "none",
  };

  const stepIndicator = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "12px 0 4px",
      }}
    >
      {(["date", "time", "details"] as Step[]).map((s, i) => (
        <div
          key={s}
          style={{
            width: step === s ? 20 : 8,
            height: 8,
            borderRadius: 4,
            background:
              (["date", "time", "details"] as Step[]).indexOf(step) >= i
                ? theme.accent
                : `${theme.accent}25`,
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Inline booking section */}
      {inline && (
        <section
          id="booking"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: theme.accent,
              marginBottom: 10,
            }}
          >
            📅 Schedule a Meeting
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Let&apos;s Talk{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Strategy
            </span>
          </h2>
          <p
            style={{
              fontSize: 13,
              color: theme.muted,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto 28px",
            }}
          >
            Ready to discuss procurement optimization, supply chain strategy, or potential collaboration? Book a quick call.
          </p>
          <button
            onClick={handleOpen}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
              color: theme.btnText,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              boxShadow: `0 4px 24px ${theme.accent}35`,
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow = `0 8px 32px ${theme.accent}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accent}35`;
            }}
          >
            <Calendar size={18} />
            Book a Call
          </button>
        </section>
      )}

      {/* Modal Overlay */}
      {modalOpen && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            opacity: closing ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: isMobile ? "100%" : "min(90vw, 440px)",
              maxHeight: isMobile ? "100%" : "min(90vh, 620px)",
              borderRadius: isMobile ? 0 : 16,
              overflow: "hidden",
              background: theme.card,
              border: isMobile ? "none" : `1px solid ${theme.accent}25`,
              boxShadow: isMobile
                ? "none"
                : `0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px ${theme.accent}10`,
              transform: closing
                ? "scale(0.95) translateY(20px)"
                : "scale(1) translateY(0)",
              opacity: closing ? 0 : 1,
              transition:
                "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: `1px solid ${theme.accent}15`,
                background: theme.bg,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Calendar size={16} style={{ color: theme.accent }} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: theme.text,
                    letterSpacing: "0.02em",
                  }}
                >
                  {submitted ? "Booking Confirmed" : "Schedule a Meeting"}
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close scheduler"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: `1px solid ${theme.accent}20`,
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.muted,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${theme.accent}15`;
                  e.currentTarget.style.color = theme.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = theme.muted;
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 20px 20px",
              }}
            >
              {submitted ? (
                /* Success state */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                    textAlign: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: `${theme.accent}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={28} style={{ color: theme.accent }} />
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: theme.text,
                    }}
                  >
                    Booking Request Sent!
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: theme.muted,
                      lineHeight: 1.7,
                      maxWidth: 300,
                    }}
                  >
                    Mahmoud will review your request and confirm the meeting slot
                    via email shortly.
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      padding: "12px 16px",
                      borderRadius: 10,
                      background: theme.bg,
                      border: `1px solid ${theme.accent}15`,
                      fontSize: 12,
                      color: theme.soft,
                      lineHeight: 1.8,
                    }}
                  >
                    <div>
                      <strong style={{ color: theme.text }}>Date:</strong>{" "}
                      {selectedDate?.toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                    <div>
                      <strong style={{ color: theme.text }}>Time:</strong>{" "}
                      {selectedTime} (Dubai)
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    style={{
                      marginTop: 8,
                      padding: "10px 24px",
                      borderRadius: 10,
                      border: "none",
                      background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
                      color: theme.btnText,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {stepIndicator}

                  {/* Step 1: Pick a date */}
                  {step === "date" && (
                    <div style={{ paddingTop: 8 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: theme.text,
                          marginBottom: 14,
                          textAlign: "center",
                        }}
                      >
                        Pick a Date
                      </div>

                      {/* Month nav */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 12,
                        }}
                      >
                        <button
                          onClick={() => {
                            if (!canGoPrev) return;
                            if (calMonth === 0) {
                              setCalMonth(11);
                              setCalYear((y) => y - 1);
                            } else {
                              setCalMonth((m) => m - 1);
                            }
                          }}
                          disabled={!canGoPrev}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            border: `1px solid ${theme.accent}20`,
                            background: "transparent",
                            cursor: canGoPrev ? "pointer" : "not-allowed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: canGoPrev ? theme.soft : `${theme.muted}40`,
                            transition: "all 0.2s",
                          }}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: theme.text,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {monthName}
                        </span>
                        <button
                          onClick={() => {
                            if (calMonth === 11) {
                              setCalMonth(0);
                              setCalYear((y) => y + 1);
                            } else {
                              setCalMonth((m) => m + 1);
                            }
                          }}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            border: `1px solid ${theme.accent}20`,
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.soft,
                            transition: "all 0.2s",
                          }}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* Day names */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(7, 1fr)",
                          gap: 2,
                          marginBottom: 4,
                        }}
                      >
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (d) => (
                            <div
                              key={d}
                              style={{
                                textAlign: "center",
                                fontSize: 10,
                                color: theme.muted,
                                padding: "4px 0",
                                fontWeight: 500,
                              }}
                            >
                              {d}
                            </div>
                          )
                        )}
                      </div>

                      {/* Calendar grid */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(7, 1fr)",
                          gap: 2,
                        }}
                      >
                        {calendarDays.map((d, i) => {
                          if (d.day === 0)
                            return <div key={`empty-${i}`} />;
                          const isSelected =
                            selectedDate &&
                            selectedDate.getDate() === d.day &&
                            selectedDate.getMonth() === calMonth &&
                            selectedDate.getFullYear() === calYear;

                          return (
                            <button
                              key={d.day}
                              disabled={d.disabled}
                              onClick={() => {
                                setSelectedDate(
                                  new Date(calYear, calMonth, d.day)
                                );
                              }}
                              style={{
                                width: "100%",
                                aspectRatio: "1",
                                borderRadius: 8,
                                border: isSelected
                                  ? `2px solid ${theme.accent}`
                                  : d.isToday
                                  ? `1px solid ${theme.accent}40`
                                  : "1px solid transparent",
                                background: isSelected
                                  ? `${theme.accent}20`
                                  : "transparent",
                                color: d.disabled
                                  ? `${theme.muted}40`
                                  : isSelected
                                  ? theme.accent
                                  : theme.text,
                                fontSize: 12,
                                fontWeight: isSelected || d.isToday ? 600 : 400,
                                cursor: d.disabled
                                  ? "not-allowed"
                                  : "pointer",
                                transition: "all 0.2s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {d.day}
                            </button>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          fontSize: 10,
                          color: theme.muted,
                          textAlign: "center",
                          marginTop: 10,
                        }}
                      >
                        Timezone: {availabilityConfig.timezone} &middot;
                        Fri-Sat unavailable
                      </div>

                      <button
                        disabled={!selectedDate}
                        onClick={() => setStep("time")}
                        style={{
                          width: "100%",
                          marginTop: 14,
                          padding: "11px 0",
                          borderRadius: 10,
                          border: "none",
                          background: selectedDate
                            ? `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`
                            : `${theme.accent}20`,
                          color: selectedDate ? theme.btnText : theme.muted,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: selectedDate ? "pointer" : "not-allowed",
                          transition: "all 0.2s",
                          letterSpacing: "0.03em",
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  )}

                  {/* Step 2: Pick a time */}
                  {step === "time" && (
                    <div style={{ paddingTop: 8 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: theme.text,
                          marginBottom: 4,
                          textAlign: "center",
                        }}
                      >
                        Pick a Time
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: theme.muted,
                          textAlign: "center",
                          marginBottom: 16,
                        }}
                      >
                        {selectedDate?.toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: 8,
                        }}
                      >
                        {availabilityConfig.timeSlots.map((t) => {
                          const isSelected = selectedTime === t;
                          return (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              style={{
                                padding: "12px 0",
                                borderRadius: 10,
                                border: isSelected
                                  ? `2px solid ${theme.accent}`
                                  : `1px solid ${theme.accent}20`,
                                background: isSelected
                                  ? `${theme.accent}20`
                                  : theme.bg,
                                color: isSelected ? theme.accent : theme.soft,
                                fontSize: 13,
                                fontWeight: isSelected ? 600 : 400,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6,
                              }}
                            >
                              <Clock size={14} />
                              {t}
                            </button>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          marginTop: 16,
                        }}
                      >
                        <button
                          onClick={() => setStep("date")}
                          style={{
                            flex: 1,
                            padding: "11px 0",
                            borderRadius: 10,
                            border: `1px solid ${theme.accent}20`,
                            background: "transparent",
                            color: theme.soft,
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          Back
                        </button>
                        <button
                          disabled={!selectedTime}
                          onClick={() => setStep("details")}
                          style={{
                            flex: 2,
                            padding: "11px 0",
                            borderRadius: 10,
                            border: "none",
                            background: selectedTime
                              ? `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`
                              : `${theme.accent}20`,
                            color: selectedTime ? theme.btnText : theme.muted,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: selectedTime ? "pointer" : "not-allowed",
                            transition: "all 0.2s",
                            letterSpacing: "0.03em",
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Your details */}
                  {step === "details" && (
                    <div style={{ paddingTop: 8 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: theme.text,
                          marginBottom: 4,
                          textAlign: "center",
                        }}
                      >
                        Your Details
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: theme.muted,
                          textAlign: "center",
                          marginBottom: 16,
                        }}
                      >
                        {selectedDate?.toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        at {selectedTime}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        {/* Name */}
                        <div style={{ position: "relative" }}>
                          <User size={14} style={iconStyle} />
                          <input
                            placeholder="Your name *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            onFocus={(e) =>
                              (e.currentTarget.style.borderColor = `${theme.accent}60`)
                            }
                            onBlur={(e) =>
                              (e.currentTarget.style.borderColor = `${theme.accent}20`)
                            }
                          />
                        </div>

                        {/* Email */}
                        <div style={{ position: "relative" }}>
                          <Mail size={14} style={iconStyle} />
                          <input
                            type="email"
                            placeholder="Your email *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            onFocus={(e) =>
                              (e.currentTarget.style.borderColor = `${theme.accent}60`)
                            }
                            onBlur={(e) =>
                              (e.currentTarget.style.borderColor = `${theme.accent}20`)
                            }
                          />
                        </div>

                        {/* Notes */}
                        <div style={{ position: "relative" }}>
                          <FileText
                            size={14}
                            style={{ ...iconStyle, top: 20 }}
                          />
                          <textarea
                            placeholder="What would you like to discuss? (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            style={{
                              ...inputStyle,
                              resize: "none",
                              lineHeight: 1.6,
                            }}
                            onFocus={(e) =>
                              (e.currentTarget.style.borderColor = `${theme.accent}60`)
                            }
                            onBlur={(e) =>
                              (e.currentTarget.style.borderColor = `${theme.accent}20`)
                            }
                          />
                        </div>
                      </div>

                      {error && (
                        <div
                          style={{
                            marginTop: 10,
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: "#ff4d4f15",
                            border: "1px solid #ff4d4f30",
                            color: "#ff7875",
                            fontSize: 12,
                          }}
                        >
                          {error}
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          marginTop: 16,
                        }}
                      >
                        <button
                          onClick={() => setStep("time")}
                          style={{
                            flex: 1,
                            padding: "11px 0",
                            borderRadius: 10,
                            border: `1px solid ${theme.accent}20`,
                            background: "transparent",
                            color: theme.soft,
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          Back
                        </button>
                        <button
                          disabled={!name || !email || submitting}
                          onClick={handleSubmit}
                          style={{
                            flex: 2,
                            padding: "11px 0",
                            borderRadius: 10,
                            border: "none",
                            background:
                              name && email
                                ? `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`
                                : `${theme.accent}20`,
                            color:
                              name && email ? theme.btnText : theme.muted,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor:
                              name && email && !submitting
                                ? "pointer"
                                : "not-allowed",
                            transition: "all 0.2s",
                            letterSpacing: "0.03em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                          }}
                        >
                          {submitting ? (
                            <>
                              <Loader2
                                size={14}
                                style={{ animation: "spin 1s linear infinite" }}
                              />
                              Sending...
                            </>
                          ) : (
                            "Book Meeting"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
