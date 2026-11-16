import { CustomTaxonomy, ProfExamConfig, ProfessionalExamId } from '../types';

export const CURRICULUM_TAXONOMY_VERSION = 2; // BM&DC MBBS Curriculum 2021 & CMU Examination Structure

export const PROFESSIONAL_EXAMS: ProfExamConfig[] = [
  {
    id: 'First Professional',
    title: 'First Professional Examination',
    shortLabel: 'First Professional',
    subtitle: 'Anatomy, Physiology & Biochemistry',
    subjects: ['Anatomy', 'Physiology', 'Biochemistry'],
    papersBySubject: {
      Anatomy: ['Paper-I', 'Paper-II'],
      Physiology: ['Paper-I', 'Paper-II'],
      Biochemistry: ['Paper-I', 'Paper-II']
    }
  },
  {
    id: 'Second Professional',
    title: 'Second Professional Examination',
    shortLabel: 'Second Professional',
    subtitle: 'Pharmacology & Therapeutics · Forensic Medicine & Toxicology',
    subjects: ['Pharmacology & Therapeutics', 'Forensic Medicine & Toxicology'],
    papersBySubject: {
      'Pharmacology & Therapeutics': ['Paper-I', 'Paper-II', 'General'],
      'Forensic Medicine & Toxicology': ['Paper-I', 'Paper-II', 'General']
    },
    phaseFormativeSubjects: [
      'Pathology (Phase Teaching / Formative)',
      'Microbiology (Phase Teaching / Formative)',
      'Community Medicine (Phase Teaching / Formative)'
    ]
  },
  {
    id: 'Third Professional',
    title: 'Third Professional Examination',
    shortLabel: 'Third Professional',
    subtitle: 'Community Medicine & Public Health, Pathology & Microbiology',
    subjects: ['Community Medicine & Public Health', 'Pathology', 'Microbiology'],
    papersBySubject: {
      'Community Medicine & Public Health': ['Paper-I', 'Paper-II', 'General'],
      Pathology: ['Paper-I', 'Paper-II', 'General'],
      Microbiology: ['Paper-I', 'Paper-II', 'General']
    }
  },
  {
    id: 'Fourth Professional',
    title: 'Fourth Professional (Final) Examination',
    shortLabel: 'Fourth Professional (Final)',
    subtitle: 'Medicine & Allied, Surgery & Allied & Obstetrics & Gynaecology',
    subjects: [
      'Medicine & Allied Subjects',
      'Surgery & Allied Subjects',
      'Obstetrics & Gynaecology'
    ],
    papersBySubject: {
      'Medicine & Allied Subjects': ['Paper-I', 'Paper-II'],
      'Surgery & Allied Subjects': ['Paper-I', 'Paper-II'],
      'Obstetrics & Gynaecology': ['Paper-I', 'Paper-II']
    },
    alliedDisciplinesBySubject: {
      'Medicine & Allied Subjects': [
        'Internal Medicine',
        'Paediatrics',
        'Psychiatry',
        'Dermatology & Venereology',
        'Physical Medicine & Rehabilitation'
      ],
      'Surgery & Allied Subjects': [
        'General Surgery',
        'Orthopaedic Surgery',
        'Ophthalmology (Eye)',
        'Otolaryngology (ENT)',
        'Anaesthesiology',
        'Radiology & Imaging'
      ]
    }
  }
];

export const VALID_PROF_IDS: ProfessionalExamId[] = [
  'First Professional',
  'Second Professional',
  'Third Professional',
  'Fourth Professional'
];

export function isValidProfId(value: unknown): value is ProfessionalExamId {
  return typeof value === 'string' && VALID_PROF_IDS.includes(value as ProfessionalExamId);
}

/**
 * Canonicalizes legacy or shorthand subject names to the official BM&DC 2021 MBBS subject titles
 * when comparing or filtering across pages.
 */
export function canonicalizeSubjectName(raw?: string): string {
  const s = (raw || '').trim();
  const low = s.toLowerCase();
  if (!low) return '';
  if (low === 'anatomy') return 'Anatomy';
  if (low === 'physiology') return 'Physiology';
  if (low === 'biochemistry') return 'Biochemistry';
  if (low === 'pharmacology' || low.includes('pharmacology & therapeutics')) {
    return 'Pharmacology & Therapeutics';
  }
  if (low === 'forensic medicine' || low.includes('forensic medicine & toxicology')) {
    return 'Forensic Medicine & Toxicology';
  }
  if (low === 'community medicine' || low.includes('community medicine & public health')) {
    return 'Community Medicine & Public Health';
  }
  if (low === 'pathology') return 'Pathology';
  if (low === 'microbiology') return 'Microbiology';
  if (low === 'medicine' || low.includes('medicine & allied')) {
    return 'Medicine & Allied Subjects';
  }
  if (low === 'surgery' || low.includes('surgery & allied')) {
    return 'Surgery & Allied Subjects';
  }
  if (
    low === 'obstetrics & gynaecology' ||
    low === 'obs & gynae' ||
    low === 'obs-gynae' ||
    (low.includes('obstetrics') && low.includes('gynaec'))
  ) {
    return 'Obstetrics & Gynaecology';
  }
  return s;
}

export function subjectMatchesCanonical(candidate: string, filterSubject: string): boolean {
  if (!filterSubject || filterSubject === 'all') return true;
  return (
    canonicalizeSubjectName(candidate).toLowerCase() ===
    canonicalizeSubjectName(filterSubject).toLowerCase()
  );
}

