export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "How I Saved 450K AED Through Strategic Procurement",
    slug: "strategic-procurement-savings",
    date: "2025-12-15",
    readTime: "6 min read",
    tags: ["Procurement", "Cost Savings", "Strategy"],
    excerpt: "A detailed breakdown of how strategic sourcing and vendor negotiation delivered massive cost reductions across multiple projects.",
    body: `<h2>The Challenge</h2>
<p>When I joined Fractal Systems as Procurement & Tender Executive, procurement was largely reactive. Single-source dependencies, no benchmarking process, and last-minute purchases were the norm. The opportunity for improvement was massive.</p>

<h2>The Approach</h2>
<p>I implemented a three-pronged strategy: competitive multi-vendor sourcing, systematic cost comparison matrices, and proactive procurement pipelines. Instead of accepting the first quote, every significant purchase went through a structured evaluation process.</p>

<h3>1. Multi-Vendor Competitive Sourcing</h3>
<p>I expanded our vendor network from approximately 10 suppliers to over 50, spanning UAE, KSA, Europe, and Asia. This created genuine competition and gave us negotiating leverage we never had before.</p>

<h3>2. Cost Comparison Matrices</h3>
<p>Every procurement decision above a threshold was documented with side-by-side vendor comparisons covering price, quality, lead time, warranty, and total cost of ownership. This removed subjectivity and made savings measurable.</p>

<h3>3. Proactive Pipeline Management</h3>
<p>By working closely with project managers, I could anticipate procurement needs weeks or months in advance. This eliminated emergency purchases — which always carry premium pricing — and opened up early-payment discounts.</p>

<h2>The Results</h2>
<p>Over the course of my tenure, these strategies delivered 10-20% cost savings per project, accumulating to over AED 450K in documented savings. But the real win was building a repeatable system — not a one-time effort.</p>

<h2>Key Takeaway</h2>
<p>Cost savings in procurement are not about squeezing suppliers. They come from having more options, better information, and earlier visibility. Build the system, and the savings follow.</p>`,
  },
  {
    title: "Why Every Company Needs an Operations Portal",
    slug: "operations-portal-guide",
    date: "2025-11-28",
    readTime: "5 min read",
    tags: ["Operations", "Digital Transformation", "SOPs"],
    excerpt: "Lessons learned from building an 11-phase Operations Portal with 280+ workflow nodes and 45+ SOPs at Golden Sparrow Trading.",
    body: `<h2>The Problem Most Companies Face</h2>
<p>Most companies operate on tribal knowledge. Processes exist in people's heads, not in documented systems. When someone leaves, their knowledge leaves with them. When something goes wrong, there is no standard to compare against.</p>

<h2>What is an Operations Portal?</h2>
<p>An Operations Portal is a comprehensive digital backbone that documents every business process, from lead capture to HR hiring. At Golden Sparrow Trading, I designed one covering 11 business phases with 280+ workflow nodes and 45+ standard operating procedures.</p>

<h3>The 11 Business Phases</h3>
<p>The portal covers the entire business lifecycle: Lead Capture, Quotation, Contract Management, Procurement, Warehouse Operations, Delivery, Invoicing, After-Sales, HR & Administration, Finance, and Strategic Planning. Each phase has detailed process flows, responsible parties, approval matrices, and exception handling procedures.</p>

<h2>Why It Matters</h2>
<p>Before the portal, process time for a typical procurement cycle was about 5 days with a 25% error rate. After implementation, it dropped to 1.5 days with less than 5% errors. Documentation went from zero SOPs to 45+ comprehensive procedures.</p>

<h2>The ERP Connection</h2>
<p>The Operations Portal became the blueprint for our Odoo ERP implementation. Instead of configuring ERP modules in isolation, every module was mapped to documented processes. This is the right way to implement ERP — process first, technology second.</p>

<h2>Getting Started</h2>
<p>You do not need to build all 11 phases at once. Start with your most painful process, document it thoroughly, get buy-in, and expand from there. The first SOP is the hardest. By the tenth, you have a template and a methodology.</p>`,
  },
  {
    title: "Automating Business Processes with n8n and Odoo",
    slug: "n8n-odoo-automation",
    date: "2025-10-10",
    readTime: "7 min read",
    tags: ["Automation", "n8n", "Odoo", "Technical"],
    excerpt: "A technical guide to connecting n8n workflows with Odoo ERP for procurement automation and tender monitoring.",
    body: `<h2>Why n8n?</h2>
<p>n8n is a workflow automation platform that connects virtually any system. Unlike Zapier or Make, it can be self-hosted, has no execution limits, and supports complex branching logic. For procurement and operations automation, it is an excellent choice.</p>

<h2>Use Case 1: Tender Monitoring Dashboard</h2>
<p>Government procurement portals across the GCC publish tenders daily, but monitoring them manually is tedious and error-prone. I built an n8n workflow that automatically checks 5 government procurement portals, uses AI classification to filter relevant tenders, and delivers real-time alerts via Telegram.</p>

<h3>Architecture</h3>
<p>The workflow runs on a schedule (every 4 hours during business days). For each portal, it scrapes or calls the API for new listings, passes them through an AI classifier that scores relevance based on our product categories and capabilities, and routes high-scoring tenders to the team via Telegram with direct links and key details.</p>

<h2>Use Case 2: Procurement Approval Workflow</h2>
<p>By connecting n8n to Odoo's API, purchase requests can trigger multi-level approval chains automatically. The workflow checks the request amount against approval thresholds, routes to the correct approver, sends reminders for pending approvals, and updates the PO status in Odoo once approved.</p>

<h2>Use Case 3: Supplier Evaluation Reminders</h2>
<p>Every quarter, active suppliers need performance reviews. An n8n workflow queries Odoo for suppliers due for evaluation, generates review forms, assigns them to procurement team members, and tracks completion. No more manual tracking in spreadsheets.</p>

<h2>Lessons Learned</h2>
<p>Start with high-frequency, low-risk processes. Get the team comfortable with automation before tackling critical workflows. Always build in error handling and notification for failures. Document every workflow — automation without documentation creates a different kind of tribal knowledge problem.</p>`,
  },
];
