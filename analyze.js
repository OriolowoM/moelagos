const fs = require('fs');
const readline = require('readline');

async function analyze(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const categories = new Set();
  const tags = new Set();
  const years = {};
  const authors = new Set();

  for await (const line of rl) {
    const catMatch = line.match(/<category domain="category"[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/);
    if (catMatch && catMatch[1]) categories.add(catMatch[1].trim());

    const tagMatch = line.match(/<category domain="post_tag"[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/);
    if (tagMatch && tagMatch[1]) tags.add(tagMatch[1].trim());

    const dateMatch = line.match(/<wp:post_date>(?:<!\[CDATA\[)?(\d{4})-\d{2}-\d{2}/);
    if (dateMatch) {
      years[dateMatch[1]] = (years[dateMatch[1]] || 0) + 1;
    }

    const authorMatch = line.match(/<dc:creator>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/dc:creator>/);
    if (authorMatch && authorMatch[1]) {
      authors.add(authorMatch[1].trim());
    }
  }

  console.log('Authors:', Array.from(authors));
  console.log('Categories:', Array.from(categories));
  console.log('Sample Tags (first 25):', Array.from(tags).slice(0, 25));
  console.log('Years distribution:', years);
}

analyze('C:\\Users\\HP PROBOOK\\Downloads\\lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-10-19 (1).xml')
  .catch(console.error);
