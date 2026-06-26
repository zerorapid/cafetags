import https from 'https';
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const IMAGES_DIR = './public/images';
const DATA_FILE = './src/data.ts';

const cafes = [
  { name: 'urbannemo', url: 'https://www.district.in/dining/hyderabad/urban-nemo-cafe-in-garden-jubilee-hills', id: 'Urban Nemo' },
  { name: 'lush', url: 'https://www.district.in/dining/hyderabad/lush-cafe-by-the-lake-jubilee-hills', id: 'Lush Cafe' },
  { name: 'pscheese', url: 'https://www.district.in/dining/hyderabad/ps-cheese-cafe-madhapur', id: 'PS Cheese' },
  { name: 'glasshouse', url: 'https://www.district.in/dining/mumbai/glass-house-malad-west', id: 'The Glass House' },
  { name: 'olivebistro', url: 'https://www.district.in/dining/hyderabad/olive-bistro-bar-jubilee-hills', id: 'Olive Bistro' },
  { name: 'kisscoff', url: 'https://www.district.in/dining/hyderabad/kisscoff-cafe-film-nagar', id: 'Kisscoff' },
  { name: 'manam', url: 'https://www.district.in/dining/hyderabad/manam-chocolate-1-banjara-hills', id: 'Manam Chocolate' },
  { name: 'churrolto', url: 'https://www.district.in/dining/hyderabad/churrolto-2-banjara-hills', id: 'Churrolto' },
  { name: 'lasthouse', url: 'https://www.district.in/dining/hyderabad/lasthouse-by-the-lake-jubilee-hills', id: 'The Last House' },
  { name: 'heartcup', url: 'https://www.district.in/dining/hyderabad/heart-cup-coffee-gachibowli', id: 'Heart Cup' },
  
  // Also include the first 3 cafes we did earlier!
  { name: 'trueblack', url: 'https://www.district.in/dining/hyderabad/true-black-speciality-coffee-jubilee-hills', id: 'True Black' },
  { name: 'echoes', url: 'https://www.district.in/dining/hyderabad/echoes-narsingi', id: 'Echoes Cafe' },
  { name: 'dailyrituals', url: 'https://www.district.in/dining/hyderabad/daily-rituals-jubilee-hills', id: 'Daily Rituals' },
];

function fetchMenus(url) {
  try {
    const out = execSync(`curl -s "${url}" | grep -o 'https://b.zmtcdn.com/data/menus/[^"]*'`).toString();
    const lines = out.split('\n').filter(l => l.trim().length > 0);
    const cleanLines = lines.map(l => l.replace(/\\\\u0026/g, '&').replace(/\\\\/g, '').replace(/&amp;/g, '&'));
    const baseUrls = cleanLines.map(l => l.split('?')[0]).filter(l => l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp'));
    return [...new Set(baseUrls)];
  } catch(e) {
    return [];
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

  for (const cafe of cafes) {
    const menus = fetchMenus(cafe.url);
    if (menus.length === 0) continue;
    
    console.log(`Downloading ${menus.length} menus for ${cafe.name}...`);
    
    const localMenuPaths = [];
    let count = 1;
    for (const url of menus) {
      const ext = url.split('.').pop();
      const filename = `${cafe.name}_menu${count}.${ext}`;
      const dest = path.join(IMAGES_DIR, filename);
      
      // only download if we haven't already (wait, we should overwrite just in case? no, we can skip if exists to save time, unless we downloaded thumbnails before)
      // Actually we downloaded them from Puppeteer before, let's just overwrite them to be safe.
      await download(url, dest);
      localMenuPaths.push(`"/images/${filename}"`);
      count++;
    }
    
    // Now update data.ts
    // Find the cafe block
    const nameIndex = content.indexOf('\"name\": \"' + cafe.id);
    if (nameIndex !== -1) {
      let blockStart = content.lastIndexOf('{', nameIndex);
      let blockEnd = content.indexOf('},', nameIndex);
      if(blockEnd === -1) blockEnd = content.indexOf('}', nameIndex);
      
      let block = content.substring(blockStart, blockEnd);
      
      // Replace menuImages array
      const menuImagesRegex = /\"menuImages\":\s*\[\s*([^\]]*)\s*\]/g;
      
      const newMenuImagesStr = '"menuImages": [\n      ' + localMenuPaths.join(',\n      ') + '\n    ]';
      
      block = block.replace(menuImagesRegex, newMenuImagesStr);
      content = content.substring(0, blockStart) + block + content.substring(blockEnd);
      console.log(`Updated ${cafe.name} in data.ts`);
    }
  }
  
  fs.writeFileSync(DATA_FILE, content);
  console.log('Done downloading and updating all menus!');
})();
