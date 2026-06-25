const fs = require('fs');

const path = 'src/data.ts';
let content = fs.readFileSync(path, 'utf8');

// We will extract the image URLs from Roast CCX manually to use as templates.
const roastLogo = '"https://b.zmtcdn.com/data/brand_creatives/logos/d4446b7aa9e756d7d859111f2aeaf11b1746435804.png"';
const roastImage = '"https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg"';
const roastMoreImages = `[
      "https://b.zmtcdn.com/data/pictures/9/21365469/35c912438a451a4ed875cc22470199dc.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp",
      "https://b.zmtcdn.com/data/pictures/9/21365469/1a14df324279a971bc7bb891b194819a.png",
      "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg",
      "https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg",
      "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"
    ]`;
const roastMenuImages = `[
      "https://b.zmtcdn.com/data/menus/469/21365469/8d695c86299ee6781bfaec07467bf0c1.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/154faf08746c5d81b45e20bd5931383a.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/f1bd9d9db16a6dd34f21880708ad98b8.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/5f11051259262b30216bb991e758f31f.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/79955272bf689f9ac1cf7ad8bfa6a716.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/21e56cac02e81358b8b1b9feb4bee5b7.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/bd88815cffbac7eac7f786bc4f9e18ba.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/6b01d0a9802239484faab04fa55b78ed.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/7b5e579da9d22f8855b2f740e58a5887.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/ae463e59ec4fc6cb4ce197e104a57bc9.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/3bab54b3e3d638aa13bc5d75c5b94b76.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/ca7c4c5199a6b782cc3c1148112ab766.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/6fb3b73064bd2aafa1fc3eed41dd235a.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/4c15ce800a90e54154885f59244a8500.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/42cb88b061de38e62375becc1837ae40.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/cd8aded324cb78e2a8c99efafb2a0979.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/e60c4b04b6541e0ea13c9387f9bcacf4.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/865068f9276f2c229674093bcb4177cd.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/8c0315eae5f3b14b0e651f922c447127.png"
    ]`;
const roastFeatured1 = '"https://b.zmtcdn.com/data/pictures/chains/9/21365469/0435a4e9762114b39061b77cffb50eb1.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"';
const roastFeatured2 = '"https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"';
const roastFeatured3 = '"https://b.zmtcdn.com/data/reviews_photos/d27/0208b3d53dfeef35c44e6a9e95426d27_1777992138.jpg"';

// Parse the file. We will split by cafe entries roughly.
// Or just regex replace block by block using eval or string match.
// Since data.ts is just an array, we can use Babel, but string manipulation is easier.

const blockRegex = /\{\s*"id":\s*\d+[\s\S]*?(?=\},\s*\{|\}\s*\];)/g;

let match;
let newContent = content;

const blocks = [...content.matchAll(blockRegex)];

for (const matchObj of blocks) {
    let block = matchObj[0];
    if (block.includes('"Blue Tokai') || block.includes('"Cafe Niloufer') || block.includes('"Niloufer Cafe')) {
        continue; // skip
    }

    // Replace image
    block = block.replace(/"image":\s*"[^"]+"/, `"image": ${roastImage}`);
    // Replace logo (or add it if not exists)
    if (block.includes('"logo":')) {
        block = block.replace(/"logo":\s*"[^"]+"/, `"logo": ${roastLogo}`);
    } else {
        block = block.replace(/"image":/, `"logo": ${roastLogo},\n    "image":`);
    }
    
    // Replace moreImages
    block = block.replace(/"moreImages":\s*\[[\s\S]*?\]/, `"moreImages": ${roastMoreImages}`);
    
    // Replace menuImages
    block = block.replace(/"menuImages":\s*\[[\s\S]*?\]/, `"menuImages": ${roastMenuImages}`);
    
    // Replace featuredMenu images
    // Wait, featuredMenu has multiple items.
    let featuredMenuMatches = [...block.matchAll(/\{\s*"name":\s*"[^"]+"[\s\S]*?(?=\}|\}?,)/g)];
    // We will just replace the featuredMenu block completely? No, names are different.
    // We will just add/replace "image" in the first 3 featured menu items.
    let i = 1;
    block = block.replace(/("category":\s*"[^"]+",?\s*"isSpecial":\s*(true|false))(,\s*"image":\s*"[^"]+")?/g, (m, p1) => {
        let img = i === 1 ? roastFeatured1 : i === 2 ? roastFeatured2 : roastFeatured3;
        i++;
        return `${p1},\n        "image": ${img}`;
    });

    newContent = newContent.replace(matchObj[0], block);
}

// Remove Cafe Niloufer
newContent = newContent.replace(/\{\s*"id":\s*\d+,[\s\S]*?"name":\s*"(Cafe Niloufer|Niloufer Cafe)"[\s\S]*?\},/g, '');
// Handle case where it's the last item (no trailing comma)
newContent = newContent.replace(/\{\s*"id":\s*\d+,[\s\S]*?"name":\s*"(Cafe Niloufer|Niloufer Cafe)"[\s\S]*?\}\s*\];/g, '];');


fs.writeFileSync(path, newContent, 'utf8');
console.log('Updated images successfully!');
