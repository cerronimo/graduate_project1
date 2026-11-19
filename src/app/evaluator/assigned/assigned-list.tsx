"use client";

import { useState } from "react";
import { assignedSubmissions, type AssignedSubmission } from "@/lib/mock/evaluator";
import { useEvaluatorLanguage } from "../language-context";

type StatusFilter = "Tümü" | AssignedSubmission["status"];

const statusStyles: Record<AssignedSubmission["status"], string> = {
  Bekliyor: "bg-[#fff7e8] text-[#8b611c]",
  İnceleniyor: "bg-[#e9edfb] text-[#263b82]",
  Tamamlandı: "bg-[#e9f6ef] text-[#216b44]",
};

const statusEnglish: Record<AssignedSubmission["status"], string> = {
  Bekliyor: "Pending",
  İnceleniyor: "In review",
  Tamamlandı: "Completed",
};

const departmentEnglish: Record<string, string> = {
  "Yazılım Mühendisliği": "Software Engineering",
  "Bilgisayar Mühendisliği": "Computer Engineering",
  "Yapay Zeka Mühendisliği": "Artificial Intelligence Engineering",
};

export default function AssignedList() {
  const language = useEvaluatorLanguage();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("Tümü");
  const isTurkish = language === "tr";

  const filtered = assignedSubmissions.filter((submission) => {
    const matchesStatus = status === "Tümü" || submission.status === status;
    const query = search.trim().toLocaleLowerCase(isTurkish ? "tr-TR" : "en-GB");
    const values = [submission.name, submission.studentNumber, submission.department, departmentEnglish[submission.department], submission.company];
    return matchesStatus && values.some((value) => value.toLocaleLowerCase(isTurkish ? "tr-TR" : "en-GB").includes(query));
  });

  const pendingCount = assignedSubmissions.filter((submission) => submission.status === "Bekliyor").length;
  const inProgressCount = assignedSubmissions.filter((submission) => submission.status === "İnceleniyor").length;
  const completedCount = assignedSubmissions.filter((submission) => submission.status === "Tamamlandı").length;
  const summary = [
    { label: isTurkish ? "Toplam atama" : "Total assigned", value: assignedSubmissions.length },
    { label: isTurkish ? "Bekleyen" : "Pending", value: pendingCount },
    { label: isTurkish ? "İncelenen" : "In review", value: inProgressCount },
    { label: isTurkish ? "Tamamlanan" : "Completed", value: completedCount },
  ];

  function formatDate(value: string) {
    return new Intl.DateTimeFormat(isTurkish ? "tr-TR" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#202f69] sm:text-3xl">{isTurkish ? "Atanan Başvurular" : "Assigned Submissions"}</h1>
        <p className="mt-2 text-base text-[#626a7b]">{isTurkish ? "Size atanan staj teslimlerini görüntüleyin ve takip edin." : "View and track the internship submissions assigned to you."}</p>
      </div>

      <section aria-label={isTurkish ? "Başvuru özeti" : "Submission summary"} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-[18px] bg-white px-6 py-6 shadow-[0_5px_16px_rgba(22,31,68,0.08)]">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf0fa] text-[#212f6b]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19M16 5.5a3 3 0 0 1 0 5.8M18 13a5 5 0 0 1 2.5 4.3V19" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-[#212f6b]">{item.value}</p>
            <p className="mt-1 text-sm text-[#6c7280]">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-[18px] bg-white shadow-[0_5px_16px_rgba(22,31,68,0.06)]" aria-labelledby="submissions-heading">
        <div className="flex flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 id="submissions-heading" className="text-xl font-bold text-[#202f69]">{isTurkish ? "Başvurular" : "Submissions"}</h2>
            <p className="mt-1 text-sm text-[#727986]">{isTurkish ? `${filtered.length} kayıt gösteriliyor` : `Showing ${filtered.length} submissions`}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="submission-search">{isTurkish ? "Öğrenci veya şirket ara" : "Search student or company"}</label>
            <input
              id="submission-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={isTurkish ? "Öğrenci veya şirket ara" : "Search student or company"}
              className="min-h-11 w-full rounded-lg border border-[#c9ced9] bg-white px-4 text-sm outline-none placeholder:text-[#9096a2] focus:border-[#212f6b] focus:ring-2 focus:ring-[#dce2f5] sm:w-64"
            />
            <label className="sr-only" htmlFor="status-filter">{isTurkish ? "Duruma göre filtrele" : "Filter by status"}</label>
            <select
              id="status-filter"
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="min-h-11 rounded-lg border border-[#c9ced9] bg-white px-4 pr-8 text-sm text-[#38435d] outline-none focus:border-[#212f6b] focus:ring-2 focus:ring-[#dce2f5]"
            >
              <option value="Tümü">{isTurkish ? "Tüm durumlar" : "All statuses"}</option>
              <option value="Bekliyor">{isTurkish ? "Bekliyor" : "Pending"}</option>
              <option value="İnceleniyor">{isTurkish ? "İnceleniyor" : "In review"}</option>
              <option value="Tamamlandı">{isTurkish ? "Tamamlandı" : "Completed"}</option>
            </select>
          </div>
        </div>

        <div className="mx-6 border-t border-[#e1e3e9] lg:mx-8" />
        <div className="px-6 pb-3 pt-4 text-xs font-medium text-[#68728a] lg:px-8">
          {isTurkish ? "Tasarım önizlemesi için örnek veriler gösteriliyor." : "Sample data is shown for this design preview."}
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="font-semibold text-[#202f69]">{isTurkish ? "Başvuru bulunamadı" : "No submissions found"}</p>
            <p className="mt-1 text-sm text-[#727986]">{isTurkish ? "Aramayı veya durum filtresini değiştirin." : "Try a different search or status filter."}</p>
          </div>
        ) : (
          <div className="overflow-x-auto px-6 pb-5 lg:px-8">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
              <thead className="text-[#293963]">
                <tr className="border-b border-[#d9dce5]">
                  <th scope="col" className="py-4 pr-5 font-semibold">{isTurkish ? "Öğrenci" : "Student"}</th>
                  <th scope="col" className="py-4 pr-5 font-semibold">{isTurkish ? "Şirket" : "Company"}</th>
                  <th scope="col" className="py-4 pr-5 font-semibold">{isTurkish ? "Teslim tarihi" : "Submission date"}</th>
                  <th scope="col" className="py-4 pr-5 font-semibold">{isTurkish ? "Belgeler" : "Documents"}</th>
                  <th scope="col" className="py-4 font-semibold">{isTurkish ? "Durum" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((submission) => (
                  <tr key={submission.id} className="border-b border-[#eceef2] last:border-b-0">
                    <td className="py-5 pr-5">
                      <p className="font-semibold text-[#202f69]">{submission.name}</p>
                      <p className="mt-1 text-[#777e8b]">{submission.studentNumber} · {isTurkish ? submission.department : departmentEnglish[submission.department]}</p>
                    </td>
                    <td className="py-5 pr-5 text-[#3c465d]">{submission.company}</td>
                    <td className="py-5 pr-5 whitespace-nowrap text-[#3c465d]">{formatDate(submission.submittedAt)}</td>
                    <td className="py-5 pr-5 whitespace-nowrap text-[#3c465d]">
                      <span className={submission.report ? "text-[#273a79]" : "text-[#a3a7b2]"}>{isTurkish ? "Rapor" : "Report"} {submission.report ? "✓" : "—"}</span>
                      <span className={`ml-3 ${submission.logbook ? "text-[#273a79]" : "text-[#a3a7b2]"}`}>Logbook {submission.logbook ? "✓" : "—"}</span>
                    </td>
                    <td className="py-5">
                      <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[submission.status]}`}>
                        {isTurkish ? submission.status : statusEnglish[submission.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
