const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || !reqPath) reqPath = '/index.html';
  let filePath = path.join(DIST_DIR, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' };
  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(5222, () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outPath = path.join(__dirname, 'header_screenshot.png');
  const proc = spawn(edgePath, [
    '--headless=new',
    '--window-size=1440,900',
    '--screenshot=' + outPath,
    'http://127.0.0.1:5222/'
  ]);
  proc.on('close', () => {
    console.log('Screenshot captured:', fs.existsSync(outPath) ? fs.statSync(outPath).size + ' bytes' : 'Failed');
    server.close();
    process.exit(0);
  });
});
