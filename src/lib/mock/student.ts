export const mockStudent = {
  name: "Örnek Öğrenci",
  studentNo: "21000000",
  department: "Yazılım Mühendisliği",
  departmentCode: "CMSE",
  isTurkishCitizen: true,
};

export const mockInternship = {
  workingDays: 30,
};
export const applicationStages = [
  { key: "application", label: "Başvuru", state: "done" },
  { key: "advisor", label: "Advisor Onayı", state: "done" },
  { key: "coordinator", label: "Coordinator Onayı", state: "current" },
  { key: "documents", label: "Belgeler", state: "todo" },
  { key: "internship", label: "Staj", state: "todo" },
  { key: "reports", label: "Report / Logbook", state: "todo" },
  { key: "evaluation", label: "Değerlendirme", state: "todo" },
] as const;

export const mockTasks = [
  { title: "Acceptance Letter yükle", due: "30 Kasım 2026", href: "/student/documents" },
  { title: "Sigorta belgesini yükle", due: "10 Aralık 2026", href: "/student/documents" },
  { title: "Staj raporunu teslim et", due: "15 Eylül 2027", href: "/student/reports" },
];

export const mockSummary = {
  applicationStatus: "Coordinator onayı bekleniyor",
  documentsUploaded: 1,
  documentsTotal: 3,
  grade: null as string | null,
};