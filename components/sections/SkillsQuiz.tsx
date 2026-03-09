"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { ClipboardCheck, ChevronRight, RotateCcw } from "lucide-react";

type Category = "procurement" | "automation" | "erp" | "tender";
type Answer = { text: string; points: Partial<Record<Category, number>> };
type Question = { question: string; answers: Answer[] };

const questions: Question[] = [
  {
    question: "How does your team currently handle purchase orders?",
    answers: [
      { text: "Email & WhatsApp", points: { procurement: 1 } },
      { text: "Spreadsheets", points: { automation: 1 } },
      { text: "ERP system", points: { erp: 1 } },
      { text: "We don\u2019t have a process", points: { procurement: 1, automation: 1 } },
    ],
  },
  {
    question: "How many suppliers does your company manage?",
    answers: [
      { text: "Less than 10", points: { procurement: 1 } },
      { text: "10\u201350", points: { erp: 1 } },
      { text: "50+", points: { erp: 1, automation: 1 } },
      { text: "We don\u2019t track this", points: { procurement: 1, automation: 1 } },
    ],
  },
  {
    question: "Do you have documented SOPs for procurement?",
    answers: [
      { text: "What\u2019s an SOP?", points: { procurement: 1, automation: 1 } },
      { text: "Some, but outdated", points: { procurement: 1 } },
      { text: "Yes, comprehensive", points: { erp: 1 } },
      { text: "We\u2019re working on it", points: { procurement: 1 } },
    ],
  },
  {
    question: "How do you find government tenders?",
    answers: [
      { text: "We don\u2019t", points: { tender: 1 } },
      { text: "Manual portal checks", points: { automation: 1, tender: 1 } },
      { text: "We have a system", points: { automation: 1 } },
      { text: "Not relevant to us", points: {} },
    ],
  },
  {
    question: "What\u2019s your biggest operational pain point?",
    answers: [
      { text: "Everything is manual", points: { automation: 1 } },
      { text: "No visibility into costs", points: { erp: 1, procurement: 1 } },
      { text: "Supplier management", points: { procurement: 1 } },
      { text: "Compliance & governance", points: { procurement: 1 } },
    ],
  },
];

const resultsMeta: Record<Category, { title: string; desc: string; icon: string }> = {
  procurement: {
    title: "Strategic Procurement Setup",
    desc: "Your business needs a structured procurement function \u2014 from supplier qualification to PO workflows. I can set up the entire process and train your team.",
    icon: "\uD83D\uDCCB",
  },
  automation: {
    title: "Process Automation",
    desc: "You\u2019re losing time on repetitive tasks. I can automate your workflows using n8n, custom integrations, and smart alerts to free up your team.",
    icon: "\u26A1",
  },
  erp: {
    title: "ERP Implementation",
    desc: "Your operations need a central system. I can implement and customize an ERP solution tailored to your industry and processes.",
    icon: "\uD83D\uDDA5\uFE0F",
  },
  tender: {
    title: "Tender Management",
    desc: "You\u2019re missing government and private sector tender opportunities. I can set up tender tracking, bid preparation, and compliance workflows.",
    icon: "\uD83D\uDCC4",
  },
};

