// ═══════════════════════════════════════════════
// INTENT DETECTION — Language, Question Type, Topic
// ═══════════════════════════════════════════════

export type Language = "en" | "ar";

export type QuestionType =
  | "yes_no"
  | "what"
  | "how"
  | "why"
  | "who"
  | "where"
  | "greeting"
  | "follow_up"
  | "thanks"
  | "goodbye"
  | "open";

export type Topic =
  | "who_is"
  | "experience"
  | "current_role"
  | "fractal"
  | "americana"
  | "hafa"
  | "army"
  | "skills"
  | "procurement"
  | "supply_chain"
  | "automation"
  | "erp"
  | "odoo"
  | "achievements"
  | "operations_portal"
  | "education"
  | "certifications"
  | "services"
  | "contact"
  | "location"
  | "languages"
  | "availability"
  | "why_hire"
  | "salary"
  | "projects"
  | "testimonials"
  | "analytics"
  | "policies"
  | "goals"
  | "blog"
  | "fun_facts"
  | "linkedin"
  | "thoughts"
  | "government_portals"
  | "website"
  | "industry_experience"
  | "unknown";

export interface Intent {
  topic: Topic;
  language: Language;
  questionType: QuestionType;
}

// ─── Language Detection ───
function isArabic(text: string): boolean {
  const arabicChars = text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g);
  return !!arabicChars && arabicChars.length > text.length * 0.15;
}

// ─── Normalize ───
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()\-–—…/\\@#$%^&*]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ─── Question Type Detection ───
function detectQuestionType(normalized: string, lang: Language): QuestionType {
  // Greetings
  const greetings_en = ["hi", "hello", "hey", "sup", "yo", "howdy", "hola", "good morning", "good evening", "good afternoon", "good night", "greetings", "good day", "salutations", "what's up", "whats up"];
  const greetings_ar = ["اهلا", "مرحبا", "هلا", "سلام", "ازيك", "ازي", "يا هلا", "عامل ايه", "اخبارك", "هاي", "صباح الخير", "صباح", "صباحو", "مساء الخير", "مساء", "تحياتي", "تحية", "السلام عليكم", "اهلين", "هالو", "الو"];
  const greetings = lang === "ar" ? greetings_ar : greetings_en;
  if (lang === "ar") {
    if (greetings.some((g) => normalized === g || normalized.startsWith(g))) return "greeting";
  } else {
    if (greetings.some((g) => normalized === g || normalized.startsWith(g + " "))) return "greeting";
  }

  // Thanks
  const thanks_en = ["thank", "thanks", "appreciate", "awesome", "helpful", "amazing", "wonderful", "excellent"];
  const thanks_ar = ["شكر", "شكرا", "تسلم", "ممتاز", "رائع", "تحفة", "جميل"];
  const thanks = lang === "ar" ? thanks_ar : thanks_en;
  if (thanks.some((t) => normalized.includes(t))) return "thanks";

  // Goodbye
  const bye_en = ["bye", "goodbye", "see you", "later", "take care", "gotta go", "cya"];
  const bye_ar = ["باي", "مع السلامة", "يلا سلام", "نشوفك", "سلام عليكم"];
  const bye = lang === "ar" ? bye_ar : bye_en;
  if (bye.some((b) => normalized.includes(b))) return "goodbye";

  // Follow-up
  const followUp_en = ["more", "details", "elaborate", "expand", "tell me more", "continue", "keep going", "more info", "explain more", "go on", "what else"];
  const followUp_ar = ["تفاصيل", "أكتر", "اكتر", "كمان", "زيادة", "وضح", "كمل", "قولي اكتر"];
  const followUp = lang === "ar" ? followUp_ar : followUp_en;
  if (followUp.some((f) => normalized.includes(f))) return "follow_up";

  // Who (check before yes_no to avoid "who is mahmoud" matching "is mahmoud")
  if (normalized.startsWith("who") || normalized.includes("مين")) return "who";

  // Yes/No questions
  const yesNo_en = ["is he", "does he", "can i", "can he", "has he", "will he", "would he", "could he", "is mahmoud", "does mahmoud", "is onz", "is there", "do you", "can mahmoud"];
  const yesNo_ar = ["هل", "ممكن", "بيعرف", "يقدر", "هو بي", "هو عنده"];
  const yesNo = lang === "ar" ? yesNo_ar : yesNo_en;
  if (yesNo.some((q) => normalized.startsWith(q) || normalized.includes(q))) return "yes_no";

  // Where
  if (normalized.startsWith("where") || normalized.includes("فين") || normalized.includes("اين")) return "where";

  // How
  if (normalized.startsWith("how") || normalized.includes("ازاي") || normalized.includes("إزاي") || normalized.includes("كيف")) return "how";

  // Why
  if (normalized.startsWith("why") || normalized.includes("ليه") || normalized.includes("ليش")) return "why";

  // What
  if (normalized.startsWith("what") || normalized.includes("ايه") || normalized.includes("إيه") || normalized.includes("شو")) return "what";

  return "open";
}

