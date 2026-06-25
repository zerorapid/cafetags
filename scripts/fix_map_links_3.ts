import fs from 'fs';
import { INITIAL_CAFES } from '../src/data';

const newCafes = INITIAL_CAFES.map(cafe => {
  const query = encodeURIComponent(cafe.name + (cafe.address ? ', ' + cafe.address : ''));
  return {
    ...cafe,
    mapLink: `https://www.google.com/maps/search/?api=1&query=${query}`
  };
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
// The end block starts with export function getTagIcon
const after = content.slice(endIndex);

const newContent = before + `export const INITIAL_CAFES: Cafe[] = ` + JSON.stringify(newCafes, null, 2) + `;\n\n` + after;

fs.writeFileSync('src/data.ts', newContent, 'utf8');
console.log('Successfully updated map links!');
