const fs = require('fs');

const dataFile = 'src/data.ts';
const dumpFile = 'blogs_dump.txt';

let dataContent = fs.readFileSync(dataFile, 'utf-8');
let dumpContent = fs.readFileSync(dumpFile, 'utf-8');

// remove injected env logs
const lines = dumpContent.split('\n');
const dumpClean = lines.slice(2).join('\n'); // Starts with export const INITIAL_BLOG_ARTICLES = [

const regex = /export const INITIAL_BLOG_ARTICLES = \[[\s\S]*?\];/;
const newContent = dataContent.replace(regex, dumpClean.trim());

fs.writeFileSync(dataFile, newContent, 'utf-8');
console.log('Replaced INITIAL_BLOG_ARTICLES in src/data.ts');
