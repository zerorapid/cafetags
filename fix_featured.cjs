const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

// We need to parse data.ts, but it's a TS file with `export const INITIAL_CAFES = [...]`.
// Instead of a regex, let's use a simpler approach or just run a TS script that imports and rewrites.
