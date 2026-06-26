const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    // Go to Google Maps link
    await page.goto('https://maps.app.goo.gl/CEMnycMvmoP229jC6', { waitUntil: 'networkidle2' });
    
    // Wait for the main image panel to load (usually quick on desktop view)
    await new Promise(r => setTimeout(r, 3000));
    
    const mapsImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('data-src') || '');
        return [...new Set(imgs)].filter(src => src.includes('lh3.googleusercontent.com/p/'));
    });
    
    console.log('Google Maps Images:');
    mapsImages.forEach(img => {
        // Strip the sizing parameters to get high-res (e.g. change =w200-h200-k-no to =s1200)
        let highRes = img.split('=')[0] + '=s1200';
        console.log(highRes);
    });
    
    await browser.close();
})();
