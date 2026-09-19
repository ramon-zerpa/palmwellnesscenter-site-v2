import { translations, defaultLang, type Lang } from "./ui";
import { altUrl } from "./altmap";

export type TranslationKey = keyof (typeof translations)[typeof defaultLang];

/** Returns a translator `t(key)` for the given language, falling back to EN then the key. */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return (
      (translations[lang] as Record<TranslationKey, string>)[key] ??
      translations[defaultLang][key] ??
      (key as string)
    );
  };
}

/** Canonical per-locale routes for shared destinations. */
export const routes: Record<Lang, Record<string, string>> = {
  en: {
    home: "/",
    contact: "/contact/",
    blog: "/news-blog/",
    privacy: "/privacy-policy/",
    hipaa: "/hipaa-policy/",
  },
  es: {
    home: "/es/inicio/",
    contact: "/es/contacto/",
    blog: "/es/blog-de-noticias/",
    privacy: "/es/politica-de-privacidad/",
    hipaa: "/es/politica-de-hipaa/",
  },
};

export function route(lang: Lang, key: keyof (typeof routes)["en"]): string {
  return routes[lang][key];
}

/**
 * Given the current page path, return the equivalent path in the other language.
 * Uses the source-derived hreflang map; falls back to the other locale's home.
 */
export function getAltUrl(currentPath: string, currentLang: Lang): string {
  const normalized = currentPath.endsWith("/") ? currentPath : currentPath + "/";
  if (altUrl[normalized]) return altUrl[normalized];
  if (altUrl[currentPath]) return altUrl[currentPath];
  return currentLang === "en" ? routes.es.home : routes.en.home;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === "en" ? "es" : "en";
}

/** Appointment booking link (OptiMantra) — shared across both languages. */
export const APPOINTMENT_URL =
  "https://www.optimantra.com/optimus/om/patientaccess/servicesallV2?pid=cDlsZGtiZmltZ2VxOTFhMW5DUkVjUT09&lid=enlzbUNpNC4wQ0FYNlJSQk4rQlNSTmc9PQ==";

export const PHONE_TEL = "tel:8134435370";
export const FAX_DISPLAY = "(813) 443-5604";
export const SOCIAL = {
  facebook: "https://www.facebook.com/palmwellnesscenter",
  instagram: "https://www.instagram.com/palmwellnesscenter/",
};
