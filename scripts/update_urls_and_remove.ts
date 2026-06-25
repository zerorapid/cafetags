import fs from 'fs';
import { INITIAL_CAFES } from '../src/data';

const newCafes = INITIAL_CAFES.filter(cafe => cafe.name !== "Auntie Lily's").map(cafe => {
  if (cafe.name === "Guilt Trip") {
    return { ...cafe, mapLink: "https://maps.app.goo.gl/BSLPVTiE85YqEFr56" };
  }
  if (cafe.name === "Eclat Patisserie") {
    return { ...cafe, mapLink: "https://maps.app.goo.gl/ocYdm8Q5HUzViV2Z7" };
  }
  return cafe;
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
const newContent = before + `export const INITIAL_CAFES: Cafe[] = ` + JSON.stringify(newCafes, null, 2) + `;\n\n` + after;

fs.writeFileSync('src/data.ts', newContent, 'utf8');
console.log('Successfully updated URLs and removed Auntie Lilys!');
