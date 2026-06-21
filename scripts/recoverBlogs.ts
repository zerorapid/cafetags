import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { INITIAL_BLOG_ARTICLES } from '../src/data.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.migration') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function recoverBlogs() {
  console.log('Starting blog recovery...');
  for (const blog of INITIAL_BLOG_ARTICLES) {
    const dbRow = {
      id: blog.id,
      title: blog.title,
      slug: generateSlug(blog.title),
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      post_date: blog.date,
      read_time: blog.readTime,
      tags: blog.tags || [],
      status: 'published'
    };

    const { error } = await supabase.from('posts').upsert(dbRow);
    if (error) {
      console.error(`Error inserting blog ${blog.id}:`, error);
    } else {
      console.log(`Successfully recovered blog: ${blog.title}`);
    }
  }
  console.log('Blog recovery complete!');
}

recoverBlogs();
