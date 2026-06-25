import fs from 'fs';

const content = fs.readFileSync('src/data.ts', 'utf8');

// A very simple approach would be to parse the whole array or we can just use regex/AST.
// Given it's a large file, let's write a script that loads the array, removes duplicates, and rewrites the array.
// But we can't easily require it if there are types or Vite aliases. 
// Wait, we can use `ts-node` or `tsx` to import it?
// Let's just use tsx to log the names of cafes in the array.
