import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.google.com/maps/place/Habitat+Cafe/@17.4211665,78.4405096,17z/data=!4m14!1m7!3m6!1s0x3bcb9713ea5dce4d:0x55d66161e9f00e11!2sHabitat+Cafe!8m2!3d17.4211614!4d78.4430845!16s%2Fg%2F11ld53yyby!3m5!1s0x3bcb9713ea5dce4d:0x55d66161e9f00e11!8m2!3d17.4211614!4d78.4430845!16s%2Fg%2F11ld53yyby', { waitUntil: 'networkidle2' });

  // click on the first image to open gallery
  await page.evaluate(() => {
    const firstImage = document.querySelector('.ZkcM1c');
    if (firstImage) firstImage.click();
  });
  
  await new Promise(r => setTimeout(r, 3000));
  
  // try to extract all background-images from the gallery thumbnails
  const bgImages = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div'))
      .map(el => window.getComputedStyle(el).backgroundImage)
      .filter(bg => bg.includes('url("https://lh3.googleusercontent.com/p/') || bg.includes('url("https://lh5.googleusercontent.com/p/'))
      .map(bg => bg.slice(5, -2));
  });

  const unique = [...new Set(bgImages)];
  console.log('Images JSON:', JSON.stringify(unique, null, 2));

  await browser.close();
})();
