import https from 'https';
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const IMAGES_DIR = './public/images';
const DATA_FILE = './src/data.ts';

const cafes = [
  { name: 'holeinwall', url: 'https://www.district.in/dining/hyderabad/the-hole-in-the-wall-cafe-1-jubilee-hills', id: 'The Hole In the Wall Cafe' },
  { name: 'fatpigeon', url: 'https://www.district.in/dining/hyderabad/fat-pigeon-2-jubilee-hills', id: 'Fat Pigeon - Bar Hop' },
  { name: 'eclat', url: 'https://www.district.in/dining/hyderabad/cafe-eclat-jubilee-hills', id: 'Eclat Patisserie' }
];

function fetchImages(url) {
  try {
    const out = execSync(`curl -s "${url}" | grep -o 'https://b.zmtcdn.com/data/[^"]*'`).toString();
    const lines = out.split('\n').filter(l => l.trim().length > 0);
    const cleanLines = lines.map(l => l.replace(/\\\\u0026/g, '&').replace(/\\\\/g, '').replace(/&amp;/g, '&'));
    const baseUrls = cleanLines.map(l => l.split('?')[0]).filter(l => l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp'));
    
    const all = [...new Set(baseUrls)];
    
    // Pictures
    let pics = all.filter(u => u.includes('/pictures/') && !u.includes('featured_v3'));
    // Food/Reviews
    let food = all.filter(u => u.includes('featured_v3') || u.includes('/reviews_photos/'));
    // Menus
    let menus = all.filter(u => u.includes('/menus/'));
    
    // If not enough food images, steal some from pics
    if (food.length < 3 && pics.length > 4) {
      food = [...food, ...pics.slice(4)];
      pics = pics.slice(0, 4);
    }
    
    return {
      pics: pics.slice(0, 4),
      food: food.slice(0, 3),
      menus
    };
  } catch(e) {
    return { pics: [], food: [], menus: [] };
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
    const imgs = fetchImages(cafe.url);
    console.log(`\n=== ${cafe.name.toUpperCase()} ===`);
    console.log(`Found ${imgs.pics.length} pics, ${imgs.food.length} food, ${imgs.menus.length} menus`);
    
    const localPics = [];
    const localFood = [];
    const localMenus = [];
    
    // Download Pics
    let count = 1;
    for (const url of imgs.pics) {
      const ext = url.split('.').pop();
      const filename = `${cafe.name}_${count}.${ext}`;
      await download(url, path.join(IMAGES_DIR, filename));
      localPics.push(`"/images/${filename}"`);
      count++;
    }
    
    // Download Food
    count = 1;
    for (const url of imgs.food) {
      const ext = url.split('.').pop();
      const filename = `${cafe.name}_food${count}.${ext}`;
      await download(url, path.join(IMAGES_DIR, filename));
      localFood.push(`"/images/${filename}"`);
      count++;
    }
    
    // Download Menus
    count = 1;
    for (const url of imgs.menus) {
      const ext = url.split('.').pop();
      const filename = `${cafe.name}_menu${count}.${ext}`;
      await download(url, path.join(IMAGES_DIR, filename));
      localMenus.push(`"/images/${filename}"`);
      count++;
    }
    
    // Update data.ts
    const nameIndex = content.indexOf('\"name\": \"' + cafe.id);
    if (nameIndex !== -1) {
      let blockStart = content.lastIndexOf('{', nameIndex);
      let blockEnd = content.indexOf('},', nameIndex);
      if(blockEnd === -1) blockEnd = content.indexOf('}', nameIndex);
      
      let block = content.substring(blockStart, blockEnd);
      
      // Update image
      if (localPics.length > 0) {
        block = block.replace(/\"image\":\s*\"[^\"]+\"/g, `"image": ${localPics[0]}`);
      }
      
      // Update moreImages
      const moreImagesRegex = /\"moreImages\":\s*\[\s*([^\]]*)\s*\]/g;
      const newMoreImages = '"moreImages": [\n      ' + localPics.join(',\n      ') + '\n    ]';
      block = block.replace(moreImagesRegex, newMoreImages);
      
      // Update menuImages
      const menuImagesRegex = /\"menuImages\":\s*\[\s*([^\]]*)\s*\]/g;
      const newMenuImages = '"menuImages": [\n      ' + localMenus.join(',\n      ') + '\n    ]';
      block = block.replace(menuImagesRegex, newMenuImages);
      
      // Update featuredMenu images
      if (localFood.length > 0) {
        let i = 0;
        block = block.replace(/(\"image\":\s*)\"(\/images\/zmt_[^\"]+)\"/g, (match, p1) => {
          if (i < localFood.length) {
            return p1 + localFood[i++];
          }
          return p1 + localPics[0]; // fallback
        });
      }
      
      content = content.substring(0, blockStart) + block + content.substring(blockEnd);
      console.log(`Updated ${cafe.name} in data.ts`);
    } else {
      console.log(`Could not find ${cafe.id} in data.ts`);
    }
  }
  
  fs.writeFileSync(DATA_FILE, content);
  console.log('Done processing all 3 cafes!');
})();
