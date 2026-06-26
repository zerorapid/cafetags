import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');

await page.goto('https://www.district.in/dining/hyderabad/makobrew-cafe-restaurant-jubilee-hills', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 4000));

// Grab all image src values from the page
const allImgs = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('img'))
    .map(img => img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src'))
    .filter(src => src && src.startsWith('http') && !src.includes('placeholder') && !src.includes('icon') && !src.includes('logo'));
});

// Grab background images from style attributes
const bgImgs = await page.evaluate(() => {
  const results = [];
  document.querySelectorAll('[style]').forEach(el => {
    const style = el.getAttribute('style') || '';
    const match = style.match(/url\(["']?(https[^"')]+)["']?\)/);
    if (match) results.push(match[1]);
  });
  return results;
});

const all = [...new Set([...allImgs, ...bgImgs])];
console.log(JSON.stringify(all, null, 2));
await browser.close();
