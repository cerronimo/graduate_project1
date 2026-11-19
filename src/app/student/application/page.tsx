"use client";

import ApplicationForm from "@/components/student/application-form";
import { useStudentLanguage } from "../language-context";
import { studentText } from "@/lib/student-translations";

export default function ApplicationPage() {
  const language = useStudentLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{studentText(language, "Staj Başvurusu")}</h1>
        <p className="text-sm text-gray-500">
          {studentText(language, "Formu adım adım doldur. * işaretli alanlar zorunlu.")}
        </p>
      </div>
      <ApplicationForm />
    </div>
  );
}
