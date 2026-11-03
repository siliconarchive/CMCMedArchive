const fs = require('fs');

const anaText = fs.readFileSync('ana_text.txt', 'utf8');
const bioText = fs.readFileSync('bio_text.txt', 'utf8');

console.log("Analyzing Anatomy text...");
// Find all 19 papers
const anaPaperRegex = /([A-Za-z]+ \d{4} - Paper I{1,2}(?: \([^)]+\))? \(Orbit p\.\d+\))/g;
const anaMatches = [];
let m;
while ((m = anaPaperRegex.exec(anaText)) !== null) {
  anaMatches.push({ title: m[1], idx: m.index, len: m[0].length });
}

console.log("Anatomy papers found:", anaMatches.length);

let totalAnaParsed = 0;
anaMatches.forEach((pm, i) => {
  const nextIdx = (i < anaMatches.length - 1) ? anaMatches[i+1].idx : anaText.length;
  const pChunk = anaText.slice(pm.idx + pm.len, nextIdx);
  
  // Find questions
  const qMatches = [];
  const qRegex = /(?:^|\n)\s*(\d{1,2})\.\s+([^\n]+)/g;
  let qm;
  while ((qm = qRegex.exec(pChunk)) !== null) {
    const num = parseInt(qm[1], 10);
    if (num >= 1 && num <= 20) {
      qMatches.push({ num, stem: qm[2], idx: qm.index });
    }
  }
  // Deduplicate
  const seen = new Set();
  const cleanQ = [];
  qMatches.forEach(q => {
    if (!seen.has(q.num)) {
      seen.add(q.num);
      cleanQ.push(q);
    }
  });
  totalAnaParsed += cleanQ.length;
  if (cleanQ.length !== 20) {
    console.warn(`Warning: ${pm.title} has ${cleanQ.length} questions!`);
  }
});

console.log("Total Anatomy questions extracted:", totalAnaParsed);

console.log("\nAnalyzing Biochemistry text...");
const bioPaperRegex = /([A-Za-z]+ \d{4} — Paper I{1,2}(?: \([^)]+\))?)/g;
const bioMatches = [];
while ((m = bioPaperRegex.exec(bioText)) !== null) {
  bioMatches.push({ title: m[1], idx: m.index, len: m[0].length });
}

console.log("Biochemistry papers found:", bioMatches.length);

let totalBioParsed = 0;
bioMatches.forEach((pm, i) => {
  const nextIdx = (i < bioMatches.length - 1) ? bioMatches[i+1].idx : bioText.length;
  const pChunk = bioText.slice(pm.idx + pm.len, nextIdx);

  const qMatches = [];
  const qRegex = /(?:^|\n)\s*Q(\d{1,2})\.\s+([^\n]+)/g;
  let qm;
  while ((qm = qRegex.exec(pChunk)) !== null) {
    const num = parseInt(qm[1], 10);
    if (num >= 1 && num <= 20) {
      qMatches.push({ num, stem: qm[2], idx: qm.index });
    }
  }
  const seen = new Set();
  const cleanQ = [];
  qMatches.forEach(q => {
    if (!seen.has(q.num)) {
      seen.add(q.num);
      cleanQ.push(q);
    }
  });
  totalBioParsed += cleanQ.length;
  if (cleanQ.length !== 20) {
    console.warn(`Warning: ${pm.title} has ${cleanQ.length} questions!`);
  }
});

console.log("Total Biochemistry questions extracted:", totalBioParsed);
console.log("GRAND TOTAL QUESTIONS:", totalAnaParsed + totalBioParsed);
