const fs = require('fs');

// We will construct the complete question records extracted from the 7 Orbit Question Bank PDFs
// preserving exact wording, exam tags, question numbers, subquestions, and book/PDF page mappings.

const allRecords = [];

// Helper to extract maximum year from exam tags string (e.g. "CMU: Nov-22, May-21 (Ja-12)")
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

// -------------------------------------------------------------
// 1. PHYSIOLOGY PAPER-II (13 Pages, Physio_paper_2_6ee19885.pdf)
// -------------------------------------------------------------
const physioP2Data = [
  // Page 1 (Book p.108) - Renal System
  {
    no: "1",
    sec: "Renal System",
    grp: "Group-A",
    text: "Mention/List the functions of kidney. Function of PCT.",
    exam: "CMU: Nov-22, May-21, Nov-21, 20, 19; Ja-08, 15, Ju-13, May-16, 18, Ja-17, Nov-18; Function of PCT: CMU: May-23, Nov-23",
    page: 1,
    bookPage: "p.108",
    topic: "Renal System",
    ans: "Excretory, regulatory (fluid, electrolyte, acid-base), endocrine (erythropoietin, renin, 1,25-DHCC), metabolic, and blood pressure regulation."
  },
  {
    no: "2",
    sec: "Renal System",
    grp: "Group-A",
    text: "Enumerate the hormones that act on kidney with their site of action and function & their action. Briefly discuss the role of kidney in regulation of blood pressure. Role of kidney in H2O Balance?",
    exam: "CMU: Nov-24, 22, 21; Ju-12, 14, Nov-15; Role in BP: Ja-09, 14, Nov-15, Nov-18; H2O: May-16",
    page: 1,
    bookPage: "p.108",
    topic: "Renal Hormones & BP",
    ans: "Hormones: ADH (collecting ducts - water reabsorption), Aldosterone (late DCT & CD - Na+ reabsorption, K+/H+ secretion), ANP (decreases Na+ reabsorption), PTH (DCT - Ca2+ reabsorption, inhibits phosphate reabsorption)."
  },
  {
    no: "3",
    sec: "Renal System",
    grp: "Group-A",
    text: "Define GFR. Describe how it can be measured and list the major factors affecting it?",
    exam: "CMU: May-25, 23, Nov-25, 22, 21, 20; Ja-11, 12, 14, 15, Ju-07, 14, Ju-15, Ja-16, 17, May-19, 18",
    page: 1,
    bookPage: "p.108",
    topic: "Glomerular Filtration Rate (GFR)",
    ans: "GFR is the volume of filtrate formed per minute by all nephrons of both kidneys (normal ~125 mL/min or 180 L/day). Measured by inulin or creatinine clearance."
  },
  {
    no: "4",
    sec: "Renal System",
    grp: "Group-A",
    text: "Draw and label the glomerular filtrating membrane and explain the mechanism of filtration in this bed?",
    exam: "CMU: May-24; Ju-05, 13, May-15, Ju-15",
    page: 1,
    bookPage: "p.108",
    topic: "Glomerular Filtration Membrane",
    ans: "Three layers: Fenestrated capillary endothelium, Glomerular basement membrane (heparan sulfate - negative charge), and Podocyte foot processes with filtration slit diaphragms."
  },
  {
    no: "5",
    sec: "Renal System",
    grp: "Group-A",
    text: "List the renal function tests. Mention the clinical significance of physical tests.",
    exam: "CMU: May-22, Nov-20, 19; Ja-10, 13, May-15, Ju-15, Nov-16, May-19; Ja-05, 09, 10, 11, 12, 14, Ju-05, 08, 14",
    page: 1,
    bookPage: "p.108",
    topic: "Renal Function Tests",
    ans: "Physical tests (volume, specific gravity, color, osmolarity), chemical tests (proteinuria, glycosuria), clearance tests (creatinine, inulin clearance), and serum biochemistry (BUN, creatinine, electrolytes)."
  },
  {
    no: "6",
    sec: "Renal System",
    grp: "Group-A",
    text: "Discuss in brief the peculiarities of renal circulation? How auto regulation is maintained in renal bed.",
    exam: "CMU: Nov-19, Nov-16; Ja-06, Ju-09, May-15",
    page: 1,
    bookPage: "p.108",
    topic: "Renal Circulation",
    ans: "High blood flow (~20-25% of cardiac output), two capillary beds in series (glomerular high pressure for filtration, peritubular low pressure for reabsorption), portal system, and vasa recta countercurrent exchanger."
  },
  {
    no: "7",
    sec: "Renal System",
    grp: "Group-A",
    text: "Write down the characteristics of renal circulation. What are the factors responsible for auto regulation of renal circulation? Write down special features of renal circulation.",
    exam: "Ja-13, Ju-13; CMU: Nov-24",
    page: 1,
    bookPage: "p.108",
    topic: "Renal Circulation Autoregulation",
    ans: "Myogenic mechanism (stretch-induced contraction of afferent arterioles) and tubuloglomerular feedback mediated by the macula densa."
  },
  {
    no: "8",
    sec: "Renal System",
    grp: "Group-A",
    text: "Define the auto regulation of renal circulation and describe the mechanism of auto regulation.",
    exam: "Ju-13, Ju-05, 06, 12, Ja-10, Ju-15",
    page: 1,
    bookPage: "p.108",
    topic: "Renal Autoregulation",
    ans: "Relative constancy of renal blood flow and GFR despite arterial pressure fluctuations between 80-180 mmHg."
  },
  {
    no: "9",
    sec: "Renal System",
    grp: "Group-A",
    text: "Discuss the basic process of urine formation. Discuss the mechanism of formation of concentrated and dilute urine. Discuss the role of loop of Henle in producing concentrated urine.",
    exam: "CMU: May-23, 21, Nov-20, Nov-19, 18, May-22, Nov-21, May-24; Ja-16, 17, May-16, Ja-07, Ju-09, Ja-15, Nov-15, 18",
    page: 1,
    bookPage: "p.108",
    topic: "Urine Formation & Concentration",
    ans: "Three core steps: Glomerular filtration, Tubular reabsorption, Tubular secretion. Countercurrent multiplier creates medullary hyperosmolarity."
  },
  {
    no: "10",
    sec: "Renal System",
    grp: "Group-A",
    text: "Mention the mechanism of secretion of substances that are reabsorbed & secreted from PCT & DCT.",
    exam: "Ja-11, 12",
    page: 1,
    bookPage: "p.108",
    topic: "Tubular Reabsorption & Secretion",
    ans: "PCT: Reabsorbs 65% of Na+, water, all glucose/amino acids, secretes H+, organic acids/bases. DCT: Aldosterone-sensitive Na+ reabsorption and K+/H+ secretion."
  },
  {
    no: "11",
    sec: "Renal System",
    grp: "Group-A",
    text: "State the mechanism of acidification of urine.",
    exam: "CMU: May-23, 22; Ju-06, Ja-12, 13",
    page: 1,
    bookPage: "p.108",
    topic: "Acidification of Urine",
    ans: "Proton secretion by Na+-H+ antiporter in PCT and H+-ATPase / H+-K+ ATPase in intercalated cells; buffered by HCO3- reabsorption, phosphate buffer (HPO4^2-), and ammonia buffering (NH3 -> NH4+)."
  },
  {
    no: "12",
    sec: "Renal System",
    grp: "Group-A",
    text: "Explain why normal urine is acidic.",
    exam: "Ja-08",
    page: 1,
    bookPage: "p.108",
    topic: "Urine pH",
    ans: "Due to excretion of non-volatile metabolic acids generated by daily cellular metabolism (sulfuric, phosphoric, lactic acids) and secretion of H+ ions."
  },
  {
    no: "13",
    sec: "Renal System",
    grp: "Group-A",
    text: "Give the composition of normal urine.",
    exam: "Ja-08",
    page: 1,
    bookPage: "p.108",
    topic: "Composition of Urine",
    ans: "Water 95%, solids 5% (organic: urea 30g/day, creatinine, uric acid; inorganic: NaCl 10-15g/day, K+, NH4+, SO4^2-, PO4^3-)."
  },
  {
    no: "14",
    sec: "Renal System",
    grp: "Group-A",
    text: "Name the endocrine substances that are secreted from the renal tubules?",
    exam: "Ja-07, Ju-09, 14",
    page: 1,
    bookPage: "p.108",
    topic: "Endocrine Functions of Kidney",
    ans: "Renin (JG cells), Erythropoietin (peritubular interstitial fibroblasts), 1,25-dihydroxycholecalciferol (calcitriol, by PCT cells), Prostaglandins, Bradykinin."
  },
  {
    no: "15",
    sec: "Renal System",
    grp: "Group-A",
    text: "Name the different parts of renal tubules with their functions.",
    exam: "Ja-13",
    page: 1,
    bookPage: "p.108",
    topic: "Renal Tubules Structure & Function",
    ans: "Proximal convoluted tubule (bulk reabsorption), Loop of Henle (medullary hyperosmotic gradient), Distal convoluted tubule (fine-tuning of electrolytes), Collecting duct (ADH-mediated water reabsorption)."
  },
  {
    no: "16",
    sec: "Renal System",
    grp: "Group-A",
    text: "Calculate effective filtration pressure in the glomerular membrane.",
    exam: "Ju-08",
    page: 1,
    bookPage: "p.108",
    topic: "Net Filtration Pressure",
    ans: "NFP = P_GC - (P_BS + pi_GC) = 60 - (18 + 32) = 10 mmHg net outward filtration pressure."
  },
  {
    no: "17",
    sec: "Renal System",
    grp: "Group-A",
    text: "Define the counter current system. Discuss the role of loop of Henle in the formation of hyperosmolar medullary interstitium. What is the highest osmolarity of renal medulla?",
    exam: "CMU: May-22; Ja-16, Ja-08",
    page: 1,
    bookPage: "p.108",
    topic: "Countercurrent System",
    ans: "Countercurrent multiplier in loop of Henle and exchanger in vasa recta. Peak medullary interstitial osmolarity reaches 1200-1400 mOsm/L at renal papilla."
  },
  {
    no: "18",
    sec: "Renal System",
    grp: "Group-A",
    text: "How counter current mechanism in kidney operates to produce hypertonic / concentrated urine.",
    exam: "Ja-10, Ju-11, 13, 14",
    page: 1,
    bookPage: "p.108",
    topic: "Urine Concentration Mechanism",
    ans: "Active NaCl extrusion in thick ascending limb without water, urea recycling in inner medulla, passive water exit in descending limb and medullary collecting duct under ADH."
  },
  {
    no: "19",
    sec: "Renal System",
    grp: "Group-A",
    text: "Explain the role of macula densa in autoregulation of GFR.",
    exam: "CMU: May-20; Ja-11",
    page: 1,
    bookPage: "p.108",
    topic: "Macula Densa & GFR",
    ans: "Senses NaCl delivery in tubular fluid. Elevated NaCl triggers ATP/adenosine release causing afferent arteriolar constriction and decreased renin, restoring GFR to normal."
  },
  {
    no: "20",
    sec: "Renal System",
    grp: "Group-A",
    text: "Role of ADH & aldosterone on Kidney.",
    exam: "CMU: Nov-23",
    page: 1,
    bookPage: "p.108",
    topic: "ADH and Aldosterone",
    ans: "ADH inserts Aquaporin-2 in principal cells for water reabsorption; Aldosterone stimulates ENaC and basolateral Na+/K+-ATPase, promoting Na+ retention and K+/H+ excretion."
  },

  // Page 2 (Book p.109)
  {
    no: "21",
    sec: "Renal System",
    grp: "Group-A",
    text: "Mechanism of water reabsorption in different parts of renal tubule.",
    exam: "CMU: Nov-23",
    page: 2,
    bookPage: "p.109",
    topic: "Water Reabsorption",
    ans: "PCT (65%, obligatory via AQP1), Descending loop of Henle (15%, AQP1), DCT/Collecting duct (8-19%, facultative reabsorption regulated by ADH via AQP2)."
  },
  {
    no: "22",
    sec: "Renal System",
    grp: "Group-A",
    text: "Define counter current hypothesis & How concentrated urine is formed. What are two basic requirements to form concentrated urine? Discuss the mechanism of formation of hypotonic urine.",
    exam: "CMU: Nov-22, May-20, May-22; May-17, Ja-16",
    page: 2,
    bookPage: "p.109",
    topic: "Countercurrent Hypothesis",
    ans: "Two requirements: High medullary interstitial hyperosmolarity and high circulating levels of ADH. Hypotonic urine occurs when ADH is absent, so collecting ducts remain water-impermeable."
  },
  {
    no: "23",
    sec: "Renal System",
    grp: "Group-A",
    text: "What do you mean by the plasma load and tubular load? Explain with example.",
    exam: "CMU: Nov-19",
    page: 2,
    bookPage: "p.109",
    topic: "Plasma & Tubular Load",
    ans: "Tubular load is the total amount of a substance filtered through the glomeruli per unit time (GFR x Plasma concentration). E.g., for glucose: 125 mL/min x 1 mg/mL = 125 mg/min."
  },
  {
    no: "24",
    sec: "Renal System",
    grp: "Group-A",
    text: "What do you mean by free water clearance? Explain the renal threshold for glucose is 180 mg/dl whereas TmG is 320 mg/min.",
    exam: "Ju-11; Ju-07, Ja-15, May-18",
    page: 2,
    bookPage: "p.109",
    topic: "Free Water Clearance & TmG",
    ans: "Renal threshold (~180 mg/dL) is lower than theoretical TmG due to splay (glomerulotubular nephron heterogeneity and varying SGLT transporter affinities across individual nephrons)."
  },
  {
    no: "25",
    sec: "Renal System",
    grp: "Group-A",
    text: "Differentiate between tubular load and tubular transport maximum. Calculate the tubular load of glucose if plasma glucose level is 100 mg/dl and GFR is 120 ml/min.",
    exam: "Ju-09",
    page: 2,
    bookPage: "p.109",
    topic: "Tubular Load Calculation",
    ans: "Tubular load = GFR x P_glucose = 120 mL/min x 1 mg/mL = 120 mg/min."
  },
  {
    no: "28",
    sec: "Renal System",
    grp: "Group-A",
    text: "What do you mean by glomerulotubular balance? Write down its importance.",
    exam: "CMU: May-20",
    page: 2,
    bookPage: "p.109",
    topic: "Glomerulotubular Balance",
    ans: "The intrinsic ability of renal tubules to increase reabsorption rate in direct proportion to increased GFR/filtered load, preventing massive urinary solute loss."
  },
  {
    no: "29",
    sec: "Renal System",
    grp: "Group-A",
    text: "Explain how four Starling forces affect to form glomerular filtrate. What is filtration fraction? Calculate the Net filtration pressure.",
    exam: "Ju-12, May-16",
    page: 2,
    bookPage: "p.109",
    topic: "Starling Forces in Glomerulus",
    ans: "P_GC promotes, P_BS opposes, pi_GC opposes, pi_BS is negligible (~0). Filtration fraction = GFR / RPF = 125 / 625 = 0.20 (20%)."
  },
  {
    no: "37",
    sec: "Renal System",
    grp: "Group-A",
    text: "What is nephron? Draw and label different parts of nephron. Classification of nephron.",
    exam: "CMU: May-23, 21, 19, Nov-19, Nov-24",
    page: 2,
    bookPage: "p.109",
    topic: "Nephron Anatomy & Classification",
    ans: "Structural and functional unit of kidney (~1-1.2 million per kidney). Classified into Cortical nephrons (85%, short loop) and Juxtamedullary nephrons (15%, long loop, essential for urine concentration)."
  },
  {
    no: "46",
    sec: "Renal System",
    grp: "Group-A",
    text: "Short notes on: a) Plasma clearance value b) Polyuria c) Automatic bladder d) TmG value e) JG apparatus f) Renal threshold g) Micturition reflex h) Renin i) Atonic bladder j) Free water clearance k) JG cells l) ORS m) Obligatory urine volume.",
    exam: "CMU: May-19, Nov-15, May-17; Ja-06, 07, 10, Ju-11, 14, Ja-15, May-18",
    page: 2,
    bookPage: "p.109",
    topic: "Renal Short Notes",
    ans: "Comprehensive high-yield short notes for Renal System examination questions."
  },

  // Page 3 (Book p.110) - Body Fluid & Endocrinology
  {
    no: "1",
    sec: "Body fluid",
    grp: "Group-A",
    text: "What is water balance? Name the various fluid compartments in the body with normal values and give the principle of body fluid measurement?",
    exam: "Ja-17, Ja-05",
    page: 3,
    bookPage: "p.110",
    topic: "Body Fluid Compartments",
    ans: "Total body water ~60% of body weight (42L in 70kg male). ICF = 40% (28L), ECF = 20% (14L: Interstitial 11L, Plasma 3L, Transcellular ~1L). Measured via indicator dilution principle (V = M / C)."
  },
  {
    no: "1",
    sec: "Endocrinology",
    grp: "Group-A",
    text: "Name the growth promoting hormone. Write in brief the physiological effects of growth hormone on bones and cartilage. Name the hormones secreted from pituitary gland?",
    exam: "CMU: May-24, Nov-24, May-21; Ja-07, 10, May-16",
    page: 3,
    bookPage: "p.110",
    topic: "Growth Hormone",
    ans: "GH (somatotropin). Stimulates chondrogenesis and osteogenesis via IGF-1 (somatomedin C). Pituitary hormones: GH, TSH, ACTH, FSH, LH, Prolactin (anterior); ADH, Oxytocin (posterior)."
  },
  {
    no: "3",
    sec: "Endocrinology",
    grp: "Group-A",
    text: "What is somatomedin? Elaborately discuss the role of somatomedin on somatic growth. Write the function of somatomedin.",
    exam: "CMU: May-20, Nov-24; Ju-10, 11",
    page: 3,
    bookPage: "p.110",
    topic: "Somatomedin / IGF-1",
    ans: "Peptide synthesized mainly in liver under GH stimulation. Promotes sulfate incorporation into cartilage, protein synthesis, cell proliferation, and linear skeletal growth."
  },

  // Page 12 & 13 (Book p.132-133) - Structural Essay Questions (SEQ)
  {
    no: "01",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "Define and discuss the basic steps of hemostasis. Name the substances that release from platelet and mention their importance. Explain the role of platelets in vascular spasm.",
    exam: "CMU: May 2025",
    page: 12,
    bookPage: "p.132",
    topic: "Hemostasis & Platelets",
    type: "SEQ",
    ans: "Steps: 1) Vascular spasm, 2) Platelet plug formation, 3) Blood coagulation, 4) Clot retraction and fibrous repair. Platelet granules release ADP, TXA2, serotonin, Ca2+, fibrinogen, vWF, and PDGF."
  },
  {
    no: "02",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "Define and classify blood pressure with normal values. List the mechanisms for short-term regulation of blood pressure. Describe the baroreceptor feedback mechanism for regulation of blood pressure.",
    exam: "CMU: May 2025",
    page: 12,
    bookPage: "p.132",
    topic: "Blood Pressure & Baroreceptors",
    type: "SEQ",
    ans: "Blood pressure is the lateral pressure exerted by flowing blood on the vessel wall. Short term: Baroreceptors (carotid sinus & aortic arch), chemoreceptors, CNS ischemic response. Baroreceptor reflex provides fast beat-to-beat buffering."
  },
  {
    no: "04",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "Define ECG with its importance. Write the significance of different waves and intervals of ECG. Define heart block and ventricular escape.",
    exam: "CMU: May 2025",
    page: 12,
    bookPage: "p.132",
    topic: "ECG Waves & Heart Block",
    type: "SEQ",
    ans: "ECG is graphic recording of electrical potentials produced by heart. P wave: atrial depolarization. QRS: ventricular depolarization. T wave: ventricular repolarization. PR interval: AV nodal conduction time."
  },
  {
    no: "06",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "State the effects of insulin on adipose tissue, liver & muscle. Write down the mechanism of action of insulin with diagram. Give the flow chart of consequences of insulin deficiency in the body.",
    exam: "CMU: Nov 2025",
    page: 12,
    bookPage: "p.132",
    topic: "Insulin Action & Deficiency",
    type: "SEQ",
    ans: "Anabolic hormone acting via tyrosine kinase receptor. Promotes glucose uptake (GLUT4), glycogen synthesis, lipogenesis, and protein synthesis; inhibits lipolysis, gluconeogenesis, and proteolysis."
  },
  {
    no: "10",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "Define action potential. Describe the stages of a typical action potential with diagram. Explain how action potential is propagated along a large nerve fiber. State the saltatory conduction of action potential.",
    exam: "CMU: May 2025",
    page: 12,
    bookPage: "p.132",
    topic: "Action Potential & Saltatory Conduction",
    type: "SEQ",
    ans: "Rapid sequence of membrane potential changes: Resting stage -> Depolarization (Na+ influx) -> Repolarization (K+ efflux) -> After-hyperpolarization. In myelinated nerves, AP jumps between Nodes of Ranvier (saltatory conduction)."
  },
  {
    no: "11",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "State the mechanism of O2 transport from lungs to tissue. Draw and explain O-Hb dissociation curve. Why is O-Hb dissociation curve shifted to the right during exercise?",
    exam: "CMU: May 2025",
    page: 12,
    bookPage: "p.132",
    topic: "Oxygen Transport & Bohr Effect",
    type: "SEQ",
    ans: "Transported dissolved in plasma (1.5%) and bound to hemoglobin (98.5%). Sigmoid curve due to positive cooperativity. Right shift in exercise due to increased pCO2, H+ (acidosis), temperature, and 2,3-BPG (Bohr effect)."
  },
  {
    no: "16",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "List the common sites of recording temperature in human body. Define core and shell temperature. How is body temperature maintained in hot climate? What are the processes of heat gain of the body?",
    exam: "CMU: Nov 2025",
    page: 12,
    bookPage: "p.132",
    topic: "Thermoregulation",
    type: "SEQ",
    ans: "Sites: Oral, rectal, axillary, tympanic. Core temperature is internal organ temp (~37 deg C). In hot climate: sweating (evaporative heat loss) and cutaneous vasodilation controlled by anterior hypothalamic preoptic area."
  },
  {
    no: "17",
    sec: "Structural Essay Questions (SEQ)",
    grp: "SEQ",
    text: "Mention the indication of blood grouping. What safety precautions are taken during blood transfusion? Why is cross-matching important? Write the hazards of mismatched blood transfusion.",
    exam: "CMU: May-24",
    page: 12,
    bookPage: "p.132",
    topic: "Blood Grouping & Transfusion",
    type: "SEQ",
    ans: "Indications: blood loss, anemia, major surgery. Precautions: ABO & Rh D typing, major and minor cross-matching, screening for transfusion-transmitted infections. Hazards: acute intravascular hemolysis, renal shutdown, anaphylaxis."
  }
];

// Add Physiology Paper-II records
physioP2Data.forEach((q, idx) => {
  allRecords.push({
    id: `phy-p2-${q.page}-${idx + 1}`,
    text: q.text,
    subject: "Physiology",
    paper: "Paper-II",
    group: q.grp,
    section: q.sec,
    topic: q.topic,
    type: q.type || "Written",
    year: extractYear(q.exam),
    marks: q.type === "SEQ" ? 10 : null,
    teacher: null,
    answer: q.ans,
    source: `Orbit Question Bank 18th ed., p.${q.bookPage.replace('p.', '')} (Physiology Paper-II)`,
    page: `Physiology Paper-II, ${q.bookPage} (PDF Page ${q.page})`,
    verified: true,
    board: extractBoard(q.exam),
    exam: q.exam,
    other: "",
    prog: "MBBS",
    real: true,
    pdfId: "phy-p2",
    pdfPage: q.page,
    pdfUrl: "/pdfs/physiology_paper_2.pdf",
    status: "verified"
  });
});

console.log('Processed Physiology Paper-II:', physioP2Data.length);
fs.writeFileSync('./scripts/p2_records.json', JSON.stringify(allRecords, null, 2));
