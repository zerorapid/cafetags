import fs from 'fs';

const DATA_FILE = './src/data.ts';
let content = fs.readFileSync(DATA_FILE, 'utf8');

const startIndex = content.indexOf('export const INITIAL_CAFES: Cafe[] = [');
const prefix = content.substring(0, startIndex);
const rest = content.substring(startIndex + 'export const INITIAL_CAFES: Cafe[] = '.length);

const endIndex = rest.indexOf('];\n') + 1; // index of ]
const listString = rest.substring(0, endIndex);
const suffix = rest.substring(endIndex);

let cafes;
eval('cafes = ' + listString);

for (const cafe of cafes) {
  if (cafe.image && !cafe.image.includes('zmt_')) {
    const mainImg = cafe.image;
    
    if (cafe.moreImages) {
      cafe.moreImages = cafe.moreImages.map(img => img.includes('zmt_') ? mainImg : img);
    }
    
    if (cafe.menuImages) {
      cafe.menuImages = cafe.menuImages.map(img => img.includes('zmt_') ? mainImg : img);
    }
    
    if (cafe.featuredMenu) {
      for (const item of cafe.featuredMenu) {
        if (item.image && item.image.includes('zmt_')) {
          item.image = mainImg;
        }
      }
    }
  }
}

const newContent = prefix + 'export const INITIAL_CAFES: Cafe[] = ' + JSON.stringify(cafes, null, 2) + suffix;
fs.writeFileSync(DATA_FILE, newContent);
console.log('Successfully swept and fixed data.ts using eval!');
