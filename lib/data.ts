// ============================================================
// Mahmoud Abdallah — Portfolio Data
// Source: CV (March 2026) — reviewed and accurate
// ============================================================

export const personal = {
  name: "Mahmoud Abdallah",
  tagline: "Procurement, Supply Chain & Operations Professional",
  subtitle: "Built to solve. Built to build.",
  badge: "Open to Opportunities",
  email: "mahmoudf.abdallah@outlook.com",
  phone: "+971544720857",
  whatsapp: "https://wa.me/971544720857",
  linkedin: "https://www.linkedin.com/in/mahmoudf-abdallah",
  location: "Dubai, UAE",
  nationality: "Egyptian",
} as const;

export const hero = {
  typingWords: [
    "strategic sourcing",
    "vendor negotiations",
    "tender management",
    "ERP implementation",
    "supply chain optimization",
    "cost reduction strategies",
    "process automation",
    "contract management",
  ],
  stats: [
    { value: "7+ Years", label: "Procurement, SC & Operations" },
    { value: "Millions Saved", label: "Through Strategic Sourcing" },
    { value: "Hundreds of Vendors", label: "Sourced, Evaluated & Managed" },
    { value: "Multiple Industries", label: "Events · Equipment · FMCG · Oil & Gas · Retail · Trading" },
  ],
} as const;

export const about = {
  heading: "How I Think",
  text: "I believe every business problem is a systems problem. Most companies I've walked into had no SOPs, no documented workflows, no real procurement structure — just people figuring it out as they go. I'm the guy who walks in and builds all of that from zero. Not because someone told me to, but because I can't work in chaos. I've done it across military, oil & gas, events, FMCG, and heavy equipment — different industries, same instinct. Find what's broken. Design the fix. Automate it. Move on to the next one.",
  approach: [
    { title: "Build From Scratch", description: "I've created entire procurement departments, SOPs, and compliance frameworks where none existed." },
    { title: "Cut What's Wasted", description: "AED 450K+ saved on a single project. 10-20% average cost reduction across 30+ events." },
    { title: "Implement & Automate", description: "Self-implementing Odoo 18 ERP. Building n8n automations. Replacing manual processes with digital workflows." },
    { title: "Bridge Industries", description: "Heavy equipment, FMCG, events tech, oil & gas — I bring cross-industry perspective to every challenge." },
  ],
  competencies: [
    "End-to-End Procurement & Sourcing",
    "Tendering & Bidding Strategy",
    "Supplier Evaluation & Pre-Qualification",
    "Contract Negotiation & Risk Management",
    "Market Intelligence & Cost Optimization",
    "ERP Implementation (Oracle, SAP, Odoo, Coupa)",
    "Government Portal Management (eSupply, Etimad, SABER)",
    "Process Improvement & Operational Excellence",
  ],
  languages: "Arabic (Native) · English (Professional)",
  budgets: "Up to AED 10M per project",
} as const;

