"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
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
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay },
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
      className="flex items-center gap-3"
      style={{ textDecoration: "none" }}
      onMouseEnter={(e) => {
        const spans = e.currentTarget.querySelectorAll("span");
        spans.forEach((s) => {
          (s as HTMLElement).style.color = "var(--text-primary)";
        });
      }}
      onMouseLeave={(e) => {
        const spans = e.currentTarget.querySelectorAll("span");
        (spans[0] as HTMLElement).style.color = "var(--accent)";
        (spans[1] as HTMLElement).style.color = "var(--text-secondary)";
      }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span style={{ color: "var(--accent)", flexShrink: 0, transition: "color 0.2s" }}>
        {icon}
      </span>
      <span
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

export function Contact() {
  const [selected, setSelected] = useState<string>("hiring");

  return (
    <section
      className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden"
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
          background: "radial-gradient(circle, rgba(200,151,58,0.04) 0%, transparent 70%)",
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
              06
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

            {/* Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField type="text" placeholder="Your Name" />
                <InputField type="email" placeholder="Your Email" />
              </div>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="resize-none"
                style={inputStyle}
                onFocus={(e) => applyFocusStyle(e.currentTarget)}
                onBlur={(e) => removeFocusStyle(e.currentTarget)}
              />
              <div>
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
              </div>
            </form>
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
                label="WhatsApp"
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
      </div>
    </section>
  );
}

/* ---- Helpers ---- */

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--surface-border)",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

function applyFocusStyle(el: HTMLElement) {
  el.style.outline = "1px solid var(--accent)";
  el.style.borderColor = "var(--accent)";
  el.style.boxShadow = "0 0 0 3px var(--accent-muted)";
}

function removeFocusStyle(el: HTMLElement) {
  el.style.outline = "none";
  el.style.borderColor = "var(--surface-border)";
  el.style.boxShadow = "none";
}

interface InputFieldProps {
  readonly type: string;
  readonly placeholder: string;
}

function InputField({ type, placeholder }: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={(e) => applyFocusStyle(e.currentTarget)}
      onBlur={(e) => removeFocusStyle(e.currentTarget)}
    />
  );
}
