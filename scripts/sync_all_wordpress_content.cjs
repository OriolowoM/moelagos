const fs = require('fs');
const path = require('path');

// Robust RFC 4180 CSV Parser
function parseCsv(content) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField);
      currentField = '';
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }
  return rows;
}

// Clean and format content
function cleanHtmlContent(raw) {
  if (!raw) return '';
  let content = raw;

  // Remove elementor / visual composer / theme shortcodes (except caption)
  content = content.replace(/\[\/?(?:dropcap|hr_dotted|vc_[^\]]*|g1_[^\]]*|elementor-[^\]]*)\]/gi, '');
  content = content.replace(/\[file content end\]/gi, '');
  
  // Clean excessive blank paragraphs
  content = content.replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '');
  
  // Normalize line breaks
  content = content.replace(/\r\n/g, '\n');
  return content.trim();
}

function extractExcerpt(content, maxLength = 220) {
  if (!content) return '';
  const text = content
    .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function resolveImageUrl(rawUrl) {
  if (!rawUrl) return null;
  // Can be multiple pipe-separated URLs
  const firstUrl = rawUrl.split('|')[0].trim();
  if (!firstUrl) return null;

  if (firstUrl.includes('/wp-content/uploads/')) {
    const parts = firstUrl.split('/wp-content/uploads/');
    return '/uploads/' + parts[1];
  }
  if (firstUrl.includes('/uploads/')) {
    const parts = firstUrl.split('/uploads/');
    return '/uploads/' + parts[1];
  }
  if (firstUrl.startsWith('http')) {
    return firstUrl;
  }
  return firstUrl.startsWith('/') ? firstUrl : '/' + firstUrl;
}

console.log('=== STEP 1: PARSING POSTS CSV ===');
const postsCsvRaw = fs.readFileSync(path.join(__dirname, '../pages/Posts-Export-2026-November-19-2005.csv'), 'utf8');
const postRows = parseCsv(postsCsvRaw);
const postHeader = postRows[0].map(h => h.replace(/^\uFEFF/, '').trim());

const pIdIdx = postHeader.indexOf('ID');
const pTitleIdx = postHeader.indexOf('Title');
const pContentIdx = postHeader.indexOf('Content');
const pExcerptIdx = postHeader.indexOf('Excerpt');
const pDateIdx = postHeader.indexOf('Date');
const pStatusIdx = postHeader.indexOf('Status');
const pAuthorIdx = postHeader.indexOf('Author Username');
const pSlugIdx = postHeader.indexOf('Slug');
const pCatIdx = postHeader.indexOf('Categories');
const pTagIdx = postHeader.indexOf('Tags');
const pImgIdx = postHeader.indexOf('Image URL');
const pModIdx = postHeader.indexOf('Post Modified Date');
const pPermalinkIdx = postHeader.indexOf('Permalink');

const posts = [];
let skippedPostDrafts = 0;

postRows.slice(1).forEach(r => {
  const status = r[pStatusIdx];
  if (status !== 'publish') {
    skippedPostDrafts++;
    return;
  }

  const id = r[pIdIdx];
  const title = r[pTitleIdx];
  const slug = r[pSlugIdx];
  const rawContent = r[pContentIdx] || '';
  const rawExcerpt = r[pExcerptIdx] || '';
  const date = r[pDateIdx];
  const modified = r[pModIdx] || date;
  const author = r[pAuthorIdx] || 'moelagos';
  const rawCat = r[pCatIdx] || '';
  const rawTag = r[pTagIdx] || '';
  const rawImg = r[pImgIdx] || '';
  const permalink = r[pPermalinkIdx] || '';

  const categories = rawCat.split('|').map(c => c.trim()).filter(Boolean);
  const tags = rawTag.split('|').map(t => t.trim()).filter(Boolean);
  const content = cleanHtmlContent(rawContent);

  // Fallback featured image: image column -> first img in content -> default placeholder
  let featuredImage = resolveImageUrl(rawImg);
  if (!featuredImage) {
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) {
      featuredImage = resolveImageUrl(imgMatch[1]);
    }
  }

  const excerpt = rawExcerpt ? cleanHtmlContent(rawExcerpt).replace(/<[^>]+>/g, '').trim() : extractExcerpt(content);

  // Content classification
  let contentType = 'news';
  const isPressRelease = categories.some(c => /press release/i.test(c)) ||
                        /for immediate release/i.test(content) ||
                        /press release/i.test(title);
  const isReport = categories.some(c => /report|forecast|bulletin/i.test(c)) ||
                   /report|weather/i.test(title);
  const isEvent = categories.some(c => /event/i.test(c)) ||
                  /walk for|tree planting day|world environment day|world water day/i.test(title);

  if (isPressRelease) contentType = 'press_release';
  else if (isReport) contentType = 'report';
  else if (isEvent) contentType = 'event';

  posts.push({
    id,
    wpId: id,
    title,
    slug,
    author,
    date,
    modified,
    year: date ? date.substring(0, 4) : 'unknown',
    contentType,
    categories: categories.filter(c => !['Uncategorized', 'General'].includes(c)),
    tags,
    featuredImage: featuredImage || '/placeholder-news.jpg',
    excerpt,
    content,
    permalink
  });
});

