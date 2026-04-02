"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, Loader2, CheckCircle2, Download } from "lucide-react";
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

interface ContactLinkProps {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly external?: boolean;
}

function ContactLink({ href, icon, label, external }: ContactLinkProps) {
  return (
    <a
      href={href}
      className="contact-link flex items-center gap-3"
      style={{ textDecoration: "none" }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="contact-link-icon" style={{ color: "var(--accent)", flexShrink: 0, transition: "color 0.2s" }}>
        {icon}
      </span>
      <span
        className="contact-link-label"
        style={{
          color: "var(--text-secondary)",
          transition: "color 0.2s",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>
    </a>
  );
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [selected, setSelected] = useState<string>("hiring");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      className="relative pt-24 md:pt-32 pb-4 md:pb-6 px-4 md:px-6 overflow-hidden"
      id="contact"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
        >
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <span className="section-label mb-3 block">Contact</span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: "-0.025em",
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                }}
              >
                Let&apos;s Build
                <br />
                <span style={{ color: "var(--accent)" }}>Something</span>
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  maxWidth: "420px",
                  lineHeight: 1.6,
                }}
              >
                Whether you&apos;re hiring, consulting, or just want to connect
              </p>
            </div>
            {/* Decorative number */}
            <div
              className="deco-num hidden md:block"
              aria-hidden
              style={{ lineHeight: 0.85, marginTop: "-0.5rem" }}
            >
              07
            </div>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-14">
          {/* LEFT — Contact type selector + Form */}
          <motion.div
            className="md:col-span-3 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.1}
          >
            {/* 2x2 contact type grid */}
            <div className="grid grid-cols-2 gap-3">
              {contactTypes.map((ct) => {
                const isSelected = selected === ct.type;
                return (
                  <button
                    key={ct.type}
                    onClick={() => setSelected(ct.type)}
                    className="card text-left p-4 cursor-pointer"
                    aria-selected={isSelected}
                    style={{
                      background: isSelected
                        ? "var(--accent-muted)"
                        : "var(--card-bg)",
                      borderColor: isSelected
                        ? "var(--accent)"
                        : "var(--surface-border)",
                      transform: "none",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        color: isSelected ? "var(--accent)" : "var(--text-primary)",
                        marginBottom: "0.25rem",
                        transition: "color 0.2s",
                      }}
                    >
                      {ct.label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {ct.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Success State */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 py-12 text-center"
              >
                <CheckCircle2 size={40} style={{ color: "var(--accent)" }} />
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
                  className="btn-outline mt-4"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="contact-input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Your Message"
                    rows={5}
                    className="contact-input resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Error message */}
                {status === "error" && errorMsg && (
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    {errorMsg}
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* RIGHT — Direct contact links */}
          <motion.div
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.2}
          >
            {/* Thin divider visible on desktop */}
            <div
              className="hidden md:block mb-8"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, var(--surface-border), transparent)",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1.75rem",
              }}
            >
              Or reach out directly
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <ContactLink
                href={`mailto:${personal.email}`}
                icon={<Mail size={16} />}
                label={personal.email}
              />
              <ContactLink
                href={`tel:${personal.phone}`}
                icon={<Phone size={16} />}
                label={personal.phone}
              />
              <ContactLink
                href={personal.whatsapp}
                icon={<MessageCircle size={16} />}
                label="Message on WhatsApp"
                external
              />
              <ContactLink
                href={personal.linkedin}
                icon={<LinkedinIcon size={16} />}
                label="LinkedIn Profile"
                external
              />
              <ContactLink
                href="#"
                icon={<MapPin size={16} />}
                label={personal.location}
              />
            </div>
          </motion.div>
        </div>

        {/* Download CV — bottom of contact */}
        <motion.div
          className="mt-6 pt-4 text-center"
          style={{ borderTop: "1px solid var(--surface-border)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0.3}
        >
          <p
            className="text-sm mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Prefer a traditional resume?
          </p>
          <a
            href="/Mahmoud_Abdallah.pdf"
            download
            className="btn-outline"
          >
            <Download size={15} />
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}

