import fs from 'fs';
import path from 'path';

const DATA_FILE = './src/data.ts';
const IMAGES_DIR = './public/images';

const cafes = [
  { name: 'holeinwall', id: 'The Hole In the Wall Cafe' },
  { name: 'fatpigeon', id: 'Fat Pigeon - Bar Hop' },
  { name: 'eclat', id: 'Eclat Patisserie' }
];

let content = fs.readFileSync(DATA_FILE, 'utf8');

for (const cafe of cafes) {
  // Find all local menu images for this cafe
  const allFiles = fs.readdirSync(IMAGES_DIR);
  
  const pics = allFiles.filter(f => f.startsWith(`${cafe.name}_`) && !f.includes('food') && !f.includes('menu')).sort();
  const food = allFiles.filter(f => f.startsWith(`${cafe.name}_food`)).sort();
  
  const localPics = pics.map(f => `"/images/${f}"`);
  const localFood = food.map(f => `"/images/${f}"`);
  
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
  
  // Update image
  if (localPics.length > 0) {
    block = block.replace(/\"image\":\s*\"[^\"]+\"/g, `"image": ${localPics[0]}`);
  }
  
  // Update moreImages
  if (localPics.length > 0) {
    const moreImagesRegex = /\"moreImages\":\s*\[\s*([^\]]*)\s*\]/g;
    const newMoreImages = '"moreImages": [\n      ' + localPics.join(',\n      ') + '\n    ]';
    block = block.replace(moreImagesRegex, newMoreImages);
  }
  
  // Update featuredMenu
  if (localFood.length > 0) {
    let i = 0;
    block = block.replace(/(\"image\":\s*)\"(\/images\/zmt_[^\"]+)\"/g, (match, p1) => {
      if (i < localFood.length) {
        return p1 + localFood[i++];
      }
      return p1 + localPics[0]; // fallback
    });
  }
  
  content = content.substring(0, blockStart) + block + content.substring(blockEnd);
  console.log(`Updated pics for ${cafe.name}`);
}

fs.writeFileSync(DATA_FILE, content);
console.log('All done!');
