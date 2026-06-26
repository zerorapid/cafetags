import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const DATA_FILE = './src/data.ts';
const IMAGES_DIR = './public/images';
const content = fs.readFileSync(DATA_FILE, 'utf8');

// Find all menuImages entries in data.ts
// These could be Zomato URLs or local paths
const menuUrlRegex = /https:\/\/b\.zmtcdn\.com\/data\/menus\/[^\s"']+/g;
const allMenuUrls = [...new Set(content.match(menuUrlRegex) || [])];

console.log(`Found ${allMenuUrls.length} unique menu URLs to re-download at FULL resolution`);

function sanitizeFilename(url) {
  // Remove query params to get clean filename
  const cleanUrl = url.split('?')[0];
  const parts = cleanUrl.split('/');
  const filename = parts[parts.length - 1];
  const hash = url.split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  const ext = filename.endsWith('.png') ? '.png' : filename.endsWith('.jpeg') ? '.jpg' : '.jpg';
  return `menu_${Math.abs(hash).toString(36)}_${filename.substring(0, 20)}${ext}`;
}

function downloadUrl(url, dest) {
  // Strip query params - get full resolution!
  const cleanUrl = url.split('?')[0];
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://www.zomato.com/'
      }
    };
    const mod = cleanUrl.startsWith('https') ? https : http;
    mod.get(cleanUrl, options, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        try { fs.unlinkSync(dest); } catch(e) {}
        downloadUrl(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', err => {
      try { fs.unlinkSync(dest); } catch(e) {}
      reject(err);
    });
  });
}

let newContent = content;
const urlToLocal = {};

for (const url of allMenuUrls) {
  const filename = sanitizeFilename(url);
  const dest = path.join(IMAGES_DIR, filename);
  const localPath = `/images/${filename}`;

  try {
    await downloadUrl(url, dest);
    const size = fs.statSync(dest).size;
    if (size < 5000) {
      fs.unlinkSync(dest);
      console.log(`SKIP (${size}b too small): ${filename}`);
    } else {
      console.log(`OK ${Math.round(size/1024)}KB: ${filename}`);
      urlToLocal[url] = localPath;
    }
  } catch(e) {
    console.log(`FAIL: ${e.message}`);
  }
}

// Replace all menu URLs in data.ts with local paths
for (const [url, local] of Object.entries(urlToLocal)) {
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  newContent = newContent.replace(new RegExp(escaped, 'g'), local);
}

fs.writeFileSync(DATA_FILE, newContent);
console.log(`\n✅ Done! Replaced ${Object.keys(urlToLocal).length} menu URLs with full-resolution local images.`);
