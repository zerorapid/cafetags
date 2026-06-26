import puppeteer from 'puppeteer';

const cafes = [
  { name: 'trueblack', url: 'https://www.district.in/dining/hyderabad/true-black-speciality-coffee-jubilee-hills' },
  { name: 'echoes', url: 'https://www.district.in/dining/hyderabad/echoes-narsingi' },
  { name: 'dailyrituals', url: 'https://www.district.in/dining/hyderabad/daily-rituals-jubilee-hills' },
];

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

for (const cafe of cafes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');
  await page.goto(cafe.url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));

  const allImgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && src.includes('zmtcdn.com') && (src.includes('/pictures/') || src.includes('/menus/') || src.includes('/reviews_photos/')));
  });

  const bgImgs = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('[style]').forEach(el => {
      const style = el.getAttribute('style') || '';
      const match = style.match(/url\(["']?(https[^"')]+zmtcdn[^"')]+)["']?\)/);
      if (match) results.push(match[1]);
    });
    return results;
  });

  const all = [...new Set([...allImgs, ...bgImgs])];
  const pics = all.filter(u => u.includes('/pictures/') || u.includes('/reviews_photos/'));
  const menus = all.filter(u => u.includes('/menus/'));

  console.log(`\n=== ${cafe.name.toUpperCase()} ===`);
  console.log('PICS:', JSON.stringify(pics));
  console.log('MENUS:', JSON.stringify(menus));
  await page.close();
}

await browser.close();
