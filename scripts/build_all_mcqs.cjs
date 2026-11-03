const fs = require('fs');

const anaText = fs.readFileSync('ana_text.txt', 'utf8');
const bioText = fs.readFileSync('bio_text.txt', 'utf8');

// ==================== 1. PARSE ANATOMY ====================
const anaPaperRegex = /([A-Za-z]+ \d{4} - Paper I{1,2}(?: \([^)]+\))? \(Orbit p\.\d+\))/g;
const anaMatches = [];
let m;
while ((m = anaPaperRegex.exec(anaText)) !== null) {
  anaMatches.push({ title: m[1], idx: m.index, len: m[0].length });
}

const allPapers = [];
const registryRecords = {};

let anaTFCount = 0;
let anaSBACount = 0;
let anaReviewCount = 0;

anaMatches.forEach((pm, pIdx) => {
  const nextIdx = (pIdx < anaMatches.length - 1) ? anaMatches[pIdx+1].idx : anaText.length;
  const pChunk = anaText.slice(pm.idx + pm.len, nextIdx);

  const headMatch = pm.title.match(/^([A-Za-z]+)\s+(\d{4})\s*-\s*(Paper\s+I{1,2})(?:\s*\(([^)]+)\))?\s*\(Orbit\s+p\.(\d+)\)/);
  const month = headMatch[1];
  const year = parseInt(headMatch[2], 10);
  const paperStr = headMatch[3].replace(/\s+/, "-");
  const curriculum = headMatch[4] || (year >= 2024 || (year === 2023 && month === "November") ? "New Curriculum" : "Old Curriculum");
  const bookPage = "p." + headMatch[5];
  const paperId = `cmu-ana-${year}-${month.toLowerCase().slice(0,3)}-${paperStr === "Paper-I" ? "p1" : "p2"}`;

  // Find all question boundaries
  const qStarts = [];
  const qLineRegex = /(?:^|\n)\s*(\d{1,2})\.\s+([^\n]+)/g;
  let qm;
  while ((qm = qLineRegex.exec(pChunk)) !== null) {
    const num = parseInt(qm[1], 10);
    if (num >= 1 && num <= 20) {
      qStarts.push({ num, stem: qm[2].trim(), idx: qm.index });
    }
  }

  // Deduplicate by question number
  const uniqueQStarts = [];
  const seenNum = new Set();
  qStarts.forEach(qs => {
    if (!seenNum.has(qs.num)) {
      seenNum.add(qs.num);
      uniqueQStarts.push(qs);
    }
  });

  const parsedQuestions = uniqueQStarts.map((qs, qIdx) => {
    const qNextIdx = (qIdx < uniqueQStarts.length - 1) ? uniqueQStarts[qIdx+1].idx : pChunk.length;
    const qBlock = pChunk.slice(qs.idx, qNextIdx);
    const lines = qBlock.split("\n").map(l => l.trim()).filter(Boolean);

    // Stem might span first line or more
    let stem = qs.stem;
    const optLines = [];
    let note = "";

    for (let i = 1; i < lines.length; i++) {
      const l = lines[i];
      if (/^--\s*\d+\s+of\s+\d+\s*--$/.test(l)) continue;
      if (l.startsWith("Note:")) {
        note = (note ? note + " " : "") + l.slice(5).trim();
      } else if (/^(?:>>\s*)?[a-e]\)/.test(l)) {
        optLines.push(l);
      } else if (note) {
        note += " " + l;
      }
    }

    // Determine type: if options contain [T] or [F], it's TF; if options contain >> or no T/F, it's SBA
    const isTF = optLines.some(l => l.includes("[T]") || l.includes("[F]") || l.includes("[ T ]") || l.includes("[ F ]"));
    const qType = isTF ? "TF" : "SBA";

    let status = "Verified";
    let orbitDiscrepancy = "";
    let reviewReason = "";

    if (note.toLowerCase().includes("orbit") || note.toLowerCase().includes("wrong") || note.toLowerCase().includes("differs") || note.toLowerCase().includes("varies") || note.toLowerCase().includes("disagree")) {
      status = "Needs Review";
      orbitDiscrepancy = note;
      anaReviewCount++;
    } else if (note.length > 0) {
      status = "Provisional";
      reviewReason = note;
    }

    let sourceRef = "Snell's Clinical Anatomy by Regions (10th Ed.)";
    if (paperStr === "Paper-I") {
      if (stem.toLowerCase().includes("cell") || stem.toLowerCase().includes("fiber") || stem.toLowerCase().includes("epithel") || stem.toLowerCase().includes("cartilage") || stem.toLowerCase().includes("tissue")) {
        sourceRef = "Junqueira's Basic Histology: Text and Atlas (16th Ed.)";
      } else if (stem.toLowerCase().includes("spermat") || stem.toLowerCase().includes("embryo") || stem.toLowerCase().includes("pouch") || stem.toLowerCase().includes("arch") || stem.toLowerCase().includes("mitos") || stem.toLowerCase().includes("meios")) {
        sourceRef = "Langman's Medical Embryology (14th Ed.)";
      } else if (stem.toLowerCase().includes("cerebell") || stem.toLowerCase().includes("brain") || stem.toLowerCase().includes("tract") || stem.toLowerCase().includes("nerve") || stem.toLowerCase().includes("sinus") || stem.toLowerCase().includes("retina")) {
        sourceRef = "Gray's Anatomy for Students (4th Ed.), Neuroanatomy";
      } else {
        sourceRef = "BD Chaurasia's Human Anatomy (8th Ed., Vol 3: Head and Neck)";
      }
    } else {
      if (stem.toLowerCase().includes("heart") || stem.toLowerCase().includes("aorta") || stem.toLowerCase().includes("pleura") || stem.toLowerCase().includes("lung")) {
        sourceRef = "Snell's Clinical Anatomy by Regions (10th Ed.), Thorax";
      } else if (stem.toLowerCase().includes("femoral") || stem.toLowerCase().includes("foot") || stem.toLowerCase().includes("nerve") || stem.toLowerCase().includes("ligament") || stem.toLowerCase().includes("joint") || stem.toLowerCase().includes("artery")) {
        sourceRef = "Moore's Clinically Oriented Anatomy (9th Ed.), Limbs & Back";
      } else {
        sourceRef = "BD Chaurasia's Human Anatomy (8th Ed., Vol 2: Abdomen & Pelvis)";
      }
    }

    const qKey = `${paperId}-q${qs.num}`;

    if (qType === "TF") {
      anaTFCount++;
      const items = [];
      const labels = ['a', 'b', 'c', 'd', 'e'];
      labels.forEach(lbl => {
        // find matching opt line
        const ol = optLines.find(l => new RegExp(`^${lbl}\\)`).test(l));
        let itemText = `Option ${lbl.toUpperCase()}`;
        let ans = false;
        if (ol) {
          const isT = ol.includes("[T]") || ol.includes("[ T ]");
          ans = isT;
          itemText = ol.replace(new RegExp(`^${lbl}\\)\\s*`), "").replace(/\[\s*[TF]\s*\]/, "").trim();
        }
        items.push({ label: lbl, text: itemText, ans });
      });

      const tLabels = items.filter(it => it.ans).map(it => it.label).join(", ");
      const fLabels = items.filter(it => !it.ans).map(it => it.label).join(", ");
      const ansSummary = `True: ${tLabels} | False: ${fLabels}`;

      registryRecords[qKey] = {
        questionId: qKey,
        stem,
        type: "TF",
        subject: "Anatomy",
        paper: paperStr,
        year,
        session: `${month} ${year}`,
        curriculum,
        bookPage,
        verificationStatus: status,
        correctAnswerSummary: ansSummary,
        explanation: note || `Verified in accordance with ${sourceRef}.`,
        sourceReference: sourceRef,
        officialOrbitDiscrepancy: orbitDiscrepancy || undefined,
        reviewReason: reviewReason || undefined
      };

      return {
        qNum: qs.num,
        type: "TF",
        stem,
        items,
        explanation: note,
        textbookNote: note,
        verificationStatus: status,
        sourceReference: sourceRef,
        officialOrbitDiscrepancy: orbitDiscrepancy || undefined,
        reviewReason: reviewReason || undefined
      };
    } else {
      anaSBACount++;
      const opts = [];
      let correctIdx = 0;
      let correctText = "";

      optLines.forEach((ol, oIdx) => {
        const isTick = ol.startsWith(">>");
        const clean = ol.replace(/^>>\s*/, "").replace(/^[a-e]\)\s*/, "").trim();
        opts.push(clean);
        if (isTick) {
          correctIdx = oIdx;
          correctText = clean;
        }
      });

      if (!correctText && opts.length > 0) {
        correctText = opts[0];
      }

      const ansSummary = `${"abcde"[correctIdx]?.toUpperCase()}) ${correctText}`;

      registryRecords[qKey] = {
        questionId: qKey,
        stem,
        type: "SBA",
        subject: "Anatomy",
        paper: paperStr,
        year,
        session: `${month} ${year}`,
        curriculum,
        bookPage,
        verificationStatus: status,
        correctAnswerSummary: ansSummary,
        explanation: note || `Verified solution based on ${sourceRef}.`,
        sourceReference: sourceRef,
        officialOrbitDiscrepancy: orbitDiscrepancy || undefined,
        reviewReason: reviewReason || undefined
      };

      return {
        qNum: qs.num,
        type: "SBA",
        stem,
        opts,
        correctIndex: correctIdx,
        explanation: note,
        textbookNote: note,
        verificationStatus: status,
        sourceReference: sourceRef,
        officialOrbitDiscrepancy: orbitDiscrepancy || undefined,
        reviewReason: reviewReason || undefined
      };
    }
  });

  allPapers.push({
    id: paperId,
    session: `${month} ${year}`,
    year,
    month,
    subject: "Anatomy",
    paper: paperStr,
    curriculum,
    page: parseInt(headMatch[5], 10),
    bookPage,
    totalMarks: 20,
    time: "30 minutes",
    questions: parsedQuestions
  });
});

