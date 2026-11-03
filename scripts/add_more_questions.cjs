const fs = require('fs');

const extraQuestions = [
  // Anatomy Paper-I Page 5 (p.10)
  {
    no: "1", sec: "Epithelium and Gland", grp: "Group-A", page: 5, bookPage: "p.10", topic: "Transitional Epithelium",
    pdfId: "ana-p1", pdfUrl: "/pdfs/anatomy_paper_1.pdf", subject: "Anatomy", paper: "Paper-I",
    text: "Definition and short note: Transitional epithelium. Simple squamous epithelium.",
    exam: "CMU: Nov-21, May-19; Ju-16, Nov-16",
    ans: "Stratified specialized epithelium capable of stretching (urothelium) found lining urinary tract from renal calyces to proximal urethra. Dome-shaped umbrella cells with thick apical plaques."
  },
  {
    no: "1", sec: "Cardiovascular & Nervous System", grp: "Group-A", page: 5, bookPage: "p.10", topic: "End Arteries",
    pdfId: "ana-p1", pdfUrl: "/pdfs/anatomy_paper_1.pdf", subject: "Anatomy", paper: "Paper-I",
    text: "What is end artery? Write their types and function. Mention 4 sites of functional end artery in our body.",
    exam: "May-16, Nov-15; CMU: May-23",
    ans: "Arteries whose terminal branches do not anastomose with neighboring vessels (anatomical end artery, e.g. central retinal artery) or whose anastomoses are insufficient to prevent necrosis during acute occlusion (functional end artery, e.g. splenic, renal, coronary, cerebral arteries)."
  },
  // Anatomy Paper-I Page 7 (p.12)
  {
    no: "1", sec: "Parotid Gland", grp: "Group-B", page: 7, bookPage: "p.12", topic: "Parotid Gland",
    pdfId: "ana-p1", pdfUrl: "/pdfs/anatomy_paper_1.pdf", subject: "Anatomy", paper: "Paper-I",
    text: "Histological structure of parotid gland. Mention the location and autonomic innervations of parotid gland. Structures passing through parotid gland.",
    exam: "Nov-16; CMU: Nov-21, 20, Nov-22; Ju-13, 16, Ja-15, 16, Nov-18",
    ans: "Purely serous salivary gland situated in retromandibular fossa. Structures passing through: Facial nerve (and its 5 terminal branches), Retromandibular vein, External carotid artery. Secretomotor pathway via glossopharyngeal nerve (CN IX) and otic ganglion."
  },
  {
    no: "1", sec: "Tongue", grp: "Group-B", page: 7, bookPage: "p.12", topic: "Tongue & Ankyloglossia",
    pdfId: "ana-p1", pdfUrl: "/pdfs/anatomy_paper_1.pdf", subject: "Anatomy", paper: "Paper-I",
    text: "Name the extrinsic muscles of tongue? What is tongue tie? What is the safety muscle of tongue & why?",
    exam: "CMU: Nov-20, Nov-23; Ja-09, 10, 12, Ju-06, 09, 14",
    ans: "Extrinsic muscles: Genioglossus, Hyoglossus, Styloglossus, Palatoglossus. Safety muscle is Genioglossus because bilateral contraction pulls tongue forward, preventing it from falling back and obstructing airway. Tongue tie is ankyloglossia."
  },
  // Anatomy Paper-I Page 9 (p.14)
  {
    no: "1", sec: "Cerebellum", grp: "Group-B", page: 9, bookPage: "p.14", topic: "Cerebellum Histology & Lesion",
    pdfId: "ana-p1", pdfUrl: "/pdfs/anatomy_paper_1.pdf", subject: "Anatomy", paper: "Paper-I",
    text: "Draw and label the connection of cerebellum. Histological structure of cerebellar cortex with diagram. Write down three features of cerebellar dysfunction/lesion.",
    exam: "Ju-07, May-18; CMU: May-25, Nov-23, May-22, Nov-20, 19",
    ans: "Cerebellar cortex has 3 layers: Molecular layer, Purkinje cell layer (sole efferent output), Granular layer. Lesion triad/features: Ataxia, intention tremor, dysdiadochokinesia, nystagmus, dysmetria (past-pointing)."
  },
  {
    no: "1", sec: "Ventricles & CSF", grp: "Group-B", page: 9, bookPage: "p.14", topic: "CSF Circulation",
    pdfId: "ana-p1", pdfUrl: "/pdfs/anatomy_paper_1.pdf", subject: "Anatomy", paper: "Paper-I",
    text: "Write down the formation, circulation and absorption of C.S.F. What is hydrocephalus?",
    exam: "CMU: Nov-22, 21, 19, Nov-25, Nov-20; Ju-13, Ja-10, 11, 12",
    ans: "Formed primarily by choroid plexuses in lateral, 3rd, and 4th ventricles (~500 mL/day). Circulates through foramen of Monro -> 3rd ventricle -> cerebral aqueduct -> 4th ventricle -> foramina of Luschka & Magendie -> subarachnoid space -> absorbed into superior sagittal sinus via arachnoid villi."
  },
  // Anatomy Paper-I Page 11 (p.16)
  {
    no: "2", sec: "Systemic Embryology", grp: "Group-B", page: 11, bookPage: "p.16", topic: "Pharyngeal Arches",
    pdfId: "ana-p1", pdfUrl: "/pdfs/anatomy_paper_1.pdf", subject: "Anatomy", paper: "Paper-I",
    text: "What is pharyngeal or brachial arch? Name the derivatives of pharyngeal arches in a tabulated form (1st & 2nd). Write down derivatives of 1st & 2nd branchial pouches.",
    exam: "Nov-25; Ja-05, Ju-07, 11, Ju-13, 14, Ju-15, Ja-16, Nov-18, May-19; CMU: Nov-22, May-22, Nov-17, 18",
    ans: "1st arch (Mandibular, CN V3): Meckel's cartilage (malleus, incus), muscles of mastication. 2nd arch (Hyoid, CN VII): Reichert's cartilage (stapes, styloid process, lesser horn of hyoid), muscles of facial expression. 1st pouch: auditory tube & tympanic cavity. 2nd pouch: palatine tonsil fossa."
  },

  // Anatomy Paper-II Page 3 (p.19)
  {
    no: "1", sec: "Vermiform Appendix", grp: "Group-A", page: 3, bookPage: "p.19", topic: "Appendicitis Pain",
    pdfId: "ana-p2", pdfUrl: "/pdfs/anatomy_paper_2.pdf", subject: "Anatomy", paper: "Paper-II",
    text: "What is McBurney's point with its clinical importance? Why pain of appendicitis starts at umbilicus and radiate to right iliac fossa?",
    exam: "CMU: Nov-21, Nov-22, May-20, 19; Nov-18, Ja-07, 15, Ju-12, 13, Nov-15, Ja-16",
    ans: "McBurney's point lies at junction of lateral 1/3 and medial 2/3 of line joining ASIS to umbilicus. Visceral pain referred to periumbilical region (T10 dermatome via sympathetic splanchnic nerves); once inflammation spreads to parietal peritoneum, somatic pain localizes sharply to right iliac fossa."
  },
  // Anatomy Paper-II Page 9 (p.25)
  {
    no: "2", sec: "Lung & Pleura", grp: "Group-B", page: 9, bookPage: "p.25", topic: "Pleural Effusion & Thoracocentesis",
    pdfId: "ana-p2", pdfUrl: "/pdfs/anatomy_paper_2.pdf", subject: "Anatomy", paper: "Paper-II",
    text: "What are the sites of aspiration of pleural effusion? Explain why this site is chosen. Mention the structures that will be pierced by a needle during pleural fluid aspiration.",
    exam: "CMU: May-23, May-25; Ja-08, 10, Ju-07, 09, 11, 12, 14, May-15, Nov-15",
    ans: "Usually performed in 8th or 9th intercostal space at midaxillary line during expiration. Structures pierced: Skin -> superficial fascia -> serratus anterior/latissimus dorsi -> external intercostal -> internal intercostal -> innermost intercostal -> endothoracic fascia -> parietal pleura."
  },
  {
    no: "5", sec: "Lung & Pleura", grp: "Group-B", page: 9, bookPage: "p.25", topic: "Bronchopulmonary Segments",
    pdfId: "ana-p2", pdfUrl: "/pdfs/anatomy_paper_2.pdf", subject: "Anatomy", paper: "Paper-II",
    text: "Define bronchopulmonary segment. Draw & label the bronchopulmonary segments of right and left lung with its clinical importance.",
    exam: "May-25, Nov-23, 18; CMU: May-24, 23, 22, 21, 20, 19; Nov-17, May-19",
    ans: "Well-defined anatomical, functional, and surgical unit of lung supplied by a tertiary (segmental) bronchus and segmental branch of pulmonary artery. Ten segments in right lung, eight to ten in left lung. Pulmonary veins are intersegmental."
  },

  // Physiology Paper-I Page 4 (p.99)
  {
    no: "1", sec: "WBC", grp: "Group-A", page: 4, bookPage: "p.99", topic: "WBC & Phagocytosis",
    pdfId: "phy-p1", pdfUrl: "/pdfs/physiology_paper_1.pdf", subject: "Physiology", paper: "Paper-I",
    text: "Give the differential and absolute count of W.B.C. Steps of phagocytosis, what is the role of lysosome in phagocytosis? Write difference between T and B Lymphocyte.",
    exam: "CMU: Nov-20, May-16, Nov-21; Cu-04",
    ans: "Differential: Neutrophils 40-75%, Lymphocytes 20-45%, Monocytes 2-10%, Eosinophils 1-6%, Basophils 0-1%. Phagocytosis steps: Chemotaxis -> Margination/Adhesion -> Pseudopod formation & Engulfment (Phagosome) -> Phagolysosome fusion & Enzymatic killing (respiratory burst)."
  },
  // Physiology Paper-I Page 5 (p.100)
  {
    no: "3", sec: "Blood Group", grp: "Group-A", page: 5, bookPage: "p.100", topic: "Blood Transfusion Hazards",
    pdfId: "phy-p1", pdfUrl: "/pdfs/physiology_paper_1.pdf", subject: "Physiology", paper: "Paper-I",
    text: "List the hazards of mismatched blood transfusion. Why is there acute renal shut down in mismatched blood transfusion? Describe erythroblastosis fetalis.",
    exam: "CMU: Nov-21, May-21, Nov-19, May-21, Nov-20; Ja-07, Ju-13, May-16, 18, Ja-08",
    ans: "Hazards: Acute intravascular hemolysis, fever, chills, anaphylaxis, hyperkalemia, acute renal failure. Renal shutdown caused by renal vasoconstriction, toxic free hemoglobin, and tubular cast obstruction."
  },
  // Physiology Paper-I Page 9 (p.104)
  {
    no: "1", sec: "Surfactant & IRDS", grp: "Group-B", page: 9, bookPage: "p.104", topic: "Pulmonary Surfactant",
    pdfId: "phy-p1", pdfUrl: "/pdfs/physiology_paper_1.pdf", subject: "Physiology", paper: "Paper-I",
    text: "Write down the composition and function of surfactant. What do you mean by respiratory distress syndrome of new born (IRDS)? State the importance of surfactant in prevention of IRDS.",
    exam: "May-15, 16; Ja-08, Ju-10, 11, May-19; CMU: Nov-21, 20, Nov-19, May-22, 19",
    ans: "Lipoprotein complex synthesized by Type II alveolar pneumocytes (~90% lipid: dipalmitoylphosphatidylcholine / DPPC, 10% surfactant proteins SP-A, B, C, D). Reduces surface tension, prevents alveolar collapse (atelectasis), and increases lung compliance."
  },
  {
    no: "4", sec: "Lung Volume & Capacities", grp: "Group-B", page: 9, bookPage: "p.104", topic: "Spirometry & FEV1",
    pdfId: "phy-p1", pdfUrl: "/pdfs/physiology_paper_1.pdf", subject: "Physiology", paper: "Paper-I",
    text: "Name the lung volume and capacities with their normal values. Draw a Spirogram. What is FEV1 and peak expiratory flow rate? How obstructive airway diseases can be differentiated from restrictive airway disease?",
    exam: "CMU: Nov-24, May-20; Ju-06, 09, 13, Ju-15, May-18; CMU: May-25, 24",
    ans: "Volumes: TV (500ml), IRV (3000ml), ERV (1100ml), RV (1200ml). Capacities: VC (4600ml), TLC (5800ml). In obstructive lung disease: FEV1/FVC < 70%. In restrictive disease: FEV1 and FVC are both reduced, ratio FEV1/FVC is normal or increased (>80%)."
  },
  // Physiology Paper-II Page 4 (p.111)
  {
    no: "1", sec: "Thyroid Hormone", grp: "Group-A", page: 4, bookPage: "p.111", topic: "Thyroid Biosynthesis",
    pdfId: "phy-p2", pdfUrl: "/pdfs/physiology_paper_2.pdf", subject: "Physiology", paper: "Paper-II",
    text: "Name the hormones of thyroid gland. State the steps of biosynthesis of thyroid hormones. State the calorigenic action of thyroid hormone.",
    exam: "CMU: Nov-22, May-22, Nov-20, 19; Ja-05, 08, 09, 14, Ju-05, 10, 13, Nov-15",
    ans: "Biosynthesis steps: 1) Iodide trapping (NIS symporter), 2) Oxidation of iodide to iodine (TPO), 3) Organification of thyroglobulin (MIT & DIT formation), 4) Coupling (MIT + DIT -> T3, DIT + DIT -> T4), 5) Storage and endocytosis, 6) Proteolysis and release of free T3/T4 into circulation."
  },
  {
    no: "1", sec: "Parathyroid Hormone", grp: "Group-A", page: 4, bookPage: "p.111", topic: "Calcium Homeostasis & Tetany",
    pdfId: "phy-p2", pdfUrl: "/pdfs/physiology_paper_2.pdf", subject: "Physiology", paper: "Paper-II",
    text: "Name the hormones that regulate the blood calcium level. What is tetany & calcium rigor? Role of PTH in regulating blood Ca2+ level.",
    exam: "CMU: Nov-24, 23, 20, Nov-23; Ju-12, Ja-16, Ja-05, Ju-14; Ja-07, Ju-14, May-16",
    ans: "Regulators: Parathyroid hormone (increases Ca2+), Calcitriol (increases Ca2+ & phosphate absorption), Calcitonin (decreases Ca2+). Hypocalcemia (<7 mg/dL) causes increased neuromuscular excitability leading to carpopedal spasm, Trousseau's sign, and Chvostek's sign (tetany)."
  },
  // Physiology Paper-II Page 7 (p.114)
  {
    no: "1", sec: "Nervous System - Synapse", grp: "Group-B", page: 7, bookPage: "p.114", topic: "Synaptic Transmission",
    pdfId: "phy-p2", pdfUrl: "/pdfs/physiology_paper_2.pdf", subject: "Physiology", paper: "Paper-II",
    text: "Define synapse. Write in brief properties of the synapse. Draw and label synaptic transmission and elaborate the mechanism of synaptic inhibition.",
    exam: "CMU: Nov-19, Nov-22, May-25; Ja-11, 12, 13, Nov-16, 18; Ju-09",
    ans: "Junction between axon terminal and effector cell. Properties: One-way conduction, synaptic delay, fatigue, summation (temporal & spatial). Postsynaptic inhibition mediated by GABA/glycine opening Cl- or K+ channels producing IPSP (hyperpolarization)."
  },
  // Physiology Paper-II Page 8 (p.115)
  {
    no: "8", sec: "Tracts & Pathway", grp: "Group-B", page: 8, bookPage: "p.115", topic: "Pain Pathway & Analgesia",
    pdfId: "phy-p2", pdfUrl: "/pdfs/physiology_paper_2.pdf", subject: "Physiology", paper: "Paper-II",
    text: "Trace the pain pathway from periphery to center. Trace the dual pathway for transmission of pain signals from periphery to central nervous system. What do you mean by referred pain?",
    exam: "CMU: Nov-19, May-25, 24, Nov-25, May-23, Nov-18; Ja-05, 07, 08, 11, 12, 15, Ju-06, 14",
    ans: "Fast pain: A-delta fibers -> neospinothalamic tract -> VPL thalamus -> somatosensory cortex. Slow chronic pain: C fibers -> paleospinothalamic tract -> reticular formation & periaqueductal gray -> intralaminar nuclei. Analgesia system activated by endogenous endorphins and enkephalins."
  },

  // Biochemistry 1st Term Page 5 (p.188)
  {
    no: "1", sec: "Lipid", grp: "Group-A", page: 5, bookPage: "p.188", topic: "Lipids & Lipoproteins",
    pdfId: "bio-t1", pdfUrl: "/pdfs/biochemistry_paper_1_first_term.pdf", subject: "Biochemistry", paper: "Paper-I",
    text: "Define & classify lipids with example? Mention chemical / important properties of lipid. Classify lipoprotein. Write the desired values of lipid profile.",
    exam: "May-24, 23, 16; Ju-10, 11, Ja-13, 14; CMU: May-22, 20; Ju-16, Nov-17",
    ans: "Lipids are water-insoluble biomolecules soluble in non-polar organic solvents. Classified into simple (fats, oils, waxes), compound (phospholipids, glycolipids, lipoproteins), and derived (fatty acids, sterols, fat-soluble vitamins). Normal lipid profile: Total cholesterol < 200 mg/dL, LDL < 100 mg/dL, HDL > 40 mg/dL, Triglycerides < 150 mg/dL."
  },
  // Biochemistry Term 2 Page 2 (p.193)
  {
    no: "1", sec: "Renal Biochemistry & Body Fluids", grp: "Group-A", page: 2, bookPage: "p.193", topic: "Anion Gap & Electrolytes",
    pdfId: "bio-t2", pdfUrl: "/pdfs/biochemistry_paper_2_term_2.pdf", subject: "Biochemistry", paper: "Paper-II",
    text: "Name the major electrolyte in ECF with normal range, what is anion gap. How will you calculate Na+, K+ & HCO3- deficiency in a patient of 65 kg with Dehydration.",
    exam: "CMU: May-22, Nov-21, 20; Ja-08, Ju-15",
    ans: "Anion gap = [Na+] - ([Cl-] + [HCO3-]). Normal range 8-16 mEq/L. High anion gap acidosis (MUDPILES): Methanol, Uremia, DKA, Propylene glycol, Isoniazid, Lactic acidosis, Ethylene glycol, Salicylates."
  },
  // Biochemistry Term 3 Page 3 (p.201)
  {
    no: "1", sec: "Clinical Biochemistry", grp: "Group-B", page: 3, bookPage: "p.201", topic: "Liver Function Tests & Jaundice",
    pdfId: "bio-t3", pdfUrl: "/pdfs/biochemistry_group_b_term_3.pdf", subject: "Biochemistry", paper: "Paper-II",
    text: "List the liver function test with values. Under three broad headlines 'Hepatocellular, Synthetic & Excretory' Function tests. What is jaundice? Classify the jaundice with clinical interpretations. Difference between hemolytic and latent jaundice.",
    exam: "CMU: May-20, 19, May-17; CMU: May-19; Nov-17, 19, Ja-08, Nov-15, Ja-16",
    ans: "Hepatocellular integrity: ALT (SGPT, most specific for liver necrosis), AST. Synthetic capacity: Serum albumin, Prothrombin time (INR). Excretory/Cholestasis: Total and direct bilirubin, Alkaline phosphatase (ALP), GGT. Jaundice classified as Pre-hepatic (hemolytic), Hepatic (hepatocellular), and Post-hepatic (obstructive)."
  }
];

