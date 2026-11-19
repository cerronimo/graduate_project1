"use client";

import DocumentsList from "@/components/student/documents-list";
import { useStudentLanguage } from "../language-context";
import { studentText } from "@/lib/student-translations";

export default function DocumentsPage() {
  const language = useStudentLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{studentText(language, "Belgeler")}</h1>
        <p className="text-sm text-gray-500">
          {studentText(language, "Staj için gerekli belgeleri buradan yükle.")}
        </p>
      </div>
      <DocumentsList />
    </div>
  );
}
