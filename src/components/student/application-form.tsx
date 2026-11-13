"use client";

import { useState } from "react";
import { mockStudent } from "@/lib/mock/student";
import { departments, departmentName } from "@/lib/config/departments";

type Field = {
  key: string;
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  options?: { value: string; label: string }[];
};

const studentFields: Field[] = [
  { key: "fullName", label: "Ad Soyad", required: true },
  { key: "idNo", label: "TC / KKTC Kimlik No", required: true },
  { key: "studentNo", label: "Öğrenci No", required: true },
  { key: "academicYear", label: "Öğretim Yılı (örn. 2026-2027)", required: true },
  {
    key: "department",
    label: "Program / Bölüm",
    required: true,
    options: departments.map((d) => ({
      value: d.code,
      label: `${d.nameTr} (${d.code})`,
    })),
  },
  { key: "faculty", label: "Fakülte", required: true },
  { key: "email", label: "E-posta", type: "email", required: true },
  { key: "phone", label: "Telefon (GSM)", type: "tel", required: true },
  { key: "address", label: "İkametgah Adresi", required: true, full: true },
];

const companyFields: Field[] = [
  { key: "startDate", label: "Staj Başlangıç Tarihi", type: "date", required: true },
  { key: "endDate", label: "Staj Bitiş Tarihi", type: "date", required: true },
  { key: "workingDays", label: "Süre (İş Günü)", type: "number", required: true },
  { key: "companyName", label: "Firma Adı", required: true, full: true },
  { key: "companyAddress", label: "Firma Adresi", required: true, full: true },
  { key: "serviceArea", label: "Üretim / Hizmet Alanı", required: true },
  { key: "companyPhone", label: "Firma Telefon", type: "tel", required: true },
  { key: "companyFax", label: "Faks (isteğe bağlı)", type: "tel" },
  { key: "companyEmail", label: "Firma E-posta", type: "email", required: true },
  { key: "companyWeb", label: "Web Adresi (isteğe bağlı)" },
  { key: "employerName", label: "Yetkili / İşveren Ad Soyad", required: true },
  { key: "employerDuty", label: "Yetkilinin Görevi", required: true },
  { key: "employerEmail", label: "Yetkili E-posta", type: "email", required: true },
  { key: "sgkNo", label: "İşveren S.G.K. Tescil No (isteğe bağlı)" },
];

const workAreas = [
  "Systems analysis and design",
  "Software design and development",
  "Software quality assurance and testing",
  "Developing software applications according to modern SDLC methodologies",
  "Network management and configuration",
  "Database management systems",
  "Communication systems",
  "Web applications",
  "Security of software and systems",
  "AI applications in industry",
];

const steps = [
  "Kişisel / Akademik",
  "Firma Bilgileri",
  "Çalışma Alanları",
  "Özet ve Gönder",
];

const allFields = [...studentFields, ...companyFields];

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({
    fullName: mockStudent.name,
    studentNo: mockStudent.studentNo,
    department: mockStudent.departmentCode,
    faculty: "Mühendislik Fakültesi",
  });
  const [areas, setAreas] = useState<string[]>([]);
  const [otherArea, setOtherArea] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArea(area: string) {
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  function validate(currentStep: number): string {
    if (currentStep === 0 || currentStep === 1) {
      const fields = currentStep === 0 ? studentFields : companyFields;
      const missing = fields.filter((f) => f.required && !values[f.key]?.trim());
      if (missing.length > 0) {
        return `Lütfen zorunlu alanları doldurun: ${missing
          .map((f) => f.label)
          .join(", ")}`;
      }
      if (
        currentStep === 1 &&
        values.startDate &&
        values.endDate &&
        values.endDate <= values.startDate
      ) {
        return "Bitiş tarihi, başlangıç tarihinden sonra olmalı.";
      }
    }
    if (currentStep === 2 && areas.length === 0 && !otherArea.trim()) {
      return "En az bir çalışma alanı seçin.";
    }
    return "";
  }

  function next() {
    const message = validate(step);
    setError(message);
    if (!message) setStep(step + 1);
  }

  function back() {
    setError("");
    setStep(step - 1);
  }

  function submit() {
    if (!confirmed) {
      setError("Göndermek için bilgilerin doğru olduğunu onaylayın.");
      return;
    }
    // TODO: Backend hazır olunca Supabase'e kaydedilecek.
    console.log("Başvuru:", { ...values, areas, otherArea });
    setSubmitted(true);
  }

  function renderFields(fields: Field[]) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className={`block ${f.full ? "md:col-span-2" : ""}`}>
            <span className="mb-1 block text-sm font-medium text-gray-700">
              {f.label}
              {f.required && <span className="text-red-600"> *</span>}
            </span>
            {f.options ? (
              <select
                value={values[f.key] ?? ""}
                onChange={(e) => setValue(f.key, e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
              >
                <option value="">Seçiniz</option>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type ?? "text"}
                value={values[f.key] ?? ""}
                onChange={(e) => setValue(f.key, e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
              />
            )}
          </label>
        ))}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8">
        <h2 className="text-lg font-semibold text-green-800">
          Başvurun alındı
        </h2>
        <p className="mt-2 text-sm text-green-700">
          Başvurun advisor onayına gönderildi. Durumunu &quot;Başvuru
          Durumu&quot; sayfasından takip edebilirsin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ol className="flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              i === step
                ? "bg-blue-600 text-white"
                : i < step
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {step === 0 && (
          <>
            <h2 className="mb-4 font-semibold">Kişisel ve akademik bilgiler</h2>
            {renderFields(studentFields)}
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="mb-4 font-semibold">
              Staj yapılacak yer ve yetkili bilgileri
            </h2>
            {renderFields(companyFields)}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-1 font-semibold">Öğrencinin yapacağı işler</h2>
            <p className="mb-4 text-sm text-gray-500">
              Uygun olanların hepsini işaretle.
            </p>
            <div className="space-y-2">
              {workAreas.map((area) => (
                <label key={area} className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={areas.includes(area)}
                    onChange={() => toggleArea(area)}
                    className="mt-0.5"
                  />
                  <span>{area}</span>
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Diğer (bölüm onayı gerekir)
              </span>
              <input
                type="text"
                value={otherArea}
                onChange={(e) => setOtherArea(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              />
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="mb-4 font-semibold">Özet</h2>
            <dl className="grid gap-x-6 gap-y-3 md:grid-cols-2">
              {allFields.map((f) => (
                <div key={f.key} className={f.full ? "md:col-span-2" : ""}>
                  <dt className="text-xs text-gray-500">{f.label}</dt>
                  <dd className="text-sm font-medium">
                    {f.key === "department"
                      ? departmentName(values[f.key] ?? "") || "—"
                      : values[f.key]?.trim() || "—"}
                  </dd>
                </div>
              ))}
              <div className="md:col-span-2">
                <dt className="text-xs text-gray-500">Çalışma alanları</dt>
                <dd className="text-sm font-medium">
                  {[...areas, otherArea.trim() && `Diğer: ${otherArea.trim()}`]
                    .filter(Boolean)
                    .join(", ")}
                </dd>
              </div>
            </dl>
            <label className="mt-6 flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5"
              />
              <span>Yukarıdaki bilgilerin doğru olduğunu beyan ederim.</span>
            </label>
          </>
        )}

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium disabled:opacity-40"
        >
          Geri
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            İleri
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Başvuruyu Gönder
          </button>
        )}
      </div>
    </div>
  );
}