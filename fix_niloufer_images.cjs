const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Replace main image
data = data.replace(
  /"image": "\/images\/cafeniloufer_main\.png"/g, 
  '"image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"'
);

// Replace moreImages array entry
data = data.replace(
  /"\/images\/cafeniloufer_main\.png"/g,
  '"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",\n      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80"'
);

// Replace featuredMenu food image
data = data.replace(
  /"image": "\/images\/cafeniloufer_food\.png"/g,
  '"image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"'
);

fs.writeFileSync('src/data.ts', data);
console.log('Fixed Cafe Niloufer images');
