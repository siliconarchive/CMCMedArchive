const fs = require('fs');

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

const allQuestions = [];

// ==========================================
// 1. ANATOMY PAPER-I (11 Pages)
// ==========================================
const anaP1 = [
  // Page 1 (Book p.06)
  {
    no: "1", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Fertilization",
    text: "Define fertilization. Write about the stage/phase of fertilization (use diagram). What are the results of fertilization. Justify epiblast is the source of all three germ layer.",
    exam: "CMU: Nov-22, May-21, 20, May-19; Ja-16, Ju-16, Nov-16, May-19; CMU: May-23, Nov-22, 21, 20, 19; Ju-10, 13, Ja-13, Ju-14, Ja-15, Ju-15, May-16, 17, Nov-17, May-18; CMU: May-25",
    ans: "Phases: 1) Penetration of corona radiata, 2) Penetration of zona pellucida (acrosome reaction), 3) Fusion of oocyte and sperm cell membranes. Results: Restoration of diploid number, sex determination, initiation of cleavage."
  },
  {
    no: "2", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Gastrulation",
    text: "Write about gastrulation / Step of gastrulation with use diagram. Give the derivatives of ectoderm.",
    exam: "CMU: May-22, 21, 20; Ju-12, 16, May-17; CMU: Nov-23",
    ans: "Process establishing all three germ layers (ectoderm, mesoderm, endoderm) beginning with formation of primitive streak. Ectoderm gives rise to CNS, PNS, sensory epithelia, skin epidermis, hair, nails."
  },
  {
    no: "3", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Notochord",
    text: "Write about the formation and function of notochord with diagram. Write down the structure of full term placenta.",
    exam: "CMU: May-22, 21; Ju-10, 16, May-16",
    ans: "Formed by invagination of epiblast cells from primitive node. Functions: establishes primary axial skeleton of embryo, induces neural tube formation, becomes nucleus pulposus in adult."
  },
  {
    no: "4", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Placenta",
    text: "Write down the development and histological structure of placenta. Name the abnormal placenta.",
    exam: "CMU: May-19, May-22, Nov-19; Nov-15",
    ans: "Developed from chorion frondosum (fetal component) and decidua basalis (maternal component). Histological layers: syncytiotrophoblast, cytotrophoblast, extraembryonic mesoderm, fetal capillary endothelium."
  },
  {
    no: "5", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Germ Layers",
    text: "Name the derivatives of ectoderm & endoderm. Derivatives of surface ectoderm.",
    exam: "Nov-25; CMU: Nov-24, 22, May-20; May-18, Ja-14, Nov-15, Ja-16; CMU: Nov-20, Nov-18",
    ans: "Endoderm derivatives: Epithelial lining of GI tract, respiratory tract, urinary bladder, parenchyma of thyroid, parathyroids, liver, and pancreas."
  },
  {
    no: "7", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Somites & Mesoderm",
    text: "Write briefly about the somites? Give the derivatives of mesoderm. Mention the derivatives of paraxial mesoderm.",
    exam: "CMU: May-22, Nov-19, May-25; Ja-07, 09, 14, Ju-11; CMU: Nov-23",
    ans: "Somites differentiate into: 1) Sclerotome (vertebrae and ribs), 2) Myotome (skeletal muscle), 3) Dermatome (dermis of the back)."
  },
  {
    no: "9", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Twins",
    text: "Write briefly about monozygotic & di-zygotic twin. Difference between dizygotic and monozygotic twins with diagram. Characteristics of dizygotic twin.",
    exam: "CMU: May-25, May-19, Nov-23; May-18, Nov-17, Jan-15, 16, Nov-16",
    ans: "Monozygotic (identical): single fertilized ovum splits, genetically identical. Dizygotic (fraternal): two separate ova fertilized by two sperms, separate placentas and amniotic sacs."
  },
  {
    no: "10", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Implantation",
    text: "What is implantation? What are the Normal sites of implantation? Give its mechanism. Mention abnormal sites of implantation.",
    exam: "May-15",
    ans: "Embedding of blastocyst into functional layer of endometrium, normally in upper posterior wall of uterine body near fundus. Abnormal: ectopic sites (ampulla, isthmus, ovary, abdomen) or placenta praevia."
  },
  {
    no: "14", sec: "General Embryology", grp: "Group-A", page: 1, bookPage: "p.06", topic: "Embryology Short Notes",
    text: "Short Notes: i) Spermatogenesis ii) Notochord iii) Placental Barrier iv) Corpus luteum v) Barr body vi) Polar body vii) Graafian follicle viii) Enumerate the foetal membranes ix) Teratoma x) Congenital malformation xi) Morula xii) Umbilical cord xiii) Somite xiv) Spina bifida xv) Tubal pregnancy xvi) Ectopic Pregnancy.",
    exam: "CMU: Nov-21, 16, 15, Nov-19, Nov-20, Nov-22; Ju-16, Ja-15, Ju-14, Ju-15, Nov-17, May-18, Ju-13, May-17",
    ans: "High-yield embryology definitions and short note topics commonly recurring in First Professional MBBS exams."
  },
  // Page 2 (Book p.07)
  {
    no: "18", sec: "General Embryology", grp: "Group-A", page: 2, bookPage: "p.07", topic: "Neural Crest",
    text: "Name the derivatives of each germ layer / mention the derivatives of neural crest cells.",
    exam: "Ju-15, 10, 13; Ja-10, 11, 15, May-19",
    ans: "Neural crest derivatives: Dorsal root ganglia, sympathetic chain ganglia, Schwann cells, melanocytes, adrenal medulla chromaffin cells, craniofacial bones/cartilages, odontoblasts."
  },
  {
    no: "19", sec: "General Embryology", grp: "Group-A", page: 2, bookPage: "p.07", topic: "Week of Two",
    text: "Why second week of development is called week of two.",
    exam: "Nov-25; CMU: May-24, Nov-20, 18, 17; Ja-07, Ju-08, May-15, 16",
    ans: "Formation of 2 trophoblast layers (syncytiotrophoblast & cytotrophoblast), 2 embryoblast layers (epiblast & hypoblast), 2 embryonic cavities (amniotic cavity & yolk sac), and 2 extraembryonic mesoderm layers (somatic & splanchnic)."
  },
  {
    no: "20", sec: "General Embryology", grp: "Group-A", page: 2, bookPage: "p.07", topic: "Down Syndrome",
    text: "Write down four clinical features of Down's syndrome.",
    exam: "Ju-13, Nov-16",
    ans: "Trisomy 21 features: Flat facial profile, upslanting palpebral fissures, single palmar crease (simian crease), intellectual disability, hypotonia, endocardial cushion heart defects."
  },
  {
    no: "24", sec: "General Embryology", grp: "Group-A", page: 2, bookPage: "p.07", topic: "Turner Syndrome",
    text: "Explain patient of Turner syndrome is infertile.",
    exam: "Ja-16",
    ans: "Karyotype 45,XO. Ovaries degenerate into fibrous streak gonads deficient in germ cells, causing primary amenorrhea and lack of ovarian estrogen production."
  },
  {
    no: "28", sec: "General Embryology", grp: "Group-A", page: 2, bookPage: "p.07", topic: "Neural Tube Defects",
    text: "Name of the neural tube defects mentioning their time of occurrence? Classify neural tube defect with example.",
    exam: "CMU: May-19, May-25; May-17",
    ans: "Occur around 4th week (~day 25-28 post-fertilization). Types: Anencephaly (failure of cranial neuropore closure), Spina bifida occulta/cystica (meningocele, myelomeningocele due to caudal neuropore failure). Prevented by periconceptional folic acid."
  },
  // Page 3 (Book p.08) - Histology & Tissues
  {
    no: "1", sec: "General Histology", grp: "Group-A", page: 3, bookPage: "p.08", topic: "Cell & Organelles",
    text: "Definition & Short Note: a) Mitochondria b) Endoplasmic reticulum c) Lysosome d) Prophase-1 e) Write about cell cycle.",
    exam: "CMU: May-22, 17, Nov-22, 21, 20, 16, 18, 15; Ju-16, May-18",
    ans: "Structure and metabolic role of cellular organelles: power generation in mitochondria, protein synthesis in rough ER, autophagy and hydrolytic digestion in lysosomes."
  },
  {
    no: "2", sec: "General Histology", grp: "Group-A", page: 3, bookPage: "p.08", topic: "Cell Membrane",
    text: "Draw and label a microscopic structure of cell membrane. Function of cell membranes.",
    exam: "CMU: May-21, 15, May-22; Ju-10, 14, 16, Nov-16, Ja-14, Ju-15",
    ans: "Fluid mosaic model (Singer-Nicolson): phospholipid bilayer with embedded integral/peripheral proteins, cholesterol, and external glycocalyx."
  },
  {
    no: "4", sec: "General Histology", grp: "Group-A", page: 3, bookPage: "p.08", topic: "Intercellular Junctions",
    text: "Write about the intercellular junction with diagram & example. Difference between organelles & inclusions.",
    exam: "Nov-25; May-15, Ja-05, CMU: Nov-20, 17",
    ans: "Tight junctions (zonula occludens), anchoring junctions (zonula adherens, desmosomes, hemidesmosomes), and communicating gap junctions (connexons)."
  },
  // Page 4 (Book p.09) - Bone, Cartilage & Joints
  {
    no: "4", sec: "General Histology", grp: "Group-A", page: 4, bookPage: "p.09", topic: "Synovial Joint",
    text: "Write about characteristics of synovial joint (use diagram). Write about factors responsible for maintaining stability of synovial joint.",
    exam: "CMU: Nov-25, 24, May-23, 22, 19, Nov-18; Ju-15, 16, Nov-17, Ja-05, 11, 12, 14, 16",
    ans: "Key features: articular cartilage, joint cavity, synovial fluid, fibrous capsule lined by synovial membrane. Stability factors: congruency of bones, strength of ligaments, surrounding muscle tone (most important), atmospheric pressure."
  },
  {
    no: "6", sec: "General Histology", grp: "Group-A", page: 4, bookPage: "p.09", topic: "Bone Classification",
    text: "Define bone and classify morphologically with example. Draw & label parts of a growing long bone.",
    exam: "CMU: Nov-25, 20, May-24; Ja-12, 15, Ju-10, 13, 16, Ja-16, May-17",
    ans: "Morphological classification: Long bones (humerus, femur), Short bones (carpals), Flat bones (scapula, parietal), Irregular bones (vertebrae), Sesamoid bones (patella), Pneumatic bones (maxilla). Parts of long bone: Epiphysis, Metaphysis, Diaphysis, Epiphyseal plate."
  },
  {
    no: "17", sec: "General Histology", grp: "Group-A", page: 4, bookPage: "p.09", topic: "Cartilage",
    text: "Define cartilage. Differentiate between hyaline cartilage, fibro cartilage and elastic cartilage. Classify cartilage with an example of each.",
    exam: "CMU: Nov-22, May-19, Nov-24, Nov-18, May-17, Nov-25; Ja-13, Ju-14, 16, May-15, Ja-16",
    ans: "Hyaline: type II collagen, glassy matrix (articular surfaces, costal cartilage). Elastic: elastin fibers (auricle, epiglottis). Fibrocartilage: dense type I collagen bundles, high tensile strength (intervertebral disc, pubic symphysis)."
  },
  // Page 6 (Book p.11) - Head & Neck
  {
    no: "1", sec: "Head & Neck", grp: "Group-B", page: 6, bookPage: "p.11", topic: "Scalp",
    text: "What is black eye? How black eye develops.",
    exam: "CMU: Nov-23, 20; Ju-09, 10, Ja-06, 07, 08, 10, 12; CMU: May-25",
    ans: "Extravasation of blood into the loose areolar tissue of the scalp tracked forward into eyelids because frontalis has no bony attachment and is continuous with orbicularis oculi."
  },
  {
    no: "2", sec: "Head & Neck", grp: "Group-B", page: 6, bookPage: "p.11", topic: "Scalp Layers",
    text: "Write layers of scalp with clinical importance, blood supply, nerve supply. Why 4th layer of scalp is dangerous? What is diploic vein?",
    exam: "Nov-25; Ja-06, 07, 08, 11, 13",
    ans: "SCALP: Skin, Connective tissue, Aponeurosis, Loose areolar tissue (4th dangerous layer - contains emissary veins connecting to intracranial dural venous sinuses), Pericranium."
  },
  {
    no: "2", sec: "Head & Neck", grp: "Group-B", page: 6, bookPage: "p.11", topic: "Face & Bell's Palsy",
    text: "Short note on Bell's palsy or Facial palsy. Dangerous area of face & Why.",
    exam: "CMU: Nov-22, May-19, May-22; Ja-05, 08, 09, 12, 14, Ju-06, 10, Ja-16; Ju-14, Nov-17",
    ans: "Bell's palsy: LMN facial nerve lesion causing ipsilateral facial muscle paralysis. Dangerous area: upper lip and nose where facial vein communicates with cavernous sinus via ophthalmic veins without valves."
  },
  {
    no: "1", sec: "Head & Neck", grp: "Group-B", page: 6, bookPage: "p.11", topic: "Thyroid Gland",
    text: "Give the gross anatomy and histology of thyroid gland (use diagram). Development & congenital anomalies of thyroid gland. Hoarseness of voice may develop followed by thyroid surgery.",
    exam: "CMU: May-23, May-22, 21, 20, 19; Ja-10, 15, Ju-13, 16, Nov-15, 16, 17, May-16, Nov-18; Ja-06, Ja-16; Ju-13, Ja-15, Nov-16",
    ans: "Hoarseness caused by injury to recurrent laryngeal nerve during ligation of inferior thyroid artery; innervates all intrinsic laryngeal muscles except cricothyroid."
  },
  // Page 8 (Book p.13) - Brain & Eyeball
  {
    no: "1", sec: "Brain & Eyeball", grp: "Group-B", page: 8, bookPage: "p.13", topic: "Circle of Willis",
    text: "Draw and label the circle of Willis with its branches & importance. Write down the artery supply of cerebrum with diagram.",
    exam: "CMU: May-24; Ju-10, 11, 15, 16, Ja-10, 11, 12, 14, 16, May-15, Nov-16",
    ans: "Arterial polygon at base of brain formed by anterior communicating, anterior cerebral, internal carotid, posterior communicating, and posterior cerebral arteries. Provides vital collateral circulation."
  },
  {
    no: "2", sec: "Brain & Eyeball", grp: "Group-B", page: 8, bookPage: "p.13", topic: "Cerebral Cortex",
    text: "Draw and label the superolateral surface of the cerebrum showing the major sulci, gyri, functional areas with Brodmann number.",
    exam: "CMU: May-21, 19, Nov-19, May-25; Ju-09, 11, Ja-11, 12, 14, Ju-15, Nov-15, May-17, 18",
    ans: "Primary motor (area 4), Premotor (area 6), Frontal eye field (area 8), Broca's motor speech (areas 44, 45), Primary somatosensory (areas 3, 1, 2), Primary visual (area 17), Wernicke's (area 22)."
  },
  // Page 10 (Book p.15) - Eyeball
  {
    no: "1", sec: "Eyeball", grp: "Group-B", page: 10, bookPage: "p.15", topic: "Visual Pathway",
    text: "Name the refractory media of eye. Draw and label the visual pathway with locating nucleus.",
    exam: "May-15, Ju-15; CMU: Nov-22, May-22, 21, 20, 19, May-23, Ja-16; Ju-07, 09, 10, 13, 14, Ja-08, 09, 11, 14",
    ans: "Refractory media: Cornea, aqueous humor, crystalline lens, vitreous body. Pathway: Photoreceptors -> Bipolar cells -> Ganglion cells -> Optic nerve -> Optic chiasm -> Optic tract -> Lateral geniculate body -> Optic radiation -> Visual cortex (area 17)."
  }
];

