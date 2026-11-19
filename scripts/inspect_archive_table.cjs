const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/pages.json'), 'utf8'));
const archivePage = pages.find(p => String(p.id) === '1535');

function parseHtmlTable(html) {
  const rows = [];
  const trMatches = html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  for (const trMatch of trMatches) {
    const trContent = trMatch[1];
    const cells = [];
    const tdMatches = trContent.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi);
    for (const tdMatch of tdMatches) {
      const cellText = tdMatch[1]
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const linkMatch = tdMatch[1].match(/href=["']([^"']+)["']/i);
      cells.push({ text: cellText, link: linkMatch ? linkMatch[1] : null });
    }
    if (cells.length > 0 && cells.some(c => c.text.length > 0)) {
      rows.push(cells);
    }
  }
  return rows;
}

if (archivePage) {
  const rows = parseHtmlTable(archivePage.content);
  console.log('Total table rows in Archive Page:', rows.length);
  rows.slice(0, 10).forEach((r, i) => {
    console.log(`Row ${i}:`, r.map(c => c.text).join(' | '));
  });
}
