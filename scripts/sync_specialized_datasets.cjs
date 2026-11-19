const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/pages.json'), 'utf8'));

// Helper: parse HTML table rows
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
      cells.push(cellText);
    }
    if (cells.length > 0 && cells.some(c => c.length > 0)) {
      rows.push(cells);
    }
  }
  return rows;
}

// 1. Past Commissioners (Page 2454)
const pastCommPage = pages.find(p => String(p.id) === '2454');
const pastCommissioners = [];
if (pastCommPage) {
  const rows = parseHtmlTable(pastCommPage.content);
  // Row 0 is header "LIST OF PAST COMMISSIONERS", Row 1 is S/N, NAMES, PERIOD
  rows.slice(2).forEach(row => {
    if (row.length >= 3 && row[0] && !isNaN(parseInt(row[0]))) {
      pastCommissioners.push({
        sn: parseInt(row[0]),
        name: row[1],
        period: row[2]
      });
    }
  });
}
console.log('Parsed Past Commissioners:', pastCommissioners.length, pastCommissioners.slice(0, 3));

// 2. Past Permanent Secretaries (Page 2457)
const pastPsPage = pages.find(p => String(p.id) === '2457');
const pastPermanentSecretaries = [];
if (pastPsPage) {
  const rows = parseHtmlTable(pastPsPage.content);
  rows.slice(2).forEach(row => {
    if (row.length >= 2 && row[0] && !isNaN(parseInt(row[0]))) {
      pastPermanentSecretaries.push({
        sn: parseInt(row[0]),
        name: row[1],
        period: row[2] || 'Not Specified'
      });
    }
  });
}
console.log('Parsed Past Permanent Secretaries:', pastPermanentSecretaries.length, pastPermanentSecretaries.slice(0, 3));

// 3. Key Ministry Officials (Page 2340)
const officialsPage = pages.find(p => String(p.id) === '2340');
const keyOfficials = [];
if (officialsPage) {
  const rows = parseHtmlTable(officialsPage.content);
  // Row 0 is S/N, NAMES, DESIGNATION, LOCATION OFFICE, PHONE NO, E-MAIL ADDRESS
  rows.slice(1).forEach(row => {
    if (row.length >= 4 && row[0] && !isNaN(parseInt(row[0]))) {
      keyOfficials.push({
        sn: parseInt(row[0]),
        name: row[1],
        designation: row[2],
        office: row[3],
        phone: row[4] || '',
        email: row[5] || ''
      });
    }
  });
}
console.log('Parsed Key Ministry Officials:', keyOfficials.length, keyOfficials.slice(0, 3));

// 4. Stormwater Drainage Projects (Page 2441)
const stormwaterPage = pages.find(p => String(p.id) === '2441');
const stormwaterProjects = [];
if (stormwaterPage) {
  const rows = parseHtmlTable(stormwaterPage.content);
  // Find header row with S/N, PROJECT TITLE, STAGE OF COMPLETION
  let startIdx = 0;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].some(c => /project title/i.test(c))) {
      startIdx = i + 1;
      break;
    }
  }
  rows.slice(startIdx).forEach(row => {
    if (row.length >= 3 && row[0] && !isNaN(parseInt(row[0]))) {
      const sn = parseInt(row[0]);
      const title = row[1];
      const stage = row[2] || 'In Progress';
      const target = row[3] || '';
      const impact = row[4] || '';

      // Determine numeric completion percentage if possible
      let percentage = 50;
      const pctMatch = stage.match(/(\d+)%/);
      if (pctMatch) {
        percentage = parseInt(pctMatch[1]);
      } else if (/completed|100/i.test(stage)) {
        percentage = 100;
      }

      stormwaterProjects.push({
        sn,
        title,
        stage,
        percentage,
        target,
        impact,
        category: 'Stormwater Drainage',
        status: percentage >= 100 ? 'Completed' : 'Ongoing'
      });
    }
  });
}
console.log('Parsed Stormwater Projects:', stormwaterProjects.length, stormwaterProjects.slice(0, 2));

// 5. Beautification Projects (Page 1428)
const beautyPage = pages.find(p => String(p.id) === '1428');
const beautificationProjects = [];
if (beautyPage) {
  const blockMatches = beautyPage.content.matchAll(/\[progress_bar\s+value="(\d+)"[^\]]*\]([\s\S]*?)\[\/progress_bar\]/gi);
  let bIdx = 1;
  for (const m of blockMatches) {
    const percentage = parseInt(m[1]);
    const text = m[2];
    const titleMatch = text.match(/Project Title:<\/strong>\s*([^|]+)/i);
    const locMatch = text.match(/Location:<\/strong>\s*([^|]+)/i);
    const lgaMatch = text.match(/LGA:<\/strong>\s*([^<]+)/i);

    beautificationProjects.push({
      sn: bIdx++,
      title: titleMatch ? titleMatch[1].replace(/&nbsp;/g, ' ').trim() : `Urban Greening Site ${bIdx}`,
      location: locMatch ? locMatch[1].replace(/&nbsp;/g, ' ').trim() : 'Lagos State',
      lga: lgaMatch ? lgaMatch[1].replace(/&nbsp;/g, ' ').trim() : 'Statewide',
      percentage,
      category: 'Urban Greening',
      status: percentage >= 100 ? 'Completed' : 'Ongoing'
    });
  }
}
console.log('Parsed Beautification Projects:', beautificationProjects.length, beautificationProjects.slice(0, 2));
