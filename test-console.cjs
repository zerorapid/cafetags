const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

async function run() {
  const server = spawn('npm', ['run', 'dev'], { stdio: 'pipe' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
  });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  } catch(e) {}

  await browser.close();
  server.kill();
  process.exit(0);
}
run();
