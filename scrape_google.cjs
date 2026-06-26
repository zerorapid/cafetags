const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    // Go to Google Images
    await page.goto('https://www.google.com/search?q=Roast+CCX+Banjara+Hills+interior+OR+exterior+OR+menu&tbm=isch', { waitUntil: 'networkidle2' });
    
    const googleImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('data-src'));
        return imgs.filter(src => src && src.startsWith('http') && !src.includes('googlelogo') && !src.includes('favicon'));
    });
    
    console.log('Google Images:');
    googleImages.slice(0, 15).forEach(img => console.log(img));
    
    await browser.close();
})();
