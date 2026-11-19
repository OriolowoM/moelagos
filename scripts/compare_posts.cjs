const fs = require('fs');
const path = require('path');

function parseCsv(content) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField);
      currentField = '';
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }
  return rows;
}

const currentPosts = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/posts.json'), 'utf8'));
const currentIds = new Set(currentPosts.map(p => String(p.id)));

const csvRaw = fs.readFileSync(path.join(__dirname, '../pages/Posts-Export-2026-November-19-2005.csv'), 'utf8');
const rows = parseCsv(csvRaw);
const header = rows[0].map(h => h.replace(/^\uFEFF/, '').trim());
const idIdx = header.indexOf('ID');
const titleIdx = header.indexOf('Title');
const dateIdx = header.indexOf('Date');
const statusIdx = header.indexOf('Status');

const missingInCurrent = [];
rows.slice(1).forEach(r => {
  if (r[statusIdx] === 'publish') {
    const id = r[idIdx];
    if (!currentIds.has(String(id))) {
      missingInCurrent.push({ id, title: r[titleIdx], date: r[dateIdx] });
    }
  }
});

console.log('Missing posts count in current posts.json:', missingInCurrent.length);
missingInCurrent.forEach(p => console.log(`[${p.id}] ${p.date} - ${p.title}`));
