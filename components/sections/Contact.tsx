"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { smartContactFields } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import Briefcase from "lucide-react/dist/esm/icons/briefcase";
import LineChart from "lucide-react/dist/esm/icons/line-chart";
import Users from "lucide-react/dist/esm/icons/users";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Send from "lucide-react/dist/esm/icons/send";
import CheckCircle from "lucide-react/dist/esm/icons/check-circle";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  LineChart,
  Users,
  MessageCircle,
};

type FormData = Record<string, string>;

export default function Contact() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: selectedType,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(3);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setStep(1);
          setSelectedType(null);
          setForm({ name: "", email: "", message: "" });
        }, 4000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again or reach out via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const selectType = (type: string) => {
    setSelectedType(type);
    setStep(2);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    background: theme.input,
    border: `1px solid ${theme.accent}1F`,
    borderRadius: 7,
    color: theme.text,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.3s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 9,
    textTransform: "uppercase",
    color: theme.muted,
    letterSpacing: 1.5,
    marginBottom: 6,
  };

  const selectedConfig = selectedType
    ? smartContactFields[selectedType as keyof typeof smartContactFields]
    : null;

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "80px 24px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <SectionLabel text="Contact" />

      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 36px)",
          fontWeight: 700,
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        <span style={{ color: theme.text }}>Let&apos;s </span>
        <span
          style={{
            backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Connect
        </span>
      </h2>

      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 28 }}>
        {step === 1
          ? "I want to..."
          : step === 3
          ? ""
          : `${selectedConfig?.label} \u2014 Tell me more`}
      </p>

      {/* Step 3: Success */}
      {step === 3 && submitted && (
        <div
          style={{
            textAlign: "center",
            padding: "48px 24px",
            background: theme.card,
            border: `1px solid ${theme.accent}30`,
            borderRadius: 12,
            backdropFilter: "blur(10px)",
          }}
        >
          <CheckCircle
            size={40}
            style={{ color: theme.accent, marginBottom: 16 }}
          />
          <div style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 8 }}>
            Message Sent!
          </div>
          <div style={{ fontSize: 13, color: theme.muted }}>
            Thank you, {form.name || "there"}! I&apos;ll get back to you soon.
          </div>
        </div>
      )}

      {/* Step 1: Type selector */}
      {step === 1 && !submitted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
          className="contact-types"
        >
          {Object.entries(smartContactFields).map(([key, config]) => {
            const Icon = iconMap[config.icon] || MessageCircle;
            return (
              <button
                key={key}
                onClick={() => selectType(key)}
                style={{
                  background: theme.card,
                  border: `1px solid ${theme.accent}1F`,
                  borderRadius: 10,
                  padding: "24px 16px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  textAlign: "center",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${theme.accent}4D`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${theme.accent}1F`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon size={20} style={{ color: theme.accent, opacity: 0.7 }} />
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: theme.text,
                  }}
                >
                  {config.label}
                </div>
                <div style={{ fontSize: 10, color: theme.muted, lineHeight: 1.4 }}>
                  {config.desc}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2: Smart Form */}
      {step === 2 && selectedConfig && !submitted && (
        <div>
          <button
            onClick={() => { setStep(1); setSelectedType(null); }}
            style={{
              background: "none",
              border: "none",
              color: theme.accent,
              fontSize: 13,
              cursor: "pointer",
              marginBottom: 20,
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ArrowLeft size={14} /> Back
          </button>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Always: Name + Email in row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; }}
                />
              </div>
            </div>

            {/* Dynamic fields based on type */}
            {selectedConfig.fields.map((field) => (
              <div key={field.name}>
                <label style={labelStyle}>{field.label}</label>
                {field.type === "text" && (
                  <input
                    type="text"
                    value={form[field.name] || ""}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; }}
                  />
                )}
                {field.type === "select" && "options" in field && (
                  <select
                    value={form[field.name] || ""}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; }}
                  >
                    <option value="" style={{ background: theme.bg, color: theme.muted }}>Select...</option>
                    {field.options!.map((opt) => (
                      <option key={opt} value={opt} style={{ background: theme.bg, color: theme.text }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "textarea" && (
                  <textarea
                    rows={3}
                    value={form[field.name] || ""}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; }}
                  />
                )}
              </div>
            ))}

            {/* Always: Message */}
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; }}
              />
            </div>

            {/* Error message */}
            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: 7,
                  color: "#ef4444",
                  fontSize: 13,
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 28px",
                borderRadius: 7,
                border: "none",
                background: loading
                  ? `${theme.accent}80`
                  : `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
                color: theme.btnText,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: `0 4px 24px ${theme.accent}40`,
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.accent}60`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accent}40`;
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="spin-icon" /> Sending...
                </>
              ) : (
                <>
                  <Send size={13} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .contact-types {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
}