// ─── Topic Detection ───
const TOPIC_KEYWORDS: Record<Topic, { en: string[]; ar: string[] }> = {
  availability: {
    en: ["available", "hire", "open to", "freelance", "ready", "looking", "opportunity", "opportunities", "hiring", "full time", "full-time", "part time", "part-time", "job", "recruit"],
    ar: ["متاح", "جاهز", "للتوظيف", "فريلانس", "مستعد", "فرص", "شغل", "وظيفة"],
  },
  who_is: {
    en: ["who is onz", "who is mahmoud", "tell me about onz", "tell me about mahmoud", "introduce", "who is he", "about onz", "about mahmoud", "who are you"],
    ar: ["مين اونز", "مين أونز", "عرفني", "قولي عنه", "مين ده", "مين هو", "عرفني عليه", "انت مين", "أنت مين", "انتو مين", "انت ايه", "أنت إيه", "حضرتك مين"],
  },
  current_role: {
    en: ["current", "now", "golden sparrow", "currently", "present", "current role", "current job", "where does he work", "working now"],
    ar: ["حالي", "دلوقتي", "بيشتغل فين", "شغله ايه", "جولدن سبارو", "وظيفته الحالية", "شغال فين"],
  },
  experience: {
    en: ["experience", "background", "career", "history", "journey", "worked", "work history", "resume", "cv", "jobs", "positions", "roles", "timeline"],
    ar: ["خبرة", "تجربة", "سيرة", "شغل", "مسيرة", "وظائف", "اشتغل فين", "سي في", "خبرات"],
  },
  fractal: {
    en: ["fractal", "systems", "events", "cop28", "esports", "elie saab", "events technology"],
    ar: ["فراكتال", "فعاليات", "تكنولوجيا", "ايفنتس"],
  },
  americana: {
    en: ["americana", "foods", "kfc", "pizza hut", "hardees", "fmcg", "p2p", "master data", "procure to pay"],
    ar: ["امريكانا", "أمريكانا", "كنتاكي", "بيتزا"],
  },
  hafa: {
    en: ["hafa", "saudi", "ksa", "riyadh", "oil", "gas", "oil and gas", "saber", "etimad"],
    ar: ["هافا", "سعودية", "الرياض", "بترول", "غاز"],
  },
  army: {
    en: ["army", "military", "egyptian army", "soldier", "service"],
    ar: ["جيش", "عسكري", "عسكرية", "خدمة"],
  },
  skills: {
    en: ["skills", "abilities", "good at", "strengths", "expertise", "capable", "competencies", "what can he do", "proficient"],
    ar: ["مهارات", "يعرف", "قدرات", "شاطر", "متمكن", "يقدر يعمل ايه", "بيعرف يعمل ايه"],
  },
  procurement: {
    en: ["procurement", "sourcing", "tender", "supplier", "vendor", "negotiate", "contract", "purchasing", "buying", "rfq", "rfp", "bidding"],
    ar: ["مشتريات", "توريد", "مناقصات", "موردين", "تفاوض", "عقود", "شراء"],
  },
  supply_chain: {
    en: ["supply chain", "logistics", "shipping", "warehouse", "inventory", "scm", "delivery", "transportation"],
    ar: ["سلسلة توريد", "لوجستيات", "شحن", "مخزن", "مخزون", "نقل", "توصيل"],
  },
  automation: {
    en: ["automation", "automate", "n8n", "workflow", "bot", "script", "python", "ai tools", "ai", "tech", "technology", "digital", "code", "programming"],
    ar: ["أتمتة", "اتمتة", "اوتوميشن", "بوت", "سكريبت", "بايثون", "ذكاء اصطناعي", "تكنولوجيا", "تقنية", "برمجة"],
  },
  erp: {
    en: ["erp", "oracle", "sap", "dynamics", "enterprise", "coupa", "zoho", "laserfiche", "software", "platform"],
    ar: ["اي ار بي", "أوراكل", "ساب", "نظام", "أنظمة", "برنامج", "برامج", "سوفتوير"],
  },
  odoo: {
    en: ["odoo", "odoo erp", "odoo implementation"],
    ar: ["أودو", "اودو"],
  },
  achievements: {
    en: ["achievement", "accomplish", "success", "impact", "savings", "450", "promoted", "promotion", "award", "results", "numbers", "metrics"],
    ar: ["انجاز", "إنجاز", "نجاح", "حقق", "وفر", "توفير", "ترقية", "جائزة", "نتائج", "أرقام"],
  },
  operations_portal: {
    en: ["operations portal", "portal", "11 phase", "sop", "process", "workflow", "documentation", "policies", "nodes", "business process", "framework"],
    ar: ["بوابة عمليات", "بوابة", "مراحل", "إجراءات", "سياسات", "وثائق", "بورتال"],
  },
  education: {
    en: ["education", "university", "degree", "bachelor", "study", "assiut", "accounting", "studied", "school", "academic", "college"],
    ar: ["تعليم", "جامعة", "شهادة", "بكالوريوس", "دراسة", "أسيوط", "محاسبة", "درس فين"],
  },
  certifications: {
    en: ["cips", "certification", "certified", "diploma", "course", "training", "certificate", "qualification"],
    ar: ["شهادة", "شهادات", "دبلوم", "دورة", "تدريب", "مؤهلات"],
  },
  services: {
    en: ["services", "offer", "consulting", "help", "freelance", "what can you do", "what does he offer", "consultant", "advisory"],
    ar: ["خدمات", "بيقدم", "استشارات", "فريلانس", "ممكن يساعد", "بيقدم ايه", "يقدر يساعد"],
  },
  contact: {
    en: ["contact", "reach", "email", "phone", "linkedin", "whatsapp", "message", "call", "connect", "get in touch", "reach out", "talk"],
    ar: ["تواصل", "ايميل", "تليفون", "واتساب", "رقم", "لينكدإن", "اتواصل", "اتصل", "كلم"],
  },
  location: {
    en: ["location", "based", "live", "city", "country", "dubai", "uae", "emirates", "nationality", "egyptian"],
    ar: ["مكان", "عايش", "مقيم", "دبي", "الإمارات", "جنسية", "مصري", "من فين"],
  },
  languages: {
    en: ["language", "speak", "arabic", "english", "bilingual", "tongue"],
    ar: ["لغة", "لغات", "بيتكلم", "عربي", "إنجليزي"],
  },
  why_hire: {
    en: ["why hire", "why should", "value", "advantage", "unique", "different", "stand out", "why him", "why mahmoud", "why choose"],
    ar: ["ليه نوظفه", "ليه هو", "ميزته", "مختلف", "فريد", "ليه أختاره"],
  },
  salary: {
    en: ["salary", "rate", "cost", "price", "charge", "budget", "how much", "fee", "hourly", "monthly", "compensation"],
    ar: ["سعر", "تكلفة", "كم بياخد", "ميزانية", "راتب", "أتعاب", "كم"],
  },
  projects: {
    en: ["projects", "project", "work samples", "case study", "case studies", "portfolio projects", "what has he built"],
    ar: ["مشاريع", "مشروع", "أعمال", "حالة دراسية"],
  },
  testimonials: {
    en: ["testimonial", "testimonials", "review", "reviews", "recommendation", "recommendations", "what people say", "feedback", "reference"],
    ar: ["توصيات", "رأي", "آراء", "تقييم", "مراجعات"],
  },
  analytics: {
    en: ["power bi", "dashboard", "analytics", "reporting", "data", "excel", "analysis", "reports", "visualization"],
    ar: ["تحليل", "بيانات", "تقارير", "داشبورد", "اكسل", "تحليلات"],
  },
  policies: {
    en: ["policy", "policies", "esg", "qhse", "anti-bribery", "code of conduct", "compliance", "governance", "sustainability", "ethics"],
    ar: ["سياسة", "سياسات", "مكافحة رشوة", "سلوك", "امتثال", "حوكمة", "استدامة", "أخلاقيات"],
  },
  goals: {
    en: ["goals", "goal", "2026", "plans", "future", "next", "roadmap", "target", "ambition"],
    ar: ["أهداف", "هدف", "خطط", "مستقبل", "طموح"],
  },
  blog: {
    en: ["blog", "article", "articles", "write", "writing", "post", "posts", "content"],
    ar: ["مدونة", "مقال", "مقالات", "كتب", "محتوى"],
  },
  fun_facts: {
    en: ["fun fact", "interesting", "hobby", "hobbies", "car", "camaro", "personal", "fun", "random", "passion", "gadget"],
    ar: ["حقائق", "هواية", "هوايات", "عربية", "كمارو", "شخصي", "ممتع"],
  },
  linkedin: {
    en: ["linkedin", "social media", "followers", "network", "connections", "profile"],
    ar: ["لينكدإن", "لينكد ان", "سوشيال", "متابعين", "شبكة"],
  },
  thoughts: {
    en: ["thoughts", "insights", "quotes", "philosophy", "think", "opinion", "perspective", "mindset", "believe"],
    ar: ["أفكار", "رأي", "فلسفة", "يفكر", "منظور", "عقلية"],
  },
  government_portals: {
    en: ["government", "tender portal", "etender", "tejari", "esupply", "public procurement", "gcc tenders", "icv"],
    ar: ["حكومي", "مناقصات حكومية", "تجاري", "مشتريات حكومة"],
  },
  website: {
    en: ["website", "portfolio", "this site", "built", "who built", "made this", "next.js", "react"],
    ar: ["موقع", "بورتفوليو", "الموقع ده", "تصميم", "مين عمل"],
  },
  industry_experience: {
    en: ["industry", "sectors", "industries", "domains", "heavy equipment", "fmcg", "events", "oil and gas", "oil & gas", "trading", "retail"],
    ar: ["صناعات", "قطاعات", "معدات ثقيلة", "أغذية", "أحداث", "نفط", "تجارة"],
  },
  unknown: { en: [], ar: [] },
};