anaP1.forEach((q, idx) => {
  allQuestions.push({
    id: `ana-p1-${q.page}-${idx + 1}`,
    text: q.text,
    subject: "Anatomy",
    paper: "Paper-I",
    group: q.grp,
    section: q.sec,
    topic: q.topic,
    type: "Written",
    year: extractYear(q.exam),
    marks: null,
    teacher: null,
    answer: q.ans,
    source: `Orbit Question Bank 18th ed., p.${q.bookPage.replace('p.', '')} (Anatomy Paper-I)`,
    page: `Anatomy Paper-I, ${q.bookPage} (PDF Page ${q.page})`,
    verified: true,
    board: extractBoard(q.exam),
    exam: q.exam,
    other: "",
    prog: "MBBS",
    real: true,
    pdfId: "ana-p1",
    pdfPage: q.page,
    pdfUrl: "/pdfs/anatomy_paper_1.pdf",
    status: "verified"
  });
});

console.log('Anatomy Paper-I compiled:', anaP1.length);

// ==========================================
// 2. ANATOMY PAPER-II (15 Pages)
// ==========================================
const anaP2 = [
  // Page 1 (Book p.17)
  {
    no: "1", sec: "Abdomen", grp: "Group-A", page: 1, bookPage: "p.17", topic: "Stomach Bed",
    text: "How stomach bed is formed? Draw & label the stomach bed. Mention the blood supply & lymphatic drainage of stomach.",
    exam: "CMU: Nov-22, May-21, 20, 19; Ja-13, 14, Nov-17, 18; CMU: May-25; CMU: Nov-21; Ju-14, May-15, 16, 17, 19",
    ans: "Structures forming stomach bed: Left dome of diaphragm, spleen, left kidney (upper pole), left suprarenal gland, splenic artery, pancreas, transverse mesocolon, splenic flexure of colon."
  },
  {
    no: "7", sec: "Abdomen", grp: "Group-A", page: 1, bookPage: "p.17", topic: "Gastric Ulcer",
    text: "Explain Anatomically why gastric ulcer is common in lesser curvature. Action of vagus nerve on stomach.",
    exam: "Nov-25, May-19; CMU: Nov-21",
    ans: "Lesser curvature has tightly adherent mucous membrane with longitudinal folds (magenstrasse) channeling gastric contents, poorer submucosal anastomotic vascularity, and high acid exposure."
  },
  {
    no: "14", sec: "Abdomen", grp: "Group-A", page: 1, bookPage: "p.17", topic: "Vermiform Appendix",
    text: "Name the common position & artery supply of vermiform appendix. What is aganglionic megacolon.",
    exam: "CMU: May-24, 19, Nov-22; CMU: Nov-22, May-20",
    ans: "Most common position: Retrocecal (65%), followed by pelvic (31%). Artery: Appendicular artery (branch of inferior division of ileocolic artery). Hirschsprung: congenital absence of ganglion cells in myenteric & submucosal plexus."
  },
  // Page 2 (Book p.18)
  {
    no: "1", sec: "Kidney", grp: "Group-A", page: 2, bookPage: "p.18", topic: "Kidney Anatomy",
    text: "Define nephron? Draw and label its parts. Factors responsible for ascend of kidney.",
    exam: "CMU: Nov-24, 22, May-19; Ju-15",
    ans: "Nephron is structural and functional unit. Ascent of kidney caused by differential growth of lumbar and sacral regions of the fetal body."
  },
  {
    no: "2", sec: "Liver & Gall Bladder", grp: "Group-A", page: 2, bookPage: "p.18", topic: "Liver",
    text: "Write down the support of liver. Give histology and development of liver.",
    exam: "CMU: Nov-22, 21, May-19; Ja-07, Nov-15, 16; CMU: Nov-24",
    ans: "Supports: Inferior vena cava & hepatic veins (most important), intra-abdominal pressure, peritoneal ligaments (falciform, coronary, triangular)."
  },
  // Page 5 (Book p.21)
  {
    no: "1", sec: "Inferior Extremity", grp: "Group-A", page: 5, bookPage: "p.21", topic: "Femoral Triangle",
    text: "Write the boundary and contents of femoral triangle (with diagram). How the femoral sheath is formed? & its contents with diagram.",
    exam: "CMU: May-24, 22, 21, 20; Ja-14, Nov-17; Nov-25; CMU: Nov-22, 21; May-16, 19, May-25",
    ans: "Boundaries: Inguinal ligament (superior), Sartorius (lateral), Adductor longus (medial). Floor: Pectineus, Iliopsoas, Adductor longus. Contents: Femoral nerve, femoral artery, femoral vein, deep inguinal lymph nodes."
  },
  // Page 8 (Book p.24) - Thorax
  {
    no: "1", sec: "Thorax", grp: "Group-B", page: 8, bookPage: "p.24", topic: "Mediastinum",
    text: "Define mediastinum. Boundary & contents of posterior mediastinum. What is mediastinal syndrome?",
    exam: "May-25; CMU: May-24, Nov-22, 21; May-18, Nov-17, 18; CMU: May-24, 22, 19, Nov-22; Nov-18, May-17; May-25",
    ans: "Central compartment of thoracic cavity between pleural sacs. Posterior mediastinum contents: Thoracic aorta, esophagus, thoracic duct, azygos/hemiazygos veins, vagus nerves, sympathetic trunks."
  },
  {
    no: "2", sec: "Thorax", grp: "Group-B", page: 8, bookPage: "p.24", topic: "Coronary Arteries",
    text: "Discuss the artery supply of heart. Write briefly the right/Left coronary artery (area of supply).",
    exam: "CMU: Nov-22, May-22, 20, 19; Ja-05, 08; Ju-11; CMU: Nov-24, May-22; Ju-06, 10, 14; Ja-12",
    ans: "Left coronary gives anterior interventricular and circumflex arteries. Right coronary gives marginal and posterior interventricular arteries. Crucial for myocardial perfusion."
  },
  // Page 11 (Book p.27) - Superior Extremity
  {
    no: "1", sec: "Superior Extremity", grp: "Group-B", page: 11, bookPage: "p.27", topic: "Cubital Fossa",
    text: "Give the steps of dissection and boundaries with contents of cubital fossa. What are clinical importance of median cubital vein?",
    exam: "May-25; CMU: Nov-24, 23, 22, 19; CMU: May-20; Ju-09, Ja-12, Ju-15, Nov-15, 16, 17, 18; CMU: Nov-23, May-22, 20; Ju-07, 13, Ja-09, 15, Nov-18",
    ans: "Boundaries: Brachioradialis (lateral), Pronator teres (medial), line between epicondyles (superior). Contents: Medial to lateral - Median nerve, Brachial artery, Biceps tendon, Radial nerve (MBBR mnemonic). Median cubital vein preferred for venipuncture."
  },
  {
    no: "1", sec: "Nerves & Nerve Plexus", grp: "Group-B", page: 11, bookPage: "p.27", topic: "Brachial Plexus Injury",
    text: "Explain anatomically: Injury of upper trunk of brachial plexus causes adducted medially rotated arm & extended pronated forearm. Erb's paralysis.",
    exam: "CMU: May-21, 20; Ju-09, 13, Ja-15, Ja-16, May-18",
    ans: "Erb-Duchenne palsy (C5-C6 lesion): paralyzes deltoid, supraspinatus, infraspinatus, biceps, and brachialis. Results in waiter's tip deformity."
  },
  // Page 14 (Book p.39) - Structural Essay Questions (SEQ)
  {
    no: "03", sec: "Structural Essay Questions (SEQ)", grp: "SEQ", page: 14, bookPage: "p.39", topic: "Scalp Anatomy & Black Eye",
    text: "Draw and label the layers of scalp. Which one of it is dangerous layers and why? How black eye develop? Differentiate between emissary vein and diploie vein.",
    exam: "CMU: May-25",
    type: "SEQ",
    ans: "4th layer loose areolar tissue contains emissary veins with direct intracranial venous connections. Extravasated blood tracks into loose connective tissue of orbit producing raccoon/black eyes."
  },
  {
    no: "11", sec: "Structural Essay Questions (SEQ)", grp: "SEQ", page: 14, bookPage: "p.39", topic: "Shoulder Joint & Rotator Cuff",
    text: "Mention the articular surface of shoulder. Write down the various movements seen in shoulder joint with muscles involved in a tabulated form. Give the formation of rotator cuff. Why shoulder joint is commonly dislocated joint?",
    exam: "CMU: May-25",
    type: "SEQ",
    ans: "Multiaxial ball-and-socket joint between glenoid cavity and humerus head. Rotator cuff muscles: SITS (Supraspinatus, Infraspinatus, Teres minor, Subscapularis). Weak inferior support makes anteroinferior dislocation common."
  },
  {
    no: "16", sec: "Structural Essay Questions (SEQ)", grp: "SEQ", page: 14, bookPage: "p.39", topic: "Coronary Arteries & Dominance",
    text: "Mention the origin and the course of left coronary artery. Name the branches and area of distribution of left coronary artery with diagram. What is meant by right coronary dominance? Coronary arteries are functional end arteries. Justify.",
    exam: "CMU: Nov-25",
    type: "SEQ",
    ans: "Right coronary dominance means posterior descending artery (PDA) arises from RCA (~85% of individuals). Functional end arteries because collateral anastomoses are insufficient to maintain perfusion during sudden acute occlusion."
  }
];

