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
  heading: "Turning Spend Into Strategy",
  text: "Strategic and results-oriented Procurement & Tender Specialist with extensive experience overseeing end-to-end procurement, sourcing, and supply chain operations across high-tech, industrial, and service sectors in the UAE and KSA. I combine analytical depth with practical execution — ensuring every sourcing decision supports business objectives and long-term value.",
  competencies: [
    "End-to-End Procurement & Sourcing",
    "Tendering & Bidding Strategy",
    "Supplier Evaluation & Pre-Qualification",
    "Contract Negotiation & Risk Management",
    "Market Intelligence & Cost Optimization",
    "ERP & E-Procurement Systems",
    "Vendor Relationship Management",
    "Process Improvement & Operational Excellence",
  ],
  infoCards: [
    { label: "Location", value: "Dubai, UAE" },
    { label: "Experience", value: "7+ Years — UAE, KSA, Egypt" },
    { label: "Certification", value: "CIPS Level 4 (In Progress)" },
    { label: "Languages", value: "Arabic (Native) · English (Professional)" },
  ],
} as const;

export const experience = [
  {
    role: "Procurement & Tender Expert",
    company: "Golden Sparrow Trading Co",
    type: "Heavy Equipment — Sales, Rentals, Servicing",
    period: "Oct 2025 — Present",
    location: "Dubai, UAE",
    current: true,
    highlights: [
      "Leading the entire Procurement Function — sourcing, supplier evaluation, negotiations, and contracting",
      "Established the Tendering & Bidding Function from scratch — structure, workflows, documentation, compliance",
      "Developing company-wide Compliance, HSE, ESG, Anti-Bribery, and Code of Conduct Policies",
      "Managing registrations across government, semi-government, and private supplier portals",
      "Leading cross-functional teams (Sales, Finance, Operations) for proposal preparation and submission",
    ],
    tags: ["Procurement", "Tendering", "Compliance", "ESG", "Heavy Equipment"],
  },
  {
    role: "Procure-to-Pay & Master Data Executive",
    company: "Americana Foods",
    type: "FMCG — 20+ Markets across MENA",
    period: "Apr 2025 — Sep 2025",
    location: "GCC",
    current: false,
    highlights: [
      "Managed complete P2P cycle — purchase requisitions, approvals, and PO creation",
      "Maintained and optimized Master Data (Vendor, Customer, Item) ensuring integrity across systems",
      "Supported SKU harmonization for National Food Company divisions",
      "Utilized Oracle, Coupa, Zoho, and Laserfiche for procurement and data management",
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
      "Led supply chain process for 30+ major events — COP28, Esports World Cup, Art Dubai, Elie Saab",
      "Achieved 10-20% cost savings on most projects through strategic sourcing and negotiation",
      "Sourced and built vendor relationships across UAE, KSA, Europe & Asia",
      "Managed government registrations and compliance across UAE, KSA, and Europe",
      "Acted as procurement advisor to senior leadership on market insights and pricing",
    ],
    tags: ["Events Tech", "Strategic Sourcing", "LED/AV", "Tenders", "Cost Savings"],
  },
  {
    role: "Procurement & Logistics Officer",
    company: "Hafa Trading Co",
    type: "Oil & Gas — Industrial Supplies & PPE",
    period: "Aug 2021 — Jun 2023",
    location: "Riyadh, KSA",
    current: false,
    highlights: [
      "Sourced and evaluated vendors, managing RFQs and supplier selection",
      "Coordinated international logistics across air, land, and sea freight",
      "Managed SABER compliance and Saudi customs certificates",
      "Trained and mentored junior procurement staff",
    ],
    tags: ["Oil & Gas", "Logistics", "SABER", "Odoo", "Mentoring"],
  },
  {
    role: "E-Commerce Buyer",
    company: "Saudi Supplier",
    type: "Industrial E-Commerce Marketplace",
    period: "Jul 2021 — Apr 2023",
    location: "Remote (KSA)",
    current: false,
    highlights: [
      "Procured goods meeting cost, quality, and delivery targets",
      "Conducted price and market trend forecasting",
      "Implemented cost reduction initiatives across product categories",
    ],
    tags: ["E-Commerce", "Market Analysis", "Sourcing"],
  },
  {
    role: "Supply Chain Coordinator",
    company: "Retail Stores of Second Egyptian Army",
    type: "FMCG Retail — 17 Branches",
    period: "Nov 2019 — Jan 2021",
    location: "Egypt",
    current: false,
    highlights: [
      "Supported supply chain for 17 retail branches",
      "Oversaw fleet operations, optimizing delivery routes and schedules",
      "Led and motivated sales teams to achieve branch targets",
    ],
    tags: ["Supply Chain", "Inventory", "Fleet Management"],
  },
] as const;

