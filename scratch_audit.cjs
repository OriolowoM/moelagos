const fs = require('fs');

console.log('--- DATA DIRECTORY STATUS ---');
const existingPosts = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
const existingPages = JSON.parse(fs.readFileSync('data/pages.json', 'utf8'));
const existingAttachments = JSON.parse(fs.readFileSync('data/attachments.json', 'utf8'));
console.log('Existing posts count:', existingPosts.length);
console.log('Existing pages count:', existingPages.length);
console.log('Existing attachments count:', existingAttachments.length);

// Let's inspect the date ranges
const postDates = existingPosts.map(p => p.date).filter(Boolean).sort();
console.log('Posts date range:', postDates[0], 'to', postDates[postDates.length - 1]);

// Let's inspect the new XML file in csv/
const xmlFile = 'csv/lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-11-17.xml';
if (fs.existsSync(xmlFile)) {
  const xmlContent = fs.readFileSync(xmlFile, 'utf8');
  const items = xmlContent.split('<item>');
  console.log('\n--- NEW XML EXPORT (2026-11-17) ---');
  console.log('Total <item> tags in new XML:', items.length - 1);
  
  let posts = 0, pages = 0, attachments = 0, others = 0;
  let published = 0, drafts = 0;
  
  for (let i = 1; i < items.length; i++) {
    const item = items[i];
    const postType = (item.match(/<wp:post_type>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:post_type>/) || [])[1] || '';
    const status = (item.match(/<wp:status>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:status>/) || [])[1] || '';
    
    if (postType === 'post') posts++;
    else if (postType === 'page') pages++;
    else if (postType === 'attachment') attachments++;
    else others++;
    
    if (status === 'publish') published++;
    else if (status === 'draft') drafts++;
  }
  
  console.log({ posts, pages, attachments, others, published, drafts });
}

// Inspect pages.xml
const pagesXml = 'csv/lagosstateministryoftheenvironmentandwaterresources.pages.xml';
if (fs.existsSync(pagesXml)) {
  const content = fs.readFileSync(pagesXml, 'utf8');
  const items = content.split('<item>');
  console.log('\n--- PAGES XML ---');
  console.log('Total <item> tags in pages XML:', items.length - 1);
}
