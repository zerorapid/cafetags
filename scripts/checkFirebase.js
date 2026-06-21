import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkBlogs() {
  try {
    const postsRef = collection(db, 'posts');
    const postsSnap = await getDocs(postsRef);
    console.log(`Found ${postsSnap.size} posts in 'posts' collection`);
    
    const blogsRef = collection(db, 'blogs');
    const blogsSnap = await getDocs(blogsRef);
    console.log(`Found ${blogsSnap.size} posts in 'blogs' collection`);

    if (postsSnap.size > 0) {
      postsSnap.forEach(doc => {
        console.log(doc.id, '=>', doc.data().title || doc.data().name);
      });
    }
  } catch (error) {
    console.error("Error reading from Firebase:", error);
  }
}

checkBlogs();
