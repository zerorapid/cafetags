import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// We need the SERVICE_ROLE key to create a user!
// But wait, we don't have the service role key in .env!
