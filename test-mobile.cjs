const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 }); // iPhone SE size
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Check if there is horizontal scroll
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Has Horizontal Scroll:', hasHorizontalScroll);
  
  if (hasHorizontalScroll) {
     const elements = await page.evaluate(() => {
        const result = [];
        document.querySelectorAll('*').forEach(el => {
           if (el.getBoundingClientRect().right > window.innerWidth) {
              result.push({ tag: el.tagName, className: el.className, id: el.id, right: el.getBoundingClientRect().right });
           }
        });
        return result;
     });
     console.log('Overflowing elements:', elements.slice(0, 5));
  }
  
  await browser.close();
})();