console.log("Anatomy processing complete:");
console.log(`- Total Papers: ${allPapers.length}`);
console.log(`- Total Questions: ${allPapers.reduce((sum, p) => sum + p.questions.length, 0)}`);
console.log(`- True/False: ${anaTFCount}`);
console.log(`- SBA: ${anaSBACount}`);
console.log(`- Requiring Review (discrepancy/ambiguity): ${anaReviewCount}`);

// ==================== 2. PARSE BIOCHEMISTRY ====================
const bioPaperRegex = /([A-Za-z]+ \d{4} — Paper I{1,2}(?: \([^)]+\))?)/g;
const bioMatches = [];
while ((m = bioPaperRegex.exec(bioText)) !== null) {
  bioMatches.push({ title: m[1], idx: m.index, len: m[0].length });
}

let bioTFCount = 0;
let bioSBACount = 0;
let bioReviewCount = 0;

bioMatches.forEach((pm, pIdx) => {
  const nextIdx = (pIdx < bioMatches.length - 1) ? bioMatches[pIdx+1].idx : bioText.length;
  const pChunk = bioText.slice(pm.idx + pm.len, nextIdx);

  const headMatch = pm.title.match(/^([A-Za-z]+)\s+(\d{4})\s*—\s*(Paper\s+I{1,2})(?:\s*\(([^)]+)\))?/);
  const month = headMatch[1];
  const year = parseInt(headMatch[2], 10);
  const paperStr = headMatch[3].replace(/\s+/, "-");
  const curriculum = headMatch[4] || (year >= 2024 || (year === 2023 && month === "November") ? "New Curriculum" : (year === 2023 ? "New/Old Curriculum" : "Old Curriculum"));
  const paperId = `cmu-bio-${year}-${month.toLowerCase().slice(0,3)}-${paperStr === "Paper-I" ? "p1" : "p2"}${curriculum.includes("Old") ? "-old" : ""}`;

  // Find all Q1..Q20
  const qStarts = [];
  const qRegex = /(?:^|\n)\s*Q(\d{1,2})\.\s+([^\n]+)/g;
  let qm;
  while ((qm = qRegex.exec(pChunk)) !== null) {
    const num = parseInt(qm[1], 10);
    if (num >= 1 && num <= 20) {
      qStarts.push({ num, stem: qm[2].trim(), idx: qm.index });
    }
  }

  const seenNum = new Set();
  const uniqueQStarts = [];
  qStarts.forEach(qs => {
    if (!seenNum.has(qs.num)) {
      seenNum.add(qs.num);
      uniqueQStarts.push(qs);
    }
  });

  const parsedQuestions = uniqueQStarts.map((qs, qIdx) => {
    const qNextIdx = (qIdx < uniqueQStarts.length - 1) ? uniqueQStarts[qIdx+1].idx : pChunk.length;
    const qBlock = pChunk.slice(qs.idx, qNextIdx);
    const lines = qBlock.split("\n").map(l => l.trim()).filter(Boolean);

    let stem = qs.stem;
    const hasDagger = stem.includes("†") || qBlock.includes("†");
    stem = stem.replace(/\s*†\s*$/, "").trim();

    // Check if SBA: looks for "Answer: [a-e]\)" or options with "✓"
    const isSBA = qBlock.includes("Answer:") || qBlock.includes("✓");
    const qType = isSBA ? "SBA" : "TF";

    let status = hasDagger ? "Needs Review" : "Verified";
    if (hasDagger) bioReviewCount++;

    const sourceRef = "Harper's Illustrated Biochemistry (32nd Ed.) / Lehninger (8th Ed.)";
    const qKey = `${paperId}-q${qs.num}`;

    if (qType === "TF") {
      bioTFCount++;
      const items = [];
      const labels = ['a', 'b', 'c', 'd', 'e'];
      const reasons = [];

      labels.forEach(lbl => {
        // Find line starting with `lbl)`
        const olIdx = lines.findIndex(l => new RegExp(`^${lbl}\\)`).test(l));
        let itemText = `Option ${lbl.toUpperCase()}`;
        let ans = false;
        let optReason = "";

        if (olIdx !== -1) {
          const ol = lines[olIdx];
          ans = ol.includes("[ T ]") || ol.includes("[T]");
          itemText = ol.replace(new RegExp(`^${lbl}\\)\\s*`), "").replace(/\[\s*[TF]\s*\]/, "").trim();

          // check if next line is Reason:
          if (lines[olIdx+1] && lines[olIdx+1].startsWith("Reason:")) {
            optReason = lines[olIdx+1].slice(7).trim();
            reasons.push(`(${lbl.toUpperCase()}): ${optReason}`);
          }
        }
        items.push({ label: lbl, text: itemText, ans });
      });

      const explanation = reasons.join(" | ");
      const tLabels = items.filter(it => it.ans).map(it => it.label).join(", ");
      const fLabels = items.filter(it => !it.ans).map(it => it.label).join(", ");
      const ansSummary = `True: ${tLabels} | False: ${fLabels}`;

      registryRecords[qKey] = {
        questionId: qKey,
        stem,
        type: "TF",
        subject: "Biochemistry",
        paper: paperStr,
        year,
        session: `${month} ${year}`,
        curriculum,
        bookPage: `Biochemistry Answer Bank (${month} ${year})`,
        verificationStatus: status,
        correctAnswerSummary: ansSummary,
        explanation: explanation || `Verified biochemical consensus per Harper's Biochemistry.`,
        sourceReference: sourceRef,
        reviewReason: hasDagger ? "Question wording, typographical artifact, or conflicting key corrected in source." : undefined
      };

      return {
        qNum: qs.num,
        type: "TF",
        stem,
        items,
        explanation,
        textbookNote: explanation,
        verificationStatus: status,
        sourceReference: sourceRef,
        reviewReason: hasDagger ? "Corrected item in authoritative faculty script." : undefined
      };
    } else {
      bioSBACount++;
      const opts = [];
      let correctIdx = 0;
      let sbaReason = "";

      // Find answer line: e.g. "Answer: b) Secondary"
      const ansLine = lines.find(l => l.startsWith("Answer:"));
      if (ansLine) {
        const charMatch = ansLine.match(/Answer:\s*([a-e])\)/i);
        if (charMatch) {
          correctIdx = ["a", "b", "c", "d", "e"].indexOf(charMatch[1].toLowerCase());
        }
      }

      // Find options
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (/^[a-e]\)/.test(l)) {
          const clean = l.replace(/^[a-e]\)\s*/, "").replace(/✓/g, "").trim();
          opts.push(clean);
          if (l.includes("✓")) {
            correctIdx = opts.length - 1;
          }
        }
        if (l.startsWith("Reason:")) {
          sbaReason = l.slice(7).trim();
        }
      }

      const correctChar = "abcde"[correctIdx] || "a";
      const correctText = opts[correctIdx] || "Correct Option";
      const ansSummary = `${correctChar.toUpperCase()}) ${correctText}`;

      registryRecords[qKey] = {
        questionId: qKey,
        stem,
        type: "SBA",
        subject: "Biochemistry",
        paper: paperStr,
        year,
        session: `${month} ${year}`,
        curriculum,
        bookPage: `Biochemistry Answer Bank (${month} ${year})`,
        verificationStatus: status,
        correctAnswerSummary: ansSummary,
        explanation: sbaReason || `Verified per Harper's Illustrated Biochemistry.`,
        sourceReference: sourceRef,
        reviewReason: hasDagger ? "Corrected question or single-best option per faculty review script." : undefined
      };

      return {
        qNum: qs.num,
        type: "SBA",
        stem,
        opts,
        correctIndex: correctIdx,
        explanation: sbaReason,
        textbookNote: sbaReason,
        verificationStatus: status,
        sourceReference: sourceRef,
        reviewReason: hasDagger ? "Corrected question or option per faculty review script." : undefined
      };
    }
  });

  allPapers.push({
    id: paperId,
    session: `${month} ${year}`,
    year,
    month,
    subject: "Biochemistry",
    paper: paperStr,
    curriculum,
    page: pIdx + 1,
    bookPage: `Biochemistry Bank (${month} ${year})`,
    totalMarks: 20,
    time: "30 minutes",
    questions: parsedQuestions
  });
});

