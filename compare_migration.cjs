const fs = require('fs');

const existingPosts = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
const existingPages = JSON.parse(fs.readFileSync('data/pages.json', 'utf8'));
const existingAttachments = JSON.parse(fs.readFileSync('data/attachments.json', 'utf8'));

const existingPostIds = new Set(existingPosts.map(p => String(p.id)));
const existingPageIds = new Set(existingPages.map(p => String(p.id)));
const existingAttachIds = new Set(existingAttachments.map(a => String(a.id)));

const xmlContent = fs.readFileSync('csv/lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-11-17.xml', 'utf8');
const items = xmlContent.split('<item>');

const newPosts = [];
const newPages = [];
const newAttachments = [];

for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const wpId = (item.match(/<wp:post_id>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:post_id>/) || [])[1] || '';
  const postType = (item.match(/<wp:post_type>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:post_type>/) || [])[1] || '';
  const status = (item.match(/<wp:status>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:status>/) || [])[1] || '';
  const title = (item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || '';
  const date = (item.match(/<wp:post_date>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:post_date>/) || [])[1] || '';

  if (status !== 'publish' && status !== 'inherit') continue;

  if (postType === 'post' && !existingPostIds.has(wpId)) {
    newPosts.push({ wpId, title: title.trim(), date, status });
  } else if (postType === 'page' && !existingPageIds.has(wpId)) {
    newPages.push({ wpId, title: title.trim(), date, status });
  } else if (postType === 'attachment' && !existingAttachIds.has(wpId)) {
    newAttachments.push({ wpId, title: title.trim(), date });
  }
}

console.log('--- NEW RECORDS TO MIGRATE ---');
console.log('New Posts count:', newPosts.length);
console.log('New Posts details:', newPosts);
console.log('New Pages count:', newPages.length);
console.log('New Pages details:', newPages);
console.log('New Attachments count:', newAttachments.length);
