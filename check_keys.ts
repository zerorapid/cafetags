import { INITIAL_CAFES } from './src/data';
const keys = new Set();
INITIAL_CAFES.forEach(c => Object.keys(c).forEach(k => keys.add(k)));
console.log(Array.from(keys).sort());
