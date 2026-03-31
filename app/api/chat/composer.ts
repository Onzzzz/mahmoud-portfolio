// ═══════════════════════════════════════════════
// RESPONSE COMPOSER — Builds smart, intent-aware responses
// ═══════════════════════════════════════════════

import type { Language, QuestionType, Topic } from "./intents";
import { KNOWLEDGE } from "./knowledge";

export interface ComposedResponse {
  response: string;
  suggestions: string[];
  topicId: string;
}

// ─── Greetings ───
const GREETINGS = {
  en: {
    casual: "Hey there! 👋 I'm **Onz**, Mahmoud's AI Assistant. I can tell you about his **experience**, **skills**, **services**, **achievements**, or how to **get in touch**. What would you like to know?",
    morning: "Good morning! ☀️ Hope you're having a great day. I'm **Onz**, Mahmoud's AI Assistant — ready to answer any questions about his experience, skills, or services. What can I help you with?",
    evening: "Good evening! 🌙 Welcome to Mahmoud's portfolio. I'm **Onz**, Mahmoud's AI Assistant — ask me anything about his career, skills, or how to work with him!",
  },
  ar: {
    casual: "أهلاً وسهلاً! 👋 أنا **Onz**، مساعد محمود الذكي. أقدر أحكيلك عن **خبرته**، **مهاراته**، **خدماته**، **إنجازاته**، أو إزاي **تتواصل معاه**. عايز تعرف إيه؟",
    morning: "صباح النور! ☀️ يارب يومك حلو. أنا **Onz**، مساعد محمود الذكي — جاهز أجاوبك على أي سؤال عن خبرته، مهاراته، أو خدماته. تحب تعرف إيه؟",
    evening: "مساء النور! 🌙 أهلاً بيك في بورتفوليو محمود. أنا **Onz**، مساعده الذكي — اسألني أي حاجة عن مسيرته أو مهاراته أو إزاي تشتغلوا مع بعض!",
  },
};

// ─── Thanks & Goodbye ───
const THANKS = {
  en: "You're welcome! 😊 I'm glad I could help. If you have any more questions about Mahmoud's experience, skills, or services — just ask! And if you'd like to connect with him directly, the **contact form** is right on this page. Have a great day! 👋",
  ar: "العفو! 😊 سعيد إني قدرت أساعد. لو عندك أي أسئلة تانية عن خبرة أونز أو مهاراته أو خدماته — اسألني! ولو عايز تتواصل معاه مباشرة، **نموذج التواصل** موجود في الصفحة. يوم سعيد! 👋",
};

const GOODBYE = {
  en: "Goodbye! 👋 It was great chatting with you. Remember, Mahmoud is always open to conversations — whether about procurement, operations, or just a friendly hello. Come back anytime! ✨",
  ar: "مع السلامة! 👋 كان حوار حلو. تفتكر، أونز دايماً منفتح للحوار — سواء عن مشتريات أو عمليات أو حتى سلام. ارجع في أي وقت! ✨",
};

// ─── Yes/No direct answer prefixes ───
const YES_PREFIX = {
  en: "Yes! ",
  ar: "أيوه! ",
};

// ─── CTA (call to action) ───
const CTA = {
  en: " 📩 Reach out via the **contact form** to start a conversation!",
  ar: " 📩 تواصل عبر **نموذج التواصل** عشان تبدأ حوار!",
};

// ─── Fallback ───
const FALLBACK = {
  en: "I might not have a specific answer for that, but I can tell you about Mahmoud's **experience**, **skills**, **services**, **achievements**, or how to **get in touch**. What interests you? 😊",
  ar: "ممكن ما عنديش إجابة محددة للسؤال ده، بس أقدر أحكيلك عن **خبرة أونز**، **مهاراته**، **خدماته**، **إنجازاته**، أو إزاي **تتواصل معاه**. إيه اللي يهمك؟ 😊",
};

