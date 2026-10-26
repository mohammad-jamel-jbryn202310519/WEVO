"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Locale = "ar" | "en";
type Direction = "rtl" | "ltr";

interface DirectionContextType {
  locale: Locale;
  direction: Direction;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (arText: string, enText: string) => string;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  const direction: Direction = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const saved = localStorage.getItem("wevo_locale") as Locale | null;
    if (saved && (saved === "ar" || saved === "en")) {
      setLocaleState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    } else {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("wevo_locale", newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  };

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  const t = (arText: string, enText: string) => (locale === "ar" ? arText : enText);

  return (
    <DirectionContext.Provider
      value={{ locale, direction, setLocale, toggleLocale, t }}
    >
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
}
