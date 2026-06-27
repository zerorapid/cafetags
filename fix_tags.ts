import fs from 'fs';
const content = fs.readFileSync('src/data.ts', 'utf8');
const replacement = `
const TAG_ICONS: Record<string, string> = {
  'Aesthetic': 'palette',
  'Specialty Coffee': 'local_cafe',
  'Pet Friendly': 'pets',
  'Quiet': 'volume_off',
  'Outdoor Seating': 'deck',
  'Work Friendly': 'laptop_mac',
  'Vegan Options': 'grass'
};

export function getTagIcon`;
fs.writeFileSync('src/data.ts', content.replace('export function getTagIcon', replacement), 'utf8');
