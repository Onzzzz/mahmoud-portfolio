"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { dailyStack } from "@/lib/data";

// ── Kanban Data ────────────────────────────────────────────────
const kanbanColumns = [
  {
    id: "procurement",
    label: "Procurement",
    featured: [],
    skills: [
      "Strategic Sourcing",
      "RFQ / RFP Management",
      "Supplier Qualification",
      "Contract Negotiation",
      "Category Management",
      "Cost Optimization & TCO",
    ],
  },
  {
    id: "supply-chain",
    label: "Supply Chain",
    featured: [],
    skills: [
      "Demand & Supply Planning",
      "Inventory Optimization",
      "Logistics & Freight",
      "Cross-Border Compliance",
      "Warehouse & Distribution",
      "Incoterms & Trade Compliance",
    ],
  },
  {
    id: "operations",
    label: "Operations",
    featured: [],
    skills: [
      "SOP & Process Mapping",
      "ERP Implementation",
      "Workflow Automation",
      "Business Requirements",
      "KPI & Performance",
      "Continuous Improvement",
    ],
  },
  {
    id: "governance",
    label: "Governance",
    featured: [],
    skills: [
      "Procurement Governance",
      "Ethical Sourcing",
      "Vendor Due Diligence",
      "Anti-Bribery & Compliance",
      "Risk Assessment & Mitigation",
      "Audit Readiness",
    ],
  },
  {
    id: "tenders",
    label: "Tenders",
    featured: [],
    skills: [
      "Full Tender Lifecycle",
      "Bid Management",
      "Vendor Pre-qualification",
      "Commercial Proposals",
      "BAFO Negotiation",
      "Post-award Management",
    ],
  },
  {
    id: "digital",
    label: "Digital & AI",
    featured: [],
    skills: [
      "AI Workflow Design",
      "Process Automation",
      "Spend Analytics",
      "Master Data Governance",
      "Power BI Reporting",
      "System Integration",
    ],
  },
] as const;

// ── Tool logos (local) ────────────────────────────────────────
const toolLogos: Record<string, string> = {
  "Oracle": "/images/stack/oracle.png",
  "Odoo": "/images/stack/odoo.png",
  "SAP": "/images/stack/sap.svg",
  "Coupa": "/images/stack/coupa.png",
  "eSupply Dubai": "/images/stack/esupply-dubai.jpg",
  "Etimad": "/images/stack/etimad.png",
  "SABER": "/images/stack/saber.png",
  "Tejari": "/images/stack/tejari.png",
  "Ariba": "/images/stack/ariba.svg",
  "Jaggaer": "/images/stack/jaggaer.png",
  "n8n": "/images/stack/n8n.svg",
  "Claude": "/images/stack/claude.svg",
  "ChatGPT": "/images/stack/chatgpt.png",
  "Gemini": "/images/stack/gemini.png",
  "Sora": "/images/stack/sora.png",
  "GLM": "/images/stack/glm.png",
  "Nano Banan": "/images/stack/nano-banan.png",
  "Advanced Excel": "/images/stack/excel.png",
  "Power BI": "/images/stack/power-bi.png",
  "Mermaid Diagrams": "/images/stack/mermaid.png",
  "MS Office": "/images/stack/ms-office.png",
  "Outlook": "/images/stack/outlook.png",
  "Zoho": "/images/stack/zoho.svg",
  "Laserfiche": "/images/stack/laserfiche.png",
  "DHL": "/images/stack/dhl.svg",
  "FedEx": "/images/stack/fedex.png",
  "Aramex": "/images/stack/aramex.png",
  "Tenders on Time": "/images/stack/tenders-on-time.png",
  "Canva": "/images/stack/canva.png",
  "Notion": "/images/stack/notion.png",
  "ClickUp": "/images/stack/clickup.png",
  "Monday": "/images/stack/monday.png",
  "Microsoft Teams": "/images/stack/microsoft-teams.png",
  "Google Meet": "/images/stack/google-meet.png",
};

