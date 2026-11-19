"use client";

import { createContext, useContext } from "react";

export type StudentLanguage = "tr" | "en";

export const StudentLanguageContext = createContext<StudentLanguage>("tr");

export function useStudentLanguage() {
  return useContext(StudentLanguageContext);
}
