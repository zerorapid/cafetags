import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.migration') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('posts').select('*').order('post_date', { ascending: false });
  if (error) {
    console.error(error);
    return;
  }
  
  const formatted = data.map(blog => {
    return `  {
    id: ${blog.id},
    title: ${JSON.stringify(blog.title)},
    excerpt: ${JSON.stringify(blog.excerpt || "")},
    content: ${JSON.stringify(blog.content || "")},
    image: ${JSON.stringify(blog.image || "")},
    author: ${JSON.stringify(blog.author || "Admin")},
    date: ${JSON.stringify(blog.post_date || "")},
    readTime: ${JSON.stringify(blog.read_time || "5 min read")},
    status: ${JSON.stringify(blog.status || "published")},
    tags: ${JSON.stringify(blog.tags || [])}
  }`;
  }).join(',\n');

  const arrayStr = `export const INITIAL_BLOG_ARTICLES = [\n${formatted}\n];`;

  const dataPath = path.resolve(process.cwd(), 'src/data.ts');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  
  const newContent = fileContent.replace(/export const INITIAL_BLOG_ARTICLES = \[[\s\S]*\];/, arrayStr);
  fs.writeFileSync(dataPath, newContent);
  console.log("Updated data.ts with tags and status.");
}
main();
