// ═══════════════════════════════════════════════
// KNOWLEDGE BASE — Structured responses with short + detail
// ═══════════════════════════════════════════════

import type { Topic } from "./intents";

export interface KnowledgeEntry {
  short: string;
  detail: string;
  followUp?: string;
}

export type KnowledgeBase = Record<Topic, { en: KnowledgeEntry; ar: KnowledgeEntry } | null>;

export const KNOWLEDGE: KnowledgeBase = {
  // ═══ WHO IS ═══
  who_is: {
    en: {
      short: "Mahmoud Abdallah is a **Supply Chain & Operations Manager** based in Dubai with 7+ years cross-border experience.",
      detail: "**Mahmoud Abdallah** is a **Supply Chain & Operations Manager** based in **Dubai, UAE** 🇦🇪 with **7+ years** of cross-border experience spanning the UAE, KSA, and Egypt.\n\nHe transforms chaotic operations into **documented, automated, scalable systems**. His career spans military logistics, oil & gas procurement, events technology, FMCG enterprise operations, and heavy equipment trading.\n\n📊 **Key stats:** AED 450K+ in savings | 30+ major events delivered | Promoted in just 3 months | 11-phase Operations Portal built from scratch\n\nWant to know about his experience, skills, or services?",
      followUp: "Mahmoud's unique advantage is his **cross-industry perspective**. Starting from the **Egyptian Army** (where he learned systems thinking), he moved through **Hafa Trading** in oil & gas procurement in Saudi Arabia, then **Fractal Systems** delivering events tech for COP28 and Esports World Cup, **Americana Foods** managing P2P across 20+ markets, and now **Golden Sparrow Trading** where he built an entire operations framework from scratch.\n\nHe's also pursuing his **CIPS Level 4 Diploma** (60% complete) and holds a **B.Sc. in Accounting** from Assiut University. He speaks **Arabic** (native) and **English** (professional).",
    },
    ar: {
      short: "محمود عبدالله هو **مدير سلسلة التوريد والعمليات** مقيم في دبي وعنده 5+ سنين خبرة.",
      detail: "**محمود عبدالله** هو **مدير سلسلة التوريد والعمليات** مقيم في **دبي، الإمارات** 🇦🇪 وعنده **5+ سنين** خبرة في الإمارات والسعودية ومصر.\n\nبيحول العمليات الفوضوية لـ **أنظمة موثقة ومؤتمتة وقابلة للتوسع**. مسيرته المهنية شملت لوجستيات عسكرية، مشتريات بترول وغاز، تكنولوجيا فعاليات، عمليات FMCG، وتجارة معدات ثقيلة.\n\n📊 **أرقام مهمة:** وفّر أكتر من 450 ألف درهم | سلّم 30+ فعالية كبرى | ترقّى في 3 شهور بس | بنى بوابة عمليات من 11 مرحلة من الصفر\n\nعايز تعرف عن خبرته أو مهاراته أو خدماته؟",
      followUp: "ميزة أونز الفريدة هي **خبرته المتنوعة عبر الصناعات**. بدأ من **الجيش المصري** (اتعلم التفكير المنظومي)، بعدين راح **هافا للتجارة** في مشتريات البترول في السعودية، بعدين **فراكتال سيستمز** لتكنولوجيا الفعاليات لـ COP28 وكأس العالم للرياضات الإلكترونية، و**أمريكانا فودز** يدير P2P عبر 20+ سوق، ودلوقتي في **جولدن سبارو للتجارة** بنى فيها نظام عمليات كامل من الصفر.\n\nكمان بيدرس **CIPS Level 4** (وصل 60%) وعنده **بكالوريوس محاسبة** من جامعة أسيوط. بيتكلم **عربي** (لغة أم) و**إنجليزي** (مهني).",
    },
  },

  // ═══ EXPERIENCE ═══
  experience: {
    en: {
      short: "7+ years across 5 companies and 3 countries — military, oil & gas, events tech, FMCG, and heavy equipment.",
      detail: "Mahmoud has **7+ years** of progressive experience across **5 companies** and **3 countries** 🌍:\n\n🏗️ **Golden Sparrow Trading** (Oct 2024–Present) — Supply Chain & Operations Manager, Dubai\n🍔 **Americana Foods** (Apr–Sep 2025) — P2P & Master Data Executive, Dubai\n🎪 **Fractal Systems** (Jan 2024–Apr 2025) — Procurement & Tender Executive, Dubai\n🛢️ **Hafa Trading** (Aug 2021–Jun 2023) — Procurement & Logistics Specialist, Riyadh\n🛒 **Saudi Supplier** (Jul 2021–Apr 2023) — E-Commerce Buyer, Remote\n🎖️ **Egyptian Army** (Nov 2019–Jan 2021) — Supply Chain Coordinator, Egypt\n\nWant details on any specific role?",
      followUp: "Here's a deeper look at Mahmoud's **career progression**:\n\nHe started in the **Egyptian Army** managing retail supply chains during military service. This was where he discovered his core belief: *\"Every organization runs on systems, and most systems are broken.\"*\n\nFrom there he moved to **Saudi Arabia** — first as an E-Commerce Buyer at Saudi Supplier (industrial procurement), then at **Hafa Trading** handling oil & gas procurement and international logistics with SABER & Etimad government portal compliance.\n\nIn **2024**, he joined **Fractal Systems** in Dubai, delivering 30+ major events including **COP28** and the **Esports World Cup** — saving AED 450K+ through strategic sourcing.\n\nA brief stint at **Americana Foods** (KFC, Pizza Hut parent) gave him enterprise-scale P2P experience across 20+ markets using Oracle ERP.\n\nNow at **Golden Sparrow Trading**, he built the entire operations framework from scratch and got promoted in just **3 months**.",
    },
    ar: {
      short: "5+ سنين خبرة في 5 شركات و3 دول — عسكري، بترول، فعاليات، FMCG، ومعدات ثقيلة.",
      detail: "أونز عنده **5+ سنين** خبرة متطورة في **5 شركات** و**3 دول** 🌍:\n\n🏗️ **جولدن سبارو للتجارة** (أكتوبر 2024–الحالي) — مدير سلسلة التوريد والعمليات، دبي\n🍔 **أمريكانا فودز** (أبريل–سبتمبر 2025) — P2P ومسؤول البيانات الرئيسية، دبي\n🎪 **فراكتال سيستمز** (يناير 2024–أبريل 2025) — مسؤول مشتريات ومناقصات، دبي\n🛢️ **هافا للتجارة** (أغسطس 2021–يونيو 2023) — أخصائي مشتريات ولوجستيات، الرياض\n🛒 **سعودي سبلاير** (يوليو 2021–أبريل 2023) — مشتري إلكتروني\n🎖️ **الجيش المصري** (نوفمبر 2019–يناير 2021) — منسق سلسلة توريد، مصر\n\nعايز تفاصيل عن أي وظيفة بالتحديد؟",
      followUp: "نظرة أعمق على **المسيرة المهنية** لأونز:\n\nبدأ في **الجيش المصري** يدير سلاسل توريد. هنا اكتشف فلسفته: *\"كل مؤسسة بتشتغل بأنظمة، ومعظم الأنظمة محتاجة إصلاح.\"*\n\nبعدين راح **السعودية** — الأول كمشتري إلكتروني في سعودي سبلاير، وبعدين في **هافا** للمشتريات والبترول والغاز.\n\nفي **2024** انضم لـ **فراكتال** في دبي، سلّم 30+ فعالية كبرى منهم **COP28** ووفر 450+ ألف درهم.\n\nفترة في **أمريكانا** (أم KFC) أداته خبرة P2P على مستوى المؤسسة.\n\nدلوقتي في **جولدن سبارو** بنى نظام العمليات بالكامل واترقى في **3 شهور**.",
    },
  },

  // ═══ CURRENT ROLE ═══
  current_role: {
    en: {
      short: "Supply Chain & Operations Manager at Golden Sparrow Trading in Dubai — promoted in just 3 months! ⚡",
      detail: "Mahmoud is currently the **Supply Chain & Operations Manager** at **Golden Sparrow Trading LLC** 🏗️ (Heavy Equipment Trading) in Dubai since Oct 2024.\n\n⚡ **He was promoted from Procurement & Tender Expert in just 3 months!**\n\n**Key achievements:**\n• Built complete **Operations Portal** — 11 business phases, 280+ workflow nodes, 45+ SOPs\n• Pitched & secured **Odoo ERP** implementation approval\n• Created **ESG, QHSE, Anti-Bribery & Code of Conduct** policies from scratch\n• Designed organizational structure & cross-department coordination\n• Reports directly to the **General Manager** as the operational backbone",
    },
    ar: {
      short: "مدير سلسلة التوريد والعمليات في جولدن سبارو في دبي — اترقى في 3 شهور بس! ⚡",
      detail: "أونز حالياً **مدير سلسلة التوريد والعمليات** في **جولدن سبارو للتجارة** 🏗️ (تجارة معدات ثقيلة) في دبي من أكتوبر 2024.\n\n⚡ **اترقى من مسؤول مشتريات ومناقصات في 3 شهور بس!**\n\n**إنجازات رئيسية:**\n• بنى **بوابة عمليات** كاملة — 11 مرحلة، 280+ عقدة workflow، 45+ إجراء تشغيلي\n• قدّم وحصل على موافقة تطبيق **نظام Odoo ERP**\n• كتب سياسات **ESG والسلامة ومكافحة الرشوة وميثاق السلوك** من الصفر\n• صمم الهيكل التنظيمي وإطار التنسيق بين الإدارات\n• بيرفع تقاريره مباشرة لـ **المدير العام**",
    },
  },

  // ═══ FRACTAL ═══
  fractal: {
    en: {
      short: "Procurement & Tender Executive at Fractal Systems — delivered 30+ events including COP28, saved AED 450K+.",
      detail: "At **Fractal Systems** (Events Technology Integrator), Mahmoud was a **Procurement & Tender Executive** (Jan 2024–Apr 2025) in Dubai.\n\n🎪 **Highlights:**\n• Delivered **30+ major events** including **COP28**, **Esports World Cup**, **Art Dubai**\n• Achieved **10-20% cost savings** per project through strategic sourcing\n• Managed procurement for **LED screens, kinetic systems, AV equipment**\n• Handled **AED 600K** single contract negotiations\n• Built vendor network across **UAE, KSA, Europe & Asia**\n• The **1001 Seasons of Elie Saab** project won **\"Best Use of Technology\"** award 🏆\n\nThis is where he delivered the **AED 450K+ in total savings**!",
    },
    ar: {
      short: "مسؤول مشتريات ومناقصات في فراكتال — سلّم 30+ فعالية منهم COP28 ووفر 450+ ألف درهم.",
      detail: "في **فراكتال سيستمز** (تكنولوجيا الفعاليات)، أونز كان **مسؤول مشتريات ومناقصات** (يناير 2024–أبريل 2025) في دبي.\n\n🎪 **أبرز الإنجازات:**\n• سلّم **30+ فعالية كبرى** منهم **COP28** و**كأس العالم للرياضات الإلكترونية** و**Art Dubai**\n• حقق **10-20% توفير** في كل مشروع من خلال التوريد الاستراتيجي\n• أدار مشتريات **شاشات LED وأنظمة حركية ومعدات صوتيات**\n• تفاوض على عقود بقيمة **600 ألف درهم**\n• بنى شبكة موردين في **الإمارات والسعودية وأوروبا وآسيا**\n• مشروع **1001 Seasons of Elie Saab** فاز بجائزة **\"أفضل استخدام للتكنولوجيا\"** 🏆",
    },
  },

  // ═══ AMERICANA ═══
  americana: {
    en: {
      short: "P2P & Master Data Executive at Americana Foods (KFC, Pizza Hut) — enterprise-level across 20+ markets.",
      detail: "At **Americana Foods** (FMCG — operates KFC, Pizza Hut, Hardee's across 20+ markets), Mahmoud served as **P2P & Master Data Executive** (Apr–Sep 2025) in Dubai.\n\n🍔 **Key responsibilities:**\n• Managed enterprise **Procure-to-Pay cycle** across 20+ markets\n• **Master data governance** & SKU harmonization\n• Worked with **Oracle ERP, Coupa S2C, Zoho, Laserfiche**\n• **Vendor lifecycle management** across the entire MENA region\n\nThis was his first enterprise-scale role, managing P2P at a truly global level.",
    },
    ar: {
      short: "مسؤول P2P والبيانات الرئيسية في أمريكانا (KFC, Pizza Hut) — على مستوى المؤسسة في 20+ سوق.",
      detail: "في **أمريكانا فودز** (FMCG — بتشغّل KFC وPizza Hut وHardee's في 20+ سوق)، أونز كان **مسؤول P2P والبيانات الرئيسية** (أبريل–سبتمبر 2025) في دبي.\n\n🍔 **المسؤوليات:**\n• إدارة دورة **الشراء حتى الدفع** عبر 20+ سوق\n• حوكمة **البيانات الرئيسية** وتوحيد الـ SKUs\n• اشتغل على **Oracle ERP, Coupa S2C, Zoho, Laserfiche**\n• إدارة **دورة حياة الموردين** عبر منطقة MENA بالكامل",
    },
  },

  // ═══ HAFA ═══
  hafa: {
    en: {
      short: "Procurement & Logistics Specialist at Hafa Trading (Oil & Gas) in Riyadh, KSA.",
      detail: "At **Hafa Trading** (Oil & Gas Trading) in **Riyadh, KSA**, Mahmoud worked as **Procurement & Logistics Specialist** (Aug 2021–Jun 2023).\n\n🛢️ **Key work:**\n• Oil & gas procurement & **international logistics** (air/land/sea)\n• **SABER & Etimad** government portal compliance\n• Managed **Odoo ERP** procurement module\n• **Mentored junior procurement staff**\n\nThis role gave him deep expertise in government procurement portals and logistics across borders.",
    },
    ar: {
      short: "أخصائي مشتريات ولوجستيات في هافا للتجارة (بترول وغاز) في الرياض.",
      detail: "في **هافا للتجارة** (تجارة بترول وغاز) في **الرياض، السعودية**، أونز اشتغل **أخصائي مشتريات ولوجستيات** (أغسطس 2021–يونيو 2023).\n\n🛢️ **أهم الأعمال:**\n• مشتريات بترول وغاز و**لوجستيات دولية** (جوي/بري/بحري)\n• التوافق مع بوابات **سابر وإعتماد** الحكومية\n• إدارة وحدة المشتريات في **نظام Odoo ERP**\n• **تدريب وتوجيه** موظفي المشتريات المبتدئين",
    },
  },

  // ═══ ARMY ═══
  army: {
    en: {
      short: "Supply Chain Coordinator at the Egyptian Army — where systems thinking began. 🎖️",
      detail: "Mahmoud started his career at the **Egyptian Army Retail Stores** 🎖️ as a **Supply Chain Coordinator** (Nov 2019–Jan 2021) during his military service.\n\n**What he learned:**\n• Inventory management & supply chain coordination\n• Systems thinking — understanding how large organizations function\n• His foundation lesson: *\"Every organization runs on systems, and most systems are broken\"*\n\nThis experience planted the seed for his obsession with building systems and operational frameworks.",
    },
    ar: {
      short: "منسق سلسلة توريد في الجيش المصري — هنا بدأ التفكير المنظومي. 🎖️",
      detail: "أونز بدأ مسيرته في **مخازن الجيش المصري** 🎖️ كـ **منسق سلسلة توريد** (نوفمبر 2019–يناير 2021) أثناء خدمته العسكرية.\n\n**إيه اللي اتعلمه:**\n• إدارة مخزون وتنسيق سلسلة توريد\n• التفكير المنظومي — فهم إزاي المؤسسات الكبيرة بتشتغل\n• الدرس الأساسي: *\"كل مؤسسة بتشتغل بأنظمة، ومعظم الأنظمة محتاجة إصلاح\"*\n\nالتجربة دي زرعت فيه هوس بناء الأنظمة والأطر التشغيلية.",
    },
  },

  // ═══ SKILLS ═══
  skills: {
    en: {
      short: "Procurement 95%, Tenders 93%, ERP 92%, Supply Chain 90%, Negotiation 88%, Automation 87%.",
      detail: "Mahmoud has a **powerful skill set** spanning procurement, operations, and tech ⚡:\n\n📊 **Core Skills (Radar):**\n• Procurement: **95%** | Tenders: **93%** | ERP Systems: **92%**\n• Supply Chain: **90%** | Negotiation: **88%** | Automation: **87%**\n\n🛠️ **Tools:** Oracle, SAP, Odoo, Coupa, n8n, Python, Power BI, Excel, AI Tools (Claude, ChatGPT, Copilot)\n\n🏛️ **Government Portals:** eSupply, Etimad, SABER, ICV, Tejari, Ariba\n\n📋 **Documentation:** Mermaid Diagrams, Advanced Excel, Process Mapping, SOP Design\n\n🌍 **Soft Skills:** Cross-cultural communication (3 countries), team leadership, stakeholder management",
    },
    ar: {
      short: "مشتريات %95، مناقصات %93، ERP %92، سلسلة توريد %90، تفاوض %88، أتمتة %87.",
      detail: "أونز عنده **مجموعة مهارات قوية** في المشتريات والعمليات والتكنولوجيا ⚡:\n\n📊 **المهارات الأساسية:**\n• مشتريات: **%95** | مناقصات: **%93** | أنظمة ERP: **%92**\n• سلسلة توريد: **%90** | تفاوض: **%88** | أتمتة: **%87**\n\n🛠️ **الأدوات:** Oracle, SAP, Odoo, Coupa, n8n, Python, Power BI, Excel, أدوات ذكاء اصطناعي\n\n🏛️ **بوابات حكومية:** eSupply, إعتماد, سابر, ICV, تجاري, Ariba\n\n📋 **التوثيق:** مخططات Mermaid, Excel متقدم, تخطيط عمليات, تصميم SOPs\n\n🌍 **مهارات شخصية:** تواصل بين ثقافات (3 دول)، قيادة فرق، إدارة أصحاب مصلحة",
    },
  },

  // ═══ PROCUREMENT ═══
  procurement: {
    en: {
      short: "Procurement is his strongest domain at 95% — strategic sourcing, tenders, vendor negotiation, P2P.",
      detail: "Procurement is Mahmoud's **strongest domain** (95% proficiency) 📦:\n\n**What he does:**\n• **Strategic Sourcing** — multi-vendor competitive sourcing, cost comparison matrices\n• **Tender Management** — end-to-end from portal registration to bid submission\n• **Vendor Negotiation** — handled AED 600K single contracts, consistently saves 10-20%\n• **Supplier Management** — expanded networks from ~10 to 50+ vendors across UAE/KSA/Europe/Asia\n• **Government Procurement** — eSupply, Etimad, SABER, Tejari portal expertise\n• **P2P (Procure-to-Pay)** — enterprise-level cycle management across 20+ markets\n\nHis approach: *\"Cost savings aren't about squeezing suppliers — they come from better options, better information, and earlier visibility.\"*",
    },
    ar: {
      short: "المشتريات أقوى مجال عنده بإتقان %95 — توريد استراتيجي، مناقصات، تفاوض، P2P.",
      detail: "المشتريات هي **أقوى مجال** عند أونز (إتقان %95) 📦:\n\n**إيه بيعمل:**\n• **توريد استراتيجي** — توريد تنافسي متعدد الموردين، مصفوفات مقارنة تكاليف\n• **إدارة مناقصات** — من التسجيل في البوابات لحد تقديم العطاءات\n• **تفاوض مع موردين** — تفاوض على عقود بـ 600 ألف درهم، بيوفر 10-20% باستمرار\n• **إدارة موردين** — وسّع الشبكة من ~10 لأكتر من 50 مورد\n• **مشتريات حكومية** — خبير في eSupply وإعتماد وسابر وتجاري\n• **P2P** — إدارة دورة الشراء على مستوى المؤسسة في 20+ سوق",
    },
  },

  // ═══ SUPPLY CHAIN ═══
  supply_chain: {
    en: {
      short: "90% proficiency in supply chain — international logistics, inventory, warehouse ops, 50+ vendor network.",
      detail: "Mahmoud's **supply chain** expertise (90% proficiency) 🚛:\n\n• **International Logistics** — Air, land & sea freight coordination (Hafa Trading)\n• **Inventory Management** — Egyptian Army retail operations foundation\n• **Warehouse Operations** — Part of the 11-phase Operations Portal\n• **Vendor Network** — 50+ suppliers across UAE, KSA, Europe & Asia\n• **Cross-border Operations** — Experience in 3 countries with different regulations\n\nHis supply chain knowledge spans the full spectrum from inventory management to international logistics to strategic supply chain design.",
    },
    ar: {
      short: "إتقان %90 في سلسلة التوريد — لوجستيات دولية، مخزون، عمليات مخازن، 50+ مورد.",
      detail: "**خبرة سلسلة التوريد** عند أونز (إتقان %90) 🚛:\n\n• **لوجستيات دولية** — تنسيق شحن جوي وبري وبحري (هافا)\n• **إدارة مخزون** — من أساسيات الجيش المصري\n• **عمليات مخازن** — جزء من بوابة العمليات\n• **شبكة موردين** — 50+ مورد عبر 4 مناطق\n• **عمليات عبر الحدود** — خبرة في 3 دول بأنظمة مختلفة",
    },
  },

  // ═══ AUTOMATION ═══
  automation: {
    en: {
      short: "Hands-on automation with n8n (92%), Python, AI tools — document first, automate second. 🤖",
      detail: "Mahmoud combines procurement expertise with **hands-on automation skills** 🤖:\n\n⚡ **n8n Workflows** (92% proficiency) — Built automated tender monitoring system that checks 5 government portals and sends AI-classified alerts via Telegram\n🐍 **Python** (70%) — Scripting for data processing and automation\n🤖 **AI Tools** — Claude (90%), ChatGPT (88%), Copilot (82%) for productivity\n📊 **Power BI** (78%) — Dashboard creation and analytics\n📋 **Process Design** — Mermaid diagrams, workflow mapping, SOP documentation\n\n**Philosophy:** *\"Document first, automate second.\"* He builds the process framework, then automates it — not the other way around.",
    },
    ar: {
      short: "أتمتة عملية مع n8n (%92)، Python، أدوات AI — وثّق الأول، أتمت بعدين. 🤖",
      detail: "أونز بيجمع بين خبرة المشتريات و**مهارات أتمتة عملية** 🤖:\n\n⚡ **n8n** (إتقان %92) — بنى نظام مراقبة مناقصات أوتوماتيكي يفحص 5 بوابات حكومية ويبعت تنبيهات\n🐍 **Python** (%70) — سكريبتات لمعالجة البيانات والأتمتة\n🤖 **أدوات AI** — Claude (%90), ChatGPT (%88), Copilot (%82)\n📊 **Power BI** (%78) — عمل داشبوردات وتحليلات\n📋 **تصميم عمليات** — مخططات Mermaid, خرائط workflow, توثيق SOPs\n\n**فلسفته:** *\"وثّق الأول، أتمت بعدين.\"*",
    },
  },

  // ═══ ERP ═══
  erp: {
    en: {
      short: "Multi-ERP experience — Oracle 88%, SAP 80%, Odoo 95%, plus Coupa, Zoho, Laserfiche.",
      detail: "Mahmoud has hands-on experience with **multiple ERP platforms** 💻:\n\n🔵 **Oracle** — Enterprise P2P at Americana Foods (20+ markets)\n🟢 **Odoo** — Pitched, secured & managed implementation at Golden Sparrow + Hafa Trading\n🔴 **SAP** — Knowledge from enterprise procurement contexts\n🟡 **Coupa** — Source-to-Contract at Americana Foods\n📁 **Zoho & Laserfiche** — Document management & CRM\n\n**Government Portals:** eSupply Dubai, Etimad, SABER, ICV Portal, Tejari, Ariba, Jaggaer\n\nHis proficiency: **Oracle 88% | SAP 80% | Odoo 95%**\n\nHe believes in *\"process first, technology second\"* — document your workflows before configuring any ERP.",
    },
    ar: {
      short: "خبرة متعددة في ERP — Oracle %88، SAP %80، Odoo %95، وكمان Coupa وZoho.",
      detail: "أونز عنده خبرة عملية مع **عدة أنظمة ERP** 💻:\n\n🔵 **Oracle** — P2P على مستوى المؤسسة في أمريكانا (20+ سوق)\n🟢 **Odoo** — قدّم وحصل على الموافقة وأدار التطبيق في جولدن سبارو + هافا\n🔴 **SAP** — معرفة من سياقات المشتريات المؤسسية\n🟡 **Coupa** — Source-to-Contract في أمريكانا\n📁 **Zoho & Laserfiche** — إدارة مستندات و CRM\n\n**بوابات حكومية:** eSupply Dubai, إعتماد, سابر, ICV, تجاري, Ariba, Jaggaer\n\nمستوى إتقانه: **Oracle %88 | SAP %80 | Odoo %95**\n\nفلسفته: *\"العملية الأول، التكنولوجيا بعدين\"* — وثّق سير العمل قبل ما تضبط أي ERP.",
    },
  },

  // ═══ ODOO ═══
  odoo: {
    en: {
      short: "Deep Odoo expertise at 95% — pitched, secured, and manages implementation at Golden Sparrow. 🟢",
      detail: "Mahmoud has **deep Odoo expertise** (95% proficiency) 🟢:\n\n**At Golden Sparrow Trading:**\n• Pitched & secured **Odoo ERP implementation** approval from management\n• Used the Operations Portal as the blueprint — process first, technology second\n• Configuring procurement, inventory, and purchase modules\n\n**At Hafa Trading:**\n• Managed the **Odoo procurement module** for oil & gas operations\n• Hands-on configuration and daily usage\n\nHis Odoo mastery goal for 2026 is at **70% progress**. He's one of his strongest ERP platforms.",
    },
    ar: {
      short: "خبرة عميقة في Odoo بإتقان %95 — قدّم وحصل على الموافقة وبيدير التطبيق. 🟢",
      detail: "أونز عنده **خبرة عميقة في Odoo** (إتقان %95) 🟢:\n\n**في جولدن سبارو:**\n• قدّم وحصل على **موافقة تطبيق Odoo ERP** من الإدارة\n• استخدم بوابة العمليات كخريطة — العملية أولاً، التكنولوجيا بعدين\n\n**في هافا:**\n• أدار **وحدة المشتريات في Odoo** لعمليات البترول\n\nهدفه لـ 2026 إتقان إدارة Odoo بالكامل — وصل **%70**.",
    },
  },

  // ═══ ACHIEVEMENTS ═══
  achievements: {
    en: {
      short: "AED 450K+ savings, 3-month promotion, 30+ events, award-winning projects. 📊",
      detail: "Mahmoud's **key achievements** are backed by real numbers 📊:\n\n💰 **AED 450K+** in documented cost savings through strategic sourcing\n⚡ **3-month promotion** — fastest at Golden Sparrow Trading (Procurement Expert → Operations Manager)\n🏗️ **11-phase Operations Portal** — 280+ workflow nodes, 45+ SOPs, 9 departments covered\n🎪 **30+ major events** delivered including COP28, Esports World Cup, Art Dubai\n🏆 **\"Best Use of Technology\"** award for 1001 Seasons of Elie Saab project\n📈 **10-20% cost savings** per project consistently\n🌐 **50+ vendor network** built across UAE, KSA, Europe & Asia\n💼 **AED 600K** single contract negotiation\n📉 Reduced procurement error rate from **~25% to <5%**\n⏱️ Cut process time from **5 days to 1.5 days**",
    },
    ar: {
      short: "450+ ألف درهم توفير، ترقية في 3 شهور، 30+ فعالية، مشاريع حائزة على جوائز. 📊",
      detail: "**إنجازات أونز** مبنية على أرقام حقيقية 📊:\n\n💰 **450+ ألف درهم** توفير موثق من خلال التوريد الاستراتيجي\n⚡ **ترقية في 3 شهور** — الأسرع في جولدن سبارو (من مسؤول مشتريات لمدير عمليات)\n🏗️ **بوابة عمليات من 11 مرحلة** — 280+ عقدة workflow، 45+ إجراء تشغيلي\n🎪 **30+ فعالية كبرى** منهم COP28 وكأس العالم للرياضات الإلكترونية\n🏆 جائزة **\"أفضل استخدام للتكنولوجيا\"** لمشروع 1001 Seasons of Elie Saab\n📈 **10-20% توفير** في كل مشروع\n🌐 بنى شبكة **50+ مورد** عبر 4 مناطق\n📉 قلل نسبة الأخطاء من **~25% لأقل من 5%**\n⏱️ قلل وقت العمليات من **5 أيام لـ 1.5 يوم**",
    },
  },

  // ═══ OPERATIONS PORTAL ═══
  operations_portal: {
    en: {
      short: "11-phase digital operations backbone — 280+ workflow nodes, 45+ SOPs, 9 departments. 🏗️",
      detail: "The **Operations Portal** is Mahmoud's signature project at Golden Sparrow Trading 🏗️:\n\n📐 **What it is:** A comprehensive digital operations backbone covering the entire business lifecycle.\n\n**The 11 Business Phases:**\nLead Capture → Quotation → Contract Management → Procurement → Warehouse Operations → Delivery → Invoicing → After-Sales → HR & Administration → Finance → Strategic Planning\n\n📊 **By the numbers:**\n• **280+ workflow nodes** mapped and documented\n• **45+ SOPs** with detailed process flows\n• **9 departments** coordinated\n• Process time reduced from **5 days → 1.5 days**\n• Error rate reduced from **~25% → <5%**\n\n🔗 **ERP Connection:** The portal became the blueprint for **Odoo ERP implementation** — process first, technology second.",
    },
    ar: {
      short: "بوابة عمليات من 11 مرحلة — 280+ عقدة، 45+ إجراء، 9 أقسام. 🏗️",
      detail: "**بوابة العمليات** هي أهم مشروع لأونز في جولدن سبارو 🏗️:\n\n📐 **إيه هي:** عمود فقري رقمي شامل بيغطي كل دورة حياة الأعمال.\n\n**الـ 11 مرحلة:**\nاستقطاب عملاء → عروض أسعار → إدارة عقود → مشتريات → مخازن → توصيل → فواتير → ما بعد البيع → موارد بشرية → مالية → تخطيط استراتيجي\n\n📊 **بالأرقام:**\n• **280+ عقدة workflow** موثقة\n• **45+ إجراء تشغيلي** بخرائط عمليات مفصلة\n• **9 أقسام** منسقة\n• وقت العمليات اتقلل من **5 أيام لـ 1.5 يوم**\n• نسبة الأخطاء اتقللت من **~25% لأقل من 5%**\n\n🔗 البوابة بقت الخريطة لتطبيق **نظام Odoo ERP**.",
    },
  },

  // ═══ EDUCATION ═══
  education: {
    en: {
      short: "B.Sc. Accounting (Assiut University) + CIPS Level 4 Diploma in progress (60%). 🎓",
      detail: "Mahmoud's **education** 🎓:\n\n📜 **B.Sc. Accounting** — Assiut University, Faculty of Commerce (English Section), 2019\n\n📚 **CIPS Level 4 Diploma in Procurement & Supply** — Currently in progress (60% complete)\nModules: Strategic Procurement, Commercial Contracting, Ethical Procurement & Supply, Supplier Relationships, Negotiation in Procurement, Whole Life Asset Management\n\n✅ **CIPS Ethical Procurement & Supply Certificate** — Completed 2025\nCovered: Ethics in Practice, Conflicts of Interest, Anti-Bribery, Modern Slavery, Environmental Responsibility\n\nHe combines formal accounting knowledge with specialized procurement certification.",
    },
    ar: {
      short: "بكالوريوس محاسبة (جامعة أسيوط) + دبلوم CIPS المستوى 4 قيد الدراسة (%60). 🎓",
      detail: "**تعليم أونز** 🎓:\n\n📜 **بكالوريوس محاسبة** — جامعة أسيوط، كلية التجارة (شعبة إنجليزي)، 2019\n\n📚 **دبلوم CIPS المستوى 4 في المشتريات والتوريد** — قيد الدراسة حالياً (60%)\nالمواد: التوريد الاستراتيجي، التعاقد التجاري، المشتريات الأخلاقية، علاقات الموردين، التفاوض، إدارة الأصول\n\n✅ **شهادة CIPS في المشتريات الأخلاقية** — مكتملة 2025\n\nبيجمع بين معرفة المحاسبة الأكاديمية وتخصص المشتريات المعتمد.",
    },
  },

  // ═══ CERTIFICATIONS ═══
  certifications: {
    en: {
      short: "CIPS Level 4 Diploma (60% done) + CIPS Ethical Procurement Certificate (2025). 📋",
      detail: "Mahmoud's **certifications** 📋:\n\n📚 **CIPS Level 4 Diploma in Procurement & Supply** — In Progress (60%)\n• Chartered Institute of Procurement & Supply (UK)\n• Modules: Strategic Procurement, Commercial Contracting, Ethical Procurement, Supplier Relationships, Negotiation, Whole Life Asset Management\n\n✅ **CIPS Ethical Procurement & Supply Certificate** — Completed 2025\n• Ethics in Practice, Conflicts of Interest, Gifts & Hospitality, Anti-Bribery, Modern Slavery, Environmental Responsibility\n\n🎓 **B.Sc. Accounting** — Assiut University, 2019\n\nCIPS is one of the most respected procurement certifications globally!",
    },
    ar: {
      short: "دبلوم CIPS المستوى 4 (%60 مكتمل) + شهادة CIPS للمشتريات الأخلاقية (2025). 📋",
      detail: "**شهادات أونز** 📋:\n\n📚 **دبلوم CIPS المستوى 4** — قيد الدراسة (%60 مكتمل)\n• المعهد القانوني للمشتريات والتوريد (بريطانيا)\n\n✅ **شهادة CIPS للمشتريات الأخلاقية** — مكتملة 2025\n\n🎓 **بكالوريوس محاسبة** — جامعة أسيوط، 2019\n\nCIPS من أكتر شهادات المشتريات احتراماً عالمياً!",
    },
  },

  // ═══ SERVICES ═══
  services: {
    en: {
      short: "4 core services: ERP Implementation, Procurement Setup, Process Automation, Tender Management. 💼",
      detail: "Mahmoud offers **4 core services** 💼:\n\n**01. ERP Implementation**\nEnd-to-end Oracle, SAP & Odoo deployment — from gap analysis to go-live. Configured procurement, inventory, and P2P modules across multiple industries.\n\n**02. Procurement Setup**\nComplete department framework from scratch — policies, SOPs, workflows, vendor management systems, and compliance documentation.\n\n**03. Process Automation**\nn8n workflows, AI-powered monitoring, and digital transformation. Turning manual tasks into automated, scalable systems.\n\n**04. Tender Management**\nPortal registration, compliance documentation, strategic bidding, and end-to-end tender lifecycle management across GCC markets.\n\n📩 Interested? Use the **contact form** on this site or reach out directly!",
    },
    ar: {
      short: "4 خدمات: تطبيق ERP، إعداد مشتريات، أتمتة عمليات، إدارة مناقصات. 💼",
      detail: "أونز بيقدم **4 خدمات أساسية** 💼:\n\n**01. تطبيق أنظمة ERP**\nOracle, SAP & Odoo من التحليل للتشغيل.\n\n**02. إعداد قسم المشتريات**\nبناء إطار كامل من الصفر — سياسات، SOPs، workflows، إدارة موردين.\n\n**03. أتمتة العمليات**\nn8n workflows، مراقبة بالذكاء الاصطناعي، تحول رقمي.\n\n**04. إدارة المناقصات**\nتسجيل بوابات، توثيق، عطاءات استراتيجية عبر أسواق الخليج.\n\n📩 مهتم؟ استخدم **نموذج التواصل** في الموقع أو تواصل مباشرة!",
    },
  },

  // ═══ CONTACT ═══
  contact: {
    en: {
      short: "Email: mahmoudf.abdallah@outlook.com | WhatsApp: +971 54 472 0857 | LinkedIn available. 📬",
      detail: "Here's how to reach Mahmoud 📬:\n\n📧 **Email:** mahmoudf.abdallah@outlook.com\n📱 **Phone / WhatsApp:** +971 54 472 0857\n💼 **LinkedIn:** [linkedin.com/in/mahmoudf-abdallah](https://www.linkedin.com/in/mahmoudf-abdallah)\n\nOr use the **Contact Form** right on this website — you can select whether you're interested in hiring, consulting, collaboration, or just saying hi!\n\n**He's currently available for opportunities** ✅",
    },
    ar: {
      short: "إيميل: mahmoudf.abdallah@outlook.com | واتساب: +971 54 472 0857 | لينكدإن متاح. 📬",
      detail: "إزاي تتواصل مع أونز 📬:\n\n📧 **إيميل:** mahmoudf.abdallah@outlook.com\n📱 **تليفون / واتساب:** +971 54 472 0857\n💼 **لينكدإن:** [linkedin.com/in/mahmoudf-abdallah](https://www.linkedin.com/in/mahmoudf-abdallah)\n\nأو استخدم **نموذج التواصل** هنا في الموقع — تقدر تختار لو عايز توظيف أو استشارات أو تعاون أو حتى تقول أهلاً!\n\n**هو متاح حالياً لفرص جديدة** ✅",
    },
  },

  // ═══ LOCATION ═══
  location: {
    en: {
      short: "Based in Dubai, UAE 🇦🇪 — Egyptian national with experience across Egypt, KSA, and UAE.",
      detail: "Mahmoud is **based in Dubai, UAE** 🇦🇪\n\nHe's **Egyptian** 🇪🇬 and has worked across **3 countries:**\n• 🇪🇬 **Egypt** — Egyptian Army (military service)\n• 🇸🇦 **Saudi Arabia (Riyadh)** — Hafa Trading (oil & gas)\n• 🇦🇪 **UAE (Dubai)** — Fractal Systems, Americana Foods, Golden Sparrow (current)\n\nThis cross-border experience gives him unique insights into GCC procurement practices, government regulations, and regional supply chains.",
    },
    ar: {
      short: "مقيم في دبي، الإمارات 🇦🇪 — مصري اشتغل في مصر والسعودية والإمارات.",
      detail: "أونز **مقيم في دبي، الإمارات** 🇦🇪\n\nهو **مصري** 🇪🇬 واشتغل في **3 دول:**\n• 🇪🇬 **مصر** — الجيش المصري\n• 🇸🇦 **السعودية (الرياض)** — هافا للتجارة\n• 🇦🇪 **الإمارات (دبي)** — فراكتال وأمريكانا وجولدن سبارو (حالياً)\n\nالخبرة دي عبر الحدود بتديله فهم فريد لممارسات المشتريات في الخليج.",
    },
  },

  // ═══ LANGUAGES ═══
  languages: {
    en: {
      short: "Arabic (native — Egyptian dialect) and English (professional working proficiency). 🗣️",
      detail: "Mahmoud speaks **2 languages** 🗣️:\n\n🇪🇬 **Arabic** — Native (Egyptian dialect)\n🇬🇧 **English** — Professional working proficiency\n\nHe's comfortable working in both languages across multicultural teams in the UAE, KSA, and Egypt.",
    },
    ar: {
      short: "عربي (لغة أم — عامية مصرية) وإنجليزي (مستوى مهني). 🗣️",
      detail: "أونز بيتكلم **لغتين** 🗣️:\n\n🇪🇬 **عربي** — لغة أم (عامية مصرية)\n🇬🇧 **إنجليزي** — مستوى مهني\n\nبيشتغل بالاتنين في فرق متعددة الثقافات في الإمارات والسعودية ومصر.",
    },
  },

  // ═══ AVAILABILITY (NEW) ═══
  availability: {
    en: {
      short: "He's open to full-time, consulting, and freelance opportunities in the UAE. ✅",
      detail: "**Yes! Mahmoud is currently available** for new opportunities ✅\n\nHe's open to:\n• 💼 **Full-time roles** — Supply Chain, Operations, Procurement leadership\n• 🧠 **Consulting projects** — ERP implementation, procurement setup, process automation\n• 🤝 **Collaboration** — Building things together\n\n**Currently working on:** Building Operations Portal Phase 2 at Golden Sparrow Trading\n\n📩 Reach out via the **contact form** on this site, or directly:\n• Email: mahmoudf.abdallah@outlook.com\n• WhatsApp: +971 54 472 0857\n• LinkedIn: linkedin.com/in/mahmoudf-abdallah",
    },
    ar: {
      short: "متاح لوظائف بدوام كامل، استشارات، وفريلانس في الإمارات. ✅",
      detail: "**أيوا! أونز متاح حالياً** لفرص جديدة ✅\n\nمنفتح على:\n• 💼 **وظائف بدوام كامل** — قيادة سلسلة توريد وعمليات ومشتريات\n• 🧠 **مشاريع استشارية** — تطبيق ERP، إعداد مشتريات، أتمتة\n• 🤝 **تعاون** — نبني حاجة مع بعض\n\n**بيشتغل حالياً على:** بوابة العمليات المرحلة 2 في جولدن سبارو\n\n📩 تواصل عبر **نموذج التواصل** أو مباشرة:\n• إيميل: mahmoudf.abdallah@outlook.com\n• واتساب: +971 54 472 0857",
    },
  },

  // ═══ WHY HIRE (NEW) ═══
  why_hire: {
    en: {
      short: "Cross-industry expertise, AED 450K+ savings, systems builder, automation-driven, promoted in 3 months. 🎯",
      detail: "**Why hire Mahmoud?** Here's his value proposition 🎯:\n\n💰 **Proven ROI** — AED 450K+ in documented savings through strategic sourcing\n⚡ **Fast impact** — Got promoted in just 3 months at his current company\n🏗️ **Systems builder** — Built an 11-phase Operations Portal with 280+ workflow nodes from scratch\n🌍 **Cross-border expertise** — 7+ years across UAE, KSA & Egypt with deep GCC knowledge\n🤖 **Automation-driven** — Combines procurement expertise with n8n, Python, AI tools\n📋 **Process-first mindset** — Documents before automating, ensuring sustainable improvements\n🎪 **High-pressure delivery** — COP28, Esports World Cup, Elie Saab — delivered on time, every time\n\nHe doesn't just fill a role — he **builds the operating system** for your business. 📩 Reach out via the contact form!",
    },
    ar: {
      short: "خبرة متعددة، 450+ ألف درهم توفير، بانٍ أنظمة، أتمتة، ترقية في 3 شهور. 🎯",
      detail: "**ليه توظف أونز؟** القيمة اللي بيقدمها 🎯:\n\n💰 **عائد مُثبت** — 450+ ألف درهم توفير موثق\n⚡ **تأثير سريع** — اترقى في 3 شهور في شركته الحالية\n🏗️ **بانٍ أنظمة** — بنى بوابة عمليات من 11 مرحلة و280+ عقدة من الصفر\n🌍 **خبرة عبر الحدود** — 5+ سنين في الإمارات والسعودية ومصر\n🤖 **مدفوع بالأتمتة** — بيجمع المشتريات مع n8n وPython وأدوات AI\n📋 **عقلية العملية أولاً** — بيوثّق قبل ما يأتمت\n🎪 **تسليم تحت ضغط** — COP28 وكأس العالم وElie Saab — سلّم في الوقت كل مرة\n\nهو مش بس بيملا وظيفة — هو **بيبني نظام التشغيل** لبيزنسك. 📩 تواصل عبر نموذج التواصل!",
    },
  },

  // ═══ SALARY (NEW) ═══
  salary: {
    en: {
      short: "For rates and compensation, reach out directly via the contact form. Every project is different! 💬",
      detail: "For consulting rates and compensation discussions, it's best to **connect with Mahmoud directly** — every project is different 💬\n\n📩 **Email:** mahmoudf.abdallah@outlook.com\n📱 **WhatsApp:** +971 54 472 0857\n\nOr use the **Contact Form** on this site and select \"Consulting\" — there's a budget range selector to help start the conversation. He's flexible and always happy to discuss scope and pricing!",
    },
    ar: {
      short: "بالنسبة للأسعار والتعويضات، تواصل مباشرة عبر نموذج التواصل. كل مشروع مختلف! 💬",
      detail: "بالنسبة لأسعار الاستشارات والتعويضات، الأفضل **تتواصل مع أونز مباشرة** — كل مشروع مختلف 💬\n\n📩 **إيميل:** mahmoudf.abdallah@outlook.com\n📱 **واتساب:** +971 54 472 0857\n\nأو استخدم **نموذج التواصل** واختار \"استشارات\" — فيه اختيار نطاق ميزانية يساعد تبدأ الحوار.",
    },
  },

  // ═══ PROJECTS ═══
  projects: {
    en: {
      short: "Operations Portal, COP28 LED Cube, Elie Saab (award-winning), Esports World Cup, AI tender monitor. 🏆",
      detail: "Mahmoud's **notable projects** 🏆:\n\n🏗️ **Operations Portal** (Golden Sparrow) — 11-phase digital operations backbone with 280+ workflow nodes and 45+ SOPs\n\n⭐ **1001 Seasons of Elie Saab** (Fractal) — 10 massive rotating LED towers, Celine Dion & J.Lo performed. Won **\"Best Use of Technology\"** award\n\n🌍 **JETEX LED Cube at COP28** — 10m×10m×10m LED cube, 7-day emergency procurement of 600 sqm LED panels\n\n🎮 **Esports World Cup 2025** — 33 kinetic platforms (800kg each) for Saudi Arabia\n\n🤖 **Tender Monitoring System** — AI-powered n8n automation checking 5 government portals\n\n📜 **ESG & Compliance Suite** — Full governance documentation from scratch",
    },
    ar: {
      short: "بوابة العمليات، COP28، Elie Saab (حائز على جائزة)، كأس العالم للرياضات الإلكترونية، مراقبة مناقصات AI. 🏆",
      detail: "**مشاريع أونز المميزة** 🏆:\n\n🏗️ **بوابة العمليات** — 11 مرحلة، 280+ عقدة، 45+ إجراء\n⭐ **1001 Seasons of Elie Saab** — 10 أبراج LED ضخمة، فازت بجائزة \"أفضل تكنولوجيا\"\n🌍 **مكعب LED في COP28** — مشتريات طوارئ في 7 أيام\n🎮 **كأس العالم للرياضات الإلكترونية** — 33 منصة حركية\n🤖 **نظام مراقبة مناقصات** — أتمتة بالذكاء الاصطناعي\n📜 **مجموعة ESG والحوكمة** — توثيق كامل من الصفر",
    },
  },

  // ═══ TESTIMONIALS ═══
  testimonials: {
    en: {
      short: "14 LinkedIn recommendations from managers, colleagues, and clients. 🌟",
      detail: "Mahmoud has **14 recommendations on LinkedIn** 🌟 Here are some highlights:\n\n💬 **Avil Crasta** (Senior Sales Manager, Aoto — Client): *\"Strong strategic thinking, commercial awareness, and deep understanding of technically driven procurement.\"*\n\n💬 **Hanif Ullah** (Head of PMO, Fractal — Direct Manager): *\"Proactively finding solutions, assisting the team, tackling procurement challenges with a calm and structured approach.\"*\n\n💬 **Munsif Ali** (SC & Procurement Leader): *\"Sharp negotiation skills, consistently securing favorable terms. Successfully streamlined purchasing and increased efficiency.\"*\n\nCheck the Testimonials section on this site for all reviews!",
    },
    ar: {
      short: "14 توصية على LinkedIn من مديرين وزملاء وعملاء. 🌟",
      detail: "أونز عنده **14 توصية على LinkedIn** 🌟\n\n💬 **Avil Crasta** (مدير مبيعات — عميل): *\"تفكير استراتيجي قوي ووعي تجاري وفهم عميق للمشتريات التقنية.\"*\n\n💬 **Hanif Ullah** (رئيس PMO — مدير مباشر): *\"بيلاقي حلول بشكل استباقي ويتعامل مع تحديات المشتريات بهدوء ومنهجية.\"*\n\n💬 **Munsif Ali** (قائد مشتريات): *\"مهارات تفاوض حادة، دايماً بيحصل على شروط مفضلة.\"*\n\nشوف قسم التوصيات في الموقع للمزيد!",
    },
  },

  // ═══ ANALYTICS ═══
  analytics: {
    en: {
      short: "Excel 95%, Power BI 78%, Google Sheets 90% — data-driven procurement decisions. 📊",
      detail: "Mahmoud's **analytics & reporting** capabilities 📊:\n\n📊 **Excel** — 95% proficiency (advanced formulas, pivot tables, data modeling)\n📈 **Power BI** — 78% proficiency (dashboard creation, data visualization)\n📋 **Google Sheets** — 90% proficiency\n📉 **Data Analysis** — Cost comparison matrices, spend analysis, vendor scoring\n\nHe uses these tools to create **data-driven procurement decisions** — from vendor evaluations to spend analytics and performance dashboards.",
    },
    ar: {
      short: "Excel %95، Power BI %78، Google Sheets %90 — قرارات مشتريات مبنية على بيانات. 📊",
      detail: "**قدرات التحليل والتقارير** عند أونز 📊:\n\n📊 **Excel** — إتقان %95 (معادلات متقدمة، Pivot Tables)\n📈 **Power BI** — إتقان %78 (داشبوردات، تصور بيانات)\n📋 **Google Sheets** — إتقان %90\n📉 **تحليل بيانات** — مقارنات تكلفة، تحليل إنفاق، تقييم موردين",
    },
  },

  // ═══ POLICIES ═══
  policies: {
    en: {
      short: "Authored ESG, QHSE, Anti-Bribery, and Code of Conduct policies from scratch. 📜",
      detail: "At Golden Sparrow Trading, Mahmoud authored the company's entire **governance documentation** from scratch 📜:\n\n• 🌱 **ESG & Sustainability Policy**\n• 🛡️ **Anti-Bribery & Corruption Policy**\n• ⚠️ **QHSE Policy** (Quality, Health, Safety & Environment)\n• 📋 **Code of Conduct & Ethical Business Statement**\n\nHe also completed the **CIPS Ethical Procurement & Supply Certificate**, covering ethics, conflicts of interest, gifts & hospitality, anti-bribery, modern slavery, and environmental responsibility.",
    },
    ar: {
      short: "كتب سياسات ESG والسلامة ومكافحة الرشوة وميثاق السلوك من الصفر. 📜",
      detail: "في جولدن سبارو، أونز كتب **كل وثائق الحوكمة** من الصفر 📜:\n\n• 🌱 **سياسة ESG والاستدامة**\n• 🛡️ **سياسة مكافحة الرشوة والفساد**\n• ⚠️ **سياسة QHSE** (الجودة والصحة والسلامة والبيئة)\n• 📋 **ميثاق السلوك والأعمال الأخلاقية**\n\nكمان حصل على **شهادة CIPS للمشتريات الأخلاقية** اللي غطت الأخلاقيات وتعارض المصالح ومكافحة الرشوة.",
    },
  },

  // ═══ GOALS ═══
  goals: {
    en: {
      short: "2026 goals: automate 10 processes (80%), master Odoo (70%), complete CIPS (60%), consulting launch (35%). 🎯",
      detail: "Mahmoud's **2026 goals** and their progress 🎯:\n\n1. ✅ **Automate 10 Business Processes** — 80% done\n2. 🟢 **Master Odoo ERP Administration** — 70% done\n3. 📚 **Complete CIPS Level 4 Diploma** — 60% done\n4. 🌐 **Build Personal Brand** (1000 LinkedIn followers) — 45% done\n5. 🚀 **Launch Independent Consulting** — 35% done\n\nHe's making strong progress across all goals, especially in automation and ERP mastery!",
    },
    ar: {
      short: "أهداف 2026: أتمتة 10 عمليات (%80)، إتقان Odoo (%70)، إكمال CIPS (%60)، إطلاق استشارات (%35). 🎯",
      detail: "**أهداف أونز لـ 2026** ونسبة إنجازها 🎯:\n\n1. ✅ **أتمتة 10 عمليات** — %80 مكتمل\n2. 🟢 **إتقان Odoo ERP** — %70\n3. 📚 **إكمال CIPS Level 4** — %60\n4. 🌐 **بناء علامة شخصية** (1000 متابع LinkedIn) — %45\n5. 🚀 **إطلاق استشارات مستقلة** — %35\n\nبيحقق تقدم قوي في كل الأهداف!",
    },
  },

  // ═══ BLOG ═══
  blog: {
    en: {
      short: "In-depth articles on strategic procurement, operations portals, and n8n automation. 📝",
      detail: "Mahmoud has a **blog** with in-depth articles 📝:\n\n1. **\"How I Saved 450K AED Through Strategic Procurement\"** — Breakdown of his cost-saving strategy\n2. **\"Why Every Company Needs an Operations Portal\"** — Lessons from building the 11-phase portal\n3. **\"Automating Business Processes with n8n and Odoo\"** — Technical guide to procurement automation\n\nCheck them out at the **/blog** page! Each article shares real-world experience and actionable insights.",
    },
    ar: {
      short: "مقالات معمقة عن المشتريات الاستراتيجية وبوابات العمليات وأتمتة n8n. 📝",
      detail: "أونز عنده **مدونة** بمقالات معمقة 📝:\n\n1. **\"إزاي وفرت 450 ألف درهم بالتوريد الاستراتيجي\"**\n2. **\"ليه كل شركة محتاجة بوابة عمليات\"**\n3. **\"أتمتة العمليات بـ n8n و Odoo\"**\n\nشوفهم في صفحة **/blog**!",
    },
  },

  // ═══ FUN FACTS ═══
  fun_facts: {
    en: {
      short: "Camaro enthusiast, tech gadget lover, AI geek, lived in 3 countries. 🎉",
      detail: "Some **fun facts** about Mahmoud 🎉:\n\n🚗 He's a **Camaro enthusiast** — loves muscle cars and automotive culture\n📱 **Tech gadget lover** — always exploring the latest tech toys\n🤖 **AI & automation geek** — uses Claude, ChatGPT, and Copilot daily for productivity\n🎯 His philosophy: *\"Systems run the business. People run the systems.\"* — Michael Gerber\n💡 His favorite Drucker quote: *\"Efficiency is doing things right; effectiveness is doing the right things.\"*\n🌍 He's lived and worked in **3 countries** (Egypt, Saudi Arabia, UAE)\n\nBehind the professional profile, he's a systems-obsessed tech enthusiast who believes in working smarter, not harder!",
    },
    ar: {
      short: "بيحب الكمارو، مهووس بالتكنولوجيا، مدمن AI، عاش في 3 دول. 🎉",
      detail: "**حقائق ممتعة** عن أونز 🎉:\n\n🚗 بيحب **عربيات الكمارو** — عاشق سيارات العضلات\n📱 **مهووس بالتكنولوجيا** — دايماً بيجرب أحدث الأجهزة\n🤖 **مدمن AI وأتمتة** — بيستخدم Claude و ChatGPT و Copilot يومياً\n🎯 فلسفته: *\"الأنظمة بتدير البيزنس. الناس بتدير الأنظمة.\"*\n🌍 عاش واشتغل في **3 دول** (مصر، السعودية، الإمارات)\n\nورا البروفايل المهني، هو شخص مهووس بالأنظمة وعاشق للتكنولوجيا!",
    },
  },

  // ═══ LINKEDIN ═══
  linkedin: {
    en: {
      short: "Active on LinkedIn with 14+ recommendations. Goal: 1,000 followers by 2026. 💼",
      detail: "Mahmoud is active on **LinkedIn** 💼:\n\n🔗 **Profile:** [linkedin.com/in/mahmoudf-abdallah](https://www.linkedin.com/in/mahmoudf-abdallah)\n📊 **14+ recommendations** from managers, colleagues, and clients\n🎯 **2026 goal:** Reach 1,000 followers (currently at 45% progress)\n\n**Recent highlights:**\n• Operations Portal completion: 142 reactions, 23 comments\n• CIPS Ethical Certificate: 98 reactions, 15 comments\n• Promotion to SC Manager: 234 reactions, 41 comments\n\nConnect with him for insights on procurement, operations, and automation!",
    },
    ar: {
      short: "نشط على لينكدإن مع 14+ توصية. هدف: 1000 متابع بحلول 2026. 💼",
      detail: "أونز نشط على **لينكدإن** 💼:\n\n🔗 **البروفايل:** [linkedin.com/in/mahmoudf-abdallah](https://www.linkedin.com/in/mahmoudf-abdallah)\n📊 **14+ توصية** من مديرين وزملاء وعملاء\n🎯 هدف 2026: **1000 متابع** (وصل %45)\n\nتواصل معاه لمحتوى عن المشتريات والعمليات والأتمتة!",
    },
  },

  // ═══ THOUGHTS ═══
  thoughts: {
    en: {
      short: "Systems thinker — \"Document first, automate second.\" Loves Drucker and Gerber quotes. 💭",
      detail: "Mahmoud's **latest thoughts & insights** 💭:\n\n💡 *\"Just automated our entire supplier evaluation process. What used to take 3 days now takes 30 minutes.\"*\n\n🔥 *\"Hot take: Most procurement inefficiencies aren't process problems — they're communication problems.\"*\n\n📋 *\"If your RFQ process still involves email attachments, we need to talk.\"*\n\n🤖 *\"Built a tender monitoring dashboard in n8n that checks 5 government portals automatically. Automation wins.\"*\n\n📚 His favorite quotes:\n• *\"Systems run the business. People run the systems.\"* — Michael Gerber\n• *\"What gets measured gets managed.\"* — Peter Drucker",
    },
    ar: {
      short: "مفكر منظومي — \"وثّق الأول، أتمت بعدين.\" بيحب اقتباسات Drucker وGerber. 💭",
      detail: "**أحدث أفكار أونز** 💭:\n\n💡 *\"أتممت عملية تقييم الموردين بالكامل. كانت بتاخد 3 أيام، دلوقتي 30 دقيقة.\"*\n\n🔥 *\"رأي جريء: معظم مشاكل المشتريات مش مشاكل عمليات — هي مشاكل تواصل.\"*\n\n📚 اقتباساته المفضلة:\n• *\"الأنظمة بتدير البيزنس. الناس بتدير الأنظمة.\"*\n• *\"اللي بيتقاس بيتدار.\"* — Peter Drucker",
    },
  },

  // ═══ GOVERNMENT PORTALS ═══
  government_portals: {
    en: {
      short: "Expert in GCC portals — eSupply, Etimad, SABER, Tejari, ICV, Ariba, Jaggaer. 🏛️",
      detail: "Mahmoud has expertise in **GCC government procurement portals** 🏛️:\n\n🇦🇪 **UAE:** eSupply Dubai, Tejari, ICV Portal\n🇸🇦 **Saudi Arabia:** Etimad, SABER (product compliance)\n🌐 **International:** Ariba, Jaggaer\n\nHe handles portal registration, compliance documentation, strategic bidding, and end-to-end tender lifecycle management. He also built an **automated tender monitoring system** using n8n that checks multiple government portals and uses AI to classify relevant opportunities.",
    },
    ar: {
      short: "خبير في بوابات الخليج — eSupply، إعتماد، سابر، تجاري، ICV، Ariba. 🏛️",
      detail: "أونز عنده خبرة في **بوابات المشتريات الحكومية الخليجية** 🏛️:\n\n🇦🇪 **الإمارات:** eSupply Dubai, تجاري, ICV\n🇸🇦 **السعودية:** إعتماد, سابر\n🌐 **دولي:** Ariba, Jaggaer\n\nبيدير التسجيل في البوابات، التوثيق، العطاءات، ودورة حياة المناقصة كاملة. كمان بنى **نظام مراقبة مناقصات أوتوماتيكي** بـ n8n بيفحص البوابات ويصنف الفرص بالذكاء الاصطناعي.",
    },
  },

  // ═══ WEBSITE ═══
  website: {
    en: {
      short: "Built with Next.js 16, TypeScript, Tailwind CSS — 5 themes, AI chatbot, interactive career map. 🎨",
      detail: "This portfolio website was built with **Next.js 16**, **TypeScript**, and **Tailwind CSS** 🎨\n\nIt features a **5-theme system** (Gold, Platinum, Espresso, Sapphire, Light), particle effects, gradient meshes, interactive career map, AI chatbot (that's me! 🤖), and more.\n\nThe site showcases Mahmoud's professional portfolio including his experience, projects, skills, certifications, and services. It also has a **blog** and **knowledge base** with resources on procurement and automation.",
    },
    ar: {
      short: "مبني بـ Next.js 16 وTypeScript وTailwind CSS — 5 ثيمات، شات بوت AI، خريطة مسيرة تفاعلية. 🎨",
      detail: "الموقع ده مبني بـ **Next.js 16** و**TypeScript** و**Tailwind CSS** 🎨\n\nفيه **5 ثيمات** (ذهبي، بلاتيني، إسبريسو، سافير، فاتح)، تأثيرات بصرية، خريطة مسيرة مهنية تفاعلية، شات بوت ذكي (أنا! 🤖)، وحاجات تانية كتير.\n\nالموقع بيعرض بورتفوليو أونز المهني — خبرته ومشاريعه ومهاراته وشهاداته وخدماته. وفيه كمان **مدونة** و**قاعدة معرفة**.",
    },
  },

  // ═══ INDUSTRY EXPERIENCE ═══
  industry_experience: {
    en: {
      short: "Mahmoud has worked across **5 industries**: Heavy Equipment Trading, FMCG/F&B, Events Technology, Oil & Gas, and Military Retail. 🏭",
      detail: "Mahmoud's career spans **5 diverse industries** across 3 countries:\n\n1. **Heavy Equipment Trading** (Golden Sparrow, Dubai) — Supply chain & operations management\n2. **FMCG/F&B** (Americana Foods, Dubai) — P2P & master data for KFC, Pizza Hut, Hardee's across 20+ markets\n3. **Events Technology** (Fractal Systems, Dubai) — Procurement for COP28, Esports World Cup, Elie Saab\n4. **Oil & Gas** (Hafa Trading, Riyadh) — Procurement & logistics with ERP compliance\n5. **Military Retail** (Egyptian Army, Egypt) — Supply chain coordination\n\nThis cross-industry versatility is one of his biggest strengths! 💪",
    },
    ar: {
      short: "محمود اشتغل في **5 صناعات**: معدات ثقيلة، أغذية، تكنولوجيا أحداث، نفط وغاز، وتجارة عسكرية. 🏭",
      detail: "مسيرة محمود المهنية تمتد عبر **5 صناعات مختلفة** في 3 دول:\n\n1. **تجارة المعدات الثقيلة** (Golden Sparrow، دبي)\n2. **أغذية ومشروبات** (Americana Foods، دبي) — KFC وPizza Hut وHardee's في 20+ سوق\n3. **تكنولوجيا الأحداث** (Fractal Systems، دبي) — COP28 وEsports World Cup\n4. **نفط وغاز** (Hafa Trading، الرياض)\n5. **تجارة عسكرية** (الجيش المصري)\n\nالتنوع ده من أقوى نقاط قوته! 💪",
    },
  },

  // ═══ UNKNOWN (fallback) ═══
  unknown: null,
};