// ─── Suggestion Map ───
const SUGGESTION_MAP: Record<string, string[][]> = {
  who_is: [["Experience", "الخبرة"], ["Skills", "المهارات"], ["Services", "الخدمات"]],
  experience: [["Current Role", "الوظيفة الحالية"], ["Achievements", "الإنجازات"], ["Skills", "المهارات"]],
  current_role: [["Operations Portal", "بوابة العمليات"], ["Achievements", "الإنجازات"], ["ERP Systems", "أنظمة ERP"]],
  skills: [["ERP Systems", "أنظمة ERP"], ["Automation", "الأتمتة"], ["Procurement", "المشتريات"]],
  achievements: [["Experience", "الخبرة"], ["Projects", "المشاريع"], ["Contact", "تواصل"]],
  services: [["Availability", "التوفر"], ["Contact", "تواصل"], ["Achievements", "الإنجازات"]],
  contact: [["Services", "الخدمات"], ["Availability", "التوفر"], ["Who is Mahmoud?", "مين أونز؟"]],
  erp: [["Odoo", "Odoo"], ["Skills", "المهارات"], ["Services", "الخدمات"]],
  procurement: [["Achievements", "الإنجازات"], ["Government Portals", "البوابات الحكومية"], ["Supply Chain", "سلسلة التوريد"]],
  automation: [["Projects", "المشاريع"], ["Skills", "المهارات"], ["Services", "الخدمات"]],
  operations_portal: [["Achievements", "الإنجازات"], ["ERP Systems", "أنظمة ERP"], ["Services", "الخدمات"]],
  fractal: [["Projects", "المشاريع"], ["Achievements", "الإنجازات"], ["Current Role", "الوظيفة الحالية"]],
  americana: [["ERP Systems", "أنظمة ERP"], ["Experience", "الخبرة"], ["Skills", "المهارات"]],
  hafa: [["Government Portals", "البوابات الحكومية"], ["Supply Chain", "سلسلة التوريد"], ["Experience", "الخبرة"]],
  army: [["Experience", "الخبرة"], ["Who is Mahmoud?", "مين أونز؟"], ["Skills", "المهارات"]],
  education: [["Certifications", "الشهادات"], ["Skills", "المهارات"], ["Experience", "الخبرة"]],
  certifications: [["Education", "التعليم"], ["Skills", "المهارات"], ["Services", "الخدمات"]],
  availability: [["Services", "الخدمات"], ["Contact", "تواصل"], ["Experience", "الخبرة"]],
  why_hire: [["Achievements", "الإنجازات"], ["Services", "الخدمات"], ["Contact", "تواصل"]],
  salary: [["Services", "الخدمات"], ["Contact", "تواصل"], ["Availability", "التوفر"]],
  location: [["Experience", "الخبرة"], ["Contact", "تواصل"], ["Availability", "التوفر"]],
  languages: [["Experience", "الخبرة"], ["Location", "الموقع"], ["Contact", "تواصل"]],
  government_portals: [["Procurement", "المشتريات"], ["Automation", "الأتمتة"], ["Services", "الخدمات"]],
  supply_chain: [["Experience", "الخبرة"], ["Procurement", "المشتريات"], ["Skills", "المهارات"]],
  odoo: [["ERP Systems", "أنظمة ERP"], ["Services", "الخدمات"], ["Current Role", "الوظيفة الحالية"]],
  projects: [["Achievements", "الإنجازات"], ["Experience", "الخبرة"], ["Services", "الخدمات"]],
  testimonials: [["Experience", "الخبرة"], ["Contact", "تواصل"], ["Services", "الخدمات"]],
  analytics: [["Skills", "المهارات"], ["Automation", "الأتمتة"], ["ERP Systems", "أنظمة ERP"]],
  policies: [["Operations Portal", "بوابة العمليات"], ["Services", "الخدمات"], ["Certifications", "الشهادات"]],
  goals: [["Services", "الخدمات"], ["Availability", "التوفر"], ["Contact", "تواصل"]],
  blog: [["Achievements", "الإنجازات"], ["Projects", "المشاريع"], ["Services", "الخدمات"]],
  fun_facts: [["Who is Mahmoud?", "مين أونز؟"], ["Experience", "الخبرة"], ["Contact", "تواصل"]],
  linkedin: [["Contact", "تواصل"], ["Testimonials", "التوصيات"], ["Blog", "المدونة"]],
  thoughts: [["Blog", "المدونة"], ["Achievements", "الإنجازات"], ["Services", "الخدمات"]],
  website: [["Skills", "المهارات"], ["Projects", "المشاريع"], ["Contact", "تواصل"]],
};

