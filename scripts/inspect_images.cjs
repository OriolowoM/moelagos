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
const contentIdx = header.indexOf('Content');
const imgIdx = header.indexOf('Image URL');
const statusIdx = header.indexOf('Status');

const imageUrls = new Set();
rows.slice(1).forEach(r => {
  if (r[statusIdx] === 'publish') {
    const imgs = (r[imgIdx] || '').split('|').map(s => s.trim()).filter(Boolean);
    imgs.forEach(img => imageUrls.add(img));

    // Also scan content for img src
    const content = r[contentIdx] || '';
    const matches = content.matchAll(/src=["']([^"']+)["']/gi);
    for (const m of matches) {
      imageUrls.add(m[1]);
    }
  }
});

console.log('Total distinct image URLs in Posts:', imageUrls.size);

// Check how many of these exist locally in public/
const publicDir = path.join(__dirname, '../public');
let existsCount = 0;
let missingUrls = [];

for (const url of imageUrls) {
  let localRelPath = null;
  if (url.startsWith('/uploads/')) {
    localRelPath = url;
  } else if (url.includes('/wp-content/uploads/')) {
    localRelPath = '/uploads/' + url.split('/wp-content/uploads/')[1];
  } else if (url.includes('/uploads/')) {
    localRelPath = '/uploads/' + url.split('/uploads/')[1];
  }

  if (localRelPath) {
    const fullLocalPath = path.join(publicDir, localRelPath);
    if (fs.existsSync(fullLocalPath)) {
      existsCount++;
    } else {
      missingUrls.push({ url, localRelPath });
    }
  } else {
    missingUrls.push({ url, localRelPath: null });
  }
}

console.log(`Local images found: ${existsCount}`);
console.log(`Missing images to check: ${missingUrls.length}`);
if (missingUrls.length > 0) {
  console.log('Sample missing images (up to 10):', missingUrls.slice(0, 10));
}
