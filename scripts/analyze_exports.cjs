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
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
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

const pagesCsvRaw = fs.readFileSync(path.join(__dirname, '../pages/Pages-Export-2026-November-19-1823.csv'), 'utf8');
const pagesRows = parseCsv(pagesCsvRaw);
const pagesHeader = pagesRows[0].map(h => h.replace(/^\uFEFF/, '').trim());
console.log('Pages CSV total rows:', pagesRows.length - 1);
console.log('Pages Header:', pagesHeader);

const postsCsvRaw = fs.readFileSync(path.join(__dirname, '../pages/Posts-Export-2026-November-19-2005.csv'), 'utf8');
const postsRows = parseCsv(postsCsvRaw);
const postsHeader = postsRows[0].map(h => h.replace(/^\uFEFF/, '').trim());
console.log('Posts CSV total rows:', postsRows.length - 1);
console.log('Posts Header:', postsHeader);

// Inspect statuses & titles in Pages
const pageStatusIdx = pagesHeader.indexOf('Status');
const pageTitleIdx = pagesHeader.indexOf('Title');
const pageSlugIdx = pagesHeader.indexOf('Slug');
const pageIdIdx = pagesHeader.indexOf('ID');

console.log('\n--- PAGES SUMMARY ---');
const pageStatuses = {};
pagesRows.slice(1).forEach(r => {
  const status = r[pageStatusIdx];
  pageStatuses[status] = (pageStatuses[status] || 0) + 1;
});
console.log('Page statuses:', pageStatuses);

// Inspect statuses & categories in Posts
const postStatusIdx = postsHeader.indexOf('Status');
const postTitleIdx = postsHeader.indexOf('Title');
const postCatIdx = postsHeader.indexOf('Categories');
console.log('\n--- POSTS SUMMARY ---');
const postStatuses = {};
postsRows.slice(1).forEach(r => {
  const status = r[postStatusIdx];
  postStatuses[status] = (postStatuses[status] || 0) + 1;
});
console.log('Post statuses:', postStatuses);
