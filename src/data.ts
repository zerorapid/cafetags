/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cafe, PresetCover } from './types';

export const INITIAL_CAFES: Cafe[] = [
  {
    id: 1,
    name: "Nimrah Cafe",
    area: "Charminar",
    tags: ["Irani Chai", "Heritage"],
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop",
    vibe: "An atmospheric sensory immersion. The aroma of simmering Irani chai blends with baking Osmania biscuits under the high-arch shadows of Charminar. White porcelain cups clink rhythmically against marble tops as waves of morning light pour through wooden-framed arches.",
    mapLink: "https://maps.app.goo.gl/9m26FjBvA4hFvqPJA",
    icon: "local_cafe",
    signature: "Irani Chai & Osmania Biscuits",
    founded: "1993",
    
    // Extended properties
    address: "Beside Mecca Masjid, Charminar Rd, Ghansi Bazaar, Hyderabad, Telangana 500002",
    phone: "+91 98480 22338",
    email: "heritage@nimrahcafe.in",
    website: "https://nimrahcafe.in",
    socialLink: "https://instagram.com/nimrahcafe_gallery",
    timings: "4:00 AM - 11:30 PM Everyday",
    aestheticType: "Deccani Retro Heritage & Live Wood-fired Ovens",
    crowd: "Poets, morning walkers, global travelers, and Old Hyderabad loyalists",
    discounts: "Complimentary traditional Osmania Biscuit served with every double-shot Irani Saffron Chai",
    facilities: ["Historic Outdoor Stand-tables", "Live Woodfired Baking Ovens", "Mecca Masjid Viewpoint Patio", "Wheelchair Accessible Entrance"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: false,
    videoUrl: "https://www.youtube.com/embed/5m3OWea2lO0",
    celebrities: ["Dulquer Salmaan", "Allu Arjun", "Sania Mirza", "Vicky Kaushal"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Walk directly opposite Mecca Masjid's main minaret archway. The constant aroma of cardamom steam guides you.",
    featuredMenu: [
      { name: "Special Irani Saffron Chai", price: "₹25", category: "Brews", isSpecial: true },
      { name: "Signature Osmania Biscuit", price: "₹10", category: "Patisserie", isSpecial: true },
      { name: "Khoya Dilkhush", price: "₹60", category: "Heritage Sweets" },
      { name: "Bun Malai (Cardamom infused)", price: "₹45", category: "Savory Mains", isSpecial: true }
    ],
    menuImages: [
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop"
    ],
    userReviews: [
      { author: "Rehan Quadri", rating: 5, text: "Drinking hot chai at 5 AM with Charminar silhouetted in the morning mist is a spiritual awakening. Absolutely peerless.", date: "Jun 02, 2026", role: "Local Historian" },
      { author: "Meera Sen", rating: 5, text: "Best Osmania biscuits on the planet. Fresh out of the coal oven, buttery, sweet and salty.", date: "May 20, 2026", role: "Craft Critic" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop"
    ],
    vibeScores: [
      { label: "Heritage", score: 9.8 },
      { label: "Photography", score: 9.5 },
      { label: "Quiet Workspace", score: 2.0 }
    ],
    neighbourhoodGuide: "Charminar's bustling lanes are a sensory overload. Best visited before 7 AM to avoid the dense traffic and capture the rising sun reflecting off the minarets. Perfect for street photography and heritage walks.",
    status: 'open'
  },
  {
    id: 2,
    name: "True Black",
    area: "Film Nagar",
    tags: ["Minimalist", "Specialty Coffee"],
    image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1200&auto=format&fit=crop",
    vibe: "A sanctuary of poured concrete, matte black steels, and sharp monolithic planes. The low hum of the custom espresso press under soft linear spot beams creates an intensely focused sensory experience. It is Hyderabad's temple of specialty espresso and silent design precision.",
    mapLink: "https://maps.app.goo.gl/6aD13pM4XJd84m89A",
    icon: "coffee_maker",
    signature: "Pourover & Specialty Espresso",
    founded: "2021",

    // Extended properties
    address: "Road No 9, Film Nagar East, Jubilee Hills, Hyderabad, Telangana 500033",
    phone: "+91 80088 19090",
    email: "info@trueblackspecialty.com",
    website: "https://trueblackspecialty.com",
    socialLink: "https://instagram.com/trueblackcoffee",
    timings: "7:00 AM - 10:00 PM Everyday",
    aestheticType: "Monolithic Brutalism, Ash-wash Cement, Linear Spotlighting",
    crowd: "UI designers, screenwriters, startup founders, and architectural enthusiasts",
    discounts: "10% off on premium single-origin geisha beans for library members",
    facilities: ["High-speed Dedicated Wi-Fi", "Silent Workspace Zones", "Wireless Charging Pads", "Underground Valet Parking"],
    dineIn: true,
    takeaway: true,
    onlineOrder: false,
    selfDelivery: false,
    videoUrl: "https://www.youtube.com/embed/F4SgK7pL5-Q",
    celebrities: ["Vijay Deverakonda", "Rana Daggubati", "Nagarjuna Akkineni"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Take the immediate left lane adjacent to the Film Nagar Temple circle. The understated black concrete facade is visible adjacent to the bamboo greenyard.",
    featuredMenu: [
      { name: "Single Origin Aeropress", price: "₹280", category: "Brews", isSpecial: true },
      { name: "True Black Cold Flash", price: "₹260", category: "Brews" },
      { name: "Charcoal Matcha Latte", price: "₹290", category: "Elixirs", isSpecial: true },
      { name: "Almond Flaky Croissant", price: "₹220", category: "Patisserie" }
    ],
    userReviews: [
      { author: "Nikhil Chaterjee", rating: 5, text: "Their Ethopian Yirgacheffe pour-over is meticulously prepared at exact water temperature. Perfection in black.", date: "May 28, 2026", role: "Q-Grader" },
      { author: "Zoya Ward", rating: 4.8, text: "Extremely quiet workstation. Inspires hyper-focus. Concrete aesthetic is absolutely beautiful.", date: "Apr 15, 2026", role: "Product Designer" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=600&auto=format&fit=crop"
    ],
    status: 'open'
  },
  {
    id: 3,
    name: "Autumn Leaf Cafe",
    area: "Jubilee Hills",
    tags: ["Courtyard", "Quiet Workspace"],
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=1200&auto=format&fit=crop",
    vibe: "A leafy, sun-dappled courtyard where terracotta steps are overrun by wild ivy. Reclaimed teak wood tables sit beneath sprawling mango trees, whispering with the breeze. Rustling green canopies and hand-spun pottery establish a tactile, organic slowness in the heart of the city.",
    mapLink: "https://maps.app.goo.gl/X91X3p97A5e9A9bAA",
    icon: "yard",
    signature: "Manual Brews & Al Fresco Breakfast",
    founded: "2015",

    // Extended properties
    address: "Plot 823, Road No. 41, Near Peddamma Temple, Jubilee Hills, Hyderabad, Telangana 500033",
    phone: "+91 40 2355 0986",
    email: "contact@autumnleaf.place",
    website: "https://autumnleafcafe.com",
    socialLink: "https://instagram.com/autumnleafcafe_hyd",
    timings: "8:00 AM - 10:30 PM Everyday",
    aestheticType: "Shabby Chic, Rustic Timber, Wild Ivy Courtyard Canvas",
    crowd: "Creative agencies, eco-advocates, authors, organic lifestyle lovers",
    discounts: "15% discount for table reservations through Swiggy Dineout or Zomato Gold",
    facilities: ["Pet Friendly Garden Yard", "Artisan Handicraft Shopfront", "Lush Outdoor Seating", "Live Acoustic Evenings", "Bike Racks"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: true,
    videoUrl: "https://www.youtube.com/embed/F69r6uYy94c",
    celebrities: ["Samantha Ruth Prabhu", "Samantha", "Chaitanya", "Aditi Rao Hydari"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Easiest approach via Metro pillar 1642. Go inside Road 41 and watch for the moss-green wooden gate labeled Autumn Leaf.",
    featuredMenu: [
      { name: "Lavender Cold Brew", price: "₹240", category: "Brews", isSpecial: true },
      { name: "Gorgonzola Fig Sourdough", price: "₹380", category: "Savory Mains", isSpecial: true },
      { name: "Earl Grey Lemon Tart", price: "₹180", category: "Patisserie" },
      { name: "French Press Organic Roast", price: "₹220", category: "Brews" }
    ],
    userReviews: [
      { author: "Kiran Dev", rating: 5, text: "Taking my golden retriever and sitting in the shade of the grand mango tree is my favourite Sunday ritual.", date: "Jun 06, 2026", role: "Pet Parent" },
      { author: "Aanya Gupta", rating: 4.5, text: "Enchanting outdoor aesthetic. You forget you are in the chaotic heart of Jubilee Hills.", date: "May 10, 2026", role: "Visual Artist" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop"
    ],
    status: 'renovating'
  },
  {
    id: 4,
    name: "Roast 24/7",
    area: "Gachibowli",
    tags: ["Late Night", "Spacious"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    vibe: "A cathedral of steel and glass pulsing with soft nocturnal jazz and warm amber pendant bulbs. High structural columns frame a multi-tiered brewing station, hosting late-night creators and night-owl thoughts in a continuous glow of elegant brass and velvet finishes.",
    mapLink: "https://maps.app.goo.gl/S91S3p97A5e9A9bAB",
    icon: "wb_twilight",
    signature: "Cold Brew Tonic & Classic Croissant",
    founded: "2019",

    // Extended properties
    address: "Main Road Rd No 2, Near Gachibowli Flyover, Gachibowli, Hyderabad, Telangana 500032",
    phone: "+91 91000 24700",
    email: "desk@roast247.com",
    website: "https://roast247.com",
    socialLink: "https://instagram.com/roast_24x7",
    timings: "Open 24 Hours, 365 Days",
    aestheticType: "Mid-Century Modern Brasserie, Brass Frameworks, Vaulted Ceiling",
    crowd: "Late-night developers, tech execs, midnight riders, and jazz fans",
    discounts: "Flat 20% Midnight Treat discount from 1:00 AM to 5:00 AM on fresh brews",
    facilities: ["High-speed Charger Ports everywhere", "24x7 Full Dine-in Menu", "Soundproof Meeting Pods", "Private Lounge Cabinets", "Valet Parking"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: true,
    videoUrl: "https://www.youtube.com/embed/hbeSMyVv5Wc",
    celebrities: ["Mahesh Babu", "Jr NTR", "Ram Charan"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Located just below the Gachibowli Outer Ring Road flyover descent. Look for the massive backlit gold glass dome.",
    featuredMenu: [
      { name: "Nitro Tonic Splash", price: "₹310", category: "Brews", isSpecial: true },
      { name: "24-hr Roasted Pork Belly Bun", price: "₹520", category: "Savory Mains", isSpecial: true },
      { name: "Pistachio Croissant Dome", price: "₹240", category: "Patisserie", isSpecial: true },
      { name: "Kyoto Style Affogato", price: "₹280", category: "Brews" }
    ],
    userReviews: [
      { author: "Deepak G.", rating: 4.8, text: "For anyone working US timetables, this place is literally a lifeline. High ceilings keep your mind crisp and awake.", date: "Jun 09, 2026", role: "Software Engineer" },
      { author: "Sonia Rao", rating: 5, text: "Amazing specialty filters late at night. Food menu remains hot, premium, and exceptional all night.", date: "May 18, 2026", role: "Journalist" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop"
    ],
    status: 'open'
  },
  {
    id: 5,
    name: "The Roastery Coffee House",
    area: "Banjara Hills",
    tags: ["Vintage Cafe", "Garden"],
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    vibe: "Housed inside a colonial-era white bungalow with wrap-around corridors, this space features hand-finished checkerboard flooring and an open cascading courtyard. Warm yellow lanterns pierce through deep tropical fronds, framing a classic, slow-drip siphon station.",
    mapLink: "https://maps.app.goo.gl/R91S3p97A5e9A9bAC",
    icon: "home",
    signature: "Cascade Drip Brew & Coffee Beer",
    founded: "2017",

    // Extended properties
    address: "House 418, Road No. 14, Banjara Hills, Hyderabad, Telangana 500034",
    phone: "+91 79955 58880",
    email: "contact@roasterycoffee.com",
    website: "https://roasterycoffee.com",
    socialLink: "https://instagram.com/roasterycoffeehouse",
    timings: "8:00 AM - 11:00 PM Everyday",
    aestheticType: "Colonial Indo-European Bungalow with Pond Patios",
    crowd: "Diplomats, vintage art purists, coffee aficionados, and retro writers",
    discounts: "10% off for any registered Specialty Coffee Association members",
    facilities: ["Open Aerated Pond Yard", "Professional Cupping Room", "Roasting Lab Tours", "Book Library", "Wheelchair Ramp"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: false,
    videoUrl: "https://www.youtube.com/embed/Y-eO8t5R7bU",
    celebrities: ["Rashmika Mandanna", "Nani", "Siddharth"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Road 14, Banjara Hills. Landmark: Lane opposite the KBR Park side entrance. Pass through the white iron archway.",
    featuredMenu: [
      { name: "Siphon Syringe Infusion", price: "₹290", category: "Brews", isSpecial: true },
      { name: "Artisanal Non-Alcoholic Coffee Beer", price: "₹210", category: "Elixirs", isSpecial: true },
      { name: "Classic French Toast with Berry Compote", price: "₹340", category: "Savory Mains" },
      { name: "Roastery signature Mac and Cheese", price: "₹390", category: "Savory Mains" }
    ],
    userReviews: [
      { author: "Aditya Shah", rating: 5, text: "Siphon coffee under the rain on their checkered veranda is a feeling that cannot be put into words.", date: "May 30, 2026", role: "Novelist" },
      { author: "Fatima Ali", rating: 4.7, text: "Their home-style roasting yields some of the cleanest coffee beans in India. Highly recommend the Monsooned Malabar.", date: "Apr 25, 2026", role: "Coffee Importer" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=600&auto=format&fit=crop"
    ],
    status: 'open'
  },
  {
    id: 6,
    name: "Kavreel Cafe",
    area: "Financial District",
    tags: ["Bakery", "Aesthetic"],
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1200&auto=format&fit=crop",
    vibe: "A serene, sculpted space defining elegance with floor-to-ceiling limestone plaster, soft-curved structural vaults, and raw Roman travertine counters. Linen curtains modulate the hot afternoon sun into a silky, pearl-like volumetric hum.",
    mapLink: "https://maps.app.goo.gl/K91S3p97A5e9A9bAD",
    icon: "wb_sunny",
    signature: "Pistachio Croissant & Shakerato",
    founded: "2023",

    // Extended properties
    address: "Tower C, ISB Road, Financial District, Gachibowli, Hyderabad, Telangana 500032",
    phone: "+91 88866 52520",
    email: "lounge@kavreel.com",
    website: "https://kavreel.com",
    socialLink: "https://instagram.com/kavreelhg",
    timings: "9:00 AM - 10:30 PM Everyday",
    aestheticType: "Wabi-Sabi Minimalism, Limestone Arches, Travertine Stone",
    crowd: "Consultants, high-end content curators, design bloggers, and architects",
    discounts: "Complimentary Macaron box when booking a co-working deck for 4+ hours",
    facilities: ["Soft Acoustic Vaulting Acoustics", "Linen Sun-Screened Lounges", "Artisan Bakery Glasshouse", "Paved Courtyard", "Valet Parking"],
    dineIn: true,
    takeaway: true,
    onlineOrder: false,
    selfDelivery: false,
    videoUrl: "https://www.youtube.com/embed/mK9P0A5X97E",
    celebrities: ["Sobhita Dhulipala", "Prabhas", "Anand Deverakonda"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Directly opposite the ICICI Headquarters. Located in the sculpted ivory annex building next to the botanical glass dome.",
    featuredMenu: [
      { name: "Kavreel Shakerato (Ice frothed)", price: "₹270", category: "Brews", isSpecial: true },
      { name: "Artisanal Pistachio Croissant", price: "₹260", category: "Patisserie", isSpecial: true },
      { name: "Vanilla Bean Canelé", price: "₹180", category: "Patisserie" },
      { name: "Wild Mushroom Gnocchi", price: "₹480", category: "Savory Mains", isSpecial: true }
    ],
    userReviews: [
      { author: "Rohan Kapoor", rating: 5, text: "An absolute design marvel. Every angle feels like it is ripped straight out of Architectural Digest.", date: "Jun 04, 2026", role: "Architect" },
      { author: "Elena Cruz", rating: 4.9, text: "The canelés have the perfect level of caramelization on the shell. Coffee pairing recommendation is meticulous.", date: "May 15, 2026", role: "Pâtissière Expert" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop"
    ],
    status: 'open'
  },
  {
    id: 7,
    name: "Broadwood Cafe",
    area: "Madhapur",
    tags: ["Minimalist", "Specialty Coffee", "Aesthetic"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    vibe: "A magnificent cube of steel-mullioned glass and structural pine frames. Soft natural light bathes clean communal desks, where creators and developers sit enjoying carefully balanced pour-overs under floating modern task beams. Its greenhouse ambiance fosters immediate focus and warmth.",
    mapLink: "https://maps.app.goo.gl/K91S3p97A5e9A9bAA",
    icon: "architecture",
    signature: "Balanced Pour-over & Cranberry Espresso",
    founded: "2026",
    address: "Hitech City Rd, near Metro Pillar C12, Madhapur, Hyderabad, Telangana 500081",
    phone: "+91 99000 66110",
    email: "desk@broadwood.co",
    website: "https://broadwood.co",
    socialLink: "https://instagram.com/broadwoodcafe",
    timings: "10:00 AM - 11:00 PM Everyday",
    aestheticType: "Industrial Glasshouse & Nordic Pine Structures",
    crowd: "Tech architects, digital designers, and high-fashion content writers",
    discounts: "Flat 10% privilege discount for local tech hub members",
    facilities: ["Direct Skylight Windows", "Double-insulated Workstations", "Ergonomic Chairs", "Premium Soundproofing"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: false,
    videoUrl: "https://www.youtube.com/embed/5m3OWea2lO0",
    celebrities: ["Rana Daggubati", "Nani", "Sushmita Konidela"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Take the service lane right beside the Hitech City METRO station. Look for the massive architectural glass box wrapped in jasmine creepers.",
    featuredMenu: [
      { name: "Single Origin Geisha Pour-over", price: "₹340", category: "Brews", isSpecial: true },
      { name: "Crispy Smashed Avocado Toast", price: "₹360", category: "Savory Mains", isSpecial: true },
      { name: "Signature Malt Espresso", price: "₹280", category: "Brews" },
      { name: "Lemon Poppyseed Scone", price: "₹180", category: "Patisserie" }
    ],
    userReviews: [
      { author: "Abhijit Roy", rating: 5, text: "Unbelievable daylight workspace. The Nordic wood interiors make you feel extremely calm and focused.", date: "Jun 01, 2026", role: "Product Designer" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"
    ],
    isNewLaunch: true,
    newLaunchCatchyline: "Cube of Glass & Cedarwood Workspaces",
    status: 'open'
  },
  {
    id: 8,
    name: "Milano Ice Cream & Cafe",
    area: "Jubilee Hills",
    tags: ["Aesthetic", "Bakery", "Heritage"],
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=1200&auto=format&fit=crop",
    vibe: "An enchanting pastel Italian courtyard styled with checkerboard marbles, iron bistro chairs, and climbing magenta bougainvilleas. A creamy, vintage counter serves genuine Sicilian gelato pairing seamlessly with rich espresso macchiatos under high glass arches.",
    mapLink: "https://maps.app.goo.gl/X91X3p97A5e9A9bAA",
    icon: "restaurant",
    signature: "Sicilian Gelato Affogato & Tiramisu Cup",
    founded: "2026",
    address: "Road No 36, Jubilee Hills, Near Metro Pillar 1633, Hyderabad, Telangana 500033",
    phone: "+91 72000 12345",
    email: "ciao@milanogelatocafe.in",
    website: "https://milanogelatocafe.in",
    socialLink: "https://instagram.com/milanogelatocafe",
    timings: "11:00 AM - 12:00 AM Everyday",
    aestheticType: "Pastel Mediterranean Courtyard & Italian Terrazzo",
    crowd: "Families, dessert seekers, art students, and travel bloggers",
    discounts: "Complimentary biscotto with order of any double-scoop gelato basket",
    facilities: ["Outdoor Bougainvillea Courtyard", "Live Gelato churning cabin", "Vintage Checkerboard Terrazzo", "Dessert Glasshouse"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: true,
    videoUrl: "https://www.youtube.com/embed/F69r6uYy94c",
    celebrities: ["Samantha", "Adivi Sesh", "Keerthy Suresh"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "A quick 100m walk from the Road 36 Jubilee Hills Metro station exit. Watch out for the pastel pink door framed with blooming flowers.",
    featuredMenu: [
      { name: "Pistachio Gelato Affogato", price: "₹240", category: "Brews", isSpecial: true },
      { name: "Classic Italian Tiramisu Cup", price: "₹290", category: "Patisserie", isSpecial: true },
      { name: "Espresso Cortado Macchiato", price: "₹180", category: "Brews" },
      { name: "Savory Pesto Focaccia Slice", price: "₹220", category: "Savory Mains", isSpecial: true }
    ],
    userReviews: [
      { author: "Prerna Varma", rating: 5, text: "Drinking a bitter double espresso poured hot over cold, fatty pistachio gelato inside this courtyard is heavenly.", date: "May 25, 2026", role: "Gelato Critic" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=600&auto=format&fit=crop"
    ],
    isNewLaunch: true,
    newLaunchCatchyline: "Pastel Bougainvillea Italian Oasis",
    status: 'open'
  },
  {
    id: 9,
    name: "Feeka Specialty Coffee",
    area: "Banjara Hills",
    tags: ["Specialty Coffee", "Quiet Workspace", "Minimalist"],
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1200&auto=format&fit=crop",
    vibe: "A warm, slow-paced sanctuary of Swedish timber, soft linen lanterns, and acoustic plasterboards. Floor-to-ceiling bookshelves frame a specialty bar optimized for silent, hyper-focused work sessions, capturing soft afternoons in pearl-like light.",
    mapLink: "https://maps.app.goo.gl/R91S3p97A5e9A9bAC",
    icon: "local_cafe",
    signature: "Kyoto Slow Drip & Swedish Kardemummabullar",
    founded: "2026",
    address: "Road No 12, Banjara Hills, Adjacent to Lotus Pond Park, Hyderabad, Telangana 500034",
    phone: "+91 91000 88220",
    email: "chill@feekaspecialty.com",
    website: "https://feekaspecialty.com",
    socialLink: "https://instagram.com/feeka.hyd",
    timings: "8:00 AM - 10:00 PM Everyday",
    aestheticType: "Scandi Wabi-Sabi & Acoustic Cedar Timber",
    crowd: "Serious researchers, Ph.D. scholars, novelists, and specialty brewers",
    discounts: "15% discount for anyone holding a registered university library ID",
    facilities: ["Absolute Whisper-quiet Acoustic Plastering", "Premium Ergonomic Seating Cushions", "Single-study Isolated Desks with Plugs", "Filtered Cold Water Fountain"],
    dineIn: true,
    takeaway: true,
    onlineOrder: false,
    selfDelivery: false,
    videoUrl: "https://www.youtube.com/embed/Y-eO8t5R7bU",
    celebrities: ["Vijay Deverakonda", "Anand Deverakonda", "Sobhita Dhulipala"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Located just behind the Lotus Pond park entrance. It has a completely plain wooden door with a tiny brass letter 'F'.",
    featuredMenu: [
      { name: "Kyoto style 12-hr Cold Drip", price: "₹260", category: "Brews", isSpecial: true },
      { name: "Traditional Kardemummabullar Bun", price: "₹180", category: "Patisserie", isSpecial: true },
      { name: "Linen-infused Flat White", price: "₹220", category: "Brews" },
      { name: "Baked Goat Cheese Crostini", price: "₹310", category: "Savory Mains" }
    ],
    userReviews: [
      { author: "Shekhar Nair", rating: 5, text: "Finally! A coffee shop that understands that real work requires absolute acoustic damping. The cardamom buns are outstanding.", date: "Jun 05, 2026", role: "Technical Writer" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=600&auto=format&fit=crop"
    ],
    isNewLaunch: true,
    newLaunchCatchyline: "Acoustic Silence & Swedish Buns",
    status: 'open'
  },
  {
    id: 10,
    name: "The Last House on the Road",
    area: "Jubilee Hills",
    tags: ["Quiet Workspace", "Garden", "Aesthetic"],
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    vibe: "A lakeside specialty brew oasis tucked behind Jubilee Hills. Reclaimed teak wooden decks protrude directly over the peaceful waters of Durgam Cheruvu, catching gold sunset rays as siphon systems drip aromatic, slow-roasted single origins.",
    mapLink: "https://maps.app.goo.gl/S91S3p97A5e9A9bAB",
    icon: "yard",
    signature: "Lakeside Sunset Cold Brew & Fig Tart",
    founded: "2026",
    address: "Road No 46, Jubilee Hills Lakeside, near Durgam Cheruvu Deck, Hyderabad, Telangana 500033",
    phone: "+91 80000 99440",
    email: "sunset@lasthouse.in",
    website: "https://lasthouse.in",
    socialLink: "https://instagram.com/lasthouse_hyderabad",
    timings: "7:00 AM - 10:30 PM Everyday",
    aestheticType: "Rustic Teak Deck Over Lake & Tropical Foliage",
    crowd: "Nature lovers, couples, acoustic poets, and sunset photographers",
    discounts: "10% off early-morning runs from 7:00 AM to 9:00 AM",
    facilities: ["Lakeside Timber Sunset Deck", "Misted Cooling Shrubbery", "Live Bird-watching Alcoves", "Handcrafted Pottery Studio"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: false,
    videoUrl: "https://www.youtube.com/embed/hbeSMyVv5Wc",
    celebrities: ["Amala Akkineni", "Samantha", "Chaitanya", "Shriya Saran"],
    bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
    directionsTip: "Drive all the way to the end of Road 46 and take the gravel lane downwards towards the lake boundary fence. The ivy-covered gate is waiting.",
    featuredMenu: [
      { name: "Durgam Sunset Malt Infusion", price: "₹280", category: "Brews", isSpecial: true },
      { name: "Warm Fig & Hazelnut Frangipane", price: "₹220", category: "Patisserie", isSpecial: true },
      { name: "Orange Rind Siphon Espresso", price: "₹290", category: "Brews" },
      { name: "Smoked Salmon & Capers Bagel", price: "₹380", category: "Savory Mains", isSpecial: true }
    ],
    userReviews: [
      { author: "Vikram Sen", rating: 5, text: "Sitting here at 6 PM watching the purple sunset sky reflect in the silent lake is absolutely breathtaking.", date: "Jun 08, 2026", role: "Landscape Painter" }
    ],
    moreImages: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop"
    ],
    isNewLaunch: true,
    newLaunchCatchyline: "Sunset Lake-view Specialty Sanctuary",
    status: 'open'
  },
  {
    id: 1781212689893,
    name: "Blue Tokai Coffee Roasters",
    area: "Gachibowli",
    tags: ["Garden", "Pet-Friendly", "Roaster"],
    image: "https://i.pinimg.com/736x/0a/70/5b/0a705bce4dd3c31db307ae1645a5f877.jpg",
    vibe: "Lush green outdoor seating built into an old heritage home.",
    mapLink: "https://maps.app.goo.gl/ujNUgrnvMpXdrGTc9",
    icon: "local_cafe",
    signature: "Cranberry Coffee",
    founded: "2025",
    address: "2, Gr & 1st Floor, Plot No: 25, PN 3 & Part of, Sy No 93, Old Mumbai Hwy, Gachibowli, Hyderabad, Telangana 500032",
    phone: "+919211446510",
    email: "",
    website: "https://bluetokaicoffee.com/",
    socialLink: "",
    timings: "",
    aestheticType: "Heritage Villa & Garden",
    crowd: "Couples, Pet Owners",
    discounts: "",
    facilities: ["Outdoor Seating", "Pet Friendly", "Valet"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: false,
    logo: "https://i.pinimg.com/736x/01/e9/b3/01e9b350f41dba3f80ff89e6b5e6d43c.jpg",
    moreImages: [
      "https://i.pinimg.com/736x/bb/88/a3/bb88a3c291f09ff484f74b9a8ea0f2ee.jpg",
      "https://i.pinimg.com/736x/cf/a8/a4/cfa8a44ad4a2e5606d046fb1c0f4a5cd.jpg",
      "https://i.pinimg.com/736x/90/06/51/9006518128d99bef01319e5b5368f735.jpg",
      "https://i.pinimg.com/736x/4e/f2/7b/4ef27b7396709b81ca44d261525c49ff.jpg",
      "https://i.pinimg.com/736x/7e/36/92/7e36927fb60db53403516d8582b98ef5.jpg"
    ],
    celebrities: ["Allu Arjun", "Samantha"],
    bookingUrl: "https://swiggy.com/dineout",
    userReviews: [
      { author: "Rahul V.", rating: 5, text: "The ambiance is so lush and green. Their cranberry coffee is to die for! The heritage villa setting makes it the perfect weekend escape.", date: "May 12, 2026", role: "Coffee Enthusiast" },
      { author: "Sneha Reddy", rating: 4.8, text: "Absolutely loved the heritage vibe. The outdoor seating is perfect for a lazy Sunday afternoon and they are super welcoming to dogs.", date: "Jun 02, 2026", role: "Local Guide" }
    ],
    featuredMenu: [
      { name: "Cranberry Coffee", price: "₹280", category: "Signature Brew", isSpecial: true },
      { name: "Vietnamese Iced Coffee", price: "₹260", category: "Cold Brew" },
      { name: "Almond Croissant", price: "₹220", category: "Pastry", isSpecial: true }
    ],
    vibeScores: [
      { label: "Aesthetic", score: 9.2 },
      { label: "Coffee", score: 8.8 },
      { label: "Workspace", score: 7.5 },
      { label: "Pet Friendly", score: 9.5 }
    ],
    isNewLaunch: false,
    status: 'open'
  },
  {
    id: 1781638646841,
    name: "Niloufer Cafe",
    area: "Hitech City",
    tags: ["Heritage", "Irani Chai"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCy4jL5ZxD_aPDtABfb7L6kI0a54i05_GTw&s",
    vibe: "A legendary Hyderabad institution serving authentic Irani chai and Osmania biscuits since 1978. A timeless space where generations meet over steaming cups and warm biscuits.",
    mapLink: "https://maps.app.goo.gl/bM6H1hXpY6F8rYw47",
    icon: "local_cafe",
    signature: "Irani Chai & Osmania Biscuits",
    founded: "1978",
    address: "Plot 30/C, Survey 83/1, Circle 20, Knowledge City, Raidurgam, Serlingampally, Near Hitech City, Hyderabad, Telangana - 500081",
    phone: "+91 89777 40649",
    email: "feedback@cafeniloufer.com",
    website: "https://cafeniloufer.com",
    socialLink: "",
    timings: "4:00 AM - 1:00 AM Everyday",
    aestheticType: "Iconic Hyderabadi Heritage",
    crowd: "Locals, nostalgic visitors, students",
    discounts: "",
    facilities: ["Wi-Fi", "Power Outlets"],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: false,
    directionsTip: "Located inside the Orbit Building complex in Knowledge City, right near the Hitech City Raidurg metro corridor.",
    moreImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCy4jL5ZxD_aPDtABfb7L6kI0a54i05_GTw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCy4jL5ZxD_aPDtABfb7L6kI0a54i05_GTw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCy4jL5ZxD_aPDtABfb7L6kI0a54i05_GTw&s"
    ],
    celebrities: [],
    bookingUrl: "",
    userReviews: [
      { author: "Imran Khan", rating: 5, text: "No place beats the Irani Chai and Osmania biscuits here. A legendary spot.", date: "Jan 15, 2026", role: "Local Legend" },
      { author: "Anita Desai", rating: 4.5, text: "Always crowded but totally worth it. The true taste of old Hyderabad.", date: "Mar 22, 2026", role: "Food Blogger" }
    ],
    featuredMenu: [
      { name: "Special Irani Chai", price: "₹80", category: "Beverages", isSpecial: true },
      { name: "Osmania Biscuits (Set of 4)", price: "₹60", category: "Snacks", isSpecial: true },
      { name: "Malai Bun", price: "₹100", category: "Snacks" }
    ],
    vibeScores: [
      { label: "Heritage", score: 9.8 },
      { label: "Taste", score: 9.5 },
      { label: "Ambiance", score: 8.0 },
      { label: "Value", score: 9.0 }
    ],
    isNewLaunch: false,
    status: 'open'
  }
];

export const PRESET_COVERS: PresetCover[] = [
  { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop", label: "Classic Warm Timber Patio" },
  { url: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=1200&auto=format&fit=crop", label: "Moss-Draped Stone Oasis" },
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop", label: "Glow Bar Brasserie" },
  { url: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop", label: "Artisan Alabaster Plaster" },
  { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop", label: "Stately Teak Garden Veranda" },
  { url: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1200&auto=format&fit=crop", label: "Limestone Brew Sanctuary" }
];

export const TAG_ICONS: { [key: string]: string } = {
  "Irani Chai": "coffee",
  "Heritage": "museum",
  "Minimalist": "architecture",
  "Specialty Coffee": "local_cafe",
  "Courtyard": "yard",
  "Quiet Workspace": "work",
  "Late Night": "bedtime",
  "Spacious": "height",
  "Vintage Cafe": "cottage",
  "Garden": "potted_plant",
  "Bakery": "cake",
  "Aesthetic": "dashboard",
  "All": "all_inclusive"
};

export function getTagIcon(tag: string): string {
  const found = TAG_ICONS[tag];
  if (found) return found;

  const normalized = tag.toLowerCase().trim();
  for (const key of Object.keys(TAG_ICONS)) {
    if (key.toLowerCase() === normalized) {
      return TAG_ICONS[key];
    }
  }

  if (normalized.includes("coffee") || normalized.includes("brew") || normalized.includes("chai")) return "local_cafe";
  if (normalized.includes("design") || normalized.includes("style") || normalized.includes("architect")) return "architecture";
  if (normalized.includes("garden") || normalized.includes("yard") || normalized.includes("courtyard")) return "yard";
  return "tag";
}

export const INITIAL_BLOG_ARTICLES = [
  {
    id: 101,
    title: "The Golden Cardamom Era: Rise of Hyderabad's Specialty Roasters",
    excerpt: "How a city built on sweet milk and simmered tea leaves learned to appreciate light-roast single-origin pour-overs and monolithic concrete architecture.",
    content: "For over a century, Hyderabad's correlation with caffeine began and ended with the heavy steam of Irani Chai brewing over thick iron kettles. Nimrah, Garden Cafe, and others codified a deep social behavior: hot, heavy sweet, alongside crusty salty Osmania biscuits.\n\nBut over the past five years, a quiet architectural and culinary revolution has Taken hold of areas like Film Nagar, Jubilee Hills, and Gachibowli.\n\nMonolithic brutalist design spaces, high ceilings, custom-sourced single-origin beans, and state-of-the-art espresso machines have introduced a new visual and sensory vernacular. Spaces like True Black and Alchemist have elevated coffee drinking from a quick standing routine to a mindful, workspace-focused ritual for technology builders, writers, and design creators.\n\nYet, this is not a dynamic of displacement, but of layered synthesis. Hyderabad’s modern roasting scene frequently experiments with cardamoms, malts, and saffron infusions, creating a uniquely Deccani approach to high-grade brewing. Here, slow coffee is celebrated in gorgeous, high-contrast lightwells, reflecting both our historic pacing and our digital-first future.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    author: "Rohan Shastry",
    date: "June 08, 2026",
    readTime: "5 min read"
  },
  {
    id: 102,
    title: "Centuries in Stone: The Coexistence of Deccani Heritage with Minimalist Design",
    excerpt: "Exploring the delicate dialogue between Old City's high-arched tea forums and the sleek, ash-washed concrete cafes of the modern technology corridors.",
    content: "Walk through the doors of a heritage venue in Begumpet or Old City, and you are surrounded by Belgium glass chandeliers, grand high ceilings, and limestone carvings. These structures were built to breathe, naturally circulating hot Deccan air to keep visitors cool.\n\nContrast this with the minimalist, concrete spaces of modern Hyderabad’s tech corridors. At first glance, they seem entirely disconnected. One is opulent, hand-carved, and historic; the other is silent, monochromatic, and clinical.\n\nYet both formats solve the same human need: a sanctuary. Hyderabadis have always demanded physical spaces where they can hold court, argue politics, sketch blueprints, or dream. In our research, we find that both the wooden-roofed courtyards of vintage cafes and the brutalist stone tablets of Film Nagar share a layout ethos. They are anchored around key structural frames—light wells, central service bars, and comfortable seating margins that keep the surrounding noise at bay.\n\nWe look at how these elements interact to create spaces that feel both comforting and inspiring, showing that Deccani heritage is not a relic, but a design philosophy that continues to inspire our present.",
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1200&auto=format&fit=crop",
    author: "Ananya Rao",
    date: "May 24, 2026",
    readTime: "7 min read"
  },
  {
    id: 103,
    title: "A Designer's Blueprint for the Ultimate Creative Work Haven",
    excerpt: "What makes a coffee house a perfect creative workbench? We analyze the exact layout, lighting parameters, and acoustic design of premium study spots.",
    content: "As remote creation and digital-first operations become the standard, the coffee shop has transformed from a leisure venue to a public workstation. However, not all coffee shops are built equal. Many are noisy, poorly list, and lack power outlets in comfortable margins.\n\nWhen we curate spaces for our directory, we look for key architectural features that encourage focus and prevent mental exhaustion:\n\n1. Indirect Natural Light Wells: Direct sunlight on laptops creates glare. Spaces with north-facing skylights or tinted clerestory windows provide ambient illumination without the heat or visual noise.\n\n2. Symmetrical Bench Margins: Long solid-wood bars with built-in power outlets allow creators to work adjacent to others without invading physical space. This simulates a high-end studio desk.\n\n3. Acoustic Buffers: High acoustic dampening, textured walls, cascading green plants, and double-insulated glass help keep decibel levels below 60dB—the sweet spot for creativity.\n\nBy focusing on these parameters, Hyderabad’s top-tier workspaces allow writers, developers, and artists to establish a state of flow while enjoying artisan-grade roasts.",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop",
    author: "Siddharth Sen",
    date: "April 15, 2026",
    readTime: "4 min read"
  }
];

