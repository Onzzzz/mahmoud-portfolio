export const hero = {
  name: ["Mahmoud", "Abdallah"] as const,
  badge: "Available for Opportunities",
  typingWords: [
    "supply chain optimization",
    "procurement excellence",
    "ERP implementation",
    "process automation",
    "tender management",
    "operational strategy",
    "vendor negotiation",
    "digital transformation",
  ],
  description:
    "5+ years transforming procurement & operations across UAE, KSA & Egypt. Driving AED 450K+ in savings through strategic sourcing, ERP systems & automation.",
  cta: [
    { label: "LET'S TALK", href: "#contact", style: "primary" as const },
    { label: "VIEW PORTFOLIO", href: "#projects", style: "outline" as const },
  ],
};

export const stats = [
  { number: 450, suffix: "K+", unit: "AED", label: "Cost Savings Delivered" },
  { number: 5, suffix: "+", unit: "YEARS", label: "Cross-Border Experience" },
  { number: 30, suffix: "+", unit: "PROJECTS", label: "Major Events Delivered" },
  { number: 3, suffix: "", unit: "MONTHS", label: "Fastest Promotion" },
];

export const about = {
  sectionLabel: "About",
  heading: ["Turning Complexity into", "Operational Excellence"] as const,
  paragraphs: [
    "I'm a Supply Chain & Operations Manager based in Dubai with 5+ years of experience spanning the UAE, KSA, and Egypt. My career has taken me through military logistics, oil & gas procurement, high-end events technology, FMCG enterprise operations, and heavy equipment trading \u2014 giving me a rare cross-industry perspective on how supply chains really work.",
    "What sets me apart is my obsession with systems. I don't just manage processes \u2014 I build them. From designing 11-phase operational frameworks with 280+ workflow nodes and 45+ SOPs, to pitching and securing ERP implementations, I turn chaotic operations into documented, automated, scalable systems. I combine deep procurement expertise with hands-on automation skills using tools like n8n, AI-powered monitoring, and modern ERP platforms.",
  ],
  infoCards: [
    { label: "LOCATION", value: "Dubai, UAE" },
    { label: "EXPERIENCE", value: "5+ Years \u2014 UAE, KSA, Egypt" },
    { label: "CERTIFICATION", value: "CIPS Level 4 (In Progress)" },
    { label: "LANGUAGES", value: "Arabic (Native) \u00B7 English (Professional)" },
  ],
};

