import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.district.in/dining/hyderabad?search=La+Vie+En+Rose', { waitUntil: 'networkidle2' });
  
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href).filter(href => href.includes('la-vie-en-rose'));
  });
  
  console.log(links);
  await browser.close();
})();
