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

const csvRaw = fs.readFileSync(path.join(__dirname, '../pages/Pages-Export-2026-November-19-1823.csv'), 'utf8');
const rows = parseCsv(csvRaw);
const header = rows[0].map(h => h.replace(/^\uFEFF/, '').trim());
const idIdx = header.indexOf('ID');
const titleIdx = header.indexOf('Title');
const slugIdx = header.indexOf('Slug');
const statusIdx = header.indexOf('Status');
const contentIdx = header.indexOf('Content');
const parentIdx = header.indexOf('Parent');
const orderIdx = header.indexOf('Order');
const permalinkIdx = header.indexOf('Permalink');

const pages = rows.slice(1).map(r => ({
  id: r[idIdx],
  title: r[titleIdx],
  slug: r[slugIdx],
  status: r[statusIdx],
  contentLength: (r[contentIdx] || '').length,
  permalink: r[permalinkIdx],
  parent: r[parentIdx],
  order: r[orderIdx]
}));

console.log('Total pages parsed:', pages.length);
pages.filter(p => p.status === 'publish').forEach(p => {
  console.log(`[${p.id}] slug: "${p.slug}" | title: "${p.title}" (${p.contentLength} chars)`);
});
