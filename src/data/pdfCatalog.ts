import { existsSync, writeFileSync } from 'fs';

export interface PdfDocument {
  id: string;
  originalFileName: string;
  cleanFileName: string;
  title: string;
  subject: string;
  paper: string;
  examType: string;
  totalPages: number;
  bookPages: string;
  edition: string;
  fileSizeFormatted: string;
  fileSizeBytes: number;
  pdfPath: string;
  originalAssetPath: string;
  scanQuality: string;
  sections: string[];
  description: string;
}

export const PDF_CATALOG: PdfDocument[] = [
  {
    id: "ana-p1",
    originalFileName: "Ana_paper_1_75842309.pdf",
    cleanFileName: "anatomy_paper_1.pdf",
    title: "Anatomy Paper-I (SAQ - Group A & B)",
    subject: "Anatomy",
    paper: "Paper-I",
    examType: "First Professional MBBS / Term",
    totalPages: 11,
    bookPages: "Orbit 18th Ed, p.06 - p.16",
    edition: "Orbit Question Bank 18th Edition",
    fileSizeFormatted: "8.0 MB",
    fileSizeBytes: 8423056,
    pdfPath: "/pdfs/anatomy_paper_1.pdf",
    originalAssetPath: "/assets/aistudio/Ana_paper_1_75842309.pdf",
    scanQuality: "Scanned CamScanner (Clean, readable; some pen marks on marginal short notes)",
    sections: [
      "Group-A: General Embryology (p.06-07)",
      "Group-A: General Histology (Cell & Division, Tissue-Bone-Cartilage-Joint-Muscle) (p.08-09)",
      "Group-A: Genetics (p.10)",
      "Group-A: Epithelium and Gland (p.10)",
      "Group-A: Cardiovascular & Nervous system (p.10-11)",
      "Group-A: Lymphatic System (p.11)",
      "Group-B: Head & Neck (Scalp, Face, Lacrimal, Thyroid, Parotid) (p.11-12)",
      "Group-B: Nose & Paranasal Air Sinuses, Tongue, Ear (p.12)",
      "Group-B: Tonsil, Pharynx & Larynx, Muscle-Bones-Joint, Neck Region (p.13)",
      "Group-B: Brain & Eyeball (Cerebrum, Cerebellum, Brainstem, Ventricles, Spinal Cord) (p.13-15)",
      "Group-B: Eyeball & Systemic Embryology (p.15-16)"
    ],
    description: "Original Chittagong Medical University (CMU) and Chittagong University (CU) past examination questions for Anatomy Paper-I covering Embryology, Histology, Head & Neck, Brain, and Eyeball."
  },
  {
    id: "ana-p2",
    originalFileName: "Ana_paper_2_ff0be12a.pdf",
    cleanFileName: "anatomy_paper_2.pdf",
    title: "Anatomy Paper-II (SAQ, PBQ & SEQ)",
    subject: "Anatomy",
    paper: "Paper-II",
    examType: "First Professional MBBS / Term",
    totalPages: 15,
    bookPages: "Orbit 18th Ed, p.17 - p.40",
    edition: "Orbit Question Bank 18th Edition",
    fileSizeFormatted: "12.0 MB",
    fileSizeBytes: 12570898,
    pdfPath: "/pdfs/anatomy_paper_2.pdf",
    originalAssetPath: "/assets/aistudio/Ana_paper_2_ff0be12a.pdf",
    scanQuality: "Scanned CamScanner (Clean high contrast; includes Problem-Based and Structural Essay questions)",
    sections: [
      "Group-A: Abdomen (Stomach, Small & Large Intestine) (p.17)",
      "Group-A: Urinary System, Rectum & Anal Canal, Kidney, Liver & Gall Bladder (p.18-19)",
      "Group-A: Pancreas & Spleen, Vermiform Appendix, Diaphragm, Genitalia (p.19-20)",
      "Group-A: Peritoneum, Large Vessels of Gut, Anterior Abdominal Wall (p.20-21)",
      "Group-A: Inferior Extremity (Front of Thigh, Popliteal, Artery/Vein, Nerves, Bones/Joints) (p.21-23)",
      "Group-A: Systemic Embryology Abdomen (p.23)",
      "Group-B: Thorax (Mediastinum, Heart, Lung & Pleura, Diaphragm, Wall of Thorax) (p.24-26)",
      "Group-B: Superior Extremity (Axilla, Cubital Fossa, Nerves, Muscles, Bones & Joints) (p.27-29)",
      "Problem Based Questions (PBQ) - Embryology (p.29)",
      "Structural Essay Questions (SEQ) - Anatomy (p.39-40)"
    ],
    description: "Anatomy Paper-II questions covering Abdomen, Pelvis, Lower Limb, Thorax, Superior Extremity, along with clinical Problem Based Questions (PBQ) and 32 Structural Essay Questions (SEQ)."
  },
  {
    id: "phy-p1",
    originalFileName: "Physio_paper_1_33d67a3e.pdf",
    cleanFileName: "physiology_paper_1.pdf",
    title: "Physiology Paper-I (SAQ - Group A & B)",
    subject: "Physiology",
    paper: "Paper-I",
    examType: "First Professional MBBS / Term",
    totalPages: 12,
    bookPages: "Orbit 18th Ed, p.96 - p.107",
    edition: "Orbit Question Bank 18th Edition",
    fileSizeFormatted: "12.4 MB",
    fileSizeBytes: 13005120,
    pdfPath: "/pdfs/physiology_paper_1.pdf",
    originalAssetPath: "/assets/aistudio/Physio_paper_1_33d67a3e.pdf",
    scanQuality: "Scanned CamScanner (Clear text, circled question numbers from student study markings)",
    sections: [
      "Group-A: General Physiology (Introduction, Feedback System, Cell Membrane, Transport) (p.96-97)",
      "Group-A: Membrane Potential & Muscle (p.97-98)",
      "Group-A: Blood (Plasma protein, RBC, Anemia, WBC, Platelets, Clotting System, Blood Group, Immunity) (p.98-100)",
      "Group-A: Cardiovascular System (Cardiac Muscle, Cardiac Cycle, Heart Sound, Cardiac Output, ECG, Blood Pressure, Microcirculation, Vascular System) (p.100-103)",
      "Group-B: Respiratory System (Respiration, Dead Space, Respiratory Membrane, Surfactant, Lung Volumes, Transport of O2 & CO2, Respiratory Center, Hypoxia) (p.103-106)",
      "Group-B: Gastrointestinal System (Hormones, Digestive Juices, Movement, Digestion & Absorption) (p.106-107)"
    ],
    description: "Physiology Paper-I questions covering General Physiology, Nerve-Muscle, Hematology, Cardiovascular System, Respiration, and Gastrointestinal Physiology."
  },
  {
    id: "phy-p2",
    originalFileName: "Physio_paper_2_6ee19885.pdf",
    cleanFileName: "physiology_paper_2.pdf",
    title: "Physiology Paper-II (SAQ & SEQ)",
    subject: "Physiology",
    paper: "Paper-II",
    examType: "First Professional MBBS / Term",
    totalPages: 13,
    bookPages: "Orbit 18th Ed, p.108 - p.133",
    edition: "Orbit Question Bank 18th Edition",
    fileSizeFormatted: "8.9 MB",
    fileSizeBytes: 9344085,
    pdfPath: "/pdfs/physiology_paper_2.pdf",
    originalAssetPath: "/assets/aistudio/Physio_paper_2_6ee19885.pdf",
    scanQuality: "Scanned CamScanner (High legibility, comprehensive exam tags CMU/CU)",
    sections: [
      "Group-A: Renal System (p.108-110)",
      "Group-A: Body Fluid (p.110)",
      "Group-A: Endocrinology (Introduction, Pituitary, Thyroid, Parathyroid, Pancreatic, Adrenal) (p.110-112)",
      "Group-A: Reproductive System (p.112-113)",
      "Group-B: Nervous System (Neuron, Synapse, Receptor, Reflex, Tracts & Pathways, Cerebellum, Hypothalamus, Limbic System) (p.114-117)",
      "Group-B: Special Sense (Vision, Hearing, Taste, Smell) (p.117-118)",
      "Group-B: Heat & Temperature (p.118)",
      "Structural Essay Questions (SEQ) - Physiology (p.132-133)"
    ],
    description: "Physiology Paper-II questions covering Renal, Body Fluids, Endocrinology, Reproductive System, Central Nervous System, Special Senses, Temperature Regulation, and 32 full Structural Essay Questions."
  },
  {
    id: "bio-t1",
    originalFileName: "First_term_5864bad2.pdf",
    cleanFileName: "biochemistry_paper_1_first_term.pdf",
    title: "Biochemistry Paper-I (1st Term SAQ)",
    subject: "Biochemistry",
    paper: "Paper-I",
    examType: "First Professional MBBS / 1st Term",
    totalPages: 8,
    bookPages: "Orbit 18th Ed, p.184 - p.191",
    edition: "Orbit Question Bank 18th Edition",
    fileSizeFormatted: "5.3 MB",
    fileSizeBytes: 5596941,
    pdfPath: "/pdfs/biochemistry_paper_1_first_term.pdf",
    originalAssetPath: "/assets/aistudio/First_term_5864bad2.pdf",
    scanQuality: "Scanned CamScanner (Clean text, mathematical equations and biochemical tables)",
    sections: [
      "Group-A: Biophysics (Laws & Equation, Henderson-Hasselbalch, Acid-Base Balance) (p.184-185)",
      "Group-A: Solution (Colloids, Crystalloids, Osmolarity, Osmosis, Dialysis) (p.185-186)",
      "Group-A: Isotope & Biotransport (p.186-187)",
      "Group-A: Bio Molecules - Carbohydrate (p.187)",
      "Group-A: Bio Molecules - Protein & Amino Acids (p.187-188)",
      "Group-A: Bio Molecules - Lipid (p.188)",
      "Group-A: Enzyme (Classification, Kinetics, Isoenzymes, Inhibition) (p.189)",
      "Group-B: Food & Nutrition (Balanced diet, PEM, BMI, BMR) (p.189-190)",
      "Group-B: Vitamins and Minerals (Fat & Water soluble, Iron, Calcium, Trace elements) (p.190-191)",
      "Digestive System - Local hormones & Digestive Juices (p.191)"
    ],
    description: "Biochemistry Paper-I First Term examination questions covering Biophysics, Solutions, Carbohydrates, Lipids, Proteins, Enzymes, Nutrition, and Vitamins."
  },
  {
    id: "bio-t2",
    originalFileName: "Term_2_90f88e57.pdf",
    cleanFileName: "biochemistry_paper_2_term_2.pdf",
    title: "Biochemistry Paper-II (2nd Term SAQ)",
    subject: "Biochemistry",
    paper: "Paper-II",
    examType: "First Professional MBBS / 2nd Term",
    totalPages: 9,
    bookPages: "Orbit 18th Ed, p.192 - p.197",
    edition: "Orbit Question Bank 18th Edition",
    fileSizeFormatted: "6.9 MB",
    fileSizeBytes: 7211162,
    pdfPath: "/pdfs/biochemistry_paper_2_term_2.pdf",
    originalAssetPath: "/assets/aistudio/Term_2_90f88e57.pdf",
    scanQuality: "Scanned CamScanner (Clear metabolic pathways, ATP calculations, and renal biochemistry)",
    sections: [
      "Group-A: Digestive System & Absorption (p.192)",
      "Group-A: Renal Biochemistry & Body Fluids (Electrolytes, Anion Gap, Osmolarity, ORS) (p.193-194)",
      "Group-A: Metabolism - Carbohydrate Metabolism (Glycolysis, TCA cycle, Glycogen, HMP shunt, Cori cycle) (p.195-196)",
      "Group-A: Metabolism - Protein Metabolism (Urea cycle, Amino acid catabolism, Transamination) (p.196-197)",
      "Group-A: Metabolism - Lipid Metabolism (Beta-oxidation, Ketogenesis, Lipoproteins, Cholesterol) (p.197)",
      "Group-A: Biological Oxidation (Respiratory chain, ATP synthesis, Oxidative phosphorylation) (p.198)"
    ],
    description: "Biochemistry Paper-II Second Term examination questions covering Renal Biochemistry, Acid-Base, Carbohydrate Metabolism, Protein Metabolism, Lipid Metabolism, and Bioenergetics."
  },
  {
    id: "bio-t3",
    originalFileName: "term_3_3bf4b32a.pdf",
    cleanFileName: "biochemistry_group_b_term_3.pdf",
    title: "Biochemistry Group-B (3rd Term SAQ)",
    subject: "Biochemistry",
    paper: "Paper-II",
    examType: "First Professional MBBS / 3rd Term",
    totalPages: 5,
    bookPages: "Orbit 18th Ed, p.199 - p.203",
    edition: "Orbit Question Bank 18th Edition",
    fileSizeFormatted: "3.4 MB",
    fileSizeBytes: 3535854,
    pdfPath: "/pdfs/biochemistry_group_b_term_3.pdf",
    originalAssetPath: "/assets/aistudio/term_3_3bf4b32a.pdf",
    scanQuality: "Scanned CamScanner (Clinical profiles, OGTT, Molecular Biology, PCR & Genetics)",
    sections: [
      "Group-B: Clinical Endocrinology (Pituitary, Thyroid, Parathyroid, Adrenal, Pancreatic hormones) (p.199-200)",
      "Group-B: Diabetes Mellitus & OGTT (p.200)",
      "Group-B: Clinical Biochemistry & Organ Function Tests (Liver, Renal, Cardiac markers, Jaundice, Lipid profile) (p.201-202)",
      "Group-B: Genetics & Molecular Biology (Protein synthesis, DNA replication, Mutations, PCR, Blotting, Genetic disorders) (p.202-203)"
    ],
    description: "Biochemistry Paper-II Third Term questions covering Clinical Endocrinology, Clinical Biochemistry tests, Diabetes Mellitus, Jaundice, Cardiac Markers, and Molecular Biology/Genetics."
  }
];