anaP2.forEach((q, idx) => {
  allQuestions.push({
    id: `ana-p2-${q.page}-${idx + 1}`,
    text: q.text,
    subject: "Anatomy",
    paper: "Paper-II",
    group: q.grp,
    section: q.sec,
    topic: q.topic,
    type: q.type || "Written",
    year: extractYear(q.exam),
    marks: q.type === "SEQ" ? 10 : null,
    teacher: null,
    answer: q.ans,
    source: `Orbit Question Bank 18th ed., p.${q.bookPage.replace('p.', '')} (Anatomy Paper-II)`,
    page: `Anatomy Paper-II, ${q.bookPage} (PDF Page ${q.page})`,
    verified: true,
    board: extractBoard(q.exam),
    exam: q.exam,
    other: "",
    prog: "MBBS",
    real: true,
    pdfId: "ana-p2",
    pdfPage: q.page,
    pdfUrl: "/pdfs/anatomy_paper_2.pdf",
    status: "verified"
  });
});

console.log('Anatomy Paper-II compiled:', anaP2.length);

// ==========================================
// 3. PHYSIOLOGY PAPER-I (12 Pages)
// ==========================================
const phyP1 = [
  // Page 1 (Book p.96)
  {
    no: "1", sec: "General Physiology", grp: "Group-A", page: 1, bookPage: "p.96", topic: "Homeostasis",
    text: "Define homeostasis. Mention its components. Explain with example how negative feedback maintain homeostasis. Explain why negative feedback is vicious cycle.",
    exam: "CMU: Nov-22, May-20, May-25, May-23, Nov-24, 22; Ja-12, 14, 15, 16, Nov-17, 18",
    ans: "Maintenance of static or constant conditions in internal environment (ECF). Components: Receptor, control center, effector. E.g., arterial blood pressure regulation via baroreceptor reflex."
  },
  {
    no: "3", sec: "General Physiology", grp: "Group-A", page: 1, bookPage: "p.96", topic: "ECF and ICF",
    text: "Show in a table the different constituents of ECF and ICF with their normal values and non-lethal limits.",
    exam: "Ju-09, Ja-14",
    ans: "ECF major cations: Na+ (142 mEq/L), anions: Cl- (103 mEq/L), HCO3- (24 mEq/L). ICF major cations: K+ (140 mEq/L), Mg2+ (58 mEq/L), anions: Phosphates and proteins."
  },
  {
    no: "1", sec: "Cell & Cell Membrane", grp: "Group-A", page: 1, bookPage: "p.96", topic: "Cell Membrane Function",
    text: "Show in a diagram components of cell membrane and mention the function of its components. How it maintains the cell volume?",
    exam: "Ju-05, Jan-16, 17, May-16",
    ans: "Phospholipid bilayer provides hydrophobic barrier; cholesterol provides fluidity; integral proteins act as channels/transporters (Na+/K+ pump crucial for cell volume maintenance); peripheral proteins provide cytoskeletal attachment."
  },
  // Page 2 (Book p.97)
  {
    no: "3", sec: "Membrane Transport", grp: "Group-A", page: 2, bookPage: "p.97", topic: "Na+/K+ ATPase Pump",
    text: "What do you mean by Na+-K+ pump? Give the importance of it. How can this pump be blocked? Explain the rule of Na+-K+ pump in physiology. Explain how cell volume is maintained by Na+-K+ pump.",
    exam: "CMU: Nov-20, May-24, MNov-25; Ja-14",
    ans: "Primary active electrogenic pump extruding 3 Na+ and importing 2 K+ per ATP hydrolyzed. Blocked specifically by digitalis (ouabain). Maintains cell osmolarity and prevents cell lysis."
  },
  {
    no: "1", sec: "Membrane Potential", grp: "Group-A", page: 2, bookPage: "p.97", topic: "Action Potential",
    text: "Name the different types of membrane potential. Briefly describe the different phases of action potential. What is end plate potential?",
    exam: "CMU: Nov-19",
    ans: "Phases: Resting potential (-70 to -90 mV) -> Depolarization phase (opening of voltage-gated Na+ channels) -> Repolarization phase (closure of Na+ channels, opening of voltage-gated K+ channels) -> Hyperpolarization."
  },
  // Page 3 (Book p.98) - Blood & Erythropoiesis
  {
    no: "1", sec: "Blood - Introduction", grp: "Group-A", page: 3, bookPage: "p.98", topic: "Plasma Proteins",
    text: "Give the origin, normal value & function of plasma protein. Importance of plasma colloidal osmotic pressure.",
    exam: "CMU: Nov-24, 23, 22, 20, 18, May-22; Nov-18, Nov-15, Ja-16, Ja-05, Ju-05, Ja-11, 12",
    ans: "Total plasma proteins ~6.4 - 8.3 g/dL (Albumin 3.5-5.0 g/dL, Globulins 2.3-3.5 g/dL, Fibrinogen 0.2-0.4 g/dL). Synthesized in liver. Albumin generates ~80% of oncotic pressure (25 mmHg) preventing edema."
  },
  {
    no: "1", sec: "Blood - RBC", grp: "Group-A", page: 3, bookPage: "p.98", topic: "Erythropoiesis",
    text: "Show in a diagram the different steps of erythropoiesis. How the production of RBC is adjusted to meet the varying needs of the individual? Define erythropoiesis and mention the changes occur during erythropoiesis.",
    exam: "CMU: Nov-22, May-19, Nov-24; July-15, Nov-16, May-19, Ja-06",
    ans: "Stages: Proerythroblast -> Basophilic erythroblast -> Polychromatophilic erythroblast -> Normoblast (nucleus extruded) -> Reticulocyte -> Mature RBC. Regulated by erythropoietin secreted by renal interstitial cells in response to tissue hypoxia."
  },
  {
    no: "4", sec: "Blood - RBC", grp: "Group-A", page: 3, bookPage: "p.98", topic: "Anemia",
    text: "Define anaemia. State the morphological types of anaemia with example. List the investigation you will suggest to assess a case of anaemia.",
    exam: "CMU: May-25, 19, Nov-21; Ja-16, Ju-12",
    ans: "Reduction in hemoglobin concentration and RBC mass below normal reference range. Morphological: Microcytic hypochromic (iron deficiency, thalassemia), Macrocytic normochromic (vitamin B12/folate deficiency), Normocytic normochromic (acute blood loss, aplastic anemia)."
  },
  // Page 4 (Book p.99) - Clotting System & Hemostasis
  {
    no: "1", sec: "Platelets & Clotting", grp: "Group-A", page: 4, bookPage: "p.99", topic: "Coagulation Cascade",
    text: "Show the different steps of blood coagulation in intrinsic pathway. Mention the essential steps of clotting mechanism. Differences between the hemophilia and purpura.",
    exam: "CMU: Nov-22, 21, May-24; Ju-12, Ja-17, May-16, 19; Ju-11, 13",
    ans: "Intrinsic pathway initiated by contact activation of Factor XII -> XIa -> IXa + VIIIa -> Factor X activation. Common pathway: Factor Xa + Va convert Prothrombin (II) to Thrombin (IIa), which cleaves Fibrinogen (I) to stable Fibrin polymer (XIIIa)."
  },
  // Page 6 (Book p.101) - Cardiovascular System
  {
    no: "1", sec: "Cardiovascular System", grp: "Group-A", page: 6, bookPage: "p.101", topic: "Cardiac Cycle",
    text: "Define cardiac cycle. What are the changes that occur in cardiac cycle? Show in a diagram the various events of cardiac cycle.",
    exam: "CMU: Nov-21, May-20, Nov-21; Ja-05, Ju-06, 12, Ju-15, Ju-09, Ja-14, 15, Nov-18, May-17",
    ans: "Cardiac events from beginning of one heartbeat to beginning of next (duration ~0.8s at 75 bpm). Ventricular systole (0.3s): isovolumetric contraction, rapid ejection, reduced ejection. Ventricular diastole (0.5s): isovolumetric relaxation, rapid filling, diastasis, atrial systole."
  },
  {
    no: "1", sec: "Cardiovascular System", grp: "Group-A", page: 6, bookPage: "p.101", topic: "Cardiac Output",
    text: "Define cardiac output and cardiac index. Discuss the factors controlling it. How cardiac output can be measured? Fick's principle.",
    exam: "CMU: Nov-19; Ja-13, Nov-15, Ja-16, Ja-06, 10, 11, 12, 15, Ja-10, 11, 15, Nov-15, May-18",
    ans: "Cardiac output = Stroke volume x Heart rate (~5.0 L/min). Cardiac index = CO / Body surface area (~3.2 L/min/m^2). Regulated by preload (end-diastolic volume), afterload, myocardial contractility, and heart rate. Fick principle: CO = O2 consumption / (A-V O2 difference)."
  },
  // Page 8 (Book p.103) - Respiratory System
  {
    no: "1", sec: "Respiratory System", grp: "Group-B", page: 8, bookPage: "p.103", topic: "Mechanics of Respiration",
    text: "Define respiration. Name the muscles of respiration and their mechanism of action. Mention the changes that occur during quite respiration. Discuss the mechanism of breathing.",
    exam: "CMU: May-24, May-19, Nov-24, May-23; Ja-12, 15, Nov-15, May-19, Ja-07, Ju-06, Nov-17",
    ans: "Inspiration is active: Diaphragm contraction flattens domes, external intercostals elevate ribs, expanding thoracic volume and creating negative intrapleural pressure (-6 to -8 mmHg). Expiration in quiet breathing is passive recoil of lungs and chest wall."
  },
  {
    no: "1", sec: "Respiratory Membrane", grp: "Group-B", page: 8, bookPage: "p.103", topic: "Respiratory Membrane",
    text: "Draw and level the respiratory membrane. How gas exchange occur through this membrane. List the factors influencing the gaseous diffusion through the respiratory membrane.",
    exam: "CMU: May-25, 23, Nov-25, May-19, Nov-22, 19; Ja-05, 06, 11, 13, Ju-07, 14, Nov-15, Ja-16",
    ans: "Layers: Fluid and surfactant layer -> Alveolar epithelium -> Epithelial basement membrane -> Thin interstitial space -> Capillary basement membrane -> Capillary endothelial cell. Diffusion governed by Fick's law (thickness, surface area, diffusion coefficient, partial pressure gradient)."
  }
];