export const experience = [
  {
    role: "Supply Chain & Operations Manager",
    company: "Golden Sparrow Trading LLC",
    companyType: "Heavy Equipment Trading",
    period: "Oct 2024 \u2014 Present",
    location: "Dubai, UAE",
    promotion: true,
    promotionNote: "Promoted from Procurement & Tender Expert in 3 months",
    highlights: [
      "Built complete Operations Portal \u2014 11 business phases, 280+ workflow nodes, 45+ SOPs",
      "Pitched & secured Odoo ERP implementation approval",
      "Created ESG, QHSE, Anti-Bribery & Code of Conduct policies from scratch",
      "Designed organizational structure & cross-department coordination framework",
      "Reports directly to General Manager as operational backbone",
    ],
    tags: ["Operations Portal", "Odoo ERP", "Policy Design", "Digital Transformation", "SOPs"],
  },
  {
    role: "P2P & Master Data Executive",
    company: "Americana Foods",
    companyType: "FMCG \u2014 Enterprise (20+ Markets)",
    period: "Apr 2025 \u2014 Sep 2025",
    location: "Dubai, UAE",
    highlights: [
      "Managed enterprise Procure-to-Pay cycle across 20+ markets",
      "Master data governance & SKU harmonization",
      "Oracle ERP, Coupa S2C, Zoho, Laserfiche document management",
      "Vendor lifecycle management across MENA region",
    ],
    tags: ["Oracle", "Coupa", "Master Data", "P2P", "Enterprise Scale"],
  },
  {
    role: "Procurement & Tender Executive",
    company: "Fractal Systems",
    companyType: "Events Technology Integrator",
    period: "Jan 2024 \u2014 Apr 2025",
    location: "Dubai, UAE",
    highlights: [
      "Delivered 30+ major events including COP28, Esports World Cup, Art Dubai",
      "Achieved 10-20% cost savings per project through strategic sourcing",
      "Managed procurement for LED screens, kinetic systems, AV equipment",
      "Handled AED 600K single contract negotiations",
      "Built vendor network across UAE, KSA, Europe & Asia",
    ],
    tags: ["Events Tech", "Strategic Sourcing", "Vendor Management", "LED/AV", "Tenders"],
  },
  {
    role: "Procurement & Logistics Specialist",
    company: "Hafa Trading",
    companyType: "Oil & Gas Trading",
    period: "Aug 2021 \u2014 Jun 2023",
    location: "Riyadh, KSA",
    highlights: [
      "Oil & gas procurement & international logistics (air/land/sea)",
      "SABER & Etimad government portal compliance",
      "Managed Odoo ERP procurement module",
      "Mentored junior procurement staff",
    ],
    tags: ["Oil & Gas", "Logistics", "SABER", "Etimad", "Odoo"],
  },
  {
    role: "E-Commerce Buyer",
    company: "Saudi Supplier",
    companyType: "Industrial E-Commerce",
    period: "Jul 2021 \u2014 Apr 2023",
    location: "Remote (KSA)",
    highlights: [
      "Industrial e-commerce procurement & vendor sourcing",
      "Market analysis & cost reduction strategies",
      "Built supplier database for industrial products",
    ],
    tags: ["E-Commerce", "Sourcing", "Market Analysis"],
  },
  {
    role: "Supply Chain Coordinator",
    company: "Egyptian Army Retail Stores",
    companyType: "Military \u2014 Retail Operations",
    period: "Nov 2019 \u2014 Jan 2021",
    location: "Egypt",
    highlights: [
      "Inventory management & supply chain coordination",
      "Military service period \u2014 learned systems thinking",
      "Foundation lesson: 'Every organization runs on systems, and most systems are broken'",
    ],
    tags: ["Inventory", "Military", "Systems Thinking"],
  },
];

export const projects = [
  {
    title: "Operations Portal",
    subtitle: "Golden Sparrow Trading",
    description:
      "Built a comprehensive digital operations backbone from scratch \u2014 11 business workflow phases covering Lead Capture to HR Hiring, with 280+ documented workflow nodes and 45+ standard operating procedures. Successfully pitched Odoo ERP implementation to automate all documented processes.",
    tags: ["Process Design", "SOPs", "Odoo ERP", "Workflows", "Governance"],
    icon: "\u25CE",
    featured: true,
    unifiedCategory: "Systems & Automation" as const,
    metrics: {
      phases: 11,
      workflowNodes: "280+",
      sops: "45+",
      departments: 9,
    },
  },
  {
    title: "Tender Monitoring System",
    subtitle: "AI-Powered Automation",
    description:
      "Built automated tender tracking system for GCC markets using n8n workflows and AI. Monitors government procurement portals and delivers real-time alerts for relevant opportunities.",
    tags: ["n8n", "AI", "Automation", "GCC Tenders"],
    icon: "\u25B3",
    unifiedCategory: "Systems & Automation" as const,
  },
  {
    title: "ESG & Compliance Suite",
    subtitle: "Golden Sparrow Governance",
    description:
      "Authored complete governance documentation from scratch \u2014 ESG & Sustainability Policy, Anti-Bribery & Corruption Policy, QHSE Policy, and Code of Conduct & Ethical Business Statement.",
    tags: ["ESG", "QHSE", "Anti-Bribery", "Governance"],
    icon: "\u25C7",
    unifiedCategory: "Governance" as const,
  },
];

export const skillsRadar = [
  { name: "Procurement", level: 95 },
  { name: "ERP Systems", level: 92 },
  { name: "Supply Chain", level: 90 },
  { name: "Automation", level: 87 },
  { name: "Tenders", level: 93 },
  { name: "Negotiation", level: 88 },
];

export const toolBadges = [
  "Oracle",
  "SAP",
  "Odoo",
  "Coupa",
  "Zoho",
  "Laserfiche",
  "eSupply",
  "Etimad",
  "SABER",
  "ICV",
  "Tejari",
  "Ariba",
  "n8n",
  "AI Tools",
  "Mermaid",
  "Excel",
];

