"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EvaluatorLanguageContext, type EvaluatorLanguage } from "./language-context";

export default function EvaluatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<EvaluatorLanguage>("tr");
  const upcomingPages = language === "tr"
    ? ["Rapor ve Günlük İnceleme", "Değerlendirme", "Notlandırma", "Geri Bildirim"]
    : ["Reports and Logbooks", "Evaluation", "Grading", "Feedback"];

  return (
    <EvaluatorLanguageContext.Provider value={language}>
      <div className="min-h-screen bg-white p-0 text-[#17213a] lg:p-4">
        <div className="min-h-screen overflow-hidden bg-white lg:flex lg:min-h-[calc(100vh-2rem)] lg:rounded-[20px]">
          <aside className="shrink-0 border-r border-gray-200 bg-white text-gray-900 lg:w-64 xl:w-72">
            <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-5">
              <Image src="/emu-logo.png" alt="EMU" width={52} height={52} className="h-13 w-13 shrink-0 rounded-full" priority />
              <div>
                <p className="text-2xl font-bold tracking-wide">STAMS</p>
                <p className="text-xs text-gray-500">{language === "tr" ? "Değerlendirici Paneli" : "Evaluator Portal"}</p>
              </div>
            </div>
            <nav aria-label={language === "tr" ? "Değerlendirici menüsü" : "Evaluator navigation"} className="flex flex-col gap-1 p-4">
              <Link href="/evaluator/assigned" aria-current="page" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white">
                {language === "tr" ? "Atanan Başvurular" : "Assigned Submissions"}
              </Link>
              {upcomingPages.map((page) => (
                <span key={page} aria-disabled="true" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700">
                  {page}
                </span>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 bg-[#f1f2f4] lg:mt-10 lg:rounded-tl-[26px]">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d3d6de] px-6 py-5 sm:px-8 xl:px-10">
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <span className="h-2.5 w-2.5 rounded-full bg-[#212f6b]" aria-hidden="true" />
                <span className="font-medium text-[#303c65]">STAMS</span>
                <span className="text-slate-400" aria-hidden="true">/</span>
                <span className="font-semibold text-[#212f6b]">{language === "tr" ? "Atanan Başvurular" : "Assigned Submissions"}</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="flex rounded-lg border border-[#cbd1df] bg-white p-1" role="group" aria-label={language === "tr" ? "Dil seçimi" : "Language selection"}>
                  {(["tr", "en"] as const).map((option) => (
                    <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${language === option ? "bg-[#212f6b] text-white" : "text-[#58617a] hover:bg-[#eef0f6]"}`}>
                      {option.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#212f6b] text-sm font-semibold text-white" aria-label={language === "tr" ? "Değerlendirici" : "Evaluator"}>D</div>
              </div>
            </header>
            <main className="mx-auto max-w-[1500px] px-6 py-8 sm:px-8 xl:px-10 xl:py-10">{children}</main>
          </div>
        </div>
      </div>
    </EvaluatorLanguageContext.Provider>
  );
}
