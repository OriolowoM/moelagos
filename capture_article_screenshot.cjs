const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'http://localhost:3002/news/sanwo-olu-seeks-african-capital-and-private-sector-participation-to-save-continents-forests';
const screenshotPath = 'c:\\projects\\moelagos\\article_verification_screenshot.png';

console.log('Capturing full screenshot of article page...');

const browser = spawn(edgePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1280,3000',
  `--screenshot=${screenshotPath}`,
  targetUrl
]);

browser.on('close', (code) => {
  console.log('Browser exited with code:', code);
  if (fs.existsSync(screenshotPath)) {
    console.log('Screenshot successfully created! Size:', fs.statSync(screenshotPath).size, 'bytes');
  } else {
    console.log('Screenshot was not created.');
  }
});