export const experience = [
  {
    role: "Supply Chain & Operations Manager",
    company: "Golden Sparrow Trading Co",
    type: "Heavy Equipment — Forklifts, Excavators, Generators, Cranes",
    period: "Oct 2025 — Present",
    location: "Dubai, UAE",
    current: true,
    highlights: [
      "Built the entire Procurement & Tendering function from zero — structure, workflows, approval matrices, and compliance governance",
      "Promoted from Procurement & Tender Expert within 3 months to manage full supply chain operations",
      "Self-implementing Odoo 18 Enterprise ERP across procurement, inventory, sales, and operations modules",
      "Designed a 4-layer legal framework for installment sales — EIRC registration, GPS tracking, post-dated cheques, and court enforcement",
      "Created all company policies from scratch: ESG, Anti-Bribery, HSE, Code of Conduct, and Credit Policy",
      "Managing supplier registrations across government and private portals in UAE, KSA, and Oman",
    ],
    tags: ["Procurement", "Odoo 18", "Operations", "Tendering", "Heavy Equipment"],
  },
  {
    role: "Procure-to-Pay & Master Data Executive",
    company: "Americana Foods",
    type: "FMCG — 20+ Markets across MENA",
    period: "Apr 2025 — Sep 2025",
    location: "GCC",
    current: false,
    highlights: [
      "Managed the complete P2P cycle across Oracle, Coupa, Zoho, and Laserfiche — from requisition to payment",
      "Maintained master data integrity for 1,000+ vendor, customer, and item records across multiple ERP systems",
      "Executed SKU harmonization for National Food Company divisions — unified product codes across 3 business units",
      "Reduced data discrepancies by implementing validation workflows and cross-system reconciliation checks",
    ],
    tags: ["P2P", "Master Data", "Oracle", "Coupa", "Enterprise"],
  },
  {
    role: "Procurement & Tender Executive",
    company: "Fractal Systems",
    type: "Event Technology Solutions — LED, Kinetic, AV",
    period: "Jan 2024 — Apr 2025",
    location: "Dubai, UAE",
    current: false,
    highlights: [
      "Delivered AED 450,000+ in documented savings on a single project through strategic sourcing and supplier negotiation",
      "Led end-to-end procurement for 30+ major events — COP28, FIFA World Cup, GITEX, Esports World Cup, Elie Saab (Celine Dion & J-Lo), Art Dubai, World Defense Show",
      "Managed project budgets up to AED 10M with consistent 10-20% cost reduction across engagements",
      "Built a vendor network spanning UAE, KSA, Europe, and Asia — 100+ qualified suppliers across categories",
      "Served as procurement advisor to C-suite on market intelligence, pricing strategy, and make-vs-buy decisions",
    ],
    tags: ["Events Tech", "AED 450K+ Saved", "LED/AV", "Tenders", "Strategic Sourcing"],
  },
  {
    role: "Procurement & Logistics Officer",
    company: "Hafa Trading Co",
    type: "Oil & Gas — Industrial Supplies & PPE",
    period: "Aug 2021 — Jun 2023",
    location: "Riyadh, KSA",
    current: false,
    highlights: [
      "Managed RFQ cycles and supplier selection for industrial supplies — evaluating 50+ vendors annually",
      "Coordinated multi-modal international logistics (air, sea, land) across GCC and international origins",
      "Ensured full SABER compliance and customs clearance for all Saudi imports — zero shipment rejections",
      "Trained and mentored 3 junior procurement staff on sourcing processes and ERP usage (Odoo)",
    ],
    tags: ["Oil & Gas", "Logistics", "SABER", "Etimad", "Odoo"],
  },
  {
    role: "E-Commerce Buyer",
    company: "Saudi Supplier",
    type: "Industrial E-Commerce Marketplace",
    period: "Jul 2021 — Apr 2023",
    location: "Remote (KSA)",
    current: false,
    highlights: [
      "Sourced industrial products across multiple categories — meeting cost, quality, and lead-time targets",
      "Conducted market analysis and price benchmarking to identify savings opportunities",
      "Implemented category-level cost reduction initiatives with measurable margin improvement",
    ],
    tags: ["E-Commerce", "Market Analysis", "Category Management"],
  },
  {
    role: "Supply Chain Coordinator",
    company: "Retail Stores of Second Egyptian Army",
    type: "FMCG Retail — 17 Branches",
    period: "Nov 2019 — Jan 2021",
    location: "Egypt",
    current: false,
    highlights: [
      "Coordinated supply chain operations for 17 retail branches — inventory replenishment, demand planning, and distribution",
      "Optimized fleet delivery routes, reducing logistics costs and improving on-time delivery rates",
      "Managed inventory across branches with disciplined stock control and minimal write-offs",
    ],
    tags: ["Supply Chain", "Inventory", "Fleet Management", "Retail"],
  },
] as const;

