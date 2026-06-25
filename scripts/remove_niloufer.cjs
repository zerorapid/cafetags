const fs = require('fs');
const path = 'src/data.ts';
let content = fs.readFileSync(path, 'utf8');

const blockRegex = /\{\s*"id":\s*\d+,[\s\S]*?"name":\s*"(Cafe Niloufer|Niloufer Cafe)"[\s\S]*?(?=\},\s*\{|\}\s*\];)\},?/g;

content = content.replace(blockRegex, '');

// cleanup double commas
content = content.replace(/,\s*,/g, ',');
content = content.replace(/\[\s*,/g, '[');

fs.writeFileSync(path, content, 'utf8');
