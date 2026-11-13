export const departments = [
  { code: "CMPE", nameTr: "Bilgisayar Mühendisliği (İngilizce)", nameEn: "Computer Engineering" },
  { code: "CMSE", nameTr: "Yazılım Mühendisliği (İngilizce)", nameEn: "Software Engineering" },
  { code: "AING", nameTr: "Yapay Zeka Mühendisliği (İngilizce)", nameEn: "Artificial Intelligence Engineering" },
  { code: "BLGM", nameTr: "Bilgisayar Mühendisliği (Türkçe)", nameEn: "Computer Engineering" },
] as const;

export function departmentName(code: string) {
  return departments.find((d) => d.code === code)?.nameTr ?? code;
}