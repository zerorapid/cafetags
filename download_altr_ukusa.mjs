import https from 'https';
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const IMAGES_DIR = './public/images';
const DATA_FILE = './src/data.ts';

const cafes = [
  { name: 'altrego', url: 'https://www.district.in/dining/hyderabad/altr-ego-banjara-hills', id: 'Altr Ego' },
  { name: 'roastccx', url: 'https://www.district.in/dining/hyderabad/roast-ccx-banjara-hills', id: 'Roast CCX' },
  { name: 'ukusa', url: 'https://www.district.in/dining/hyderabad/ukusa-jubilee-hills', id: 'Ukusa' }
];

function fetchImages(url) {
  try {
    const out = execSync(`curl -s "${url}" | grep -o 'https://b.zmtcdn.com/data/[^"]*'`).toString();
    const lines = out.split('\n').filter(l => l.trim().length > 0);
    const cleanLines = lines.map(l => l.replace(/\\\\u0026/g, '&').replace(/\\\\/g, '').replace(/&amp;/g, '&'));
    const baseUrls = cleanLines.map(l => l.split('?')[0]).filter(l => l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp'));
    
    const all = [...new Set(baseUrls)];
    
    let pics = all.filter(u => u.includes('/pictures/') && !u.includes('featured_v3'));
    let food = all.filter(u => u.includes('featured_v3') || u.includes('/reviews_photos/'));
    
    if (food.length < 3 && pics.length > 4) {
      food = [...food, ...pics.slice(4)];
      pics = pics.slice(0, 4);
    }
    
    return { pics: pics.slice(0, 4), food: food.slice(0, 3) };
  } catch(e) {
    return { pics: [], food: [] };
  }
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.zomato.com/' } };
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
  let content = fs.readFileSync(DATA_FILE, 'utf8');

  const startIndex = content.indexOf('export const INITIAL_CAFES: Cafe[] = [');
  const prefix = content.substring(0, startIndex);
  const rest = content.substring(startIndex + 'export const INITIAL_CAFES: Cafe[] = '.length);
  const endIndex = rest.indexOf('];\n') + 1;
  const listString = rest.substring(0, endIndex);
  const suffix = rest.substring(endIndex);
  
  let cafesArr;
  eval('cafesArr = ' + listString);

  for (const cafe of cafes) {
    const imgs = fetchImages(cafe.url);
    console.log(`\n=== ${cafe.name.toUpperCase()} ===`);
    console.log(`Found ${imgs.pics.length} pics, ${imgs.food.length} food`);
    
    const localPics = [];
    const localFood = [];
    
    let count = 1;
    for (const url of imgs.pics) {
      const ext = url.split('.').pop();
      const filename = `${cafe.name}_${count}.${ext}`;
      await download(url, path.join(IMAGES_DIR, filename));
      localPics.push(`/images/${filename}`);
      count++;
    }
    
    count = 1;
    for (const url of imgs.food) {
      const ext = url.split('.').pop();
      const filename = `${cafe.name}_food${count}.${ext}`;
      await download(url, path.join(IMAGES_DIR, filename));
      localFood.push(`/images/${filename}`);
      count++;
    }
    
    const c = cafesArr.find(c => c.name === cafe.id);
    if (c) {
      if (localPics.length > 0) {
        c.image = localPics[0];
        c.moreImages = localPics;
      }
      if (localFood.length > 0 && c.featuredMenu) {
        let i = 0;
        for (const item of c.featuredMenu) {
          if (i < localFood.length) {
            item.image = localFood[i++];
          } else if (localPics.length > 0) {
            item.image = localPics[0];
          }
        }
      }
      console.log(`Updated ${cafe.name} in data.ts`);
    }
  }
  
  const newContent = prefix + 'export const INITIAL_CAFES: Cafe[] = ' + JSON.stringify(cafesArr, null, 2) + suffix;
  fs.writeFileSync(DATA_FILE, newContent);
  console.log('Done downloading and updating Altr Ego, Roast CCX, Ukusa!');
})();
