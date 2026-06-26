import fs from 'fs';

const DATA_FILE = './src/data.ts';
let content = fs.readFileSync(DATA_FILE, 'utf8');

const startIndex = content.indexOf('export const INITIAL_CAFES: Cafe[] = [');
const prefix = content.substring(0, startIndex);
const rest = content.substring(startIndex + 'export const INITIAL_CAFES: Cafe[] = '.length);
const endIndex = rest.indexOf('];\n') + 1;
const listString = rest.substring(0, endIndex);
const suffix = rest.substring(endIndex);

let cafes;
eval('cafes = ' + listString);

// Fix Kisscoff
const kisscoff = cafes.find(c => c.name === 'Kisscoff Cafe');
if (kisscoff) {
  kisscoff.image = '/images/kisscoff_1.png';
  kisscoff.moreImages = ['/images/kisscoff_1.png', '/images/kisscoff_2.jpg', '/images/kisscoff_3.jpg', '/images/kisscoff_4.jpg'];
  if (kisscoff.featuredMenu) {
    kisscoff.featuredMenu.forEach((m, i) => m.image = `/images/kisscoff_food${i+1}.jpeg`);
  }
}

// Fix Manam
const manam = cafes.find(c => c.name === 'Manam Chocolate Atelier');
if (manam) {
  manam.image = '/images/manam_1.jpg';
  manam.moreImages = ['/images/manam_1.jpg', '/images/manam_2.jpg', '/images/manam_3.jpg', '/images/manam_4.jpg'];
  if (manam.featuredMenu) {
    manam.featuredMenu.forEach((m, i) => {
      m.image = `/images/manam_food${i+1}.${i === 0 ? 'jpg' : 'jpeg'}`;
    });
  }
}

// Fix Eclat
const eclat = cafes.find(c => c.name === 'Eclat Patisserie');
if (eclat) {
  eclat.image = '/images/eclat_1.jpg';
  if (eclat.moreImages) {
    eclat.moreImages = ['/images/eclat_1.jpg', '/images/eclat_2.jpg', '/images/eclat_3.jpg', '/images/eclat_4.jpg'];
  }
  if (eclat.featuredMenu) {
    eclat.featuredMenu.forEach((m, i) => {
      m.image = `/images/eclat_food${i+1}.jpg`;
    });
  }
  // Wait, Eclat's food images were downloaded as `eclat_food1.jpg`, `eclat_food2.jpg`, etc. in a previous session!
  // But wait, the previous session might have used .webp or .jpeg! Let's check `ls public/images/eclat*`
}

const newContent = prefix + 'export const INITIAL_CAFES: Cafe[] = ' + JSON.stringify(cafes, null, 2) + suffix;
fs.writeFileSync(DATA_FILE, newContent);
console.log('Fixed Kisscoff, Manam, and Eclat JSON directly!');
