const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    // Go to District URL
    await page.goto('https://www.district.in/dining/hyderabad/roast-ccx-banjara-hills', { waitUntil: 'networkidle2' });
    
    const districtImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
        return [...new Set(imgs)].filter(src => src.startsWith('http') && !src.includes('logo') && !src.includes('icon'));
    });
    
    console.log('District Images:');
    districtImages.forEach(img => console.log(img));
    
    await browser.close();
})();
