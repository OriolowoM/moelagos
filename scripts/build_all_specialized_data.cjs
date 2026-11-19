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
      const rawHtml = tdMatch[1];
      const cellText = rawHtml
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const linkMatch = rawHtml.match(/href=["']([^"']+)["']/i);
      cells.push({ text: cellText, link: linkMatch ? linkMatch[1] : null });
    }
    if (cells.length > 0 && cells.some(c => c.text.length > 0)) {
      rows.push(cells);
    }
  }
  return rows;
}

// ==========================================
// 1. LEADERSHIP DATA
// ==========================================
console.log('--- Generating Leadership Data ---');
const rawLeadership = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/leadership.json'), 'utf8'));
const existingExecutives = Array.isArray(rawLeadership) ? rawLeadership : rawLeadership.executives || [];

// Past Commissioners (Page 2454)
const pastCommPage = pages.find(p => String(p.id) === '2454');
const pastCommissioners = [];
if (pastCommPage) {
  const rows = parseHtmlTable(pastCommPage.content);
  rows.slice(2).forEach(row => {
    if (row.length >= 3 && row[0].text && !isNaN(parseInt(row[0].text))) {
      pastCommissioners.push({
        sn: parseInt(row[0].text),
        name: row[1].text,
        period: row[2].text
      });
    }
  });
}

// Past Permanent Secretaries (Page 2457)
const pastPsPage = pages.find(p => String(p.id) === '2457');
const pastPermanentSecretaries = [];
if (pastPsPage) {
  const rows = parseHtmlTable(pastPsPage.content);
  rows.slice(2).forEach(row => {
    if (row.length >= 2 && row[0].text && !isNaN(parseInt(row[0].text))) {
      pastPermanentSecretaries.push({
        sn: parseInt(row[0].text),
        name: row[1].text,
        period: row[2] ? row[2].text : 'Not Specified'
      });
    }
  });
}

// Key Ministry Officials (Page 2340)
const officialsPage = pages.find(p => String(p.id) === '2340');
const keyOfficials = [];
if (officialsPage) {
  const rows = parseHtmlTable(officialsPage.content);
  rows.slice(1).forEach(row => {
    if (row.length >= 4 && row[0].text && !isNaN(parseInt(row[0].text))) {
      keyOfficials.push({
        sn: parseInt(row[0].text),
        name: row[1].text,
        designation: row[2].text,
        office: row[3].text,
        phone: row[4] ? row[4].text : '0810 255 3775',
        email: row[5] ? row[5].text : 'env.wr@lagosstate.gov.ng'
      });
    }
  });
}

const finalLeadershipData = {
  executives: existingExecutives,
  pastCommissioners,
  pastPermanentSecretaries,
  keyOfficials
};

fs.writeFileSync(path.join(__dirname, '../src/data/leadership.json'), JSON.stringify(finalLeadershipData, null, 2));
console.log(`Leadership written: ${existingExecutives.length} executives, ${pastCommissioners.length} past commissioners, ${pastPermanentSecretaries.length} past PS, ${keyOfficials.length} officials.`);

// ==========================================
// 2. PROJECTS DATA
// ==========================================
console.log('\n--- Generating Projects Data ---');
const rawProjects = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/projects.json'), 'utf8'));
const baseProjects = Array.isArray(rawProjects) ? rawProjects.slice(0, 8) : [];

// Stormwater Drainage Projects (Page 2441)
const stormwaterPage = pages.find(p => String(p.id) === '2441');
const stormwaterProjects = [];
if (stormwaterPage) {
  const rows = parseHtmlTable(stormwaterPage.content);
  let startIdx = 0;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].some(c => /project title/i.test(c.text))) {
      startIdx = i + 1;
      break;
    }
  }
  rows.slice(startIdx).forEach((row, idx) => {
    if (row.length >= 3 && row[0].text && !isNaN(parseInt(row[0].text))) {
      const sn = parseInt(row[0].text);
      const title = row[1].text;
      const stage = row[2] ? row[2].text : 'In Progress';
      const target = row[3] ? row[3].text : '';
      const impact = row[4] ? row[4].text : '';

      let completion = 60;
      const pctMatch = stage.match(/(\d+)%/);
      if (pctMatch) {
        completion = parseInt(pctMatch[1]);
      } else if (/completed|100/i.test(stage)) {
        completion = 100;
      }

      stormwaterProjects.push({
        id: 100 + sn,
        title,
        category: 'Stormwater Drainage',
        location: target || 'Lagos Metropolis Corridor',
        status: completion >= 100 ? 'Completed' : 'Ongoing',
        completion,
        target,
        impact,
        description: `${title}. Stage of completion: ${stage}. Target: ${target}. Impact: ${impact}`,
        featured: false
      });
    }
  });
}

