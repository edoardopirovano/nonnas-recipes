import { cookies } from "next/headers";
import { translations as enTranslations } from "@/translations/en";
import { translations as itTranslations } from "@/translations/it";
import { translations as jaTranslations } from "@/translations/ja";
import type { TranslationKeys } from "@/translations/en";
import type { Language } from "@/entities/Recipe";

const translations = {
  en: enTranslations,
  it: itTranslations,
  ja: jaTranslations,
};

export const getServerLanguage = (): Language => {
  const cookieStore = cookies();
  return (cookieStore.get("language")?.value as Language) || "en";
};

export const getServerTranslation = (key: TranslationKeys): string => {
  const language = getServerLanguage();
  return translations[language][key] as string;
};
