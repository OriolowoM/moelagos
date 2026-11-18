const fs = require('fs');
const path = require('path');
const readline = require('readline');

// File paths
const XML_POSTS_PATH = 'C:\\Users\\HP PROBOOK\\Downloads\\lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-10-19 (1).xml';
const XML_PAGES_PATH = 'C:\\Users\\HP PROBOOK\\Downloads\\lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-10-19 (2).xml';
const MENU_JSON_PATH = 'C:\\Users\\HP PROBOOK\\Downloads\\menu-export-lagos-state-ministry-of-the-environment-and-water-resources-20261019-160328.json';

const OUTPUT_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Clean HTML content helper
function cleanHtml(raw) {
  if (!raw) return '';
  let content = raw;

  // Remove elementor / visual composer / theme shortcodes
  content = content.replace(/\[\/?(?:dropcap|hr_dotted|vc_[^\]]*|g1_[^\]]*|elementor-[^\]]*)\]/gi, '');
  content = content.replace(/\[file content end\]/gi, '');
  
  // Clean up excessive non-breaking spaces and blank paragraphs
  content = content.replace(/&nbsp;/g, ' ');
  content = content.replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '');
  
  // Normalize line breaks
  content = content.replace(/\r\n/g, '\n');
  return content.trim();
}

function extractExcerpt(content, maxLength = 220) {
  if (!content) return '';
  const text = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

async function parseWxrFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const items = [];
  let inItem = false;
  let lines = [];

  for await (const line of rl) {
    if (line.includes('<item>')) {
      inItem = true;
      lines = [];
    }
    if (inItem) {
      lines.push(line);
    }
    if (line.includes('</item>')) {
      inItem = false;
      const itemXml = lines.join('\n');
      items.push(itemXml);
    }
  }

  return items;
}

