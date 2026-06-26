const fs = require('fs');
const content = fs.readFileSync('sobremesa-state.json', 'utf8');

const urlRegex = /"url":"(https:\/\/b\.zmtcdn\.com\/data\/pictures\/[^"]+)"/g;
let match;
let count = 0;
while ((match = urlRegex.exec(content)) !== null) {
  // Let's just grab the first 10 URLs. Usually the ones near the end or beginning correspond to specific categories.
  // Actually, we can just print them and maybe they have metadata near them.
}

const sections = content.split('"categoryName":"');
for (let i = 1; i < sections.length; i++) {
  const cat = sections[i].substring(0, sections[i].indexOf('"'));
  console.log('Category:', cat);
  const urls = sections[i].match(/(https:\/\/b\.zmtcdn\.com\/data\/pictures\/[^"]+\.jpg)/g);
  if (urls) {
    const uniq = [...new Set(urls)].slice(0, 5);
    console.log(uniq);
  }
}
