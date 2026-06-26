import { execSync } from 'child_process';

const url = 'https://www.district.in/dining/hyderabad/the-hole-in-the-wall-cafe-1-jubilee-hills';
const out = execSync(`curl -s "${url}" | grep -o 'https://b.zmtcdn.com/data/pictures/[^"]*' | head -n 10`).toString();
console.log('PICTURES:', out);

const out2 = execSync(`curl -s "${url}" | grep -o 'https://b.zmtcdn.com/data/reviews_photos/[^"]*' | head -n 10`).toString();
console.log('REVIEWS:', out2);
