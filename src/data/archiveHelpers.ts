import { ALL_QUESTIONS, QuestionRecord } from './questionsData';
import { AUTHENTIC_MCQ_PAPERS, getMcqAnswerMetadata, VerificationStatus } from './mcqData';
import { CustomTaxonomy, PublishedMcqQuestion, QuestionOverride } from '../types';

export const MEDICAL_COLLEGES_BD = [
  'Chittagong Medical College (CMC)',
  'Dhaka Medical College (DMC)',
  'Sir Salimullah Medical College (SSMC)',
  'Shaheed Suhrawardy Medical College (ShSMC)',
  'Rajshahi Medical College (RMC)',
  'Mymensingh Medical College (MMC)',
  'Sylhet MAG Osmani Medical College (SOMC)',
  'Sher-e-Bangla Medical College (SBMC)',
  'Rangpur Medical College (RpMC)',
  'Cumilla Medical College (CuMC)',
  'Khulna Medical College (KMC)',
  'Mugda Medical College (MuMC)',
  "Cox's Bazar Medical College (CoxMC)",
  'Armed Forces Medical College (AFMC)',
  'Chattogram Maa-O-Shishu Hospital Medical College',
  'Bangladesh Medical College',
  'Other Medical College'
];

export interface UnifiedCqQuestion extends QuestionRecord {
  chapter: string;
  collegeName: string;
  chapterNeedsReview: boolean;
}

export interface UnifiedMcqQuestion {
  id: string;
  paperId: string;
  qNum: number;
  subject: string;
  paper: string;
  chapter: string;
  chapterNeedsReview: boolean;
  year: number;
  session: string;
  collegeName: string;
  examName: string;
  type: 'TF' | 'SBA';
  stem: string;
  items?: { label: string; text: string; ans: boolean }[];
  opts?: string[];
  correctIndex?: number;
  explanation?: string;
  sourceReference?: string;
  verificationStatus: VerificationStatus;
  officialOrbitDiscrepancy?: string;
  reviewReason?: string;
  isCommunityPublished?: boolean;
}

export const PENDING_CHAPTER_LABEL = 'Pending Chapter Review';

