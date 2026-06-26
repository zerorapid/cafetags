import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.district.in/dining/hyderabad/la-vie-en-rose-cafe-and-bistro-sainikpuri', { waitUntil: 'networkidle2' });
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && !src.includes('svg'));
  });
  
  console.log("All District Images (Sainikpuri):", [...new Set(images)]);
  
  await page.goto('https://www.district.in/dining/hyderabad/la-vie-en-rose-cafe-1-gachibowli', { waitUntil: 'networkidle2' });
  const images2 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && !src.includes('svg'));
  });
  console.log("All District Images (Gachibowli):", [...new Set(images2)]);

  await browser.close();
})();
