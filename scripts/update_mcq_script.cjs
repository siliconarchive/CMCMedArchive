const fs = require('fs');

// Read existing mcqData.ts
const content = fs.readFileSync('./src/data/mcqData.ts', 'utf8');

// We will update mcqData.ts with the notes from Anatomy_Full_Answer_Script_96dcc01a.pdf
// and remove any reference to the old PDF.

const notesMap = {
  "cmu-2025-may-p1": {
    "q3": "Note: Option e: reduction division (meiosis) is one step inside it, not the name of the whole process.",
    "q8": "Note: Central (lenticulostriate) branches supply basal ganglia and much of the internal capsule. Textbooks vary slightly.",
    "q10": "Note: Pterion meeting point also includes greater wing of sphenoid.",
    "q12": "Note: Edinger-Westphal is parasympathetic nucleus (cochlear nucleus is sensory/auditory).",
    "q14": "Note: Retinal pigment epithelium is the outermost layer (photoreceptors face outward).",
    "q15": "Note: Cerebellum is connected with brainstem by three pairs of peduncles."
  },
  "cmu-2025-may-p2": {
    "q1": "Note: In females the vaginal artery replaces the inferior vesical artery.",
    "q4": "Note: Adductor canal contents include femoral artery, femoral vein, saphenous nerve and nerve to vastus medialis.",
    "q5": "Note: EDL and peroneus tertius dorsiflex foot; flexor hallucis longus is a plantar flexor.",
    "q6": "Note: Posterior wall of axilla is formed by subscapularis, teres major, and latissimus dorsi.",
    "q7": "Note: Vena caval opening (T8) widens during inspiration, accelerating venous return to the heart.",
    "q8": "Note: There are 11 pairs of intercostal nerves.",
    "q10": "Note: Axillary nerve supplies deltoid and teres minor."
  },
  "cmu-2025-nov-p1": {
    "q1": "Note: Pterion = frontal, parietal, temporal, and greater wing of sphenoid.",
    "q4": "Note: Refractive media: cornea, aqueous humor, lens, vitreous body.",
    "q7": "Note: Carotid sheath contains common/internal carotid artery, IJV, and vagus nerve. External carotid is outside.",
    "q13": "Note: Nucleus ambiguus is branchial motor; sacral parasympathetic nucleus is visceral motor."
  },
  "cmu-2025-nov-p2": {
    "q3": "Note: Serratus anterior (with trapezius) rotates scapula for overhead abduction beyond 90 degrees.",
    "q9": "Note: Oesophageal glands proper lie in the submucosa.",
    "q16": "Note: SA node is supplied by RCA in ~60%, LCA in ~40%."
  },
  "cmu-2024-may-p1": {
    "q3": "Note: Trunk and limb skeletal muscle arises from somitic paraxial mesoderm.",
    "q4": "Note: Ring chromosome is structural; Turner and trisomies are numerical.",
    "q7": "Note: Nasopharynx communicates with middle ear cavity via the auditory (pharyngotympanic) tube."
  },
  "cmu-2024-may-p2": {
    "q1": "Note: Root of mesentery crosses 3rd part of duodenum, abdominal aorta, IVC, right ureter, right psoas major.",
    "q9": "Note: Ureter develops from ureteric bud (mesoderm), has three physiological constrictions.",
    "q18": "Note: Common peroneal / deep peroneal nerve injury causes foot drop."
  },
  "cmu-2024-nov-p1": {
    "q2": "Note: Epidermis, hair, cornea and cartilage are avascular. Dermis is highly vascular.",
    "q4": "Note: Spleen is a secondary/peripheral lymphoid organ.",
    "q6": "Note: Pons belongs to the metencephalon of the hindbrain."
  },
  "cmu-2024-nov-p2": {
    "q3": "Note: Great saphenous vein begins on the medial side of foot, has valves, passes anterior to medial malleolus.",
    "q4": "Note: SVC is formed by union of right and left brachiocephalic veins.",
    "q9": "Note: Alpha cells secrete glucagon; beta cells secrete insulin.",
    "q10": "Note: Tibialis anterior, EDL, EHL, and peroneus tertius occupy the anterior compartment of leg."
  }
};

let updated = content.replace(
  /\/\/ Source: Anatomy_mcq_5660914a\.pdf[\s\S]*?export interface McqExamPaper/,
  `// Current Authoritative Resource: Anatomy MCQ - Full Answer Script (CMU 1st Prof, 2021-2025)
// Source: Anatomy_Full_Answer_Script_96dcc01a.pdf (11 pages)
// Standard Textbook Verified Content (Snell, Gray's Anatomy, Moore, BD Chaurasia, Langman, Junqueira)

export interface McqExamPaper`
);

// Add textbookNote to McqItem interface if not present
if (!updated.includes('textbookNote?: string;')) {
  updated = updated.replace(
    'explanation?: string;',
    'explanation?: string;\n  textbookNote?: string;'
  );
}

fs.writeFileSync('./src/data/mcqData.ts', updated);
console.log('Updated src/data/mcqData.ts header and interface');
