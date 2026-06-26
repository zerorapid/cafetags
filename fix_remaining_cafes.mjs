import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';
import path from 'path';

const IMAGES_DIR = './public/images';
const DATA_FILE = './src/data.ts';

const cafesToFix = [
  'Kaficko', 'Karafa', 'Habitat Cafe', 'La Vie En Rose Cafe', 'Switch Coffee', 'Osaka', 'Blue Tokai Coffee Roasters', 'Kisscoff Cafe', 'Manam Chocolate Atelier'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
    https.get(url, options, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); try { fs.unlinkSync(dest); } catch(e) {}
        download(res.headers.location, dest).then(resolve).catch(reject); return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', err => { try { fs.unlinkSync(dest); } catch(e) {} reject(err); });
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let content = fs.readFileSync(DATA_FILE, 'utf8');
  const startIndex = content.indexOf('export const INITIAL_CAFES: Cafe[] = [');
  const prefix = content.substring(0, startIndex);
  const rest = content.substring(startIndex + 'export const INITIAL_CAFES: Cafe[] = '.length);
  const endIndex = rest.indexOf('];\n') + 1;
  const listString = rest.substring(0, endIndex);
  const suffix = rest.substring(endIndex);
  
  let cafesArr;
  eval('cafesArr = ' + listString);

  // Hardcoded URLs for the ones we know
  const knownUrls = {
    'Cafe Niloufer': 'https://www.district.in/dining/hyderabad/cafe-niloufer-hitec-city',
    'Sobremesa': 'https://www.district.in/dining/hyderabad/sobremesa-jubilee-hills',
    'Guilt Trip': 'https://www.district.in/dining/hyderabad/guilt-trip-banjara-hills'
  };

  for (const c of cafesArr) {
    if (c.image && c.image.includes('zmt_') || 
        c.menuImages && c.menuImages.length > 0 && c.menuImages[0].includes('bpuozr') ||
        c.featuredMenu && c.featuredMenu.length > 0 && c.featuredMenu[0].image.includes('zmt_')) {
        
        let targetUrl = knownUrls[c.name];

        if (!targetUrl) {
           console.log(`Searching district.in for ${c.name}...`);
           await page.goto(`https://www.google.com/search?q=site:district.in/dining/hyderabad+${encodeURIComponent(c.name)}`, { waitUntil: 'networkidle2' });
           try {
             const link = await page.$eval('a[href*="district.in/dining/hyderabad"]', el => el.href);
             targetUrl = link;
             console.log(`Found URL: ${targetUrl}`);
           } catch(e) {
             console.log(`Could not find URL for ${c.name}`);
             continue;
           }
        }

        if (targetUrl) {
           await page.goto(targetUrl, { waitUntil: 'networkidle2' });
           // Extract images from NEXT_DATA
           const dataStr = await page.evaluate(() => {
              const el = document.getElementById('__NEXT_DATA__');
              return el ? el.textContent : null;
           });
           
           if (dataStr) {
              const nextData = JSON.parse(dataStr);
              const sections = nextData?.props?.pageProps?.initialState?.diningDetails?.pageDetailsResponse?.sections?.SECTION_IMAGE_CAROUSEL?.entities;
              if (sections) {
                 const allImages = sections.map(s => s.url || s.thumbUrl);
                 const valid = allImages.filter(u => u && !u.includes('featured_v3') && (u.endsWith('.jpg') || u.endsWith('.png')));
                 const food = allImages.filter(u => u && u.includes('featured_v3') && (u.endsWith('.jpg') || u.endsWith('.png')));
                 
                 // Main Gallery
                 if (c.image.includes('zmt_') && valid.length >= 4) {
                    const baseName = c.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
                    const downloadedGallery = [];
                    for (let i = 0; i < 4; i++) {
                       const dest = path.join(IMAGES_DIR, `${baseName}_${i+1}.jpg`);
                       await download(valid[i], dest);
                       downloadedGallery.push(`/images/${baseName}_${i+1}.jpg`);
                    }
                    c.image = downloadedGallery[0];
                    c.moreImages = downloadedGallery;
                    console.log(`Fixed gallery for ${c.name}`);
                 }

                 // Food / Featured Menu
                 if (c.featuredMenu && c.featuredMenu.length > 0 && c.featuredMenu[0].image.includes('zmt_')) {
                    const baseName = c.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
                    for (let i = 0; i < c.featuredMenu.length; i++) {
                       const src = food[i] || valid[i+4] || valid[i];
                       if (src) {
                         const dest = path.join(IMAGES_DIR, `${baseName}_food${i+1}.jpg`);
                         await download(src, dest);
                         c.featuredMenu[i].image = `/images/${baseName}_food${i+1}.jpg`;
                       }
                    }
                    console.log(`Fixed featured menu for ${c.name}`);
                 }
              }

              // Menus
              if (c.menuImages && c.menuImages.length > 0 && c.menuImages[0].includes('bpuozr')) {
                 const menuUrls = [];
                 try {
                    const mSections = nextData?.props?.pageProps?.initialState?.diningDetails?.pageDetailsResponse?.sections?.SECTION_MENU_BROWSE?.items;
                    if (mSections && mSections.length > 0 && mSections[0].items) {
                       menuUrls.push(...mSections[0].items.map(m => m.url));
                    }
                 } catch(e) {}
                 
                 if (menuUrls.length > 0) {
                    const baseName = c.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
                    const downloadedMenus = [];
                    for (let i = 0; i < Math.min(15, menuUrls.length); i++) {
                       const dest = path.join(IMAGES_DIR, `${baseName}_menu${i+1}.png`);
                       await download(menuUrls[i], dest);
                       downloadedMenus.push(`/images/${baseName}_menu${i+1}.png`);
                    }
                    c.menuImages = downloadedMenus;
                    console.log(`Fixed menus for ${c.name}`);
                 } else {
                    c.menuImages = [];
                 }
              }
           }
        }
    }
  }

  const newContent = prefix + 'export const INITIAL_CAFES: Cafe[] = ' + JSON.stringify(cafesArr, null, 2) + suffix;
  fs.writeFileSync(DATA_FILE, newContent);
  await browser.close();
  console.log('COMPLETED FULL FIX!');
})();
