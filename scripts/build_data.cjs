const fs = require('fs');

// We will generate src/data/questionsData.ts containing all extracted questions from the 7 PDFs + preserved BDS and previous MBBS demo questions.

const script = `import { PDF_CATALOG } from './pdfCatalog';

export interface QuestionRecord {
  id: string;
  text: string;
  subject: "Anatomy" | "Physiology" | "Biochemistry" | "Oral Histology" | "Dental Anatomy" | "Dental Materials";
  paper: "Paper-I" | "Paper-II" | "Term-1" | "Term-2" | "Term-3" | "General";
  group?: "Group-A" | "Group-B" | "PBQ" | "SEQ";
  section?: string;
  topic: string;
  type: "Written" | "SEQ" | "PBQ" | "Short Note" | "Viva" | "Card" | "Professional";
  year: number | null;
  marks: number | null;
  teacher: string | null;
  answer?: string;
  source: string;
  page: string;
  verified: boolean;
  board: string;
  exam?: string;
  other?: string;
  prog: "MBBS" | "BDS";
  real: boolean;
  pdfId?: string;
  pdfPage?: number;
  pdfUrl?: string;
  status: "verified" | "needs_review";
  reviewNote?: string;
}
`;

console.log('Writing builder...');
