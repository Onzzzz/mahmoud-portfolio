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
    { value: "7+ Years", label: "Procurement, Supply Chain & Operations" },
    { value: "Millions Saved", label: "Through Strategic Sourcing" },
    { value: "Hundreds of Vendors", label: "Sourced, Evaluated & Managed" },
    { value: "Multiple Industries", label: "Events · Equipment · FMCG · Oil & Gas · Retail · Trading" },
  ],
} as const;

export const about = {
  heading: "The Full Picture",
  sections: [
    {
      label: "Who I Am",
      text: "Procurement, Supply Chain & Operations Manager with 7+ years of progressive experience across the UAE, KSA, and Egypt — spanning FMCG retail logistics, oil & gas industrial procurement, large-scale events technology, enterprise operations, and heavy equipment trading. This cross-industry exposure has built a rare ability to diagnose operational gaps and design structured, scalable solutions regardless of sector.",
    },
    {
      label: "What I Do",
      text: "I manage the full procurement lifecycle from end to end — strategic sourcing, supplier evaluation and development, market analysis, RFQ cycles, contract negotiation, and procure-to-pay execution. I also coordinate logistics across multi-modal supply chains (air, sea, land) including international shipments, customs clearance, and compliance. I work across multiple ERP platforms including Oracle, SAP, Odoo, and Coupa, and manage government and private procurement portals like eSupply, Etimad, SABER, Tejari, and Ariba. I also handle vendor registration, pre-qualification, and compliance across UAE, KSA, and international markets.",
    },
    {
      label: "What Sets Me Apart",
      text: "Beyond procurement, I support business growth through end-to-end bid management — handling pre-qualification, documentation, pricing strategy, and compliant submissions to help the company win contracts. Known for building operational infrastructure where none exists — from designing business frameworks with documented workflows and SOPs, to leading ERP implementations, to authoring complete governance documentation (ESG, Anti-Bribery, Credit Policy, Code of Conduct) aligned with UAE regulations. Combines deep procurement knowledge with hands-on automation capability using n8n workflows and AI-powered tools.",
    },
  ],
  tags: ["Dubai, UAE", "7+ Years", "6 Industries", "UAE · KSA · Egypt", "Arabic & English", "Budgets up to AED 10M"],
} as const;

