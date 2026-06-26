import fs from 'fs';
import path from 'path';
import https from 'https';
import { URL } from 'url';

const DATA_FILE = './src/data.ts';
const IMAGES_DIR = './public/images';

let content = fs.readFileSync(DATA_FILE, 'utf8');

// Find all Zomato picture URLs (not menus - those are less critical)
const picUrlRegex = /https:\/\/b\.zmtcdn\.com\/data\/(?:pictures|reviews_photos)[^\s"']+/g;
const allMatches = [...new Set(content.match(picUrlRegex) || [])];

console.log(`Found ${allMatches.length} unique picture URLs to download`);

function sanitizeFilename(url) {
  const u = new URL(url);
  const parts = u.pathname.split('/');
  const filename = parts[parts.length - 1].replace(/[?&=]/g, '_').split('?')[0];
  // Make a short hash-based name from the URL
  const hash = url.split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  const ext = filename.includes('.webp') ? '.webp' : filename.includes('.png') ? '.png' : '.jpg';
  const base = filename.replace(/\.[^.]+$/, '').substring(0, 30);
  return `zmt_${Math.abs(hash).toString(36)}_${base}${ext}`;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { resolve(dest); return; }
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.zomato.com/'
      }
    };
    https.get(url, options, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const urlToLocal = {};

for (const url of allMatches) {
  const filename = sanitizeFilename(url);
  const dest = path.join(IMAGES_DIR, filename);
  const localPath = `/images/${filename}`;
  urlToLocal[url] = localPath;
  try {
    await download(url, dest);
    const size = fs.statSync(dest).size;
    if (size < 1000) {
      // Too small, likely an error response - skip
      fs.unlinkSync(dest);
      delete urlToLocal[url];
      console.log(`SKIP (too small ${size}b): ${filename}`);
    } else {
      console.log(`OK: ${filename} (${Math.round(size/1024)}KB)`);
    }
  } catch(e) {
    delete urlToLocal[url];
    console.log(`FAIL: ${url} - ${e.message}`);
  }
}

// Replace all URLs in data.ts
let newContent = content;
for (const [url, local] of Object.entries(urlToLocal)) {
  // Escape special regex chars in URL
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  newContent = newContent.replace(new RegExp(escaped, 'g'), local);
}

fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`\nDone! Replaced ${Object.keys(urlToLocal).length} URLs with local paths.`);
console.log('Mapping saved.');
fs.writeFileSync('./url_mapping.json', JSON.stringify(urlToLocal, null, 2));