// ── ToolBadge ─────────────────────────────────────────────────
function ToolBadge({ item }: { readonly item: { readonly tool: string; readonly category: string } }) {
  const [imgFailed, setImgFailed] = useState(false);
  const logoUrl = toolLogos[item.tool] ?? "";

  return (
    <span
      className="inline-flex items-center gap-2.5 px-4 py-2.5 shrink-0 transition-colors duration-300"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--surface-border)",
        color: "var(--text-secondary)",
        fontFamily: "var(--font-heading)",
        fontSize: "0.8rem",
        fontWeight: 500,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--surface-border)";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      {!imgFailed && logoUrl ? (
        <img
          src={logoUrl}
          alt=""
          width={18}
          height={18}
          className="shrink-0"
          style={{ borderRadius: 2 }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            background: "var(--accent)",
            color: "var(--bg)",
            fontSize: "0.6rem",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {item.tool.charAt(0)}
        </span>
      )}
      {item.tool}
    </span>
  );
}

// ── KanbanColumn ───────────────────────────────────────────────
function KanbanColumn({
  col,
  colIndex,
}: {
  col: (typeof kanbanColumns)[number];
  colIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: colIndex * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        borderRight: colIndex < kanbanColumns.length - 1
          ? "1px solid var(--surface-border)"
          : "none",
        paddingRight: colIndex < kanbanColumns.length - 1 ? "1.1rem" : 0,
        paddingLeft: colIndex > 0 ? "1.1rem" : 0,
      }}
    >
      {/* Column header */}
      <div
        style={{
          paddingBottom: "0.75rem",
          marginBottom: "1rem",
          borderBottom: "1px solid rgba(212,168,83,0.45)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {col.label}
        </span>
      </div>

      {/* Skills list */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.15rem" }}>
        {col.skills.map((skill, i) => {
          const isFeatured = (col.featured as readonly number[]).includes(i);
          return (
            <motion.li
              key={skill}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.35,
                delay: colIndex * 0.09 + i * 0.04 + 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.67rem",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                  lineHeight: 1,
                  padding: "0.5rem 0.5rem",
                  whiteSpace: "nowrap",
                  borderRadius: "2px",
                  cursor: "default",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.background = "rgba(212,168,83,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {skill}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export function Skills() {
  const allTools = dailyStack.flatMap((g) =>
    g.tools.map((tool) => ({ tool, category: g.category }))
  );
  const row1 = allTools.slice(0, Math.ceil(allTools.length / 2));
  const row2 = allTools.slice(Math.ceil(allTools.length / 2));

  return (
    <section className="pt-10 md:pt-14 pb-16 md:pb-24 overflow-hidden relative" id="skills">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .marquee-left  { animation: marquee-left  30s linear infinite; }
        .marquee-right { animation: marquee-right 35s linear infinite; }
        @media (max-width: 1023px) {
          .kanban-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .kanban-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        /* Reset index-based inline padding/borders when grid reflows to fewer columns */
        @media (max-width: 1023px) {
          .kanban-grid > * {
            padding-left: 0.6rem !important;
            padding-right: 0.6rem !important;
            border-right: none !important;
          }
          .kanban-grid > *:nth-child(3n+1) { padding-left: 0 !important; }
          .kanban-grid > *:nth-child(3n)   { padding-right: 0 !important; }
        }
        @media (max-width: 639px) {
          .kanban-grid > * {
            padding-left: 0.6rem !important;
            padding-right: 0.6rem !important;
            border-right: none !important;
          }
          .kanban-grid > *:nth-child(odd)  { padding-left: 0 !important; }
          .kanban-grid > *:nth-child(even) { padding-right: 0 !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.h2
          className="mb-8"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          Expertise &{" "}
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
            Stack.
          </span>
        </motion.h2>

        {/* Kanban columns */}
        <div
          className="kanban-grid mb-10"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "0",
            alignItems: "start",
          }}
        >
          {kanbanColumns.map((col, i) => (
            <KanbanColumn key={col.id} col={col} colIndex={i} />
          ))}
        </div>

        {/* Daily Stack label */}
        <motion.div
          className="mb-4 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            Daily Stack
          </p>
          <div style={{ flex: 1, height: "1px", background: "var(--surface-border)" }} />
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-4">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
        />
        <div className="marquee-left flex gap-3 whitespace-nowrap w-max">
          {[...row1, ...row1].map((item, i) => (
            <ToolBadge key={`r1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
        />
        <div className="marquee-right flex gap-3 whitespace-nowrap w-max">
          {[...row2, ...row2].map((item, i) => (
            <ToolBadge key={`r2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
