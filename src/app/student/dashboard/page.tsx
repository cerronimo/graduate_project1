"use client";

import Link from "next/link";
import { useStudentLanguage } from "../language-context";
import { studentText } from "@/lib/student-translations";
import {
  applicationStages,
  mockStudent,
  mockSummary,
  mockTasks,
} from "@/lib/mock/student";

const stageStyle = {
  done: "bg-green-600 text-white",
  current: "bg-blue-600 text-white",
  todo: "bg-gray-200 text-gray-600",
} as const;

export default function StudentDashboardPage() {
  const language = useStudentLanguage();
  const t = (text: string) => studentText(language, text);
  const dates = language === "tr" ? ["30 Kasım 2026", "10 Aralık 2026", "15 Eylül 2027"] : ["November 30, 2026", "December 10, 2026", "September 15, 2027"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{language === "tr" ? "Hoş geldin" : "Welcome"}, {t(mockStudent.name)}</h1>
        <p className="text-sm text-gray-500">
          {language === "tr" ? mockStudent.department : t(mockStudent.department)} · {mockStudent.studentNo}
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">{t("Başvuru durumu")}</p>
          <p className="mt-1 font-semibold">{t(mockSummary.applicationStatus)}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">{t("Yüklenen belgeler")}</p>
          <p className="mt-1 font-semibold">
            {mockSummary.documentsUploaded} / {mockSummary.documentsTotal}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">{t("Not")}</p>
          <p className="mt-1 font-semibold">{mockSummary.grade ?? t("Henüz açıklanmadı")}</p>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 font-semibold">{t("Staj süreci")}</h2>
        <ol className="flex flex-wrap gap-2">
          {applicationStages.map((stage, i) => (
            <li
              key={stage.key}
              className={`rounded-full px-3 py-1 text-xs font-medium ${stageStyle[stage.state]}`}
            >
              {i + 1}. {t(stage.label)}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 font-semibold">{t("Yapılacaklar")}</h2>
        <ul className="divide-y divide-gray-100">
          {mockTasks.map((task, index) => (
            <li key={task.title} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{t(task.title)}</p>
                <p className="text-xs text-gray-500">{t("Son tarih")}: {dates[index]}</p>
              </div>
              <Link href={task.href} className="text-sm font-medium text-blue-600 hover:underline">
                {t("Git")}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