function fuzzyMatch(word: string, keyword: string): boolean {
  if (word === keyword) return true;
  if (word.length >= 5 && keyword.includes(word) && word.length >= keyword.length * 0.5) return true;
  if (keyword.length >= 5 && word.includes(keyword) && keyword.length >= word.length * 0.5) return true;
  if (Math.abs(word.length - keyword.length) <= 1 && word.length >= 5) {
    let diff = 0;
    const longer = word.length >= keyword.length ? word : keyword;
    const shorter = word.length < keyword.length ? word : keyword;
    let j = 0;
    for (let i = 0; i < longer.length && j < shorter.length; i++) {
      if (longer[i] !== shorter[j]) {
        diff++;
        if (longer.length > shorter.length) continue;
      }
      j++;
    }
    if (diff <= 1) return true;
  }
  return false;
}

function detectTopic(normalized: string, words: string[], lang: Language): Topic {
  let bestTopic: Topic = "unknown";
  let bestScore = 0;

  for (const [topic, kws] of Object.entries(TOPIC_KEYWORDS) as [Topic, { en: string[]; ar: string[] }][]) {
    if (topic === "unknown") continue;
    const keywords = lang === "ar" ? kws.ar : kws.en;
    let score = 0;

    // Phrase matches (high value)
    for (const kw of keywords) {
      if (kw.includes(" ") && normalized.includes(kw)) score += 5;
    }
    // Single-word matches
    for (const kw of keywords) {
      if (kw.includes(" ")) continue;
      for (const word of words) {
        if (fuzzyMatch(word, kw)) { score += 1; break; }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestTopic;
}

// ─── Main Export ───
export function detectIntent(message: string): Intent {
  const lang: Language = isArabic(message) ? "ar" : "en";
  const normalized = normalize(message);
  const words = normalized.split(" ").filter((w) => w.length > 0);
  const questionType = detectQuestionType(normalized, lang);
  const topic = detectTopic(normalized, words, lang);

  return { topic, language: lang, questionType };
}
