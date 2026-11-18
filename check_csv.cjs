const fs = require('fs');

const content = fs.readFileSync('csv/magic-export-posts-post-moelagos.gov.ng.csv', 'utf8');
const lines = content.split('\n');
const header = lines[0].split(',').map(c => c.trim().replace(/^[\ufeff"]/g, '').replace(/"$/g, ''));
console.log('Total lines:', lines.length);

const idIndex = header.indexOf('id:ID');
const statusIndex = header.indexOf('post:post_status');
const titleIndex = header.indexOf('post:post_title');
console.log({ idIndex, statusIndex, titleIndex });

const publishedIds = new Set();
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('"') || line.match(/^\d+,/)) {
    const parts = line.split(',');
    const id = parts[0].replace(/"/g, '');
    const status = parts[statusIndex] ? parts[statusIndex].replace(/"/g, '') : '';
    if (status === 'publish') {
      publishedIds.add(id);
    }
  }
}
console.log('Distinct published IDs identified:', publishedIds.size);
