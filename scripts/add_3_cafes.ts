import fs from 'fs';

const roastImage = "https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg";
const roastLogo = "https://b.zmtcdn.com/data/brand_creatives/logos/d4446b7aa9e756d7d859111f2aeaf11b1746435804.png";
const roastMoreImages = [
      "https://b.zmtcdn.com/data/pictures/9/21365469/35c912438a451a4ed875cc22470199dc.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp",
      "https://b.zmtcdn.com/data/pictures/9/21365469/1a14df324279a971bc7bb891b194819a.png",
      "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg",
      "https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg",
      "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"
    ];
const roastMenuImages = [
      "https://b.zmtcdn.com/data/menus/469/21365469/8d695c86299ee6781bfaec07467bf0c1.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/154faf08746c5d81b45e20bd5931383a.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/f1bd9d9db16a6dd34f21880708ad98b8.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/5f11051259262b30216bb991e758f31f.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/79955272bf689f9ac1cf7ad8bfa6a716.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/21e56cac02e81358b8b1b9feb4bee5b7.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/bd88815cffbac7eac7f786bc4f9e18ba.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/6b01d0a9802239484faab04fa55b78ed.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/7b5e579da9d22f8855b2f740e58a5887.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/ae463e59ec4fc6cb4ce197e104a57bc9.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/3bab54b3e3d638aa13bc5d75c5b94b76.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/ca7c4c5199a6b782cc3c1148112ab766.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/6fb3b73064bd2aafa1fc3eed41dd235a.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/4c15ce800a90e54154885f59244a8500.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/42cb88b061de38e62375becc1837ae40.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/cd8aded324cb78e2a8c99efafb2a0979.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/e60c4b04b6541e0ea13c9387f9bcacf4.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/865068f9276f2c229674093bcb4177cd.png",
      "https://b.zmtcdn.com/data/menus/469/21365469/8c0315eae5f3b14b0e651f922c447127.png"
    ];
const roastFeaturedMenu = [
      {
        name: "Feature Item 1",
        price: "₹350",
        description: "Signature featured item",
        image: "https://b.zmtcdn.com/data/pictures/chains/9/21365469/0435a4e9762114b39061b77cffb50eb1.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"
      },
      {
        name: "Feature Item 2",
        price: "₹320",
        description: "Delicious signature creation",
        image: "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"
      },
      {
        name: "Feature Item 3",
        price: "₹280",
        description: "Classic premium selection",
        image: "https://b.zmtcdn.com/data/reviews_photos/d27/0208b3d53dfeef35c44e6a9e95426d27_1777992138.jpg"
      }
    ];

