const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');
data = data.replace(/\\\"area/g, '"area');
fs.writeFileSync('src/data.ts', data);
