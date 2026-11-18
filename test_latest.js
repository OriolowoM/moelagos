const fs = require('fs');
const readline = require('readline');

async function getLatestPosts() {
  const fileStream = fs.createReadStream('C:\\Users\\HP PROBOOK\\Downloads\\lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-10-19 (1).xml');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let inItem = false;
  let currentPost = null;
  const posts = [];

  for await (const line of rl) {
    if (line.includes('<item>')) {
      inItem = true;
      currentPost = { title: '', date: '', type: '', status: '', id: '', slug: '', categories: [] };
    }
    if (inItem && currentPost) {
      const typeMatch = line.match(/<wp:post_type>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:post_type>/);
      if (typeMatch) currentPost.type = typeMatch[1];

      const statusMatch = line.match(/<wp:status>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:status>/);
      if (statusMatch) currentPost.status = statusMatch[1];

      const titleMatch = line.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
      if (titleMatch) currentPost.title = titleMatch[1];

      const dateMatch = line.match(/<wp:post_date>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:post_date>/);
      if (dateMatch) currentPost.date = dateMatch[1];

      const idMatch = line.match(/<wp:post_id>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:post_id>/);
      if (idMatch) currentPost.id = idMatch[1];

      const slugMatch = line.match(/<wp:post_name>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:post_name>/);
      if (slugMatch) currentPost.slug = slugMatch[1];

      const catMatch = line.match(/<category domain="category"[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/);
      if (catMatch) currentPost.categories.push(catMatch[1]);
    }
    if (line.includes('</item>')) {
      if (currentPost && currentPost.type === 'post' && currentPost.status === 'publish') {
        posts.push(currentPost);
      }
      inItem = false;
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log('Top 12 latest posts:');
  posts.slice(0, 12).forEach((p, i) => console.log(i + 1, p.date, '|', p.title, '| Cats:', p.categories.join(', ')));
}

getLatestPosts();
