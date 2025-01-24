import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/entities/Recipe";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const flags: Record<Language, string> = {
    en: "/flags/uk.svg",
    it: "/flags/italy.svg",
    ja: "/flags/japan.svg",
  };

  return (
    <div className="flex gap-4 absolute top-4 right-4">
      {Object.entries(flags).map(([lang, flag]) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang as Language)}
          className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
            language === lang
              ? "border-red-600 scale-110"
              : "border-transparent"
          }`}
          aria-label={`Switch to ${lang} language`}
        >
          <Image
            src={flag}
            alt={`${lang} flag`}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};
