const fs = require('fs');
const path = require('path');
const https = require('https');

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
const imgs = new Set();

posts.forEach(p => {
  if (p.featuredImage && p.featuredImage.startsWith('/uploads/')) {
    imgs.add(p.featuredImage);
  }
  const regex = /\/uploads\/[^\s"'<>)]+\.(?:jpg|jpeg|png|webp|gif)/gi;
  let match;
  while ((match = regex.exec(p.content || '')) !== null) {
    imgs.add(match[0]);
  }
});

console.log('Total unique /uploads/ image paths found in posts:', imgs.size);

const missing = [];
imgs.forEach(imgPath => {
  const localFile = path.join('public', imgPath.replace(/^\//, ''));
  if (!fs.existsSync(localFile)) {
    missing.push({
      localFile,
      remoteUrl: 'https://moelagos.gov.ng/wp-content' + imgPath
    });
  }
});

console.log('Missing images on local disk:', missing.length);
console.log('Sample missing:', missing.slice(0, 15));
