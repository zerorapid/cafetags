import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.google.com/search?q=et-si+cafe+jubilee+hills+interior&tbm=isch', { waitUntil: 'networkidle2' });
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && (src.startsWith('http') || src.startsWith('data:image')));
  });
  
  fs.writeFileSync('et_si_images.json', JSON.stringify(images.slice(0, 15), null, 2));
  console.log("Saved " + images.length + " images to et_si_images.json");
  await browser.close();
})();
