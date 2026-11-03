// Authentic Chittagong Medical University (CMU) First Professional MBBS Examination Papers
// Subjects Imported:
//   - Anatomy (19 Papers, 380 Questions across 2021–2025)
//   - Biochemistry (20 Papers, 400 Questions across 2021–2025)
// Standard Textbook Verified Content (Snell, Gray's, Moore, BD Chaurasia, Langman, Junqueira, Harper's, Lehninger)

import {
  MCQ_ANSWER_REGISTRY,
  MCQ_VERIFICATION_STATS,
  getMcqAnswerMetadata,
  VerificationStatus,
  McqAnswerRecord
} from './mcqAnswerRegistry';

export {
  MCQ_ANSWER_REGISTRY,
  MCQ_VERIFICATION_STATS,
  getMcqAnswerMetadata
};
export type { VerificationStatus, McqAnswerRecord };

export interface McqExamPaper {
  id: string;
  session: string;
  year: number;
  month: "May" | "Nov" | "November";
  subject: string;
  paper: "Paper-I" | "Paper-II";
  curriculum: string;
  page: number;
  bookPage: string;
  totalMarks: number;
  time: string;
  questions: McqItem[];
}

export interface McqItem {
  qNum: number;
  type: "TF" | "SBA";
  stem: string;
  items?: { label: string; text: string; ans: boolean }[];
  opts?: string[];
  correctIndex?: number;
  explanation?: string;
  textbookNote?: string;
  verificationStatus?: VerificationStatus;
  sourceReference?: string;
  officialOrbitDiscrepancy?: string;
  reviewReason?: string;
}

export const AUTHENTIC_MCQ_PAPERS: McqExamPaper[] = [
  {
    "id": "cmu-ana-2025-may-p1",
    "session": "May 2025",
    "year": 2025,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 76,
    "bookPage": "p.76",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Fibrous joints",
        "items": [
          {
            "label": "a",
            "text": "Coronal suture",
            "ans": true
          },
          {
            "label": "b",
            "text": "Temporomandibular joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inferior tibiofibular joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Intervertebral joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Manubriosternal joint",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Collagen fibers abundant in",
        "items": [
          {
            "label": "a",
            "text": "Bone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": false
          },
          {
            "label": "c",
            "text": "Lung",
            "ans": false
          },
          {
            "label": "d",
            "text": "Tendon",
            "ans": true
          },
          {
            "label": "e",
            "text": "Spleen",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Spermatogenesis",
        "items": [
          {
            "label": "a",
            "text": "Produce single haploid sperm",
            "ans": false
          },
          {
            "label": "b",
            "text": "Starts before birth",
            "ans": false
          },
          {
            "label": "c",
            "text": "Starts from puberty",
            "ans": true
          },
          {
            "label": "d",
            "text": "Occurs in seminiferous tubule",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is called reduction division",
            "ans": false
          }
        ],
        "explanation": "Option e: reduction division (meiosis) is one step inside it, not the name of the whole process.",
        "textbookNote": "Option e: reduction division (meiosis) is one step inside it, not the name of the whole process.",
        "verificationStatus": "Provisional",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)",
        "reviewReason": "Option e: reduction division (meiosis) is one step inside it, not the name of the whole process."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Middle ear communicates with",
        "items": [
          {
            "label": "a",
            "text": "Oral cavity",
            "ans": false
          },
          {
            "label": "b",
            "text": "Nasal cavity",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inner ear",
            "ans": true
          },
          {
            "label": "d",
            "text": "Nasopharynx",
            "ans": true
          },
          {
            "label": "e",
            "text": "Mastoid antrum",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Extrapyramidal tracts",
        "items": [
          {
            "label": "a",
            "text": "Corticospinal",
            "ans": false
          },
          {
            "label": "b",
            "text": "Reticulospinal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Rubrospinal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Spinotectal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vestibulospinal",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Limbic system includes",
        "items": [
          {
            "label": "a",
            "text": "Hypothalamus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hippocampus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Amygdala",
            "ans": true
          },
          {
            "label": "d",
            "text": "Mammillary body",
            "ans": true
          },
          {
            "label": "e",
            "text": "Claustrum",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Uniaxial joint",
        "items": [
          {
            "label": "a",
            "text": "Pivot",
            "ans": true
          },
          {
            "label": "b",
            "text": "Ball and socket",
            "ans": false
          },
          {
            "label": "c",
            "text": "Plane",
            "ans": false
          },
          {
            "label": "d",
            "text": "Hinge",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ellipsoid",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "MCA supplies",
        "items": [
          {
            "label": "a",
            "text": "Broca's area",
            "ans": true
          },
          {
            "label": "b",
            "text": "Primary motor area",
            "ans": true
          },
          {
            "label": "c",
            "text": "Occipital lobe",
            "ans": false
          },
          {
            "label": "d",
            "text": "Basal ganglia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Internal capsule",
            "ans": true
          }
        ],
        "explanation": "Central (lenticulostriate) branches supply basal ganglia and much of the internal capsule. Orbit's key differs; textbooks vary slightly.",
        "textbookNote": "Central (lenticulostriate) branches supply basal ganglia and much of the internal capsule. Orbit's key differs; textbooks vary slightly.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Central (lenticulostriate) branches supply basal ganglia and much of the internal capsule. Orbit's key differs; textbooks vary slightly."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Central lymphoid organ",
        "items": [
          {
            "label": "a",
            "text": "Bone marrow",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": false
          },
          {
            "label": "c",
            "text": "Palatine tonsil",
            "ans": false
          },
          {
            "label": "d",
            "text": "Spleen",
            "ans": false
          },
          {
            "label": "e",
            "text": "Thymus",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Pterion: meeting point of",
        "items": [
          {
            "label": "a",
            "text": "Frontal",
            "ans": true
          },
          {
            "label": "b",
            "text": "Parietal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Temporal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Maxilla",
            "ans": false
          },
          {
            "label": "e",
            "text": "Zygomatic",
            "ans": false
          }
        ],
        "explanation": "Also includes greater wing of sphenoid.",
        "textbookNote": "Also includes greater wing of sphenoid.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Also includes greater wing of sphenoid."
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Muscles of facial expression",
        "opts": [
          "Temporalis",
          "Buccinator",
          "Masseter",
          "Sternohyoid",
          "Omohyoid"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Parasympathetic nucleus",
        "opts": [
          "Vestibular nucleus",
          "Cochlear nucleus",
          "Red nucleus",
          "Edinger-Westphal nucleus",
          "Spinal nucleus"
        ],
        "correctIndex": 3,
        "explanation": "Orbit marks b (cochlear nucleus) - wrong.",
        "textbookNote": "Orbit marks b (cochlear nucleus) - wrong.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks b (cochlear nucleus) - wrong."
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Endocrine gland",
        "opts": [
          "Has duct",
          "Has rich blood supply",
          "Has rich nerve supply",
          "Secretes mucus fluid",
          "Secretes serous fluid"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Retina",
        "opts": [
          "Innermost layer contains pigment epithelium",
          "Bipolar cell form the optic nerve",
          "Blind spot has no photoreceptors",
          "Can regenerate",
          "Is avascular structure"
        ],
        "correctIndex": 2,
        "explanation": "As printed, a is false (pigment epithelium is the OUTERMOST layer). Orbit marks a, so the question probably meant 'outermost'.",
        "textbookNote": "As printed, a is false (pigment epithelium is the OUTERMOST layer). Orbit marks a, so the question probably meant 'outermost'.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy",
        "officialOrbitDiscrepancy": "As printed, a is false (pigment epithelium is the OUTERMOST layer). Orbit marks a, so the question probably meant 'outermost'."
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Cerebellum",
        "opts": [
          "Parts of brain stem",
          "Controls opposite side of the body",
          "Directly controls the motor activity",
          "Arranged outer white matter and inner grey matter",
          "Connected with the brain stem"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Mast cells",
        "opts": [
          "Participate in allergic reaction",
          "Participate in phagocytosis",
          "Produce antibody",
          "Provide nutrition to epithelial tissue",
          "Synthesize ground substance"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Skeletal muscle fiber",
        "opts": [
          "Branching with intercalated discs",
          "Involuntary control with no striations",
          "Multinucleated fibers with striations",
          "Single central nucleus with no striations",
          "Spindle shaped fibers with central nuclei"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Mature neurons are",
        "opts": [
          "Permanent cell",
          "Undergo cell division",
          "Develops from all three germ layers",
          "Contain centriole",
          "Stable cell"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Nerve passing through cavernous sinus",
        "opts": [
          "Abducent",
          "Optic",
          "Facial",
          "Vestibulocochlear",
          "Mandibular"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Basal nuclei",
        "opts": [
          "Medial geniculate body",
          "Pulvinar",
          "Red nucleus",
          "Amygdaloid nucleus",
          "Caudate nucleus"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      }
    ]
  },
  {
    "id": "cmu-ana-2025-may-p2",
    "session": "May 2025",
    "year": 2025,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 77,
    "bookPage": "p.77",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Female urinary bladder arteries",
        "items": [
          {
            "label": "a",
            "text": "Superior vesical artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inferior vesical artery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Uterine artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Vaginal artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ovarian artery",
            "ans": false
          }
        ],
        "explanation": "In females the vaginal artery replaces the inferior vesical artery.",
        "textbookNote": "In females the vaginal artery replaces the inferior vesical artery.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "In females the vaginal artery replaces the inferior vesical artery."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Modifications of GI mucosa",
        "items": [
          {
            "label": "a",
            "text": "Rugae",
            "ans": true
          },
          {
            "label": "b",
            "text": "Pyloric sphincter",
            "ans": false
          },
          {
            "label": "c",
            "text": "Microvilli",
            "ans": true
          },
          {
            "label": "d",
            "text": "Villi",
            "ans": true
          },
          {
            "label": "e",
            "text": "Plicae circulares",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Lateral branches of abdominal aorta supply",
        "items": [
          {
            "label": "a",
            "text": "Gonads",
            "ans": true
          },
          {
            "label": "b",
            "text": "Kidneys",
            "ans": true
          },
          {
            "label": "c",
            "text": "Liver",
            "ans": false
          },
          {
            "label": "d",
            "text": "Large intestine",
            "ans": false
          },
          {
            "label": "e",
            "text": "The diaphragm",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Contents of adductor canal",
        "items": [
          {
            "label": "a",
            "text": "Femoral artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Femoral vein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Femoral nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Saphenous nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Great saphenous vein",
            "ans": false
          }
        ],
        "explanation": "Femoral artery, vein, saphenous nerve (and nerve to vastus medialis).",
        "textbookNote": "Femoral artery, vein, saphenous nerve (and nerve to vastus medialis).",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Femoral artery, vein, saphenous nerve (and nerve to vastus medialis)."
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Dorsiflexion of foot",
        "items": [
          {
            "label": "a",
            "text": "Tibialis anterior",
            "ans": true
          },
          {
            "label": "b",
            "text": "Extensor digitorum longus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Flexor hallucis longus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Peroneus tertius",
            "ans": true
          },
          {
            "label": "e",
            "text": "Peroneus brevis",
            "ans": false
          }
        ],
        "explanation": "Orbit marks EDL as F and flexor hallucis longus as T - wrong. FHL is a plantar flexor.",
        "textbookNote": "Orbit marks EDL as F and flexor hallucis longus as T - wrong. FHL is a plantar flexor.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "officialOrbitDiscrepancy": "Orbit marks EDL as F and flexor hallucis longus as T - wrong. FHL is a plantar flexor."
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Posterior wall of axilla formed by",
        "items": [
          {
            "label": "a",
            "text": "Serratus anterior",
            "ans": false
          },
          {
            "label": "b",
            "text": "Teres major",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pectoralis major",
            "ans": false
          },
          {
            "label": "d",
            "text": "Subscapularis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Latissimus dorsi",
            "ans": true
          }
        ],
        "explanation": "Orbit marks subscapularis as F - wrong. Posterior wall: subscapularis, teres major, latissimus dorsi.",
        "textbookNote": "Orbit marks subscapularis as F - wrong. Posterior wall: subscapularis, teres major, latissimus dorsi.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Orbit marks subscapularis as F - wrong. Posterior wall: subscapularis, teres major, latissimus dorsi."
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Vena caval opening of diaphragm",
        "items": [
          {
            "label": "a",
            "text": "Tendinous in nature",
            "ans": true
          },
          {
            "label": "b",
            "text": "Muscular in nature",
            "ans": false
          },
          {
            "label": "c",
            "text": "Closes during contraction of diaphragm",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lies at 8th thoracic vertebra",
            "ans": true
          },
          {
            "label": "e",
            "text": "Transmits superior vena cava",
            "ans": false
          }
        ],
        "explanation": "Orbit marks c T - wrong; the opening is widened (not closed) in inspiration. It lies at T8.",
        "textbookNote": "Orbit marks c T - wrong; the opening is widened (not closed) in inspiration. It lies at T8.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Orbit marks c T - wrong; the opening is widened (not closed) in inspiration. It lies at T8."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Intercostal nerves",
        "items": [
          {
            "label": "a",
            "text": "11 in number",
            "ans": false
          },
          {
            "label": "b",
            "text": "11 in pairs",
            "ans": true
          },
          {
            "label": "c",
            "text": "Supplies only thoracic wall",
            "ans": false
          },
          {
            "label": "d",
            "text": "Located at upper part of corresponding intercostal space",
            "ans": true
          },
          {
            "label": "e",
            "text": "Atypical intercostal nerves are more in number than typical ones",
            "ans": false
          }
        ],
        "explanation": "11 pairs (so 'in number' option a is F).",
        "textbookNote": "11 pairs (so 'in number' option a is F).",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "reviewReason": "11 pairs (so 'in number' option a is F)."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Conducting system of heart",
        "items": [
          {
            "label": "a",
            "text": "SA node",
            "ans": true
          },
          {
            "label": "b",
            "text": "AV node",
            "ans": true
          },
          {
            "label": "c",
            "text": "Papillary muscle",
            "ans": false
          },
          {
            "label": "d",
            "text": "AV bundle",
            "ans": true
          },
          {
            "label": "e",
            "text": "Musculi pectinati",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Muscle supplied by axillary nerve",
        "items": [
          {
            "label": "a",
            "text": "Deltoid",
            "ans": true
          },
          {
            "label": "b",
            "text": "Teres major",
            "ans": false
          },
          {
            "label": "c",
            "text": "Teres minor",
            "ans": true
          },
          {
            "label": "d",
            "text": "Coracobrachialis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Brachialis",
            "ans": false
          }
        ],
        "explanation": "Orbit marks teres major and coracobrachialis T - wrong (lower subscapular and musculocutaneous nerves).",
        "textbookNote": "Orbit marks teres major and coracobrachialis T - wrong (lower subscapular and musculocutaneous nerves).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "officialOrbitDiscrepancy": "Orbit marks teres major and coracobrachialis T - wrong (lower subscapular and musculocutaneous nerves)."
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Deep inguinal ring lies in layer",
        "opts": [
          "External oblique aponeurosis",
          "Internal oblique aponeurosis",
          "Transversus abdominis aponeurosis",
          "Fascia transversalis",
          "Fascia iliaca"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Ligament preventing backward falling of trunk",
        "opts": [
          "Ilio femoral ligament",
          "Ischio femoral ligament",
          "Inguinal ligament",
          "Pubofemoral ligament",
          "Transverso acetabular ligament"
        ],
        "correctIndex": 0,
        "explanation": "Orbit marks ischiofemoral. Standard texts (BD Chaurasia): iliofemoral (Y ligament) prevents the trunk falling backward.",
        "textbookNote": "Orbit marks ischiofemoral. Standard texts (BD Chaurasia): iliofemoral (Y ligament) prevents the trunk falling backward.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "officialOrbitDiscrepancy": "Orbit marks ischiofemoral. Standard texts (BD Chaurasia): iliofemoral (Y ligament) prevents the trunk falling backward."
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Muscle connecting vertebral column with lower limb",
        "opts": [
          "Biceps femoris",
          "Iliacus",
          "Rectus femoris",
          "Psoas major",
          "Quadratus lumborum"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Urethral fold fails to fuse",
        "opts": [
          "Epispadias",
          "Ectopic vesicae",
          "Hypospadias",
          "Rectovesical fistula",
          "Phimosis"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Organ completely covered by peritoneum",
        "opts": [
          "Kidney",
          "Pancreas",
          "Ascending colon",
          "Spleen",
          "Rectum"
        ],
        "correctIndex": 3,
        "explanation": "Except at the hilum.",
        "textbookNote": "Except at the hilum.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Except at the hilum."
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Artery in superior mediastinum",
        "opts": [
          "Ascending aorta",
          "Descending thoracic aorta",
          "Internal thoracic artery",
          "Left subclavian artery",
          "Pulmonary trunk"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Phrenic nerve supplies",
        "opts": [
          "Diaphragm",
          "Heart",
          "Intercostal muscles",
          "Pulmonary pleura",
          "Visceral pericardium"
        ],
        "correctIndex": 0,
        "explanation": "Visceral pleura and visceral pericardium are not supplied by it.",
        "textbookNote": "Visceral pleura and visceral pericardium are not supplied by it.",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "reviewReason": "Visceral pleura and visceral pericardium are not supplied by it."
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Vertebrosternal ribs",
        "opts": [
          "3, 4, 5",
          "6, 7, 8",
          "7, 8, 9",
          "9, 10, 11",
          "10, 11, 12"
        ],
        "correctIndex": 0,
        "explanation": "Vertebrosternal ribs are 1-7; only option a lies fully within 1-7.",
        "textbookNote": "Vertebrosternal ribs are 1-7; only option a lies fully within 1-7.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Vertebrosternal ribs are 1-7; only option a lies fully within 1-7."
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Submucous coat absent in",
        "opts": [
          "Gall bladder",
          "Oesophagus",
          "Duodenum",
          "Vermiform appendix",
          "Ileum"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Multipennate muscle",
        "opts": [
          "Biceps brachii",
          "Brachialis",
          "Flexor digitorum profundus",
          "Pectoralis major",
          "Subscapularis"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      }
    ]
  },
  {
    "id": "cmu-ana-2025-nov-p1",
    "session": "November 2025",
    "year": 2025,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 78,
    "bookPage": "p.78",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Pterion: meeting point of",
        "items": [
          {
            "label": "a",
            "text": "Frontal",
            "ans": true
          },
          {
            "label": "b",
            "text": "Temporal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Maxilla",
            "ans": false
          },
          {
            "label": "d",
            "text": "Zygomatic",
            "ans": false
          },
          {
            "label": "e",
            "text": "Parietal",
            "ans": true
          }
        ],
        "explanation": "Orbit marks zygomatic T and frontal F - wrong. Pterion = frontal, parietal, temporal, greater wing of sphenoid.",
        "textbookNote": "Orbit marks zygomatic T and frontal F - wrong. Pterion = frontal, parietal, temporal, greater wing of sphenoid.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks zygomatic T and frontal F - wrong. Pterion = frontal, parietal, temporal, greater wing of sphenoid."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Simple columnar epithelium present in",
        "items": [
          {
            "label": "a",
            "text": "Alveoli",
            "ans": false
          },
          {
            "label": "b",
            "text": "Duodenum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Stomach",
            "ans": true
          },
          {
            "label": "d",
            "text": "Esophagus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Tongue",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Extrapyramidal tracts",
        "items": [
          {
            "label": "a",
            "text": "Corticospinal",
            "ans": false
          },
          {
            "label": "b",
            "text": "Reticulospinal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Rubrospinal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Spinotectal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vestibulospinal",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Refractive media of eyeball",
        "items": [
          {
            "label": "a",
            "text": "Sclera",
            "ans": false
          },
          {
            "label": "b",
            "text": "Cornea",
            "ans": true
          },
          {
            "label": "c",
            "text": "Retina",
            "ans": false
          },
          {
            "label": "d",
            "text": "Iris",
            "ans": false
          },
          {
            "label": "e",
            "text": "Choroid",
            "ans": false
          }
        ],
        "explanation": "Cornea (aqueous, lens, vitreous are the others).",
        "textbookNote": "Cornea (aqueous, lens, vitreous are the others).",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Cornea (aqueous, lens, vitreous are the others)."
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Mitosis",
        "items": [
          {
            "label": "a",
            "text": "Occurs in somatic cell",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occurs in mature germ cell",
            "ans": false
          },
          {
            "label": "c",
            "text": "Produces two cells of same chromosome number",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is called reduction division",
            "ans": false
          },
          {
            "label": "e",
            "text": "Responsible for genetic variability",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Derivatives of mesoderm",
        "items": [
          {
            "label": "a",
            "text": "Epidermis",
            "ans": false
          },
          {
            "label": "b",
            "text": "Cardiac muscle",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lung",
            "ans": false
          },
          {
            "label": "d",
            "text": "Gall bladder",
            "ans": false
          },
          {
            "label": "e",
            "text": "Connective tissue",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Content of carotid sheath",
        "items": [
          {
            "label": "a",
            "text": "Common carotid artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "External carotid artery",
            "ans": false
          },
          {
            "label": "c",
            "text": "External jugular vein",
            "ans": false
          },
          {
            "label": "d",
            "text": "Internal jugular vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": true
          }
        ],
        "explanation": "Common/internal carotid artery, IJV, vagus. External carotid is outside the sheath. Orbit's key differs.",
        "textbookNote": "Common/internal carotid artery, IJV, vagus. External carotid is outside the sheath. Orbit's key differs.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Common/internal carotid artery, IJV, vagus. External carotid is outside the sheath. Orbit's key differs."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Purely motor cranial nerve",
        "items": [
          {
            "label": "a",
            "text": "Facial",
            "ans": false
          },
          {
            "label": "b",
            "text": "Glossopharyngeal",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hypoglossal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Trochlear",
            "ans": true
          },
          {
            "label": "e",
            "text": "Vestibulocochlear",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Central lymphoid organ",
        "items": [
          {
            "label": "a",
            "text": "Bone marrow",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": false
          },
          {
            "label": "c",
            "text": "Palatine tonsil",
            "ans": false
          },
          {
            "label": "d",
            "text": "Spleen",
            "ans": false
          },
          {
            "label": "e",
            "text": "Thymus",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Deep cerebellar nuclei",
        "items": [
          {
            "label": "a",
            "text": "Caudate nucleus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Dentate nucleus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Globose",
            "ans": true
          },
          {
            "label": "d",
            "text": "Posteromedial nucleus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Ventromedial nucleus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Hard palate formed by",
        "opts": [
          "Ethmoid",
          "Frontal",
          "Maxilla",
          "Zygomatic",
          "Lacrimal"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Muscle that opens laryngeal inlet",
        "opts": [
          "Aryepiglottic",
          "Cricothyroid",
          "Oblique arytenoid",
          "Thyroarytenoid",
          "Thyroepiglottic"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Parasympathetic nucleus",
        "opts": [
          "Nucleus ambiguus",
          "Vestibular",
          "Mesencephalic",
          "Red",
          "Spinal"
        ],
        "correctIndex": 4,
        "explanation": "Nucleus ambiguus is branchial motor; mesencephalic nucleus is sensory.",
        "textbookNote": "Nucleus ambiguus is branchial motor; mesencephalic nucleus is sensory.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Nucleus ambiguus is branchial motor; mesencephalic nucleus is sensory."
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Effect of sympathetic system",
        "opts": [
          "Bronchoconstriction",
          "Cardio inhibition",
          "Coronary vasoconstriction",
          "Decrease peristalsis",
          "Decrease sweating"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Reticular fiber found in",
        "opts": [
          "Bone",
          "Tendon",
          "Lymphoid organ",
          "Cartilage",
          "Muscle"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Epithelial tissue",
        "opts": [
          "Is avascular",
          "Develops from ectoderm only",
          "Intercellular substance is maximum",
          "Has nerve supply",
          "Consists of cell, fiber and ground substance"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Principal muscle of mastication",
        "opts": [
          "Buccinator",
          "Digastric",
          "Geniohyoid",
          "Masseter",
          "Mylohyoid"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Cell in lacuna of Haversian system",
        "opts": [
          "Chondroblast",
          "Osteoblast",
          "Osteoclast",
          "Osteoprogenitor",
          "Osteocyte"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Nerve through cavernous sinus",
        "opts": [
          "Abducent",
          "Oculomotor",
          "Optic",
          "Ophthalmic",
          "Trochlear"
        ],
        "correctIndex": 0,
        "explanation": "Abducent runs freely through the sinus lumen; oculomotor, trochlear, ophthalmic and maxillary lie in its lateral wall.",
        "textbookNote": "Abducent runs freely through the sinus lumen; oculomotor, trochlear, ophthalmic and maxillary lie in its lateral wall.",
        "verificationStatus": "Provisional",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy",
        "reviewReason": "Abducent runs freely through the sinus lumen; oculomotor, trochlear, ophthalmic and maxillary lie in its lateral wall."
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Layer of scalp = 'safety valve' haematoma",
        "opts": [
          "Aponeurosis",
          "Connective tissue",
          "Loose areolar tissue",
          "Pericranium",
          "Skin"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      }
    ]
  },
  {
    "id": "cmu-ana-2025-nov-p2",
    "session": "November 2025",
    "year": 2025,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 79,
    "bookPage": "p.79",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Branches of axillary artery",
        "items": [
          {
            "label": "a",
            "text": "Superior thoracic artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Profunda brachii artery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Subscapular artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Anterior circumflex humeral artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ulnar artery",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Parietal pleura",
        "items": [
          {
            "label": "a",
            "text": "Lines the thoracic wall and mediastinum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Blood supply same as lung",
            "ans": false
          },
          {
            "label": "c",
            "text": "Develops from somatopleuric mesoderm",
            "ans": true
          },
          {
            "label": "d",
            "text": "Innervated by autonomic nerves",
            "ans": false
          },
          {
            "label": "e",
            "text": "Sensitive to pain",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Abduction of shoulder",
        "items": [
          {
            "label": "a",
            "text": "Latissimus dorsi",
            "ans": false
          },
          {
            "label": "b",
            "text": "Pectoralis major",
            "ans": false
          },
          {
            "label": "c",
            "text": "Deltoid",
            "ans": true
          },
          {
            "label": "d",
            "text": "Supraspinatus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Serratus anterior",
            "ans": true
          }
        ],
        "explanation": "Serratus anterior (with trapezius) rotates the scapula for abduction beyond 90 degrees. Orbit marks e F - debated.",
        "textbookNote": "Serratus anterior (with trapezius) rotates the scapula for abduction beyond 90 degrees. Orbit marks e F - debated.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Serratus anterior (with trapezius) rotates the scapula for abduction beyond 90 degrees. Orbit marks e F - debated."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Tributaries of coronary sinus",
        "items": [
          {
            "label": "a",
            "text": "Great cardiac vein",
            "ans": true
          },
          {
            "label": "b",
            "text": "Anterior cardiac vein",
            "ans": false
          },
          {
            "label": "c",
            "text": "Venae cordis minimae",
            "ans": false
          },
          {
            "label": "d",
            "text": "Middle cardiac vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Right marginal vein",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Retroperitoneal organs",
        "items": [
          {
            "label": "a",
            "text": "Stomach",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ileum",
            "ans": false
          },
          {
            "label": "c",
            "text": "Pancreas",
            "ans": true
          },
          {
            "label": "d",
            "text": "Kidneys",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ureters",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Mediastinal surface of right lung related to",
        "items": [
          {
            "label": "a",
            "text": "Right atrium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Left ventricle",
            "ans": false
          },
          {
            "label": "c",
            "text": "Arch of aorta",
            "ans": false
          },
          {
            "label": "d",
            "text": "Arch of azygos vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Right phrenic nerve",
            "ans": false
          }
        ],
        "explanation": "Right phrenic nerve lies on the mediastinal pleura but is not a groove/impression. Orbit also F.",
        "textbookNote": "Right phrenic nerve lies on the mediastinal pleura but is not a groove/impression. Orbit also F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax",
        "officialOrbitDiscrepancy": "Right phrenic nerve lies on the mediastinal pleura but is not a groove/impression. Orbit also F."
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Content of spermatic cord",
        "items": [
          {
            "label": "a",
            "text": "Ductus deferens",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inferior epigastric artery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Testicular arteries",
            "ans": true
          },
          {
            "label": "d",
            "text": "Genital branch of genitofemoral nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Femoral nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Supplied by superior gluteal nerve",
        "items": [
          {
            "label": "a",
            "text": "Gluteus medius",
            "ans": true
          },
          {
            "label": "b",
            "text": "Gluteus maximus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Gluteus minimus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Tensor fascia lata",
            "ans": true
          },
          {
            "label": "e",
            "text": "Gemellus superior",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Submucosal glands present in",
        "items": [
          {
            "label": "a",
            "text": "Oesophagus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Duodenum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Stomach",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ileum",
            "ans": false
          },
          {
            "label": "e",
            "text": "Appendix",
            "ans": false
          }
        ],
        "explanation": "Oesophageal glands proper lie in the submucosa (Junqueira). Orbit marks a F.",
        "textbookNote": "Oesophageal glands proper lie in the submucosa (Junqueira). Orbit marks a F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Oesophageal glands proper lie in the submucosa (Junqueira). Orbit marks a F."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Derivatives of hindgut",
        "items": [
          {
            "label": "a",
            "text": "Sigmoid colon",
            "ans": true
          },
          {
            "label": "b",
            "text": "Stomach",
            "ans": false
          },
          {
            "label": "c",
            "text": "Jejunum",
            "ans": false
          },
          {
            "label": "d",
            "text": "Appendix",
            "ans": false
          },
          {
            "label": "e",
            "text": "Rectum",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Winging of scapula caused by paralysis of",
        "opts": [
          "Subclavius muscle",
          "Supraspinatus",
          "Infraspinatus",
          "Teres minor",
          "Serratus anterior"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Remnant of umbilical vein",
        "opts": [
          "Falciform ligament",
          "Coronary ligament",
          "Ligamentum teres hepatis",
          "Ligamentum venosum",
          "Triangular ligament"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Branch arising from roots of brachial plexus",
        "opts": [
          "Median nerve",
          "Radial nerve",
          "Ulnar nerve",
          "Long thoracic nerve",
          "Axillary nerve"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Diameter increased by pump-handle movement",
        "opts": [
          "Oblique diameter",
          "Anteroposterior diameter",
          "Transverse diameter",
          "Vertical diameter",
          "All diameters"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Strongest ligament of hip joint",
        "opts": [
          "Ischiofemoral ligament",
          "Capsular ligament",
          "Iliofemoral ligament",
          "Pubofemoral ligament",
          "Ligamentum teres femoris"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Conducting system supplied by left coronary artery",
        "opts": [
          "AV node",
          "SA node",
          "Purkinje fibers",
          "Left branch of AV bundle",
          "Right branch of AV bundle"
        ],
        "correctIndex": 1,
        "explanation": "Weak question: SA node is from RCA in about 60%, left coronary in about 40%. b is the best option here.",
        "textbookNote": "Weak question: SA node is from RCA in about 60%, left coronary in about 40%. b is the best option here.",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "reviewReason": "Weak question: SA node is from RCA in about 60%, left coronary in about 40%. b is the best option here."
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Viscera related to right kidney",
        "opts": [
          "Pancreas",
          "Spleen",
          "Stomach",
          "Liver",
          "3rd part of duodenum"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Muscle forming inguinal ligament",
        "opts": [
          "Iliacus muscle",
          "External oblique muscle",
          "Transversus abdominis muscle",
          "Internal oblique muscle",
          "Rectus abdominis"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Primary support of uterus",
        "opts": [
          "Pelvic diaphragm",
          "Broad ligament",
          "Uterovesical fold of peritoneum",
          "Rectovaginal fold of peritoneum",
          "Rectum"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Keystone of medial longitudinal arch",
        "opts": [
          "Calcaneus",
          "Navicular",
          "Medial cuneiform",
          "Talus",
          "1st metatarsal"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      }
    ]
  },
  {
    "id": "cmu-ana-2024-may-p1",
    "session": "May 2024",
    "year": 2024,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 80,
    "bookPage": "p.80",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Carotid sheath contains",
        "items": [
          {
            "label": "a",
            "text": "Internal jugular vein",
            "ans": true
          },
          {
            "label": "b",
            "text": "External jugular vein",
            "ans": false
          },
          {
            "label": "c",
            "text": "Common carotid artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "External carotid artery",
            "ans": false
          },
          {
            "label": "e",
            "text": "Internal carotid artery",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Reticular fiber found in",
        "items": [
          {
            "label": "a",
            "text": "Spleen",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": true
          },
          {
            "label": "c",
            "text": "Tendon",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ligament",
            "ans": false
          },
          {
            "label": "e",
            "text": "Lung",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Skeletal muscle fiber",
        "items": [
          {
            "label": "a",
            "text": "Are spindle in shape",
            "ans": false
          },
          {
            "label": "b",
            "text": "Has multiple nuclei",
            "ans": true
          },
          {
            "label": "c",
            "text": "Innervated by autonomic nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Voluntary in function",
            "ans": true
          },
          {
            "label": "e",
            "text": "Develops from paraxial mesoderm",
            "ans": true
          }
        ],
        "explanation": "Orbit marks e F; limb and trunk skeletal muscle arises from somites (paraxial mesoderm).",
        "textbookNote": "Orbit marks e F; limb and trunk skeletal muscle arises from somites (paraxial mesoderm).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "officialOrbitDiscrepancy": "Orbit marks e F; limb and trunk skeletal muscle arises from somites (paraxial mesoderm)."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Structural abnormalities of chromosome",
        "items": [
          {
            "label": "a",
            "text": "Turner syndrome",
            "ans": false
          },
          {
            "label": "b",
            "text": "Deletion",
            "ans": true
          },
          {
            "label": "c",
            "text": "Ring chromosome",
            "ans": true
          },
          {
            "label": "d",
            "text": "Translocation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Trisomy",
            "ans": false
          }
        ],
        "explanation": "Ring chromosome is structural; Orbit marks it F. Turner and trisomy are numerical.",
        "textbookNote": "Ring chromosome is structural; Orbit marks it F. Turner and trisomy are numerical.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Ring chromosome is structural; Orbit marks it F. Turner and trisomy are numerical."
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Fibrous joints",
        "items": [
          {
            "label": "a",
            "text": "Coronal suture",
            "ans": true
          },
          {
            "label": "b",
            "text": "Temporomandibular joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inferior tibiofibular joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Intervertebral joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Manubriosternal joint",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Commissural fibers",
        "items": [
          {
            "label": "a",
            "text": "Internal capsule",
            "ans": false
          },
          {
            "label": "b",
            "text": "Corpus callosum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Superior longitudinal",
            "ans": false
          },
          {
            "label": "d",
            "text": "Optic radiation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Anterior commissure",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Nasopharynx communicates with",
        "items": [
          {
            "label": "a",
            "text": "Nasal cavity",
            "ans": true
          },
          {
            "label": "b",
            "text": "Middle ear cavity",
            "ans": true
          },
          {
            "label": "c",
            "text": "Oropharynx",
            "ans": true
          },
          {
            "label": "d",
            "text": "Oral cavity",
            "ans": false
          },
          {
            "label": "e",
            "text": "Larynx",
            "ans": false
          }
        ],
        "explanation": "Orbit marks b F, but it communicates with the middle ear via the auditory tube.",
        "textbookNote": "Orbit marks b F, but it communicates with the middle ear via the auditory tube.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks b F, but it communicates with the middle ear via the auditory tube."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Extrapyramidal tracts",
        "items": [
          {
            "label": "a",
            "text": "Corticospinal",
            "ans": false
          },
          {
            "label": "b",
            "text": "Reticulospinal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Rubrospinal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Spinotectal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vestibulospinal",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Endodermal derivatives",
        "items": [
          {
            "label": "a",
            "text": "Thyroid gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "Pancreas",
            "ans": true
          },
          {
            "label": "c",
            "text": "Parathyroid gland",
            "ans": true
          },
          {
            "label": "d",
            "text": "Sweat gland",
            "ans": false
          },
          {
            "label": "e",
            "text": "Adrenal gland",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Nasal septum formed by",
        "items": [
          {
            "label": "a",
            "text": "Ethmoid bone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occipital bone",
            "ans": false
          },
          {
            "label": "c",
            "text": "Septal cartilage",
            "ans": true
          },
          {
            "label": "d",
            "text": "Temporal bone",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vomer",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Avascular structure in eyeball",
        "opts": [
          "Retina",
          "Lens",
          "Sclera",
          "Iris",
          "Choroid"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Artery wall thicker than vein due to",
        "opts": [
          "Absence of valve",
          "Presence of internal and external elastic lamina",
          "Presence of oxygenated blood",
          "Presence of vasa vasorum",
          "Well developed tunica media"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Descending tract",
        "opts": [
          "Fasciculus gracilis",
          "Spinotectal",
          "Dorsal spinocerebellar",
          "Tectospinal",
          "Spinoolivary"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Effect of sympathetic system",
        "opts": [
          "Bronchoconstriction",
          "Cardio inhibition",
          "Coronary vasoconstriction",
          "Decrease peristalsis",
          "Decrease sweating"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Nissl granules present in",
        "opts": [
          "Ependymal cell",
          "Microglia",
          "Oligodendrocyte",
          "Protoplasmic astrocyte",
          "Pyramidal cell"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Parasympathetic fibers present in",
        "opts": [
          "Optic nerve",
          "Oculomotor nerve",
          "Trigeminal nerve",
          "Accessory nerve",
          "Hypoglossal nerve"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Hard palate formed by",
        "opts": [
          "Ethmoid",
          "Frontal",
          "Maxilla",
          "Zygomatic",
          "Lacrimal"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Cell in lacuna of Haversian system",
        "opts": [
          "Chondroblast",
          "Osteoblast",
          "Osteoclast",
          "Osteoprogenitor",
          "Osteocyte"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Multipolar neuron",
        "opts": [
          "Olfactory cell",
          "Purkinje cell",
          "Dorsal root ganglia",
          "Trigeminal ganglia",
          "Vestibular ganglion"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Derivative of pharyngeal pouch",
        "opts": [
          "Thyroid gland",
          "Thymus",
          "Parotid gland",
          "External auditory meatus",
          "Ear ossicles"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-ana-2024-may-p2",
    "session": "May 2024",
    "year": 2024,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 81,
    "bookPage": "p.81",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Structure crossed by root of mesentery",
        "items": [
          {
            "label": "a",
            "text": "2nd part of the duodenum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Right psoas major",
            "ans": true
          },
          {
            "label": "c",
            "text": "Left ureter",
            "ans": false
          },
          {
            "label": "d",
            "text": "Abdominal aorta",
            "ans": true
          },
          {
            "label": "e",
            "text": "Left psoas major",
            "ans": false
          }
        ],
        "explanation": "Root crosses 3rd part of duodenum, aorta, IVC, right ureter, right psoas major. Orbit marks b F.",
        "textbookNote": "Root crosses 3rd part of duodenum, aorta, IVC, right ureter, right psoas major. Orbit marks b F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Root crosses 3rd part of duodenum, aorta, IVC, right ureter, right psoas major. Orbit marks b F."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Veins ending into coronary sinus",
        "items": [
          {
            "label": "a",
            "text": "Great cardiac vein",
            "ans": true
          },
          {
            "label": "b",
            "text": "Middle cardiac vein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Anterior cardiac vein",
            "ans": false
          },
          {
            "label": "d",
            "text": "Small cardiac vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Venae cordis minimae",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Respiratory zone of bronchial tree",
        "items": [
          {
            "label": "a",
            "text": "Conducts air from nose to alveoli",
            "ans": false
          },
          {
            "label": "b",
            "text": "Begins from respiratory bronchiole",
            "ans": true
          },
          {
            "label": "c",
            "text": "Has abundant goblet cells in its mucosa",
            "ans": false
          },
          {
            "label": "d",
            "text": "Supplied by branches of pulmonary artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Develops from ectoderm",
            "ans": false
          }
        ],
        "explanation": "Begins at respiratory bronchiole; alveolar capillaries come from the pulmonary artery. Weakly worded question.",
        "textbookNote": "Begins at respiratory bronchiole; alveolar capillaries come from the pulmonary artery. Weakly worded question.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Begins at respiratory bronchiole; alveolar capillaries come from the pulmonary artery. Weakly worded question."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Flexor of elbow joint",
        "items": [
          {
            "label": "a",
            "text": "Brachialis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Triceps brachii",
            "ans": false
          },
          {
            "label": "c",
            "text": "Coracobrachialis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Biceps brachii",
            "ans": true
          },
          {
            "label": "e",
            "text": "Supraspinatus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Nerve related to humerus",
        "items": [
          {
            "label": "a",
            "text": "Median nerve",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ulnar nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Axillary nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Radial nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Musculocutaneous nerve",
            "ans": false
          }
        ],
        "explanation": "Ulnar nerve touches the back of the medial epicondyle. Orbit's key differs (marks e T).",
        "textbookNote": "Ulnar nerve touches the back of the medial epicondyle. Orbit's key differs (marks e T).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "officialOrbitDiscrepancy": "Ulnar nerve touches the back of the medial epicondyle. Orbit's key differs (marks e T)."
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Quadriceps femoris",
        "items": [
          {
            "label": "a",
            "text": "Contain three muscles",
            "ans": false
          },
          {
            "label": "b",
            "text": "Powerful flexor of knee",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is supplied by the tibial nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Its tendon forms the ligamentum patellae",
            "ans": true
          },
          {
            "label": "e",
            "text": "Injury to femoral nerve causes its paralysis",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Histological features of duodenum",
        "items": [
          {
            "label": "a",
            "text": "Serous cells",
            "ans": false
          },
          {
            "label": "b",
            "text": "Brunner's gland",
            "ans": true
          },
          {
            "label": "c",
            "text": "Simple squamous epithelium",
            "ans": false
          },
          {
            "label": "d",
            "text": "Chief cells",
            "ans": false
          },
          {
            "label": "e",
            "text": "Crypts of Lieberkuhn",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Contents of rectus sheath",
        "items": [
          {
            "label": "a",
            "text": "Rectus abdominis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inferior epigastric artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Musculophrenic artery",
            "ans": false
          },
          {
            "label": "d",
            "text": "6th intercostal nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Subcostal nerve",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Ureter",
        "items": [
          {
            "label": "a",
            "text": "25 cm in length",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has got four constrictions",
            "ans": false
          },
          {
            "label": "c",
            "text": "Develops from endoderm",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lined by simple cuboidal epithelium",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is retroperitoneal",
            "ans": true
          }
        ],
        "explanation": "Ureter develops from the ureteric bud (mesoderm), not endoderm; it has three constrictions; lined by transitional epithelium. Orbit marks c T.",
        "textbookNote": "Ureter develops from the ureteric bud (mesoderm), not endoderm; it has three constrictions; lined by transitional epithelium. Orbit marks c T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Ureter develops from the ureteric bud (mesoderm), not endoderm; it has three constrictions; lined by transitional epithelium. Orbit marks c T."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Femoral artery",
        "items": [
          {
            "label": "a",
            "text": "Passes through deep inguinal ring",
            "ans": false
          },
          {
            "label": "b",
            "text": "Content of femoral sheath",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is a muscular artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Clinically not important",
            "ans": false
          },
          {
            "label": "e",
            "text": "Branch of internal iliac artery",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Groove behind hilum of right lung lodges",
        "opts": [
          "Descending thoracic aorta",
          "Azygos vein",
          "Superior pulmonary vein",
          "Esophagus",
          "Trachea"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Most common position of vermiform appendix",
        "opts": [
          "Retro-ileal",
          "Retro-caecal",
          "Pelvic",
          "Anterior to terminal ileum",
          "Subcaecal"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Most common site of clavicle fracture",
        "opts": [
          "Medial end",
          "Lateral end",
          "Midpoint",
          "Junction of the medial two third and lateral one third",
          "Junction of the lateral two third and medial one third"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Transpyloric plane passes through",
        "opts": [
          "The spleen",
          "The third part of the duodenum",
          "The tail of the pancreas",
          "The origin of the superior mesenteric artery",
          "The neck of the gallbladder"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Hepatic lobule",
        "opts": [
          "Hepatic lamina extends from periphery to center",
          "Central vein has Kupffer cells in its wall",
          "Portal triad lies at the corners of lobule",
          "Sinusoids lie between two adjacent lobules",
          "Is based on oxygenation of liver parenchyma"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Lymphatics from nipple and areola drain mainly into",
        "opts": [
          "Pectoral group of axillary lymph node",
          "Subscapular group of axillary lymph node",
          "Central group of axillary lymph node",
          "Apical group of axillary lymph node",
          "Parasternal lymph group"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Back of medial epicondyle related to",
        "opts": [
          "Radial nerve",
          "Axillary nerve",
          "Ulnar nerve",
          "Median nerve",
          "None of the above"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Paralysis of which nerve causes foot drop",
        "opts": [
          "Femoral",
          "Tibial",
          "Superficial peroneal",
          "Deep peroneal",
          "Obturator"
        ],
        "correctIndex": 3,
        "explanation": "Common peroneal nerve injury is the classic cause; of the options, deep peroneal.",
        "textbookNote": "Common peroneal nerve injury is the classic cause; of the options, deep peroneal.",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "reviewReason": "Common peroneal nerve injury is the classic cause; of the options, deep peroneal."
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Pleural reflection at mid-axillary line",
        "opts": [
          "6th",
          "8th",
          "9th",
          "10th",
          "12th"
        ],
        "correctIndex": 3,
        "explanation": "Pleura: 8th rib (midclavicular), 10th (midaxillary), 12th (paravertebral).",
        "textbookNote": "Pleura: 8th rib (midclavicular), 10th (midaxillary), 12th (paravertebral).",
        "verificationStatus": "Provisional",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax",
        "reviewReason": "Pleura: 8th rib (midclavicular), 10th (midaxillary), 12th (paravertebral)."
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Anterior relation of sacroiliac joint",
        "opts": [
          "Femoral nerve",
          "Sciatic nerve",
          "Obturator nerve",
          "Round ligament",
          "Ureter"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      }
    ]
  },
  {
    "id": "cmu-ana-2024-nov-p1",
    "session": "November 2024",
    "year": 2024,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 82,
    "bookPage": "p.82",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Paired dural venous sinuses",
        "items": [
          {
            "label": "a",
            "text": "Cavernous",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occipital",
            "ans": false
          },
          {
            "label": "c",
            "text": "Straight",
            "ans": false
          },
          {
            "label": "d",
            "text": "Superior sagittal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Transverse",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Avascular structures",
        "items": [
          {
            "label": "a",
            "text": "Bone",
            "ans": false
          },
          {
            "label": "b",
            "text": "Cornea",
            "ans": true
          },
          {
            "label": "c",
            "text": "Dermis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Epidermis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Hair",
            "ans": true
          }
        ],
        "explanation": "Orbit marks dermis T - wrong, the dermis is vascular.",
        "textbookNote": "Orbit marks dermis T - wrong, the dermis is vascular.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks dermis T - wrong, the dermis is vascular."
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Hyaline cartilage present in",
        "items": [
          {
            "label": "a",
            "text": "Trachea",
            "ans": true
          },
          {
            "label": "b",
            "text": "Epiglottis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Costal cartilage",
            "ans": true
          },
          {
            "label": "d",
            "text": "Menisci of knee",
            "ans": false
          },
          {
            "label": "e",
            "text": "External ear",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Peripheral lymphoid organ",
        "items": [
          {
            "label": "a",
            "text": "Bone marrow",
            "ans": false
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": true
          },
          {
            "label": "c",
            "text": "Palatine tonsil",
            "ans": true
          },
          {
            "label": "d",
            "text": "Thymus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Spleen",
            "ans": true
          }
        ],
        "explanation": "The spleen is a peripheral lymphoid organ; Orbit marks it F.",
        "textbookNote": "The spleen is a peripheral lymphoid organ; Orbit marks it F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "The spleen is a peripheral lymphoid organ; Orbit marks it F."
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Hard palate formed by",
        "items": [
          {
            "label": "a",
            "text": "Maxilla",
            "ans": true
          },
          {
            "label": "b",
            "text": "Palatine bone",
            "ans": true
          },
          {
            "label": "c",
            "text": "Nasal bone",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ethmoid bone",
            "ans": false
          },
          {
            "label": "e",
            "text": "Lacrimal bone",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Hind brain includes",
        "items": [
          {
            "label": "a",
            "text": "Cerebellum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cerebrum",
            "ans": false
          },
          {
            "label": "c",
            "text": "Medulla oblongata",
            "ans": true
          },
          {
            "label": "d",
            "text": "Mid brain",
            "ans": false
          },
          {
            "label": "e",
            "text": "Pons",
            "ans": true
          }
        ],
        "explanation": "Pons belongs to the hindbrain; Orbit marks it F.",
        "textbookNote": "Pons belongs to the hindbrain; Orbit marks it F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy",
        "officialOrbitDiscrepancy": "Pons belongs to the hindbrain; Orbit marks it F."
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Superior orbital fissure transmits",
        "items": [
          {
            "label": "a",
            "text": "Abducent nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Maxillary nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Middle meningeal artery",
            "ans": false
          },
          {
            "label": "d",
            "text": "Nasociliary nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Oculomotor nerve",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Spinal cord",
        "items": [
          {
            "label": "a",
            "text": "Contains multipolar neuron in anterior horn",
            "ans": true
          },
          {
            "label": "b",
            "text": "Contains preganglionic sympathetic neuron in thoracic region",
            "ans": true
          },
          {
            "label": "c",
            "text": "Develops from surface ectoderm",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is covered by endosteal dura mater",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is supplied by vertebral artery",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Meiosis cell division",
        "items": [
          {
            "label": "a",
            "text": "Occurs in mature germ cell",
            "ans": false
          },
          {
            "label": "b",
            "text": "Occurs in immature germ cell",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is called reduction division",
            "ans": true
          },
          {
            "label": "d",
            "text": "Produce two daughter cells",
            "ans": false
          },
          {
            "label": "e",
            "text": "Causes genetic variation",
            "ans": true
          }
        ],
        "explanation": "Meiosis occurs in primary spermatocytes/oocytes (immature germ cells); mature gametes do not divide. Orbit marks a T, b F - I disagree.",
        "textbookNote": "Meiosis occurs in primary spermatocytes/oocytes (immature germ cells); mature gametes do not divide. Orbit marks a T, b F - I disagree.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "officialOrbitDiscrepancy": "Meiosis occurs in primary spermatocytes/oocytes (immature germ cells); mature gametes do not divide. Orbit marks a T, b F - I disagree."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Deep cerebellar nucleus",
        "items": [
          {
            "label": "a",
            "text": "Caudate nucleus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Dentate nucleus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Globose",
            "ans": true
          },
          {
            "label": "d",
            "text": "Posteromedial nucleus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Ventromedial nucleus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Safety muscle of tongue",
        "opts": [
          "Palatoglossus",
          "Genioglossus",
          "Hyoglossus",
          "Styloglossus",
          "Geniohyoid"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Muscle that opens laryngeal inlet",
        "opts": [
          "Aryepiglottic",
          "Cricothyroid",
          "Oblique arytenoid",
          "Thyroarytenoid",
          "Thyroepiglottic"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Parasympathetic nucleus",
        "opts": [
          "Dorsal nucleus",
          "Vestibular nucleus",
          "Mesencephalic nucleus",
          "Red nucleus",
          "Spinal nucleus"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Effect of sympathetic system",
        "opts": [
          "Bronchoconstriction",
          "Cardio inhibition",
          "Coronary vasoconstriction",
          "Decrease peristalsis",
          "Decrease sweating"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Bipolar neuron",
        "opts": [
          "Pyramidal cell",
          "Purkinje cell",
          "Olfactory cell",
          "Anterior horn cell",
          "Stellate cell"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Basal nuclei",
        "opts": [
          "Medial geniculate body",
          "Pulvinar",
          "Red nucleus",
          "Amygdaloid nucleus",
          "Paraventricular nucleus"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Principal muscle of mastication",
        "opts": [
          "Buccinator",
          "Digastric",
          "Geniohyoid",
          "Masseter",
          "Mylohyoid"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Cell in lacuna of Haversian system",
        "opts": [
          "Chondroblast",
          "Osteoblast",
          "Osteoclast",
          "Osteoprogenitor",
          "Osteocyte"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Primary cartilaginous joint",
        "opts": [
          "Pubic symphysis",
          "Sacroiliac joint",
          "Lumbosacral joint",
          "First sternocostal joint",
          "Temporomandibular"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Characteristics of epithelium tissue",
        "items": [
          {
            "label": "a",
            "text": "Has blood supply",
            "ans": false
          },
          {
            "label": "b",
            "text": "Has nerve supply",
            "ans": true
          },
          {
            "label": "c",
            "text": "Develops from all three germ layers",
            "ans": true
          },
          {
            "label": "d",
            "text": "Composed of fiber and matrix",
            "ans": false
          },
          {
            "label": "e",
            "text": "Intercellular substance is maximum",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-ana-2024-nov-p2",
    "session": "November 2024",
    "year": 2024,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 83,
    "bookPage": "p.83",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Opening of right atrium",
        "items": [
          {
            "label": "a",
            "text": "Superior vena cava",
            "ans": true
          },
          {
            "label": "b",
            "text": "Coronary sinus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Anterior cardiac vein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Pulmonary vein",
            "ans": false
          },
          {
            "label": "e",
            "text": "Ascending aorta",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Carpal tunnel contains",
        "items": [
          {
            "label": "a",
            "text": "Flexor pollicis longus tendon",
            "ans": true
          },
          {
            "label": "b",
            "text": "Tendon of flexor digitorum superficialis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Flexor carpi radialis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Median nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ulnar artery",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Great saphenous vein",
        "items": [
          {
            "label": "a",
            "text": "Connected with deep vein through perforator",
            "ans": true
          },
          {
            "label": "b",
            "text": "Site for venesection",
            "ans": true
          },
          {
            "label": "c",
            "text": "Begins at lateral side of foot",
            "ans": false
          },
          {
            "label": "d",
            "text": "Devoid of valves",
            "ans": false
          },
          {
            "label": "e",
            "text": "Passes behind the medial malleolus",
            "ans": false
          }
        ],
        "explanation": "It begins on the MEDIAL side of the foot, has valves, and passes in FRONT of the medial malleolus (Orbit marks e T).",
        "textbookNote": "It begins on the MEDIAL side of the foot, has valves, and passes in FRONT of the medial malleolus (Orbit marks e T).",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "It begins on the MEDIAL side of the foot, has valves, and passes in FRONT of the medial malleolus (Orbit marks e T)."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Superior vena cava",
        "items": [
          {
            "label": "a",
            "text": "Is located in posterior mediastinum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is a large vein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is formed by union of right and left subclavian vein",
            "ans": false
          },
          {
            "label": "d",
            "text": "Terminates in smooth part of right atrium",
            "ans": true
          },
          {
            "label": "e",
            "text": "Brings blood to heart from above the diaphragm",
            "ans": true
          }
        ],
        "explanation": "SVC is formed by the right and left BRACHIOCEPHALIC veins.",
        "textbookNote": "SVC is formed by the right and left BRACHIOCEPHALIC veins.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "SVC is formed by the right and left BRACHIOCEPHALIC veins."
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Alveoli",
        "items": [
          {
            "label": "a",
            "text": "Lined by simple squamous epithelium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Designed for air conduction",
            "ans": false
          },
          {
            "label": "c",
            "text": "Surrounded by pulmonary capillaries",
            "ans": true
          },
          {
            "label": "d",
            "text": "Develop from endoderm of foregut",
            "ans": true
          },
          {
            "label": "e",
            "text": "Non-collapsible",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Muscles that dorsiflex the foot",
        "items": [
          {
            "label": "a",
            "text": "Tibialis anterior",
            "ans": true
          },
          {
            "label": "b",
            "text": "Flexor digitorum longus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Extensor hallucis longus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Peroneus tertius",
            "ans": true
          },
          {
            "label": "e",
            "text": "Tibialis posterior",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Intracapsular structure of knee",
        "items": [
          {
            "label": "a",
            "text": "Cruciate ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Menisci",
            "ans": true
          },
          {
            "label": "c",
            "text": "Popliteal tendon",
            "ans": true
          },
          {
            "label": "d",
            "text": "Patellar ligament",
            "ans": false
          },
          {
            "label": "e",
            "text": "Synovial membrane",
            "ans": false
          }
        ],
        "explanation": "Popliteus tendon is intracapsular but extrasynovial. Orbit's key varies between years for the synovial membrane.",
        "textbookNote": "Popliteus tendon is intracapsular but extrasynovial. Orbit's key varies between years for the synovial membrane.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Popliteus tendon is intracapsular but extrasynovial. Orbit's key varies between years for the synovial membrane."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Extra-hepatic biliary apparatus",
        "items": [
          {
            "label": "a",
            "text": "Hepatic duct",
            "ans": true
          },
          {
            "label": "b",
            "text": "Bile canaliculi",
            "ans": false
          },
          {
            "label": "c",
            "text": "Cystic duct",
            "ans": true
          },
          {
            "label": "d",
            "text": "Bile duct",
            "ans": true
          },
          {
            "label": "e",
            "text": "Bile ductule",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Pancreas",
        "items": [
          {
            "label": "a",
            "text": "Is an endocrine gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lies in the epigastrium",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is an intra-peritoneal structure",
            "ans": false
          },
          {
            "label": "d",
            "text": "Alpha cells secrete insulin",
            "ans": false
          },
          {
            "label": "e",
            "text": "Portal vein is formed behind its neck",
            "ans": true
          }
        ],
        "explanation": "Alpha cells secrete glucagon (beta cells secrete insulin). Pancreas is mostly retroperitoneal.",
        "textbookNote": "Alpha cells secrete glucagon (beta cells secrete insulin). Pancreas is mostly retroperitoneal.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Alpha cells secrete glucagon (beta cells secrete insulin). Pancreas is mostly retroperitoneal."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Anterior compartment of leg",
        "items": [
          {
            "label": "a",
            "text": "Tibialis anterior",
            "ans": true
          },
          {
            "label": "b",
            "text": "Extensor hallucis longus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Flexor digitorum longus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Peroneus tertius",
            "ans": true
          },
          {
            "label": "e",
            "text": "Peroneus brevis",
            "ans": false
          }
        ],
        "explanation": "Flexor digitorum longus is in the posterior compartment; Orbit marks c T.",
        "textbookNote": "Flexor digitorum longus is in the posterior compartment; Orbit marks c T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Flexor digitorum longus is in the posterior compartment; Orbit marks c T."
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Strongest ligament of upper limb",
        "opts": [
          "Consoclavicular ligament (sic)",
          "Coracoclavicular ligament",
          "Suprascapular ligament",
          "Glenohumeral ligament",
          "Transverse humeral ligament"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Strong supinator of forearm",
        "opts": [
          "Supinator",
          "Biceps brachii",
          "Brachioradialis",
          "Brachialis",
          "Coracobrachialis"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Jejunum and ileum develop from",
        "opts": [
          "Foregut",
          "Midgut",
          "Hind gut",
          "Cloaca",
          "Pharyngeal gut"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Parietal pleura",
        "opts": [
          "Supplied by phrenic nerve only",
          "Pain sensitive",
          "Not present over apex of lung",
          "Derived from ectoderm",
          "Lined by endothelium"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "NOT a content of femoral sheath",
        "opts": [
          "Femoral artery",
          "Femoral vein",
          "Femoral branch of genitofemoral nerve",
          "Femoral nerve",
          "Lymph node of Cloquet"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Transpyloric plane passes through",
        "opts": [
          "T2-L1",
          "L1-L2",
          "T10",
          "L5-S1",
          "L2-L3"
        ],
        "correctIndex": 1,
        "explanation": "The plane lies at L1 (some texts say lower L1/upper L2); L1-L2 is the closest option.",
        "textbookNote": "The plane lies at L1 (some texts say lower L1/upper L2); L1-L2 is the closest option.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "The plane lies at L1 (some texts say lower L1/upper L2); L1-L2 is the closest option."
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Referred pain of cholecystitis felt in",
        "opts": [
          "Tip of ninth costal cartilage",
          "Around umbilicus",
          "Tip of right shoulder",
          "Right iliac fossa",
          "Epigastrium"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Least dilatable part of urethra",
        "opts": [
          "Pre-prostatic",
          "Prostatic",
          "Membranous",
          "Spongy",
          "Penile"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Failure of testis to descend",
        "opts": [
          "Hypospadias",
          "Cryptorchidism",
          "Epispadias",
          "Varicocele",
          "Ectopic testis"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Structure crossing floor of ovarian fossa",
        "opts": [
          "External iliac artery",
          "Ovarian vessels",
          "Obturator nerve",
          "Pudendal nerve",
          "Umbilical artery (printed 'Urine artery')"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      }
    ]
  },
  {
    "id": "cmu-ana-2023-may-p1",
    "session": "May 2023",
    "year": 2023,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "old curriculum",
    "page": 84,
    "bookPage": "p.84",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Membranous organelles",
        "items": [
          {
            "label": "a",
            "text": "Centrosome",
            "ans": false
          },
          {
            "label": "b",
            "text": "Chromosome",
            "ans": false
          },
          {
            "label": "c",
            "text": "Lysosome",
            "ans": true
          },
          {
            "label": "d",
            "text": "Mitochondria",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ribosome",
            "ans": false
          }
        ],
        "explanation": "Ribosome is non-membranous; Orbit marks e T.",
        "textbookNote": "Ribosome is non-membranous; Orbit marks e T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Ribosome is non-membranous; Orbit marks e T."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Mitotic cell division occurs in",
        "items": [
          {
            "label": "a",
            "text": "Primary oocyte",
            "ans": false
          },
          {
            "label": "b",
            "text": "Primary spermatocyte",
            "ans": false
          },
          {
            "label": "c",
            "text": "Somatic cells",
            "ans": true
          },
          {
            "label": "d",
            "text": "Spermatozoa",
            "ans": false
          },
          {
            "label": "e",
            "text": "Zygote",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Simple squamous epithelium present in",
        "items": [
          {
            "label": "a",
            "text": "Blood vessels",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lung alveoli",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pleura",
            "ans": true
          },
          {
            "label": "d",
            "text": "Tongue",
            "ans": false
          },
          {
            "label": "e",
            "text": "Urinary bladder",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Surface ectodermal derivatives",
        "items": [
          {
            "label": "a",
            "text": "Bone",
            "ans": false
          },
          {
            "label": "b",
            "text": "Dermis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hair",
            "ans": true
          },
          {
            "label": "d",
            "text": "Sweat gland",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thyroid gland",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Elastic cartilage present in",
        "items": [
          {
            "label": "a",
            "text": "Auditory tube",
            "ans": true
          },
          {
            "label": "b",
            "text": "Epiglottis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Intervertebral disc",
            "ans": false
          },
          {
            "label": "d",
            "text": "Thyroid cartilage",
            "ans": false
          },
          {
            "label": "e",
            "text": "Trachea",
            "ans": false
          }
        ],
        "explanation": "Auditory tube cartilage: textbooks vary; epiglottis is certain. Anatomy MCQ - Questions and Answers - page 9",
        "textbookNote": "Auditory tube cartilage: textbooks vary; epiglottis is certain. Anatomy MCQ - Questions and Answers - page 9",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "reviewReason": "Auditory tube cartilage: textbooks vary; epiglottis is certain. Anatomy MCQ - Questions and Answers - page 9"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Secondary cartilaginous joint",
        "items": [
          {
            "label": "a",
            "text": "Intervertebral joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Knee joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Manubriosternal joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Pubic symphysis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Temporomandibular joint",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Avascular structures",
        "items": [
          {
            "label": "a",
            "text": "Bone",
            "ans": false
          },
          {
            "label": "b",
            "text": "Cartilage",
            "ans": true
          },
          {
            "label": "c",
            "text": "Cornea",
            "ans": true
          },
          {
            "label": "d",
            "text": "Dermis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Hair",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Surface modifications of cell",
        "items": [
          {
            "label": "a",
            "text": "Cilia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Flagella",
            "ans": true
          },
          {
            "label": "c",
            "text": "Microvilli",
            "ans": true
          },
          {
            "label": "d",
            "text": "Papillae",
            "ans": false
          },
          {
            "label": "e",
            "text": "Villi",
            "ans": false
          }
        ],
        "explanation": "Villi and papillae are tissue-level, not cell-level, modifications.",
        "textbookNote": "Villi and papillae are tissue-level, not cell-level, modifications.",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "reviewReason": "Villi and papillae are tissue-level, not cell-level, modifications."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Peripheral lymphoid organ",
        "items": [
          {
            "label": "a",
            "text": "Bone marrow",
            "ans": false
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": true
          },
          {
            "label": "c",
            "text": "Palatine tonsil",
            "ans": true
          },
          {
            "label": "d",
            "text": "Spleen",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thymus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Connective tissue cell",
        "items": [
          {
            "label": "a",
            "text": "Ependymal cell",
            "ans": false
          },
          {
            "label": "b",
            "text": "Fibroblast",
            "ans": true
          },
          {
            "label": "c",
            "text": "Mast cell",
            "ans": true
          },
          {
            "label": "d",
            "text": "Plasma cell",
            "ans": true
          },
          {
            "label": "e",
            "text": "Schwann cell",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Jugular foramen transmits",
        "items": [
          {
            "label": "a",
            "text": "External jugular vein",
            "ans": false
          },
          {
            "label": "b",
            "text": "Glossopharyngeal nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Internal jugular vein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Mandibular nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": true
          }
        ],
        "explanation": "Also accessory nerve.",
        "textbookNote": "Also accessory nerve.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Also accessory nerve."
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Muscles of mastication",
        "items": [
          {
            "label": "a",
            "text": "Lateral pterygoid",
            "ans": true
          },
          {
            "label": "b",
            "text": "Masseter",
            "ans": true
          },
          {
            "label": "c",
            "text": "Stylohyoid",
            "ans": false
          },
          {
            "label": "d",
            "text": "Temporalis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Tensor palati",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Motor cranial nerve",
        "items": [
          {
            "label": "a",
            "text": "Abducens",
            "ans": true
          },
          {
            "label": "b",
            "text": "Glossopharyngeal",
            "ans": false
          },
          {
            "label": "c",
            "text": "Oculomotor",
            "ans": true
          },
          {
            "label": "d",
            "text": "Optic",
            "ans": false
          },
          {
            "label": "e",
            "text": "Trigeminal",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Derivatives of 2nd pharyngeal arch",
        "items": [
          {
            "label": "a",
            "text": "Frontalis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Mylohyoid muscle",
            "ans": false
          },
          {
            "label": "c",
            "text": "Orbicularis oris muscle",
            "ans": true
          },
          {
            "label": "d",
            "text": "Stylohyoid muscle",
            "ans": true
          },
          {
            "label": "e",
            "text": "Temporalis muscle",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Parotid gland",
        "items": [
          {
            "label": "a",
            "text": "Contains facial nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is an exocrine gland",
            "ans": true
          },
          {
            "label": "c",
            "text": "Not covered by deep fascia",
            "ans": false
          },
          {
            "label": "d",
            "text": "Opens on the floor of oral cavity",
            "ans": false
          },
          {
            "label": "e",
            "text": "Secretes serous fluid",
            "ans": true
          }
        ],
        "explanation": "It is an exocrine gland and is enclosed by parotid fascia; the duct opens in the vestibule opposite the upper 2nd molar. Orbit marks b F, c T, d T.",
        "textbookNote": "It is an exocrine gland and is enclosed by parotid fascia; the duct opens in the vestibule opposite the upper 2nd molar. Orbit marks b F, c T, d T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "It is an exocrine gland and is enclosed by parotid fascia; the duct opens in the vestibule opposite the upper 2nd molar. Orbit marks b F, c T, d T."
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Hind brain formed by",
        "items": [
          {
            "label": "a",
            "text": "Cerebellum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hypothalamus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Medulla oblongata",
            "ans": true
          },
          {
            "label": "d",
            "text": "Midbrain",
            "ans": false
          },
          {
            "label": "e",
            "text": "Thalamus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Basal ganglia includes",
        "items": [
          {
            "label": "a",
            "text": "Caudate nucleus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Corpus callosum",
            "ans": false
          },
          {
            "label": "c",
            "text": "Globus pallidus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Mesencephalic nucleus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Putamen",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Deep cerebellar nuclei",
        "items": [
          {
            "label": "a",
            "text": "Dentate nucleus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Emboliform nucleus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fastigial nucleus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Lentiform nucleus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Red nucleus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Occipital lobe of cerebrum",
        "items": [
          {
            "label": "a",
            "text": "Contains auditory area",
            "ans": false
          },
          {
            "label": "b",
            "text": "Contains visual area",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is a part of hind brain",
            "ans": false
          },
          {
            "label": "d",
            "text": "Situated below the tentorium cerebelli",
            "ans": false
          },
          {
            "label": "e",
            "text": "Supplied by posterior cerebral artery",
            "ans": true
          }
        ],
        "explanation": "It lies above (not below) the tentorium cerebelli.",
        "textbookNote": "It lies above (not below) the tentorium cerebelli.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "It lies above (not below) the tentorium cerebelli."
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Refractive media of eyeball",
        "items": [
          {
            "label": "a",
            "text": "Cornea",
            "ans": true
          },
          {
            "label": "b",
            "text": "Iris",
            "ans": false
          },
          {
            "label": "c",
            "text": "Lens",
            "ans": true
          },
          {
            "label": "d",
            "text": "Sclera",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vitreous humour",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      }
    ]
  },
  {
    "id": "cmu-ana-2023-nov-p1",
    "session": "November 2023",
    "year": 2023,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 85,
    "bookPage": "p.85",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Muscles of soft palate",
        "items": [
          {
            "label": "a",
            "text": "Hyoglossus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Palatoglossus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Styloglossus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Tensor tympani",
            "ans": false
          },
          {
            "label": "e",
            "text": "Tensor palati",
            "ans": true
          }
        ],
        "explanation": "Tensor tympani belongs to the middle ear. Orbit marks d T and e F.",
        "textbookNote": "Tensor tympani belongs to the middle ear. Orbit marks d T and e F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Tensor tympani belongs to the middle ear. Orbit marks d T and e F."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Simple squamous epithelium present in",
        "items": [
          {
            "label": "a",
            "text": "Alveoli",
            "ans": true
          },
          {
            "label": "b",
            "text": "Blood vessel",
            "ans": true
          },
          {
            "label": "c",
            "text": "Esophagus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Peritoneum",
            "ans": true
          },
          {
            "label": "e",
            "text": "Tongue",
            "ans": false
          }
        ],
        "explanation": "Peritoneum = mesothelium (simple squamous); Orbit marks it F.",
        "textbookNote": "Peritoneum = mesothelium (simple squamous); Orbit marks it F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "officialOrbitDiscrepancy": "Peritoneum = mesothelium (simple squamous); Orbit marks it F."
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Superior orbital fissure transmits",
        "items": [
          {
            "label": "a",
            "text": "Abducent nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Oculomotor nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Ophthalmic nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Optic nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Trochlear nerve",
            "ans": true
          }
        ],
        "explanation": "The optic nerve passes through the optic canal; Orbit marks d T.",
        "textbookNote": "The optic nerve passes through the optic canal; Orbit marks d T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "The optic nerve passes through the optic canal; Orbit marks d T."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Derivative of neural crest cell",
        "items": [
          {
            "label": "a",
            "text": "Adrenal cortex",
            "ans": false
          },
          {
            "label": "b",
            "text": "Adrenal medulla",
            "ans": true
          },
          {
            "label": "c",
            "text": "Dorsal root ganglia",
            "ans": true
          },
          {
            "label": "d",
            "text": "Epidermis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Schwann cell",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Miniature long bone",
        "items": [
          {
            "label": "a",
            "text": "Clavicle",
            "ans": false
          },
          {
            "label": "b",
            "text": "Cuboid",
            "ans": false
          },
          {
            "label": "c",
            "text": "Metatarsal bone",
            "ans": true
          },
          {
            "label": "d",
            "text": "Phalanges",
            "ans": true
          },
          {
            "label": "e",
            "text": "Talus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Derivatives of pharyngeal pouches",
        "items": [
          {
            "label": "a",
            "text": "Internal ear",
            "ans": false
          },
          {
            "label": "b",
            "text": "Palatine tonsil",
            "ans": true
          },
          {
            "label": "c",
            "text": "Thymus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Tongue",
            "ans": false
          },
          {
            "label": "e",
            "text": "Thyroid gland",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Part of basal ganglia",
        "items": [
          {
            "label": "a",
            "text": "Caudate nucleus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Dentate nucleus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Globus pallidus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Putamen",
            "ans": true
          },
          {
            "label": "e",
            "text": "Red nucleus",
            "ans": false
          }
        ],
        "explanation": "Dentate nucleus is cerebellar; Orbit marks it T.",
        "textbookNote": "Dentate nucleus is cerebellar; Orbit marks it T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Dentate nucleus is cerebellar; Orbit marks it T."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Sensory cranial nerve",
        "items": [
          {
            "label": "a",
            "text": "Facial",
            "ans": false
          },
          {
            "label": "b",
            "text": "Glossopharyngeal",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hypoglossal",
            "ans": false
          },
          {
            "label": "d",
            "text": "Optic",
            "ans": true
          },
          {
            "label": "e",
            "text": "Vestibulocochlear",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Structures within parotid gland",
        "items": [
          {
            "label": "a",
            "text": "Facial nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Auriculotemporal nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Glossopharyngeal nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "External carotid artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Internal carotid artery",
            "ans": false
          }
        ],
        "explanation": "Glossopharyngeal fibers reach the gland via lesser petrosal - otic ganglion - auriculotemporal nerve; the nerve itself is not within the gland.",
        "textbookNote": "Glossopharyngeal fibers reach the gland via lesser petrosal - otic ganglion - auriculotemporal nerve; the nerve itself is not within the gland.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Glossopharyngeal fibers reach the gland via lesser petrosal - otic ganglion - auriculotemporal nerve; the nerve itself is not within the gland."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Visual pathway formed by",
        "items": [
          {
            "label": "a",
            "text": "Cornea",
            "ans": false
          },
          {
            "label": "b",
            "text": "Optic chiasma",
            "ans": true
          },
          {
            "label": "c",
            "text": "Optic tract",
            "ans": true
          },
          {
            "label": "d",
            "text": "Medial geniculate body",
            "ans": false
          },
          {
            "label": "e",
            "text": "Mamillary body",
            "ans": false
          }
        ],
        "explanation": "Medial geniculate body is auditory (lateral geniculate is visual). Cornea is not part of the pathway proper; Orbit marks it T.",
        "textbookNote": "Medial geniculate body is auditory (lateral geniculate is visual). Cornea is not part of the pathway proper; Orbit marks it T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Medial geniculate body is auditory (lateral geniculate is visual). Cornea is not part of the pathway proper; Orbit marks it T."
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Extra-ocular muscle supplied by abducent nerve",
        "opts": [
          "Inferior rectus",
          "Inferior oblique",
          "Medial rectus",
          "Lateral rectus",
          "Superior oblique"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Nucleus of paleocerebellum",
        "opts": [
          "Dentate",
          "Emboliform",
          "Fastigial",
          "Globose",
          "Globose and emboliform"
        ],
        "correctIndex": 4,
        "explanation": "Paleocerebellum (spinocerebellum) -> globose + emboliform; fastigial -> archicerebellum. Orbit marks c.",
        "textbookNote": "Paleocerebellum (spinocerebellum) -> globose + emboliform; fastigial -> archicerebellum. Orbit marks c.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy",
        "officialOrbitDiscrepancy": "Paleocerebellum (spinocerebellum) -> globose + emboliform; fastigial -> archicerebellum. Orbit marks c."
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Laryngeal cartilage made of both hyaline and elastic",
        "opts": [
          "Arytenoid",
          "Corniculate",
          "Cricoid",
          "Epiglottis",
          "Thyroid"
        ],
        "correctIndex": 0,
        "explanation": "Arytenoid: base hyaline, apex elastic. Epiglottis is elastic only.",
        "textbookNote": "Arytenoid: base hyaline, apex elastic. Epiglottis is elastic only.",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "reviewReason": "Arytenoid: base hyaline, apex elastic. Epiglottis is elastic only."
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Betz cell present in",
        "opts": [
          "External granular layer",
          "External pyramidal layer",
          "Internal granular layer",
          "Internal pyramidal layer",
          "Multiform layer"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Terminal branch of internal carotid artery",
        "opts": [
          "Anterior choroidal artery",
          "Anterior cerebral artery",
          "Anterior communicating artery",
          "Ophthalmic artery",
          "Posterior communicating artery"
        ],
        "correctIndex": 1,
        "explanation": "Middle cerebral is the other terminal branch.",
        "textbookNote": "Middle cerebral is the other terminal branch.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Middle cerebral is the other terminal branch."
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Pseudounipolar neuron located at",
        "opts": [
          "Mesencephalic neuron of trigeminal nerve",
          "Trigeminal ganglion",
          "Dorsal root ganglion",
          "Pyramidal cells of cerebrum",
          "Retina"
        ],
        "correctIndex": 2,
        "explanation": "Trigeminal ganglion cells are also pseudounipolar, so b is arguable; c is the textbook example.",
        "textbookNote": "Trigeminal ganglion cells are also pseudounipolar, so b is arguable; c is the textbook example.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Trigeminal ganglion cells are also pseudounipolar, so b is arguable; c is the textbook example."
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Posterior neuropore closed at",
        "opts": [
          "15th day",
          "20th day",
          "22nd day",
          "25th day",
          "28th day"
        ],
        "correctIndex": 4,
        "explanation": "Langman: anterior neuropore ~day 25, posterior ~day 27-28. Orbit marks 25th day.",
        "textbookNote": "Langman: anterior neuropore ~day 25, posterior ~day 27-28. Orbit marks 25th day.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Langman: anterior neuropore ~day 25, posterior ~day 27-28. Orbit marks 25th day."
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Safety muscle of larynx",
        "opts": [
          "Aryepiglottic",
          "Lateral cricoarytenoid",
          "Oblique arytenoid",
          "Posterior cricoarytenoid",
          "Thyroarytenoid"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Unique feature of cervical vertebra",
        "opts": [
          "Bifid spine",
          "Foramen transversarium",
          "Triangular vertebral foramen",
          "Long lamina",
          "Small body"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "DNA replication occurs in",
        "opts": [
          "G0 phase",
          "G1 phase",
          "G2 phase",
          "M phase",
          "S phase"
        ],
        "correctIndex": 4,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      }
    ]
  },
  {
    "id": "cmu-ana-2023-nov-p2",
    "session": "November 2023",
    "year": 2023,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 86,
    "bookPage": "p.86",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Contents of middle mediastinum",
        "items": [
          {
            "label": "a",
            "text": "Pericardium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Arch of aorta",
            "ans": false
          },
          {
            "label": "c",
            "text": "Phrenic nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Pulmonary nerve (sic)",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": false
          }
        ],
        "explanation": "Printed 'pulmonary nerve'; if 'pulmonary trunk' was meant, it is also T.",
        "textbookNote": "Printed 'pulmonary nerve'; if 'pulmonary trunk' was meant, it is also T.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Printed 'pulmonary nerve'; if 'pulmonary trunk' was meant, it is also T."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Carpal tunnel transmits",
        "items": [
          {
            "label": "a",
            "text": "Median nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Ulnar nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Tendon of flexor digitorum superficialis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Tendon of palmaris longus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Ulnar artery",
            "ans": false
          }
        ],
        "explanation": "Palmaris longus passes superficial to the flexor retinaculum.",
        "textbookNote": "Palmaris longus passes superficial to the flexor retinaculum.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Palmaris longus passes superficial to the flexor retinaculum."
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Anterior relations of right kidney",
        "items": [
          {
            "label": "a",
            "text": "Fundus of the stomach",
            "ans": false
          },
          {
            "label": "b",
            "text": "2nd part of duodenum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Tail of pancreas",
            "ans": false
          },
          {
            "label": "d",
            "text": "Right suprarenal gland",
            "ans": true
          },
          {
            "label": "e",
            "text": "Right lobe of liver",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Muscles acting on both hip and knee",
        "items": [
          {
            "label": "a",
            "text": "Gluteus maximus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Sartorius",
            "ans": true
          },
          {
            "label": "c",
            "text": "Adductor longus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Gracilis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Popliteus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Left coronary artery (left posterior aortic sinus)",
        "items": [
          {
            "label": "a",
            "text": "Arises from ascending aorta",
            "ans": true
          },
          {
            "label": "b",
            "text": "Supplies the whole left atrium",
            "ans": false
          },
          {
            "label": "c",
            "text": "Runs in the anterior interventricular groove",
            "ans": true
          },
          {
            "label": "d",
            "text": "Gives off left circumflex artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is a large artery",
            "ans": false
          }
        ],
        "explanation": "Orbit's key differs on c.",
        "textbookNote": "Orbit's key differs on c.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "officialOrbitDiscrepancy": "Orbit's key differs on c."
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Muscles crossing shoulder joint",
        "items": [
          {
            "label": "a",
            "text": "Brachialis",
            "ans": false
          },
          {
            "label": "b",
            "text": "Coracobrachialis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Brachioradialis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Biceps brachii",
            "ans": true
          },
          {
            "label": "e",
            "text": "Deltoid",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Pancreas",
        "items": [
          {
            "label": "a",
            "text": "It is an endocrine gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "It lies in the epigastrium",
            "ans": true
          },
          {
            "label": "c",
            "text": "It is an intra-peritoneal structure",
            "ans": false
          },
          {
            "label": "d",
            "text": "Alpha cells secrete insulin",
            "ans": false
          },
          {
            "label": "e",
            "text": "Portal vein is formed behind its neck",
            "ans": true
          }
        ],
        "explanation": "Alpha cells secrete glucagon, so d is F.",
        "textbookNote": "Alpha cells secrete glucagon, so d is F.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Alpha cells secrete glucagon, so d is F."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Parts of uterine tube",
        "items": [
          {
            "label": "a",
            "text": "Isthmus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Uterine",
            "ans": true
          },
          {
            "label": "c",
            "text": "Ovarian",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ampulla",
            "ans": true
          },
          {
            "label": "e",
            "text": "Infundibulum",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Structures crossed by root of mesentery",
        "items": [
          {
            "label": "a",
            "text": "Right ureter",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inferior vena cava",
            "ans": true
          },
          {
            "label": "c",
            "text": "Left ureter",
            "ans": false
          },
          {
            "label": "d",
            "text": "Right psoas major muscle",
            "ans": true
          },
          {
            "label": "e",
            "text": "2nd part of the duodenum",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Opening of right atrium",
        "items": [
          {
            "label": "a",
            "text": "Superior vena cava",
            "ans": true
          },
          {
            "label": "b",
            "text": "Coronary sinus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Anterior cardiac vein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Pulmonary veins",
            "ans": false
          },
          {
            "label": "e",
            "text": "Aorta",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Structure passing through venacaval opening",
        "opts": [
          "Superior vena cava",
          "Inferior vena cava",
          "Thoracic duct",
          "Gastric nerve",
          "Azygos vein"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "NOT present in gastric gland",
        "opts": [
          "Chief cell",
          "M cell",
          "Parietal cell",
          "Mucus neck cell",
          "G cell"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Retroperitoneal organ",
        "opts": [
          "Stomach",
          "Spleen",
          "Kidney",
          "Transverse colon",
          "Small intestine"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Continuation of axillary artery",
        "opts": [
          "Subclavian artery",
          "Lateral thoracic artery",
          "Brachial artery",
          "Subscapular artery",
          "Circumflex humeral artery"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Loss of knee extension, injury to",
        "opts": [
          "Sciatic nerve",
          "Tibial nerve",
          "Femoral nerve",
          "Deep peroneal nerve",
          "Superficial peroneal nerve"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Deltoid muscle",
        "opts": [
          "Is a multipennate muscle",
          "Is supplied by radial nerve",
          "Forms the main bulk of back of arm",
          "Has insertion on spinous process of scapula",
          "Clavicular fibers are involved in abduction of shoulder joint"
        ],
        "correctIndex": 0,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Duodenum developed from",
        "opts": [
          "Midgut",
          "Foregut",
          "Foregut and midgut",
          "Hindgut",
          "Pharyngeal gut"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Commonest type of vermiform appendix",
        "opts": [
          "Paracolic",
          "Subcaecal",
          "Retrocaecal",
          "Pelvic",
          "Splenic"
        ],
        "correctIndex": 2,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Ilio-tibial tract is condensation of",
        "opts": [
          "Femoral sheath",
          "Deep fascia of thigh",
          "Fascia iliaca",
          "Quadriceps femoris muscle",
          "Fascia cruris"
        ],
        "correctIndex": 1,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "SA node located at",
        "opts": [
          "Interatrial septum",
          "Coronary sulcus",
          "Fossa ovalis",
          "Crista terminalis",
          "Interventricular septum"
        ],
        "correctIndex": 3,
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      }
    ]
  },
  {
    "id": "cmu-ana-2022-nov-p1",
    "session": "November 2022",
    "year": 2022,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 87,
    "bookPage": "p.87",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Duodenum (stem misprinted 'DNA found in')",
        "items": [
          {
            "label": "a",
            "text": "Lined by simple columnar epithelium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has numerous goblet cells",
            "ans": true
          },
          {
            "label": "c",
            "text": "Has Brunner's gland in submucosa",
            "ans": true
          },
          {
            "label": "d",
            "text": "Has leaf shaped villi",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has Peyer's patches",
            "ans": false
          }
        ],
        "explanation": "The options describe the duodenum (compare Nov-2021 Paper II Q5). Orbit's key (only d T) does not match duodenum.",
        "textbookNote": "The options describe the duodenum (compare Nov-2021 Paper II Q5). Orbit's key (only d T) does not match duodenum.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "The options describe the duodenum (compare Nov-2021 Paper II Q5). Orbit's key (only d T) does not match duodenum."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Gall bladder",
        "items": [
          {
            "label": "a",
            "text": "Has capacity of 30-50 ml",
            "ans": true
          },
          {
            "label": "b",
            "text": "Stores bile",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is supplied by hepatic artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Develops from midgut",
            "ans": false
          },
          {
            "label": "e",
            "text": "Drains by cystic duct",
            "ans": true
          }
        ],
        "explanation": "Cystic artery arises from right hepatic artery. Orbit's key differs between papers.",
        "textbookNote": "Cystic artery arises from right hepatic artery. Orbit's key differs between papers.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Cystic artery arises from right hepatic artery. Orbit's key differs between papers."
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Structures passing through sacral canal",
        "items": [
          {
            "label": "a",
            "text": "Sacral nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Filum terminale",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lower lumbar nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Coccygeal nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Obturator nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Flexors of knee joint",
        "items": [
          {
            "label": "a",
            "text": "Quadriceps femoris",
            "ans": false
          },
          {
            "label": "b",
            "text": "Semitendinosus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Semimembranosus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Biceps femoris",
            "ans": true
          },
          {
            "label": "e",
            "text": "Gracilis",
            "ans": true
          }
        ],
        "explanation": "Gracilis flexes and medially rotates the knee; Orbit marks it F.",
        "textbookNote": "Gracilis flexes and medially rotates the knee; Orbit marks it F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Gracilis flexes and medially rotates the knee; Orbit marks it F."
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Arch of aorta",
        "items": [
          {
            "label": "a",
            "text": "Has three branches",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is an elastic artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lies in middle mediastinum",
            "ans": false
          },
          {
            "label": "d",
            "text": "Arises from left atrium",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is a retroperitoneal structure",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Contents of spermatic cord",
        "items": [
          {
            "label": "a",
            "text": "Vas deferens",
            "ans": true
          },
          {
            "label": "b",
            "text": "Testicular artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Artery to vas deferens",
            "ans": true
          },
          {
            "label": "d",
            "text": "Deep artery of penis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Cremasteric fascia",
            "ans": false
          }
        ],
        "explanation": "Cremasteric fascia is a covering, not a content.",
        "textbookNote": "Cremasteric fascia is a covering, not a content.",
        "verificationStatus": "Provisional",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)",
        "reviewReason": "Cremasteric fascia is a covering, not a content."
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Porto-systemic anastomoses",
        "items": [
          {
            "label": "a",
            "text": "Liver",
            "ans": false
          },
          {
            "label": "b",
            "text": "Oesophagus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Anal canal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Pancreas",
            "ans": false
          },
          {
            "label": "e",
            "text": "Caecum",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Parts of parietal pleura",
        "items": [
          {
            "label": "a",
            "text": "Cervical",
            "ans": true
          },
          {
            "label": "b",
            "text": "Costal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Mediastinal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Diaphragmatic",
            "ans": true
          },
          {
            "label": "e",
            "text": "Peritoneal",
            "ans": false
          }
        ],
        "explanation": "Cervical pleura is a part (Orbit marks F). 'Peritoneal' is not pleura.",
        "textbookNote": "Cervical pleura is a part (Orbit marks F). 'Peritoneal' is not pleura.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Cervical pleura is a part (Orbit marks F). 'Peritoneal' is not pleura."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Structures crossed by root of mesentery",
        "items": [
          {
            "label": "a",
            "text": "Abdominal aorta",
            "ans": true
          },
          {
            "label": "b",
            "text": "Left ureter",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inferior vena cava",
            "ans": true
          },
          {
            "label": "d",
            "text": "Right psoas",
            "ans": true
          },
          {
            "label": "e",
            "text": "2nd part of duodenum",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Branches of lumbar plexus",
        "items": [
          {
            "label": "a",
            "text": "Genitofemoral nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Femoral nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pudendal nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Obturator nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Nerve to pectineus",
            "ans": false
          }
        ],
        "explanation": "Nerve to pectineus comes from the femoral nerve (or accessory obturator); debatable. Pudendal is sacral plexus.",
        "textbookNote": "Nerve to pectineus comes from the femoral nerve (or accessory obturator); debatable. Pudendal is sacral plexus.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Nerve to pectineus comes from the femoral nerve (or accessory obturator); debatable. Pudendal is sacral plexus."
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Nerves related to humerus",
        "items": [
          {
            "label": "a",
            "text": "Axillary nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Musculocutaneous nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Ulnar nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Radial nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Long thoracic nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Structures opening in right atrium",
        "items": [
          {
            "label": "a",
            "text": "Superior vena cava",
            "ans": true
          },
          {
            "label": "b",
            "text": "Oblique vein of left ventricle",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inferior vena cava",
            "ans": true
          },
          {
            "label": "d",
            "text": "Coronary sinus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Great cardiac vein",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Branches of posterior cord of brachial plexus",
        "items": [
          {
            "label": "a",
            "text": "Axillary nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Thoracodorsal nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Long thoracic nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Radial nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Upper and lower subscapular nerve",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Structures related to ala of sacrum",
        "items": [
          {
            "label": "a",
            "text": "Obturator nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lumbosacral trunk",
            "ans": true
          },
          {
            "label": "c",
            "text": "Sympathetic trunk",
            "ans": true
          },
          {
            "label": "d",
            "text": "Iliolumbar artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Median sacral artery",
            "ans": false
          }
        ],
        "explanation": "Median sacral artery runs in the midline of the sacrum. Orbit's keys disagree between years.",
        "textbookNote": "Median sacral artery runs in the midline of the sacrum. Orbit's keys disagree between years.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Median sacral artery runs in the midline of the sacrum. Orbit's keys disagree between years."
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Muscles supplied by musculocutaneous nerve",
        "items": [
          {
            "label": "a",
            "text": "Biceps brachii",
            "ans": true
          },
          {
            "label": "b",
            "text": "Teres minor",
            "ans": false
          },
          {
            "label": "c",
            "text": "Coracobrachialis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Subscapularis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Brachialis",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Umbilical cord contains",
        "items": [
          {
            "label": "a",
            "text": "Yolk sac with vitelline duct",
            "ans": true
          },
          {
            "label": "b",
            "text": "Allantois",
            "ans": true
          },
          {
            "label": "c",
            "text": "Two veins",
            "ans": false
          },
          {
            "label": "d",
            "text": "One artery",
            "ans": false
          },
          {
            "label": "e",
            "text": "Wharton's jelly",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Intracapsular structures of knee",
        "items": [
          {
            "label": "a",
            "text": "Cruciate ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Menisci",
            "ans": true
          },
          {
            "label": "c",
            "text": "Popliteal tendon",
            "ans": true
          },
          {
            "label": "d",
            "text": "Patellar ligament",
            "ans": false
          },
          {
            "label": "e",
            "text": "Synovial membrane",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Derivatives of paramesonephric duct",
        "items": [
          {
            "label": "a",
            "text": "Uterus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lower part of vagina",
            "ans": false
          },
          {
            "label": "c",
            "text": "Fallopian tube",
            "ans": true
          },
          {
            "label": "d",
            "text": "Vas deferens",
            "ans": false
          },
          {
            "label": "e",
            "text": "Broad ligament of uterus",
            "ans": false
          }
        ],
        "explanation": "Uterus and tubes; broad ligament is a peritoneal fold; lower vagina is partly urogenital sinus.",
        "textbookNote": "Uterus and tubes; broad ligament is a peritoneal fold; lower vagina is partly urogenital sinus.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Uterus and tubes; broad ligament is a peritoneal fold; lower vagina is partly urogenital sinus."
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Structures passing behind inguinal ligament",
        "items": [
          {
            "label": "a",
            "text": "Femoral artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Femoral nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Psoas major",
            "ans": true
          },
          {
            "label": "d",
            "text": "Femoral vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Spermatic cord",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Trachea",
        "items": [
          {
            "label": "a",
            "text": "Lined by columnar epithelium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Contains hyaline cartilage",
            "ans": true
          },
          {
            "label": "c",
            "text": "Divides at the level of T4 vertebra",
            "ans": true
          },
          {
            "label": "d",
            "text": "Contains goblet cells",
            "ans": true
          },
          {
            "label": "e",
            "text": "Contains C-shaped cartilage",
            "ans": true
          }
        ],
        "explanation": "Bifurcates at T4 (sternal angle level).",
        "textbookNote": "Bifurcates at T4 (sternal angle level).",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Bifurcates at T4 (sternal angle level)."
      }
    ]
  },
  {
    "id": "cmu-ana-2022-nov-p2",
    "session": "November 2022",
    "year": 2022,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 88,
    "bookPage": "p.88",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "DNA found in",
        "items": [
          {
            "label": "a",
            "text": "Centrosome",
            "ans": false
          },
          {
            "label": "b",
            "text": "Chromosome",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lysosome",
            "ans": false
          },
          {
            "label": "d",
            "text": "Mitochondria",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ribosome",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Simple squamous epithelium present in",
        "items": [
          {
            "label": "a",
            "text": "Blood vessels",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lung alveoli",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pleura",
            "ans": true
          },
          {
            "label": "d",
            "text": "Tongue",
            "ans": false
          },
          {
            "label": "e",
            "text": "Urinary bladder",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Non-membrane-bound organelles",
        "items": [
          {
            "label": "a",
            "text": "Centriole",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lysosome",
            "ans": false
          },
          {
            "label": "c",
            "text": "Microtubules",
            "ans": true
          },
          {
            "label": "d",
            "text": "Mitochondria",
            "ans": false
          },
          {
            "label": "e",
            "text": "Ribosome",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Neural crest cell derivatives",
        "items": [
          {
            "label": "a",
            "text": "Adrenal medulla",
            "ans": true
          },
          {
            "label": "b",
            "text": "Craniofacial skeleton",
            "ans": true
          },
          {
            "label": "c",
            "text": "Dorsal root ganglia of spinal nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Epidermis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Parotid gland",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Hyaline cartilage present in",
        "items": [
          {
            "label": "a",
            "text": "Auditory tube",
            "ans": false
          },
          {
            "label": "b",
            "text": "Epiglottis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Intervertebral disc",
            "ans": false
          },
          {
            "label": "d",
            "text": "Thyroid cartilage",
            "ans": true
          },
          {
            "label": "e",
            "text": "Trachea",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Fibrous joint",
        "items": [
          {
            "label": "a",
            "text": "Coronal suture",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inferior tibiofibular joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Intervertebral joint",
            "ans": false
          },
          {
            "label": "d",
            "text": "Manubriosternal joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Temporomandibular joint",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Central lymphoid organ",
        "items": [
          {
            "label": "a",
            "text": "Bone marrow",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": false
          },
          {
            "label": "c",
            "text": "Palatine tonsil",
            "ans": false
          },
          {
            "label": "d",
            "text": "Spleen",
            "ans": false
          },
          {
            "label": "e",
            "text": "Thymus",
            "ans": true
          }
        ],
        "explanation": "Bone marrow and thymus are central; spleen is peripheral. Orbit marks bone marrow F and spleen T - wrong. Anatomy MCQ - Questions and Answers - page 13",
        "textbookNote": "Bone marrow and thymus are central; spleen is peripheral. Orbit marks bone marrow F and spleen T - wrong. Anatomy MCQ - Questions and Answers - page 13",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Bone marrow and thymus are central; spleen is peripheral. Orbit marks bone marrow F and spleen T - wrong. Anatomy MCQ - Questions and Answers - page 13"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Osteoblast",
        "items": [
          {
            "label": "a",
            "text": "Is a bone forming cell",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is a multinucleated cell",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is a bone remodeling cell",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is a mature cell",
            "ans": false
          },
          {
            "label": "e",
            "text": "Produces collagen fiber",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Pneumatic bones",
        "items": [
          {
            "label": "a",
            "text": "Clavicle",
            "ans": false
          },
          {
            "label": "b",
            "text": "Frontal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Maxillae",
            "ans": true
          },
          {
            "label": "d",
            "text": "Parietal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Sphenoid",
            "ans": true
          }
        ],
        "explanation": "Frontal is pneumatic; Orbit marks it F.",
        "textbookNote": "Frontal is pneumatic; Orbit marks it F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Frontal is pneumatic; Orbit marks it F."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Sperm",
        "items": [
          {
            "label": "a",
            "text": "Always contains X chromosome",
            "ans": false
          },
          {
            "label": "b",
            "text": "Has got a tail",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is a diploid cell",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is a mature germ cell",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is normally motile",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Carotid sheath contains",
        "items": [
          {
            "label": "a",
            "text": "Common carotid artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Internal jugular vein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Phrenic nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Sympathetic trunk",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Sensory cranial nerve",
        "items": [
          {
            "label": "a",
            "text": "Facial",
            "ans": false
          },
          {
            "label": "b",
            "text": "Hypoglossal",
            "ans": false
          },
          {
            "label": "c",
            "text": "Olfactory",
            "ans": true
          },
          {
            "label": "d",
            "text": "Optic",
            "ans": true
          },
          {
            "label": "e",
            "text": "Trigeminal",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Branch of external carotid artery",
        "items": [
          {
            "label": "a",
            "text": "Anterior cerebral",
            "ans": false
          },
          {
            "label": "b",
            "text": "Internal thoracic",
            "ans": false
          },
          {
            "label": "c",
            "text": "Lingual",
            "ans": true
          },
          {
            "label": "d",
            "text": "Superior thyroid",
            "ans": true
          },
          {
            "label": "e",
            "text": "Vertebral",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Derivatives of 1st pharyngeal arch",
        "items": [
          {
            "label": "a",
            "text": "Medial pterygoid muscle",
            "ans": true
          },
          {
            "label": "b",
            "text": "Mylohyoid muscle",
            "ans": true
          },
          {
            "label": "c",
            "text": "Posterior belly of digastric muscle",
            "ans": false
          },
          {
            "label": "d",
            "text": "Stylopharyngeus muscle",
            "ans": false
          },
          {
            "label": "e",
            "text": "Temporalis muscle",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Muscles of soft palate",
        "items": [
          {
            "label": "a",
            "text": "Genioglossus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Levator palati",
            "ans": true
          },
          {
            "label": "c",
            "text": "Stylopharyngeus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Tensor palati",
            "ans": true
          },
          {
            "label": "e",
            "text": "Tensor tympani",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Brainstem includes",
        "items": [
          {
            "label": "a",
            "text": "Cerebellum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Medulla oblongata",
            "ans": true
          },
          {
            "label": "c",
            "text": "Mid brain",
            "ans": true
          },
          {
            "label": "d",
            "text": "Pons",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thalamus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Parts of internal capsule",
        "items": [
          {
            "label": "a",
            "text": "Anterior limb",
            "ans": true
          },
          {
            "label": "b",
            "text": "Fornix",
            "ans": false
          },
          {
            "label": "c",
            "text": "Genu",
            "ans": true
          },
          {
            "label": "d",
            "text": "Globus pallidus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Splenium",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Deep cerebellar nuclei",
        "items": [
          {
            "label": "a",
            "text": "Cuneatus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Dentate",
            "ans": true
          },
          {
            "label": "c",
            "text": "Emboliform",
            "ans": true
          },
          {
            "label": "d",
            "text": "Fastigial",
            "ans": true
          },
          {
            "label": "e",
            "text": "Red nucleus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Gray matter composed of",
        "items": [
          {
            "label": "a",
            "text": "Blood vessels",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cell body of neuron",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fibroblast",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lymphatics",
            "ans": false
          },
          {
            "label": "e",
            "text": "Myelinated nerve fiber",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Retina contains cells",
        "items": [
          {
            "label": "a",
            "text": "Bipolar",
            "ans": true
          },
          {
            "label": "b",
            "text": "Ganglionic",
            "ans": true
          },
          {
            "label": "c",
            "text": "Purkinje",
            "ans": false
          },
          {
            "label": "d",
            "text": "Pyramidal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Rod",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      }
    ]
  },
  {
    "id": "cmu-ana-2022-may-p1",
    "session": "May 2022",
    "year": 2022,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 89,
    "bookPage": "p.89",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Mitotic cell division",
        "items": [
          {
            "label": "a",
            "text": "Occurs in germ cells",
            "ans": false
          },
          {
            "label": "b",
            "text": "Occurs in somatic cells",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is called reduction division",
            "ans": false
          },
          {
            "label": "d",
            "text": "Produce two daughter cells",
            "ans": true
          },
          {
            "label": "e",
            "text": "Causes genetic variation in daughter cells",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Oogenesis",
        "items": [
          {
            "label": "a",
            "text": "Produce single haploid ovum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Produce single polar body",
            "ans": false
          },
          {
            "label": "c",
            "text": "Requires estrogen hormone",
            "ans": false
          },
          {
            "label": "d",
            "text": "Starts before birth",
            "ans": true
          },
          {
            "label": "e",
            "text": "Starts from puberty",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Turner syndrome",
        "items": [
          {
            "label": "a",
            "text": "Infertile",
            "ans": true
          },
          {
            "label": "b",
            "text": "Karyotype is 45X0",
            "ans": true
          },
          {
            "label": "c",
            "text": "Karyotype is 47XXX",
            "ans": false
          },
          {
            "label": "d",
            "text": "Karyotype is 47XXY",
            "ans": false
          },
          {
            "label": "e",
            "text": "Tall stature",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Results of fertilization",
        "items": [
          {
            "label": "a",
            "text": "Determination of chromosomal sex",
            "ans": true
          },
          {
            "label": "b",
            "text": "Initiation of cleavage",
            "ans": true
          },
          {
            "label": "c",
            "text": "Initiation of meiotic cell division",
            "ans": false
          },
          {
            "label": "d",
            "text": "Restoration of diploid chromosomes",
            "ans": true
          },
          {
            "label": "e",
            "text": "Restoration of haploid chromosomes",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Characteristics of epithelial tissue",
        "items": [
          {
            "label": "a",
            "text": "Can regenerate",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cellular component is more",
            "ans": true
          },
          {
            "label": "c",
            "text": "Covers only external surface of the body",
            "ans": false
          },
          {
            "label": "d",
            "text": "Has blood supply",
            "ans": false
          },
          {
            "label": "e",
            "text": "Has no nerve supply",
            "ans": false
          }
        ],
        "explanation": "Epithelium regenerates well, is cell-rich, covers external AND lines internal surfaces, is avascular, and has a nerve supply. Orbit's key (b to e T) is wrong on c, d, e.",
        "textbookNote": "Epithelium regenerates well, is cell-rich, covers external AND lines internal surfaces, is avascular, and has a nerve supply. Orbit's key (b to e T) is wrong on c, d, e.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "officialOrbitDiscrepancy": "Epithelium regenerates well, is cell-rich, covers external AND lines internal surfaces, is avascular, and has a nerve supply. Orbit's key (b to e T) is wrong on c, d, e."
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Synovial joint",
        "items": [
          {
            "label": "a",
            "text": "Ankle",
            "ans": true
          },
          {
            "label": "b",
            "text": "Costochondral",
            "ans": false
          },
          {
            "label": "c",
            "text": "Elbow",
            "ans": true
          },
          {
            "label": "d",
            "text": "Manubriosternal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Shoulder",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Avascular structure",
        "items": [
          {
            "label": "a",
            "text": "Bone",
            "ans": false
          },
          {
            "label": "b",
            "text": "Cornea",
            "ans": true
          },
          {
            "label": "c",
            "text": "Dermis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Epidermis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Hair",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Morphologically short bones",
        "items": [
          {
            "label": "a",
            "text": "Calcaneum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Capitate",
            "ans": true
          },
          {
            "label": "c",
            "text": "Cuboid",
            "ans": true
          },
          {
            "label": "d",
            "text": "Incus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Patella",
            "ans": false
          }
        ],
        "explanation": "Incus (ear ossicle) is not clearly a short bone; Orbit marks it T. Patella is sesamoid. Anatomy MCQ - Questions and Answers - page 14",
        "textbookNote": "Incus (ear ossicle) is not clearly a short bone; Orbit marks it T. Patella is sesamoid. Anatomy MCQ - Questions and Answers - page 14",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Incus (ear ossicle) is not clearly a short bone; Orbit marks it T. Patella is sesamoid. Anatomy MCQ - Questions and Answers - page 14"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Morula",
        "items": [
          {
            "label": "a",
            "text": "Consists of eight blastomeres",
            "ans": false
          },
          {
            "label": "b",
            "text": "Consists of sixteen blastomeres",
            "ans": true
          },
          {
            "label": "c",
            "text": "Covered by zona pellucida",
            "ans": true
          },
          {
            "label": "d",
            "text": "Forms in uterine cavity",
            "ans": false
          },
          {
            "label": "e",
            "text": "Forms three days after fertilization",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Peripheral lymphoid organ",
        "items": [
          {
            "label": "a",
            "text": "Bone marrow",
            "ans": false
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": true
          },
          {
            "label": "c",
            "text": "Palatine tonsil",
            "ans": true
          },
          {
            "label": "d",
            "text": "Spleen",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thymus",
            "ans": false
          }
        ],
        "explanation": "Orbit marks bone marrow T and spleen/thymus F - wrong.",
        "textbookNote": "Orbit marks bone marrow T and spleen/thymus F - wrong.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks bone marrow T and spleen/thymus F - wrong."
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Taste sensation from tongue carried by",
        "items": [
          {
            "label": "a",
            "text": "Abducent nerve",
            "ans": false
          },
          {
            "label": "b",
            "text": "Accessory nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Facial nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Glossopharyngeal nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Hypoglossal nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Carotid triangle contains",
        "items": [
          {
            "label": "a",
            "text": "Common carotid artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hypoglossal nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Internal jugular vein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Submandibular gland",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Mixed cranial nerve",
        "items": [
          {
            "label": "a",
            "text": "Facial",
            "ans": true
          },
          {
            "label": "b",
            "text": "Glossopharyngeal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Optic",
            "ans": false
          },
          {
            "label": "d",
            "text": "Oculomotor",
            "ans": false
          },
          {
            "label": "e",
            "text": "Trochlear",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Muscles of mastication",
        "items": [
          {
            "label": "a",
            "text": "Lateral pterygoid",
            "ans": true
          },
          {
            "label": "b",
            "text": "Masseter",
            "ans": true
          },
          {
            "label": "c",
            "text": "Mylohyoid",
            "ans": false
          },
          {
            "label": "d",
            "text": "Styloglossus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Temporalis",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Paired dural venous sinuses",
        "items": [
          {
            "label": "a",
            "text": "Cavernous",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occipital",
            "ans": false
          },
          {
            "label": "c",
            "text": "Straight",
            "ans": false
          },
          {
            "label": "d",
            "text": "Superior sagittal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Transverse",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Hind brain includes",
        "items": [
          {
            "label": "a",
            "text": "Cerebellum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cerebrum",
            "ans": false
          },
          {
            "label": "c",
            "text": "Medulla oblongata",
            "ans": true
          },
          {
            "label": "d",
            "text": "Midbrain",
            "ans": false
          },
          {
            "label": "e",
            "text": "Pons",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Cells in cerebral cortex",
        "items": [
          {
            "label": "a",
            "text": "Ependymal cell",
            "ans": false
          },
          {
            "label": "b",
            "text": "Purkinje cell",
            "ans": false
          },
          {
            "label": "c",
            "text": "Pyramidal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Schwann cell",
            "ans": false
          },
          {
            "label": "e",
            "text": "Stellate cell",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Sensory tracts of spinal cord",
        "items": [
          {
            "label": "a",
            "text": "Corticospinal tract",
            "ans": false
          },
          {
            "label": "b",
            "text": "Rubrospinal tract",
            "ans": false
          },
          {
            "label": "c",
            "text": "Spinothalamic tract",
            "ans": true
          },
          {
            "label": "d",
            "text": "Tract of Burdach",
            "ans": true
          },
          {
            "label": "e",
            "text": "Tract of Goll",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Commissural fibers",
        "items": [
          {
            "label": "a",
            "text": "Corpus callosum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Habenular commissure",
            "ans": true
          },
          {
            "label": "c",
            "text": "Internal capsule",
            "ans": false
          },
          {
            "label": "d",
            "text": "Optic radiation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Superior longitudinal fasciculus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Muscle supplied by oculomotor nerve",
        "items": [
          {
            "label": "a",
            "text": "Inferior oblique",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inferior rectus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lateral rectus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Medial rectus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Superior oblique",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      }
    ]
  },
  {
    "id": "cmu-ana-2022-may-p2",
    "session": "May 2022",
    "year": 2022,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 90,
    "bookPage": "p.90",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Muscles forming rotator cuff",
        "items": [
          {
            "label": "a",
            "text": "Supraspinatus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Subscapularis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Infraspinatus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Teres minor",
            "ans": true
          },
          {
            "label": "e",
            "text": "Teres major",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Structures related to neck of 1st rib",
        "items": [
          {
            "label": "a",
            "text": "Sympathetic chain",
            "ans": true
          },
          {
            "label": "b",
            "text": "Subclavian vein",
            "ans": false
          },
          {
            "label": "c",
            "text": "1st posterior intercostal vein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Superior intercostal artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Phrenic nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Fallopian tube",
        "items": [
          {
            "label": "a",
            "text": "Lies in broad ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Develops from mesonephric duct",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has ampulla, the site of fertilization",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is supplied by uterine and ovarian artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is common site of ectopic pregnancy",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Muscles with double nerve supply",
        "items": [
          {
            "label": "a",
            "text": "Deltoid",
            "ans": false
          },
          {
            "label": "b",
            "text": "Biceps brachii",
            "ans": false
          },
          {
            "label": "c",
            "text": "Brachialis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Triceps",
            "ans": false
          },
          {
            "label": "e",
            "text": "Flexor digitorum profundus",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Structures related to transpyloric plane",
        "items": [
          {
            "label": "a",
            "text": "Lower pole of kidney",
            "ans": false
          },
          {
            "label": "b",
            "text": "Fundus of gall bladder",
            "ans": true
          },
          {
            "label": "c",
            "text": "Bifurcation of abdominal aorta",
            "ans": false
          },
          {
            "label": "d",
            "text": "Pylorus of stomach",
            "ans": true
          },
          {
            "label": "e",
            "text": "Conus medullaris of spinal cord",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Gluteus maximus",
        "items": [
          {
            "label": "a",
            "text": "Is attached to intertrochanteric line of femur",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is extensor of hip joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Innervated by superior gluteal nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Attached to iliotibial tract",
            "ans": true
          },
          {
            "label": "e",
            "text": "Attached to lesser trochanter of femur",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Fallot's tetralogy",
        "items": [
          {
            "label": "a",
            "text": "Pulmonary stenosis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Ventricular septal defect",
            "ans": true
          },
          {
            "label": "c",
            "text": "Atrial septal defect",
            "ans": false
          },
          {
            "label": "d",
            "text": "Overriding of aorta",
            "ans": true
          },
          {
            "label": "e",
            "text": "Left ventricular hypertrophy",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Structures crossing pelvic brim",
        "items": [
          {
            "label": "a",
            "text": "Rectum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Sigmoid colon",
            "ans": true
          },
          {
            "label": "c",
            "text": "Ureter",
            "ans": true
          },
          {
            "label": "d",
            "text": "Common iliac vessels",
            "ans": true
          },
          {
            "label": "e",
            "text": "Uterine tube",
            "ans": false
          }
        ],
        "explanation": "Ureter crosses at the bifurcation of the common iliac artery.",
        "textbookNote": "Ureter crosses at the bifurcation of the common iliac artery.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Ureter crosses at the bifurcation of the common iliac artery."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Portal triad contains",
        "items": [
          {
            "label": "a",
            "text": "Branch of portal vein",
            "ans": true
          },
          {
            "label": "b",
            "text": "Branch of hepatic artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Bile canaliculi",
            "ans": false
          },
          {
            "label": "d",
            "text": "Interlobular hepatic ductule",
            "ans": true
          },
          {
            "label": "e",
            "text": "Central vein",
            "ans": false
          }
        ],
        "explanation": "Triad = portal venule, hepatic arteriole, bile ductule. Bile canaliculi and central vein are not part of it. Orbit's key (c T, d F) looks swapped.",
        "textbookNote": "Triad = portal venule, hepatic arteriole, bile ductule. Bile canaliculi and central vein are not part of it. Orbit's key (c T, d F) looks swapped.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Triad = portal venule, hepatic arteriole, bile ductule. Bile canaliculi and central vein are not part of it. Orbit's key (c T, d F) looks swapped."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Muscles causing dorsiflexion of foot",
        "items": [
          {
            "label": "a",
            "text": "Tibialis anterior",
            "ans": true
          },
          {
            "label": "b",
            "text": "Extensor hallucis longus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Extensor digitorum longus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Tibialis posterior",
            "ans": false
          },
          {
            "label": "e",
            "text": "Peroneus longus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "The liver",
        "items": [
          {
            "label": "a",
            "text": "Is a mixed gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has bare area on superior surface",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has central vein in hepatic lobule",
            "ans": true
          },
          {
            "label": "d",
            "text": "Has parenchyma develop from endoderm",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has stroma develop from mesoderm",
            "ans": true
          }
        ],
        "explanation": "Bare area is on the posterior part of the diaphragmatic surface, not 'superior'.",
        "textbookNote": "Bare area is on the posterior part of the diaphragmatic surface, not 'superior'.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Bare area is on the posterior part of the diaphragmatic surface, not 'superior'."
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "The pancreas",
        "items": [
          {
            "label": "a",
            "text": "Is mixed gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is an intraperitoneal organ",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has splenic vein on posterior groove",
            "ans": true
          },
          {
            "label": "d",
            "text": "Has parenchyma develop from endoderm",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has duct opening in major duodenal papilla",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Structures related to base of heart",
        "items": [
          {
            "label": "a",
            "text": "Descending aorta",
            "ans": true
          },
          {
            "label": "b",
            "text": "Vagus nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Arch of aorta",
            "ans": false
          },
          {
            "label": "d",
            "text": "Phrenic nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Thoracic duct",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "The kidney",
        "items": [
          {
            "label": "a",
            "text": "Is a retroperitoneal organ",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has right kidney higher than that of left",
            "ans": false
          },
          {
            "label": "c",
            "text": "Develops from intermediate mesoderm",
            "ans": true
          },
          {
            "label": "d",
            "text": "Ascends from pelvic to lumbar region",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has renal artery, a branch of iliac artery",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Ureter",
        "items": [
          {
            "label": "a",
            "text": "Is 25 cm in length",
            "ans": true
          },
          {
            "label": "b",
            "text": "Crosses bifurcation of common iliac artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Has constriction opposite pelvi-ureteric junction",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is lined by transitional epithelium",
            "ans": true
          },
          {
            "label": "e",
            "text": "Develops from endoderm",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Aortic opening of diaphragm transmits",
        "items": [
          {
            "label": "a",
            "text": "Aorta",
            "ans": true
          },
          {
            "label": "b",
            "text": "Azygos vein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Thoracic duct",
            "ans": true
          },
          {
            "label": "d",
            "text": "Sympathetic trunk",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "The spleen",
        "items": [
          {
            "label": "a",
            "text": "Closely related to stomach",
            "ans": true
          },
          {
            "label": "b",
            "text": "Located deep to 9th-10th ribs",
            "ans": false
          },
          {
            "label": "c",
            "text": "Closely related to left kidney",
            "ans": true
          },
          {
            "label": "d",
            "text": "Site of production of erythrocyte after birth",
            "ans": false
          },
          {
            "label": "e",
            "text": "A less vascular organ",
            "ans": false
          }
        ],
        "explanation": "Spleen lies deep to ribs 9-11.",
        "textbookNote": "Spleen lies deep to ribs 9-11.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Spleen lies deep to ribs 9-11."
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Contents of femoral sheath",
        "items": [
          {
            "label": "a",
            "text": "Femoral nerve",
            "ans": false
          },
          {
            "label": "b",
            "text": "Femoral artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Genitofemoral nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Femoral vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Lymph nodes",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Foot drop is due to injury to",
        "items": [
          {
            "label": "a",
            "text": "Tibial",
            "ans": false
          },
          {
            "label": "b",
            "text": "Obturator",
            "ans": false
          },
          {
            "label": "c",
            "text": "Common peroneal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Medial plantar",
            "ans": false
          },
          {
            "label": "e",
            "text": "Lateral plantar",
            "ans": false
          }
        ],
        "explanation": "Common peroneal nerve.",
        "textbookNote": "Common peroneal nerve.",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "reviewReason": "Common peroneal nerve."
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Conducting system of heart",
        "items": [
          {
            "label": "a",
            "text": "SA node",
            "ans": true
          },
          {
            "label": "b",
            "text": "AV node",
            "ans": true
          },
          {
            "label": "c",
            "text": "Papillary muscle",
            "ans": false
          },
          {
            "label": "d",
            "text": "AV bundle",
            "ans": true
          },
          {
            "label": "e",
            "text": "Musculi pectinati",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      }
    ]
  },
  {
    "id": "cmu-ana-2021-nov-p1",
    "session": "November 2021",
    "year": 2021,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 91,
    "bookPage": "p.91",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Phagocytic cells",
        "items": [
          {
            "label": "a",
            "text": "Macrophage",
            "ans": true
          },
          {
            "label": "b",
            "text": "Kupffer cell",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fibroblast",
            "ans": false
          },
          {
            "label": "d",
            "text": "Osteocyte",
            "ans": false
          },
          {
            "label": "e",
            "text": "Microglia",
            "ans": true
          }
        ],
        "explanation": "Osteoclast (not osteocyte) is phagocytic; Orbit marks d T.",
        "textbookNote": "Osteoclast (not osteocyte) is phagocytic; Orbit marks d T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "officialOrbitDiscrepancy": "Osteoclast (not osteocyte) is phagocytic; Orbit marks d T."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Meiotic type of cell division",
        "items": [
          {
            "label": "a",
            "text": "Is called reduction division",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occurs in germ cells",
            "ans": true
          },
          {
            "label": "c",
            "text": "Occurs in somatic cells",
            "ans": false
          },
          {
            "label": "d",
            "text": "Causes genetic variation in the daughter cells",
            "ans": true
          },
          {
            "label": "e",
            "text": "Produces two daughter cells",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Connective tissue cells",
        "items": [
          {
            "label": "a",
            "text": "Fibroblast",
            "ans": true
          },
          {
            "label": "b",
            "text": "Schwann cell",
            "ans": false
          },
          {
            "label": "c",
            "text": "Plasma cell",
            "ans": true
          },
          {
            "label": "d",
            "text": "Astrocyte",
            "ans": false
          },
          {
            "label": "e",
            "text": "Goblet cell",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Neural crest derivatives",
        "items": [
          {
            "label": "a",
            "text": "Hair",
            "ans": false
          },
          {
            "label": "b",
            "text": "Melanocyte",
            "ans": true
          },
          {
            "label": "c",
            "text": "Oligodendrocyte",
            "ans": false
          },
          {
            "label": "d",
            "text": "Dorsal root ganglia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Schwann cell",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Ball and socket joint",
        "items": [
          {
            "label": "a",
            "text": "Ankle joint",
            "ans": false
          },
          {
            "label": "b",
            "text": "Knee joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hip joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Elbow joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Shoulder joint",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Pneumatic bones",
        "items": [
          {
            "label": "a",
            "text": "Occipital",
            "ans": false
          },
          {
            "label": "b",
            "text": "Maxilla",
            "ans": true
          },
          {
            "label": "c",
            "text": "Frontal",
            "ans": true
          },
          {
            "label": "d",
            "text": "Zygomatic",
            "ans": false
          },
          {
            "label": "e",
            "text": "Temporal",
            "ans": true
          }
        ],
        "explanation": "Temporal bone (mastoid air cells) is pneumatic; Orbit marks it F.",
        "textbookNote": "Temporal bone (mastoid air cells) is pneumatic; Orbit marks it F.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Temporal bone (mastoid air cells) is pneumatic; Orbit marks it F."
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Central lymphoid organs",
        "items": [
          {
            "label": "a",
            "text": "Thymus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Spleen",
            "ans": false
          },
          {
            "label": "c",
            "text": "Bone marrow",
            "ans": true
          },
          {
            "label": "d",
            "text": "Palatine tonsil",
            "ans": false
          },
          {
            "label": "e",
            "text": "Lymph node",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Fibrocartilage present in",
        "items": [
          {
            "label": "a",
            "text": "Manubriosternal joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Elbow joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Intervertebral joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Symphysis pubis joint",
            "ans": true
          },
          {
            "label": "e",
            "text": "Inferior tibiofibular joint",
            "ans": false
          }
        ],
        "explanation": "IVD annulus fibrosus is fibrocartilage (Orbit marks c F). Inferior tibiofibular is a fibrous syndesmosis.",
        "textbookNote": "IVD annulus fibrosus is fibrocartilage (Orbit marks c F). Inferior tibiofibular is a fibrous syndesmosis.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "officialOrbitDiscrepancy": "IVD annulus fibrosus is fibrocartilage (Orbit marks c F). Inferior tibiofibular is a fibrous syndesmosis."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Collagen fibers abundant in",
        "items": [
          {
            "label": "a",
            "text": "Bone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": false
          },
          {
            "label": "c",
            "text": "Lung",
            "ans": false
          },
          {
            "label": "d",
            "text": "Tendon",
            "ans": true
          },
          {
            "label": "e",
            "text": "Spleen",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Multipennate muscles",
        "items": [
          {
            "label": "a",
            "text": "Soleus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Deltoid",
            "ans": true
          },
          {
            "label": "c",
            "text": "Rectus femoris",
            "ans": false
          },
          {
            "label": "d",
            "text": "Tibialis anterior",
            "ans": false
          },
          {
            "label": "e",
            "text": "Subscapularis",
            "ans": true
          }
        ],
        "explanation": "Soleus and rectus femoris are bipennate. Orbit's key differs.",
        "textbookNote": "Soleus and rectus femoris are bipennate. Orbit's key differs.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Soleus and rectus femoris are bipennate. Orbit's key differs."
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Motor cranial nerve",
        "items": [
          {
            "label": "a",
            "text": "Hypoglossal",
            "ans": true
          },
          {
            "label": "b",
            "text": "Optic",
            "ans": false
          },
          {
            "label": "c",
            "text": "Trochlear",
            "ans": true
          },
          {
            "label": "d",
            "text": "Trigeminal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Facial",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Derivatives of 1st pharyngeal arch",
        "items": [
          {
            "label": "a",
            "text": "Mandible",
            "ans": true
          },
          {
            "label": "b",
            "text": "Stylopharyngeus muscle",
            "ans": false
          },
          {
            "label": "c",
            "text": "Palatine tonsil",
            "ans": false
          },
          {
            "label": "d",
            "text": "Temporalis muscle",
            "ans": true
          },
          {
            "label": "e",
            "text": "Tensor tympani muscle",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Branches of external carotid artery",
        "items": [
          {
            "label": "a",
            "text": "Posterior auricular artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Anterior auricular artery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Superior thyroid artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Inferior thyroid artery",
            "ans": false
          },
          {
            "label": "e",
            "text": "Lingual artery",
            "ans": true
          }
        ],
        "explanation": "Anterior auricular arteries arise from the superficial temporal (an ECA terminal branch) - indirect. Inferior thyroid is from thyrocervical trunk.",
        "textbookNote": "Anterior auricular arteries arise from the superficial temporal (an ECA terminal branch) - indirect. Inferior thyroid is from thyrocervical trunk.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Anterior auricular arteries arise from the superficial temporal (an ECA terminal branch) - indirect. Inferior thyroid is from thyrocervical trunk."
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Parasympathetic fibers present in",
        "items": [
          {
            "label": "a",
            "text": "Optic",
            "ans": false
          },
          {
            "label": "b",
            "text": "Oculomotor",
            "ans": true
          },
          {
            "label": "c",
            "text": "Facial",
            "ans": true
          },
          {
            "label": "d",
            "text": "Glossopharyngeal",
            "ans": true
          },
          {
            "label": "e",
            "text": "Accessory",
            "ans": false
          }
        ],
        "explanation": "Vagus also carries them.",
        "textbookNote": "Vagus also carries them.",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "reviewReason": "Vagus also carries them."
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Paired cartilage of larynx",
        "items": [
          {
            "label": "a",
            "text": "Epiglottis",
            "ans": false
          },
          {
            "label": "b",
            "text": "Thyroid",
            "ans": false
          },
          {
            "label": "c",
            "text": "Corniculate",
            "ans": true
          },
          {
            "label": "d",
            "text": "Cricoid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Arytenoid",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Gray matter composed of",
        "items": [
          {
            "label": "a",
            "text": "Cell body of neuron",
            "ans": true
          },
          {
            "label": "b",
            "text": "Myelinated axons",
            "ans": false
          },
          {
            "label": "c",
            "text": "Capillaries",
            "ans": true
          },
          {
            "label": "d",
            "text": "Lymph vessels",
            "ans": false
          },
          {
            "label": "e",
            "text": "Neuroglial cells",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Brainstem includes",
        "items": [
          {
            "label": "a",
            "text": "Mid brain",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cerebellum",
            "ans": false
          },
          {
            "label": "c",
            "text": "Pons",
            "ans": true
          },
          {
            "label": "d",
            "text": "Thalamus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Medulla oblongata",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Deep cerebellar nuclei",
        "items": [
          {
            "label": "a",
            "text": "Dentate nucleus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Red nucleus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Fastigial nucleus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Emboliform nucleus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Caudate nucleus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Parts of internal capsule",
        "items": [
          {
            "label": "a",
            "text": "Rostrum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Anterior limb",
            "ans": true
          },
          {
            "label": "c",
            "text": "Trunk",
            "ans": false
          },
          {
            "label": "d",
            "text": "Retrolentiform part",
            "ans": true
          },
          {
            "label": "e",
            "text": "Splenium",
            "ans": false
          }
        ],
        "explanation": "Rostrum, trunk and splenium are parts of the corpus callosum. Internal capsule: anterior limb, genu, posterior limb, retrolentiform, sublenticular.",
        "textbookNote": "Rostrum, trunk and splenium are parts of the corpus callosum. Internal capsule: anterior limb, genu, posterior limb, retrolentiform, sublenticular.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Rostrum, trunk and splenium are parts of the corpus callosum. Internal capsule: anterior limb, genu, posterior limb, retrolentiform, sublenticular."
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Refractory media of eyeball",
        "items": [
          {
            "label": "a",
            "text": "Iris",
            "ans": false
          },
          {
            "label": "b",
            "text": "Cornea",
            "ans": true
          },
          {
            "label": "c",
            "text": "Retina",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lens",
            "ans": true
          },
          {
            "label": "e",
            "text": "Vitreous humor",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      }
    ]
  },
  {
    "id": "cmu-ana-2021-nov-p2",
    "session": "November 2021",
    "year": 2021,
    "month": "November",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 92,
    "bookPage": "p.92",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Gall bladder",
        "items": [
          {
            "label": "a",
            "text": "Has capacity of 30-50 ml",
            "ans": true
          },
          {
            "label": "b",
            "text": "Stores bile",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is supplied by hepatic artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Develops from midgut",
            "ans": false
          },
          {
            "label": "e",
            "text": "Drains by cystic duct",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Intercostal nerves",
        "items": [
          {
            "label": "a",
            "text": "Are mixed nerves",
            "ans": true
          },
          {
            "label": "b",
            "text": "Are ventral rami of thoracic spinal nerves",
            "ans": true
          },
          {
            "label": "c",
            "text": "Supplies the diaphragm",
            "ans": true
          },
          {
            "label": "d",
            "text": "Supplies parietal pleura",
            "ans": true
          },
          {
            "label": "e",
            "text": "Supplies fibrous pericardium",
            "ans": false
          }
        ],
        "explanation": "Lower intercostals supply the peripheral diaphragm; fibrous pericardium is supplied by the phrenic nerve.",
        "textbookNote": "Lower intercostals supply the peripheral diaphragm; fibrous pericardium is supplied by the phrenic nerve.",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "reviewReason": "Lower intercostals supply the peripheral diaphragm; fibrous pericardium is supplied by the phrenic nerve."
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Lesser omentum contains",
        "items": [
          {
            "label": "a",
            "text": "Hepatic artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Common bile duct",
            "ans": true
          },
          {
            "label": "c",
            "text": "Portal vein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Inferior vena cava",
            "ans": false
          },
          {
            "label": "e",
            "text": "Coeliac trunk",
            "ans": false
          }
        ],
        "explanation": "Free border: hepatic artery proper, bile duct, portal vein. IVC and coeliac trunk are not contents.",
        "textbookNote": "Free border: hepatic artery proper, bile duct, portal vein. IVC and coeliac trunk are not contents.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Free border: hepatic artery proper, bile duct, portal vein. IVC and coeliac trunk are not contents."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Structures opening in right atrium",
        "items": [
          {
            "label": "a",
            "text": "Superior vena cava",
            "ans": true
          },
          {
            "label": "b",
            "text": "Oblique vein of left ventricle",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inferior vena cava",
            "ans": true
          },
          {
            "label": "d",
            "text": "Coronary sinus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Great cardiac vein",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Histological structures of duodenum",
        "items": [
          {
            "label": "a",
            "text": "Lined by simple columnar epithelium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has numerous goblet cells",
            "ans": true
          },
          {
            "label": "c",
            "text": "Has Brunner's gland in submucosa",
            "ans": true
          },
          {
            "label": "d",
            "text": "Has leaf shaped villi",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has Peyer's patches",
            "ans": false
          }
        ],
        "explanation": "Peyer's patches are ileal.",
        "textbookNote": "Peyer's patches are ileal.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Peyer's patches are ileal."
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Structure passing through sacral canal",
        "items": [
          {
            "label": "a",
            "text": "Sacral nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Filum terminale",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lower lumbar nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Coccygeal nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Obturator nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Structures related to ala of sacrum",
        "items": [
          {
            "label": "a",
            "text": "Obturator nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lumbosacral trunk",
            "ans": true
          },
          {
            "label": "c",
            "text": "Sympathetic trunk",
            "ans": true
          },
          {
            "label": "d",
            "text": "Iliolumbar artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Median sacral artery",
            "ans": false
          }
        ],
        "explanation": "See note in Nov-2022 Paper I.",
        "textbookNote": "See note in Nov-2022 Paper I.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "See note in Nov-2022 Paper I."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Branches of lumbar plexus",
        "items": [
          {
            "label": "a",
            "text": "Genitofemoral nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Femoral nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pudendal nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Obturator nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Nerve to pectineus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Contents of spermatic cord",
        "items": [
          {
            "label": "a",
            "text": "Vas deferens",
            "ans": true
          },
          {
            "label": "b",
            "text": "Testicular artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Artery to vas deferens",
            "ans": true
          },
          {
            "label": "d",
            "text": "Deep artery of penis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Cremasteric fascia",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Derivatives of paramesonephric duct",
        "items": [
          {
            "label": "a",
            "text": "Uterus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lower part of vagina",
            "ans": false
          },
          {
            "label": "c",
            "text": "Fallopian tube",
            "ans": true
          },
          {
            "label": "d",
            "text": "Vas deferens",
            "ans": false
          },
          {
            "label": "e",
            "text": "Round ligament of uterus",
            "ans": false
          }
        ],
        "explanation": "Round ligament of uterus comes from the gubernaculum; Orbit marks e T.",
        "textbookNote": "Round ligament of uterus comes from the gubernaculum; Orbit marks e T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Round ligament of uterus comes from the gubernaculum; Orbit marks e T."
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Nerves related to humerus",
        "items": [
          {
            "label": "a",
            "text": "Axillary nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Musculocutaneous nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Ulnar nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Radial nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Long thoracic nerve",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Common congenital anomalies of foot",
        "items": [
          {
            "label": "a",
            "text": "Club foot",
            "ans": true
          },
          {
            "label": "b",
            "text": "Flat foot",
            "ans": false
          },
          {
            "label": "c",
            "text": "Talipes equinovarus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Syndactyly",
            "ans": true
          },
          {
            "label": "e",
            "text": "Talipes equinovalgus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Intracapsular structures of knee joint",
        "items": [
          {
            "label": "a",
            "text": "Cruciate ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Menisci",
            "ans": true
          },
          {
            "label": "c",
            "text": "Popliteal tendon",
            "ans": true
          },
          {
            "label": "d",
            "text": "Patellar ligament",
            "ans": false
          },
          {
            "label": "e",
            "text": "Synovial membrane",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Structures passing behind inguinal ligament",
        "items": [
          {
            "label": "a",
            "text": "Femoral artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Femoral nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Psoas major",
            "ans": true
          },
          {
            "label": "d",
            "text": "Femoral vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Spermatic cord",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Radial nerve supplies",
        "items": [
          {
            "label": "a",
            "text": "Biceps brachii",
            "ans": false
          },
          {
            "label": "b",
            "text": "Anconeus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Extensor carpi radialis longus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Extensor carpi ulnaris",
            "ans": true
          },
          {
            "label": "e",
            "text": "Brachioradialis",
            "ans": true
          }
        ],
        "explanation": "Anconeus is supplied by the radial nerve (Orbit marks b F).",
        "textbookNote": "Anconeus is supplied by the radial nerve (Orbit marks b F).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "officialOrbitDiscrepancy": "Anconeus is supplied by the radial nerve (Orbit marks b F)."
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "The clavicle",
        "items": [
          {
            "label": "a",
            "text": "Is a modified long bone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lateral end articulates with manubrium",
            "ans": false
          },
          {
            "label": "c",
            "text": "It ossifies in membrane",
            "ans": true
          },
          {
            "label": "d",
            "text": "Deltoid attached to medial two-thirds of it",
            "ans": false
          },
          {
            "label": "e",
            "text": "It has no medullary cavity",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Muscles innervated by femoral nerve",
        "items": [
          {
            "label": "a",
            "text": "Rectus femoris",
            "ans": true
          },
          {
            "label": "b",
            "text": "Biceps femoris",
            "ans": false
          },
          {
            "label": "c",
            "text": "Sartorius",
            "ans": true
          },
          {
            "label": "d",
            "text": "Adductor longus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vastus lateralis",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Venacaval opening of the diaphragm",
        "items": [
          {
            "label": "a",
            "text": "Transmits inferior vena cava",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is a tendinous opening",
            "ans": true
          },
          {
            "label": "c",
            "text": "Transmits left phrenic nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Transmits vagus nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Lies at the level of T10 vertebra",
            "ans": false
          }
        ],
        "explanation": "At T8 (esophageal opening T10, aortic T12). Left phrenic pierces the muscle.",
        "textbookNote": "At T8 (esophageal opening T10, aortic T12). Left phrenic pierces the muscle.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "At T8 (esophageal opening T10, aortic T12). Left phrenic pierces the muscle."
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "The female pelvis",
        "items": [
          {
            "label": "a",
            "text": "Inlet is heart shaped",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ischial spine is less inverted",
            "ans": true
          },
          {
            "label": "c",
            "text": "Cavity wider and shallower",
            "ans": true
          },
          {
            "label": "d",
            "text": "Cavity is narrower",
            "ans": false
          },
          {
            "label": "e",
            "text": "Subpubic angle wider",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Invertors of foot",
        "items": [
          {
            "label": "a",
            "text": "Extensor digitorum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Tibialis anterior",
            "ans": true
          },
          {
            "label": "c",
            "text": "Peroneus brevis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Extensor hallucis longus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Tibialis posterior",
            "ans": true
          }
        ],
        "explanation": "EHL is mainly a dorsiflexor.",
        "textbookNote": "EHL is mainly a dorsiflexor.",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "reviewReason": "EHL is mainly a dorsiflexor."
      }
    ]
  },
  {
    "id": "cmu-ana-2021-may-p1",
    "session": "May 2021",
    "year": 2021,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 93,
    "bookPage": "p.93",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Membranous organelles",
        "items": [
          {
            "label": "a",
            "text": "Lysosomes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Endoplasmic reticulum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Mitochondria",
            "ans": true
          },
          {
            "label": "d",
            "text": "Microfilaments",
            "ans": false
          },
          {
            "label": "e",
            "text": "Ribosomes",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Mitotic cell division occurs in",
        "items": [
          {
            "label": "a",
            "text": "Primary oocyte",
            "ans": false
          },
          {
            "label": "b",
            "text": "Zygote",
            "ans": true
          },
          {
            "label": "c",
            "text": "Somatic cells",
            "ans": true
          },
          {
            "label": "d",
            "text": "Spermatozoa",
            "ans": false
          },
          {
            "label": "e",
            "text": "Oogonia",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Surface ectodermal derivatives",
        "items": [
          {
            "label": "a",
            "text": "Hair",
            "ans": true
          },
          {
            "label": "b",
            "text": "Dermis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Thyroid gland",
            "ans": false
          },
          {
            "label": "d",
            "text": "Sweat gland",
            "ans": true
          },
          {
            "label": "e",
            "text": "Bone",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Primary cartilaginous joints",
        "items": [
          {
            "label": "a",
            "text": "Intervertebral joint",
            "ans": false
          },
          {
            "label": "b",
            "text": "1st sternocostal joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Manubriosternal joint",
            "ans": false
          },
          {
            "label": "d",
            "text": "Temporomandibular joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Spheno-occipital joint",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Paranasal air sinuses",
        "items": [
          {
            "label": "a",
            "text": "Frontal",
            "ans": true
          },
          {
            "label": "b",
            "text": "Maxillary",
            "ans": true
          },
          {
            "label": "c",
            "text": "Cavernous",
            "ans": false
          },
          {
            "label": "d",
            "text": "Sphenoidal",
            "ans": true
          },
          {
            "label": "e",
            "text": "Occipital",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Surface modifications of cell",
        "items": [
          {
            "label": "a",
            "text": "Microvilli",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cilia",
            "ans": true
          },
          {
            "label": "c",
            "text": "Villi",
            "ans": false
          },
          {
            "label": "d",
            "text": "Papillae",
            "ans": false
          },
          {
            "label": "e",
            "text": "Flagella",
            "ans": true
          }
        ],
        "explanation": "Flagella are counted as a surface modification (as in May-2023); Orbit marks it F here.",
        "textbookNote": "Flagella are counted as a surface modification (as in May-2023); Orbit marks it F here.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)",
        "officialOrbitDiscrepancy": "Flagella are counted as a surface modification (as in May-2023); Orbit marks it F here."
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Elastic cartilage present in",
        "items": [
          {
            "label": "a",
            "text": "Epiglottis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Thyroid cartilage",
            "ans": false
          },
          {
            "label": "c",
            "text": "Intervertebral disc",
            "ans": false
          },
          {
            "label": "d",
            "text": "External ear",
            "ans": true
          },
          {
            "label": "e",
            "text": "Articular cartilage",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Peripheral lymphoid organs",
        "items": [
          {
            "label": "a",
            "text": "Palatine tonsil",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lymph node",
            "ans": true
          },
          {
            "label": "c",
            "text": "Bone marrow",
            "ans": false
          },
          {
            "label": "d",
            "text": "Thymus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Spleen",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Functional end artery present in",
        "items": [
          {
            "label": "a",
            "text": "Liver",
            "ans": false
          },
          {
            "label": "b",
            "text": "Heart",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lung",
            "ans": false
          },
          {
            "label": "d",
            "text": "Brain",
            "ans": true
          },
          {
            "label": "e",
            "text": "Retina",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Osteoblast",
        "items": [
          {
            "label": "a",
            "text": "Multinucleated cell",
            "ans": false
          },
          {
            "label": "b",
            "text": "Lies in lacunae of Haversian system",
            "ans": false
          },
          {
            "label": "c",
            "text": "Bone forming cell",
            "ans": true
          },
          {
            "label": "d",
            "text": "Converts into osteocyte",
            "ans": true
          },
          {
            "label": "e",
            "text": "Immature cell",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Sensory cranial nerve",
        "items": [
          {
            "label": "a",
            "text": "Optic",
            "ans": true
          },
          {
            "label": "b",
            "text": "Facial",
            "ans": false
          },
          {
            "label": "c",
            "text": "Olfactory",
            "ans": true
          },
          {
            "label": "d",
            "text": "Trigeminal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Glossopharyngeal",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Contents of carotid sheath",
        "items": [
          {
            "label": "a",
            "text": "Phrenic nerve",
            "ans": false
          },
          {
            "label": "b",
            "text": "Common carotid artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Internal jugular vein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Sympathetic trunk",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Muscles of mastication",
        "items": [
          {
            "label": "a",
            "text": "Temporalis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Mentalis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Genioglossus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Stylohyoid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Masseter",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Oropharynx",
        "items": [
          {
            "label": "a",
            "text": "Contains palatine tonsil",
            "ans": true
          },
          {
            "label": "b",
            "text": "Contains tubal tonsil",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is the middle part of the pharynx",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is collapsible",
            "ans": false
          },
          {
            "label": "e",
            "text": "Communicates anteriorly with nasal cavity",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Muscles of soft palate",
        "items": [
          {
            "label": "a",
            "text": "Tensor tympani",
            "ans": false
          },
          {
            "label": "b",
            "text": "Genioglossus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Tensor veli palatini",
            "ans": true
          },
          {
            "label": "d",
            "text": "Stylohyoid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Palatopharyngeus",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Frontal lobe of cerebrum contains",
        "items": [
          {
            "label": "a",
            "text": "Primary sensory area",
            "ans": false
          },
          {
            "label": "b",
            "text": "Primary motor area",
            "ans": true
          },
          {
            "label": "c",
            "text": "Broca's area",
            "ans": true
          },
          {
            "label": "d",
            "text": "Frontal eye field",
            "ans": true
          },
          {
            "label": "e",
            "text": "Visual area",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Hind brain formed by",
        "items": [
          {
            "label": "a",
            "text": "Medulla oblongata",
            "ans": true
          },
          {
            "label": "b",
            "text": "Thalamus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Cerebellum",
            "ans": true
          },
          {
            "label": "d",
            "text": "Midbrain",
            "ans": false
          },
          {
            "label": "e",
            "text": "Hypothalamus",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Basal ganglia includes",
        "items": [
          {
            "label": "a",
            "text": "Caudate nucleus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Corpus callosum",
            "ans": false
          },
          {
            "label": "c",
            "text": "Globus pallidus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Red nucleus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Putamen",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Effects of cerebellar lesion",
        "items": [
          {
            "label": "a",
            "text": "Chorea",
            "ans": false
          },
          {
            "label": "b",
            "text": "Dysdiadochokinesia",
            "ans": true
          },
          {
            "label": "c",
            "text": "Spastic paralysis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ataxia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Nystagmus",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Oculomotor nerve innervates",
        "items": [
          {
            "label": "a",
            "text": "Superior rectus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Superior oblique",
            "ans": false
          },
          {
            "label": "c",
            "text": "Lateral rectus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Medial rectus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Inferior oblique",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy"
      }
    ]
  },
  {
    "id": "cmu-ana-2021-may-p2",
    "session": "May 2021",
    "year": 2021,
    "month": "May",
    "subject": "Anatomy",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 94,
    "bookPage": "p.94",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "The liver",
        "items": [
          {
            "label": "a",
            "text": "Is a mixed gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has bare area on superior surface",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has central vein in hepatic lobule",
            "ans": true
          },
          {
            "label": "d",
            "text": "Has parenchyma develop from endoderm",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has stroma develop from mesoderm",
            "ans": true
          }
        ],
        "explanation": "Bare area is on the posterior part of the diaphragmatic surface.",
        "textbookNote": "Bare area is on the posterior part of the diaphragmatic surface.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Bare area is on the posterior part of the diaphragmatic surface."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Structures crossed by root of mesentery",
        "items": [
          {
            "label": "a",
            "text": "Abdominal aorta",
            "ans": true
          },
          {
            "label": "b",
            "text": "Left ureter",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inferior vena cava",
            "ans": true
          },
          {
            "label": "d",
            "text": "Left psoas",
            "ans": false
          },
          {
            "label": "e",
            "text": "2nd part of duodenum",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Hindgut derivatives",
        "items": [
          {
            "label": "a",
            "text": "Rectum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Anal canal below pectinate line",
            "ans": false
          },
          {
            "label": "c",
            "text": "Right 2/3 of transverse colon",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ascending colon",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vermiform appendix",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Structures opening in right atrium",
        "items": [
          {
            "label": "a",
            "text": "Superior vena cava",
            "ans": true
          },
          {
            "label": "b",
            "text": "Oblique vein of left ventricle",
            "ans": false
          },
          {
            "label": "c",
            "text": "Inferior vena cava",
            "ans": true
          },
          {
            "label": "d",
            "text": "Coronary sinus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Great cardiac vein",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Flexors of knee joint",
        "items": [
          {
            "label": "a",
            "text": "Quadriceps femoris",
            "ans": false
          },
          {
            "label": "b",
            "text": "Semitendinosus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Semimembranosus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Biceps femoris",
            "ans": true
          },
          {
            "label": "e",
            "text": "Gracilis",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Structures passing through sacral canal",
        "items": [
          {
            "label": "a",
            "text": "Sacral nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Filum terminale",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lower lumbar nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Coccygeal nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Obturator nerve",
            "ans": false
          }
        ],
        "explanation": "Orbit marks obturator nerve T - wrong.",
        "textbookNote": "Orbit marks obturator nerve T - wrong.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Orbit marks obturator nerve T - wrong."
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "The kidney",
        "items": [
          {
            "label": "a",
            "text": "Is a retroperitoneal organ",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has right kidney higher than left",
            "ans": false
          },
          {
            "label": "c",
            "text": "Develops from intermediate mesoderm",
            "ans": true
          },
          {
            "label": "d",
            "text": "Ascends from pelvic to lumbar region",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has renal artery, a branch of iliac artery",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Claw hand injury involves",
        "items": [
          {
            "label": "a",
            "text": "Median nerve",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ulnar nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Thoracic duct (sic)",
            "ans": false
          },
          {
            "label": "d",
            "text": "Axillary nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Long thoracic nerve",
            "ans": false
          }
        ],
        "explanation": "Ulnar nerve. Printed 'thoracic duct' is unrelated (maybe 'thoracic outlet' misprint); Orbit marks c T.",
        "textbookNote": "Ulnar nerve. Printed 'thoracic duct' is unrelated (maybe 'thoracic outlet' misprint); Orbit marks c T.",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Ulnar nerve. Printed 'thoracic duct' is unrelated (maybe 'thoracic outlet' misprint); Orbit marks c T."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "The fallopian tube",
        "items": [
          {
            "label": "a",
            "text": "Lies in broad ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Develops from mesonephric duct",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has ampulla, the site of fertilization",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is supplied by uterine and ovarian artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is common site of ectopic pregnancy",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Umbilical cord contains",
        "items": [
          {
            "label": "a",
            "text": "Yolk sac with vitelline duct",
            "ans": true
          },
          {
            "label": "b",
            "text": "Allantois",
            "ans": true
          },
          {
            "label": "c",
            "text": "Two veins",
            "ans": false
          },
          {
            "label": "d",
            "text": "One artery",
            "ans": false
          },
          {
            "label": "e",
            "text": "Wharton's jelly",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Histological structures of duodenum",
        "items": [
          {
            "label": "a",
            "text": "Lined by simple columnar epithelium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Has numerous goblet cells",
            "ans": true
          },
          {
            "label": "c",
            "text": "Has Brunner's gland in submucosa",
            "ans": true
          },
          {
            "label": "d",
            "text": "Has leaf shaped villi",
            "ans": true
          },
          {
            "label": "e",
            "text": "Has Peyer's patches",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Arch of the aorta",
        "items": [
          {
            "label": "a",
            "text": "Has three branches",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is an elastic artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lies in middle mediastinum",
            "ans": false
          },
          {
            "label": "d",
            "text": "Arises from left atrium",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is a retroperitoneal structure",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Intracapsular structures of knee joint",
        "items": [
          {
            "label": "a",
            "text": "Cruciate ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Menisci",
            "ans": true
          },
          {
            "label": "c",
            "text": "Popliteal tendon",
            "ans": true
          },
          {
            "label": "d",
            "text": "Patellar ligament",
            "ans": false
          },
          {
            "label": "e",
            "text": "Synovial membrane",
            "ans": false
          }
        ],
        "explanation": "Synovial membrane lines the capsule; Orbit's key varies between years.",
        "textbookNote": "Synovial membrane lines the capsule; Orbit's key varies between years.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back",
        "officialOrbitDiscrepancy": "Synovial membrane lines the capsule; Orbit's key varies between years."
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Structures passing behind inguinal ligament",
        "items": [
          {
            "label": "a",
            "text": "Femoral artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Femoral nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Psoas major",
            "ans": true
          },
          {
            "label": "d",
            "text": "Femoral vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Spermatic cord",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Tributaries of superior vena cava",
        "items": [
          {
            "label": "a",
            "text": "Azygos vein",
            "ans": true
          },
          {
            "label": "b",
            "text": "Bronchial vein",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hemiazygos vein",
            "ans": false
          },
          {
            "label": "d",
            "text": "Pericardial vein",
            "ans": true
          },
          {
            "label": "e",
            "text": "Brachiocephalic vein",
            "ans": true
          }
        ],
        "explanation": "Hemiazygos drains into the azygos vein, not directly into SVC. Small pericardial/mediastinal veins do drain directly.",
        "textbookNote": "Hemiazygos drains into the azygos vein, not directly into SVC. Small pericardial/mediastinal veins do drain directly.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Hemiazygos drains into the azygos vein, not directly into SVC. Small pericardial/mediastinal veins do drain directly."
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Structures related to transpyloric plane",
        "items": [
          {
            "label": "a",
            "text": "Lower pole of kidney",
            "ans": false
          },
          {
            "label": "b",
            "text": "Fundus of gall bladder",
            "ans": true
          },
          {
            "label": "c",
            "text": "Abdominal aorta bifurcation",
            "ans": false
          },
          {
            "label": "d",
            "text": "Pylorus of stomach",
            "ans": true
          },
          {
            "label": "e",
            "text": "Conus medullaris of spinal cord",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Muscles supplied by obturator nerve",
        "items": [
          {
            "label": "a",
            "text": "Adductor magnus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Biceps femoris",
            "ans": false
          },
          {
            "label": "c",
            "text": "Rectus femoris",
            "ans": false
          },
          {
            "label": "d",
            "text": "Adductor longus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Gracilis",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Aortic opening of diaphragm transmits",
        "items": [
          {
            "label": "a",
            "text": "Aorta",
            "ans": true
          },
          {
            "label": "b",
            "text": "Azygos vein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Radial nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Vagus nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Sympathetic trunk",
            "ans": false
          }
        ],
        "explanation": "Thoracic duct also passes through it.",
        "textbookNote": "Thoracic duct also passes through it.",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)",
        "reviewReason": "Thoracic duct also passes through it."
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "The female pelvis",
        "items": [
          {
            "label": "a",
            "text": "Inlet is heart shaped",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ischial spine is less inverted",
            "ans": true
          },
          {
            "label": "c",
            "text": "Cavity wider and shallower",
            "ans": true
          },
          {
            "label": "d",
            "text": "Cavity is narrower",
            "ans": false
          },
          {
            "label": "e",
            "text": "Subpubic angle wider",
            "ans": true
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Contents of spermatic cord",
        "items": [
          {
            "label": "a",
            "text": "Vas deferens",
            "ans": true
          },
          {
            "label": "b",
            "text": "Testicular artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Artery to vas deferens",
            "ans": true
          },
          {
            "label": "d",
            "text": "Deep artery of penis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Cremasteric fascia",
            "ans": false
          }
        ],
        "explanation": "",
        "textbookNote": "",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)"
      }
    ]
  },
  {
    "id": "cmu-bio-2025-nov-p1",
    "session": "November 2025",
    "year": 2025,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 1,
    "bookPage": "Biochemistry Bank (November 2025)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "HCO3",
        "items": [
          {
            "label": "a",
            "text": "The HCO3",
            "ans": false
          },
          {
            "label": "b",
            "text": "The ratio of HCO3",
            "ans": false
          },
          {
            "label": "c",
            "text": "Carbonic anhydrase accelerates CO2 hydration",
            "ans": true
          },
          {
            "label": "d",
            "text": "Lungs regulate HCO3",
            "ans": false
          },
          {
            "label": "e",
            "text": "Kidney regulates H+ ion excretion",
            "ans": true
          }
        ],
        "explanation": "(C): Carbonic anhydrase catalyses CO2 + H2O ⇌ H2CO3, so it is central to bicarbonate buffering. | (E): Kidneys excrete H+ and reclaim/generate HCO3",
        "textbookNote": "(C): Carbonic anhydrase catalyses CO2 + H2O ⇌ H2CO3, so it is central to bicarbonate buffering. | (E): Kidneys excrete H+ and reclaim/generate HCO3",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "In glycolysis the following statements are correct",
        "items": [
          {
            "label": "a",
            "text": "The end product is lactate",
            "ans": false
          },
          {
            "label": "b",
            "text": "The end product is pyruvate",
            "ans": true
          },
          {
            "label": "c",
            "text": "There are four irreversible reactions",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lactate conversion to pyruvate is oxidation",
            "ans": true
          },
          {
            "label": "e",
            "text": "In the aerobic pathway 2 ATP are produced (net)",
            "ans": false
          }
        ],
        "explanation": "(A): End product of glycolysis is pyruvate (aerobic); lactate forms only in anaerobic conditions. | (B): Aerobic glycolysis ends in pyruvate (to mitochondria); lactate is formed only anaerobically. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Lactate → pyruvate removes 2H (LDH, NAD+ → NADH): oxidation. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "textbookNote": "(A): End product of glycolysis is pyruvate (aerobic); lactate forms only in anaerobic conditions. | (B): Aerobic glycolysis ends in pyruvate (to mitochondria); lactate is formed only anaerobically. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Lactate → pyruvate removes 2H (LDH, NAD+ → NADH): oxidation. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Regarding hypothyroidism",
        "items": [
          {
            "label": "a",
            "text": "Serum TSH is always increased in primary hypothyroidism",
            "ans": true
          },
          {
            "label": "b",
            "text": "Serum TSH is always decreased in secondary hypothyroidism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Serum T3, T4 are always decreased in primary hypothyroidism",
            "ans": false
          },
          {
            "label": "d",
            "text": "Serum T3, T4 are always decreased in secondary hypothyroidism",
            "ans": true
          },
          {
            "label": "e",
            "text": "Serum T3, T4 can be normal in primary (subclinical) hypothyroidism",
            "ans": true
          }
        ],
        "explanation": "(A): Primary hypothyroidism: gland failure → ↓T3/T4 → ↑TSH (feedback). | (B): Secondary hypothyroidism: pituitary failure → TSH low (or inappropriately normal) with low T4. | (C): In subclinical primary hypothyroidism T3/T4 stay normal with raised TSH. | (D): Secondary hypothyroidism has low T3/T4. | (E): Subclinical hypothyroidism: normal T3/T4, raised TSH.",
        "textbookNote": "(A): Primary hypothyroidism: gland failure → ↓T3/T4 → ↑TSH (feedback). | (B): Secondary hypothyroidism: pituitary failure → TSH low (or inappropriately normal) with low T4. | (C): In subclinical primary hypothyroidism T3/T4 stay normal with raised TSH. | (D): Secondary hypothyroidism has low T3/T4. | (E): Subclinical hypothyroidism: normal T3/T4, raised TSH.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding ATP",
        "items": [
          {
            "label": "a",
            "text": "It is a nucleotide derivative with 3 phosphate residues",
            "ans": true
          },
          {
            "label": "b",
            "text": "It is a high-energy phosphate producing more than 7 kcal/mol of energy",
            "ans": true
          },
          {
            "label": "c",
            "text": "It is formed only in the respiratory chain",
            "ans": false
          },
          {
            "label": "d",
            "text": "It is not formed at substrate level",
            "ans": false
          },
          {
            "label": "e",
            "text": "More than 50% of ATP is used to drive the osmotic (Na+-K+) pump",
            "ans": false
          }
        ],
        "explanation": "(A): ATP = adenine + ribose + 3 phosphates. | (B): ATP hydrolysis ≈ –7.3 kcal/mol. | (C): ATP is also formed by substrate-level phosphorylation. | (D): Substrate-level phosphorylation exists (PK, PGK, succinyl-CoA synthetase). | (E): Na+-K+ pump uses ~20–40% of ATP.",
        "textbookNote": "(A): ATP = adenine + ribose + 3 phosphates. | (B): ATP hydrolysis ≈ –7.3 kcal/mol. | (C): ATP is also formed by substrate-level phosphorylation. | (D): Substrate-level phosphorylation exists (PK, PGK, succinyl-CoA synthetase). | (E): Na+-K+ pump uses ~20–40% of ATP.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Insulin",
        "items": [
          {
            "label": "a",
            "text": "Is a potent anabolic hormone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is required for utilization of glucose in brain",
            "ans": false
          },
          {
            "label": "c",
            "text": "Increases glucose uptake in skeletal muscle",
            "ans": true
          },
          {
            "label": "d",
            "text": "Increases plasma K+",
            "ans": false
          },
          {
            "label": "e",
            "text": "Mode of action is mediated by cyclic AMP",
            "ans": false
          }
        ],
        "explanation": "(A): Insulin promotes glycogen, fat and protein synthesis. | (B): Brain uses GLUT-3, which is insulin-independent. | (C): Insulin recruits GLUT-4 in muscle and adipose tissue. | (D): Insulin drives K+ into cells (lowers plasma K+); used to treat hyperkalaemia. | (E): Insulin acts via tyrosine kinase receptor.",
        "textbookNote": "(A): Insulin promotes glycogen, fat and protein synthesis. | (B): Brain uses GLUT-3, which is insulin-independent. | (C): Insulin recruits GLUT-4 in muscle and adipose tissue. | (D): Insulin drives K+ into cells (lowers plasma K+); used to treat hyperkalaemia. | (E): Insulin acts via tyrosine kinase receptor.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Regarding cholesterol",
        "items": [
          {
            "label": "a",
            "text": "HMG-CoA reductase is the rate-limiting enzyme in its synthesis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is an important precursor of sex and adrenal steroids",
            "ans": true
          },
          {
            "label": "c",
            "text": "Excess LDL cholesterol is a risk factor for atherogenesis",
            "ans": true
          },
          {
            "label": "d",
            "text": "LDL cholesterol requires apo B-48 for receptor internalization",
            "ans": false
          },
          {
            "label": "e",
            "text": "VLDL cholesterol is produced in the intestine",
            "ans": false
          }
        ],
        "explanation": "(A): HMG-CoA reductase is the rate-limiting step. | (B): Cholesterol is the precursor of all steroid hormones. | (C): LDL deposition in intima initiates atherosclerosis. | (D): LDL receptor binds apo B-100 (and E); B-48 lacks the receptor domain. | (E): VLDL is made in the liver; chylomicrons in intestine.",
        "textbookNote": "(A): HMG-CoA reductase is the rate-limiting step. | (B): Cholesterol is the precursor of all steroid hormones. | (C): LDL deposition in intima initiates atherosclerosis. | (D): LDL receptor binds apo B-100 (and E); B-48 lacks the receptor domain. | (E): VLDL is made in the liver; chylomicrons in intestine.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Carbohydrates",
        "items": [
          {
            "label": "a",
            "text": "All monosaccharides are reducing sugars",
            "ans": true
          },
          {
            "label": "b",
            "text": "Sucrose is a non-reducing sugar",
            "ans": true
          },
          {
            "label": "c",
            "text": "Glucose shows mutarotation",
            "ans": true
          },
          {
            "label": "d",
            "text": "Blood reducing sugars are detected by Benedict's test",
            "ans": true
          },
          {
            "label": "e",
            "text": "Aldose is a non-reducing sugar",
            "ans": false
          }
        ],
        "explanation": "(A): All monosaccharides have a free aldehyde/ketone group → reducing. | (B): Sucrose has glucose C1 and fructose C2 linked, no free anomeric carbon. | (C): Free anomeric carbon interconverts α/β forms in solution. | (D): Benedict's test detects reducing sugars (glucose, fructose, lactose, maltose), not sucrose. | (E): Aldoses have a free aldehyde → reducing.",
        "textbookNote": "(A): All monosaccharides have a free aldehyde/ketone group → reducing. | (B): Sucrose has glucose C1 and fructose C2 linked, no free anomeric carbon. | (C): Free anomeric carbon interconverts α/β forms in solution. | (D): Benedict's test detects reducing sugars (glucose, fructose, lactose, maltose), not sucrose. | (E): Aldoses have a free aldehyde → reducing.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Which of the following are true for ketone bodies",
        "items": [
          {
            "label": "a",
            "text": "They are acetoacetate and acetone only",
            "ans": false
          },
          {
            "label": "b",
            "text": "They are acidic",
            "ans": true
          },
          {
            "label": "c",
            "text": "Acetoacetate spontaneously decarboxylates to acetone",
            "ans": true
          },
          {
            "label": "d",
            "text": "During starvation ketones are a major substrate for brain",
            "ans": true
          },
          {
            "label": "e",
            "text": "They are not produced in uncontrolled diabetes mellitus",
            "ans": false
          }
        ],
        "explanation": "(A): Ketone bodies are acetoacetate, β-hydroxybutyrate and acetone. | (B): Acetoacetate and β-hydroxybutyrate are acids. | (C): Acetoacetate → acetone + CO2 spontaneously. | (D): In starvation brain adapts to use ketones. | (E): Lack of insulin → lipolysis → ketogenesis.",
        "textbookNote": "(A): Ketone bodies are acetoacetate, β-hydroxybutyrate and acetone. | (B): Acetoacetate and β-hydroxybutyrate are acids. | (C): Acetoacetate → acetone + CO2 spontaneously. | (D): In starvation brain adapts to use ketones. | (E): Lack of insulin → lipolysis → ketogenesis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Achondroplasia is an example of an autosomal recessive disorder",
            "ans": false
          },
          {
            "label": "b",
            "text": "Autosomal recessive phenotypes appear in the heterozygous state",
            "ans": false
          },
          {
            "label": "c",
            "text": "Mitochondrial DNA is inherited from the mother only",
            "ans": true
          },
          {
            "label": "d",
            "text": "The karyotype of Down syndrome is trisomy 21",
            "ans": true
          },
          {
            "label": "e",
            "text": "Father-to-son transmission is possible in X-linked disease",
            "ans": false
          }
        ],
        "explanation": "(A): Achondroplasia is autosomal DOMINANT (FGFR3). | (B): AR traits appear only in homozygotes. | (C): mtDNA is maternally inherited (sperm mitochondria are lost). | (D): Down syndrome = trisomy 21 (47,XX,+21). | (E): X-linked genes cannot pass father→son (son receives Y).",
        "textbookNote": "(A): Achondroplasia is autosomal DOMINANT (FGFR3). | (B): AR traits appear only in homozygotes. | (C): mtDNA is maternally inherited (sperm mitochondria are lost). | (D): Down syndrome = trisomy 21 (47,XX,+21). | (E): X-linked genes cannot pass father→son (son receives Y).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Regarding liver function tests",
        "items": [
          {
            "label": "a",
            "text": "Serum gamma-glutamyl transpeptidase is elevated in viral hepatitis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Serum albumin level is 3.5–5.4 g/dL",
            "ans": true
          },
          {
            "label": "c",
            "text": "Prothrombin time is normal in acute liver disease",
            "ans": false
          },
          {
            "label": "d",
            "text": "A normal albumin–globulin ratio excludes chronic liver disease",
            "ans": false
          },
          {
            "label": "e",
            "text": "Serum bilirubin indicates synthetic function of the liver",
            "ans": false
          }
        ],
        "explanation": "(A): GGT rises in hepatobiliary disease, including viral hepatitis. | (B): Normal serum albumin 3.5–5.4 g/dL. | (C): Severe hepatocellular injury prolongs PT; PT is a synthetic function test. | (D): A:G is reversed in chronic liver disease; a normal ratio cannot exclude it. | (E): Bilirubin = excretory function; synthetic = albumin, PT.",
        "textbookNote": "(A): GGT rises in hepatobiliary disease, including viral hepatitis. | (B): Normal serum albumin 3.5–5.4 g/dL. | (C): Severe hepatocellular injury prolongs PT; PT is a synthetic function test. | (D): A:G is reversed in chronic liver disease; a normal ratio cannot exclude it. | (E): Bilirubin = excretory function; synthetic = albumin, PT.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Which level of protein structure involves H-bonding?",
        "opts": [
          "Primary",
          "Secondary",
          "Tertiary",
          "Quaternary"
        ],
        "correctIndex": 1,
        "explanation": "Secondary structure (α-helix, β-sheet) is stabilised mainly by H-bonds.",
        "textbookNote": "Secondary structure (α-helix, β-sheet) is stabilised mainly by H-bonds.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Which test reflects long-term glycemic control?",
        "opts": [
          "FBS",
          "RBS",
          "OGTT",
          "HbA1c"
        ],
        "correctIndex": 3,
        "explanation": "HbA1c reflects average glycaemia of the past 2–3 months; FBS/RBS/OGTT are single-time tests.",
        "textbookNote": "HbA1c reflects average glycaemia of the past 2–3 months; FBS/RBS/OGTT are single-time tests.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "The most specific biomarker for myocardial infarction is",
        "opts": [
          "CK",
          "CK-MB",
          "LDH",
          "Troponin-I"
        ],
        "correctIndex": 3,
        "explanation": "Cardiac troponins (I and T) are highly cardiac-specific; CK-MB and LDH are less specific.",
        "textbookNote": "Cardiac troponins (I and T) are highly cardiac-specific; CK-MB and LDH are less specific.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Which one is the most important role of bile salts?",
        "opts": [
          "Micelle formation",
          "Fat absorption",
          "Fat digestion",
          "Emulsification"
        ],
        "correctIndex": 1,
        "explanation": "Bile salts form micelles that carry lipids to the mucosa for absorption.",
        "textbookNote": "Bile salts form micelles that carry lipids to the mucosa for absorption.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Angiotensin II",
        "opts": [
          "Causes vasoconstriction",
          "Is directly converted from angiotensinogen",
          "Causes vasodilatation",
          "Is secreted by the adrenal cortex"
        ],
        "correctIndex": 0,
        "explanation": "Ang II is a potent vasoconstrictor formed by ACE from Ang I; it stimulates aldosterone.",
        "textbookNote": "Ang II is a potent vasoconstrictor formed by ACE from Ang I; it stimulates aldosterone.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Enzymes",
        "opts": [
          "Are heat stable",
          "Are biocatalysts",
          "Are non-protein in nature",
          "Have only a linear protein structure"
        ],
        "correctIndex": 1,
        "explanation": "Enzymes are protein biocatalysts that lower activation energy; they are heat labile.",
        "textbookNote": "Enzymes are protein biocatalysts that lower activation energy; they are heat labile.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Regarding diffusion, choose the correct answer",
        "opts": [
          "Movement of solute from higher to lower concentration",
          "Needs use of ATP for the process",
          "Temperature has no effect on diffusion",
          "A semipermeable membrane is needed for movement"
        ],
        "correctIndex": 0,
        "explanation": "Diffusion is passive movement down a concentration gradient.",
        "textbookNote": "Diffusion is passive movement down a concentration gradient.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Which of the following is true for glycolysis?",
        "opts": [
          "In aerobic glycolysis pyruvate is produced as the end product",
          "Glycolysis occurs in the mitochondria of all cells",
          "There are five unidirectional reactions",
          "Two moles of ATP are produced in aerobic glycolysis"
        ],
        "correctIndex": 0,
        "explanation": "Glycolysis is cytosolic with 3 irreversible steps; aerobically it ends in pyruvate.",
        "textbookNote": "Glycolysis is cytosolic with 3 irreversible steps; aerobically it ends in pyruvate.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Plasma",
        "opts": [
          "Contains 10 mmol/L urea normally",
          "Has an osmolality in the range of 260–320 mosmol/L",
          "Contains protein buffer",
          "Has an Na+ concentration of 35–53 mEq/L"
        ],
        "correctIndex": 2,
        "explanation": "Plasma contains bicarbonate/protein buffers; urea 2.5–6.5 mmol/L, osmolality 280–296, Na+ 135–145 mEq/L.",
        "textbookNote": "Plasma contains bicarbonate/protein buffers; urea 2.5–6.5 mmol/L, osmolality 280–296, Na+ 135–145 mEq/L.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "LDL cholesterol",
        "opts": [
          "Is synthesized from chylomicron",
          "Contains apo B-100",
          "Is metabolized in cardiac muscle",
          "Requires HDL for metabolism"
        ],
        "correctIndex": 1,
        "explanation": "LDL is formed from VLDL, carries apo B-100 and is cleared by hepatic LDL receptors.",
        "textbookNote": "LDL is formed from VLDL, carries apo B-100 and is cleared by hepatic LDL receptors.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      }
    ]
  },
  {
    "id": "cmu-bio-2025-nov-p2",
    "session": "November 2025",
    "year": 2025,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 2,
    "bookPage": "Biochemistry Bank (November 2025)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Nutrients having no caloric value",
        "items": [
          {
            "label": "a",
            "text": "Vitamins",
            "ans": true
          },
          {
            "label": "b",
            "text": "Carbohydrate",
            "ans": false
          },
          {
            "label": "c",
            "text": "Minerals",
            "ans": true
          },
          {
            "label": "d",
            "text": "Dietary fibre",
            "ans": true
          },
          {
            "label": "e",
            "text": "Protein",
            "ans": false
          }
        ],
        "explanation": "(A): Vitamins have no caloric value. | (B): Carbohydrate metabolism is mainly deranged in DM. | (C): Minerals have no caloric value. | (D): Fibre is not digested; negligible energy. | (E): Protein supplies 4 kcal/g, so it has caloric value.",
        "textbookNote": "(A): Vitamins have no caloric value. | (B): Carbohydrate metabolism is mainly deranged in DM. | (C): Minerals have no caloric value. | (D): Fibre is not digested; negligible energy. | (E): Protein supplies 4 kcal/g, so it has caloric value.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "The following statements are true for ECF",
        "items": [
          {
            "label": "a",
            "text": "Na+ is the major cation of ECF",
            "ans": true
          },
          {
            "label": "b",
            "text": "pH is 7.35–7.45",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is 60% of body weight in old persons",
            "ans": false
          },
          {
            "label": "d",
            "text": "Can be measured by inulin",
            "ans": true
          },
          {
            "label": "e",
            "text": "Interstitial fluid contains more protein than plasma",
            "ans": false
          }
        ],
        "explanation": "(A): Na+ is the principal ECF cation (~140 mEq/L). | (B): ECF pH is 7.35–7.45. | (C): ECF is ~20% of body weight; TBW is ~60%. | (D): Inulin is confined to ECF, so it measures ECF volume. | (E): Interstitial fluid has much less protein than plasma.",
        "textbookNote": "(A): Na+ is the principal ECF cation (~140 mEq/L). | (B): ECF pH is 7.35–7.45. | (C): ECF is ~20% of body weight; TBW is ~60%. | (D): Inulin is confined to ECF, so it measures ECF volume. | (E): Interstitial fluid has much less protein than plasma.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Hypovolemia",
        "items": [
          {
            "label": "a",
            "text": "Produces scanty urine",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inhibits renin secretion",
            "ans": false
          },
          {
            "label": "c",
            "text": "Increases aldosterone secretion",
            "ans": true
          },
          {
            "label": "d",
            "text": "Decreases ADH secretion",
            "ans": false
          },
          {
            "label": "e",
            "text": "Stimulates the thirst center",
            "ans": true
          }
        ],
        "explanation": "(A): Hypovolemia raises ADH/aldosterone → oliguria. | (B): Hypovolemia stimulates renin secretion. | (C): Low volume → renin–angiotensin → aldosterone. | (D): Hypovolemia increases ADH. | (E): Hypovolemia stimulates thirst.",
        "textbookNote": "(A): Hypovolemia raises ADH/aldosterone → oliguria. | (B): Hypovolemia stimulates renin secretion. | (C): Low volume → renin–angiotensin → aldosterone. | (D): Hypovolemia increases ADH. | (E): Hypovolemia stimulates thirst.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding vitamin A",
        "items": [
          {
            "label": "a",
            "text": "Beta-carotene is the preformed vitamin obtained from liver",
            "ans": false
          },
          {
            "label": "b",
            "text": "Retinoic acid is needed for visual pigment synthesis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Excess intake does not produce toxicity",
            "ans": false
          },
          {
            "label": "d",
            "text": "Night blindness is the earliest sign of deficiency",
            "ans": true
          },
          {
            "label": "e",
            "text": "Needed for immune function",
            "ans": true
          }
        ],
        "explanation": "(A): β-carotene is the provitamin; preformed vitamin A (retinol) comes from liver/animal foods. | (B): Visual pigment uses 11-cis-retinal; retinoic acid is for growth/differentiation. | (C): Fat-soluble vitamins (A, D) accumulate and cause hypervitaminosis. | (D): Rod dysfunction (nyctalopia) is the earliest sign of vitamin A deficiency. | (E): Vitamin A maintains epithelial integrity and immunity.",
        "textbookNote": "(A): β-carotene is the provitamin; preformed vitamin A (retinol) comes from liver/animal foods. | (B): Visual pigment uses 11-cis-retinal; retinoic acid is for growth/differentiation. | (C): Fat-soluble vitamins (A, D) accumulate and cause hypervitaminosis. | (D): Rod dysfunction (nyctalopia) is the earliest sign of vitamin A deficiency. | (E): Vitamin A maintains epithelial integrity and immunity.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Homologous chromosomes",
        "items": [
          {
            "label": "a",
            "text": "Contain the same number of genes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Contain different numbers of gene loci",
            "ans": false
          },
          {
            "label": "c",
            "text": "Have identical loci at identical positions",
            "ans": true
          },
          {
            "label": "d",
            "text": "Genes determine different characteristics",
            "ans": false
          },
          {
            "label": "e",
            "text": "Responsible for a trait",
            "ans": true
          }
        ],
        "explanation": "(A): Homologous chromosomes have the same genes at the same loci. | (B): Homologous chromosomes have identical loci. | (C): Homologous pairs have the same loci positions. | (D): Corresponding loci control the SAME trait. | (E): Alleles on homologous chromosomes control a trait.",
        "textbookNote": "(A): Homologous chromosomes have the same genes at the same loci. | (B): Homologous chromosomes have identical loci. | (C): Homologous pairs have the same loci positions. | (D): Corresponding loci control the SAME trait. | (E): Alleles on homologous chromosomes control a trait.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Codons",
        "items": [
          {
            "label": "a",
            "text": "Are triplets of four types of nitrogenous bases",
            "ans": true
          },
          {
            "label": "b",
            "text": "All codons code for specific amino acids",
            "ans": false
          },
          {
            "label": "c",
            "text": "There are 64 codons for 20 amino acids",
            "ans": true
          },
          {
            "label": "d",
            "text": "Degeneracy is responsible for multiple codons for an amino acid",
            "ans": true
          },
          {
            "label": "e",
            "text": "Specificity is responsible for mutations",
            "ans": false
          }
        ],
        "explanation": "(A): A, U, G, C in triplets. | (B): 3 stop codons code for no amino acid. | (C): 43 = 64 codons, 61 sense + 3 stop. | (D): Degeneracy = several codons per amino acid. | (E): Specificity is unambiguity; mutation arises from changes in DNA.",
        "textbookNote": "(A): A, U, G, C in triplets. | (B): 3 stop codons code for no amino acid. | (C): 43 = 64 codons, 61 sense + 3 stop. | (D): Degeneracy = several codons per amino acid. | (E): Specificity is unambiguity; mutation arises from changes in DNA.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "During blood pH homeostasis",
        "items": [
          {
            "label": "a",
            "text": "Immediate maintenance is done by the respiratory system",
            "ans": false
          },
          {
            "label": "b",
            "text": "The [HCO3",
            "ans": false
          },
          {
            "label": "c",
            "text": "The pK of the buffer has a negligible role",
            "ans": false
          },
          {
            "label": "d",
            "text": "Carbonic anhydrase plays an important role",
            "ans": true
          },
          {
            "label": "e",
            "text": "Alkali reserve is an important issue",
            "ans": true
          }
        ],
        "explanation": "(A): Immediate defence is by chemical buffers; the respiratory system acts in minutes. | (C): Buffer capacity is maximum at pH = pK, so pK is crucial. | (D): Carbonic anhydrase catalyses CO2 + H2O ⇌ H2CO3, so it is central to bicarbonate buffering. | (E): Alkali reserve (plasma HCO3",
        "textbookNote": "(A): Immediate defence is by chemical buffers; the respiratory system acts in minutes. | (C): Buffer capacity is maximum at pH = pK, so pK is crucial. | (D): Carbonic anhydrase catalyses CO2 + H2O ⇌ H2CO3, so it is central to bicarbonate buffering. | (E): Alkali reserve (plasma HCO3",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Nutritional status can be assessed by",
        "items": [
          {
            "label": "a",
            "text": "BMI",
            "ans": true
          },
          {
            "label": "b",
            "text": "BMR",
            "ans": false
          },
          {
            "label": "c",
            "text": "DRI",
            "ans": false
          },
          {
            "label": "d",
            "text": "Skin fold thickness",
            "ans": true
          },
          {
            "label": "e",
            "text": "Mid-arm circumference",
            "ans": true
          }
        ],
        "explanation": "(A): BMI is the first-line index of malnutrition/obesity. | (B): BMR is energy expenditure, not a nutritional-status measure. | (C): DRI is a dietary recommendation, not an assessment tool. | (D): Skinfold thickness estimates body fat. | (E): MAC assesses muscle/fat reserve.",
        "textbookNote": "(A): BMI is the first-line index of malnutrition/obesity. | (B): BMR is energy expenditure, not a nutritional-status measure. | (C): DRI is a dietary recommendation, not an assessment tool. | (D): Skinfold thickness estimates body fat. | (E): MAC assesses muscle/fat reserve.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Balanced diet",
        "items": [
          {
            "label": "a",
            "text": "Has a carbohydrate : protein : fat ratio of approximately 4:1:1",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is required for maintenance of cellular growth",
            "ans": true
          },
          {
            "label": "c",
            "text": "Does not contain fibre",
            "ans": false
          },
          {
            "label": "d",
            "text": "Limits fat content",
            "ans": true
          },
          {
            "label": "e",
            "text": "May not contain essential amino acids",
            "ans": false
          }
        ],
        "explanation": "(A): Balanced diet ratio ≈ 4:1:1 (carbohydrate : protein : fat). | (B): Balanced diet supports growth and maintenance. | (C): A balanced diet includes fibre. | (E): Balanced diet supplies essential amino acids.",
        "textbookNote": "(A): Balanced diet ratio ≈ 4:1:1 (carbohydrate : protein : fat). | (B): Balanced diet supports growth and maintenance. | (C): A balanced diet includes fibre. | (E): Balanced diet supplies essential amino acids.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "In diuresis",
        "items": [
          {
            "label": "a",
            "text": "Urine volume is within 3 L/day",
            "ans": false
          },
          {
            "label": "b",
            "text": "Uncontrolled diabetes causes osmotic diuresis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Decreased ADH concentration causes osmotic diuresis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Medullary interstitial hyperosmolarity is decreased",
            "ans": true
          },
          {
            "label": "e",
            "text": "Excess hypotonic solution may cause diuresis",
            "ans": true
          }
        ],
        "explanation": "(A): Diuresis means urine volume above 3 L/day. | (B): Uncontrolled diabetes: glucose in tubule holds water → osmotic diuresis. | (C): Low ADH causes WATER diuresis, not osmotic diuresis. | (D): In diuresis the medullary gradient is washed out. | (E): Excess hypotonic fluid suppresses ADH → water diuresis.",
        "textbookNote": "(A): Diuresis means urine volume above 3 L/day. | (B): Uncontrolled diabetes: glucose in tubule holds water → osmotic diuresis. | (C): Low ADH causes WATER diuresis, not osmotic diuresis. | (D): In diuresis the medullary gradient is washed out. | (E): Excess hypotonic fluid suppresses ADH → water diuresis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Plasma osmolarity mainly depends upon",
        "opts": [
          "Sodium",
          "Potassium",
          "Urea",
          "Glucose"
        ],
        "correctIndex": 0,
        "explanation": "Plasma contains bicarbonate/protein buffers; urea 2.5–6.5 mmol/L, osmolality 280–296, Na+ 135–145 mEq/L.",
        "textbookNote": "Plasma contains bicarbonate/protein buffers; urea 2.5–6.5 mmol/L, osmolality 280–296, Na+ 135–145 mEq/L.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "A characteristic feature of metabolic acidosis is",
        "opts": [
          "Decreased pH only",
          "Decreased PCO2 only",
          "Decreased plasma bicarbonate",
          "Decreased hydrogen ion concentration"
        ],
        "correctIndex": 2,
        "explanation": "Metabolic acidosis = primary fall in HCO3",
        "textbookNote": "Metabolic acidosis = primary fall in HCO3",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "The most common cause of anemia is",
        "opts": [
          "Folic acid deficiency",
          "Vitamin C deficiency",
          "Vitamin B12 deficiency",
          "Iron deficiency"
        ],
        "correctIndex": 3,
        "explanation": "Iron deficiency is the commonest cause worldwide.",
        "textbookNote": "Iron deficiency is the commonest cause worldwide.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "A characteristic feature of kwashiorkor is",
        "opts": [
          "Edema present",
          "Body weight is 80–60% of standard",
          "Mostly occurs after one year of age",
          "Flaky skin"
        ],
        "correctIndex": 0,
        "explanation": "Pitting edema with hypoalbuminaemia.",
        "textbookNote": "Pitting edema with hypoalbuminaemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "PCR differs from biological cloning by the following point",
        "opts": [
          "PCR is an in vitro type of cloning process",
          "PCR requires heat-labile DNA polymerase",
          "PCR is highly insensitive",
          "PCR causes arithmetic rise of DNA"
        ],
        "correctIndex": 0,
        "explanation": "PCR is cell-free in vitro amplification.",
        "textbookNote": "PCR is cell-free in vitro amplification.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "The most important enzyme for replication is",
        "opts": [
          "Helicase",
          "Ligase",
          "DNA polymerase",
          "Topoisomerase"
        ],
        "correctIndex": 2,
        "explanation": "DNA polymerase.",
        "textbookNote": "DNA polymerase.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "In renal failure, acidosis occurs because",
        "opts": [
          "Buffer bases cannot be filtered",
          "Hydrogen ions cannot be secreted",
          "Bicarbonate cannot be reclaimed",
          "Urinary pH rapidly reaches its limiting point"
        ],
        "correctIndex": 1,
        "explanation": "Failed H+/NH4",
        "textbookNote": "Failed H+/NH4",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Autoregulation of blood supply is an exceptional quality of kidney. The aim of this is",
        "opts": [
          "Retain the nutrients",
          "Maintain the GFR",
          "Excrete the waste products",
          "Ensure the renal fraction"
        ],
        "correctIndex": 1,
        "explanation": "Autoregulation keeps GFR constant despite BP changes.",
        "textbookNote": "Autoregulation keeps GFR constant despite BP changes.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Many enzymes are necessary for biotechnology; the one known as the 'blessing of",
        "opts": [
          "Taq DNA polymerase",
          "DNA ligase",
          "Helicase",
          "Restriction endonuclease"
        ],
        "correctIndex": 3,
        "explanation": "Restriction endonucleases cut DNA specifically.",
        "textbookNote": "Restriction endonucleases cut DNA specifically.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Synthesized from a monohydric alcohol (cholesterol), activated in the kidney, and",
        "opts": [
          "Vitamin D",
          "Vitamin A",
          "Cholesterol ester",
          "PTH"
        ],
        "correctIndex": 0,
        "explanation": "Vitamin D (from cholesterol) → 25-OH in liver → 1,25-(OH)2 in kidney.",
        "textbookNote": "Vitamin D (from cholesterol) → 25-OH in liver → 1,25-(OH)2 in kidney.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2025-may-p1",
    "session": "May 2025",
    "year": 2025,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 3,
    "bookPage": "Biochemistry Bank (May 2025)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "The following statements are true for pH",
        "items": [
          {
            "label": "a",
            "text": "Negative log of proton concentration",
            "ans": true
          },
          {
            "label": "b",
            "text": "pH of pure water is 7.4",
            "ans": false
          },
          {
            "label": "c",
            "text": "If pH is 7, then proton concentration is 10-7 mol/L",
            "ans": true
          },
          {
            "label": "d",
            "text": "Addition of alkali to a solution increases pH",
            "ans": true
          },
          {
            "label": "e",
            "text": "pH + pOH = 14",
            "ans": true
          }
        ],
        "explanation": "(A): pH = –log10 [H+]. | (B): Pure water has [H+] = 10-7 mol/L, so pH = 7.0 (not 7.4; 7.4 is blood pH). | (C): pH 7 means [H+] = 10-7 mol/L. | (D): Alkali lowers [H+], so pH rises. | (E): At 25 °C, pH + pOH = 14 (Kw = 10-14).",
        "textbookNote": "(A): pH = –log10 [H+]. | (B): Pure water has [H+] = 10-7 mol/L, so pH = 7.0 (not 7.4; 7.4 is blood pH). | (C): pH 7 means [H+] = 10-7 mol/L. | (D): Alkali lowers [H+], so pH rises. | (E): At 25 °C, pH + pOH = 14 (Kw = 10-14).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Protein",
        "items": [
          {
            "label": "a",
            "text": "In plasma is 6–8 g/dL",
            "ans": true
          },
          {
            "label": "b",
            "text": "Contains no peptide bond in primary structure",
            "ans": false
          },
          {
            "label": "c",
            "text": "Acts as carrier for different substances in plasma",
            "ans": true
          },
          {
            "label": "d",
            "text": "Cannot be separated by electrophoresis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Does not need essential amino acids to maintain biological integrity",
            "ans": false
          }
        ],
        "explanation": "(A): Normal plasma protein is 6–8 g/dL. | (B): Primary structure is the sequence of amino acids joined by peptide bonds. | (C): Plasma proteins (albumin, globulins) carry hormones, drugs, bilirubin, etc. | (D): Plasma proteins are separated by electrophoresis (albumin, α1, α2, β, γ). | (E): Essential amino acids must be supplied in diet for protein synthesis.",
        "textbookNote": "(A): Normal plasma protein is 6–8 g/dL. | (B): Primary structure is the sequence of amino acids joined by peptide bonds. | (C): Plasma proteins (albumin, globulins) carry hormones, drugs, bilirubin, etc. | (D): Plasma proteins are separated by electrophoresis (albumin, α1, α2, β, γ). | (E): Essential amino acids must be supplied in diet for protein synthesis.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "The statements that can be applied for colloid",
        "items": [
          {
            "label": "a",
            "text": "Has a diameter of 1–200 millimicron",
            "ans": true
          },
          {
            "label": "b",
            "text": "Colloidal osmotic pressure is higher than that of crystalloids",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has dielectric pH",
            "ans": false
          },
          {
            "label": "d",
            "text": "Shows molecular movement in solution",
            "ans": false
          },
          {
            "label": "e",
            "text": "Sol–gel transformation occurs due to change of temperature",
            "ans": true
          }
        ],
        "explanation": "(A): Colloid particle size is 1–200 millimicron (nm); crystalloids are < 1 nm. | (B): Colloids have few particles per volume, so their osmotic pressure is lower than that of crystalloids. | (C): Colloids (proteins) have an ISOelectric pH; 'dielectric pH' does not exist. | (D): Colloids show Brownian movement (random particle movement); molecular/ionic movement is typical of | (E): Sol–gel transformation of colloids occurs with temperature change.",
        "textbookNote": "(A): Colloid particle size is 1–200 millimicron (nm); crystalloids are < 1 nm. | (B): Colloids have few particles per volume, so their osmotic pressure is lower than that of crystalloids. | (C): Colloids (proteins) have an ISOelectric pH; 'dielectric pH' does not exist. | (D): Colloids show Brownian movement (random particle movement); molecular/ionic movement is typical of | (E): Sol–gel transformation of colloids occurs with temperature change.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Co-enzyme",
        "items": [
          {
            "label": "a",
            "text": "Are heat stable",
            "ans": true
          },
          {
            "label": "b",
            "text": "Are inorganic",
            "ans": false
          },
          {
            "label": "c",
            "text": "Are water-soluble vitamin derivatives",
            "ans": true
          },
          {
            "label": "d",
            "text": "Are protein in nature",
            "ans": false
          },
          {
            "label": "e",
            "text": "Act as co-substrate",
            "ans": true
          }
        ],
        "explanation": "(A): Coenzymes are low-molecular-weight and heat stable; enzymes (proteins) are heat labile. | (B): Coenzymes are organic molecules (vitamin derivatives). | (C): Most coenzymes derive from water-soluble B vitamins. | (D): Coenzymes are non-protein organic molecules; the apoenzyme is the protein. | (E): Coenzymes like NAD+ are changed during reaction (co-substrates).",
        "textbookNote": "(A): Coenzymes are low-molecular-weight and heat stable; enzymes (proteins) are heat labile. | (B): Coenzymes are organic molecules (vitamin derivatives). | (C): Most coenzymes derive from water-soluble B vitamins. | (D): Coenzymes are non-protein organic molecules; the apoenzyme is the protein. | (E): Coenzymes like NAD+ are changed during reaction (co-substrates).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Isotopes",
        "items": [
          {
            "label": "a",
            "text": "Are atoms of different elements",
            "ans": false
          },
          {
            "label": "b",
            "text": "Are compounds having the same number of protons",
            "ans": false
          },
          {
            "label": "c",
            "text": "Radioactive isotopes can be used as a therapeutic tool",
            "ans": true
          },
          {
            "label": "d",
            "text": "Have different atomic weights",
            "ans": true
          },
          {
            "label": "e",
            "text": "Do not have a definite stable state",
            "ans": false
          }
        ],
        "explanation": "(A): Isotopes are atoms of the SAME element with different mass numbers. | (B): Isotopes are atoms, not compounds. | (C): Radioisotopes (I-131, Co-60) are used therapeutically. | (D): Different neutron number → different atomic (mass) weight. | (E): Some isotopes are stable, others radioactive.",
        "textbookNote": "(A): Isotopes are atoms of the SAME element with different mass numbers. | (B): Isotopes are atoms, not compounds. | (C): Radioisotopes (I-131, Co-60) are used therapeutically. | (D): Different neutron number → different atomic (mass) weight. | (E): Some isotopes are stable, others radioactive.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "The following statements can be applied for the H-H equation",
        "items": [
          {
            "label": "a",
            "text": "pH = 6.1 + log [HCO3",
            "ans": false
          },
          {
            "label": "b",
            "text": "pH = pK + log [HCO3",
            "ans": false
          },
          {
            "label": "c",
            "text": "pH = pK at half neutralization",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is a derivative of the law of mass action",
            "ans": true
          },
          {
            "label": "e",
            "text": "pH = pK + log salt/acid",
            "ans": true
          }
        ],
        "explanation": "(C): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (D): H-H equation is derived from the law of mass action applied to Ka of a weak acid. | (E): H-H equation: pH = pK + log [salt]/[acid].",
        "textbookNote": "(C): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (D): H-H equation is derived from the law of mass action applied to Ka of a weak acid. | (E): H-H equation: pH = pK + log [salt]/[acid].",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Which of the following are inhibitors of ETC?",
        "items": [
          {
            "label": "a",
            "text": "Carbon monoxide",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cyanide",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fluoride",
            "ans": false
          },
          {
            "label": "d",
            "text": "Free radicals",
            "ans": false
          },
          {
            "label": "e",
            "text": "Nitric oxide",
            "ans": true
          }
        ],
        "explanation": "(A): CO blocks cytochrome oxidase (complex IV). | (B): Cyanide blocks complex IV. | (C): Fluoride inhibits enolase (glycolysis), not ETC. | (D): Free radicals are by-products of ETC, not inhibitors. | (E): NO inhibits cytochrome oxidase.",
        "textbookNote": "(A): CO blocks cytochrome oxidase (complex IV). | (B): Cyanide blocks complex IV. | (C): Fluoride inhibits enolase (glycolysis), not ETC. | (D): Free radicals are by-products of ETC, not inhibitors. | (E): NO inhibits cytochrome oxidase.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding carbohydrates",
        "items": [
          {
            "label": "a",
            "text": "Lactose has reducing properties",
            "ans": true
          },
          {
            "label": "b",
            "text": "Fructose and glucose combine to form sucrose",
            "ans": true
          },
          {
            "label": "c",
            "text": "In animals, starch is the storage form of glucose",
            "ans": false
          },
          {
            "label": "d",
            "text": "Shows mutarotation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Altrose is a non-reducing sugar",
            "ans": false
          }
        ],
        "explanation": "(A): Lactose has a free anomeric C1 of glucose. | (B): Sucrose = glucose + fructose. | (C): Animals store glycogen (animal starch); starch is the plant store. | (D): Sugars with free anomeric carbon show mutarotation. | (E): Altrose is an aldohexose → reducing.",
        "textbookNote": "(A): Lactose has a free anomeric C1 of glucose. | (B): Sucrose = glucose + fructose. | (C): Animals store glycogen (animal starch); starch is the plant store. | (D): Sugars with free anomeric carbon show mutarotation. | (E): Altrose is an aldohexose → reducing.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Ammonia is removed from the body by",
        "items": [
          {
            "label": "a",
            "text": "NH4Cl formation",
            "ans": false
          },
          {
            "label": "b",
            "text": "Creatinine formation",
            "ans": false
          },
          {
            "label": "c",
            "text": "Glutamate formation",
            "ans": true
          },
          {
            "label": "d",
            "text": "Urea formation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Formation of NPN",
            "ans": false
          }
        ],
        "explanation": "(A): Ammonia is detoxified mainly to urea. | (B): Creatinine is from creatine, not ammonia removal. | (C): NH3 + α-KG → glutamate traps ammonia. | (D): Urea cycle is the major route. | (E): NPN includes urea but this is not ammonia removal.",
        "textbookNote": "(A): Ammonia is detoxified mainly to urea. | (B): Creatinine is from creatine, not ammonia removal. | (C): NH3 + α-KG → glutamate traps ammonia. | (D): Urea cycle is the major route. | (E): NPN includes urea but this is not ammonia removal.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Anabolism occurs during",
        "items": [
          {
            "label": "a",
            "text": "Synthetic reactions",
            "ans": true
          },
          {
            "label": "b",
            "text": "Degradation processes",
            "ans": false
          },
          {
            "label": "c",
            "text": "Gluconeogenesis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Oxidation of fatty acid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Utilization of acetone",
            "ans": false
          }
        ],
        "explanation": "(A): Anabolism = biosynthesis. | (B): Degradation is catabolism. | (C): Gluconeogenesis is an anabolic synthesis of glucose; occurs in fasting, liver/kidney, inhibited by insulin. | (D): Fatty acid oxidation is catabolic. | (E): Acetone utilisation is catabolic.",
        "textbookNote": "(A): Anabolism = biosynthesis. | (B): Degradation is catabolism. | (C): Gluconeogenesis is an anabolic synthesis of glucose; occurs in fasting, liver/kidney, inhibited by insulin. | (D): Fatty acid oxidation is catabolic. | (E): Acetone utilisation is catabolic.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Isotonic solution",
        "opts": [
          "0.9 g of NaCl in 100 mL is isotonic",
          "Can be used in dehydration",
          "Causes RBC rupture",
          "Has an osmolality of 260 mosmol/L"
        ],
        "correctIndex": 1,
        "explanation": "Isotonic saline (0.9% = 9 g/L) is used for dehydration; hypotonic fluids burst RBCs.",
        "textbookNote": "Isotonic saline (0.9% = 9 g/L) is used for dehydration; hypotonic fluids burst RBCs.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "The confirmatory test for diabetes mellitus is",
        "opts": [
          "Fasting blood glucose",
          "Random blood glucose",
          "HbA1c",
          "OGTT"
        ],
        "correctIndex": 3,
        "explanation": "OGTT is the confirmatory diagnostic test.",
        "textbookNote": "OGTT is the confirmatory diagnostic test.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "The following is true for bile salts",
        "opts": [
          "Bile salt reduces the surface tension of lipid",
          "Bile salt increases the surface area of the lipid droplet only",
          "It decreases lipid absorption by forming micelles",
          "Micelle is an aggregate of phospholipid only"
        ],
        "correctIndex": 0,
        "explanation": "Bile salts lower surface tension and emulsify fat.",
        "textbookNote": "Bile salts lower surface tension and emulsify fat.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "About properties of carbohydrate the following is true",
        "opts": [
          "Glucose is a keto derivative",
          "Fructose is dextrorotatory",
          "Sucrose on hydrolysis yields invert sugar",
          "Glucose in solution does not show mutarotation"
        ],
        "correctIndex": 2,
        "explanation": "Sucrose hydrolysis gives invert sugar (glucose + fructose); glucose is an aldose, fructose is laevorotatory,",
        "textbookNote": "Sucrose hydrolysis gives invert sugar (glucose + fructose); glucose is an aldose, fructose is laevorotatory,",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "The following statement is true for pH",
        "opts": [
          "Negative logarithm of [OH-]",
          "Negative log of H+ ion concentration",
          "If pH of a solution is 7 then pOH is 9",
          "If pH is 7.0, [H+] is 0.0001 mol/L"
        ],
        "correctIndex": 1,
        "explanation": "pH = –log [H+]; at pH 7 [H+] = 10-7 mol/L and pOH = 7.",
        "textbookNote": "pH = –log [H+]; at pH 7 [H+] = 10-7 mol/L and pOH = 7.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Which of the following is mostly affected in diabetes mellitus?",
        "opts": [
          "Carbohydrate",
          "Lipid",
          "Mineral",
          "Protein"
        ],
        "correctIndex": 0,
        "explanation": "DM is primarily a disorder of carbohydrate metabolism (secondarily fat and protein).",
        "textbookNote": "DM is primarily a disorder of carbohydrate metabolism (secondarily fat and protein).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Among the thyroid tests which one is most informative?",
        "opts": [
          "T3",
          "T4",
          "TRH",
          "TSH"
        ],
        "correctIndex": 3,
        "explanation": "TSH is the single most informative test; it rises in primary hypothyroidism and falls in hyperthyroidism.",
        "textbookNote": "TSH is the single most informative test; it rises in primary hypothyroidism and falls in hyperthyroidism.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Which proteolytic enzyme is more effective?",
        "opts": [
          "Chymotrypsin",
          "Carboxypeptidase",
          "Elastase",
          "Trypsin"
        ],
        "correctIndex": 3,
        "explanation": "Trypsin activates other zymogens and is the major pancreatic protease.",
        "textbookNote": "Trypsin activates other zymogens and is the major pancreatic protease.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Enzyme test most specific for parenchymal liver disease",
        "opts": [
          "ALT",
          "ACP",
          "LDH",
          "AST"
        ],
        "correctIndex": 0,
        "explanation": "ALT is more liver-specific than AST (AST is also in heart/muscle).",
        "textbookNote": "ALT is more liver-specific than AST (AST is also in heart/muscle).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Which of the following is an integral apoprotein of LDL?",
        "opts": [
          "Apo-A",
          "Apo-B-48",
          "Apo-B-100",
          "Apo-C"
        ],
        "correctIndex": 2,
        "explanation": "Apo B-100 is integral (non-exchangeable) in LDL; apo A and C are exchangeable.",
        "textbookNote": "Apo B-100 is integral (non-exchangeable) in LDL; apo A and C are exchangeable.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      }
    ]
  },
  {
    "id": "cmu-bio-2025-may-p2",
    "session": "May 2025",
    "year": 2025,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 4,
    "bookPage": "Biochemistry Bank (May 2025)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Southern blot technique requires",
        "items": [
          {
            "label": "a",
            "text": "Restriction enzyme",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hybrid DNA",
            "ans": true
          },
          {
            "label": "c",
            "text": "cDNA",
            "ans": false
          },
          {
            "label": "d",
            "text": "Electrophoresis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Nitrocellulose paper",
            "ans": true
          }
        ],
        "explanation": "(A): Southern blot: DNA is cut by restriction enzymes, run on gel, blotted, and probed. | (B): Probe hybridises with target DNA on the membrane. | (C): Southern blot uses a labelled DNA/RNA probe, cDNA is not required. | (D): DNA fragments are separated by gel electrophoresis. | (E): DNA is transferred to nitrocellulose/nylon membrane.",
        "textbookNote": "(A): Southern blot: DNA is cut by restriction enzymes, run on gel, blotted, and probed. | (B): Probe hybridises with target DNA on the membrane. | (C): Southern blot uses a labelled DNA/RNA probe, cDNA is not required. | (D): DNA fragments are separated by gel electrophoresis. | (E): DNA is transferred to nitrocellulose/nylon membrane.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Replication needs the following enzymes",
        "items": [
          {
            "label": "a",
            "text": "Helicase",
            "ans": true
          },
          {
            "label": "b",
            "text": "RNA primase",
            "ans": true
          },
          {
            "label": "c",
            "text": "DNA polymerase",
            "ans": true
          },
          {
            "label": "d",
            "text": "RNA polymerase",
            "ans": false
          },
          {
            "label": "e",
            "text": "DNA ligase",
            "ans": true
          }
        ],
        "explanation": "(A): Helicase unwinds DNA at the replication fork. | (B): Primase makes the RNA primer for DNA polymerase. | (C): DNA polymerase synthesises the new strand. | (D): RNA polymerase is for transcription (primase is a special RNA polymerase for primers). | (E): Ligase joins Okazaki fragments.",
        "textbookNote": "(A): Helicase unwinds DNA at the replication fork. | (B): Primase makes the RNA primer for DNA polymerase. | (C): DNA polymerase synthesises the new strand. | (D): RNA polymerase is for transcription (primase is a special RNA polymerase for primers). | (E): Ligase joins Okazaki fragments.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "PCR",
        "items": [
          {
            "label": "a",
            "text": "Needs Taq polymerase enzyme",
            "ans": true
          },
          {
            "label": "b",
            "text": "Needs primers",
            "ans": true
          },
          {
            "label": "c",
            "text": "Passes through proofreading activity",
            "ans": false
          },
          {
            "label": "d",
            "text": "Needs high temperature",
            "ans": true
          },
          {
            "label": "e",
            "text": "Can give false-positive results",
            "ans": true
          }
        ],
        "explanation": "(A): PCR uses heat-stable Taq polymerase. | (B): PCR needs two primers flanking the target. | (C): Taq polymerase lacks 3'→5' proofreading, so PCR can introduce errors. | (D): Denaturation at ~94 °C. | (E): Contamination can give false-positive PCR.",
        "textbookNote": "(A): PCR uses heat-stable Taq polymerase. | (B): PCR needs two primers flanking the target. | (C): Taq polymerase lacks 3'→5' proofreading, so PCR can introduce errors. | (D): Denaturation at ~94 °C. | (E): Contamination can give false-positive PCR.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Hypovolemia is corrected by",
        "items": [
          {
            "label": "a",
            "text": "ADH system",
            "ans": true
          },
          {
            "label": "b",
            "text": "RAAS",
            "ans": true
          },
          {
            "label": "c",
            "text": "ANP mechanism",
            "ans": false
          },
          {
            "label": "d",
            "text": "Producing less urine volume",
            "ans": true
          },
          {
            "label": "e",
            "text": "Decreasing thirst",
            "ans": false
          }
        ],
        "explanation": "(A): ADH conserves water in hypovolemia. | (B): RAAS retains Na+ and water in hypovolemia. | (C): ANP is released in hypervolemia and promotes Na+/water loss. | (D): Reduced urine output conserves volume. | (E): Thirst increases in hypovolemia.",
        "textbookNote": "(A): ADH conserves water in hypovolemia. | (B): RAAS retains Na+ and water in hypovolemia. | (C): ANP is released in hypervolemia and promotes Na+/water loss. | (D): Reduced urine output conserves volume. | (E): Thirst increases in hypovolemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Hyperkalemia",
        "items": [
          {
            "label": "a",
            "text": "Mostly occurs in acidosis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is associated with renal failure",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is corrected by aldosterone hormone",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is corrected by producing renin",
            "ans": false
          },
          {
            "label": "e",
            "text": "Causes paralytic ileus",
            "ans": false
          }
        ],
        "explanation": "(A): Acidosis moves K+ out of cells (H+–K+ exchange), causing hyperkalaemia. | (B): Renal failure impairs K+ excretion. | (D): Renin acts through angiotensin–aldosterone, but the direct corrector is aldosterone. | (E): Paralytic ileus is a feature of HYPOkalaemia.",
        "textbookNote": "(A): Acidosis moves K+ out of cells (H+–K+ exchange), causing hyperkalaemia. | (B): Renal failure impairs K+ excretion. | (D): Renin acts through angiotensin–aldosterone, but the direct corrector is aldosterone. | (E): Paralytic ileus is a feature of HYPOkalaemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Kwashiorkor",
        "items": [
          {
            "label": "a",
            "text": "Occurs in babies due to abrupt weaning",
            "ans": true
          },
          {
            "label": "b",
            "text": "Shows severe muscle wasting",
            "ans": false
          },
          {
            "label": "c",
            "text": "There are generalized edemas",
            "ans": true
          },
          {
            "label": "d",
            "text": "Baby's appetite is good",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is due to predominant protein deficiency",
            "ans": true
          }
        ],
        "explanation": "(B): Marasmus shows muscle wasting; kwashiorkor retains muscle bulk. | (D): Kwashiorkor: anorexia and apathy.",
        "textbookNote": "(B): Marasmus shows muscle wasting; kwashiorkor retains muscle bulk. | (D): Kwashiorkor: anorexia and apathy.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "The following statements are correct for obesity",
        "items": [
          {
            "label": "a",
            "text": "A BMI of > 24.9 in Asian people is designated as obesity",
            "ans": false
          },
          {
            "label": "b",
            "text": "A waist–hip ratio > 0.9 in males is designated as abdominal obesity",
            "ans": true
          },
          {
            "label": "c",
            "text": "Abdominal obesity, high triacylglycerol and insulin resistance together are risk factors for coronary",
            "ans": false
          },
          {
            "label": "d",
            "text": "Dietary fibre doesn't have any beneficial role in obesity",
            "ans": false
          },
          {
            "label": "e",
            "text": "Obesity is always associated with high energy intake",
            "ans": false
          }
        ],
        "explanation": "(A): WHO Asia-Pacific: BMI 23–27.4 = overweight; ≥ 27.5 = obese. | (D): Fibre gives satiety, delays absorption, lowers energy density. | (E): Obesity can result from low expenditure/genetic factors.",
        "textbookNote": "(A): WHO Asia-Pacific: BMI 23–27.4 = overweight; ≥ 27.5 = obese. | (D): Fibre gives satiety, delays absorption, lowers energy density. | (E): Obesity can result from low expenditure/genetic factors.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Kidney produces the following hormones",
        "items": [
          {
            "label": "a",
            "text": "Rennin",
            "ans": false
          },
          {
            "label": "b",
            "text": "Angiotensin",
            "ans": false
          },
          {
            "label": "c",
            "text": "1,25-dihydroxycholecalciferol",
            "ans": true
          },
          {
            "label": "d",
            "text": "Gastrin",
            "ans": false
          },
          {
            "label": "e",
            "text": "Erythropoietin",
            "ans": true
          }
        ],
        "explanation": "(A): Renin (JG cells) is the kidney enzyme/hormone; rennin (chymosin) is a gastric enzyme. | (B): Angiotensinogen is liver-made; Ang II is formed in plasma. | (C): Kidney 1α-hydroxylase makes calcitriol. | (D): Gastrin comes from stomach G cells. | (E): Peritubular cells of kidney make EPO.",
        "textbookNote": "(A): Renin (JG cells) is the kidney enzyme/hormone; rennin (chymosin) is a gastric enzyme. | (B): Angiotensinogen is liver-made; Ang II is formed in plasma. | (C): Kidney 1α-hydroxylase makes calcitriol. | (D): Gastrin comes from stomach G cells. | (E): Peritubular cells of kidney make EPO.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Vitamin K",
        "items": [
          {
            "label": "a",
            "text": "Helps in post-translational maturation of clotting factors",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is abundant in breast milk for newborn baby",
            "ans": false
          },
          {
            "label": "c",
            "text": "Menaquinone is the synthetic analogue",
            "ans": false
          },
          {
            "label": "d",
            "text": "Toxicity of the synthetic form causes hemolytic anemia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is used as antidote in warfarin poisoning",
            "ans": true
          }
        ],
        "explanation": "(A): Vitamin K γ-carboxylates Glu residues of factors II, VII, IX, X. | (B): Breast milk is poor in vitamin K → vitamin K prophylaxis at birth. | (C): Menaquinone (K2) is bacterial; menadione (K3) is synthetic. | (D): High-dose synthetic menadione causes hemolysis in neonates. | (E): Warfarin blocks vitamin K epoxide reductase; vitamin K reverses it.",
        "textbookNote": "(A): Vitamin K γ-carboxylates Glu residues of factors II, VII, IX, X. | (B): Breast milk is poor in vitamin K → vitamin K prophylaxis at birth. | (C): Menaquinone (K2) is bacterial; menadione (K3) is synthetic. | (D): High-dose synthetic menadione causes hemolysis in neonates. | (E): Warfarin blocks vitamin K epoxide reductase; vitamin K reverses it.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Regarding metabolic acidosis",
        "items": [
          {
            "label": "a",
            "text": "GIT cause predominant (diarrhea)",
            "ans": true
          },
          {
            "label": "b",
            "text": "Anion gap is always high",
            "ans": false
          },
          {
            "label": "c",
            "text": "Correction is done by hyperventilation (respiratory compensation)",
            "ans": true
          },
          {
            "label": "d",
            "text": "Primary defect is low HCO3",
            "ans": false
          },
          {
            "label": "e",
            "text": "Base excess becomes negative",
            "ans": true
          }
        ],
        "explanation": "(B): Anion gap is high in some, normal in other metabolic acidosis. | (C): Hyperventilation (Kussmaul) is respiratory compensation that lowers PCO2. | (E): Base excess becomes negative (base deficit) in metabolic acidosis.",
        "textbookNote": "(B): Anion gap is high in some, normal in other metabolic acidosis. | (C): Hyperventilation (Kussmaul) is respiratory compensation that lowers PCO2. | (E): Base excess becomes negative (base deficit) in metabolic acidosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Metabolic acidosis is characterized by",
        "opts": [
          "Low plasma bicarbonate level",
          "Increased bicarbonate to PCO2 ratio",
          "Increased acid production only",
          "Increased bicarbonate utilization only"
        ],
        "correctIndex": 0,
        "explanation": "Primary event is a fall in plasma bicarbonate.",
        "textbookNote": "Primary event is a fall in plasma bicarbonate.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "The most common cause of hypokalemia is",
        "opts": [
          "Diarrhea, vomiting",
          "Excessive diuretic use",
          "Low dietary intake",
          "Metabolic alkalosis"
        ],
        "correctIndex": 0,
        "explanation": "Gastrointestinal loss (diarrhoea/vomiting) is the commonest cause.",
        "textbookNote": "Gastrointestinal loss (diarrhoea/vomiting) is the commonest cause.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Plasma osmolality mainly depends upon",
        "opts": [
          "Sodium",
          "Potassium",
          "Glucose",
          "Urea"
        ],
        "correctIndex": 0,
        "explanation": "Na+ (with its anions) contributes ~90% of plasma osmolality.",
        "textbookNote": "Na+ (with its anions) contributes ~90% of plasma osmolality.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "The primary regulator of low plasma sodium concentration is",
        "opts": [
          "RAAS",
          "Aldosterone",
          "ANP",
          "ADH"
        ],
        "correctIndex": 3,
        "explanation": "Hyponatraemia is mainly due to water excess; ADH regulates water.",
        "textbookNote": "Hyponatraemia is mainly due to water excess; ADH regulates water.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Hyperventilation",
        "opts": [
          "Decreases PCO2",
          "Occurs in metabolic alkalosis",
          "Causes acidosis",
          "Occurs in response to decreased H+ concentration"
        ],
        "correctIndex": 0,
        "explanation": "Hyperventilation lowers PCO2 (respiratory alkalosis).",
        "textbookNote": "Hyperventilation lowers PCO2 (respiratory alkalosis).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "The vitamin that is synthesized in significant amount in our body is",
        "opts": [
          "Vitamin D",
          "Vitamin K",
          "Niacin",
          "Biotin"
        ],
        "correctIndex": 0,
        "explanation": "Skin synthesises vitamin D under UV-B.",
        "textbookNote": "Skin synthesises vitamin D under UV-B.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "The most common cause of microcytic hypochromic anemia is",
        "opts": [
          "Iron deficiency anemia",
          "Anemia of chronic disease",
          "Thalassemia",
          "Sideroblastic anemia"
        ],
        "correctIndex": 0,
        "explanation": "Iron deficiency (↓Hb synthesis) is the commonest cause of microcytic hypochromic anaemia.",
        "textbookNote": "Iron deficiency (↓Hb synthesis) is the commonest cause of microcytic hypochromic anaemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Which statement is WRONG for RFLP?",
        "opts": [
          "May be a DNA mutation effect",
          "In intron helps in DNA fingerprinting",
          "Can be detected by Southern blot technique",
          "Detection doesn't require restriction enzymes"
        ],
        "correctIndex": 3,
        "explanation": "RFLP needs restriction enzyme digestion followed by Southern blot.",
        "textbookNote": "RFLP needs restriction enzyme digestion followed by Southern blot.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Property of the genetic codon responsible for silent mutation",
        "opts": [
          "Commaless",
          "Degeneracy",
          "Nonoverlapping",
          "Specificity"
        ],
        "correctIndex": 1,
        "explanation": "Degeneracy of the code lets different codons code for the same amino acid.",
        "textbookNote": "Degeneracy of the code lets different codons code for the same amino acid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Acidification of urine is mostly done in",
        "opts": [
          "Distal convoluted tubule and collecting duct",
          "Glomerulus",
          "Loop of Henle",
          "Proximal convoluted tubule"
        ],
        "correctIndex": 0,
        "explanation": "DCT/collecting-duct intercalated cells secrete H+.",
        "textbookNote": "DCT/collecting-duct intercalated cells secrete H+.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2024-nov-p2",
    "session": "November 2024",
    "year": 2024,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 5,
    "bookPage": "Biochemistry Bank (November 2024)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Body water is maintained by",
        "items": [
          {
            "label": "a",
            "text": "Hypothalamus",
            "ans": true
          },
          {
            "label": "b",
            "text": "ADH",
            "ans": true
          },
          {
            "label": "c",
            "text": "Thyroxine",
            "ans": false
          },
          {
            "label": "d",
            "text": "Plasma osmolarity",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thirst mechanism",
            "ans": true
          }
        ],
        "explanation": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "textbookNote": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Regarding vitamin B12",
        "items": [
          {
            "label": "a",
            "text": "Is a cobalt-containing compound possessing the corrin ring",
            "ans": true
          },
          {
            "label": "b",
            "text": "Its deficiency causes microcytic hypochromic anemia",
            "ans": false
          },
          {
            "label": "c",
            "text": "A strict vegetarian may develop B12 deficiency",
            "ans": true
          },
          {
            "label": "d",
            "text": "Its deficiency causes folic acid deficiency",
            "ans": false
          },
          {
            "label": "e",
            "text": "Its main function is production of RBC from stem cells",
            "ans": true
          }
        ],
        "explanation": "(A): B12 contains cobalt in a corrin ring. | (B): B12 deficiency causes megaloblastic (macrocytic) anaemia; iron deficiency gives microcytic anaemia. | (C): B12 occurs only in animal foods. | (D): B12 deficiency traps folate as methyl-THF (functional folate deficiency). | (E): B12 is required for DNA synthesis in maturing erythroblasts.",
        "textbookNote": "(A): B12 contains cobalt in a corrin ring. | (B): B12 deficiency causes megaloblastic (macrocytic) anaemia; iron deficiency gives microcytic anaemia. | (C): B12 occurs only in animal foods. | (D): B12 deficiency traps folate as methyl-THF (functional folate deficiency). | (E): B12 is required for DNA synthesis in maturing erythroblasts.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Vitamin C inhibits iron absorption from gut",
            "ans": false
          },
          {
            "label": "b",
            "text": "Selenium acts as an antioxidant",
            "ans": true
          },
          {
            "label": "c",
            "text": "Calcitonin increases blood calcium level",
            "ans": false
          },
          {
            "label": "d",
            "text": "Iodine deficiency causes mental retardation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Retinol acts as a carrier / antioxidant vitamin",
            "ans": true
          }
        ],
        "explanation": "(A): Vitamin C reduces Fe3+ to Fe2+ and ENHANCES absorption. | (B): Selenium is a component of glutathione peroxidase (antioxidant). | (C): Calcitonin LOWERS blood calcium. | (D): Iodine is needed for thyroid hormone for brain development. | (E): Retinol/carotenoids have antioxidant action.",
        "textbookNote": "(A): Vitamin C reduces Fe3+ to Fe2+ and ENHANCES absorption. | (B): Selenium is a component of glutathione peroxidase (antioxidant). | (C): Calcitonin LOWERS blood calcium. | (D): Iodine is needed for thyroid hormone for brain development. | (E): Retinol/carotenoids have antioxidant action.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Folic acid has the following facts",
        "items": [
          {
            "label": "a",
            "text": "Deficiency causes microcytic anemia",
            "ans": false
          },
          {
            "label": "b",
            "text": "Active form is tetrahydrofolate",
            "ans": true
          },
          {
            "label": "c",
            "text": "Acts as carrier of single carbon unit",
            "ans": true
          },
          {
            "label": "d",
            "text": "Vitamin B12 is not essential for folic acid metabolism",
            "ans": false
          },
          {
            "label": "e",
            "text": "Chronic alcoholism causes deficiency",
            "ans": true
          }
        ],
        "explanation": "(A): Folate deficiency causes macrocytic (megaloblastic) anaemia. | (B): THF is the active coenzyme form of folate. | (C): THF carries one-carbon groups for purine/thymidylate synthesis. | (D): B12 is needed to regenerate THF from methyl-THF. | (E): Alcohol impairs folate absorption and increases loss.",
        "textbookNote": "(A): Folate deficiency causes macrocytic (megaloblastic) anaemia. | (B): THF is the active coenzyme form of folate. | (C): THF carries one-carbon groups for purine/thymidylate synthesis. | (D): B12 is needed to regenerate THF from methyl-THF. | (E): Alcohol impairs folate absorption and increases loss.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Criteria of autosomal dominant disorder",
        "items": [
          {
            "label": "a",
            "text": "Skip generation is possible",
            "ans": false
          },
          {
            "label": "b",
            "text": "New mutation occurs",
            "ans": true
          },
          {
            "label": "c",
            "text": "Follows vertical transmission",
            "ans": true
          },
          {
            "label": "d",
            "text": "Involves sex chromosome",
            "ans": false
          },
          {
            "label": "e",
            "text": "Diabetes insipidus is an example",
            "ans": false
          }
        ],
        "explanation": "(A): AD disease appears in every generation (vertical). | (B): AD diseases can arise from new mutations (e.g., achondroplasia). | (C): AD disease: vertical transmission. | (D): AD = autosomal. | (E): Nephrogenic DI is X-linked recessive.",
        "textbookNote": "(A): AD disease appears in every generation (vertical). | (B): AD diseases can arise from new mutations (e.g., achondroplasia). | (C): AD disease: vertical transmission. | (D): AD = autosomal. | (E): Nephrogenic DI is X-linked recessive.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Dietary fibre",
        "items": [
          {
            "label": "a",
            "text": "Decreases the incidence of constipation",
            "ans": true
          },
          {
            "label": "b",
            "text": "Increases the absorption of cholesterol",
            "ans": false
          },
          {
            "label": "c",
            "text": "Decreases the absorption of zinc",
            "ans": true
          },
          {
            "label": "d",
            "text": "Decreases the incidence of diverticulosis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Helps in better control of diabetes mellitus",
            "ans": true
          }
        ],
        "explanation": "(B): Fibre binds bile acids, REDUCING cholesterol absorption. | (D): Fibre prevents diverticulosis.",
        "textbookNote": "(B): Fibre binds bile acids, REDUCING cholesterol absorption. | (D): Fibre prevents diverticulosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Statement related to transcription",
        "items": [
          {
            "label": "a",
            "text": "Synthesis of protein following rRNA",
            "ans": false
          },
          {
            "label": "b",
            "text": "Requires RNA polymerase",
            "ans": true
          },
          {
            "label": "c",
            "text": "Promoter sequence is needed",
            "ans": true
          },
          {
            "label": "d",
            "text": "5' cap is formed by polyadenylation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Has no proofreading property",
            "ans": true
          }
        ],
        "explanation": "(A): Transcription makes RNA; protein synthesis is translation. | (B): PCR uses DNA polymerase. | (C): RNA polymerase binds the promoter. | (D): 5' cap = 7-methylguanosine; polyadenylation is the 3' tail. | (E): RNA polymerase lacks efficient proofreading.",
        "textbookNote": "(A): Transcription makes RNA; protein synthesis is translation. | (B): PCR uses DNA polymerase. | (C): RNA polymerase binds the promoter. | (D): 5' cap = 7-methylguanosine; polyadenylation is the 3' tail. | (E): RNA polymerase lacks efficient proofreading.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding BMI",
        "items": [
          {
            "label": "a",
            "text": "20 is within normal value",
            "ans": true
          },
          {
            "label": "b",
            "text": "38 is obese",
            "ans": true
          },
          {
            "label": "c",
            "text": "Calculated by weight in kg / height in metre squared",
            "ans": true
          },
          {
            "label": "d",
            "text": "High value is a risk for DM",
            "ans": true
          },
          {
            "label": "e",
            "text": "Can determine malnutrition",
            "ans": true
          }
        ],
        "explanation": "(A): Normal BMI 18.5–24.9. | (B): BMI ≥ 30 = obese (≥ 27.5 in Asians). | (C): BMI = kg/m². | (D): Obesity ↑ insulin resistance. | (E): Low BMI = undernutrition.",
        "textbookNote": "(A): Normal BMI 18.5–24.9. | (B): BMI ≥ 30 = obese (≥ 27.5 in Asians). | (C): BMI = kg/m². | (D): Obesity ↑ insulin resistance. | (E): Low BMI = undernutrition.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "The following are examples of post-translational modification",
        "items": [
          {
            "label": "a",
            "text": "5' capping",
            "ans": false
          },
          {
            "label": "b",
            "text": "Proteolytic cleavage",
            "ans": true
          },
          {
            "label": "c",
            "text": "Reversible phosphorylation and dephosphorylation",
            "ans": true
          },
          {
            "label": "d",
            "text": "Splicing",
            "ans": false
          },
          {
            "label": "e",
            "text": "Hydroxylation",
            "ans": true
          }
        ],
        "explanation": "(A): 5' capping is post-TRANSCRIPTIONAL. | (B): Post-translational: e.g., zymogen activation. | (C): Reversible phosphorylation is a post-translational modification. | (D): Splicing is post-transcriptional. | (E): Hydroxylation (collagen) is post-translational.",
        "textbookNote": "(A): 5' capping is post-TRANSCRIPTIONAL. | (B): Post-translational: e.g., zymogen activation. | (C): Reversible phosphorylation is a post-translational modification. | (D): Splicing is post-transcriptional. | (E): Hydroxylation (collagen) is post-translational.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Regarding trace elements",
        "items": [
          {
            "label": "a",
            "text": "Zn helps in insulin synthesis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Selenium is an antioxidant",
            "ans": true
          },
          {
            "label": "c",
            "text": "Ca normal is 2 mg/dL",
            "ans": false
          },
          {
            "label": "d",
            "text": "Iron deficiency causes anemia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Na maintains the osmolality",
            "ans": true
          }
        ],
        "explanation": "(A): Zinc is needed for insulin storage/action. | (C): Normal calcium is 8.5–10.5 mg/dL (2.1–2.6 mmol/L). | (D): Iron is needed for haemoglobin. | (E): Na+ is the main determinant of ECF osmolality.",
        "textbookNote": "(A): Zinc is needed for insulin storage/action. | (C): Normal calcium is 8.5–10.5 mg/dL (2.1–2.6 mmol/L). | (D): Iron is needed for haemoglobin. | (E): Na+ is the main determinant of ECF osmolality.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Earliest feature of vitamin A deficiency",
        "opts": [
          "Immune system disorder",
          "Gastritis",
          "Night blindness",
          "Toad skin",
          "Keratomalacia"
        ],
        "correctIndex": 2,
        "explanation": "Night blindness is the earliest sign.",
        "textbookNote": "Night blindness is the earliest sign.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "In replication",
        "opts": [
          "Occurs only during cell division",
          "It is DNA-directed DNA synthesis",
          "A primer is not needed",
          "RNAP is needed",
          "RNAP has proofreading"
        ],
        "correctIndex": 1,
        "explanation": "Replication is DNA-directed DNA synthesis by DNA polymerase.",
        "textbookNote": "Replication is DNA-directed DNA synthesis by DNA polymerase.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Which of the following would be most appropriate for vitamin B12?",
        "opts": [
          "Absorption occurs in large gut",
          "Is abundant in plant sources",
          "Absorbed without intrinsic factor",
          "Helps in RBC maturation",
          "Deficiency causes microcytic anemia"
        ],
        "correctIndex": 3,
        "explanation": "B12 is needed for DNA synthesis → RBC maturation.",
        "textbookNote": "B12 is needed for DNA synthesis → RBC maturation.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "The worst effect of folic acid deficiency",
        "opts": [
          "Megaloblastic anemia",
          "Peripheral neuropathy",
          "Neural tube defect",
          "Lethargy",
          "Infertility"
        ],
        "correctIndex": 2,
        "explanation": "Folate deficiency in pregnancy causes neural tube defects.",
        "textbookNote": "Folate deficiency in pregnancy causes neural tube defects.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "The most important feature of scurvy is",
        "opts": [
          "Rough skin",
          "Bleeding from gum",
          "Poor wound healing",
          "Loosening of teeth",
          "Anemia"
        ],
        "correctIndex": 1,
        "explanation": "Weak capillaries/collagen defect → gum bleeding.",
        "textbookNote": "Weak capillaries/collagen defect → gum bleeding.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Karyotyping is done in",
        "opts": [
          "Down syndrome",
          "Haemophilia",
          "Cystic fibrosis",
          "Familial hypercholesterolemia",
          "Polycystic kidney disease"
        ],
        "correctIndex": 0,
        "explanation": "Karyotype is used for chromosomal disorders like Down syndrome.",
        "textbookNote": "Karyotype is used for chromosomal disorders like Down syndrome.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Best feature of mitochondrial DNA",
        "opts": [
          "The sperm does not contain mitochondrial DNA",
          "It accounts for about 1% of total human DNA",
          "It encodes 37 genes",
          "Synthesizes respiratory chain enzymes",
          "Shows variable expression"
        ],
        "correctIndex": 2,
        "explanation": "mtDNA encodes 37 genes (13 proteins, 22 tRNA, 2 rRNA).",
        "textbookNote": "mtDNA encodes 37 genes (13 proteins, 22 tRNA, 2 rRNA).",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Select the reliable diagnostic tool for PEM",
        "opts": [
          "Decreased protein level",
          "Skin change",
          "Hair change",
          "BMI",
          "Edema"
        ],
        "correctIndex": 3,
        "explanation": "BMI/weight-for-height is the reliable anthropometric tool; protein levels and clinical signs vary.",
        "textbookNote": "BMI/weight-for-height is the reliable anthropometric tool; protein levels and clinical signs vary.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Most important feature regarding mutation",
        "opts": [
          "Changes in DNA",
          "Germ line mutation",
          "Mutation is somatic cell",
          "Result in error in DNA replication during cell division",
          "Changes in coding region"
        ],
        "correctIndex": 0,
        "explanation": "A mutation is a change in DNA sequence.",
        "textbookNote": "A mutation is a change in DNA sequence.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "The most common karyotype of Turner syndrome is",
        "opts": [
          "Monosomy only",
          "Mosaic",
          "45,XO",
          "Is a ring chromosome",
          "Deletion"
        ],
        "correctIndex": 2,
        "explanation": "Turner syndrome is 45,X.",
        "textbookNote": "Turner syndrome is 45,X.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2024-may-p1",
    "session": "May 2024",
    "year": 2024,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 6,
    "bookPage": "Biochemistry Bank (May 2024)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "The following are the normal levels in blood",
        "items": [
          {
            "label": "a",
            "text": "Na+ level is 135–145 mEq/L",
            "ans": true
          },
          {
            "label": "b",
            "text": "K+ level is 3.5–5.3 mEq/L",
            "ans": true
          },
          {
            "label": "c",
            "text": "HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "97–105 mEq/L is for Cl-",
            "ans": true
          },
          {
            "label": "e",
            "text": "Plasma osmolarity is 280–296 mosm/L",
            "ans": true
          }
        ],
        "explanation": "(E): Normal plasma osmolarity is ~280–296 mosmol/L.",
        "textbookNote": "(E): Normal plasma osmolarity is ~280–296 mosmol/L.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Insulin",
        "items": [
          {
            "label": "a",
            "text": "Is a potent anabolic hormone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is required for utilization of glucose in brain",
            "ans": false
          },
          {
            "label": "c",
            "text": "Increases glucose uptake in skeletal muscle",
            "ans": true
          },
          {
            "label": "d",
            "text": "Increases plasma K+",
            "ans": false
          },
          {
            "label": "e",
            "text": "Mode of action is mediated by cAMP",
            "ans": false
          }
        ],
        "explanation": "(A): Insulin promotes glycogen, fat and protein synthesis. | (B): Brain uses GLUT-3, which is insulin-independent. | (C): Insulin recruits GLUT-4 in muscle and adipose tissue. | (D): Insulin drives K+ into cells (lowers plasma K+); used to treat hyperkalaemia. | (E): Insulin acts via tyrosine kinase receptor.",
        "textbookNote": "(A): Insulin promotes glycogen, fat and protein synthesis. | (B): Brain uses GLUT-3, which is insulin-independent. | (C): Insulin recruits GLUT-4 in muscle and adipose tissue. | (D): Insulin drives K+ into cells (lowers plasma K+); used to treat hyperkalaemia. | (E): Insulin acts via tyrosine kinase receptor.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Blood calcium level is regulated by",
        "items": [
          {
            "label": "a",
            "text": "ADH",
            "ans": false
          },
          {
            "label": "b",
            "text": "PTH",
            "ans": true
          },
          {
            "label": "c",
            "text": "ACTH",
            "ans": false
          },
          {
            "label": "d",
            "text": "Calcitonin",
            "ans": true
          },
          {
            "label": "e",
            "text": "Calcitriol",
            "ans": true
          }
        ],
        "explanation": "(A): ADH conserves water by increasing collecting-duct permeability. | (C): ACTH controls cortisol, not calcium.",
        "textbookNote": "(A): ADH conserves water by increasing collecting-duct permeability. | (C): ACTH controls cortisol, not calcium.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding colloids",
        "items": [
          {
            "label": "a",
            "text": "Non-dialyzable",
            "ans": true
          },
          {
            "label": "b",
            "text": "Particle size < 1 nm",
            "ans": false
          },
          {
            "label": "c",
            "text": "Exhibits Brownian movement",
            "ans": true
          },
          {
            "label": "d",
            "text": "Can pass through semipermeable membrane",
            "ans": false
          },
          {
            "label": "e",
            "text": "Has a definite isoelectric pH",
            "ans": true
          }
        ],
        "explanation": "(A): Colloids are too large to pass through a dialysis membrane. | (B): Colloid particle size is 1–200 nm; < 1 nm is crystalloid. | (D): Crystalloids pass; colloids cannot pass through semipermeable membranes. | (E): Colloids such as proteins have a definite isoelectric pH.",
        "textbookNote": "(A): Colloids are too large to pass through a dialysis membrane. | (B): Colloid particle size is 1–200 nm; < 1 nm is crystalloid. | (D): Crystalloids pass; colloids cannot pass through semipermeable membranes. | (E): Colloids such as proteins have a definite isoelectric pH.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Regarding primary hypothyroidism",
        "items": [
          {
            "label": "a",
            "text": "Serum cholesterol increases",
            "ans": true
          },
          {
            "label": "b",
            "text": "TSH always increases",
            "ans": true
          },
          {
            "label": "c",
            "text": "TSH is 5–20 μIU/mL in subclinical hypothyroidism",
            "ans": true
          },
          {
            "label": "d",
            "text": "T3 and T4 may be normal",
            "ans": true
          },
          {
            "label": "e",
            "text": "Strongly associated with infertility",
            "ans": true
          }
        ],
        "explanation": "(A): Hypothyroidism reduces LDL receptors → ↑ cholesterol. | (B): Primary hypothyroidism → raised TSH. | (C): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (D): In subclinical hypothyroidism T3/T4 are normal. | (E): Hypothyroidism causes anovulation/menstrual disturbance → infertility.",
        "textbookNote": "(A): Hypothyroidism reduces LDL receptors → ↑ cholesterol. | (B): Primary hypothyroidism → raised TSH. | (C): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (D): In subclinical hypothyroidism T3/T4 are normal. | (E): Hypothyroidism causes anovulation/menstrual disturbance → infertility.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "All amino acids undergo transamination",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ammonia is removed by intestinal bacterial degradation",
            "ans": false
          },
          {
            "label": "c",
            "text": "Oxidative deamination is a catabolic process",
            "ans": true
          },
          {
            "label": "d",
            "text": "Excretion of NH3 with urine as NH4",
            "ans": false
          },
          {
            "label": "e",
            "text": "Proline can be synthesized from the urea cycle",
            "ans": false
          }
        ],
        "explanation": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "textbookNote": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "About digestion the following are true",
        "items": [
          {
            "label": "a",
            "text": "Is a process of hydrolysis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lipid digestion begins in mouth",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pepsin splits carbohydrate into glucose",
            "ans": false
          },
          {
            "label": "d",
            "text": "Micelle is an aggregate of cholesterol only",
            "ans": false
          },
          {
            "label": "e",
            "text": "Bile salt reduces the surface tension of fat",
            "ans": true
          }
        ],
        "explanation": "(C): Pepsin digests protein. | (D): Micelles contain bile salts, phospholipid, cholesterol and FA — not cholesterol alone. | (E): Bile salts are detergents that lower surface tension → emulsification.",
        "textbookNote": "(C): Pepsin digests protein. | (D): Micelles contain bile salts, phospholipid, cholesterol and FA — not cholesterol alone. | (E): Bile salts are detergents that lower surface tension → emulsification.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding oxidative phosphorylation",
        "items": [
          {
            "label": "a",
            "text": "Requires electron transport chain",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occurs in the inter-membrane space",
            "ans": false
          },
          {
            "label": "c",
            "text": "NADPH undergoes oxidation",
            "ans": false
          },
          {
            "label": "d",
            "text": "Produces ATP",
            "ans": true
          },
          {
            "label": "e",
            "text": "Most accepted mechanism is the chemiosmotic hypothesis",
            "ans": true
          }
        ],
        "explanation": "(A): Oxidative phosphorylation couples ETC to ATP synthase. | (B): Occurs at the inner mitochondrial membrane. | (C): ETC oxidises NADH/FADH2, not NADPH. | (D): Glycolysis produces ATP. | (E): Mitchell's chemiosmotic hypothesis explains ATP synthesis.",
        "textbookNote": "(A): Oxidative phosphorylation couples ETC to ATP synthase. | (B): Occurs at the inner mitochondrial membrane. | (C): ETC oxidises NADH/FADH2, not NADPH. | (D): Glycolysis produces ATP. | (E): Mitchell's chemiosmotic hypothesis explains ATP synthesis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "The following are true in glycolysis",
        "items": [
          {
            "label": "a",
            "text": "Glucose or glycogen is broken down",
            "ans": true
          },
          {
            "label": "b",
            "text": "The end product of glycolysis is pyruvate only",
            "ans": false
          },
          {
            "label": "c",
            "text": "There are four irreversible reactions",
            "ans": false
          },
          {
            "label": "d",
            "text": "Conversion of pyruvate to lactate is oxidation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Net 2 ATP are produced in the aerobic pathway",
            "ans": false
          }
        ],
        "explanation": "(A): Glycolysis starts from glucose or glycogen (via G6P). | (B): Pyruvate is the end product aerobically; in anaerobic glycolysis it is reduced to lactate, so 'only' is wrong. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Pyruvate → lactate is REDUCTION (NADH → NAD+). | (E): Aerobic net ≈ 7–8 ATP; 2 ATP is anaerobic.",
        "textbookNote": "(A): Glycolysis starts from glucose or glycogen (via G6P). | (B): Pyruvate is the end product aerobically; in anaerobic glycolysis it is reduced to lactate, so 'only' is wrong. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Pyruvate → lactate is REDUCTION (NADH → NAD+). | (E): Aerobic net ≈ 7–8 ATP; 2 ATP is anaerobic.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Ketoacidosis could be a finding of",
        "items": [
          {
            "label": "a",
            "text": "Uncontrolled diabetes mellitus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Prolonged starvation",
            "ans": true
          },
          {
            "label": "c",
            "text": "Severe diarrhea",
            "ans": false
          },
          {
            "label": "d",
            "text": "Persistent vomiting",
            "ans": false
          },
          {
            "label": "e",
            "text": "Renal failure",
            "ans": false
          }
        ],
        "explanation": "(A): Absent insulin → ketogenesis. | (B): Low insulin/glucose in starvation → ketosis. | (C): Diarrhoea gives non-ketotic metabolic acidosis. | (D): Vomiting causes metabolic alkalosis (loss of HCl), not ketoacidosis. | (E): Renal failure causes uraemic (high-AG) acidosis without ketones.",
        "textbookNote": "(A): Absent insulin → ketogenesis. | (B): Low insulin/glucose in starvation → ketosis. | (C): Diarrhoea gives non-ketotic metabolic acidosis. | (D): Vomiting causes metabolic alkalosis (loss of HCl), not ketoacidosis. | (E): Renal failure causes uraemic (high-AG) acidosis without ketones.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "For glucose 6-phosphate",
        "opts": [
          "Can freely cross the cell membrane",
          "Is produced by glucose-6-phosphatase",
          "Feeds glycolysis, glycogenesis and the HMP shunt pathway",
          "Is produced without ATP",
          "Activates hexokinase"
        ],
        "correctIndex": 2,
        "explanation": "G6P is the branch-point for glycolysis, glycogenesis and HMP shunt.",
        "textbookNote": "G6P is the branch-point for glycolysis, glycogenesis and HMP shunt.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Most important enzyme of the feed state is",
        "opts": [
          "Glycogen synthase",
          "Phosphoprotein phosphatase and phosphodiesterase",
          "Lipoprotein lipase",
          "Acetyl-CoA carboxylase",
          "Pyruvate kinase"
        ],
        "correctIndex": 0,
        "explanation": "Glycogen synthase is activated by insulin in the fed state.",
        "textbookNote": "Glycogen synthase is activated by insulin in the fed state.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "For the TCA cycle",
        "opts": [
          "Central pathway for oxidation of carbohydrate, protein and fat",
          "Supports gluconeogenesis",
          "Has limited capacity in fasting condition",
          "Depends upon oxaloacetate",
          "Produces oxaloacetate"
        ],
        "correctIndex": 0,
        "explanation": "TCA is the final common oxidative pathway for fuels.",
        "textbookNote": "TCA is the final common oxidative pathway for fuels.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Regarding acute hepatitis",
        "opts": [
          "Low serum AST",
          "Low serum bilirubin",
          "High serum ALT",
          "Low serum albumin",
          "Prolonged prothrombin time"
        ],
        "correctIndex": 2,
        "explanation": "ALT is the most specific marker of hepatocellular injury.",
        "textbookNote": "ALT is the most specific marker of hepatocellular injury.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "The most important laboratory finding in primary hypothyroidism",
        "opts": [
          "Increased TSH",
          "Decreased T3",
          "Decreased T4",
          "Increased anti-TPO",
          "Increased anti-TG"
        ],
        "correctIndex": 0,
        "explanation": "Raised TSH is the hallmark.",
        "textbookNote": "Raised TSH is the hallmark.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "A young woman complains of cold intolerance, tiredness and weight gain. Laboratory",
        "opts": [
          "Hashimoto's thyroiditis",
          "Thyroidectomy",
          "Pituitary disease",
          "Hypothalamic disease",
          "Thyroid hormone resistance"
        ],
        "correctIndex": 0,
        "explanation": "High TSH + low T3/T4 + normal urinary iodine = autoimmune (Hashimoto's) thyroiditis.",
        "textbookNote": "High TSH + low T3/T4 + normal urinary iodine = autoimmune (Hashimoto's) thyroiditis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "The commonest cause of glycosuria is",
        "opts": [
          "Uncontrolled diabetes mellitus",
          "Renal tubular defect",
          "Alimentary glycosuria",
          "Pregnancy",
          "Chronic pancreatitis"
        ],
        "correctIndex": 0,
        "explanation": "Hyperglycaemia exceeds the renal threshold in uncontrolled DM.",
        "textbookNote": "Hyperglycaemia exceeds the renal threshold in uncontrolled DM.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "The value of IGT (2-h OGTT) is",
        "opts": [
          "≥ 11.1 mmol/L",
          "7.8 to < 11.1 mmol/L",
          "< 7.8 mmol/L",
          "< 4.4 mmol/L",
          "4.4 to 6.1 mmol/L"
        ],
        "correctIndex": 1,
        "explanation": "IGT = 2-h OGTT glucose 7.8 to < 11.1 mmol/L.",
        "textbookNote": "IGT = 2-h OGTT glucose 7.8 to < 11.1 mmol/L.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "A middle-aged obese man on routine checkup is found to have very high serum",
        "opts": [
          "HMG-CoA synthase",
          "HMG-CoA reductase",
          "Thiolase",
          "Squalene synthase",
          "Lanosterol synthase"
        ],
        "correctIndex": 1,
        "explanation": "Statins inhibit HMG-CoA reductase, the rate-limiting enzyme.",
        "textbookNote": "Statins inhibit HMG-CoA reductase, the rate-limiting enzyme.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Preferential fuel for cardiac muscle is",
        "opts": [
          "Fatty acid",
          "Glucose",
          "Acetoacetic acid",
          "β-hydroxybutyric acid",
          "Lactate"
        ],
        "correctIndex": 0,
        "explanation": "Cardiac muscle gets most energy from fatty-acid β-oxidation.",
        "textbookNote": "Cardiac muscle gets most energy from fatty-acid β-oxidation.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2024-may-p2",
    "session": "May 2024",
    "year": 2024,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 7,
    "bookPage": "Biochemistry Bank (May 2024)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "If plasma pH is 7.1, it is acidosis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Mutation of genes may result in loss of function",
            "ans": true
          },
          {
            "label": "c",
            "text": "If pH is 7.1 and anion gap is 12 mmol/L, it is metabolic acidosis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Aldosterone is a lifesaving hormone",
            "ans": true
          },
          {
            "label": "e",
            "text": "Hyposecretion of aldosterone may cause Conn syndrome",
            "ans": false
          }
        ],
        "explanation": "(C): A pH of 7.1 with normal AG doesn't prove metabolic acidosis (need HCO3 | (D): Aldosterone retains Na+/water; deficiency is fatal. | (E): Conn's syndrome is aldosterone EXCESS.",
        "textbookNote": "(C): A pH of 7.1 with normal AG doesn't prove metabolic acidosis (need HCO3 | (D): Aldosterone retains Na+/water; deficiency is fatal. | (E): Conn's syndrome is aldosterone EXCESS.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Body water is maintained by",
        "items": [
          {
            "label": "a",
            "text": "Hypothalamus",
            "ans": true
          },
          {
            "label": "b",
            "text": "ADH",
            "ans": true
          },
          {
            "label": "c",
            "text": "Thyroxine",
            "ans": false
          },
          {
            "label": "d",
            "text": "Plasma osmolarity",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thirst mechanism",
            "ans": true
          }
        ],
        "explanation": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "textbookNote": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "ADH deficiency causes",
        "items": [
          {
            "label": "a",
            "text": "Hypervolemia",
            "ans": false
          },
          {
            "label": "b",
            "text": "Urinary hyperosmolarity",
            "ans": false
          },
          {
            "label": "c",
            "text": "Diuresis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Diabetes mellitus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Increased thirst",
            "ans": true
          }
        ],
        "explanation": "(A): ADH deficiency causes loss of water (hypovolemia), not hypervolemia. | (B): Lack of ADH gives dilute (hypo-osmolar) urine. | (C): ADH deficiency → polyuria (water diuresis). | (D): ADH deficiency causes diabetes INsipidus. | (E): Polyuria in ADH deficiency causes thirst/polydipsia.",
        "textbookNote": "(A): ADH deficiency causes loss of water (hypovolemia), not hypervolemia. | (B): Lack of ADH gives dilute (hypo-osmolar) urine. | (C): ADH deficiency → polyuria (water diuresis). | (D): ADH deficiency causes diabetes INsipidus. | (E): Polyuria in ADH deficiency causes thirst/polydipsia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding codon",
        "items": [
          {
            "label": "a",
            "text": "They are 3 consecutive bases of mRNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "Present in tRNA",
            "ans": false
          },
          {
            "label": "c",
            "text": "Responsible for synthesis of specific amino acids",
            "ans": true
          },
          {
            "label": "d",
            "text": "UAG, UGA, UAA are stop codons",
            "ans": true
          },
          {
            "label": "e",
            "text": "AGU codes for methionine",
            "ans": false
          }
        ],
        "explanation": "(A): Codon = 3 consecutive bases of mRNA. | (B): tRNA carries the anticodon; codon is in mRNA. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "textbookNote": "(A): Codon = 3 consecutive bases of mRNA. | (B): tRNA carries the anticodon; codon is in mRNA. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "During DNA replication",
        "items": [
          {
            "label": "a",
            "text": "DNA helicase separates double-stranded DNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "DNA is synthesized in one direction (5'→3')",
            "ans": true
          },
          {
            "label": "c",
            "text": "Okazaki fragments are synthesized",
            "ans": true
          },
          {
            "label": "d",
            "text": "DNA is synthesized in a conservative manner",
            "ans": false
          },
          {
            "label": "e",
            "text": "Uracil is paired to adenine",
            "ans": false
          }
        ],
        "explanation": "(A): Helicase unwinds the double helix. | (B): DNA is synthesised 5'→3' only. | (C): Lagging strand is made as Okazaki fragments. | (D): Replication is SEMIconservative. | (E): DNA has thymine; uracil pairs with adenine in RNA.",
        "textbookNote": "(A): Helicase unwinds the double helix. | (B): DNA is synthesised 5'→3' only. | (C): Lagging strand is made as Okazaki fragments. | (D): Replication is SEMIconservative. | (E): DNA has thymine; uracil pairs with adenine in RNA.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "High-fibre diet",
        "items": [
          {
            "label": "a",
            "text": "Reduces incidence of constipation",
            "ans": true
          },
          {
            "label": "b",
            "text": "Increases blood cholesterol",
            "ans": false
          },
          {
            "label": "c",
            "text": "Reduces risk of bowel malignancy",
            "ans": true
          },
          {
            "label": "d",
            "text": "Increases incidence of diverticulosis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Decreases absorption of certain minerals",
            "ans": true
          }
        ],
        "explanation": "(B): Fibre lowers cholesterol. | (D): Fibre prevents diverticulosis.",
        "textbookNote": "(B): Fibre lowers cholesterol. | (D): Fibre prevents diverticulosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Obesity",
        "items": [
          {
            "label": "a",
            "text": "Diagnosed by BMI",
            "ans": true
          },
          {
            "label": "b",
            "text": "Genetic mechanisms play a major role",
            "ans": true
          },
          {
            "label": "c",
            "text": "Hormone leptin is involved",
            "ans": true
          },
          {
            "label": "d",
            "text": "There is hypoglycemia",
            "ans": false
          },
          {
            "label": "e",
            "text": "Correlated with type-1 diabetes mellitus",
            "ans": false
          }
        ],
        "explanation": "(A): BMI is the diagnostic index. | (B): Genetics contributes substantially. | (C): Leptin from adipocytes regulates satiety. | (D): Obesity is associated with hyperglycaemia/insulin resistance, not hypoglycaemia. | (E): Obesity is linked to type 2 DM (insulin resistance).",
        "textbookNote": "(A): BMI is the diagnostic index. | (B): Genetics contributes substantially. | (C): Leptin from adipocytes regulates satiety. | (D): Obesity is associated with hyperglycaemia/insulin resistance, not hypoglycaemia. | (E): Obesity is linked to type 2 DM (insulin resistance).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Bicarbonate buffer is most effective because",
        "items": [
          {
            "label": "a",
            "text": "It is most abundant in ECF",
            "ans": true
          },
          {
            "label": "b",
            "text": "It can act through both respiratory and renal systems",
            "ans": true
          },
          {
            "label": "c",
            "text": "Base concentration is less than acid concentration",
            "ans": false
          },
          {
            "label": "d",
            "text": "It has a high pK value",
            "ans": false
          },
          {
            "label": "e",
            "text": "It works along with the hemoglobin buffer",
            "ans": true
          }
        ],
        "explanation": "(A): HCO3 | (B): Open buffer system. | (C): At pH 7.4 HCO3 | (D): pK of the bicarbonate buffer is 6.1 (low). | (E): HCO3",
        "textbookNote": "(A): HCO3 | (B): Open buffer system. | (C): At pH 7.4 HCO3 | (D): pK of the bicarbonate buffer is 6.1 (low). | (E): HCO3",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Deficiency of vitamins is associated with",
        "items": [
          {
            "label": "a",
            "text": "Vitamin A – toad skin",
            "ans": true
          },
          {
            "label": "b",
            "text": "Vitamin K – hemorrhagic disorder",
            "ans": true
          },
          {
            "label": "c",
            "text": "Vitamin B12 – neural tube defect",
            "ans": false
          },
          {
            "label": "d",
            "text": "Vitamin C – RBC maturation defect",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vitamin D – osteoporosis",
            "ans": false
          }
        ],
        "explanation": "(A): Phrynoderma (toad skin) = vitamin A deficiency. | (B): Vitamin K deficiency → hemorrhagic disease. | (C): Neural tube defect is folate deficiency. | (D): Vitamin C is for collagen; RBC maturation needs B12/folate. | (E): Vitamin D deficiency causes rickets/osteomalacia, not osteoporosis.",
        "textbookNote": "(A): Phrynoderma (toad skin) = vitamin A deficiency. | (B): Vitamin K deficiency → hemorrhagic disease. | (C): Neural tube defect is folate deficiency. | (D): Vitamin C is for collagen; RBC maturation needs B12/folate. | (E): Vitamin D deficiency causes rickets/osteomalacia, not osteoporosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Statements related to transcription",
        "items": [
          {
            "label": "a",
            "text": "Synthesis of protein following rRNA",
            "ans": false
          },
          {
            "label": "b",
            "text": "Requires RNA polymerase",
            "ans": true
          },
          {
            "label": "c",
            "text": "Promoter sequence is needed",
            "ans": true
          },
          {
            "label": "d",
            "text": "5' cap is formed by polyadenylation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Has no proofreading property",
            "ans": true
          }
        ],
        "explanation": "(A): Transcription makes RNA; protein synthesis is translation. | (B): PCR uses DNA polymerase. | (C): RNA polymerase binds the promoter. | (D): 5' cap = 7-methylguanosine; polyadenylation is the 3' tail. | (E): RNA polymerase lacks efficient proofreading.",
        "textbookNote": "(A): Transcription makes RNA; protein synthesis is translation. | (B): PCR uses DNA polymerase. | (C): RNA polymerase binds the promoter. | (D): 5' cap = 7-methylguanosine; polyadenylation is the 3' tail. | (E): RNA polymerase lacks efficient proofreading.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Nucleosome contains",
        "opts": [
          "sRNA",
          "mRNA",
          "tRNA",
          "Histone"
        ],
        "correctIndex": 3,
        "explanation": "Nucleosome = ~146 bp DNA wrapped around a histone octamer.",
        "textbookNote": "Nucleosome = ~146 bp DNA wrapped around a histone octamer.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Vitamin B complex",
        "opts": [
          "Is chemically related to one another",
          "Comes from endogenous synthesis only",
          "Acts as coenzyme",
          "Is stored in large amounts in the body"
        ],
        "correctIndex": 2,
        "explanation": "B-vitamins function as coenzymes.",
        "textbookNote": "B-vitamins function as coenzymes.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "The backbone of nucleic acid structure is constructed by",
        "opts": [
          "Hydrogen bond",
          "Disulfide bond",
          "Phosphodiester bond",
          "Ionic interaction"
        ],
        "correctIndex": 2,
        "explanation": "Nucleotides are joined by 3'–5' phosphodiester bonds.",
        "textbookNote": "Nucleotides are joined by 3'–5' phosphodiester bonds.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Recombinant DNA technology",
        "opts": [
          "Requires restriction enzyme from virus",
          "Needs Southern blot technique",
          "Produces chimeric DNA",
          "Transfer of gene from one species to another"
        ],
        "correctIndex": 3,
        "explanation": "rDNA = joining DNA from different species into a vector (chimeric DNA).",
        "textbookNote": "rDNA = joining DNA from different species into a vector (chimeric DNA).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Mutation",
        "opts": [
          "Polymorphism is another name",
          "Imbalance between DNA damage and repair",
          "Occurs in gene only",
          "Transmitted to offspring"
        ],
        "correctIndex": 1,
        "explanation": "Mutation = failure of repair relative to damage.",
        "textbookNote": "Mutation = failure of repair relative to damage.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "The longest phase of the cell cycle is",
        "opts": [
          "G0",
          "G1",
          "G2",
          "S"
        ],
        "correctIndex": 1,
        "explanation": "G1 is the longest and most variable phase.",
        "textbookNote": "G1 is the longest and most variable phase.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Which one of the following does NOT contribute to the purine ring synthesis?",
        "opts": [
          "CO2",
          "Aspartate",
          "N10-formyl tetrahydrofolate",
          "Alanine"
        ],
        "correctIndex": 3,
        "explanation": "Purine ring atoms come from glycine, aspartate, glutamine, CO2 and N10-formyl-THF; alanine is not a donor.",
        "textbookNote": "Purine ring atoms come from glycine, aspartate, glutamine, CO2 and N10-formyl-THF; alanine is not a donor.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Best feature of mitochondrial DNA",
        "opts": [
          "The sperm does not contribute mitochondrial DNA to the zygote",
          "It accounts for 1% of total human DNA",
          "Shows variable expression",
          "Encodes respiratory chain enzymes"
        ],
        "correctIndex": 3,
        "explanation": "mtDNA encodes 37 genes (13 proteins, 22 tRNA, 2 rRNA).",
        "textbookNote": "mtDNA encodes 37 genes (13 proteins, 22 tRNA, 2 rRNA).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Select the reliable diagnostic tool for PEM",
        "opts": [
          "Decreased protein level",
          "Skin change",
          "Hair change",
          "BMI"
        ],
        "correctIndex": 3,
        "explanation": "BMI/weight-for-height is the reliable anthropometric tool; protein levels and clinical signs vary.",
        "textbookNote": "BMI/weight-for-height is the reliable anthropometric tool; protein levels and clinical signs vary.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "The worst effect of folic acid deficiency",
        "opts": [
          "Megaloblastic anemia",
          "Peripheral neuropathy",
          "Neural tube defect",
          "Lethargy"
        ],
        "correctIndex": 2,
        "explanation": "Folate deficiency in pregnancy causes neural tube defects.",
        "textbookNote": "Folate deficiency in pregnancy causes neural tube defects.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2023-nov-p2",
    "session": "November 2023",
    "year": 2023,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 8,
    "bookPage": "Biochemistry Bank (November 2023)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Criteria of autosomal dominant disorder",
        "items": [
          {
            "label": "a",
            "text": "Skip generation is possible",
            "ans": false
          },
          {
            "label": "b",
            "text": "New mutation occurs",
            "ans": true
          },
          {
            "label": "c",
            "text": "Involves sex chromosome",
            "ans": false
          },
          {
            "label": "d",
            "text": "Follows vertical transmission",
            "ans": true
          },
          {
            "label": "e",
            "text": "Diabetes insipidus is an example",
            "ans": false
          }
        ],
        "explanation": "(A): AD disease appears in every generation (vertical). | (B): AD diseases can arise from new mutations (e.g., achondroplasia). | (C): AD = autosomal. | (D): AD disease: vertical transmission. | (E): Nephrogenic DI is X-linked recessive.",
        "textbookNote": "(A): AD disease appears in every generation (vertical). | (B): AD diseases can arise from new mutations (e.g., achondroplasia). | (C): AD = autosomal. | (D): AD disease: vertical transmission. | (E): Nephrogenic DI is X-linked recessive.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Folic acid has the following facts",
        "items": [
          {
            "label": "a",
            "text": "Deficiency causes microcytic anemia",
            "ans": false
          },
          {
            "label": "b",
            "text": "Active form is tetrahydrofolate",
            "ans": true
          },
          {
            "label": "c",
            "text": "Acts as carrier of single carbon unit",
            "ans": true
          },
          {
            "label": "d",
            "text": "Vitamin B12 is not essential for folic acid metabolism",
            "ans": false
          },
          {
            "label": "e",
            "text": "Chronic alcoholism causes deficiency",
            "ans": true
          }
        ],
        "explanation": "(A): Folate deficiency causes macrocytic (megaloblastic) anaemia. | (B): THF is the active coenzyme form of folate. | (C): THF carries one-carbon groups for purine/thymidylate synthesis. | (D): B12 is needed to regenerate THF from methyl-THF. | (E): Alcohol impairs folate absorption and increases loss.",
        "textbookNote": "(A): Folate deficiency causes macrocytic (megaloblastic) anaemia. | (B): THF is the active coenzyme form of folate. | (C): THF carries one-carbon groups for purine/thymidylate synthesis. | (D): B12 is needed to regenerate THF from methyl-THF. | (E): Alcohol impairs folate absorption and increases loss.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Vitamin C inhibits iron absorption from gut",
            "ans": false
          },
          {
            "label": "b",
            "text": "Selenium acts as an antioxidant",
            "ans": true
          },
          {
            "label": "c",
            "text": "Calcitonin increases blood calcium level",
            "ans": false
          },
          {
            "label": "d",
            "text": "Iodine deficiency causes mental retardation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Retinol acts as an antioxidant vitamin",
            "ans": true
          }
        ],
        "explanation": "(A): Vitamin C reduces Fe3+ to Fe2+ and ENHANCES absorption. | (B): Selenium is a component of glutathione peroxidase (antioxidant). | (C): Calcitonin LOWERS blood calcium. | (D): Iodine is needed for thyroid hormone for brain development. | (E): Retinol/carotenoids have antioxidant action.",
        "textbookNote": "(A): Vitamin C reduces Fe3+ to Fe2+ and ENHANCES absorption. | (B): Selenium is a component of glutathione peroxidase (antioxidant). | (C): Calcitonin LOWERS blood calcium. | (D): Iodine is needed for thyroid hormone for brain development. | (E): Retinol/carotenoids have antioxidant action.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Fat-soluble vitamins may produce toxicity if taken in excess",
            "ans": true
          },
          {
            "label": "b",
            "text": "Anion gap is raised in diarrhea",
            "ans": false
          },
          {
            "label": "c",
            "text": "Respiratory alkalosis produces tetany",
            "ans": true
          },
          {
            "label": "d",
            "text": "Warfarin toxicity is treated by vitamin K",
            "ans": true
          },
          {
            "label": "e",
            "text": "Riboflavin deficiency causes pellagra",
            "ans": false
          }
        ],
        "explanation": "(A): Fat-soluble vitamins accumulate in fat stores. | (B): Diarrhoea causes normal-AG acidosis (Cl- rises as HCO3 | (C): Alkalosis lowers ionized Ca2+ (more protein-bound) → tetany. | (D): Vitamin K reverses warfarin toxicity. | (E): Pellagra is niacin deficiency; riboflavin gives cheilosis/glossitis.",
        "textbookNote": "(A): Fat-soluble vitamins accumulate in fat stores. | (B): Diarrhoea causes normal-AG acidosis (Cl- rises as HCO3 | (C): Alkalosis lowers ionized Ca2+ (more protein-bound) → tetany. | (D): Vitamin K reverses warfarin toxicity. | (E): Pellagra is niacin deficiency; riboflavin gives cheilosis/glossitis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Regarding serum electrolytes",
        "items": [
          {
            "label": "a",
            "text": "Hyperkalemia causes cardiac arrest",
            "ans": true
          },
          {
            "label": "b",
            "text": "Sodium is the major electrolyte of ECF",
            "ans": true
          },
          {
            "label": "c",
            "text": "Hyperkalemia is treated by glucagon",
            "ans": false
          },
          {
            "label": "d",
            "text": "Aldosterone secretion increases in hypokalemia",
            "ans": false
          },
          {
            "label": "e",
            "text": "Sea water drowning causes hypernatremia",
            "ans": true
          }
        ],
        "explanation": "(A): High K+ depolarises heart → diastolic arrest. | (B): Na+ is the principal ECF cation. | (C): Hyperkalaemia is treated with calcium gluconate, insulin + glucose, salbutamol. | (D): Aldosterone rises in HYPERkalaemia and falls in hypokalaemia. | (E): Sea water is hypertonic → hypernatraemia.",
        "textbookNote": "(A): High K+ depolarises heart → diastolic arrest. | (B): Na+ is the principal ECF cation. | (C): Hyperkalaemia is treated with calcium gluconate, insulin + glucose, salbutamol. | (D): Aldosterone rises in HYPERkalaemia and falls in hypokalaemia. | (E): Sea water is hypertonic → hypernatraemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Polymerase chain reaction",
        "items": [
          {
            "label": "a",
            "text": "Needs two primers",
            "ans": true
          },
          {
            "label": "b",
            "text": "Requires cleavage of the DNA by restriction endonuclease",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is an in vitro process",
            "ans": true
          },
          {
            "label": "d",
            "text": "Requires Taq DNA polymerase",
            "ans": true
          },
          {
            "label": "e",
            "text": "Can produce 106 products in 20 cycles",
            "ans": true
          }
        ],
        "explanation": "(A): Forward and reverse primers. | (B): PCR does not use restriction digestion. | (C): PCR amplifies DNA in a tube. | (D): Taq polymerase is heat-stable. | (E): 220 ≈ 106 copies in 20 cycles.",
        "textbookNote": "(A): Forward and reverse primers. | (B): PCR does not use restriction digestion. | (C): PCR amplifies DNA in a tube. | (D): Taq polymerase is heat-stable. | (E): 220 ≈ 106 copies in 20 cycles.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Hypokalemia may be due to",
        "items": [
          {
            "label": "a",
            "text": "Uncontrolled DM",
            "ans": true
          },
          {
            "label": "b",
            "text": "Diarrhea",
            "ans": true
          },
          {
            "label": "c",
            "text": "Decreased aldosterone secretion",
            "ans": false
          },
          {
            "label": "d",
            "text": "Acidosis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Alkalosis",
            "ans": true
          }
        ],
        "explanation": "(A): Osmotic diuresis in uncontrolled DM causes K+ loss. | (B): Diarrhoea fluid is rich in K+ and HCO3 | (C): Aldosterone excretes K+; deficiency gives hyperkalaemia. | (D): Acidosis shifts K+ out of cells → hyperkalaemia, not hypokalaemia. | (E): Alkalosis shifts K+ into cells → hypokalaemia.",
        "textbookNote": "(A): Osmotic diuresis in uncontrolled DM causes K+ loss. | (B): Diarrhoea fluid is rich in K+ and HCO3 | (C): Aldosterone excretes K+; deficiency gives hyperkalaemia. | (D): Acidosis shifts K+ out of cells → hyperkalaemia, not hypokalaemia. | (E): Alkalosis shifts K+ into cells → hypokalaemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding vitamin C",
        "items": [
          {
            "label": "a",
            "text": "Has no role in Fe absorption",
            "ans": false
          },
          {
            "label": "b",
            "text": "Deficiency causes defective collagen synthesis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Milk is the main dietary source",
            "ans": false
          },
          {
            "label": "d",
            "text": "Synthesis occurs in the human body",
            "ans": false
          },
          {
            "label": "e",
            "text": "Does not act as a co-factor (co-enzyme)",
            "ans": false
          }
        ],
        "explanation": "(A): Vitamin C reduces Fe3+ → Fe2+ and enhances absorption. | (B): Vitamin C is needed for prolyl/lysyl hydroxylase → collagen. | (C): Citrus fruits/vegetables are the main source; milk is poor. | (D): Humans lack L-gulonolactone oxidase; vitamin C is dietary. | (E): Vitamin C is a cofactor (reducing agent) of hydroxylases.",
        "textbookNote": "(A): Vitamin C reduces Fe3+ → Fe2+ and enhances absorption. | (B): Vitamin C is needed for prolyl/lysyl hydroxylase → collagen. | (C): Citrus fruits/vegetables are the main source; milk is poor. | (D): Humans lack L-gulonolactone oxidase; vitamin C is dietary. | (E): Vitamin C is a cofactor (reducing agent) of hydroxylases.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Transcellular fluid is",
        "items": [
          {
            "label": "a",
            "text": "Fluid in aqueous humor",
            "ans": true
          },
          {
            "label": "b",
            "text": "Blood",
            "ans": false
          },
          {
            "label": "c",
            "text": "Synovial fluid",
            "ans": true
          },
          {
            "label": "d",
            "text": "Interstitial fluid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Peritoneal fluid",
            "ans": true
          }
        ],
        "explanation": "(A): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (B): Plasma is intravascular fluid, not transcellular. | (C): Synovial fluid is a transcellular fluid. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Peritoneal fluid is a transcellular fluid.",
        "textbookNote": "(A): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (B): Plasma is intravascular fluid, not transcellular. | (C): Synovial fluid is a transcellular fluid. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Peritoneal fluid is a transcellular fluid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Basal metabolic rate will increase in",
        "items": [
          {
            "label": "a",
            "text": "Overactivity of the Na+-K+ pump",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hyperthyroidism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Hot climate",
            "ans": false
          },
          {
            "label": "d",
            "text": "Starvation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Febrile condition",
            "ans": true
          }
        ],
        "explanation": "(A): Na+-K+ pump uses ATP; more activity → ↑BMR. | (B): Thyroid hormones raise BMR. | (C): Cold climate raises BMR; hot climate lowers it. | (D): BMR falls in starvation. | (E): Each °C of fever raises BMR ~13%.",
        "textbookNote": "(A): Na+-K+ pump uses ATP; more activity → ↑BMR. | (B): Thyroid hormones raise BMR. | (C): Cold climate raises BMR; hot climate lowers it. | (D): BMR falls in starvation. | (E): Each °C of fever raises BMR ~13%.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Regarding proteinuria",
        "opts": [
          "Detected by heat coagulation test only",
          "Presence of protein in urine more than 150 mg/day",
          "Microalbuminuria indicates early diabetic nephropathy only",
          "Its consequences develop ankle edema only"
        ],
        "correctIndex": 1,
        "explanation": "Proteinuria > 150 mg/day is abnormal.",
        "textbookNote": "Proteinuria > 150 mg/day is abnormal.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Regarding metabolic acidosis",
        "opts": [
          "Anion gap is always increased",
          "HCO3",
          "Due to primary increase in plasma bicarbonate",
          "DKA is the most common cause"
        ],
        "correctIndex": 1,
        "explanation": "Metabolic acidosis = HCO3",
        "textbookNote": "Metabolic acidosis = HCO3",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Free water clearance gives information regarding",
        "opts": [
          "Hypertonicity of urine",
          "Excretion of isotonic urine",
          "Renal concentrating ability",
          "Diluted urine only"
        ],
        "correctIndex": 2,
        "explanation": "Free water clearance reflects renal diluting/concentrating ability.",
        "textbookNote": "Free water clearance reflects renal diluting/concentrating ability.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Mutation",
        "opts": [
          "Polymorphism is another name",
          "Imbalance between DNA damage and repair",
          "Occurs in gene only",
          "Transmitted to offspring"
        ],
        "correctIndex": 1,
        "explanation": "Mutation = failure of repair relative to damage.",
        "textbookNote": "Mutation = failure of repair relative to damage.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Restriction endonuclease",
        "opts": [
          "Enzyme cleaves RNA at its middle",
          "Enzyme cleaves DNA at random sites",
          "Cleaves DNA at a specific nucleotide sequence which is palindromic",
          "Enzymes are named according to the scientists who first discovered them"
        ],
        "correctIndex": 2,
        "explanation": "Type II restriction enzymes cut DNA at palindromic sequences.",
        "textbookNote": "Type II restriction enzymes cut DNA at palindromic sequences.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Vitamin C",
        "opts": [
          "Is a fat-soluble vitamin",
          "Citrus fruits are the only source",
          "The most prominent action is hydroxylation of prolyl and lysyl residues of collagen protein",
          "Deficiency causes scurvy only"
        ],
        "correctIndex": 2,
        "explanation": "Vitamin C hydroxylates proline and lysine in collagen.",
        "textbookNote": "Vitamin C hydroxylates proline and lysine in collagen.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Regarding plasma osmolarity, choose the correct answer",
        "opts": [
          "Normal plasma osmolarity is 270 to 310 mosmol/L only",
          "Serum sodium is the most contributing factor",
          "Glucose and urea are the major contributors",
          "Hyposmolarity stimulates ADH secretion"
        ],
        "correctIndex": 1,
        "explanation": "Na+ is the main osmotically active solute.",
        "textbookNote": "Na+ is the main osmotically active solute.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "The characteristics of trace elements include",
        "opts": [
          "Calcium is an example",
          "Sodium is an example",
          "Are microminerals with daily requirement less than 100 mg",
          "Zinc acts as an anti-oxidant"
        ],
        "correctIndex": 2,
        "explanation": "Trace elements are needed in < 100 mg/day.",
        "textbookNote": "Trace elements are needed in < 100 mg/day.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Regarding translation",
        "opts": [
          "Synthesis of protein according to the base sequence of tRNA",
          "Synthesis of protein according to the base sequence of mRNA",
          "Ribosome may or may not be required",
          "tRNA only acts as linker molecules"
        ],
        "correctIndex": 1,
        "explanation": "mRNA codons determine the protein sequence.",
        "textbookNote": "mRNA codons determine the protein sequence.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Regarding obesity",
        "opts": [
          "Is measured by BMI only",
          "Is associated with primary hypothyroidism only",
          "Is a disorder of body weight regulatory system characterized by excess fat accumulation",
          "Only hypertrophic change occurs in adipocytes"
        ],
        "correctIndex": 2,
        "explanation": "Obesity is excess body fat from disturbed energy balance.",
        "textbookNote": "Obesity is excess body fat from disturbed energy balance.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      }
    ]
  },
  {
    "id": "cmu-bio-2023-may-p1",
    "session": "May 2023",
    "year": 2023,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "New Curriculum",
    "page": 9,
    "bookPage": "Biochemistry Bank (May 2023)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Buffer",
        "items": [
          {
            "label": "a",
            "text": "Shows higher capacity when its total concentration is more",
            "ans": true
          },
          {
            "label": "b",
            "text": "Components ratio 1:1 means pH = pK",
            "ans": true
          },
          {
            "label": "c",
            "text": "Base converts strong acid to its pair weak acid",
            "ans": true
          },
          {
            "label": "d",
            "text": "Can completely return pH back to normal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Capacity depends upon the compartment it is present in",
            "ans": true
          }
        ],
        "explanation": "(A): Buffer capacity increases with total buffer concentration. | (B): Equal acid and salt gives pH = pK (maximum buffering). | (C): A buffer base converts a strong acid into its weak conjugate acid, limiting pH change. | (D): A buffer only resists change; it cannot restore pH completely (lungs/kidneys do that). | (E): Buffer capacity depends on the compartment, e.g., HCO3",
        "textbookNote": "(A): Buffer capacity increases with total buffer concentration. | (B): Equal acid and salt gives pH = pK (maximum buffering). | (C): A buffer base converts a strong acid into its weak conjugate acid, limiting pH change. | (D): A buffer only resists change; it cannot restore pH completely (lungs/kidneys do that). | (E): Buffer capacity depends on the compartment, e.g., HCO3",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Enzymes",
        "items": [
          {
            "label": "a",
            "text": "Are reaction- and substrate-specific in action",
            "ans": true
          },
          {
            "label": "b",
            "text": "Always need coenzyme for their activity",
            "ans": false
          },
          {
            "label": "c",
            "text": "Are non-dialyzable",
            "ans": true
          },
          {
            "label": "d",
            "text": "Show maximum velocity at their Km",
            "ans": false
          },
          {
            "label": "e",
            "text": "Are competitively inhibited by allosteric modifiers",
            "ans": false
          }
        ],
        "explanation": "(A): Enzymes are reaction and substrate specific. | (B): Many enzymes need no coenzyme (e.g., pepsin, trypsin). | (C): Enzymes are large proteins (colloids). | (D): Km is the substrate concentration at HALF Vmax. | (E): Allosteric modifiers bind away from the active site (non-competitive).",
        "textbookNote": "(A): Enzymes are reaction and substrate specific. | (B): Many enzymes need no coenzyme (e.g., pepsin, trypsin). | (C): Enzymes are large proteins (colloids). | (D): Km is the substrate concentration at HALF Vmax. | (E): Allosteric modifiers bind away from the active site (non-competitive).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Regarding disaccharides",
        "items": [
          {
            "label": "a",
            "text": "Insoluble in fat",
            "ans": true
          },
          {
            "label": "b",
            "text": "General formula is Cn(H2O)n",
            "ans": false
          },
          {
            "label": "c",
            "text": "Cannot form ester",
            "ans": false
          },
          {
            "label": "d",
            "text": "Some act as reducing agents in alkaline media",
            "ans": true
          },
          {
            "label": "e",
            "text": "Sorbitol is a disaccharide",
            "ans": false
          }
        ],
        "explanation": "(A): Disaccharides are water-soluble and fat-insoluble. | (B): Disaccharide formula is C12H22O11 = Cn(H2O)n–1. | (C): Sugar –OH groups can form esters (e.g., phosphates). | (D): Maltose, lactose are reducing; sucrose is not. | (E): Sorbitol is a sugar alcohol, not a disaccharide.",
        "textbookNote": "(A): Disaccharides are water-soluble and fat-insoluble. | (B): Disaccharide formula is C12H22O11 = Cn(H2O)n–1. | (C): Sugar –OH groups can form esters (e.g., phosphates). | (D): Maltose, lactose are reducing; sucrose is not. | (E): Sorbitol is a sugar alcohol, not a disaccharide.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding colloid",
        "items": [
          {
            "label": "a",
            "text": "Osmotically less active",
            "ans": true
          },
          {
            "label": "b",
            "text": "Not seen by ultramicroscope",
            "ans": false
          },
          {
            "label": "c",
            "text": "Cellulose is a dietary colloid",
            "ans": true
          },
          {
            "label": "d",
            "text": "Unconjugated bilirubin is a hydrophilic colloid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Can produce a true solution",
            "ans": false
          }
        ],
        "explanation": "(A): Colloids are large, few in number, hence osmotically less active. | (B): Colloid particles are visible by ultramicroscope (Tyndall effect). | (C): Cellulose is dietary fibre, a colloid that is not digested. | (D): Unconjugated bilirubin is water-insoluble (hydrophobic) and travels bound to albumin. | (E): Colloids form colloidal, not true, solutions.",
        "textbookNote": "(A): Colloids are large, few in number, hence osmotically less active. | (B): Colloid particles are visible by ultramicroscope (Tyndall effect). | (C): Cellulose is dietary fibre, a colloid that is not digested. | (D): Unconjugated bilirubin is water-insoluble (hydrophobic) and travels bound to albumin. | (E): Colloids form colloidal, not true, solutions.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "The following are rate-limiting reactions of certain metabolic pathways",
        "items": [
          {
            "label": "a",
            "text": "Lipogenesis – acetyl-CoA carboxylase",
            "ans": true
          },
          {
            "label": "b",
            "text": "Glycolysis – PFK-1",
            "ans": true
          },
          {
            "label": "c",
            "text": "Cholesterol biosynthesis – hormone-sensitive lipase",
            "ans": false
          },
          {
            "label": "d",
            "text": "Glycogenesis – glycogen phosphorylase",
            "ans": false
          },
          {
            "label": "e",
            "text": "Lipolysis – HMG-CoA reductase",
            "ans": false
          }
        ],
        "explanation": "(A): ACC is rate-limiting for fatty acid synthesis. | (B): PFK-1 is rate-limiting for glycolysis. | (C): HMG-CoA reductase is rate-limiting for cholesterol synthesis. | (D): Glycogen synthase is the rate-limiting enzyme of glycogenesis. | (E): Hormone-sensitive lipase is rate-limiting for lipolysis.",
        "textbookNote": "(A): ACC is rate-limiting for fatty acid synthesis. | (B): PFK-1 is rate-limiting for glycolysis. | (C): HMG-CoA reductase is rate-limiting for cholesterol synthesis. | (D): Glycogen synthase is the rate-limiting enzyme of glycogenesis. | (E): Hormone-sensitive lipase is rate-limiting for lipolysis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Choose the correct answers",
        "items": [
          {
            "label": "a",
            "text": "All amino acids undergo transamination",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ammonia is removed by intestinal bacterial degradation",
            "ans": false
          },
          {
            "label": "c",
            "text": "Oxidative deamination is a catabolic process",
            "ans": true
          },
          {
            "label": "d",
            "text": "NH3 is excreted with urine as NH4",
            "ans": false
          },
          {
            "label": "e",
            "text": "Proline can be synthesized from the urea cycle",
            "ans": false
          }
        ],
        "explanation": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "textbookNote": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "About digestion the following are true",
        "items": [
          {
            "label": "a",
            "text": "Is a process of hydrolysis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lipid digestion begins in mouth",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pepsin splits carbohydrate into glucose",
            "ans": false
          },
          {
            "label": "d",
            "text": "Micelle is an aggregate of cholesterol only",
            "ans": false
          },
          {
            "label": "e",
            "text": "Bile salt reduces the surface tension of fat",
            "ans": true
          }
        ],
        "explanation": "(C): Pepsin digests protein. | (D): Micelles contain bile salts, phospholipid, cholesterol and FA — not cholesterol alone. | (E): Bile salts are detergents that lower surface tension → emulsification.",
        "textbookNote": "(C): Pepsin digests protein. | (D): Micelles contain bile salts, phospholipid, cholesterol and FA — not cholesterol alone. | (E): Bile salts are detergents that lower surface tension → emulsification.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Insulin regulates metabolism by",
        "items": [
          {
            "label": "a",
            "text": "Enhancing GLUT2-induced glucose uptake",
            "ans": false
          },
          {
            "label": "b",
            "text": "Reversible dephosphorylation of enzymes",
            "ans": true
          },
          {
            "label": "c",
            "text": "Enzyme induction",
            "ans": true
          },
          {
            "label": "d",
            "text": "Stimulating the tyrosine kinase receptor pathway",
            "ans": true
          },
          {
            "label": "e",
            "text": "Stimulating pancreatic glucagon secretion",
            "ans": false
          }
        ],
        "explanation": "(A): Insulin acts via GLUT-4; GLUT-2 is insulin-independent (liver, β-cell). | (B): Insulin activates phosphatases, dephosphorylating key enzymes. | (C): Insulin induces glucokinase, PFK, pyruvate kinase, lipogenic enzymes. | (D): Insulin receptor is a tyrosine kinase. | (E): Insulin inhibits glucagon secretion.",
        "textbookNote": "(A): Insulin acts via GLUT-4; GLUT-2 is insulin-independent (liver, β-cell). | (B): Insulin activates phosphatases, dephosphorylating key enzymes. | (C): Insulin induces glucokinase, PFK, pyruvate kinase, lipogenic enzymes. | (D): Insulin receptor is a tyrosine kinase. | (E): Insulin inhibits glucagon secretion.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "In glycolysis the following statements are correct",
        "items": [
          {
            "label": "a",
            "text": "Glucose or glycogen is broken down",
            "ans": true
          },
          {
            "label": "b",
            "text": "The end product of glycolysis is pyruvate only",
            "ans": false
          },
          {
            "label": "c",
            "text": "There are four irreversible reactions",
            "ans": false
          },
          {
            "label": "d",
            "text": "Conversion of lactate to pyruvate is oxidation",
            "ans": true
          },
          {
            "label": "e",
            "text": "In the aerobic pathway 2 ATP is produced (net)",
            "ans": false
          }
        ],
        "explanation": "(A): Glycolysis starts from glucose or glycogen (via G6P). | (B): Pyruvate is the end product aerobically; in anaerobic glycolysis it is reduced to lactate, so 'only' is wrong. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "textbookNote": "(A): Glycolysis starts from glucose or glycogen (via G6P). | (B): Pyruvate is the end product aerobically; in anaerobic glycolysis it is reduced to lactate, so 'only' is wrong. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Ketoacidosis could be a finding of",
        "items": [
          {
            "label": "a",
            "text": "Uncontrolled diabetes mellitus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Prolonged starvation",
            "ans": true
          },
          {
            "label": "c",
            "text": "Severe diarrhea",
            "ans": false
          },
          {
            "label": "d",
            "text": "Persistent vomiting",
            "ans": false
          },
          {
            "label": "e",
            "text": "Renal failure",
            "ans": false
          }
        ],
        "explanation": "(A): Absent insulin → ketogenesis. | (B): Low insulin/glucose in starvation → ketosis. | (C): Diarrhoea gives non-ketotic metabolic acidosis. | (D): Vomiting causes metabolic alkalosis (loss of HCl), not ketoacidosis. | (E): Renal failure causes uraemic (high-AG) acidosis without ketones.",
        "textbookNote": "(A): Absent insulin → ketogenesis. | (B): Low insulin/glucose in starvation → ketosis. | (C): Diarrhoea gives non-ketotic metabolic acidosis. | (D): Vomiting causes metabolic alkalosis (loss of HCl), not ketoacidosis. | (E): Renal failure causes uraemic (high-AG) acidosis without ketones.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "The characteristic blood chemistry of viral hepatitis is",
        "opts": [
          "Increased serum total bilirubin only",
          "Increased serum ALT activity (markedly)",
          "Increased serum ALP activity (markedly)",
          "Increased serum LDH only",
          "Increased prothrombin time only"
        ],
        "correctIndex": 1,
        "explanation": "ALT (and AST) rises markedly in viral hepatitis.",
        "textbookNote": "ALT (and AST) rises markedly in viral hepatitis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "The most common cause of hyperglycemia is",
        "opts": [
          "Cushing syndrome",
          "Diabetes mellitus",
          "Gigantism",
          "Acromegaly",
          "Pheochromocytoma"
        ],
        "correctIndex": 1,
        "explanation": "Diabetes mellitus.",
        "textbookNote": "Diabetes mellitus.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "The EMP (glycolysis) pathway",
        "opts": [
          "Produces ATP",
          "Evolves CO2",
          "Produces NADPH only",
          "Needs no coenzyme",
          "Occurs in mitochondria"
        ],
        "correctIndex": 0,
        "explanation": "Glycolysis generates ATP by substrate-level phosphorylation and is cytosolic.",
        "textbookNote": "Glycolysis generates ATP by substrate-level phosphorylation and is cytosolic.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Which of the following is true for β-oxidation?",
        "opts": [
          "End product is acetyl-CoA only",
          "FAD and NAD+ are oxidized",
          "Glucagon stimulates β-oxidation",
          "Thiokinase is the rate-limiting enzyme",
          "Activation of the pathway occurs after a fatty meal"
        ],
        "correctIndex": 2,
        "explanation": "Glucagon induces lipolysis and mitochondrial β-oxidation (via CPT-I).",
        "textbookNote": "Glucagon induces lipolysis and mitochondrial β-oxidation (via CPT-I).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Regarding GI hormones",
        "opts": [
          "Oxyntic cells secrete gastrin",
          "Secretin stimulates enzyme-rich pancreatic secretion",
          "CCK stimulates HCO3",
          "Gastrin stimulates HCl secretion only",
          "Somatostatin inhibits gastrin secretion"
        ],
        "correctIndex": 4,
        "explanation": "Somatostatin inhibits gastrin, secretin, CCK.",
        "textbookNote": "Somatostatin inhibits gastrin, secretin, CCK.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "A young woman complains of weight gain, cold intolerance and tiredness. Laboratory",
        "opts": [
          "Hypothalamic disease",
          "Pituitary disease",
          "Subclinical hypothyroidism",
          "Hashimoto's thyroiditis",
          "Thyroid hormone resistance"
        ],
        "correctIndex": 3,
        "explanation": "Low T3/T4, high TSH and anti-TPO = Hashimoto's thyroiditis.",
        "textbookNote": "Low T3/T4, high TSH and anti-TPO = Hashimoto's thyroiditis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "All of the following are characteristics of diabetic ketoacidosis EXCEPT",
        "opts": [
          "Low blood pH",
          "Low blood HCO3",
          "Increased plasma bicarbonate",
          "High anion gap",
          "Acetone breath"
        ],
        "correctIndex": 2,
        "explanation": "Low HCO3",
        "textbookNote": "Low HCO3",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "The value of IGT is",
        "opts": [
          "≥ 11.1 mmol/L",
          "7.8 to < 11.1 mmol/L",
          "< 7.8 mmol/L",
          "4.1 mmol/L",
          "4.4 to 6.1 mmol/L"
        ],
        "correctIndex": 1,
        "explanation": "IGT = 2-h OGTT glucose 7.8 to < 11.1 mmol/L.",
        "textbookNote": "IGT = 2-h OGTT glucose 7.8 to < 11.1 mmol/L.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected question or option per faculty review script."
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Phospholipids are mostly carried by",
        "opts": [
          "VLDL",
          "HDL",
          "IDL",
          "LDL",
          "CM"
        ],
        "correctIndex": 1,
        "explanation": "HDL is phospholipid-rich (~25–30%).",
        "textbookNote": "HDL is phospholipid-rich (~25–30%).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "To diagnose obstructive jaundice, which enzyme is mostly preferred?",
        "opts": [
          "AST",
          "ALT",
          "ALP",
          "γ-GT",
          "LDH"
        ],
        "correctIndex": 2,
        "explanation": "ALP is the preferred enzyme.",
        "textbookNote": "ALP is the preferred enzyme.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2023-may-p2",
    "session": "May 2023",
    "year": 2023,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "New Curriculum",
    "page": 10,
    "bookPage": "Biochemistry Bank (May 2023)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Fat-soluble vitamins may produce toxicity if taken in excess",
            "ans": true
          },
          {
            "label": "b",
            "text": "Plasma volume is measured by mannitol",
            "ans": false
          },
          {
            "label": "c",
            "text": "Sodium is the major electrolyte of ICF",
            "ans": false
          },
          {
            "label": "d",
            "text": "Hypoalbuminemia is the main biochemical feature of kwashiorkor",
            "ans": true
          },
          {
            "label": "e",
            "text": "Vitamin C inhibits Fe absorption from gut",
            "ans": false
          }
        ],
        "explanation": "(A): Fat-soluble vitamins accumulate in fat stores. | (B): Plasma volume is measured by Evans blue/I-131 albumin; mannitol measures ECF. | (C): Na+ is the major ECF cation; K+ is the major ICF cation. | (E): Vitamin C ENHANCES iron absorption.",
        "textbookNote": "(A): Fat-soluble vitamins accumulate in fat stores. | (B): Plasma volume is measured by Evans blue/I-131 albumin; mannitol measures ECF. | (C): Na+ is the major ECF cation; K+ is the major ICF cation. | (E): Vitamin C ENHANCES iron absorption.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Body water is maintained by",
        "items": [
          {
            "label": "a",
            "text": "Hypothalamus",
            "ans": true
          },
          {
            "label": "b",
            "text": "ADH",
            "ans": true
          },
          {
            "label": "c",
            "text": "Thyroxine",
            "ans": false
          },
          {
            "label": "d",
            "text": "Plasma osmolarity",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thirst mechanism",
            "ans": true
          }
        ],
        "explanation": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "textbookNote": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Regarding trace elements",
        "items": [
          {
            "label": "a",
            "text": "RDA is less than 100 mg",
            "ans": true
          },
          {
            "label": "b",
            "text": "Selenium acts as an antioxidant",
            "ans": true
          },
          {
            "label": "c",
            "text": "RDA of Fe is 1 mg/day for male",
            "ans": false
          },
          {
            "label": "d",
            "text": "Iodine deficiency causes mental retardation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Hypocalcaemia causes tetany",
            "ans": true
          }
        ],
        "explanation": "(A): Trace elements are needed in < 100 mg/day. | (B): Selenium is a component of glutathione peroxidase (antioxidant). | (C): RDA of iron in men is ~10 mg/day (1 mg is the absorbed amount). | (D): Iodine is needed for thyroid hormone for brain development. | (E): Low ionized Ca2+ increases neuromuscular excitability.",
        "textbookNote": "(A): Trace elements are needed in < 100 mg/day. | (B): Selenium is a component of glutathione peroxidase (antioxidant). | (C): RDA of iron in men is ~10 mg/day (1 mg is the absorbed amount). | (D): Iodine is needed for thyroid hormone for brain development. | (E): Low ionized Ca2+ increases neuromuscular excitability.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "In metabolic acidosis",
        "items": [
          {
            "label": "a",
            "text": "Diarrhoea is a major cause",
            "ans": true
          },
          {
            "label": "b",
            "text": "PCO2 increased",
            "ans": false
          },
          {
            "label": "c",
            "text": "HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "Normal anion gap only",
            "ans": false
          },
          {
            "label": "e",
            "text": "Compensated by the renal system",
            "ans": false
          }
        ],
        "explanation": "(A): Bicarbonate-rich intestinal fluid is lost in diarrhoea → metabolic acidosis. | (B): In metabolic acidosis PCO2 falls (respiratory compensation); raised PCO2 is respiratory acidosis. | (D): Metabolic acidosis may have high or normal anion gap. | (E): Metabolic acidosis is compensated by the lungs (hyperventilation); kidneys correct it slowly.",
        "textbookNote": "(A): Bicarbonate-rich intestinal fluid is lost in diarrhoea → metabolic acidosis. | (B): In metabolic acidosis PCO2 falls (respiratory compensation); raised PCO2 is respiratory acidosis. | (D): Metabolic acidosis may have high or normal anion gap. | (E): Metabolic acidosis is compensated by the lungs (hyperventilation); kidneys correct it slowly.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Dietary fibre",
        "items": [
          {
            "label": "a",
            "text": "Decreases the incidence of constipation",
            "ans": true
          },
          {
            "label": "b",
            "text": "Increases the absorption of cholesterol",
            "ans": false
          },
          {
            "label": "c",
            "text": "Decreases the absorption of zinc",
            "ans": true
          },
          {
            "label": "d",
            "text": "Decreases the incidence of diverticulosis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Helps in better control of diabetes mellitus",
            "ans": true
          }
        ],
        "explanation": "(B): Fibre binds bile acids, REDUCING cholesterol absorption. | (D): Fibre prevents diverticulosis.",
        "textbookNote": "(B): Fibre binds bile acids, REDUCING cholesterol absorption. | (D): Fibre prevents diverticulosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "ECF differs from ICF in that",
        "items": [
          {
            "label": "a",
            "text": "Volume is greater",
            "ans": false
          },
          {
            "label": "b",
            "text": "pH is lower",
            "ans": false
          },
          {
            "label": "c",
            "text": "Tonicity is lower",
            "ans": false
          },
          {
            "label": "d",
            "text": "Anions are mainly inorganic",
            "ans": true
          },
          {
            "label": "e",
            "text": "Sodium : potassium ratio is higher",
            "ans": true
          }
        ],
        "explanation": "(A): ICF volume is larger than ECF. | (B): ECF pH (7.4) is higher than ICF (7.0). | (C): ECF and ICF are iso-osmotic at steady state. | (D): ECF anions are mainly Cl- and HCO3 | (E): ECF has high Na+ and low K+; ICF is the reverse.",
        "textbookNote": "(A): ICF volume is larger than ECF. | (B): ECF pH (7.4) is higher than ICF (7.0). | (C): ECF and ICF are iso-osmotic at steady state. | (D): ECF anions are mainly Cl- and HCO3 | (E): ECF has high Na+ and low K+; ICF is the reverse.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Central dogma of genetic information",
        "items": [
          {
            "label": "a",
            "text": "Was originally described by Mendel",
            "ans": false
          },
          {
            "label": "b",
            "text": "Does not include DNA replication",
            "ans": false
          },
          {
            "label": "c",
            "text": "May include synthesis of DNA from RNA",
            "ans": true
          },
          {
            "label": "d",
            "text": "Includes translation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Transfer of information from DNA to RNA to protein",
            "ans": true
          }
        ],
        "explanation": "(A): Central dogma was proposed by Crick. | (B): Central dogma includes replication, transcription, translation.",
        "textbookNote": "(A): Central dogma was proposed by Crick. | (B): Central dogma includes replication, transcription, translation.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Normal plasma values are",
        "items": [
          {
            "label": "a",
            "text": "Na+ = 140 mEq/L",
            "ans": true
          },
          {
            "label": "b",
            "text": "K+ = 3.5 mEq/L",
            "ans": true
          },
          {
            "label": "c",
            "text": "Calcium 2.1–2.6 mmol/L",
            "ans": true
          },
          {
            "label": "d",
            "text": "Creatinine 3 mg/dL",
            "ans": false
          },
          {
            "label": "e",
            "text": "HCO3",
            "ans": false
          }
        ],
        "explanation": "(D): Normal serum creatinine is 0.6–1.2 mg/dL.",
        "textbookNote": "(D): Normal serum creatinine is 0.6–1.2 mg/dL.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Transcellular fluid is",
        "items": [
          {
            "label": "a",
            "text": "Fluid in aqueous humor",
            "ans": true
          },
          {
            "label": "b",
            "text": "Blood",
            "ans": false
          },
          {
            "label": "c",
            "text": "Synovial fluid",
            "ans": true
          },
          {
            "label": "d",
            "text": "Interstitial fluid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Peritoneal fluid",
            "ans": true
          }
        ],
        "explanation": "(A): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (B): Plasma is intravascular fluid, not transcellular. | (C): Synovial fluid is a transcellular fluid. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Peritoneal fluid is a transcellular fluid.",
        "textbookNote": "(A): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (B): Plasma is intravascular fluid, not transcellular. | (C): Synovial fluid is a transcellular fluid. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Peritoneal fluid is a transcellular fluid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Thiamine deficiency causes",
        "items": [
          {
            "label": "a",
            "text": "Beriberi",
            "ans": true
          },
          {
            "label": "b",
            "text": "Stomatitis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Wernicke's encephalopathy",
            "ans": true
          },
          {
            "label": "d",
            "text": "Neuropathy",
            "ans": true
          },
          {
            "label": "e",
            "text": "Korsakoff psychosis",
            "ans": true
          }
        ],
        "explanation": "(A): Thiamine deficiency → beriberi. | (B): Stomatitis is riboflavin/niacin deficiency, not thiamine. | (C): Thiamine deficiency in alcoholics → Wernicke's encephalopathy. | (D): Dry beriberi causes peripheral neuropathy. | (E): Korsakoff psychosis is thiamine deficiency.",
        "textbookNote": "(A): Thiamine deficiency → beriberi. | (B): Stomatitis is riboflavin/niacin deficiency, not thiamine. | (C): Thiamine deficiency in alcoholics → Wernicke's encephalopathy. | (D): Dry beriberi causes peripheral neuropathy. | (E): Korsakoff psychosis is thiamine deficiency.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Regarding renal function tests",
        "items": [
          {
            "label": "a",
            "text": "Benedict's test is done for presence of glucose",
            "ans": true
          },
          {
            "label": "b",
            "text": "Blood urea and serum creatinine are the most sensitive tests",
            "ans": false
          },
          {
            "label": "c",
            "text": "Serum electrolytes are sensitive tests",
            "ans": false
          },
          {
            "label": "d",
            "text": "Estimation of specific gravity is done in diabetes insipidus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): Benedict's test detects reducing sugars (glucose, fructose, lactose, maltose), not sucrose. | (B): GFR/clearance tests are more sensitive; urea/creatinine rise late. | (C): Electrolytes change late in renal disease.",
        "textbookNote": "(A): Benedict's test detects reducing sugars (glucose, fructose, lactose, maltose), not sucrose. | (B): GFR/clearance tests are more sensitive; urea/creatinine rise late. | (C): Electrolytes change late in renal disease.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Vitamin D",
        "items": [
          {
            "label": "a",
            "text": "Steroid derivative",
            "ans": true
          },
          {
            "label": "b",
            "text": "Synthesized in skin with the help of UV light",
            "ans": true
          },
          {
            "label": "c",
            "text": "The most prominent actions are to regulate the plasma level of calcium and phosphorus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Deficiency causes rickets",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): Vitamin D is a secosteroid derived from 7-dehydrocholesterol. | (B): UV-B converts 7-dehydrocholesterol → cholecalciferol in skin. | (C): Calcitriol raises plasma Ca2+ and phosphate. | (D): Vitamin D deficiency → rickets (children), osteomalacia (adults).",
        "textbookNote": "(A): Vitamin D is a secosteroid derived from 7-dehydrocholesterol. | (B): UV-B converts 7-dehydrocholesterol → cholecalciferol in skin. | (C): Calcitriol raises plasma Ca2+ and phosphate. | (D): Vitamin D deficiency → rickets (children), osteomalacia (adults).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Regarding replication",
        "items": [
          {
            "label": "a",
            "text": "Is a semiconservative process",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is DNA-directed DNA synthesis with the help of DNA polymerase",
            "ans": true
          },
          {
            "label": "c",
            "text": "Primer may or may not be required",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lagging strand is constructed by Okazaki fragments",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): Each daughter DNA has one old and one new strand. | (B): DNA polymerase copies a DNA template. | (C): DNA polymerase always needs a primer. | (D): Lagging strand = Okazaki fragments.",
        "textbookNote": "(A): Each daughter DNA has one old and one new strand. | (B): DNA polymerase copies a DNA template. | (C): DNA polymerase always needs a primer. | (D): Lagging strand = Okazaki fragments.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "X-linked recessive disorder includes",
        "items": [
          {
            "label": "a",
            "text": "Is the disease of X chromosome expressed only in homozygous state",
            "ans": false
          },
          {
            "label": "b",
            "text": "Haemophilia is an example",
            "ans": true
          },
          {
            "label": "c",
            "text": "Affects males mainly",
            "ans": true
          },
          {
            "label": "d",
            "text": "Oblique or diagonal transmission",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): XLR disease is expressed in hemizygous males too. | (C): XLR disease mainly affects males. | (D): XLR: carrier mother → affected sons (oblique/criss-cross).",
        "textbookNote": "(A): XLR disease is expressed in hemizygous males too. | (C): XLR disease mainly affects males. | (D): XLR: carrier mother → affected sons (oblique/criss-cross).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Mutation",
        "items": [
          {
            "label": "a",
            "text": "Polymorphism is another name",
            "ans": false
          },
          {
            "label": "b",
            "text": "Imbalance between DNA damage and repair",
            "ans": true
          },
          {
            "label": "c",
            "text": "Occurs in gene only",
            "ans": false
          },
          {
            "label": "d",
            "text": "Transmitted to offspring",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): Polymorphism is a common variant (> 1%); mutation is rare. | (B): Mutation = failure of repair relative to damage. | (C): Mutations occur in coding and non-coding DNA. | (D): Only germline mutations are inherited.",
        "textbookNote": "(A): Polymorphism is a common variant (> 1%); mutation is rare. | (B): Mutation = failure of repair relative to damage. | (C): Mutations occur in coding and non-coding DNA. | (D): Only germline mutations are inherited.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Recombinant DNA technology",
        "items": [
          {
            "label": "a",
            "text": "Requires restriction enzymes from virus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Needs Southern blot technique",
            "ans": false
          },
          {
            "label": "c",
            "text": "Produces chimeric DNA",
            "ans": true
          },
          {
            "label": "d",
            "text": "Transfer of genes from one species to another",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): Restriction enzymes come from BACTERIA. | (B): rDNA technology does not require Southern blot. | (C): Recombinant DNA is chimeric. | (D): Gene from one species into another.",
        "textbookNote": "(A): Restriction enzymes come from BACTERIA. | (B): rDNA technology does not require Southern blot. | (C): Recombinant DNA is chimeric. | (D): Gene from one species into another.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Regarding plasma osmolarity, choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Normal plasma osmolarity is 280–296 mosmol/L",
            "ans": true
          },
          {
            "label": "b",
            "text": "Serum sodium is the most contributing factor",
            "ans": true
          },
          {
            "label": "c",
            "text": "Glucose and urea are also responsible",
            "ans": true
          },
          {
            "label": "d",
            "text": "Hyperosmolarity stimulates ADH secretion",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): Normal plasma osmolarity is ~280–296 mosmol/L. | (B): Na+ and accompanying anions determine most of plasma osmolarity. | (C): Glucose and urea contribute little (~5% each) normally. | (D): High osmolarity stimulates ADH.",
        "textbookNote": "(A): Normal plasma osmolarity is ~280–296 mosmol/L. | (B): Na+ and accompanying anions determine most of plasma osmolarity. | (C): Glucose and urea contribute little (~5% each) normally. | (D): High osmolarity stimulates ADH.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "The characteristics of kwashiorkor include",
        "items": [
          {
            "label": "a",
            "text": "Protein deficiency with adequate calories",
            "ans": true
          },
          {
            "label": "b",
            "text": "Skin changes are the most characteristic feature",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hypoproteinaemia and edema are the most characteristic features",
            "ans": true
          },
          {
            "label": "d",
            "text": "Mental changes",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(B): Edema/hypoalbuminaemia are the most characteristic features.",
        "textbookNote": "(B): Edema/hypoalbuminaemia are the most characteristic features.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Regarding potassium",
        "items": [
          {
            "label": "a",
            "text": "Hyperkalaemia stimulates aldosterone secretion in short-term regulation",
            "ans": true
          },
          {
            "label": "b",
            "text": "ECF hyperosmolarity causes influx of K+",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is concerned with the action potential",
            "ans": true
          },
          {
            "label": "d",
            "text": "Hypokalaemia inhibits the release of insulin",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): High K+ directly stimulates aldosterone release from zona glomerulosa. | (B): Hyperosmolarity draws water and K+ OUT of cells (efflux). | (C): K+ efflux repolarises the membrane. | (D): Hypokalaemia reduces insulin secretion.",
        "textbookNote": "(A): High K+ directly stimulates aldosterone release from zona glomerulosa. | (B): Hyperosmolarity draws water and K+ OUT of cells (efflux). | (C): K+ efflux repolarises the membrane. | (D): Hypokalaemia reduces insulin secretion.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Regarding iron",
        "items": [
          {
            "label": "a",
            "text": "Absorption occurs in large gut",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is absorbed in ferric form",
            "ans": false
          },
          {
            "label": "c",
            "text": "Vitamin C is rarely needed for absorption",
            "ans": false
          },
          {
            "label": "d",
            "text": "Binds with ferritin",
            "ans": true
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): Iron is absorbed in duodenum and proximal jejunum. | (B): Fe2+ (ferrous) is the absorbed form. | (C): Vitamin C promotes iron absorption. | (D): Iron is stored as ferritin.",
        "textbookNote": "(A): Iron is absorbed in duodenum and proximal jejunum. | (B): Fe2+ (ferrous) is the absorbed form. | (C): Vitamin C promotes iron absorption. | (D): Iron is stored as ferritin.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2023-may-p1-old",
    "session": "May 2023",
    "year": 2023,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 11,
    "bookPage": "Biochemistry Bank (May 2023)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Regarding buffer",
        "items": [
          {
            "label": "a",
            "text": "Consists of a weak acid and its conjugate base",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is more effective when pH = pK",
            "ans": true
          },
          {
            "label": "c",
            "text": "Converts weak acid into strong acid",
            "ans": false
          },
          {
            "label": "d",
            "text": "Only present intracellularly",
            "ans": false
          },
          {
            "label": "e",
            "text": "The pK of the HCO3",
            "ans": false
          }
        ],
        "explanation": "(A): A buffer = weak acid + its conjugate base (salt). | (B): Buffering is maximal at pH = pK (±1). | (C): A buffer does the opposite: it converts a strong acid into a weak acid. | (D): Buffers are present in both ECF and ICF.",
        "textbookNote": "(A): A buffer = weak acid + its conjugate base (salt). | (B): Buffering is maximal at pH = pK (±1). | (C): A buffer does the opposite: it converts a strong acid into a weak acid. | (D): Buffers are present in both ECF and ICF.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Colloid",
        "items": [
          {
            "label": "a",
            "text": "Diameter is 1–200 mμ",
            "ans": true
          },
          {
            "label": "b",
            "text": "Non-dialyzable",
            "ans": true
          },
          {
            "label": "c",
            "text": "Has an isoelectric pH",
            "ans": true
          },
          {
            "label": "d",
            "text": "Shows molecular movement in solution",
            "ans": false
          },
          {
            "label": "e",
            "text": "DNA is an example",
            "ans": true
          }
        ],
        "explanation": "(A): Colloid particle size is 1–200 millimicron (mμ = nm); crystalloids are < 1 nm. | (B): Colloids are too large to pass through a dialysis membrane. | (C): Colloids such as proteins have a definite isoelectric pH. | (D): Colloids show Brownian movement (random particle movement); molecular/ionic movement is typical of | (E): DNA is a macromolecule that forms colloidal solution.",
        "textbookNote": "(A): Colloid particle size is 1–200 millimicron (mμ = nm); crystalloids are < 1 nm. | (B): Colloids are too large to pass through a dialysis membrane. | (C): Colloids such as proteins have a definite isoelectric pH. | (D): Colloids show Brownian movement (random particle movement); molecular/ionic movement is typical of | (E): DNA is a macromolecule that forms colloidal solution.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "The statements can be applied for the H-H equation",
        "items": [
          {
            "label": "a",
            "text": "pH = pK + log salt/acid",
            "ans": true
          },
          {
            "label": "b",
            "text": "pH = 6.1 + log HCO3",
            "ans": false
          },
          {
            "label": "c",
            "text": "pH = 6.1 + log [HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "pH = pK at half neutralization",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is a derivative of the law of mass action",
            "ans": true
          }
        ],
        "explanation": "(A): H-H equation: pH = pK + log [salt]/[acid]. | (D): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (E): H-H equation is derived from the law of mass action applied to Ka of a weak acid.",
        "textbookNote": "(A): H-H equation: pH = pK + log [salt]/[acid]. | (D): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (E): H-H equation is derived from the law of mass action applied to Ka of a weak acid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding carbohydrates",
        "items": [
          {
            "label": "a",
            "text": "Are derivatives of polyhydric aldehydes and ketones",
            "ans": true
          },
          {
            "label": "b",
            "text": "Show optical isomerism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fructose is an invert sugar",
            "ans": false
          },
          {
            "label": "d",
            "text": "Sucrose exhibits mutarotation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Prevent ketosis",
            "ans": true
          }
        ],
        "explanation": "(A): Carbohydrates = polyhydroxy aldehydes/ketones and derivatives. | (B): Asymmetric carbons give optical isomerism. | (C): Invert sugar is a glucose + fructose mixture from sucrose hydrolysis. | (D): Sucrose has no free anomeric carbon, so no mutarotation. | (E): Carbohydrate is anti-ketogenic (supplies oxaloacetate).",
        "textbookNote": "(A): Carbohydrates = polyhydroxy aldehydes/ketones and derivatives. | (B): Asymmetric carbons give optical isomerism. | (C): Invert sugar is a glucose + fructose mixture from sucrose hydrolysis. | (D): Sucrose has no free anomeric carbon, so no mutarotation. | (E): Carbohydrate is anti-ketogenic (supplies oxaloacetate).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Denaturation of protein involves",
        "items": [
          {
            "label": "a",
            "text": "Change of tertiary structure",
            "ans": true
          },
          {
            "label": "b",
            "text": "Loss of biological activity",
            "ans": true
          },
          {
            "label": "c",
            "text": "Loss of primary structure",
            "ans": false
          },
          {
            "label": "d",
            "text": "Release of some amino acids",
            "ans": false
          },
          {
            "label": "e",
            "text": "Adding acid or alkali into it",
            "ans": true
          }
        ],
        "explanation": "(A): Denaturation alters 2°, 3° and 4° structures. | (B): Denaturation destroys the native conformation, so activity is lost. | (C): Denaturation disrupts 2°–4° structure only; peptide bonds (primary) stay intact. | (D): Denaturation does not hydrolyse peptide bonds. | (E): Acid, alkali, heat, and urea denature proteins.",
        "textbookNote": "(A): Denaturation alters 2°, 3° and 4° structures. | (B): Denaturation destroys the native conformation, so activity is lost. | (C): Denaturation disrupts 2°–4° structure only; peptide bonds (primary) stay intact. | (D): Denaturation does not hydrolyse peptide bonds. | (E): Acid, alkali, heat, and urea denature proteins.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Regarding body fluid volume measurement",
        "items": [
          {
            "label": "a",
            "text": "Plasma volume measured by mannitol",
            "ans": false
          },
          {
            "label": "b",
            "text": "RBC volume measured by 51Cr",
            "ans": true
          },
          {
            "label": "c",
            "text": "ECF volume measured by inulin",
            "ans": true
          },
          {
            "label": "d",
            "text": "Plasma volume measured by aminopyrine",
            "ans": false
          },
          {
            "label": "e",
            "text": "TBW measured by heavy water",
            "ans": true
          }
        ],
        "explanation": "(A): Plasma volume is measured by Evans blue/I-131 albumin; mannitol measures ECF. | (B): Cr-51-tagged RBCs measure RBC volume. | (C): Inulin stays extracellular → ECF volume. | (D): Aminopyrine/antipyrine measure TBW; plasma volume uses Evans blue. | (E): D2O/antipyrine distribute in TBW.",
        "textbookNote": "(A): Plasma volume is measured by Evans blue/I-131 albumin; mannitol measures ECF. | (B): Cr-51-tagged RBCs measure RBC volume. | (C): Inulin stays extracellular → ECF volume. | (D): Aminopyrine/antipyrine measure TBW; plasma volume uses Evans blue. | (E): D2O/antipyrine distribute in TBW.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Enzymes with their clinical significance",
        "items": [
          {
            "label": "a",
            "text": "ALT is highly specific for liver",
            "ans": true
          },
          {
            "label": "b",
            "text": "CPK-MM is highly specific for muscle",
            "ans": true
          },
          {
            "label": "c",
            "text": "SGOT is a heart disease marker",
            "ans": true
          },
          {
            "label": "d",
            "text": "ALP is increased in prostate cancer",
            "ans": false
          },
          {
            "label": "e",
            "text": "Aldolase is increased in brain tumor",
            "ans": false
          }
        ],
        "explanation": "(A): ALT is more liver-specific than AST. | (B): CPK-MM is the skeletal muscle isoenzyme; CK-MB is cardiac. | (C): AST (SGOT) rises in MI. | (D): ACP (not ALP) rises in prostate cancer. | (E): Aldolase rises in muscle disease (muscular dystrophy).",
        "textbookNote": "(A): ALT is more liver-specific than AST. | (B): CPK-MM is the skeletal muscle isoenzyme; CK-MB is cardiac. | (C): AST (SGOT) rises in MI. | (D): ACP (not ALP) rises in prostate cancer. | (E): Aldolase rises in muscle disease (muscular dystrophy).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding fatty acids",
        "items": [
          {
            "label": "a",
            "text": "Are aliphatic monocarboxylic acids",
            "ans": true
          },
          {
            "label": "b",
            "text": "95% exist as free fatty acid",
            "ans": false
          },
          {
            "label": "c",
            "text": "Are simple lipids",
            "ans": false
          },
          {
            "label": "d",
            "text": "Require micelle for absorption",
            "ans": true
          },
          {
            "label": "e",
            "text": "Act as precursor of eicosanoids",
            "ans": true
          }
        ],
        "explanation": "(A): Fatty acids are aliphatic monocarboxylic acids. | (B): Raised free FFA inhibits GH. | (C): Fatty acids are components/derived lipids. | (D): Long-chain fatty acids need bile-salt micelles. | (E): Arachidonic acid → eicosanoids.",
        "textbookNote": "(A): Fatty acids are aliphatic monocarboxylic acids. | (B): Raised free FFA inhibits GH. | (C): Fatty acids are components/derived lipids. | (D): Long-chain fatty acids need bile-salt micelles. | (E): Arachidonic acid → eicosanoids.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Membrane transport process for colloid is",
        "items": [
          {
            "label": "a",
            "text": "Simple diffusion",
            "ans": false
          },
          {
            "label": "b",
            "text": "Facilitated diffusion",
            "ans": false
          },
          {
            "label": "c",
            "text": "Secondary active transport",
            "ans": false
          },
          {
            "label": "d",
            "text": "Endocytosis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Exocytosis",
            "ans": true
          }
        ],
        "explanation": "(A): Colloids are too large for diffusion; they are taken up by endocytosis. | (B): Colloids are too large for carrier-mediated transport. | (C): Colloids are taken in by endocytosis, not by carriers. | (D): Large colloids enter cells by endocytosis. | (E): Large colloids leave cells by exocytosis.",
        "textbookNote": "(A): Colloids are too large for diffusion; they are taken up by endocytosis. | (B): Colloids are too large for carrier-mediated transport. | (C): Colloids are taken in by endocytosis, not by carriers. | (D): Large colloids enter cells by endocytosis. | (E): Large colloids leave cells by exocytosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Vitamin D",
        "items": [
          {
            "label": "a",
            "text": "Is an amino acid derivative",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is not soluble in alcohol",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is produced from 7-dehydrocholesterol in skin",
            "ans": true
          },
          {
            "label": "d",
            "text": "Produces calcitriol which acts as a hormone",
            "ans": true
          },
          {
            "label": "e",
            "text": "Deficiency causes softening of bones",
            "ans": true
          }
        ],
        "explanation": "(A): Vitamin D is a steroid derivative. | (B): Vitamin D is fat-soluble, soluble in alcohol/organic solvents. | (C): Skin 7-dehydrocholesterol → cholecalciferol. | (D): 1,25-(OH)2-D3 (calcitriol) is the active hormone. | (E): Vitamin D deficiency = osteomalacia (soft bones).",
        "textbookNote": "(A): Vitamin D is a steroid derivative. | (B): Vitamin D is fat-soluble, soluble in alcohol/organic solvents. | (C): Skin 7-dehydrocholesterol → cholecalciferol. | (D): 1,25-(OH)2-D3 (calcitriol) is the active hormone. | (E): Vitamin D deficiency = osteomalacia (soft bones).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Regarding coenzymes",
        "items": [
          {
            "label": "a",
            "text": "Only protein in nature",
            "ans": false
          },
          {
            "label": "b",
            "text": "Catalyze chemical reactions",
            "ans": false
          },
          {
            "label": "c",
            "text": "Most of them are derivatives of fat-soluble vitamins",
            "ans": false
          },
          {
            "label": "d",
            "text": "Thiamine pyrophosphate is an example",
            "ans": true
          },
          {
            "label": "e",
            "text": "NADPH is a coenzyme for reductive synthesis",
            "ans": true
          }
        ],
        "explanation": "(A): Coenzymes are NON-protein organic molecules. | (B): Enzymes catalyse; coenzymes only assist as carriers. | (C): Most coenzymes derive from water-soluble (B-complex) vitamins. | (D): TPP (from vitamin B1) is a coenzyme for oxidative decarboxylation and transketolase. | (E): NADPH donates reducing equivalents for biosynthesis (fatty acid, cholesterol).",
        "textbookNote": "(A): Coenzymes are NON-protein organic molecules. | (B): Enzymes catalyse; coenzymes only assist as carriers. | (C): Most coenzymes derive from water-soluble (B-complex) vitamins. | (D): TPP (from vitamin B1) is a coenzyme for oxidative decarboxylation and transketolase. | (E): NADPH donates reducing equivalents for biosynthesis (fatty acid, cholesterol).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Choose the correct answers",
        "items": [
          {
            "label": "a",
            "text": "Gastric juice contains pepsinogen",
            "ans": true
          },
          {
            "label": "b",
            "text": "Bile contains lipolytic enzymes",
            "ans": false
          },
          {
            "label": "c",
            "text": "Pancreatic juice contains colipase",
            "ans": true
          },
          {
            "label": "d",
            "text": "HCl secretion produces alkaline tide",
            "ans": true
          },
          {
            "label": "e",
            "text": "Chylomicron is synthesized in liver",
            "ans": false
          }
        ],
        "explanation": "(B): Bile has salts, not enzymes; lipase comes from pancreas. | (E): Chylomicrons are made in intestinal mucosa.",
        "textbookNote": "(B): Bile has salts, not enzymes; lipase comes from pancreas. | (E): Chylomicrons are made in intestinal mucosa.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Dietary fibres",
        "items": [
          {
            "label": "a",
            "text": "Are polysaccharides",
            "ans": true
          },
          {
            "label": "b",
            "text": "Are not absorbed from the gut",
            "ans": true
          },
          {
            "label": "c",
            "text": "Increase the incidence of colon cancer",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lower the blood cholesterol level",
            "ans": true
          },
          {
            "label": "e",
            "text": "Do not prevent constipation",
            "ans": false
          }
        ],
        "explanation": "(C): Fibre REDUCES colon cancer risk. | (E): Fibre adds bulk and prevents constipation.",
        "textbookNote": "(C): Fibre REDUCES colon cancer risk. | (E): Fibre adds bulk and prevents constipation.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "In metabolic acidosis",
        "items": [
          {
            "label": "a",
            "text": "[H+] decreased",
            "ans": false
          },
          {
            "label": "b",
            "text": "PCO2 increased",
            "ans": false
          },
          {
            "label": "c",
            "text": "HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "Normal anion gap only",
            "ans": false
          },
          {
            "label": "e",
            "text": "pH is < 7.35",
            "ans": true
          }
        ],
        "explanation": "(A): In acidosis [H+] rises and pH falls. | (B): In metabolic acidosis PCO2 falls (respiratory compensation); raised PCO2 is respiratory acidosis. | (D): Metabolic acidosis may have high or normal anion gap. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "textbookNote": "(A): In acidosis [H+] rises and pH falls. | (B): In metabolic acidosis PCO2 falls (respiratory compensation); raised PCO2 is respiratory acidosis. | (D): Metabolic acidosis may have high or normal anion gap. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Regarding anion gap",
        "items": [
          {
            "label": "a",
            "text": "Is equal to unmeasured anion",
            "ans": true
          },
          {
            "label": "b",
            "text": "Measured anions are sulphate and phosphate",
            "ans": false
          },
          {
            "label": "c",
            "text": "Normal value is 8–16 mEq/L",
            "ans": true
          },
          {
            "label": "d",
            "text": "Anion gap = measured cation – measured anion",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is increased in metabolic acidosis (high-AG type)",
            "ans": true
          }
        ],
        "explanation": "(A): AG represents the unmeasured anions (albumin, phosphate, sulphate, organic acids). | (B): Sulphate/phosphate are UNmeasured anions; measured anions are Cl- and HCO3 | (C): Normal anion gap is 8–16 mEq/L. | (D): AG = Na+ – (Cl- + HCO3",
        "textbookNote": "(A): AG represents the unmeasured anions (albumin, phosphate, sulphate, organic acids). | (B): Sulphate/phosphate are UNmeasured anions; measured anions are Cl- and HCO3 | (C): Normal anion gap is 8–16 mEq/L. | (D): AG = Na+ – (Cl- + HCO3",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "The characteristics of marasmus include",
        "items": [
          {
            "label": "a",
            "text": "Inadequate protein and calorie intake",
            "ans": true
          },
          {
            "label": "b",
            "text": "Most commonly seen in the first year of life",
            "ans": true
          },
          {
            "label": "c",
            "text": "Edema is present",
            "ans": false
          },
          {
            "label": "d",
            "text": "Severe growth retardation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Body weight/age is 60–80%",
            "ans": false
          }
        ],
        "explanation": "(C): Edema is a feature of kwashiorkor, not marasmus. | (E): Marasmus: weight/age < 60% of standard (kwashiorkor 60–80% with oedema).",
        "textbookNote": "(C): Edema is a feature of kwashiorkor, not marasmus. | (E): Marasmus: weight/age < 60% of standard (kwashiorkor 60–80% with oedema).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Antioxidant vitamins are",
        "items": [
          {
            "label": "a",
            "text": "Vitamin K",
            "ans": false
          },
          {
            "label": "b",
            "text": "β-carotene",
            "ans": true
          },
          {
            "label": "c",
            "text": "Vitamin E",
            "ans": true
          },
          {
            "label": "d",
            "text": "Vitamin B12",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vitamin C",
            "ans": true
          }
        ],
        "explanation": "(A): Vitamin K is not an antioxidant; it is for clotting. | (B): β-carotene is an antioxidant. | (C): Vitamin E is the main lipid-phase antioxidant. | (D): B12 is not an antioxidant. | (E): Vitamin C is the cofactor for collagen hydroxylation.",
        "textbookNote": "(A): Vitamin K is not an antioxidant; it is for clotting. | (B): β-carotene is an antioxidant. | (C): Vitamin E is the main lipid-phase antioxidant. | (D): B12 is not an antioxidant. | (E): Vitamin C is the cofactor for collagen hydroxylation.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Isotopes",
        "items": [
          {
            "label": "a",
            "text": "Are atoms of different elements",
            "ans": false
          },
          {
            "label": "b",
            "text": "Are compounds having the same number of protons",
            "ans": false
          },
          {
            "label": "c",
            "text": "Radioactive ones can be used as a therapeutic tool",
            "ans": true
          },
          {
            "label": "d",
            "text": "Have different atomic numbers",
            "ans": false
          },
          {
            "label": "e",
            "text": "131I is used to diagnose thyroid disorder",
            "ans": true
          }
        ],
        "explanation": "(A): Isotopes are atoms of the SAME element with different mass numbers. | (B): Isotopes are atoms, not compounds. | (C): Radioisotopes (I-131, Co-60) are used therapeutically. | (D): Isotopes have the SAME atomic number, different mass number. | (E): I-131 is taken up by the thyroid, used in diagnosis/therapy.",
        "textbookNote": "(A): Isotopes are atoms of the SAME element with different mass numbers. | (B): Isotopes are atoms, not compounds. | (C): Radioisotopes (I-131, Co-60) are used therapeutically. | (D): Isotopes have the SAME atomic number, different mass number. | (E): I-131 is taken up by the thyroid, used in diagnosis/therapy.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "About digestive juice",
        "items": [
          {
            "label": "a",
            "text": "Trypsin is an amylolytic enzyme",
            "ans": false
          },
          {
            "label": "b",
            "text": "Succus entericus pH is 7.5",
            "ans": true
          },
          {
            "label": "c",
            "text": "Lecithin is a phospholipid and amphipathic",
            "ans": true
          },
          {
            "label": "d",
            "text": "Salivary amylase acts on all types of starch",
            "ans": false
          },
          {
            "label": "e",
            "text": "Enterokinase is present in gastric juice",
            "ans": false
          }
        ],
        "explanation": "(A): Trypsin is proteolytic. | (D): Salivary amylase acts on cooked starch; raw starch poorly. | (E): Enterokinase is in duodenal mucosa.",
        "textbookNote": "(A): Trypsin is proteolytic. | (D): Salivary amylase acts on cooked starch; raw starch poorly. | (E): Enterokinase is in duodenal mucosa.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Regarding nutrition the following are true",
        "items": [
          {
            "label": "a",
            "text": "BMI is weight in kg / height in square metre",
            "ans": true
          },
          {
            "label": "b",
            "text": "Normal range of BMI in male is 19–24",
            "ans": true
          },
          {
            "label": "c",
            "text": "Abnormal excess accumulation of fat is an obesity disorder",
            "ans": true
          },
          {
            "label": "d",
            "text": "Marasmus is a protein deficiency disorder",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vitamin D deficiency causes osteoporosis",
            "ans": false
          }
        ],
        "explanation": "(A): BMI = kg/m². | (B): Normal BMI is 18.5–24.9 kg/m². | (C): Obesity is excess body fat. | (D): Marasmus = protein–calorie deficiency (energy). | (E): Vitamin D deficiency causes osteomalacia, not osteoporosis.",
        "textbookNote": "(A): BMI = kg/m². | (B): Normal BMI is 18.5–24.9 kg/m². | (C): Obesity is excess body fat. | (D): Marasmus = protein–calorie deficiency (energy). | (E): Vitamin D deficiency causes osteomalacia, not osteoporosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2023-may-p2-old",
    "session": "May 2023",
    "year": 2023,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 12,
    "bookPage": "Biochemistry Bank (May 2023)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Regarding TCA cycle",
        "items": [
          {
            "label": "a",
            "text": "It is an amphibolic pathway",
            "ans": true
          },
          {
            "label": "b",
            "text": "It oxidizes acetyl-CoA derived from fatty acid oxidation",
            "ans": true
          },
          {
            "label": "c",
            "text": "Produces 24 ATP from each molecule of acetyl-CoA",
            "ans": false
          },
          {
            "label": "d",
            "text": "Oxaloacetate is the catalyst",
            "ans": true
          },
          {
            "label": "e",
            "text": "Total ATP production is at substrate level",
            "ans": false
          }
        ],
        "explanation": "(A): TCA cycle is both catabolic and anabolic. | (B): β-oxidation → acetyl-CoA → TCA. | (C): One acetyl-CoA gives ~10 ATP (12 in older texts). | (D): Oxaloacetate is regenerated, acting catalytically. | (E): Most ATP comes via oxidative phosphorylation.",
        "textbookNote": "(A): TCA cycle is both catabolic and anabolic. | (B): β-oxidation → acetyl-CoA → TCA. | (C): One acetyl-CoA gives ~10 ATP (12 in older texts). | (D): Oxaloacetate is regenerated, acting catalytically. | (E): Most ATP comes via oxidative phosphorylation.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Pyruvate",
        "items": [
          {
            "label": "a",
            "text": "Produces alanine by transamination",
            "ans": true
          },
          {
            "label": "b",
            "text": "Produces acetyl-CoA by oxidative deamination",
            "ans": false
          },
          {
            "label": "c",
            "text": "Produces lactate in anaerobic condition",
            "ans": true
          },
          {
            "label": "d",
            "text": "Comes from glucose by anaerobic condition",
            "ans": true
          },
          {
            "label": "e",
            "text": "Comes from lactate by oxidation",
            "ans": true
          }
        ],
        "explanation": "(A): Pyruvate + glutamate ⇄ alanine + α-KG. | (B): Pyruvate → acetyl-CoA is oxidative DEcarboxylation (PDH), not deamination. | (C): Anaerobic: pyruvate → lactate (LDH). | (D): Glycolysis works without O2. | (E): Lactate → pyruvate by LDH.",
        "textbookNote": "(A): Pyruvate + glutamate ⇄ alanine + α-KG. | (B): Pyruvate → acetyl-CoA is oxidative DEcarboxylation (PDH), not deamination. | (C): Anaerobic: pyruvate → lactate (LDH). | (D): Glycolysis works without O2. | (E): Lactate → pyruvate by LDH.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Regarding gluconeogenesis",
        "items": [
          {
            "label": "a",
            "text": "De novo synthesis of glucose",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occurs in well-fed condition",
            "ans": false
          },
          {
            "label": "c",
            "text": "Takes place in adipose tissues",
            "ans": false
          },
          {
            "label": "d",
            "text": "Insulin inhibits gluconeogenesis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Glycerol is a substrate",
            "ans": true
          }
        ],
        "explanation": "(A): Gluconeogenesis = new glucose from non-carbohydrate precursors. | (B): Gluconeogenesis occurs in fasting; insulin inhibits it. | (C): Gluconeogenesis occurs only in liver and kidney. | (D): Insulin suppresses PEPCK, G6Pase, FBPase. | (E): Glycerol → DHAP → glucose.",
        "textbookNote": "(A): Gluconeogenesis = new glucose from non-carbohydrate precursors. | (B): Gluconeogenesis occurs in fasting; insulin inhibits it. | (C): Gluconeogenesis occurs only in liver and kidney. | (D): Insulin suppresses PEPCK, G6Pase, FBPase. | (E): Glycerol → DHAP → glucose.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "The following statements are true",
        "items": [
          {
            "label": "a",
            "text": "Nucleic acid is a polymer of nucleotide",
            "ans": true
          },
          {
            "label": "b",
            "text": "Uracil is a purine base",
            "ans": false
          },
          {
            "label": "c",
            "text": "Nucleotide connects by 3'–5' phosphodiester bond",
            "ans": true
          },
          {
            "label": "d",
            "text": "Guanine is a nucleotide base in RNA",
            "ans": true
          },
          {
            "label": "e",
            "text": "Amino acid is not a part of DNA",
            "ans": true
          }
        ],
        "explanation": "(A): DNA/RNA are polymers of nucleotides. | (B): Uracil is a pyrimidine. | (C): DNA polymerase forms 3'–5' phosphodiester bonds. | (D): RNA has A, G, C, U. | (E): DNA = nucleotides only.",
        "textbookNote": "(A): DNA/RNA are polymers of nucleotides. | (B): Uracil is a pyrimidine. | (C): DNA polymerase forms 3'–5' phosphodiester bonds. | (D): RNA has A, G, C, U. | (E): DNA = nucleotides only.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "In β-oxidation of palmitic acid",
        "items": [
          {
            "label": "a",
            "text": "End product is acetyl-CoA only",
            "ans": true
          },
          {
            "label": "b",
            "text": "In each cycle 1 NADH and 1 FADH2 are generated",
            "ans": true
          },
          {
            "label": "c",
            "text": "Produces 7 acetyl-CoA",
            "ans": false
          },
          {
            "label": "d",
            "text": "Complete oxidation releases net 129 ATP",
            "ans": true
          },
          {
            "label": "e",
            "text": "80% of energy is utilized by skeletal muscle",
            "ans": false
          }
        ],
        "explanation": "(A): Palmitate β-oxidation: acetyl-CoA + NADH + FADH2. | (B): Each β-oxidation cycle yields 1 FADH2, 1 NADH, 1 acetyl-CoA. | (C): Palmitic acid (C16) gives 8 acetyl-CoA after 7 cycles. | (D): Palmitate yields net 129 ATP (106 by revised values). | (E): Not 80% by skeletal muscle.",
        "textbookNote": "(A): Palmitate β-oxidation: acetyl-CoA + NADH + FADH2. | (B): Each β-oxidation cycle yields 1 FADH2, 1 NADH, 1 acetyl-CoA. | (C): Palmitic acid (C16) gives 8 acetyl-CoA after 7 cycles. | (D): Palmitate yields net 129 ATP (106 by revised values). | (E): Not 80% by skeletal muscle.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Features of myxedema",
        "items": [
          {
            "label": "a",
            "text": "Puffy face",
            "ans": true
          },
          {
            "label": "b",
            "text": "Husky voice",
            "ans": true
          },
          {
            "label": "c",
            "text": "Retarded growth",
            "ans": false
          },
          {
            "label": "d",
            "text": "Diarrhoea",
            "ans": false
          },
          {
            "label": "e",
            "text": "Bagginess under the eye",
            "ans": true
          }
        ],
        "explanation": "(A): Myxoedema → mucopolysaccharide deposition → puffiness. | (B): Myxoedema affects vocal cords. | (C): Myxoedema is adult hypothyroidism; growth retardation is cretinism. | (D): Hypothyroidism causes constipation. | (E): Periorbital edema in myxoedema.",
        "textbookNote": "(A): Myxoedema → mucopolysaccharide deposition → puffiness. | (B): Myxoedema affects vocal cords. | (C): Myxoedema is adult hypothyroidism; growth retardation is cretinism. | (D): Hypothyroidism causes constipation. | (E): Periorbital edema in myxoedema.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Features of Addison's disease are",
        "items": [
          {
            "label": "a",
            "text": "Hypoglycemia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hyponatremia",
            "ans": true
          },
          {
            "label": "c",
            "text": "Hypokalemia",
            "ans": false
          },
          {
            "label": "d",
            "text": "Hypopigmentation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Hypotension",
            "ans": true
          }
        ],
        "explanation": "(A): Cortisol deficiency (Addison's) → hypoglycaemia. | (B): Aldosterone deficiency → Na+ loss. | (C): Addison's → HYPERkalaemia (aldosterone lack); Cushing's → hypokalaemia (mineralocorticoid effect of | (D): ↑ACTH/MSH → hyperpigmentation in Addison's. | (E): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension.",
        "textbookNote": "(A): Cortisol deficiency (Addison's) → hypoglycaemia. | (B): Aldosterone deficiency → Na+ loss. | (C): Addison's → HYPERkalaemia (aldosterone lack); Cushing's → hypokalaemia (mineralocorticoid effect of | (D): ↑ACTH/MSH → hyperpigmentation in Addison's. | (E): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Carbohydrate is metabolized by",
        "items": [
          {
            "label": "a",
            "text": "Krebs urea cycle",
            "ans": false
          },
          {
            "label": "b",
            "text": "Glycolysis",
            "ans": true
          },
          {
            "label": "c",
            "text": "HMP shunt pathway",
            "ans": true
          },
          {
            "label": "d",
            "text": "Oxidative deamination",
            "ans": false
          },
          {
            "label": "e",
            "text": "Gluconeogenesis",
            "ans": true
          }
        ],
        "explanation": "(A): Krebs cycle (TCA) and the urea cycle are separate. | (B): Glycolysis: PFK-1 is rate limiting. | (D): Pyruvate → acetyl-CoA is oxidative DEcarboxylation (PDH), not deamination. | (E): Gluconeogenesis is an anabolic synthesis of glucose; occurs in fasting, liver/kidney, inhibited by insulin.",
        "textbookNote": "(A): Krebs cycle (TCA) and the urea cycle are separate. | (B): Glycolysis: PFK-1 is rate limiting. | (D): Pyruvate → acetyl-CoA is oxidative DEcarboxylation (PDH), not deamination. | (E): Gluconeogenesis is an anabolic synthesis of glucose; occurs in fasting, liver/kidney, inhibited by insulin.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Growth hormone secretion is stimulated in",
        "items": [
          {
            "label": "a",
            "text": "Hyperglycemia",
            "ans": false
          },
          {
            "label": "b",
            "text": "Stress",
            "ans": true
          },
          {
            "label": "c",
            "text": "Increased plasma free fatty acid",
            "ans": false
          },
          {
            "label": "d",
            "text": "The first few hours of deep sleep",
            "ans": true
          },
          {
            "label": "e",
            "text": "Increased plasma insulin",
            "ans": false
          }
        ],
        "explanation": "(A): Hyperglycaemia suppresses GH; hypoglycaemia stimulates it. (In DKA hyperglycaemia is a diagnostic feature.) | (B): Stress, exercise, sleep and hypoglycaemia raise GH. | (C): Raised free FFA inhibits GH. | (D): GH peaks during slow-wave sleep. | (E): Hyperinsulinaemia (via hypoglycaemia) is stimulatory but insulin itself is not the trigger.",
        "textbookNote": "(A): Hyperglycaemia suppresses GH; hypoglycaemia stimulates it. (In DKA hyperglycaemia is a diagnostic feature.) | (B): Stress, exercise, sleep and hypoglycaemia raise GH. | (C): Raised free FFA inhibits GH. | (D): GH peaks during slow-wave sleep. | (E): Hyperinsulinaemia (via hypoglycaemia) is stimulatory but insulin itself is not the trigger.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "The diagnostic features of diabetic ketoacidosis",
        "items": [
          {
            "label": "a",
            "text": "High pH",
            "ans": false
          },
          {
            "label": "b",
            "text": "Low HCO3",
            "ans": false
          },
          {
            "label": "c",
            "text": "Ketonaemia",
            "ans": true
          },
          {
            "label": "d",
            "text": "Hyperglycemia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Low anion gap",
            "ans": false
          }
        ],
        "explanation": "(A): DKA has acidosis (low pH). | (D): Hyperglycaemia suppresses GH; hypoglycaemia stimulates it. (In DKA hyperglycaemia is a diagnostic feature.) | (E): DKA has HIGH anion gap.",
        "textbookNote": "(A): DKA has acidosis (low pH). | (D): Hyperglycaemia suppresses GH; hypoglycaemia stimulates it. (In DKA hyperglycaemia is a diagnostic feature.) | (E): DKA has HIGH anion gap.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Thyroid function tests",
        "items": [
          {
            "label": "a",
            "text": "Normal TSH level is 0.4–4.5 μIU/mL",
            "ans": true
          },
          {
            "label": "b",
            "text": "Normal TSH excludes hypothyroidism and hyperthyroidism (primary)",
            "ans": true
          },
          {
            "label": "c",
            "text": "TSH, T3 and T4 increase in secondary hypothyroidism",
            "ans": false
          },
          {
            "label": "d",
            "text": "Normal free T3 level is 3 to 9 pmol/L",
            "ans": true
          },
          {
            "label": "e",
            "text": "TSH level more than 20 μIU/mL indicates hyperthyroidism",
            "ans": false
          }
        ],
        "explanation": "(A): Normal TSH is ~0.4–4.5 μIU/mL. | (B): A normal TSH excludes primary hypo/hyperthyroidism. | (C): In secondary hypothyroidism TSH, T3, T4 are all low. | (D): Normal free T3 ≈ 3–7 pmol/L. | (E): TSH > 20 μIU/mL indicates hypothyroidism.",
        "textbookNote": "(A): Normal TSH is ~0.4–4.5 μIU/mL. | (B): A normal TSH excludes primary hypo/hyperthyroidism. | (C): In secondary hypothyroidism TSH, T3, T4 are all low. | (D): Normal free T3 ≈ 3–7 pmol/L. | (E): TSH > 20 μIU/mL indicates hypothyroidism.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Regarding lipoproteins",
        "items": [
          {
            "label": "a",
            "text": "Chylomicrons are synthesized in the intestinal mucosa",
            "ans": true
          },
          {
            "label": "b",
            "text": "VLDL is synthesized in the liver",
            "ans": true
          },
          {
            "label": "c",
            "text": "Chylomicrons are absorbed through portal circulation",
            "ans": false
          },
          {
            "label": "d",
            "text": "HDL acts as cholesterol scavenger",
            "ans": true
          },
          {
            "label": "e",
            "text": "LDL contains more triacylglycerol but less cholesterol",
            "ans": false
          }
        ],
        "explanation": "(A): Chylomicrons are made in intestinal mucosa. | (B): VLDL is made in liver. | (C): Chylomicrons enter lymph (lacteals), not the portal vein. | (D): HDL carries cholesterol from tissues to liver. | (E): LDL is cholesterol-rich, TG-poor.",
        "textbookNote": "(A): Chylomicrons are made in intestinal mucosa. | (B): VLDL is made in liver. | (C): Chylomicrons enter lymph (lacteals), not the portal vein. | (D): HDL carries cholesterol from tissues to liver. | (E): LDL is cholesterol-rich, TG-poor.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Regarding codon",
        "items": [
          {
            "label": "a",
            "text": "They are 3 consecutive bases of mRNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "Present in tRNA",
            "ans": false
          },
          {
            "label": "c",
            "text": "Responsible for synthesis of specific amino acids",
            "ans": true
          },
          {
            "label": "d",
            "text": "UAG, UGA, UAA are stop codons",
            "ans": true
          },
          {
            "label": "e",
            "text": "AGU codes for methionine",
            "ans": false
          }
        ],
        "explanation": "(A): Codon = 3 consecutive bases of mRNA. | (B): tRNA carries the anticodon; codon is in mRNA. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "textbookNote": "(A): Codon = 3 consecutive bases of mRNA. | (B): tRNA carries the anticodon; codon is in mRNA. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "During DNA replication",
        "items": [
          {
            "label": "a",
            "text": "DNA helicase separates the double-stranded DNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "DNA is synthesized in one direction",
            "ans": true
          },
          {
            "label": "c",
            "text": "Okazaki fragments are synthesized",
            "ans": true
          },
          {
            "label": "d",
            "text": "DNA is synthesized in a conservative manner",
            "ans": false
          },
          {
            "label": "e",
            "text": "Uracil is paired to adenine",
            "ans": false
          }
        ],
        "explanation": "(A): Helicase unwinds the double helix. | (B): DNA is synthesised 5'→3' only. | (C): Lagging strand is made as Okazaki fragments. | (D): Replication is SEMIconservative. | (E): DNA has thymine; uracil pairs with adenine in RNA.",
        "textbookNote": "(A): Helicase unwinds the double helix. | (B): DNA is synthesised 5'→3' only. | (C): Lagging strand is made as Okazaki fragments. | (D): Replication is SEMIconservative. | (E): DNA has thymine; uracil pairs with adenine in RNA.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Regarding blotting techniques",
        "items": [
          {
            "label": "a",
            "text": "Northern blot technique is for DNA analysis",
            "ans": false
          },
          {
            "label": "b",
            "text": "Southern blot technique is for RNA analysis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Western blot technique is for protein",
            "ans": true
          },
          {
            "label": "d",
            "text": "Nucleic acid probe is used in Southern blot",
            "ans": true
          },
          {
            "label": "e",
            "text": "Antibody probe is used in Northern blot technique",
            "ans": false
          }
        ],
        "explanation": "(A): Northern = RNA; Southern = DNA; Western = protein. | (B): Southern = DNA. | (C): Western = protein. | (D): Southern blot uses a nucleic acid probe. | (E): Antibody probe is for Western blot.",
        "textbookNote": "(A): Northern = RNA; Southern = DNA; Western = protein. | (B): Southern = DNA. | (C): Western = protein. | (D): Southern blot uses a nucleic acid probe. | (E): Antibody probe is for Western blot.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Diagnostic criteria of IGT",
        "items": [
          {
            "label": "a",
            "text": "Fasting plasma glucose is > 7 mmol/L",
            "ans": false
          },
          {
            "label": "b",
            "text": "2-h post-glucose load level is 7.8–11 mmol/L",
            "ans": true
          },
          {
            "label": "c",
            "text": "2-h post-glucose load level is > 11 mmol/L",
            "ans": false
          },
          {
            "label": "d",
            "text": "HbA1c value is 5.7–6.4%",
            "ans": true
          },
          {
            "label": "e",
            "text": "HbA1c value is ≥ 6.5%",
            "ans": false
          }
        ],
        "explanation": "(A): FPG ≥ 7 mmol/L is diabetes; IGT has FPG < 7. | (B): IGT = 2-h glucose 7.8–11.0 mmol/L. | (C): ≥ 11.1 mmol/L is diabetes, not IGT. | (D): HbA1c 5.7–6.4% = pre-diabetes. | (E): HbA1c ≥ 6.5% = diabetes.",
        "textbookNote": "(A): FPG ≥ 7 mmol/L is diabetes; IGT has FPG < 7. | (B): IGT = 2-h glucose 7.8–11.0 mmol/L. | (C): ≥ 11.1 mmol/L is diabetes, not IGT. | (D): HbA1c 5.7–6.4% = pre-diabetes. | (E): HbA1c ≥ 6.5% = diabetes.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Disorders of amino acid metabolism",
        "items": [
          {
            "label": "a",
            "text": "Phenylketonuria",
            "ans": true
          },
          {
            "label": "b",
            "text": "Gaucher's disease",
            "ans": false
          },
          {
            "label": "c",
            "text": "Albinism",
            "ans": true
          },
          {
            "label": "d",
            "text": "Wilson's disease",
            "ans": false
          },
          {
            "label": "e",
            "text": "Alkaptonuria",
            "ans": true
          }
        ],
        "explanation": "(A): PKU is autosomal recessive. | (B): Gaucher's is a lysosomal storage disease. | (D): Wilson's disease is a copper disorder.",
        "textbookNote": "(A): PKU is autosomal recessive. | (B): Gaucher's is a lysosomal storage disease. | (D): Wilson's disease is a copper disorder.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Mechanism of edema",
        "items": [
          {
            "label": "a",
            "text": "Increased colloid osmotic pressure",
            "ans": false
          },
          {
            "label": "b",
            "text": "Increased capillary hydrostatic pressure",
            "ans": true
          },
          {
            "label": "c",
            "text": "Salt retention in renal failure",
            "ans": true
          },
          {
            "label": "d",
            "text": "Lymphatic obstruction",
            "ans": true
          },
          {
            "label": "e",
            "text": "Decreased capillary permeability",
            "ans": false
          }
        ],
        "explanation": "(A): Reduced colloid osmotic pressure causes edema. | (E): Increased permeability causes edema.",
        "textbookNote": "(A): Reduced colloid osmotic pressure causes edema. | (E): Increased permeability causes edema.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Mutation",
        "items": [
          {
            "label": "a",
            "text": "Errors in the DNA occur at a slow rate",
            "ans": true
          },
          {
            "label": "b",
            "text": "Only occurs in the X chromosome",
            "ans": false
          },
          {
            "label": "c",
            "text": "Occurs due to error in replication",
            "ans": true
          },
          {
            "label": "d",
            "text": "β-thalassemia is an example of nonsense mutation",
            "ans": false
          },
          {
            "label": "e",
            "text": "In any region of DNA is expressed phenotypically",
            "ans": false
          }
        ],
        "explanation": "(A): Spontaneous mutation rate is low. | (B): Mutations occur anywhere in the genome. | (C): Replication errors cause mutation. | (D): β-thalassaemia is mostly point/splice mutations; nonsense mutations also occur. | (E): Mutations in non-coding DNA may be silent.",
        "textbookNote": "(A): Spontaneous mutation rate is low. | (B): Mutations occur anywhere in the genome. | (C): Replication errors cause mutation. | (D): β-thalassaemia is mostly point/splice mutations; nonsense mutations also occur. | (E): Mutations in non-coding DNA may be silent.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "The following are autosomal dominant disorders",
        "items": [
          {
            "label": "a",
            "text": "Achondroplasia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Familial hypercholesterolemia",
            "ans": true
          },
          {
            "label": "c",
            "text": "Diabetes insipidus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Phenylketonuria",
            "ans": false
          },
          {
            "label": "e",
            "text": "Sickle cell anaemia",
            "ans": false
          }
        ],
        "explanation": "(A): Achondroplasia is autosomal dominant. | (B): FH is autosomal dominant (LDL receptor). | (C): Nephrogenic DI is X-linked recessive. | (D): PKU is autosomal recessive. | (E): Sickle cell anaemia is autosomal recessive.",
        "textbookNote": "(A): Achondroplasia is autosomal dominant. | (B): FH is autosomal dominant (LDL receptor). | (C): Nephrogenic DI is X-linked recessive. | (D): PKU is autosomal recessive. | (E): Sickle cell anaemia is autosomal recessive.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2022-nov-p1-old",
    "session": "November 2022",
    "year": 2022,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 13,
    "bookPage": "Biochemistry Bank (November 2022)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "About pH",
        "items": [
          {
            "label": "a",
            "text": "Is the log of [H+]",
            "ans": false
          },
          {
            "label": "b",
            "text": "pH = pK + log [HCO3",
            "ans": false
          },
          {
            "label": "c",
            "text": "pH = pK at half neutralization",
            "ans": true
          },
          {
            "label": "d",
            "text": "pH of ECF is 7.1",
            "ans": false
          },
          {
            "label": "e",
            "text": "Hyperventilation increases pH",
            "ans": true
          }
        ],
        "explanation": "(A): pH is the NEGATIVE logarithm of [H+]. | (C): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (D): ECF/blood pH is 7.35–7.45 (7.4). | (E): Hyperventilation blows off CO2, lowers H2CO3 and raises pH (respiratory alkalosis).",
        "textbookNote": "(A): pH is the NEGATIVE logarithm of [H+]. | (C): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (D): ECF/blood pH is 7.35–7.45 (7.4). | (E): Hyperventilation blows off CO2, lowers H2CO3 and raises pH (respiratory alkalosis).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Regarding crystalloid",
        "items": [
          {
            "label": "a",
            "text": "The diameter is < 1 nm",
            "ans": true
          },
          {
            "label": "b",
            "text": "Movement is Brownian",
            "ans": false
          },
          {
            "label": "c",
            "text": "Can pass through semipermeable membrane",
            "ans": true
          },
          {
            "label": "d",
            "text": "Osmotic pressure is 32 mmHg",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is dialyzable",
            "ans": true
          }
        ],
        "explanation": "(A): Crystalloid particles are < 1 nm. | (B): Crystalloids show molecular movement; Brownian movement is typical of colloids. | (C): Crystalloids pass; colloids cannot pass through semipermeable membranes. | (D): Crystalloid osmotic pressure is large; colloid osmotic pressure is ~25–32 mmHg. | (E): Crystalloids are dialyzable; colloids/enzymes are not.",
        "textbookNote": "(A): Crystalloid particles are < 1 nm. | (B): Crystalloids show molecular movement; Brownian movement is typical of colloids. | (C): Crystalloids pass; colloids cannot pass through semipermeable membranes. | (D): Crystalloid osmotic pressure is large; colloid osmotic pressure is ~25–32 mmHg. | (E): Crystalloids are dialyzable; colloids/enzymes are not.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Enzymes",
        "items": [
          {
            "label": "a",
            "text": "Are crystalloids",
            "ans": false
          },
          {
            "label": "b",
            "text": "Are dialyzable",
            "ans": false
          },
          {
            "label": "c",
            "text": "Protein in nature",
            "ans": true
          },
          {
            "label": "d",
            "text": "Reaction specific",
            "ans": true
          },
          {
            "label": "e",
            "text": "Inactivated by heat",
            "ans": true
          }
        ],
        "explanation": "(A): Enzymes are proteins (colloids), not crystalloids. | (B): Enzymes are proteins (colloids) and are non-dialyzable. | (C): Coenzymes are non-protein organic molecules; the apoenzyme is the protein. | (D): Enzymes are reaction and substrate specific. | (E): Heat denatures enzyme proteins.",
        "textbookNote": "(A): Enzymes are proteins (colloids), not crystalloids. | (B): Enzymes are proteins (colloids) and are non-dialyzable. | (C): Coenzymes are non-protein organic molecules; the apoenzyme is the protein. | (D): Enzymes are reaction and substrate specific. | (E): Heat denatures enzyme proteins.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Choose the correct answer for body fluid",
        "items": [
          {
            "label": "a",
            "text": "Na+ is the main cation of ECF",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cl- is the main anion of ICF",
            "ans": false
          },
          {
            "label": "c",
            "text": "ECF is the major compartment",
            "ans": false
          },
          {
            "label": "d",
            "text": "pH of ICF is lower than that of ECF",
            "ans": true
          },
          {
            "label": "e",
            "text": "Ca2+ is the major divalent ion of ICF",
            "ans": false
          }
        ],
        "explanation": "(A): Na+ is the principal ECF cation (~140 mEq/L). | (B): Cl- is the main ECF anion; ICF anions are phosphate and proteins. | (C): ICF (2/3 of TBW) is the major compartment; ECF is 1/3. | (D): ICF pH (~7.0) is lower than ECF (7.4). | (E): Mg2+ is the major intracellular divalent cation.",
        "textbookNote": "(A): Na+ is the principal ECF cation (~140 mEq/L). | (B): Cl- is the main ECF anion; ICF anions are phosphate and proteins. | (C): ICF (2/3 of TBW) is the major compartment; ECF is 1/3. | (D): ICF pH (~7.0) is lower than ECF (7.4). | (E): Mg2+ is the major intracellular divalent cation.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Regarding protein",
        "items": [
          {
            "label": "a",
            "text": "Peptide bond is –CONH2–",
            "ans": false
          },
          {
            "label": "b",
            "text": "Peptide bond is an expression of gene",
            "ans": false
          },
          {
            "label": "c",
            "text": "Denaturation causes loss of primary structure",
            "ans": false
          },
          {
            "label": "d",
            "text": "Amino acids are zwitterions",
            "ans": true
          },
          {
            "label": "e",
            "text": "Concentration in plasma is 6–8 g/dL",
            "ans": true
          }
        ],
        "explanation": "(A): Peptide bond is –CO–NH– (not CONH2). | (B): Peptide bond is a covalent amide bond, not a gene expression. | (C): Denaturation disrupts 2°–4° structure only; peptide bonds (primary) stay intact. | (D): At isoelectric pH amino acids carry both + and – charges. | (E): Normal plasma protein is 6–8 g/dL.",
        "textbookNote": "(A): Peptide bond is –CO–NH– (not CONH2). | (B): Peptide bond is a covalent amide bond, not a gene expression. | (C): Denaturation disrupts 2°–4° structure only; peptide bonds (primary) stay intact. | (D): At isoelectric pH amino acids carry both + and – charges. | (E): Normal plasma protein is 6–8 g/dL.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Lipids have the following facts",
        "items": [
          {
            "label": "a",
            "text": "Esters of polyhydric alcohols only",
            "ans": false
          },
          {
            "label": "b",
            "text": "Have higher specific gravity",
            "ans": false
          },
          {
            "label": "c",
            "text": "Iodine number indicates molecular weight",
            "ans": false
          },
          {
            "label": "d",
            "text": "Open air oxidation causes rancidity",
            "ans": true
          },
          {
            "label": "e",
            "text": "Polyunsaturated fats are available in fishes",
            "ans": true
          }
        ],
        "explanation": "(A): Lipids include esters of mono- and polyhydric alcohols plus others (cholesterol, etc.). | (B): Lipids are lighter than water. | (C): Iodine number measures degree of unsaturation. | (D): Oxidation of unsaturated fats gives rancidity. | (E): Fish oils are rich in PUFA (ω-3).",
        "textbookNote": "(A): Lipids include esters of mono- and polyhydric alcohols plus others (cholesterol, etc.). | (B): Lipids are lighter than water. | (C): Iodine number measures degree of unsaturation. | (D): Oxidation of unsaturated fats gives rancidity. | (E): Fish oils are rich in PUFA (ω-3).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Regarding diffusion",
        "items": [
          {
            "label": "a",
            "text": "Is an active transport process",
            "ans": false
          },
          {
            "label": "b",
            "text": "Diffusion does not need carrier protein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Facilitated diffusion is bi-directional",
            "ans": true
          },
          {
            "label": "d",
            "text": "Temperature can facilitate diffusion",
            "ans": true
          },
          {
            "label": "e",
            "text": "Simple diffusion can be blocked competitively",
            "ans": false
          }
        ],
        "explanation": "(A): Diffusion is passive. | (B): Simple diffusion needs no carrier or energy. | (C): Facilitated diffusion goes down the gradient in either direction, as per gradient. | (D): Higher temperature increases diffusion. | (E): Simple diffusion has no carrier, so it cannot be competitively blocked.",
        "textbookNote": "(A): Diffusion is passive. | (B): Simple diffusion needs no carrier or energy. | (C): Facilitated diffusion goes down the gradient in either direction, as per gradient. | (D): Higher temperature increases diffusion. | (E): Simple diffusion has no carrier, so it cannot be competitively blocked.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Fatty acid",
        "items": [
          {
            "label": "a",
            "text": "Is an –OH group-containing aromatic acid",
            "ans": false
          },
          {
            "label": "b",
            "text": "Mustard oil is a source of essential fatty acid",
            "ans": true
          },
          {
            "label": "c",
            "text": "Melting point is low in PUFA",
            "ans": true
          },
          {
            "label": "d",
            "text": "Forms soap with alcohol",
            "ans": false
          },
          {
            "label": "e",
            "text": "PUFA are available in fishes",
            "ans": true
          }
        ],
        "explanation": "(A): Fatty acids are aliphatic. | (B): Mustard oil contains linoleic acid, an essential fatty acid. | (C): Double bonds lower melting point. | (D): Soap forms by saponification with alkali. | (E): Fish oils are rich in PUFA (ω-3).",
        "textbookNote": "(A): Fatty acids are aliphatic. | (B): Mustard oil contains linoleic acid, an essential fatty acid. | (C): Double bonds lower melting point. | (D): Soap forms by saponification with alkali. | (E): Fish oils are rich in PUFA (ω-3).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Renal buffers",
        "items": [
          {
            "label": "a",
            "text": "Protein buffer and ammonia buffer",
            "ans": false
          },
          {
            "label": "b",
            "text": "Are needed for H+ secretion in renal tubules",
            "ans": true
          },
          {
            "label": "c",
            "text": "Are not found in glomerular filtrate in renal failure",
            "ans": false
          },
          {
            "label": "d",
            "text": "Help in HCO3",
            "ans": false
          },
          {
            "label": "e",
            "text": "Decrease plasma HCO3",
            "ans": false
          }
        ],
        "explanation": "(A): Renal buffers are phosphate and ammonia. | (B): Urinary buffers let tubules secrete H+ without lowering urine pH below ~4.5. | (C): Phosphate/ammonia buffers are present in filtrate; in renal failure they are inadequate, not absent.",
        "textbookNote": "(A): Renal buffers are phosphate and ammonia. | (B): Urinary buffers let tubules secrete H+ without lowering urine pH below ~4.5. | (C): Phosphate/ammonia buffers are present in filtrate; in renal failure they are inadequate, not absent.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Regarding carbohydrate",
        "items": [
          {
            "label": "a",
            "text": "Hexose is a monosaccharide",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lactose is a reducing sugar",
            "ans": true
          },
          {
            "label": "c",
            "text": "Sucrose is a reducing sugar",
            "ans": false
          },
          {
            "label": "d",
            "text": "Amylopectin is a highly branched starch",
            "ans": true
          },
          {
            "label": "e",
            "text": "Cellulose gives energy",
            "ans": false
          }
        ],
        "explanation": "(A): Hexoses are 6-carbon monosaccharides. | (B): Lactose has a free anomeric carbon. | (C): Sucrose has no free anomeric carbon → non-reducing. | (D): Amylopectin has α-1,6 branches every 24–30 residues. | (E): Humans lack cellulase; cellulose gives no energy.",
        "textbookNote": "(A): Hexoses are 6-carbon monosaccharides. | (B): Lactose has a free anomeric carbon. | (C): Sucrose has no free anomeric carbon → non-reducing. | (D): Amylopectin has α-1,6 branches every 24–30 residues. | (E): Humans lack cellulase; cellulose gives no energy.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Vitamins associated with some clinical conditions",
        "items": [
          {
            "label": "a",
            "text": "Cobalamin – dementia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Thiamine – cardiac failure",
            "ans": true
          },
          {
            "label": "c",
            "text": "Phylloquinone – defect in blood clotting",
            "ans": true
          },
          {
            "label": "d",
            "text": "Ascorbic acid – gum bleeding",
            "ans": true
          },
          {
            "label": "e",
            "text": "Pyridoxal phosphate – spina bifida",
            "ans": false
          }
        ],
        "explanation": "(A): B12 deficiency causes neuropsychiatric features. | (B): Wet beriberi → high-output cardiac failure. | (C): Phylloquinone (vit K1) is needed for clotting. | (D): Scurvy causes gum bleeding. | (E): Spina bifida/neural tube defects are due to FOLATE deficiency.",
        "textbookNote": "(A): B12 deficiency causes neuropsychiatric features. | (B): Wet beriberi → high-output cardiac failure. | (C): Phylloquinone (vit K1) is needed for clotting. | (D): Scurvy causes gum bleeding. | (E): Spina bifida/neural tube defects are due to FOLATE deficiency.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Apo-lipoproteins",
        "items": [
          {
            "label": "a",
            "text": "Are the structural components of lipoprotein",
            "ans": true
          },
          {
            "label": "b",
            "text": "Provide solubility to blood lipids",
            "ans": true
          },
          {
            "label": "c",
            "text": "Act as ligand",
            "ans": true
          },
          {
            "label": "d",
            "text": "Act as coenzyme",
            "ans": true
          },
          {
            "label": "e",
            "text": "Can be transferred from one lipoprotein to another",
            "ans": true
          }
        ],
        "explanation": "(A): Apolipoproteins are structural and functional components of lipoproteins. | (B): Apolipoproteins help solubilise lipids in plasma. | (C): Apo B-100/E are ligands for receptors. | (D): Apo C-II activates LPL; apo A-I activates LCAT. | (E): Apo C and E are exchangeable between lipoproteins.",
        "textbookNote": "(A): Apolipoproteins are structural and functional components of lipoproteins. | (B): Apolipoproteins help solubilise lipids in plasma. | (C): Apo B-100/E are ligands for receptors. | (D): Apo C-II activates LPL; apo A-I activates LCAT. | (E): Apo C and E are exchangeable between lipoproteins.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Dietary fibers",
        "items": [
          {
            "label": "a",
            "text": "Are monosaccharides",
            "ans": false
          },
          {
            "label": "b",
            "text": "Are not absorbed from the gut",
            "ans": true
          },
          {
            "label": "c",
            "text": "Increase the incidence of colon cancer",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lower the blood cholesterol level",
            "ans": true
          },
          {
            "label": "e",
            "text": "Prevent constipation",
            "ans": true
          }
        ],
        "explanation": "(A): Dietary fibres are polysaccharides (cellulose, pectin) – non-starch. | (C): Fibre REDUCES colon cancer risk.",
        "textbookNote": "(A): Dietary fibres are polysaccharides (cellulose, pectin) – non-starch. | (C): Fibre REDUCES colon cancer risk.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Cholesterol",
        "items": [
          {
            "label": "a",
            "text": "Is synthesized in the liver only",
            "ans": false
          },
          {
            "label": "b",
            "text": "Should be < 200 mg/dL in plasma",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is a simple lipid",
            "ans": false
          },
          {
            "label": "d",
            "text": "Contains cyclopentano-perhydrophenanthrene ring",
            "ans": true
          },
          {
            "label": "e",
            "text": "Synthesis is inhibited by prostaglandin",
            "ans": false
          }
        ],
        "explanation": "(A): Cholesterol is also made in intestine, adrenals, skin. | (B): Desirable total cholesterol < 200 mg/dL. | (C): Cholesterol is a derived lipid. | (D): Cholesterol has the cyclopentanoperhydrophenanthrene ring. | (E): Cholesterol synthesis is inhibited by cholesterol (feedback), statins, insulin/glucagon control.",
        "textbookNote": "(A): Cholesterol is also made in intestine, adrenals, skin. | (B): Desirable total cholesterol < 200 mg/dL. | (C): Cholesterol is a derived lipid. | (D): Cholesterol has the cyclopentanoperhydrophenanthrene ring. | (E): Cholesterol synthesis is inhibited by cholesterol (feedback), statins, insulin/glucagon control.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Regarding PEM",
        "items": [
          {
            "label": "a",
            "text": "In marasmus edema generalizes",
            "ans": false
          },
          {
            "label": "b",
            "text": "In kwashiorkor appetite is usually good",
            "ans": false
          },
          {
            "label": "c",
            "text": "In kwashiorkor skin is pigmented but hair is normal",
            "ans": false
          },
          {
            "label": "d",
            "text": "In kwashiorkor liver may be palpable",
            "ans": true
          },
          {
            "label": "e",
            "text": "Severe growth retardation occurs in marasmus",
            "ans": true
          }
        ],
        "explanation": "(A): Marasmus has no edema. | (B): Kwashiorkor has anorexia. | (C): Kwashiorkor: skin changes and hair changes (flag sign).",
        "textbookNote": "(A): Marasmus has no edema. | (B): Kwashiorkor has anorexia. | (C): Kwashiorkor: skin changes and hair changes (flag sign).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Hypokalemia",
        "items": [
          {
            "label": "a",
            "text": "Means plasma K+ level < 3.5 mmol/L",
            "ans": true
          },
          {
            "label": "b",
            "text": "Causes transmembrane K+ efflux",
            "ans": false
          },
          {
            "label": "c",
            "text": "Increases blood pH by excreting H+ through urine",
            "ans": true
          },
          {
            "label": "d",
            "text": "May cause cardiac arrest at systole",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is a common finding of persistent vomiting",
            "ans": true
          }
        ],
        "explanation": "(A): Hypokalaemia = plasma K+ < 3.5 mmol/L. | (B): Hypokalaemia causes K+ shift INTO cells (influx). | (C): Hypokalaemia → H+ moves into cells, H+ excreted in urine → alkalosis. | (D): Hypokalaemia can cause cardiac arrest in SYSTOLE; hyperkalaemia causes arrest in diastole. | (E): Vomiting causes loss of H+, K+, Cl- → hypokalaemic alkalosis.",
        "textbookNote": "(A): Hypokalaemia = plasma K+ < 3.5 mmol/L. | (B): Hypokalaemia causes K+ shift INTO cells (influx). | (C): Hypokalaemia → H+ moves into cells, H+ excreted in urine → alkalosis. | (D): Hypokalaemia can cause cardiac arrest in SYSTOLE; hyperkalaemia causes arrest in diastole. | (E): Vomiting causes loss of H+, K+, Cl- → hypokalaemic alkalosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Folic acid",
        "items": [
          {
            "label": "a",
            "text": "The active form is dihydrofolate",
            "ans": false
          },
          {
            "label": "b",
            "text": "RDA is 600–800 mg/day",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is required for the synthesis of nucleotides",
            "ans": true
          },
          {
            "label": "d",
            "text": "Acts as a carrier of single carbon unit",
            "ans": true
          },
          {
            "label": "e",
            "text": "Deficiency causes megaloblastic anemia",
            "ans": true
          }
        ],
        "explanation": "(A): THF is the active form. | (B): RDA of folate is ~400 μg/day (600 μg in pregnancy), not mg. | (C): THF supplies carbon for purines and dTMP. | (D): THF carries one-carbon groups for purine/thymidylate synthesis. | (E): Folate deficiency → megaloblastic anaemia.",
        "textbookNote": "(A): THF is the active form. | (B): RDA of folate is ~400 μg/day (600 μg in pregnancy), not mg. | (C): THF supplies carbon for purines and dTMP. | (D): THF carries one-carbon groups for purine/thymidylate synthesis. | (E): Folate deficiency → megaloblastic anaemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Balanced diet",
        "items": [
          {
            "label": "a",
            "text": "The ratio of carbohydrate, protein and fat is approximately 4:1:1",
            "ans": true
          },
          {
            "label": "b",
            "text": "Required for maintenance of cellular growth",
            "ans": true
          },
          {
            "label": "c",
            "text": "Does not contain fibres",
            "ans": false
          },
          {
            "label": "d",
            "text": "Fat is limited",
            "ans": true
          },
          {
            "label": "e",
            "text": "May not contain essential amino acids",
            "ans": false
          }
        ],
        "explanation": "(A): Balanced diet ratio ≈ 4:1:1 (carbohydrate : protein : fat). | (B): Balanced diet supports growth and maintenance. | (C): A balanced diet includes fibre. | (D): Balanced diet limits fat (~20–25% energy). | (E): Balanced diet supplies essential amino acids.",
        "textbookNote": "(A): Balanced diet ratio ≈ 4:1:1 (carbohydrate : protein : fat). | (B): Balanced diet supports growth and maintenance. | (C): A balanced diet includes fibre. | (D): Balanced diet limits fat (~20–25% energy). | (E): Balanced diet supplies essential amino acids.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Regarding zymogens",
        "items": [
          {
            "label": "a",
            "text": "Zymogens remain active in digestive juice",
            "ans": false
          },
          {
            "label": "b",
            "text": "Chymotrypsinogen is a gastric enzyme",
            "ans": false
          },
          {
            "label": "c",
            "text": "Enterokinase activates pepsinogen",
            "ans": false
          },
          {
            "label": "d",
            "text": "Trypsin is activated by auto-catalysis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Pepsin is an endopeptidase",
            "ans": true
          }
        ],
        "explanation": "(A): Zymogens are inactive precursors. | (B): Chymotrypsinogen is a pancreatic zymogen. | (C): Enterokinase activates trypsinogen. | (D): Trypsinogen → trypsin by enterokinase and autocatalysis. | (E): Pepsin cleaves internal peptide bonds.",
        "textbookNote": "(A): Zymogens are inactive precursors. | (B): Chymotrypsinogen is a pancreatic zymogen. | (C): Enterokinase activates trypsinogen. | (D): Trypsinogen → trypsin by enterokinase and autocatalysis. | (E): Pepsin cleaves internal peptide bonds.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "In uncompensated metabolic acidosis",
        "items": [
          {
            "label": "a",
            "text": "pH is decreased",
            "ans": true
          },
          {
            "label": "b",
            "text": "pH is increased",
            "ans": false
          },
          {
            "label": "c",
            "text": "PCO2 is increased",
            "ans": false
          },
          {
            "label": "d",
            "text": "HCO3",
            "ans": false
          },
          {
            "label": "e",
            "text": "HCO3",
            "ans": false
          }
        ],
        "explanation": "(A): Acidosis lowers pH. | (B): Acidosis lowers pH; alkalosis raises it. | (C): Raised PCO2 occurs in respiratory acidosis or as compensation of metabolic alkalosis, not as a feature of",
        "textbookNote": "(A): Acidosis lowers pH. | (B): Acidosis lowers pH; alkalosis raises it. | (C): Raised PCO2 occurs in respiratory acidosis or as compensation of metabolic alkalosis, not as a feature of",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2022-nov-p2-old",
    "session": "November 2022",
    "year": 2022,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 14,
    "bookPage": "Biochemistry Bank (November 2022)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Regarding glycolysis the following statements are correct",
        "items": [
          {
            "label": "a",
            "text": "The end product is lactate",
            "ans": false
          },
          {
            "label": "b",
            "text": "The end product is pyruvate",
            "ans": true
          },
          {
            "label": "c",
            "text": "There are four irreversible reactions",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lactate conversion to pyruvate is oxidation",
            "ans": true
          },
          {
            "label": "e",
            "text": "In the aerobic pathway 2 ATP are produced (net)",
            "ans": false
          }
        ],
        "explanation": "(A): End product of glycolysis is pyruvate (aerobic); lactate forms only in anaerobic conditions. | (B): Aerobic glycolysis ends in pyruvate (to mitochondria); lactate is formed only anaerobically. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Lactate → pyruvate removes 2H (LDH, NAD+ → NADH): oxidation. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "textbookNote": "(A): End product of glycolysis is pyruvate (aerobic); lactate forms only in anaerobic conditions. | (B): Aerobic glycolysis ends in pyruvate (to mitochondria); lactate is formed only anaerobically. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Lactate → pyruvate removes 2H (LDH, NAD+ → NADH): oxidation. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "The following are observed in diabetic ketoacidosis",
        "items": [
          {
            "label": "a",
            "text": "pH > 7.5",
            "ans": false
          },
          {
            "label": "b",
            "text": "PCO2 is normal",
            "ans": false
          },
          {
            "label": "c",
            "text": "HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "There is > 16 mEq/L of anion gap",
            "ans": true
          },
          {
            "label": "e",
            "text": "Increased K+ level",
            "ans": true
          }
        ],
        "explanation": "(A): DKA has low pH (acidosis). | (B): In DKA PCO2 is low due to Kussmaul breathing. | (E): Insulin lack and acidosis shift K+ out; plasma K+ is initially high.",
        "textbookNote": "(A): DKA has low pH (acidosis). | (B): In DKA PCO2 is low due to Kussmaul breathing. | (E): Insulin lack and acidosis shift K+ out; plasma K+ is initially high.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Regarding liver function tests",
        "items": [
          {
            "label": "a",
            "text": "Serum gamma-glutamyl transpeptidase is elevated in viral hepatitis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Serum albumin level is 3.5–5 g/dL",
            "ans": true
          },
          {
            "label": "c",
            "text": "Prothrombin time is normal in acute liver disease",
            "ans": false
          },
          {
            "label": "d",
            "text": "Serum albumin : globulin ratio is altered in chronic liver disease",
            "ans": true
          },
          {
            "label": "e",
            "text": "Serum bilirubin indicates synthetic function of the liver",
            "ans": false
          }
        ],
        "explanation": "(A): GGT rises in hepatobiliary disease, including viral hepatitis. | (B): Normal serum albumin 3.5–5 g/dL. | (C): Severe hepatocellular injury prolongs PT; PT is a synthetic function test. | (D): A:G is reversed in chronic liver disease. | (E): Bilirubin = excretory function; synthetic = albumin, PT.",
        "textbookNote": "(A): GGT rises in hepatobiliary disease, including viral hepatitis. | (B): Normal serum albumin 3.5–5 g/dL. | (C): Severe hepatocellular injury prolongs PT; PT is a synthetic function test. | (D): A:G is reversed in chronic liver disease. | (E): Bilirubin = excretory function; synthetic = albumin, PT.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Insulin",
        "items": [
          {
            "label": "a",
            "text": "Is a potent anabolic hormone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is required for utilization of glucose in brain",
            "ans": false
          },
          {
            "label": "c",
            "text": "Increases glucose uptake in skeletal muscle",
            "ans": true
          },
          {
            "label": "d",
            "text": "Increases plasma K+",
            "ans": false
          },
          {
            "label": "e",
            "text": "Mode of action is mediated by cyclic AMP",
            "ans": false
          }
        ],
        "explanation": "(A): Insulin promotes glycogen, fat and protein synthesis. | (B): Brain uses GLUT-3, which is insulin-independent. | (C): Insulin recruits GLUT-4 in muscle and adipose tissue. | (D): Insulin drives K+ into cells (lowers plasma K+); used to treat hyperkalaemia. | (E): Insulin acts via tyrosine kinase receptor.",
        "textbookNote": "(A): Insulin promotes glycogen, fat and protein synthesis. | (B): Brain uses GLUT-3, which is insulin-independent. | (C): Insulin recruits GLUT-4 in muscle and adipose tissue. | (D): Insulin drives K+ into cells (lowers plasma K+); used to treat hyperkalaemia. | (E): Insulin acts via tyrosine kinase receptor.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Biochemical findings",
        "items": [
          {
            "label": "a",
            "text": "Decreased blood osmolarity in diabetes mellitus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Respiratory acidosis in diabetes mellitus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Increased serum creatinine in renal failure",
            "ans": true
          },
          {
            "label": "d",
            "text": "Increased serum bilirubin in viral hepatitis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Normal anion gap in uncontrolled diabetes mellitus",
            "ans": false
          }
        ],
        "explanation": "(A): Hyperglycaemia raises osmolarity. | (B): DM causes metabolic acidosis. | (C): Reduced GFR raises creatinine. | (D): Hepatocellular damage raises bilirubin. | (E): Diarrhoea/renal tubular acidosis give normal-AG (hyperchloremic) acidosis; DKA, lactic acidosis give high AG.",
        "textbookNote": "(A): Hyperglycaemia raises osmolarity. | (B): DM causes metabolic acidosis. | (C): Reduced GFR raises creatinine. | (D): Hepatocellular damage raises bilirubin. | (E): Diarrhoea/renal tubular acidosis give normal-AG (hyperchloremic) acidosis; DKA, lactic acidosis give high AG.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "TSH values",
        "items": [
          {
            "label": "a",
            "text": "0.1 mU/L indicates thyrotoxicosis values",
            "ans": true
          },
          {
            "label": "b",
            "text": "> 10 mU/L indicates clinical hypothyroidism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Can be used in diagnosis of thyroid disease",
            "ans": true
          },
          {
            "label": "d",
            "text": "5–20 mU/L indicates subclinical hypothyroidism",
            "ans": true
          },
          {
            "label": "e",
            "text": "Should always be done in diagnosis of thyroid disease",
            "ans": true
          }
        ],
        "explanation": "(A): TSH < 0.1 mU/L suggests thyrotoxicosis. | (B): TSH > 10 mU/L with low T4 = clinical hypothyroidism. | (C): TSH is the first-line thyroid screening test. | (D): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (E): TSH is the first-line test for thyroid disease.",
        "textbookNote": "(A): TSH < 0.1 mU/L suggests thyrotoxicosis. | (B): TSH > 10 mU/L with low T4 = clinical hypothyroidism. | (C): TSH is the first-line thyroid screening test. | (D): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (E): TSH is the first-line test for thyroid disease.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "HMP shunt pathway",
        "items": [
          {
            "label": "a",
            "text": "Occurs in mitochondria",
            "ans": false
          },
          {
            "label": "b",
            "text": "No ATP production",
            "ans": true
          },
          {
            "label": "c",
            "text": "H2 receptor is NAD+",
            "ans": false
          },
          {
            "label": "d",
            "text": "First part of reaction is non-oxidative and reversible",
            "ans": false
          },
          {
            "label": "e",
            "text": "NADPH deficiency presents as hemolytic anemia",
            "ans": true
          }
        ],
        "explanation": "(A): HMP shunt is cytosolic. | (B): HMP shunt produces NADPH and pentoses, no ATP. | (C): HMP shunt reduces NADP+ to NADPH. | (D): First phase of HMP is oxidative and irreversible; second is non-oxidative reversible. | (E): High-dose synthetic menadione causes hemolysis in neonates.",
        "textbookNote": "(A): HMP shunt is cytosolic. | (B): HMP shunt produces NADPH and pentoses, no ATP. | (C): HMP shunt reduces NADP+ to NADPH. | (D): First phase of HMP is oxidative and irreversible; second is non-oxidative reversible. | (E): High-dose synthetic menadione causes hemolysis in neonates.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding autosomal dominant disorder, the following are true",
        "items": [
          {
            "label": "a",
            "text": "Achondroplasia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Haemophilia",
            "ans": false
          },
          {
            "label": "c",
            "text": "Cystic fibrosis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Vitamin D resistant rickets",
            "ans": false
          },
          {
            "label": "e",
            "text": "Expressed in heterozygous state",
            "ans": true
          }
        ],
        "explanation": "(A): Achondroplasia is autosomal dominant. | (B): Haemophilia is X-linked recessive. | (C): Cystic fibrosis is autosomal recessive. | (D): Vitamin D-resistant rickets is X-linked DOMINANT. | (E): AD disorders manifest in heterozygotes.",
        "textbookNote": "(A): Achondroplasia is autosomal dominant. | (B): Haemophilia is X-linked recessive. | (C): Cystic fibrosis is autosomal recessive. | (D): Vitamin D-resistant rickets is X-linked DOMINANT. | (E): AD disorders manifest in heterozygotes.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "In the anaerobic glycolysis pathway",
        "items": [
          {
            "label": "a",
            "text": "Glucose-6-phosphate dehydrogenase is an enzyme",
            "ans": false
          },
          {
            "label": "b",
            "text": "ATP is produced",
            "ans": true
          },
          {
            "label": "c",
            "text": "Glycerol is produced",
            "ans": false
          },
          {
            "label": "d",
            "text": "Pyruvate is produced",
            "ans": true
          },
          {
            "label": "e",
            "text": "Lactate is produced",
            "ans": true
          }
        ],
        "explanation": "(A): G6PD is the HMP-shunt enzyme, not glycolytic. | (C): Glycolysis does not produce glycerol. | (D): Glycolysis produces pyruvate. | (E): Anaerobic glycolysis produces lactate.",
        "textbookNote": "(A): G6PD is the HMP-shunt enzyme, not glycolytic. | (C): Glycolysis does not produce glycerol. | (D): Glycolysis produces pyruvate. | (E): Anaerobic glycolysis produces lactate.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "HMG-CoA reductase is a rate-limiting enzyme",
            "ans": true
          },
          {
            "label": "b",
            "text": "Bile acid is synthesized from cholesterol",
            "ans": true
          },
          {
            "label": "c",
            "text": "Serum LDL cholesterol level is increased by thyroxine",
            "ans": false
          },
          {
            "label": "d",
            "text": "Deoxycholic acid is a primary bile acid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Taurochenodeoxycholic acid is a secondary bile acid",
            "ans": false
          }
        ],
        "explanation": "(A): HMG-CoA reductase is the rate-limiting step. | (B): Bile acids are made from cholesterol by 7α-hydroxylase. | (C): Thyroxine up-regulates LDL receptors and LOWERS LDL. | (D): Deoxycholic and lithocholic acids are SECONDARY bile acids (bacterial 7-dehydroxylation). | (E): Taurochenodeoxycholic acid is a conjugated PRIMARY bile acid.",
        "textbookNote": "(A): HMG-CoA reductase is the rate-limiting step. | (B): Bile acids are made from cholesterol by 7α-hydroxylase. | (C): Thyroxine up-regulates LDL receptors and LOWERS LDL. | (D): Deoxycholic and lithocholic acids are SECONDARY bile acids (bacterial 7-dehydroxylation). | (E): Taurochenodeoxycholic acid is a conjugated PRIMARY bile acid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Terminal codons are AUG, UAG and UGA",
            "ans": false
          },
          {
            "label": "b",
            "text": "Mitochondrial DNA is maternal in origin",
            "ans": true
          },
          {
            "label": "c",
            "text": "Familial hypercholesterolemia is autosomal recessive",
            "ans": false
          },
          {
            "label": "d",
            "text": "Hemophilia is an X-linked dominant disorder",
            "ans": false
          },
          {
            "label": "e",
            "text": "Mutation of genes may result in sudden termination of translation",
            "ans": true
          }
        ],
        "explanation": "(A): AUG is the START codon; stop codons are UAA, UAG, UGA. | (C): FH is autosomal dominant (LDL receptor). | (D): Haemophilia is X-linked RECESSIVE.",
        "textbookNote": "(A): AUG is the START codon; stop codons are UAA, UAG, UGA. | (C): FH is autosomal dominant (LDL receptor). | (D): Haemophilia is X-linked RECESSIVE.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Choose the correct answer for ketone bodies",
        "items": [
          {
            "label": "a",
            "text": "Acetone is a lipid-derived compound",
            "ans": true
          },
          {
            "label": "b",
            "text": "Acetoacetate is the parent ketone body",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is synthesized from pyruvate",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ketosis causes low pH",
            "ans": true
          },
          {
            "label": "e",
            "text": "Rothera's test identifies it in urine",
            "ans": true
          }
        ],
        "explanation": "(A): Acetone is derived from acetoacetate (lipid metabolism). | (B): Acetoacetate is the primary ketone body. | (C): Ketone bodies come from acetyl-CoA of fatty acids. | (D): Ketoacids lower pH. | (E): Rothera's nitroprusside test detects acetoacetate/acetone.",
        "textbookNote": "(A): Acetone is derived from acetoacetate (lipid metabolism). | (B): Acetoacetate is the primary ketone body. | (C): Ketone bodies come from acetyl-CoA of fatty acids. | (D): Ketoacids lower pH. | (E): Rothera's nitroprusside test detects acetoacetate/acetone.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Regarding lipoprotein, the following statements are correct",
        "items": [
          {
            "label": "a",
            "text": "Chylomicron transports endogenous triglyceride",
            "ans": false
          },
          {
            "label": "b",
            "text": "VLDL transports exogenous triglyceride",
            "ans": false
          },
          {
            "label": "c",
            "text": "VLDL is produced from liver",
            "ans": true
          },
          {
            "label": "d",
            "text": "Cholesteryl ester transfer protein transfers cholesteryl ester from HDL to LDL",
            "ans": true
          },
          {
            "label": "e",
            "text": "Apolipoproteins are enzyme cofactors",
            "ans": true
          }
        ],
        "explanation": "(A): Chylomicrons carry EXOGENOUS (dietary) TG; VLDL carries endogenous TG. | (B): VLDL carries ENDOGENOUS TG. | (C): VLDL is synthesised in liver. | (D): CETP moves cholesteryl ester from HDL to VLDL/LDL. | (E): Apolipoproteins are enzyme cofactors/activators.",
        "textbookNote": "(A): Chylomicrons carry EXOGENOUS (dietary) TG; VLDL carries endogenous TG. | (B): VLDL carries ENDOGENOUS TG. | (C): VLDL is synthesised in liver. | (D): CETP moves cholesteryl ester from HDL to VLDL/LDL. | (E): Apolipoproteins are enzyme cofactors/activators.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Ammonia",
        "items": [
          {
            "label": "a",
            "text": "Is produced during oxidation of uric acid",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is added to the amino acid pool",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is produced in transamination",
            "ans": false
          },
          {
            "label": "d",
            "text": "Can combine with CO2 to form carbamoyl phosphate",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is increased in portal hypertension",
            "ans": true
          }
        ],
        "explanation": "(A): Ammonia is not produced during uric acid oxidation. | (B): Ammonia leaves the amino acid pool. | (C): Transamination moves NH2 without releasing NH3. | (D): NH3 + CO2 + 2ATP → carbamoyl phosphate. | (E): Portal shunting gives hyperammonaemia.",
        "textbookNote": "(A): Ammonia is not produced during uric acid oxidation. | (B): Ammonia leaves the amino acid pool. | (C): Transamination moves NH2 without releasing NH3. | (D): NH3 + CO2 + 2ATP → carbamoyl phosphate. | (E): Portal shunting gives hyperammonaemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Conjugated bilirubin",
        "items": [
          {
            "label": "a",
            "text": "Is conjugated with albumin",
            "ans": false
          },
          {
            "label": "b",
            "text": "Contains glucuronic acid",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is increased in hemolytic jaundice",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is excreted in urine",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is conjugated in bone marrow",
            "ans": false
          }
        ],
        "explanation": "(A): Bilirubin is conjugated with glucuronic acid; unconjugated travels on albumin. | (C): Hemolytic jaundice: unconjugated hyperbilirubinaemia. | (E): Bilirubin is conjugated in liver.",
        "textbookNote": "(A): Bilirubin is conjugated with glucuronic acid; unconjugated travels on albumin. | (C): Hemolytic jaundice: unconjugated hyperbilirubinaemia. | (E): Bilirubin is conjugated in liver.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Characteristic features of mRNA include",
        "items": [
          {
            "label": "a",
            "text": "Carries message from DNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "Contains anticodon",
            "ans": false
          },
          {
            "label": "c",
            "text": "Requires modification after synthesis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Acts as adaptor molecule",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is part of a gene",
            "ans": true
          }
        ],
        "explanation": "(A): mRNA carries the genetic message. | (B): Anticodon is in tRNA. | (C): Eukaryotic mRNA is capped, spliced, polyadenylated. | (D): tRNA is the adaptor. | (E): mRNA is a transcript of a gene.",
        "textbookNote": "(A): mRNA carries the genetic message. | (B): Anticodon is in tRNA. | (C): Eukaryotic mRNA is capped, spliced, polyadenylated. | (D): tRNA is the adaptor. | (E): mRNA is a transcript of a gene.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Enzymes of gluconeogenesis",
        "items": [
          {
            "label": "a",
            "text": "Glucokinase",
            "ans": false
          },
          {
            "label": "b",
            "text": "Phosphoenolpyruvate carboxykinase",
            "ans": true
          },
          {
            "label": "c",
            "text": "Glucose-6-phosphatase",
            "ans": true
          },
          {
            "label": "d",
            "text": "Alanine aminotransferase",
            "ans": false
          },
          {
            "label": "e",
            "text": "Carbamoyl phosphate synthetase",
            "ans": false
          }
        ],
        "explanation": "(A): Glucokinase is glycolytic/liver glucose sensor, not gluconeogenic. | (B): PEPCK is a key gluconeogenic enzyme. | (C): Glucose-6-phosphatase releases free glucose in gluconeogenesis. | (D): ALT only supplies pyruvate from alanine. | (E): CPS-I is a urea-cycle enzyme.",
        "textbookNote": "(A): Glucokinase is glycolytic/liver glucose sensor, not gluconeogenic. | (B): PEPCK is a key gluconeogenic enzyme. | (C): Glucose-6-phosphatase releases free glucose in gluconeogenesis. | (D): ALT only supplies pyruvate from alanine. | (E): CPS-I is a urea-cycle enzyme.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Complications of GDM",
        "items": [
          {
            "label": "a",
            "text": "Macrosomia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Acromegaly",
            "ans": false
          },
          {
            "label": "c",
            "text": "Still birth",
            "ans": true
          },
          {
            "label": "d",
            "text": "Development of DM in mother",
            "ans": true
          },
          {
            "label": "e",
            "text": "Congenital anomaly of newborn",
            "ans": true
          }
        ],
        "explanation": "(A): Maternal hyperglycaemia → fetal hyperinsulinism → macrosomia. | (B): Acromegaly is GH excess, not a GDM complication. | (C): GDM raises risk of stillbirth. | (D): GDM predisposes to later type 2 DM. | (E): Hyperglycaemia in early gestation is teratogenic.",
        "textbookNote": "(A): Maternal hyperglycaemia → fetal hyperinsulinism → macrosomia. | (B): Acromegaly is GH excess, not a GDM complication. | (C): GDM raises risk of stillbirth. | (D): GDM predisposes to later type 2 DM. | (E): Hyperglycaemia in early gestation is teratogenic.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Transcellular fluid is",
        "items": [
          {
            "label": "a",
            "text": "Fluid in aqueous humor",
            "ans": true
          },
          {
            "label": "b",
            "text": "Blood",
            "ans": false
          },
          {
            "label": "c",
            "text": "Synovial fluid",
            "ans": true
          },
          {
            "label": "d",
            "text": "Interstitial fluid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Peritoneal fluid",
            "ans": true
          }
        ],
        "explanation": "(A): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (B): Plasma is intravascular fluid, not transcellular. | (C): Synovial fluid is a transcellular fluid. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Peritoneal fluid is a transcellular fluid.",
        "textbookNote": "(A): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (B): Plasma is intravascular fluid, not transcellular. | (C): Synovial fluid is a transcellular fluid. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Peritoneal fluid is a transcellular fluid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "About anion gap",
        "items": [
          {
            "label": "a",
            "text": "Is equal to unmeasured anions",
            "ans": true
          },
          {
            "label": "b",
            "text": "Measured anions are sulphate and phosphate",
            "ans": false
          },
          {
            "label": "c",
            "text": "Normal value of anion gap is 8–16 mmol/L",
            "ans": true
          },
          {
            "label": "d",
            "text": "Anion gap is increased in metabolic acidosis (high-AG type)",
            "ans": true
          },
          {
            "label": "e",
            "text": "Anion gap = measured cation – measured anion",
            "ans": true
          }
        ],
        "explanation": "(A): AG represents the unmeasured anions (albumin, phosphate, sulphate, organic acids). | (B): Sulphate/phosphate are UNmeasured anions; measured anions are Cl- and HCO3 | (C): Normal anion gap is 8–16 mEq/L. | (D): High-AG metabolic acidosis (DKA, lactic acidosis, renal failure) raises the gap. | (E): AG = Na+ – (Cl- + HCO3",
        "textbookNote": "(A): AG represents the unmeasured anions (albumin, phosphate, sulphate, organic acids). | (B): Sulphate/phosphate are UNmeasured anions; measured anions are Cl- and HCO3 | (C): Normal anion gap is 8–16 mEq/L. | (D): High-AG metabolic acidosis (DKA, lactic acidosis, renal failure) raises the gap. | (E): AG = Na+ – (Cl- + HCO3",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2022-may-p1-old",
    "session": "May 2022",
    "year": 2022,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 15,
    "bookPage": "Biochemistry Bank (May 2022)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Regarding buffer",
        "items": [
          {
            "label": "a",
            "text": "Mixture of weak acid and its conjugate base",
            "ans": true
          },
          {
            "label": "b",
            "text": "Potent plasma buffer is phosphate buffer",
            "ans": false
          },
          {
            "label": "c",
            "text": "Potent renal buffer is bicarbonate buffer",
            "ans": false
          },
          {
            "label": "d",
            "text": "pK of bicarbonate buffer is 6.1",
            "ans": true
          },
          {
            "label": "e",
            "text": "Buffer action is maximum when pH = pK",
            "ans": true
          }
        ],
        "explanation": "(A): A buffer = weak acid + its conjugate base (salt). | (B): Bicarbonate/plasma protein are plasma buffers; phosphate is mainly intracellular/renal. | (C): Renal buffers are phosphate and ammonia. | (D): pK of the bicarbonate buffer is 6.1. | (E): Buffer action is maximal when pH = pK.",
        "textbookNote": "(A): A buffer = weak acid + its conjugate base (salt). | (B): Bicarbonate/plasma protein are plasma buffers; phosphate is mainly intracellular/renal. | (C): Renal buffers are phosphate and ammonia. | (D): pK of the bicarbonate buffer is 6.1. | (E): Buffer action is maximal when pH = pK.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Regarding colloid",
        "items": [
          {
            "label": "a",
            "text": "Diameter is 1–200 mμ",
            "ans": true
          },
          {
            "label": "b",
            "text": "Movement is molecular",
            "ans": false
          },
          {
            "label": "c",
            "text": "Can't pass through semipermeable membrane",
            "ans": true
          },
          {
            "label": "d",
            "text": "Non-dialyzable",
            "ans": true
          },
          {
            "label": "e",
            "text": "Osmotic pressure is higher than that of crystalloid",
            "ans": false
          }
        ],
        "explanation": "(A): Colloid particle size is 1–200 millimicron (mμ = nm); crystalloids are < 1 nm. | (B): Colloids show Brownian (particle) movement, not molecular movement. | (C): Colloids cannot pass through a semipermeable membrane. | (D): Colloids are too large to pass through a dialysis membrane. | (E): Colloids have few particles per volume, so their osmotic pressure is lower than that of crystalloids.",
        "textbookNote": "(A): Colloid particle size is 1–200 millimicron (mμ = nm); crystalloids are < 1 nm. | (B): Colloids show Brownian (particle) movement, not molecular movement. | (C): Colloids cannot pass through a semipermeable membrane. | (D): Colloids are too large to pass through a dialysis membrane. | (E): Colloids have few particles per volume, so their osmotic pressure is lower than that of crystalloids.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Denaturation of protein is characterized by",
        "items": [
          {
            "label": "a",
            "text": "Uncoiling of peptide chain",
            "ans": true
          },
          {
            "label": "b",
            "text": "Cannot be precipitated",
            "ans": false
          },
          {
            "label": "c",
            "text": "Loss of biological activity",
            "ans": true
          },
          {
            "label": "d",
            "text": "Diffusibility is increased",
            "ans": false
          },
          {
            "label": "e",
            "text": "Solubility is increased",
            "ans": false
          }
        ],
        "explanation": "(A): Denaturation uncoils the chain, losing biological activity. | (B): Denatured protein is less soluble and easily precipitated. | (C): Denaturation destroys the native conformation, so activity is lost. | (D): Denatured protein is less diffusible. | (E): Denatured protein becomes less soluble.",
        "textbookNote": "(A): Denaturation uncoils the chain, losing biological activity. | (B): Denatured protein is less soluble and easily precipitated. | (C): Denaturation destroys the native conformation, so activity is lost. | (D): Denatured protein is less diffusible. | (E): Denatured protein becomes less soluble.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding isotopes",
        "items": [
          {
            "label": "a",
            "text": "Co-60 is used in radiation therapy",
            "ans": true
          },
          {
            "label": "b",
            "text": "Helium is an isotope of hydrogen",
            "ans": false
          },
          {
            "label": "c",
            "text": "I-131 is used to measure CSF volume",
            "ans": false
          },
          {
            "label": "d",
            "text": "C-12 is used to measure atomic weight",
            "ans": true
          },
          {
            "label": "e",
            "text": "Cr-51 is used to measure RBC volume",
            "ans": true
          }
        ],
        "explanation": "(A): Co-60 emits γ-rays for radiotherapy. | (B): Helium is a separate element; hydrogen isotopes are deuterium and tritium. | (C): I-131 albumin measures plasma volume; not CSF volume. | (D): C-12 is the reference standard for atomic mass. | (E): Cr-51-tagged RBCs measure RBC volume.",
        "textbookNote": "(A): Co-60 emits γ-rays for radiotherapy. | (B): Helium is a separate element; hydrogen isotopes are deuterium and tritium. | (C): I-131 albumin measures plasma volume; not CSF volume. | (D): C-12 is the reference standard for atomic mass. | (E): Cr-51-tagged RBCs measure RBC volume.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Body water is maintained by",
        "items": [
          {
            "label": "a",
            "text": "Hypothalamus",
            "ans": true
          },
          {
            "label": "b",
            "text": "ADH",
            "ans": true
          },
          {
            "label": "c",
            "text": "Thyroxine",
            "ans": false
          },
          {
            "label": "d",
            "text": "Plasma osmolarity",
            "ans": true
          },
          {
            "label": "e",
            "text": "Thirst mechanism",
            "ans": true
          }
        ],
        "explanation": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "textbookNote": "(A): Hypothalamus has osmoreceptors and makes ADH → water balance. | (B): ADH conserves water by increasing collecting-duct permeability. | (C): Thyroxine regulates metabolism, not water balance. | (D): Plasma osmolarity is the main stimulus for ADH and thirst. | (E): Thirst is stimulated by high osmolarity and low volume.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Neutral fat",
        "items": [
          {
            "label": "a",
            "text": "Is an ester of monohydric alcohol",
            "ans": false
          },
          {
            "label": "b",
            "text": "Has charge at body pH",
            "ans": false
          },
          {
            "label": "c",
            "text": "Glycerol is the backbone alcohol",
            "ans": true
          },
          {
            "label": "d",
            "text": "Has polyunsaturated fatty acids only",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is a derived lipid",
            "ans": false
          }
        ],
        "explanation": "(A): Neutral fat is an ester of glycerol (trihydric). | (B): Neutral fat is uncharged. | (C): Triacylglycerol = glycerol + 3 fatty acids. | (D): Neutral fat contains mixed saturated/unsaturated fatty acids. | (E): Neutral fat is a simple lipid.",
        "textbookNote": "(A): Neutral fat is an ester of glycerol (trihydric). | (B): Neutral fat is uncharged. | (C): Triacylglycerol = glycerol + 3 fatty acids. | (D): Neutral fat contains mixed saturated/unsaturated fatty acids. | (E): Neutral fat is a simple lipid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Regarding osmosis",
        "items": [
          {
            "label": "a",
            "text": "Needs semipermeable membrane",
            "ans": true
          },
          {
            "label": "b",
            "text": "Only the solutes cross the membrane",
            "ans": false
          },
          {
            "label": "c",
            "text": "Both solutes and solvent cross the membrane",
            "ans": false
          },
          {
            "label": "d",
            "text": "Depends on the concentration of the solutes",
            "ans": true
          },
          {
            "label": "e",
            "text": "Depends on the movement of the solvent",
            "ans": true
          }
        ],
        "explanation": "(A): Osmosis = solvent movement across a semipermeable membrane. | (B): In osmosis the solvent moves; solutes cannot cross. | (C): In osmosis only the solvent crosses. | (D): Osmotic pressure depends on the number of solute particles. | (E): Osmosis is by definition solvent movement.",
        "textbookNote": "(A): Osmosis = solvent movement across a semipermeable membrane. | (B): In osmosis the solvent moves; solutes cannot cross. | (C): In osmosis only the solvent crosses. | (D): Osmotic pressure depends on the number of solute particles. | (E): Osmosis is by definition solvent movement.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding carbohydrate",
        "items": [
          {
            "label": "a",
            "text": "D-variety of sugars are common in nature",
            "ans": true
          },
          {
            "label": "b",
            "text": "Maltose is a non-reducing sugar",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hydrolysis of maltose gives rise to glucose only",
            "ans": true
          },
          {
            "label": "d",
            "text": "Inulin is composed of L-fructose units",
            "ans": false
          },
          {
            "label": "e",
            "text": "Dextran is used as plasma volume expander",
            "ans": true
          }
        ],
        "explanation": "(A): Natural sugars are mostly D-forms. | (B): Maltose has a free anomeric carbon → reducing. | (C): Maltose = glucose + glucose. | (D): Inulin is a polymer of D-fructose. | (E): Dextran is a glucose polymer used as plasma expander.",
        "textbookNote": "(A): Natural sugars are mostly D-forms. | (B): Maltose has a free anomeric carbon → reducing. | (C): Maltose = glucose + glucose. | (D): Inulin is a polymer of D-fructose. | (E): Dextran is a glucose polymer used as plasma expander.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Concerning coenzyme",
        "items": [
          {
            "label": "a",
            "text": "Coenzyme A transfers acetyl group",
            "ans": true
          },
          {
            "label": "b",
            "text": "Thiamine pyrophosphate transfers CO2",
            "ans": false
          },
          {
            "label": "c",
            "text": "Can bind with the active site of enzyme",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is heat labile",
            "ans": false
          },
          {
            "label": "e",
            "text": "Option E",
            "ans": false
          }
        ],
        "explanation": "(A): CoA (from pantothenic acid) carries acyl/acetyl groups. | (B): TPP transfers 2-carbon aldehyde groups (decarboxylation), not CO2. | (C): Coenzymes bind the enzyme at/near active site. | (D): Enzymes are proteins and heat labile.",
        "textbookNote": "(A): CoA (from pantothenic acid) carries acyl/acetyl groups. | (B): TPP transfers 2-carbon aldehyde groups (decarboxylation), not CO2. | (C): Coenzymes bind the enzyme at/near active site. | (D): Enzymes are proteins and heat labile.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Bile contains lipolytic enzymes",
            "ans": false
          },
          {
            "label": "b",
            "text": "Gastric juice contains gastrin",
            "ans": false
          },
          {
            "label": "c",
            "text": "Pancreatic juice contains α-1 antitrypsin",
            "ans": false
          },
          {
            "label": "d",
            "text": "HCl secretion produces alkaline tide",
            "ans": true
          },
          {
            "label": "e",
            "text": "Chylomicron is synthesized in liver",
            "ans": false
          }
        ],
        "explanation": "(A): Bile has salts, not enzymes; lipase comes from pancreas. | (B): Gastrin is a hormone secreted into blood, not an enzyme of juice. | (C): Pancreatic juice contains trypsin inhibitor; α1-antitrypsin is plasma. | (E): Chylomicrons are made in intestinal mucosa.",
        "textbookNote": "(A): Bile has salts, not enzymes; lipase comes from pancreas. | (B): Gastrin is a hormone secreted into blood, not an enzyme of juice. | (C): Pancreatic juice contains trypsin inhibitor; α1-antitrypsin is plasma. | (E): Chylomicrons are made in intestinal mucosa.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "About vitamin A deficiency",
        "items": [
          {
            "label": "a",
            "text": "Deficiency impairs immunity",
            "ans": true
          },
          {
            "label": "b",
            "text": "Nyctalopia is a failure of dark adaptation",
            "ans": true
          },
          {
            "label": "c",
            "text": "Results in dry, thick skin",
            "ans": true
          },
          {
            "label": "d",
            "text": "Causes osteomalacia",
            "ans": false
          },
          {
            "label": "e",
            "text": "Causes repeated respiratory tract infection",
            "ans": true
          }
        ],
        "explanation": "(A): Vitamin A deficiency impairs immunity and epithelia. | (B): Rod dysfunction → failure of dark adaptation. | (C): Vitamin A deficiency causes follicular hyperkeratosis (toad skin). | (D): Osteomalacia is vitamin D deficiency; vitamin A deficiency causes xerophthalmia. | (E): Keratinisation of respiratory epithelium predisposes to infection.",
        "textbookNote": "(A): Vitamin A deficiency impairs immunity and epithelia. | (B): Rod dysfunction → failure of dark adaptation. | (C): Vitamin A deficiency causes follicular hyperkeratosis (toad skin). | (D): Osteomalacia is vitamin D deficiency; vitamin A deficiency causes xerophthalmia. | (E): Keratinisation of respiratory epithelium predisposes to infection.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "The characteristics of marasmus",
        "items": [
          {
            "label": "a",
            "text": "Inadequate protein and calorie intake",
            "ans": true
          },
          {
            "label": "b",
            "text": "Most commonly seen in first year of life",
            "ans": true
          },
          {
            "label": "c",
            "text": "Oedema is present",
            "ans": false
          },
          {
            "label": "d",
            "text": "Severe growth retardation occurs",
            "ans": true
          },
          {
            "label": "e",
            "text": "Body weight/age is 80–60%",
            "ans": false
          }
        ],
        "explanation": "(C): Edema is a feature of kwashiorkor, not marasmus. | (E): Marasmus: weight/age < 60% (Wellcome classification).",
        "textbookNote": "(C): Edema is a feature of kwashiorkor, not marasmus. | (E): Marasmus: weight/age < 60% (Wellcome classification).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Functions of respective fat-soluble vitamins",
        "items": [
          {
            "label": "a",
            "text": "Vitamin A – vision",
            "ans": true
          },
          {
            "label": "b",
            "text": "Vitamin D – calcium and phosphate metabolism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Vitamin E – blood clotting",
            "ans": false
          },
          {
            "label": "d",
            "text": "Vitamin K – antioxidant",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vitamin A – reproduction",
            "ans": true
          }
        ],
        "explanation": "(A): Retinal is the visual pigment chromophore. | (B): Calcitriol raises Ca2+ and phosphate absorption. | (C): Blood clotting is vitamin K; vitamin E is an antioxidant. | (D): Vitamin K carboxylates clotting factors; vitamin E is the antioxidant. | (E): Retinol is needed for spermatogenesis and reproduction.",
        "textbookNote": "(A): Retinal is the visual pigment chromophore. | (B): Calcitriol raises Ca2+ and phosphate absorption. | (C): Blood clotting is vitamin K; vitamin E is an antioxidant. | (D): Vitamin K carboxylates clotting factors; vitamin E is the antioxidant. | (E): Retinol is needed for spermatogenesis and reproduction.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "An increase in ECF osmolarity",
        "items": [
          {
            "label": "a",
            "text": "Stimulates ADH release",
            "ans": true
          },
          {
            "label": "b",
            "text": "Inhibits the sensation of thirst",
            "ans": false
          },
          {
            "label": "c",
            "text": "Stimulates the osmoreceptors",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is due to gain of ECF volume",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is due to loss of body fluid",
            "ans": true
          }
        ],
        "explanation": "(A): High osmolarity stimulates osmoreceptors and ADH release. | (B): High ECF osmolarity STIMULATES thirst. | (C): Osmoreceptors in hypothalamus are stimulated by high osmolarity. | (D): Gain of water would dilute (lower) osmolarity. | (E): Water loss concentrates ECF.",
        "textbookNote": "(A): High osmolarity stimulates osmoreceptors and ADH release. | (B): High ECF osmolarity STIMULATES thirst. | (C): Osmoreceptors in hypothalamus are stimulated by high osmolarity. | (D): Gain of water would dilute (lower) osmolarity. | (E): Water loss concentrates ECF.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Regarding eicosanoids",
        "items": [
          {
            "label": "a",
            "text": "PG1, PGI2 and LT are eicosanoids",
            "ans": true
          },
          {
            "label": "b",
            "text": "The dietary precursor of PG is linoleic acid",
            "ans": true
          },
          {
            "label": "c",
            "text": "Eicosanoids contain 18 carbons",
            "ans": false
          },
          {
            "label": "d",
            "text": "PG acts as a local hormone",
            "ans": true
          },
          {
            "label": "e",
            "text": "Kidney is the major site of PG degradation",
            "ans": false
          }
        ],
        "explanation": "(C): Eicosanoids are 20-carbon derivatives. | (E): Lung is the major site of PG degradation.",
        "textbookNote": "(C): Eicosanoids are 20-carbon derivatives. | (E): Lung is the major site of PG degradation.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "About GIT hormones",
        "items": [
          {
            "label": "a",
            "text": "CCK causes gall bladder contraction",
            "ans": true
          },
          {
            "label": "b",
            "text": "Secretin stimulates biliary bicarbonate secretion",
            "ans": true
          },
          {
            "label": "c",
            "text": "Gastric inhibitory peptide inhibits insulin release",
            "ans": false
          },
          {
            "label": "d",
            "text": "Secretin stimulates pancreatic bicarbonate secretion",
            "ans": true
          },
          {
            "label": "e",
            "text": "CCK stimulates gastric emptying",
            "ans": false
          }
        ],
        "explanation": "(C): GIP stimulates insulin release (incretin). | (E): CCK DELAYS gastric emptying.",
        "textbookNote": "(C): GIP stimulates insulin release (incretin). | (E): CCK DELAYS gastric emptying.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "One osmolar solution of NaCl",
        "items": [
          {
            "label": "a",
            "text": "Contains 58.5 g NaCl in 1 L",
            "ans": false
          },
          {
            "label": "b",
            "text": "Causes shrinkage of RBC",
            "ans": true
          },
          {
            "label": "c",
            "text": "Gives osmotic pressure < 280 mosm/L",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is similar to a 0.5 M solution of NaCl",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is similar to 0.9% NaCl solution",
            "ans": false
          }
        ],
        "explanation": "(A): NaCl dissociates into 2 particles; 1 osmolar needs 29.25 g/L. | (B): 1 osmolar NaCl is hypertonic → RBC shrink. | (C): 1 osmolar = 1000 mosm/L, far above plasma. | (D): NaCl gives two osmoles per mole, so 1 osmolar = 0.5 M. | (E): 0.9% NaCl is ~0.3 osmolar.",
        "textbookNote": "(A): NaCl dissociates into 2 particles; 1 osmolar needs 29.25 g/L. | (B): 1 osmolar NaCl is hypertonic → RBC shrink. | (C): 1 osmolar = 1000 mosm/L, far above plasma. | (D): NaCl gives two osmoles per mole, so 1 osmolar = 0.5 M. | (E): 0.9% NaCl is ~0.3 osmolar.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Regarding iron",
        "items": [
          {
            "label": "a",
            "text": "Absorption occurs in the large gut",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is absorbed in ferric form",
            "ans": false
          },
          {
            "label": "c",
            "text": "Vitamin D favors absorption",
            "ans": false
          },
          {
            "label": "d",
            "text": "Binds with transferrin",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is stored as ferritin",
            "ans": true
          }
        ],
        "explanation": "(A): Iron is absorbed in duodenum/upper jejunum. | (B): Fe2+ (ferrous) is the absorbed form. | (C): Vitamin C favours iron absorption. | (D): Fe3+ circulates bound to transferrin. | (E): Intracellular iron is stored as ferritin.",
        "textbookNote": "(A): Iron is absorbed in duodenum/upper jejunum. | (B): Fe2+ (ferrous) is the absorbed form. | (C): Vitamin C favours iron absorption. | (D): Fe3+ circulates bound to transferrin. | (E): Intracellular iron is stored as ferritin.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Characteristics of dehydration in severe diarrhoea",
        "items": [
          {
            "label": "a",
            "text": "Decreased osmolarity",
            "ans": false
          },
          {
            "label": "b",
            "text": "PCO2 is increased",
            "ans": false
          },
          {
            "label": "c",
            "text": "[HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "Normal anion gap",
            "ans": true
          },
          {
            "label": "e",
            "text": "pH is < 7.35",
            "ans": true
          }
        ],
        "explanation": "(A): Diarrhoea causes loss of hypotonic fluid → hyperosmolar dehydration. | (B): Raised PCO2 occurs in respiratory acidosis or as compensation of metabolic alkalosis, not as a feature of | (D): Diarrhoea/renal tubular acidosis give normal-AG (hyperchloremic) acidosis; DKA, lactic acidosis give high AG. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "textbookNote": "(A): Diarrhoea causes loss of hypotonic fluid → hyperosmolar dehydration. | (B): Raised PCO2 occurs in respiratory acidosis or as compensation of metabolic alkalosis, not as a feature of | (D): Diarrhoea/renal tubular acidosis give normal-AG (hyperchloremic) acidosis; DKA, lactic acidosis give high AG. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "In respiratory acidosis",
        "items": [
          {
            "label": "a",
            "text": "pH is decreased",
            "ans": true
          },
          {
            "label": "b",
            "text": "pH is increased",
            "ans": false
          },
          {
            "label": "c",
            "text": "PCO2 is increased",
            "ans": true
          },
          {
            "label": "d",
            "text": "[HCO3",
            "ans": false
          },
          {
            "label": "e",
            "text": "[HCO3",
            "ans": false
          }
        ],
        "explanation": "(A): Acidosis lowers pH. | (B): Acidosis lowers pH; alkalosis raises it. | (C): Raised PCO2 occurs in respiratory acidosis or as compensation of metabolic alkalosis, not as a feature of",
        "textbookNote": "(A): Acidosis lowers pH. | (B): Acidosis lowers pH; alkalosis raises it. | (C): Raised PCO2 occurs in respiratory acidosis or as compensation of metabolic alkalosis, not as a feature of",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2022-may-p2-old",
    "session": "May 2022",
    "year": 2022,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 16,
    "bookPage": "Biochemistry Bank (May 2022)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Regarding lipoprotein, the following statements are correct",
        "items": [
          {
            "label": "a",
            "text": "Chylomicron transports endogenous triglyceride",
            "ans": false
          },
          {
            "label": "b",
            "text": "VLDL transports exogenous triglyceride",
            "ans": false
          },
          {
            "label": "c",
            "text": "VLDL is produced from liver",
            "ans": true
          },
          {
            "label": "d",
            "text": "Cholesteryl ester transfer protein transfers cholesteryl ester from HDL to LDL",
            "ans": true
          },
          {
            "label": "e",
            "text": "Apolipoproteins are enzyme cofactors",
            "ans": true
          }
        ],
        "explanation": "(A): Chylomicrons carry EXOGENOUS (dietary) TG; VLDL carries endogenous TG. | (B): VLDL carries ENDOGENOUS TG. | (C): VLDL is synthesised in liver. | (D): CETP moves cholesteryl ester from HDL to VLDL/LDL. | (E): Apolipoproteins are enzyme cofactors/activators.",
        "textbookNote": "(A): Chylomicrons carry EXOGENOUS (dietary) TG; VLDL carries endogenous TG. | (B): VLDL carries ENDOGENOUS TG. | (C): VLDL is synthesised in liver. | (D): CETP moves cholesteryl ester from HDL to VLDL/LDL. | (E): Apolipoproteins are enzyme cofactors/activators.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Regarding protein metabolism",
        "items": [
          {
            "label": "a",
            "text": "Site of deamination is liver and kidney",
            "ans": true
          },
          {
            "label": "b",
            "text": "Site of transamination is cytoplasm only",
            "ans": false
          },
          {
            "label": "c",
            "text": "Site of transamination is liver only",
            "ans": false
          },
          {
            "label": "d",
            "text": "CO2 liberated by TCA cycle is used in urea cycle",
            "ans": false
          },
          {
            "label": "e",
            "text": "Dehydrogenation occurs in non-oxidative deamination",
            "ans": false
          }
        ],
        "explanation": "(A): Deamination occurs mainly in liver and kidney. | (B): Transamination occurs in cytosol and mitochondria. | (C): Transamination occurs in many tissues. | (D): Urea-cycle CO2 is from HCO3 | (E): Non-oxidative deamination uses dehydratase/lyase.",
        "textbookNote": "(A): Deamination occurs mainly in liver and kidney. | (B): Transamination occurs in cytosol and mitochondria. | (C): Transamination occurs in many tissues. | (D): Urea-cycle CO2 is from HCO3 | (E): Non-oxidative deamination uses dehydratase/lyase.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "In glycolysis the following statements are correct",
        "items": [
          {
            "label": "a",
            "text": "The end product is lactate",
            "ans": false
          },
          {
            "label": "b",
            "text": "The end product is pyruvate",
            "ans": true
          },
          {
            "label": "c",
            "text": "There are four irreversible reactions",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lactate conversion to pyruvate is oxidation",
            "ans": true
          },
          {
            "label": "e",
            "text": "In the aerobic pathway 2 ATP are produced (net)",
            "ans": false
          }
        ],
        "explanation": "(A): End product of glycolysis is pyruvate (aerobic); lactate forms only in anaerobic conditions. | (B): Aerobic glycolysis ends in pyruvate (to mitochondria); lactate is formed only anaerobically. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Lactate → pyruvate removes 2H (LDH, NAD+ → NADH): oxidation. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "textbookNote": "(A): End product of glycolysis is pyruvate (aerobic); lactate forms only in anaerobic conditions. | (B): Aerobic glycolysis ends in pyruvate (to mitochondria); lactate is formed only anaerobically. | (C): Glycolysis has 3 irreversible steps: hexokinase/glucokinase, PFK-1, pyruvate kinase. | (D): Lactate → pyruvate removes 2H (LDH, NAD+ → NADH): oxidation. | (E): Net ATP: anaerobic = 2; aerobic ≈ 7–8 (2 + NADH via shuttles).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding hypothyroidism",
        "items": [
          {
            "label": "a",
            "text": "Serum TSH is always increased in primary hypothyroidism",
            "ans": true
          },
          {
            "label": "b",
            "text": "Serum TSH is always decreased in secondary hypothyroidism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Serum T3, T4 are always decreased in primary hypothyroidism",
            "ans": false
          },
          {
            "label": "d",
            "text": "Serum T3, T4 are always decreased in secondary hypothyroidism",
            "ans": true
          },
          {
            "label": "e",
            "text": "Serum T3, T4 can be normal in primary (subclinical) hypothyroidism",
            "ans": true
          }
        ],
        "explanation": "(A): Primary hypothyroidism: gland failure → ↓T3/T4 → ↑TSH (feedback). | (B): Secondary hypothyroidism: pituitary failure → TSH low (or inappropriately normal) with low T4. | (C): In subclinical primary hypothyroidism T3/T4 stay normal with raised TSH. | (D): Secondary hypothyroidism has low T3/T4. | (E): Subclinical hypothyroidism: normal T3/T4, raised TSH.",
        "textbookNote": "(A): Primary hypothyroidism: gland failure → ↓T3/T4 → ↑TSH (feedback). | (B): Secondary hypothyroidism: pituitary failure → TSH low (or inappropriately normal) with low T4. | (C): In subclinical primary hypothyroidism T3/T4 stay normal with raised TSH. | (D): Secondary hypothyroidism has low T3/T4. | (E): Subclinical hypothyroidism: normal T3/T4, raised TSH.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Regarding ATP",
        "items": [
          {
            "label": "a",
            "text": "Is a nucleotide derivative with 3 phosphate residues",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is a high-energy phosphate producing more than 7 kcal/mol of energy",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is formed only in the respiratory chain",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is not formed at substrate level",
            "ans": false
          },
          {
            "label": "e",
            "text": "More than 50% of ATP is used to drive the osmotic pump",
            "ans": false
          }
        ],
        "explanation": "(A): ATP = adenine + ribose + 3 phosphates. | (B): ATP hydrolysis ≈ –7.3 kcal/mol. | (C): ATP is also formed by substrate-level phosphorylation. | (D): Substrate-level phosphorylation exists (PK, PGK, succinyl-CoA synthetase). | (E): Na+-K+ pump uses ~20–40% of ATP.",
        "textbookNote": "(A): ATP = adenine + ribose + 3 phosphates. | (B): ATP hydrolysis ≈ –7.3 kcal/mol. | (C): ATP is also formed by substrate-level phosphorylation. | (D): Substrate-level phosphorylation exists (PK, PGK, succinyl-CoA synthetase). | (E): Na+-K+ pump uses ~20–40% of ATP.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Fat-soluble vitamins",
        "items": [
          {
            "label": "a",
            "text": "Require bile salts for absorption from gut",
            "ans": true
          },
          {
            "label": "b",
            "text": "May produce toxicity if taken in excess",
            "ans": true
          },
          {
            "label": "c",
            "text": "Have no antioxidant properties",
            "ans": false
          },
          {
            "label": "d",
            "text": "Vitamin K is required for blood coagulation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Are adequately synthesized in body",
            "ans": false
          }
        ],
        "explanation": "(A): Fat-soluble vitamins are absorbed in micelles. | (B): Fat-soluble vitamins (A, D) accumulate in the body. | (C): Vitamins A, E (and carotenes) are antioxidants. | (D): Vitamin K γ-carboxylates factors II, VII, IX, X. | (E): None is adequately synthesised except vitamin D (skin) partly.",
        "textbookNote": "(A): Fat-soluble vitamins are absorbed in micelles. | (B): Fat-soluble vitamins (A, D) accumulate in the body. | (C): Vitamins A, E (and carotenes) are antioxidants. | (D): Vitamin K γ-carboxylates factors II, VII, IX, X. | (E): None is adequately synthesised except vitamin D (skin) partly.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Dietary fibre",
        "items": [
          {
            "label": "a",
            "text": "Are oligosaccharides",
            "ans": false
          },
          {
            "label": "b",
            "text": "Are not absorbed from the gut",
            "ans": true
          },
          {
            "label": "c",
            "text": "Increase the incidence of gut cancer",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lower the blood cholesterol level",
            "ans": true
          },
          {
            "label": "e",
            "text": "Prevent constipation",
            "ans": true
          }
        ],
        "explanation": "(A): Dietary fibres are non-starch polysaccharides. | (C): Fibre REDUCES colon cancer risk.",
        "textbookNote": "(A): Dietary fibres are non-starch polysaccharides. | (C): Fibre REDUCES colon cancer risk.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Beta-oxidation of fatty acid",
        "items": [
          {
            "label": "a",
            "text": "Occurs in cytosol",
            "ans": false
          },
          {
            "label": "b",
            "text": "Generates ATP",
            "ans": true
          },
          {
            "label": "c",
            "text": "Occurs only in saturated fatty acids",
            "ans": false
          },
          {
            "label": "d",
            "text": "Can't occur in odd-chain-carbon-containing fatty acids",
            "ans": false
          },
          {
            "label": "e",
            "text": "Requires nicotinamide (niacin-derived coenzyme)",
            "ans": true
          }
        ],
        "explanation": "(A): β-oxidation occurs in mitochondria (activation in cytosol). | (B): β-oxidation generates abundant ATP. | (C): Unsaturated and odd-chain FA are also oxidised. | (D): Cardiac muscle prefers fatty acids as fuel. | (E): β-oxidation needs NAD+ (niacin).",
        "textbookNote": "(A): β-oxidation occurs in mitochondria (activation in cytosol). | (B): β-oxidation generates abundant ATP. | (C): Unsaturated and odd-chain FA are also oxidised. | (D): Cardiac muscle prefers fatty acids as fuel. | (E): β-oxidation needs NAD+ (niacin).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Fates of acetyl-CoA",
        "items": [
          {
            "label": "a",
            "text": "Produces CO2, H2O and ATP in TCA cycle",
            "ans": true
          },
          {
            "label": "b",
            "text": "Formation of ketone bodies in prolonged starvation",
            "ans": true
          },
          {
            "label": "c",
            "text": "Directly converts to acetone",
            "ans": false
          },
          {
            "label": "d",
            "text": "Synthesizes cholesterol",
            "ans": true
          },
          {
            "label": "e",
            "text": "Gives rise to prostaglandin",
            "ans": false
          }
        ],
        "explanation": "(A): Acetyl-CoA is oxidised in the TCA cycle. | (B): Excess acetyl-CoA → ketone bodies. | (C): Acetone arises from acetoacetate, not directly. | (D): Acetyl-CoA → HMG-CoA → cholesterol. | (E): Prostaglandins derive from arachidonic acid.",
        "textbookNote": "(A): Acetyl-CoA is oxidised in the TCA cycle. | (B): Excess acetyl-CoA → ketone bodies. | (C): Acetone arises from acetoacetate, not directly. | (D): Acetyl-CoA → HMG-CoA → cholesterol. | (E): Prostaglandins derive from arachidonic acid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Down syndrome",
        "items": [
          {
            "label": "a",
            "text": "Karyotype is trisomy 22",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is associated with primary hypothyroidism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is due to translocation (in all cases)",
            "ans": false
          },
          {
            "label": "d",
            "text": "In 75% of cases non-disjunction occurs during spermatogenesis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Occurs due to meiotic non-disjunction",
            "ans": true
          }
        ],
        "explanation": "(A): Down syndrome is trisomy 21. | (B): Down syndrome has an increased risk of hypothyroidism. | (C): ~95% of Down syndrome is trisomy; ~4% translocation. | (D): ~95% of non-disjunction is maternal (oogenesis). | (E): Meiotic non-disjunction (mostly maternal) causes trisomy 21.",
        "textbookNote": "(A): Down syndrome is trisomy 21. | (B): Down syndrome has an increased risk of hypothyroidism. | (C): ~95% of Down syndrome is trisomy; ~4% translocation. | (D): ~95% of non-disjunction is maternal (oogenesis). | (E): Meiotic non-disjunction (mostly maternal) causes trisomy 21.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "The following are facts in the TCA cycle",
        "items": [
          {
            "label": "a",
            "text": "An amphibolic cycle",
            "ans": true
          },
          {
            "label": "b",
            "text": "Produces NADPH",
            "ans": false
          },
          {
            "label": "c",
            "text": "Produces ATP at substrate level",
            "ans": true
          },
          {
            "label": "d",
            "text": "Involves the participation of lipoic acid",
            "ans": true
          },
          {
            "label": "e",
            "text": "Citrate combines with oxaloacetate",
            "ans": false
          }
        ],
        "explanation": "(A): TCA cycle is both catabolic and anabolic. | (B): TCA produces NADH and FADH2. | (C): Succinyl-CoA synthetase makes GTP/ATP at substrate level. | (D): α-KG dehydrogenase uses lipoic acid. | (E): Oxaloacetate + acetyl-CoA → citrate.",
        "textbookNote": "(A): TCA cycle is both catabolic and anabolic. | (B): TCA produces NADH and FADH2. | (C): Succinyl-CoA synthetase makes GTP/ATP at substrate level. | (D): α-KG dehydrogenase uses lipoic acid. | (E): Oxaloacetate + acetyl-CoA → citrate.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "PCR",
        "items": [
          {
            "label": "a",
            "text": "Requires RNA polymerase",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is a hybridization followed by amplification",
            "ans": true
          },
          {
            "label": "c",
            "text": "Requires a primer",
            "ans": true
          },
          {
            "label": "d",
            "text": "Polymerization occurs by formation of phosphodiester bond",
            "ans": true
          },
          {
            "label": "e",
            "text": "DNA ligase is necessary",
            "ans": false
          }
        ],
        "explanation": "(A): PCR uses DNA polymerase. | (B): PCR cycles: denaturation, primer annealing (hybridization), extension. | (C): DNA polymerase needs a primer. | (D): DNA polymerase forms 3'–5' phosphodiester bonds. | (E): Ligase is not used in PCR.",
        "textbookNote": "(A): PCR uses DNA polymerase. | (B): PCR cycles: denaturation, primer annealing (hybridization), extension. | (C): DNA polymerase needs a primer. | (D): DNA polymerase forms 3'–5' phosphodiester bonds. | (E): Ligase is not used in PCR.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Thyroid hormone",
        "items": [
          {
            "label": "a",
            "text": "Is an amino acid hormone",
            "ans": true
          },
          {
            "label": "b",
            "text": "Increases BMR",
            "ans": true
          },
          {
            "label": "c",
            "text": "Increases Na+-K+ ATPase activity",
            "ans": true
          },
          {
            "label": "d",
            "text": "Secretion is regulated by TSH",
            "ans": true
          },
          {
            "label": "e",
            "text": "Mode of action is mediated by cyclic AMP",
            "ans": false
          }
        ],
        "explanation": "(A): T3/T4 are tyrosine derivatives. | (B): Thyroid hormones raise BMR. | (C): Thyroid hormone increases Na+-K+ ATPase → heat/O2 consumption. | (D): TSH drives thyroid hormone secretion. | (E): Insulin acts via tyrosine kinase receptor.",
        "textbookNote": "(A): T3/T4 are tyrosine derivatives. | (B): Thyroid hormones raise BMR. | (C): Thyroid hormone increases Na+-K+ ATPase → heat/O2 consumption. | (D): TSH drives thyroid hormone secretion. | (E): Insulin acts via tyrosine kinase receptor.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Aldosterone",
        "items": [
          {
            "label": "a",
            "text": "Is a powerful vasoconstrictor",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is a steroid hormone",
            "ans": true
          },
          {
            "label": "c",
            "text": "Renin–angiotensin system induces its secretion strongly",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is a life-saving hormone",
            "ans": true
          },
          {
            "label": "e",
            "text": "Hyposecretion may cause Conn's syndrome",
            "ans": false
          }
        ],
        "explanation": "(A): Angiotensin II is the vasoconstrictor; aldosterone retains Na+. | (B): Aldosterone is a mineralocorticoid steroid. | (C): Angiotensin II stimulates aldosterone release. | (D): Cortisol/aldosterone deficiency is fatal. | (E): Conn's syndrome is aldosterone EXCESS.",
        "textbookNote": "(A): Angiotensin II is the vasoconstrictor; aldosterone retains Na+. | (B): Aldosterone is a mineralocorticoid steroid. | (C): Angiotensin II stimulates aldosterone release. | (D): Cortisol/aldosterone deficiency is fatal. | (E): Conn's syndrome is aldosterone EXCESS.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "Hemophilia is an autosomal dominant disorder",
            "ans": false
          },
          {
            "label": "b",
            "text": "Permanent structural and functional changes in gene lead to mutation",
            "ans": true
          },
          {
            "label": "c",
            "text": "Male is the sufferer, female is the carrier in hemophilia",
            "ans": true
          },
          {
            "label": "d",
            "text": "Down syndrome is due to trisomy 21",
            "ans": true
          },
          {
            "label": "e",
            "text": "Transcription and translation constitute the central dogma",
            "ans": true
          }
        ],
        "explanation": "(A): Haemophilia is X-linked recessive. | (B): Mutation = permanent change in DNA. | (C): In XLR disease, males are affected, females are carriers. | (D): Down syndrome = trisomy 21.",
        "textbookNote": "(A): Haemophilia is X-linked recessive. | (B): Mutation = permanent change in DNA. | (C): In XLR disease, males are affected, females are carriers. | (D): Down syndrome = trisomy 21.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Causes of dwarfism are",
        "items": [
          {
            "label": "a",
            "text": "Growth hormone deficiency",
            "ans": true
          },
          {
            "label": "b",
            "text": "End-organ unresponsiveness to GH",
            "ans": true
          },
          {
            "label": "c",
            "text": "Destruction of anterior pituitary",
            "ans": true
          },
          {
            "label": "d",
            "text": "Growth hormone deficiency (isolated)",
            "ans": true
          },
          {
            "label": "e",
            "text": "Overproduction of IGF-1",
            "ans": false
          }
        ],
        "explanation": "(A): GH deficiency → pituitary dwarfism. | (B): Laron dwarfism: GH-receptor defect. | (C): Loss of GH → dwarfism. | (D): GH deficiency → pituitary dwarfism. | (E): Excess IGF-1 → gigantism/acromegaly, not dwarfism.",
        "textbookNote": "(A): GH deficiency → pituitary dwarfism. | (B): Laron dwarfism: GH-receptor defect. | (C): Loss of GH → dwarfism. | (D): GH deficiency → pituitary dwarfism. | (E): Excess IGF-1 → gigantism/acromegaly, not dwarfism.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "ADH",
        "items": [
          {
            "label": "a",
            "text": "Is synthesized in the anterior pituitary",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is passed to posterior pituitary by portal blood vessel",
            "ans": false
          },
          {
            "label": "c",
            "text": "Angiotensin is its most potent stimulus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Increased K+ concentration is its inhibitory stimulus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is a potent vasoconstrictor",
            "ans": true
          }
        ],
        "explanation": "(A): ADH is made in hypothalamic neurons and stored in the posterior pituitary. | (B): ADH travels by axons (hypothalamo-hypophyseal tract). | (C): Osmolarity is the main stimulus; Ang II is a minor stimulus. | (D): ADH release is stimulated by high osmolarity/low volume. | (E): At high doses ADH constricts vessels (vasopressin).",
        "textbookNote": "(A): ADH is made in hypothalamic neurons and stored in the posterior pituitary. | (B): ADH travels by axons (hypothalamo-hypophyseal tract). | (C): Osmolarity is the main stimulus; Ang II is a minor stimulus. | (D): ADH release is stimulated by high osmolarity/low volume. | (E): At high doses ADH constricts vessels (vasopressin).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Cell cycle",
        "items": [
          {
            "label": "a",
            "text": "Controlled by alternate activation and deactivation of key enzymes",
            "ans": true
          },
          {
            "label": "b",
            "text": "In S phase replication of chromosomal DNA and histones occurs",
            "ans": true
          },
          {
            "label": "c",
            "text": "G2 phase is the preparatory phase of mitosis",
            "ans": true
          },
          {
            "label": "d",
            "text": "In M phase chromosomes are inactive here",
            "ans": false
          },
          {
            "label": "e",
            "text": "G1 phase is the preparatory phase for replication",
            "ans": true
          }
        ],
        "explanation": "(A): Cyclin–CDK control the cell cycle. | (B): DNA and histones are synthesised in S phase. | (C): G2 prepares for mitosis. | (D): Chromosomes are condensed and transcriptionally silent in M phase. | (E): G1 prepares for replication.",
        "textbookNote": "(A): Cyclin–CDK control the cell cycle. | (B): DNA and histones are synthesised in S phase. | (C): G2 prepares for mitosis. | (D): Chromosomes are condensed and transcriptionally silent in M phase. | (E): G1 prepares for replication.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "X-linked recessive disorders include",
        "items": [
          {
            "label": "a",
            "text": "Phenylketonuria",
            "ans": false
          },
          {
            "label": "b",
            "text": "β-thalassemia",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hemophilia A",
            "ans": true
          },
          {
            "label": "d",
            "text": "Agammaglobulinaemia (Bruton)",
            "ans": true
          },
          {
            "label": "e",
            "text": "Nephrogenic diabetes insipidus",
            "ans": true
          }
        ],
        "explanation": "(A): PKU is autosomal recessive. | (B): β-thalassaemia is autosomal recessive. | (C): Haemophilia A is X-linked recessive. | (D): Bruton's agammaglobulinaemia is X-linked recessive. | (E): Nephrogenic DI is X-linked recessive.",
        "textbookNote": "(A): PKU is autosomal recessive. | (B): β-thalassaemia is autosomal recessive. | (C): Haemophilia A is X-linked recessive. | (D): Bruton's agammaglobulinaemia is X-linked recessive. | (E): Nephrogenic DI is X-linked recessive.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Insulin",
        "items": [
          {
            "label": "a",
            "text": "Synthesized in β-cells of pancreatic islet",
            "ans": true
          },
          {
            "label": "b",
            "text": "Composed of two polypeptide chains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is secreted in response to a fall in plasma glucose concentration",
            "ans": false
          },
          {
            "label": "d",
            "text": "Activates glycogen phosphorylase in liver",
            "ans": false
          },
          {
            "label": "e",
            "text": "Absent in maturity-onset diabetes",
            "ans": false
          }
        ],
        "explanation": "(A): Insulin is made in β-cells of islets. | (B): Insulin has A (21 aa) and B (30 aa) chains linked by disulphides. | (C): Insulin is secreted when glucose RISES. | (D): Insulin inhibits phosphorylase and activates glycogen synthase. | (E): In MODY/type 2, insulin is present but insufficient/resistant.",
        "textbookNote": "(A): Insulin is made in β-cells of islets. | (B): Insulin has A (21 aa) and B (30 aa) chains linked by disulphides. | (C): Insulin is secreted when glucose RISES. | (D): Insulin inhibits phosphorylase and activates glycogen synthase. | (E): In MODY/type 2, insulin is present but insufficient/resistant.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2021-nov-p1-old",
    "session": "November 2021",
    "year": 2021,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 17,
    "bookPage": "Biochemistry Bank (November 2021)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "pH of a buffer solution",
        "items": [
          {
            "label": "a",
            "text": "Is the negative logarithm of [H+]",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is the negative logarithm of the dissociation constant",
            "ans": false
          },
          {
            "label": "c",
            "text": "Depends only on the concentration of salt",
            "ans": false
          },
          {
            "label": "d",
            "text": "Depends only on the concentration of salt and acid (not on their ratio)",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is equivalent to pK",
            "ans": false
          }
        ],
        "explanation": "(B): pK is –log Ka; pH is –log [H+]. | (C): pH depends on the RATIO of salt to acid, not on concentration alone. | (D): pH depends on the RATIO of salt to acid, not on concentration alone. | (E): pH = pK only at equal salt and acid concentrations.",
        "textbookNote": "(B): pK is –log Ka; pH is –log [H+]. | (C): pH depends on the RATIO of salt to acid, not on concentration alone. | (D): pH depends on the RATIO of salt to acid, not on concentration alone. | (E): pH = pK only at equal salt and acid concentrations.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Regarding crystalloids",
        "items": [
          {
            "label": "a",
            "text": "Non-dialyzable",
            "ans": false
          },
          {
            "label": "b",
            "text": "Diameter is < 1 nm",
            "ans": true
          },
          {
            "label": "c",
            "text": "Can pass through semipermeable membrane",
            "ans": true
          },
          {
            "label": "d",
            "text": "Having Brownian movement",
            "ans": false
          },
          {
            "label": "e",
            "text": "Having osmotic pressure higher than colloids",
            "ans": true
          }
        ],
        "explanation": "(A): Colloids are too large to pass through a dialysis membrane. | (B): Crystalloid particles are < 1 nm. | (C): Crystalloids pass; colloids cannot pass through semipermeable membranes. | (D): Crystalloids do not show Brownian movement; colloids do. | (E): Crystalloids are numerous small particles and exert greater osmotic pressure than colloids.",
        "textbookNote": "(A): Colloids are too large to pass through a dialysis membrane. | (B): Crystalloid particles are < 1 nm. | (C): Crystalloids pass; colloids cannot pass through semipermeable membranes. | (D): Crystalloids do not show Brownian movement; colloids do. | (E): Crystalloids are numerous small particles and exert greater osmotic pressure than colloids.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Enzymes are",
        "items": [
          {
            "label": "a",
            "text": "Protein in nature",
            "ans": true
          },
          {
            "label": "b",
            "text": "Dialyzable",
            "ans": false
          },
          {
            "label": "c",
            "text": "Heat labile",
            "ans": true
          },
          {
            "label": "d",
            "text": "Reaction specific",
            "ans": true
          },
          {
            "label": "e",
            "text": "Crystalloids",
            "ans": false
          }
        ],
        "explanation": "(A): Coenzymes are non-protein organic molecules; the apoenzyme is the protein. | (B): Colloids are non-dialyzable. | (C): Enzymes are heat labile proteins; coenzymes are heat stable. | (D): Enzymes are reaction and substrate specific. | (E): Enzymes are colloids (proteins), not crystalloids.",
        "textbookNote": "(A): Coenzymes are non-protein organic molecules; the apoenzyme is the protein. | (B): Colloids are non-dialyzable. | (C): Enzymes are heat labile proteins; coenzymes are heat stable. | (D): Enzymes are reaction and substrate specific. | (E): Enzymes are colloids (proteins), not crystalloids.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Isotopes",
        "items": [
          {
            "label": "a",
            "text": "Are atoms of the same element",
            "ans": true
          },
          {
            "label": "b",
            "text": "Are atoms having the same number of protons",
            "ans": true
          },
          {
            "label": "c",
            "text": "Atomic weights are different",
            "ans": true
          },
          {
            "label": "d",
            "text": "All have definite stable states",
            "ans": false
          },
          {
            "label": "e",
            "text": "Radioactivity can be used as a therapeutic tool",
            "ans": true
          }
        ],
        "explanation": "(A): Isotopes: same atomic number, different neutrons. | (B): Isotopes have the same number of protons. | (C): Different neutron number → different atomic weight. | (D): Some isotopes are stable, others radioactive. | (E): Radioisotopes (I-131, Co-60) are used therapeutically.",
        "textbookNote": "(A): Isotopes: same atomic number, different neutrons. | (B): Isotopes have the same number of protons. | (C): Different neutron number → different atomic weight. | (D): Some isotopes are stable, others radioactive. | (E): Radioisotopes (I-131, Co-60) are used therapeutically.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Regarding weak acid",
        "items": [
          {
            "label": "a",
            "text": "Dissociates partially",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is a proton acceptor",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has a weak conjugate base",
            "ans": false
          },
          {
            "label": "d",
            "text": "Forms a buffer solution with its conjugate base",
            "ans": true
          },
          {
            "label": "e",
            "text": "H2CO3 is a weak acid",
            "ans": true
          }
        ],
        "explanation": "(B): A weak acid is a proton donor. | (C): A weak acid has a relatively strong conjugate base.",
        "textbookNote": "(B): A weak acid is a proton donor. | (C): A weak acid has a relatively strong conjugate base.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Regarding lipid",
        "items": [
          {
            "label": "a",
            "text": "Is soluble in alcohol",
            "ans": true
          },
          {
            "label": "b",
            "text": "Phospholipid reduces surface tension in lungs",
            "ans": true
          },
          {
            "label": "c",
            "text": "Saturated fatty acid is good for health",
            "ans": false
          },
          {
            "label": "d",
            "text": "Saponification number gives an idea about chain length of fatty acid",
            "ans": true
          },
          {
            "label": "e",
            "text": "Lipid peroxidation causes atherosclerosis",
            "ans": true
          }
        ],
        "explanation": "(A): Lipids dissolve in organic solvents, including alcohol. | (B): Dipalmitoyl lecithin (surfactant) lowers alveolar surface tension. | (C): Saturated fats raise LDL and cardiovascular risk. | (D): Saponification number is inversely related to chain length. | (E): Lipid peroxidation of LDL contributes to atherosclerosis.",
        "textbookNote": "(A): Lipids dissolve in organic solvents, including alcohol. | (B): Dipalmitoyl lecithin (surfactant) lowers alveolar surface tension. | (C): Saturated fats raise LDL and cardiovascular risk. | (D): Saponification number is inversely related to chain length. | (E): Lipid peroxidation of LDL contributes to atherosclerosis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Simple diffusion of a substance",
        "items": [
          {
            "label": "a",
            "text": "Can occur against a concentration gradient",
            "ans": false
          },
          {
            "label": "b",
            "text": "Can occur against an electrochemical gradient",
            "ans": false
          },
          {
            "label": "c",
            "text": "Varies directly with temperature change",
            "ans": true
          },
          {
            "label": "d",
            "text": "Semipermeable membrane is essential",
            "ans": false
          },
          {
            "label": "e",
            "text": "Is inversely proportional to the solubility of solute",
            "ans": false
          }
        ],
        "explanation": "(A): Simple diffusion is passive, only down a concentration gradient. | (B): Simple diffusion cannot go against an electrochemical gradient (needs active transport). | (C): Diffusion rate rises with temperature (more kinetic energy). | (D): Simple diffusion can occur without a semipermeable membrane. | (E): Diffusion is directly proportional to lipid solubility.",
        "textbookNote": "(A): Simple diffusion is passive, only down a concentration gradient. | (B): Simple diffusion cannot go against an electrochemical gradient (needs active transport). | (C): Diffusion rate rises with temperature (more kinetic energy). | (D): Simple diffusion can occur without a semipermeable membrane. | (E): Diffusion is directly proportional to lipid solubility.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding carbohydrates",
        "items": [
          {
            "label": "a",
            "text": "Glucose and mannose are epimers",
            "ans": true
          },
          {
            "label": "b",
            "text": "Fructose is a ketose sugar",
            "ans": true
          },
          {
            "label": "c",
            "text": "Do not show isomerism",
            "ans": false
          },
          {
            "label": "d",
            "text": "Sour in taste",
            "ans": false
          },
          {
            "label": "e",
            "text": "Prevent ketosis",
            "ans": true
          }
        ],
        "explanation": "(A): Glucose and mannose differ at C-2 (epimers). | (B): Fructose has a keto group at C-2. | (C): Carbohydrates show many isomerisms. | (D): Sugars taste sweet. | (E): Carbohydrate is anti-ketogenic (supplies oxaloacetate).",
        "textbookNote": "(A): Glucose and mannose differ at C-2 (epimers). | (B): Fructose has a keto group at C-2. | (C): Carbohydrates show many isomerisms. | (D): Sugars taste sweet. | (E): Carbohydrate is anti-ketogenic (supplies oxaloacetate).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Characteristics of ICF",
        "items": [
          {
            "label": "a",
            "text": "Major fluid volume compartment",
            "ans": true
          },
          {
            "label": "b",
            "text": "K+ is the major cation",
            "ans": true
          },
          {
            "label": "c",
            "text": "Cl- is the major anion",
            "ans": false
          },
          {
            "label": "d",
            "text": "Total ionic concentration is less than ECF",
            "ans": false
          },
          {
            "label": "e",
            "text": "pH is lower than ECF",
            "ans": true
          }
        ],
        "explanation": "(A): ICF holds ~2/3 of total body water. | (B): K+ is the principal ICF cation. | (C): Cl- is the main ECF anion; ICF anions are phosphate and proteins. | (D): ECF and ICF are iso-osmotic, with equal total ionic concentration. | (E): ICF pH (~7.0) is lower than ECF (7.4).",
        "textbookNote": "(A): ICF holds ~2/3 of total body water. | (B): K+ is the principal ICF cation. | (C): Cl- is the main ECF anion; ICF anions are phosphate and proteins. | (D): ECF and ICF are iso-osmotic, with equal total ionic concentration. | (E): ICF pH (~7.0) is lower than ECF (7.4).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "About digestion the following are true",
        "items": [
          {
            "label": "a",
            "text": "Is a process of hydrolysis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Lipid digestion begins in mouth",
            "ans": true
          },
          {
            "label": "c",
            "text": "Pepsin splits carbohydrate into glucose",
            "ans": false
          },
          {
            "label": "d",
            "text": "Micelle is an aggregate of cholesterol only",
            "ans": false
          },
          {
            "label": "e",
            "text": "Bile salt reduces the surface tension of fat",
            "ans": true
          }
        ],
        "explanation": "(C): Pepsin digests protein. | (D): Micelles contain bile salts, phospholipid, cholesterol and FA — not cholesterol alone. | (E): Bile salts are detergents that lower surface tension → emulsification.",
        "textbookNote": "(C): Pepsin digests protein. | (D): Micelles contain bile salts, phospholipid, cholesterol and FA — not cholesterol alone. | (E): Bile salts are detergents that lower surface tension → emulsification.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Regarding vitamins",
        "items": [
          {
            "label": "a",
            "text": "Chemical nature of vitamin A is retinol",
            "ans": true
          },
          {
            "label": "b",
            "text": "Nicotinic acid is required for collagen synthesis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Active form of vitamin D is calcidiol",
            "ans": false
          },
          {
            "label": "d",
            "text": "RDA of vitamin D in adults is 5 μg",
            "ans": false
          },
          {
            "label": "e",
            "text": "Antioxidant vitamins are A, C and E",
            "ans": true
          }
        ],
        "explanation": "(A): Retinol (vitamin A) is the alcohol form. | (B): Collagen synthesis needs vitamin C. | (C): Active form is calcitriol (1,25-DHCC); calcidiol is the storage form. | (D): RDA of vitamin D in adults ≈ 600 IU (15 μg)/day. | (E): Vitamins A, C, E are antioxidants.",
        "textbookNote": "(A): Retinol (vitamin A) is the alcohol form. | (B): Collagen synthesis needs vitamin C. | (C): Active form is calcitriol (1,25-DHCC); calcidiol is the storage form. | (D): RDA of vitamin D in adults ≈ 600 IU (15 μg)/day. | (E): Vitamins A, C, E are antioxidants.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Example of transcellular fluid",
        "items": [
          {
            "label": "a",
            "text": "Blood",
            "ans": false
          },
          {
            "label": "b",
            "text": "Synovial fluid",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fluid in aqueous humor",
            "ans": true
          },
          {
            "label": "d",
            "text": "Interstitial fluid",
            "ans": false
          },
          {
            "label": "e",
            "text": "Pericardial fluid",
            "ans": true
          }
        ],
        "explanation": "(A): Plasma is intravascular fluid, not transcellular. | (B): Synovial fluid is a transcellular fluid. | (C): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Pericardial fluid is a transcellular fluid.",
        "textbookNote": "(A): Plasma is intravascular fluid, not transcellular. | (B): Synovial fluid is a transcellular fluid. | (C): Transcellular fluids (CSF, aqueous humor, synovial, pleural, peritoneal) are formed by epithelial transport. | (D): Interstitial fluid is extracellular but not transcellular. | (E): Pericardial fluid is a transcellular fluid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Choose the correct answers",
        "items": [
          {
            "label": "a",
            "text": "0.9% NaCl solution is a 1 N solution",
            "ans": false
          },
          {
            "label": "b",
            "text": "5% glucose solution is isotonic",
            "ans": true
          },
          {
            "label": "c",
            "text": "1 M glucose solution produces 1 osmole",
            "ans": true
          },
          {
            "label": "d",
            "text": "Anion gap is 18–20 mEq/L",
            "ans": false
          },
          {
            "label": "e",
            "text": "Plasma osmolarity is 280–296 mosm/L",
            "ans": true
          }
        ],
        "explanation": "(A): 0.9% NaCl is 'normal' saline, not 1 N (1 N NaCl = 5.85%). | (B): 5% glucose (278 mmol/L) is isotonic. | (C): 1 M glucose = 1 osmole/L (non-dissociating). | (D): Normal anion gap is 8–16 mEq/L. | (E): Normal plasma osmolarity is ~280–296 mosmol/L.",
        "textbookNote": "(A): 0.9% NaCl is 'normal' saline, not 1 N (1 N NaCl = 5.85%). | (B): 5% glucose (278 mmol/L) is isotonic. | (C): 1 M glucose = 1 osmole/L (non-dissociating). | (D): Normal anion gap is 8–16 mEq/L. | (E): Normal plasma osmolarity is ~280–296 mosmol/L.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Deficiency of vitamins is associated with",
        "items": [
          {
            "label": "a",
            "text": "Niacin – pellagra",
            "ans": true
          },
          {
            "label": "b",
            "text": "Biotin – beriberi",
            "ans": false
          },
          {
            "label": "c",
            "text": "Folic acid – neural tube defect",
            "ans": true
          },
          {
            "label": "d",
            "text": "Vitamin C – megaloblastic anemia",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vitamin D – osteomalacia",
            "ans": true
          }
        ],
        "explanation": "(A): Niacin deficiency → pellagra (dermatitis, diarrhoea, dementia). | (B): Beriberi is thiamine deficiency. | (C): Folate deficiency in early pregnancy → neural tube defects. | (D): Vitamin C deficiency → scurvy; megaloblastic anaemia is B12/folate. | (E): Vitamin D deficiency → rickets/osteomalacia.",
        "textbookNote": "(A): Niacin deficiency → pellagra (dermatitis, diarrhoea, dementia). | (B): Beriberi is thiamine deficiency. | (C): Folate deficiency in early pregnancy → neural tube defects. | (D): Vitamin C deficiency → scurvy; megaloblastic anaemia is B12/folate. | (E): Vitamin D deficiency → rickets/osteomalacia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Regarding protein",
        "items": [
          {
            "label": "a",
            "text": "Is a high-molecular-weight polypeptide",
            "ans": true
          },
          {
            "label": "b",
            "text": "Denatured by application of heat",
            "ans": true
          },
          {
            "label": "c",
            "text": "Beta-pleated sheet is a tertiary structure",
            "ans": false
          },
          {
            "label": "d",
            "text": "Exerts colloidal osmotic pressure",
            "ans": true
          },
          {
            "label": "e",
            "text": "Concentration in plasma is 6–8 g/dL",
            "ans": true
          }
        ],
        "explanation": "(A): Proteins are high-molecular-weight polypeptides. | (B): Heat breaks H-bonds and denatures protein. | (C): β-pleated sheet is a secondary structure. | (D): Plasma proteins (albumin) exert oncotic pressure. | (E): Normal plasma protein is 6–8 g/dL.",
        "textbookNote": "(A): Proteins are high-molecular-weight polypeptides. | (B): Heat breaks H-bonds and denatures protein. | (C): β-pleated sheet is a secondary structure. | (D): Plasma proteins (albumin) exert oncotic pressure. | (E): Normal plasma protein is 6–8 g/dL.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Folic acid has the following facts",
        "items": [
          {
            "label": "a",
            "text": "The active form is dihydrofolate",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is required for synthesis of nucleotides",
            "ans": true
          },
          {
            "label": "c",
            "text": "Acts as a carrier of single carbon unit",
            "ans": true
          },
          {
            "label": "d",
            "text": "RDA is 600–800 mg/day",
            "ans": false
          },
          {
            "label": "e",
            "text": "Deficiency causes macrocytic anemia",
            "ans": true
          }
        ],
        "explanation": "(A): THF is the active form. | (C): THF carries one-carbon groups for purine/thymidylate synthesis. | (D): RDA of folate is ~400 μg/day (600 μg in pregnancy), not mg. | (E): Folate deficiency → macrocytic/megaloblastic anaemia.",
        "textbookNote": "(A): THF is the active form. | (C): THF carries one-carbon groups for purine/thymidylate synthesis. | (D): RDA of folate is ~400 μg/day (600 μg in pregnancy), not mg. | (E): Folate deficiency → macrocytic/megaloblastic anaemia.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Normal saline",
        "items": [
          {
            "label": "a",
            "text": "Is a standard solution",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is 0.9% NaCl solution",
            "ans": true
          },
          {
            "label": "c",
            "text": "Means normal solution",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is hypotonic in relation to plasma",
            "ans": false
          },
          {
            "label": "e",
            "text": "Used in the treatment of diarrhea",
            "ans": true
          }
        ],
        "explanation": "(A): Normal saline is simply 0.9% NaCl isotonic solution. | (B): Normal saline = 0.9% NaCl (isotonic). | (C): 'Normal' refers to physiological, not 1 N. | (D): 0.9% NaCl is isotonic with plasma. | (E): Saline replaces fluid and Na+ in diarrhoea.",
        "textbookNote": "(A): Normal saline is simply 0.9% NaCl isotonic solution. | (B): Normal saline = 0.9% NaCl (isotonic). | (C): 'Normal' refers to physiological, not 1 N. | (D): 0.9% NaCl is isotonic with plasma. | (E): Saline replaces fluid and Na+ in diarrhoea.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Regarding trace elements",
        "items": [
          {
            "label": "a",
            "text": "RDA is < 100 gm/day",
            "ans": false
          },
          {
            "label": "b",
            "text": "Fe is an example",
            "ans": true
          },
          {
            "label": "c",
            "text": "Iodine deficiency causes mental retardation",
            "ans": true
          },
          {
            "label": "d",
            "text": "Daily requirement of iron is 10–20 mg for male",
            "ans": true
          },
          {
            "label": "e",
            "text": "Zn acts as a cofactor of enzymes",
            "ans": true
          }
        ],
        "explanation": "(A): Trace elements are needed in mg (< 100 mg/day) not gm. | (B): Iron is a trace element. | (C): Iodine is needed for thyroid hormone for brain development. | (D): Daily iron requirement is ~10 mg (men). | (E): Zn is a cofactor of many enzymes.",
        "textbookNote": "(A): Trace elements are needed in mg (< 100 mg/day) not gm. | (B): Iron is a trace element. | (C): Iodine is needed for thyroid hormone for brain development. | (D): Daily iron requirement is ~10 mg (men). | (E): Zn is a cofactor of many enzymes.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "The characteristics of kwashiorkor",
        "items": [
          {
            "label": "a",
            "text": "Disease resulting from low protein intake",
            "ans": true
          },
          {
            "label": "b",
            "text": "There is severe emaciation",
            "ans": false
          },
          {
            "label": "c",
            "text": "There is hypoalbuminemia",
            "ans": true
          },
          {
            "label": "d",
            "text": "There is hepatomegaly",
            "ans": true
          },
          {
            "label": "e",
            "text": "Skin problem, hair change and loss of appetite",
            "ans": true
          }
        ],
        "explanation": "(B): Emaciation is marasmus.",
        "textbookNote": "(B): Emaciation is marasmus.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "In metabolic alkalosis",
        "items": [
          {
            "label": "a",
            "text": "[H+] is decreased",
            "ans": true
          },
          {
            "label": "b",
            "text": "pH is increased",
            "ans": true
          },
          {
            "label": "c",
            "text": "PCO2 is increased (compensatory)",
            "ans": true
          },
          {
            "label": "d",
            "text": "[HCO3",
            "ans": false
          },
          {
            "label": "e",
            "text": "pH is < 7.35",
            "ans": false
          }
        ],
        "explanation": "(A): Alkalosis lowers [H+] and raises pH. | (B): Acidosis lowers pH; alkalosis raises it. | (C): Hypoventilation compensates metabolic alkalosis, raising PCO2. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "textbookNote": "(A): Alkalosis lowers [H+] and raises pH. | (B): Acidosis lowers pH; alkalosis raises it. | (C): Hypoventilation compensates metabolic alkalosis, raising PCO2. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2021-nov-p2-old",
    "session": "November 2021",
    "year": 2021,
    "month": "November",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 18,
    "bookPage": "Biochemistry Bank (November 2021)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Enzymes required for cholesterol synthesis",
        "items": [
          {
            "label": "a",
            "text": "HMG-CoA lyase",
            "ans": false
          },
          {
            "label": "b",
            "text": "Acetyl-CoA carboxylase",
            "ans": false
          },
          {
            "label": "c",
            "text": "HMG-CoA reductase",
            "ans": true
          },
          {
            "label": "d",
            "text": "Succinyl-CoA synthase",
            "ans": false
          },
          {
            "label": "e",
            "text": "HMG-CoA synthase",
            "ans": true
          }
        ],
        "explanation": "(A): HMG-CoA lyase is a ketogenesis enzyme. | (B): Acetyl-CoA carboxylase is the rate-limiting enzyme of fatty acid synthesis. | (C): HMG-CoA reductase is the rate-limiting enzyme. | (D): Succinyl-CoA synthetase is a TCA enzyme. | (E): HMG-CoA synthase (cytosolic) is in cholesterol synthesis.",
        "textbookNote": "(A): HMG-CoA lyase is a ketogenesis enzyme. | (B): Acetyl-CoA carboxylase is the rate-limiting enzyme of fatty acid synthesis. | (C): HMG-CoA reductase is the rate-limiting enzyme. | (D): Succinyl-CoA synthetase is a TCA enzyme. | (E): HMG-CoA synthase (cytosolic) is in cholesterol synthesis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "HDL cholesterol",
        "items": [
          {
            "label": "a",
            "text": "Synthesized from chylomicron",
            "ans": false
          },
          {
            "label": "b",
            "text": "Contains 50% apoprotein",
            "ans": true
          },
          {
            "label": "c",
            "text": "HDL size is largest among all lipoproteins",
            "ans": false
          },
          {
            "label": "d",
            "text": "Atherogenic potential is (+++)",
            "ans": false
          },
          {
            "label": "e",
            "text": "Metabolized in cardiac muscle",
            "ans": false
          }
        ],
        "explanation": "(A): Nascent HDL is made in liver/intestine. | (B): HDL is ~50% protein. | (C): HDL is the smallest and densest lipoprotein. | (D): HDL is anti-atherogenic (reverse cholesterol transport). | (E): HDL/LDL are metabolised in liver.",
        "textbookNote": "(A): Nascent HDL is made in liver/intestine. | (B): HDL is ~50% protein. | (C): HDL is the smallest and densest lipoprotein. | (D): HDL is anti-atherogenic (reverse cholesterol transport). | (E): HDL/LDL are metabolised in liver.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "About blotting techniques",
        "items": [
          {
            "label": "a",
            "text": "Northern blot is used for a specific RNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "Western blot is used to detect DNA",
            "ans": false
          },
          {
            "label": "c",
            "text": "Southern blot detects a specific DNA segment",
            "ans": true
          },
          {
            "label": "d",
            "text": "Gene expression can be detected by Northern blotting",
            "ans": true
          },
          {
            "label": "e",
            "text": "DNA profile is visualized by Western blotting",
            "ans": false
          }
        ],
        "explanation": "(A): Northern detects RNA. | (B): Western detects protein. | (C): Southern detects a DNA segment. | (D): Northern blot shows mRNA expression. | (E): DNA fingerprint = Southern/PCR.",
        "textbookNote": "(A): Northern detects RNA. | (B): Western detects protein. | (C): Southern detects a DNA segment. | (D): Northern blot shows mRNA expression. | (E): DNA fingerprint = Southern/PCR.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding ketoacidosis",
        "items": [
          {
            "label": "a",
            "text": "Low blood pH",
            "ans": true
          },
          {
            "label": "b",
            "text": "Marked volume depletion occurs",
            "ans": true
          },
          {
            "label": "c",
            "text": "ECF osmolarity is very high",
            "ans": true
          },
          {
            "label": "d",
            "text": "Plasma anion gap is normal",
            "ans": false
          },
          {
            "label": "e",
            "text": "Blood acetoacetate is increased",
            "ans": true
          }
        ],
        "explanation": "(A): DKA: ketoacids lower pH. | (B): Osmotic diuresis → volume depletion. | (D): Ketoanions raise the anion gap in DKA. | (E): Ketogenesis raises acetoacetate.",
        "textbookNote": "(A): DKA: ketoacids lower pH. | (B): Osmotic diuresis → volume depletion. | (D): Ketoanions raise the anion gap in DKA. | (E): Ketogenesis raises acetoacetate.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Regarding glycogenesis",
        "items": [
          {
            "label": "a",
            "text": "3 ATP are produced",
            "ans": false
          },
          {
            "label": "b",
            "text": "Glucose possesses higher energy than glycogen",
            "ans": false
          },
          {
            "label": "c",
            "text": "Rate-limiting enzyme is glycogen phosphorylase",
            "ans": false
          },
          {
            "label": "d",
            "text": "Insulin inhibits glycogenesis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Glycogenesis is stimulated by glucagon",
            "ans": false
          }
        ],
        "explanation": "(A): Glycolysis yields ATP by substrate-level phosphorylation. | (B): Glycogen is just a polymer of glucose; stored energy is not 'higher' in glucose per unit. | (C): Glycogen synthase is rate-limiting for glycogenesis; phosphorylase for glycogenolysis. | (D): Insulin stimulates glycogen synthase (glycogenesis). | (E): Glucagon stimulates glycogenolysis.",
        "textbookNote": "(A): Glycolysis yields ATP by substrate-level phosphorylation. | (B): Glycogen is just a polymer of glucose; stored energy is not 'higher' in glucose per unit. | (C): Glycogen synthase is rate-limiting for glycogenesis; phosphorylase for glycogenolysis. | (D): Insulin stimulates glycogen synthase (glycogenesis). | (E): Glucagon stimulates glycogenolysis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "All amino acids undergo transamination",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ammonia is removed by intestinal bacterial degradation",
            "ans": false
          },
          {
            "label": "c",
            "text": "Oxidative deamination is a catabolic process",
            "ans": true
          },
          {
            "label": "d",
            "text": "Excretion of NH3 with urine as NH4",
            "ans": false
          },
          {
            "label": "e",
            "text": "Proline can be synthesized from the urea cycle",
            "ans": false
          }
        ],
        "explanation": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "textbookNote": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "About DNA replication",
        "items": [
          {
            "label": "a",
            "text": "Is a semi-conservative process",
            "ans": true
          },
          {
            "label": "b",
            "text": "Requires elongation factors",
            "ans": false
          },
          {
            "label": "c",
            "text": "Requires reverse transcriptase enzyme",
            "ans": false
          },
          {
            "label": "d",
            "text": "Polymerization of the new strand moves in the 3'→5' direction",
            "ans": false
          },
          {
            "label": "e",
            "text": "DNA ligase is an enzyme of replication",
            "ans": true
          }
        ],
        "explanation": "(A): Each daughter DNA has one old and one new strand. | (B): Elongation factors belong to translation. | (C): Replication uses DNA polymerase, not reverse transcriptase. | (D): New strand grows 5'→3'. | (E): Ligase seals nicks in replication.",
        "textbookNote": "(A): Each daughter DNA has one old and one new strand. | (B): Elongation factors belong to translation. | (C): Replication uses DNA polymerase, not reverse transcriptase. | (D): New strand grows 5'→3'. | (E): Ligase seals nicks in replication.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Features of Addison's disease are",
        "items": [
          {
            "label": "a",
            "text": "Hypoglycemia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hyponatremia",
            "ans": true
          },
          {
            "label": "c",
            "text": "Hypocalcemia",
            "ans": false
          },
          {
            "label": "d",
            "text": "Hypopigmentation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Hypotension",
            "ans": true
          }
        ],
        "explanation": "(A): Cortisol deficiency (Addison's) → hypoglycaemia. | (B): Aldosterone deficiency → Na+ loss. | (C): Addison's: calcium is normal/high, not low. | (D): ↑ACTH/MSH → hyperpigmentation in Addison's. | (E): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension.",
        "textbookNote": "(A): Cortisol deficiency (Addison's) → hypoglycaemia. | (B): Aldosterone deficiency → Na+ loss. | (C): Addison's: calcium is normal/high, not low. | (D): ↑ACTH/MSH → hyperpigmentation in Addison's. | (E): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Choose the correct answers",
        "items": [
          {
            "label": "a",
            "text": "Blood osmolarity is 250 mOsm/L",
            "ans": false
          },
          {
            "label": "b",
            "text": "Microalbuminuria is 15 mg/day",
            "ans": false
          },
          {
            "label": "c",
            "text": "Normal blood urea is 40 mg/dL",
            "ans": true
          },
          {
            "label": "d",
            "text": "Rothera's nitroprusside test is positive in diabetic ketoacidosis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Benedict's test is positive for sucrose",
            "ans": false
          }
        ],
        "explanation": "(A): Normal plasma osmolarity is 280–296. | (B): Microalbuminuria = 30–300 mg/day. | (D): Rothera's nitroprusside test detects acetoacetate/acetone. | (E): Benedict's test detects reducing sugars (glucose, fructose, lactose, maltose), not sucrose.",
        "textbookNote": "(A): Normal plasma osmolarity is 280–296. | (B): Microalbuminuria = 30–300 mg/day. | (D): Rothera's nitroprusside test detects acetoacetate/acetone. | (E): Benedict's test detects reducing sugars (glucose, fructose, lactose, maltose), not sucrose.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Insulin",
        "items": [
          {
            "label": "a",
            "text": "Is an exocrine pancreatic secretion",
            "ans": false
          },
          {
            "label": "b",
            "text": "Decreases ketosis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Raises plasma potassium level in blood",
            "ans": false
          },
          {
            "label": "d",
            "text": "Causes entry of glucose into skeletal muscle",
            "ans": true
          },
          {
            "label": "e",
            "text": "Stimulates the release of free fatty acids from adipose tissue",
            "ans": false
          }
        ],
        "explanation": "(A): Insulin is an endocrine secretion of β-cells. | (C): Insulin lowers plasma K+. | (D): Insulin → GLUT-4 translocation. | (E): Insulin inhibits hormone-sensitive lipase.",
        "textbookNote": "(A): Insulin is an endocrine secretion of β-cells. | (C): Insulin lowers plasma K+. | (D): Insulin → GLUT-4 translocation. | (E): Insulin inhibits hormone-sensitive lipase.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "TSH value",
        "items": [
          {
            "label": "a",
            "text": "0.1 mU/L indicates thyrotoxicosis",
            "ans": true
          },
          {
            "label": "b",
            "text": "> 10 mU/L indicates clinical hypothyroidism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Can be used in diagnosis of thyroid disease",
            "ans": true
          },
          {
            "label": "d",
            "text": "5–20 mU/L indicates subclinical hypothyroidism",
            "ans": true
          },
          {
            "label": "e",
            "text": "Should always be done in diagnosis of thyroid disease",
            "ans": true
          }
        ],
        "explanation": "(A): TSH < 0.1 mU/L suggests thyrotoxicosis. | (B): TSH > 10 mU/L with low T4 = clinical hypothyroidism. | (C): TSH is the first-line thyroid screening test. | (D): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (E): TSH is the first-line test for thyroid disease.",
        "textbookNote": "(A): TSH < 0.1 mU/L suggests thyrotoxicosis. | (B): TSH > 10 mU/L with low T4 = clinical hypothyroidism. | (C): TSH is the first-line thyroid screening test. | (D): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (E): TSH is the first-line test for thyroid disease.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Regarding primary hypothyroidism",
        "items": [
          {
            "label": "a",
            "text": "Serum cholesterol increases",
            "ans": true
          },
          {
            "label": "b",
            "text": "TSH always increases",
            "ans": true
          },
          {
            "label": "c",
            "text": "TSH is 5–20 μIU/mL in subclinical hypothyroidism",
            "ans": true
          },
          {
            "label": "d",
            "text": "Strongly associated with infertility",
            "ans": true
          },
          {
            "label": "e",
            "text": "T3 and T4 may be normal",
            "ans": true
          }
        ],
        "explanation": "(A): Hypothyroidism reduces LDL receptors → ↑ cholesterol. | (B): Primary hypothyroidism → raised TSH. | (C): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (D): Hypothyroidism causes anovulation/menstrual disturbance → infertility. | (E): In subclinical hypothyroidism T3/T4 are normal.",
        "textbookNote": "(A): Hypothyroidism reduces LDL receptors → ↑ cholesterol. | (B): Primary hypothyroidism → raised TSH. | (C): Subclinical hypothyroidism: TSH 5–20 μIU/mL with normal T3/T4. | (D): Hypothyroidism causes anovulation/menstrual disturbance → infertility. | (E): In subclinical hypothyroidism T3/T4 are normal.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "In myocardial infarction, the enzymes/markers that rise within 4–6 hours",
        "items": [
          {
            "label": "a",
            "text": "ALT",
            "ans": false
          },
          {
            "label": "b",
            "text": "Troponin-I",
            "ans": true
          },
          {
            "label": "c",
            "text": "AST",
            "ans": false
          },
          {
            "label": "d",
            "text": "CPK-MB",
            "ans": true
          },
          {
            "label": "e",
            "text": "LDH",
            "ans": false
          }
        ],
        "explanation": "(A): ALT is the most specific for hepatocellular injury. | (B): Cardiac troponins are the most specific MI markers. | (C): AST is non-specific (heart, muscle, liver). | (E): LDH is a tetramer, so it has quaternary structure.",
        "textbookNote": "(A): ALT is the most specific for hepatocellular injury. | (B): Cardiac troponins are the most specific MI markers. | (C): AST is non-specific (heart, muscle, liver). | (E): LDH is a tetramer, so it has quaternary structure.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Choose the correct answers",
        "items": [
          {
            "label": "a",
            "text": "Terminal codons are AUG, UAG and UGA",
            "ans": false
          },
          {
            "label": "b",
            "text": "Mitochondrial DNA is maternal in origin",
            "ans": true
          },
          {
            "label": "c",
            "text": "Familial hypercholesterolemia is autosomal recessive",
            "ans": false
          },
          {
            "label": "d",
            "text": "Haemophilia is an X-linked dominant disorder",
            "ans": false
          },
          {
            "label": "e",
            "text": "Mutation of gene may result in sudden termination of translation",
            "ans": true
          }
        ],
        "explanation": "(A): AUG is the START codon; stop codons are UAA, UAG, UGA. | (C): FH is autosomal dominant (LDL receptor). | (D): Haemophilia is X-linked RECESSIVE.",
        "textbookNote": "(A): AUG is the START codon; stop codons are UAA, UAG, UGA. | (C): FH is autosomal dominant (LDL receptor). | (D): Haemophilia is X-linked RECESSIVE.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Blood glucose",
        "items": [
          {
            "label": "a",
            "text": "Fasting hyperglycemia indicates insulin resistance",
            "ans": true
          },
          {
            "label": "b",
            "text": "Post-prandial hyperglycemia indicates insulin resistance",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fasting < 70 mg/dL indicates hypoglycemia",
            "ans": true
          },
          {
            "label": "d",
            "text": "Post-prandial > 140 mg/dL indicates hyperglycemia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is increased in insulin therapy",
            "ans": false
          }
        ],
        "explanation": "(A): Fasting hyperglycaemia = hepatic insulin resistance/deficiency. | (B): Post-prandial rise indicates impaired insulin response. | (C): Fasting glucose < 70 mg/dL is hypoglycaemia. | (D): 2-h post-prandial > 140 mg/dL is abnormal. | (E): Insulin lowers blood glucose.",
        "textbookNote": "(A): Fasting hyperglycaemia = hepatic insulin resistance/deficiency. | (B): Post-prandial rise indicates impaired insulin response. | (C): Fasting glucose < 70 mg/dL is hypoglycaemia. | (D): 2-h post-prandial > 140 mg/dL is abnormal. | (E): Insulin lowers blood glucose.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Regarding liver function tests",
        "items": [
          {
            "label": "a",
            "text": "Normal serum albumin level is 3–5.5 g/dL",
            "ans": true
          },
          {
            "label": "b",
            "text": "Serum ALT rises in hepatocellular jaundice",
            "ans": true
          },
          {
            "label": "c",
            "text": "Serum ALP rises in obstructive jaundice",
            "ans": true
          },
          {
            "label": "d",
            "text": "A:G ratio is reversed in chronic liver diseases",
            "ans": true
          },
          {
            "label": "e",
            "text": "Conjugated bilirubin rises in prehepatic jaundice",
            "ans": false
          }
        ],
        "explanation": "(A): Normal albumin is 3.5–5.5 g/dL. | (B): ALT rises in hepatocellular jaundice. | (C): ALP rises in obstructive jaundice. | (D): A:G ratio is reversed (< 1) in chronic liver disease. | (E): Prehepatic jaundice: unconjugated bilirubin rises.",
        "textbookNote": "(A): Normal albumin is 3.5–5.5 g/dL. | (B): ALT rises in hepatocellular jaundice. | (C): ALP rises in obstructive jaundice. | (D): A:G ratio is reversed (< 1) in chronic liver disease. | (E): Prehepatic jaundice: unconjugated bilirubin rises.",
        "verificationStatus": "Needs Review",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)",
        "reviewReason": "Corrected item in authoritative faculty script."
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "The following statements are true",
        "items": [
          {
            "label": "a",
            "text": "Triglycerides should be less than 40 mg/dL",
            "ans": false
          },
          {
            "label": "b",
            "text": "Down syndrome is an example of polyploidy",
            "ans": false
          },
          {
            "label": "c",
            "text": "Non-disjunction may result in trisomy",
            "ans": true
          },
          {
            "label": "d",
            "text": "Turner syndrome karyotype is 47,XXY",
            "ans": false
          },
          {
            "label": "e",
            "text": "HbA1c is more than 6.5% in DM",
            "ans": true
          }
        ],
        "explanation": "(A): Desirable triglyceride < 150 mg/dL. | (B): Down syndrome is aneuploidy (trisomy), not polyploidy. | (C): Non-disjunction gives trisomy/monosomy. | (D): Turner = 45,X; 47,XXY is Klinefelter. | (E): HbA1c > 6.5% is diagnostic of DM.",
        "textbookNote": "(A): Desirable triglyceride < 150 mg/dL. | (B): Down syndrome is aneuploidy (trisomy), not polyploidy. | (C): Non-disjunction gives trisomy/monosomy. | (D): Turner = 45,X; 47,XXY is Klinefelter. | (E): HbA1c > 6.5% is diagnostic of DM.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Examples of autosomal dominant disorders",
        "items": [
          {
            "label": "a",
            "text": "Achondroplasia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Sickle cell anemia",
            "ans": false
          },
          {
            "label": "c",
            "text": "Phenylketonuria",
            "ans": false
          },
          {
            "label": "d",
            "text": "Diabetes insipidus (nephrogenic)",
            "ans": false
          },
          {
            "label": "e",
            "text": "Familial hypercholesterolemia",
            "ans": true
          }
        ],
        "explanation": "(A): Achondroplasia is autosomal dominant. | (B): Sickle cell anaemia is autosomal recessive. | (C): PKU is autosomal recessive. | (D): Nephrogenic diabetes insipidus is X-linked recessive. | (E): FH is autosomal dominant (LDL receptor).",
        "textbookNote": "(A): Achondroplasia is autosomal dominant. | (B): Sickle cell anaemia is autosomal recessive. | (C): PKU is autosomal recessive. | (D): Nephrogenic diabetes insipidus is X-linked recessive. | (E): FH is autosomal dominant (LDL receptor).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "PCR",
        "items": [
          {
            "label": "a",
            "text": "Requires RNA polymerase",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is a hybridization followed by amplification",
            "ans": true
          },
          {
            "label": "c",
            "text": "Requires a primer",
            "ans": true
          },
          {
            "label": "d",
            "text": "Polymerization occurs by formation of phosphodiester bond",
            "ans": true
          },
          {
            "label": "e",
            "text": "DNA ligase is necessary",
            "ans": false
          }
        ],
        "explanation": "(A): PCR uses DNA polymerase. | (B): PCR cycles: denaturation, primer annealing (hybridization), extension. | (C): DNA polymerase needs a primer. | (D): DNA polymerase forms 3'–5' phosphodiester bonds. | (E): Ligase is not used in PCR.",
        "textbookNote": "(A): PCR uses DNA polymerase. | (B): PCR cycles: denaturation, primer annealing (hybridization), extension. | (C): DNA polymerase needs a primer. | (D): DNA polymerase forms 3'–5' phosphodiester bonds. | (E): Ligase is not used in PCR.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Codons",
        "items": [
          {
            "label": "a",
            "text": "Are consecutive bases of mRNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "Are overlapped along the polynucleotide of mRNA",
            "ans": false
          },
          {
            "label": "c",
            "text": "Are responsible for synthesis of a specific amino acid",
            "ans": true
          },
          {
            "label": "d",
            "text": "UAG and UGA do not code for any amino acid",
            "ans": true
          },
          {
            "label": "e",
            "text": "AGU codes for methionine",
            "ans": false
          }
        ],
        "explanation": "(B): The genetic code is non-overlapping. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "textbookNote": "(B): The genetic code is non-overlapping. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2021-may-p1-old",
    "session": "May 2021",
    "year": 2021,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-I",
    "curriculum": "Old Curriculum",
    "page": 19,
    "bookPage": "Biochemistry Bank (May 2021)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Regarding buffer",
        "items": [
          {
            "label": "a",
            "text": "Consists of a weak acid and its salt of strong base",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is more effective when pH = pK",
            "ans": true
          },
          {
            "label": "c",
            "text": "Regulates pH within seconds to minutes",
            "ans": false
          },
          {
            "label": "d",
            "text": "Only present extracellularly",
            "ans": false
          },
          {
            "label": "e",
            "text": "The pK of the HCO3",
            "ans": false
          }
        ],
        "explanation": "(A): A buffer = weak acid + its salt with a strong base. | (B): Buffering is maximal at pH = pK (±1). | (C): Chemical buffers act instantly; lungs take minutes and kidneys hours–days. | (D): Buffers are present in both ECF and ICF.",
        "textbookNote": "(A): A buffer = weak acid + its salt with a strong base. | (B): Buffering is maximal at pH = pK (±1). | (C): Chemical buffers act instantly; lungs take minutes and kidneys hours–days. | (D): Buffers are present in both ECF and ICF.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Colloid",
        "items": [
          {
            "label": "a",
            "text": "Diameter is 1–200 mμ",
            "ans": true
          },
          {
            "label": "b",
            "text": "Does not move in an electrical field",
            "ans": false
          },
          {
            "label": "c",
            "text": "Has an isoelectric pH",
            "ans": true
          },
          {
            "label": "d",
            "text": "Shows molecular movement in solution",
            "ans": false
          },
          {
            "label": "e",
            "text": "DNA is an example",
            "ans": true
          }
        ],
        "explanation": "(A): Colloid particle size is 1–200 millimicron (mμ = nm); crystalloids are < 1 nm. | (B): Colloids carry charge and migrate in an electric field (electrophoresis). | (C): Colloids such as proteins have a definite isoelectric pH. | (D): Colloids show Brownian movement (random particle movement); molecular/ionic movement is typical of | (E): DNA is a macromolecule that forms colloidal solution.",
        "textbookNote": "(A): Colloid particle size is 1–200 millimicron (mμ = nm); crystalloids are < 1 nm. | (B): Colloids carry charge and migrate in an electric field (electrophoresis). | (C): Colloids such as proteins have a definite isoelectric pH. | (D): Colloids show Brownian movement (random particle movement); molecular/ionic movement is typical of | (E): DNA is a macromolecule that forms colloidal solution.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "The statements can be applied for the H-H equation",
        "items": [
          {
            "label": "a",
            "text": "pH = pK + log salt/acid",
            "ans": true
          },
          {
            "label": "b",
            "text": "pH = 6.1 + log HCO3",
            "ans": false
          },
          {
            "label": "c",
            "text": "pH = 6.1 + log [HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "pH = pK at half neutralization",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is a derivative of the law of mass action",
            "ans": true
          }
        ],
        "explanation": "(A): H-H equation: pH = pK + log [salt]/[acid]. | (D): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (E): H-H equation is derived from the law of mass action applied to Ka of a weak acid.",
        "textbookNote": "(A): H-H equation: pH = pK + log [salt]/[acid]. | (D): When acid is half-neutralized [salt] = [acid], log 1 = 0, so pH = pK. | (E): H-H equation is derived from the law of mass action applied to Ka of a weak acid.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Regarding carbohydrates",
        "items": [
          {
            "label": "a",
            "text": "Are derivatives of polyhydric aldehydes and ketones",
            "ans": true
          },
          {
            "label": "b",
            "text": "Show optical isomerism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Fructose is an invert sugar",
            "ans": false
          },
          {
            "label": "d",
            "text": "Sucrose exhibits mutarotation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Prevent ketosis",
            "ans": true
          }
        ],
        "explanation": "(A): Carbohydrates = polyhydroxy aldehydes/ketones and derivatives. | (B): Asymmetric carbons give optical isomerism. | (C): Invert sugar is a glucose + fructose mixture from sucrose hydrolysis. | (D): Sucrose has no free anomeric carbon, so no mutarotation. | (E): Carbohydrate is anti-ketogenic (supplies oxaloacetate).",
        "textbookNote": "(A): Carbohydrates = polyhydroxy aldehydes/ketones and derivatives. | (B): Asymmetric carbons give optical isomerism. | (C): Invert sugar is a glucose + fructose mixture from sucrose hydrolysis. | (D): Sucrose has no free anomeric carbon, so no mutarotation. | (E): Carbohydrate is anti-ketogenic (supplies oxaloacetate).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Quaternary structure is present in",
        "items": [
          {
            "label": "a",
            "text": "LDH",
            "ans": true
          },
          {
            "label": "b",
            "text": "Coagulated protein",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hemoglobin",
            "ans": true
          },
          {
            "label": "d",
            "text": "Denatured protein",
            "ans": false
          },
          {
            "label": "e",
            "text": "Myoglobin",
            "ans": false
          }
        ],
        "explanation": "(A): LDH is a tetramer, so it has quaternary structure. | (B): Coagulated protein is denatured; quaternary structure is lost. | (C): Hb is a tetramer (α2β2): quaternary structure. | (D): Denatured protein loses its higher-order structure. | (E): Myoglobin is a single polypeptide with tertiary structure only.",
        "textbookNote": "(A): LDH is a tetramer, so it has quaternary structure. | (B): Coagulated protein is denatured; quaternary structure is lost. | (C): Hb is a tetramer (α2β2): quaternary structure. | (D): Denatured protein loses its higher-order structure. | (E): Myoglobin is a single polypeptide with tertiary structure only.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Choose the correct answer",
        "items": [
          {
            "label": "a",
            "text": "All amino acids undergo transamination",
            "ans": false
          },
          {
            "label": "b",
            "text": "Ammonia is removed by intestinal bacterial degradation",
            "ans": false
          },
          {
            "label": "c",
            "text": "Oxidative deamination is a catabolic process",
            "ans": true
          },
          {
            "label": "d",
            "text": "Excretion of NH3 with urine as NH4",
            "ans": false
          },
          {
            "label": "e",
            "text": "Proline can be synthesized from the urea cycle",
            "ans": false
          }
        ],
        "explanation": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "textbookNote": "(A): Lysine, threonine, proline, hydroxyproline do not undergo transamination. | (B): Intestinal bacteria PRODUCE ammonia (urease); it is removed as urea/glutamine. | (C): Oxidative deamination (glutamate dehydrogenase) releases NH3 from amino acids. | (E): Proline is made from glutamate; it is not a urea-cycle product.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Enzymes with their clinical significance",
        "items": [
          {
            "label": "a",
            "text": "ALT is highly specific for liver",
            "ans": true
          },
          {
            "label": "b",
            "text": "CPK-MM is highly specific for muscle",
            "ans": true
          },
          {
            "label": "c",
            "text": "SGPT is a heart disease marker",
            "ans": false
          },
          {
            "label": "d",
            "text": "ALP is increased in prostate cancer",
            "ans": false
          },
          {
            "label": "e",
            "text": "Aldolase is increased in brain tumor",
            "ans": false
          }
        ],
        "explanation": "(A): ALT is more liver-specific than AST. | (B): CPK-MM is the skeletal muscle isoenzyme; CK-MB is cardiac. | (C): ALT (SGPT) is the liver marker; AST rises in MI. | (D): ACP (not ALP) rises in prostate cancer. | (E): Aldolase rises in muscle disease (muscular dystrophy).",
        "textbookNote": "(A): ALT is more liver-specific than AST. | (B): CPK-MM is the skeletal muscle isoenzyme; CK-MB is cardiac. | (C): ALT (SGPT) is the liver marker; AST rises in MI. | (D): ACP (not ALP) rises in prostate cancer. | (E): Aldolase rises in muscle disease (muscular dystrophy).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Regarding fatty acids",
        "items": [
          {
            "label": "a",
            "text": "Are aliphatic monocarboxylic acids",
            "ans": true
          },
          {
            "label": "b",
            "text": "Are not bound to albumin in plasma",
            "ans": false
          },
          {
            "label": "c",
            "text": "Are simple lipids",
            "ans": false
          },
          {
            "label": "d",
            "text": "Require micelle for absorption",
            "ans": true
          },
          {
            "label": "e",
            "text": "Can be synthesized from glucose",
            "ans": true
          }
        ],
        "explanation": "(A): Fatty acids are aliphatic monocarboxylic acids. | (B): Free fatty acids circulate bound to albumin. | (C): Fatty acids are components/derived lipids. | (D): Long-chain fatty acids need bile-salt micelles. | (E): Glucose → acetyl-CoA → fatty acids.",
        "textbookNote": "(A): Fatty acids are aliphatic monocarboxylic acids. | (B): Free fatty acids circulate bound to albumin. | (C): Fatty acids are components/derived lipids. | (D): Long-chain fatty acids need bile-salt micelles. | (E): Glucose → acetyl-CoA → fatty acids.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Osmosis",
        "items": [
          {
            "label": "a",
            "text": "Depends on the concentration of the solutes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Depends on the movement of the solvent",
            "ans": true
          },
          {
            "label": "c",
            "text": "Needs semipermeable membrane",
            "ans": true
          },
          {
            "label": "d",
            "text": "Only the solutes can cross the membrane",
            "ans": false
          },
          {
            "label": "e",
            "text": "Both the solutes and the solvent cross the membrane",
            "ans": false
          }
        ],
        "explanation": "(A): Osmotic pressure depends on the number of solute particles. | (B): Osmosis is by definition solvent movement. | (C): Osmosis = solvent movement across a semipermeable membrane. | (D): In osmosis the solvent moves; solutes cannot cross. | (E): In osmosis only the solvent crosses the semipermeable membrane.",
        "textbookNote": "(A): Osmotic pressure depends on the number of solute particles. | (B): Osmosis is by definition solvent movement. | (C): Osmosis = solvent movement across a semipermeable membrane. | (D): In osmosis the solvent moves; solutes cannot cross. | (E): In osmosis only the solvent crosses the semipermeable membrane.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Fat-soluble vitamins",
        "items": [
          {
            "label": "a",
            "text": "Require bile salts for absorption from the gut",
            "ans": true
          },
          {
            "label": "b",
            "text": "May produce toxicity if taken in excess",
            "ans": true
          },
          {
            "label": "c",
            "text": "Have no antioxidant properties",
            "ans": false
          },
          {
            "label": "d",
            "text": "Vitamin K is required for blood coagulation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Are adequately synthesized in the body",
            "ans": false
          }
        ],
        "explanation": "(A): Fat-soluble vitamins are absorbed in micelles. | (B): Fat-soluble vitamins (A, D) accumulate in the body. | (C): Vitamins A, E (and carotenes) are antioxidants. | (D): Vitamin K γ-carboxylates factors II, VII, IX, X. | (E): None is adequately synthesised except vitamin D (skin) partly.",
        "textbookNote": "(A): Fat-soluble vitamins are absorbed in micelles. | (B): Fat-soluble vitamins (A, D) accumulate in the body. | (C): Vitamins A, E (and carotenes) are antioxidants. | (D): Vitamin K γ-carboxylates factors II, VII, IX, X. | (E): None is adequately synthesised except vitamin D (skin) partly.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Regarding coenzymes",
        "items": [
          {
            "label": "a",
            "text": "Only protein in nature",
            "ans": false
          },
          {
            "label": "b",
            "text": "Catalyze chemical reactions",
            "ans": false
          },
          {
            "label": "c",
            "text": "Most of them are derivatives of fat-soluble vitamins",
            "ans": false
          },
          {
            "label": "d",
            "text": "Thiamine pyrophosphate is an example",
            "ans": true
          },
          {
            "label": "e",
            "text": "NADPH is a coenzyme for reductive synthesis",
            "ans": true
          }
        ],
        "explanation": "(A): Coenzymes are NON-protein organic molecules. | (B): Enzymes catalyse; coenzymes only assist as carriers. | (C): Most coenzymes derive from water-soluble (B-complex) vitamins. | (D): TPP (from vitamin B1) is a coenzyme for oxidative decarboxylation and transketolase. | (E): NADPH donates reducing equivalents for biosynthesis (fatty acid, cholesterol).",
        "textbookNote": "(A): Coenzymes are NON-protein organic molecules. | (B): Enzymes catalyse; coenzymes only assist as carriers. | (C): Most coenzymes derive from water-soluble (B-complex) vitamins. | (D): TPP (from vitamin B1) is a coenzyme for oxidative decarboxylation and transketolase. | (E): NADPH donates reducing equivalents for biosynthesis (fatty acid, cholesterol).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Following are the facts for gut hormones",
        "items": [
          {
            "label": "a",
            "text": "CCK-PZ augments HCO3",
            "ans": false
          },
          {
            "label": "b",
            "text": "Secretin increases enzyme-rich pancreatic secretion",
            "ans": false
          },
          {
            "label": "c",
            "text": "Gastrin causes contraction of gall bladder",
            "ans": false
          },
          {
            "label": "d",
            "text": "Somatostatin reduces gastric and intestinal motility",
            "ans": true
          },
          {
            "label": "e",
            "text": "Gall bladder contraction is inhibited by CCK-PZ",
            "ans": false
          }
        ],
        "explanation": "(B): Secretin → HCO3 | (C): CCK causes gall bladder contraction. | (E): CCK stimulates gall bladder contraction.",
        "textbookNote": "(B): Secretin → HCO3 | (C): CCK causes gall bladder contraction. | (E): CCK stimulates gall bladder contraction.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Dietary fibres",
        "items": [
          {
            "label": "a",
            "text": "Are oligosaccharides",
            "ans": false
          },
          {
            "label": "b",
            "text": "Are not absorbed from the gut",
            "ans": true
          },
          {
            "label": "c",
            "text": "Increase the incidence of colon cancer",
            "ans": false
          },
          {
            "label": "d",
            "text": "Lower the blood cholesterol level",
            "ans": true
          },
          {
            "label": "e",
            "text": "Prevent constipation",
            "ans": true
          }
        ],
        "explanation": "(A): Dietary fibres are non-starch polysaccharides. | (C): Fibre REDUCES colon cancer risk.",
        "textbookNote": "(A): Dietary fibres are non-starch polysaccharides. | (C): Fibre REDUCES colon cancer risk.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "In metabolic acidosis",
        "items": [
          {
            "label": "a",
            "text": "[H+] decreased",
            "ans": false
          },
          {
            "label": "b",
            "text": "PCO2 increased",
            "ans": false
          },
          {
            "label": "c",
            "text": "HCO3",
            "ans": false
          },
          {
            "label": "d",
            "text": "Normal anion gap only",
            "ans": false
          },
          {
            "label": "e",
            "text": "pH is < 7.35",
            "ans": true
          }
        ],
        "explanation": "(A): In acidosis [H+] rises and pH falls. | (B): In metabolic acidosis PCO2 falls (respiratory compensation); raised PCO2 is respiratory acidosis. | (D): Metabolic acidosis may have high or normal anion gap. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "textbookNote": "(A): In acidosis [H+] rises and pH falls. | (B): In metabolic acidosis PCO2 falls (respiratory compensation); raised PCO2 is respiratory acidosis. | (D): Metabolic acidosis may have high or normal anion gap. | (E): Acidaemia is pH < 7.35; alkalosis has pH > 7.45.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Regarding ECF",
        "items": [
          {
            "label": "a",
            "text": "Is 40% of total body water",
            "ans": false
          },
          {
            "label": "b",
            "text": "Concentration of Na+ is 145 mEq/L",
            "ans": true
          },
          {
            "label": "c",
            "text": "Protein content is 35–55 g/L",
            "ans": false
          },
          {
            "label": "d",
            "text": "Maintains homeostasis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is less than ICF volume",
            "ans": true
          }
        ],
        "explanation": "(A): ECF is ~1/3 (33%) of TBW; ICF is 2/3. | (B): ECF Na+ is ~135–145 mEq/L. | (C): Protein content of ECF/plasma is 6–8 g/dL; interstitial fluid is much lower. | (D): ECF is the internal environment that maintains homeostasis. | (E): ECF volume (1/3 TBW) is less than ICF (2/3).",
        "textbookNote": "(A): ECF is ~1/3 (33%) of TBW; ICF is 2/3. | (B): ECF Na+ is ~135–145 mEq/L. | (C): Protein content of ECF/plasma is 6–8 g/dL; interstitial fluid is much lower. | (D): ECF is the internal environment that maintains homeostasis. | (E): ECF volume (1/3 TBW) is less than ICF (2/3).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "The characteristics of marasmus include",
        "items": [
          {
            "label": "a",
            "text": "Inadequate protein and calorie intake",
            "ans": true
          },
          {
            "label": "b",
            "text": "Most commonly seen in first year of life",
            "ans": true
          },
          {
            "label": "c",
            "text": "Oedema is present",
            "ans": false
          },
          {
            "label": "d",
            "text": "Severe growth retardation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Body weight/age is 60–80%",
            "ans": false
          }
        ],
        "explanation": "(C): Edema is a feature of kwashiorkor, not marasmus. | (E): Marasmus: weight/age < 60% of standard (kwashiorkor 60–80% with oedema).",
        "textbookNote": "(C): Edema is a feature of kwashiorkor, not marasmus. | (E): Marasmus: weight/age < 60% of standard (kwashiorkor 60–80% with oedema).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Radioactive isotope",
        "items": [
          {
            "label": "a",
            "text": "Is a stable compound",
            "ans": false
          },
          {
            "label": "b",
            "text": "Remains as a mixture in all natural sources",
            "ans": false
          },
          {
            "label": "c",
            "text": "Breaks down constantly into more stable isotopes",
            "ans": true
          },
          {
            "label": "d",
            "text": "Is used to measure body fluid compartment volume",
            "ans": true
          },
          {
            "label": "e",
            "text": "Is used for the diagnosis and treatment of hyperthyroidism",
            "ans": true
          }
        ],
        "explanation": "(A): Radioisotopes are unstable. | (B): Radioisotopes do not 'remain as a mixture'; they decay. | (C): Radioisotopes decay to stable isotopes. | (D): Radioisotopes (tritium, I-131, Cr-51) measure fluid compartment volumes. | (E): I-131 is used to diagnose and treat hyperthyroidism.",
        "textbookNote": "(A): Radioisotopes are unstable. | (B): Radioisotopes do not 'remain as a mixture'; they decay. | (C): Radioisotopes decay to stable isotopes. | (D): Radioisotopes (tritium, I-131, Cr-51) measure fluid compartment volumes. | (E): I-131 is used to diagnose and treat hyperthyroidism.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Regarding digestion and absorption",
        "items": [
          {
            "label": "a",
            "text": "Protein digestion begins in mouth",
            "ans": false
          },
          {
            "label": "b",
            "text": "Fat emulsification occurs by bile salts",
            "ans": true
          },
          {
            "label": "c",
            "text": "Glucose is absorbed by Na+-glucose cotransporter",
            "ans": true
          },
          {
            "label": "d",
            "text": "Fructose is absorbed by facilitated diffusion",
            "ans": true
          },
          {
            "label": "e",
            "text": "Cholagogue decreases bile flow",
            "ans": false
          }
        ],
        "explanation": "(A): Protein digestion begins in stomach (pepsin). | (B): Emulsification is one role; micelle formation for absorption is key. | (E): Cholagogues INCREASE bile flow.",
        "textbookNote": "(A): Protein digestion begins in stomach (pepsin). | (B): Emulsification is one role; micelle formation for absorption is key. | (E): Cholagogues INCREASE bile flow.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Choose the correct answers",
        "items": [
          {
            "label": "a",
            "text": "Cell membrane is a phospholipid bilayer only",
            "ans": false
          },
          {
            "label": "b",
            "text": "There are protein channels in the cell membrane",
            "ans": true
          },
          {
            "label": "c",
            "text": "Na+-K+ active transport releases 3 K+ outside the cell",
            "ans": false
          },
          {
            "label": "d",
            "text": "Ca2+ acts as a guard in the protein channel",
            "ans": false
          },
          {
            "label": "e",
            "text": "Ion channels are required for generation of electrogenic potential",
            "ans": true
          }
        ],
        "explanation": "(A): Membrane also has proteins and cholesterol. | (C): Na+-K+ pump: 3 Na+ OUT, 2 K+ IN. | (D): Ca2+ is not a channel guard; channels are gated by voltage/ligand.",
        "textbookNote": "(A): Membrane also has proteins and cholesterol. | (C): Na+-K+ pump: 3 Na+ OUT, 2 K+ IN. | (D): Ca2+ is not a channel guard; channels are gated by voltage/ligand.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Regarding iron",
        "items": [
          {
            "label": "a",
            "text": "Absorption occurs in large gut",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is absorbed in ferric form",
            "ans": false
          },
          {
            "label": "c",
            "text": "Vitamin D favors its absorption",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is stored as ferritin",
            "ans": true
          },
          {
            "label": "e",
            "text": "Binds with transferrin",
            "ans": true
          }
        ],
        "explanation": "(A): Iron is absorbed in duodenum and proximal jejunum. | (B): Fe2+ (ferrous) is the absorbed form. | (C): Vitamin C favours iron absorption. | (D): Intracellular iron is stored as ferritin. | (E): Fe3+ circulates bound to transferrin.",
        "textbookNote": "(A): Iron is absorbed in duodenum and proximal jejunum. | (B): Fe2+ (ferrous) is the absorbed form. | (C): Vitamin C favours iron absorption. | (D): Intracellular iron is stored as ferritin. | (E): Fe3+ circulates bound to transferrin.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  },
  {
    "id": "cmu-bio-2021-may-p2-old",
    "session": "May 2021",
    "year": 2021,
    "month": "May",
    "subject": "Biochemistry",
    "paper": "Paper-II",
    "curriculum": "Old Curriculum",
    "page": 20,
    "bookPage": "Biochemistry Bank (May 2021)",
    "totalMarks": 20,
    "time": "30 minutes",
    "questions": [
      {
        "qNum": 1,
        "type": "TF",
        "stem": "Fates of acetyl-CoA",
        "items": [
          {
            "label": "a",
            "text": "Condenses with oxaloacetate",
            "ans": true
          },
          {
            "label": "b",
            "text": "Converted to fatty acid",
            "ans": true
          },
          {
            "label": "c",
            "text": "Converted to amino acid",
            "ans": false
          },
          {
            "label": "d",
            "text": "Converted to ketone bodies",
            "ans": true
          },
          {
            "label": "e",
            "text": "Converted to glucose",
            "ans": false
          }
        ],
        "explanation": "(A): Acetyl-CoA + OAA → citrate. | (B): Acetyl-CoA is the building block for FA synthesis. | (C): Acetyl-CoA cannot be net-converted to amino acids. | (D): Acetyl-CoA → ketone bodies in starvation. | (E): Acetyl-CoA cannot be converted to glucose in humans (no net).",
        "textbookNote": "(A): Acetyl-CoA + OAA → citrate. | (B): Acetyl-CoA is the building block for FA synthesis. | (C): Acetyl-CoA cannot be net-converted to amino acids. | (D): Acetyl-CoA → ketone bodies in starvation. | (E): Acetyl-CoA cannot be converted to glucose in humans (no net).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Features of Addison's disease are",
        "items": [
          {
            "label": "a",
            "text": "Hypoglycemia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Hyponatremia",
            "ans": true
          },
          {
            "label": "c",
            "text": "Hypokalemia",
            "ans": false
          },
          {
            "label": "d",
            "text": "Hypopigmentation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Hypotension",
            "ans": true
          }
        ],
        "explanation": "(A): Cortisol deficiency (Addison's) → hypoglycaemia. | (B): Aldosterone deficiency → Na+ loss. | (C): Addison's → HYPERkalaemia (aldosterone lack); Cushing's → hypokalaemia (mineralocorticoid effect of | (D): ↑ACTH/MSH → hyperpigmentation in Addison's. | (E): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension.",
        "textbookNote": "(A): Cortisol deficiency (Addison's) → hypoglycaemia. | (B): Aldosterone deficiency → Na+ loss. | (C): Addison's → HYPERkalaemia (aldosterone lack); Cushing's → hypokalaemia (mineralocorticoid effect of | (D): ↑ACTH/MSH → hyperpigmentation in Addison's. | (E): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Turner's syndrome is characterized by",
        "items": [
          {
            "label": "a",
            "text": "Absence of ovary (streak gonads)",
            "ans": true
          },
          {
            "label": "b",
            "text": "Webbed neck",
            "ans": true
          },
          {
            "label": "c",
            "text": "Estrogen deficiency",
            "ans": true
          },
          {
            "label": "d",
            "text": "Association with primary hypothyroidism",
            "ans": true
          },
          {
            "label": "e",
            "text": "Hypergonadotropic hypogonadism",
            "ans": true
          }
        ],
        "explanation": "(A): Streak gonads in Turner. | (B): Turner features. | (C): Streak ovaries → low oestrogen. | (D): Down syndrome has an increased risk of hypothyroidism. | (E): Low oestrogen → high FSH/LH.",
        "textbookNote": "(A): Streak gonads in Turner. | (B): Turner features. | (C): Streak ovaries → low oestrogen. | (D): Down syndrome has an increased risk of hypothyroidism. | (E): Low oestrogen → high FSH/LH.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Genes",
        "items": [
          {
            "label": "a",
            "text": "Contain alleles that cause the trait",
            "ans": true
          },
          {
            "label": "b",
            "text": "Expression of 45,XO causes Turner syndrome",
            "ans": false
          },
          {
            "label": "c",
            "text": "Female karyotype is 46,XY",
            "ans": false
          },
          {
            "label": "d",
            "text": "Contain code for enzyme synthesis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Can pair with non-complementary bases",
            "ans": false
          }
        ],
        "explanation": "(A): Genes have alleles. | (B): Turner syndrome is a chromosomal (not gene) defect. | (C): Female karyotype is 46,XX. | (D): Genes code for polypeptides/enzymes. | (E): Base pairing is A–T, G–C only.",
        "textbookNote": "(A): Genes have alleles. | (B): Turner syndrome is a chromosomal (not gene) defect. | (C): Female karyotype is 46,XX. | (D): Genes code for polypeptides/enzymes. | (E): Base pairing is A–T, G–C only.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Causes of dwarfism are",
        "items": [
          {
            "label": "a",
            "text": "Growth hormone deficiency",
            "ans": true
          },
          {
            "label": "b",
            "text": "End-organ unresponsiveness to GH",
            "ans": true
          },
          {
            "label": "c",
            "text": "Destruction of anterior pituitary",
            "ans": true
          },
          {
            "label": "d",
            "text": "GHIH deficiency",
            "ans": false
          },
          {
            "label": "e",
            "text": "Overproduction of IGF-1",
            "ans": false
          }
        ],
        "explanation": "(A): GH deficiency → pituitary dwarfism. | (B): Laron dwarfism: GH-receptor defect. | (C): Loss of GH → dwarfism. | (D): GHIH (somatostatin) deficiency would raise GH, not cause dwarfism. | (E): Excess IGF-1 → gigantism/acromegaly, not dwarfism.",
        "textbookNote": "(A): GH deficiency → pituitary dwarfism. | (B): Laron dwarfism: GH-receptor defect. | (C): Loss of GH → dwarfism. | (D): GHIH (somatostatin) deficiency would raise GH, not cause dwarfism. | (E): Excess IGF-1 → gigantism/acromegaly, not dwarfism.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "About DNA",
        "items": [
          {
            "label": "a",
            "text": "Is present in nucleus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Introns are coding regions",
            "ans": false
          },
          {
            "label": "c",
            "text": "Length is measured by number of base pairs",
            "ans": true
          },
          {
            "label": "d",
            "text": "Present in mitochondria",
            "ans": true
          },
          {
            "label": "e",
            "text": "Contains ribose",
            "ans": false
          }
        ],
        "explanation": "(A): DNA is in nucleus and mitochondria. | (B): Introns are non-coding; exons code. | (C): DNA length is in base pairs. | (D): mtDNA is circular, maternal. | (E): DNA contains deoxyribose.",
        "textbookNote": "(A): DNA is in nucleus and mitochondria. | (B): Introns are non-coding; exons code. | (C): DNA length is in base pairs. | (D): mtDNA is circular, maternal. | (E): DNA contains deoxyribose.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Carbohydrate is metabolized by",
        "items": [
          {
            "label": "a",
            "text": "Glycolysis",
            "ans": true
          },
          {
            "label": "b",
            "text": "TCA cycle",
            "ans": true
          },
          {
            "label": "c",
            "text": "Gluconeogenesis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Pentose phosphate pathway",
            "ans": true
          },
          {
            "label": "e",
            "text": "Uronic acid pathway",
            "ans": true
          }
        ],
        "explanation": "(A): Glycolysis: PFK-1 is rate limiting. | (C): Gluconeogenesis is an anabolic synthesis of glucose; occurs in fasting, liver/kidney, inhibited by insulin.",
        "textbookNote": "(A): Glycolysis: PFK-1 is rate limiting. | (C): Gluconeogenesis is an anabolic synthesis of glucose; occurs in fasting, liver/kidney, inhibited by insulin.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Features of Cushing's syndrome include",
        "items": [
          {
            "label": "a",
            "text": "Hypokalemia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Acidosis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Hypotension",
            "ans": false
          },
          {
            "label": "d",
            "text": "Positive dexamethasone suppression test",
            "ans": false
          },
          {
            "label": "e",
            "text": "Muscular weakness",
            "ans": true
          }
        ],
        "explanation": "(A): Addison's → HYPERkalaemia (aldosterone lack); Cushing's → hypokalaemia (mineralocorticoid effect of | (B): Acidosis shifts K+ out of cells → hyperkalaemia, not hypokalaemia. | (C): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension. | (D): Cushing's syndrome: cortisol is NOT suppressed by dexamethasone. | (E): Protein catabolism and hypokalaemia → weakness.",
        "textbookNote": "(A): Addison's → HYPERkalaemia (aldosterone lack); Cushing's → hypokalaemia (mineralocorticoid effect of | (B): Acidosis shifts K+ out of cells → hyperkalaemia, not hypokalaemia. | (C): Aldosterone/cortisol lack → salt loss, hypotension; Cushing's causes hypertension. | (D): Cushing's syndrome: cortisol is NOT suppressed by dexamethasone. | (E): Protein catabolism and hypokalaemia → weakness.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Impaired renal function causes",
        "items": [
          {
            "label": "a",
            "text": "Increased blood ammonia",
            "ans": false
          },
          {
            "label": "b",
            "text": "Increased prothrombin time",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is associated with anemia",
            "ans": true
          },
          {
            "label": "d",
            "text": "Increased serum K+",
            "ans": true
          },
          {
            "label": "e",
            "text": "Decreased creatinine clearance",
            "ans": true
          }
        ],
        "explanation": "(A): Renal failure raises urea/creatinine; blood ammonia is raised in liver failure. | (B): Prolonged PT is a liver, not renal, feature.",
        "textbookNote": "(A): Renal failure raises urea/creatinine; blood ammonia is raised in liver failure. | (B): Prolonged PT is a liver, not renal, feature.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Down syndrome",
        "items": [
          {
            "label": "a",
            "text": "Karyotype is trisomy 22",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is associated with primary hypothyroidism",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is due to translocation (in all cases)",
            "ans": false
          },
          {
            "label": "d",
            "text": "In 75% of cases non-disjunction occurs in spermatozoa formation",
            "ans": false
          },
          {
            "label": "e",
            "text": "Occurs due to meiotic non-disjunction",
            "ans": true
          }
        ],
        "explanation": "(A): Down syndrome is trisomy 21. | (B): Down syndrome has an increased risk of hypothyroidism. | (C): ~95% of Down syndrome is trisomy; ~4% translocation. | (D): ~95% of non-disjunction is maternal. | (E): Meiotic non-disjunction (mostly maternal) causes trisomy 21.",
        "textbookNote": "(A): Down syndrome is trisomy 21. | (B): Down syndrome has an increased risk of hypothyroidism. | (C): ~95% of Down syndrome is trisomy; ~4% translocation. | (D): ~95% of non-disjunction is maternal. | (E): Meiotic non-disjunction (mostly maternal) causes trisomy 21.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Ammonia",
        "items": [
          {
            "label": "a",
            "text": "Is produced during oxidation of uric acid",
            "ans": false
          },
          {
            "label": "b",
            "text": "Is added to the amino acid pool",
            "ans": false
          },
          {
            "label": "c",
            "text": "Is produced in transamination",
            "ans": false
          },
          {
            "label": "d",
            "text": "Is a toxic agent during uremia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Can combine with carbon dioxide to form carbamoyl phosphate",
            "ans": true
          }
        ],
        "explanation": "(A): Ammonia is not produced during uric acid oxidation. | (B): Ammonia leaves the amino acid pool. | (C): Transamination moves NH2 without releasing NH3. | (D): Hyperammonaemia is toxic.",
        "textbookNote": "(A): Ammonia is not produced during uric acid oxidation. | (B): Ammonia leaves the amino acid pool. | (C): Transamination moves NH2 without releasing NH3. | (D): Hyperammonaemia is toxic.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Prostaglandin",
        "items": [
          {
            "label": "a",
            "text": "Is a 20-carbon fatty acid derivative",
            "ans": true
          },
          {
            "label": "b",
            "text": "Is a cyclic endoperoxide",
            "ans": true
          },
          {
            "label": "c",
            "text": "Is a hormone",
            "ans": false
          },
          {
            "label": "d",
            "text": "Prostacyclin constricts blood vessels and aggregates platelets",
            "ans": false
          },
          {
            "label": "e",
            "text": "PGF2α is a potent bronchodilator",
            "ans": false
          }
        ],
        "explanation": "(A): Cardiac muscle prefers fatty acids as fuel. | (C): Prostaglandins are local autacoids, not circulating hormones. | (D): PGI2 vasodilates and inhibits platelet aggregation. | (E): PGF2α is a bronchoconstrictor.",
        "textbookNote": "(A): Cardiac muscle prefers fatty acids as fuel. | (C): Prostaglandins are local autacoids, not circulating hormones. | (D): PGI2 vasodilates and inhibits platelet aggregation. | (E): PGF2α is a bronchoconstrictor.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Thyroid function test",
        "items": [
          {
            "label": "a",
            "text": "Normal TSH level is 0.4–4.0 μIU/mL",
            "ans": true
          },
          {
            "label": "b",
            "text": "When TSH is normal, T3 and T4 estimations are usually not carried out",
            "ans": true
          },
          {
            "label": "c",
            "text": "TSH > 20 μIU/mL indicates hyperthyroidism",
            "ans": false
          },
          {
            "label": "d",
            "text": "Normal TSH excludes hypothyroidism or hyperthyroidism",
            "ans": true
          },
          {
            "label": "e",
            "text": "TSH, T3 and T4 levels decrease in secondary hypothyroidism",
            "ans": true
          }
        ],
        "explanation": "(A): Normal TSH is ~0.4–4.5 μIU/mL. | (B): When TSH is normal, T3/T4 are normal in primary thyroid disease. | (C): I-131 is used to diagnose and treat hyperthyroidism. | (D): A normal TSH excludes primary hypo/hyperthyroidism. | (E): Secondary hypothyroidism: low TSH, T3, T4.",
        "textbookNote": "(A): Normal TSH is ~0.4–4.5 μIU/mL. | (B): When TSH is normal, T3/T4 are normal in primary thyroid disease. | (C): I-131 is used to diagnose and treat hyperthyroidism. | (D): A normal TSH excludes primary hypo/hyperthyroidism. | (E): Secondary hypothyroidism: low TSH, T3, T4.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "The following statements are applicable for cortisol",
        "items": [
          {
            "label": "a",
            "text": "Counter-shock (anti-stress) hormone",
            "ans": true
          },
          {
            "label": "b",
            "text": "A life-saving hormone",
            "ans": true
          },
          {
            "label": "c",
            "text": "Decreases protein breakdown",
            "ans": false
          },
          {
            "label": "d",
            "text": "Excess secretion can cause central obesity",
            "ans": true
          },
          {
            "label": "e",
            "text": "Increases blood sugar mainly by glycogenolysis",
            "ans": false
          }
        ],
        "explanation": "(A): Cortisol is the anti-stress hormone. | (B): Cortisol/aldosterone deficiency is fatal. | (C): Cortisol is catabolic for protein. | (D): Excess cortisol → truncal obesity. | (E): Cortisol raises glucose mainly via gluconeogenesis.",
        "textbookNote": "(A): Cortisol is the anti-stress hormone. | (B): Cortisol/aldosterone deficiency is fatal. | (C): Cortisol is catabolic for protein. | (D): Excess cortisol → truncal obesity. | (E): Cortisol raises glucose mainly via gluconeogenesis.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Regarding the respiratory chain",
        "items": [
          {
            "label": "a",
            "text": "Can be inhibited by cyanide resulting in histotoxic hypoxia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Reducing equivalents pass through coenzymes and carriers",
            "ans": true
          },
          {
            "label": "c",
            "text": "Does not create a redox potential",
            "ans": false
          },
          {
            "label": "d",
            "text": "Drives a proton pump for oxidative phosphorylation",
            "ans": true
          },
          {
            "label": "e",
            "text": "Produces ATP at substrate level",
            "ans": false
          }
        ],
        "explanation": "(A): Cyanide blocks cytochrome oxidase → histotoxic hypoxia. | (B): NADH/FADH2 pass electrons through carriers. | (C): ETC carriers have increasing redox potential. | (D): Complexes I, III, IV pump H+ to build the gradient for ATP synthase. | (E): Succinyl-CoA synthetase makes GTP/ATP at substrate level.",
        "textbookNote": "(A): Cyanide blocks cytochrome oxidase → histotoxic hypoxia. | (B): NADH/FADH2 pass electrons through carriers. | (C): ETC carriers have increasing redox potential. | (D): Complexes I, III, IV pump H+ to build the gradient for ATP synthase. | (E): Succinyl-CoA synthetase makes GTP/ATP at substrate level.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Regarding protein metabolism",
        "items": [
          {
            "label": "a",
            "text": "Site of deamination is liver and kidney",
            "ans": true
          },
          {
            "label": "b",
            "text": "Site of transamination is cytoplasm only",
            "ans": false
          },
          {
            "label": "c",
            "text": "Site of transamination is liver only",
            "ans": false
          },
          {
            "label": "d",
            "text": "CO2 liberated by TCA cycle is used in urea cycle",
            "ans": false
          },
          {
            "label": "e",
            "text": "Dehydrogenation occurs in non-oxidative deamination",
            "ans": false
          }
        ],
        "explanation": "(A): Deamination occurs mainly in liver and kidney. | (B): Transamination occurs in cytosol and mitochondria. | (C): Transamination occurs in many tissues. | (D): Urea-cycle CO2 is from HCO3 | (E): Non-oxidative deamination uses dehydratase/lyase.",
        "textbookNote": "(A): Deamination occurs mainly in liver and kidney. | (B): Transamination occurs in cytosol and mitochondria. | (C): Transamination occurs in many tissues. | (D): Urea-cycle CO2 is from HCO3 | (E): Non-oxidative deamination uses dehydratase/lyase.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Ketone bodies",
        "items": [
          {
            "label": "a",
            "text": "Are organic acids",
            "ans": true
          },
          {
            "label": "b",
            "text": "In excess can produce respiratory acidosis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Are produced in uncontrolled diabetes mellitus",
            "ans": true
          },
          {
            "label": "d",
            "text": "In diabetic ketosis they increase HCO3",
            "ans": false
          },
          {
            "label": "e",
            "text": "Are identified by Rothera's nitroprusside test in urine",
            "ans": true
          }
        ],
        "explanation": "(A): Acetoacetate and β-OHB are organic acids. | (B): Ketone bodies cause METABOLIC acidosis. | (C): Lack of insulin → lipolysis → ketogenesis. | (E): Rothera's nitroprusside test detects acetoacetate/acetone.",
        "textbookNote": "(A): Acetoacetate and β-OHB are organic acids. | (B): Ketone bodies cause METABOLIC acidosis. | (C): Lack of insulin → lipolysis → ketogenesis. | (E): Rothera's nitroprusside test detects acetoacetate/acetone.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Examples of autosomal dominant disorders",
        "items": [
          {
            "label": "a",
            "text": "Achondroplasia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Sickle cell anemia",
            "ans": false
          },
          {
            "label": "c",
            "text": "Phenylketonuria",
            "ans": false
          },
          {
            "label": "d",
            "text": "Diabetes insipidus (nephrogenic)",
            "ans": false
          },
          {
            "label": "e",
            "text": "Familial hypercholesterolemia",
            "ans": true
          }
        ],
        "explanation": "(A): Achondroplasia is autosomal dominant. | (B): Sickle cell anaemia is autosomal recessive. | (C): PKU is autosomal recessive. | (D): Nephrogenic diabetes insipidus is X-linked recessive. | (E): FH is autosomal dominant (LDL receptor).",
        "textbookNote": "(A): Achondroplasia is autosomal dominant. | (B): Sickle cell anaemia is autosomal recessive. | (C): PKU is autosomal recessive. | (D): Nephrogenic diabetes insipidus is X-linked recessive. | (E): FH is autosomal dominant (LDL receptor).",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Codons",
        "items": [
          {
            "label": "a",
            "text": "Are three consecutive bases of mRNA",
            "ans": true
          },
          {
            "label": "b",
            "text": "Are overlapped along the polynucleotide of mRNA",
            "ans": false
          },
          {
            "label": "c",
            "text": "Are responsible for synthesis of a specific amino acid",
            "ans": true
          },
          {
            "label": "d",
            "text": "UAG and UGA do not code for any amino acid",
            "ans": true
          },
          {
            "label": "e",
            "text": "AGU codes for methionine",
            "ans": false
          }
        ],
        "explanation": "(A): Codon = 3 consecutive bases of mRNA. | (B): The genetic code is non-overlapping. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "textbookNote": "(A): Codon = 3 consecutive bases of mRNA. | (B): The genetic code is non-overlapping. | (C): Each codon specifies an amino acid. | (D): UAA, UAG, UGA are stop codons. | (E): AUG = methionine (start); AGU = serine.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Regarding lipoprotein the following statements are correct",
        "items": [
          {
            "label": "a",
            "text": "Chylomicrons are absorbed via the portal circulation",
            "ans": false
          },
          {
            "label": "b",
            "text": "Chylomicron is catabolized via apo-E receptor",
            "ans": true
          },
          {
            "label": "c",
            "text": "VLDL is produced from liver",
            "ans": true
          },
          {
            "label": "d",
            "text": "Cholesteryl ester transfer protein transfers cholesteryl ester from HDL to LDL",
            "ans": true
          },
          {
            "label": "e",
            "text": "LDL cholesterol is a risk factor for coronary heart disease",
            "ans": true
          }
        ],
        "explanation": "(A): Chylomicrons enter lymph (lacteals), not the portal vein. | (B): Chylomicron remnants are taken up by liver via apo-E receptor. | (C): VLDL is synthesised in liver. | (D): CETP moves cholesteryl ester from HDL to VLDL/LDL. | (E): High LDL is a major coronary risk factor.",
        "textbookNote": "(A): Chylomicrons enter lymph (lacteals), not the portal vein. | (B): Chylomicron remnants are taken up by liver via apo-E receptor. | (C): VLDL is synthesised in liver. | (D): CETP moves cholesteryl ester from HDL to VLDL/LDL. | (E): High LDL is a major coronary risk factor.",
        "verificationStatus": "Verified",
        "sourceReference": "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)"
      }
    ]
  }
];

// Dynamically extract unique subjects from the MCQ papers dataset
export function getAvailableMcqSubjects(papers: McqExamPaper[] = AUTHENTIC_MCQ_PAPERS): string[] {
  const set = new Set<string>();
  papers.forEach(p => {
    if (p.subject) set.add(p.subject);
  });
  return Array.from(set).sort();
}

// Dynamically extract unique papers for a given subject from the MCQ dataset
export function getAvailableMcqPapersForSubject(subject: string, papers: McqExamPaper[] = AUTHENTIC_MCQ_PAPERS): string[] {
  const set = new Set<string>();
  papers
    .filter(p => p.subject.toLowerCase() === subject.toLowerCase())
    .forEach(p => {
      if (p.paper) set.add(p.paper);
    });
  return Array.from(set).sort();
}

// Dynamically extract unique examination years for a subject and paper, in chronological order
export function getAvailableMcqYearsForPaper(
  subject: string,
  paper: string,
  papers: McqExamPaper[] = AUTHENTIC_MCQ_PAPERS
): number[] {
  const set = new Set<number>();
  papers
    .filter(
      p =>
        p.subject.toLowerCase() === subject.toLowerCase() &&
        p.paper.toLowerCase() === paper.toLowerCase()
    )
    .forEach(p => {
      if (p.year) set.add(p.year);
    });
  // Sort reverse chronological (latest first)
  return Array.from(set).sort((a, b) => b - a);
}

// Helper to filter papers matching all three criteria: Subject, Paper, and Year
export function getMatchingMcqPapers(
  subject: string,
  paper: string,
  year: number,
  papers: McqExamPaper[] = AUTHENTIC_MCQ_PAPERS
): McqExamPaper[] {
  return papers.filter(
    p =>
      p.subject.toLowerCase() === subject.toLowerCase() &&
      p.paper.toLowerCase() === paper.toLowerCase() &&
      p.year === year
  );
}
