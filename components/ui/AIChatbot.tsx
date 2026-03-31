"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/lib/theme-context";
import { Bot, X, Send, Minimize2, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
  topicId?: string;
  language?: string;
  source?: string;
  timestamp?: number;
};

const quickActions = [
  { en: "Who is Mahmoud?", ar: "مين أونز؟" },
  { en: "Experience", ar: "الخبرة" },
  { en: "Skills", ar: "المهارات" },
  { en: "Services", ar: "الخدمات" },
  { en: "Contact", ar: "تواصل" },
];

// Simple markdown renderer for bold, italic, links, and line breaks
function renderMarkdown(text: string, isRTL: boolean) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Process inline markdown
    const parts: (string | React.ReactElement)[] = [];
    let remaining = line;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Italic: *text*
      const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
      // Link: [text](url)
      const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

      // Find the earliest match
      const matches = [
        boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
        italicMatch ? { type: "italic", index: italicMatch.index!, match: italicMatch } : null,
        linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
      ].filter(Boolean) as { type: string; index: number; match: RegExpMatchArray }[];

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      matches.sort((a, b) => a.index - b.index);
      const first = matches[0];

      // Add text before the match
      if (first.index > 0) {
        parts.push(remaining.substring(0, first.index));
      }

      if (first.type === "bold") {
        parts.push(<strong key={`b${keyIdx++}`} style={{ fontWeight: 700, color: "inherit" }}>{first.match[1]}</strong>);
        remaining = remaining.substring(first.index + first.match[0].length);
      } else if (first.type === "italic") {
        parts.push(<em key={`i${keyIdx++}`} style={{ fontStyle: "italic", opacity: 0.9 }}>{first.match[1]}</em>);
        remaining = remaining.substring(first.index + first.match[0].length);
      } else if (first.type === "link") {
        parts.push(
          <a
            key={`l${keyIdx++}`}
            href={first.match[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline", opacity: 0.9 }}
          >
            {first.match[1]}
          </a>
        );
        remaining = remaining.substring(first.index + first.match[0].length);
      }
    }

    // Handle horizontal rule
    if (line.trim() === "---") {
      return <hr key={i} style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "8px 0" }} />;
    }

    // Empty line = spacing
    if (line.trim() === "") {
      return <div key={i} style={{ height: 6 }} />;
    }

    return (
      <div key={i} style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}>
        {parts}
      </div>
    );
  });
}

