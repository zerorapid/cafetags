import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.migration') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function dump() {
  const { data } = await supabase.from('posts').select('*').order('id', { ascending: true });
  if (!data) return;
  const formatted = data.map(blog => {
    return `  {
    id: ${blog.id},
    title: ${JSON.stringify(blog.title)},
    excerpt: ${JSON.stringify(blog.excerpt || "")},
    content: ${JSON.stringify(blog.content || "")},
    image: ${JSON.stringify(blog.image || "")},
    author: ${JSON.stringify(blog.author || "Admin")},
    date: ${JSON.stringify(blog.post_date || "")},
    readTime: ${JSON.stringify(blog.read_time || "5 min read")}
  }`;
  }).join(',\n');
  
  console.log('export const INITIAL_BLOG_ARTICLES = [\n' + formatted + '\n];');
}
dump();
