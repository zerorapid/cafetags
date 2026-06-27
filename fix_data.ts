import fs from 'fs';
import { INITIAL_CAFES } from './src/data';

// Modify data
INITIAL_CAFES.forEach(c => {
  if (c.featuredMenu) {
    c.featuredMenu.forEach(m => {
       if (m.image === c.image || (c.moreImages && c.moreImages.includes(m.image))) {
          delete m.image;
       }
    });
  }
});

const content = fs.readFileSync('src/data.ts', 'utf8');
const searchString = 'export const INITIAL_CAFES: Cafe[] = [';
const startIndex = content.indexOf(searchString);
const endString = 'export function getTagIcon';
const endIndex = content.indexOf(endString);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find boundaries");
  process.exit(1);
}

const before = content.slice(0, startIndex);
const after = content.slice(endIndex);
const newContent = before + `export const INITIAL_CAFES: Cafe[] = ` + JSON.stringify(INITIAL_CAFES, null, 2) + `;\n\n` + after;

fs.writeFileSync('src/data.ts', newContent, 'utf8');
console.log('Successfully fixed data!');
