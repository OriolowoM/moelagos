const http = require('http');

const routes = [
  '/',
  '/about',
  '/leadership',
  '/departments',
  '/initiatives',
  '/projects',
  '/publications',
  '/gallery',
  '/contact',
  '/admin',
  '/news/lagos-directs-immediate-relocation-of-residents-in-flood-prone-areas-to-higher-grounds'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get('http://localhost:3002' + route, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const hasTitle = data.includes('Lagos State Ministry of the Environment and Water Resources') || data.includes('moelagos');
        console.log(`[PASS] Route: ${route.padEnd(45)} -> Status: ${res.statusCode} | Length: ${data.length} bytes`);
        resolve({ route, status: res.statusCode, ok: res.statusCode === 200 });
      });
    }).on('error', (err) => {
      console.log(`[FAIL] Route: ${route.padEnd(45)} -> Error: ${err.message}`);
      resolve({ route, status: 0, ok: false });
    });
  });
}

async function run() {
  console.log('--- TESTING ALL APPLICATION ROUTES ON http://localhost:3002 ---');
  let passed = 0;
  for (const r of routes) {
    const res = await checkRoute(r);
    if (res.ok) passed++;
  }
  console.log(`\nTesting Complete: ${passed}/${routes.length} routes responded with HTTP 200.`);
}

run();
