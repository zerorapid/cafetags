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
  if (cafe.description && cafe.description.length > 180) {
    // Truncate to nearest word under 177 chars and add "..."
    let desc = cafe.description.substring(0, 177);
    const lastSpace = desc.lastIndexOf(' ');
    if (lastSpace > 0) {
      desc = desc.substring(0, lastSpace);
    }
    cafe.description = desc + '...';
  }
}

const newContent = prefix + 'export const INITIAL_CAFES: Cafe[] = ' + JSON.stringify(cafes, null, 4) + suffix;
fs.writeFileSync(DATA_FILE, newContent);
console.log('Successfully truncated all cafe descriptions to 180 chars!');
