import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.migration') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) console.error("Error:", error);
  else {
    console.log(`Found ${data.length} posts in Supabase.`);
    if (data.length > 0) {
      console.log(data.map(p => ({ id: p.id, title: p.title, post_date: p.post_date })));
    }
  }
}
check();
