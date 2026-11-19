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

  return (
    <EvaluatorLanguageContext.Provider value={language}>
      <div className="min-h-screen bg-white p-0 text-[#17213a] lg:p-4">
        <div className="min-h-screen overflow-hidden bg-[#212f6b] lg:flex lg:min-h-[calc(100vh-2rem)] lg:rounded-[20px]">
          <aside className="shrink-0 px-5 py-6 text-white lg:w-64 lg:px-6 lg:py-9 xl:w-72">
            <div className="flex items-center gap-3 px-2 lg:mb-12">
              <Image src="/emu-logo.png" alt="EMU" width={52} height={52} className="h-13 w-13 rounded-full bg-white" priority />
              <div>
                <p className="text-2xl font-bold tracking-wide">STAMS</p>
                <p className="text-xs text-[#cbd4ed]">{language === "tr" ? "Değerlendirici Paneli" : "Evaluator Portal"}</p>
              </div>
            </div>
            <nav aria-label={language === "tr" ? "Değerlendirici menüsü" : "Evaluator navigation"} className="mt-6 lg:mt-0">
              <Link href="/evaluator/assigned" aria-current="page" className="flex items-center gap-3 rounded-xl bg-[#f2f3f6] px-4 py-3.5 font-semibold text-[#212f6b]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <rect x="3" y="4" width="7" height="7" rx="1" />
                  <rect x="14" y="4" width="7" height="7" rx="1" />
                  <rect x="3" y="15" width="7" height="6" rx="1" />
                  <rect x="14" y="15" width="7" height="6" rx="1" />
                </svg>
                {language === "tr" ? "Atanan Başvurular" : "Assigned Submissions"}
              </Link>
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