export default function SkillsQuiz() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Category, number>>({
    procurement: 0, automation: 0, erp: 0, tender: 0,
  });
  const [done, setDone] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"in" | "out">("in");

  const total = questions.length;

  const handleAnswer = (answer: Answer) => {
    if (animating) return;
    setSlideDir("out");
    setAnimating(true);
    const next = { ...scores };
    for (const [cat, pts] of Object.entries(answer.points)) {
      next[cat as Category] += pts!;
    }
    setScores(next);
    setTimeout(() => {
      if (step + 1 < total) setStep(step + 1);
      else setDone(true);
      setSlideDir("in");
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  };

  const reset = () => {
    setSlideDir("out");
    setAnimating(true);
    setTimeout(() => {
      setStep(0);
      setScores({ procurement: 0, automation: 0, erp: 0, tender: 0 });
      setDone(false);
      setSlideDir("in");
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  };

  const topCategory = (Object.entries(scores) as [Category, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0][0];
  const maxScore = Math.max(...Object.values(scores), 1);
  const progressPct = done ? 100 : (step / total) * 100;
  const isShown = slideDir === "in" && !animating;

  return (
    <section id="skills-quiz" ref={ref} style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionLabel text="Assessment" />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
          <span style={{ color: theme.text }}>Does Your Business </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Need Me?
          </span>
        </h2>
        <p style={{ fontSize: 12, color: theme.muted, marginBottom: 32 }}>
          Take a 30-second assessment to find out which service fits you best
        </p>
      </div>

      <div style={{ width: "100%", height: 4, background: `${theme.accent}15`, borderRadius: 2, marginBottom: 28, overflow: "hidden" }}>
        <div style={{ width: `${progressPct}%`, height: "100%", backgroundImage: `linear-gradient(90deg, ${theme.accentLight}, ${theme.accent})`, borderRadius: 2, transition: "width 0.5s ease-out" }} />
      </div>

      <div style={{ background: theme.card, border: `1px solid ${theme.accent}1F`, borderRadius: 14, padding: "32px 28px", backdropFilter: "blur(10px)", minHeight: 320, overflow: "hidden" }}>
        {!done ? (
          <div key={step} style={{ opacity: isShown ? 1 : 0, transform: isShown ? "translateX(0)" : slideDir === "out" ? "translateX(-40px)" : "translateX(40px)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <ClipboardCheck size={14} style={{ color: theme.accent }} />
              <span style={{ fontSize: 10, color: theme.muted, textTransform: "uppercase", letterSpacing: 1 }}>
                Question {step + 1} of {total}
              </span>
            </div>
            <h3 style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 600, color: theme.text, marginBottom: 24, lineHeight: 1.4 }}>
              {questions[step].question}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="quiz-answers">
              {questions[step].answers.map((a, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(a)}
                  style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${theme.accent}1F`, background: theme.soft, color: theme.text, fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all 0.25s", display: "flex", alignItems: "center", gap: 10 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.background = `${theme.accent}12`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${theme.accent}1F`; e.currentTarget.style.background = theme.soft; }}
                >
                  <span style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: theme.accent, flexShrink: 0 }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {a.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ opacity: isShown ? 1 : 0, transform: isShown ? "translateY(0)" : "translateY(20px)", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>{resultsMeta[topCategory].icon}</span>
              <div>
                <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 2 }}>Recommended Service</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: theme.accent }}>{resultsMeta[topCategory].title}</h3>
              </div>
            </div>
            <p style={{ fontSize: 13, color: theme.muted, lineHeight: 1.7, marginBottom: 28 }}>{resultsMeta[topCategory].desc}</p>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Score Breakdown</div>
              {(Object.entries(scores) as [Category, number][]).sort((a, b) => b[1] - a[1]).map(([cat, score]) => (
                <div key={cat} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: cat === topCategory ? theme.accent : theme.text }}>{resultsMeta[cat].title}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: cat === topCategory ? theme.accent : theme.muted, fontFamily: "var(--font-jetbrains)" }}>{score}/{total}</span>
                  </div>
                  <div style={{ width: "100%", height: 5, background: `${theme.accent}12`, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${maxScore > 0 ? (score / maxScore) * 100 : 0}%`, height: "100%", backgroundImage: cat === topCategory ? `linear-gradient(90deg, ${theme.accentLight}, ${theme.accent})` : `linear-gradient(90deg, ${theme.muted}55, ${theme.muted}88)`, borderRadius: 3, transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }} className="quiz-ctas">
              <a href="#contact" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", borderRadius: 8, background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent})`, color: theme.btnText, fontSize: 11, fontWeight: 600, textDecoration: "none", textTransform: "uppercase", letterSpacing: 1, transition: "all 0.3s" }}>
                Book Free Consultation <ChevronRight size={13} />
              </a>
              <button onClick={reset} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 18px", borderRadius: 8, border: `1px solid ${theme.accent}33`, background: "transparent", color: theme.muted, fontSize: 11, fontWeight: 500, cursor: "pointer", transition: "all 0.25s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.color = theme.accent; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${theme.accent}33`; e.currentTarget.style.color = theme.muted; }}>
                <RotateCcw size={12} /> Retake
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 520px) {
          .quiz-answers { grid-template-columns: 1fr !important; }
          .quiz-ctas { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
