import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.district.in/dining/hyderabad/habitat-cafe-banjara-hills', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  const imgTags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src.includes('zmtcdn.com/data/menus/'));
  });

  const unique = [...new Set(imgTags)];
  console.log('District Menu Images:', JSON.stringify(unique, null, 2));

  await browser.close();
})();