export function getMergedProfConfigs(customTaxonomy?: CustomTaxonomy): ProfExamConfig[] {
  if (
    customTaxonomy?.professionalExams &&
    customTaxonomy.professionalExams.length > 0 &&
    (customTaxonomy.taxonomyVersion ?? 1) >= CURRICULUM_TAXONOMY_VERSION
  ) {
    return PROFESSIONAL_EXAMS.map(base => {
      const override = customTaxonomy.professionalExams!.find(p => p.id === base.id);
      if (!override) return base;
      // Preserve mandatory main subjects and allow admin additions
      const customExtras = (override.subjects || []).filter(
        s => !base.subjects.some(b => canonicalizeSubjectName(b) === canonicalizeSubjectName(s))
      );
      const mergedSubjects = [...base.subjects, ...customExtras];
      return {
        ...base,
        title: override.title || base.title,
        shortLabel: base.shortLabel,
        subtitle: override.subtitle || base.subtitle,
        subjects: mergedSubjects,
        papersBySubject: {
          ...base.papersBySubject,
          ...(override.papersBySubject || {})
        },
        alliedDisciplinesBySubject: base.alliedDisciplinesBySubject,
        phaseFormativeSubjects: base.phaseFormativeSubjects
      };
    });
  }
  return PROFESSIONAL_EXAMS;
}

export function getProfConfig(
  profId: ProfessionalExamId,
  customTaxonomy?: CustomTaxonomy
): ProfExamConfig {
  const configs = getMergedProfConfigs(customTaxonomy);
  return configs.find(p => p.id === profId) || configs[0];
}

export function getSubjectsForProf(
  profId: ProfessionalExamId,
  customTaxonomy?: CustomTaxonomy
): string[] {
  return getProfConfig(profId, customTaxonomy).subjects;
}

export function getPapersForSubjectInProf(
  profId: ProfessionalExamId,
  subject: string,
  customTaxonomy?: CustomTaxonomy
): string[] {
  const cfg = getProfConfig(profId, customTaxonomy);
  const canonical = canonicalizeSubjectName(subject);
  return cfg.papersBySubject[subject] || cfg.papersBySubject[canonical] || ['Paper-I', 'Paper-II', 'General'];
}

export function getAlliedDisciplinesForSubject(
  profId: ProfessionalExamId,
  subject: string,
  customTaxonomy?: CustomTaxonomy
): string[] {
  const cfg = getProfConfig(profId, customTaxonomy);
  const canonical = canonicalizeSubjectName(subject);
  return (
    cfg.alliedDisciplinesBySubject?.[subject] ||
    cfg.alliedDisciplinesBySubject?.[canonical] ||
    []
  );
}

export function isDentalSubjectOrProgram(prog?: string, subject?: string): boolean {
  if (prog && prog.toUpperCase() === 'BDS') return true;
  const s = (subject || '').toLowerCase().trim();
  return (
    s.includes('dental') ||
    s.includes('oral histology') ||
    s.includes('oral pathology') ||
    s.includes('prosthodontics') ||
    s.includes('orthodontics') ||
    s.includes('endodontics')
  );
}

/**
 * Official BM&DC MBBS Curriculum 2021 classifier.
 * Never guesses ambiguous entries; uncertain records are flagged with `needsReview: true`.
 */
export function inferProfessionalExam(meta: {
  explicitProf?: unknown;
  subject?: string;
  examName?: string;
  prog?: string;
}): { professionalExam: ProfessionalExamId; needsReview: boolean } {
  if (isValidProfId(meta.explicitProf)) {
    return { professionalExam: meta.explicitProf, needsReview: false };
  }

  const examText = (meta.examName || '').toLowerCase();
  if (/\b(1st|first)\s+prof/.test(examText)) {
    return { professionalExam: 'First Professional', needsReview: false };
  }
  if (/\b(2nd|second)\s+prof/.test(examText)) {
    return { professionalExam: 'Second Professional', needsReview: false };
  }
  if (/\b(3rd|third)\s+prof/.test(examText)) {
    return { professionalExam: 'Third Professional', needsReview: false };
  }
  if (/\b(4th|fourth|final)\s+prof/.test(examText)) {
    return { professionalExam: 'Fourth Professional', needsReview: false };
  }

  const subj = (meta.subject || '').toLowerCase().trim();

  // First Professional: Anatomy, Physiology, Biochemistry
  if (['anatomy', 'physiology', 'biochemistry'].includes(subj)) {
    return { professionalExam: 'First Professional', needsReview: false };
  }

  // Second Professional: Pharmacology & Therapeutics, Forensic Medicine & Toxicology
  if (
    subj.includes('pharmacology') ||
    subj.includes('forensic medicine') ||
    subj.includes('toxicology')
  ) {
    return { professionalExam: 'Second Professional', needsReview: false };
  }

  // Third Professional: Community Medicine & Public Health, Pathology, Microbiology
  if (
    subj.includes('community medicine') ||
    subj.includes('public health') ||
    subj.includes('pathology') ||
    subj.includes('microbiology')
  ) {
    return { professionalExam: 'Third Professional', needsReview: false };
  }

  // Fourth Professional (Final): Medicine & Allied, Surgery & Allied, Obstetrics & Gynaecology
  if (
    subj === 'medicine' ||
    subj.includes('medicine & allied') ||
    subj === 'surgery' ||
    subj.includes('surgery & allied') ||
    subj.includes('obstetrics') ||
    subj.includes('gynaecology') ||
    subj.includes('obs-gynae') ||
    subj.includes('obs & gynae') ||
    subj.includes('paediatrics') ||
    subj.includes('pediatrics') ||
    subj.includes('ophthalmology') ||
    subj.includes('otolaryngology') ||
    subj.includes('orthopaedic') ||
    subj.includes('psychiatry')
  ) {
    return { professionalExam: 'Fourth Professional', needsReview: false };
  }

  return { professionalExam: 'First Professional', needsReview: true };
}
