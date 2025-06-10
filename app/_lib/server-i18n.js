import { cookies } from "next/headers";
import en from "@/public/locales/en/translation.json";
import ar from "@/public/locales/ar/translation.json";

export async function getTranslation() {
  const defaultLocale = "en";
  const cookieStore = await cookies();
  const locale = cookieStore.get("i18next")?.value || defaultLocale;

  const translations = {
    en,
    ar,
  };

  return translations[locale] || en;
}