export default function AIChatbot() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! 👋 I'm **Onz AI** — Mahmoud built me to help you learn about his experience, skills, and services. Ask me anything!",
      topicId: "",
      language: "en",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastTopicId, setLastTopicId] = useState("");
  const [latestSuggestions, setLatestSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && !minimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      // Simulate typing delay for natural feel (500-1200ms)
      const delay = 500 + Math.random() * 700;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            lastTopicId,
            history: messages
              .filter((m) => m.role === "user" || m.role === "assistant")
              .slice(-10)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await res.json();

        await new Promise((r) => setTimeout(r, delay));

        const assistantMsg: Message = {
          role: "assistant",
          content: data.response,
          topicId: data.topicId,
          language: data.language,
          suggestions: data.suggestions,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setLastTopicId(data.topicId || "");
        setLatestSuggestions(data.suggestions || []);
      } catch {
        await new Promise((r) => setTimeout(r, delay));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong. Try again, or reach Onz at **mahmoudf.abdallah@outlook.com** 📧",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, lastTopicId]
  );

  // Detect if text has Arabic characters
  const isArabicText = (text: string) => {
    const arabicChars = text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g);
    return !!arabicChars && arabicChars.length > text.length * 0.15;
  };

  if (!open) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 45,
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        {/* Whole bot container — floating */}
        <div style={{ animation: "botFloat 3s ease-in-out infinite", position: "relative" }}>

          {/* Speech bubble */}
          <div style={{
            position: "absolute",
            top: -6,
            left: 52,
            background: theme.card,
            border: `1px solid ${theme.accent}35`,
            borderRadius: "10px 10px 10px 2px",
            padding: "4px 8px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            animation: "botBubblePulse 4s ease-in-out infinite",
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: theme.accent }}>
              Ask me! 💬
            </span>
          </div>

          {/* Robot SVG — detailed 3D character */}
          <svg width="64" height="84" viewBox="0 0 80 105" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ filter: `drop-shadow(0 8px 20px ${theme.accent}35)`, transition: "transform 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <defs>
              {/* 3D gradient for head */}
              <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.accentLight} />
                <stop offset="100%" stopColor={theme.accent} />
              </linearGradient>
              {/* Body gradient */}
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.accent} />
                <stop offset="100%" stopColor={theme.accent} stopOpacity="0.8" />
              </linearGradient>
              {/* Screen gradient */}
              <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.isDark ? "#1a1f2e" : "#f0efe9"} />
                <stop offset="100%" stopColor={theme.isDark ? "#0d1117" : "#e8e6de"} />
              </linearGradient>
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* === ANTENNA === */}
            <rect x="38" y="4" width="4" height="14" rx="2" fill={theme.accent} opacity="0.6" />
            <circle cx="40" cy="4" r="5" fill={theme.accentLight} filter="url(#glow)">
              <animate attributeName="r" values="4;5.5;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* === HEAD === */}
            <rect x="12" y="18" width="56" height="38" rx="12" fill="url(#headGrad)" />
            {/* Head 3D highlight */}
            <rect x="14" y="20" width="52" height="16" rx="10" fill="white" opacity="0.15" />
            {/* Head bottom shadow */}
            <rect x="16" y="48" width="48" height="4" rx="2" fill="black" opacity="0.08" />

            {/* Ear bolts */}
            <circle cx="12" cy="36" r="4" fill={theme.accent} />
            <circle cx="12" cy="36" r="2" fill={theme.accentLight} opacity="0.5" />
            <circle cx="68" cy="36" r="4" fill={theme.accent} />
            <circle cx="68" cy="36" r="2" fill={theme.accentLight} opacity="0.5" />

            {/* === FACE SCREEN === */}
            <rect x="18" y="24" width="44" height="26" rx="8" fill="url(#screenGrad)" />
            {/* Screen inner border */}
            <rect x="19" y="25" width="42" height="24" rx="7" fill="none" stroke={theme.accent} strokeWidth="0.5" opacity="0.3" />

            {/* Left eye */}
            <ellipse cx="30" cy="35" rx="5" ry="5.5" fill={theme.accentLight}>
              <animate attributeName="ry" values="5.5;0.8;5.5" dur="5s" repeatCount="indefinite" begin="2s"
                keyTimes="0;0.02;0.04;1" />
            </ellipse>
            <circle cx="31.5" cy="33.5" r="2" fill="white" opacity="0.8" />
            <circle cx="28" cy="36" r="1" fill="white" opacity="0.4" />

            {/* Right eye */}
            <ellipse cx="50" cy="35" rx="5" ry="5.5" fill={theme.accentLight}>
              <animate attributeName="ry" values="5.5;0.8;5.5" dur="5s" repeatCount="indefinite" begin="2.1s"
                keyTimes="0;0.02;0.04;1" />
            </ellipse>
            <circle cx="51.5" cy="33.5" r="2" fill="white" opacity="0.8" />
            <circle cx="48" cy="36" r="1" fill="white" opacity="0.4" />

            {/* Mouth — friendly smile */}
            <path d="M33 43 Q40 48 47 43" stroke={theme.accentLight} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Cheek blush */}
            <circle cx="25" cy="41" r="3" fill={theme.accentLight} opacity="0.15" />
            <circle cx="55" cy="41" r="3" fill={theme.accentLight} opacity="0.15" />

            {/* === NECK === */}
            <rect x="34" y="56" width="12" height="6" rx="2" fill={theme.accent} opacity="0.7" />

            {/* === BODY === */}
            <rect x="18" y="60" width="44" height="24" rx="8" fill="url(#bodyGrad)" />
            {/* Body highlight */}
            <rect x="20" y="62" width="40" height="10" rx="6" fill="white" opacity="0.1" />
            {/* Chest panel */}
            <rect x="30" y="65" width="20" height="12" rx="4" fill={theme.isDark ? "#0d1117" : "#e8e6de"} opacity="0.5" />
            {/* Heart/power core */}
            <circle cx="40" cy="71" r="3.5" fill={theme.accentLight} opacity="0.9">
              <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
            {/* Body rivets */}
            <circle cx="24" cy="72" r="1.5" fill={theme.accentLight} opacity="0.3" />
            <circle cx="56" cy="72" r="1.5" fill={theme.accentLight} opacity="0.3" />

            {/* === LEFT ARM — resting === */}
            <g>
              <rect x="4" y="62" width="12" height="7" rx="3.5" fill={theme.accent} />
              <rect x="2" y="66" width="8" height="10" rx="3" fill={theme.accent} opacity="0.85" />
              {/* Hand */}
              <circle cx="6" cy="77" r="4" fill={theme.accentLight} opacity="0.7" />
              <rect x="3" y="75" width="2" height="4" rx="1" fill={theme.accentLight} opacity="0.5" />
              <rect x="7" y="75" width="2" height="4" rx="1" fill={theme.accentLight} opacity="0.5" />
            </g>

            {/* === RIGHT ARM — waving === */}
            <g style={{ transformOrigin: "64px 65px", animation: "botArmWave 2.5s ease-in-out infinite" }}>
              <rect x="64" y="62" width="12" height="7" rx="3.5" fill={theme.accent} />
              <rect x="70" y="56" width="8" height="12" rx="3" fill={theme.accent} opacity="0.85" />
              {/* Hand */}
              <circle cx="74" cy="54" r="4.5" fill={theme.accentLight} opacity="0.8" />
              {/* Fingers */}
              <rect x="71" y="49" width="2" height="4" rx="1" fill={theme.accentLight} opacity="0.6" />
              <rect x="74.5" y="49" width="2" height="3.5" rx="1" fill={theme.accentLight} opacity="0.6" />
            </g>

            {/* === LEGS (dangling over saucer) === */}
            <rect x="26" y="84" width="8" height="6" rx="3" fill={theme.accent} opacity="0.75" />
            <rect x="46" y="84" width="8" height="6" rx="3" fill={theme.accent} opacity="0.75" />

            {/* === FLYING SAUCER DISC === */}
            {/* Disc main body */}
            <ellipse cx="40" cy="93" rx="32" ry="6" fill={theme.accent} opacity="0.6" />
            {/* Disc top surface — lighter */}
            <ellipse cx="40" cy="91.5" rx="28" ry="5" fill={theme.accentLight} opacity="0.45" />
            {/* Disc 3D highlight */}
            <ellipse cx="40" cy="89.5" rx="22" ry="3" fill="white" opacity="0.18" />
            {/* Disc rim — dark edge */}
            <ellipse cx="40" cy="94" rx="30" ry="3" fill="black" opacity="0.08" />

            {/* Disc rim lights — bigger and brighter */}
            <circle cx="16" cy="92" r="2.5" fill={theme.accentLight}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="28" cy="95" r="2" fill={theme.accentLight}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.25s" />
            </circle>
            <circle cx="40" cy="96" r="2" fill={theme.accentLight}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="52" cy="95" r="2" fill={theme.accentLight}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.75s" />
            </circle>
            <circle cx="64" cy="92" r="2.5" fill={theme.accentLight}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="1s" />
            </circle>

            {/* Ground shadow below saucer */}
            <ellipse cx="40" cy="103" rx="20" ry="2.5" fill={theme.accent} opacity="0.12">
              <animate attributeName="rx" values="20;15;20" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.12;0.06;0.12" dur="3s" repeatCount="indefinite" />
            </ellipse>
          </svg>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes botFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes botArmWave {
            0%, 55%, 100% { transform: rotate(0deg); }
            10%, 30% { transform: rotate(-20deg); }
            20% { transform: rotate(10deg); }
            40% { transform: rotate(-15deg); }
          }
          @keyframes botBubblePulse {
            0%, 100% { opacity: 1; transform: translateY(0) scale(1); }
            50% { opacity: 0.8; transform: translateY(-3px) scale(0.97); }
          }
          @keyframes botAntennaGlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (minimized) {
    return (
      <div
        onClick={() => setMinimized(false)}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          padding: "10px 16px",
          borderRadius: 12,
          background: theme.card,
          border: `1px solid ${theme.accent}30`,
          backdropFilter: "blur(16px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 45,
          transition: "all 0.3s",
        }}
      >
        <Bot size={16} style={{ color: theme.accent }} />
        <span style={{ fontSize: 11, color: theme.soft }}>Onz</span>
        <div
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }}
          className="animate-pulse-dot"
        />
      </div>
    );
  }

  const showQuickActions = messages.length <= 1 && !loading;
  const showSuggestions = !showQuickActions && latestSuggestions.length > 0 && !loading;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        width: 370,
        maxHeight: 520,
        borderRadius: 16,
        background: theme.bg,
        border: `1px solid ${theme.accent}25`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.4)`,
        display: "flex",
        flexDirection: "column",
        zIndex: 45,
        overflow: "hidden",
      }}
      className="chatbot-panel"
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.accent}1F`,
          background: theme.card,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bot size={14} style={{ color: theme.accent }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>Onz AI</span>
            <span style={{ fontSize: 9, color: theme.muted, fontWeight: 400 }}>Mahmoud&apos;s AI Assistant</span>
          </div>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => setMinimized(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: theme.muted }}
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: theme.muted }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxHeight: 340,
        }}
      >
        {messages.map((msg, i) => {
          const isRTL = msg.language === "ar" || isArabicText(msg.content);
          return (
            <div
              key={i}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "8px 12px",
                borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background: msg.role === "user" ? `${theme.accent}20` : theme.card,
                border: `1px solid ${theme.accent}${msg.role === "user" ? "30" : "15"}`,
                fontSize: 12,
                color: theme.soft,
                lineHeight: 1.7,
                direction: msg.role === "assistant" && isRTL ? "rtl" : "ltr",
                textAlign: msg.role === "assistant" && isRTL ? "right" : "left",
              }}
            >
              {msg.role === "assistant" ? renderMarkdown(msg.content, isRTL) : msg.content}
            </div>
          );
        })}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: "12px 12px 12px 2px",
              background: theme.card,
              border: `1px solid ${theme.accent}15`,
              fontSize: 12,
              color: theme.muted,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span className="chatbot-typing-dot" style={{ animationDelay: "0ms" }} />
            <span className="chatbot-typing-dot" style={{ animationDelay: "200ms" }} />
            <span className="chatbot-typing-dot" style={{ animationDelay: "400ms" }} />
          </div>
        )}
      </div>

      {/* Quick Actions (initial state) */}
      {showQuickActions && (
        <div style={{ padding: "4px 14px 8px", display: "flex", flexWrap: "wrap", gap: 5 }}>
          {quickActions.map((action) => (
            <button
              key={action.en}
              onClick={() => sendMessage(action.en)}
              style={{
                padding: "4px 10px",
                borderRadius: 20,
                border: `1px solid ${theme.accent}25`,
                background: `${theme.accent}08`,
                color: theme.accent,
                fontSize: 10,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${theme.accent}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${theme.accent}08`;
              }}
            >
              {action.en}
            </button>
          ))}
        </div>
      )}

      {/* Dynamic Suggestions (after responses) */}
      {showSuggestions && (
        <div style={{ padding: "4px 14px 6px", display: "flex", flexWrap: "wrap", gap: 5 }}>
          {latestSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{
                padding: "3px 9px",
                borderRadius: 16,
                border: `1px solid ${theme.accent}20`,
                background: `${theme.accent}06`,
                color: theme.accent,
                fontSize: 9,
                cursor: "pointer",
                transition: "all 0.2s",
                opacity: 0.8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${theme.accent}15`;
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${theme.accent}06`;
                e.currentTarget.style.opacity = "0.8";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        style={{
          padding: "10px 14px",
          borderTop: `1px solid ${theme.accent}1F`,
          display: "flex",
          gap: 8,
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask about Mahmoud... | ...اسأل عن محمود"
          dir="auto"
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: `1px solid ${theme.accent}20`,
            background: theme.input,
            color: theme.text,
            fontSize: 12,
            outline: "none",
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: "none",
            background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
            color: theme.btnText,
            cursor: loading || !input.trim() ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: loading || !input.trim() ? 0.4 : 1,
          }}
        >
          <Send size={14} />
        </button>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .chatbot-panel {
            width: calc(100vw - 32px) !important;
            left: 16px !important;
            bottom: 16px !important;
            max-height: 70vh !important;
          }
        }
        .chatbot-typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${theme.muted};
          animation: chatbot-bounce 1.2s infinite ease-in-out;
        }
        @keyframes chatbot-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