// Map CQ raw sections to canonical high-level chapters while preserving detail
function canonicalizeCqChapter(subject: string, paper: string, section?: string, topic?: string): {
  chapter: string;
  needsReview: boolean;
} {
  const sec = (section || '').trim();
  const top = (topic || '').trim();

  if (!sec && !top) {
    return { chapter: PENDING_CHAPTER_LABEL, needsReview: true };
  }

  const s = sec.toLowerCase();
  if (subject === 'Anatomy') {
    if (s.includes('embryology')) return { chapter: paper === 'Paper-I' ? 'General Embryology' : 'Systemic Embryology', needsReview: false };
    if (s.includes('histology') || s.includes('epithelium') || s.includes('cardiovascular & nervous')) {
      return { chapter: 'General Histology', needsReview: false };
    }
    if (s.includes('head') || s.includes('parotid') || s.includes('tongue') || s.includes('neck')) {
      return { chapter: 'Head & Neck', needsReview: false };
    }
    if (s.includes('brain') || s.includes('eyeball') || s.includes('cerebellum') || s.includes('ventricles')) {
      return { chapter: 'Brain & Eyeball', needsReview: false };
    }
    if (s.includes('thorax') || s.includes('lung')) return { chapter: 'Thorax', needsReview: false };
    if (s.includes('superior extremity') || s.includes('upper limb')) return { chapter: 'Superior Extremity', needsReview: false };
    if (s.includes('inferior extremity') || s.includes('lower limb')) return { chapter: 'Inferior Extremity', needsReview: false };
    if (s.includes('abdomen') || s.includes('kidney') || s.includes('liver') || s.includes('appendix')) {
      return { chapter: 'Abdomen & Pelvis', needsReview: false };
    }
    if (s.includes('nerve')) return { chapter: 'Nerves & Nerve Plexus', needsReview: false };
    if (s.includes('short questions') || s.includes('structural essay')) {
      return { chapter: PENDING_CHAPTER_LABEL, needsReview: true };
    }
  }

  if (subject === 'Physiology') {
    if (s.includes('general physiology') || s.includes('cell') || s.includes('membrane')) {
      return { chapter: 'General & Cellular Physiology', needsReview: false };
    }
    if (s.includes('blood') || s.includes('hematology') || s.includes('platelet') || s.includes('wbc')) {
      return { chapter: 'Blood & Immunology', needsReview: false };
    }
    if (s.includes('cardiovascular')) return { chapter: 'Cardiovascular System (CVS)', needsReview: false };
    if (s.includes('respiratory') || s.includes('surfactant') || s.includes('lung volume')) {
      return { chapter: 'Respiratory System', needsReview: false };
    }
    if (s.includes('gastrointestinal')) return { chapter: 'Gastrointestinal System (GIT)', needsReview: false };
    if (s.includes('thyroid') || s.includes('parathyroid') || s.includes('endocrin')) {
      return { chapter: 'Endocrinology', needsReview: false };
    }
    if (s.includes('nervous') || s.includes('synapse') || s.includes('tracts')) {
      return { chapter: 'Nervous System & Special Senses', needsReview: false };
    }
  }

  if (subject === 'Biochemistry') {
    if (s.includes('biophysics')) return { chapter: 'Biophysics & Solutions', needsReview: false };
    if (s.includes('bio molecules') || s.includes('lipid')) return { chapter: 'Biomolecules & Chemistry', needsReview: false };
    if (s.includes('enzyme')) return { chapter: 'Enzymes & Kinetics', needsReview: false };
    if (s.includes('food') || s.includes('nutrition')) return { chapter: 'Food, Nutrition & Vitamins', needsReview: false };
    if (s.includes('metabolism')) return { chapter: 'Metabolism & Bioenergetics', needsReview: false };
    if (s.includes('endocrinology') || s.includes('diabetes')) return { chapter: 'Clinical Endocrinology & Metabolism', needsReview: false };
    if (s.includes('renal') || s.includes('body fluids')) return { chapter: 'Renal, Water & Acid-Base Balance', needsReview: false };
    if (s.includes('genetics') || s.includes('molecular')) return { chapter: 'Genetics & Molecular Biology', needsReview: false };
    if (s.includes('clinical biochemistry')) return { chapter: 'Clinical Biochemistry & Organ Function', needsReview: false };
  }

  return sec ? { chapter: sec, needsReview: false } : { chapter: PENDING_CHAPTER_LABEL, needsReview: true };
}

