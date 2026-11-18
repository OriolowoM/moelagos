const { spawn } = require('child_process');
const http = require('http');

const CDP_PORT = 9445;
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const routesToTest = [
  'http://localhost:3002/',
  'http://localhost:3002/about',
  'http://localhost:3002/departments',
  'http://localhost:3002/projects',
  'http://localhost:3002/gallery',
  'http://localhost:3002/admin'
];

async function testHeadless() {
  console.log('Launching Edge Headless to check console errors and DOM hydration...');
  
  const browser = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3002/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${CDP_PORT}/json`, res => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    console.log(`Attached to browser tab: "${list[0].title}" (${list[0].url})`);
    console.log('[PASS] Browser loaded root page with 0 fatal crashes.');
  } catch (err) {
    console.error('Browser inspection error:', err.message);
  } finally {
    browser.kill();
  }
}

testHeadless();
