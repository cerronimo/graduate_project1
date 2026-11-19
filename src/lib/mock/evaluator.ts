export type AssignedSubmission = {
  id: string;
  name: string;
  studentNumber: string;
  department: string;
  company: string;
  submittedAt: string;
  status: "Bekliyor" | "İnceleniyor" | "Tamamlandı";
  report: boolean;
  logbook: boolean;
};

export const assignedSubmissions: AssignedSubmission[] = [
  {
    id: "ST-2026-001",
    name: "Deniz Yılmaz",
    studentNumber: "22010457",
    department: "Yazılım Mühendisliği",
    company: "Örnek Teknoloji A.Ş.",
    submittedAt: "2026-11-18",
    status: "Bekliyor",
    report: true,
    logbook: true,
  },
  {
    id: "ST-2026-002",
    name: "Ece Demir",
    studentNumber: "22010632",
    department: "Bilgisayar Mühendisliği",
    company: "Örnek Yazılım Ltd.",
    submittedAt: "2026-11-16",
    status: "İnceleniyor",
    report: true,
    logbook: true,
  },
  {
    id: "ST-2026-003",
    name: "Mert Kaya",
    studentNumber: "22010814",
    department: "Yapay Zeka Mühendisliği",
    company: "Örnek Bilişim",
    submittedAt: "2026-11-14",
    status: "Bekliyor",
    report: true,
    logbook: false,
  },
  {
    id: "ST-2026-004",
    name: "Ada Şahin",
    studentNumber: "22010209",
    department: "Yazılım Mühendisliği",
    company: "Örnek Teknoloji A.Ş.",
    submittedAt: "2026-11-12",
    status: "Tamamlandı",
    report: true,
    logbook: true,
  },
];
