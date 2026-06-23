import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const newCafe = {
    id: Date.now(),
    name: "KASA The OG Cafe",
    area: "Banjara Hills, Hyderabad",
    address: "8-2, 269/A, Banjara Hills Rd Number 3, beside Mountain Bakery, UBI Colony, Green Valley, Banjara Hills, Hyderabad, Telangana 500028",
    phone: "+91 88017 93558",
    timings: "11:30 AM – 2:00 PM",
    signature: "Chai & Snacks",
    vibe: "Casual neighborhood cafe / chai spot serving black tea, green tea, ginger tea, and bakery-style items.",
    curatorNote: "The online listings are a bit inconsistent: one source places it in Lumbini Jewel Mall, while another gives a Banjara Hills Rd No. 3 address. A recent post also mentions KASA THE OG CAFE & RASA PAN PALACE together in Banjara Hills.",
    tags: ["Chai", "Casual", "Snacks"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000",
    icon: "local_cafe",
    founded: "2024",
    email: "",
    website: "",
    aestheticType: "Casual Neighborhood",
    crowd: "Locals, Chai Lovers",
    discounts: "",
    facilities: ["Outdoor Seating"],
    dineIn: true,
    takeaway: true,
    onlineOrder: false,
    selfDelivery: false,
    celebrities: [],
    bookingUrl: "",
    mapLink: "https://maps.app.goo.gl/search/KASA+The+OG+Cafe+Hyderabad",
    status: "open",
    isNewLaunch: true,
    newLaunchCatchyline: "New neighborhood chai spot in Banjara Hills"
  };

  const { error } = await supabase.from('cafes').insert([newCafe]);

  if (error) {
    console.error("Error inserting cafe:", error);
  } else {
    console.log("Successfully added KASA The OG Cafe!");
  }
}

main();
