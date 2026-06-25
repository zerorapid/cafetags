import fs from 'fs';
import { INITIAL_CAFES, Cafe } from '../src/data';

const newCafe: Cafe = {
  id: Date.now(),
  name: "Cafe Niloufer",
  neighborhood: "Hitech City",
  address: "Plot No. 30/C, Survey 83/1, Tower 2, Orbit Building, TSIIC, Raidurgam, Penmaktha, Serilingampalle (M), Hyderabad, Telangana",
  description: "Cafe Niloufer Hitech City is a grand, modern tea café built around Irani chai, bun maska, biscuits, and Hyderabad-style snacks. With its huge scale and premium interiors, it feels like both a local landmark and a comfortable hangout for tea breaks, work meetings, and casual meals.",
  rating: 4.5,
  tags: ["Tea Cafe", "Aesthetic", "Work Friendly"],
  priceForTwo: "₹400",
  facilities: ["Spacious seating", "Terrace seating", "Bakery counter", "Dine-in", "Event space"],
  signatureItem: "Irani chai, bun maska, Osmania biscuits, Kunafa cheesecake",
  bestTimeToVisit: "Evening",
  website: "https://cafeniloufer.com/pages/outlets",
  timings: "8:00 AM - 11:00 PM",
  phone: "+91 89777 40649",
  image: "https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Cafe%20Niloufer%2C%20Plot%2030%2FC%2C%20Survey%2083%2F1%2C%20Tower%202%2C%20Orbit%20Building%2C%20Raidurgam%2C%20Hyderabad",
  icon: "local_cafe",
  takeaway: true,
  dineIn: true,
  selfDelivery: false,
  celebrities: [],
  bookingUrl: "",
  status: "open",
  isNewLaunch: true,
  newLaunchCatchyline: "A huge, modern tea café that mixes Hyderabadi nostalgia with contemporary interiors.",
  moreImages: [
    "https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg"
  ],
  menuImages: [
    "https://b.zmtcdn.com/data/menus/469/21365469/8c0315eae5f3b14b0e651f922c447127.png"
  ],
  userReviews: [],
  logo: "https://b.zmtcdn.com/data/brand_creatives/logos/d4446b7aa9e756d7d859111f2aeaf11b1746435804.png",
  socialMedia: []
};

const newCafes = [newCafe, ...INITIAL_CAFES];

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
console.log('Successfully added Cafe Niloufer!');