function extractYear(examStr) {
  if (!examStr) return null;
  const matches = [...examStr.matchAll(/(?:Nov|May|Ju|Ja|Jan|July)?[- ]?(\d{2})\b/g)];
  let maxYear = 0;
  for (const m of matches) {
    const y = parseInt(m[1], 10);
    if (!isNaN(y)) {
      const fullY = y >= 50 ? 1900 + y : 2000 + y;
      if (fullY > maxYear && fullY <= 2026) maxYear = fullY;
    }
  }
  return maxYear || null;
}

function extractBoard(examStr) {
  if (!examStr) return "Not stated";
  const hasCMU = examStr.includes("CMU");
  const hasCU = examStr.includes("CU") || examStr.includes("Cu") || examStr.includes("Ja-") || examStr.includes("Ju-");
  if (hasCMU && hasCU) return "CMU & CU";
  if (hasCMU) return "CMU";
  if (hasCU) return "CU";
  return "Not stated";
}

// Read current questionsData.ts
const tsContent = fs.readFileSync('./src/data/questionsData.ts', 'utf8');
const match = tsContent.match(/export const ALL_QUESTIONS: QuestionRecord\[\] = (\[[\s\S]*?\]);\n/);

if (match) {
  const currentList = JSON.parse(match[1]);
  console.log('Current count:', currentList.length);

  extraQuestions.forEach((q, idx) => {
    currentList.push({
      id: `${q.pdfId}-${q.page}-extra-${idx + 1}`,
      text: q.text,
      subject: q.subject,
      paper: q.paper,
      group: q.grp,
      section: q.sec,
      topic: q.topic,
      type: "Written",
      year: extractYear(q.exam),
      marks: null,
      teacher: null,
      answer: q.ans,
      source: `Orbit Question Bank 18th ed., p.${q.bookPage.replace('p.', '')} (${q.subject} ${q.paper})`,
      page: `${q.subject} ${q.paper}, ${q.bookPage} (PDF Page ${q.page})`,
      verified: true,
      board: extractBoard(q.exam),
      exam: q.exam,
      other: "",
      prog: "MBBS",
      real: true,
      pdfId: q.pdfId,
      pdfPage: q.page,
      pdfUrl: q.pdfUrl,
      status: "verified"
    });
  });

  console.log('New total count:', currentList.length);

  const newOut = `import { PDF_CATALOG } from './pdfCatalog';

export interface QuestionRecord {
  id: string;
  text: string;
  subject: string;
  paper: string;
  group?: string;
  section?: string;
  topic: string;
  type: string;
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

export const ALL_QUESTIONS: QuestionRecord[] = ${JSON.stringify(currentList, null, 2)};
`;

  fs.writeFileSync('./src/data/questionsData.ts', newOut);
  console.log('Updated src/data/questionsData.ts successfully');
}
