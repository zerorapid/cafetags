const sharp = require('sharp');
const fs = require('fs');

async function slice() {
  const input = '/Users/Jayapalreddy/.gemini/antigravity/brain/ed307c3b-3c43-49fa-891c-85a9da2f8798/media__1782482539933.png';
  const metadata = await sharp(input).metadata();
  console.log('Original image:', metadata.width, 'x', metadata.height);

  // The image shows 4 menu cards horizontally with some spacing.
  // We can just crop out the cards or slice it into 4 equal columns (ignoring left/right margins if needed).
  
  const cards = 4;
  const cardWidth = Math.floor(metadata.width / cards);
  
  if (!fs.existsSync('public/images/habitat')) {
    fs.mkdirSync('public/images/habitat', { recursive: true });
  }

  for (let i = 0; i < cards; i++) {
    await sharp(input)
      .extract({ left: i * cardWidth, top: 0, width: cardWidth, height: metadata.height })
      .toFile(`public/images/habitat/menu_card_${i+1}.png`);
  }
  console.log('Sliced successfully!');
}
slice();
