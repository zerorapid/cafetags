import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Navigate to Zomato's menu page directly
  await page.goto('https://www.zomato.com/hyderabad/urban-nemo-cafe-in-garden-jubilee-hills/menu', { waitUntil: 'networkidle2' });
  
  const urls = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script'));
    const stateScript = scripts.find(s => s.textContent.includes('menus') || s.textContent.includes('zmtcdn.com'));
    if (!stateScript) return [];
    
    const text = stateScript.textContent.replace(/\\u002F/g, '/').replace(/\\\//g, '/');
    const matches = text.match(/https?:\/\/b\.zmtcdn\.com\/data\/menus\/[a-zA-Z0-9_\/\-\.]+\.(jpg|jpeg|png|webp)/g);
    return matches ? [...new Set(matches)] : [];
  });
  
  console.log('ALL MENU URLS FROM ZOMATO:', urls);
  
  await browser.close();
})();
