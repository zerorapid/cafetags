import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.district.in/dining/hyderabad/la-vie-en-rose-cafe-and-bistro-sainikpuri', { waitUntil: 'networkidle2' });
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src.includes('zmtcdn.com'));
  });
  
  console.log("District Images:", [...new Set(images)]);
  await browser.close();
})();
