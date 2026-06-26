import fs from 'fs';

const DATA_FILE = './src/data.ts';

const cafes = [
  { name: 'urbannemo', id: 'Urban Nemo' },
  { name: 'lush', id: 'Lush Cafe' },
  { name: 'pscheese', id: 'PS Cheese' },
  { name: 'glasshouse', id: 'The Glass House' },
  { name: 'olivebistro', id: 'Olive Bistro' },
  { name: 'kisscoff', id: 'Kisscoff' },
  { name: 'manam', id: 'Manam Chocolate' },
  { name: 'churrolto', id: 'Churrolto' },
  { name: 'lasthouse', id: 'The Last House' },
  { name: 'heartcup', id: 'Heart Cup' },
  { name: 'trueblack', id: 'True Black' },
  { name: 'echoes', id: 'Echoes Cafe' },
  { name: 'dailyrituals', id: 'Daily Rituals' },
  { name: 'holeinwall', id: 'The Hole In the Wall Cafe' },
  { name: 'fatpigeon', id: 'Fat Pigeon - Bar Hop' },
  { name: 'eclat', id: 'Eclat Patisserie' }
];

let content = fs.readFileSync(DATA_FILE, 'utf8');

for (const cafe of cafes) {
  const nameIndex = content.indexOf('\"name\": \"' + cafe.id);
  if (nameIndex === -1) continue;
  
  let blockStart = content.lastIndexOf('{', nameIndex);
  let braceCount = 0;
  let blockEnd = -1;
  
  for (let i = blockStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        blockEnd = i + 1;
        break;
      }
    }
  }
  
  if (blockEnd === -1) continue;
  
  let block = content.substring(blockStart, blockEnd);
  
  const imageMatch = block.match(/\"image\":\s*\"(\/images\/[^\"]+)\"/);
  if (imageMatch && !imageMatch[1].includes('zmt_')) {
    const mainImage = imageMatch[1];
    block = block.replace(/\"image\":\s*\"\/images\/zmt_[^\"]+\"/g, `"image": "${mainImage}"`);
    block = block.replace(/\"\/images\/zmt_[^\"]+\"/g, `"${mainImage}"`);
    content = content.substring(0, blockStart) + block + content.substring(blockEnd);
    console.log(`Swept zmt_ images for ${cafe.id}`);
  }
}

fs.writeFileSync(DATA_FILE, content);
console.log('Sweep completed!');
