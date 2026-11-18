const fs = require('fs');
const path = require('path');

// Read existing datasets
const existingPosts = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
const existingPostsSummary = JSON.parse(fs.readFileSync('data/posts-summary.json', 'utf8'));
const existingAttachments = JSON.parse(fs.readFileSync('data/attachments.json', 'utf8'));

const existingPostIds = new Set(existingPosts.map(p => String(p.id)));
const existingSlugs = new Set(existingPosts.map(p => p.slug));

// Read new XML export
const xmlContent = fs.readFileSync('csv/lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-11-17.xml', 'utf8');
const items = xmlContent.split('<item>');

function decodeCdata(str) {
  if (!str) return '';
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function cleanHtml(content) {
  if (!content) return '';
  let cleaned = decodeCdata(content);
  // Strip elementor and shortcode comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  cleaned = cleaned.replace(/\[\/?vc_[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[\/?elementor-[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[gallery[^\]]*\]/g, '');
  cleaned = cleaned.replace(/https?:\/\/(?:moelagos\.gov\.ng|staging\.moelagos\.gov\.ng)\/wp-content\/uploads\//g, '/uploads/');
  return cleaned.trim();
}

const addedPosts = [];
const addedAttachments = [];

for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const postType = decodeCdata((item.match(/<wp:post_type>([\s\S]*?)<\/wp:post_type>/) || [])[1] || '');
  const status = decodeCdata((item.match(/<wp:status>([\s\S]*?)<\/wp:status>/) || [])[1] || '');
  const wpId = decodeCdata((item.match(/<wp:post_id>([\s\S]*?)<\/wp:post_id>/) || [])[1] || '');
  const title = decodeCdata((item.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const slug = decodeCdata((item.match(/<wp:post_name>([\s\S]*?)<\/wp:post_name>/) || [])[1] || '') ||
               title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const date = decodeCdata((item.match(/<wp:post_date>([\s\S]*?)<\/wp:post_date>/) || [])[1] || '');
  const content = (item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/) || [])[1] || '';
  const excerpt = (item.match(/<excerpt:encoded>([\s\S]*?)<\/excerpt:encoded>/) || [])[1] || '';
  const author = decodeCdata((item.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/) || [])[1] || '');

  // Extract categories & tags
  const catMatches = item.matchAll(/<category domain="category" nicename="([^"]*)">([\s\S]*?)<\/category>/g);
  const categories = [];
  for (const m of catMatches) {
    categories.push(decodeCdata(m[2]));
  }
  const tagMatches = item.matchAll(/<category domain="post_tag" nicename="([^"]*)">([\s\S]*?)<\/category>/g);
  const tags = [];
  for (const m of tagMatches) {
    tags.push(decodeCdata(m[2]));
  }

  // Extract featured image from meta or content
  let featuredImage = null;
  const thumbMatch = item.match(/<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]><\/wp:meta_value>/);
  const imgInContent = content.match(/src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif))["']/i);
  if (imgInContent) {
    featuredImage = imgInContent[1].replace(/https?:\/\/(?:moelagos\.gov\.ng|staging\.moelagos\.gov\.ng)\/wp-content\/uploads\//, '/uploads/');
  }

  if (postType === 'post' && status === 'publish' && !existingPostIds.has(wpId)) {
    const cleanedContent = cleanHtml(content);
    const cleanedExcerpt = decodeCdata(excerpt) || cleanedContent.replace(/<[^>]+>/g, ' ').slice(0, 180) + '...';
    const year = date ? new Date(date).getFullYear() : 2026;

    const isPressRelease = categories.some(c => /press release/i.test(c)) || /release/i.test(title);

    const newPost = {
      id: parseInt(wpId, 10),
      wpId: wpId,
      title: title,
      slug: slug,
      date: date,
      year: year,
      author: author || 'Directorate of Public Affairs',
      categories: categories.length ? categories : ['News'],
      tags: tags,
      contentType: isPressRelease ? 'press_release' : 'news',
      featuredImage: featuredImage || '/uploads/2026/02/DSC_0126-scaled.jpg',
      excerpt: cleanedExcerpt,
      content: cleanedContent
    };

    addedPosts.push(newPost);
  }
}

console.log('Found', addedPosts.length, 'new published posts to synchronize.');

if (addedPosts.length > 0) {
  // Sort all posts newest first
  const mergedPosts = [...addedPosts, ...existingPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Create summary version
  const mergedSummary = mergedPosts.map(p => ({
    id: p.id,
    wpId: p.wpId,
    title: p.title,
    slug: p.slug,
    date: p.date,
    year: p.year,
    author: p.author,
    categories: p.categories,
    tags: p.tags,
    contentType: p.contentType,
    featuredImage: p.featuredImage,
    excerpt: p.excerpt
  }));

  fs.writeFileSync('data/posts.json', JSON.stringify(mergedPosts, null, 2), 'utf8');
  fs.writeFileSync('data/posts-summary.json', JSON.stringify(mergedSummary, null, 2), 'utf8');
  fs.writeFileSync('src/data/posts-summary.json', JSON.stringify(mergedSummary, null, 2), 'utf8');

  console.log('Successfully updated:');
  console.log(' - data/posts.json (' + mergedPosts.length + ' total posts)');
  console.log(' - data/posts-summary.json (' + mergedSummary.length + ' total posts)');
  console.log(' - src/data/posts-summary.json (' + mergedSummary.length + ' total posts)');
  console.log('New top posts:');
  mergedPosts.slice(0, 5).forEach(p => console.log(' * [' + p.date + '] ' + p.title));
}