export const services = [
  {
    number: "01",
    title: "ERP Implementation",
    desc: "End-to-end Oracle, SAP & Odoo deployment \u2014 from gap analysis to go-live. Configured procurement, inventory, and P2P modules across multiple industries.",
  },
  {
    number: "02",
    title: "Procurement Setup",
    desc: "Complete department framework from scratch \u2014 policies, SOPs, workflows, vendor management systems, and compliance documentation.",
  },
  {
    number: "03",
    title: "Process Automation",
    desc: "n8n workflows, AI-powered monitoring, and digital transformation. Turning manual repetitive tasks into automated, scalable systems.",
  },
  {
    number: "04",
    title: "Tender Management",
    desc: "Portal registration, compliance documentation, strategic bidding, and end-to-end tender lifecycle management across GCC markets.",
  },
];

export const testimonials = {
  featured: [
    {
      name: "Avil Crasta",
      role: "Senior Sales Manager, Aoto",
      relationship: "Client",
      quote:
        "Mahmoud consistently demonstrated strong strategic thinking, commercial awareness, and a deep understanding of technically driven procurement. His ability to bridge the gap between technical teams, creative stakeholders, and suppliers made him a highly effective and trusted counterpart.",
    },
    {
      name: "Hanif Ullah",
      role: "Head of PMO, Fractal Systems",
      relationship: "Direct Manager",
      quote:
        "Mahmoud consistently went above and beyond in supporting our projects \u2014 proactively finding solutions, assisting the team, and tackling procurement, logistics, and lead-time challenges with a calm and structured approach. His problem-solving mindset and reliability made a real difference to project delivery.",
    },
  ],
  grid: [
    {
      name: "Mohsin Bilal",
      role: "CFO, Fractal Systems",
      relationship: "Senior Leadership",
      quote: "A dedicated professional who brings discipline and strategic thinking to procurement operations.",
    },
    {
      name: "Nasir Ali",
      role: "SC & Procurement Professional",
      relationship: "Same Team",
      quote:
        "He handled everything from sourcing vendors and negotiating contracts to managing tenders and supporting logistics with impressive clarity and ownership.",
    },
    {
      name: "Munsif Ali",
      role: "SC & Procurement Leader",
      relationship: "Same Team",
      quote:
        "Sharp negotiation skills, consistently securing favorable terms and high-quality materials. He successfully streamlined our purchasing process and increased departmental efficiency.",
    },
    {
      name: "Iffat Iqbal",
      role: "Group HR Head, Fractal Systems",
      relationship: "Senior Leadership",
      quote: "A professional who brings both dedication and a positive attitude to the workplace. Always willing to go the extra mile.",
    },
    {
      name: "Abdullah Mohamed",
      role: "Operations Management, Fractal Systems",
      relationship: "Same Team",
      quote: "His communication and follow-ups made our workflow smoother. A reliable team member you can always count on.",
    },
    {
      name: "Zain Dib",
      role: "Project Manager, Fractal Systems",
      relationship: "Cross-Team",
      quote:
        "Always took the initiative to find solutions and help procure from reliable sources. A person I could always rely on for accurate timelines.",
    },
  ],
  footer: "14 recommendations on LinkedIn",
};

export const contactTypes = [
  { type: "hiring", label: "Hiring", desc: "Full-time / contract opportunities" },
  { type: "consulting", label: "Consulting", desc: "Expert advisory & implementation" },
  { type: "collab", label: "Collaboration", desc: "Let's build something together" },
];

export const social = {
  linkedin: "https://www.linkedin.com/in/mahmoudf-abdallah",
  email: "mahmoudf.abdallah@outlook.com",
  whatsapp: "https://wa.me/971544720857",
  phone: "+971544720857",
};

// ============ PHASE 1 ADDITIONS ============

