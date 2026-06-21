import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
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
  // Update Blue Tokai
  const { error: err1 } = await supabase.from('cafes').update({
    featured_menu: [
      { name: "Cranberry Coffee", price: "₹280", category: "Signature Brew", isSpecial: true },
      { name: "Vietnamese Iced Coffee", price: "₹260", category: "Cold Brew" },
      { name: "Almond Croissant", price: "₹220", category: "Pastry", isSpecial: true }
    ],
    vibe_scores: [
      { label: "Aesthetic", score: 9.2 },
      { label: "Coffee", score: 8.8 },
      { label: "Workspace", score: 7.5 },
      { label: "Pet Friendly", score: 9.5 }
    ]
  }).eq('id', 1781212689893);

  if (err1) console.error("Error updating Blue Tokai:", err1);
  else console.log("Blue Tokai updated.");

  // Insert reviews for Blue Tokai
  const { error: err2 } = await supabase.from('user_reviews').insert([
    { cafe_id: 1781212689893, author: "Rahul V.", rating: 5, text: "The ambiance is so lush and green. Their cranberry coffee is to die for! The heritage villa setting makes it the perfect weekend escape.", review_date: "May 12, 2026", role: "Coffee Enthusiast" },
    { cafe_id: 1781212689893, author: "Sneha Reddy", rating: 4.8, text: "Absolutely loved the heritage vibe. The outdoor seating is perfect for a lazy Sunday afternoon and they are super welcoming to dogs.", review_date: "Jun 02, 2026", role: "Local Guide" }
  ]);
  if (err2) console.error("Error inserting reviews for Blue Tokai:", err2);

  // Update Niloufer Cafe
  const { error: err3 } = await supabase.from('cafes').update({
    featured_menu: [
      { name: "Special Irani Chai", price: "₹80", category: "Beverages", isSpecial: true },
      { name: "Osmania Biscuits (Set of 4)", price: "₹60", category: "Snacks", isSpecial: true },
      { name: "Malai Bun", price: "₹100", category: "Snacks" }
    ],
    vibe_scores: [
      { label: "Heritage", score: 9.8 },
      { label: "Taste", score: 9.5 },
      { label: "Ambiance", score: 8.0 },
      { label: "Value", score: 9.0 }
    ]
  }).eq('id', 1781638646841);

  if (err3) console.error("Error updating Niloufer Cafe:", err3);
  else console.log("Niloufer Cafe updated.");

  // Insert reviews for Niloufer Cafe
  const { error: err4 } = await supabase.from('user_reviews').insert([
    { cafe_id: 1781638646841, author: "Imran Khan", rating: 5, text: "No place beats the Irani Chai and Osmania biscuits here. A legendary spot.", review_date: "Jan 15, 2026", role: "Local Legend" },
    { cafe_id: 1781638646841, author: "Anita Desai", rating: 4.5, text: "Always crowded but totally worth it. The true taste of old Hyderabad.", review_date: "Mar 22, 2026", role: "Food Blogger" }
  ]);
  if (err4) console.error("Error inserting reviews for Niloufer Cafe:", err4);
}

main();
