import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize the Supabase client only if keys are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

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