phyP1.forEach((q, idx) => {
  allQuestions.push({
    id: `phy-p1-${q.page}-${idx + 1}`,
    text: q.text,
    subject: "Physiology",
    paper: "Paper-I",
    group: q.grp,
    section: q.sec,
    topic: q.topic,
    type: "Written",
    year: extractYear(q.exam),
    marks: null,
    teacher: null,
    answer: q.ans,
    source: `Orbit Question Bank 18th ed., p.${q.bookPage.replace('p.', '')} (Physiology Paper-I)`,
    page: `Physiology Paper-I, ${q.bookPage} (PDF Page ${q.page})`,
    verified: true,
    board: extractBoard(q.exam),
    exam: q.exam,
    other: "",
    prog: "MBBS",
    real: true,
    pdfId: "phy-p1",
    pdfPage: q.page,
    pdfUrl: "/pdfs/physiology_paper_1.pdf",
    status: "verified"
  });
});

console.log('Physiology Paper-I compiled:', phyP1.length);

// ==========================================
// 4. BIOCHEMISTRY PAPERS (First Term, Term 2, Term 3)
// ==========================================
const bioData = [
  // First Term (First_term_5864bad2.pdf)
  {
    no: "1", sec: "Biophysics", grp: "Group-A", page: 1, bookPage: "p.184", topic: "Henderson-Hasselbalch Equation",
    pdfId: "bio-t1", pdfUrl: "/pdfs/biochemistry_paper_1_first_term.pdf", paper: "Paper-I",
    text: "State & deduce with explanation & importance: Write the H-H equation for carbonic acid buffer solution. Calculate the pH of this solution of half neutrilization. Law of mass action.",
    exam: "CMU: May-25, 23, Nov-20; CMU:Nov-19; Ja-13, Ja-09, 11, 15, Ja-06, 12, 13, 14, 16, May-17",
    ans: "pH = pKa + log([A-] / [HA]). For bicarbonate buffer: pH = 6.1 + log([HCO3-] / (0.03 x pCO2)). At half neutralization, [A-] = [HA], so pH = pKa."
  },
  {
    no: "1", sec: "Bio Molecules", grp: "Group-A", page: 4, bookPage: "p.187", topic: "Carbohydrates",
    pdfId: "bio-t1", pdfUrl: "/pdfs/biochemistry_paper_1_first_term.pdf", paper: "Paper-I",
    text: "Define & classify with example of carbohydrate? What are the reducing substances of blood. State the principle of procedure of Benedict's test.",
    exam: "CMU: Nov-23, 20, 19, Nov-23, May-22; Ja-09, 15, Ju-15, 16, Ja-17",
    ans: "Carbohydrates: polyhydroxy aldehydes or ketones or substances yielding them on hydrolysis. Benedict's test: cupric ions (Cu2+) reduced to red cuprous oxide (Cu2O) precipitate by free aldehyde or ketone group in alkaline medium."
  },
  {
    no: "1", sec: "Enzymes", grp: "Group-A", page: 6, bookPage: "p.189", topic: "Enzyme Classification & Kinetics",
    pdfId: "bio-t1", pdfUrl: "/pdfs/biochemistry_paper_1_first_term.pdf", paper: "Paper-I",
    text: "Define & IUB classification of enzyme with example. Major factors influencing enzyme activity. Compare & contrast between competitive & noncompetitive inhibition of enzyme with diagram?",
    exam: "Nov-25; CMU: Nov-23, 22, May-21, May-25, May-23, Nov-20, 19; Ja-09, 14, 15, Ju-10, 12, Ju-15, May-16, 18, Nov-17",
    ans: "IUBMB Classes (OTHLIL): 1) Oxidoreductases, 2) Transferases, 3) Hydrolases, 4) Lyases, 5) Isomerases, 6) Ligases. Competitive inhibition: Km increases, Vmax unchanged. Non-competitive inhibition: Km unchanged, Vmax decreases."
  },
  {
    no: "1", sec: "Food & Nutrition", grp: "Group-B", page: 6, bookPage: "p.189", topic: "PEM & Nutrition",
    pdfId: "bio-t1", pdfUrl: "/pdfs/biochemistry_paper_1_first_term.pdf", paper: "Paper-I",
    text: "Define balanced diet? What are the common nutritional disorders of Bangladesh? What is PEM? Give the difference between kwashiorkor & marasmus?",
    exam: "CMU: Nov-20, Nov-23; Ju-14, May-15, Ja-06, 12, Ju-10; CMU: May-23, 22, 21, Nov-23, 19",
    ans: "Kwashiorkor: severe protein deficiency with adequate calories (edema, moon face, hepatomegaly, flaky paint dermatosis). Marasmus: severe calorie and protein deficiency (prominent wasting, old man face, no edema)."
  },

  // Term 2 (Term_2_90f88e57.pdf)
  {
    no: "2", sec: "Metabolism", grp: "Group-A", page: 3, bookPage: "p.195", topic: "TCA Cycle",
    pdfId: "bio-t2", pdfUrl: "/pdfs/biochemistry_paper_2_term_2.pdf", paper: "Paper-II",
    text: "Mention the steps of TCA cycle with ATP calculation and sources of acetyl CoA. Why it is called common metabolic pathway?",
    exam: "CMU: May-22, 21, Nov-19, Nov-24; Ju-10, 13, Ja-14, 15, 16, 17, May-15",
    ans: "Final common oxidative pathway for carbohydrates, fats, and amino acids. Generates 10 ATP per turn of cycle (3 NADH = 7.5 ATP, 1 FADH2 = 1.5 ATP, 1 GTP = 1 ATP)."
  },
  {
    no: "1", sec: "Metabolism - Protein", grp: "Group-A", page: 5, bookPage: "p.196", topic: "Urea Cycle",
    pdfId: "bio-t2", pdfUrl: "/pdfs/biochemistry_paper_2_term_2.pdf", paper: "Paper-II",
    text: "Mention the steps of urea cycle with diagram. Show in a diagram the steps of amino acid metabolism. Fate of amino acid.",
    exam: "CMU: Nov-24, 19, May-22, 21, 19; Ja-11, 13, 16, Ju-14, 15, 16, Nov-15, 16, 17, May-19",
    ans: "Five enzymatic steps occurring in mitochondria (CPS-I, OTC) and cytosol (Argininosuccinate synthetase, Argininosuccinase, Arginase) in liver, converting toxic ammonia to non-toxic urea for renal excretion."
  },
  {
    no: "1", sec: "Metabolism - Lipid", grp: "Group-A", page: 5, bookPage: "p.197", topic: "Beta Oxidation of Fatty Acid",
    pdfId: "bio-t2", pdfUrl: "/pdfs/biochemistry_paper_2_term_2.pdf", paper: "Paper-II",
    text: "Mention the steps of Oxidation of fatty acid. Calculate the ATP generated from 16 carbon fatty acid palmitic acid. Show with a diagram metabolism of VLDL.",
    exam: "CMU: Nov-23, 19; Ja-13, Ja-15, Ju-15, Nov-15, 18, May-18, 19",
    ans: "Palmitate (16C) yields 8 Acetyl-CoA, 7 FADH2, and 7 NADH through 7 cycles of beta-oxidation. Net ATP produced = (8 x 10) + (7 x 1.5) + (7 x 2.5) - 2 (activation) = 106 ATP."
  },

  // Term 3 (term_3_3bf4b32a.pdf)
  {
    no: "1", sec: "Clinical Endocrinology", grp: "Group-B", page: 1, bookPage: "p.199", topic: "Hormone Mechanism & Action",
    pdfId: "bio-t3", pdfUrl: "/pdfs/biochemistry_group_b_term_3.pdf", paper: "Paper-II",
    text: "Define and classify hormone. Describe briefly the mechanism of hormonal action. Enumerate the different types of cellular communication?",
    exam: "Ja-05, 12, Ju-09; Ju-05",
    ans: "Hormones act via: 1) Cell surface receptors coupled to G proteins (adenylate cyclase-cAMP, phospholipase C-IP3/DAG), 2) Enzyme-linked receptors (tyrosine kinase - insulin, GH), 3) Intracellular nuclear receptors (steroids, thyroid hormones)."
  },
  {
    no: "5", sec: "Diabetes & OGTT", grp: "Group-B", page: 2, bookPage: "p.200", topic: "Oral Glucose Tolerance Test (OGTT)",
    pdfId: "bio-t3", pdfUrl: "/pdfs/biochemistry_group_b_term_3.pdf", paper: "Paper-II",
    text: "How OGTT is done? Preparation, interpretation, indication of OGTT. What is gastational DM? What is alimentary glycosuria?",
    exam: "CMU: Nov-22, May-15, 16, Nov-16, May-18, Nov-20, May-20, Nov-22; Ju-11",
    ans: "WHO standard: 75g anhydrous oral glucose in 250-300 mL water after overnight fast. Diagnostic criteria: Fasting >= 7.0 mmol/L (126 mg/dL) or 2-hour post-glucose >= 11.1 mmol/L (200 mg/dL) confirms Diabetes Mellitus."
  },
  {
    no: "1", sec: "Genetics & Molecular Biology", grp: "Group-B", page: 4, bookPage: "p.202", topic: "Protein Synthesis & Transcription",
    pdfId: "bio-t3", pdfUrl: "/pdfs/biochemistry_group_b_term_3.pdf", paper: "Paper-II",
    text: "Give the steps of protein synthesis with diagram? Name the purine & pyrimidine base. Autosomal dominant vs recessive disorder.",
    exam: "May-25; CMU: Nov-21, Nov-23, 22, May-20; Ju-05, 07, 08, 11, Ja-10, 13, Nov-18",
    ans: "Central dogma: DNA -> Transcription -> mRNA -> Translation (Initiation, Elongation, Termination). Ribosomes decode codon triplets on mRNA using aminoacyl-tRNAs."
  },
  {
    no: "4", sec: "Genetics & Molecular Biology", grp: "Group-B", page: 4, bookPage: "p.202", topic: "PCR & Molecular Techniques",
    pdfId: "bio-t3", pdfUrl: "/pdfs/biochemistry_group_b_term_3.pdf", paper: "Paper-II",
    text: "Short notes: a) PCR with technique b) Recombinant DNA technology c) Allele d) Nonsense mutation e) Intron f) Karyotyping g) Genetic counselling h) Down's syndrome.",
    exam: "CMU: May-19, Nov-23, May-22; Ja-09, 08, 11, 12, Ju-14, 15, Ja-13, 15, Nov-16",
    ans: "Polymerase Chain Reaction (PCR) steps: 1) Denaturation (95 deg C), 2) Annealing of primers (55 deg C), 3) Extension by Taq polymerase (72 deg C). Exponential in vitro DNA amplification."
  }
];

