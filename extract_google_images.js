import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.google.com/search?q=la+vie+en+rose+cafe+gachibowli+interior&tbm=isch', { waitUntil: 'networkidle2' });
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src && src.startsWith('http'));
  });
  
  console.log(images.slice(0, 10).join('\n'));
  await browser.close();
})();
