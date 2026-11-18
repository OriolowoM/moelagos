const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('data/pages.json', 'utf8'));

const relevantTitles = [
  'Honourable Commissioner',
  'Special Adviser To The Governor',
  'Permanent Secretary - Office of Environment Services',
  'Permanent Secretary - ODS & WR',
  'About MOE',
  'Structure Of The Ministry',
  'Responsibilities of MOE',
  'Projects',
  'Beautification Projects',
  'Stormwater Drainage Projects',
  'Completed Projects',
  'Resources',
  'Reports',
  'Environmental Impact Assessment (EIA)'
];

relevantTitles.forEach(t => {
  const p = pages.find(page => page.title && page.title.toLowerCase().includes(t.toLowerCase()));
  if (p) {
    console.log('--- ' + p.title + ' (' + p.slug + ') ---');
    console.log('Content preview:', p.content ? p.content.replace(/<[^>]+>/g, ' ').slice(0, 200).trim() : 'NO CONTENT');
  }
});
