import type { VivaItem } from '../utils/appsScriptViva';

/**
 * Configurable PDF URLs for the seeded Viva Suggestion entries.
 *
 * Both entries are pre-linked to the attached local PDFs under `/assets/aistudio/`.
 * You can replace either path with a Google Drive URL anytime if preferred.
 */
export const VIVA_SEED_PDF_URLS = {
  physiology: '/assets/aistudio/CMC_Physiology_Prof_Viva___Organized_Question_Bank_cf85a38a.pdf',
  biochemistry: '/assets/aistudio/CMC_Biochemistry_Combined_Question_Bank_b90c545a.pdf'
} as const;

export const DEFAULT_SEED_VIVA_ITEMS: VivaItem[] = [
  {
    id: 'seed_viva_physiology_fahad_pdf',
    prof: '1st Prof',
    subject: 'Physiology',
    examiner_type: 'Suggestion',
    viva_type: 'suggestion',
    is_suggestion: true,
    board_name: 'Board 1 & 2 + OSPE',
    session: '',
    year: '2026',
    title: 'CMC Physiology Prof Viva — Organized Question Bank (PDF)',
    question:
      'Complete 24-page organized Physiology Prof Viva suggestion & question bank covering General Physiology, Blood & Hematology, CVS, Respiratory, GIT, Renal, Endocrine, Reproductive, Nervous System, Special Senses, Consolidated Figures/Pictograms, OSPE Procedures & Instruments, Long Practical Viva, and a Suggested Revision Order.',
    answer_hint:
      'Organized topic-wise (Board 1, Board 2, figures/pictograms, OSPE, and long practicals). Repeated questions are merged while important follow-ups are retained.',
    file_url: VIVA_SEED_PDF_URLS.physiology,
    file_name: 'CMC_Physiology_Prof_Viva_Organized_Question_Bank.pdf (24 Pages)',
    mime_type: 'application/pdf',
    file_type: 'pdf',
    contributor_name: 'Fahad vaiya',
    contributor_email: '',
    batch: '',
    college_name: 'Chittagong Medical College',
    status: 'approved',
    created_at: '2026-11-24T00:00:00.000Z',
    is_seeded: true
  },
  {
    id: 'seed_viva_biochemistry_fahad_pdf',
    prof: '1st Prof',
    subject: 'Biochemistry',
    examiner_type: 'Suggestion',
    viva_type: 'suggestion',
    is_suggestion: true,
    board_name: 'OSPE & Viva + December 2025 Bank',
    session: '',
    year: '2026',
    title: 'CMC Biochemistry OSPE & Viva — Combined Master Question Bank (PDF)',
    question:
      'Complete 11-page Biochemistry OSPE & Viva Combined Master Question Bank (merged from Master Question Bank & December 2025 Bank) covering Practical/OSPE Stations, Acid-Base Balance & ABG, Fluid & Electrolytes, Carbohydrates, Diabetes Mellitus, Lipids & Ketogenesis, Proteins & Urea Cycle, Enzymes, Vitamins, Nutrition, Renal & LFTs, Thyroid, Molecular Biology & Genetics, Clinical Scenarios, and Quick Revision Checklist.',
    answer_hint:
      'Covers 17 topic-wise OSPE & Viva modules (Benedict’s test, heat coagulation, solution prep, quantitative estimations, ABG, clinical scenarios) plus a Quick Revision Checklist.',
    file_url: VIVA_SEED_PDF_URLS.biochemistry,
    file_name: 'CMC_Biochemistry_Combined_Question_Bank.pdf (11 Pages)',
    mime_type: 'application/pdf',
    file_type: 'pdf',
    contributor_name: 'Fahad vaiya',
    contributor_email: '',
    batch: '',
    college_name: 'Chittagong Medical College',
    status: 'approved',
    created_at: '2026-11-24T00:00:00.000Z',
    is_seeded: true
  }
];
