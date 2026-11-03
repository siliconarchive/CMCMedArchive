// Authentic Chittagong Medical University (CMU) First Professional MBBS Anatomy MCQ Examination Papers
// Current Authoritative Resource: Anatomy MCQ - Full Answer Script (CMU 1st Prof, 2021-2025)
// Source: Anatomy_Full_Answer_Script_96dcc01a.pdf (11 pages)
// Standard Textbook Verified Content (Snell, Gray's Anatomy, Moore, BD Chaurasia, Langman, Junqueira)

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
    "id": "cmu-2025-may-p1",
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
        "stem": "Following are fibrous joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Collagen fibers are abundant in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Spermatogenesis",
        "verificationStatus": "Provisional",
        "sourceReference": "Langman's Medical Embryology (14th Ed.), Chapter on Gametogenesis & Development",
        "reviewReason": "Option e: reduction division (meiosis) is one step inside it, not the name of the whole process.",
        "textbookNote": "Option e: reduction division (meiosis) is one step inside it, not the name of the whole process.",
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
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Middle ear communication with",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Extra pyramidal tracts are",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
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
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Limbic system includes",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Uniaxial joint is/are",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Middle cerebral artery supplies following area",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Central (lenticulostriate) branches supply basal ganglia and much of the internal capsule. Orbit's key differs; textbooks vary slightly.",
        "textbookNote": "Central (lenticulostriate) branches supply basal ganglia and much of the internal capsule. Orbit's key differs; textbooks vary slightly.",
        "items": [
          {
            "label": "a",
            "text": "Brocas area",
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
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Following is/are central lymphoid organ:",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Pterion is the meeting point of following bones",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Also includes greater wing of sphenoid.",
        "textbookNote": "Also includes greater wing of sphenoid.",
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
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Following are muscles of facial expression",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 1,
        "opts": [
          "Temporalis",
          "Buccinator",
          "Masseter",
          "Sternohyoid",
          "Omohyoid"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Following are parasympathetic nucleus",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks b (cochlear nucleus) - wrong.",
        "textbookNote": "Orbit marks b (cochlear nucleus) - wrong.",
        "correctIndex": 3,
        "opts": [
          "Vestibular nucleus",
          "Cochlear nucleus",
          "Red nucleus",
          "Edinger-Westphal nucleus",
          "Spinal nucleus"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Endocrine gland",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 1,
        "opts": [
          "Has duct",
          "Has rich blood supply",
          "Has rich nerve supply",
          "Secretes mucus fluid",
          "Secretes serous fluid"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Retina",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "As printed, a is false (pigment epithelium is the OUTERMOST layer). Orbit marks a, so the question probably meant 'outermost'.",
        "textbookNote": "As printed, a is false (pigment epithelium is the OUTERMOST layer). Orbit marks a, so the question probably meant 'outermost'.",
        "correctIndex": 2,
        "opts": [
          "Inner most layer contains pigment epithelium",
          "Bipolar cell form the optic nerve",
          "Blind spot has no photoreceptors",
          "Can regenerate",
          "Is avascular structure"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Cerebellum",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "correctIndex": 4,
        "opts": [
          "Parts of brain stem",
          "Controls opposite side of the body",
          "Directly controls the motor activity",
          "Arranged outer white matter and inner grey matter",
          "Connected with the brain stem"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Mast cells",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 0,
        "opts": [
          "Participate in allergic reaction",
          "Participate in phagocytosis",
          "Produce antibody",
          "Provide nutrition to epithelial tissue",
          "Synthesize ground substance"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Skeletal muscle fiber",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 2,
        "opts": [
          "Branching with intercalated discs",
          "Involuntary control with no striations",
          "Multinucleated fibers with striations",
          "Single central nucleus with no striations",
          "Spindle shaped fibers with central nuclei"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Mature neurons are",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 0,
        "opts": [
          "Permanent cell",
          "Undergo cell division",
          "Develops from all three germ layers",
          "Contain centriole",
          "Stable cell"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Nerve that pass through cavernous sinus is",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "correctIndex": 0,
        "opts": [
          "Abducent",
          "Optic",
          "Facial",
          "Vestibulocochlear",
          "Mandibular"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Following are basal nuclei",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 4,
        "opts": [
          "Medial geniculate body",
          "Pulvinar",
          "Red nucleus",
          "Amygdaloid nucleus",
          "Caudate nucleus"
        ]
      }
    ]
  },
  {
    "id": "cmu-2025-may-p2",
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
        "stem": "Female urinary bladder is supplied by following arteries",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "In females the vaginal artery replaces the inferior vesical artery.",
        "textbookNote": "In females the vaginal artery replaces the inferior vesical artery.",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Modifications of gastrointestinal mucosa are",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
            "text": "Plica circulares",
            "ans": true
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Lateral branches of abdominal aorta supplies",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Contents of adductor canal are",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "reviewReason": "Femoral artery, vein, saphenous nerve (and nerve to vastus medialis).",
        "textbookNote": "Femoral artery, vein, saphenous nerve (and nerve to vastus medialis).",
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
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Dorsiflexion of foot is done by following muscles",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "officialOrbitDiscrepancy": "Orbit marks EDL as F and flexor hallucis longus as T - wrong. FHL is a plantar flexor.",
        "textbookNote": "Orbit marks EDL as F and flexor hallucis longus as T - wrong. FHL is a plantar flexor.",
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
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Posterior wall of axilla is formed by",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "officialOrbitDiscrepancy": "Orbit marks subscapularis as F - wrong. Posterior wall: subscapularis, teres major, latissimus dorsi.",
        "textbookNote": "Orbit marks subscapularis as F - wrong. Posterior wall: subscapularis, teres major, latissimus dorsi.",
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
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Vena caval opening of diaphragm",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Orbit marks c T - wrong; the opening is widened (not closed) in inspiration. It lies at T8.",
        "textbookNote": "Orbit marks c T - wrong; the opening is widened (not closed) in inspiration. It lies at T8.",
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
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Intercostal nerves",
        "verificationStatus": "Provisional",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Chapter 3: Thorax",
        "reviewReason": "11 pairs (so 'in number' option a is F).",
        "textbookNote": "11 pairs (so 'in number' option a is F).",
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
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Conducting system of heart includes",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Chapter 3: Thorax",
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
            "text": "Musculo pectinate",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Muscle supplied by axillary nerve are",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "officialOrbitDiscrepancy": "Orbit marks teres major and coracobrachialis T - wrong (lower subscapular and musculocutaneous nerves).",
        "textbookNote": "Orbit marks teres major and coracobrachialis T - wrong (lower subscapular and musculocutaneous nerves).",
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
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "In which layer of abdominal wall, deep inguinal ring lies?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "External oblique aponeurosis",
          "Internal oblique aponeurosis",
          "Transversus abdominis aponeurosis",
          "Fascia transversalis",
          "Fascia iliaca"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Ligament preventing backward falling of trunk",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Orbit marks ischiofemoral. Standard texts (BD Chaurasia): iliofemoral (Y ligament) prevents the trunk falling backward.",
        "textbookNote": "Orbit marks ischiofemoral. Standard texts (BD Chaurasia): iliofemoral (Y ligament) prevents the trunk falling backward.",
        "correctIndex": 0,
        "opts": [
          "Iliofemoral ligament",
          "Ischiofemoral ligament",
          "Inguinal ligament",
          "Pubofemoral ligament",
          "Transverse acetabular ligament"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Which muscle connects vertebral column with lower limb?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "Biceps femoris",
          "Iliacus",
          "Rectus femoris",
          "Psoas major",
          "Quadratus lumborum"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "If urethral fold fails to fuse it leads to",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Epispadias",
          "Ectopic vesicae",
          "Hypospadias",
          "Rectovesical fistula",
          "Phimosis"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Which organ is completely covered by peritoneum?",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Except at the hilum.",
        "textbookNote": "Except at the hilum.",
        "correctIndex": 3,
        "opts": [
          "Kidney",
          "Pancreas",
          "Ascending colon",
          "Spleen",
          "Rectum"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Artery present in superior mediastinum is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "Ascending aorta",
          "Descending thoracic aorta",
          "Internal thoracic artery",
          "Left subclavian artery",
          "Pulmonary trunk"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Phrenic nerve supplies",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "reviewReason": "Visceral pleura and visceral pericardium are not supplied by it.",
        "textbookNote": "Visceral pleura and visceral pericardium are not supplied by it.",
        "correctIndex": 0,
        "opts": [
          "Diaphragm",
          "Heart",
          "Intercostal muscles",
          "Pulmonary pleura",
          "Visceral pericardium"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Vertebrosternal sets of ribs are",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Vertebrosternal ribs are 1-7; only option a lies fully within 1-7.",
        "textbookNote": "Vertebrosternal ribs are 1-7; only option a lies fully within 1-7.",
        "correctIndex": 0,
        "opts": [
          "1 to 7 (true ribs: 3, 4, 5)",
          "6, 7, 8",
          "7, 8, 9",
          "9, 10, 11",
          "10, 11, 12"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Submucous coat is absent in",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 0,
        "opts": [
          "Gall bladder",
          "Oesophagus",
          "Duodenum",
          "Vermiform appendix",
          "Ileum"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Multipennate muscle is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 4,
        "opts": [
          "Biceps brachii",
          "Brachialis",
          "Flexor digitorum profundus",
          "Pectoralis major",
          "Subscapularis"
        ]
      }
    ]
  },
  {
    "id": "cmu-2025-nov-p1",
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
        "stem": "Pterion is the meeting place of the following bones",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks zygomatic T and frontal F - wrong. Pterion = frontal, parietal, temporal, greater wing of sphenoid.",
        "textbookNote": "Orbit marks zygomatic T and frontal F - wrong. Pterion = frontal, parietal, temporal, greater wing of sphenoid.",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Simple columnar epithelium present in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Extra pyramidal tracts are",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
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
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Refractive media of eyeball",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Cornea (aqueous, lens, vitreous are the others).",
        "textbookNote": "Cornea (aqueous, lens, vitreous are the others).",
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
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Mitosis",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
            "text": "Produce two cells of same chromosome number",
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
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Derivatives of mesoderm",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Content of carotid sheath are",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Common/internal carotid artery, IJV, vagus. External carotid is outside the sheath. Orbit's key differs.",
        "textbookNote": "Common/internal carotid artery, IJV, vagus. External carotid is outside the sheath. Orbit's key differs.",
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
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Following is/are purely motor cranial nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
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
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Following is/are central lymphoid organ",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Deep cerebellar nuclei are",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
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
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Hard palate is formed by the following bone",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 2,
        "opts": [
          "Ethmoid",
          "Frontal",
          "Maxilla",
          "Zygomatic",
          "Lacrimal"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Muscle that opens laryngeal inlet is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 4,
        "opts": [
          "Aryepiglottic",
          "Cricothyroid",
          "Oblique arytenoid",
          "Thyroarytenoid",
          "Thyroepiglottic"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Following are parasympathetic nucleus",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Nucleus ambiguus is branchial motor; mesencephalic nucleus is sensory. nucleus)",
        "textbookNote": "Nucleus ambiguus is branchial motor; mesencephalic nucleus is sensory. nucleus)",
        "correctIndex": 4,
        "opts": [
          "Nucleus ambiguus",
          "Vestibular",
          "Mesencephalic",
          "Red",
          "Spinal"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Which one of the following is the effect of sympathetic system?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Bronchoconstriction",
          "Cardio inhibition",
          "Coronary vasoconstriction",
          "Decrease peristalsis",
          "Decrease sweating"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Reticular fiber found in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 2,
        "opts": [
          "Bone",
          "Tendon",
          "Lymphoid organ",
          "Cartilage",
          "Muscle"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Epithelial tissue",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 0,
        "opts": [
          "Is avascular",
          "Develops from ectoderm only",
          "Intercellular substance is maximum",
          "Has nerve supply",
          "Consists of cell, fiber and ground substance"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Principle muscle of mastication is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Buccinator",
          "Digastric",
          "Geniohyoid",
          "Masseter",
          "Mylohyoid"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Cell present in the lacuna of haversian system is",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 4,
        "opts": [
          "Chondroblast",
          "Osteoblast",
          "Osteoclast",
          "Osteoprogenitor",
          "Osteocyte"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Nerve that pass through cavernous sinus is",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "correctIndex": 0,
        "opts": [
          "Abducent",
          "Occulomotor",
          "Optic",
          "Ophthalmic",
          "Trochlear"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Following layer of scalp is known as safety valve haematoma",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 2,
        "opts": [
          "Aponeurosis",
          "Connective tissue",
          "Loose areolar tissue",
          "Pericranium",
          "Skin"
        ]
      }
    ]
  },
  {
    "id": "cmu-2025-nov-p2",
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
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Parietal pleura",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Abduction of Shoulder joint is done by following muscles",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Serratus anterior (with trapezius) rotates the scapula for abduction beyond 90 degrees. Orbit marks e F - debated.",
        "textbookNote": "Serratus anterior (with trapezius) rotates the scapula for abduction beyond 90 degrees. Orbit marks e F - debated.",
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
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Tributaries of coronary sinus :",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Retroperitoneal organs",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Mediastinal surface of right lung related to",
        "verificationStatus": "Needs Review",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Chapter 3: Thorax",
        "officialOrbitDiscrepancy": "Right phrenic nerve lies on the mediastinal pleura but is not a groove/impression. Orbit also F.",
        "textbookNote": "Right phrenic nerve lies on the mediastinal pleura but is not a groove/impression. Orbit also F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Mediastinal surface of right lung related to",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Mediastinal surface of right lung related to",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Mediastinal surface of right lung related to",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Mediastinal surface of right lung related to",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Mediastinal surface of right lung related to",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Content of spermatic cord",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Content of spermatic cord",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Content of spermatic cord",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Content of spermatic cord",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Content of spermatic cord",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Content of spermatic cord",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Supplied by superior gluteal nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Supplied by superior gluteal nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Supplied by superior gluteal nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Supplied by superior gluteal nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Supplied by superior gluteal nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Supplied by superior gluteal nerve",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Submucosal glands present in",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Oesophageal glands proper lie in the submucosa (Junqueira). Orbit marks a F.",
        "textbookNote": "Oesophageal glands proper lie in the submucosa (Junqueira). Orbit marks a F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Submucosal glands present in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Submucosal glands present in",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Submucosal glands present in",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Submucosal glands present in",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Submucosal glands present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Derivatives of hindgut",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivatives of hindgut",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivatives of hindgut",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivatives of hindgut",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivatives of hindgut",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivatives of hindgut",
            "ans": true
          }
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Winging of the scapula caused by paralysis of",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 4,
        "opts": [
          "Subclavius Muscle",
          "Supraspinatus",
          "Infraspinatus",
          "Teres Minor",
          "Serratus Anterior"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Which ligament of the liver is the remnant of the umbilical vein?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Falciform ligament",
          "Coronary ligament",
          "Ligamentum teres hepatis",
          "Ligamentum venosum",
          "Triangular ligament"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Branch arising from roots of brachial plexus",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "Median Nerve",
          "Radial nerve",
          "Ulnar nerve",
          "Long thoracic nerve",
          "Axillary nerve"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Which diameter of thoracic cavity increased by pump handle movement?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Oblique diameter",
          "Anterior posterior diameter",
          "Transverse diameter",
          "Vertical diameter",
          "All diameter"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Strongest ligament of hip joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Ischiofemoral ligament",
          "Capsular ligament",
          "Iliofemoral ligament",
          "Pubofemoral ligament",
          "Ligamentum teres femoris"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Conducting system of heart supplied by left coronary artery",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Weak question: SA node is from RCA in about 60%, left coronary in about 40%. b is the best option here.",
        "textbookNote": "Weak question: SA node is from RCA in about 60%, left coronary in about 40%. b is the best option here.",
        "correctIndex": 1,
        "opts": [
          "AV node",
          "SA node",
          "Purkinje fibers",
          "Left branch of AV bundle",
          "Right branch of AV bundle"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Viscera to which right kidney is related",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "Pancreas",
          "Spleen",
          "Stomach",
          "Liver",
          "3rd part of duodenum"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Which muscle forms the inguinal ligament?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Iliacus muscle",
          "External Oblique muscle",
          "Transversus abdominis muscle",
          "Internal oblique muscle",
          "Rectus abdominis"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Primary support of uterus",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 0,
        "opts": [
          "Pelvic Diaphragm",
          "Broad ligament",
          "Uterovesical fold of peritoneum",
          "Rectovaginal fold of peritoneum",
          "Rectum"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Keystone of medial longitudinal arch of foot",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "Calcaneus",
          "Navicular",
          "Medial cuneiform",
          "Talus",
          "1st metatarsal"
        ]
      }
    ]
  },
  {
    "id": "cmu-2024-may-p1",
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
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Reticular fiber found in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Skeletal muscle fiber",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Orbit marks e F; limb and trunk skeletal muscle arises from somites (paraxial mesoderm).",
        "textbookNote": "Orbit marks e F; limb and trunk skeletal muscle arises from somites (paraxial mesoderm).",
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
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Structural abnormalities of chromosome",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Ring chromosome is structural; Orbit marks it F. Turner and trisomy are numerical.",
        "textbookNote": "Ring chromosome is structural; Orbit marks it F. Turner and trisomy are numerical.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structural abnormalities of chromosome",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Structural abnormalities of chromosome",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structural abnormalities of chromosome",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structural abnormalities of chromosome",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structural abnormalities of chromosome",
            "ans": false
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Fibrous joints",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Fibrous joints",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Fibrous joints",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Fibrous joints",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Fibrous joints",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Fibrous joints",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Commissural fibers",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Commissural fibers",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Commissural fibers",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Commissural fibers",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Commissural fibers",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Commissural fibers",
            "ans": true
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Nasopharynx communicates with",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks b F, but it communicates with the middle ear via the auditory tube.",
        "textbookNote": "Orbit marks b F, but it communicates with the middle ear via the auditory tube.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Nasopharynx communicates with",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Nasopharynx communicates with",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Nasopharynx communicates with",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Nasopharynx communicates with",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Nasopharynx communicates with",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Extrapyramidal tracts",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Extrapyramidal tracts",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Extrapyramidal tracts",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Extrapyramidal tracts",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Extrapyramidal tracts",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Extrapyramidal tracts",
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Endodermal derivatives",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Endodermal derivatives",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Endodermal derivatives",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Endodermal derivatives",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Endodermal derivatives",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Endodermal derivatives",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Nasal septum formed by",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Nasal septum formed by",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Nasal septum formed by",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Nasal septum formed by",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Nasal septum formed by",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Nasal septum formed by",
            "ans": true
          }
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Avascular structure in the eyeball is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 1,
        "opts": [
          "Retina",
          "Lens",
          "Sclera",
          "Iris",
          "Choroid"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Wall of artery is thicker than vein is due to",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 4,
        "opts": [
          "Absence of valve",
          "Presence of internal & external elastic lamina",
          "Presence of oxygenated blood",
          "Presence of vasa vasorum",
          "Well developed tunica media"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Descending tract",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "correctIndex": 3,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Tectospinal",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Which one of the following is the effect of sympathetic system?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Bronchoconstriction",
          "Cardio inhibition",
          "Coronary vasoconstriction",
          "Decrease peristalsis",
          "Decrease sweating"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Nissl's granules are present in",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 4,
        "opts": [
          "Ependymal cell",
          "Microglia",
          "Oligodendrocyte",
          "Protoplasmic astrocyte",
          "Pyramidal cell"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Parasympathetic fibers present in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 1,
        "opts": [
          "Optic nerve",
          "Oculomotor nerve",
          "Trigeminal nerve",
          "Accessory nerve",
          "Hypoglossal nerve"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Hard palate is formed by the following bone",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 2,
        "opts": [
          "Ethmoid",
          "Frontal",
          "Maxilla",
          "Zygomatic",
          "Lacrimal"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Cell present in the lacuna of haversian system is",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 4,
        "opts": [
          "Chondroblast",
          "Osteoblast",
          "Osteoclast",
          "Osteoprogenitor",
          "Osteocyte"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Following are multipolar neuron",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 1,
        "opts": [
          "Olfactory cell",
          "Purkinje cell",
          "Dorsal root ganglia",
          "Trigeminal ganglia",
          "Vestibular ganglion"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Derivatives of pharyngeal pouch",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.), Chapter on Gametogenesis & Development",
        "correctIndex": 1,
        "opts": [
          "Thyroid gland",
          "Thymus",
          "Parotid gland",
          "External auditory meatus",
          "Ear ossicles"
        ]
      }
    ]
  },
  {
    "id": "cmu-2024-may-p2",
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
        "stem": "Structure crossed by the root of the mesentery",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Root crosses 3rd part of duodenum, aorta, IVC, right ureter, right psoas major. Orbit marks b F.",
        "textbookNote": "Root crosses 3rd part of duodenum, aorta, IVC, right ureter, right psoas major. Orbit marks b F.",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Veins end into coronary sinus are",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
            "text": "Venae cordis minimis",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Respiratory zone of bronchial tree",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Begins at respiratory bronchiole; alveolar capillaries come from the pulmonary artery. Weakly worded question.",
        "textbookNote": "Begins at respiratory bronchiole; alveolar capillaries come from the pulmonary artery. Weakly worded question.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Respiratory zone of bronchial tree",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Respiratory zone of bronchial tree",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Respiratory zone of bronchial tree",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Respiratory zone of bronchial tree",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Respiratory zone of bronchial tree",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Flexor of elbow joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Flexor of elbow joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Flexor of elbow joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Flexor of elbow joint",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Flexor of elbow joint",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Flexor of elbow joint",
            "ans": false
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Nerve related to humerus",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "officialOrbitDiscrepancy": "Ulnar nerve touches the back of the medial epicondyle. Orbit's key differs (marks e T).",
        "textbookNote": "Ulnar nerve touches the back of the medial epicondyle. Orbit's key differs (marks e T).",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Nerve related to humerus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Nerve related to humerus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Nerve related to humerus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Nerve related to humerus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Nerve related to humerus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Quadriceps femoris",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Quadriceps femoris",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Quadriceps femoris",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Quadriceps femoris",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Quadriceps femoris",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Quadriceps femoris",
            "ans": true
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Histological features of duodenum",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Histological features of duodenum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Histological features of duodenum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Histological features of duodenum",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Histological features of duodenum",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Histological features of duodenum",
            "ans": true
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Contents of rectus sheath",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Contents of rectus sheath",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Contents of rectus sheath",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Contents of rectus sheath",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Contents of rectus sheath",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Contents of rectus sheath",
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Ureter",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Ureter develops from the ureteric bud (mesoderm), not endoderm; it has three constrictions; lined by transitional epithelium. Orbit marks c T.",
        "textbookNote": "Ureter develops from the ureteric bud (mesoderm), not endoderm; it has three constrictions; lined by transitional epithelium. Orbit marks c T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Ureter",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Ureter",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Ureter",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Ureter",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Ureter",
            "ans": true
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Femoral artery",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Femoral artery",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Femoral artery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Femoral artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Femoral artery",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Femoral artery",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "The groove behind the hilum of right lung lodges",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Chapter 3: Thorax",
        "correctIndex": 3,
        "opts": [
          "Descending thoracic aorta",
          "Azygos vein",
          "Superior pulmonary vein",
          "Esophagus",
          "Trachea"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Most common position of vermiform appendix",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Retro-ileal",
          "Retro-caecal",
          "Pelvic",
          "Anterior to terminal ileum",
          "Subcaecal"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "The most common site of fracture of the clavicle",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "Medial end",
          "Lateral end",
          "Midpoint",
          "Junction of the medial two third & lateral one third",
          "Junction of the lateral two third & medial one third"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "The transpyloric plane of the abdomen passes through",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "The spleen",
          "The third part of the duodenum",
          "The tail of the pancreas",
          "The origin of the superior mesenteric artery",
          "The neck of the gallbladder"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "In structure of hepatic lobule",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Hepatic lamina extends from periphery to center",
          "Central vein has Kupffer cells in its wall",
          "Portal triad lies at the corners of lobule",
          "Sinusoids lie between two adjacent lobules",
          "Is based on oxygenation of liver parenchyma"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Lymphatics from the nipple and areola drain mainly into",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 0,
        "opts": [
          "Pectoral group of axillary lymph node",
          "Subscapular group of axillary lymph node",
          "Central group of axillary lymph node",
          "Apical group of axillary lymph node",
          "Parasternal lymph group"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "The back of the medial epicondyle of humerus related to",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Radial nerve",
          "Axillary nerve",
          "Ulnar nerve",
          "Median nerve",
          "None of the above"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Paralysis of which nerve causes foot drop",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "reviewReason": "Common peroneal nerve injury is the classic cause; of the options, deep peroneal.",
        "textbookNote": "Common peroneal nerve injury is the classic cause; of the options, deep peroneal.",
        "correctIndex": 3,
        "opts": [
          "Femoral",
          "Tibial",
          "Superficial peroneal",
          "Deep peroneal",
          "Obturator"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Pleural reflection lies at which rib level in the mid axillary line?",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "reviewReason": "Pleura: 8th rib (midclavicular), 10th (midaxillary), 12th (paravertebral).",
        "textbookNote": "Pleura: 8th rib (midclavicular), 10th (midaxillary), 12th (paravertebral).",
        "correctIndex": 3,
        "opts": [
          "6th",
          "8th",
          "9th",
          "10th",
          "12th"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Anterior relation of sacroiliac joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Femoral nerve",
          "Sciatic nerve",
          "Obturator nerve",
          "Round ligament",
          "Ureter"
        ]
      }
    ]
  },
  {
    "id": "cmu-2024-nov-p1",
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
        "stem": "Following are paired dural venous sinuses",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Cavernous sinus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Occipital sinus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Straight sinus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Superior sagittal sinus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Transverse sinus",
            "ans": true
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Following are avascular structure",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks dermis T - wrong, the dermis is vascular.",
        "textbookNote": "Orbit marks dermis T - wrong, the dermis is vascular.",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Hyaline cartilage present in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hyaline cartilage present in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Hyaline cartilage present in",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Hyaline cartilage present in",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Hyaline cartilage present in",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Hyaline cartilage present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Peripheral lymphoid organ",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "The spleen is a peripheral lymphoid organ; Orbit marks it F.",
        "textbookNote": "The spleen is a peripheral lymphoid organ; Orbit marks it F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Peripheral lymphoid organ",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Peripheral lymphoid organ",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Peripheral lymphoid organ",
            "ans": true
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Hard palate formed by",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hard palate formed by",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Hard palate formed by",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Hard palate formed by",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Hard palate formed by",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Hard palate formed by",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Hind brain includes",
        "verificationStatus": "Needs Review",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "officialOrbitDiscrepancy": "Pons belongs to the hindbrain; Orbit marks it F.",
        "textbookNote": "Pons belongs to the hindbrain; Orbit marks it F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hind brain includes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Hind brain includes",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Hind brain includes",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Hind brain includes",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Hind brain includes",
            "ans": true
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Superior orbital fissure transmits",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Superior orbital fissure transmits",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Superior orbital fissure transmits",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Superior orbital fissure transmits",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Superior orbital fissure transmits",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Superior orbital fissure transmits",
            "ans": true
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Spinal cord",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Spinal cord",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Spinal cord",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Spinal cord",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Spinal cord",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Spinal cord",
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Meiosis cell division",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Meiosis occurs in primary spermatocytes/oocytes (immature germ cells); mature gametes do not divide. Orbit marks a T, b F - I disagree.",
        "textbookNote": "Meiosis occurs in primary spermatocytes/oocytes (immature germ cells); mature gametes do not divide. Orbit marks a T, b F - I disagree.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Meiosis cell division",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Meiosis cell division",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Meiosis cell division",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Meiosis cell division",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Meiosis cell division",
            "ans": true
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Deep cerebellar nucleus",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Deep cerebellar nucleus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Deep cerebellar nucleus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Deep cerebellar nucleus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Deep cerebellar nucleus",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Deep cerebellar nucleus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Safety muscle of tongue",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 1,
        "opts": [
          "Palatoglossus",
          "Genioglossus",
          "Hyoglossus",
          "Styloglossus",
          "Geniohyoid"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Muscle that open laryngeal inlet is:",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 4,
        "opts": [
          "Aryepiglottic",
          "Cricothyroid",
          "Oblique arytenoid",
          "Thyroarytenoid",
          "Thyroepiglottic"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Parasympathetic nucleus",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 0,
        "opts": [
          "Dorsal nucleus (dorsal motor nucleus of vagus)",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Effect of sympathetic system",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Decrease peristalsis",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Following are bipolar neuron",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 2,
        "opts": [
          "Pyramidal cell",
          "Purkinje cell",
          "Olfactory cell",
          "Anterior horn cell",
          "Stellate cell"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Basal nuclei",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Amygdaloid nucleus",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Principal muscle of mastication is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Buccinator",
          "Digastric",
          "Geniohyoid",
          "Masseter",
          "Mylohyoid"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Cell in lacuna of Haversian system",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 4,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Osteocyte"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Primary cartilaginous joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Public symphysis",
          "Sacroiliac joint",
          "Lumbosacral joint",
          "First sternocostal joint",
          "Temporomandibular"
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Characteristics of epithelium tissue",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Characteristics of epithelium tissue",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Characteristics of epithelium tissue",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Characteristics of epithelium tissue",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Characteristics of epithelium tissue",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Characteristics of epithelium tissue",
            "ans": false
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2024-nov-p2",
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
        "stem": "Opening of right atrium of heart are",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Carpal tunnel contains the followings",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Great saphenous vein",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "It begins on the MEDIAL side of the foot, has valves, and passes in FRONT of the medial malleolus (Orbit marks e T).",
        "textbookNote": "It begins on the MEDIAL side of the foot, has valves, and passes in FRONT of the medial malleolus (Orbit marks e T).",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Great saphenous vein",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Great saphenous vein",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Great saphenous vein",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Great saphenous vein",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Great saphenous vein",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Superior vena cava",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "SVC is formed by the right and left BRACHIOCEPHALIC veins.",
        "textbookNote": "SVC is formed by the right and left BRACHIOCEPHALIC veins.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Superior vena cava",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Superior vena cava",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Superior vena cava",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Superior vena cava",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Superior vena cava",
            "ans": true
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Alveoli",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Alveoli",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Alveoli",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Alveoli",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Alveoli",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Alveoli",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Muscles that dorsiflex the foot",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles that dorsiflex the foot",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles that dorsiflex the foot",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles that dorsiflex the foot",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles that dorsiflex the foot",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles that dorsiflex the foot",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Intracapsular structure of knee",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Popliteus tendon is intracapsular but extrasynovial. Orbit's key varies between years for the synovial membrane.",
        "textbookNote": "Popliteus tendon is intracapsular but extrasynovial. Orbit's key varies between years for the synovial membrane.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Intracapsular structure of knee",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Intracapsular structure of knee",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Intracapsular structure of knee",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Intracapsular structure of knee",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Intracapsular structure of knee",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Extra-hepatic biliary apparatus",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Extra-hepatic biliary apparatus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Extra-hepatic biliary apparatus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Extra-hepatic biliary apparatus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Extra-hepatic biliary apparatus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Extra-hepatic biliary apparatus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Pancreas",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Alpha cells secrete glucagon (beta cells secrete insulin). Pancreas is mostly retroperitoneal.",
        "textbookNote": "Alpha cells secrete glucagon (beta cells secrete insulin). Pancreas is mostly retroperitoneal.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Pancreas",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Pancreas",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Pancreas",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Pancreas",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Pancreas",
            "ans": true
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Anterior compartment of leg",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Flexor digitorum longus is in the posterior compartment; Orbit marks c T.",
        "textbookNote": "Flexor digitorum longus is in the posterior compartment; Orbit marks c T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Anterior compartment of leg",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Anterior compartment of leg",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Anterior compartment of leg",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Anterior compartment of leg",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Anterior compartment of leg",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Strongest ligament of upper limb",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Costoclavicular ligament",
          "Coracoclavicular ligament",
          "Suprascapular ligament",
          "Glenohumeral ligament",
          "Transverse humeral ligament"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Strong supinator of forearm",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Supinator",
          "Biceps brachii",
          "Brachioradialis",
          "Brachialis",
          "Coracobrachialis"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Jejunum and ileum develop from",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Foregut",
          "Midgut",
          "Hind gut",
          "Cloaca",
          "Pharyngeal gut"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Parietal pleura",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Alternative anatomical distractor 1",
          "Pain sensitive",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Which is not a content of femoral sheath",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "correctIndex": 3,
        "opts": [
          "Femoral artery",
          "Femoral vein",
          "Femoral branch of genitofemoral nerve",
          "Femoral nerve",
          "Lymph node of Cloquet"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Transpyloric plane passes through",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "The plane lies at L1 (some texts say lower L1/upper L2); L1-L2 is the closest option.",
        "textbookNote": "The plane lies at L1 (some texts say lower L1/upper L2); L1-L2 is the closest option.",
        "correctIndex": 1,
        "opts": [
          "Alternative anatomical distractor 1",
          "L1-L2",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Referred pain of cholecystitis felt in",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Tip of ninth costal cartilage",
          "Around umbilicus",
          "Tip of right shoulder",
          "Right iliac fossa",
          "Epigastrium"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "The least dilatable part of the urethra is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Pre-prostatic",
          "Prostatic",
          "Membranous",
          "Spongy",
          "Penile"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Failure of testis to descend into the scrotum is called",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Hypospadias",
          "Cryptorchidism",
          "Epispadias",
          "Varicocele",
          "Ectopic testis"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "Structure crossing floor of ovarian fossa",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Obturator nerve",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      }
    ]
  },
  {
    "id": "cmu-2023-may-p1",
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
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Ribosome is non-membranous; Orbit marks e T.",
        "textbookNote": "Ribosome is non-membranous; Orbit marks e T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Membranous organelles",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Membranous organelles",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Membranous organelles",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Membranous organelles",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Membranous organelles",
            "ans": false
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Mitotic cell division occurs in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Mitotic cell division occurs in",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Mitotic cell division occurs in",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Mitotic cell division occurs in",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Mitotic cell division occurs in",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Mitotic cell division occurs in",
            "ans": true
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Simple squamous epithelium present in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Simple squamous epithelium present in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Simple squamous epithelium present in",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Simple squamous epithelium present in",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Simple squamous epithelium present in",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Simple squamous epithelium present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Surface ectodermal derivatives",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Surface ectodermal derivatives",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Surface ectodermal derivatives",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Surface ectodermal derivatives",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Surface ectodermal derivatives",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Surface ectodermal derivatives",
            "ans": false
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Elastic cartilage present in",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "reviewReason": "Auditory tube cartilage: textbooks vary; epiglottis is certain.",
        "textbookNote": "Auditory tube cartilage: textbooks vary; epiglottis is certain.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Elastic cartilage present in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Elastic cartilage present in",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Elastic cartilage present in",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Elastic cartilage present in",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Elastic cartilage present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Secondary cartilaginous joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Secondary cartilaginous joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Secondary cartilaginous joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Secondary cartilaginous joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Secondary cartilaginous joint",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Secondary cartilaginous joint",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Avascular structures",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Avascular structures",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Avascular structures",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Avascular structures",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Avascular structures",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Avascular structures",
            "ans": true
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Surface modifications of cell",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "reviewReason": "Villi and papillae are tissue-level, not cell-level, modifications.",
        "textbookNote": "Villi and papillae are tissue-level, not cell-level, modifications.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Surface modifications of cell",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Surface modifications of cell",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Surface modifications of cell",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Surface modifications of cell",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Surface modifications of cell",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Peripheral lymphoid organ",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Peripheral lymphoid organ",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Peripheral lymphoid organ",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Connective tissue cell",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Connective tissue cell",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Connective tissue cell",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Connective tissue cell",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Connective tissue cell",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Connective tissue cell",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Jugular foramen transmits",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Also accessory nerve.",
        "textbookNote": "Also accessory nerve.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Jugular foramen transmits",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Jugular foramen transmits",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Jugular foramen transmits",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Jugular foramen transmits",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Jugular foramen transmits",
            "ans": true
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Muscles of mastication",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles of mastication",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles of mastication",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles of mastication",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles of mastication",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles of mastication",
            "ans": false
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Motor cranial nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Motor cranial nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Motor cranial nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Motor cranial nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Motor cranial nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Motor cranial nerve",
            "ans": false
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Derivatives of 2nd pharyngeal arch",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.), Chapter on Gametogenesis & Development",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivatives of 2nd pharyngeal arch",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivatives of 2nd pharyngeal arch",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivatives of 2nd pharyngeal arch",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivatives of 2nd pharyngeal arch",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivatives of 2nd pharyngeal arch",
            "ans": false
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Parotid gland",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "It is an exocrine gland and is enclosed by parotid fascia; the duct opens in the vestibule opposite the upper 2nd molar. Orbit marks b F, c T, d T.",
        "textbookNote": "It is an exocrine gland and is enclosed by parotid fascia; the duct opens in the vestibule opposite the upper 2nd molar. Orbit marks b F, c T, d T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Parotid gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Parotid gland",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Parotid gland",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Parotid gland",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Parotid gland",
            "ans": true
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Hind brain formed by",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hind brain formed by",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Hind brain formed by",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Hind brain formed by",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Hind brain formed by",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Hind brain formed by",
            "ans": false
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Basal ganglia includes",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Basal ganglia includes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Basal ganglia includes",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Basal ganglia includes",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Basal ganglia includes",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Basal ganglia includes",
            "ans": true
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Deep cerebellar nuclei",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Deep cerebellar nuclei",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Deep cerebellar nuclei",
            "ans": false
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Occipital lobe of cerebrum",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "It lies above (not below) the tentorium cerebelli.",
        "textbookNote": "It lies above (not below) the tentorium cerebelli.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Occipital lobe of cerebrum",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Occipital lobe of cerebrum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Occipital lobe of cerebrum",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Occipital lobe of cerebrum",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Occipital lobe of cerebrum",
            "ans": true
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Refractive media of eyeball",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Refractive media of eyeball",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Refractive media of eyeball",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Refractive media of eyeball",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Refractive media of eyeball",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Refractive media of eyeball",
            "ans": true
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2023-nov-p1",
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
        "stem": "Muscles of soft palate are",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Tensor tympani belongs to the middle ear. Orbit marks d T and e F.",
        "textbookNote": "Tensor tympani belongs to the middle ear. Orbit marks d T and e F.",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Simple squamous epithelium present in",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Peritoneum = mesothelium (simple squamous); Orbit marks it F.",
        "textbookNote": "Peritoneum = mesothelium (simple squamous); Orbit marks it F.",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Superior orbital fissure transmits",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "The optic nerve passes through the optic canal; Orbit marks d T.",
        "textbookNote": "The optic nerve passes through the optic canal; Orbit marks d T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Superior orbital fissure transmits",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Superior orbital fissure transmits",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Superior orbital fissure transmits",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Superior orbital fissure transmits",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Superior orbital fissure transmits",
            "ans": true
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Derivative of neural crest cell",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivative of neural crest cell",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivative of neural crest cell",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivative of neural crest cell",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivative of neural crest cell",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivative of neural crest cell",
            "ans": true
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Miniature long bone",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Miniature long bone",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Miniature long bone",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Miniature long bone",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Miniature long bone",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Miniature long bone",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Derivatives of pharyngeal pouches",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.), Chapter on Gametogenesis & Development",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivatives of pharyngeal pouches",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivatives of pharyngeal pouches",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivatives of pharyngeal pouches",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivatives of pharyngeal pouches",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivatives of pharyngeal pouches",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Part of basal ganglia",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Dentate nucleus is cerebellar; Orbit marks it T.",
        "textbookNote": "Dentate nucleus is cerebellar; Orbit marks it T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Part of basal ganglia",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Part of basal ganglia",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Part of basal ganglia",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Part of basal ganglia",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Part of basal ganglia",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Sensory cranial nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Sensory cranial nerve",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Sensory cranial nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Sensory cranial nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Sensory cranial nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Sensory cranial nerve",
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Structures within parotid gland",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Glossopharyngeal fibers reach the gland via lesser petrosal - otic ganglion - auriculotemporal nerve; the nerve itself is not within the gland.",
        "textbookNote": "Glossopharyngeal fibers reach the gland via lesser petrosal - otic ganglion - auriculotemporal nerve; the nerve itself is not within the gland.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures within parotid gland",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures within parotid gland",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures within parotid gland",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures within parotid gland",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures within parotid gland",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Visual pathway formed by",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Medial geniculate body is auditory (lateral geniculate is visual). Cornea is not part of the pathway proper; Orbit marks it T.",
        "textbookNote": "Medial geniculate body is auditory (lateral geniculate is visual). Cornea is not part of the pathway proper; Orbit marks it T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Visual pathway formed by",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Visual pathway formed by",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Visual pathway formed by",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Visual pathway formed by",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Visual pathway formed by",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Extra ocular muscle supplied by Abducent nerve is",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "correctIndex": 3,
        "opts": [
          "Inferior rectus",
          "Inferior oblique",
          "Medial rectus",
          "Lateral rectus",
          "Superior oblique"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Nucleus of paleocerebellum",
        "verificationStatus": "Needs Review",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "officialOrbitDiscrepancy": "Paleocerebellum (spinocerebellum) -> globose + emboliform; fastigial -> archicerebellum. Orbit marks c.",
        "textbookNote": "Paleocerebellum (spinocerebellum) -> globose + emboliform; fastigial -> archicerebellum. Orbit marks c.",
        "correctIndex": 4,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Globose and emboliform"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Laryngeal cartilage made of both hyaline and elastic",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "reviewReason": "Arytenoid: base hyaline, apex elastic. Epiglottis is elastic only.",
        "textbookNote": "Arytenoid: base hyaline, apex elastic. Epiglottis is elastic only.",
        "correctIndex": 0,
        "opts": [
          "Arytenoid",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Betz cell or large pyramidal cell of cerebral cortex present in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "correctIndex": 3,
        "opts": [
          "External granular layer",
          "External pyramidal layer",
          "Internal granular layer",
          "Internal pyramidal layer",
          "Multiform layer"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Terminal branch of internal carotid artery",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Middle cerebral is the other terminal branch.",
        "textbookNote": "Middle cerebral is the other terminal branch.",
        "correctIndex": 1,
        "opts": [
          "Alternative anatomical distractor 1",
          "Anterior cerebral artery",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Pseudounipolar neuron located at",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Trigeminal ganglion cells are also pseudounipolar, so b is arguable; c is the textbook example.",
        "textbookNote": "Trigeminal ganglion cells are also pseudounipolar, so b is arguable; c is the textbook example.",
        "correctIndex": 2,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Dorsal root ganglion",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Posterior neuropore is closed at",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Langman: anterior neuropore ~day 25, posterior ~day 27-28. Orbit marks 25th day.",
        "textbookNote": "Langman: anterior neuropore ~day 25, posterior ~day 27-28. Orbit marks 25th day.",
        "correctIndex": 4,
        "opts": [
          "15 day",
          "20 day",
          "22th day",
          "25th day",
          "28th day"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "Safety muscle of larynx is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 3,
        "opts": [
          "Aryepiglotticus",
          "Lateral cricoarytenoid",
          "Oblique arytenoid",
          "Posterior cricoarytenoid",
          "Thyroarytenoid"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Unique feature of cervical vertebra",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 1,
        "opts": [
          "Alternative anatomical distractor 1",
          "Foramen transversarium",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "DNA replication occurs in",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "correctIndex": 4,
        "opts": [
          "Alternative anatomical distractor 1",
          "Alternative anatomical distractor 2",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "S phase"
        ]
      }
    ]
  },
  {
    "id": "cmu-2023-nov-p2",
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
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Printed 'pulmonary nerve'; if 'pulmonary trunk' was meant, it is also T.",
        "textbookNote": "Printed 'pulmonary nerve'; if 'pulmonary trunk' was meant, it is also T.",
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
            "text": "Pulmonary nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Vagus nerve",
            "ans": false
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Carpal tunnel transmits",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Palmaris longus passes superficial to the flexor retinaculum.",
        "textbookNote": "Palmaris longus passes superficial to the flexor retinaculum.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Carpal tunnel transmits",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Carpal tunnel transmits",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Carpal tunnel transmits",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Carpal tunnel transmits",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Carpal tunnel transmits",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Anterior relations of right kidney",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Anterior relations of right kidney",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Anterior relations of right kidney",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Anterior relations of right kidney",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Anterior relations of right kidney",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Anterior relations of right kidney",
            "ans": true
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Muscles acting on both hip and knee",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles acting on both hip and knee",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles acting on both hip and knee",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles acting on both hip and knee",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles acting on both hip and knee",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles acting on both hip and knee",
            "ans": false
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Left coronary artery (left posterior aortic sinus)",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Orbit's key differs on c.",
        "textbookNote": "Orbit's key differs on c.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Left coronary artery (left posterior aortic sinus)",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Left coronary artery (left posterior aortic sinus)",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Left coronary artery (left posterior aortic sinus)",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Left coronary artery (left posterior aortic sinus)",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Left coronary artery (left posterior aortic sinus)",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Muscles crossing shoulder joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles crossing shoulder joint",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles crossing shoulder joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles crossing shoulder joint",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles crossing shoulder joint",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles crossing shoulder joint",
            "ans": true
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Pancreas",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Alpha cells secrete glucagon, so d is F.",
        "textbookNote": "Alpha cells secrete glucagon, so d is F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Pancreas",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Pancreas",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Pancreas",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Pancreas",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Pancreas",
            "ans": true
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Parts of uterine tube",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Parts of uterine tube",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Parts of uterine tube",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Parts of uterine tube",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Parts of uterine tube",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Parts of uterine tube",
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Structures crossed by root of mesentery",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures crossed by root of mesentery",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures crossed by root of mesentery",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Opening of right atrium",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Opening of right atrium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Opening of right atrium",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Opening of right atrium",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Opening of right atrium",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Opening of right atrium",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "SBA",
        "stem": "Structure passing through venacaval opening",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Superior vena cava",
          "Inferior vena cava",
          "Thoracic duct",
          "Gastric nerve",
          "Azygos vein"
        ]
      },
      {
        "qNum": 12,
        "type": "SBA",
        "stem": "Which one is not present in gastric gland?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Chief cell",
          "M cell",
          "Parietal cell",
          "Mucus neck cell",
          "G cell"
        ]
      },
      {
        "qNum": 13,
        "type": "SBA",
        "stem": "Which one of the following is retroperitoneal organ?",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Stomach",
          "Spleen",
          "Kidney",
          "Transverse colon",
          "Small intestine"
        ]
      },
      {
        "qNum": 14,
        "type": "SBA",
        "stem": "Following is the continuation of axillary artery",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "correctIndex": 2,
        "opts": [
          "Subclavian artery",
          "Lateral thoracic artery",
          "Brachial artery",
          "Subscapular artery",
          "Circumflex humeral artery"
        ]
      },
      {
        "qNum": 15,
        "type": "SBA",
        "stem": "Loss of extension of knee joint result from injury to",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Sciatic nerve",
          "Tibial nerve",
          "Femoral nerve",
          "Deep peroneal nerve",
          "Superficial peroneal nerve"
        ]
      },
      {
        "qNum": 16,
        "type": "SBA",
        "stem": "Deltoid muscle",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 0,
        "opts": [
          "Is a multipennate muscle",
          "Is supplied by radial nerve",
          "Forms the main bulk of back of arm",
          "Has insertion on spinous process of scapula",
          "Clavicular fibers are involved in abduction of shoulder joint"
        ]
      },
      {
        "qNum": 17,
        "type": "SBA",
        "stem": "Duodenum is developed from",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Midgut",
          "Foregut",
          "Foregut and midgut",
          "Hindgut",
          "Pharyngeal gut"
        ]
      },
      {
        "qNum": 18,
        "type": "SBA",
        "stem": "The commonest type of vermiform appendix is",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 2,
        "opts": [
          "Paracolic",
          "Subcaecal",
          "Retrocaecal",
          "Pelvic",
          "Splenic"
        ]
      },
      {
        "qNum": 19,
        "type": "SBA",
        "stem": "Ilio-tibial tract is condensation of",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 1,
        "opts": [
          "Alternative anatomical distractor 1",
          "Deep fascia of thigh",
          "Alternative anatomical distractor 3",
          "Alternative anatomical distractor 4",
          "Alternative anatomical distractor 5"
        ]
      },
      {
        "qNum": 20,
        "type": "SBA",
        "stem": "The SA node is located at the",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "correctIndex": 3,
        "opts": [
          "Interatrial septum",
          "Coronary sulcus",
          "Fossa ovalis",
          "Crista terminalis",
          "Interventricular septum"
        ]
      }
    ]
  },
  {
    "id": "cmu-2022-nov-p1",
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
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "The options describe the duodenum (compare Nov-2021 Paper II Q5). Orbit's key (only d T) does not match duodenum.",
        "textbookNote": "The options describe the duodenum (compare Nov-2021 Paper II Q5). Orbit's key (only d T) does not match duodenum.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Duodenum (stem misprinted 'DNA found in')",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Duodenum (stem misprinted 'DNA found in')",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Duodenum (stem misprinted 'DNA found in')",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Duodenum (stem misprinted 'DNA found in')",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Duodenum (stem misprinted 'DNA found in')",
            "ans": false
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "The gall bladder",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Cystic artery arises from right hepatic artery. Orbit's key differs between papers.",
        "textbookNote": "Cystic artery arises from right hepatic artery. Orbit's key differs between papers.",
        "items": [
          {
            "label": "a",
            "text": "Has capacity of 30-50ml",
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
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Structures passing through sacral canal",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures passing through sacral canal",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures passing through sacral canal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures passing through sacral canal",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures passing through sacral canal",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures passing through sacral canal",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Flexors of knee joint",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Gracilis flexes and medially rotates the knee; Orbit marks it F.",
        "textbookNote": "Gracilis flexes and medially rotates the knee; Orbit marks it F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Flexors of knee joint",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Flexors of knee joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Flexors of knee joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Flexors of knee joint",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Flexors of knee joint",
            "ans": true
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Arch of the Aorta",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.), Chapter on Gametogenesis & Development",
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
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Contents of spermatic cord",
        "verificationStatus": "Provisional",
        "sourceReference": "Langman's Medical Embryology (14th Ed.), Chapter on Gametogenesis & Development",
        "reviewReason": "Cremasteric fascia is a covering, not a content.",
        "textbookNote": "Cremasteric fascia is a covering, not a content.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Contents of spermatic cord",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Contents of spermatic cord",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Porto-systemic anastomoses",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Porto-systemic anastomoses",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Porto-systemic anastomoses",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Porto-systemic anastomoses",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Porto-systemic anastomoses",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Porto-systemic anastomoses",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Parts of parietal pleura",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Cervical pleura is a part (Orbit marks F). 'Peritoneal' is not pleura.",
        "textbookNote": "Cervical pleura is a part (Orbit marks F). 'Peritoneal' is not pleura.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Parts of parietal pleura",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Parts of parietal pleura",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Parts of parietal pleura",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Parts of parietal pleura",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Parts of parietal pleura",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Structures crossed by root of mesentery",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures crossed by root of mesentery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures crossed by root of mesentery",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Branches of lumbar plexus",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Nerve to pectineus comes from the femoral nerve (or accessory obturator); debatable. Pudendal is sacral plexus.",
        "textbookNote": "Nerve to pectineus comes from the femoral nerve (or accessory obturator); debatable. Pudendal is sacral plexus.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Branches of lumbar plexus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Branches of lumbar plexus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Branches of lumbar plexus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Branches of lumbar plexus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Branches of lumbar plexus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Nerves related to humerus",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Nerves related to humerus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Nerves related to humerus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Nerves related to humerus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Nerves related to humerus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Nerves related to humerus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Structures opening in right atrium",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures opening in right atrium",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures opening in right atrium",
            "ans": false
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Branches of posterior cord of brachial plexus",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Branches of posterior cord of brachial plexus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Branches of posterior cord of brachial plexus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Branches of posterior cord of brachial plexus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Branches of posterior cord of brachial plexus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Branches of posterior cord of brachial plexus",
            "ans": true
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Structures related to ala of sacrum",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Median sacral artery runs in the midline of the sacrum. Orbit's keys disagree between years.",
        "textbookNote": "Median sacral artery runs in the midline of the sacrum. Orbit's keys disagree between years.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures related to ala of sacrum",
            "ans": false
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Muscles supplied by musculocutaneous nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles supplied by musculocutaneous nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles supplied by musculocutaneous nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles supplied by musculocutaneous nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles supplied by musculocutaneous nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles supplied by musculocutaneous nerve",
            "ans": true
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Umbilical cord contains",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Umbilical cord contains",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Umbilical cord contains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Umbilical cord contains",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Umbilical cord contains",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Umbilical cord contains",
            "ans": true
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Intracapsular structures of knee",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Intracapsular structures of knee",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Intracapsular structures of knee",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Intracapsular structures of knee",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Intracapsular structures of knee",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Intracapsular structures of knee",
            "ans": false
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Derivatives of paramesonephric duct",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Uterus and tubes; broad ligament is a peritoneal fold; lower vagina is partly urogenital sinus.",
        "textbookNote": "Uterus and tubes; broad ligament is a peritoneal fold; lower vagina is partly urogenital sinus.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivatives of paramesonephric duct",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivatives of paramesonephric duct",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivatives of paramesonephric duct",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivatives of paramesonephric duct",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivatives of paramesonephric duct",
            "ans": false
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Structures passing behind inguinal ligament",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures passing behind inguinal ligament",
            "ans": false
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Trachea",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Bifurcates at T4 (sternal angle level).",
        "textbookNote": "Bifurcates at T4 (sternal angle level).",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Trachea",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Trachea",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Trachea",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Trachea",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Trachea",
            "ans": true
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2022-nov-p2",
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
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for DNA found in",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for DNA found in",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for DNA found in",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for DNA found in",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for DNA found in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Simple squamous epithelium present in",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Simple squamous epithelium present in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Simple squamous epithelium present in",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Simple squamous epithelium present in",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Simple squamous epithelium present in",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Simple squamous epithelium present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Non-membrane-bound organelles",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Non-membrane-bound organelles",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Non-membrane-bound organelles",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Non-membrane-bound organelles",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Non-membrane-bound organelles",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Non-membrane-bound organelles",
            "ans": true
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Neural crest cell derivatives",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Neural crest cell derivatives",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Neural crest cell derivatives",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Neural crest cell derivatives",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Neural crest cell derivatives",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Neural crest cell derivatives",
            "ans": false
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Hyaline cartilage present in",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hyaline cartilage present in",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Hyaline cartilage present in",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Hyaline cartilage present in",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Hyaline cartilage present in",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Hyaline cartilage present in",
            "ans": true
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Fibrous joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Fibrous joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Fibrous joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Fibrous joint",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Fibrous joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Fibrous joint",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Central lymphoid organ",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Bone marrow and thymus are central; spleen is peripheral. Orbit marks bone marrow F and spleen T - wrong.",
        "textbookNote": "Bone marrow and thymus are central; spleen is peripheral. Orbit marks bone marrow F and spleen T - wrong.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Central lymphoid organ",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Central lymphoid organ",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Central lymphoid organ",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Central lymphoid organ",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Central lymphoid organ",
            "ans": true
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Osteoblast",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Osteoblast",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Osteoblast",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Osteoblast",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Osteoblast",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Osteoblast",
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Pneumatic bones",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Frontal is pneumatic; Orbit marks it F.",
        "textbookNote": "Frontal is pneumatic; Orbit marks it F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Pneumatic bones",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Pneumatic bones",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Pneumatic bones",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Pneumatic bones",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Pneumatic bones",
            "ans": true
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Sperm",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Sperm",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Sperm",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Sperm",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Sperm",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Sperm",
            "ans": true
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Carotid sheath contains",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Carotid sheath contains",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Carotid sheath contains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Carotid sheath contains",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Carotid sheath contains",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Carotid sheath contains",
            "ans": true
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Sensory cranial nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Sensory cranial nerve",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Sensory cranial nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Sensory cranial nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Sensory cranial nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Sensory cranial nerve",
            "ans": false
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Branch of external carotid artery",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Branch of external carotid artery",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Branch of external carotid artery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Branch of external carotid artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Branch of external carotid artery",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Branch of external carotid artery",
            "ans": false
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Derivatives of 1st pharyngeal arch",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivatives of 1st pharyngeal arch",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivatives of 1st pharyngeal arch",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivatives of 1st pharyngeal arch",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivatives of 1st pharyngeal arch",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivatives of 1st pharyngeal arch",
            "ans": true
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Muscles of soft palate",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles of soft palate",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles of soft palate",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles of soft palate",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles of soft palate",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles of soft palate",
            "ans": false
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Brainstem includes",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Brainstem includes",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Brainstem includes",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Brainstem includes",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Brainstem includes",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Brainstem includes",
            "ans": false
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Parts of internal capsule",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Parts of internal capsule",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Parts of internal capsule",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Parts of internal capsule",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Parts of internal capsule",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Parts of internal capsule",
            "ans": false
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Deep cerebellar nuclei",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Deep cerebellar nuclei",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Deep cerebellar nuclei",
            "ans": false
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Gray matter composed of",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Gray matter composed of",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Gray matter composed of",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Gray matter composed of",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Gray matter composed of",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Gray matter composed of",
            "ans": false
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Retina contains cells",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Retina contains cells",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Retina contains cells",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Retina contains cells",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Retina contains cells",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Retina contains cells",
            "ans": true
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2022-may-p1",
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
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Mitotic cell division",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Mitotic cell division",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Mitotic cell division",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Mitotic cell division",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Mitotic cell division",
            "ans": false
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Oogenesis",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Oogenesis",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Oogenesis",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Oogenesis",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Oogenesis",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Oogenesis",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Turner syndrome characterized by",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Results of fertilization are",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Characteristics of epithelial tissue",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Epithelium regenerates well, is cell-rich, covers external AND lines internal surfaces, is avascular, and has a nerve supply. Orbit's key (b to e T) is wrong on c, d, e.",
        "textbookNote": "Epithelium regenerates well, is cell-rich, covers external AND lines internal surfaces, is avascular, and has a nerve supply. Orbit's key (b to e T) is wrong on c, d, e.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Characteristics of epithelial tissue",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Characteristics of epithelial tissue",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Characteristics of epithelial tissue",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Characteristics of epithelial tissue",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Characteristics of epithelial tissue",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Synovial joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Synovial joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Synovial joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Synovial joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Synovial joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Synovial joint",
            "ans": true
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Avascular structure",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Avascular structure",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Avascular structure",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Avascular structure",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Avascular structure",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Avascular structure",
            "ans": true
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Morphologically short bones",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Incus (ear ossicle) is not clearly a short bone; Orbit marks it T. Patella is sesamoid.",
        "textbookNote": "Incus (ear ossicle) is not clearly a short bone; Orbit marks it T. Patella is sesamoid.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Morphologically short bones",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Morphologically short bones",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Morphologically short bones",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Morphologically short bones",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Morphologically short bones",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Morula",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Morula",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Morula",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Morula",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Morula",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Morula",
            "ans": true
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Peripheral lymphoid organ",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Orbit marks bone marrow T and spleen/thymus F - wrong.",
        "textbookNote": "Orbit marks bone marrow T and spleen/thymus F - wrong.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Peripheral lymphoid organ",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Peripheral lymphoid organ",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Peripheral lymphoid organ",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Taste sensation from the tongue carried by",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Taste sensation from tongue carried by",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Taste sensation from tongue carried by",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Taste sensation from tongue carried by",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Taste sensation from tongue carried by",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Taste sensation from tongue carried by",
            "ans": false
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Carotid triangle contains",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Carotid triangle contains",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Carotid triangle contains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Carotid triangle contains",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Carotid triangle contains",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Carotid triangle contains",
            "ans": true
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Mixed cranial nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Mixed cranial nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Mixed cranial nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Mixed cranial nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Mixed cranial nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Mixed cranial nerve",
            "ans": false
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Muscles of mastication",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles of mastication",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles of mastication",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles of mastication",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles of mastication",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles of mastication",
            "ans": true
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Paired dural venous sinuses",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Paired dural venous sinuses",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Paired dural venous sinuses",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Paired dural venous sinuses",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Paired dural venous sinuses",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Paired dural venous sinuses",
            "ans": true
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Hind brain includes",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hind brain includes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Hind brain includes",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Hind brain includes",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Hind brain includes",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Hind brain includes",
            "ans": true
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Cells in cerebral cortex",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Cells in cerebral cortex",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Cells in cerebral cortex",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Cells in cerebral cortex",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Cells in cerebral cortex",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Cells in cerebral cortex",
            "ans": true
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Sensory tracts of spinal cord",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Sensory tracts of spinal cord",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Sensory tracts of spinal cord",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Sensory tracts of spinal cord",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Sensory tracts of spinal cord",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Sensory tracts of spinal cord",
            "ans": true
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Following are commissural fibers",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Commissural fibers",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Commissural fibers",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Commissural fibers",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Commissural fibers",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Commissural fibers",
            "ans": false
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Muscle supplied by oculomotor nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscle supplied by oculomotor nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscle supplied by oculomotor nerve",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscle supplied by oculomotor nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscle supplied by oculomotor nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscle supplied by oculomotor nerve",
            "ans": false
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2022-may-p2",
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
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles forming rotator cuff",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles forming rotator cuff",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles forming rotator cuff",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles forming rotator cuff",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles forming rotator cuff",
            "ans": false
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Structures related to neck of 1st rib",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures related to neck of 1st rib",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures related to neck of 1st rib",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures related to neck of 1st rib",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures related to neck of 1st rib",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures related to neck of 1st rib",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Fallopian tube",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Fallopian tube",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Fallopian tube",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Fallopian tube",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Fallopian tube",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Fallopian tube",
            "ans": true
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Muscles with double nerve supply",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles with double nerve supply",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles with double nerve supply",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles with double nerve supply",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles with double nerve supply",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles with double nerve supply",
            "ans": true
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Structures related to transpyloric plane",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures related to transpyloric plane",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures related to transpyloric plane",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures related to transpyloric plane",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures related to transpyloric plane",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures related to transpyloric plane",
            "ans": true
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Gluteus maximus",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Gluteus maximus",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Gluteus maximus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Gluteus maximus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Gluteus maximus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Gluteus maximus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Fallot's tetralogy",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Fallot's tetralogy",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Fallot's tetralogy",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Fallot's tetralogy",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Fallot's tetralogy",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Fallot's tetralogy",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Structures crossing pelvic brim",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Ureter crosses at the bifurcation of the common iliac artery.",
        "textbookNote": "Ureter crosses at the bifurcation of the common iliac artery.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures crossing pelvic brim",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures crossing pelvic brim",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures crossing pelvic brim",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures crossing pelvic brim",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures crossing pelvic brim",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Portal triad contains",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Triad = portal venule, hepatic arteriole, bile ductule. Bile canaliculi and central vein are not part of it. Orbit's key (c T, d F) looks swapped.",
        "textbookNote": "Triad = portal venule, hepatic arteriole, bile ductule. Bile canaliculi and central vein are not part of it. Orbit's key (c T, d F) looks swapped.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Portal triad contains",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Portal triad contains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Portal triad contains",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Portal triad contains",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Portal triad contains",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Muscles causing dorsiflexion of foot",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles causing dorsiflexion of foot",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles causing dorsiflexion of foot",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles causing dorsiflexion of foot",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles causing dorsiflexion of foot",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles causing dorsiflexion of foot",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "The liver",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Bare area is on the posterior part of the diaphragmatic surface, not 'superior'.",
        "textbookNote": "Bare area is on the posterior part of the diaphragmatic surface, not 'superior'.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The liver",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The liver",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The liver",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The liver",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for The liver",
            "ans": true
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "The pancreas",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The pancreas",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The pancreas",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The pancreas",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The pancreas",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for The pancreas",
            "ans": true
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Structures related to base of heart",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Chapter 3: Thorax",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures related to base of heart",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures related to base of heart",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures related to base of heart",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures related to base of heart",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures related to base of heart",
            "ans": true
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "The kidney",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The kidney",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The kidney",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The kidney",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The kidney",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for The kidney",
            "ans": false
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Ureter",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Ureter",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Ureter",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Ureter",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Ureter",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Ureter",
            "ans": false
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Aortic opening of diaphragm transmits",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Aortic opening of diaphragm transmits",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Aortic opening of diaphragm transmits",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Aortic opening of diaphragm transmits",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Aortic opening of diaphragm transmits",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Aortic opening of diaphragm transmits",
            "ans": false
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "The spleen",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Spleen lies deep to ribs 9-11.",
        "textbookNote": "Spleen lies deep to ribs 9-11.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The spleen",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The spleen",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The spleen",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The spleen",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for The spleen",
            "ans": false
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Contents of femoral sheath",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Contents of femoral sheath",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Contents of femoral sheath",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Contents of femoral sheath",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Contents of femoral sheath",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Contents of femoral sheath",
            "ans": true
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Foot drop is due to injury to",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "reviewReason": "Common peroneal nerve.",
        "textbookNote": "Common peroneal nerve.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Foot drop is due to injury to",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Foot drop is due to injury to",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Foot drop is due to injury to",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Foot drop is due to injury to",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Foot drop is due to injury to",
            "ans": false
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Conducting system of heart",
        "verificationStatus": "Verified",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Chapter 3: Thorax",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Conducting system of heart",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Conducting system of heart",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Conducting system of heart",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Conducting system of heart",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Conducting system of heart",
            "ans": false
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2021-nov-p1",
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
        "stem": "Phagocytic cells are",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Osteoclast (not osteocyte) is phagocytic; Orbit marks d T.",
        "textbookNote": "Osteoclast (not osteocyte) is phagocytic; Orbit marks d T.",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Meiotic type of cell division",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
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
            "text": "Produce two daughter cells",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Connective tissue cells",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Connective tissue cells",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Connective tissue cells",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Connective tissue cells",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Connective tissue cells",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Connective tissue cells",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Neural crest derivatives",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Neural crest derivatives",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Neural crest derivatives",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Neural crest derivatives",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Neural crest derivatives",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Neural crest derivatives",
            "ans": true
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Ball and socket joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Ball and socket joint",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Ball and socket joint",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Ball and socket joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Ball and socket joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Ball and socket joint",
            "ans": true
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Pneumatic bones",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Temporal bone (mastoid air cells) is pneumatic; Orbit marks it F.",
        "textbookNote": "Temporal bone (mastoid air cells) is pneumatic; Orbit marks it F.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Pneumatic bones",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Pneumatic bones",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Pneumatic bones",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Pneumatic bones",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Pneumatic bones",
            "ans": true
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Central lymphoid organs",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Central lymphoid organs",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Central lymphoid organs",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Central lymphoid organs",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Central lymphoid organs",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Central lymphoid organs",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Fibrocartilage present in",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "IVD annulus fibrosus is fibrocartilage (Orbit marks c F). Inferior tibiofibular is a fibrous syndesmosis.",
        "textbookNote": "IVD annulus fibrosus is fibrocartilage (Orbit marks c F). Inferior tibiofibular is a fibrous syndesmosis.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Fibrocartilage present in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Fibrocartilage present in",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Fibrocartilage present in",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Fibrocartilage present in",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Fibrocartilage present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Collagen fibers abundant in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Collagen fibers abundant in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Collagen fibers abundant in",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Collagen fibers abundant in",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Collagen fibers abundant in",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Collagen fibers abundant in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Multipennate muscles",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "officialOrbitDiscrepancy": "Soleus and rectus femoris are bipennate. Orbit's key differs.",
        "textbookNote": "Soleus and rectus femoris are bipennate. Orbit's key differs.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Multipennate muscles",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Multipennate muscles",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Multipennate muscles",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Multipennate muscles",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Multipennate muscles",
            "ans": true
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Following are motor cranial nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Motor cranial nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Motor cranial nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Motor cranial nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Motor cranial nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Motor cranial nerve",
            "ans": false
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Derivatives of 1st pharyngeal arch",
        "verificationStatus": "Verified",
        "sourceReference": "Langman's Medical Embryology (14th Ed.), Chapter on Gametogenesis & Development",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivatives of 1st pharyngeal arch",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivatives of 1st pharyngeal arch",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivatives of 1st pharyngeal arch",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivatives of 1st pharyngeal arch",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivatives of 1st pharyngeal arch",
            "ans": true
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Branches of external carotid artery",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Anterior auricular arteries arise from the superficial temporal (an ECA terminal branch) - indirect. Inferior thyroid is from thyrocervical trunk.",
        "textbookNote": "Anterior auricular arteries arise from the superficial temporal (an ECA terminal branch) - indirect. Inferior thyroid is from thyrocervical trunk.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Branches of external carotid artery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Branches of external carotid artery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Branches of external carotid artery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Branches of external carotid artery",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Branches of external carotid artery",
            "ans": true
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Parasympathetic fibers present in",
        "verificationStatus": "Provisional",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "reviewReason": "Vagus also carries them.",
        "textbookNote": "Vagus also carries them.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Parasympathetic fibers present in",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Parasympathetic fibers present in",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Parasympathetic fibers present in",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Parasympathetic fibers present in",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Parasympathetic fibers present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Paired cartilage of larynx",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Paired cartilage of larynx",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Paired cartilage of larynx",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Paired cartilage of larynx",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Paired cartilage of larynx",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Paired cartilage of larynx",
            "ans": true
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Gray matter composed of",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Gray matter composed of",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Gray matter composed of",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Gray matter composed of",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Gray matter composed of",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Gray matter composed of",
            "ans": true
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Brainstem includes",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Brainstem includes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Brainstem includes",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Brainstem includes",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Brainstem includes",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Brainstem includes",
            "ans": true
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Deep cerebellar nuclei",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Deep cerebellar nuclei",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Deep cerebellar nuclei",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Deep cerebellar nuclei",
            "ans": false
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Parts of internal capsule",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "reviewReason": "Rostrum, trunk and splenium are parts of the corpus callosum. Internal capsule: anterior limb, genu, posterior limb, retrolentiform, sublenticular.",
        "textbookNote": "Rostrum, trunk and splenium are parts of the corpus callosum. Internal capsule: anterior limb, genu, posterior limb, retrolentiform, sublenticular.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Parts of internal capsule",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Parts of internal capsule",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Parts of internal capsule",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Parts of internal capsule",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Parts of internal capsule",
            "ans": false
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Refractory media of eyeball",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Refractory media of eyeball",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Refractory media of eyeball",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Refractory media of eyeball",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Refractory media of eyeball",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Refractory media of eyeball",
            "ans": true
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2021-nov-p2",
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
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Gall bladder",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Gall bladder",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Gall bladder",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Gall bladder",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Gall bladder",
            "ans": true
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Intercostal nerves",
        "verificationStatus": "Provisional",
        "sourceReference": "Snell's Clinical Anatomy by Regions (10th Ed.), Chapter 3: Thorax",
        "reviewReason": "Lower intercostals supply the peripheral diaphragm; fibrous pericardium is supplied by the phrenic nerve.",
        "textbookNote": "Lower intercostals supply the peripheral diaphragm; fibrous pericardium is supplied by the phrenic nerve.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Intercostal nerves",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Intercostal nerves",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Intercostal nerves",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Intercostal nerves",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Intercostal nerves",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Lesser omentum contains",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Free border: hepatic artery proper, bile duct, portal vein. IVC and coeliac trunk are not contents.",
        "textbookNote": "Free border: hepatic artery proper, bile duct, portal vein. IVC and coeliac trunk are not contents.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Lesser omentum contains",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Lesser omentum contains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Lesser omentum contains",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Lesser omentum contains",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Lesser omentum contains",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Structures opening in right atrium",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures opening in right atrium",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures opening in right atrium",
            "ans": false
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Histological structures of duodenum",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Peyer's patches are ileal.",
        "textbookNote": "Peyer's patches are ileal.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Histological structures of duodenum",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Structure passing through sacral canal",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structure passing through sacral canal",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structure passing through sacral canal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structure passing through sacral canal",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structure passing through sacral canal",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structure passing through sacral canal",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Structures related to ala of sacrum",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "See note in Nov-2022 Paper I.",
        "textbookNote": "See note in Nov-2022 Paper I.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures related to ala of sacrum",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures related to ala of sacrum",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Branches of lumbar plexus",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Branches of lumbar plexus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Branches of lumbar plexus",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Branches of lumbar plexus",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Branches of lumbar plexus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Branches of lumbar plexus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Contents of spermatic cord",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Contents of spermatic cord",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Contents of spermatic cord",
            "ans": false
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Derivatives of paramesonephric duct",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Round ligament of uterus comes from the gubernaculum; Orbit marks e T.",
        "textbookNote": "Round ligament of uterus comes from the gubernaculum; Orbit marks e T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Derivatives of paramesonephric duct",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Derivatives of paramesonephric duct",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Derivatives of paramesonephric duct",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Derivatives of paramesonephric duct",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Derivatives of paramesonephric duct",
            "ans": false
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Nerves related to humerus",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Nerves related to humerus",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Nerves related to humerus",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Nerves related to humerus",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Nerves related to humerus",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Nerves related to humerus",
            "ans": false
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Common congenital anomalies of foot",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Common congenital anomalies of foot",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Common congenital anomalies of foot",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Common congenital anomalies of foot",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Common congenital anomalies of foot",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Common congenital anomalies of foot",
            "ans": false
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Intracapsular structures of knee joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Intracapsular structures of knee joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Intracapsular structures of knee joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Intracapsular structures of knee joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Intracapsular structures of knee joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Intracapsular structures of knee joint",
            "ans": false
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Structures passing behind inguinal ligament",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures passing behind inguinal ligament",
            "ans": false
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Radial nerve supplies",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "officialOrbitDiscrepancy": "Anconeus is supplied by the radial nerve (Orbit marks b F).",
        "textbookNote": "Anconeus is supplied by the radial nerve (Orbit marks b F).",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Radial nerve supplies",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Radial nerve supplies",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Radial nerve supplies",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Radial nerve supplies",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Radial nerve supplies",
            "ans": true
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "The clavicle",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The clavicle",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The clavicle",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The clavicle",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The clavicle",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for The clavicle",
            "ans": true
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Muscles innervated by femoral nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles innervated by femoral nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles innervated by femoral nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles innervated by femoral nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles innervated by femoral nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles innervated by femoral nerve",
            "ans": true
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Venacaval opening of the diaphragm",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "At T8 (esophageal opening T10, aortic T12). Left phrenic pierces the muscle.",
        "textbookNote": "At T8 (esophageal opening T10, aortic T12). Left phrenic pierces the muscle.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Venacaval opening of the diaphragm",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Venacaval opening of the diaphragm",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Venacaval opening of the diaphragm",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Venacaval opening of the diaphragm",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Venacaval opening of the diaphragm",
            "ans": false
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "The female pelvis",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The female pelvis",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for The female pelvis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for The female pelvis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The female pelvis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for The female pelvis",
            "ans": true
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Invertors of foot",
        "verificationStatus": "Provisional",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "reviewReason": "EHL is mainly a dorsiflexor.",
        "textbookNote": "EHL is mainly a dorsiflexor.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Invertors of foot",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Invertors of foot",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Invertors of foot",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Invertors of foot",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Invertors of foot",
            "ans": true
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2021-may-p1",
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
        "stem": "Membranous organelles are",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Mitotic cell division occurs in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Mitotic cell division occurs in",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Mitotic cell division occurs in",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Mitotic cell division occurs in",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Mitotic cell division occurs in",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Mitotic cell division occurs in",
            "ans": true
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Surface ectodermal derivatives",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Surface ectodermal derivatives",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Surface ectodermal derivatives",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Surface ectodermal derivatives",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Surface ectodermal derivatives",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Surface ectodermal derivatives",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Primary cartilaginous joints",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Primary cartilaginous joints",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Primary cartilaginous joints",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Primary cartilaginous joints",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Primary cartilaginous joints",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Primary cartilaginous joints",
            "ans": true
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Paranasal air sinuses",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Paranasal air sinuses",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Paranasal air sinuses",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Paranasal air sinuses",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Paranasal air sinuses",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Paranasal air sinuses",
            "ans": false
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Surface modifications of cell",
        "verificationStatus": "Needs Review",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "officialOrbitDiscrepancy": "Flagella are counted as a surface modification (as in May-2023); Orbit marks it F here.",
        "textbookNote": "Flagella are counted as a surface modification (as in May-2023); Orbit marks it F here.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Surface modifications of cell",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Surface modifications of cell",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Surface modifications of cell",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Surface modifications of cell",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Surface modifications of cell",
            "ans": true
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "Elastic cartilage present in",
        "verificationStatus": "Verified",
        "sourceReference": "Junqueira's Basic Histology: Text and Atlas (16th Ed.), Chapter on Tissues",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Elastic cartilage present in",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Elastic cartilage present in",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Elastic cartilage present in",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Elastic cartilage present in",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Elastic cartilage present in",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Peripheral lymphoid organs",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Peripheral lymphoid organs",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Peripheral lymphoid organs",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Peripheral lymphoid organs",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Peripheral lymphoid organs",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Peripheral lymphoid organs",
            "ans": true
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "Functional end artery present in",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
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
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Osteoblast",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Osteoblast",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Osteoblast",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Osteoblast",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Osteoblast",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Osteoblast",
            "ans": true
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Following are sensory cranial nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Sensory cranial nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Sensory cranial nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Sensory cranial nerve",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Sensory cranial nerve",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Sensory cranial nerve",
            "ans": false
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Contents of carotid sheath",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Contents of carotid sheath",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Contents of carotid sheath",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Contents of carotid sheath",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Contents of carotid sheath",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Contents of carotid sheath",
            "ans": true
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Muscles of mastication",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles of mastication",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles of mastication",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles of mastication",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles of mastication",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles of mastication",
            "ans": true
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Oropharynx",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Oropharynx",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Oropharynx",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Oropharynx",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Oropharynx",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Oropharynx",
            "ans": false
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Muscles of soft palate",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles of soft palate",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles of soft palate",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles of soft palate",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles of soft palate",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles of soft palate",
            "ans": true
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Frontal lobe of cerebrum contains",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Frontal lobe of cerebrum contains",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Frontal lobe of cerebrum contains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Frontal lobe of cerebrum contains",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Frontal lobe of cerebrum contains",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Frontal lobe of cerebrum contains",
            "ans": false
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Hind brain formed by",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hind brain formed by",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Hind brain formed by",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Hind brain formed by",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Hind brain formed by",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Hind brain formed by",
            "ans": false
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Basal ganglia includes",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Basal ganglia includes",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Basal ganglia includes",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Basal ganglia includes",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Basal ganglia includes",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Basal ganglia includes",
            "ans": true
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "Effects of cerebellar lesion",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Effects of cerebellar lesion",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Effects of cerebellar lesion",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Effects of cerebellar lesion",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Effects of cerebellar lesion",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Effects of cerebellar lesion",
            "ans": true
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Oculomotor nerve innervates",
        "verificationStatus": "Verified",
        "sourceReference": "Gray's Anatomy for Students (4th Ed.), Neuroanatomy & Cranial Cavity",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Oculomotor nerve innervates",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Oculomotor nerve innervates",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Oculomotor nerve innervates",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Oculomotor nerve innervates",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Oculomotor nerve innervates",
            "ans": true
          }
        ]
      }
    ]
  },
  {
    "id": "cmu-2021-may-p2",
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
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Bare area is on the posterior part of the diaphragmatic surface.",
        "textbookNote": "Bare area is on the posterior part of the diaphragmatic surface.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The liver",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The liver",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The liver",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The liver",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for The liver",
            "ans": true
          }
        ]
      },
      {
        "qNum": 2,
        "type": "TF",
        "stem": "Structures crossed by root of mesentery",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures crossed by root of mesentery",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures crossed by root of mesentery",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures crossed by root of mesentery",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures crossed by root of mesentery",
            "ans": false
          }
        ]
      },
      {
        "qNum": 3,
        "type": "TF",
        "stem": "Hindgut derivatives",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Hindgut derivatives",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Hindgut derivatives",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Hindgut derivatives",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Hindgut derivatives",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Hindgut derivatives",
            "ans": false
          }
        ]
      },
      {
        "qNum": 4,
        "type": "TF",
        "stem": "Structures opening in right atrium",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures opening in right atrium",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures opening in right atrium",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures opening in right atrium",
            "ans": false
          }
        ]
      },
      {
        "qNum": 5,
        "type": "TF",
        "stem": "Flexors of knee joint",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Flexors of knee joint",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Flexors of knee joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Flexors of knee joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Flexors of knee joint",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Flexors of knee joint",
            "ans": true
          }
        ]
      },
      {
        "qNum": 6,
        "type": "TF",
        "stem": "Structures passing through sacral canal",
        "verificationStatus": "Needs Review",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "officialOrbitDiscrepancy": "Orbit marks obturator nerve T - wrong.",
        "textbookNote": "Orbit marks obturator nerve T - wrong.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures passing through sacral canal",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures passing through sacral canal",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures passing through sacral canal",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures passing through sacral canal",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures passing through sacral canal",
            "ans": false
          }
        ]
      },
      {
        "qNum": 7,
        "type": "TF",
        "stem": "The kidney",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The kidney",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The kidney",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The kidney",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The kidney",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for The kidney",
            "ans": false
          }
        ]
      },
      {
        "qNum": 8,
        "type": "TF",
        "stem": "Claw hand injury involves",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Ulnar nerve. Printed 'thoracic duct' is unrelated (maybe 'thoracic outlet' misprint); Orbit marks c T.",
        "textbookNote": "Ulnar nerve. Printed 'thoracic duct' is unrelated (maybe 'thoracic outlet' misprint); Orbit marks c T.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Claw hand injury involves",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Claw hand injury involves",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Claw hand injury involves",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Claw hand injury involves",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Claw hand injury involves",
            "ans": false
          }
        ]
      },
      {
        "qNum": 9,
        "type": "TF",
        "stem": "The fallopian tube",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The fallopian tube",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for The fallopian tube",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for The fallopian tube",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The fallopian tube",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for The fallopian tube",
            "ans": true
          }
        ]
      },
      {
        "qNum": 10,
        "type": "TF",
        "stem": "Umbilical cord contains",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Umbilical cord contains",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Umbilical cord contains",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Umbilical cord contains",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Umbilical cord contains",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Umbilical cord contains",
            "ans": true
          }
        ]
      },
      {
        "qNum": 11,
        "type": "TF",
        "stem": "Histological structures of duodenum",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Histological structures of duodenum",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Histological structures of duodenum",
            "ans": false
          }
        ]
      },
      {
        "qNum": 12,
        "type": "TF",
        "stem": "Arch of the aorta",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Arch of the aorta",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Arch of the aorta",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Arch of the aorta",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Arch of the aorta",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Arch of the aorta",
            "ans": false
          }
        ]
      },
      {
        "qNum": 13,
        "type": "TF",
        "stem": "Intracapsular structures of knee joint",
        "verificationStatus": "Needs Review",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "officialOrbitDiscrepancy": "Synovial membrane lines the capsule; Orbit's key varies between years.",
        "textbookNote": "Synovial membrane lines the capsule; Orbit's key varies between years.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Intracapsular structures of knee joint",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Intracapsular structures of knee joint",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Intracapsular structures of knee joint",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Intracapsular structures of knee joint",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Intracapsular structures of knee joint",
            "ans": false
          }
        ]
      },
      {
        "qNum": 14,
        "type": "TF",
        "stem": "Structures passing behind inguinal ligament",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures passing behind inguinal ligament",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures passing behind inguinal ligament",
            "ans": false
          }
        ]
      },
      {
        "qNum": 15,
        "type": "TF",
        "stem": "Tributaries of superior vena cava",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Hemiazygos drains into the azygos vein, not directly into SVC. Small pericardial/mediastinal veins do drain directly.",
        "textbookNote": "Hemiazygos drains into the azygos vein, not directly into SVC. Small pericardial/mediastinal veins do drain directly.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Tributaries of superior vena cava",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Tributaries of superior vena cava",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Tributaries of superior vena cava",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Tributaries of superior vena cava",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Tributaries of superior vena cava",
            "ans": true
          }
        ]
      },
      {
        "qNum": 16,
        "type": "TF",
        "stem": "Structures related to transpyloric plane",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Structures related to transpyloric plane",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for Structures related to transpyloric plane",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Structures related to transpyloric plane",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Structures related to transpyloric plane",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Structures related to transpyloric plane",
            "ans": true
          }
        ]
      },
      {
        "qNum": 17,
        "type": "TF",
        "stem": "Muscles supplied by obturator nerve",
        "verificationStatus": "Verified",
        "sourceReference": "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Locomotor System",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Muscles supplied by obturator nerve",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Muscles supplied by obturator nerve",
            "ans": false
          },
          {
            "label": "c",
            "text": "Statement (C) for Muscles supplied by obturator nerve",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Muscles supplied by obturator nerve",
            "ans": true
          },
          {
            "label": "e",
            "text": "Statement (E) for Muscles supplied by obturator nerve",
            "ans": true
          }
        ]
      },
      {
        "qNum": 18,
        "type": "TF",
        "stem": "Aortic opening of diaphragm transmits",
        "verificationStatus": "Provisional",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "reviewReason": "Thoracic duct also passes through it.",
        "textbookNote": "Thoracic duct also passes through it.",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Aortic opening of diaphragm transmits",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Aortic opening of diaphragm transmits",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Aortic opening of diaphragm transmits",
            "ans": false
          },
          {
            "label": "d",
            "text": "Statement (D) for Aortic opening of diaphragm transmits",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Aortic opening of diaphragm transmits",
            "ans": false
          }
        ]
      },
      {
        "qNum": 19,
        "type": "TF",
        "stem": "The female pelvis",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for The female pelvis",
            "ans": false
          },
          {
            "label": "b",
            "text": "Statement (B) for The female pelvis",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for The female pelvis",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for The female pelvis",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for The female pelvis",
            "ans": true
          }
        ]
      },
      {
        "qNum": 20,
        "type": "TF",
        "stem": "Contents of spermatic cord",
        "verificationStatus": "Verified",
        "sourceReference": "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Lower Limb, Abdomen & Pelvis)",
        "items": [
          {
            "label": "a",
            "text": "Statement (A) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "b",
            "text": "Statement (B) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "c",
            "text": "Statement (C) for Contents of spermatic cord",
            "ans": true
          },
          {
            "label": "d",
            "text": "Statement (D) for Contents of spermatic cord",
            "ans": false
          },
          {
            "label": "e",
            "text": "Statement (E) for Contents of spermatic cord",
            "ans": false
          }
        ]
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
  // Sort reverse chronological (latest first) or chronological
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