export const certifications = [
  {
    name: "CIPS Level 4 Diploma in Procurement & Supply",
    institution: "Chartered Institute of Procurement & Supply",
    status: "in-progress" as const,
    progress: 60,
    year: "2025 \u2014 Present",
    modules: [
      "Strategic Procurement",
      "Commercial Contracting",
      "Ethical Procurement & Supply",
      "Supplier Relationships",
      "Negotiation in Procurement",
      "Whole Life Asset Management",
    ],
  },
  {
    name: "CIPS Ethical Procurement & Supply Certificate",
    institution: "Chartered Institute of Procurement & Supply",
    status: "completed" as const,
    progress: 100,
    year: "2025",
    modules: [
      "Ethics in Practice",
      "Conflicts of Interest",
      "Gifts & Hospitality",
      "Anti-Bribery",
      "Modern Slavery",
      "Environmental Responsibility",
    ],
  },
  {
    name: "B.Sc. Accounting",
    institution: "Assiut University \u2014 Faculty of Commerce (English Section)",
    status: "completed" as const,
    progress: 100,
    year: "2019",
    modules: [],
  },
];

export const caseStudies = [
  {
    title: "Procurement Workflow",
    company: "Golden Sparrow Trading",
    before: {
      label: "Before",
      points: [
        "Manual purchase orders via email/WhatsApp",
        "No standardized vendor evaluation",
        "Zero documentation or SOPs",
        "Ad-hoc approval process",
      ],
    },
    after: {
      label: "After",
      points: [
        "11-phase automated Operations Portal",
        "Structured vendor scoring & onboarding",
        "45+ documented SOPs with workflows",
        "Multi-level digital approval chains",
      ],
    },
    metrics: [
      { label: "Process Time", before: "5 days", after: "1.5 days", improvement: "70%" },
      { label: "Documentation", before: "0 SOPs", after: "45+ SOPs", improvement: "100%" },
      { label: "Error Rate", before: "~25%", after: "<5%", improvement: "80%" },
    ],
  },
  {
    title: "Events Procurement",
    company: "Fractal Systems",
    before: {
      label: "Before",
      points: [
        "Single-source vendor dependency",
        "No cost benchmarking process",
        "Reactive last-minute purchasing",
        "Limited supplier negotiation",
      ],
    },
    after: {
      label: "After",
      points: [
        "Multi-vendor competitive sourcing",
        "Systematic cost comparison matrix",
        "Proactive procurement pipeline",
        "Strategic negotiation framework",
      ],
    },
    metrics: [
      { label: "Cost Savings", before: "0%", after: "10-20%", improvement: "AED 450K+" },
      { label: "Vendors", before: "~10", after: "50+", improvement: "5x" },
      { label: "Lead Time", before: "Reactive", after: "Planned", improvement: "Predictable" },
    ],
  },
];

export const toolGroups = [
  {
    category: "ERP & Business Systems",
    size: "large" as const,
    tools: ["Oracle", "Odoo", "SAP"],
    description: "Enterprise resource planning & business process management",
  },
  {
    category: "Procurement Platforms",
    size: "large" as const,
    tools: ["Coupa", "Zoho", "Laserfiche"],
    description: "Source-to-contract & document management",
  },
  {
    category: "Government Portals",
    size: "medium" as const,
    tools: ["eSupply Dubai", "Etimad", "SABER", "ICV Portal"],
    description: "GCC government procurement & compliance",
  },
  {
    category: "Tendering & Sourcing",
    size: "medium" as const,
    tools: ["Tejari", "Ariba", "Jaggaer"],
    description: "Strategic sourcing & e-tendering platforms",
  },
  {
    category: "Automation & AI",
    size: "small" as const,
    tools: ["n8n", "AI Monitoring", "Workflow Design"],
    description: "Process automation & intelligent monitoring",
  },
  {
    category: "Documentation",
    size: "small" as const,
    tools: ["Mermaid Diagrams", "Advanced Excel", "MS Office"],
    description: "Business documentation & analysis",
  },
];

export const screenshots = [
  {
    id: "ops-portal",
    title: "Operations Portal \u2014 Workflow Overview",
    description: "11-phase business workflow system with 280+ nodes covering Lead Capture to HR Hiring",
    category: "Operations Portal",
  },
  {
    id: "ops-sops",
    title: "SOP Documentation Framework",
    description: "45+ standard operating procedures organized by department and business phase",
    category: "Operations Portal",
  },
  {
    id: "odoo-erp",
    title: "Odoo ERP \u2014 Procurement Module",
    description: "Configured procurement, inventory, and purchase modules for automated operations",
    category: "ERP Systems",
  },
  {
    id: "n8n-tender",
    title: "n8n Tender Monitoring Workflow",
    description: "Automated government tender tracking with AI classification and Telegram alerts",
    category: "Automation",
  },
  {
    id: "mermaid-flow",
    title: "Procurement Process Flowchart",
    description: "Mermaid-based workflow diagram mapping the complete procurement lifecycle",
    category: "Process Design",
  },
  {
    id: "esg-policies",
    title: "ESG & Governance Suite",
    description: "Complete governance documentation \u2014 ESG, QHSE, Anti-Bribery & Code of Conduct",
    category: "Governance",
  },
];

