const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/pages.json'), 'utf8'));

[2454, 2457, 2340, 2441, 1428].forEach(id => {
  const p = pages.find(x => String(x.id) === String(id));
  if (p) {
    console.log('=== Page ID ' + id + ': ' + p.title + ' (' + (p.content || '').length + ' chars) ===');
    console.log((p.content || '').substring(0, 600));
    console.log('\n----------------------------------------\n');
  }
});