// Beautification Projects (Page 1428)
const beautyPage = pages.find(p => String(p.id) === '1428');
const beautificationProjects = [];
if (beautyPage) {
  const blockMatches = beautyPage.content.matchAll(/\[progress_bar\s+value="(\d+)"[^\]]*\]([\s\S]*?)\[\/progress_bar\]/gi);
  let bIdx = 1;
  for (const m of blockMatches) {
    const completion = parseInt(m[1]);
    const text = m[2];
    const titleMatch = text.match(/Project Title:<\/strong>\s*([^|]+)/i);
    const locMatch = text.match(/Location:<\/strong>\s*([^|]+)/i);
    const lgaMatch = text.match(/LGA:<\/strong>\s*([^<]+)/i);

    const title = titleMatch ? titleMatch[1].replace(/&nbsp;/g, ' ').trim() : `Urban Greening Project ${bIdx}`;
    const location = locMatch ? locMatch[1].replace(/&nbsp;/g, ' ').trim() : 'Lagos State';
    const lga = lgaMatch ? lgaMatch[1].replace(/&nbsp;/g, ' ').trim() : 'Statewide';

    beautificationProjects.push({
      id: 300 + bIdx++,
      title,
      category: 'Urban Greening',
      location: `${location} (${lga})`,
      status: completion >= 100 ? 'Completed' : 'Ongoing',
      completion,
      target: `Beautification and urban forestry at ${location}, ${lga}`,
      description: `Executed by Office of Environmental Services: ${title} located at ${location}, Local Government: ${lga}.`,
      featured: false
    });
  }
}

const allProjects = [...baseProjects, ...stormwaterProjects, ...beautificationProjects];
fs.writeFileSync(path.join(__dirname, '../src/data/projects.json'), JSON.stringify(allProjects, null, 2));
console.log(`Projects written: ${allProjects.length} total (${baseProjects.length} flagship, ${stormwaterProjects.length} stormwater, ${beautificationProjects.length} beautification)`);

// ==========================================
// 3. PUBLICATIONS DATA
// ==========================================
console.log('\n--- Generating Publications Data ---');
const rawPubs = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/publications.json'), 'utf8'));
const basePubs = Array.isArray(rawPubs) ? rawPubs.slice(0, 8) : [];

// Archive Papers (Page 1535)
const archivePage = pages.find(p => String(p.id) === '1535');
const archivePapers = [];
if (archivePage) {
  const rows = parseHtmlTable(archivePage.content);
  // Find data rows
  rows.slice(2).forEach((row, idx) => {
    if (row.length >= 2 && row[0].text && row[0].text.length > 5) {
      const fullTitle = row[0].text;
      const date = row[1] ? row[1].text : '2011';
      const link = row[2] && row[2].link ? row[2].link : '#';

      archivePapers.push({
        id: 100 + idx,
        title: fullTitle,
        category: 'Climate Policy',
        date,
        format: 'PDF / Document',
        size: '1.8 MB',
        description: `Research presentation delivered at the Lagos Climate Change Summit: ${fullTitle}.`,
        downloadUrl: link,
        featured: false
      });
    }
  });
}

// Environment News Periodicals (Page 1534 & 4693)
const periodicals = [
  {
    id: 201,
    title: 'Lagos Environment News Magazine — Vol. 1, Issue 2 (December 2021)',
    category: 'Ministry Periodicals',
    date: '2021-12-01',
    format: 'PDF',
    size: '8.4 MB',
    description: 'Official periodical of the Lagos State Ministry of the Environment and Water Resources (Vol 1 No 2).',
    downloadUrl: 'https://drive.google.com/file/d/1D03HONcOwl0RPYI0Ut49qAc7EUUG6iRE/view?usp=sharing',
    featured: true
  },
  {
    id: 202,
    title: 'Lagos Environment News Magazine — Vol. 1, Issue 1 (October 2021)',
    category: 'Ministry Periodicals',
    date: '2021-10-01',
    format: 'PDF',
    size: '7.9 MB',
    description: 'Inaugural edition of the Lagos Environment News Magazine (Vol 1 No 1).',
    downloadUrl: 'https://drive.google.com/file/d/1r3To2zAw53X6-eiDz_4wnzNbA-Q0df_Y/view?usp=sharing',
    featured: true
  },
  {
    id: 203,
    title: 'A Six-Point Strategic Direction for Delivering Public Value in Environmental Protection in Lagos State',
    category: 'Policy Directives',
    date: '2016-06-15',
    format: 'PPTX / PDF',
    size: '4.2 MB',
    description: 'Ministerial retreat presentation on strategic directions for public value in environmental protection.',
    downloadUrl: 'https://moelagos.gov.ng/wp-content/uploads/2013/06/A-SIX-POINT-strategic-direction-for-delivering-public-value-in-environmental-protection-in-Lagos-State.pptx',
    featured: false
  },
  {
    id: 204,
    title: 'Wastewater Management Office Strategy & Industrial Effluent Compliance',
    category: 'Regulations & Laws',
    date: '2016-06-15',
    format: 'PPTX / PDF',
    size: '3.6 MB',
    description: 'Technical presentation on sewage regulation, decentralized wastewater treatment, and effluent compliance.',
    downloadUrl: 'https://moelagos.gov.ng/wp-content/uploads/2013/06/WASTEWATER-MANAGEMENT-OFFICE.pptx',
    featured: false
  }
];

const allPublications = [...basePubs, ...periodicals, ...archivePapers];
fs.writeFileSync(path.join(__dirname, '../src/data/publications.json'), JSON.stringify(allPublications, null, 2));
console.log(`Publications written: ${allPublications.length} total (${basePubs.length} base, ${periodicals.length} periodicals, ${archivePapers.length} archive papers)`);

console.log('Specialized datasets build completed successfully!');
