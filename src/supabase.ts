import { createClient } from '@supabase/supabase-js';

// Use environment variables first, but gracefully fallback to hardcoded keys if Vercel fails
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || "https://fqnjwmuoaedurvmozfvc.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmp3bXVvYWVkdXJ2bW96ZnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MzM2MzcsImV4cCI6MjA5NzEwOTYzN30.QOmXBGRHXh7Frhw4Bh6mlYVMjHynWPC4ouDW20HS5sA";

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads a file to the 'cafes' public bucket in Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImageToSupabase(file: File): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.");
  }

  // Generate a unique file name to prevent overwriting
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('cafes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error("Supabase Upload Error:", error);
    throw error;
  }

  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from('cafes')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
