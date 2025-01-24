import { useLanguage } from "@/contexts/LanguageContext";
import { translations as enTranslations } from "@/translations/en";
import { translations as itTranslations } from "@/translations/it";
import { translations as jaTranslations } from "@/translations/ja";
import type { TranslationKeys } from "@/translations/en";

const translations = {
  en: enTranslations,
  it: itTranslations,
  ja: jaTranslations,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: TranslationKeys) => {
    return translations[language][key] as string;
  };

  return { t };
};
