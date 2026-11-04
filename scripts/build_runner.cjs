
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

// Assemble full database...
console.log('Building questions dataset...');