export const experience = [
  {
    role: "Supply Chain & Operations Manager",
    company: "Golden Sparrow Trading Co",
    type: "Heavy Equipment — Sales, Rentals & Services",
    logo: "/images/newGoldenSparrowLogo.webp",
    period: "Apr 2026 — Present",
    location: "Dubai, UAE",
    current: true,
    highlights: [
      "Managing full procurement, supply chain & operations — reporting directly to the General Manager as the operational backbone",
      "Leading strategic sourcing, supplier negotiations, and cost optimization across UAE, KSA, and Oman",
      "Led the business requirements and process design for Odoo ERP — mapped all departmental workflows and overseeing implementation with Odoo's team",
      "Designed a 4-layer legal framework for installment sales (EIRC, GPS tracking, post-dated cheques, court enforcement)",
      "Authored complete governance documentation from scratch: ESG, Anti-Bribery, Credit Policy, Code of Conduct, and HSE",
      "Designed organizational structure and cross-department coordination framework",
    ],
    tags: ["Operations", "Odoo ERP", "Policy Design", "Digital Transformation"],
  },
  {
    role: "Procurement & Tender Expert",
    company: "Golden Sparrow Trading Co",
    type: "Heavy Equipment — Sales, Rentals & Services",
    logo: "/images/newGoldenSparrowLogo.webp",
    period: "Oct 2025 — Mar 2026",
    location: "Dubai, UAE",
    current: false,
    highlights: [
      "Built the entire Procurement & Tendering function from zero — workflows, approval matrices, vendor evaluation criteria, and compliance governance",
      "Established the Bid Management Framework from scratch — pre/post-bid stages, documentation control, tracking tools, and approval workflows",
      "Managed end-to-end procurement cycle from RFQs and comparative analysis to contract execution and vendor performance management",
      "Led cross-functional teams (Sales, Finance, Operations) to ensure compliant and competitive tender submissions",
      "Managed company registrations across government, semi-government, and private supplier portals",
    ],
    tags: ["Procurement", "Tendering", "Bid Management", "Vendor Management"],
  },
  {
    role: "Procurement Process Executive",
    company: "Americana Foods",
    type: "FMCG — Enterprise (20+ Markets across MENA)",
    logo: "/images/americana_foods_logo.jpeg",
    period: "Apr 2025 — Oct 2025",
    location: "Dubai, UAE",
    current: false,
    highlights: [
      "Managed the complete Procure-to-Pay cycle — purchase requisitions, PO creation, approvals, and vendor coordination across 20+ markets",
      "Maintained and optimized Master Data (Vendor, Customer, Item) ensuring integrity and alignment across Oracle, Coupa, Zoho, and Laserfiche",
      "Executed SKU harmonization for National Food Company divisions — unifying product codes across business units",
      "Supported data migration and process automation initiatives, enhancing governance across P2P and MDM operations",
    ],
    tags: ["Oracle", "Coupa", "Master Data", "P2P", "Enterprise Scale"],
  },
  {
    role: "Procurement & Tender Executive",
    company: "Fractal Systems",
    type: "Event Technology — LED, Kinetic, AV, Digital Content",
    logo: "/images/fractal_systems_logo.jpeg",
    period: "Jan 2024 — Apr 2025",
    location: "Dubai, UAE",
    current: false,
    highlights: [
      "Led end-to-end procurement for 30+ major events — COP28, FIFA World Cup, GITEX, Esports World Cup, Elie Saab (Celine Dion & J-Lo), World Defense Show",
      "Achieved 10-20% cost savings on most projects through strategic sourcing and alternative solutions — with detailed cost-tracking reports per project",
      "Sourced and managed vendors across UAE, KSA, Europe & Asia for cutting-edge LED, kinetic, and AV technologies",
      "Led complex contract negotiations balancing budget, quality, and service — including AED 600K+ single contracts",
      "Acted as procurement advisor to senior leadership on market intelligence, pricing strategy, and make-vs-buy decisions",
      "Managed tender processes end-to-end — client requirements analysis, documentation, pricing strategy, and bid submissions",
    ],
    tags: ["Events Tech", "Strategic Sourcing", "LED/AV", "Tenders", "Cost Optimization"],
  },
  {
    role: "Procurement & Logistics Officer",
    company: "Hafa Trading Co",
    type: "Oil & Gas — Industrial Supplies & PPE",
    logo: "/images/hafa_trading_co_logo.jpeg",
    period: "Aug 2021 — Jun 2023",
    location: "Al Khobar, KSA",
    current: false,
    highlights: [
      "Sourced and evaluated vendors, managed RFQs, and negotiated on quality, pricing, delivery, and service terms",
      "Coordinated international logistics across air, sea, and land — handling SABER certificates and Saudi customs compliance",
      "Managed procurement data and workflows using Odoo ERP, maintaining accurate records on orders, deliveries, and invoices",
      "Trained and mentored junior procurement staff, fostering professional growth within the team",
    ],
    tags: ["Oil & Gas", "Logistics", "SABER", "Etimad", "Odoo"],
  },
  {
    role: "E-Commerce Buyer",
    company: "Saudi Supplier",
    type: "Industrial E-Commerce Marketplace",
    logo: "/images/saudi supplier.jpeg",
    period: "Jul 2021 — Apr 2023",
    location: "Remote (KSA)",
    current: false,
    highlights: [
      "Sourced and evaluated vendors for industrial and oil & gas products — selecting proposals to enhance retail sales potential",
      "Procured goods meeting cost, quality, and delivery targets using market research, competitor analysis, and price benchmarking",
      "Managed purchase orders and generated comprehensive procurement reports for management transparency",
      "Implemented cost reduction initiatives by analyzing market trends and capitalizing on pricing opportunities",
    ],
    tags: ["E-Commerce", "Sourcing", "Market Analysis", "Cost Reduction"],
  },
  {
    role: "Supply Chain Coordinator",
    company: "Retail Stores of Second Egyptian Army",
    type: "FMCG Retail — 17 Branches",
    logo: "/images/Egyptian_Armed_Forces_Logo.png",
    period: "Nov 2019 — Jan 2021",
    location: "Egypt",
    current: false,
    highlights: [
      "Coordinated supply chain operations for 17 retail branches — ensuring seamless inventory replenishment and distribution",
      "Managed fleet operations — optimizing delivery routes, tracking shipments, and coordinating schedules for maximum efficiency",
      "Maintained optimal inventory levels across all branches through regular audits and demand monitoring",
      "Partnered with suppliers, vendors, and distributors to ensure timely procurement and distribution of goods",
    ],
    tags: ["Supply Chain", "Inventory", "Fleet Management", "FMCG Retail"],
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
    title: "Operations Portal",
    company: "Golden Sparrow Trading",
    category: "Operations & Systems" as const,
    description: "Built a comprehensive digital operations backbone from scratch — 11 business workflow phases covering Lead Capture to HR Hiring, with 280+ documented workflow nodes and 45+ standard operating procedures. Successfully pitched Odoo ERP implementation to automate all documented processes.",
    highlights: [
      "11 business workflow phases from Lead Capture to HR",
      "280+ documented workflow nodes across 9 departments",
      "45+ standard operating procedures created from scratch",
    ],
    tools: ["Process Design", "SOPs", "Odoo ERP", "Workflows", "Governance"],
    featured: true,
    image: null as string | null,
    video: null as string | null,
    stat: { value: "280+", label: "Workflow Nodes" },
  },
  {
    title: "Tender Monitoring System",
    company: "AI-Powered Automation",
    category: "Operations & Systems" as const,
    description: "Built automated tender tracking system for GCC markets using n8n workflows and AI. Monitors government procurement portals across UAE, KSA, and Oman — surfacing relevant opportunities in real-time.",
    highlights: [
      "Automated monitoring of GCC government procurement portals",
      "AI-powered opportunity filtering and classification",
    ],
    tools: ["n8n", "AI Automation", "Government Portals", "Tender Tracking"],
    featured: false,
    image: null as string | null,
    video: null as string | null,
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "ESG & Compliance Suite",
    company: "Golden Sparrow Governance",
    category: "Operations & Systems" as const,
    description: "Authored complete governance documentation from scratch — ESG & Sustainability Policy, Anti-Bribery & Corruption Policy, Credit Policy, Code of Conduct, and HSE framework. All aligned with UAE regulations and international standards.",
    highlights: [
      "Full ESG, Anti-Bribery, Credit, and HSE policy suite",
      "Aligned with UAE regulations and international standards",
    ],
    tools: ["ESG Policy", "Compliance", "Governance", "UAE Regulations"],
    featured: false,
    image: null as string | null,
    video: null as string | null,
    stat: null as { value: string; label: string } | null,
  },
  {
    title: "Odoo ERP — Business Lead",
    company: "Golden Sparrow Trading",
    category: "Operations & Systems" as const,
    description: "Led the business requirements and process design for Odoo Enterprise ERP — mapped all departmental workflows, defined system requirements, and managed the implementation with Odoo's technical team across procurement, inventory, sales, and operations.",
    highlights: [
      "Mapped end-to-end business processes across all departments",
      "Defined system requirements and acceptance criteria for Odoo's implementation team",
    ],
    tools: ["Business Process Design", "Odoo ERP", "Requirements Documentation"],
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

export const dailyStack = [
  {
    category: "ERP & Enterprise",
    icon: "🏢",
    tools: [
      { name: "Oracle", level: 88 },
      { name: "Odoo", level: 95 },
      { name: "SAP", level: 80 },
      { name: "Coupa", level: 85 },
    ],
  },
  {
    category: "Government Portals",
    icon: "🏛️",
    tools: [
      { name: "eSupply Dubai", level: 90 },
      { name: "Etimad", level: 88 },
      { name: "SABER", level: 85 },
      { name: "ICV Portal", level: 82 },
    ],
  },
  {
    category: "Tendering & Sourcing",
    icon: "📋",
    tools: [
      { name: "Tejari", level: 85 },
      { name: "Ariba", level: 78 },
      { name: "Jaggaer", level: 72 },
    ],
  },
  {
    category: "Automation & AI",
    icon: "⚡",
    tools: [
      { name: "n8n", level: 92 },
      { name: "Claude", level: 90 },
      { name: "ChatGPT", level: 88 },
    ],
  },
  {
    category: "Analytics & Docs",
    icon: "📊",
    tools: [
      { name: "Advanced Excel", level: 95 },
      { name: "Power BI", level: 78 },
      { name: "Mermaid Diagrams", level: 80 },
    ],
  },
  {
    category: "Productivity",
    icon: "🔧",
    tools: [
      { name: "MS Office", level: 95 },
      { name: "Outlook", level: 92 },
      { name: "Zoho", level: 80 },
      { name: "Laserfiche", level: 78 },
    ],
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
    description: "Odoo Enterprise ERP setup — procurement, inventory, sales, and operations modules. Business requirements, gap analysis, and process design to go-live.",
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
    year: "2025 — Present",
    progress: 13, // 1 out of 8 modules = ~13%
    totalModules: 8,
    completedModules: 1,
  },
  {
    name: "CIPS Ethical Procurement & Supply Certificate",
    institution: "Chartered Institute of Procurement & Supply",
    status: "completed" as const,
    detail: null,
    year: "2025",
    progress: null,
    totalModules: null,
    completedModules: null,
  },
  {
    name: "B.Sc. Accounting",
    institution: "Assiut University — Faculty of Commerce (English Section)",
    status: "completed" as const,
    detail: null,
    year: "2019",
    progress: null,
    totalModules: null,
    completedModules: null,
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
  { name: "FMCG Retail", company: "Egyptian Army Stores" },
] as const;
