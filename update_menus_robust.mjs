import fs from 'fs';
import path from 'path';

const DATA_FILE = './src/data.ts';
const IMAGES_DIR = './public/images';

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
  // Find all local menu images for this cafe
  const allFiles = fs.readdirSync(IMAGES_DIR);
  const menuFiles = allFiles.filter(f => f.startsWith(`${cafe.name}_menu`)).sort((a, b) => {
    // sort numerically: urbannemo_menu1.jpg, urbannemo_menu10.jpg
    const numA = parseInt(a.match(/menu(\\d+)/)?.[1] || '0');
    const numB = parseInt(b.match(/menu(\\d+)/)?.[1] || '0');
    return numA - numB;
  });
  
  if (menuFiles.length === 0) continue;
  
  const localMenuPaths = menuFiles.map(f => `"/images/${f}"`);
  
  // Find the cafe block using bracket matching
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
  
  // Replace menuImages array
  // It could be empty: "menuImages": [] or have items
  const menuImagesRegex = /\"menuImages\":\s*\[\s*([^\]]*)\s*\]/g;
  const newMenuImagesStr = '"menuImages": [\n      ' + localMenuPaths.join(',\n      ') + '\n    ]';
  
  if (menuImagesRegex.test(block)) {
    block = block.replace(menuImagesRegex, newMenuImagesStr);
  } else {
    // if it's missing, add it before the last brace
    block = block.replace(/\\n\\s*\\}$/, `,\n    ${newMenuImagesStr}\n  }`);
  }
  
  content = content.substring(0, blockStart) + block + content.substring(blockEnd);
  console.log(`Updated ${cafe.name} with ${menuFiles.length} menus`);
}

fs.writeFileSync(DATA_FILE, content);
console.log('All done!');
