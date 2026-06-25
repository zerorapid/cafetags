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
    name: "Sobremesa",
    neighborhood: "Jubilee Hills",
    address: "Plot No. 593, 8-2-293/82/A/593, Road No. 31, Jubilee Hills, Hyderabad, Telangana 500033",
    timings: "10:00 AM to 10:30 PM",
    signature: "Baked Broccoli, 5 Cheese Pizza & Irish Cold Coffee",
    description: "Sobremesa on Road No. 31, Jubilee Hills is a premium bakehouse-cafe-kitchen with a continental-focused menu, popular for its pizzas, sandwiches, coffee, and dessert-friendly setup. It feels best suited to people who want a relaxed, elegant place for brunch, lunch, or a longer sit-down meal.",
    tags: ["Bakehouse", "Continental", "Aesthetic"],
    facilities: ["Pet Friendly", "Outdoor Seating", "Takeaway", "Reservation Support"],
    aesthetic: "Upscale, modern bakehouse-cafe with a restaurant-style feel",
    crowd: "Brunch-goers, couples, families, dessert lovers, and people looking for a comfortable dine-in cafe",
    phone: "+91 78427 76820",
    website: "",
    instagram: "",
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Sobremesa%2C%20Plot%20No.%20593%2C%20Road%20No.%2031%2C%20Jubilee%20Hills%2C%20Hyderabad%20500033",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Baked Broccoli"},
      {...roastFeaturedMenu[1], name: "5 Cheese Pizza"},
      {...roastFeaturedMenu[2], name: "Irish Cold Coffee"}
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  },
  {
    id: Date.now() + 2,
    name: "Guilt Trip",
    neighborhood: "Banjara Hills",
    address: "8-2-585/2/A/1, Road 9, Gaffar Khan Colony, Banjara Hills, Hyderabad, Telangana 500034",
    timings: "11:00 AM to 11:00 PM",
    signature: "Pastries, cheesecakes, cupcakes & casual cafe food",
    description: "Guilt Trip in Banjara Hills is a bakery-forward cafe known for pastries, cheesecakes, cupcakes, and easy continental cafe food. It’s a good fit for dessert runs, casual meetups, and people who want a relaxed place with both sweet and savory options.",
    tags: ["Bakery", "Desserts", "Casual Dining"],
    facilities: ["Dine-in", "Vegetarian-friendly options", "Event-space use"],
    aesthetic: "Simple bakery-cafe / dessert cafe with a casual dine-in setup",
    crowd: "Dessert lovers, families, friends, and casual diners",
    phone: "+91 40 6515 5050",
    website: "",
    instagram: "",
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Guilt%20Trip%2C%208-2-585%2F2%2FA%2F1%2C%20Road%209%2C%20Banjara%20Hills%2C%20Hyderabad",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Signature Cupcake"},
      {...roastFeaturedMenu[1], name: "Chocolate Pastry"},
      {...roastFeaturedMenu[2], name: "New York Cheesecake"}
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  },
  {
    id: Date.now() + 3,
    name: "Kaficko",
    neighborhood: "Jubilee Hills",
    address: "Plot No. 1357, Road No. 45, Jubilee Hills, Hyderabad, Telangana 500033",
    timings: "10:00 AM to 10:00 PM",
    signature: "Cold coffee, spaghetti, Moroccan chicken & burgers",
    description: "Kaficko in Jubilee Hills is a laid-back cafe-restaurant with a mix of coffee, Continental, and Italian dishes. It works well for casual hangouts, quiet conversations, and people who want a comfortable place to sit, snack, and stay awhile.",
    tags: ["Cafe", "Continental", "Work Friendly"],
    facilities: ["Dine-in", "Board-game friendly ambience", "Café-style seating"],
    aesthetic: "Relaxed, pretty, low-key cafe-restaurant with a long-stay friendly setup",
    crowd: "Friends, coffee drinkers, casual diners, and people who want a quiet place to sit longer",
    phone: "+91 70985 76222",
    website: "",
    instagram: "",
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Kaficko%2C%20Plot%20No.%201357%2C%20Road%20No.%2045%2C%20Jubilee%20Hills%2C%20Hyderabad%20500033",
    image: roastImage,
    logo: roastLogo,
    moreImages: roastMoreImages,
    menuImages: roastMenuImages,
    featuredMenu: [
      {...roastFeaturedMenu[0], name: "Cold Coffee"},
      {...roastFeaturedMenu[1], name: "Moroccan Chicken"},
      {...roastFeaturedMenu[2], name: "Classic Spaghetti"}
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
