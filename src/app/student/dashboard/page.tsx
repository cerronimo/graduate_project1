import Link from "next/link";
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
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Hoş geldin, {mockStudent.name}</h1>
        <p className="text-sm text-gray-500">
          {mockStudent.department} · {mockStudent.studentNo}
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Başvuru durumu</p>
          <p className="mt-1 font-semibold">{mockSummary.applicationStatus}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Yüklenen belgeler</p>
          <p className="mt-1 font-semibold">
            {mockSummary.documentsUploaded} / {mockSummary.documentsTotal}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Not</p>
          <p className="mt-1 font-semibold">{mockSummary.grade ?? "Henüz açıklanmadı"}</p>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 font-semibold">Staj süreci</h2>
        <ol className="flex flex-wrap gap-2">
          {applicationStages.map((stage, i) => (
            <li
              key={stage.key}
              className={`rounded-full px-3 py-1 text-xs font-medium ${stageStyle[stage.state]}`}
            >
              {i + 1}. {stage.label}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 font-semibold">Yapılacaklar</h2>
        <ul className="divide-y divide-gray-100">
          {mockTasks.map((task) => (
            <li key={task.title} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{task.title}</p>
                <p className="text-xs text-gray-500">Son tarih: {task.due}</p>
              </div>
              <Link href={task.href} className="text-sm font-medium text-blue-600 hover:underline">
                Git
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}