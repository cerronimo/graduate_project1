"use client";

import { useState } from "react";
import { mockStudent, mockInternship } from "@/lib/mock/student";
import {
  trainingConfig,
  acceptanceTemplates,
  insuranceTemplate,
} from "@/lib/config/training";

type DocItem = {
  key: string;
  title: string;
  description: string;
  required: boolean;
  templateHref?: string | null;
  showTemplate?: boolean;
};

const total = mockInternship.workingDays * trainingConfig.dailyFeeTL;

const documents: DocItem[] = [
  {
    key: "acceptance",
    title: "Internship Acceptance Form (Staj Kabul Formu)",
    description: `${mockStudent.departmentCode} bölümüne ait formu indir, firmaya doldurtup imza ve kaşe ile onaylat, taranmış halini yükle.`,
    required: true,
    templateHref: acceptanceTemplates[mockStudent.departmentCode] ?? null,
    showTemplate: true,
  },
  {
    key: "insurance",
    title: "Insurance Form (Staj Sigorta Formu)",
    description:
      "Tüm öğrenciler doldurmak zorunda. Sigorta işlemleri üniversite tarafından yapılır.",
    required: true,
    templateHref: insuranceTemplate,
    showTemplate: true,
  },
  {
    key: "photo",
    title: "Vesikalık Fotoğraf (3 adet)",
    description: "Fotokopi olmayan, güncel vesikalık fotoğraflar (taranmış hali).",
    required: true,
  },
  {
    key: "id-copy",
    title: "Nüfus Cüzdanı veya Pasaport Fotokopisi",
    description: "Kimliğin ön ve arka yüzü.",
    required: true,
  },
  ...(mockStudent.isTurkishCitizen
    ? [
        {
          key: "provizyon",
          title: "E-Devlet Provizyon (Müstehak) Sorgu Sonucu",
          description:
            "Sadece TC vatandaşları için. sgk.gov.tr üzerinden alınan sorgu sonuç belgesi.",
          required: true,
        },
      ]
    : []),
  {
    key: "bank-receipt",
    title: `Banka Dekontu (${trainingConfig.bankName})`,
    description: `Her iş günü için ${trainingConfig.dailyFeeTL} TL (${trainingConfig.feeEffectiveFrom} tarihinden itibaren geçerli). Başvurundaki ${mockInternship.workingDays} iş günü için toplam ${total.toLocaleString("tr-TR")} TL yatırılmalı.`,
    required: true,
  },
];

const MAX_SIZE_MB = 5;
const ACCEPTED = ".pdf,.jpg,.jpeg,.png";

type Uploaded = { name: string; sizeKb: number; date: string };

export default function DocumentsList() {
  const [files, setFiles] = useState<Record<string, Uploaded>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(key: string, file: File | undefined) {
    if (!file) return;

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [key]: `Dosya ${MAX_SIZE_MB} MB'tan büyük olamaz.`,
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, [key]: "" }));
    // TODO: Backend hazır olunca dosya Microsoft Graph / Teams'e yüklenecek.
    setFiles((prev) => ({
      ...prev,
      [key]: {
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
        date: new Date().toLocaleDateString("tr-TR"),
      },
    }));
  }

  function remove(key: string) {
    setFiles((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }

  const requiredDone = documents.filter((d) => d.required && files[d.key]).length;
  const requiredTotal = documents.filter((d) => d.required).length;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <p>
          Zorunlu belgeler: <strong>{requiredDone} / {requiredTotal}</strong>{" "}
          yüklendi. Son teslim: {trainingConfig.submissionDeadline}.
        </p>
        <p className="mt-1 text-blue-800">
          Kabul edilen türler: PDF, JPG, PNG (en fazla {MAX_SIZE_MB} MB).
        </p>
      </div>

      {documents.map((doc) => {
        const uploaded = files[doc.key];
        return (
          <div
            key={doc.key}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-xl">
                <p className="font-semibold">
                  {doc.title}
                  {doc.required && <span className="text-red-600"> *</span>}
                </p>
                <p className="mt-1 text-sm text-gray-500">{doc.description}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  uploaded
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {uploaded ? "Doğrulama bekliyor" : "Yüklenmedi"}
              </span>
            </div>

            {doc.showTemplate && (
              <p className="mt-3 text-sm">
                {doc.templateHref ? (
                  <a
                    href={doc.templateHref}
                    download
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Boş formu indir
                  </a>
                ) : (
                  <span className="text-gray-500">
                    Bu bölüm için form şablonu henüz eklenmedi.
                  </span>
                )}
              </p>
            )}

            {uploaded && (
              <div className="mt-3 flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm">
                <span>
                  {uploaded.name}{" "}
                  <span className="text-gray-500">
                    · {uploaded.sizeKb} KB · {uploaded.date}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => remove(doc.key)}
                  className="text-red-600 hover:underline"
                >
                  Kaldır
                </button>
              </div>
            )}

            <label className="mt-3 inline-block cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              {uploaded ? "Dosyayı değiştir" : "Dosya seç"}
              <input
                type="file"
                accept={ACCEPTED}
                className="hidden"
                onChange={(e) => handleChange(doc.key, e.target.files?.[0])}
              />
            </label>

            {errors[doc.key] && (
              <p className="mt-2 text-sm text-red-600">{errors[doc.key]}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}