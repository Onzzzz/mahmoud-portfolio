"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/app/providers";
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
      content: "Hey! 👋 I'm **Onz AI** — ask me anything about Mahmoud's experience, skills, services, or how to get in touch!",
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
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 20px ${theme.accent}40`,
          transition: "all 0.3s",
          zIndex: 45,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Bot size={22} style={{ color: theme.btnText }} />
      </button>
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
          placeholder="Ask about Mahmoud... | اسأل عن أونز"
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
