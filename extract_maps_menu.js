import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.google.com/maps/place/Habitat+Cafe/@17.4211665,78.4405096,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb9713ea5dce4d:0x55d66161e9f00e11!8m2!3d17.4211614!4d78.4430845!16s%2Fg%2F11ld53yyby', { waitUntil: 'networkidle2' });
  
  try {
    // Click on the button that has "Menu" text
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const menuBtn = buttons.find(b => b.textContent && b.textContent.includes('Menu') && b.getAttribute('role') === 'tab');
      if (menuBtn) menuBtn.click();
    });
    
    // Wait for network to settle or a short timeout
    await new Promise(r => setTimeout(r, 4000));
    
    // The menu images usually appear as divs with background-image containing 'lh3.googleusercontent.com' or 'lh5.googleusercontent.com'
    const bgImages = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('div, a, button'));
      return elements.map(el => window.getComputedStyle(el).backgroundImage)
        .filter(bg => bg.includes('url("https://lh3.googleusercontent.com') || bg.includes('url("https://lh5.googleusercontent.com'))
        .map(bg => bg.slice(5, -2));
    });

    const imgTags = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src.includes('lh3.googleusercontent.com') || src.includes('lh5.googleusercontent.com'));
    });

    const allImages = [...new Set([...bgImages, ...imgTags])];
    console.log('Images JSON:', JSON.stringify(allImages, null, 2));

  } catch (e) {
    console.error('Error:', e);
  }

  await browser.close();
})();
