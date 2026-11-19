const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/pages.json'), 'utf8'));
const aboutPage = pages.find(p => String(p.id) === '867');
if (aboutPage) {
  console.log('=== Page ID 867: About MOE ===');
  console.log(aboutPage.content.substring(0, 1500));
}
