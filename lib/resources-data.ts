export type Resource = {
  title: string;
  slug: string;
  category: string;
  content: string;
};

export const resourceCategories = [
  "Procurement Basics",
  "ERP Systems",
  "Tender Management",
  "Process Automation",
];

export const resources: Resource[] = [
  {
    title: "What is Strategic Sourcing?",
    slug: "strategic-sourcing",
    category: "Procurement Basics",
    content: "Strategic sourcing goes beyond finding the cheapest supplier. It involves analyzing total cost of ownership, building long-term vendor relationships, and aligning procurement with organizational goals. Key steps include spend analysis, market research, supplier evaluation, negotiation, and ongoing performance monitoring. The goal is to create sustainable value, not just short-term savings.",
  },
  {
    title: "Understanding P2P (Procure-to-Pay)",
    slug: "procure-to-pay",
    category: "Procurement Basics",
    content: "The Procure-to-Pay cycle covers the entire journey from identifying a need to making payment. It includes requisition, approval, purchase order creation, goods receipt, invoice matching, and payment processing. A well-designed P2P process reduces maverick spending, improves compliance, and provides visibility into organizational expenditure. Modern ERP systems automate most of these steps.",
  },
  {
    title: "Oracle vs SAP vs Odoo: Which ERP?",
    slug: "erp-comparison",
    category: "ERP Systems",
    content: "Oracle suits large enterprises with complex global operations and deep financials. SAP excels in manufacturing and industries requiring tight supply chain integration. Odoo is ideal for mid-market companies wanting modular, cost-effective ERP with rapid implementation. The right choice depends on company size, budget, industry requirements, and internal technical capability. There is no universally best ERP — only the best fit for your specific needs.",
  },
  {
    title: "ERP Implementation Best Practices",
    slug: "erp-implementation",
    category: "ERP Systems",
    content: "Successful ERP implementation starts with documenting your business processes before touching any software. The biggest mistake companies make is configuring ERP modules without first understanding how work actually flows. Key practices include securing executive sponsorship, involving end users early, defining clear success metrics, planning data migration carefully, and investing heavily in training. Process first, technology second.",
  },
  {
    title: "GCC Tender Portals Guide",
    slug: "gcc-tender-portals",
    category: "Tender Management",
    content: "GCC governments use specific portals for procurement: UAE has eSupply Dubai and Tejari, Saudi Arabia uses Etimad and SABER for product compliance, and other GCC states have their own platforms. Registration typically requires trade license, tax registration, bank guarantee, and compliance certificates. Understanding each portal's requirements and timeline is critical for successful bid submissions.",
  },
  {
    title: "Writing Winning Tender Submissions",
    slug: "tender-submissions",
    category: "Tender Management",
    content: "A winning tender submission clearly demonstrates understanding of requirements, offers competitive pricing with transparent breakdowns, includes strong compliance documentation, and differentiates through relevant experience and case studies. Common mistakes include ignoring evaluation criteria weighting, submitting generic proposals, missing mandatory documents, and poor formatting. Every submission should feel tailored to the specific opportunity.",
  },
  {
    title: "Introduction to n8n Workflows",
    slug: "n8n-intro",
    category: "Process Automation",
    content: "n8n is an open-source workflow automation platform that connects applications and automates repetitive tasks. Unlike SaaS alternatives, it can be self-hosted for full data control. It supports 400+ integrations, custom JavaScript functions, conditional logic, and scheduled triggers. Common procurement use cases include automated vendor communication, tender monitoring, approval workflows, and reporting dashboards.",
  },
  {
    title: "Identifying Automation Opportunities",
    slug: "automation-opportunities",
    category: "Process Automation",
    content: "The best candidates for automation are tasks that are repetitive, rule-based, high-volume, and time-sensitive. In procurement, this includes order processing, invoice matching, vendor onboarding forms, compliance checks, and reporting. Start by mapping your processes, identifying bottlenecks, and calculating time spent on manual tasks. Prioritize based on potential time savings and error reduction. Automate the boring stuff first.",
  },
];