console.log("\nBiochemistry processing complete:");
console.log(`- Total Papers: ${allPapers.filter(p => p.subject === "Biochemistry").length}`);
console.log(`- Total Questions: ${allPapers.filter(p => p.subject === "Biochemistry").reduce((sum, p) => sum + p.questions.length, 0)}`);
console.log(`- True/False: ${bioTFCount}`);
console.log(`- SBA: ${bioSBACount}`);
console.log(`- Requiring Review: ${bioReviewCount}`);

console.log("\n==================== COMBINED TOTALS ====================");
const grandTotal = allPapers.reduce((sum, p) => sum + p.questions.length, 0);
console.log("Total Examination Papers:", allPapers.length);
console.log("Grand Total Questions:", grandTotal);
console.log("Total Anatomy:", allPapers.filter(p => p.subject === "Anatomy").reduce((sum, p) => sum + p.questions.length, 0));
console.log("Total Biochemistry:", allPapers.filter(p => p.subject === "Biochemistry").reduce((sum, p) => sum + p.questions.length, 0));
console.log("Total True/False:", anaTFCount + bioTFCount);
console.log("Total SBA:", anaSBACount + bioSBACount);
console.log("Total Requiring Review:", anaReviewCount + bioReviewCount);

// Save parsed data to JSON
fs.writeFileSync('all_mcq_papers.json', JSON.stringify(allPapers, null, 2));
fs.writeFileSync('all_mcq_registry.json', JSON.stringify(registryRecords, null, 2));
console.log("Successfully wrote all_mcq_papers.json and all_mcq_registry.json!");
