import puppeteer from 'puppeteer';

const cafes = [
  { name: 'kisscoff', url: 'https://www.district.in/dining/hyderabad/kisscoff-cafe-film-nagar' },
  { name: 'manam', url: 'https://www.district.in/dining/hyderabad/manam-chocolate-1-banjara-hills' },
  { name: 'churrolto', url: 'https://www.district.in/dining/hyderabad/churrolto-2-banjara-hills' },
  { name: 'lasthouse', url: 'https://www.district.in/dining/hyderabad/lasthouse-by-the-lake-jubilee-hills' },
  { name: 'heartcup', url: 'https://www.district.in/dining/hyderabad/heart-cup-coffee-gachibowli' },
];

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

for (const cafe of cafes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');
  try {
    await page.goto(cafe.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 4000));

    const allImgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src && src.includes('zmtcdn.com') && (src.includes('/pictures/') || src.includes('/menus/') || src.includes('/reviews_photos/')));
    });

    const all = [...new Set(allImgs)];
    const pics = all.filter(u => u.includes('/pictures/') || u.includes('/reviews_photos/'));
    const menus = all.filter(u => u.includes('/menus/'));

    console.log(`\n=== ${cafe.name.toUpperCase()} ===`);
    console.log('PICS:', JSON.stringify(pics));
    console.log('MENUS:', JSON.stringify(menus));
  } catch(e) {
    console.log(`\n=== ${cafe.name.toUpperCase()} === ERROR: ${e.message}`);
  }
  await page.close();
}

await browser.close();
