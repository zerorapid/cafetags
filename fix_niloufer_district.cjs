const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const mainImg = 'https://b.zmtcdn.com/data/pictures/5/21785395/8e5faabaffad1c960cbe77742aa8dbaa.jpg';
const moreImg = [
  'https://b.zmtcdn.com/data/pictures/5/21785395/86705d697fde353ce667a654faddad01.jpg',
  'https://b.zmtcdn.com/data/pictures/5/21785395/b1163e55870b0e5696fc768b42213a5f.jpg'
];
const foodImg = [
  'https://b.zmtcdn.com/data/reviews_photos/637/4b1e8eb0b46ff2aeb4db6a2c0bc31637_1780171945.jpeg',
  'https://b.zmtcdn.com/data/reviews_photos/171/ef736f2222b884cb8ce8798cfc9a1171_1780116287.jpg',
  'https://b.zmtcdn.com/data/reviews_photos/595/6c0968395ae8f16493454129e8a10595_1781674624.jpg'
];

let nilouferIndex = data.indexOf('"name": "Cafe Niloufer",');
if (nilouferIndex === -1) {
  console.log("Could not find Cafe Niloufer in data.ts");
  process.exit(1);
}

// Just replace the Unsplash images we put in Cafe Niloufer
// Wait, to be safe, I'll extract the Cafe Niloufer block, modify it, and put it back.
const endOfNiloufer = data.indexOf('},', nilouferIndex);
let nilouferBlock = data.substring(nilouferIndex, endOfNiloufer);

// Replace main image
nilouferBlock = nilouferBlock.replace(/"image": "https:\/\/images\.unsplash\.com[^"]+"/, `"image": "${mainImg}"`);

// Replace moreImages
nilouferBlock = nilouferBlock.replace(
  /"moreImages": \[([^\]]+)\]/s,
  `"moreImages": [\n      "${moreImg[0]}",\n      "${moreImg[1]}"\n    ]`
);

// Replace featured menu images sequentially
let foodIndex = 0;
nilouferBlock = nilouferBlock.replace(/"image": "https:\/\/images\.unsplash\.com[^"]+"/g, (match) => {
  const replacement = `"image": "${foodImg[foodIndex % foodImg.length]}"`;
  foodIndex++;
  return replacement;
});

data = data.substring(0, nilouferIndex) + nilouferBlock + data.substring(endOfNiloufer);

fs.writeFileSync('src/data.ts', data);
console.log('Successfully updated Cafe Niloufer with images from District.in');
