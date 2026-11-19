const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/pages.json'), 'utf8'));

[1534, 1535, 4693].forEach(id => {
  const p = pages.find(x => String(x.id) === String(id));
  if (p) {
    console.log('=== Page ID ' + id + ': ' + p.title + ' ===');
    console.log((p.content || '').substring(0, 1000));
    console.log('\n----------------------------------------\n');
  }
});
