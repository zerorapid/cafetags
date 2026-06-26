import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { execSync } from 'child_process';

const IMAGES_DIR = './public/images';
const DATA_FILE = './src/data.ts';
const ARTIFACTS_DIR = '/Users/Jayapalreddy/.gemini/antigravity/brain/ed307c3b-3c43-49fa-891c-85a9da2f8798';

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

  // Hardcoded CORRECT URLs for the 4 cafes
  const knownUrls = {
    'Cafe Niloufer': 'https://www.district.in/dining/hyderabad/cafe-niloufer-banjara-hills',
    'Sobremesa': 'https://www.district.in/dining/hyderabad/sobremesa-bakehouse-cafe-kitchen-jubilee-hills',
    'Guilt Trip': 'https://www.district.in/dining/hyderabad/guilt-trip-film-nagar',
    'Osaka': 'https://www.district.in/dining/hyderabad/osaka-jubilee-hills'
  };

  // Fallback map for cafes without District pages
  const fallbacks = {
    'Kaficko': { img: 'etsi_interior_1782503326955.png', food: 'pistachio_matilda_cake_1782503354679.png' },
    'Karafa': { img: 'makobrew_interior_1782507991320.png', food: 'signature_croissant_1782503378844.png' },
    'Habitat Cafe': { img: 'makobrew_exterior_1782508001568.png', food: 'souffle_pancakes_1782503366494.png' },
    'Switch Coffee': { img: 'switch_interior_1782504092131.png', food: 'switch_orange_latte_1782504102340.png' },
    'La Vie En Rose Cafe & Bistro': { img: 'lavie_exterior_1782505509200.png', food: 'rose_tea_1782505518816.png' },
    'Et-Si Cafe | Bakehouse | Chocolatier': { img: 'etsi_interior_1782503326955.png', food: 'pistachio_matilda_cake_1782503354679.png' }
  };

  for (const c of cafesArr) {
    // 1. If it has a known District URL, scrape it!
    if (knownUrls[c.name]) {
       console.log(`Processing ${c.name} via District...`);
       await page.goto(knownUrls[c.name], { waitUntil: 'networkidle2' });
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
             if (c.image.includes('zmt_') && valid.length >= 2) {
                const baseName = c.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
                const downloadedGallery = [];
                for (let i = 0; i < Math.min(4, valid.length); i++) {
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
                   const src = food[i] || valid[i+4] || valid[0];
                   if (src) {
                     const dest = path.join(IMAGES_DIR, `${baseName}_food${i+1}.jpg`);
                     await download(src, dest);
                     c.featuredMenu[i].image = `/images/${baseName}_food${i+1}.jpg`;
                   }
                }
                console.log(`Fixed featured menu for ${c.name}`);
             }
          }
       }
    } 
    // 2. Else if it's in the fallback list and has zmt placeholders
    else if (fallbacks[c.name]) {
       if (c.image.includes('zmt_')) {
          const fData = fallbacks[c.name];
          const baseName = c.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
          
          // Copy main image
          const newImgName = `${baseName}_main.png`;
          execSync(`cp "${path.join(ARTIFACTS_DIR, fData.img)}" "${path.join(IMAGES_DIR, newImgName)}"`);
          c.image = `/images/${newImgName}`;
          c.moreImages = [`/images/${newImgName}`];
          console.log(`Fallback gallery for ${c.name}`);
          
          // Copy food image
          if (c.featuredMenu && c.featuredMenu.length > 0) {
              const newFoodName = `${baseName}_food.png`;
              execSync(`cp "${path.join(ARTIFACTS_DIR, fData.food)}" "${path.join(IMAGES_DIR, newFoodName)}"`);
              for (let i = 0; i < c.featuredMenu.length; i++) {
                 c.featuredMenu[i].image = `/images/${newFoodName}`;
              }
              console.log(`Fallback food for ${c.name}`);
          }
       }
    }
    
    // 3. Clear duplicate placeholder menus
    if (c.menuImages && c.menuImages.length > 0 && (c.menuImages[0].includes('bpuozr') || c.menuImages[0].includes('unsplash'))) {
       console.log(`Cleared duplicate menu images for ${c.name}`);
       c.menuImages = [];
    }
  }

  const newContent = prefix + 'export const INITIAL_CAFES: Cafe[] = ' + JSON.stringify(cafesArr, null, 2) + suffix;
  fs.writeFileSync(DATA_FILE, newContent);
  await browser.close();
  console.log('COMPLETED FULL FIX OF REMAINING CAFES!');
})();
