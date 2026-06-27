const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

// We have 10 cafes that need fixing.
const cafesToFix = [
    "Sobremesa", "Guilt Trip", "Kaficko", "Karafa", "La Vie En Rose Cafe & Bistro", 
    "Switch Coffee", "Osaka", "Ukusa", "Kisscoff Cafe", "Roast CCX"
];

// Let's iterate through the file by splitting at '  {\n    "id": '
const blocks = data.split('  {\n    "id": ');

let updatedData = blocks[0]; // The header

for (let i = 1; i < blocks.length; i++) {
    let block = '  {\n    "id": ' + blocks[i];
    
    let isTarget = false;
    for (let cafe of cafesToFix) {
        if (block.includes(`"name": "${cafe}"`)) {
            isTarget = true;
            break;
        }
    }
    
    if (isTarget) {
        // Find the first Zomato image in this block
        const match = block.match(/"image": "(https:\/\/b\.zmtcdn\.com[^"]+)"/);
        if (match) {
            const z_img = match[1];
            // Replace all unsplash images in this block with this zomato image
            block = block.replace(/"image": "https:\/\/images\.unsplash\.com[^"]+"/g, `"image": "${z_img}"`);
        }
    }
    
    if (i === 1) {
        updatedData += blocks[i]; // Wait, I already added the prefix above.
        // Actually blocks[i] doesn't have the prefix. 
        // Let's just do it string-based without split.
    }
}