// High-precision deterministic chapter classifier for MCQs.
// IMPORTANT: Never guess. Only assigns a chapter when stem/options give clear, unambiguous anatomical/physiological/biochemical matches.
// Uncertain or multi-topic stems are marked as "Pending Chapter Review" (`chapterNeedsReview: true`).
export function classifyMcqChapter(
  subject: string,
  paper: string,
  stem: string,
  subTexts: string[]
): { chapter: string; needsReview: boolean } {
  const combined = `${stem} ${subTexts.join(' ')}`.toLowerCase();

  if (subject === 'Anatomy' && paper === 'Paper-I') {
    if (/\b(fertilization|cleavage|morula|blastocyst|implantation|gastrulation|somite|neural crest|neural tube|teratogen|placenta|chorion|amnion|umbilical|pharyngeal arch|pharyngeal pouch|mesoderm|ectoderm|endoderm|meiosis|spermatogenesis|oogenesis|corpus luteum|trophoblast|notochord|dermatome|myotome|sclerotome)\b/.test(combined)) {
      return { chapter: 'General Embryology', needsReview: false };
    }
    if (/\b(epithelium|histology|collagen|elastic fiber|reticular|fibroblast|chondrocyte|osteocyte|osteoblast|osteoclast|sarcomere|myofibril|haversian|compact bone|hyaline cartilage|fibrocartilage|synapse|nissl|myelin|schwann|astrocyte|oligodendrocyte|lymph node|spleen|thymus|tonsil|goblet cell|transitional|pseudostratified)\b/.test(combined)) {
      return { chapter: 'General Histology', needsReview: false };
    }
    if (/\b(cerebrum|cerebellum|brainstem|midbrain|pons|medulla|ventricle|csf|arachnoid|dura mater|pia mater|falx|tentorium|circle of willis|internal capsule|corpus callosum|basal ganglia|thalamus|hypothalamus|spinal cord|corticospinal|extrapyramidal|dorsal column|retina|cornea|iris|ciliary body|aqueous humor|vitreous|lens|optic nerve|oculomotor|trochlear|abducens|extraocular)\b/.test(combined)) {
      return { chapter: 'Brain & Eyeball', needsReview: false };
    }
    if (/\b(scalp|face|facial nerve|parotid|submandibular|thyroid gland|parathyroid|larynx|pharynx|nasal cavity|paranasal|tongue|hypoglossal|middle ear|tympanic|cochlea|auditory tube|carotid triangle|posterior triangle|sternocleidomastoid|foramen|mandible|temporomandibular|maxillary|trigeminal|glossopharyngeal|cavernous sinus|jugular|scalene|trachea)\b/.test(combined)) {
      return { chapter: 'Head & Neck', needsReview: false };
    }
    if (/\b(chromosome|karyotype|trisomy|down syndrome|turner|klinefelter|autosomal|x-linked|barr body|nondisjunction)\b/.test(combined)) {
      return { chapter: 'Medical Genetics', needsReview: false };
    }
  }

  if (subject === 'Anatomy' && paper === 'Paper-II') {
    if (/\b(heart|pericardium|coronary|mediastinum|pleura|lung|bronchus|bronchopulmonary|diaphragm|intercostal|azygos|thoracic duct|esophagus|vagus|phrenic|superior vena cava|aortic arch|mitral|tricuspid|sinuatrial)\b/.test(combined)) {
      return { chapter: 'Thorax', needsReview: false };
    }
    if (/\b(brachial plexus|axilla|axillary|cubital fossa|deltoid|biceps|triceps|median nerve|ulnar nerve|radial nerve|musculocutaneous|rotator cuff|supraspinatus|carpal tunnel|palmar|anatomical snuffbox|clavicle|humerus|scapula|radius|ulna|shoulder joint|elbow joint|wrist)\b/.test(combined)) {
      return { chapter: 'Superior Extremity', needsReview: false };
    }
    if (/\b(femoral|inguinal|popliteal|sciatic|tibial nerve|peroneal|fibular|saphenous|gluteal|quadriceps|hamstring|gastrocnemius|soleus|hip joint|knee joint|ankle|foot|arches of foot|femur|tibia|fibula|patella|tarsal|lumbar plexus|sacral plexus)\b/.test(combined)) {
      return { chapter: 'Inferior Extremity', needsReview: false };
    }
    if (/\b(stomach|duodenum|jejunum|ileum|caecum|appendix|colon|rectum|anal canal|liver|gallbladder|bile duct|pancreas|spleen|kidney|ureter|urinary bladder|urethra|prostate|uterus|ovary|testis|peritoneum|mesentery|portal vein|celiac trunk|mesenteric artery|abdominal aorta|inguinal canal|spermatic cord|pelvic floor)\b/.test(combined)) {
      return { chapter: 'Abdomen & Pelvis', needsReview: false };
    }
  }

  if (subject === 'Physiology' && paper === 'Paper-I') {
    if (/\b(homeostasis|feedback|cell membrane|phospholipid|sodium potassium|na\+-k\+|osmosis|diffusion|active transport|endocytosis|resting membrane potential|action potential|depolarization|repolarization|neuromuscular junction|acetylcholine|sarcomere|sliding filament|smooth muscle|nerve fiber)\b/.test(combined)) {
      return { chapter: 'General & Cellular Physiology', needsReview: false };
    }
    if (/\b(erythropoiesis|reticulocyte|hemoglobin|anemia|polycythemia|leukocyte|neutrophil|lymphocyte|eosinophil|monocyte|platelet|thrombocytopenia|coagulation|clotting factor|fibrinolysis|blood group|abo|rh|immunity|complement|immunoglobulin|esr|hematocrit|packed cell)\b/.test(combined)) {
      return { chapter: 'Blood & Immunology', needsReview: false };
    }
    if (/\b(cardiac cycle|cardiac output|stroke volume|frank-starling|ecg|electrocardiogram|p wave|qrs|blood pressure|baroreceptor|renin|heart sound|sa node|av node|purkinje|coronary blood flow|microcirculation|starling forces|shock|venous return)\b/.test(combined)) {
      return { chapter: 'Cardiovascular System (CVS)', needsReview: false };
    }
    if (/\b(surfactant|spirometry|tidal volume|vital capacity|residual volume|dead space|alveolar|oxygen dissociation|bohr effect|haldane|carbon dioxide transport|hypoxia|cyanosis|respiratory center|chemoreceptor|pneumothorax|compliance|ventilation-perfusion)\b/.test(combined)) {
      return { chapter: 'Respiratory System', needsReview: false };
    }
    if (/\b(saliva|gastric juice|hcl|parietal cell|intrinsic factor|gastrin|secretin|cholecystokinin|bile salt|pancreatic juice|peristalsis|migrating motor|defecation|deglutition|villus|micelle)\b/.test(combined)) {
      return { chapter: 'Gastrointestinal System (GIT)', needsReview: false };
    }
  }

  if (subject === 'Physiology' && paper === 'Paper-II') {
    if (/\b(glomerular filtration|gfr|clearance|inulin|pah|nephron|loop of henle|countercurrent|juxtaglomerular|aldosterone|adh|vasopressin|micturition|cystometrogram|tubular reabsorption|renal plasma flow)\b/.test(combined)) {
      return { chapter: 'Renal Physiology', needsReview: false };
    }
    if (/\b(pituitary|growth hormone|thyroid|t3|t4|tsh|parathyroid|calcitonin|adrenal|cortisol|cushing|addison|insulin|glucagon|diabetes|spermatogenesis|ovulation|menstrual|estrogen|progesterone|oxytocin|prolactin)\b/.test(combined)) {
      return { chapter: 'Endocrinology & Reproduction', needsReview: false };
    }
    if (/\b(synapse|epsp|ipsp|reflex|stretch reflex|golgi tendon|upper motor neuron|lower motor neuron|corticospinal|basal ganglia|parkinson|cerebellum|ataxia|hypothalamus|sleep|eeg|pain|analgesia|thalamus)\b/.test(combined)) {
      return { chapter: 'Nervous System (CNS)', needsReview: false };
    }
    if (/\b(retina|rod|cone|rhodopsin|myopia|hypermetropia|visual pathway|cochlea|organ of corti|tympanic|vestibular|taste|olfaction)\b/.test(combined)) {
      return { chapter: 'Special Senses', needsReview: false };
    }
  }

  if (subject === 'Biochemistry' && paper === 'Paper-I') {
    if (/\b(ph\b|buffer|henderson|hasselbalch|osmolarity|osmolality|surface tension|viscosity|colloid|donnan|isotope|radioactive)\b/.test(combined)) {
      return { chapter: 'Biophysics & Solutions', needsReview: false };
    }
    if (/\b(carbohydrate|monosaccharide|disaccharide|polysaccharide|starch|glycogen|mucopolysaccharide|fatty acid|triglyceride|phospholipid|cholesterol|lipoprotein|amino acid|peptide|protein structure|collagen|myoglobin|hemoglobin|purine|pyrimidine|nucleotide)\b/.test(combined)) {
      return { chapter: 'Biomolecules & Chemistry', needsReview: false };
    }
    if (/\b(enzyme|coenzyme|km\b|vmax|michaelis|competitive inhibition|noncompetitive|allosteric|isoenzyme|lactate dehydrogenase|creatine kinase|troponin)\b/.test(combined)) {
      return { chapter: 'Enzymes & Kinetics', needsReview: false };
    }
    if (/\b(vitamin|thiamine|riboflavin|niacin|pyridoxine|folate|cobalamin|ascorbic|retinol|calciferol|tocopherol|kwashiorkor|marasmus|bmr|sda|dietary fiber|iron|zinc|iodine|calcium)\b/.test(combined)) {
      return { chapter: 'Food, Nutrition & Vitamins', needsReview: false };
    }
  }

  if (subject === 'Biochemistry' && paper === 'Paper-II') {
    if (/\b(glycolysis|gluconeogenesis|tca cycle|citric acid|krebs|hmp shunt|pentose phosphate|glycogenesis|glycogenolysis|beta oxidation|ketone|ketogenesis|urea cycle|transamination|oxidative phosphorylation|electron transport|atp synthase|cytochrome|bilirubin|porphyria|heme)\b/.test(combined)) {
      return { chapter: 'Metabolism & Bioenergetics', needsReview: false };
    }
    if (/\b(acidosis|alkalosis|anion gap|bicarbonate|abg|hyponatremia|hyperkalemia|hypokalemia|dehydration|water balance|renal function|creatinine clearance|microalbuminuria)\b/.test(combined)) {
      return { chapter: 'Renal, Water & Acid-Base Balance', needsReview: false };
    }
    if (/\b(dna replication|transcription|translation|mrna|trna|rrna|polymerase|codon|mutation|operon|pcr|recombinant|elisa|blot|restriction enzyme)\b/.test(combined)) {
      return { chapter: 'Genetics & Molecular Biology', needsReview: false };
    }
    if (/\b(ogtt|diabetes mellitus|hba1c|liver function|jaundice|alt\b|ast\b|alkaline phosphatase|thyroid function|tsh|tumor marker|cardiac marker)\b/.test(combined)) {
      return { chapter: 'Clinical Biochemistry & Organ Function', needsReview: false };
    }
  }

  return { chapter: PENDING_CHAPTER_LABEL, needsReview: true };
}

