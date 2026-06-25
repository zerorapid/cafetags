import fs from 'fs';

const newCafe = {
    id: Date.now(),
    name: "Makobrew Cafe & Restaurant",
    neighborhood: "Jubilee Hills",
    address: "Road No. 44, Sri Peddamma Thalli Temple, CBI Colony, Jubilee Hills, Hyderabad, Telangana 500033",
    timings: "11:00 AM - 11:00 PM",
    signature: "Sweet crepe & coffees",
    description: "Makobrew Cafe & Restaurant in Jubilee Hills is a pure vegetarian cafe-restaurant known for specialty coffee, gourmet vegetarian dishes, and a cozy all-day hangout vibe. It works well for family dining, casual coffee dates, and relaxed work sessions in a premium neighborhood setting.",
    tags: ["Specialty Coffee", "Pure Veg", "Work Friendly"],
    facilities: ["Indoor Seating", "Outdoor Seating", "Parking", "Valet Parking", "Free Wi-Fi", "Reservations", "Jain Food"],
    aesthetic: "Cozy contemporary cafe with a warm, laid-back dining feel",
    crowd: "Families, couples, friends, coffee drinkers, and vegetarian food lovers",
    phone: "+91 63016 36103",
    website: "https://makobrewworldcoffeebar.com",
    instagram: "https://www.instagram.com/makobrewcafe/?hl=en",
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=Makobrew%20Cafe%20%26%20Restaurant%2C%20Road%20No.%2044%2C%20Jubilee%20Hills%2C%20Hyderabad",
    image: "https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg",
    logo: "https://b.zmtcdn.com/data/brand_creatives/logos/d4446b7aa9e756d7d859111f2aeaf11b1746435804.png",
    moreImages: [
      "https://b.zmtcdn.com/data/pictures/9/21365469/35c912438a451a4ed875cc22470199dc.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp",
      "https://b.zmtcdn.com/data/pictures/9/21365469/1a14df324279a971bc7bb891b194819a.png",
      "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg",
      "https://b.zmtcdn.com/data/pictures/9/21365469/cd381a727e56394dc4f18042fc2f0ef8.jpg",
      "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"
    ],
    menuImages: [
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
    ],
    featuredMenu: [
      {
        name: "Sweet Crepe",
        price: "₹350",
        description: "Signature sweet crepe dessert",
        image: "https://b.zmtcdn.com/data/pictures/chains/9/21365469/0435a4e9762114b39061b77cffb50eb1.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"
      },
      {
        name: "Beetroot Burger",
        price: "₹320",
        description: "Gourmet vegetarian burger with beetroot patty",
        image: "https://b.zmtcdn.com/data/pictures/chains/9/21365469/67b427acd08af1de7c8d166716732488.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp"
      },
      {
        name: "Cheesecake",
        price: "₹280",
        description: "Classic creamy cheesecake slice",
        image: "https://b.zmtcdn.com/data/reviews_photos/d27/0208b3d53dfeef35c44e6a9e95426d27_1777992138.jpg"
      }
    ],
    email: "",
    isFeaturedBanner: false,
    newLaunchCatchyline: "",
    directionsTip: ""
  };

const content = fs.readFileSync('src/data.ts', 'utf8');
const searchString = 'export const INITIAL_CAFES: Cafe[] = [';
const insertIndex = content.indexOf(searchString) + searchString.length;

const newContent = content.slice(0, insertIndex) + '\n  ' + JSON.stringify(newCafe, null, 2) + ',' + content.slice(insertIndex);

fs.writeFileSync('src/data.ts', newContent, 'utf8');
console.log('Added Makobrew');
