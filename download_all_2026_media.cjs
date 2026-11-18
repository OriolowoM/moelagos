const fs = require('fs');
const path = require('path');
const https = require('https');

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
const imageMap = new Map(); // localPath -> remoteUrl

posts.forEach(p => {
  // Check featuredImage
  if (p.featuredImage && p.featuredImage.startsWith('/uploads/')) {
    const local = path.join('public', p.featuredImage.replace(/^\//, ''));
    const remote = 'https://moelagos.gov.ng/wp-content' + p.featuredImage;
    if (!fs.existsSync(local)) {
      imageMap.set(local, remote);
    }
  }

  // Check in content
  const regex = /\/uploads\/([^\s"'<>)\]]+\.(?:jpg|jpeg|png|webp|gif))/gi;
  let match;
  while ((match = regex.exec(p.content || '')) !== null) {
    const local = path.join('public', 'uploads', match[1]);
    const remote = 'https://moelagos.gov.ng/wp-content/uploads/' + match[1];
    if (!fs.existsSync(local)) {
      imageMap.set(local, remote);
    }
  }
});

console.log('Total missing post images to download:', imageMap.size);

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { rejectUnauthorized: false, timeout: 15000 }, res => {
      if (res.statusCode !== 200) {
        file.close(() => {
          fs.unlink(dest, () => resolve({ ok: false, status: res.statusCode, url }));
        });
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve({ ok: true, size: fs.statSync(dest).size, url }));
      });
    });

    req.on('error', err => {
      file.close(() => {
        fs.unlink(dest, () => resolve({ ok: false, error: err.message, url }));
      });
    });

    req.on('timeout', () => {
      req.destroy();
      file.close(() => {
        fs.unlink(dest, () => resolve({ ok: false, error: 'timeout', url }));
      });
    });
  });
}

async function runBatch() {
  const entries = Array.from(imageMap.entries());
  console.log(`Starting download of ${entries.length} images with concurrency 5...`);
  
  let success = 0;
  let failed = 0;
  
  const concurrency = 5;
  for (let i = 0; i < entries.length; i += concurrency) {
    const chunk = entries.slice(i, i + concurrency);
    const results = await Promise.all(chunk.map(([dest, url]) => downloadFile(url, dest)));
    results.forEach(r => {
      if (r.ok) success++;
      else failed++;
    });
    if ((i + concurrency) % 25 === 0 || i + concurrency >= entries.length) {
      console.log(`Progress: ${Math.min(i + concurrency, entries.length)}/${entries.length} (Success: ${success}, Failed: ${failed})`);
    }
  }
  
  console.log(`Completed: ${success} images downloaded, ${failed} failed or not on server.`);
}

runBatch();