export const projects = [
  {
    title: "AED 450K+ Saved — Single Project",
    company: "Fractal Systems",
    category: "Procurement & Tenders" as const,
    description: "Delivered AED 450,000+ in documented savings on one engagement through strategic sourcing, supplier negotiation, and specification optimization.",
    highlights: [
      "AED 450,000+ documented savings on a single project",
      "Renegotiated supplier contracts and identified alternative sources",
    ],
    tools: ["Strategic Sourcing", "Negotiation", "Cost Analysis"],
    featured: true,
    image: null as string | null,
    video: null as string | null,
    stat: { value: "450K+", label: "AED Saved" },
  },
  {
    title: "30+ World-Class Events Procured",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "Led end-to-end procurement for 30+ major events — COP28, FIFA World Cup, GITEX, Esports World Cup, Elie Saab (Celine Dion & J-Lo), Art Dubai, and World Defense Show.",
    highlights: [
      "10-20% cost reduction across all engagements",
      "100+ qualified vendors across UAE, KSA, Europe & Asia",
    ],
    tools: ["Tejari", "Multi-country Sourcing", "Budget Control"],
    featured: true,
    image: null as string | null,
    video: null as string | null,
    stat: { value: "30+", label: "Major Events" },
  },
  {
    title: "Red Sea Global — Experience Center",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "Procured immersive technology for the Red Sea Global Experience Center — showcasing the luxury tourism destination with interactive displays.",
    highlights: [
      "Immersive experience center technology",
      "Multi-vendor coordination",
    ],
    tools: ["Immersive Tech", "Experience Center", "AV"],
    featured: true,
    image: null as string | null,
    video: "https://www.youtube.com/watch?v=3wVnQQCHVog",
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "Bank AlBilad — Facade Lighting",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "52-meter LED media facade using flexible LED strips for Bank AlBilad headquarters in Riyadh.",
    highlights: [
      "52-meter LED media facade",
      "Flexible LED strip technology",
    ],
    tools: ["LED Facade", "Flexible LED", "Riyadh"],
    featured: false,
    image: null as string | null,
    video: "https://www.youtube.com/watch?v=Gq9lWsSYU-k",
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "IKTVA 2025",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "Procured event technology for IKTVA 2025 — Saudi Aramco's flagship procurement and localization forum.",
    highlights: [
      "Full event technology procurement",
      "Saudi Aramco flagship event",
    ],
    tools: ["Event Tech", "LED/AV", "Procurement"],
    featured: false,
    image: null as string | null,
    video: "https://www.youtube.com/watch?v=VMfeyqfny68",
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "COP 16 — UNCCD",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "Procured immersive technology for COP 16 Riyadh — projection mapping, interactive pressure tiles, and AR tablets.",
    highlights: [
      "Projection mapping room",
      "Interactive pressure tiles & AR tablets",
    ],
    tools: ["Projection Mapping", "AR", "Interactive Tech"],
    featured: false,
    image: null as string | null,
    video: "https://www.youtube.com/watch?v=zT4BY9Vz23s",
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "1001 Seasons of Elie Saab — Rotating Towers",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "Procured 10 massive 12-meter rotating LED towers for the 1001 Seasons of Elie Saab fashion show featuring Celine Dion & Jennifer Lopez. Won 'Best Use of Technology' at Saudi Event Awards.",
    highlights: [
      "10 x 12-meter rotating LED towers",
      "Won Best Use of Technology award",
    ],
    tools: ["LED Towers", "Kinetic Systems", "Riyadh"],
    featured: false,
    image: null as string | null,
    video: "https://www.youtube.com/watch?v=KY4lgEME2t0",
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "MA'ADEN — Multi-level Kinetic Cube",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "Procured and delivered a multi-level kinetic cube installation for MA'ADEN (Saudi Arabian Mining Company) — complex kinetic engineering with LED integration.",
    highlights: [
      "Multi-level kinetic cube structure",
      "LED integration with kinetic movement",
    ],
    tools: ["Kinetic Systems", "LED Integration", "Mining Exhibition"],
    featured: false,
    image: null as string | null,
    video: "https://www.youtube.com/watch?v=kKn_nX3JCNc",
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "Odoo 18 ERP — Solo Implementation",
    company: "Golden Sparrow Trading",
    category: "Operations & Systems" as const,
    description: "Self-implementing Odoo 18 Enterprise SaaS across procurement, inventory, sales, and operations — without external consultants.",
    highlights: [
      "Configured procurement, inventory, sales, and operations modules",
      "Created a 23-chapter implementation guide",
    ],
    tools: ["Odoo 18", "ERP Configuration", "Process Mapping"],
    featured: false,
    image: null as string | null,
    video: null as string | null,
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "Procurement Function — Built From Zero",
    company: "Golden Sparrow Trading",
    category: "Procurement & Tenders" as const,
    description: "Built the entire procurement and tendering function from scratch — SOPs, approval matrices, supplier portals, and compliance governance across UAE, KSA, and Oman.",
    highlights: [
      "Created all SOPs, policies, and governance documentation",
      "Designed a 4-layer legal framework for installment sales",
    ],
    tools: ["Policy Writing", "Portal Management", "Compliance"],
    featured: false,
    image: null as string | null,
    video: null as string | null,
    stat: null as { value: string; label: string } | null,
  },
] as const;

export type ProjectCategory = "Procurement & Tenders" | "Events & Production" | "Operations & Systems";

export const skillsRadar = [
  { name: "Procurement", level: 95 },
  { name: "Tenders", level: 93 },
  { name: "ERP Systems", level: 90 },
  { name: "Supply Chain", level: 88 },
  { name: "Negotiation", level: 92 },
  { name: "Compliance", level: 85 },
] as const;