export function buildUnifiedCqQuestions(
  overrides: Record<string, QuestionOverride> = {}
): UnifiedCqQuestion[] {
  const seenText = new Set<string>();
  const result: UnifiedCqQuestion[] = [];

  for (const q of ALL_QUESTIONS) {
    const norm = `${q.subject}|${q.paper}|${q.text.trim().toLowerCase().replace(/\s+/g, ' ')}`;
    if (seenText.has(norm)) continue;
    seenText.add(norm);

    const baseChap = canonicalizeCqChapter(q.subject, q.paper, q.section, q.topic);
    const ov = overrides[q.id];

    result.push({
      ...q,
      subject: ov?.subject || q.subject,
      paper: ov?.paper || q.paper,
      year: ov?.year !== undefined ? ov.year : q.year,
      chapter: ov?.chapter || baseChap.chapter,
      chapterNeedsReview: ov?.chapterNeedsReview !== undefined ? ov.chapterNeedsReview : baseChap.needsReview,
      collegeName: ov?.collegeName || 'Chittagong Medical College (CMC)'
    });
  }
  return result;
}

export function buildUnifiedMcqQuestions(
  publishedQuestions: PublishedMcqQuestion[] = [],
  overrides: Record<string, QuestionOverride> = {}
): UnifiedMcqQuestion[] {
  const seen = new Set<string>();
  const list: UnifiedMcqQuestion[] = [];

  for (const paper of AUTHENTIC_MCQ_PAPERS) {
    for (const q of paper.questions) {
      const qId = `${paper.id}-q${q.qNum}`;
      const subTexts = [
        ...(q.opts || []),
        ...(q.items?.map(i => i.text) || [])
      ];
      const normKey = `${paper.subject}|${q.type}|${q.stem.trim().toLowerCase().replace(/\s+/g, ' ')}|${subTexts.join('|').toLowerCase().replace(/\s+/g, ' ')}`;
      if (seen.has(normKey)) continue;
      seen.add(normKey);

      const meta = getMcqAnswerMetadata(qId, q.stem, q.type);
      const classified = classifyMcqChapter(paper.subject, paper.paper, q.stem, subTexts);
      const ov = overrides[qId];

      list.push({
        id: qId,
        paperId: paper.id,
        qNum: q.qNum,
        subject: ov?.subject || paper.subject,
        paper: ov?.paper || paper.paper,
        chapter: ov?.chapter || classified.chapter,
        chapterNeedsReview: ov?.chapterNeedsReview !== undefined ? ov.chapterNeedsReview : classified.needsReview,
        year: ov?.year ?? paper.year,
        session: paper.session,
        collegeName: ov?.collegeName || 'Chittagong Medical College (CMC)',
        examName: `1st Prof MBBS (${paper.curriculum})`,
        type: q.type,
        stem: q.stem,
        items: q.items,
        opts: q.opts,
        correctIndex: q.correctIndex,
        explanation: meta?.explanation || q.explanation || q.textbookNote,
        sourceReference: meta?.sourceReference || q.sourceReference,
        verificationStatus: meta?.verificationStatus || q.verificationStatus || 'Verified',
        officialOrbitDiscrepancy: meta?.officialOrbitDiscrepancy || q.officialOrbitDiscrepancy,
        reviewReason: meta?.reviewReason || q.reviewReason,
        isCommunityPublished: false
      });
    }
  }

  for (const pq of publishedQuestions) {
    const normKey = `${pq.subject}|${pq.type}|${pq.stem.trim().toLowerCase().replace(/\s+/g, ' ')}`;
    if (seen.has(normKey)) continue;
    seen.add(normKey);

    const ov = overrides[pq.id];
    const chap = ov?.chapter || pq.chapter || PENDING_CHAPTER_LABEL;
    list.push({
      id: pq.id,
      paperId: pq.paperId,
      qNum: 1,
      subject: ov?.subject || pq.subject,
      paper: ov?.paper || pq.paper || 'Paper-I',
      chapter: chap,
      chapterNeedsReview: ov?.chapterNeedsReview ?? chap === PENDING_CHAPTER_LABEL,
      year: ov?.year ?? pq.year,
      session: pq.session || String(pq.year),
      collegeName: ov?.collegeName || pq.collegeName,
      examName: pq.examName,
      type: pq.type,
      stem: pq.stem,
      items: pq.items,
      opts: pq.opts,
      correctIndex: pq.correctIndex,
      explanation: pq.explanation,
      sourceReference: `${pq.collegeName} (${pq.examName})`,
      verificationStatus: pq.verificationStatus,
      isCommunityPublished: true
    });
  }

  return list;
}

export function getCanonicalChaptersFor(
  subject: string,
  paper: string,
  questions: { subject: string; paper: string; chapter: string }[],
  customTaxonomy?: CustomTaxonomy
): string[] {
  const set = new Set<string>();
  for (const q of questions) {
    if (
      (!subject || subject === 'all' || q.subject === subject) &&
      (!paper || paper === 'all' || q.paper === paper)
    ) {
      if (q.chapter) set.add(q.chapter);
    }
  }
  if (customTaxonomy && subject && subject !== 'all' && paper && paper !== 'all') {
    const extra = customTaxonomy.chaptersBySubjectPaper[`${subject}::${paper}`] || [];
    extra.forEach(c => set.add(c));
  }
  return Array.from(set).sort((a, b) => {
    if (a === PENDING_CHAPTER_LABEL) return 1;
    if (b === PENDING_CHAPTER_LABEL) return -1;
    return a.localeCompare(b);
  });
}
