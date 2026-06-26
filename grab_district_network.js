import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const images = new Set();
  
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('api.district.in') || url.includes('zomato.com')) {
      try {
        const text = await response.text();
        const pictureRegex = /https:\/\/b\.zmtcdn\.com\/data\/pictures\/[^"'\s\\]+/g;
        const matches = text.match(pictureRegex);
        if (matches) {
          matches.forEach(m => images.add(m));
        }
      } catch (e) {}
    }
  });

  await page.goto('https://www.district.in/dining/hyderabad/la-vie-en-rose-cafe-and-bistro-sainikpuri', { waitUntil: 'networkidle2' });
  
  // Also check the raw HTML again just in case
  const html = await page.content();
  const htmlMatches = html.match(/https:\/\/b\.zmtcdn\.com\/data\/pictures\/[^"'\s\\]+/g);
  if (htmlMatches) {
    htmlMatches.forEach(m => images.add(m));
  }

  console.log("Found Images:", Array.from(images));
  await browser.close();
})();
