const fs = require('fs');

// We will compile the authentic examination papers from Anatomy_mcq_5660914a.pdf (19 pages)
// Each page is an official Chittagong Medical University (CMU) exam paper.

const papers = [
  {
    id: "cmu-2025-may-p1",
    session: "May 2025",
    year: 2025,
    month: "May",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "New Curriculum",
    page: 1,
    bookPage: "p.76",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Following are fibrous joint",
        items: [
          { label: "a", text: "Coronal suture", ans: true },
          { label: "b", text: "Temporomandibular joint", ans: false },
          { label: "c", text: "Inferior tibiofibular joint", ans: true },
          { label: "d", text: "Intervertebral joint", ans: false },
          { label: "e", text: "Manubriosternal joint", ans: false }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Collagen fibers are abundant in",
        items: [
          { label: "a", text: "Bone", ans: true },
          { label: "b", text: "Lymph node", ans: false },
          { label: "c", text: "Lung", ans: true },
          { label: "d", text: "Tendon", ans: true },
          { label: "e", text: "Spleen", ans: false }
        ]
      },
      {
        qNum: 3, type: "TF", stem: "Spermatogenesis",
        items: [
          { label: "a", text: "Produce single haploid sperm", ans: false },
          { label: "b", text: "Starts before birth", ans: false },
          { label: "c", text: "Starts from puberty", ans: true },
          { label: "d", text: "Occurs in seminiferous tubule", ans: true },
          { label: "e", text: "Is called reduction division", ans: true }
        ]
      },
      {
        qNum: 4, type: "TF", stem: "Middle ear communication with",
        items: [
          { label: "a", text: "Oral cavity", ans: false },
          { label: "b", text: "Nasal cavity", ans: false },
          { label: "c", text: "Inner ear", ans: true },
          { label: "d", text: "Nasopharynx", ans: true },
          { label: "e", text: "Mastoid antrum", ans: true }
        ]
      },
      {
        qNum: 5, type: "TF", stem: "Extra pyramidal tracts are",
        items: [
          { label: "a", text: "Corticospinal", ans: false },
          { label: "b", text: "Reticulospinal", ans: true },
          { label: "c", text: "Rubrospinal", ans: true },
          { label: "d", text: "Spinotectal", ans: false },
          { label: "e", text: "Vestibulospinal", ans: true }
        ]
      },
      {
        qNum: 6, type: "TF", stem: "Limbic system includes",
        items: [
          { label: "a", text: "Hypothalamus", ans: true },
          { label: "b", text: "Hippocampus", ans: true },
          { label: "c", text: "Amygdala", ans: true },
          { label: "d", text: "Mammillary body", ans: true },
          { label: "e", text: "Claustrum", ans: false }
        ]
      },
      {
        qNum: 7, type: "TF", stem: "Uniaxial joint is/are",
        items: [
          { label: "a", text: "Pivot", ans: true },
          { label: "b", text: "Ball and socket", ans: false },
          { label: "c", text: "Plane", ans: false },
          { label: "d", text: "Hinge", ans: true },
          { label: "e", text: "Ellipsoid", ans: false }
        ]
      },
      {
        qNum: 8, type: "TF", stem: "Middle cerebral artery supplies following area",
        items: [
          { label: "a", text: "Brocas area", ans: true },
          { label: "b", text: "Primary motor area", ans: true },
          { label: "c", text: "Occipital lobe", ans: false },
          { label: "d", text: "Basal ganglia", ans: true },
          { label: "e", text: "Internal capsule", ans: false }
        ]
      },
      {
        qNum: 9, type: "TF", stem: "Following is/are central lymphoid organ:",
        items: [
          { label: "a", text: "Bone marrow", ans: true },
          { label: "b", text: "Lymph node", ans: false },
          { label: "c", text: "Palatine tonsil", ans: false },
          { label: "d", text: "Spleen", ans: false },
          { label: "e", text: "Thymus", ans: true }
        ]
      },
      {
        qNum: 10, type: "TF", stem: "Pterion is the meeting point of following bones",
        items: [
          { label: "a", text: "Frontal", ans: true },
          { label: "b", text: "Parietal", ans: true },
          { label: "c", text: "Temporal", ans: true },
          { label: "d", text: "Maxilla", ans: false },
          { label: "e", text: "Zygomatic", ans: false }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Following are muscles of facial expression",
        opts: ["Temporalis", "Buccinator", "Masseter", "Sternohyoid", "Omohyoid"],
        correctIndex: 1
      },
      {
        qNum: 12, type: "SBA", stem: "Following are parasympathetic nucleus",
        opts: ["Vestibular nucleus", "Cochlear nucleus", "Red nucleus", "Edinger-Westphal nucleus", "Spinal nucleus"],
        correctIndex: 3
      },
      {
        qNum: 13, type: "SBA", stem: "Endocrine gland",
        opts: ["Has duct", "Has rich blood supply", "Has rich nerve supply", "Secretes mucus fluid", "Secretes serous fluid"],
        correctIndex: 1
      },
      {
        qNum: 14, type: "SBA", stem: "Retina",
        opts: ["Inner most layer contains pigment epithelium", "Bipolar cell form the optic nerve", "Blind spot has no photoreceptors", "Can regenerate", "Is avascular structure"],
        correctIndex: 2
      },
      {
        qNum: 15, type: "SBA", stem: "Cerebellum",
        opts: ["Parts of brain stem", "Controls opposite side of the body", "Directly controls the motor activity", "Arranged outer white matter and inner grey matter", "Connected with the brain stem"],
        correctIndex: 4
      },
      {
        qNum: 16, type: "SBA", stem: "Mast cells",
        opts: ["Participate in allergic reaction", "Participate in phagocytosis", "Produce antibody", "Provide nutrition to epithelial tissue", "Synthesize ground substance"],
        correctIndex: 0
      },
      {
        qNum: 17, type: "SBA", stem: "Skeletal muscle fiber",
        opts: ["Branching with intercalated discs", "Involuntary control with no striations", "Multinucleated fibers with striations", "Single central nucleus with no striations", "Spindle shaped fibers with central nuclei"],
        correctIndex: 2
      },
      {
        qNum: 18, type: "SBA", stem: "Mature neurons are",
        opts: ["Permanent cell", "Undergo cell division", "Develops from all three germ layers", "Contain centriole", "Stable cell"],
        correctIndex: 0
      },
      {
        qNum: 19, type: "SBA", stem: "Nerve that pass through cavernous sinus is",
        opts: ["Abducent", "Optic", "Facial", "Vestibulocochlear", "Mandibular"],
        correctIndex: 0
      },
      {
        qNum: 20, type: "SBA", stem: "Following are basal nuclei",
        opts: ["Medial geniculate body", "Pulvinar", "Red nucleus", "Amygdaloid nucleus", "Caudate nucleus"],
        correctIndex: 4
      }
    ]
  },
  {
    id: "cmu-2025-may-p2",
    session: "May 2025",
    year: 2025,
    month: "May",
    subject: "Anatomy",
    paper: "Paper-II",
    curriculum: "New Curriculum",
    page: 2,
    bookPage: "p.77",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Female urinary bladder is supplied by following arteries",
        items: [
          { label: "a", text: "Superior vesical artery", ans: true },
          { label: "b", text: "Inferior vesical artery", ans: false },
          { label: "c", text: "Uterine artery", ans: true },
          { label: "d", text: "Vaginal artery", ans: true },
          { label: "e", text: "Ovarian artery", ans: false }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Modifications of gastrointestinal mucosa are",
        items: [
          { label: "a", text: "Rugae", ans: true },
          { label: "b", text: "Pyloric sphincter", ans: false },
          { label: "c", text: "Microvilli", ans: true },
          { label: "d", text: "Villi", ans: true },
          { label: "e", text: "Plica circulares", ans: true }
        ]
      },
      {
        qNum: 3, type: "TF", stem: "Lateral branches of abdominal aorta supplies",
        items: [
          { label: "a", text: "Gonads", ans: true },
          { label: "b", text: "Kidneys", ans: true },
          { label: "c", text: "Liver", ans: false },
          { label: "d", text: "Large intestine", ans: false },
          { label: "e", text: "The diaphragm", ans: true }
        ]
      },
      {
        qNum: 4, type: "TF", stem: "Contents of adductor canal are",
        items: [
          { label: "a", text: "Femoral artery", ans: true },
          { label: "b", text: "Femoral vein", ans: true },
          { label: "c", text: "Femoral nerve", ans: false },
          { label: "d", text: "Saphenous nerve", ans: true },
          { label: "e", text: "Great saphenous vein", ans: false }
        ]
      },
      {
        qNum: 5, type: "TF", stem: "Dorsiflexion of foot is done by following muscles",
        items: [
          { label: "a", text: "Tibialis anterior", ans: true },
          { label: "b", text: "Extensor digitorum longus", ans: false },
          { label: "c", text: "Flexor hallucis longus", ans: false },
          { label: "d", text: "Peroneus tertius", ans: true },
          { label: "e", text: "Peroneus brevis", ans: false }
        ]
      },
      {
        qNum: 6, type: "TF", stem: "Posterior wall of axilla is formed by",
        items: [
          { label: "a", text: "Serratus anterior", ans: false },
          { label: "b", text: "Teres major", ans: true },
          { label: "c", text: "Pectoralis major", ans: false },
          { label: "d", text: "Subscapularis", ans: true },
          { label: "e", text: "Latissimus dorsi", ans: true }
        ]
      },
      {
        qNum: 7, type: "TF", stem: "Vena caval opening of diaphragm",
        items: [
          { label: "a", text: "Tendinous in nature", ans: true },
          { label: "b", text: "Muscular in nature", ans: false },
          { label: "c", text: "Closes during contraction of diaphragm", ans: true },
          { label: "d", text: "Lies at 8th thoracic vertebra", ans: true },
          { label: "e", text: "Transmits superior vena cava", ans: false }
        ]
      },
      {
        qNum: 8, type: "TF", stem: "Intercostal nerves",
        items: [
          { label: "a", text: "11 in number", ans: true },
          { label: "b", text: "11 in pairs", ans: true },
          { label: "c", text: "Supplies only thoracic wall", ans: false },
          { label: "d", text: "Located at upper part of corresponding intercostal space", ans: true },
          { label: "e", text: "Atypical intercostal nerves are more in number than typical ones", ans: true }
        ]
      },
      {
        qNum: 9, type: "TF", stem: "Conducting system of heart includes",
        items: [
          { label: "a", text: "SA node", ans: true },
          { label: "b", text: "AV node", ans: true },
          { label: "c", text: "Papillary muscle", ans: false },
          { label: "d", text: "AV bundle", ans: true },
          { label: "e", text: "Musculo pectinate", ans: false }
        ]
      },
      {
        qNum: 10, type: "TF", stem: "Muscle supplied by axillary nerve are",
        items: [
          { label: "a", text: "Deltoid", ans: true },
          { label: "b", text: "Teres major", ans: false },
          { label: "c", text: "Teres minor", ans: true },
          { label: "d", text: "Coracobrachialis", ans: true },
          { label: "e", text: "Brachialis", ans: false }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "In which layer of abdominal wall, deep inguinal ring lies?",
        opts: ["External oblique aponeurosis", "Internal oblique aponeurosis", "Transversus abdominis aponeurosis", "Fascia transversalis", "Fascia iliaca"],
        correctIndex: 3
      },
      {
        qNum: 12, type: "SBA", stem: "Ligament preventing backward falling of trunk",
        opts: ["Iliofemoral ligament", "Ischiofemoral ligament", "Inguinal ligament", "Pubofemoral ligament", "Transverse acetabular ligament"],
        correctIndex: 0
      },
      {
        qNum: 13, type: "SBA", stem: "Which muscle connects vertebral column with lower limb?",
        opts: ["Biceps femoris", "Iliacus", "Rectus femoris", "Psoas major", "Quadratus lumborum"],
        correctIndex: 3
      },
      {
        qNum: 14, type: "SBA", stem: "If urethral fold fails to fuse it leads to",
        opts: ["Epispadias", "Ectopic vesicae", "Hypospadias", "Rectovesical fistula", "Phimosis"],
        correctIndex: 2
      },
      {
        qNum: 15, type: "SBA", stem: "Which organ is completely covered by peritoneum?",
        opts: ["Kidney", "Pancreas", "Ascending colon", "Spleen", "Rectum"],
        correctIndex: 3
      },
      {
        qNum: 16, type: "SBA", stem: "Artery present in superior mediastinum is",
        opts: ["Ascending aorta", "Descending thoracic aorta", "Internal thoracic artery", "Left subclavian artery", "Pulmonary trunk"],
        correctIndex: 3
      },
      {
        qNum: 17, type: "SBA", stem: "Phrenic nerve supplies",
        opts: ["Diaphragm", "Heart", "Intercostal muscles", "Pulmonary pleura", "Visceral pericardium"],
        correctIndex: 0
      },
      {
        qNum: 18, type: "SBA", stem: "Vertebrosternal sets of ribs are",
        opts: ["1 to 7 (true ribs: 3, 4, 5)", "6, 7, 8", "7, 8, 9", "9, 10, 11", "10, 11, 12"],
        correctIndex: 0
      },
      {
        qNum: 19, type: "SBA", stem: "Submucous coat is absent in",
        opts: ["Gall bladder", "Oesophagus", "Duodenum", "Vermiform appendix", "Ileum"],
        correctIndex: 0
      },
      {
        qNum: 20, type: "SBA", stem: "Multipennate muscle is",
        opts: ["Biceps brachii", "Brachialis", "Flexor digitorum profundus", "Pectoralis major", "Subscapularis"],
        correctIndex: 4
      }
    ]
  },
  {
    id: "cmu-2025-nov-p1",
    session: "Nov 2025",
    year: 2025,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "New Curriculum",
    page: 3,
    bookPage: "p.78",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Pterion is the meeting place of the following bones",
        items: [
          { label: "a", text: "Frontal", ans: false },
          { label: "b", text: "Temporal", ans: true },
          { label: "c", text: "Maxilla", ans: false },
          { label: "d", text: "Zygomatic", ans: true },
          { label: "e", text: "Parietal", ans: true }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Simple columnar epithelium present in",
        items: [
          { label: "a", text: "Alveoli", ans: false },
          { label: "b", text: "Duodenum", ans: true },
          { label: "c", text: "Stomach", ans: true },
          { label: "d", text: "Esophagus", ans: false },
          { label: "e", text: "Tongue", ans: false }
        ]
      },
      {
        qNum: 3, type: "TF", stem: "Extra pyramidal tracts are",
        items: [
          { label: "a", text: "Corticospinal", ans: false },
          { label: "b", text: "Reticulospinal", ans: true },
          { label: "c", text: "Rubrospinal", ans: true },
          { label: "d", text: "Spinotectal", ans: false },
          { label: "e", text: "Vestibulospinal", ans: true }
        ]
      },
      {
        qNum: 4, type: "TF", stem: "Refractive media of eyeball",
        items: [
          { label: "a", text: "Sclera", ans: false },
          { label: "b", text: "Cornea", ans: true },
          { label: "c", text: "Retina", ans: false },
          { label: "d", text: "Iris", ans: false },
          { label: "e", text: "Choroid", ans: false }
        ]
      },
      {
        qNum: 5, type: "TF", stem: "Mitosis",
        items: [
          { label: "a", text: "Occurs in somatic cell", ans: true },
          { label: "b", text: "Occurs in mature germ cell", ans: false },
          { label: "c", text: "Produce two cells of same chromosome number", ans: true },
          { label: "d", text: "Is called reduction division", ans: false },
          { label: "e", text: "Responsible for genetic variability", ans: false }
        ]
      },
      {
        qNum: 6, type: "TF", stem: "Derivatives of mesoderm",
        items: [
          { label: "a", text: "Epidermis", ans: false },
          { label: "b", text: "Cardiac muscle", ans: true },
          { label: "c", text: "Lung", ans: false },
          { label: "d", text: "Gall bladder", ans: false },
          { label: "e", text: "Connective tissue", ans: true }
        ]
      },
      {
        qNum: 7, type: "TF", stem: "Content of carotid sheath are",
        items: [
          { label: "a", text: "Common carotid artery", ans: true },
          { label: "b", text: "External carotid artery", ans: false },
          { label: "c", text: "External jugular vein", ans: false },
          { label: "d", text: "Internal jugular vein", ans: true },
          { label: "e", text: "Vagus nerve", ans: true }
        ]
      },
      {
        qNum: 8, type: "TF", stem: "Following is/are purely motor cranial nerve",
        items: [
          { label: "a", text: "Facial", ans: false },
          { label: "b", text: "Glossopharyngeal", ans: false },
          { label: "c", text: "Hypoglossal", ans: true },
          { label: "d", text: "Trochlear", ans: true },
          { label: "e", text: "Vestibulocochlear", ans: false }
        ]
      },
      {
        qNum: 9, type: "TF", stem: "Following is/are central lymphoid organ",
        items: [
          { label: "a", text: "Bone marrow", ans: true },
          { label: "b", text: "Lymph node", ans: false },
          { label: "c", text: "Palatine tonsil", ans: false },
          { label: "d", text: "Spleen", ans: false },
          { label: "e", text: "Thymus", ans: true }
        ]
      },
      {
        qNum: 10, type: "TF", stem: "Deep cerebellar nuclei are",
        items: [
          { label: "a", text: "Caudate nucleus", ans: false },
          { label: "b", text: "Dentate nucleus", ans: true },
          { label: "c", text: "Globose", ans: true },
          { label: "d", text: "Posteromedial nucleus", ans: false },
          { label: "e", text: "Ventromedial nucleus", ans: false }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Hard palate is formed by the following bone",
        opts: ["Ethmoid", "Frontal", "Maxilla", "Zygomatic", "Lacrimal"],
        correctIndex: 2
      },
      {
        qNum: 12, type: "SBA", stem: "Muscle that opens laryngeal inlet is",
        opts: ["Aryepiglottic", "Cricothyroid", "Oblique arytenoid", "Thyroarytenoid", "Thyroepiglottic"],
        correctIndex: 4
      },
      {
        qNum: 13, type: "SBA", stem: "Following are parasympathetic nucleus",
        opts: ["Nucleus ambiguus", "Vestibular", "Mesencephalic", "Red", "Spinal"],
        correctIndex: 0
      },
      {
        qNum: 14, type: "SBA", stem: "Which one of the following is the effect of sympathetic system?",
        opts: ["Bronchoconstriction", "Cardio inhibition", "Coronary vasoconstriction", "Decrease peristalsis", "Decrease sweating"],
        correctIndex: 3
      },
      {
        qNum: 15, type: "SBA", stem: "Reticular fiber found in",
        opts: ["Bone", "Tendon", "Lymphoid organ", "Cartilage", "Muscle"],
        correctIndex: 2
      },
      {
        qNum: 16, type: "SBA", stem: "Epithelial tissue",
        opts: ["Is avascular", "Develops from ectoderm only", "Intercellular substance is maximum", "Has nerve supply", "Consists of cell, fiber and ground substance"],
        correctIndex: 0
      },
      {
        qNum: 17, type: "SBA", stem: "Principle muscle of mastication is",
        opts: ["Buccinator", "Digastric", "Geniohyoid", "Masseter", "Mylohyoid"],
        correctIndex: 3
      },
      {
        qNum: 18, type: "SBA", stem: "Cell present in the lacuna of haversian system is",
        opts: ["Chondroblast", "Osteoblast", "Osteoclast", "Osteoprogenitor", "Osteocyte"],
        correctIndex: 4
      },
      {
        qNum: 19, type: "SBA", stem: "Nerve that pass through cavernous sinus is",
        opts: ["Abducent", "Occulomotor", "Optic", "Ophthalmic", "Trochlear"],
        correctIndex: 0
      },
      {
        qNum: 20, type: "SBA", stem: "Following layer of scalp is known as safety valve haematoma",
        opts: ["Aponeurosis", "Connective tissue", "Loose areolar tissue", "Pericranium", "Skin"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "cmu-2025-nov-p2",
    session: "Nov 2025",
    year: 2025,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-II",
    curriculum: "New Curriculum",
    page: 4,
    bookPage: "p.79",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Branches of axillary artery",
        items: [
          { label: "a", text: "Superior thoracic artery", ans: true },
          { label: "b", text: "Profunda brachii artery", ans: false },
          { label: "c", text: "Subscapular artery", ans: true },
          { label: "d", text: "Anterior circumflex humeral artery", ans: true },
          { label: "e", text: "Ulnar artery", ans: false }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Parietal pleura",
        items: [
          { label: "a", text: "Lines the thoracic wall and mediastinum", ans: true },
          { label: "b", text: "Blood supply same as lung", ans: false },
          { label: "c", text: "Develops from somatopleuric mesoderm", ans: true },
          { label: "d", text: "Innervated by autonomic nerves", ans: false },
          { label: "e", text: "Sensitive to pain", ans: true }
        ]
      },
      {
        qNum: 3, type: "TF", stem: "Abduction of Shoulder joint is done by following muscles",
        items: [
          { label: "a", text: "Latissimus dorsi", ans: false },
          { label: "b", text: "Pectoralis major", ans: false },
          { label: "c", text: "Deltoid", ans: true },
          { label: "d", text: "Supraspinatus", ans: true },
          { label: "e", text: "Serratus anterior", ans: true }
        ]
      },
      {
        qNum: 4, type: "TF", stem: "Tributaries of coronary sinus :",
        items: [
          { label: "a", text: "Great cardiac vein", ans: true },
          { label: "b", text: "Anterior cardiac vein", ans: false },
          { label: "c", text: "Venae cordis minimae", ans: false },
          { label: "d", text: "Middle cardiac vein", ans: true },
          { label: "e", text: "Right marginal vein", ans: false }
        ]
      },
      {
        qNum: 5, type: "TF", stem: "Retroperitoneal organs",
        items: [
          { label: "a", text: "Stomach", ans: false },
          { label: "b", text: "Ileum", ans: false },
          { label: "c", text: "Pancreas", ans: true },
          { label: "d", text: "Kidneys", ans: true },
          { label: "e", text: "Ureters", ans: true }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Winging of the scapula caused by paralysis of",
        opts: ["Subclavius Muscle", "Supraspinatus", "Infraspinatus", "Teres Minor", "Serratus Anterior"],
        correctIndex: 4
      },
      {
        qNum: 12, type: "SBA", stem: "Which ligament of the liver is the remnant of the umbilical vein?",
        opts: ["Falciform ligament", "Coronary ligament", "Ligamentum teres hepatis", "Ligamentum venosum", "Triangular ligament"],
        correctIndex: 2
      },
      {
        qNum: 13, type: "SBA", stem: "Branch arising from roots of Brachial plexus",
        opts: ["Median Nerve", "Radial nerve", "Ulnar nerve", "Long thoracic nerve", "Axillary nerve"],
        correctIndex: 3
      },
      {
        qNum: 14, type: "SBA", stem: "Which diameter of thoracic cavity increased by pump handle movement?",
        opts: ["Oblique diameter", "Anterior posterior diameter", "Transverse diameter", "Vertical diameter", "All diameter"],
        correctIndex: 1
      },
      {
        qNum: 15, type: "SBA", stem: "Strongest ligament of Hip joint",
        opts: ["Ischiofemoral ligament", "Capsular ligament", "Iliofemoral ligament", "Pubofemoral ligament", "Ligamentum teres femoris"],
        correctIndex: 2
      },
      {
        qNum: 16, type: "SBA", stem: "Conducting system of heart supplied by left coronary artery",
        opts: ["AV node", "SA node", "Purkinje fibers", "Left branch of AV bundle", "Right branch of AV bundle"],
        correctIndex: 1
      },
      {
        qNum: 17, type: "SBA", stem: "Viscera to which right kidney is related",
        opts: ["Pancreas", "Spleen", "Stomach", "Liver", "3rd part of duodenum"],
        correctIndex: 3
      },
      {
        qNum: 18, type: "SBA", stem: "Which muscle forms the inguinal ligament?",
        opts: ["Iliacus muscle", "External Oblique muscle", "Transversus abdominis muscle", "Internal oblique muscle", "Rectus abdominis"],
        correctIndex: 1
      },
      {
        qNum: 19, type: "SBA", stem: "Primary support of uterus",
        opts: ["Pelvic Diaphragm", "Broad ligament", "Uterovesical fold of peritoneum", "Rectovaginal fold of peritoneum", "Rectum"],
        correctIndex: 0
      },
      {
        qNum: 20, type: "SBA", stem: "Keystone of medial longitudinal arch of foot",
        opts: ["Calcaneus", "Navicular", "Medial cuneiform", "Talus", "1st metatarsal"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "cmu-2024-may-p1",
    session: "May 2024",
    year: 2024,
    month: "May",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "New Curriculum",
    page: 5,
    bookPage: "p.80",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Carotid sheath contains",
        items: [
          { label: "a", text: "Internal jugular vein", ans: true },
          { label: "b", text: "External jugular vein", ans: false },
          { label: "c", text: "Common carotid artery", ans: true },
          { label: "d", text: "External carotid artery", ans: false },
          { label: "e", text: "Internal carotid artery", ans: true }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Reticular fiber found in",
        items: [
          { label: "a", text: "Spleen", ans: true },
          { label: "b", text: "Lymph node", ans: true },
          { label: "c", text: "Tendon", ans: false },
          { label: "d", text: "Ligament", ans: false },
          { label: "e", text: "Lung", ans: false }
        ]
      },
      {
        qNum: 3, type: "TF", stem: "Skeletal muscle fiber",
        items: [
          { label: "a", text: "Are spindle in shape", ans: false },
          { label: "b", text: "Has multiple nuclei", ans: true },
          { label: "c", text: "Innervated by autonomic nerve", ans: false },
          { label: "d", text: "Voluntary in function", ans: true },
          { label: "e", text: "Develops from paraxial mesoderm", ans: true }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Avascular structure in the eyeball is",
        opts: ["Retina", "Lens", "Sclera", "Iris", "Choroid"],
        correctIndex: 1
      },
      {
        qNum: 12, type: "SBA", stem: "Wall of artery is thicker than vein is due to",
        opts: ["Absence of valve", "Presence of internal & external elastic lamina", "Presence of oxygenated blood", "Presence of vasa vasorum", "Well developed tunica media"],
        correctIndex: 4
      },
      {
        qNum: 14, type: "SBA", stem: "Which one of the following is the effect of sympathetic system?",
        opts: ["Bronchoconstriction", "Cardio inhibition", "Coronary vasoconstriction", "Decrease peristalsis", "Decrease sweating"],
        correctIndex: 3
      },
      {
        qNum: 15, type: "SBA", stem: "Nissl's granules are present in",
        opts: ["Ependymal cell", "Microglia", "Oligodendrocyte", "Protoplasmic astrocyte", "Pyramidal cell"],
        correctIndex: 4
      },
      {
        qNum: 16, type: "SBA", stem: "Parasympathetic fibers present in",
        opts: ["Optic nerve", "Oculomotor nerve", "Trigeminal nerve", "Accessory nerve", "Hypoglossal nerve"],
        correctIndex: 1
      },
      {
        qNum: 17, type: "SBA", stem: "Hard palate is formed by the following bone",
        opts: ["Ethmoid", "Frontal", "Maxilla", "Zygomatic", "Lacrimal"],
        correctIndex: 2
      },
      {
        qNum: 18, type: "SBA", stem: "Cell present in the lacuna of haversian system is",
        opts: ["Chondroblast", "Osteoblast", "Osteoclast", "Osteoprogenitor", "Osteocyte"],
        correctIndex: 4
      },
      {
        qNum: 19, type: "SBA", stem: "Following are multipolar neuron",
        opts: ["Olfactory cell", "Purkinje cell", "Dorsal root ganglia", "Trigeminal ganglia", "Vestibular ganglion"],
        correctIndex: 1
      },
      {
        qNum: 20, type: "SBA", stem: "Derivatives of pharyngeal pouch",
        opts: ["Thyroid gland", "Thymus", "Parotid gland", "External auditory meatus", "Ear ossicles"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "cmu-2024-may-p2",
    session: "May 2024",
    year: 2024,
    month: "May",
    subject: "Anatomy",
    paper: "Paper-II",
    curriculum: "New Curriculum",
    page: 6,
    bookPage: "p.81",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Structure crossed by the root of the mesentery",
        items: [
          { label: "a", text: "2nd part of the duodenum", ans: false },
          { label: "b", text: "Right psoas major", ans: true },
          { label: "c", text: "Left ureter", ans: false },
          { label: "d", text: "Abdominal aorta", ans: true },
          { label: "e", text: "Left psoas major", ans: false }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Veins end into coronary sinus are",
        items: [
          { label: "a", text: "Great cardiac vein", ans: true },
          { label: "b", text: "Middle cardiac vein", ans: true },
          { label: "c", text: "Anterior cardiac vein", ans: false },
          { label: "d", text: "Small cardiac vein", ans: true },
          { label: "e", text: "Venae cordis minimis", ans: false }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "The groove behind the hilum of right lung lodges",
        opts: ["Descending thoracic aorta", "Azygos vein", "Superior pulmonary vein", "Esophagus", "Trachea"],
        correctIndex: 3
      },
      {
        qNum: 12, type: "SBA", stem: "Most common position of vermiform appendix",
        opts: ["Retro-ileal", "Retro-caecal", "Pelvic", "Anterior to terminal ileum", "Subcaecal"],
        correctIndex: 1
      },
      {
        qNum: 13, type: "SBA", stem: "The most common site of fracture of the clavicle",
        opts: ["Medial end", "Lateral end", "Midpoint", "Junction of the medial two third & lateral one third", "Junction of the lateral two third & medial one third"],
        correctIndex: 3
      },
      {
        qNum: 14, type: "SBA", stem: "The transpyloric plane of the abdomen passes through",
        opts: ["The spleen", "The third part of the duodenum", "The tail of the pancreas", "The origin of the superior mesenteric artery", "The neck of the gallbladder"],
        correctIndex: 3
      },
      {
        qNum: 15, type: "SBA", stem: "In structure of hepatic lobule",
        opts: ["Hepatic lamina extends from periphery to center", "Central vein has Kupffer cells in its wall", "Portal triad lies at the corners of lobule", "Sinusoids lie between two adjacent lobules", "Is based on oxygenation of liver parenchyma"],
        correctIndex: 2
      },
      {
        qNum: 16, type: "SBA", stem: "Lymphatics from the nipple and areola drain mainly into",
        opts: ["Pectoral group of axillary lymph node", "Subscapular group of axillary lymph node", "Central group of axillary lymph node", "Apical group of axillary lymph node", "Parasternal lymph group"],
        correctIndex: 0
      },
      {
        qNum: 17, type: "SBA", stem: "The back of the medial epicondyle of humerus related to",
        opts: ["Radial nerve", "Axillary nerve", "Ulnar nerve", "Median nerve", "None of the above"],
        correctIndex: 2
      },
      {
        qNum: 18, type: "SBA", stem: "Paralysis of which nerve cause foot drop?",
        opts: ["Femoral", "Tibial", "Superficial peroneal", "Deep peroneal", "Obturator"],
        correctIndex: 3
      },
      {
        qNum: 19, type: "SBA", stem: "Pleural reflection lies at which rib level in the mid axillary line?",
        opts: ["6th", "8th", "9th", "10th", "12th"],
        correctIndex: 3
      },
      {
        qNum: 20, type: "SBA", stem: "Anterior relation of sacroiliac joint",
        opts: ["Femoral nerve", "Sciatic nerve", "Obturator nerve", "Round ligament", "Ureter"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "cmu-2024-nov-p1",
    session: "Nov 2024",
    year: 2024,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "New Curriculum",
    page: 7,
    bookPage: "p.82",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Following are paired dural venous sinuses",
        items: [
          { label: "a", text: "Cavernous sinus", ans: true },
          { label: "b", text: "Occipital sinus", ans: false },
          { label: "c", text: "Straight sinus", ans: false },
          { label: "d", text: "Superior sagittal sinus", ans: false },
          { label: "e", text: "Transverse sinus", ans: true }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Following are avascular structure",
        items: [
          { label: "a", text: "Bone", ans: false },
          { label: "b", text: "Cornea", ans: true },
          { label: "c", text: "Dermis", ans: false },
          { label: "d", text: "Epidermis", ans: true },
          { label: "e", text: "Hair", ans: true }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Safety muscle of tongue",
        opts: ["Palatoglossus", "Genioglossus", "Hyoglossus", "Styloglossus", "Geniohyoid"],
        correctIndex: 1
      },
      {
        qNum: 12, type: "SBA", stem: "Muscle that open laryngeal inlet is:",
        opts: ["Aryepiglottic", "Cricothyroid", "Oblique arytenoid", "Thyroarytenoid", "Thyroepiglottic"],
        correctIndex: 4
      },
      {
        qNum: 15, type: "SBA", stem: "Following are bipolar neuron",
        opts: ["Pyramidal cell", "Purkinje cell", "Olfactory cell", "Anterior horn cell", "Stellate cell"],
        correctIndex: 2
      },
      {
        qNum: 17, type: "SBA", stem: "Principal muscle of mastication is",
        opts: ["Buccinator", "Digastric", "Geniohyoid", "Masseter", "Mylohyoid"],
        correctIndex: 3
      },
      {
        qNum: 19, type: "SBA", stem: "Primary cartilaginous joint",
        opts: ["Public symphysis", "Sacroiliac joint", "Lumbosacral joint", "First sternocostal joint", "Temporomandibular"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "cmu-2024-nov-p2",
    session: "Nov 2024",
    year: 2024,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-II",
    curriculum: "New Curriculum",
    page: 8,
    bookPage: "p.83",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Opening of right atrium of heart are",
        items: [
          { label: "a", text: "Superior vena cava", ans: true },
          { label: "b", text: "Coronary sinus", ans: true },
          { label: "c", text: "Anterior cardiac vein", ans: true },
          { label: "d", text: "Pulmonary vein", ans: false },
          { label: "e", text: "Ascending aorta", ans: false }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Carpal tunnel contains the followings",
        items: [
          { label: "a", text: "Flexor pollicis longus tendon", ans: true },
          { label: "b", text: "Tendon of flexor digitorum superficialis", ans: true },
          { label: "c", text: "Flexor carpi radialis", ans: false },
          { label: "d", text: "Median nerve", ans: true },
          { label: "e", text: "Ulnar artery", ans: false }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Strongest ligament of upper limb",
        opts: ["Costoclavicular ligament", "Coracoclavicular ligament", "Suprascapular ligament", "Glenohumeral ligament", "Transverse humeral ligament"],
        correctIndex: 1
      },
      {
        qNum: 12, type: "SBA", stem: "Strong supinator of forearm",
        opts: ["Supinator", "Biceps brachii", "Brachioradialis", "Brachialis", "Coracobrachialis"],
        correctIndex: 1
      },
      {
        qNum: 13, type: "SBA", stem: "Jejunum and ileum develop from",
        opts: ["Foregut", "Midgut", "Hind gut", "Cloaca", "Pharyngeal gut"],
        correctIndex: 1
      },
      {
        qNum: 15, type: "SBA", stem: "Which is not a content of femoral sheath",
        opts: ["Femoral artery", "Femoral vein", "Femoral branch of genitofemoral nerve", "Femoral nerve", "Lymph node of Cloquet"],
        correctIndex: 3
      },
      {
        qNum: 17, type: "SBA", stem: "Referred pain of cholecystitis felt in",
        opts: ["Tip of ninth costal cartilage", "Around umbilicus", "Tip of right shoulder", "Right iliac fossa", "Epigastrium"],
        correctIndex: 2
      },
      {
        qNum: 18, type: "SBA", stem: "The least dilatable part of the urethra is",
        opts: ["Pre-prostatic", "Prostatic", "Membranous", "Spongy", "Penile"],
        correctIndex: 2
      },
      {
        qNum: 19, type: "SBA", stem: "Failure of testis to descend into the scrotum is called",
        opts: ["Hypospadias", "Cryptorchidism", "Epispadias", "Varicocele", "Ectopic testis"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "cmu-2023-nov-p1",
    session: "Nov 2023",
    year: 2023,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "New Curriculum",
    page: 10,
    bookPage: "p.85",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Muscles of soft palate are",
        items: [
          { label: "a", text: "Hyoglossus", ans: false },
          { label: "b", text: "Palatoglossus", ans: true },
          { label: "c", text: "Styloglossus", ans: false },
          { label: "d", text: "Tensor tympani", ans: true },
          { label: "e", text: "Tensor palati", ans: true }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Simple squamous epithelium present in",
        items: [
          { label: "a", text: "Alveoli", ans: true },
          { label: "b", text: "Blood vessel", ans: true },
          { label: "c", text: "Esophagus", ans: false },
          { label: "d", text: "Peritoneum", ans: false },
          { label: "e", text: "Tongue", ans: false }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Extra ocular muscle supplied by Abducent nerve is",
        opts: ["Inferior rectus", "Inferior oblique", "Medial rectus", "Lateral rectus", "Superior oblique"],
        correctIndex: 3
      },
      {
        qNum: 14, type: "SBA", stem: "Betz cell or large pyramidal cell of cerebral cortex present in",
        opts: ["External granular layer", "External pyramidal layer", "Internal granular layer", "Internal pyramidal layer", "Multiform layer"],
        correctIndex: 3
      },
      {
        qNum: 17, type: "SBA", stem: "Posterior neuropore is closed at",
        opts: ["15 day", "20 day", "22th day", "25th day", "28th day"],
        correctIndex: 3
      },
      {
        qNum: 18, type: "SBA", stem: "Safety muscle of larynx is",
        opts: ["Aryepiglotticus", "Lateral cricoarytenoid", "Oblique arytenoid", "Posterior cricoarytenoid", "Thyroarytenoid"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "cmu-2023-nov-p2",
    session: "Nov 2023",
    year: 2023,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-II",
    curriculum: "New Curriculum",
    page: 11,
    bookPage: "p.86",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Contents of middle mediastinum",
        items: [
          { label: "a", text: "Pericardium", ans: true },
          { label: "b", text: "Arch of aorta", ans: false },
          { label: "c", text: "Phrenic nerve", ans: true },
          { label: "d", text: "Pulmonary nerve", ans: true },
          { label: "e", text: "Vagus nerve", ans: false }
        ]
      },
      // 11-20 SBA
      {
        qNum: 11, type: "SBA", stem: "Structure passes through vena caval opening",
        opts: ["Superior vena cava", "Inferior vena cava", "Thoracic duct", "Gastric nerve", "Azygos vein"],
        correctIndex: 1
      },
      {
        qNum: 12, type: "SBA", stem: "Which one is not present in gastric gland?",
        opts: ["Chief cell", "M cell", "Parietal cell", "Mucus neck cell", "G cell"],
        correctIndex: 1
      },
      {
        qNum: 13, type: "SBA", stem: "Which one of the following is retroperitoneal organ?",
        opts: ["Stomach", "Spleen", "Kidney", "Transverse colon", "Small intestine"],
        correctIndex: 2
      },
      {
        qNum: 14, type: "SBA", stem: "Following is the continuation of axillary artery",
        opts: ["Subclavian artery", "Lateral thoracic artery", "Brachial artery", "Subscapular artery", "Circumflex humeral artery"],
        correctIndex: 2
      },
      {
        qNum: 15, type: "SBA", stem: "Loss of extension of knee joint result from injury to",
        opts: ["Sciatic nerve", "Tibial nerve", "Femoral nerve", "Deep peroneal nerve", "Superficial peroneal nerve"],
        correctIndex: 2
      },
      {
        qNum: 16, type: "SBA", stem: "Deltoid muscle",
        opts: ["Is a multipennate muscle", "Is supplied by radial nerve", "Forms the main bulk of back of arm", "Has insertion on spinous process of scapula", "Clavicular fibers are involved in abduction of shoulder joint"],
        correctIndex: 0
      },
      {
        qNum: 17, type: "SBA", stem: "Duodenum is developed from",
        opts: ["Midgut", "Foregut", "Foregut and midgut", "Hindgut", "Pharyngeal gut"],
        correctIndex: 2
      },
      {
        qNum: 18, type: "SBA", stem: "The commonest type of vermiform appendix is",
        opts: ["Paracolic", "Subcaecal", "Retrocaecal", "Pelvic", "Splenic"],
        correctIndex: 2
      },
      {
        qNum: 20, type: "SBA", stem: "The SA node is located at the",
        opts: ["Interatrial septum", "Coronary sulcus", "Fossa ovalis", "Crista terminalis", "Interventricular septum"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "cmu-2022-nov-p1",
    session: "Nov 2022",
    year: 2022,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "Old/Previous",
    page: 12,
    bookPage: "p.87",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 2, type: "TF", stem: "The gall bladder",
        items: [
          { label: "a", text: "Has capacity of 30-50ml", ans: true },
          { label: "b", text: "Stores bile", ans: true },
          { label: "c", text: "Is supplied by hepatic artery", ans: false },
          { label: "d", text: "Develops from midgut", ans: false },
          { label: "e", text: "Drains by cystic duct", ans: true }
        ]
      },
      {
        qNum: 5, type: "TF", stem: "Arch of the Aorta",
        items: [
          { label: "a", text: "Has three branches", ans: true },
          { label: "b", text: "Is an elastic artery", ans: true },
          { label: "c", text: "Lies in middle mediastinum", ans: false },
          { label: "d", text: "Arises from left atrium", ans: false },
          { label: "e", text: "Is a retroperitoneal structure", ans: false }
        ]
      },
      // 11-20
      {
        qNum: 11, type: "SBA", stem: "Nerves related to humerus",
        opts: ["Axillary nerve", "Musculocutaneous", "Ulnar nerve", "Radial nerve", "Long thoracic nerve"],
        correctIndex: 3
      },
      {
        qNum: 15, type: "SBA", stem: "Muscles supplied by musculocutaneous nerve",
        opts: ["Biceps brachii", "Teres minor", "Coracobrachialis", "Subscapularis", "Brachialis"],
        correctIndex: 0
      },
      {
        qNum: 16, type: "SBA", stem: "Umbilical cord contains",
        opts: ["Yolk sac with vitelline duct", "Allantois", "Two veins", "One artery", "Wharton's jelly"],
        correctIndex: 4
      },
      {
        qNum: 20, type: "SBA", stem: "Trachea",
        opts: ["Lined by columnar epithelium", "Contain hyaline cartilage", "Divides at the level of T4 vertebra", "Contains goblet cells", "Contains c-shaped cartilage"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "cmu-2022-may-p1",
    session: "May 2022",
    year: 2022,
    month: "May",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "Previous",
    page: 14,
    bookPage: "p.89",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 3, type: "TF", stem: "Turner syndrome characterized by",
        items: [
          { label: "a", text: "Infertile", ans: true },
          { label: "b", text: "Karyotype is 45X0", ans: true },
          { label: "c", text: "Karyotype is 47XXX", ans: false },
          { label: "d", text: "Karyotype is 47XXY", ans: false },
          { label: "e", text: "Tall stature", ans: false }
        ]
      },
      {
        qNum: 4, type: "TF", stem: "Results of fertilization are",
        items: [
          { label: "a", text: "Determination of chromosomal sex", ans: true },
          { label: "b", text: "Initiation of cleavage", ans: true },
          { label: "c", text: "Initiation of meiotic cell division", ans: false },
          { label: "d", text: "Restoration of diploid chromosomes", ans: true },
          { label: "e", text: "Restoration of haploid chromosomes", ans: false }
        ]
      },
      {
        qNum: 11, type: "SBA", stem: "Taste sensation from the tongue carried by",
        opts: ["Abducent nerve", "Accessory nerve", "Facial nerve", "Glossopharyngeal nerve", "Hypoglossal nerve"],
        correctIndex: 2
      },
      {
        qNum: 19, type: "SBA", stem: "Following are commissural fibers",
        opts: ["Corpus callosum", "Habenular commissure", "Internal capsule", "Optic radiation", "Superior longitudinal fasciculus"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "cmu-2021-nov-p1",
    session: "Nov 2021",
    year: 2021,
    month: "Nov",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "Previous",
    page: 16,
    bookPage: "p.91",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Phagocytic cells are",
        items: [
          { label: "a", text: "Macrophage", ans: true },
          { label: "b", text: "Kupffer cell", ans: true },
          { label: "c", text: "Fibroblast", ans: false },
          { label: "d", text: "Osteocyte", ans: false },
          { label: "e", text: "Microglia", ans: true }
        ]
      },
      {
        qNum: 2, type: "TF", stem: "Meiotic type of cell division",
        items: [
          { label: "a", text: "Is called reduction division", ans: true },
          { label: "b", text: "Occurs in germ cells", ans: true },
          { label: "c", text: "Occurs in somatic cells", ans: false },
          { label: "d", text: "Causes genetic variation in the daughter cells", ans: true },
          { label: "e", text: "Produce two daughter cells", ans: false }
        ]
      },
      {
        qNum: 11, type: "SBA", stem: "Following are motor cranial nerve",
        opts: ["Hypoglossal", "Optic", "Trochlear", "Trigeminal", "Facial"],
        correctIndex: 0
      },
      {
        qNum: 17, type: "SBA", stem: "Brainstem includes",
        opts: ["Mid brain", "Cerebellum", "Pons", "Thalamus", "Medulla oblongata"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "cmu-2021-may-p1",
    session: "May 2021",
    year: 2021,
    month: "May",
    subject: "Anatomy",
    paper: "Paper-I",
    curriculum: "Previous",
    page: 18,
    bookPage: "p.93",
    totalMarks: 20,
    time: "30 minutes",
    questions: [
      {
        qNum: 1, type: "TF", stem: "Membranous organelles are",
        items: [
          { label: "a", text: "Lysosomes", ans: true },
          { label: "b", text: "Endoplasmic reticulum", ans: true },
          { label: "c", text: "Mitochondria", ans: true },
          { label: "d", text: "Microfilaments", ans: false },
          { label: "e", text: "Ribosomes", ans: false }
        ]
      },
      {
        qNum: 9, type: "TF", stem: "Functional end artery present in",
        items: [
          { label: "a", text: "Liver", ans: false },
          { label: "b", text: "Heart", ans: true },
          { label: "c", text: "Lung", ans: false },
          { label: "d", text: "Brain", ans: true },
          { label: "e", text: "Retina", ans: true }
        ]
      },
      {
        qNum: 11, type: "SBA", stem: "Following are sensory cranial nerve",
        opts: ["Optic", "Facial", "Olfactory", "Trigeminal", "Glossopharyngeal"],
        correctIndex: 0
      },
      {
        qNum: 16, type: "SBA", stem: "Frontal lobe of cerebrum contains",
        opts: ["Primary sensory area", "Primary motor area", "Broca's area", "Frontal eye field", "Visual area"],
        correctIndex: 1
      }
    ]
  }
];

const totalQuestions = papers.reduce((acc, p) => acc + p.questions.length, 0);
console.log('Compiled exam papers:', papers.length, 'Total questions:', totalQuestions);

const out = `// Authentic Chittagong Medical University (CMU) First Professional MBBS Anatomy MCQ Examination Papers
// Source: Anatomy_mcq_5660914a.pdf (19 pages, Orbit Question Bank 18th Edition p.76 - p.94)

export interface McqExamPaper {
  id: string;
  session: string;
  year: number;
  month: "May" | "Nov";
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
}

export const AUTHENTIC_MCQ_PAPERS: McqExamPaper[] = ${JSON.stringify(papers, null, 2)};
`;

fs.writeFileSync('./src/data/mcqData.ts', out);
console.log('Successfully wrote src/data/mcqData.ts');
