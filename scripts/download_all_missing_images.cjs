const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/posts.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/pages.json'), 'utf8'));
const publicDir = path.join(__dirname, '../public');

const urls = new Set();

function extractUrls(text) {
  if (!text) return;
  const matches = text.matchAll(/src=["']([^"']+)["']/gi);
  for (const m of matches) {
    urls.add(m[1]);
  }
}

posts.forEach(p => {
  if (p.featuredImage) urls.add(p.featuredImage);
  extractUrls(p.content);
});

pages.forEach(p => {
  if (p.featuredImage) urls.add(p.featuredImage);
  extractUrls(p.content);
});

const missing = [];
for (const rawUrl of urls) {
  let relPath = null;
  if (rawUrl.startsWith('/uploads/')) {
    relPath = rawUrl;
  } else if (rawUrl.includes('/wp-content/uploads/')) {
    relPath = '/uploads/' + rawUrl.split('/wp-content/uploads/')[1];
  } else if (rawUrl.includes('/uploads/')) {
    relPath = '/uploads/' + rawUrl.split('/uploads/')[1];
  }

  if (relPath) {
    // Strip query parameters if any
    const cleanRelPath = relPath.split('?')[0];
    const fullPath = path.join(publicDir, cleanRelPath);
    if (!fs.existsSync(fullPath)) {
      const liveUrl = 'https://moelagos.gov.ng/wp-content' + cleanRelPath;
      missing.push({ cleanRelPath, fullPath, liveUrl });
    }
  }
}

console.log(`Total media URLs: ${urls.size}`);
console.log(`Missing local media files to download: ${missing.length}`);

// Download queue with concurrency limit
const CONCURRENCY = 8;
let active = 0;
let index = 0;
let downloaded = 0;
let failed = 0;

function downloadNext() {
  if (index >= missing.length) {
    if (active === 0) {
      console.log(`\n=== Image Download Complete! Downloaded: ${downloaded}, Failed/404 on server: ${failed} ===`);
    }
    return;
  }

  const item = missing[index++];
  active++;

  const dir = path.dirname(item.fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileStream = fs.createWriteStream(item.fullPath);
  const client = item.liveUrl.startsWith('https') ? https : http;

  const req = client.get(item.liveUrl, {
    rejectUnauthorized: false,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    timeout: 10000
  }, res => {
    if (res.statusCode === 200) {
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        downloaded++;
        active--;
        if (downloaded % 20 === 0 || index >= missing.length) {
          process.stdout.write(`Progress: ${downloaded}/${missing.length} downloaded...\r`);
        }
        downloadNext();
      });
    } else {
      fileStream.close();
      if (fs.existsSync(item.fullPath)) fs.unlinkSync(item.fullPath);
      failed++;
      active--;
      downloadNext();
    }
  });

  req.on('error', err => {
    fileStream.close();
    if (fs.existsSync(item.fullPath)) fs.unlinkSync(item.fullPath);
    failed++;
    active--;
    downloadNext();
  });

  req.on('timeout', () => {
    req.destroy();
  });
}

// Start concurrent downloads
for (let i = 0; i < Math.min(CONCURRENCY, missing.length); i++) {
  downloadNext();
}
