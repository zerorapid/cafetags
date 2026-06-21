import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { INITIAL_BLOG_ARTICLES } from '../src/data.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.migration') });

// Use ANON key to simulate frontend
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAll() {
  let blogs = [];
  try {
    const { data: postsData, error } = await supabase.from('posts').select('*').order('post_date', { ascending: false });
    if (error) {
      console.log("Supabase error returned:", error.message);
    }
    console.log("postsData is:", postsData);
    
    if (postsData && postsData.length > 0) {
      console.log("Using Supabase data");
      blogs = postsData;
    } else {
      console.log("Using INITIAL_BLOG_ARTICLES");
      blogs = INITIAL_BLOG_ARTICLES;
    }
  } catch (e) {
    console.error("Exception caught:", e.message);
    console.log("Using INITIAL_BLOG_ARTICLES from catch");
    blogs = INITIAL_BLOG_ARTICLES;
  }
  
  console.log("Blogs length at the end:", blogs.length);
}
fetchAll();
