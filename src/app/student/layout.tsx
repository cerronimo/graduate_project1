"use client";

import { useState } from "react";
import Sidebar from "@/components/student/sidebar";
import { mockStudent } from "@/lib/mock/student";
import { StudentLanguageContext, type StudentLanguage } from "./language-context";
import { studentText } from "@/lib/student-translations";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<StudentLanguage>("tr");

  return (
    <StudentLanguageContext.Provider value={language}>
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <p className="text-lg font-bold">STAMS</p>
          <p className="text-xs text-gray-500">{language === "tr" ? "Öğrenci Paneli" : "Student Portal"}</p>
        </div>
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
          <p className="text-sm text-gray-500">{studentText(language, "Summer Training Automated Management System")}</p>
          <div className="flex items-center gap-4">
            <div className="flex rounded-lg border border-gray-200 bg-white p-1" role="group" aria-label={language === "tr" ? "Dil seçimi" : "Language selection"}>
              {(["tr", "en"] as const).map((option) => (
                <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${language === option ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="text-right">
            <p className="text-sm font-medium">{studentText(language, mockStudent.name)}</p>
            <p className="text-xs text-gray-500">{mockStudent.studentNo}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
    </StudentLanguageContext.Provider>
  );
}
