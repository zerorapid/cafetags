import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.google.com/maps/place/Habitat+Cafe/@17.4211665,78.4405096,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb9713ea5dce4d:0x55d66161e9f00e11!8m2!3d17.4211614!4d78.4430845!16s%2Fg%2F11ld53yyby', { waitUntil: 'networkidle2' });
  
  // Try to click on the "Menu" tab if it exists
  try {
    const tabs = await page.$$('button[role="tab"]');
    for (const tab of tabs) {
      const text = await page.evaluate(el => el.textContent, tab);
      if (text.includes('Menu')) {
        await tab.click();
        await page.waitForTimeout(2000);
        break;
      }
    }
  } catch (e) {
    console.error('Error clicking Menu tab:', e);
  }

  // Extract all background images that might be menu photos
  const bgImages = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.U39Pmb, .h1Mbg, button, a, div'))
      .map(el => window.getComputedStyle(el).backgroundImage)
      .filter(img => img.includes('url("https://lh3.googleusercontent.com') || img.includes('url("https://lh5.googleusercontent.com'))
      .map(img => img.slice(5, -2));
  });

  // Extract all img src
  const imgTags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src.includes('lh3.googleusercontent.com') || src.includes('lh5.googleusercontent.com'));
  });

  const allImages = [...new Set([...bgImages, ...imgTags])];
  console.log('Extracted Images:', allImages);

  await browser.close();
})();
