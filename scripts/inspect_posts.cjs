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

const csvRaw = fs.readFileSync(path.join(__dirname, '../pages/Posts-Export-2026-November-19-2005.csv'), 'utf8');
const rows = parseCsv(csvRaw);
const header = rows[0].map(h => h.replace(/^\uFEFF/, '').trim());
const idIdx = header.indexOf('ID');
const titleIdx = header.indexOf('Title');
const slugIdx = header.indexOf('Slug');
const statusIdx = header.indexOf('Status');
const contentIdx = header.indexOf('Content');
const excerptIdx = header.indexOf('Excerpt');
const dateIdx = header.indexOf('Date');
const imgIdx = header.indexOf('Image URL');
const catIdx = header.indexOf('Categories');
const authorIdx = header.indexOf('Author Username');

const publishedPosts = rows.slice(1)
  .filter(r => r[statusIdx] === 'publish')
  .map(r => ({
    id: r[idIdx],
    title: r[titleIdx],
    slug: r[slugIdx],
    date: r[dateIdx],
    author: r[authorIdx] || 'moelagos',
    categories: r[catIdx] ? r[catIdx].split('|').map(c => c.trim()) : [],
    imageUrl: r[imgIdx],
    excerptLen: (r[excerptIdx] || '').length,
    contentLen: (r[contentIdx] || '').length
  }));

console.log('Total published posts in Posts-Export:', publishedPosts.length);

// Check if any published posts have empty content
const emptyContent = publishedPosts.filter(p => p.contentLen === 0);
console.log('Published posts with 0 char content:', emptyContent.length);

// Check content length stats
const avgContentLen = Math.round(publishedPosts.reduce((acc, p) => acc + p.contentLen, 0) / publishedPosts.length);
console.log('Average post content length:', avgContentLen, 'chars');

// Find the specific post mentioned by user
const sanwoPost = publishedPosts.find(p => p.slug.includes('sanwo-olu-seeks-african-capital'));
if (sanwoPost) {
  console.log('\nFound user target post:');
  console.log(sanwoPost);
}
