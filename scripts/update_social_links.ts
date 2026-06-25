import fs from 'fs';
import { INITIAL_CAFES } from '../src/data';

const socialMap: Record<string, string> = {
  "Sobremesa": "https://www.instagram.com/sobremesa_hyd/",
  "Guilt Trip": "https://www.instagram.com/guilttrip_hyderabad/",
  "Kaficko": "https://www.instagram.com/kafickohyd/",
  "Karafa": "https://www.instagram.com/karafa.in/",
  "Roastery Coffee House": "https://www.instagram.com/roasterycoffeehousehyderabad/",
  "Habitat Cafe": "https://www.instagram.com/habitatcafe.in/",
  "La Vie En Rose Cafe & Bistro": "https://www.instagram.com/lavieenrosecafe.in/"
};

const newCafes = INITIAL_CAFES.map(cafe => {
  if (socialMap[cafe.name]) {
    // Check if there is already an Instagram link to update
    const newSocialMedia = cafe.socialMedia ? [...cafe.socialMedia] : [];
    const instaIndex = newSocialMedia.findIndex(s => s.platform === "Instagram");
    
    if (instaIndex !== -1) {
      newSocialMedia[instaIndex].url = socialMap[cafe.name];
    } else {
      newSocialMedia.push({ platform: "Instagram", url: socialMap[cafe.name] });
    }

    return {
      ...cafe,
      socialMedia: newSocialMedia
    };
  }
  return cafe;
});

const content = fs.readFileSync('src/data.ts', 'utf8');
const searchString = 'export const INITIAL_CAFES: Cafe[] = [';
const startIndex = content.indexOf(searchString);
const endString = 'export function getTagIcon';
const endIndex = content.indexOf(endString);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find boundaries");
  process.exit(1);
}

const before = content.slice(0, startIndex);
const after = content.slice(endIndex);
const newContent = before + `export const INITIAL_CAFES: Cafe[] = ` + JSON.stringify(newCafes, null, 2) + `;\n\n` + after;

fs.writeFileSync('src/data.ts', newContent, 'utf8');
console.log('Successfully updated social media links!');
