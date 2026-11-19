const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function captureUrl(targetUrl, outputPath, width = 1280, height = 900) {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debuggingPort = 9250 + Math.floor(Math.random() * 40);
  const tempDir = path.join(process.env.TEMP || '.', `edge_verify_${Date.now()}_${Math.random().toString(36).substring(7)}`);

  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${tempDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--hide-scrollbars',
    `--window-size=${width},${height}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const listRes = await fetch(`http://127.0.0.1:${debuggingPort}/json/list`);
    const tabs = await listRes.json();
    const wsUrl = tabs[0]?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No webSocketDebuggerUrl');

    await new Promise((resolve, reject) => {
      const ws = new globalThis.WebSocket(wsUrl);
      let id = 1;
      const send = (method, params = {}) => ws.send(JSON.stringify({ id: id++, method, params }));

      ws.onopen = () => {
        send('Page.enable');
        send('Page.navigate', { url: targetUrl });
        // Instead of waiting on external iframe load events, wait 3.5s for React app render
        setTimeout(() => {
          send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
        }, 3500);
      };

      ws.onmessage = async (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && msg.result && msg.result.data) {
          fs.writeFileSync(outputPath, Buffer.from(msg.result.data, 'base64'));
          console.log(`Saved screenshot to ${outputPath}`);
          ws.close();
          resolve();
        }
      };

      ws.onerror = reject;
      setTimeout(() => reject(new Error('Timeout capturing ' + targetUrl)), 10000);
    });
  } finally {
    edgeProcess.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

async function run() {
  console.log('1. Capturing Home page...');
  await captureUrl('http://localhost:3002/', 'artifacts/verified_home_messages.png');

  console.log('2. Capturing Sanwo-Olu article...');
  await captureUrl('http://localhost:3002/news/sanwo-olu-seeks-african-capital-and-private-sector-participation-to-save-continents-forests', 'artifacts/verified_sanwo_article.png');

  console.log('3. Capturing Leadership Page...');
  await captureUrl('http://localhost:3002/leadership', 'artifacts/verified_leadership.png');

  console.log('4. Capturing Projects Page...');
  await captureUrl('http://localhost:3002/projects', 'artifacts/verified_projects.png');

  console.log('All verification captures completed successfully!');
}

run().catch(console.error);
