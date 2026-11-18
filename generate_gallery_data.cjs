const fs = require('fs');

const attachments = JSON.parse(fs.readFileSync('data/attachments.json', 'utf8'));

// Filter valid image files
const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
const imageAttachments = attachments.filter(a => {
  const url = (a.url || '').toLowerCase();
  return imageExts.some(ext => url.endsWith(ext));
});

console.log('Total image attachments:', imageAttachments.length);

function assignCategory(title, path) {
  const text = (title + ' ' + path).toLowerCase();
  if (text.includes('tree') || text.includes('laspark') || text.includes('nature') || text.includes('green') || text.includes('park')) return 'Tree Planting & Greening';
  if (text.includes('drain') || text.includes('canal') || text.includes('flood') || text.includes('channel') || text.includes('water')) return 'Drainage & Canal Desilting';
  if (text.includes('waste') || text.includes('lawma') || text.includes('sanitation') || text.includes('clean') || text.includes('market')) return 'Sanitation & Waste Management';
  if (text.includes('enforce') || text.includes('kai') || text.includes('lagesc') || text.includes('demolit') || text.includes('seal') || text.includes('contravention')) return 'Enforcement & Compliance';
  if (text.includes('conference') || text.includes('summit') || text.includes('symposium') || text.includes('workshop')) return 'Events & Conferences';
  return 'Ministerial Activities';
}

const galleryItems = imageAttachments.map((img, idx) => {
  const cleanTitle = img.title && img.title.length > 3 
    ? img.title.replace(/[-_]+/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Ministry Environmental Field Operation';
  
  const category = assignCategory(cleanTitle, img.url || '');
  
  let src = (img.url || '').replace(/https?:\/\/moelagos\.gov\.ng\/wp-content\/uploads\//, '/uploads/');

  return {
    id: idx + 1,
    wpId: String(img.id),
    title: cleanTitle,
    category: category,
    src: src,
    fallbackSrc: img.url,
    date: img.date ? img.date.slice(0, 10) : '2024-2026',
    caption: cleanTitle + ' — Official Media Documentation of Lagos State Ministry of the Environment & Water Resources.'
  };
});

fs.writeFileSync('src/data/gallery.json', JSON.stringify(galleryItems, null, 2), 'utf8');
console.log('Created src/data/gallery.json with', galleryItems.length, 'curated media gallery items.');
