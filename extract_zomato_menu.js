import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.zomato.com/hyderabad/habitat-cafe-3-banjara-hills/menu', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  const imgTags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src.includes('b.zmtcdn.com/data/menus/'));
  });

  const unique = [...new Set(imgTags)];
  console.log('Zomato Menu Images:', JSON.stringify(unique, null, 2));

  await browser.close();
})();