function getSuggestions(topicId: string, lang: Language): string[] {
  const related = SUGGESTION_MAP[topicId];
  if (!related) {
    return lang === "ar"
      ? ["مين أونز؟", "الخبرة", "تواصل"]
      : ["Who is Mahmoud?", "Experience", "Contact"];
  }
  return related.map((pair) => (lang === "ar" ? pair[1] : pair[0]));
}

// ─── Main Export ───
export function composeResponse(
  topic: Topic,
  language: Language,
  questionType: QuestionType,
  lastTopic?: string
): ComposedResponse {
  const lang = language;

  // Greeting
  if (questionType === "greeting") {
    return {
      response: GREETINGS[lang].casual,
      suggestions: lang === "ar"
        ? ["مين أونز؟", "الخبرة", "المهارات", "تواصل"]
        : ["Who is Mahmoud?", "Experience", "Skills", "Contact"],
      topicId: "greeting",
    };
  }

  // Thanks
  if (questionType === "thanks") {
    return {
      response: THANKS[lang],
      suggestions: getSuggestions("services", lang),
      topicId: "thanks",
    };
  }

  // Goodbye
  if (questionType === "goodbye") {
    return {
      response: GOODBYE[lang],
      suggestions: getSuggestions("contact", lang),
      topicId: "goodbye",
    };
  }

  // Follow-up — use lastTopic to give deeper detail
  if (questionType === "follow_up" && lastTopic) {
    const entry = KNOWLEDGE[lastTopic as Topic];
    if (entry) {
      const langEntry = entry[lang];
      if (langEntry.followUp) {
        return {
          response: langEntry.followUp,
          suggestions: getSuggestions(lastTopic, lang),
          topicId: lastTopic,
        };
      }
      // No followUp — nudge
      const nudge = lang === "ar"
        ? "ده كان أهم اللي عندي عن الموضوع ده! بس أقدر أحكيلك عن حاجات تانية — زي خبرته أو مهاراته أو خدماته أو إزاي تتواصل معاه. إيه اللي يهمك؟ 😊"
        : "That's the main info I have on this topic! But I can tell you about other things — like his experience, skills, services, or how to get in touch. What interests you? 😊";
      return {
        response: nudge,
        suggestions: getSuggestions(lastTopic, lang),
        topicId: lastTopic,
      };
    }
  }

  // Unknown topic — fallback
  if (topic === "unknown") {
    return {
      response: FALLBACK[lang],
      suggestions: lang === "ar"
        ? ["مين أونز؟", "الخبرة", "المهارات", "تواصل"]
        : ["Who is Mahmoud?", "Experience", "Skills", "Contact"],
      topicId: "",
    };
  }

  // Known topic — compose based on question type
  const entry = KNOWLEDGE[topic];
  if (!entry) {
    return {
      response: FALLBACK[lang],
      suggestions: getSuggestions(topic, lang),
      topicId: "",
    };
  }

  const langEntry = entry[lang];
  let response: string;

  if (questionType === "yes_no") {
    // Direct yes + short answer + CTA
    response = YES_PREFIX[lang] + langEntry.short + CTA[lang];
  } else if (questionType === "what" || questionType === "how" || questionType === "who" || questionType === "where" || questionType === "why") {
    // Full detail for interrogative questions
    response = langEntry.detail;
  } else {
    // Open / default — give full detail
    response = langEntry.detail;
  }

  return {
    response,
    suggestions: getSuggestions(topic, lang),
    topicId: topic,
  };
}
