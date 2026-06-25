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
    name: "Karafa",
    neighborhood: "Banjara Hills",
    address: "8-2, 269/4A, Road No. 2, Sagar Society, Sri Nagar Colony, Kamalapuri Colony, Banjara Hills, Hyderabad, Telangana 500034",
    timings: "8:00 AM to 11:00 PM",
    signature: "Experiential coffee, bakes, all-day brunch",
    description: "Karafa in Banjara Hills is a clean, minimal coffee destination centered on specialty brews, bakes, and all-day brunch. It feels best suited to people who care about coffee quality and a calm, curated atmosphere more than just a quick cafe stop.",
    tags: ["Specialty Coffee", "Brunch", "Aesthetic"],
    facilities: ["Wheelchair-accessible", "Coffee Shop Seating", "Dessert Kitchen", "Roastery", "Dine-in"],
    aesthetic: "Minimal, modern, curated coffee-roastery aesthetic",
    crowd: "Coffee enthusiasts, brunch visitors, dessert lovers, and people looking for a premium cafe experience",
    phone: "+91 94084 06666",
    website: "https://karafa.com/menu/",
    instagram: "https://www.instagram.com/karafacoffee/?hl=en",
    dineIn: true,
    takeaway: false,
    onlineOrder: false,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Karafa%2C%208-2%2C%20269%2F4A%2C%20Road%20No.%202%2C%20Banjara%20Hills%2C%20Hyderabad",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Curated Pour Over"},
      {...roastFeaturedMenu[1], name: "All-Day Brunch"},
      {...roastFeaturedMenu[2], name: "Signature Bake"}
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  },
  {
    id: Date.now() + 2,
    name: "Roastery Coffee House",
    neighborhood: "Kokapet",
    address: "Plot No. 21, Kokapet, Narsingi, Hyderabad, Telangana 500075",
    timings: "Open till 11:00 PM",
    signature: "Specialty coffee, Brownie Blend, creamy spinach spaghetti & nachos",
    description: "Roastery Coffee House in Kokapet is a warm, spacious cafe with a relaxed, homely feel and a strong specialty-coffee identity. It’s a great fit for people who want good coffee, a calm atmosphere, and a place that works for both meetups and focused work.",
    tags: ["Specialty Coffee", "Aesthetic", "Work Friendly"],
    facilities: ["Free Wi-Fi", "Spacious Seating", "Central Coffee Bar", "Dine-in", "Reservation-friendly"],
    aesthetic: "Timeless, warm, homely coffee-house aesthetic with vintage-inspired charm",
    crowd: "Coffee lovers, friends catching up, and people looking for a cosy work-from-café spot",
    phone: "",
    website: "",
    instagram: "",
    dineIn: true,
    takeaway: false,
    onlineOrder: false,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Roastery%20Coffee%20House%2C%20Plot%20No.%2021%2C%20Kokapet%2C%20Narsingi%2C%20Hyderabad%20500075",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Brownie Blend"},
      {...roastFeaturedMenu[1], name: "Creamy Spinach Spaghetti"},
      {...roastFeaturedMenu[2], name: "Loaded Nachos"}
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  },
  {
    id: Date.now() + 3,
    name: "Habitat Cafe",
    neighborhood: "Banjara Hills",
    address: "Terrace, Vimbri Boulevard, Road No. 4, Green Valley, Banjara Hills, Hyderabad, Telangana 500034",
    timings: "8:00 AM to 11:30 PM",
    signature: "Latte, cold coffee, rose latte & brunch items",
    description: "Habitat Cafe in Banjara Hills is an upscale terrace cafe with a calm, aesthetic atmosphere and a menu centered on coffee, beverages, and easy cafe food. It works well for relaxed dinners, coffee dates, and casual conversations in a more refined setting.",
    tags: ["Aesthetic", "Coffee", "Terrace Cafe"],
    facilities: ["Reservation available", "Valet Parking", "Free Wi-Fi", "Dine-in"],
    aesthetic: "Terrace, upscale, modern cafe with an evening-dining feel",
    crowd: "Couples, friends, cafe hoppers, and people looking for a relaxed premium cafe setting",
    phone: "+91 81216 85645",
    website: "",
    instagram: "",
    dineIn: true,
    takeaway: false,
    onlineOrder: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Habitat%20Cafe%2C%20Terrace%2C%20Vimbri%20Boulevard%2C%20Road%20No%204%2C%20Green%20Valley%2C%20Banjara%20Hills%2C%20Hyderabad",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Rose Latte"},
      {...roastFeaturedMenu[1], name: "Classic Cold Coffee"},
      {...roastFeaturedMenu[2], name: "Oreo Shake"}
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
console.log('Added 3 More Cafes');
