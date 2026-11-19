"use client";

import { createContext, useContext } from "react";

export type EvaluatorLanguage = "tr" | "en";

export const EvaluatorLanguageContext = createContext<EvaluatorLanguage>("tr");

export function useEvaluatorLanguage() {
  return useContext(EvaluatorLanguageContext);
}
