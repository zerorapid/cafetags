import https from 'https';
import fs from 'fs';
import { execSync } from 'child_process';

const cafes = [
  { name: 'urbannemo', url: 'https://www.district.in/dining/hyderabad/urban-nemo-cafe-in-garden-jubilee-hills' },
  { name: 'lush', url: 'https://www.district.in/dining/hyderabad/lush-cafe-by-the-lake-jubilee-hills' },
  { name: 'pscheese', url: 'https://www.district.in/dining/hyderabad/ps-cheese-cafe-madhapur' },
  { name: 'glasshouse', url: 'https://www.district.in/dining/mumbai/glass-house-malad-west' },
  { name: 'olivebistro', url: 'https://www.district.in/dining/hyderabad/olive-bistro-bar-jubilee-hills' },
  { name: 'kisscoff', url: 'https://www.district.in/dining/hyderabad/kisscoff-cafe-film-nagar' },
  { name: 'manam', url: 'https://www.district.in/dining/hyderabad/manam-chocolate-1-banjara-hills' },
  { name: 'churrolto', url: 'https://www.district.in/dining/hyderabad/churrolto-2-banjara-hills' },
  { name: 'lasthouse', url: 'https://www.district.in/dining/hyderabad/lasthouse-by-the-lake-jubilee-hills' },
  { name: 'heartcup', url: 'https://www.district.in/dining/hyderabad/heart-cup-coffee-gachibowli' },
];

function fetchMenus(url) {
  try {
    const out = execSync(`curl -s "${url}" | grep -o 'https://b.zmtcdn.com/data/menus/[^"]*'`).toString();
    const lines = out.split('\n').filter(l => l.trim().length > 0);
    // clean up escapes like \u0026 and trailing backslashes
    const cleanLines = lines.map(l => l.replace(/\\\\u0026/g, '&').replace(/\\\\/g, '').replace(/&amp;/g, '&'));
    // keep only base URLs (no crop)
    const baseUrls = cleanLines.map(l => l.split('?')[0]).filter(l => l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp'));
    return [...new Set(baseUrls)];
  } catch(e) {
    return [];
  }
}

for (const cafe of cafes) {
  const menus = fetchMenus(cafe.url);
  console.log(`\n=== ${cafe.name.toUpperCase()} ===`);
  console.log(`Found ${menus.length} menus:`, menus);
}