export const projects = [
  {
    title: "Tendering & Bidding Function — Built From Scratch",
    company: "Golden Sparrow Trading",
    category: "Procurement & Tenders" as const,
    description: "Established the entire tendering function — structure, workflows, documentation systems, and compliance governance.",
    highlights: [
      "Built bid management framework covering pre- and post-bid stages",
      "Standardized internal tender processes with tracking tools and approval matrices",
      "Managing company registrations across major government and private portals",
    ],
    tools: ["Documentation", "Compliance", "Portal Management"],
    featured: true,
  },
  {
    title: "30+ Major Events Procurement",
    company: "Fractal Systems",
    category: "Events & Production" as const,
    description: "Led end-to-end procurement for 30+ major events including COP28, FIFA World Cup activations, Esports World Cup, Art Dubai, and Elie Saab shows.",
    highlights: [
      "10-20% cost savings on most projects",
      "Budgets up to AED 10M managed",
      "Vendor network across UAE, KSA, Europe & Asia",
    ],
    tools: ["Vendor Network", "Tejari", "Contract Management", "Negotiation"],
    featured: true,
  },
  {
    title: "Compliance & Governance Suite",
    company: "Golden Sparrow Trading",
    category: "Operations & Systems" as const,
    description: "Developed company-wide policies from scratch — HSE, ESG, Anti-Bribery, and Code of Conduct — ensuring alignment with UAE regulations and international standards.",
    highlights: [
      "Multiple major policies created",
      "UAE regulatory compliance",
      "Tendering and registration readiness achieved",
    ],
    tools: ["Policy Writing", "Compliance", "UAE Regulations"],
    featured: false,
  },
  {
    title: "SKU Harmonization Project",
    company: "Americana Foods",
    category: "Operations & Systems" as const,
    description: "Supported data migration and SKU harmonization for National Food Company divisions — unifying product codes to improve traceability and reporting.",
    highlights: [
      "Unified product codes across divisions",
      "Improved traceability and reporting accuracy",
      "Data validation and quality reviews",
    ],
    tools: ["Oracle", "Master Data", "Data Migration"],
    featured: false,
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
    title: "Procurement Consulting",
    description: "End-to-end procurement strategy — vendor evaluation, sourcing, contract negotiation, and cost optimization tailored to your industry.",
  },
  {
    number: "02",
    title: "Tender & RFQ Management",
    description: "Complete tender lifecycle — from opportunity identification and documentation to competitive bid submission and compliance.",
  },
  {
    number: "03",
    title: "Bidding Support — Sales Side",
    description: "Preparing winning technical and commercial proposals, qualification documents, and bid packages for GCC market contracts.",
  },
  {
    number: "04",
    title: "ERP Implementation",
    description: "Odoo setup and configuration — procurement, inventory, sales, and operations modules. From gap analysis to go-live.",
  },
  {
    number: "05",
    title: "Operations Setup & SOPs",
    description: "Building operational frameworks from scratch — workflows, SOPs, compliance policies, and governance documentation.",
  },
] as const;

export const certifications = [
  {
    name: "CIPS Level 4 Diploma in Procurement & Supply",
    institution: "Chartered Institute of Procurement & Supply",
    status: "in-progress" as const,
    detail: "Currently studying — next exam in 2 months",
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
      quote: "Mahmoud consistently demonstrated strong strategic thinking, commercial awareness, and a deep understanding of technically driven procurement.",
    },
    {
      name: "Hanif Ullah",
      role: "Head of PMO, Fractal Systems",
      relationship: "Direct Manager",
      quote: "Mahmoud consistently went above and beyond — proactively finding solutions and tackling procurement, logistics, and lead-time challenges with a calm and structured approach.",
    },
  ],
  grid: [
    { name: "Mohsin Bilal", role: "CFO, Fractal Systems", quote: "A dedicated professional who brings discipline and strategic thinking to procurement operations." },
    { name: "Nasir Ali", role: "SC & Procurement Professional", quote: "He handled everything from sourcing vendors to managing tenders with impressive clarity and ownership." },
    { name: "Munsif Ali", role: "SC & Procurement Leader", quote: "Sharp negotiation skills, consistently securing favorable terms and high-quality materials." },
    { name: "Zain Dib", role: "Project Manager, Fractal Systems", quote: "Always took the initiative to find solutions. A person I could always rely on for accurate timelines." },
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