function parseItem(itemXml) {
  const getTag = (tag) => {
    const regex = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
    const match = itemXml.match(regex);
    return match ? match[1].trim() : '';
  };

  const getTags = (regex) => {
    const results = [];
    let match;
    const globalRegex = new RegExp(regex.source, 'gi');
    while ((match = globalRegex.exec(itemXml)) !== null) {
      if (match[1]) results.push(match[1].trim());
    }
    return results;
  };

  const id = getTag('wp:post_id');
  const title = getTag('title');
  const link = getTag('link');
  const pubDate = getTag('pubDate');
  const creator = getTag('dc:creator');
  const content = getTag('content:encoded');
  const rawExcerpt = getTag('excerpt:encoded');
  const postDate = getTag('wp:post_date');
  const postModified = getTag('wp:post_modified');
  const postName = getTag('wp:post_name');
  const status = getTag('wp:status');
  const postParent = getTag('wp:post_parent');
  const menuOrder = parseInt(getTag('wp:menu_order') || '0', 10);
  const postType = getTag('wp:post_type');
  const attachmentUrl = getTag('wp:attachment_url');

  // Categories & Tags
  const categories = getTags(/<category domain="category"[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/);
  const tags = getTags(/<category domain="post_tag"[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/);

  // Meta extraction
  const metaRegex = /<wp:postmeta>[\s\S]*?<wp:meta_key>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:meta_key>[\s\S]*?<wp:meta_value>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:meta_value>[\s\S]*?<\/wp:postmeta>/gi;
  const postmeta = {};
  let metaMatch;
  while ((metaMatch = metaRegex.exec(itemXml)) !== null) {
    postmeta[metaMatch[1].trim()] = metaMatch[2].trim();
  }

  const thumbnailId = postmeta['_thumbnail_id'] || null;

  return {
    id,
    title,
    slug: postName,
    link,
    pubDate,
    postDate,
    postModified,
    creator,
    status,
    postType,
    postParent,
    menuOrder,
    attachmentUrl,
    thumbnailId,
    categories,
    tags,
    content: cleanHtml(content),
    excerpt: rawExcerpt ? cleanHtml(rawExcerpt) : extractExcerpt(content),
    postmeta
  };
}

async function runMigration() {
  console.log('--- Starting MOE Lagos XML Migration ---');

  // 1. Parse Posts XML
  console.log(`Reading Posts XML: ${XML_POSTS_PATH}`);
  const postItemXmls = await parseWxrFile(XML_POSTS_PATH);
  console.log(`Found ${postItemXmls.length} raw items in Posts XML.`);

  // 2. Parse Pages XML
  console.log(`Reading Pages XML: ${XML_PAGES_PATH}`);
  const pageItemXmls = await parseWxrFile(XML_PAGES_PATH);
  console.log(`Found ${pageItemXmls.length} raw items in Pages XML.`);

  // 3. Process attachments first
  const attachments = new Map();
  const allParsed = [];

  for (const xml of [...postItemXmls, ...pageItemXmls]) {
    const item = parseItem(xml);
    allParsed.push(item);
    if (item.postType === 'attachment') {
      attachments.set(item.id, {
        id: item.id,
        title: item.title,
        url: item.attachmentUrl,
        date: item.postDate,
        parent: item.postParent
      });
    }
  }

  console.log(`Total attachments indexed: ${attachments.size}`);

  // 4. Filter and categorize posts
  const posts = [];
  const pages = [];
  let skippedDrafts = 0;

  for (const item of allParsed) {
    if (item.status === 'draft') {
      skippedDrafts++;
      continue; // Requirement 5.2: DO NOT IMPORT items with wp:status as draft
    }

    // Resolve featured image
    let featuredImage = null;
    if (item.thumbnailId && attachments.has(item.thumbnailId)) {
      featuredImage = attachments.get(item.thumbnailId).url;
    } else {
      // Fallback: look for first image in content
      const imgMatch = item.content.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) {
        featuredImage = imgMatch[1];
      }
    }

    if (item.postType === 'post') {
      // Determine content classification
      let contentType = 'news';
      const isPressRelease = item.categories.some(c => /press release/i.test(c)) ||
                            /for immediate release/i.test(item.content) ||
                            /press release/i.test(item.title);
      const isReport = item.categories.some(c => /report|forecast|bulletin/i.test(c)) ||
                       /report|weather/i.test(item.title);
      const isEvent = item.categories.some(c => /event/i.test(c)) ||
                      /walk for|tree planting day|world environment day|world water day/i.test(item.title);

      if (isPressRelease) {
        contentType = 'press_release';
      } else if (isReport) {
        contentType = 'report';
      } else if (isEvent) {
        contentType = 'event';
      }

      posts.push({
        id: item.id,
        title: item.title,
        slug: item.slug,
        author: item.creator,
        date: item.postDate,
        modified: item.postModified,
        year: item.postDate ? item.postDate.substring(0, 4) : 'unknown',
        contentType,
        categories: item.categories.filter(c => !['Uncategorized', 'General'].includes(c)),
        tags: item.tags,
        featuredImage,
        excerpt: item.excerpt,
        content: item.content
      });
    } else if (item.postType === 'page') {
      pages.push({
        id: item.id,
        title: item.title,
        slug: item.slug,
        parent: item.postParent,
        menuOrder: item.menuOrder,
        date: item.postDate,
        content: item.content,
        featuredImage
      });
    }
  }

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Sort pages by menuOrder
  pages.sort((a, b) => a.menuOrder - b.menuOrder);

  console.log(`Processed published posts: ${posts.length}`);
  console.log(`Processed published pages: ${pages.length}`);
  console.log(`Skipped drafts: ${skippedDrafts}`);

  // 5. Build taxonomy summary
  const categoriesMap = {};
  const yearsMap = {};
  const authorsMap = {};

  for (const post of posts) {
    yearsMap[post.year] = (yearsMap[post.year] || 0) + 1;
    authorsMap[post.author] = (authorsMap[post.author] || 0) + 1;
    for (const cat of post.categories) {
      categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    }
  }

  // 6. Read and structure menu
  let navigation = [];
  if (fs.existsSync(MENU_JSON_PATH)) {
    const rawMenu = JSON.parse(fs.readFileSync(MENU_JSON_PATH, 'utf8'));
    navigation = rawMenu.menus || [];
    console.log(`Loaded navigation menus from JSON: ${navigation.length} menus found.`);
  }

  // 7. Write output JSON files
  fs.writeFileSync(path.join(OUTPUT_DIR, 'posts.json'), JSON.stringify(posts, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'pages.json'), JSON.stringify(pages, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'attachments.json'), JSON.stringify(Array.from(attachments.values()), null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'taxonomy.json'), JSON.stringify({
    categories: categoriesMap,
    years: yearsMap,
    authors: authorsMap,
    totalPosts: posts.length,
    totalAttachments: attachments.size,
    totalPages: pages.length
  }, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'navigation.json'), JSON.stringify(navigation, null, 2));

  console.log('--- Migration completed successfully! Data saved to data/ ---');
}

runMigration().catch(console.error);
