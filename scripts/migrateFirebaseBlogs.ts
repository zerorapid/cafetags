import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.migration') });

// Setup Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Setup Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials.");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function migrateBlogs() {
  console.log('Starting blog migration from Firebase to Supabase...');
  try {
    const blogsRef = collection(db, 'blogs');
    const blogsSnap = await getDocs(blogsRef);
    
    console.log(`Found ${blogsSnap.size} blogs in Firebase. Extracting...`);

    for (const doc of blogsSnap.docs) {
      const data = doc.data();
      const title = data.title || data.name || "Untitled Blog";
      
      const dbRow = {
        id: parseInt(doc.id) || Date.now() + Math.floor(Math.random() * 1000), // Firebase might use string IDs. Ensure int.
        title: title,
        slug: generateSlug(title),
        excerpt: data.excerpt || "",
        content: data.content || "",
        image: data.image || data.coverImage || "",
        author: data.author || "Admin",
        post_date: data.date || data.createdAt || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        read_time: data.readTime || "5 min read",
        tags: data.tags || [],
        status: data.status || 'published'
      };

      const { error } = await supabase.from('posts').upsert(dbRow);
      if (error) {
        console.error(`Error inserting blog "${title}":`, error);
      } else {
        console.log(`Successfully migrated blog: ${title}`);
      }
    }
    
    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrateBlogs();