const cafesToAdd = [
  {
    id: Date.now() + 1,
    name: "La Vie En Rose Cafe & Bistro",
    neighborhood: "Gachibowli",
    address: "Unit 301, Survey 92/1, 92/3 to 92/18, Plot 9, 10, 11, 16, 17, & 18, 3rd Floor, Circle 20, Gachibowli, Hyderabad",
    timings: "12:00 PM to 11:00 PM",
    signature: "Hot teas, coffees, and comfort food",
    description: "La Vie En Rose Cafe & Bistro in Gachibowli is a pink floral cafe known for its dreamy interiors, photo-friendly corners, and relaxed date-night atmosphere. It’s a strong pick for visitors who care as much about ambience as the food itself.",
    tags: ["Aesthetic", "Date Spot", "Floral Cafe"],
    facilities: ["Dine-in", "Reservations", "Multiple Outlets", "Event/Party-Friendly Seating"],
    aesthetic: "Pink-themed floral / dreamy / Instagrammable",
    crowd: "Couples, friends, families, and people looking for a celebration or photo-friendly cafe",
    phone: "7286853101",
    website: "https://www.instagram.com/lavieenrosecafeindia/",
    instagram: "https://www.instagram.com/lavieenrosecafeindia/",
    dineIn: true,
    takeaway: false,
    onlineOrder: false,
    mapLink: "https://www.google.com/maps/search/?api=1&query=La%20Vie%20En%20Rose%20Cafe%20%26%20Bistro%2C%20Gachibowli%2C%20Hyderabad",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Rose Tea"},
      {...roastFeaturedMenu[1], name: "Pink Crepe"},
      {...roastFeaturedMenu[2], name: "Floral Pastry"}
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  },
  {
    id: Date.now() + 2,
    name: "Et-Si Cafe | Bakehouse | Chocolatier",
    neighborhood: "Jubilee Hills",
    address: "Plot No. 1196/B, Road Number 59, Jubilee Hills, Hyderabad, Telangana 500033",
    timings: "8:00 AM to 11:59 PM",
    signature: "Pistachio Matilda Cake & soufflé pancakes",
    description: "Et-Si Cafe | Bakehouse | Chocolatier on Road No. 59, Jubilee Hills is a premium all-day cafe with a bakery-first identity, known for coffee, croissants, desserts, and viral signature items. It suits dessert lovers, long brunches, and stylish casual hangs, with a strong mix of food appeal and visual charm.",
    tags: ["Bakery Cafe", "Aesthetic", "Work Friendly"],
    facilities: ["Indoor Seating", "Outdoor Seating", "Home Delivery", "Takeaway", "Work-friendly", "Free Wi-Fi", "Valet Parking", "Kid-friendly"],
    aesthetic: "Modern bakery-cafe with polished, Instagram-friendly presentation",
    crowd: "Couples, families, dessert lovers, cafe hoppers, and people looking for an all-day hangout spot",
    phone: "+91 91512 23456",
    website: "https://et-si.in",
    instagram: "https://et-si.in",
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Et-Si%20Cafe%20BakeHouse%20Chocolatier%2C%20Plot%201196%2FB%2C%20Road%2059%2C%20Jubilee%20Hills%2C%20Hyderabad",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Pistachio Matilda Cake"},
      {...roastFeaturedMenu[1], name: "Soufflé Pancakes"},
      {...roastFeaturedMenu[2], name: "Signature Croissant"}
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  },
  {
    id: Date.now() + 3,
    name: "Switch Coffee",
    neighborhood: "Hitech City",
    address: "Plot No. 65, Surya Enclave, beside Cyber Towers flyover, opposite Tata Motors, Madhapur, Hyderabad, Telangana 500081",
    timings: "11:00 AM to 11:00 PM",
    signature: "Specialty coffee, matcha & cold coffee",
    description: "Switch Coffee in Hitech City is a modern coffee spot near Cyber Towers with a lively, cozy vibe and a clear focus on specialty beverages. It feels built for Hyderabad’s office crowd, casual meetups, and people who want a stylish but practical cafe stop.",
    tags: ["Specialty Coffee", "Work Friendly", "Aesthetic"],
    facilities: ["Dine-in", "Takeaway", "Delivery"],
    aesthetic: "Vibrant modern cafe with a cozy, minimal, productivity-oriented interior",
    crowd: "Office-goers, coffee lovers, solo workers, and people looking for a trendy cafe near Hitech City",
    phone: "+91 91217 22003",
    website: "https://www.instagram.com/switchtocoffee/?hl=en",
    instagram: "https://www.instagram.com/switchtocoffee/?hl=en",
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Switch%20Coffee%2C%20Plot%20No.%2065%2C%20beside%20Cyber%20Towers%20flyover%2C%20Madhapur%2C%20Hyderabad",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Signature Matcha"},
      {...roastFeaturedMenu[1], name: "Cold Brew"},
      {...roastFeaturedMenu[2], name: "Classic Latte"}
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  }
];

const content = fs.readFileSync('src/data.ts', 'utf8');
const searchString = 'export const INITIAL_CAFES: Cafe[] = [';
const insertIndex = content.indexOf(searchString) + searchString.length;

const newContentArray = cafesToAdd.map(c => '\n  ' + JSON.stringify(c, null, 2) + ',').join('');
const newContent = content.slice(0, insertIndex) + newContentArray + content.slice(insertIndex);

fs.writeFileSync('src/data.ts', newContent, 'utf8');
console.log('Added 3 Cafes');