// ============ PHASE 2-5 ADDITIONS ============

export const thoughts = [
  { date: "Jan 2026", content: "Just automated our entire supplier evaluation process. What used to take 3 days now takes 30 minutes." },
  { date: "Dec 2025", content: "Hot take: Most procurement inefficiencies aren't process problems — they're communication problems." },
  { date: "Nov 2025", content: "Passed another CIPS module today. The journey to Level 4 continues." },
  { date: "Oct 2025", content: "If your RFQ process still involves email attachments, we need to talk." },
  { date: "Sep 2025", content: "Built a tender monitoring dashboard in n8n that checks 5 government portals automatically. Automation wins." },
];

export const dailyTools = [
  { category: "Communication", tools: [{ name: "Slack", level: 85 }, { name: "MS Teams", level: 90 }, { name: "Outlook", level: 95 }] },
  { category: "ERP", tools: [{ name: "Oracle", level: 88 }, { name: "SAP", level: 80 }, { name: "Odoo", level: 95 }] },
  { category: "Automation", tools: [{ name: "n8n", level: 92 }, { name: "Python", level: 70 }, { name: "Make", level: 75 }] },
  { category: "AI", tools: [{ name: "Claude", level: 90 }, { name: "ChatGPT", level: 88 }, { name: "Copilot", level: 82 }] },
  { category: "Analytics", tools: [{ name: "Excel", level: 95 }, { name: "Power BI", level: 78 }, { name: "Google Sheets", level: 90 }] },
  { category: "Tools", tools: [{ name: "Notion", level: 88 }, { name: "Jira", level: 80 }, { name: "Git", level: 72 }] },
];

export const goals2026 = [
  { goal: "Complete CIPS Level 4 Diploma", progress: 60 },
  { goal: "Launch Independent Consulting", progress: 35 },
  { goal: "Build Personal Brand (1000 LinkedIn followers)", progress: 45 },
  { goal: "Master Odoo ERP Administration", progress: 70 },
  { goal: "Automate 10 Business Processes", progress: 80 },
];

export const kanbanBoard = {
  planning: [
    { title: "Launch Consulting Website", category: "Business", priority: "high" as const },
    { title: "CIPS Level 4 Module 5", category: "Education", priority: "medium" as const },
  ],
  inProgress: [
    { title: "Operations Portal Phase 2", category: "Operations", priority: "high" as const },
    { title: "Odoo ERP Optimization", category: "ERP", priority: "medium" as const },
  ],
  completed: [
    { title: "Operations Portal Phase 1", category: "Operations", priority: "high" as const },
    { title: "11-Phase Business Process System", category: "Operations", priority: "high" as const },
    { title: "Tender Monitoring System", category: "Automation", priority: "medium" as const },
  ],
};

export const visitorLocations = [
  { city: "Dubai", country: "UAE", lat: 25.276, lng: 55.296, size: 1.2 },
  { city: "Cairo", country: "Egypt", lat: 30.044, lng: 31.236, size: 0.6 },
  { city: "Riyadh", country: "Saudi Arabia", lat: 24.713, lng: 46.675, size: 0.6 },
  { city: "London", country: "UK", lat: 51.507, lng: -0.128, size: 0.4 },
  { city: "New York", country: "USA", lat: 40.713, lng: -74.006, size: 0.4 },
  { city: "Mumbai", country: "India", lat: 19.076, lng: 72.878, size: 0.4 },
  { city: "Singapore", country: "Singapore", lat: 1.352, lng: 103.82, size: 0.3 },
  { city: "Sydney", country: "Australia", lat: -33.869, lng: 151.209, size: 0.3 },
];

