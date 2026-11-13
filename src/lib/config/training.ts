// Dönem dönem değişebilen kurallar burada tutulur.
export const trainingConfig = {
  dailyFeeTL: 35,
  feeEffectiveFrom: "14.05.2026",
  bankName: "Koop Bank",
  submissionDeadline: "Yarıyılın son haftası (final sınavlarından önce)",
};

// Acceptance Form bölüme göre değişir. Şablonu olmayan bölüm için null bırak.
export const acceptanceTemplates: Record<string, string | null> = {
  CMPE: "/forms/CMPE400_Acceptance_Form.docx",
  CMSE: "/forms/CMSE400_Acceptance_Form.docx",
  AING: "/forms/AING400_Acceptance_Form.docx",
  BLGM: "/forms/BLGM400_Acceptance_Form.docx",
};

export const insuranceTemplate =
  "/forms/Turkish_English_Summer_Training_Insurance_Form.docx";