"use client";

import { createContext, ReactNode, useContext } from "react";

type Dictionary = any;

const DictionaryContext = createContext<Dictionary | null>(null);

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === null) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}

export function DictionaryProvider({ children, dictionary }: { children: ReactNode; dictionary: Dictionary }) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}