// Sort descending by date
posts.sort((a, b) => new Date(b.date) - new Date(a.date));
console.log(`Processed published posts: ${posts.length} (Skipped drafts: ${skippedPostDrafts})`);

console.log('\n=== STEP 2: PARSING PAGES CSV ===');
const pagesCsvRaw = fs.readFileSync(path.join(__dirname, '../pages/Pages-Export-2026-November-19-1823.csv'), 'utf8');
const pageRows = parseCsv(pagesCsvRaw);
const pageHeader = pageRows[0].map(h => h.replace(/^\uFEFF/, '').trim());

const pgIdIdx = pageHeader.indexOf('ID');
const pgTitleIdx = pageHeader.indexOf('Title');
const pgContentIdx = pageHeader.indexOf('Content');
const pgExcerptIdx = pageHeader.indexOf('Excerpt');
const pgDateIdx = pageHeader.indexOf('Date');
const pgStatusIdx = pageHeader.indexOf('Status');
const pgSlugIdx = pageHeader.indexOf('Slug');
const pgParentIdx = pageHeader.indexOf('Parent');
const pgOrderIdx = pageHeader.indexOf('Order');
const pgImgIdx = pageHeader.indexOf('Image URL');
const pgPermalinkIdx = pageHeader.indexOf('Permalink');

const pages = [];
let skippedPageDrafts = 0;

pageRows.slice(1).forEach(r => {
  const status = r[pgStatusIdx];
  if (status !== 'publish') {
    skippedPageDrafts++;
    return;
  }

  const id = r[pgIdIdx];
  const title = r[pgTitleIdx];
  const slug = r[pgSlugIdx];
  const rawContent = r[pgContentIdx] || '';
  const date = r[pgDateIdx];
  const parent = r[pgParentIdx] || '0';
  const order = parseInt(r[pgOrderIdx] || '0', 10);
  const rawImg = r[pgImgIdx] || '';
  const permalink = r[pgPermalinkIdx] || '';

  const content = cleanHtmlContent(rawContent);
  let featuredImage = resolveImageUrl(rawImg);
  if (!featuredImage) {
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) {
      featuredImage = resolveImageUrl(imgMatch[1]);
    }
  }

  pages.push({
    id,
    wpId: id,
    title,
    slug,
    parent,
    order,
    date,
    featuredImage: featuredImage || null,
    content,
    permalink
  });
});

pages.sort((a, b) => a.order - b.order);
console.log(`Processed published pages: ${pages.length} (Skipped drafts: ${skippedPageDrafts})`);

console.log('\n=== STEP 3: WRITING JSON FILES ===');
// Write posts and pages to both src/data and data/
fs.writeFileSync(path.join(__dirname, '../src/data/posts.json'), JSON.stringify(posts, null, 2));
fs.writeFileSync(path.join(__dirname, '../data/posts.json'), JSON.stringify(posts, null, 2));

// Lightweight summary for fast loading
const postsSummary = posts.map(p => ({
  id: p.id,
  wpId: p.wpId,
  title: p.title,
  slug: p.slug,
  date: p.date,
  author: p.author,
  year: p.year,
  contentType: p.contentType,
  categories: p.categories,
  featuredImage: p.featuredImage,
  excerpt: p.excerpt
}));
fs.writeFileSync(path.join(__dirname, '../src/data/posts-summary.json'), JSON.stringify(postsSummary, null, 2));
fs.writeFileSync(path.join(__dirname, '../data/posts-summary.json'), JSON.stringify(postsSummary, null, 2));

fs.writeFileSync(path.join(__dirname, '../src/data/pages.json'), JSON.stringify(pages, null, 2));
fs.writeFileSync(path.join(__dirname, '../data/pages.json'), JSON.stringify(pages, null, 2));

console.log('Successfully written posts.json (', posts.length, 'posts ) and pages.json (', pages.length, 'pages )');
