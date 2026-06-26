import fs from 'fs';

const DATA_FILE = './src/data.ts';
let content = fs.readFileSync(DATA_FILE, 'utf8');

// The file is a list of blocks. Let's split by '{\n' and rebuild it.
const blocks = content.split('{\n');

for (let i = 0; i < blocks.length; i++) {
  let block = blocks[i];
  
  // Find the main image in this block
  const imageMatch = block.match(/\"image\":\s*\"(\/images\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp))\"/);
  
  if (imageMatch && !imageMatch[1].includes('zmt_')) {
    const mainImage = imageMatch[1];
    
    // Replace any zmt_ images
    const oldBlock = block;
    block = block.replace(/\"image\":\s*\"\/images\/zmt_[^\"]+\"/g, `"image": "${mainImage}"`);
    block = block.replace(/\"\/images\/zmt_[^\"]+\"/g, `"${mainImage}"`);
    
    if (block !== oldBlock) {
      console.log(`Swept zmt_ images using fallback ${mainImage}`);
      blocks[i] = block;
    }
  }
}

fs.writeFileSync(DATA_FILE, blocks.join('{\n'));
console.log('Sweep completed!');
