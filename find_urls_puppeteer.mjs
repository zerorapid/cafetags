import puppeteer from 'puppeteer';

const cafes = ['La Sabroso Hyderabad', 'Ukusa Hyderabad', 'Kisscoff Cafe Hyderabad', 'Manam Chocolate Atelier Hyderabad', 'Churrolto Hyderabad'];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  for (const cafe of cafes) {
    try {
      await page.goto(`https://duckduckgo.com/?q=site:zomato.com/hyderabad+${encodeURIComponent(cafe)}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 2000));
      const url = await page.evaluate(() => {
        const a = document.querySelector('a[href*="zomato.com/hyderabad/"]');
        return a ? a.href : null;
      });
      console.log(`${cafe}: ${url}`);
    } catch(e) {
      console.log(`${cafe}: ERROR ${e.message}`);
    }
  }
  
  await browser.close();
})();
