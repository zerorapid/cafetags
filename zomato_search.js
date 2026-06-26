import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.google.com/search?q=site:zomato.com/hyderabad+La+Vie+En+Rose+Cafe', { waitUntil: 'networkidle2' });
  
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href).filter(href => href.includes('zomato.com/hyderabad/la-vie'));
  });
  
  console.log(links);
  await browser.close();
})();
