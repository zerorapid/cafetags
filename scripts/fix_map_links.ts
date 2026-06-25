import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');

let lines = content.split('\n');
let currentName = '';
let currentAddress = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const nameMatch = line.match(/name:\s*"([^"]+)"/);
  if (nameMatch) {
    currentName = nameMatch[1];
  }

  const addressMatch = line.match(/address:\s*"([^"]+)"/);
  if (addressMatch) {
    currentAddress = addressMatch[1];
  }

  if (line.includes('mapLink:')) {
    if (currentName && currentAddress) {
      const query = encodeURIComponent(currentName + ', ' + currentAddress);
      const newMapLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
      lines[i] = line.replace(/mapLink:\s*"[^"]+"/, `mapLink: "${newMapLink}"`);
    } else if (currentName) {
      const query = encodeURIComponent(currentName);
      const newMapLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
      lines[i] = line.replace(/mapLink:\s*"[^"]+"/, `mapLink: "${newMapLink}"`);
    }
    // We clear them so we don't accidentally reuse
    // Wait, let's not clear them, or maybe clear them at the end of the object.
    // Usually they are in the same object.
  }
}

fs.writeFileSync('src/data.ts', lines.join('\n'), 'utf8');
console.log('Map links updated.');
