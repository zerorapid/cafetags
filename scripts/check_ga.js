import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('seo_settings').select('google_analytics_id').single();
  if (error) {
    console.log("Error or no data:", error.message);
  } else {
    console.log("Current GA ID in database:", data.google_analytics_id || "NOT SET (Empty)");
  }
}
check();
