"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/entities/Recipe";
import { useCookies } from "next-client-cookies";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage: Language;
}> = ({ children, initialLanguage }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const cookies = useCookies();

  useEffect(() => {
    const savedLanguage = cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [cookies]);

  useEffect(() => {
    // Refresh the cookie expiration date whenever language changes or is accessed
    cookies.set("language", language, {
      expires: 365,
    });
  }, [language, cookies]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    cookies.set("language", lang, {
      expires: 365,
    });
    window.location.reload();
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
