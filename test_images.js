const fs = require('fs');
const readline = require('readline');

async function testPostImages() {
  const fileStream = fs.createReadStream('C:\\Users\\HP PROBOOK\\Downloads\\lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-10-19 (1).xml');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let inItem = false;
  let currentPost = null;
  const attachments = new Map();
  const posts = [];

  for await (const line of rl) {
    if (line.includes('<item>')) {
      inItem = true;
      currentPost = {
        title: '', date: '', type: '', status: '', id: '', slug: '',
        thumbnailId: '', attachmentUrl: '', content: ''
      };
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

      const urlMatch = line.match(/<wp:attachment_url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:attachment_url>/);
      if (urlMatch) currentPost.attachmentUrl = urlMatch[1];

      const thumbMatch = line.match(/<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/);
      if (thumbMatch) currentPost.thumbnailId = thumbMatch[1];

      if (line.includes('_thumbnail_id')) {
        currentPost._inThumb = true;
      }
      if (currentPost._inThumb) {
        const valMatch = line.match(/<wp:meta_value>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:meta_value>/);
        if (valMatch) {
          currentPost.thumbnailId = valMatch[1];
          currentPost._inThumb = false;
        }
      }
    }
    if (line.includes('</item>')) {
      if (currentPost.type === 'attachment') {
        attachments.set(currentPost.id, currentPost.attachmentUrl);
      } else if (currentPost.type === 'post' && currentPost.status === 'publish') {
        posts.push(currentPost);
      }
      inItem = false;
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log('Top 6 posts with matched featured image:');
  posts.slice(0, 6).forEach((p, i) => {
    const imgUrl = attachments.get(p.thumbnailId) || 'No thumb id: ' + p.thumbnailId;
    console.log(i + 1, p.title.substring(0, 50) + '...', '| Image:', imgUrl);
  });
}

testPostImages();
