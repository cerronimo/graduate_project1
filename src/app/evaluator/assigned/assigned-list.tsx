"use client";

import { useState } from "react";
import { assignedSubmissions, type AssignedSubmission } from "@/lib/mock/evaluator";

type StatusFilter = "Tümü" | AssignedSubmission["status"];

const statusStyles: Record<AssignedSubmission["status"], string> = {
  Bekliyor: "bg-amber-50 text-amber-800 ring-amber-200",
  İnceleniyor: "bg-blue-50 text-[#07509c] ring-blue-200",
  Tamamlandı: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

export default function AssignedList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("Tümü");

  const filtered = assignedSubmissions.filter((submission) => {
    const matchesStatus = status === "Tümü" || submission.status === status;
    const query = search.trim().toLocaleLowerCase("tr-TR");
    const matchesSearch = [submission.name, submission.studentNumber, submission.department, submission.company]
      .some((value) => value.toLocaleLowerCase("tr-TR").includes(query));
    return matchesStatus && matchesSearch;
  });

  const pendingCount = assignedSubmissions.filter((submission) => submission.status === "Bekliyor").length;
  const inProgressCount = assignedSubmissions.filter((submission) => submission.status === "İnceleniyor").length;

  return (
    <div className="space-y-7">
      <div>
        <p className="mb-2 text-sm font-semibold text-[#07509c]">Değerlendirici Paneli</p>
        <h1 className="text-2xl font-bold tracking-tight text-[#12385e] sm:text-3xl">Atanan Başvurular</h1>
        <p className="mt-2 text-base text-slate-600">Size atanan öğrencilerin staj teslimlerini buradan takip edin.</p>
      </div>

      <div className="rounded-lg border border-[#cbdff4] bg-[#edf5ff] px-5 py-4 text-sm text-[#174a80]">
        Bu ekranda tasarım önizlemesi için örnek veriler gösteriliyor.
      </div>

      <section aria-label="Başvuru özeti" className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Toplam atama", value: assignedSubmissions.length },
          { label: "Değerlendirme bekleyen", value: pendingCount },
          { label: "İncelenen", value: inProgressCount },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-[#dce6f2] bg-white px-5 py-5">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#073d7b]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-[#dce6f2] bg-white" aria-labelledby="submissions-heading">
        <div className="flex flex-col gap-4 border-b border-[#e7edf5] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="submissions-heading" className="text-lg font-bold text-[#12385e]">Başvurular</h2>
            <p className="mt-1 text-sm text-slate-500">{filtered.length} kayıt gösteriliyor</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="submission-search">Öğrenci veya şirket ara</label>
            <input
              id="submission-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Öğrenci veya şirket ara"
              className="min-h-11 w-full rounded-lg border border-[#cddbea] bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#07509c] focus:ring-2 focus:ring-blue-100 sm:w-64"
            />
            <label className="sr-only" htmlFor="status-filter">Duruma göre filtrele</label>
            <select
              id="status-filter"
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="min-h-11 rounded-lg border border-[#cddbea] bg-white px-4 pr-8 text-sm text-slate-700 outline-none focus:border-[#07509c] focus:ring-2 focus:ring-blue-100"
            >
              <option value="Tümü">Tüm durumlar</option>
              <option value="Bekliyor">Bekliyor</option>
              <option value="İnceleniyor">İnceleniyor</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-[#12385e]">Başvuru bulunamadı</p>
            <p className="mt-1 text-sm text-slate-500">Arama veya durum filtresini değiştirebilirsiniz.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e7edf5]">
            {filtered.map((submission) => (
              <article key={submission.id} className="grid gap-4 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf3fd] text-sm font-bold text-[#07509c]" aria-hidden="true">
                    {submission.name.split(" ").map((part) => part[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#12385e]">{submission.name}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">{submission.studentNumber} · {submission.department}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-700">{submission.company}</p>
                  <p className="mt-1 text-slate-500">Teslim: {submission.submittedAt}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className={submission.report ? "text-[#07509c]" : "text-slate-400"}>Rapor {submission.report ? "✓" : "—"}</span>
                  <span className={submission.logbook ? "text-[#07509c]" : "text-slate-400"}>Logbook {submission.logbook ? "✓" : "—"}</span>
                </div>
                <span className={`w-fit whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ring-1 ${statusStyles[submission.status]}`}>
                  {submission.status}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