bioData.forEach((q, idx) => {
  allQuestions.push({
    id: `${q.pdfId}-${q.page}-${idx + 1}`,
    text: q.text,
    subject: "Biochemistry",
    paper: q.paper,
    group: q.grp,
    section: q.sec,
    topic: q.topic,
    type: "Written",
    year: extractYear(q.exam),
    marks: null,
    teacher: null,
    answer: q.ans,
    source: `Orbit Question Bank 18th ed., p.${q.bookPage.replace('p.', '')} (Biochemistry)`,
    page: `Biochemistry, ${q.bookPage} (PDF Page ${q.page})`,
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

console.log('Biochemistry compiled:', bioData.length);

// Read existing records from index_1a8d9a6b.html ORBIT_CSV
const html = fs.readFileSync('./public/assets/aistudio/index_1a8d9a6b.html', 'utf8');
const csvMatch = html.match(/const ORBIT_CSV="([\s\S]*?)";\n/);
if (csvMatch) {
  const csvRaw = csvMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
  const lines = csvRaw.split('\n').filter(l => l.trim().length > 0);
  console.log('Found ORBIT_CSV lines:', lines.length);
  // Parse lines
  for (let i = 1; i < lines.length; i++) {
    // Split taking care of quotes
    const r = [];
    let cur = '', inQ = false;
    for (let c = 0; c < lines[i].length; c++) {
      const ch = lines[i][c];
      if (inQ) {
        if (ch === '"') inQ = false;
        else cur += ch;
      } else {
        if (ch === '"') inQ = true;
        else if (ch === ',') { r.push(cur); cur = ''; }
        else cur += ch;
      }
    }
    r.push(cur);
    if (r.length >= 12) {
      allQuestions.push({
        id: `orbit-csv-${i}`,
        text: r[5],
        subject: r[1],
        paper: "Paper-II",
        group: "PBQ",
        section: r[2],
        topic: r[4],
        type: "PBQ",
        year: extractYear(r[8] + " " + r[9]),
        marks: null,
        teacher: null,
        answer: r[6] || "Not printed in the book.",
        source: `Orbit Question Bank 18th ed., ${r[10]} (Anatomy PBQ)`,
        page: `Anatomy Paper-II, ${r[10]} (PDF Page 13)`,
        verified: false,
        board: r[7] || "CMU",
        exam: r[8],
        other: r[9],
        prog: "MBBS",
        real: true,
        pdfId: "ana-p2",
        pdfPage: 13,
        pdfUrl: "/pdfs/anatomy_paper_2.pdf",
        status: "needs_review",
        reviewNote: "Scanned PBQ clinical vignette from Orbit Question Bank page 29-38."
      });
    }
  }
}

// Add BDS items from index_1a8d9a6b.html
const bdsItems = [
  { id: "b1", text: "Describe the microscopic structure of enamel.", subject: "Oral Histology", topic: "Enamel", type: "Professional", year: 2022, marks: 10, teacher: null, answer: "Enamel is about 96% mineral (hydroxyapatite). Main features: enamel rods (prisms), interrod enamel, striae of Retzius, cross striations, Hunter-Schreger bands and enamel lamellae.", source: "Fictional demo record", verified: false, board: "CMU", prog: "BDS", paper: "General", real: false, status: "needs_review", page: "BDS Demo" },
  { id: "b2", text: "Name the first permanent tooth to erupt.", subject: "Dental Anatomy", topic: "Tooth eruption", type: "Viva", year: 2023, marks: null, teacher: null, answer: "Usually the mandibular first molar, at about 6 years of age.", source: "Fictional demo record", verified: false, board: "CU", prog: "BDS", paper: "General", real: false, status: "needs_review", page: "BDS Demo" },
  { id: "b3", text: "List the properties of an ideal dental amalgam.", subject: "Dental Materials", topic: "Amalgam", type: "Written", year: 2023, marks: 5, teacher: null, answer: "Adequate strength, low creep, dimensional stability, corrosion resistance, good marginal seal and ease of manipulation.", source: "Fictional demo record", verified: false, board: "CMU", prog: "BDS", paper: "General", real: false, status: "needs_review", page: "BDS Demo" }
];
bdsItems.forEach(b => allQuestions.push(b));

console.log('Total questions compiled:', allQuestions.length);

const outContent = `import { PDF_CATALOG } from './pdfCatalog';

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

export const ALL_QUESTIONS: QuestionRecord[] = ${JSON.stringify(allQuestions, null, 2)};
`;

fs.writeFileSync('./src/data/questionsData.ts', outContent);
console.log('Successfully wrote src/data/questionsData.ts');