export const linkedInPosts = [
  {
    content: "Excited to share that I've completed building the Operations Portal at Golden Sparrow Trading — 11 business phases, 280+ workflow nodes, and 45+ SOPs. This is what happens when you document first, automate second.",
    reactions: 142,
    comments: 23,
    date: "2 weeks ago",
  },
  {
    content: "Just passed the CIPS Ethical Procurement & Supply Certificate. Understanding the ethics behind procurement decisions is just as important as the technical skills. If your procurement team doesn't have ethics training, that's a risk.",
    reactions: 98,
    comments: 15,
    date: "1 month ago",
  },
  {
    content: "Three months into my role at Golden Sparrow Trading — promoted from Procurement & Tender Expert to Supply Chain & Operations Manager. Grateful for the opportunity to build systems from scratch and drive real transformation.",
    reactions: 234,
    comments: 41,
    date: "3 months ago",
  },
];

export const currentStatus = {
  text: "Building Ops Portal v2",
  active: true,
};

export const availabilityConfig = {
  available: true,
  label: "Available for new opportunities",
  timeSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
  timezone: "Asia/Dubai (GST)",
};

export const motivationalQuotes = [
  { text: "The goal is not to do business with everybody who needs what you have. The goal is to do business with people who believe what you believe.", author: "Simon Sinek" },
  { text: "Efficiency is doing things right; effectiveness is doing the right things.", author: "Peter Drucker" },
  { text: "Supply chain is like nature. It is all around us.", author: "Dave Waters" },
  { text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.", author: "Socrates" },
  { text: "What gets measured gets managed.", author: "Peter Drucker" },
  { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Systems run the business. People run the systems.", author: "Michael Gerber" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
];

export const smartContactFields = {
  hiring: {
    label: "Hiring",
    icon: "Briefcase",
    desc: "Full-time / contract opportunities",
    fields: [
      { name: "company", label: "Company Name", type: "text" as const },
      { name: "role", label: "Role / Position", type: "text" as const },
      { name: "timeline", label: "Start Timeline", type: "select" as const, options: ["Immediately", "Within 1 month", "1-3 months", "Flexible"] },
    ],
  },
  consulting: {
    label: "Consulting",
    icon: "LineChart",
    desc: "Expert advisory & implementation",
    fields: [
      { name: "projectType", label: "Project Type", type: "select" as const, options: ["ERP Implementation", "Procurement Setup", "Process Automation", "Tender Management", "Other"] },
      { name: "budget", label: "Budget Range", type: "select" as const, options: ["< AED 25K", "AED 25K - 50K", "AED 50K - 100K", "AED 100K+", "To be discussed"] },
      { name: "timeline", label: "Project Timeline", type: "select" as const, options: ["1-2 weeks", "1-3 months", "3-6 months", "6+ months", "Ongoing"] },
    ],
  },
  collab: {
    label: "Collaboration",
    icon: "Users",
    desc: "Let's build something together",
    fields: [
      { name: "projectDesc", label: "Project Description", type: "textarea" as const },
    ],
  },
  sayhi: {
    label: "Just Say Hi",
    icon: "MessageCircle",
    desc: "Connect & network",
    fields: [],
  },
};

// ============ FRACTAL PROJECTS (re-exported from projects-data) ============

import {
  portfolioProjects,
  projectCategories,
  projectCategoryColors,
  projectCategoryIcons,
  type PortfolioProject,
} from "./projects-data";

export type FractalProject = PortfolioProject & { image: string | null; highlight: boolean };

export const fractalCategories = Object.entries(projectCategories).map(([key, name]) => ({
  name: key,
  label: name,
  icon: projectCategoryIcons[key as keyof typeof projectCategoryIcons] || "📋",
  color: projectCategoryColors[key as keyof typeof projectCategoryColors] || "#6366f1",
}));

export const fractalProjects: FractalProject[] = portfolioProjects.map((p) => ({
  ...p,
  image: p.hero ? `/projects/${p.hero}` : null,
  highlight: ["elie-saab-1001-seasons", "jetex-led-cube-cop28", "world-defense-show-2024", "iktva-aramco-2023"].includes(p.slug),
}));

export const unifiedStats = {
  totalProjects: portfolioProjects.length + "+",
  totalLED: "2,500+",
  vendorNetwork: "50+",
  countries: "6+",
};
