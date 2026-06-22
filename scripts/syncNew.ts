import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { INITIAL_CAFES } from '../src/data.js';
import { inverseTransformCafe } from '../src/lib/transforms.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const newCafes = INITIAL_CAFES.filter(c => 
    c.name === "Audiocup Coffeehouse" || 
    c.name === "The Grind Cafe"
  );

  console.log(`Found ${newCafes.length} new cafes to sync.`);

  for (const cafe of newCafes) {
    const dbData = inverseTransformCafe(cafe);
    
    // Remove user_reviews as they might belong in a separate table, 
    // or if they are in the cafes table, it's fine. Wait, transforms.ts inverse maps user_reviews to 'user_reviews'.
    // Looking at syncSupabase.ts, it inserts reviews into 'user_reviews' table.
    const { user_reviews, ...cafeData } = dbData;

    console.log(`Upserting: ${cafe.name}`);
    const { error } = await supabase.from('cafes').upsert(cafeData);
    if (error) {
      console.error(`Error upserting ${cafe.name}:`, error);
    } else {
      console.log(`Successfully synced ${cafe.name}`);
    }

    if (user_reviews && user_reviews.length > 0) {
      const formattedReviews = user_reviews.map((r: any) => ({
        cafe_id: cafe.id,
        author: r.author,
        rating: r.rating,
        text: r.text,
        review_date: r.review_date,
        role: r.role
      }));
      
      const { error: revErr } = await supabase.from('user_reviews').upsert(formattedReviews);
      if (revErr) {
         console.error(`Error syncing reviews for ${cafe.name}:`, revErr);
      } else {
         console.log(`Synced reviews for ${cafe.name}`);
      }
    }
  }
}

main();