export const toolGroups = [
  {
    category: "ERP & Enterprise",
    tools: ["Oracle", "SAP", "Odoo", "Coupa", "Zoho", "Laserfiche"],
  },
  {
    category: "Procurement Portals",
    tools: ["eSupply", "Etimad", "SABER", "Tejari", "Ariba", "Jaggaer", "ICV"],
  },
  {
    category: "Automation & Analysis",
    tools: ["n8n", "Advanced Excel", "Mermaid Diagrams", "AI Tools"],
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Procurement Function Setup",
    description: "I build procurement departments from scratch — sourcing workflows, approval matrices, vendor databases, and compliance governance. Done it twice, for two different industries.",
  },
  {
    number: "02",
    title: "Tender & Bid Management",
    description: "Full tender lifecycle — opportunity tracking, bid documentation, commercial proposals, and submission. Both buying side (sourcing) and selling side (winning contracts in GCC markets).",
  },
  {
    number: "03",
    title: "Cost Reduction & Sourcing",
    description: "Strategic sourcing that delivers measurable savings. AED 450K+ saved on a single project. 10-20% average reduction across 30+ events. I find where the money is hiding.",
  },
  {
    number: "04",
    title: "ERP Implementation (Odoo)",
    description: "Odoo 18 Enterprise setup — procurement, inventory, sales, and operations modules. Gap analysis to go-live, without external consultants. Currently running a live implementation.",
  },
  {
    number: "05",
    title: "Operations & Compliance Setup",
    description: "SOPs, ESG policies, anti-bribery frameworks, credit policies, and governance documentation — all built from scratch and aligned with UAE regulations.",
  },
] as const;

export const certifications = [
  {
    name: "CIPS Level 4 Diploma in Procurement & Supply",
    institution: "Chartered Institute of Procurement & Supply",
    status: "in-progress" as const,
    detail: "Currently studying L4M4 — Ethical and Responsible Sourcing",
    year: "In Progress",
  },
  {
    name: "CIPS Ethical Procurement & Supply Certificate",
    institution: "CIPS",
    status: "completed" as const,
    year: "2025",
  },
  {
    name: "B.Sc. Accounting",
    institution: "Assiut University — Faculty of Commerce (English Section)",
    status: "completed" as const,
    year: "2019",
  },
] as const;

export const testimonials = {
  featured: [
    {
      name: "Avil Crasta",
      role: "Senior Sales Manager, Aoto",
      relationship: "Client",
      quote: "Mahmoud consistently demonstrated strong strategic thinking, commercial awareness, and a deep understanding of technically driven procurement. He managed complex vendor negotiations across multiple countries and always delivered on time and under budget.",
    },
    {
      name: "Hanif Ullah",
      role: "Head of PMO, Fractal Systems",
      relationship: "Direct Manager",
      quote: "Mahmoud went above and beyond on every project — proactively finding cost-saving opportunities and solving procurement, logistics, and lead-time challenges before they became problems. His structured approach saved us significant time and money across 30+ events.",
    },
  ],
  grid: [
    { name: "Munsif Ali", role: "SC & Procurement Leader", quote: "Sharp negotiation skills — consistently securing favorable terms while maintaining strong supplier relationships. One of the most commercially aware procurement professionals I've worked with." },
    { name: "Nasir Ali", role: "SC & Procurement Professional", quote: "He handled everything from sourcing vendors to managing complex tenders with clarity and full ownership. Rare to find someone who can manage both the strategic and operational side this well." },
    { name: "Mohsin Bilal", role: "CFO, Fractal Systems", quote: "Mahmoud brought financial discipline to procurement — his cost tracking and savings reporting gave us visibility we never had before. A true partner to the finance function." },
    { name: "Zain Dib", role: "Project Manager, Fractal Systems", quote: "On tight-deadline projects like COP28 and FIFA activations, Mahmoud was the person I could always count on. Accurate timelines, no excuses, and always a backup plan ready." },
  ],
  linkedinCount: 14,
} as const;

export const contactTypes = [
  { type: "hiring", label: "Hiring", description: "Full-time or contract opportunities" },
  { type: "consulting", label: "Consulting", description: "Expert advisory & implementation" },
  { type: "collab", label: "Collaboration", description: "Let's build something together" },
  { type: "hello", label: "Say Hi", description: "Just want to connect" },
] as const;

export const industries = [
  { name: "Heavy Equipment", company: "Golden Sparrow Trading" },
  { name: "FMCG", company: "Americana Foods" },
  { name: "Event Technology", company: "Fractal Systems" },
  { name: "Oil & Gas", company: "Hafa Trading" },
  { name: "Industrial E-Commerce", company: "Saudi Supplier" },
  { name: "Military Retail", company: "Egyptian Army" },
] as const;
