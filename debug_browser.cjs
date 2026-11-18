const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const HTTP_PORT = 5111;
const CDP_PORT = 9334;

// Simple static server for dist/
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || !reqPath) reqPath = '/index.html';
  let filePath = path.join(DIST_DIR, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(HTTP_PORT, () => {
  console.log(`Static server running on http://127.0.0.1:${HTTP_PORT}`);

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    `http://127.0.0.1:${HTTP_PORT}/`
  ]);

  setTimeout(async () => {
    try {
      const listRes = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${CDP_PORT}/json`, res => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
      });

      const targetPage = listRes.find(p => p.url.includes(`${HTTP_PORT}`));
      if (targetPage && targetPage.webSocketDebuggerUrl) {
        console.log('Connecting to target WS:', targetPage.webSocketDebuggerUrl);
        const ws = new WebSocket(targetPage.webSocketDebuggerUrl);

        let exceptions = [];

        ws.onopen = () => {
          ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
          ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
          ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: 'document.getElementById("root").children.length',
                returnByValue: true
              }
            }));
            ws.send(JSON.stringify({
              id: 5,
              method: 'Runtime.evaluate',
              params: {
                expression: 'document.title',
                returnByValue: true
              }
            }));
          }, 3000);
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.method === 'Runtime.exceptionThrown') {
            console.error('EXCEPTION:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
            exceptions.push(msg.params.exceptionDetails);
          } else if (msg.id === 4) {
            console.log('ROOT CHILDREN COUNT:', msg.result?.result?.value);
          } else if (msg.id === 5) {
            console.log('PAGE TITLE:', msg.result?.result?.value);
            console.log('TOTAL EXCEPTIONS:', exceptions.length);
            setTimeout(() => {
              ws.close();
              browser.kill();
              server.close();
              process.exit(0);
            }, 500);
          }
        };
      }
    } catch (err) {
      console.error('Browser check failed:', err);
      browser.kill();
      server.close();
    }
  }, 2500);
});
